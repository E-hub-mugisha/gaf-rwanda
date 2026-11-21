import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGaf } from "@/Context/GafContext";
import { vimeoEmbedUrl } from "@/lib/vimeo";

// Home hero: text and buttons on the left, the study lead's video on the
// right. Without a video, the hero image is shown in the same frame.
//
// The video does not autoplay: a cover image with a play button is shown,
// and the Vimeo player is only loaded when the visitor presses play (so it
// can start with sound). The Vimeo controls and action buttons (like,
// share...) are hidden; our own pause and sound buttons drive the player
// through Vimeo's player API (postMessage).
export default function HeroSection() {
    const { t, tr, site } = useGaf();
    const frameRef = useRef(null);
    const [started, setStarted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    const embedUrl = vimeoEmbedUrl(site.heroVideo, { autoplay: true, controls: false });
    const coverUrl = site.heroVideoThumbnail || site.heroImage || null;
    const imageUrl = site.heroImage || site.heroVideoThumbnail || null;

    const vimeo = useCallback((method, value) => {
        const player = frameRef.current?.contentWindow;
        if (!player) return;
        player.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), "https://player.vimeo.com");
    }, []);

    // Follow the player's play / pause / end events.
    useEffect(() => {
        if (!started) return undefined;

        const onMessage = (event) => {
            if (event.origin !== "https://player.vimeo.com" || event.source !== frameRef.current?.contentWindow) return;
            let data = event.data;
            try {
                data = typeof data === "string" ? JSON.parse(data) : data;
            } catch {
                return;
            }

            if (data?.event === "ready") {
                ["play", "pause", "ended"].forEach((name) => vimeo("addEventListener", name));
            } else if (data?.event === "play") {
                setPlaying(true);
            } else if (data?.event === "pause" || data?.event === "ended") {
                setPlaying(false);
            }
        };

        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [started, vimeo]);

    const start = () => {
        setStarted(true);
        setPlaying(true);
        setSoundOn(true);
    };

    const togglePlay = () => {
        vimeo(playing ? "pause" : "play");
        setPlaying(!playing);
    };

    const toggleSound = () => {
        vimeo("setMuted", soundOn);
        vimeo("setVolume", soundOn ? 0 : 1);
        setSoundOn(!soundOn);
    };

    const playLabel = tr({ en: "Play the video", rw: "Reba videwo" });
    const pauseLabel = playing ? tr({ en: "Pause", rw: "Hagarika" }) : tr({ en: "Play", rw: "Komeza" });
    const soundLabel = soundOn ? tr({ en: "Mute", rw: "Funga amajwi" }) : tr({ en: "Turn sound on", rw: "Fungura amajwi" });

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
                        {embedUrl && started ? (
                            <>
                                <iframe
                                    ref={frameRef}
                                    src={embedUrl}
                                    title={t.ui.heroVideoTitle}
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                                <div className="gaf-hero-video-controls">
                                    <button type="button" className="gaf-hero-control" onClick={togglePlay} aria-label={pauseLabel} title={pauseLabel}>
                                        <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        className="gaf-hero-control"
                                        onClick={toggleSound}
                                        aria-pressed={!soundOn}
                                        aria-label={soundLabel}
                                        title={soundLabel}
                                    >
                                        <i className={`bi ${soundOn ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`} aria-hidden="true" />
                                    </button>
                                </div>
                            </>
                        ) : embedUrl ? (
                            <button type="button" className="gaf-hero-cover" onClick={start} aria-label={playLabel}>
                                {coverUrl && <img src={coverUrl} alt="" aria-hidden="true" />}
                                <span className="gaf-hero-play" aria-hidden="true">
                                    <i className="bi bi-play-fill" />
                                </span>
                                <span className="gaf-hero-play-label">{playLabel}</span>
                            </button>
                        ) : (
                            imageUrl && <img src={imageUrl} alt={site.altText || t.ui.heroAlt} />
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
