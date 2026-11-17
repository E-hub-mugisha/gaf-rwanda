<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicEventController extends Controller
{
    /**
     * Public events listing.
     */
    public function index(Request $request): Response
    {
        $baseQuery = Event::query()
            ->published()
            ->with([
                'category:id,name,name_rw,slug',
                'program:id,title',
            ]);

        $upcomingEvents = (clone $baseQuery)
            ->upcoming()
            ->orderBy('starts_at')
            ->get();

        $ongoingEvents = (clone $baseQuery)
            ->ongoing()
            ->orderBy('starts_at')
            ->get();

        $pastEvents = (clone $baseQuery)
            ->past()
            ->orderByDesc('starts_at')
            ->limit(12)
            ->get();

        $featuredEvent = (clone $baseQuery)
            ->where('is_featured', true)
            ->orderByDesc('published_at')
            ->orderByDesc('starts_at')
            ->first();

        return Inertia::render('UserPage/Events/Index', [
            'featuredEvent' => $featuredEvent,
            'upcomingEvents' => $upcomingEvents,
            'ongoingEvents' => $ongoingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }

    /**
     * Public event details.
     */
    public function show(Event $event): Response
    {
        abort_unless(
            $event->status === 'published' &&
            (
                $event->published_at === null ||
                $event->published_at->lte(now())
            ),
            404
        );

        $event->load([
            'category:id,name,name_rw,slug',
            'program:id,title',
            'galleries',
        ]);

        $relatedEvents = Event::query()
            ->published()
            ->where('id', '!=', $event->id)
            ->when(
                $event->event_category_id,
                fn ($query) => $query->where(
                    'event_category_id',
                    $event->event_category_id
                )
            )
            ->with('category:id,name,name_rw,slug')
            ->with('program:id,title')
            ->orderBy('starts_at')
            ->limit(3)
            ->get();

        return Inertia::render('UserPage/Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
}