<?php

namespace App\Support;

/**
 * Turns LinkedIn and Instagram post links (or their official embed codes)
 * into embed URLs for the home page social media section.
 *
 * LinkedIn, accepted:
 *   https://www.linkedin.com/posts/gaf-rwanda_title-activity-7212345678901234567-AbCd
 *   https://www.linkedin.com/feed/update/urn:li:activity:7212345678901234567/
 *   <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7212..."></iframe>
 *   -> https://www.linkedin.com/embed/feed/update/urn:li:activity:7212345678901234567
 *
 * Instagram, accepted:
 *   https://www.instagram.com/p/C8abcDEF123/   (also /reel/ and /tv/)
 *   <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/...">
 *   -> https://www.instagram.com/p/C8abcDEF123/embed
 */
class SocialEmbed
{
    /** Most posts shown per network. */
    public const LIMIT = 6;

    public static function linkedin(?string $value): ?string
    {
        $value = self::source($value);

        if (! $value || ! preg_match('~linkedin\.com~i', $value)) {
            return null;
        }

        // urn:li:activity:123 / urn:li:share:123 / urn:li:ugcPost:123
        if (preg_match('~urn:li:(activity|share|ugcPost):(\d+)~i', urldecode($value), $match)) {
            return 'https://www.linkedin.com/embed/feed/update/urn:li:'.$match[1].':'.$match[2];
        }

        // /posts/name_title-activity-123-abcd
        if (preg_match('~activity-(\d{10,})~i', $value, $match)) {
            return 'https://www.linkedin.com/embed/feed/update/urn:li:activity:'.$match[1];
        }

        return null;
    }

    public static function instagram(?string $value): ?string
    {
        $value = self::source($value, 'data-instgrm-permalink');

        if (! $value) {
            return null;
        }

        if (preg_match('~instagram\.com/(?:[\w.]+/)?(p|reel|tv)/([\w-]+)~i', $value, $match)) {
            $type = strtolower($match[1]) === 'tv' ? 'p' : strtolower($match[1]);

            return 'https://www.instagram.com/'.$type.'/'.$match[2].'/embed';
        }

        return null;
    }

    /** Non-empty lines of a textarea. */
    public static function lines(?string $text): array
    {
        return array_values(array_filter(array_map('trim', preg_split('/\R/', (string) $text) ?: [])));
    }

    /**
     * Embed URLs for every valid line (duplicates removed, up to LIMIT).
     *
     * @param  callable(string): ?string  $convert
     */
    public static function embeds(?string $text, callable $convert): array
    {
        $urls = [];

        foreach (self::lines($text) as $line) {
            $url = $convert($line);
            if ($url && ! in_array($url, $urls, true)) {
                $urls[] = $url;
            }
        }

        return array_slice($urls, 0, self::LIMIT);
    }

    /** Lines that are not a valid post for the given network. */
    public static function invalidLines(?string $text, callable $convert): array
    {
        return array_values(array_filter(self::lines($text), fn ($line) => $convert($line) === null));
    }

    /**
     * Take the link out of embed code: an iframe src, or a given attribute
     * (Instagram's data-instgrm-permalink). Plain links pass through.
     */
    private static function source(?string $value, ?string $attribute = null): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        $value = trim($value);

        if ($attribute && preg_match('/'.preg_quote($attribute, '/').'=["\']([^"\']+)["\']/i', $value, $match)) {
            return html_entity_decode($match[1], ENT_QUOTES | ENT_HTML5);
        }

        if (preg_match('/<iframe[^>]*\ssrc=["\']([^"\']+)["\']/i', $value, $match)) {
            return html_entity_decode($match[1], ENT_QUOTES | ENT_HTML5);
        }

        return $value;
    }
}
