<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Document;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventGallery;
use App\Models\Faq;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Models\TeamMember;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'documents' => Document::count(),
            'users' => User::where('role', 'user')->count(),
            'admins' => User::where('role', 'admin')->count(),
        ];

        $recentDocuments = Document::with('versions')->latest()->take(5)->get()->map(fn($doc) => [
            'id' => $doc->id,
            'title' => $doc->title,
            'created_at_human' => $doc->created_at->diffForHumans(),
            'versions' => $doc->versions->map(fn($v) => [
                'id' => $v->id,
                'language' => $v->language,
                'language_label' => $v->languageLabel(),
            ]),
        ]);

        $statistics = [
            'total_events' => Event::count(),

            'upcoming_events' => Event::published()
                ->where('starts_at', '>=', now())
                ->count(),

            'published_news' => NewsArticle::published()
                ->count(),

            'total_galleries' => EventGallery::count(),

            'unread_messages' => ContactMessage::where(
                'status',
                'new'
            )->count(),

            'total_messages' => ContactMessage::count(),
            'team_members' => TeamMember::where('is_active', true)->count(),
            'active_faqs' => Faq::where('is_active', true)->count(),
            'draft_news' => NewsArticle::where('status', 'draft')->count(),
        ];

        // How much of each content type has a Kinyarwanda translation.
        $translations = collect([
            ['key' => 'events', 'model' => Event::class, 'field' => 'title_rw', 'route' => 'admin.events.index'],
            ['key' => 'news', 'model' => NewsArticle::class, 'field' => 'title_rw', 'route' => 'admin.news-articles.index'],
            ['key' => 'faqs', 'model' => Faq::class, 'field' => 'question_rw', 'route' => 'admin.faqs.index'],
            ['key' => 'team', 'model' => TeamMember::class, 'field' => 'position_rw', 'route' => 'admin.team.index'],
            ['key' => 'galleries', 'model' => EventGallery::class, 'field' => 'title_rw', 'route' => 'admin.events.index'],
            ['key' => 'categories', 'model' => EventCategory::class, 'field' => 'name_rw', 'route' => 'admin.event-categories.index'],
            ['key' => 'newsCategories', 'model' => NewsCategory::class, 'field' => 'name_rw', 'route' => 'admin.news-categories.index'],
        ])->map(function ($item) {
            $total = $item['model']::count();
            $translated = $item['model']::whereNotNull($item['field'])
                ->where($item['field'], '!=', '')
                ->count();

            return [
                'key' => $item['key'],
                'total' => $total,
                'translated' => $translated,
                'route' => $item['route'],
            ];
        })->values();

        $recentMessages = ContactMessage::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'subject', 'status', 'created_at'])
            ->map(fn ($message) => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'subject' => $message->subject,
                'status' => $message->status,
                'created_at_human' => $message->created_at?->diffForHumans(),
            ]);

        $recentEvents = Event::with('category')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'category' => $event->category?->name,
                'starts_at' => $event->starts_at?->format('d M Y H:i'),
                'status' => $event->status,
                'timing' => $event->timing,
                'cover_image' => $event->cover_image
                    ? asset('uploads/' . $event->cover_image)
                    : null,
            ]);

        $recentNews = NewsArticle::with('category')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'category' => $article->category?->name,
                'status' => $article->status,
                'published_at' => $article->published_at?->format('d M Y'),
                'featured_image' => $article->featured_image
                    ? asset('uploads/' . $article->featured_image)
                    : null,
            ]);

        return Inertia::render('Admin/Dashboard', compact(
            'stats',
            'recentDocuments',
            'statistics',
            'recentEvents',
            'recentNews',
            'recentMessages',
            'translations',
        ));
    }
}
