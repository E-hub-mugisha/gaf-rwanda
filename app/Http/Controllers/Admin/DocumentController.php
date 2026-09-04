<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\DocumentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DocumentController extends Controller
{
    private array $languages = ['en', 'es', 'rw'];

    public function index()
    {
        $documents = Document::with('versions')->latest()->paginate(10)->withQueryString();

        $documents->getCollection()->transform(fn($doc) => [
            'id' => $doc->id,
            'title' => $doc->title,
            'created_at_date' => $doc->created_at->format('d M Y'),
            'versions' => $doc->versions->map(fn($v) => [
                'id' => $v->id,
                'language' => $v->language,
                'language_label' => $v->languageLabel(),
            ]),
        ]);

        return Inertia::render('Admin/Documents/Index', ['documents' => $documents]);
    }

    public function create()
    {
        return Inertia::render('Admin/Documents/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file_en' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
            'file_es' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
            'file_rw' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
        ]);

        if (! $request->hasFile('file_en') && ! $request->hasFile('file_es') && ! $request->hasFile('file_rw')) {
            return back()->withErrors(['file_en' => 'Upload at least one language version.'])->withInput();
        }

        $document = Document::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'created_by' => $request->user()->id,
        ]);

        foreach ($this->languages as $lang) {
            if ($request->hasFile("file_{$lang}")) {
                $this->storeVersion($document, $request->file("file_{$lang}"), $lang);
            }
        }

        return redirect()->route('admin.documents.index')->with('status', 'Document uploaded.');
    }

    public function edit(int $id)
    {
        $document = Document::with('versions')->findOrFail($id);

        return Inertia::render('Admin/Documents/Edit', [
            'document' => [
                'id' => $document->id,
                'title' => $document->title,
                'description' => $document->description,
                'versions' => $document->versions->map(fn($v) => [
                    'id' => $v->id,
                    'language' => $v->language,
                    'original_filename' => $v->original_filename,
                ]),
            ],
        ]);
    }

    public function update(Request $request, int $id)
    {
        $document = Document::findOrFail($id);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file_en' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
            'file_es' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
            'file_rw' => ['nullable', 'file', 'mimes:pdf', 'max:20480'],
        ]);

        $document->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
        ]);

        foreach ($this->languages as $lang) {
            if ($request->hasFile("file_{$lang}")) {
                $existing = $document->versions()->where('language', $lang)->first();
                if ($existing) {
                    $this->deleteFile($existing->file_path);
                    $existing->delete();
                }
                $this->storeVersion($document, $request->file("file_{$lang}"), $lang);
            }
        }

        return redirect()->route('admin.documents.index')->with('status', 'Document updated.');
    }

    public function destroy(int $id)
    {
        $document = Document::with('versions')->findOrFail($id);

        foreach ($document->versions as $version) {
            $this->deleteFile($version->file_path);
        }

        $document->delete();

        return redirect()->route('admin.documents.index')->with('status', 'Document deleted.');
    }

    public function destroyVersion(int $documentId, int $versionId)
    {
        $version = DocumentVersion::where('document_id', $documentId)->findOrFail($versionId);
        $this->deleteFile($version->file_path);
        $version->delete();

        return back()->with('status', 'Language version removed.');
    }

    private function storeVersion(Document $document, $uploadedFile, string $language): void
    {
        $directory = storage_path("app/documents/{$document->id}");
        if (! File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $filename = "{$language}.pdf";
        $uploadedFile->move($directory, $filename);

        DocumentVersion::create([
            'document_id' => $document->id,
            'language' => $language,
            'file_path' => "documents/{$document->id}/{$filename}",
            'original_filename' => $uploadedFile->getClientOriginalName(),
            'file_size' => File::size("{$directory}/{$filename}"),
        ]);
    }

    private function deleteFile(string $relativePath): void
    {
        $fullPath = storage_path("app/{$relativePath}");
        if (File::exists($fullPath)) {
            File::delete($fullPath);
        }
    }

    public function view($id)
    {
        $document = Document::with('versions')->findOrFail($id);

        return Inertia::render('Admin/Documents/View', [
            'document' => [
                'id' => $document->id,
                'title' => $document->title,
                'description' => $document->description,
                'created_at' => $document->created_at?->format('M d, Y'),
                'versions' => $document->versions->map(function ($version) {
                    return [
                        'id' => $version->id,
                        'language' => $version->language,
                        'language_label' => $version->languageLabel(),
                        'original_filename' => $version->original_filename,
                    ];
                })->values(),
            ],
        ]);
    }
}
