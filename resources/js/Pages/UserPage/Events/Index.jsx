import React from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";

const formatDate = (value, lang) => {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat(
        lang === "rw" ? "rw-RW" : "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date);
};

const formatTime = (value, lang) => {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat(
        lang === "rw" ? "rw-RW" : "en-GB",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(date);
};

const eventText = (event, field, lang) => {
    if (lang === "rw") {
        return event[`${field}_rw`] || event[field] || "";
    }

    return event[field] || "";
};

const getCategoryName = (event, lang) => {
    if (!event.category) return "";

    return lang === "rw"
        ? event.category.name_rw || event.category.name
        : event.category.name;
};

function EventCard({ event, lang, t }) {
    const title = eventText(event, "title", lang);
    const excerpt = eventText(event, "excerpt", lang);
    const venue = eventText(event, "venue", lang);
    const city = eventText(event, "city", lang);

    const date = formatDate(event.starts_at, lang);
    const image = event.cover_image_url || event.cover_image;

    return (
        <article className="gaf-event-card">
            <Link
                href={`/events/${event.slug}`}
                className="gaf-event-card-image"
                aria-label={`${t.viewEvent}: ${title}`}
            >
                {image ? (
                    <img src={image} alt={title} loading="lazy" />
                ) : (
                    <div className="gaf-event-image-placeholder">
                        <span>GAF Rwanda</span>
                    </div>
                )}

                {event.category && (
                    <span className="gaf-event-category">
                        {getCategoryName(event, lang)}
                    </span>
                )}
            </Link>

            <div className="gaf-event-card-body">
                <div className="gaf-event-card-date">
                    <span aria-hidden="true">▦</span>
                    {date || t.dateUnavailable}
                </div>

                <h3>
                    <Link href={`/events/${event.slug}`}>
                        {title}
                    </Link>
                </h3>

                {excerpt && <p>{excerpt}</p>}

                {(venue || city) && (
                    <div className="gaf-event-card-location">
                        <span aria-hidden="true">⌖</span>
                        {[venue, city, event.country]
                            .filter(Boolean)
                            .join(", ")}
                    </div>
                )}

                <Link
                    href={`/events/${event.slug}`}
                    className="gaf-event-card-link"
                >
                    {t.viewDetails}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

function EventSection({
    title,
    events = [],
    lang,
    t,
    emptyMessage,
}) {
    return (
        <section className="gaf-events-section">
            <div className="gaf-events-section-heading">
                <div>
                    <span className="gaf-events-section-eyebrow">
                        GAF RWANDA
                    </span>
                    <h2>{title}</h2>
                </div>

                <span className="gaf-events-section-count">
                    {events.length}
                </span>
            </div>

            {events.length > 0 ? (
                <div className="gaf-events-grid">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            lang={lang}
                            t={t}
                        />
                    ))}
                </div>
            ) : (
                <div className="gaf-events-empty">
                    <span className="gaf-events-empty-icon">◎</span>
                    <p>{emptyMessage}</p>
                </div>
            )}
        </section>
    );
}

export default function Index({
    featuredEvent,
    upcomingEvents = [],
    ongoingEvents = [],
    pastEvents = [],
}) {
    const { lang, t: content } = useGaf();
    const t = content.eventsPage;

    const featuredTitle = featuredEvent
        ? eventText(featuredEvent, "title", lang)
        : "";

    const featuredExcerpt = featuredEvent
        ? eventText(featuredEvent, "excerpt", lang)
        : "";

    const featuredImage = featuredEvent
        ? featuredEvent.cover_image_url || featuredEvent.cover_image
        : null;

    return (
        <>
            <Head title={t.pageTitle} />

            <main className="gaf-events-page">
                <section className="gaf-events-hero">
                    <div className="gaf-container">
                        <span className="gaf-events-hero-eyebrow">
                            {t.eyebrow}
                        </span>

                        <h1>{t.title}</h1>

                        <p>{t.intro}</p>
                        {Array.isArray(t.topics) && t.topics.length > 0 && (
                            <ul className="gaf-page-topics">
                                {t.topics.map((topic) => (
                                    <li key={topic}>{topic}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <div className="gaf-container gaf-events-content">
                    {featuredEvent && (
                        <section className="gaf-featured-event">
                            <div className="gaf-featured-event-image">
                                {featuredImage ? (
                                    <img
                                        src={featuredImage}
                                        alt={featuredTitle}
                                    />
                                ) : (
                                    <div className="gaf-event-image-placeholder">
                                        <span>GAF Rwanda</span>
                                    </div>
                                )}
                            </div>

                            <div className="gaf-featured-event-content">
                                <span className="gaf-events-featured-label">
                                    {t.featured}
                                </span>

                                <h2>{featuredTitle}</h2>

                                {featuredExcerpt && (
                                    <p>{featuredExcerpt}</p>
                                )}

                                <div className="gaf-featured-event-meta">
                                    <span>
                                        <strong>{t.date}:</strong>{" "}
                                        {formatDate(
                                            featuredEvent.starts_at,
                                            lang
                                        ) || t.dateUnavailable}
                                    </span>

                                    {(eventText(
                                        featuredEvent,
                                        "venue",
                                        lang
                                    ) || featuredEvent.city) && (
                                        <span>
                                            <strong>{t.location}:</strong>{" "}
                                            {[
                                                eventText(
                                                    featuredEvent,
                                                    "venue",
                                                    lang
                                                ),
                                                eventText(
                                                    featuredEvent,
                                                    "city",
                                                    lang
                                                ),
                                                featuredEvent.country,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={`/events/${featuredEvent.slug}`}
                                    className="gaf-events-button"
                                >
                                    {t.viewEvent}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </section>
                    )}

                    <EventSection
                        title={t.ongoing}
                        events={ongoingEvents}
                        lang={lang}
                        t={t}
                        emptyMessage={t.noOngoing}
                    />

                    <EventSection
                        title={t.upcoming}
                        events={upcomingEvents}
                        lang={lang}
                        t={t}
                        emptyMessage={t.noUpcoming}
                    />

                    <EventSection
                        title={t.past}
                        events={pastEvents}
                        lang={lang}
                        t={t}
                        emptyMessage={t.noPast}
                    />

                    {!featuredEvent &&
                        upcomingEvents.length === 0 &&
                        ongoingEvents.length === 0 &&
                        pastEvents.length === 0 && (
                            <div className="gaf-events-empty gaf-events-empty-main">
                                <span className="gaf-events-empty-icon">
                                    ◎
                                </span>
                                <h2>{t.noEvents}</h2>
                            </div>
                        )}
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;