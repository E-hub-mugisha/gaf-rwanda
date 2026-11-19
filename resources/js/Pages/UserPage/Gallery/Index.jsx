import React, { useCallback, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Breadcrumbs, Cover, EmptyState, Lightbox } from "@/Components/Gaf/Page";
import { formatDate, localized, pick } from "@/lib/gafLocale";

const albumUrl = (gallery) => route("gallery.show", { slug: gallery.slug });

/** Album card: cover photo with item counts, title underneath. */
function Album({ gallery, lang, t }) {
    const title = localized(gallery, "title", lang);

    return (
        <Link href={albumUrl(gallery)} className="al-album">
            <span className="al-album-cover">
                <Cover src={gallery.cover_image_url} alt={title} icon="bi-images" />
                <span className="al-album-counts">
                    <span>
                        <i className="bi bi-image" aria-hidden="true" /> {gallery.image_count || 0}
                    </span>
                    {gallery.video_count > 0 && (
                        <span>
                            <i className="bi bi-play-btn" aria-hidden="true" /> {gallery.video_count}
                        </span>
                    )}
                </span>
            </span>
            <span className="al-album-body">
                <strong>{title}</strong>
                <small>
                    {gallery.media_count || 0} {t.media}
                </small>
            </span>
        </Link>
    );
}

/** Photo or video tile in the "all media" grid. */
function MediaTile({ item, lang, onOpen }) {
    const [failed, setFailed] = useState(false);
    const caption = localized(item, "caption", lang);
    const album = localized(item.gallery, "title", lang);

    if (item.type === "video") {
        return (
            <Link href={albumUrl(item.gallery)} className="al-tile is-video" title={caption || album}>
                <span className="al-tile-video">
                    <i className="bi bi-play-circle-fill" aria-hidden="true" />
                </span>
                <span className="al-tile-label">{caption || album}</span>
            </Link>
        );
    }

    if (failed) {
        return (
            <div className="al-tile is-broken" aria-hidden="true">
                <i className="bi bi-image" />
            </div>
        );
    }

    return (
        <button type="button" className="al-tile" onClick={onOpen} aria-label={caption || album}>
            <img src={item.media_url} alt={localized(item, "alt_text", lang) || caption || album} loading="lazy" onError={() => setFailed(true)} />
            <span className="al-tile-label">{album}</span>
        </button>
    );
}

export default function Index({ galleries = [], media = [], mediaTotal = 0 }) {
    const { lang, t: content } = useGaf();
    const t = content.galleryPage;

    const [view, setView] = useState("albums");
    const [mediaFilter, setMediaFilter] = useState("all");
    const [open, setOpen] = useState(null);

    // Albums grouped by event (event order comes from the server).
    const events = useMemo(() => {
        const groups = [];
        const byId = {};
        galleries.forEach((gallery) => {
            const key = gallery.event?.id ?? "none";
            if (!byId[key]) {
                byId[key] = { event: gallery.event, albums: [] };
                groups.push(byId[key]);
            }
            byId[key].albums.push(gallery);
        });
        return groups;
    }, [galleries]);

    const photos = useMemo(() => media.filter((item) => item.type === "image" && item.media_url), [media]);
    const videos = useMemo(() => media.filter((item) => item.type === "video"), [media]);
    const shown = mediaFilter === "photos" ? photos : mediaFilter === "videos" ? videos : [...photos, ...videos];

    const close = useCallback(() => setOpen(null), []);
    const move = useCallback(
        (step) => setOpen((current) => (current === null ? null : (current + step + photos.length) % photos.length)),
        [photos.length]
    );

    const views = [
        { key: "albums", label: pick(lang, { en: "Albums", rw: "Alubumu" }), count: galleries.length, icon: "bi-collection" },
        { key: "media", label: pick(lang, { en: "All photos & videos", rw: "Amafoto n’amashusho yose" }), count: mediaTotal, icon: "bi-grid-3x3-gap" },
    ];

    return (
        <>
            <Head title={t.pageTitle}>
                <meta head-key="description" name="description" content={t.intro} />
            </Head>

            <main className="bl-page al-page">
                {/* Slim title bar */}
                <div className="bl-titlebar">
                    <div className="gaf-container">
                        <Breadcrumbs
                            items={[
                                { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                                { label: t.title },
                            ]}
                        />
                        <div className="bl-titlebar-row">
                            <h1>{t.title}</h1>
                            <span className="bl-total">
                                {galleries.length} {pick(lang, { en: galleries.length === 1 ? "album" : "albums", rw: "alubumu" })} · {mediaTotal}{" "}
                                {pick(lang, { en: "photos & videos", rw: "amafoto n’amashusho" })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="gaf-container al-content">
                    {/* View switch */}
                    <div className="al-views" role="tablist">
                        {views.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                role="tab"
                                aria-selected={view === item.key}
                                className={view === item.key ? "is-active" : ""}
                                onClick={() => setView(item.key)}
                            >
                                <i className={`bi ${item.icon}`} aria-hidden="true" />
                                {item.label}
                                <em>{item.count}</em>
                            </button>
                        ))}
                    </div>

                    {view === "albums" &&
                        (events.length ? (
                            events.map(({ event, albums }) => (
                                <section key={event?.id ?? "none"} className="al-event">
                                    <header className="al-event-head">
                                        <div>
                                            {event?.starts_at && (
                                                <span className="al-event-date">
                                                    <i className="bi bi-calendar3" aria-hidden="true" /> {formatDate(event.starts_at, lang)}
                                                </span>
                                            )}
                                            <h2>{localized(event, "title", lang) || t.albums}</h2>
                                        </div>
                                        <div className="al-event-side">
                                            <span>
                                                {albums.length} {pick(lang, { en: albums.length === 1 ? "album" : "albums", rw: "alubumu" })}
                                            </span>
                                            {event?.slug && (
                                                <Link href={route("events.show", { event: event.slug })} className="bl-more">
                                                    {content.eventsPage?.viewEvent || "View activity"} <i className="bi bi-arrow-right" aria-hidden="true" />
                                                </Link>
                                            )}
                                        </div>
                                    </header>

                                    <div className="al-album-grid">
                                        {albums.map((gallery) => (
                                            <Album key={gallery.id} gallery={gallery} lang={lang} t={t} />
                                        ))}
                                    </div>
                                </section>
                            ))
                        ) : (
                            <EmptyState icon="bi-images" title={t.noGalleries} text={t.noGalleriesIntro} />
                        ))}

                    {view === "media" && (
                        <>
                            <div className="bl-chips">
                                {[
                                    { key: "all", label: pick(lang, { en: "All", rw: "Byose" }), count: photos.length + videos.length },
                                    { key: "photos", label: t.photos, count: photos.length },
                                    { key: "videos", label: t.videos, count: videos.length },
                                ].map((chip) => (
                                    <button
                                        key={chip.key}
                                        type="button"
                                        className={mediaFilter === chip.key ? "is-active" : ""}
                                        onClick={() => setMediaFilter(chip.key)}
                                    >
                                        {chip.label.charAt(0).toUpperCase() + chip.label.slice(1)} <em>{chip.count}</em>
                                    </button>
                                ))}
                            </div>

                            {shown.length ? (
                                <div className="al-media-grid">
                                    {shown.map((item) => (
                                        <MediaTile key={item.id} item={item} lang={lang} onOpen={() => setOpen(photos.indexOf(item))} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState icon="bi-images" title={t.noMedia} text={t.noMediaIntro} />
                            )}

                            {mediaTotal > media.length && (
                                <p className="al-media-note">
                                    {pick(lang, {
                                        en: `Showing the latest ${media.length} of ${mediaTotal}. Open an album to see all of its photos.`,
                                        rw: `Hagaragara ${media.length} biheruka kuri ${mediaTotal}. Fungura alubumu urebe amafoto yayo yose.`,
                                    })}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </main>

            {open !== null && open >= 0 && <Lightbox images={photos} index={open} onClose={close} onMove={move} lang={lang} t={t} />}
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
