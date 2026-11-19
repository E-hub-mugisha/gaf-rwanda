<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;
use Throwable;

/**
 * Small helper for Vimeo links used by the homepage hero.
 *
 * Accepted links:
 *   https://vimeo.com/76979871
 *   https://vimeo.com/76979871/abc123def        (unlisted, with privacy hash)
 *   https://vimeo.com/channels/staffpicks/76979871
 *   https://vimeo.com/showcase/123/video/76979871
 *   https://player.vimeo.com/video/76979871?h=abc123def
 */
class Vimeo
{
    /**
     * Take the src out of pasted Vimeo embed code
     * (<iframe src="https://player.vimeo.com/video/..."></iframe>);
     * plain links are returned trimmed.
     */
    public static function source(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $value = trim($value);

        if (preg_match('/<iframe[^>]*\ssrc=["\']([^"\']+)["\']/i', $value, $match)) {
            $value = $match[1];
        }

        return html_entity_decode($value, ENT_QUOTES | ENT_HTML5) ?: null;
    }

    /**
     * Clean link to store: https://player.vimeo.com/video/{id}?h={hash}
     * (keeps the privacy hash of unlisted videos). Null when not Vimeo.
     */
    public static function normalize(?string $value): ?string
    {
        $video = self::parse($value);

        if (! $video) {
            return null;
        }

        return 'https://player.vimeo.com/video/'.$video['id'].($video['hash'] ? '?h='.$video['hash'] : '');
    }

    /** Returns ['id' => ..., 'hash' => ...] or null when the link is not a Vimeo video. */
    public static function parse(?string $url): ?array
    {
        $url = self::source($url);

        if (! $url) {
            return null;
        }

        $parts = parse_url($url);
        $host = strtolower(preg_replace('/^www\./', '', $parts['host'] ?? ''));

        if (! in_array($host, ['vimeo.com', 'player.vimeo.com'], true)) {
            return null;
        }

        $segments = array_values(array_filter(explode('/', $parts['path'] ?? '')));

        // The video id is the last numeric segment; an unlisted hash may follow it.
        $id = null;
        $hash = null;

        foreach ($segments as $index => $segment) {
            if (ctype_digit($segment)) {
                $id = $segment;
                $next = $segments[$index + 1] ?? null;
                $hash = ($next && preg_match('/^[a-f0-9]{6,}$/i', $next)) ? $next : null;
            }
        }

        if (! $id) {
            return null;
        }

        parse_str($parts['query'] ?? '', $query);
        $hash = $hash ?: ($query['h'] ?? null);

        return ['id' => $id, 'hash' => $hash];
    }

    public static function isValid(?string $url): bool
    {
        return self::parse($url) !== null;
    }

    /**
     * Thumbnail from Vimeo's public oEmbed endpoint (no API key needed).
     * Returns null when Vimeo cannot be reached or the video is private.
     */
    public static function thumbnail(?string $url): ?string
    {
        if (! self::isValid($url)) {
            return null;
        }

        try {
            $response = Http::timeout(8)->get('https://vimeo.com/api/oembed.json', [
                'url' => $url,
                'width' => 1280,
            ]);

            return $response->successful() ? $response->json('thumbnail_url') : null;
        } catch (Throwable) {
            return null;
        }
    }
}
