<?php

namespace App\Http\Controllers;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $categorySlug = $request->query('category');

        $publishedArticles = NewsArticle::query()
            ->published()
            ->with([
                'category:id,name,slug',
                'author:id,name',
            ]);

        if ($search !== '') {
            $publishedArticles->where(function ($query) use ($search) {
                $query
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($categorySlug) {
            $publishedArticles->whereHas('category', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });
        }

        $isFiltered = $search !== '' || filled($categorySlug);

        $featuredArticle = null;

        if (!$isFiltered) {
            $featured = (clone $publishedArticles)
                ->where('is_featured', true)
                ->orderByDesc('published_at')
                ->first();

            if (!$featured) {
                $featured = (clone $publishedArticles)
                    ->orderByDesc('published_at')
                    ->first();
            }

            $featuredArticle = $featured
                ? $this->formatArticle($featured)
                : null;
        }

        $articlesQuery = clone $publishedArticles;

        if ($featuredArticle) {
            $articlesQuery->where('id', '!=', $featuredArticle['id']);
        }

        $articles = $articlesQuery
            ->orderByDesc('published_at')
            ->paginate(9)
            ->withQueryString()
            ->through(fn (NewsArticle $article) => $this->formatArticle($article));

        $categories = NewsCategory::query()
            ->whereHas('articles', function ($query) {
                $query->published();
            })
            ->withCount([
                'articles as published_articles_count' => function ($query) {
                    $query->published();
                },
            ])
            ->orderBy('name')
            ->get(['id', 'name', 'slug'])
            ->map(fn ($category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'articles_count' => $category->published_articles_count,
            ]);

        return Inertia::render('UserPage/News/Index', [
            'featuredArticle' => $featuredArticle,
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $article = NewsArticle::query()
            ->published()
            ->with([
                'category:id,name,slug',
                'author:id,name',
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment the view count for this published article.
        $article->increment('views_count');
        $article->refresh();

        $relatedArticles = NewsArticle::query()
            ->published()
            ->with('category:id,name,slug')
            ->where('id', '!=', $article->id)
            ->when(
                $article->news_category_id,
                fn ($query) => $query->where(
                    'news_category_id',
                    $article->news_category_id
                )
            )
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn ($related) => $this->formatArticle($related));

        return Inertia::render('UserPage/News/Show', [
            'article' => $this->formatArticle($article, true),
            'relatedArticles' => $relatedArticles,
        ]);
    }

    private function formatArticle(
        NewsArticle $article,
        bool $includeContent = false
    ): array {
        $data = [
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'excerpt' => $article->excerpt,
            'featured_image' => $article->featured_image_url,
            'status' => $article->status,
            'is_featured' => $article->is_featured,
            'published_at' => $article->published_at?->toISOString(),
            'formatted_date' => $article->published_at?->format('F j, Y'),
            'views_count' => $article->views_count,
            'meta_title' => $article->meta_title,
            'meta_description' => $article->meta_description,
            'category' => $article->category ? [
                'id' => $article->category->id,
                'name' => $article->category->name,
                'slug' => $article->category->slug,
            ] : null,
            'author' => $article->author?->name,
        ];

        if ($includeContent) {
            $data['content'] = $article->content;
        }

        return $data;
    }
}