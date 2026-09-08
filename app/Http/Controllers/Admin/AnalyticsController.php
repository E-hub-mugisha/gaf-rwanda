<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\PageView;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'max:1000'],
        ]);

        $question = strtolower(trim($validated['question']));

        $documents = Document::count();
        $readers = User::where('role', 'user')->count();
        $admins = User::where('role', 'admin')->count();

        if (
            str_contains($question, 'overview') ||
            str_contains($question, 'summary')
        ) {
            $answer = "Here is the current portal overview: {$documents} documents, {$readers} reader accounts, and {$admins} administrators are currently registered.";

        } elseif (
            str_contains($question, 'document') &&
            (
                str_contains($question, 'how many') ||
                str_contains($question, 'total') ||
                str_contains($question, 'number')
            )
        ) {
            $answer = "The portal currently contains {$documents} documents.";

        } elseif (
            str_contains($question, 'reader') ||
            str_contains($question, 'user')
        ) {
            $answer = "There are currently {$readers} registered reader accounts.";

        } elseif (
            str_contains($question, 'admin')
        ) {
            $answer = "There are currently {$admins} administrator accounts.";

        } else {
            $answer = "I can currently help with portal overviews, document totals, reader accounts and administrator accounts. Try asking: 'Give me a portal overview'.";
        }

        return response()->json([
            'answer' => $answer,
        ]);
    }

    public function index(Request $request): Response
    {
        $page = $request->string('page')->trim()->toString();
        $language = $request->string('language')->trim()->toString();
        $period = $request->string('period')->trim()->toString() ?: '30';

        $allowedPeriods = ['7', '30', '90', '365'];

        if (!in_array($period, $allowedPeriods, true)) {
            $period = '30';
        }

        $days = (int) $period;

        $startDate = now()
            ->subDays($days - 1)
            ->startOfDay();

        /*
         * Base query for filtered analytics.
         */
        $filteredQuery = PageView::query()
            ->where('created_at', '>=', $startDate);

        if ($page !== '') {
            $filteredQuery->where('page', $page);
        }

        if ($language !== '') {
            $filteredQuery->where('language', $language);
        }

        /*
         * KPI statistics
         */
        $totalViews = (clone $filteredQuery)->count();

        $uniqueUsers = (clone $filteredQuery)
            ->distinct('user_id')
            ->count('user_id');

        $todayViews = (clone $filteredQuery)
            ->whereDate('created_at', today())
            ->count();

        $todayUsers = (clone $filteredQuery)
            ->whereDate('created_at', today())
            ->distinct('user_id')
            ->count('user_id');

        /*
         * Returning users:
         *
         * Users who generated more than one tracked view
         * within the selected period.
         */
        $returningUsers = DB::query()
            ->fromSub(
                (clone $filteredQuery)
                    ->select('user_id')
                    ->selectRaw('COUNT(*) as visits')
                    ->groupBy('user_id'),
                'user_visits'
            )
            ->where('visits', '>', 1)
            ->count();

        /*
         * Previous period comparison.
         */
        $previousStart = now()
            ->subDays(($days * 2) - 1)
            ->startOfDay();

        $previousEnd = $startDate
            ->copy()
            ->subSecond();

        $previousQuery = PageView::query()
            ->whereBetween('created_at', [
                $previousStart,
                $previousEnd,
            ]);

        if ($page !== '') {
            $previousQuery->where('page', $page);
        }

        if ($language !== '') {
            $previousQuery->where('language', $language);
        }

        $previousViews = (clone $previousQuery)->count();

        $viewsChange = $this->percentageChange(
            $previousViews,
            $totalViews
        );

        /*
         * Daily chart.
         */
        $dailyRows = (clone $filteredQuery)
            ->selectRaw('DATE(created_at) as date')
            ->selectRaw('COUNT(*) as views')
            ->selectRaw('COUNT(DISTINCT user_id) as users')
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();

        /*
         * Fill missing dates with zero.
         */
        $dailyStats = [];

        for ($i = 0; $i < $days; $i++) {
            $date = $startDate->copy()->addDays($i);

            $key = $date->format('Y-m-d');

            $row = $dailyRows->firstWhere('date', $key);

            $dailyStats[] = [
                'date' => $date->format('M j'),
                'views' => $row ? (int) $row->views : 0,
                'users' => $row ? (int) $row->users : 0,
            ];
        }

        /*
         * Most viewed pages.
         */
        $pageStats = (clone $filteredQuery)
            ->select('page')
            ->selectRaw('COUNT(*) as views')
            ->selectRaw('COUNT(DISTINCT user_id) as users')
            ->groupBy('page')
            ->orderByDesc('views')
            ->limit(10)
            ->get()
            ->map(fn ($item) => [
                'page' => $item->page,
                'views' => (int) $item->views,
                'users' => (int) $item->users,
            ])
            ->values();

        /*
         * Language statistics.
         */
        $languageStats = (clone $filteredQuery)
            ->whereNotNull('language')
            ->select('language')
            ->selectRaw('COUNT(*) as views')
            ->selectRaw('COUNT(DISTINCT user_id) as users')
            ->groupBy('language')
            ->orderByDesc('views')
            ->get()
            ->map(fn ($item) => [
                'language' => $item->language,
                'views' => (int) $item->views,
                'users' => (int) $item->users,
            ])
            ->values();

        /*
         * Recent visitors.
         */
        $recentViews = PageView::query()
            ->with([
                'user:id,name,email',
            ])
            ->latest('created_at')
            ->limit(25)
            ->get([
                'id',
                'user_id',
                'page',
                'language',
                'ip_address',
                'created_at',
            ])
            ->map(fn ($view) => [
                'id' => $view->id,
                'user' => [
                    'id' => $view->user?->id,
                    'name' => $view->user?->name ?? 'Unknown user',
                    'email' => $view->user?->email,
                ],
                'page' => $view->page,
                'language' => $view->language,
                'ip_address' => $view->ip_address,
                'viewed_at' => $view->created_at?->diffForHumans(),
                'created_at' => $view->created_at?->format('M j, Y H:i'),
            ]);

        /*
         * Available pages.
         */
        $pages = PageView::query()
            ->select('page')
            ->distinct()
            ->orderBy('page')
            ->pluck('page')
            ->values();

        /*
         * Available languages.
         */
        $languages = [
            [
                'code' => 'rw',
                'name' => 'Kinyarwanda',
            ],
            [
                'code' => 'en',
                'name' => 'English',
            ],
            [
                'code' => 'fr',
                'name' => 'Français',
            ],
            [
                'code' => 'nl',
                'name' => 'Nederlands',
            ],
        ];

        return Inertia::render('Admin/Analytics/Index', [
            'stats' => [
                'totalViews' => $totalViews,
                'uniqueUsers' => $uniqueUsers,
                'todayViews' => $todayViews,
                'todayUsers' => $todayUsers,
                'returningUsers' => $returningUsers,
                'viewsChange' => $viewsChange,
            ],

            'dailyStats' => $dailyStats,

            'pageStats' => $pageStats,

            'languageStats' => $languageStats,

            'recentViews' => $recentViews,

            'pages' => $pages,

            'languages' => $languages,

            'filters' => [
                'page' => $page,
                'language' => $language,
                'period' => $period,
            ],
        ]);
    }

    private function percentageChange(
        int $previous,
        int $current
    ): float {
        if ($previous === 0) {
            return $current > 0 ? 100 : 0;
        }

        return round(
            (($current - $previous) / $previous) * 100,
            1
        );
    }
}