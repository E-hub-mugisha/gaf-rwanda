import { Head, Link, usePage, router } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdminLang, ADMIN_LANGUAGES } from "@/lib/adminI18n";
import { useAdminAutoTranslate } from "@/lib/adminAutoTranslate";
import "../../css/admin.css";
import "../../css/admin-dashboard.css";
import "../../css/admin-minimal.css";
import "../../css/admin-theme.css";
import {
    CommandPalette,
    ShortcutsHelp,
    Toaster,
    useShortcuts,
    useUnsavedGuard,
} from "@/Components/Admin/AdminTools";

const COLLAPSE_KEY = "gaf_admin_sidebar_collapsed";

const initialsOf = (name) => {
    if (!name) return "A";
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

const safeRoute = (name) => {
    try {
        return route(name);
    } catch {
        return null;
    }
};

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const flash = props.flash || {};

    const { lang, t, setLang } = useAdminLang();

    // Translate pages whose interface text is written in English.
    useAdminAutoTranslate(lang);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuFilter, setMenuFilter] = useState("");
    const [collapsed, setCollapsed] = useState(() => {
        try {
            return localStorage.getItem(COLLAPSE_KEY) === "1";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // Command palette (Ctrl+K), shortcuts help (?) and unsaved-changes guard.
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const openPalette = useCallback(() => {
        setHelpOpen(false);
        setPaletteOpen(true);
    }, []);
    const openHelp = useCallback(() => {
        setPaletteOpen(false);
        setHelpOpen(true);
    }, []);
    const closeAll = useCallback(() => {
        setPaletteOpen(false);
        setHelpOpen(false);
    }, []);

    useShortcuts({ openPalette, openHelp, closeAll });
    useUnsavedGuard(t);

    useEffect(() => {
        closeAll();
    }, [url, closeAll]);

    useEffect(() => {
        setMobileOpen(false);
    }, [url]);

    const toggleCollapsed = () => {
        setCollapsed((value) => {
            try {
                localStorage.setItem(COLLAPSE_KEY, value ? "0" : "1");
            } catch {
                // Preference is optional.
            }
            return !value;
        });
    };

    const navigation = useMemo(
        () => [
            {
                label: t("content"),
                items: [
                    { label: t("dashboard"), icon: "bi-grid-1x2", route: "admin.dashboard", path: "/admin/dashboard" },
                    { label: t("heroMedia"), icon: "bi-play-btn", route: "admin.hero-media.index", path: "/admin/hero-media" },
                    { label: t("events"), icon: "bi-calendar-event", route: "admin.events.index", path: "/admin/events" },
                    { label: t("eventCategories"), icon: "bi-tags", route: "admin.event-categories.index", path: "/admin/event-categories" },
                    { label: t("newsArticles"), icon: "bi-newspaper", route: "admin.news-articles.index", path: "/admin/news-articles" },
                    { label: t("newsCategories"), icon: "bi-folder2-open", route: "admin.news-categories.index", path: "/admin/news-categories" },
                    { label: t("team"), icon: "bi-diagram-3", route: "admin.team.index", path: "/admin/team" },
                    { label: t("faqs"), icon: "bi-question-circle", route: "admin.faqs.index", path: "/admin/faqs" },
                    { label: t("programs"), icon: "bi-collection", route: "admin.programs.index", path: "/admin/programs" },
                ],
            },
            {
                label: t({ en: "ENGAGEMENT", rw: "ITUMANAHO" }),
                items: [
                    { label: t({ en: "Documents", rw: "Inyandiko" }), icon: "bi-file-earmark-text", route: "admin.documents.index", path: "/admin/documents" },
                    { label: t({ en: "Mental health content", rw: "Ubuzima bwo mu mutwe" }), icon: "bi-heart-pulse", route: "admin.health-content.depression.show", path: "/admin/health-content" },
                ],
            },
            {
                label: t("management"),
                items: [
                    { label: t("users"), icon: "bi-people", route: "admin.users.index", path: "/admin/users" },
                    { label: t("analytics"), icon: "bi-bar-chart-line", route: "admin.analytics.index", path: "/admin/analytics" },
                    { label: t("activity"), icon: "bi-clock-history", route: "admin.activity.index", path: "/admin/activity" },
                    { label: t("settings"), icon: "bi-gear", route: "admin.settings.edit", path: "/admin/settings" },
                ],
            },
        ],
        [t]
    );

    // Hide links whose route does not exist and apply the menu search.
    const visibleNavigation = navigation
        .map((section) => ({
            ...section,
            items: section.items.filter((item) => {
                if (!safeRoute(item.route)) return false;
                return !menuFilter || item.label.toLowerCase().includes(menuFilter.toLowerCase());
            }),
        }))
        .filter((section) => section.items.length);

    const isActive = (path) => url === path || url.startsWith(`${path}/`) || url.startsWith(`${path}?`);

    const logout = (event) => {
        event.preventDefault();
        router.post(route("logout"));
    };

    const roleLabel = user?.role === "admin" ? t("administrator") : user?.role || "";

    return (
        <>
            {title && <Head title={title} />}

            <div className={`adm-shell has-toasts${collapsed ? " is-collapsed" : ""}${mobileOpen ? " is-mobile-open" : ""}`}>
                <button
                    type="button"
                    className="adm-overlay"
                    onClick={() => setMobileOpen(false)}
                    aria-label={t("close")}
                    tabIndex={mobileOpen ? 0 : -1}
                />

                {/* SIDEBAR */}
                <aside className="adm-sidebar">
                    <div className="adm-brand">
                        <span className="adm-brand-logo">
                            <img src="/images/guided-logo.png" alt="" />
                        </span>
                        <span className="adm-brand-text">
                            <strong>GAF Rwanda</strong>
                            <small>{t("portal")}</small>
                        </span>
                        <button
                            type="button"
                            className="adm-sidebar-close"
                            onClick={() => setMobileOpen(false)}
                            aria-label={t("close")}
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>

                    <div className="adm-menu-search">
                        <i className="bi bi-search" />
                        <input
                            type="search"
                            value={menuFilter}
                            onChange={(event) => setMenuFilter(event.target.value)}
                            placeholder={t("searchPlaceholder")}
                            aria-label={t("searchPlaceholder")}
                        />
                    </div>

                    <nav className="adm-nav" aria-label="Admin navigation">
                        {visibleNavigation.map((section) => (
                            <div className="adm-nav-section" key={section.label}>
                                <span className="adm-nav-label">{section.label}</span>

                                {section.items.map((item) => {
                                    const active = isActive(item.path);

                                    return (
                                        <Link
                                            key={item.route}
                                            href={route(item.route)}
                                            className={`adm-nav-item${active ? " is-active" : ""}`}
                                            aria-current={active ? "page" : undefined}
                                            title={collapsed ? item.label : undefined}
                                        >
                                            <i className={`bi ${item.icon}`} />
                                            <span className="adm-nav-text">{item.label}</span>
                                            {item.badge > 0 && <span className="adm-nav-badge">{item.badge}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    <div className="adm-sidebar-footer">
                        <a className="adm-nav-item" href="/" target="_blank" rel="noreferrer" title={collapsed ? t("viewWebsite") : undefined}>
                            <i className="bi bi-box-arrow-up-right" />
                            <span className="adm-nav-text">{t("viewWebsite")}</span>
                        </a>

                        <form onSubmit={logout}>
                            <button type="submit" className="adm-nav-item adm-logout" title={collapsed ? t("signOut") : undefined}>
                                <i className="bi bi-box-arrow-left" />
                                <span className="adm-nav-text">{t("signOut")}</span>
                            </button>
                        </form>
                    </div>
                </aside>

                {/* MAIN */}
                <div className="adm-main">
                    <header className="adm-topbar">
                        <button
                            type="button"
                            className="adm-icon-btn adm-mobile-toggle"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Menu"
                        >
                            <i className="bi bi-list" />
                        </button>

                        <button
                            type="button"
                            className="adm-icon-btn adm-collapse-toggle"
                            onClick={toggleCollapsed}
                            aria-label="Toggle sidebar"
                        >
                            <i className={`bi ${collapsed ? "bi-layout-sidebar" : "bi-layout-sidebar-inset"}`} />
                        </button>

                        <div className="adm-topbar-title">
                            <span>{t("administration")}</span>
                            <h1>{title || t("dashboard")}</h1>
                        </div>

                        <div className="adm-topbar-actions">
                            <button type="button" className="adm-search-trigger" onClick={openPalette}>
                                <i className="bi bi-search" aria-hidden="true" />
                                <span>{t({ en: "Search or jump to…", rw: "Shakisha cyangwa ujye…" })}</span>
                                <kbd>Ctrl K</kbd>
                            </button>

                            <button
                                type="button"
                                className="adm-icon-btn"
                                onClick={openHelp}
                                aria-label={t({ en: "Keyboard shortcuts", rw: "Inzira z’ubusamo" })}
                                title={t({ en: "Keyboard shortcuts (?)", rw: "Inzira z’ubusamo (?)" })}
                            >
                                <i className="bi bi-keyboard" />
                            </button>

                            <div className="adm-lang" role="group" aria-label={t("language")}>
                                {Object.keys(ADMIN_LANGUAGES).map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        className={lang === code ? "is-active" : ""}
                                        aria-pressed={lang === code}
                                        title={ADMIN_LANGUAGES[code]}
                                        onClick={() => setLang(code)}
                                    >
                                        {code.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="adm-user">
                                <span className="adm-user-avatar">{initialsOf(user?.name)}</span>
                                <span className="adm-user-text">
                                    <strong>{user?.name || t("administrator")}</strong>
                                    <small>{roleLabel}</small>
                                </span>
                            </div>
                        </div>
                    </header>

                    <main className="adm-content">{children}</main>

                    <footer className="adm-footer">
                        <span>© {new Date().getFullYear()} Guided Act &amp; Feel Rwanda</span>
                        <span className="adm-footer-status">
                            <i /> {t("systemOnline")}
                        </span>
                    </footer>
                </div>
            </div>

            <CommandPalette open={paletteOpen} onClose={closeAll} navigation={navigation} t={t} />
            <ShortcutsHelp open={helpOpen} onClose={closeAll} t={t} />
            <Toaster initialFlash={flash} t={t} />
        </>
    );
}
