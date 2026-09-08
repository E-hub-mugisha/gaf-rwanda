<?php

namespace App\Http\Controllers;

use App\Models\PageView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PageViewController extends Controller
{
    /**
     * Track an authenticated page view.
     *
     * A user/page combination is only recorded once within
     * the configured deduplication window.
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        abort_unless($user, 403);

        $validator = Validator::make($request->all(), [
            'page' => [
                'required',
                'string',
                'max:150',
                'regex:/^[a-zA-Z0-9._-]+$/',
            ],
            'url' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'language' => [
                'nullable',
                'string',
                'max:10',
                'in:rw,en,fr,nl',
            ],
        ]);

        $validated = $validator->validate();

        $page = $validated['page'];

        /*
         * Prevent repeated refreshes from generating unlimited
         * analytics records.
         *
         * One view per user/page every 30 minutes.
         */
        $recentView = PageView::query()
            ->where('user_id', $user->id)
            ->where('page', $page)
            ->where('created_at', '>=', now()->subMinutes(30))
            ->latest('created_at')
            ->first();

        if ($recentView) {
            /*
             * Update language if the user changed language
             * while viewing the same page.
             */
            if (
                !empty($validated['language']) &&
                $recentView->language !== $validated['language']
            ) {
                $recentView->update([
                    'language' => $validated['language'],
                ]);
            }

            return response()->json([
                'success' => true,
                'tracked' => false,
                'message' => 'Recent page view already recorded.',
            ]);
        }

        PageView::create([
            'user_id' => $user->id,
            'page' => $page,
            'url' => $validated['url'] ?? null,
            'language' => $validated['language'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'success' => true,
            'tracked' => true,
        ]);
    }
}