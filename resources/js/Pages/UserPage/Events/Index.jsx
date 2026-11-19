import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Breadcrumbs, Cover, EmptyState, StatusPill } from "@/Components/Gaf/Page";
import { dateParts, eventStatus, formatDate, formatTime, localized, pick } from "@/lib/gafLocale";

const eventUrl = (event) => route("events.show", { event: event.slug });

const placeOf = (event, lang) =>
    [localized(event, "venue", lang), localized(event, "city", lang)].filter(Boolean).join(", ");

/** Small horizontal event card: thumbnail with date badge, text right. */
function EventPost({ event, lang, t, labels, featured = false }) {
    const title = localized(event, "title", lang);
    const excerpt = localized(event, "excerpt", lang);
    const category = localized(event.category, "name", lang);
    const place = placeOf(event, lang);
    const time = formatTime(event.starts_at, lang);
    const parts = dateParts(event.starts_at, lang);

    return (
        <article className={`bl-post${featured ? " is-featured" : ""}`}>
            <Link href={eventUrl(event)} className="bl-post-thumb" aria-label={title}>
                <Cover src={event.cover_image_url} alt={title} icon="bi-calendar-event" />
                {parts && (
                    <span className="bl-date">
                        <strong>{parts.day}</strong>
                        <span>{parts.month}</span>
                    </span>
                )}
            </Link>

            <div className="bl-post-body">
                <div className="bl-post-meta">
                    {featured && (
                        <span className="bl-badge">
                            <i className="bi bi-star-fill" aria-hidden="true" /> {t.featured}
                        </span>
                    )}
                    <StatusPill status={eventStatus(event)} labels={labels} />
                    {category && <span className="bl-cat">{category}</span>}
                </div>

                <h2 className="bl-post-title">
                    <Link href={eventUrl(event)}>{title}</Link>
                </h2>

                {excerpt && <p className="bl-post-excerpt">{excerpt}</p>}

                <div className="bl-post-foot">
                    <span>
                        <i className="bi bi-calendar3" aria-hidden="true" /> {formatDate(event.starts_at, lang) || t.dateUnavailable}
                        {time && ` · ${time}`}
                    </span>
                    {place && (
                        <span>
                            <i className="bi bi-geo-alt" aria-hidden="true" /> {place}
                        </span>
                    )}
                    <Link href={eventUrl(event)} className="bl-more">
                        {t.viewDetails} <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
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

    const visibleGroups = filter === "all" ? groups.filter((group) => group.items.length) : groups.filter((group) => group.key === filter);

    const comingUp = [...ongoingEvents, ...upcomingEvents].slice(0, 4);

    return (
        <>
            <Head title={t.pageTitle} />

            <main className="bl-page">
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
                                {total} {pick(lang, { en: total === 1 ? "activity" : "activities", rw: "ibikorwa" })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="gaf-container bl-layout">
                    <section className="bl-main" aria-label={t.allEvents}>
                        {/* Filters */}
                        <div className="bl-chips" role="tablist" aria-label={t.allEvents}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === tab.key}
                                    className={filter === tab.key ? "is-active" : ""}
                                    onClick={() => setFilter(tab.key)}
                                >
                                    {tab.label} <em>{tab.count}</em>
                                </button>
                            ))}
                        </div>

                        {total === 0 && <EmptyState icon="bi-calendar-x" title={t.noEvents} />}

                        {visibleGroups.map((group) => (
                            <div key={group.key} className="bl-group">
                                {filter === "all" && (
                                    <h2 className="bl-group-title">
                                        {group.title} <span>{group.items.length}</span>
                                    </h2>
                                )}
                                {group.items.length ? (
                                    <div className="bl-list">
                                        {group.items.map((event) => (
                                            <EventPost key={event.id} event={event} lang={lang} t={t} labels={labels} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState icon="bi-calendar-x" title={group.empty} />
                                )}
                            </div>
                        ))}
                    </section>

                    {/* Sidebar */}
                    <aside className="bl-side">
                        {featuredEvent && (
                            <div className="bl-widget">
                                <h3>{t.featured}</h3>
                                <Link href={eventUrl(featuredEvent)} className="bl-feature-card">
                                    <Cover src={featuredEvent.cover_image_url} alt="" icon="bi-calendar-event" />
                                    <strong>{localized(featuredEvent, "title", lang)}</strong>
                                    <small>
                                        <i className="bi bi-calendar3" aria-hidden="true" /> {formatDate(featuredEvent.starts_at, lang) || t.dateUnavailable}
                                    </small>
                                    {placeOf(featuredEvent, lang) && (
                                        <small>
                                            <i className="bi bi-geo-alt" aria-hidden="true" /> {placeOf(featuredEvent, lang)}
                                        </small>
                                    )}
                                </Link>
                            </div>
                        )}

                        <div className="bl-widget">
                            <h3>{pick(lang, { en: "Coming up", rw: "Ibiteganyijwe" })}</h3>
                            {comingUp.length ? (
                                <ul className="bl-agenda">
                                    {comingUp.map((event) => {
                                        const parts = dateParts(event.starts_at, lang);
                                        return (
                                            <li key={event.id}>
                                                <Link href={eventUrl(event)}>
                                                    <span className="bl-agenda-date">
                                                        <strong>{parts?.day || "—"}</strong>
                                                        <span>{parts?.month || ""}</span>
                                                    </span>
                                                    <span className="bl-agenda-text">
                                                        <strong>{localized(event, "title", lang)}</strong>
                                                        <small>{placeOf(event, lang) || t.locationUnavailable}</small>
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="bl-widget-empty">{t.noUpcoming}</p>
                            )}
                        </div>

                        <div className="bl-widget bl-widget-cta">
                            <h3>{content.galleryPage?.title || "Gallery"}</h3>
                            <p>{pick(lang, { en: "Photos and videos from our activities.", rw: "Amafoto n’amashusho y’ibikorwa byacu." })}</p>
                            <Link href={route("gallery.index")} className="bl-more">
                                {content.galleryPage?.viewAll || "View all"} <i className="bi bi-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="bl-widget bl-widget-cta is-blue">
                            <h3>{content.newsPage?.title || "News"}</h3>
                            <p>{pick(lang, { en: "Latest news and announcements about the study.", rw: "Amakuru mashya n’amatangazo y’ubushakashatsi." })}</p>
                            <Link href={route("news.index")} className="bl-more">
                                {content.newsPage?.viewAll || "View all news"} <i className="bi bi-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
