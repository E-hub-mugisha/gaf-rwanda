
import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";

const formatDate = (value, lang) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(
        lang === "rw" ? "rw-RW" : "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date);
};

const localized = (item, field, lang) => {
    if (!item) return "";

    return lang === "rw"
        ? item[`${field}_rw`] || item[field] || ""
        : item[field] || "";
};

const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
            const id = parsed.pathname.split("/").filter(Boolean)[0];
            return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
        }

        if (
            host === "youtube.com" ||
            host === "m.youtube.com" ||
            host === "youtube-nocookie.com"
        ) {
            const id =
                parsed.searchParams.get("v") ||
                parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];

            return id
                ? `https://www.youtube-nocookie.com/embed/${id}`
                : null;
        }

        if (host === "vimeo.com") {
            const id = parsed.pathname.split("/").filter(Boolean).pop();

            return id && /^\d+$/.test(id)
                ? `https://player.vimeo.com/video/${id}`
                : null;
        }
    } catch {
        return null;
    }

    return null;
};

const isDirectVideo = (media) => {
    const mime = media.mime_type || "";

    if (mime.startsWith("video/")) return true;

    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(
        media.media_url || ""
    );
};

const GalleryMedia = ({ media, lang, onImageClick, t }) => {
    const caption = localized(media, "caption", lang);
    const altText = localized(media, "alt_text", lang);

    const url = media.media_url;

    if (!url) return null;

    const isVideo = media.type === "video";
    const embedUrl = isVideo ? getVideoEmbedUrl(url) : null;
    const directVideo = isVideo && isDirectVideo(media);

    return (
        <article className="gaf-gallery-media-card">
            <div className="gaf-gallery-media-frame">
                {isVideo ? (
                    embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={caption || t.video || "Gallery video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                        />
                    ) : directVideo ? (
                        <video
                            src={url}
                            controls
                            preload="metadata"
                            playsInline
                        >
                            {t.videoUnsupported ||
                                "Your browser does not support this video."}
                        </video>
                    ) : (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gaf-gallery-external-video"
                        >
                            <i className="bi bi-play-circle"></i>
                            <span>
                                {t.watchVideo || "Watch video"}
                            </span>
                        </a>
                    )
                ) : (
                    <button
                        type="button"
                        className="gaf-gallery-image-button"
                        onClick={() =>
                            onImageClick({
                                url,
                                alt: altText || caption || "Gallery image",
                                caption,
                            })
                        }
                        aria-label={
                            t.openImage || "Open image"
                        }
                    >
                        <img
                            src={url}
                            alt={altText || caption || "Gallery image"}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />

                        <span className="gaf-gallery-image-zoom">
                            <i className="bi bi-arrows-fullscreen"></i>
                        </span>
                    </button>
                )}
            </div>

            {caption && (
                <div className="gaf-gallery-media-caption">
                    <p>{caption}</p>
                </div>
            )}
        </article>
    );
};

const Show = ({ gallery, relatedGalleries = [] }) => {
    const { lang, t: content } = useGaf();
    const t = content?.galleryPage || {};

    const [selectedImage, setSelectedImage] = useState(null);

    const title = localized(gallery, "title", lang);
    const description = localized(gallery, "description", lang);
    const eventTitle = localized(gallery.event, "title", lang);

    const media = gallery.public_media || gallery.publicMedia || gallery.media || [];

    const images = media.filter((item) => item.type === "image");
    const videos = media.filter((item) => item.type === "video");

    return (
        <>
            <Head title={`${title} | GAF Rwanda`}>
                <meta
                    head-key="description"
                    name="description"
                    content={description || title}
                />

                {gallery.cover_image_url && (
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={gallery.cover_image_url}
                    />
                )}
            </Head>

            <main className="gaf-gallery-detail-page">
                {/* Gallery heading */}
                <section className="gaf-gallery-detail-header">
                    <div className="container">
                        <Link
                            href={route("gallery.index")}
                            className="gaf-gallery-back-link"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            {t.backToGallery || "Back to gallery"}
                        </Link>

                        {eventTitle && (
                            <span className="gaf-gallery-event-label">
                                <i className="bi bi-calendar-event me-2"></i>
                                {eventTitle}
                            </span>
                        )}

                        <h1>{title}</h1>

                        {description && (
                            <p className="gaf-gallery-detail-description">
                                {description}
                            </p>
                        )}

                        <div className="gaf-gallery-detail-meta">
                            {gallery.event?.starts_at && (
                                <span>
                                    <i className="bi bi-calendar3 me-2"></i>
                                    {formatDate(
                                        gallery.event.starts_at,
                                        lang
                                    )}
                                </span>
                            )}

                            <span>
                                <i className="bi bi-image me-2"></i>
                                {images.length} {t.photos || "photos"}
                            </span>

                            <span>
                                <i className="bi bi-play-btn me-2"></i>
                                {videos.length} {t.videos || "videos"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Cover image */}
                {gallery.cover_image_url && (
                    <section className="gaf-gallery-detail-cover">
                        <div className="container">
                            <img
                                src={gallery.cover_image_url}
                                alt={title}
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        </div>
                    </section>
                )}

                {/* Gallery media */}
                <section className="gaf-gallery-detail-content">
                    <div className="container">
                        {media.length > 0 ? (
                            <>
                                {images.length > 0 && (
                                    <div className="gaf-gallery-media-section">
                                        <div className="gaf-gallery-section-heading">
                                            <div>
                                                <span className="gaf-gallery-eyebrow">
                                                    {t.photoCollection ||
                                                        "PHOTO COLLECTION"}
                                                </span>

                                                <h2>
                                                    {t.photos || "Photos"}
                                                </h2>
                                            </div>

                                            <span>
                                                {images.length}
                                            </span>
                                        </div>

                                        <div className="row g-4">
                                            {images.map((item) => (
                                                <div
                                                    className="col-6 col-md-4 col-lg-3"
                                                    key={item.id}
                                                >
                                                    <GalleryMedia
                                                        media={item}
                                                        lang={lang}
                                                        t={t}
                                                        onImageClick={
                                                            setSelectedImage
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {videos.length > 0 && (
                                    <div className="gaf-gallery-media-section">
                                        <div className="gaf-gallery-section-heading">
                                            <div>
                                                <span className="gaf-gallery-eyebrow">
                                                    {t.videoCollection ||
                                                        "VIDEO COLLECTION"}
                                                </span>

                                                <h2>
                                                    {t.videos || "Videos"}
                                                </h2>
                                            </div>

                                            <span>
                                                {videos.length}
                                            </span>
                                        </div>

                                        <div className="row g-4">
                                            {videos.map((item) => (
                                                <div
                                                    className="col-md-6 col-lg-4"
                                                    key={item.id}
                                                >
                                                    <GalleryMedia
                                                        media={item}
                                                        lang={lang}
                                                        t={t}
                                                        onImageClick={
                                                            setSelectedImage
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="gaf-gallery-empty">
                                <i className="bi bi-images"></i>

                                <h3>
                                    {t.noMedia || "No media available"}
                                </h3>

                                <p>
                                    {t.noMediaIntro ||
                                        "Media from this event will be added soon."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Related galleries */}
                {relatedGalleries.length > 0 && (
                    <section className="gaf-gallery-related-section">
                        <div className="container">
                            <div className="gaf-gallery-section-heading">
                                <div>
                                    <span className="gaf-gallery-eyebrow">
                                        {t.moreCollections ||
                                            "MORE COLLECTIONS"}
                                    </span>

                                    <h2>
                                        {t.related || "Related galleries"}
                                    </h2>
                                </div>

                                <Link
                                    href={route("gallery.index")}
                                    className="gaf-gallery-view-link"
                                >
                                    {t.viewAll || "View all"}
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>

                            <div className="row g-4">
                                {relatedGalleries.map((item) => (
                                    <div
                                        className="col-md-6 col-lg-4"
                                        key={item.id}
                                    >
                                        <Link
                                            href={route("gallery.show", {
                                                slug: item.slug,
                                            })}
                                            className="gaf-gallery-related-card"
                                        >
                                            {item.cover_image_url ? (
                                                <img
                                                    src={item.cover_image_url}
                                                    alt={localized(
                                                        item,
                                                        "title",
                                                        lang
                                                    )}
                                                />
                                            ) : (
                                                <div className="gaf-gallery-placeholder">
                                                    <i className="bi bi-images"></i>
                                                </div>
                                            )}

                                            <div>
                                                <h3>
                                                    {localized(
                                                        item,
                                                        "title",
                                                        lang
                                                    )}
                                                </h3>

                                                <span>
                                                    {item.media_count || 0}{" "}
                                                    {t.media || "media"}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Image lightbox */}
            {selectedImage && (
                <div
                    className="gaf-gallery-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.imagePreview || "Image preview"}
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        className="gaf-gallery-lightbox-close"
                        onClick={() => setSelectedImage(null)}
                        aria-label={t.close || "Close"}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                    <button
                        type="button"
                        className="gaf-gallery-lightbox-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                        />

                        {selectedImage.caption && (
                            <span>{selectedImage.caption}</span>
                        )}
                    </button>
                </div>
            )}
        </>
    );
};

Show.layout = (page) => <GafLayout>{page}</GafLayout>;

export default Show;
