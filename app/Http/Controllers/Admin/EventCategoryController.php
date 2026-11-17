<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EventCategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = EventCategory::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when($request->status !== null && $request->status !== '', function ($query) use ($request) {
                $query->where('is_active', $request->status === 'active');
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/EventCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only('search', 'status'),
            'stats' => [
                'total' => EventCategory::count(),
                'active' => EventCategory::where('is_active', true)->count(),
                'inactive' => EventCategory::where('is_active', false)->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/EventCategories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_rw' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:event_categories,slug'],
            'description' => ['nullable', 'string'],
            'color' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['name']
        );

        EventCategory::create($validated);

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category created successfully.');
    }

    public function show(EventCategory $eventCategory)
    {
        return Inertia::render('Admin/EventCategories/Show', [
            'category' => $eventCategory,
            'eventsCount' => $eventCategory->events()->count(),
        ]);
    }

    public function edit(EventCategory $eventCategory)
    {
        return Inertia::render('Admin/EventCategories/Edit', [
            'category' => $eventCategory,
        ]);
    }

    public function update(Request $request, EventCategory $eventCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_rw' => ['nullable', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('event_categories', 'slug')->ignore($eventCategory->id),
            ],
            'description' => ['nullable', 'string'],
            'color' => ['nullable', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['name'],
            $eventCategory->id
        );

        $eventCategory->update($validated);

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category updated successfully.');
    }

    public function destroy(EventCategory $eventCategory)
    {
        if ($eventCategory->events()->exists()) {
            return back()->with(
                'error',
                'This category cannot be deleted because it has associated events.'
            );
        }

        $eventCategory->delete();

        return redirect()
            ->route('admin.event-categories.index')
            ->with('success', 'Event category deleted successfully.');
    }

    private function generateUniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value);

        if ($baseSlug === '') {
            $baseSlug = 'event-category';
        }

        $slug = $baseSlug;
        $counter = 1;

        while (
            EventCategory::where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}
