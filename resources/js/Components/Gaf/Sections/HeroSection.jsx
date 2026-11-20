import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGaf } from "@/Context/GafContext";
import { vimeoEmbedUrl } from "@/lib/vimeo";

// Home hero: text and buttons on the left, the study lead's video on the
// right. Without a video, the hero image is shown in the same frame.
export default function HeroSection() {
    const { t, tr, site } = useGaf();
    const frameRef = useRef(null);
    const soundButtonRef = useRef(null);
    const userMutedRef = useRef(false);
    const [soundOn, setSoundOn] = useState(false);

    // Embedded Vimeo video in background mode: no player controls or action
    // buttons (like, share...). It plays with sound by default and the
    // visitor can mute it with the sound button.
    //
    // Browsers block sound on autoplay until the visitor has interacted
    // with the site, so the video starts muted and sound is switched on
    // (through Vimeo's player API) as soon as it is allowed: right away
    // when the visitor came from another page of the site, otherwise on
    // their first click, tap or key press anywhere on the page.
    const embedUrl = vimeoEmbedUrl(site.heroVideo, { background: true });

    const vimeo = useCallback((method, value) => {
        const player = frameRef.current?.contentWindow;
        if (!player) return;
        player.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), "https://player.vimeo.com");
    }, []);

    const unmute = useCallback(() => {
        vimeo("setMuted", false);
        vimeo("setVolume", 1);
        vimeo("play");
        setSoundOn(true);
    }, [vimeo]);

    const mute = useCallback(() => {
        vimeo("setVolume", 0);
        vimeo("setMuted", true);
        setSoundOn(false);
    }, [vimeo]);

    useEffect(() => {
        if (!embedUrl) return undefined;

        let ready = false;
        let activated = typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive;

        const tryUnmute = () => {
            if (ready && activated && !userMutedRef.current) unmute();
        };

        // The player says "ready" once it has loaded.
        const onMessage = (event) => {
            if (event.origin !== "https://player.vimeo.com" || event.source !== frameRef.current?.contentWindow) return;
            let data = event.data;
            try {
                data = typeof data === "string" ? JSON.parse(data) : data;
            } catch {
                return;
            }
            if (data?.event === "ready" && !ready) {
                ready = true;
                tryUnmute();
            }
        };

        // First interaction anywhere (except the sound button, which
        // handles itself) allows sound.
        const onInteract = (event) => {
            if (soundButtonRef.current?.contains(event.target)) return;
            activated = true;
            tryUnmute();
            removeInteract();
        };

        const events = ["pointerdown", "keydown", "touchstart"];
        const removeInteract = () => events.forEach((name) => window.removeEventListener(name, onInteract, true));

        // Fallback in case the "ready" message is missed.
        const frame = frameRef.current;
        let loadTimer;
        const onLoad = () => {
            loadTimer = setTimeout(() => {
                ready = true;
                tryUnmute();
            }, 1500);
        };
        frame?.addEventListener("load", onLoad);

        window.addEventListener("message", onMessage);
        events.forEach((name) => window.addEventListener(name, onInteract, true));

        return () => {
            window.removeEventListener("message", onMessage);
            frame?.removeEventListener("load", onLoad);
            clearTimeout(loadTimer);
            removeInteract();
        };
    }, [embedUrl, unmute]);

    const toggleSound = () => {
        if (soundOn) {
            userMutedRef.current = true;
            mute();
        } else {
            userMutedRef.current = false;
            unmute();
        }
    };

    const soundLabel = soundOn
        ? tr({ en: "Mute", rw: "Funga amajwi" })
        : tr({ en: "Turn sound on", rw: "Fungura amajwi" });

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
                                ref={frameRef}
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

                        {embedUrl && (
                            <button
                                type="button"
                                ref={soundButtonRef}
                                className={`gaf-hero-sound ${soundOn ? "is-on" : ""}`}
                                onClick={toggleSound}
                                aria-pressed={soundOn}
                                aria-label={soundLabel}
                            >
                                <i className={`bi ${soundOn ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`} aria-hidden="true" />
                                <span>{soundLabel}</span>
                            </button>
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
