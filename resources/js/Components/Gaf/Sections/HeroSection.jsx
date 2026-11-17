import React from "react";
import { useGaf } from "@/Context/GafContext";

function getYouTubeId(url) {
    if (!url) return null;

    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
            return parsed.pathname.split("/").filter(Boolean)[0] || null;
        }

        if (
            ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
        ) {
            if (parsed.pathname === "/watch") {
                return parsed.searchParams.get("v");
            }

            return parsed.pathname.match(
                /^\/(?:embed|shorts|live)\/([^/?]+)/
            )?.[1] || null;
        }
    } catch {
        return null;
    }

    return null;
}

// Home hero: text and buttons on the left, the study lead's video on the
// right. Without a video, the hero image is shown in the same frame.
export default function HeroSection() {
    const { t, site } = useGaf();

    const videoId = getYouTubeId(site.heroVideo);

    // Muted autoplay with controls so visitors can unmute and replay.
    const embedUrl = videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&playsinline=1&modestbranding=1`
        : null;

    const imageUrl =
        site.heroImage ||
        (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null);

    return (
        <section className="gaf-hero-split" id="home">
            <div className="gaf-container gaf-hero-split-grid">
                <div className="gaf-hero-split-content">
                    <p className="gaf-eyebrow gaf-eyebrow-light">
                        {t.hero.eyebrow}
                    </p>

                    <h1>{t.hero.title}</h1>

                    <span className="gaf-hero-split-divider" aria-hidden="true">
                        <i />
                    </span>

                    <p className="gaf-hero-split-intro">{t.hero.intro}</p>

                    <div className="gaf-hero-split-actions">
                        <a className="gaf-hero-btn gaf-hero-btn-primary" href="#research">
                            {t.hero.secondary}
                            <span aria-hidden="true">→</span>
                        </a>

                        <a
                            className="gaf-hero-btn gaf-hero-btn-outline"
                            href={site.surveyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {t.hero.primary}
                        </a>
                    </div>
                </div>

                <div className="gaf-hero-split-visual">
                    <div className="gaf-hero-split-frame">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={t.ui.heroVideoTitle}
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        ) : (
                            imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={site.altText || t.ui.heroAlt}
                                />
                            )
                        )}
                    </div>

                    {embedUrl && (
                        <p className="gaf-hero-split-caption">
                            <span aria-hidden="true">▶</span>
                            {t.ui.heroVideoTitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
