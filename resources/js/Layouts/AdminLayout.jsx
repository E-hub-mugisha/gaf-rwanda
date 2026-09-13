import { Head, Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    getLanguage,
    setLanguage as persistLanguage,
    LANGUAGE_EVENT,
} from "@/lib/Language";

import { BarChart3 } from "lucide-react";

const translations = {
    rw: {
        language: "Ururimi",
        mainMenu: "MENU NKURU",
        dashboard: "Imbonerahamwe",
        documents: "Inyandiko",
        mentalHealth: "Ubuzima bwo mu Mutwe",
        readerAccounts: "Konti z’Abasoma",
        analytics: "Isesengura",
        activity: "Ibikorwa",
        portalInfo: "Portal y’Inyandiko",
        portalDescription: "Gucunga umutungo w’umuryango",
        administration: "UBUYOBOZI",
        systemOnline: "Sisitemu irakora",
        signOut: "Sohoka",
        administrator: "Umuyobozi",
        reader: "Usoma",
        user: "Umukoresha",
        securePortal: "Portal yizewe",
        documentManagement: "Portal yo Gucunga Inyandiko",
        languageNames: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    en: {
        language: "Language",
        mainMenu: "MAIN MENU",
        dashboard: "Dashboard",
        documents: "Documents",
        mentalHealth: "Mental Health",
        readerAccounts: "Reader Accounts",
        analytics: "Analytics",
        activity: "Activity Log",
        portalInfo: "Document Portal",
        portalDescription: "Manage organizational resources",
        administration: "ADMINISTRATION",
        systemOnline: "System Online",
        signOut: "Sign out",
        administrator: "Administrator",
        reader: "Reader",
        user: "User",
        securePortal: "Secure Portal",
        documentManagement: "Document Management Portal",
        languageNames: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    fr: {
        language: "Langue",
        mainMenu: "MENU PRINCIPAL",
        dashboard: "Tableau de bord",
        documents: "Documents",
        mentalHealth: "Santé mentale",
        readerAccounts: "Comptes lecteurs",
        analytics: "Analytique",
        activity: "Journal des activités",
        portalInfo: "Portail documentaire",
        portalDescription: "Gérer les ressources de l’organisation",
        administration: "ADMINISTRATION",
        systemOnline: "Système en ligne",
        signOut: "Se déconnecter",
        administrator: "Administrateur",
        reader: "Lecteur",
        user: "Utilisateur",
        securePortal: "Portail sécurisé",
        documentManagement: "Portail de gestion des documents",
        languageNames: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    nl: {
        language: "Taal",
        mainMenu: "HOOFDMENU",
        dashboard: "Dashboard",
        documents: "Documenten",
        mentalHealth: "Geestelijke gezondheid",
        readerAccounts: "Lezersaccounts",
        analytics: "Analyse",
        activity: "Activiteitenlogboek",
        portalInfo: "Documentenportaal",
        portalDescription: "Organisatiemiddelen beheren",
        administration: "ADMINISTRATIE",
        systemOnline: "System online",
        signOut: "Uitloggen",
        administrator: "Beheerder",
        reader: "Lezer",
        user: "Gebruiker",
        securePortal: "Veilig portaal",
        documentManagement: "Documentbeheerportaal",
        languageNames: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },
};

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();

    const user = props.auth?.user;

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    | Language state now lives in localStorage + a shared "gaf-language-change"
    | window event (see resources/js/lib/language.js). Every component that
    | needs the current language reads it once on mount and then subscribes
    | to the event, so a change made here (or on the login page, or in the
    | Dashboard) instantly propagates everywhere else that's mounted --
    | including across Inertia page navigations within the same tab, which
    | plain localStorage reads on mount cannot do.
    */

    const [language, setLanguageState] = useState(getLanguage);

    const [languageOpen, setLanguageOpen] = useState(false);

    const t = translations[language] || translations.rw;

    useEffect(() => {
        // Keep <html lang="..."> correct even on first paint / hard reloads.
        document.documentElement.lang = language;
    }, []);

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguageState(event.detail);
        };

        window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);

        return () => {
            window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
        };
    }, []);

    const changeLanguage = (lang) => {
        persistLanguage(lang);
        setLanguageOpen(false);
        // No need to call setLanguageState here -- the LANGUAGE_EVENT
        // listener above (and in every other subscribed component) will
        // pick up the change and re-render automatically.
    };

    const isActive = (prefix) => {
        return url.startsWith(prefix);
    };

    const logout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    const getInitials = (name) => {
        if (!name) return "A";

        const parts = name.trim().split(/\s+/);

        if (parts.length === 1) {
            return parts[0].charAt(0).toUpperCase();
        }

        return (
            parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
        ).toUpperCase();
    };

    const initials = getInitials(user?.name);

    const roleLabel =
        user?.role === "admin"
            ? t.administrator
            : user?.role === "user"
              ? t.reader
              : user?.role || t.user;

    return (
        <>
            {title && <Head title={title} />}

            <div className="ngo-admin">
                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <aside className="ngo-sidebar">
                    {/* Brand */}
                    <div className="sidebar-brand">
                        <div className="brand-mark">G</div>

                        <div className="brand-text">
                            <strong>GAF Rwanda</strong>
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="sidebar-content">
                        <div className="nav-label">{t.mainMenu}</div>

                        <nav className="sidebar-nav">
                            {/* Dashboard */}
                            {/* <Link
                                href={route("admin.dashboard")}
                                className={
                                    isActive("/admin/dashboard")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="7"
                                            height="7"
                                            rx="1"
                                        />

                                        <rect
                                            x="14"
                                            y="3"
                                            width="7"
                                            height="7"
                                            rx="1"
                                        />

                                        <rect
                                            x="3"
                                            y="14"
                                            width="7"
                                            height="7"
                                            rx="1"
                                        />

                                        <rect
                                            x="14"
                                            y="14"
                                            width="7"
                                            height="7"
                                            rx="1"
                                        />
                                    </svg>
                                </span>

                                <span>{t.dashboard}</span>
                            </Link> */}

                            {/* Documents */}
                            {/* <Link
                                href={route("admin.documents.index")}
                                className={
                                    isActive("/admin/documents")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H14l6 6v11.5A2.5 2.5 0 0 1 17.5 22h-11A2.5 2.5 0 0 1 4 19.5v-15z" />

                                        <path d="M14 2v6h6" />

                                        <path d="M8 13h8M8 17h6" />
                                    </svg>
                                </span>

                                <span>{t.documents}</span>
                            </Link> */}

                            {/* Mental Health */}
                            {/* <Link
                                href={route(
                                    "admin.health-content.depression.show",
                                )}
                                className={
                                    isActive("/admin/health-content/depression")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9.5 3.5a3.5 3.5 0 0 0-3.4 4.3A3.5 3.5 0 0 0 5 14.5a3.5 3.5 0 0 0 4.5 5.3" />

                                        <path d="M14.5 3.5a3.5 3.5 0 0 1 3.4 4.3A3.5 3.5 0 0 1 19 14.5a3.5 3.5 0 0 1-4.5 5.3" />

                                        <path d="M9.5 3.5v17" />
                                        <path d="M14.5 3.5v17" />

                                        <path d="M6.5 8h3" />
                                        <path d="M14.5 8h3" />

                                        <path d="M6 14h3.5" />
                                        <path d="M14.5 14H18" />

                                        <path d="M9.5 11h5" />
                                    </svg>
                                </span>

                                <span>{t.mentalHealth}</span>
                            </Link> */}

                            {/* Reader Accounts */}
                            <Link
                                href={route("admin.users.index")}
                                className={
                                    isActive("/admin/users")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />

                                        <circle cx="9" cy="7" r="4" />

                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />

                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </span>

                                <span>{t.readerAccounts}</span>
                            </Link>

                            {/* Analytics */}
                            <Link
                                href={route("admin.analytics.index")}
                                className={
                                    isActive("/admin/analytics")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <BarChart3 size={18} />
                                </span>

                                <span>{t.analytics}</span>
                            </Link>

                            {/* Activity */}
                            {/* <Link
                                href={route("admin.activity.index")}
                                className={
                                    isActive("/admin/activity")
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M3 12h4l3-8 4 16 3-8h4" />
                                    </svg>
                                </span>

                                <span>{t.activity}</span>
                            </Link> */}
                        </nav>
                    </div>

                    {/* =================================================
                        SIDEBAR USER
                    ================================================== */}

                    <div className="sidebar-bottom">
                        <div className="admin-profile">
                            <div className="admin-avatar">{initials}</div>

                            <div className="admin-profile-info">
                                <strong>{user?.name || t.administrator}</strong>

                                <span>
                                    {user?.email || "admin@example.com"}
                                </span>

                                <small>{roleLabel}</small>
                            </div>
                        </div>

                        {/* Logout */}
                        <form onSubmit={logout}>
                            <button type="submit" className="logout-button">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M10 17l5-5-5-5" />

                                    <path d="M15 12H3" />

                                    <path d="M21 3v18" />
                                </svg>

                                <span>{t.signOut}</span>
                            </button>
                        </form>
                    </div>
                </aside>

                {/* =====================================================
                    MAIN
                ====================================================== */}

                <main className="ngo-main">
                    {/* Header */}
                    <header className="ngo-header">
                        <div className="header-left">
                            <button
                                type="button"
                                className="mobile-menu"
                                onClick={() => {
                                    document
                                        .querySelector(".ngo-sidebar")
                                        ?.classList.toggle("mobile-open");

                                    document
                                        .querySelector(".sidebar-overlay")
                                        ?.classList.toggle("show");
                                }}
                                aria-label="Open menu"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div>
                                <span className="header-label">
                                    {t.administration}
                                </span>

                                <h1>{title || t.dashboard}</h1>
                            </div>
                        </div>

                        {/* =================================================
                            HEADER RIGHT
                        ================================================== */}

                        <div className="header-right">
                            {/* Language Switcher */}
                            <div className="header-language">
                                <button
                                    type="button"
                                    className="header-language-button"
                                    onClick={() =>
                                        setLanguageOpen(!languageOpen)
                                    }
                                    aria-expanded={languageOpen}
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    >
                                        <circle cx="12" cy="12" r="9" />

                                        <path d="M3 12h18" />

                                        <path d="M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
                                    </svg>

                                    <span>{language.toUpperCase()}</span>

                                    <svg
                                        className={
                                            languageOpen
                                                ? "language-chevron open"
                                                : "language-chevron"
                                        }
                                        width="11"
                                        height="11"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>

                                {languageOpen && (
                                    <div className="header-language-menu">
                                        <div className="language-menu-title">
                                            {t.language}
                                        </div>

                                        {Object.entries(t.languageNames).map(
                                            ([code, name]) => (
                                                <button
                                                    type="button"
                                                    key={code}
                                                    className={
                                                        language === code
                                                            ? "language-option active"
                                                            : "language-option"
                                                    }
                                                    onClick={() =>
                                                        changeLanguage(code)
                                                    }
                                                >
                                                    <span className="language-code">
                                                        {code.toUpperCase()}
                                                    </span>

                                                    <span className="language-name">
                                                        {name}
                                                    </span>

                                                    {language === code && (
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <path d="m5 12 4 4L19 6" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* System Status */}
                            <div className="header-status">
                                <span className="status-dot"></span>

                                {t.systemOnline}
                            </div>

                            {/* User */}
                            <div className="header-user">
                                <div className="header-user-info">
                                    <strong>
                                        {user?.name || t.administrator}
                                    </strong>

                                    <span>
                                        {user?.email || "admin@example.com"}
                                    </span>
                                </div>

                                <div className="header-avatar">{initials}</div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="ngo-content">{children}</div>

                    {/* Footer */}
                    <footer className="ngo-footer">
                        <span>© {new Date().getFullYear()} GAF Rwanda</span>

                        <span className="footer-separator">•</span>

                        <span>{t.documentManagement}</span>

                        <span className="footer-separator">•</span>

                        <span className="footer-user">
                            {user?.name || t.administrator}
                        </span>
                    </footer>
                </main>

                {/* Mobile Overlay */}
                <div
                    className="sidebar-overlay"
                    onClick={() => {
                        document
                            .querySelector(".ngo-sidebar")
                            ?.classList.remove("mobile-open");

                        document
                            .querySelector(".sidebar-overlay")
                            ?.classList.remove("show");
                    }}
                ></div>
            </div>

            {/* =========================================================
                STYLES
            ========================================================== */}

            <style>{`

                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #app {
                    margin: 0;
                    min-height: 100%;
                }

                body {
                    font-family:
                        "Manrope",
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                    background: #f5f7fa;
                    color: #172033;
                }

                button,
                input,
                textarea,
                select {
                    font-family: inherit;
                }

                /* =========================================
                   SHELL
                ========================================= */

                .ngo-admin {
                    min-height: 100vh;

                    display: flex;

                    background: #f5f7fa;
                }


                /* =========================================
                   SIDEBAR
                ========================================= */

                .ngo-sidebar {
                    width: 260px;
                    height: 100vh;

                    position: fixed;

                    left: 0;
                    top: 0;

                    display: flex;
                    flex-direction: column;

                    background: #ffffff;

                    border-right: 1px solid #e7ebf0;

                    z-index: 100;
                }


                /* BRAND */

                .sidebar-brand {
                    height: 82px;

                    padding: 0 24px;

                    display: flex;
                    align-items: center;

                    border-bottom: 1px solid #edf0f4;
                }

                .brand-mark {
                    width: 42px;
                    height: 42px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 11px;

                    background: #5d89c8;

                    color: white;

                    font-size: 19px;
                    font-weight: 800;

                    box-shadow:
                        0 6px 15px rgba(93,137,200,.18);
                }

                .brand-text {
                    margin-left: 12px;

                    display: flex;
                    flex-direction: column;
                }

                .brand-text strong {
                    color: #172033;

                    font-size: 15px;
                    font-weight: 750;
                }

                .brand-text span {
                    margin-top: 2px;

                    color: #8a94a5;

                    font-size: 10px;
                }


                /* SIDEBAR CONTENT */

                .sidebar-content {
                    flex: 1;

                    padding: 27px 15px;

                    overflow-y: auto;
                }

                .nav-label {
                    padding: 0 12px 10px;

                    color: #a0a8b5;

                    font-size: 9px;
                    font-weight: 800;

                    letter-spacing: 1.1px;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;

                    gap: 4px;
                }

                .nav-item {
                    min-height: 45px;

                    display: flex;
                    align-items: center;

                    gap: 12px;

                    padding: 0 12px;

                    border-radius: 9px;

                    text-decoration: none;

                    color: #667085;

                    font-size: 12px;
                    font-weight: 550;

                    transition: .18s ease;
                }

                .nav-item:hover {
                    background: #f3f6fa;

                    color: #315f99;
                }

                .nav-item.active {
                    background: #edf4fc;

                    color: #315f99;

                    font-weight: 700;
                }

                .nav-icon {
                    width: 20px;
                    height: 20px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    flex-shrink: 0;
                }

                .nav-icon svg {
                    width: 18px;
                    height: 18px;
                }


                /* DIVIDER */

                .sidebar-divider {
                    height: 1px;

                    margin: 25px 10px;

                    background: #edf0f4;
                }


                /* PORTAL INFO */

                .portal-info {
                    display: flex;

                    gap: 10px;

                    margin: 0 8px;

                    padding: 13px;

                    border-radius: 10px;

                    background: #f7f9fc;

                    border: 1px solid #edf0f4;
                }

                .portal-info-icon {
                    width: 26px;
                    height: 26px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    flex-shrink: 0;

                    border-radius: 7px;

                    background: #e8f0fa;

                    color: #5d89c8;
                }

                .portal-info-icon svg {
                    width: 15px;
                    height: 15px;
                }

                .portal-info strong {
                    display: block;

                    color: #374151;

                    font-size: 10px;
                    font-weight: 750;
                }

                .portal-info span {
                    display: block;

                    margin-top: 3px;

                    color: #98a1af;

                    font-size: 8.5px;

                    line-height: 1.4;
                }


                /* =========================================
                   SIDEBAR USER
                ========================================= */

                .sidebar-bottom {
                    padding: 16px;

                    border-top: 1px solid #edf0f4;
                }

                .admin-profile {
                    display: flex;
                    align-items: center;

                    gap: 10px;

                    padding: 8px;
                }

                .admin-avatar {
                    width: 38px;
                    height: 38px;

                    flex: 0 0 38px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 10px;

                    background: #edf4fc;

                    color: #315f99;

                    border: 1px solid #dce8f6;

                    font-size: 11px;
                    font-weight: 800;
                }

                .admin-profile-info {
                    min-width: 0;

                    display: flex;
                    flex-direction: column;
                }

                .admin-profile-info strong {
                    color: #374151;

                    font-size: 10.5px;
                    font-weight: 750;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .admin-profile-info span {
                    margin-top: 2px;

                    color: #8994a3;

                    font-size: 8.5px;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .admin-profile-info small {
                    width: fit-content;

                    margin-top: 4px;

                    padding: 2px 6px;

                    border-radius: 999px;

                    background: #edf4fc;

                    color: #5d89c8;

                    font-size: 7px;
                    font-weight: 800;

                    text-transform: uppercase;
                }


                /* LOGOUT */

                .logout-button {
                    width: 100%;

                    height: 40px;

                    margin-top: 10px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 8px;

                    border: 1px solid #e6eaf0;

                    border-radius: 8px;

                    background: white;

                    color: #7b8495;

                    font-size: 11px;
                    font-weight: 650;

                    cursor: pointer;

                    transition: .18s ease;
                }

                .logout-button:hover {
                    background: #fff7f7;

                    border-color: #f1d3d3;

                    color: #c24141;
                }

                .logout-button svg {
                    width: 16px;
                    height: 16px;
                }


                /* =========================================
                   MAIN
                ========================================= */

                .ngo-main {
                    width: calc(100% - 260px);

                    min-height: 100vh;

                    margin-left: 260px;

                    display: flex;
                    flex-direction: column;
                }


                /* =========================================
                   HEADER
                ========================================= */

                .ngo-header {
                    min-height: 82px;

                    padding: 0 32px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    background: white;

                    border-bottom: 1px solid #e7ebf0;
                }

                .header-left {
                    display: flex;
                    align-items: center;

                    gap: 15px;
                }

                .header-label {
                    display: block;

                    margin-bottom: 3px;

                    color: #9aa3b0;

                    font-size: 8px;
                    font-weight: 800;

                    letter-spacing: 1px;
                }

                .ngo-header h1 {
                    margin: 0;

                    color: #172033;

                    font-size: 20px;
                    font-weight: 700;

                    letter-spacing: -.4px;
                }


                /* =========================================
                   HEADER RIGHT
                ========================================= */

                .header-right {
                    display: flex;
                    align-items: center;

                    gap: 17px;
                }


                /* =========================================
                   LANGUAGE SWITCHER
                ========================================= */

                .header-language {
                    position: relative;
                }

                .header-language-button {
                    height: 34px;

                    display: flex;
                    align-items: center;

                    gap: 6px;

                    padding: 0 9px;

                    border: 1px solid #e1e6ed;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #687587;

                    font-family: inherit;

                    font-size: 9px;
                    font-weight: 800;

                    cursor: pointer;

                    transition: .18s ease;
                }

                .header-language-button:hover {
                    border-color: #cbd5e1;

                    color: #456b9d;

                    background: #f9fbfd;
                }

                .language-chevron {
                    transition: transform .18s ease;
                }

                .language-chevron.open {
                    transform: rotate(180deg);
                }

                .header-language-menu {
                    position: absolute;

                    right: 0;
                    top: calc(100% + 7px);

                    width: 175px;

                    padding: 6px;

                    background: white;

                    border: 1px solid #e3e8ef;

                    border-radius: 10px;

                    box-shadow:
                        0 15px 35px rgba(24,35,51,.12);

                    z-index: 200;

                    animation: languageDropdown .15s ease;
                }

                @keyframes languageDropdown {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .language-menu-title {
                    padding: 7px 9px;

                    color: #9aa4b1;

                    font-size: 8px;
                    font-weight: 800;

                    letter-spacing: 1px;

                    text-transform: uppercase;
                }

                .language-option {
                    width: 100%;

                    display: flex;
                    align-items: center;

                    gap: 9px;

                    padding: 8px 9px;

                    border: 0;

                    border-radius: 7px;

                    background: transparent;

                    color: #566273;

                    font-family: inherit;

                    font-size: 10px;

                    text-align: left;

                    cursor: pointer;
                }

                .language-option:hover {
                    background: #f4f7fb;
                }

                .language-option.active {
                    background: rgba(93,137,200,.09);

                    color: #426b9e;

                    font-weight: 700;
                }

                .language-code {
                    width: 25px;
                    height: 20px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 5px;

                    background: #f0f3f7;

                    color: #7c8795;

                    font-size: 8px;
                    font-weight: 800;
                }

                .language-option.active .language-code {
                    background: #5d89c8;

                    color: white;
                }

                .language-name {
                    flex: 1;
                }

                .language-option svg {
                    color: #5d89c8;
                }


                /* =========================================
                   STATUS
                ========================================= */

                .header-status {
                    display: flex;
                    align-items: center;

                    gap: 7px;

                    color: #7b8495;

                    font-size: 10px;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #43a76a;
                }


                /* =========================================
                   HEADER USER
                ========================================= */

                .header-user {
                    display: flex;
                    align-items: center;

                    gap: 10px;

                    padding-left: 15px;

                    border-left: 1px solid #edf0f4;
                }

                .header-user-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    max-width: 180px;
                }

                .header-user-info strong {
                    color: #374151;

                    font-size: 10.5px;
                    font-weight: 750;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .header-user-info span {
                    margin-top: 2px;

                    color: #929baa;

                    font-size: 8.5px;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .header-avatar {
                    width: 38px;
                    height: 38px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #5d89c8;

                    color: white;

                    font-size: 11px;
                    font-weight: 800;

                    box-shadow:
                        0 5px 12px rgba(93,137,200,.20);
                }


                /* =========================================
                   CONTENT
                ========================================= */

                .ngo-content {
                    flex: 1;

                    width: 100%;

                    padding: 30px 32px;
                }


                /* =========================================
                   FOOTER
                ========================================= */

                .ngo-footer {
                    min-height: 52px;

                    padding: 0 32px;

                    display: flex;
                    align-items: center;

                    gap: 8px;

                    background: white;

                    border-top: 1px solid #e7ebf0;

                    color: #9aa3b0;

                    font-size: 9px;
                }

                .footer-separator {
                    color: #c7cdd5;
                }

                .footer-user {
                    color: #5d89c8;

                    font-weight: 700;
                }


                /* =========================================
                   MOBILE MENU
                ========================================= */

                .mobile-menu {
                    display: none;

                    width: 38px;
                    height: 38px;

                    align-items: center;
                    justify-content: center;

                    border: 1px solid #e3e7ed;

                    border-radius: 8px;

                    background: white;

                    color: #526070;

                    cursor: pointer;
                }

                .mobile-menu svg {
                    width: 19px;
                    height: 19px;
                }

                .sidebar-overlay {
                    display: none;
                }


                /* =========================================
                   TABLET
                ========================================= */

                @media (max-width: 1000px) {

                    .ngo-sidebar {
                        width: 230px;
                    }

                    .ngo-main {
                        width: calc(100% - 230px);

                        margin-left: 230px;
                    }

                    .ngo-content {
                        padding: 25px;
                    }

                    .ngo-header {
                        padding: 0 25px;
                    }

                    .ngo-footer {
                        padding: 0 25px;
                    }

                    .header-user-info {
                        display: none;
                    }

                    .header-user {
                        padding-left: 0;

                        border-left: 0;
                    }
                }


                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 760px) {

                    .ngo-sidebar {
                        width: 275px;

                        transform: translateX(-100%);

                        transition: transform .25s ease;

                        box-shadow:
                            10px 0 35px rgba(20,35,55,.12);
                    }

                    .ngo-sidebar.mobile-open {
                        transform: translateX(0);
                    }

                    .ngo-main {
                        width: 100%;

                        margin-left: 0;
                    }

                    .ngo-header {
                        min-height: 72px;

                        padding: 0 18px;
                    }

                    .mobile-menu {
                        display: flex;
                    }

                    .header-label {
                        display: none;
                    }

                    .ngo-header h1 {
                        font-size: 18px;
                    }

                    .header-status {
                        display: none;
                    }

                    .header-avatar {
                        width: 35px;
                        height: 35px;
                    }

                    .header-language-button {
                        height: 33px;
                    }

                    .ngo-content {
                        padding: 20px 16px;
                    }

                    .ngo-footer {
                        min-height: 48px;

                        padding: 0 16px;

                        justify-content: center;

                        text-align: center;

                        flex-wrap: wrap;
                    }

                    .sidebar-overlay {
                        position: fixed;

                        inset: 0;

                        z-index: 90;

                        background: rgba(20,30,45,.35);

                        backdrop-filter: blur(2px);
                    }

                    .sidebar-overlay.show {
                        display: block;
                    }
                }


                /* =========================================
                   SMALL PHONES
                ========================================= */

                @media (max-width: 420px) {

                    .ngo-header {
                        padding: 0 14px;
                    }

                    .header-left {
                        gap: 10px;
                    }

                    .ngo-header h1 {
                        font-size: 17px;
                    }

                    .ngo-content {
                        padding: 16px 12px;
                    }

                    .ngo-footer {
                        font-size: 8px;
                    }

                    .header-language-button span {
                        display: none;
                    }

                    .header-language-button {
                        width: 34px;

                        justify-content: center;

                        padding: 0;
                    }

                    .header-language-menu {
                        right: -10px;
                    }
                }

            `}</style>
        </>
    );
}
