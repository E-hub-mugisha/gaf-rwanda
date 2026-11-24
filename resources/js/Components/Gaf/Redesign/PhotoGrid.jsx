import React, { useCallback, useState } from "react";
import { useGaf } from "@/Context/GafContext";
import { Lightbox } from "@/Components/Gaf/Page";

// Grid of photos that open full screen (arrow keys / swipe buttons to move).
export default function PhotoGrid({ photos = [], caption = "" }) {
    const { lang } = useGaf();
    const [open, setOpen] = useState(null);
    const images = photos.map((src) => ({ media_url: src, caption }));

    const close = useCallback(() => setOpen(null), []);
    const move = useCallback(
        (step) => setOpen((i) => (i === null ? null : (i + step + images.length) % images.length)),
        [images.length]
    );
    const t = { imagePreview: lang === "rw" ? "Ifoto" : "Photo", close: lang === "rw" ? "Funga" : "Close" };

    return (
        <>
            <div className="rd-photo-grid">
                {photos.map((src, i) => (
                    <button key={src} type="button" className="rd-photo" onClick={() => setOpen(i)} aria-label={`${t.imagePreview} ${i + 1}`}>
                        <img src={src} alt="" loading="lazy" />
                    </button>
                ))}
            </div>
            {open !== null && <Lightbox images={images} index={open} onClose={close} onMove={move} lang={lang} t={t} />}
        </>
    );
}
