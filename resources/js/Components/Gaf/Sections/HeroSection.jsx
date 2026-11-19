import React from "react";
import { useGaf } from "@/Context/GafContext";
import { vimeoEmbedUrl } from "@/lib/vimeo";

// Home hero: text and buttons on the left, the study lead's video on the
// right. Without a video, the hero image is shown in the same frame.
export default function HeroSection() {
    const { t, site } = useGaf();

    // Embedded Vimeo video in background mode: plays muted on a loop with
    // the player controls and action buttons (like, share...) hidden.
    const embedUrl = vimeoEmbedUrl(site.heroVideo, { background: true });

    const imageUrl = site.heroImage || site.heroVideoThumbnail || null;

    return (
        <section className="gaf-hero-split" id="home">
            <div className="gaf-container gaf-hero-split-grid">
                <div className="gaf-hero-split-content">

                    <h1>{t.hero.title}</h1>

                    <span className="gaf-hero-rule" aria-hidden="true" />

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
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
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
