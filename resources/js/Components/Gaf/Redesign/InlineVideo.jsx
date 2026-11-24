import React, { useEffect, useRef, useState } from "react";
import { vimeoEmbedUrl } from "@/lib/vimeo";

// Vimeo video that plays inside the page (never opens Vimeo), once, without repeating.
// - Starts by itself (muted, as browsers require) when half of it is on screen.
// - Clicking the picture before that starts it with sound.
export default function InlineVideo({ url, poster, title }) {
    const box = useRef(null);
    const [mode, setMode] = useState(null); // null = picture, "auto" = muted autoplay, "click" = with sound

    useEffect(() => {
        if (mode || !box.current || !("IntersectionObserver" in window)) return undefined;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setMode("auto");
                    io.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        io.observe(box.current);
        return () => io.disconnect();
    }, [mode]);

    const src = mode ? vimeoEmbedUrl(url, { autoplay: true, muted: mode === "auto", loop: false }) : null;

    return (
        <div className="rd-video-frame" ref={box}>
            {src ? (
                <iframe
                    src={src}
                    title={title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <button type="button" className="rd-video-poster" onClick={() => setMode("click")} aria-label={title}>
                    <img src={poster} alt="" />
                    <span className="rd-play" aria-hidden="true">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                </button>
            )}
        </div>
    );
}
