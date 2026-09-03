<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DocumentVersion;
use App\Models\DocumentView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::with('versions')->latest()->paginate(12)->withQueryString();

        $documents->getCollection()->transform(fn ($doc) => [
            'id' => $doc->id,
            'title' => $doc->title,
            'description' => $doc->description,
            'versions' => $doc->versions->map(fn ($v) => [
                'id' => $v->id,
                'language' => $v->language,
                'language_label' => $v->languageLabel(),
            ]),
        ]);

        return Inertia::render('Documents/Index', ['documents' => $documents]);
    }

    public function show(int $id, Request $request)
    {
        $document = Document::with('versions')->findOrFail($id);

        if ($document->versions->isEmpty()) {
            abort(404, 'No versions available for this document yet.');
        }

        $available = $document->availableLanguages();

        $language = $request->query('lang')
            ?? session('preferred_language')
            ?? $available[0];

        if (! in_array($language, $available, true)) {
            $language = $available[0];
        }

        session(['preferred_language' => $language]);

        return Inertia::render('Documents/Show', [
            'document' => [
                'id' => $document->id,
                'title' => $document->title,
                'description' => $document->description,
            ],
            'language' => $language,
            'availableLanguages' => collect($available)->map(fn ($code) => [
                'code' => $code,
                'label' => DocumentVersion::LANGUAGES[$code] ?? $code,
            ]),
        ]);
    }

    public function stream(int $documentId, string $language, Request $request)
    {
        $version = DocumentVersion::where('document_id', $documentId)
            ->where('language', $language)
            ->firstOrFail();

        $fullPath = storage_path("app/{$version->file_path}");

        abort_unless(File::exists($fullPath), 404);

        DocumentView::create([
            'document_id' => $documentId,
            'user_id' => $request->user()->id,
            'language' => $language,
            'viewed_at' => now(),
        ]);

        return response()->file($fullPath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$version->original_filename.'"',
        ]);
    }
}
