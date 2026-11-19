import React from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { AlbumCard, Breadcrumbs, Cover, SectionTitle, ShareLinks, StatusPill } from "@/Components/Gaf/Page";
import { dateParts, eventStatus, formatDate, formatTime, localized, pick } from "@/lib/gafLocale";

const agendaOf = (event, lang) => {
    if (lang === "rw" && Array.isArray(event.agenda_rw) && event.agenda_rw.length) return event.agenda_rw;
    return Array.isArray(event.agenda) ? event.agenda : [];
};

// Agenda items can be plain strings or { time, title, description } objects.
const agendaItem = (item, lang) => {
    if (typeof item === "string") return { title: item };
    if (!item || typeof item !== "object") return null;

    return {
        time: item.time || item.start_time || "",
        title: localized(item, "title", lang),
        description: localized(item, "description", lang),
    };
};

function InfoRow({ icon, label, children }) {
    return (
        <li className="gp-info-row">
            <span className="gp-info-icon">
                <i className={`bi ${icon}`} aria-hidden="true" />
            </span>
            <div>
                <small>{label}</small>
                <strong>{children}</strong>
            </div>
        </li>
    );
}

export default function Show({ event, relatedEvents = [] }) {
    const { lang, t: content } = useGaf();
    const t = content.eventsPage;

    const title = localized(event, "title", lang);
    const excerpt = localized(event, "excerpt", lang);
    const description = localized(event, "description", lang);
    const category = localized(event.category, "name", lang);
    const venue = localized(event, "venue", lang);
    const address = localized(event, "address", lang);
    const city = localized(event, "city", lang);
    const location = [venue, address, city].filter(Boolean).join(", ");

    const status = eventStatus(event);
    const labels = {
        upcoming: t.upcomingLabel,
        ongoing: t.ongoingLabel,
        past: t.pastLabel,
        cancelled: t.cancelled,
    };

    const startTime = formatTime(event.starts_at, lang);
    const endTime = formatTime(event.ends_at, lang);
    const sameDay = event.ends_at && formatDate(event.starts_at, lang) === formatDate(event.ends_at, lang);
    const agenda = agendaOf(event, lang).map((item) => agendaItem(item, lang)).filter((item) => item?.title);
    const galleries = event.galleries || [];
    const parts = dateParts(event.starts_at, lang);
    const canRegister = event.registration_url && status !== "past" && status !== "cancelled";

    return (
        <>
            <Head title={`${title} | GAF Rwanda`}>
                <meta head-key="description" name="description" content={excerpt || title} />
                <meta head-key="og:title" property="og:title" content={title} />
                {event.cover_image_url && <meta head-key="og:image" property="og:image" content={event.cover_image_url} />}
            </Head>

            <main className="gp-page">
                {/* Header */}
                <section className="gp-detail-hero">
                    <div className="gaf-container gp-detail-hero-inner">
                        <Breadcrumbs
                            items={[
                                { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                                { label: t.title, href: route("events.index") },
                                { label: title },
                            ]}
                        />

                        <div className="gp-detail-hero-tags">
                            <StatusPill status={status} labels={labels} />
                            {category && <span className="gp-tag">{category}</span>}
                        </div>

                        <h1>{title}</h1>
                        {excerpt && <p className="gp-detail-lead">{excerpt}</p>}

                        <ul className="gp-meta is-large">
                            <li>
                                <i className="bi bi-calendar3" aria-hidden="true" />
                                {formatDate(event.starts_at, lang) || t.dateUnavailable}
                                {startTime && ` · ${startTime}`}
                            </li>
                            {location && (
                                <li>
                                    <i className="bi bi-geo-alt" aria-hidden="true" />
                                    {location}
                                </li>
                            )}
                        </ul>
                    </div>
                </section>

                {event.cover_image_url && (
                    <div className="gaf-container">
                        <figure className="gp-article-figure">
                            <Cover src={event.cover_image_url} alt={title} icon="bi-calendar-event" eager />
                        </figure>
                    </div>
                )}

                <div className="gaf-container gp-detail-layout">
                    <div className="gp-detail-main">
                        {description && (
                            <section className="gp-block">
                                <h2>{pick(lang, { en: "About this activity", rw: "Ibisobanuro birambuye" })}</h2>
                                <div className="gp-prose" dangerouslySetInnerHTML={{ __html: description }} />
                            </section>
                        )}

                        {agenda.length > 0 && (
                            <section className="gp-block">
                                <h2>{t.agenda}</h2>
                                <ol className="gp-timeline">
                                    {agenda.map((item, index) => (
                                        <li key={index}>
                                            <span className="gp-timeline-dot">{String(index + 1).padStart(2, "0")}</span>
                                            <div>
                                                {item.time && <small>{item.time}</small>}
                                                <strong>{item.title}</strong>
                                                {item.description && <p>{item.description}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {galleries.length > 0 && (
                            <section className="gp-block">
                                <h2>{t.gallery}</h2>
                                <div className="gp-mini-grid">
                                    {galleries.map((gallery) => (
                                        <AlbumCard
                                            key={gallery.id}
                                            href={route("gallery.show", { slug: gallery.slug })}
                                            image={gallery.cover_image_url}
                                            title={localized(gallery, "title", lang)}
                                            count={gallery.media_count || 0}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="gp-detail-aside">
                        <div className="gp-panel gp-sticky">
                            {parts && (
                                <div className="gp-panel-date">
                                    <span className="gp-date-tile is-large">
                                        <strong>{parts.day}</strong>
                                        <span>{parts.month}</span>
                                    </span>
                                    <div>
                                        <small>{t.date}</small>
                                        <strong>{formatDate(event.starts_at, lang)}</strong>
                                    </div>
                                </div>
                            )}

                            <ul className="gp-info">
                                {(startTime || endTime) && (
                                    <InfoRow icon="bi-clock" label={t.time}>
                                        {[startTime, sameDay ? endTime : ""].filter(Boolean).join(" – ")}
                                    </InfoRow>
                                )}
                                {event.ends_at && !sameDay && (
                                    <InfoRow icon="bi-calendar-check" label={t.endDate}>
                                        {formatDate(event.ends_at, lang)}
                                        {endTime && ` · ${endTime}`}
                                    </InfoRow>
                                )}
                                <InfoRow icon="bi-geo-alt" label={t.location}>
                                    {location || t.locationUnavailable}
                                </InfoRow>
                                {category && (
                                    <InfoRow icon="bi-tag" label={t.category}>
                                        {category}
                                    </InfoRow>
                                )}
                                {event.program?.title && (
                                    <InfoRow icon="bi-diagram-3" label={t.program}>
                                        {event.program.title}
                                    </InfoRow>
                                )}
                            </ul>

                            {canRegister && (
                                <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="gp-button is-block">
                                    {t.register}
                                    <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                                </a>
                            )}

                            <div className="gp-panel-share">
                                <small>{t.share}</small>
                                <ShareLinks title={title} lang={lang} />
                            </div>
                        </div>

                        <Link href={route("events.index")} className="gp-back">
                            <i className="bi bi-arrow-left" aria-hidden="true" />
                            {t.backToEvents}
                        </Link>
                    </aside>
                </div>

                {relatedEvents.length > 0 && (
                    <section className="gp-related">
                        <div className="gaf-container">
                            <SectionTitle
                                eyebrow={pick(lang, { en: "Keep exploring", rw: "Komeza urebe" })}
                                title={t.related}
                                aside={
                                    <Link href={route("events.index")} className="gp-card-link">
                                        {t.allEvents}
                                        <i className="bi bi-arrow-right" aria-hidden="true" />
                                    </Link>
                                }
                            />
                            <div className="gp-grid">
                                {relatedEvents.map((item) => {
                                    const itemTitle = localized(item, "title", lang);
                                    const url = route("events.show", { event: item.slug });
                                    return (
                                        <article key={item.id} className="gp-card">
                                            <Link href={url} className="gp-card-media" aria-label={itemTitle}>
                                                <Cover src={item.cover_image_url} alt={itemTitle} icon="bi-calendar-event" />
                                                <StatusPill status={eventStatus(item)} labels={labels} />
                                            </Link>
                                            <div className="gp-card-body">
                                                <ul className="gp-meta">
                                                    <li>
                                                        <i className="bi bi-calendar3" aria-hidden="true" />
                                                        {formatDate(item.starts_at, lang) || t.dateUnavailable}
                                                    </li>
                                                </ul>
                                                <h3>
                                                    <Link href={url}>{itemTitle}</Link>
                                                </h3>
                                                <Link href={url} className="gp-card-link">
                                                    {t.viewDetails}
                                                    <i className="bi bi-arrow-right" aria-hidden="true" />
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}

Show.layout = (page) => <GafLayout>{page}</GafLayout>;
