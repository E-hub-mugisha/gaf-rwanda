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
        'facebook_url' => null,
        'instagram_url' => null,
        'linkedin_url' => null,
        'youtube_url' => null,
        'x_url' => null,
    ];

    public const SOCIALS = [
        'facebook_url' => 'Facebook',
        'instagram_url' => 'Instagram',
        'linkedin_url' => 'LinkedIn',
        'youtube_url' => 'YouTube',
        'x_url' => 'X',
    ];

    /**
     * All settings merged over the defaults.
     */
    public static function allValues(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function () {
            if (! Schema::hasTable('site_settings')) {
                return self::DEFAULTS;
            }

            $stored = static::query()->pluck('value', 'key')->all();

            return array_merge(self::DEFAULTS, array_intersect_key($stored, self::DEFAULTS));
        });
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
            if (! empty($values[$key])) {
                $socials[] = ['label' => $label, 'url' => $values[$key]];
            }
        }

        return [
            'email' => $values['email'],
            'phone' => $values['phone'],
            'website' => $values['website'],
            'surveyUrl' => $values['survey_url'],
            'socials' => $socials,
        ];
    }
}
