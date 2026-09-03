<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentVersion;
use App\Models\DocumentView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $query = DocumentView::with(['document', 'user'])->latest('viewed_at');

        if ($documentId = $request->query('document')) {
            $query->where('document_id', $documentId);
        }

        $views = $query->paginate(25)->withQueryString();

        $views->getCollection()->transform(fn ($view) => [
            'id' => $view->id,
            'user_name' => $view->user->name ?? 'Deleted user',
            'document_title' => $view->document->title ?? 'Deleted document',
            'language' => $view->language,
            'language_label' => DocumentVersion::LANGUAGES[$view->language] ?? $view->language,
            'viewed_at' => $view->viewed_at->format('d M Y, H:i'),
        ]);

        return Inertia::render('Admin/Activity/Index', ['views' => $views]);
    }
}
