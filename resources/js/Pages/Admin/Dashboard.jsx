import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import AnalyticsAssistant from "@/Components/Admin/AnalyticsAssistant";
import { useAdminLang } from "@/lib/adminI18n";

const safeRoute = (name, params) => {
    try {
        return route(name, params);
    } catch {
        return null;
    }
};

const number = (value) => new Intl.NumberFormat().format(value ?? 0);

const STATUS_TONE = {
    published: "success",
    draft: "secondary",
    cancelled: "danger",
    new: "primary",
    read: "secondary",
    replied: "success",
    archived: "dark",
};

const LABELS = {
    events: { en: "Events", rw: "Ibikorwa" },
    news: { en: "News articles", rw: "Amakuru" },
    faqs: { en: "FAQs", rw: "Ibibazo" },
    team: { en: "Team members", rw: "Abagize itsinda" },
    galleries: { en: "Galleries", rw: "Amafoto" },
    categories: { en: "Event categories", rw: "Ibyiciro by’ibikorwa" },
    newsCategories: { en: "News categories", rw: "Ibyiciro by’amakuru" },
};

function StatCard({ icon, tone, label, value, hint, href }) {
    const body = (
        <>
            <span className={`adm-icon is-${tone}`}>
                <i className={`bi ${icon}`} />
            </span>
            <div className="adm-stat-text">
                <span>{label}</span>
                <strong>{number(value)}</strong>
                {hint && <small>{hint}</small>}
            </div>
            {href && <i className="bi bi-arrow-up-right adm-stat-arrow" />}
        </>
    );

    return href ? (
        <Link href={href} className="adm-stat">
            {body}
        </Link>
    ) : (
        <div className="adm-stat">{body}</div>
    );
}

/**
 * "Missing information": content with gaps (translation, image, summary,
 * location, draft). Each row expands to show the items with a fix link.
 */
function ContentHealthPanel({ report, t }) {
    const [open, setOpen] = useState(report.issues[0]?.key ?? null);
    const healthy = report.issues.length === 0;
    const passed = report.checks - report.issues.length;

    return (
        <section className="adm-card adm-panel adm-health">
            <div className="adm-panel-head">
                <h3>
                    <i className="bi bi-clipboard2-check" /> {t({ en: "Missing information", rw: "Amakuru abura" })}
                </h3>
                <span className={`adm-health-score${healthy ? " is-ok" : ""}`}>
                    {passed}/{report.checks} {t({ en: "checks passed", rw: "byujujwe" })}
                </span>
            </div>

            {healthy ? (
                <p className="adm-panel-empty">
                    <i className="bi bi-check-circle me-2" />
                    {t({ en: "Everything is complete. No missing information found.", rw: "Byose byuzuye. Nta makuru abura." })}
                </p>
            ) : (
                <ul className="adm-health-list">
                    {report.issues.map((issue) => {
                        const expanded = open === issue.key;
                        return (
                            <li key={issue.key} className={`is-${issue.tone}${expanded ? " is-open" : ""}`}>
                                <button
                                    type="button"
                                    className="adm-health-row"
                                    aria-expanded={expanded}
                                    onClick={() => setOpen(expanded ? null : issue.key)}
                                >
                                    <span className="adm-health-icon">
                                        <i className={`bi ${issue.icon}`} />
                                    </span>
                                    <span className="adm-health-label">{t(issue.label)}</span>
                                    <span className="adm-health-count">{number(issue.count)}</span>
                                    <i className={`bi bi-chevron-${expanded ? "up" : "down"} adm-health-chevron`} />
                                </button>

                                {expanded && (
                                    <ul className="adm-health-items">
                                        {issue.items.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.url}>
                                                    <span>{item.title || t({ en: "Open settings", rw: "Fungura igenamiterere" })}</span>
                                                    <em>
                                                        {t({ en: "Fix", rw: "Kosora" })} <i className="bi bi-arrow-right" />
                                                    </em>
                                                </Link>
                                            </li>
                                        ))}
                                        {issue.count > issue.items.length && (
                                            <li className="adm-health-more">
                                                {t({
                                                    en: `+ ${number(issue.count - issue.items.length)} more`,
                                                    rw: `+ ${number(issue.count - issue.items.length)} bindi`,
                                                })}
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

function Panel({ title, icon, href, linkLabel, children }) {
    return (
        <section className="adm-card adm-panel">
            <div className="adm-panel-head">
                <h3>
                    <i className={`bi ${icon}`} /> {title}
                </h3>
                {href && (
                    <Link href={href} className="adm-panel-link">
                        {linkLabel} <i className="bi bi-arrow-right" />
                    </Link>
                )}
            </div>
            {children}
        </section>
    );
}

export default function Dashboard({
    stats = {},
    statistics = {},
    recentEvents = [],
    recentNews = [],
    recentDocuments = [],
    translations = [],
    contentHealth = { total: 0, checks: 0, issues: [] },
}) {
    const { t } = useAdminLang();
    const { auth } = usePage().props;
    const [assistantOpen, setAssistantOpen] = useState(false);

    const firstName = (auth?.user?.name || "").split(" ")[0];
    const hour = new Date().getHours();
    const greeting =
        hour < 12
            ? t({ en: "Good morning", rw: "Mwaramutse" })
            : t({ en: "Good afternoon", rw: "Mwiriwe" });

    const totalItems = translations.reduce((sum, item) => sum + item.total, 0);
    const translatedItems = translations.reduce((sum, item) => sum + item.translated, 0);
    const coverage = totalItems ? Math.round((translatedItems / totalItems) * 100) : 0;

    const quickActions = [
        { label: t({ en: "New event", rw: "Igikorwa gishya" }), icon: "bi-calendar-plus", href: safeRoute("admin.events.create"), tone: "blue" },
        { label: t({ en: "New article", rw: "Inkuru nshya" }), icon: "bi-pencil-square", href: safeRoute("admin.news-articles.create"), tone: "green" },
        { label: t({ en: "Team member", rw: "Ugize itsinda" }), icon: "bi-person-plus", href: safeRoute("admin.team.index"), tone: "yellow" },
        { label: t({ en: "Add FAQ", rw: "Ongeraho ikibazo" }), icon: "bi-question-circle", href: safeRoute("admin.faqs.index"), tone: "blue" },
        { label: t({ en: "Hero video", rw: "Video y’ahabanza" }), icon: "bi-play-btn", href: safeRoute("admin.hero-media.index"), tone: "green" },
        { label: t("settings"), icon: "bi-gear", href: safeRoute("admin.settings.edit"), tone: "yellow" },
    ].filter((action) => action.href);

    return (
        <AdminLayout title={t("dashboard")}>
            <Head title={t("dashboard")} />

            <div className="adm-page">
                {/* Welcome banner */}
                <section className="adm-hero">
                    <div>
                        <span className="adm-hero-eyebrow">GUIDED ACT &amp; FEEL · RWANDA</span>
                        <h2>
                            {greeting}
                            {firstName && `, ${firstName}`} 👋
                        </h2>
                        <p>
                            {t({
                                en: "Here is what is happening on the GAF-Rwanda website today.",
                                rw: "Dore uko urubuga rwa GAF-Rwanda ruhagaze uyu munsi.",
                            })}
                        </p>
                    </div>
                    <div className="adm-hero-actions">
                        <a href="/" target="_blank" rel="noreferrer" className="btn btn-light">
                            <i className="bi bi-box-arrow-up-right me-2" />
                            {t("viewWebsite")}
                        </a>
                        <button type="button" className="btn btn-warning" onClick={() => setAssistantOpen(true)}>
                            <i className="bi bi-stars me-2" />
                            {t({ en: "Ask analytics", rw: "Baza Analytics" })}
                        </button>
                    </div>
                </section>

                {/* KPIs */}
                <div className="adm-stats">
                    <StatCard
                        icon="bi-calendar-event"
                        tone="blue"
                        label={t({ en: "Events", rw: "Ibikorwa" })}
                        value={statistics.total_events}
                        hint={t({ en: `${number(statistics.upcoming_events)} upcoming`, rw: `${number(statistics.upcoming_events)} biteganyijwe` })}
                        href={safeRoute("admin.events.index")}
                    />
                    <StatCard
                        icon="bi-newspaper"
                        tone="green"
                        label={t({ en: "Published news", rw: "Amakuru yatangajwe" })}
                        value={statistics.published_news}
                        hint={t({ en: `${number(statistics.draft_news)} drafts`, rw: `${number(statistics.draft_news)} ataratangazwa` })}
                        href={safeRoute("admin.news-articles.index")}
                    />
                    <StatCard
                        icon="bi-diagram-3"
                        tone="yellow"
                        label={t({ en: "Team members", rw: "Abagize itsinda" })}
                        value={statistics.team_members}
                        href={safeRoute("admin.team.index")}
                    />
                    <StatCard
                        icon="bi-images"
                        tone="blue"
                        label={t({ en: "Galleries", rw: "Amafoto" })}
                        value={statistics.total_galleries}
                    />
                    <StatCard
                        icon="bi-question-circle"
                        tone="green"
                        label={t({ en: "Active FAQs", rw: "Ibibazo bikora" })}
                        value={statistics.active_faqs}
                        href={safeRoute("admin.faqs.index")}
                    />
                    <StatCard
                        icon="bi-file-earmark-text"
                        tone="blue"
                        label={t({ en: "Documents", rw: "Inyandiko" })}
                        value={stats.documents}
                        href={safeRoute("admin.documents.index")}
                    />
                    <StatCard
                        icon="bi-people"
                        tone="green"
                        label={t({ en: "Reader accounts", rw: "Konti z’abasoma" })}
                        value={stats.users}
                        hint={t({ en: `${number(stats.admins)} administrators`, rw: `${number(stats.admins)} abayobozi` })}
                        href={safeRoute("admin.users.index")}
                    />
                </div>

                <div className="adm-grid">
                    {/* Left column */}
                    <div className="adm-grid-main">
                        <ContentHealthPanel report={contentHealth} t={t} />

                        <Panel
                            title={t({ en: "Recent events", rw: "Ibikorwa biheruka" })}
                            icon="bi-calendar-event"
                            href={safeRoute("admin.events.index")}
                            linkLabel={t({ en: "View all", rw: "Reba byose" })}
                        >
                            {recentEvents.length ? (
                                <ul className="adm-list">
                                    {recentEvents.map((event) => (
                                        <li key={event.id}>
                                            <Link href={safeRoute("admin.events.show", event.id) || "#"}>
                                                <span className="adm-thumb">
                                                    {event.cover_image ? <img src={event.cover_image} alt="" /> : <i className="bi bi-calendar3" />}
                                                </span>
                                                <span className="adm-list-text">
                                                    <strong>{event.title}</strong>
                                                    <small>
                                                        {event.starts_at}
                                                        {event.category && ` · ${event.category}`}
                                                    </small>
                                                </span>
                                                <span className={`badge bg-${STATUS_TONE[event.status] || "secondary"} bg-opacity-10 text-${STATUS_TONE[event.status] || "secondary"}`}>
                                                    {event.status}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="adm-panel-empty">{t({ en: "No events yet.", rw: "Nta bikorwa biraboneka." })}</p>
                            )}
                        </Panel>

                        <Panel
                            title={t({ en: "Recent news", rw: "Amakuru aheruka" })}
                            icon="bi-newspaper"
                            href={safeRoute("admin.news-articles.index")}
                            linkLabel={t({ en: "View all", rw: "Reba byose" })}
                        >
                            {recentNews.length ? (
                                <ul className="adm-list">
                                    {recentNews.map((article) => (
                                        <li key={article.id}>
                                            <Link href={safeRoute("admin.news-articles.show", article.id) || "#"}>
                                                <span className="adm-thumb">
                                                    {article.featured_image ? <img src={article.featured_image} alt="" /> : <i className="bi bi-newspaper" />}
                                                </span>
                                                <span className="adm-list-text">
                                                    <strong>{article.title}</strong>
                                                    <small>
                                                        {article.published_at || t({ en: "Not published", rw: "Ntiratangazwa" })}
                                                        {article.category && ` · ${article.category}`}
                                                    </small>
                                                </span>
                                                <span className={`badge bg-${STATUS_TONE[article.status] || "secondary"} bg-opacity-10 text-${STATUS_TONE[article.status] || "secondary"}`}>
                                                    {article.status}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="adm-panel-empty">{t({ en: "No articles yet.", rw: "Nta makuru araboneka." })}</p>
                            )}
                        </Panel>

                        {recentDocuments.length > 0 && (
                            <Panel
                                title={t({ en: "Recent documents", rw: "Inyandiko ziheruka" })}
                                icon="bi-file-earmark-text"
                                href={safeRoute("admin.documents.index")}
                                linkLabel={t({ en: "View all", rw: "Reba byose" })}
                            >
                                <ul className="adm-list">
                                    {recentDocuments.map((doc) => (
                                        <li key={doc.id}>
                                            <div>
                                                <span className="adm-thumb">
                                                    <i className="bi bi-file-earmark-text" />
                                                </span>
                                                <span className="adm-list-text">
                                                    <strong>{doc.title}</strong>
                                                    <small>{doc.created_at_human}</small>
                                                </span>
                                                <span className="d-flex gap-1 flex-wrap justify-content-end">
                                                    {doc.versions.map((version) => (
                                                        <span key={version.id} className="badge bg-light text-secondary border">
                                                            {version.language?.toUpperCase()}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Panel>
                        )}
                    </div>

                    {/* Right column */}
                    <aside className="adm-grid-side">
                        <Panel title={t({ en: "Quick actions", rw: "Ibikorwa byihuse" })} icon="bi-lightning-charge">
                            <div className="adm-actions">
                                {quickActions.map((action) => (
                                    <Link key={action.label} href={action.href} className="adm-action">
                                        <span className={`adm-icon is-${action.tone}`}>
                                            <i className={`bi ${action.icon}`} />
                                        </span>
                                        {action.label}
                                    </Link>
                                ))}
                            </div>
                        </Panel>

                        <Panel title={t({ en: "Kinyarwanda translations", rw: "Ubusobanuro mu Kinyarwanda" })} icon="bi-translate">
                            <div className="adm-coverage">
                                <div className="adm-coverage-ring" style={{ "--value": coverage }}>
                                    <strong>{coverage}%</strong>
                                </div>
                                <p>
                                    {t({
                                        en: `${translatedItems} of ${totalItems} content items have a Kinyarwanda version.`,
                                        rw: `${translatedItems} kuri ${totalItems} bifite ubusobanuro mu Kinyarwanda.`,
                                    })}
                                </p>
                            </div>

                            <ul className="adm-progress-list">
                                {translations
                                    .filter((item) => item.total > 0)
                                    .map((item) => {
                                        const percent = Math.round((item.translated / item.total) * 100);
                                        const href = safeRoute(item.route);

                                        return (
                                            <li key={item.key}>
                                                <div className="adm-progress-top">
                                                    {href ? <Link href={href}>{t(LABELS[item.key])}</Link> : t(LABELS[item.key])}
                                                    <span>
                                                        {item.translated}/{item.total}
                                                    </span>
                                                </div>
                                                <div className="adm-progress">
                                                    <span
                                                        className={percent === 100 ? "is-done" : percent < 50 ? "is-low" : ""}
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </Panel>

                    </aside>
                </div>
            </div>

            {!assistantOpen && (
                <button type="button" className="adm-assistant-fab" onClick={() => setAssistantOpen(true)} aria-label={t({ en: "Ask analytics", rw: "Baza Analytics" })}>
                    <i className="bi bi-stars" />
                </button>
            )}

            <AnalyticsAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
        </AdminLayout>
    );
}
