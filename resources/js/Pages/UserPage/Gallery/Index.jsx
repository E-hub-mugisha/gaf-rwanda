
import React from "react";
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

const GalleryImage = ({ gallery }) => {
    const image = gallery.cover_image_url;

    if (!image) {
        return (
            <div className="gaf-gallery-placeholder">
                <i className="bi bi-images"></i>
            </div>
        );
    }

    return (
        <img
            src={image}
            alt={gallery.title}
            onError={(e) => {
                e.currentTarget.style.display = "none";
            }}
        />
    );
};

const GalleryCard = ({ gallery, lang, t }) => {
    const title = localized(gallery, "title", lang);
    const description = localized(gallery, "description", lang);
    const eventTitle = localized(gallery.event, "title", lang);

    return (
        <article className="gaf-gallery-card">
            <Link
                href={route("gallery.show", { slug: gallery.slug })}
                className="gaf-gallery-card-image"
            >
                <GalleryImage gallery={gallery} />

                <span className="gaf-gallery-image-overlay">
                    <i className="bi bi-arrow-up-right"></i>
                </span>

                <span className="gaf-gallery-media-count">
                    <i className="bi bi-images me-1"></i>
                    {gallery.media_count || 0} {t.media || "media"}
                </span>
            </Link>

            <div className="gaf-gallery-card-body">
                {eventTitle && (
                    <span className="gaf-gallery-event-label">
                        <i className="bi bi-calendar-event me-1"></i>
                        {eventTitle}
                    </span>
                )}

                <h3>
                    <Link
                        href={route("gallery.show", {
                            slug: gallery.slug,
                        })}
                    >
                        {title}
                    </Link>
                </h3>

                {description && <p>{description}</p>}

                <div className="gaf-gallery-card-footer">
                    <div className="gaf-gallery-counts">
                        <span>
                            <i className="bi bi-image me-1"></i>
                            {gallery.image_count || 0}
                        </span>

                        <span>
                            <i className="bi bi-play-btn me-1"></i>
                            {gallery.video_count || 0}
                        </span>
                    </div>

                    <Link
                        href={route("gallery.show", {
                            slug: gallery.slug,
                        })}
                        className="gaf-gallery-view-link"
                    >
                        {t.viewGallery || "View gallery"}
                        <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </div>
            </div>
        </article>
    );
};

const Index = ({ galleries }) => {
    const { lang, t: content } = useGaf();
    const t = content?.galleryPage || {};

    const items = galleries?.data || [];

    return (
        <>
            <Head title={t.pageTitle || "Gallery | GAF Rwanda"}>
                <meta
                    head-key="description"
                    name="description"
                    content={
                        t.intro ||
                        "Explore photos and videos from GAF-RW events and activities."
                    }
                />
            </Head>

            <main className="gaf-gallery-page">
                {/* Header */}
                <section className="gaf-gallery-header">
                    <div className="container">
                        <div className="gaf-gallery-header-content">
                            <span className="gaf-gallery-eyebrow">
                                {t.eyebrow || "OUR MOMENTS"}
                            </span>

                            <h1>
                                {t.title || "Photo & Video Gallery"}
                            </h1>

                            <p>
                                {t.intro ||
                                    "Explore moments, activities and experiences captured during GAF-RW events and research activities."}
                            </p>
                            {Array.isArray(t.topics) && t.topics.length > 0 && (
                                <ul className="gaf-page-topics">
                                    {t.topics.map((topic) => (
                                        <li key={topic}>{topic}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>

                {/* Gallery albums */}
                <section className="gaf-gallery-content">
                    <div className="container">
                        <div className="gaf-gallery-section-heading">
                            <div>
                                <span className="gaf-gallery-eyebrow">
                                    {t.collections || "OUR COLLECTIONS"}
                                </span>

                                <h2>
                                    {t.albums || "Event galleries"}
                                </h2>
                            </div>

                            <span className="gaf-gallery-total">
                                {galleries?.total || 0}{" "}
                                {t.galleries || "galleries"}
                            </span>
                        </div>

                        {items.length > 0 ? (
                            <>
                                <div className="row g-4">
                                    {items.map((gallery) => (
                                        <div
                                            className="col-md-6 col-lg-4"
                                            key={gallery.id}
                                        >
                                            <GalleryCard
                                                gallery={gallery}
                                                lang={lang}
                                                t={t}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {galleries.links?.length > 3 && (
                                    <nav
                                        className="gaf-gallery-pagination"
                                        aria-label="Gallery pagination"
                                    >
                                        {galleries.links.map(
                                            (link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || "#"}
                                                    preserveScroll
                                                    className={[
                                                        link.active
                                                            ? "active"
                                                            : "",
                                                        !link.url
                                                            ? "disabled"
                                                            : "",
                                                    ].join(" ")}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                    onClick={(e) => {
                                                        if (!link.url) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                            )
                                        )}
                                    </nav>
                                )}
                            </>
                        ) : (
                            <div className="gaf-gallery-empty">
                                <i className="bi bi-images"></i>

                                <h3>
                                    {t.noGalleries || "No galleries available"}
                                </h3>

                                <p>
                                    {t.noGalleriesIntro ||
                                        "Photos and videos from our events will be shared here."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

Index.layout = (page) => <GafLayout>{page}</GafLayout>;

export default Index;
