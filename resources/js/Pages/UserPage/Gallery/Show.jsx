import React, { useCallback, useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { AlbumCard, Breadcrumbs, EmptyState, Lightbox, SectionTitle, ShareLinks } from "@/Components/Gaf/Page";
import { formatDate, localized, pick } from "@/lib/gafLocale";
import { vimeoEmbedUrl } from "@/lib/vimeo";

// External gallery videos can be YouTube or Vimeo links.
const embedUrl = (url) => {
    if (!url) return null;

    const vimeo = vimeoEmbedUrl(url);
    if (vimeo) return vimeo;

    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
            const id = parsed.pathname.split("/").filter(Boolean)[0];
            return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
        }

        if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
            const id = parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
            return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
        }
    } catch {
        return null;
    }

    return null;
};

const isFileVideo = (media) =>
    (media.mime_type || "").startsWith("video/") || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(media.media_url || "");

function VideoCard({ media, lang, t }) {
    const caption = localized(media, "caption", lang);
    const embed = embedUrl(media.media_url);

    return (
        <figure className="gp-video">
            <div className="gp-video-frame">
                {embed ? (
                    <iframe src={embed} title={caption || t.video} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />
                ) : isFileVideo(media) ? (
                    <video src={media.media_url} controls preload="metadata" playsInline>
                        {t.videoUnsupported}
                    </video>
                ) : (
                    <a href={media.media_url} target="_blank" rel="noopener noreferrer" className="gp-video-link">
                        <i className="bi bi-play-circle" aria-hidden="true" />
                        {t.watchVideo}
                    </a>
                )}
            </div>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

// Photo tile; a photo that fails to load becomes a placeholder tile.
function MasonryImage({ item, lang, fallbackAlt, label, onOpen }) {
    const [failed, setFailed] = useState(false);
    const caption = localized(item, "caption", lang);

    if (failed) {
        return (
            <div className="gp-masonry-item is-broken" aria-hidden="true">
                <i className="bi bi-image" />
                {caption && <span>{caption}</span>}
            </div>
        );
    }

    return (
        <button type="button" className="gp-masonry-item" onClick={onOpen} aria-label={`${label}${caption ? `: ${caption}` : ""}`}>
            <img src={item.media_url} alt={localized(item, "alt_text", lang) || caption || fallbackAlt} loading="lazy" onError={() => setFailed(true)} />
            <span className="gp-masonry-hover">
                <i className="bi bi-arrows-angle-expand" aria-hidden="true" />
                {caption && <span>{caption}</span>}
            </span>
        </button>
    );
}

const capitalize = (text = "") => text.charAt(0).toUpperCase() + text.slice(1);

export default function Show({ gallery, relatedGalleries = [] }) {
    const { lang, t: content } = useGaf();
    const t = content.galleryPage;

    const [tab, setTab] = useState("all");
    const [open, setOpen] = useState(null);

    const title = localized(gallery, "title", lang);
    const description = localized(gallery, "description", lang);
    const eventTitle = localized(gallery.event, "title", lang);

    const media = (gallery.public_media || gallery.publicMedia || []).filter((item) => item.media_url);
    const images = media.filter((item) => item.type === "image");
    const videos = media.filter((item) => item.type === "video");

    const showImages = tab !== "videos" && images.length > 0;
    const showVideos = tab !== "photos" && videos.length > 0;

    const close = useCallback(() => setOpen(null), []);
    const move = useCallback(
        (step) => setOpen((current) => (current === null ? null : (current + step + images.length) % images.length)),
        [images.length]
    );

    const tabs = [
        { key: "all", label: pick(lang, { en: "All", rw: "Byose" }), count: media.length },
        { key: "photos", label: capitalize(t.photos), count: images.length },
        { key: "videos", label: capitalize(t.videos), count: videos.length },
    ].filter((item) => item.key === "all" || item.count > 0);

    return (
        <>
            <Head title={`${title} | GAF Rwanda`}>
                <meta head-key="description" name="description" content={description || title} />
                {gallery.cover_image_url && <meta head-key="og:image" property="og:image" content={gallery.cover_image_url} />}
            </Head>

            <main className="gp-page">
                <section className="gp-detail-hero">
                    <div className="gaf-container gp-detail-hero-inner">
                        <Breadcrumbs
                            items={[
                                { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                                { label: t.title, href: route("gallery.index") },
                                { label: title },
                            ]}
                        />

                        {eventTitle && gallery.event?.slug && (
                            <Link href={route("events.show", { event: gallery.event.slug })} className="gp-tag">
                                <i className="bi bi-calendar-event" aria-hidden="true" /> {eventTitle}
                            </Link>
                        )}

                        <h1>{title}</h1>
                        {description && <p className="gp-detail-lead">{description}</p>}

                        <ul className="gp-meta is-large">
                            {gallery.event?.starts_at && (
                                <li>
                                    <i className="bi bi-calendar3" aria-hidden="true" />
                                    {formatDate(gallery.event.starts_at, lang)}
                                </li>
                            )}
                            <li>
                                <i className="bi bi-image" aria-hidden="true" />
                                {images.length} {t.photos}
                            </li>
                            {videos.length > 0 && (
                                <li>
                                    <i className="bi bi-play-btn" aria-hidden="true" />
                                    {videos.length} {t.videos}
                                </li>
                            )}
                        </ul>
                    </div>
                </section>

                <div className="gaf-container gp-content">
                    {media.length ? (
                        <>
                            <div className="gp-toolbar is-split">
                                <div className="gp-tabs">
                                    {tabs.map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            className={tab === item.key ? "is-active" : ""}
                                            onClick={() => setTab(item.key)}
                                        >
                                            {item.label}
                                            <span>{item.count}</span>
                                        </button>
                                    ))}
                                </div>
                                <ShareLinks title={title} lang={lang} />
                            </div>

                            {showImages && (
                                <section className="gp-section">
                                    {tab === "all" && <SectionTitle eyebrow={t.photoCollection} title={capitalize(t.photos)} aside={<span className="gp-count">{images.length}</span>} />}
                                    <div className="gp-masonry">
                                        {images.map((item, index) => (
                                            <MasonryImage
                                                key={item.id}
                                                item={item}
                                                lang={lang}
                                                fallbackAlt={title}
                                                label={t.openImage}
                                                onOpen={() => setOpen(index)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {showVideos && (
                                <section className="gp-section">
                                    {tab === "all" && <SectionTitle eyebrow={t.videoCollection} title={capitalize(t.videos)} aside={<span className="gp-count">{videos.length}</span>} />}
                                    <div className="gp-video-grid">
                                        {videos.map((item) => (
                                            <VideoCard key={item.id} media={item} lang={lang} t={t} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ) : (
                        <EmptyState icon="bi-images" title={t.noMedia} text={t.noMediaIntro} />
                    )}

                    <Link href={route("gallery.index")} className="gp-back">
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        {t.backToGallery}
                    </Link>
                </div>

                {relatedGalleries.length > 0 && (
                    <section className="gp-related">
                        <div className="gaf-container">
                            <SectionTitle
                                eyebrow={t.moreCollections}
                                title={t.related}
                                aside={
                                    <Link href={route("gallery.index")} className="gp-card-link">
                                        {t.viewAll}
                                        <i className="bi bi-arrow-right" aria-hidden="true" />
                                    </Link>
                                }
                            />
                            <div className="gp-album-grid">
                                {relatedGalleries.map((item) => (
                                    <AlbumCard
                                        key={item.id}
                                        href={route("gallery.show", { slug: item.slug })}
                                        image={item.cover_image_url}
                                        title={localized(item, "title", lang)}
                                        count={item.media_count || 0}
                                        cta={t.viewGallery}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {open !== null && <Lightbox images={images} index={open} onClose={close} onMove={move} lang={lang} t={t} />}
        </>
    );
}

Show.layout = (page) => <GafLayout>{page}</GafLayout>;
