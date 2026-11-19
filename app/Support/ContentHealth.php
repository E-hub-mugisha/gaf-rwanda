<?php

namespace App\Support;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventGallery;
use App\Models\Faq;
use App\Models\HeroMedia;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Builder;

/**
 * "Missing information" checks for the admin dashboard.
 *
 * Each check returns how many items have a gap (no translation, no image,
 * no summary, no location, still a draft...) plus the first few items with
 * a direct link to fix them, so nothing is forgotten before publishing.
 */
class ContentHealth
{
    private const SAMPLE = 4;

    public static function report(): array
    {
        $checks = [
            // Events
            self::check('events-rw', 'bi-translate', 'warning',
                ['en' => 'Events without a Kinyarwanda title', 'rw' => 'Ibikorwa bidafite umutwe mu Kinyarwanda'],
                Event::query()->where(fn ($q) => self::blank($q, 'title_rw')),
                fn ($e) => [$e->title, route('admin.events.edit', $e->id)]),

            self::check('events-image', 'bi-image', 'warning',
                ['en' => 'Events without a cover image', 'rw' => 'Ibikorwa bidafite ifoto'],
                Event::query()->where(fn ($q) => self::blank($q, 'cover_image')),
                fn ($e) => [$e->title ?: $e->title_rw, route('admin.events.edit', $e->id)]),

            self::check('events-summary', 'bi-text-paragraph', 'info',
                ['en' => 'Events without a short summary', 'rw' => 'Ibikorwa bidafite incamake'],
                Event::query()->where(fn ($q) => self::blank($q, 'excerpt')->where(fn ($r) => self::blank($r, 'excerpt_rw'))),
                fn ($e) => [$e->title ?: $e->title_rw, route('admin.events.edit', $e->id)]),

            self::check('events-location', 'bi-geo-alt', 'info',
                ['en' => 'Events without a location', 'rw' => 'Ibikorwa bidafite aho bibera'],
                Event::query()->where(fn ($q) => self::blank($q, 'venue')->where(fn ($r) => self::blank($r, 'city'))),
                fn ($e) => [$e->title ?: $e->title_rw, route('admin.events.edit', $e->id)]),

            self::check('events-draft', 'bi-pencil-square', 'muted',
                ['en' => 'Events still in draft', 'rw' => 'Ibikorwa bitaratangazwa'],
                Event::query()->where('status', 'draft'),
                fn ($e) => [$e->title ?: $e->title_rw, route('admin.events.edit', $e->id)]),

            // News
            self::check('news-rw', 'bi-translate', 'warning',
                ['en' => 'Articles without Kinyarwanda text', 'rw' => 'Inkuru zidafite inyandiko mu Kinyarwanda'],
                NewsArticle::query()->where(fn ($q) => self::blank($q, 'title_rw')->orWhere(fn ($r) => self::blank($r, 'content_rw'))),
                fn ($a) => [$a->title, route('admin.news-articles.edit', $a->id)]),

            self::check('news-image', 'bi-image', 'warning',
                ['en' => 'Articles without a featured image', 'rw' => 'Inkuru zidafite ifoto'],
                NewsArticle::query()->where(fn ($q) => self::blank($q, 'featured_image')),
                fn ($a) => [$a->title ?: $a->title_rw, route('admin.news-articles.edit', $a->id)]),

            self::check('news-summary', 'bi-text-paragraph', 'info',
                ['en' => 'Articles without a summary', 'rw' => 'Inkuru zidafite incamake'],
                NewsArticle::query()->where(fn ($q) => self::blank($q, 'excerpt')->where(fn ($r) => self::blank($r, 'excerpt_rw'))),
                fn ($a) => [$a->title ?: $a->title_rw, route('admin.news-articles.edit', $a->id)]),

            self::check('news-draft', 'bi-pencil-square', 'muted',
                ['en' => 'Articles still in draft', 'rw' => 'Inkuru zitaratangazwa'],
                NewsArticle::query()->where('status', 'draft'),
                fn ($a) => [$a->title ?: $a->title_rw, route('admin.news-articles.edit', $a->id)]),

            // Team
            self::check('team-photo', 'bi-person-bounding-box', 'warning',
                ['en' => 'Active team members without a photo', 'rw' => 'Abagize itsinda badafite ifoto'],
                TeamMember::query()->where('is_active', true)->where(fn ($q) => self::blank($q, 'photo')),
                fn ($m) => [$m->name, route('admin.team.index', ['search' => $m->name])]),

            self::check('team-rw', 'bi-translate', 'info',
                ['en' => 'Team members without a Kinyarwanda position', 'rw' => 'Abagize itsinda badafite umwanya mu Kinyarwanda'],
                TeamMember::query()->where('is_active', true)
                    ->where(fn ($q) => $q->whereNotNull('position')->where('position', '!=', ''))
                    ->where(fn ($q) => self::blank($q, 'position_rw')),
                fn ($m) => [$m->name, route('admin.team.index', ['search' => $m->name])]),

            // FAQs
            self::check('faqs-en', 'bi-translate', 'info',
                ['en' => 'FAQs without an English version', 'rw' => 'Ibibazo bidafite icyongereza'],
                Faq::query()->where(fn ($q) => self::blank($q, 'question')),
                fn ($f) => [$f->question_rw, route('admin.faqs.index')]),

            self::check('faqs-rw', 'bi-translate', 'warning',
                ['en' => 'FAQs without a Kinyarwanda version', 'rw' => 'Ibibazo bidafite Ikinyarwanda'],
                Faq::query()->where(fn ($q) => self::blank($q, 'question_rw')),
                fn ($f) => [$f->question, route('admin.faqs.index')]),

            // Galleries
            self::check('galleries-cover', 'bi-image', 'info',
                ['en' => 'Galleries without a cover image', 'rw' => 'Amafoto adafite ifoto y’imbere'],
                EventGallery::query()->where(fn ($q) => self::blank($q, 'cover_image')),
                fn ($g) => [$g->title ?: $g->title_rw, route('admin.events.galleries.index', $g->event_id)]),

            self::check('galleries-empty', 'bi-images', 'warning',
                ['en' => 'Galleries with no photos or videos', 'rw' => 'Amafoto atarimo ifoto cyangwa video'],
                EventGallery::query()->doesntHave('media'),
                fn ($g) => [$g->title ?: $g->title_rw, route('admin.events.galleries.index', $g->event_id)]),

            // Categories
            self::check('categories-rw', 'bi-tags', 'info',
                ['en' => 'Categories without a Kinyarwanda name', 'rw' => 'Ibyiciro bidafite izina mu Kinyarwanda'],
                EventCategory::query()->where(fn ($q) => self::blank($q, 'name_rw')),
                fn ($c) => [$c->name, route('admin.event-categories.edit', $c->id)]),

            self::check('news-categories-rw', 'bi-folder2-open', 'info',
                ['en' => 'News categories without a Kinyarwanda name', 'rw' => 'Ibyiciro by’amakuru bidafite izina mu Kinyarwanda'],
                NewsCategory::query()->where(fn ($q) => self::blank($q, 'name_rw')),
                fn ($c) => [$c->name, route('admin.news-categories.index')]),
        ];

        // Homepage hero
        if (! HeroMedia::where('is_active', true)->exists()) {
            $checks[] = [
                'key' => 'hero-none',
                'icon' => 'bi-play-btn',
                'tone' => 'warning',
                'label' => ['en' => 'No active homepage video or banner', 'rw' => 'Nta video cyangwa ifoto ikora ahabanza'],
                'count' => 1,
                'items' => [['title' => null, 'url' => route('admin.hero-media.index')]],
                'url' => route('admin.hero-media.index'),
            ];
        }

        $issues = array_values(array_filter($checks, fn ($check) => $check['count'] > 0));

        $toneOrder = ['warning' => 0, 'info' => 1, 'muted' => 2];
        usort($issues, fn ($a, $b) => [$toneOrder[$a['tone']], -$a['count']] <=> [$toneOrder[$b['tone']], -$b['count']]);

        return [
            'total' => array_sum(array_column($issues, 'count')),
            'checks' => count($checks),
            'issues' => $issues,
        ];
    }

    private static function check(string $key, string $icon, string $tone, array $label, Builder $query, callable $map): array
    {
        $count = (clone $query)->count();
        $items = $count
            ? (clone $query)->latest('id')->limit(self::SAMPLE)->get()->map(function ($record) use ($map) {
                [$title, $url] = $map($record);

                return ['title' => $title, 'url' => $url];
            })->all()
            : [];

        return [
            'key' => $key,
            'icon' => $icon,
            'tone' => $tone,
            'label' => $label,
            'count' => $count,
            'items' => $items,
            'url' => $items[0]['url'] ?? null,
        ];
    }

    /** Column is null or empty. */
    private static function blank($query, string $column)
    {
        return $query->where(fn ($q) => $q->whereNull($column)->orWhere($column, ''));
    }
}
