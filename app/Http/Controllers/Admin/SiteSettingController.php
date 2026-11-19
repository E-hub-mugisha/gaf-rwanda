<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Support\SocialEmbed;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => SiteSetting::allValues(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'website' => ['required', 'url', 'max:255'],
            'survey_url' => ['required', 'url', 'max:2048'],
            'facebook_url' => ['nullable', 'url', 'max:2048'],
            'instagram_url' => ['nullable', 'url', 'max:2048'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'tiktok_url' => ['nullable', 'url', 'max:2048'],
            'threads_url' => ['nullable', 'url', 'max:2048'],
            'youtube_url' => ['nullable', 'url', 'max:2048'],
            'x_url' => ['nullable', 'url', 'max:2048'],

            // Home page social media section
            'linkedin_posts' => ['nullable', 'string', 'max:20000', $this->postsRule([SocialEmbed::class, 'linkedin'], 'LinkedIn')],
            'instagram_posts' => ['nullable', 'string', 'max:20000', $this->postsRule([SocialEmbed::class, 'instagram'], 'Instagram')],
            'social_feed_widget_url' => ['nullable', 'url', 'starts_with:https://', 'max:2048'],
        ], [
            'social_feed_widget_url.starts_with' => 'The feed widget link must start with https://.',
        ]);

        SiteSetting::saveMany($validated);

        return back()->with('success', 'Site settings saved.');
    }

    /** Every line must be a post link (or embed code) of the given network. */
    private function postsRule(callable $convert, string $network): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail) use ($convert, $network) {
            $invalid = SocialEmbed::invalidLines($value, $convert);

            if ($invalid) {
                $fail("These lines are not {$network} post links: ".implode(' | ', array_map(
                    fn ($line) => mb_strimwidth($line, 0, 60, '…'),
                    array_slice($invalid, 0, 3)
                )));
            }
        };
    }
}
