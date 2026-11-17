<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EventGallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display all public event galleries.
     */
    public function index()
    {
        $galleries = EventGallery::query()
            ->public()
            ->whereHas('event', function ($query) {
                $query->published();
            })
            ->with([
                'event:id,title,title_rw,slug,starts_at',
            ])
            ->withCount([
                'publicMedia as media_count',
                'publicMedia as image_count' => function ($query) {
                    $query->where('type', 'image');
                },
                'publicMedia as video_count' => function ($query) {
                    $query->where('type', 'video');
                },
            ])
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('UserPage/Gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Display one public event gallery.
     */
    public function show(string $slug)
    {
        $gallery = EventGallery::query()
            ->public()
            ->where('slug', $slug)
            ->whereHas('event', function ($query) {
                $query->published();
            })
            ->with([
                'event:id,title,title_rw,slug,starts_at,ends_at',
                'publicMedia',
            ])
            ->firstOrFail();

        $relatedGalleries = EventGallery::query()
            ->public()
            ->where('id', '!=', $gallery->id)
            ->where('event_id', $gallery->event_id)
            ->with('event:id,title,title_rw,slug')
            ->withCount('publicMedia as media_count')
            ->orderBy('sort_order')
            ->limit(3)
            ->get();

        return Inertia::render('UserPage/Gallery/Show', [
            'gallery' => $gallery,
            'relatedGalleries' => $relatedGalleries,
        ]);
    }
}
