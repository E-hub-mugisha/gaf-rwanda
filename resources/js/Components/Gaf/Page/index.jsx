// Building blocks shared by the public Events, News and Gallery pages.
import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { localized, pick } from "@/lib/gafLocale";

/** Breadcrumb trail: items = [{ label, href? }] */
export function Breadcrumbs({ items = [], light = false }) {
    return (
        <nav className={`gp-crumbs${light ? " is-light" : ""}`} aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.href && index < items.length - 1 ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            <span aria-current={index === items.length - 1 ? "page" : undefined}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

/**
 * Listing page hero: green band with breadcrumbs, title, intro, topic chips
 * and optional key figures.
 */
export function PageHero({ crumbs, eyebrow, title, intro, topics = [], stats = [], icon = "bi-grid" }) {
    return (
        <section className="gp-hero">
            <div className="gp-hero-pattern" aria-hidden="true" />
            <div className="gaf-container gp-hero-inner">
                <div className="gp-hero-copy">
                    {crumbs && <Breadcrumbs items={crumbs} light />}
                    <h1>{title}</h1>
                    {intro && <p className="gp-hero-intro">{intro}</p>}
                    {topics.length > 0 && (
                        <ul className="gp-hero-topics">
                            {topics.map((topic) => (
                                <li key={topic}>
                                    <i className="bi bi-check2" aria-hidden="true" />
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {stats.length > 0 && (
                    <dl className="gp-hero-stats">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <dt>{stat.label}</dt>
                                <dd>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </section>
    );
}

/** Section title row with optional count or link on the right. */
export function SectionTitle({ eyebrow, title, aside }) {
    return (
        <div className="gp-section-title">
            <div>
                <h2>{title}</h2>
            </div>
            {aside}
        </div>
    );
}

export function EmptyState({ icon = "bi-inbox", title, text, action }) {
    return (
        <div className="gp-empty">
            <span className="gp-empty-icon">
                <i className={`bi ${icon}`} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            {text && <p>{text}</p>}
            {action}
        </div>
    );
}

/** Image with a branded placeholder when missing or broken. */
export function Cover({ src, alt = "", icon = "bi-image", className = "", eager = false }) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div className={`gp-cover gp-cover-empty ${className}`} aria-hidden="true">
                <i className={`bi ${icon}`} />
                <span>GAF-Rwanda</span>
            </div>
        );
    }

    return (
        <div className={`gp-cover ${className}`}>
            <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} />
        </div>
    );
}

/** Laravel paginator links. */
export function Pagination({ links = [], label = "Pagination" }) {
    if (links.length <= 3) return null;

    return (
        <nav className="gp-pagination" aria-label={label}>
            {links.map((link, index) => {
                const text = link.label
                    .replace("&laquo;", "‹")
                    .replace("&raquo;", "›")
                    .replace(/Previous|Next/g, "")
                    .trim();

                return (
                    <button
                        key={index}
                        type="button"
                        disabled={!link.url || link.active}
                        className={link.active ? "is-active" : ""}
                        onClick={() => link.url && router.visit(link.url, { preserveScroll: false })}
                        aria-current={link.active ? "page" : undefined}
                    >
                        {text}
                    </button>
                );
            })}
        </nav>
    );
}

/** Copy link, WhatsApp, Facebook, LinkedIn and X. */
export function ShareLinks({ title, lang }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || "");

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const links = [
        { icon: "bi-whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
        { icon: "bi-facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
        { icon: "bi-linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { icon: "bi-twitter-x", label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    ];

    return (
        <div className="gp-share">
            {links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}>
                    <i className={`bi ${link.icon}`} aria-hidden="true" />
                </a>
            ))}
            <button type="button" onClick={copy} title={pick(lang, { en: "Copy link", rw: "Koporora ihuza" })}>
                <i className={`bi ${copied ? "bi-check2" : "bi-link-45deg"}`} aria-hidden="true" />
                <span>{copied ? pick(lang, { en: "Copied", rw: "Byakoporowe" }) : pick(lang, { en: "Copy link", rw: "Koporora" })}</span>
            </button>
        </div>
    );
}

/**
 * Album tile: photo on top, caption underneath (no text over the image).
 * meta = small line above the title, e.g. event name and date.
 */
export function AlbumCard({ href, image, title, meta, count, cta, description, large = false }) {
    return (
        <Link href={href} className={`gp-album${large ? " is-large" : ""}`}>
            <span className="gp-album-media">
                <Cover src={image} alt={title} icon="bi-images" />
                {count !== undefined && (
                    <span className="gp-album-count">
                        <i className="bi bi-images" aria-hidden="true" /> {count}
                    </span>
                )}
            </span>
            <span className="gp-album-body">
                {meta && <small>{meta}</small>}
                <strong>{title}</strong>
                {description && <em>{description}</em>}
                {cta && (
                    <span className="gp-card-link">
                        {cta}
                        <i className="bi bi-arrow-right" aria-hidden="true" />
                    </span>
                )}
            </span>
        </Link>
    );
}

/** Status label for events. */
export function StatusPill({ status, labels }) {
    return <span className={`gp-status is-${status}`}>{labels[status] || status}</span>;
}

/** Full-screen photo viewer: arrows, Esc, counter, caption. */
export function Lightbox({ images, index, onClose, onMove, lang, t }) {
    const image = images[index];

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowRight") onMove(1);
            if (event.key === "ArrowLeft") onMove(-1);
        };

        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose, onMove]);

    if (!image) return null;

    const caption = localized(image, "caption", lang);
    const alt = localized(image, "alt_text", lang) || caption || t.imagePreview;

    return (
        <div className="gp-lightbox" role="dialog" aria-modal="true" aria-label={t.imagePreview} onClick={onClose}>
            <div className="gp-lightbox-top" onClick={(event) => event.stopPropagation()}>
                <span>
                    {index + 1} / {images.length}
                </span>
                <div>
                    <a href={image.media_url} target="_blank" rel="noopener noreferrer" aria-label={pick(lang, { en: "Open original", rw: "Fungura ifoto y’umwimerere" })}>
                        <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                    </a>
                    <button type="button" onClick={onClose} aria-label={t.close}>
                        <i className="bi bi-x-lg" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {images.length > 1 && (
                <button
                    type="button"
                    className="gp-lightbox-nav is-prev"
                    onClick={(event) => {
                        event.stopPropagation();
                        onMove(-1);
                    }}
                    aria-label={pick(lang, { en: "Previous photo", rw: "Ifoto ibanza" })}
                >
                    <i className="bi bi-chevron-left" aria-hidden="true" />
                </button>
            )}

            <figure className="gp-lightbox-figure" onClick={(event) => event.stopPropagation()}>
                <img src={image.media_url} alt={alt} />
                {caption && <figcaption>{caption}</figcaption>}
            </figure>

            {images.length > 1 && (
                <button
                    type="button"
                    className="gp-lightbox-nav is-next"
                    onClick={(event) => {
                        event.stopPropagation();
                        onMove(1);
                    }}
                    aria-label={pick(lang, { en: "Next photo", rw: "Ifoto ikurikira" })}
                >
                    <i className="bi bi-chevron-right" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
