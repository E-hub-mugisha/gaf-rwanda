<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $categories = NewsCategory::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === 'active');
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/NewsCategories/Index', [
            'categories' => $categories,

            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
            ],

            'stats' => [
                'total' => NewsCategory::count(),
                'active' => NewsCategory::where('is_active', true)->count(),
                'inactive' => NewsCategory::where('is_active', false)->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_rw' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:news_categories,slug'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $validated['slug'] = Str::slug(
            $validated['slug'] ?: $validated['name']
        );

        // Ensure the generated slug is unique.
        $baseSlug = $validated['slug'];
        $counter = 1;

        while (
            NewsCategory::where('slug', $validated['slug'])->exists()
        ) {
            $validated['slug'] = $baseSlug . '-' . $counter++;
        }

        NewsCategory::create($validated);

        return redirect()
            ->route('admin.news-categories.index')
            ->with('success', 'News category created successfully.');
    }

    public function update(Request $request, NewsCategory $newsCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_rw' => ['nullable', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('news_categories', 'slug')
                    ->ignore($newsCategory->id),
            ],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $validated['slug'] = Str::slug(
            $validated['slug'] ?: $validated['name']
        );

        // Ensure the generated slug is unique, excluding this category.
        $baseSlug = $validated['slug'];
        $counter = 1;

        while (
            NewsCategory::where('slug', $validated['slug'])
                ->where('id', '!=', $newsCategory->id)
                ->exists()
        ) {
            $validated['slug'] = $baseSlug . '-' . $counter++;
        }

        $newsCategory->update($validated);

        return redirect()
            ->route('admin.news-categories.index')
            ->with('success', 'News category updated successfully.');
    }

    public function destroy(NewsCategory $newsCategory)
    {
        $newsCategory->delete();

        return redirect()
            ->route('admin.news-categories.index')
            ->with('success', 'News category deleted successfully.');
    }
}
