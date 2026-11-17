<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventGallery;
use App\Models\Faq;
use App\Models\HeroMedia;
use App\Models\NewsArticle;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // NEWS: latest published articles
        $news = NewsArticle::query()
            ->published()
            ->with('category:id,name')
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->limit(6)
            ->get()
            ->map(fn(NewsArticle $a) => [
                'id'       => $a->id,
                'slug'     => $a->slug,
                'date'     => optional($a->published_at ?? $a->created_at)->toDateString(),
                'category' => $a->category?->name,
                'image'    => $this->imageUrl($a->featured_image),
                'title'    => $a->title,
                'text'     => $a->excerpt ?: str()->limit(strip_tags((string) $a->content), 180),
                'url'      => route('news.show', $a->slug),
            ]);

        // EVENTS: upcoming/ongoing first, then past
        $events = Event::query()
            ->published()
            ->with('category:id,name')
            ->orderByRaw('CASE WHEN COALESCE(ends_at, starts_at) >= ? THEN 0 ELSE 1 END', [now()])
            ->orderByRaw('CASE WHEN COALESCE(ends_at, starts_at) >= ? THEN starts_at END ASC', [now()])
            ->orderByDesc('starts_at')
            ->limit(6)
            ->get()
            ->map(fn(Event $e) => [
                'id'       => $e->id,
                'slug'     => $e->slug,
                'date'     => optional($e->starts_at)->toDateString(),
                'endDate'  => optional($e->ends_at)->toDateString(),
                'timing'   => $e->timing, // upcoming | ongoing | past | cancelled
                'category' => $e->category?->name,
                'image'    => $this->imageUrl($e->cover_image),
                'title'    => $e->title,
                'place'    => collect([$e->venue, $e->city])->filter()->implode(', '),
                'text'     => $e->excerpt ?: str()->limit(strip_tags((string) $e->description), 180),
                'registrationUrl' => $e->registration_url,
                'url'      => route('events.show', $e->slug),
            ]);

        // GALLERY: public albums with their media
        $gallery = EventGallery::query()
            ->where('is_public', true)
            ->with(['event:id,title,starts_at,city', 'media' => fn($q) => $q->orderBy('sort_order')->limit(8)])
            ->withCount('media')
            ->orderBy('sort_order')
            ->limit(6)
            ->get()
            ->map(function (EventGallery $g) {
                $cover = $g->cover_image
                    ? $this->imageUrl($g->cover_image)
                    : $g->media->firstWhere('type', 'image')?->url;

                return [
                    'id'    => $g->id,
                    'slug'  => $g->slug,
                    'date'  => optional($g->event?->starts_at)->toDateString(),
                    'place' => $g->event?->city,
                    'image' => $cover,
                    'title' => $g->title,
                    'text'  => $g->description,
                    'count' => $g->media_count,
                    'media' => $g->media
                        ->where('type', 'image')
                        ->map(fn($m) => [
                            'id'      => $m->id,
                            'url'     => $m->url,
                            'alt'     => $m->alt_text ?: $g->title,
                            'caption' => $m->caption,
                        ])->values(),
                ];
            });

        $faqs = Faq::query()
    ->active()
    ->ordered()
    ->get([
        'id',
        'question',
        'answer',
        'question_rw',
        'answer_rw',
    ])->take(5);

        $heroMedia = HeroMedia::active()->first();

        return Inertia::render('UserPage/Index', [
            'news'    => $news,
            'events'  => $events,
            'gallery' => $gallery,
            'heroMedia' => $heroMedia ? [
                'id' => $heroMedia->id,
                'title' => $heroMedia->title,
                'heroVideo' => $heroMedia->youtube_url,
                'heroImage' => $heroMedia->banner_image_url,
                'altText' => $heroMedia->alt_text,
                'caption' => $heroMedia->caption,
            ] : null,
            'faqs' => $faqs,
        ]);
    }

    private function imageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::disk('uploads')->url($path);
    }
}
