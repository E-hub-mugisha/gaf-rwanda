<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Event;
use App\Models\EventGallery;
use App\Models\Faq;
use App\Models\NewsArticle;
use App\Models\Program;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Content search for the admin command palette (Ctrl+K).
 * Returns up to 5 matches per content type, each with a link to edit it.
 */
class AdminSearchController extends Controller
{
    private const LIMIT = 5;

    public function __invoke(Request $request): JsonResponse
    {
        $term = trim((string) $request->query('q', ''));

        if (mb_strlen($term) < 2) {
            return response()->json(['groups' => []]);
        }

        $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $term).'%';

        $groups = [
            $this->group('events', ['en' => 'Events', 'rw' => 'Ibikorwa'], 'bi-calendar-event',
                Event::query()
                    ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('title_rw', 'like', $like))
                    ->latest('starts_at')->limit(self::LIMIT)->get(['id', 'title', 'title_rw', 'status', 'starts_at']),
                fn ($e) => [
                    'title' => $e->title ?: $e->title_rw,
                    'meta' => trim(($e->starts_at?->format('d M Y') ?? '').' · '.$e->status, ' ·'),
                    'url' => route('admin.events.edit', $e->id),
                ]),

            $this->group('news', ['en' => 'News articles', 'rw' => 'Amakuru'], 'bi-newspaper',
                NewsArticle::query()
                    ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('title_rw', 'like', $like))
                    ->latest()->limit(self::LIMIT)->get(['id', 'title', 'title_rw', 'status', 'published_at']),
                fn ($a) => [
                    'title' => $a->title ?: $a->title_rw,
                    'meta' => trim(($a->published_at?->format('d M Y') ?? '').' · '.$a->status, ' ·'),
                    'url' => route('admin.news-articles.edit', $a->id),
                ]),

            $this->group('team', ['en' => 'Team members', 'rw' => 'Abagize itsinda'], 'bi-diagram-3',
                TeamMember::query()
                    ->where(fn ($q) => $q->where('name', 'like', $like)->orWhere('position', 'like', $like)->orWhere('position_rw', 'like', $like))
                    ->orderBy('name')->limit(self::LIMIT)->get(['id', 'name', 'position', 'position_rw']),
                fn ($m) => [
                    'title' => $m->name,
                    'meta' => $m->position ?: $m->position_rw,
                    'url' => route('admin.team.index', ['search' => $m->name]),
                ]),

            $this->group('faqs', ['en' => 'FAQs', 'rw' => 'Ibibazo'], 'bi-question-circle',
                Faq::query()
                    ->where(fn ($q) => $q->where('question', 'like', $like)->orWhere('question_rw', 'like', $like))
                    ->orderBy('sort_order')->limit(self::LIMIT)->get(['id', 'question', 'question_rw']),
                fn ($f) => [
                    'title' => Str::limit($f->question_rw ?: $f->question, 90),
                    'meta' => null,
                    'url' => route('admin.faqs.index', ['search' => Str::limit($f->question_rw ?: $f->question, 40, '')]),
                ]),

            $this->group('galleries', ['en' => 'Galleries', 'rw' => 'Amafoto'], 'bi-images',
                EventGallery::query()
                    ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('title_rw', 'like', $like))
                    ->latest()->limit(self::LIMIT)->get(['id', 'event_id', 'title', 'title_rw']),
                fn ($g) => [
                    'title' => $g->title ?: $g->title_rw,
                    'meta' => null,
                    'url' => route('admin.events.galleries.index', $g->event_id),
                ]),

            $this->group('programs', ['en' => 'Programs', 'rw' => 'Gahunda'], 'bi-collection',
                Program::query()->where('title', 'like', $like)
                    ->orderBy('sort_order')->limit(self::LIMIT)->get(['id', 'title', 'status']),
                fn ($p) => [
                    'title' => $p->title,
                    'meta' => $p->status,
                    'url' => route('admin.programs.edit', $p->id),
                ]),

            $this->group('documents', ['en' => 'Documents', 'rw' => 'Inyandiko'], 'bi-file-earmark-text',
                Document::query()->where('title', 'like', $like)
                    ->latest()->limit(self::LIMIT)->get(['id', 'title']),
                fn ($d) => [
                    'title' => $d->title,
                    'meta' => null,
                    'url' => route('admin.documents.edit', $d->id),
                ]),

            $this->group('users', ['en' => 'Users', 'rw' => 'Abakoresha'], 'bi-people',
                User::query()
                    ->where(fn ($q) => $q->where('name', 'like', $like)->orWhere('email', 'like', $like))
                    ->orderBy('name')->limit(self::LIMIT)->get(['id', 'name', 'email', 'role']),
                fn ($u) => [
                    'title' => $u->name,
                    'meta' => $u->email,
                    'url' => route('admin.users.edit', $u->id),
                ]),
        ];

        return response()->json([
            'groups' => array_values(array_filter($groups, fn ($group) => count($group['items']) > 0)),
        ]);
    }

    private function group(string $key, array $label, string $icon, $records, callable $map): array
    {
        return [
            'key' => $key,
            'label' => $label,
            'icon' => $icon,
            'items' => $records->map(fn ($record) => ['id' => $record->id] + $map($record))->values()->all(),
        ];
    }
}
