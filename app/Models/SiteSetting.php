<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

/**
 * Site-wide settings (contacts, participation link, social media).
 */
class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    private const CACHE_KEY = 'site_settings.all';

    /**
     * Settings the admin can edit, with their defaults.
     */
    public const DEFAULTS = [
        'email' => 'info@gafrwanda.com',
        'phone' => '0781684259',
        'website' => 'https://gafrwanda.com',
        'survey_url' => 'https://data.castoredc.com/survey/5YQJTSM2',
        // Social profiles (same as defaultSite.socials in gafContent.js).
        'facebook_url' => null,
        'instagram_url' => 'https://www.instagram.com/gafrwanda?exln=MXFmc2owcXV5a2NoMw==',
        'linkedin_url' => 'https://www.linkedin.com/company/guided-act-feel-rwanda/',
        'tiktok_url' => 'https://vm.tiktok.com/ZS9fRjheTpVGf-rmBbH/',
        'threads_url' => 'https://thread.com/gafrwanda',
        'youtube_url' => null,
        'x_url' => null,

        // Home page social media section: one post link (or embed code) per line.
        'linkedin_posts' => null,
        'instagram_posts' => null,
        // Optional live-feed widget (SociableKIT, Juicer, Elfsight...): iframe URL.
        'social_feed_widget_url' => null,
    ];

    public const SOCIALS = [
        'facebook_url' => 'Facebook',
        'instagram_url' => 'Instagram',
        'linkedin_url' => 'LinkedIn',
        'tiktok_url' => 'TikTok',
        'threads_url' => 'Threads',
        'youtube_url' => 'YouTube',
        'x_url' => 'X',
    ];

    /**
     * All settings merged over the defaults.
     */
    public static function allValues(): array
    {
        $stored = Cache::rememberForever(self::CACHE_KEY, function () {
            if (! Schema::hasTable('site_settings')) {
                return [];
            }

            return static::query()->pluck('value', 'key')->all();
        });

        // Defaults merged outside the cache so newly added keys always exist.
        return array_merge(self::DEFAULTS, array_intersect_key($stored, self::DEFAULTS));
    }

    public static function saveMany(array $values): void
    {
        foreach ($values as $key => $value) {
            if (array_key_exists($key, self::DEFAULTS)) {
                static::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }

        Cache::forget(self::CACHE_KEY);
    }

    /**
     * The shape the public website expects (merged over defaultSite in React).
     * Only social networks with a link are included.
     */
    public static function forWebsite(): array
    {
        $values = self::allValues();

        $socials = [];
        foreach (self::SOCIALS as $key => $label) {
            // Skip empty and placeholder ("#") links.
            if (! empty($values[$key]) && $values[$key] !== '#') {
                $socials[] = ['label' => $label, 'url' => $values[$key]];
            }
        }

        return [
            'email' => $values['email'],
            'phone' => $values['phone'],
            'website' => $values['website'],
            'surveyUrl' => $values['survey_url'],
            'socials' => $socials,
            'socialFeed' => [
                'linkedinUrl' => $values['linkedin_url'],
                'instagramUrl' => $values['instagram_url'],
                'linkedin' => \App\Support\SocialEmbed::embeds($values['linkedin_posts'], [\App\Support\SocialEmbed::class, 'linkedin']),
                'instagram' => \App\Support\SocialEmbed::embeds($values['instagram_posts'], [\App\Support\SocialEmbed::class, 'instagram']),
                'widget' => $values['social_feed_widget_url'],
            ],
        ];
    }
}
