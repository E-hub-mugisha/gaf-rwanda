import React, { useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Cover, EmptyState, PageHero, SectionTitle, StatusPill } from "@/Components/Gaf/Page";
import { dateParts, eventStatus, formatDate, formatTime, localized, pick } from "@/lib/gafLocale";

const eventUrl = (event) => route("events.show", { event: event.slug });

const placeOf = (event, lang) =>
    [localized(event, "venue", lang), localized(event, "city", lang)].filter(Boolean).join(", ");

function DateTile({ value, lang }) {
    const parts = dateParts(value, lang);
    if (!parts) return null;

    return (
        <span className="gp-date-tile">
            <strong>{parts.day}</strong>
            <span>{parts.month}</span>
        </span>
    );
}

function EventCard({ event, lang, t, labels }) {
    const title = localized(event, "title", lang);
    const excerpt = localized(event, "excerpt", lang);
    const category = localized(event.category, "name", lang);
    const place = placeOf(event, lang);
    const time = formatTime(event.starts_at, lang);

    return (
        <article className="gp-card gp-event-card">
            <Link href={eventUrl(event)} className="gp-card-media" aria-label={title}>
                <Cover src={event.cover_image_url} alt={title} icon="bi-calendar-event" />
                <DateTile value={event.starts_at} lang={lang} />
                <StatusPill status={eventStatus(event)} labels={labels} />
            </Link>

            <div className="gp-card-body">
                {category && <span className="gp-tag">{category}</span>}

                <h3>
                    <Link href={eventUrl(event)}>{title}</Link>
                </h3>

                {excerpt && <p className="gp-card-text">{excerpt}</p>}

                <ul className="gp-meta">
                    <li>
                        <i className="bi bi-calendar3" aria-hidden="true" />
                        {formatDate(event.starts_at, lang) || t.dateUnavailable}
                        {time && ` · ${time}`}
                    </li>
                    {place && (
                        <li>
                            <i className="bi bi-geo-alt" aria-hidden="true" />
                            {place}
                        </li>
                    )}
                </ul>

                <Link href={eventUrl(event)} className="gp-card-link">
                    {t.viewDetails}
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}

function FeaturedEvent({ event, lang, t, labels }) {
    const title = localized(event, "title", lang);
    const excerpt = localized(event, "excerpt", lang);
    const place = placeOf(event, lang);

    return (
        <article className="gp-feature">
            <Link href={eventUrl(event)} className="gp-feature-media" aria-label={title}>
                <Cover src={event.cover_image_url} alt={title} icon="bi-calendar-event" eager />
            </Link>

            <div className="gp-feature-body">
                <div className="gp-feature-tags">
                    <span className="gp-eyebrow">
                        <i className="bi bi-star-fill" aria-hidden="true" />
                        {t.featured}
                    </span>
                    <StatusPill status={eventStatus(event)} labels={labels} />
                </div>

                <h2>
                    <Link href={eventUrl(event)}>{title}</Link>
                </h2>

                {excerpt && <p>{excerpt}</p>}

                <ul className="gp-meta is-large">
                    <li>
                        <i className="bi bi-calendar3" aria-hidden="true" />
                        {formatDate(event.starts_at, lang) || t.dateUnavailable}
                    </li>
                    {place && (
                        <li>
                            <i className="bi bi-geo-alt" aria-hidden="true" />
                            {place}
                        </li>
                    )}
                </ul>

                <Link href={eventUrl(event)} className="gp-button">
                    {t.viewEvent}
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}

export default function Index({ featuredEvent, upcomingEvents = [], ongoingEvents = [], pastEvents = [] }) {
    const { lang, t: content } = useGaf();
    const t = content.eventsPage;
    const [filter, setFilter] = useState("all");

    const labels = {
        upcoming: t.upcomingLabel,
        ongoing: t.ongoingLabel,
        past: t.pastLabel,
        cancelled: t.cancelled,
    };

    const groups = [
        { key: "ongoing", title: t.ongoing, items: ongoingEvents, empty: t.noOngoing },
        { key: "upcoming", title: t.upcoming, items: upcomingEvents, empty: t.noUpcoming },
        { key: "past", title: t.past, items: pastEvents, empty: t.noPast },
    ];

    const total = ongoingEvents.length + upcomingEvents.length + pastEvents.length;

    const tabs = [
        { key: "all", label: t.allEvents, count: total },
        ...groups.map((group) => ({ key: group.key, label: labels[group.key], count: group.items.length })),
    ];

    // "All" hides empty groups so the page does not fill up with empty boxes.
    const visibleGroups = useMemo(
        () => (filter === "all" ? groups.filter((group) => group.items.length) : groups.filter((group) => group.key === filter)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filter, upcomingEvents, ongoingEvents, pastEvents, lang]
    );

    return (
        <>
            <Head title={t.pageTitle} />

            <main className="gp-page">
                <PageHero
                    icon="bi-calendar-event"
                    crumbs={[
                        { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                        { label: t.title },
                    ]}
                    eyebrow={t.eyebrow}
                    title={t.title}
                    intro={t.intro}
                    topics={t.topics || []}
                    stats={[
                        { label: t.upcomingLabel, value: upcomingEvents.length },
                        { label: t.ongoingLabel, value: ongoingEvents.length },
                        { label: t.pastLabel, value: pastEvents.length },
                    ]}
                />

                <div className="gaf-container gp-content">
                    {featuredEvent && <FeaturedEvent event={featuredEvent} lang={lang} t={t} labels={labels} />}

                    {total > 0 ? (
                        <>
                            <div className="gp-toolbar" role="tablist" aria-label={t.allEvents}>
                                <div className="gp-tabs">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            role="tab"
                                            aria-selected={filter === tab.key}
                                            className={filter === tab.key ? "is-active" : ""}
                                            onClick={() => setFilter(tab.key)}
                                        >
                                            {tab.label}
                                            <span>{tab.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {visibleGroups.map((group) => (
                                <section key={group.key} className="gp-section">
                                    <SectionTitle
                                        eyebrow={labels[group.key]}
                                        title={group.title}
                                        aside={<span className="gp-count">{group.items.length}</span>}
                                    />

                                    {group.items.length ? (
                                        <div className="gp-grid">
                                            {group.items.map((event) => (
                                                <EventCard key={event.id} event={event} lang={lang} t={t} labels={labels} />
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState icon="bi-calendar-x" title={group.empty} />
                                    )}
                                </section>
                            ))}
                        </>
                    ) : (
                        !featuredEvent && <EmptyState icon="bi-calendar-x" title={t.noEvents} />
                    )}
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
