<?php

namespace App\Http\Controllers\Admin;

use App\Support\FileUpload;
use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NewsArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = NewsArticle::with([
            'category:id,name',
            'author:id,name',
        ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('news_category_id', $request->category);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->featured === '1');
        }

        $articles = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $categories = NewsCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/NewsArticles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only([
                'search',
                'status',
                'category',
                'featured',
            ]),
            'stats' => [
                'total' => NewsArticle::count(),
                'published' => NewsArticle::where('status', 'published')->count(),
                'drafts' => NewsArticle::where('status', 'draft')->count(),
                'archived' => NewsArticle::where('status', 'archived')->count(),
                'featured' => NewsArticle::where('is_featured', true)->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateArticle($request);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title']
        );

        $validated['author_id'] = Auth::id();
        $validated['views_count'] = 0;

        $validated['featured_image'] = FileUpload::fromRequest($request, 'featured_image', 'news-articles');

        $validated['published_at'] = $validated['status'] === 'published'
            ? ($request->filled('published_at')
                ? $request->published_at
                : now())
            : null;

        NewsArticle::create($validated);

        return redirect()
            ->route('admin.news-articles.index')
            ->with('success', 'News article created successfully.');
    }

    public function update(Request $request, NewsArticle $newsArticle)
    {
        $validated = $this->validateArticle($request, $newsArticle);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title'],
            $newsArticle->id
        );

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = FileUpload::replace($request, 'featured_image', 'news-articles', $newsArticle->featured_image);
        } else {
            unset($validated['featured_image']);
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = $request->filled('published_at')
                ? $request->published_at
                : ($newsArticle->published_at ?? now());
        } else {
            $validated['published_at'] = null;
        }

        // Do not allow the author to be changed through the form.
        unset($validated['author_id'], $validated['views_count']);

        $newsArticle->update($validated);

        return redirect()
            ->route('admin.news-articles.index')
            ->with('success', 'News article updated successfully.');
    }

    public function destroy(NewsArticle $newsArticle)
    {
        $newsArticle->delete();

        return redirect()
            ->route('admin.news-articles.index')
            ->with('success', 'News article moved to trash successfully.');
    }

    private function validateArticle(
        Request $request,
        ?NewsArticle $newsArticle = null
    ): array {
        return $request->validate([
            'news_category_id' => [
                'nullable',
                'integer',
                Rule::exists('news_categories', 'id'),
            ],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('news_articles', 'slug')->ignore($newsArticle?->id),
            ],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'featured_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
            'status' => [
                'required',
                Rule::in(['draft', 'published', 'archived']),
            ],
            'is_featured' => ['required', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],

            // Kinyarwanda translations (English is used when empty).
            'title_rw' => ['nullable', 'string', 'max:255'],
            'excerpt_rw' => ['nullable', 'string', 'max:500'],
            'content_rw' => ['nullable', 'string'],
            'meta_title_rw' => ['nullable', 'string', 'max:255'],
            'meta_description_rw' => ['nullable', 'string', 'max:500'],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/NewsArticles/Create', [
            'categories' => NewsCategory::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function edit(NewsArticle $newsArticle)
    {
        return Inertia::render('Admin/NewsArticles/Edit', [
            'article' => $newsArticle->load([
                'category:id,name',
                'author:id,name',
            ]),
            'categories' => NewsCategory::where('is_active', true)
                ->orWhere('id', $newsArticle->news_category_id)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function show(NewsArticle $newsArticle)
    {
        return Inertia::render('Admin/NewsArticles/Show', [
            'article' => $newsArticle->load([
                'category:id,name',
                'author:id,name',
            ]),
        ]);
    }

    private function generateUniqueSlug(
        string $value,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($value);
        $slug = $slug ?: 'news-article';

        $originalSlug = $slug;
        $counter = 1;

        while (
            NewsArticle::where('slug', $slug)
            ->when($ignoreId, fn($query) => $query->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
