// Helpers for Vimeo links (homepage hero video).
//
// Accepted links:
//   https://vimeo.com/76979871
//   https://vimeo.com/76979871/abc123def        (unlisted, with privacy hash)
//   https://vimeo.com/channels/staffpicks/76979871
//   https://vimeo.com/showcase/123/video/76979871
//   https://player.vimeo.com/video/76979871?h=abc123def
//   <iframe src="https://player.vimeo.com/video/..."></iframe>  (embed code)

/** Take the src out of pasted Vimeo embed code; plain links pass through. */
export function vimeoSource(value) {
    if (!value) return "";
    const text = String(value).trim();
    const match = text.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
    return (match ? match[1] : text).replace(/&amp;/g, "&");
}

export function parseVimeo(url) {
    if (!url) return null;

    try {
        const parsed = new URL(vimeoSource(url));
        const host = parsed.hostname.replace(/^www\./, "");

        if (!["vimeo.com", "player.vimeo.com"].includes(host)) return null;

        const segments = parsed.pathname.split("/").filter(Boolean);
        let id = null;
        let hash = null;

        // The video id is the last numeric segment; an unlisted hash may follow it.
        segments.forEach((segment, index) => {
            if (/^\d+$/.test(segment)) {
                id = segment;
                const next = segments[index + 1];
                hash = next && /^[a-f0-9]{6,}$/i.test(next) ? next : null;
            }
        });

        if (!id) return null;

        return { id, hash: hash || parsed.searchParams.get("h") };
    } catch {
        return null;
    }
}

/**
 * Player URL. Options (all off by default):
 *   autoplay, muted, loop
 *   controls: false    hide the play bar
 *   background: true   no controls or action buttons at all (like, share,
 *                      watch later); plays muted on a loop. Vimeo honours
 *                      this on Plus accounts and higher.
 * dnt=1 stops Vimeo from tracking visitors.
 */
export function vimeoEmbedUrl(url, { autoplay = false, muted = false, loop = false, controls = true, background = false } = {}) {
    const video = parseVimeo(url);
    if (!video) return null;

    const params = new URLSearchParams({
        title: "0",
        byline: "0",
        portrait: "0",
        dnt: "1",
        playsinline: "1",
    });

    if (video.hash) params.set("h", video.hash);
    if (autoplay) params.set("autoplay", "1");
    if (muted) params.set("muted", "1");
    if (loop) {
        params.set("loop", "1");
        params.set("autopause", "0");
    }
    if (!controls) params.set("controls", "0");
    if (background) {
        params.set("background", "1");
        params.set("autoplay", "1");
        params.set("muted", "1");
        params.set("loop", "1");
        params.set("autopause", "0");
    }

    return `https://player.vimeo.com/video/${video.id}?${params.toString()}`;
}
