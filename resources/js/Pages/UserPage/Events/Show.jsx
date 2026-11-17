
import React from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";

const formatDate = (value, lang = "rw", options = {}) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(
        lang === "rw" ? "rw-RW" : "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
            ...options,
        }
    ).format(date);
};

const getLocalizedValue = (item, field, lang) => {
    if (!item) return "";

    return lang === "rw"
        ? item[`${field}_rw`] || item[field] || ""
        : item[field] || "";
};

const getEventStatus = (event) => {
    if (event.status === "cancelled") return "cancelled";

    const now = new Date();
    const start = event.starts_at ? new Date(event.starts_at) : null;
    const end = event.ends_at ? new Date(event.ends_at) : null;

    if (end && end < now) return "past";

    if (start && start <= now && (!end || end >= now)) {
        return "ongoing";
    }

    return "upcoming";
};

const getAgendaItems = (event, lang) => {
    if (
        lang === "rw" &&
        Array.isArray(event.agenda_rw) &&
        event.agenda_rw.length
    ) {
        return event.agenda_rw;
    }

    return Array.isArray(event.agenda) ? event.agenda : [];
};

const getAgendaText = (item, lang) => {
    if (typeof item === "string") return item;

    if (!item || typeof item !== "object") return "";

    return lang === "rw"
        ? item.title_rw ||
              item.title ||
              item.description_rw ||
              item.description ||
              ""
        : item.title || item.description || "";
};

const EventStatus = ({ status, labels }) => {
    const statusClasses = {
        upcoming: "gaf-event-status-upcoming",
        ongoing: "gaf-event-status-ongoing",
        past: "gaf-event-status-past",
        cancelled: "gaf-event-status-cancelled",
    };

    return (
        <span className={`gaf-event-status ${statusClasses[status] || ""}`}>
            {labels[status] || status}
        </span>
    );
};

const Show = ({ event, relatedEvents = [] }) => {
    const { lang, t: content } = useGaf();

    const t = content?.eventsPage || {};

    const backUrl = route("events.index");

    if (!event) {
        return (
            <>
                <Head title={t.pageTitle || "Event | GAF Rwanda"} />

                <main className="gaf-event-detail-page">
                    <section className="container py-5">
                        <div className="gaf-event-empty">
                            <h2>{t.noEvents || "Event not found."}</h2>

                            <Link
                                href={backUrl}
                                className="gaf-event-back-link"
                            >
                                {t.backToEvents || "Back to all events"}
                            </Link>
                        </div>
                    </section>
                </main>
            </>
        );
    }

    const title = getLocalizedValue(event, "title", lang);
    const excerpt = getLocalizedValue(event, "excerpt", lang);
    const description = getLocalizedValue(event, "description", lang);
    const venue = getLocalizedValue(event, "venue", lang);
    const address = getLocalizedValue(event, "address", lang);
    const city = getLocalizedValue(event, "city", lang);

    const categoryName = getLocalizedValue(event.category, "name", lang);

    const status = getEventStatus(event);

    const statusLabels = {
        upcoming: t.upcomingLabel || "Upcoming",
        ongoing: t.ongoingLabel || "Ongoing",
        past: t.pastLabel || "Past",
        cancelled: t.cancelled || "Cancelled",
    };

    const agendaItems = getAgendaItems(event, lang);

    const location = [venue, address, city]
        .filter(Boolean)
        .join(", ");

    const coverImage =
        event.cover_image_url ||
        event.cover_image ||
        event.image_url ||
        null;

    const hasRegistration = Boolean(event.registration_url);

    const publicEventUrl = (slug) =>
        slug ? route("events.show", { event: slug }) : null;

    return (
        <>
            <Head title={`${title || "Event"} | GAF Rwanda`}>
                <meta
                    head-key="description"
                    name="description"
                    content={excerpt || title}
                />

                <meta
                    head-key="og:title"
                    property="og:title"
                    content={title}
                />

                {coverImage && (
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={coverImage}
                    />
                )}
            </Head>

            <main className="gaf-event-detail-page">
                {/* Page header */}
                <section className="gaf-event-detail-header">
                    <div className="container">
                        <Link
                            href={backUrl}
                            className="gaf-event-back-link"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            {t.backToEvents || "Back to all events"}
                        </Link>

                        <div className="gaf-event-detail-heading">
                            {categoryName && (
                                <span className="gaf-event-category">
                                    {categoryName}
                                </span>
                            )}

                            <h1>{title}</h1>

                            {excerpt && (
                                <p className="gaf-event-detail-excerpt">
                                    {excerpt}
                                </p>
                            )}

                            <div className="gaf-event-detail-heading-meta">
                                <EventStatus
                                    status={status}
                                    labels={statusLabels}
                                />

                                {event.starts_at && (
                                    <span>
                                        <i className="bi bi-calendar3 me-2"></i>
                                        {formatDate(event.starts_at, lang)}
                                    </span>
                                )}

                                {location && (
                                    <span>
                                        <i className="bi bi-geo-alt me-2"></i>
                                        {location}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="gaf-event-detail-content">
                    <div className="container">
                        <div className="row g-4 g-lg-5">
                            <div className="col-lg-8">
                                {coverImage && (
                                    <div className="gaf-event-detail-cover">
                                        <img
                                            src={coverImage}
                                            alt={title}
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                {description && (
                                    <div className="gaf-event-description-section">
                                        <h2>
                                            {lang === "rw"
                                                ? "Ibisobanuro birambuye"
                                                : "About this event"}
                                        </h2>

                                        <div
                                            className="gaf-event-description"
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Agenda */}
                                {agendaItems.length > 0 && (
                                    <div className="gaf-event-agenda-section">
                                        <h2>
                                            {t.agenda || "Event agenda"}
                                        </h2>

                                        <div className="gaf-event-agenda-list">
                                            {agendaItems.map((item, index) => {
                                                const agendaText =
                                                    getAgendaText(item, lang);

                                                if (!agendaText) return null;

                                                return (
                                                    <div
                                                        className="gaf-event-agenda-item"
                                                        key={index}
                                                    >
                                                        <span className="gaf-event-agenda-number">
                                                            {String(
                                                                index + 1
                                                            ).padStart(2, "0")}
                                                        </span>

                                                        <div>
                                                            <p>{agendaText}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Related events */}
                                {relatedEvents.length > 0 && (
                                    <div className="gaf-event-related-section">
                                        <h2>
                                            {t.related || "Related events"}
                                        </h2>

                                        <div className="row g-4">
                                            {relatedEvents.map((item) => {
                                                const relatedTitle =
                                                    getLocalizedValue(
                                                        item,
                                                        "title",
                                                        lang
                                                    );

                                                const relatedUrl =
                                                    publicEventUrl(item.slug);

                                                if (!relatedUrl) return null;

                                                const relatedImage =
                                                    item.cover_image_url ||
                                                    item.cover_image ||
                                                    null;

                                                return (
                                                    <div
                                                        className="col-md-6"
                                                        key={item.id}
                                                    >
                                                        <article className="gaf-event-related-card">
                                                            {relatedImage && (
                                                                <Link
                                                                    href={relatedUrl}
                                                                    className="gaf-event-related-image"
                                                                >
                                                                    <img
                                                                        src={relatedImage}
                                                                        alt={relatedTitle}
                                                                        onError={(
                                                                            e
                                                                        ) => {
                                                                            e.currentTarget.style.display =
                                                                                "none";
                                                                        }}
                                                                    />
                                                                </Link>
                                                            )}

                                                            <div className="gaf-event-related-body">
                                                                <span className="gaf-event-related-date">
                                                                    {formatDate(
                                                                        item.starts_at,
                                                                        lang
                                                                    )}
                                                                </span>

                                                                <h3>
                                                                    <Link
                                                                        href={relatedUrl}
                                                                    >
                                                                        {relatedTitle}
                                                                    </Link>
                                                                </h3>

                                                                <Link
                                                                    href={relatedUrl}
                                                                    className="gaf-event-related-link"
                                                                >
                                                                    {t.viewDetails ||
                                                                        "View details"}
                                                                    <i className="bi bi-arrow-right ms-2"></i>
                                                                </Link>
                                                            </div>
                                                        </article>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="col-lg-4">
                                <aside className="gaf-event-information">
                                    <div className="gaf-event-information-card">
                                        <h3>
                                            {lang === "rw"
                                                ? "Amakuru y'igikorwa"
                                                : "Event information"}
                                        </h3>

                                        <div className="gaf-event-info-item">
                                            <span className="gaf-event-info-icon">
                                                <i className="bi bi-calendar-event"></i>
                                            </span>

                                            <div>
                                                <small>
                                                    {t.date || "Start date"}
                                                </small>

                                                <strong>
                                                    {event.starts_at
                                                        ? formatDate(
                                                              event.starts_at,
                                                              lang
                                                          )
                                                        : t.dateUnavailable ||
                                                          "Date to be announced"}
                                                </strong>
                                            </div>
                                        </div>

                                        {event.ends_at && (
                                            <div className="gaf-event-info-item">
                                                <span className="gaf-event-info-icon">
                                                    <i className="bi bi-calendar-check"></i>
                                                </span>

                                                <div>
                                                    <small>
                                                        {t.endDate || "End date"}
                                                    </small>

                                                    <strong>
                                                        {formatDate(
                                                            event.ends_at,
                                                            lang
                                                        )}
                                                    </strong>
                                                </div>
                                            </div>
                                        )}

                                        {location && (
                                            <div className="gaf-event-info-item">
                                                <span className="gaf-event-info-icon">
                                                    <i className="bi bi-geo-alt"></i>
                                                </span>

                                                <div>
                                                    <small>
                                                        {t.location || "Location"}
                                                    </small>

                                                    <strong>{location}</strong>
                                                </div>
                                            </div>
                                        )}

                                        {event.program && (
                                            <div className="gaf-event-info-item">
                                                <span className="gaf-event-info-icon">
                                                    <i className="bi bi-diagram-3"></i>
                                                </span>

                                                <div>
                                                    <small>
                                                        {t.program || "Programme"}
                                                    </small>

                                                    <strong>
                                                        {event.program.name}
                                                    </strong>
                                                </div>
                                            </div>
                                        )}

                                        {categoryName && (
                                            <div className="gaf-event-info-item">
                                                <span className="gaf-event-info-icon">
                                                    <i className="bi bi-tag"></i>
                                                </span>

                                                <div>
                                                    <small>
                                                        {lang === "rw"
                                                            ? "Icyiciro"
                                                            : "Category"}
                                                    </small>

                                                    <strong>{categoryName}</strong>
                                                </div>
                                            </div>
                                        )}

                                        {hasRegistration && (
                                            <a
                                                href={event.registration_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="gaf-event-register-button"
                                            >
                                                {t.register ||
                                                    (lang === "rw"
                                                        ? "Iyandikishe"
                                                        : "Register for this event")}

                                                <i className="bi bi-arrow-up-right ms-2"></i>
                                            </a>
                                        )}
                                    </div>

                                    <div className="gaf-event-sidebar-note">
                                        <i className="bi bi-info-circle"></i>

                                        <p>
                                            {lang === "rw"
                                                ? "Komeza ukurikirane ibikorwa n'ubushakashatsi bya GAF-RW."
                                                : "Stay connected with GAF-RW activities and research updates."}
                                        </p>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

Show.layout = (page) => <GafLayout>{page}</GafLayout>;

export default Show;
