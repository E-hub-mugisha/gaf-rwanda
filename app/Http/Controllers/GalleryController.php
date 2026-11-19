<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EventGallery;
use App\Models\GalleryMedia;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display all public event galleries.
     */
    public function index()
    {
        // Every public album (no pagination), newest event first.
        $galleries = EventGallery::query()
            ->public()
            ->whereHas('event', fn ($query) => $query->published())
            ->with('event:id,title,title_rw,slug,starts_at')
            ->withCount([
                'publicMedia as media_count',
                'publicMedia as image_count' => fn ($query) => $query->where('type', 'image'),
                'publicMedia as video_count' => fn ($query) => $query->where('type', 'video'),
            ])
            ->get()
            ->sortBy([
                fn ($a, $b) => ($b->event?->starts_at?->timestamp ?? 0) <=> ($a->event?->starts_at?->timestamp ?? 0),
                fn ($a, $b) => $a->sort_order <=> $b->sort_order,
            ])
            ->values();

        // Photos and videos from all public albums, newest first.
        $mediaQuery = GalleryMedia::query()
            ->whereHas('gallery', fn ($query) => $query
                ->public()
                ->whereHas('event', fn ($event) => $event->published()));

        $mediaTotal = (clone $mediaQuery)->count();

        $media = (clone $mediaQuery)
            ->with('gallery:id,title,title_rw,slug')
            ->latest('id')
            ->limit(300)
            ->get();

        return Inertia::render('UserPage/Gallery/Index', [
            'galleries' => $galleries,
            'media' => $media,
            'mediaTotal' => $mediaTotal,
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
