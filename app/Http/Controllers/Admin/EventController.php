<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\NewsArticle;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::query()
            ->with([
                'category:id,name,color',
                'program:id,title',
                'newsArticles:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('venue', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('event_category_id', $category);
            })
            ->when($request->date_filter, function ($query, $filter) {
                if ($filter === 'upcoming') {
                    $query->where('starts_at', '>=', now());
                } elseif ($filter === 'past') {
                    $query->where('starts_at', '<', now());
                }
            })
            ->latest('starts_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,

            'filters' => $request->only([
                'search',
                'status',
                'category',
                'date_filter',
            ]),

            'categories' => EventCategory::orderBy('name')
                ->get(['id', 'name']),

            'stats' => [
                'total' => Event::count(),

                'published' => Event::where('status', 'published')->count(),

                'draft' => Event::where('status', 'draft')->count(),

                'upcoming' => Event::where('starts_at', '>=', now())
                    ->where('status', 'published')
                    ->count(),
            ],
        ]);
    }

    /**
     * Show the event creation form.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create', [
            'categories' => EventCategory::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name', 'color']),

            'programs' => Program::where('status', 'active')
                ->orderBy('title')
                ->get(['id', 'title']),

            'newsArticles' => $this->getAvailableNewsArticles(),
        ]);
    }

    /**
     * Store a new event.
     */
    public function store(Request $request)
    {
        $validated = $this->validateEvent($request);

        $newsArticleIds = $validated['news_article_ids'] ?? [];

        unset($validated['news_article_ids']);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title']
        );

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')
                ->store('events', 'uploads');
        }

        $validated['created_by'] = $request->user()->id;

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        DB::transaction(function () use ($validated, $newsArticleIds) {
            $event = Event::create($validated);

            // Attach selected news articles to this event.
            $event->newsArticles()->sync($newsArticleIds);
        });

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display event details.
     */
    public function show(Event $event)
    {
        $event->load([
            'category:id,name,color',
            'program:id,title',
            'creator:id,name',
            'newsArticles' => function ($query) {
                $query->with('category:id,name')
                    ->orderByDesc('published_at');
            },
        ]);

        return Inertia::render('Admin/Events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the event editing form.
     */
    public function edit(Event $event)
    {
        $event->load('newsArticles:id,title');

        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,

            'categories' => EventCategory::where('is_active', true)
                ->orWhere('id', $event->event_category_id)
                ->orderBy('name')
                ->get(['id', 'name', 'color']),

            'programs' => Program::where('status', 'active')
                ->orWhere('id', $event->program_id)
                ->orderBy('title')
                ->get(['id', 'title']),

            'newsArticles' => $this->getAvailableNewsArticles(
                $event->newsArticles->pluck('id')->all()
            ),
        ]);
    }

    /**
     * Update an existing event.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $this->validateEvent($request, $event);

        $newsArticleIds = $validated['news_article_ids'] ?? [];

        $hasNewsArticleSelection = array_key_exists(
            'news_article_ids',
            $validated
        );

        unset($validated['news_article_ids']);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title'],
            $event->id
        );

        $newCoverImage = null;

        if ($request->hasFile('cover_image')) {
            $newCoverImage = $request->file('cover_image')
                ->store('events', 'uploads');

            $validated['cover_image'] = $newCoverImage;
        } else {
            unset($validated['cover_image']);
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = $event->published_at ?? now();
        } else {
            $validated['published_at'] = null;
        }

        try {
            DB::transaction(function () use (
                $event,
                $validated,
                $newsArticleIds,
                $hasNewsArticleSelection
            ) {
                $event->update($validated);

                // Only synchronize if the field was submitted.
                if ($hasNewsArticleSelection) {
                    $event->newsArticles()->sync($newsArticleIds);
                }
            });
        } catch (\Throwable $exception) {
            // Remove the newly uploaded image if the update fails.
            if ($newCoverImage) {
                Storage::disk('uploads')->delete($newCoverImage);
            }

            throw $exception;
        }

        // Delete the old image only after the update succeeds.
        if ($newCoverImage && $event->getOriginal('cover_image')) {
            Storage::disk('uploads')->delete(
                $event->getOriginal('cover_image')
            );
        }

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Delete an event.
     */
    public function destroy(Event $event)
    {
        if ($event->cover_image) {
            Storage::disk('uploads')->delete($event->cover_image);
        }

        $event->delete();

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }

    /**
     * Validate event data.
     */
    private function validateEvent(
        Request $request,
        ?Event $event = null
    ): array {
        return $request->validate([
            'event_category_id' => [
                'nullable',
                'integer',
                Rule::exists('event_categories', 'id')
                    ->where('is_active', true),
            ],

            'program_id' => [
                'nullable',
                'integer',
                Rule::exists('programs', 'id')
                    ->where('status', 'active'),
            ],

            // Related news articles.
            'news_article_ids' => [
                'sometimes',
                'nullable',
                'array',
            ],

            'news_article_ids.*' => [
                'integer',
                'distinct',
                'exists:news_articles,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('events', 'slug')->ignore($event?->id),
            ],

            'excerpt' => [
                'nullable',
                'string',
                'max:500',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            // Kinyarwanda translations (English is used when empty).
            'title_rw' => ['nullable', 'string', 'max:255'],
            'excerpt_rw' => ['nullable', 'string', 'max:500'],
            'description_rw' => ['nullable', 'string'],
            'venue_rw' => ['nullable', 'string', 'max:255'],
            'address_rw' => ['nullable', 'string', 'max:255'],
            'city_rw' => ['nullable', 'string', 'max:255'],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'venue' => [
                'nullable',
                'string',
                'max:255',
            ],

            'address' => [
                'nullable',
                'string',
                'max:255',
            ],

            'city' => [
                'nullable',
                'string',
                'max:255',
            ],

            'country' => [
                'required',
                'string',
                'max:255',
            ],

            'starts_at' => [
                'required',
                'date',
            ],

            'ends_at' => [
                'nullable',
                'date',
                'after:starts_at',
            ],

            'timezone' => [
                'required',
                'timezone',
            ],

            'status' => [
                'required',
                Rule::in(['draft', 'published', 'cancelled']),
            ],

            'is_featured' => [
                'required',
                'boolean',
            ],

            'registration_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'agenda' => [
                'nullable',
                'array',
            ],

            'agenda.*.time' => [
                'nullable',
                'string',
                'max:100',
            ],

            'agenda.*.title' => [
                'required_with:agenda.*.time',
                'string',
                'max:255',
            ],

            'agenda.*.description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);
    }

    /**
     * Retrieve available news articles for event forms.
     *
     * Include already-associated articles even if they are no longer
     * published, so existing relationships can still be managed.
     */
    private function getAvailableNewsArticles(array $selectedIds = [])
    {
        return NewsArticle::query()
            ->where(function ($query) use ($selectedIds) {
                $query->where('status', 'published');

                if (!empty($selectedIds)) {
                    $query->orWhereIn('id', $selectedIds);
                }
            })
            ->orderBy('title')
            ->get(['id', 'title', 'status']);
    }

    /**
     * Generate a unique event slug.
     */
    private function generateUniqueSlug(
        string $value,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($value) ?: 'event';

        $slug = $baseSlug;

        $counter = 1;

        while (
            Event::withTrashed()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}
