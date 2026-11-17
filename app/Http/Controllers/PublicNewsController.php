<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicNewsController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));
        $category = $request->input('category');

        $articlesQuery = NewsArticle::query()
            ->published()
            ->with([
                'category:id,name,name_rw,slug',
                'author:id,name',
            ]);

        if ($search !== '') {
            $articlesQuery->where(function ($query) use ($search) {
                $query
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('title_rw', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('excerpt_rw', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('content_rw', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $articlesQuery->whereHas('category', function ($query) use ($category) {
                $query->where('slug', $category);
            });
        }

        $featuredArticle = (clone $articlesQuery)
            ->where('is_featured', true)
            ->orderByDesc('published_at')
            ->first();

        $articles = (clone $articlesQuery)
            ->when(
                $featuredArticle,
                fn ($query) => $query->where('id', '!=', $featuredArticle->id)
            )
            ->orderByDesc('published_at')
            ->paginate(9)
            ->withQueryString();

        $categories = NewsCategory::query()
            ->active()
            ->whereHas('articles', function ($query) {
                $query->published();
            })
            ->withCount([
                'articles as published_articles_count' => function ($query) {
                    $query->published();
                },
            ])
            ->orderBy('sort_order')
            ->get([
                'id',
                'name',
                'name_rw',
                'slug',
            ]);

        return Inertia::render('UserPage/News/Index', [
            'featuredArticle' => $featuredArticle,
            'articles' => $articles,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function show(string $slug)
    {
        $article = NewsArticle::query()
            ->published()
            ->where('slug', $slug)
            ->with([
                'category:id,name,name_rw,slug',
                'author:id,name',
            ])
            ->firstOrFail();

        // Increment the view counter once per page request.
        $article->increment('views_count');

        $article->refresh();

        $relatedArticles = NewsArticle::query()
            ->published()
            ->where('id', '!=', $article->id)
            ->when(
                $article->news_category_id,
                fn ($query) => $query->where(
                    'news_category_id',
                    $article->news_category_id
                )
            )
            ->with([
                'category:id,name,name_rw,slug',
            ])
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('UserPage/News/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
