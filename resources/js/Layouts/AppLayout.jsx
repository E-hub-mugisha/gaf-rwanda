import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    FileText,
    LogOut,
    User,
    ChevronDown,
    ShieldCheck,
    Menu,
    X,
    Globe,
    Check,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getLanguage, setLanguage as persistLanguage, LANGUAGE_EVENT } from '@/lib/language';

const translations = {
    rw: {
        documents: 'Inyandiko',
        knowledgeResources: 'Ubumenyi & Umutungo',
        reader: 'Usoma',
        logOut: 'Sohoka',
        language: 'Ururimi',
        documentPortal: 'Portal y’Inyandiko',
        signedInAs: 'Winjiye nka',
        readerAccount: 'Konti y’Usoma',
        languageNames: {
            rw: 'Kinyarwanda',
            en: 'English',
            fr: 'Français',
            nl: 'Nederlands',
        },
    },

    en: {
        documents: 'Documents',
        knowledgeResources: 'Knowledge & Resources',
        reader: 'Reader',
        logOut: 'Log out',
        language: 'Language',
        documentPortal: 'Document Portal',
        signedInAs: 'Signed in as',
        readerAccount: 'Reader Account',
        languageNames: {
            rw: 'Kinyarwanda',
            en: 'English',
            fr: 'Français',
            nl: 'Nederlands',
        },
    },

    fr: {
        documents: 'Documents',
        knowledgeResources: 'Savoir & Ressources',
        reader: 'Lecteur',
        logOut: 'Se déconnecter',
        language: 'Langue',
        documentPortal: 'Portail documentaire',
        signedInAs: 'Connecté en tant que',
        readerAccount: 'Compte lecteur',
        languageNames: {
            rw: 'Kinyarwanda',
            en: 'English',
            fr: 'Français',
            nl: 'Nederlands',
        },
    },

    nl: {
        documents: 'Documenten',
        knowledgeResources: 'Kennis & Middelen',
        reader: 'Lezer',
        logOut: 'Uitloggen',
        language: 'Taal',
        documentPortal: 'Documentenportaal',
        signedInAs: 'Ingelogd als',
        readerAccount: 'Lezersaccount',
        languageNames: {
            rw: 'Kinyarwanda',
            en: 'English',
            fr: 'Français',
            nl: 'Nederlands',
        },
    },
};

export default function AppLayout({ title, children }) {
    const { props } = usePage();
    const user = props.auth?.user;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    | Same shared-state pattern as AdminLayout: localStorage persists the
    | choice, and the "gaf-language-change" window event keeps this layout
    | in sync the instant the language changes anywhere else in the app
    | (login page, dashboard, etc.) -- including across Inertia navigations
    | within the same tab.
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
        // listener above will pick up the change and re-render automatically.
    };

    const initials = useMemo(() => {
        if (!user?.name) return 'U';

        return user.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }, [user?.name]);

    const logout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <>
            {title && <Head title={title} />}

            <div className="public-layout">

                {/* ================= HEADER ================= */}
                <header className="public-header">
                    <div className="header-inner">

                        {/* BRAND */}
                        <Link
                            href={route('documents.index')}
                            className="brand"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="brand-icon">
                                <FileText size={20} />
                            </div>

                            <div className="brand-text">
                                <strong>Document Portal</strong>
                                <span>{t.knowledgeResources}</span>
                            </div>
                        </Link>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="desktop-nav">
                            <Link
                                href={route('documents.index')}
                                className="nav-link active"
                            >
                                <FileText size={16} />
                                {t.documents}
                            </Link>
                        </nav>

                        {/* USER AREA */}
                        <div className="user-area">

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
                                    <Globe size={14} />

                                    <span>
                                        {language.toUpperCase()}
                                    </span>

                                    <ChevronDown
                                        size={11}
                                        className={
                                            languageOpen
                                                ? 'language-chevron open'
                                                : 'language-chevron'
                                        }
                                    />
                                </button>

                                {languageOpen && (
                                    <div className="header-language-menu">

                                        <div className="language-menu-title">
                                            {t.language}
                                        </div>

                                        {Object.entries(
                                            t.languageNames
                                        ).map(([code, name]) => (
                                            <button
                                                type="button"
                                                key={code}
                                                className={
                                                    language === code
                                                        ? 'language-option active'
                                                        : 'language-option'
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
                                                    <Check size={13} />
                                                )}
                                            </button>
                                        ))}

                                    </div>
                                )}

                            </div>

                            <div className="header-divider"></div>

                            <div className="user-profile">
                                <div className="user-avatar">
                                    {initials}
                                </div>

                                <div className="user-details">
                                    <strong>
                                        {user?.name || 'Reader'}
                                    </strong>

                                    <span>
                                        <ShieldCheck size={11} />
                                        {t.reader}
                                    </span>
                                </div>

                                <ChevronDown
                                    size={15}
                                    className="user-chevron"
                                />
                            </div>

                            <div className="header-divider"></div>

                            <form onSubmit={logout}>
                                <button
                                    type="submit"
                                    className="logout-button"
                                    title={t.logOut}
                                >
                                    <LogOut size={17} />
                                    <span>{t.logOut}</span>
                                </button>
                            </form>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={() =>
                                setMobileMenuOpen(!mobileMenuOpen)
                            }
                            aria-label="Toggle navigation"
                        >
                            {mobileMenuOpen ? (
                                <X size={21} />
                            ) : (
                                <Menu size={21} />
                            )}
                        </button>
                    </div>

                    {/* MOBILE NAV */}
                    {mobileMenuOpen && (
                        <div className="mobile-menu">
                            <Link
                                href={route('documents.index')}
                                className="mobile-nav-link"
                                onClick={() =>
                                    setMobileMenuOpen(false)
                                }
                            >
                                <FileText size={17} />
                                {t.documents}
                            </Link>

                            {/* Mobile Language Switcher */}
                            <div className="mobile-language">
                                <div className="mobile-language-title">
                                    {t.language}
                                </div>

                                <div className="mobile-language-options">
                                    {Object.entries(
                                        t.languageNames
                                    ).map(([code, name]) => (
                                        <button
                                            type="button"
                                            key={code}
                                            className={
                                                language === code
                                                    ? 'mobile-language-option active'
                                                    : 'mobile-language-option'
                                            }
                                            onClick={() =>
                                                changeLanguage(code)
                                            }
                                        >
                                            <span className="language-code">
                                                {code.toUpperCase()}
                                            </span>

                                            <span>{name}</span>

                                            {language === code && (
                                                <Check size={13} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mobile-user">
                                <div className="user-avatar">
                                    {initials}
                                </div>

                                <div>
                                    <strong>
                                        {user?.name || 'Reader'}
                                    </strong>

                                    <span>
                                        {user?.email || ''}
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={logout}>
                                <button
                                    type="submit"
                                    className="mobile-logout"
                                >
                                    <LogOut size={17} />
                                    {t.logOut}
                                </button>
                            </form>
                        </div>
                    )}
                </header>

                {/* ================= MAIN ================= */}
                <main className="public-main">
                    {children}
                </main>

                {/* ================= FOOTER ================= */}
                <footer className="public-footer">
                    <div className="footer-inner">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <FileText size={15} />
                            </div>

                            <span>
                                {t.documentPortal}
                            </span>
                        </div>

                        <div className="footer-right">
                            <span>
                                {t.signedInAs}{' '}
                                <strong>
                                    {user?.name || 'Reader'}
                                </strong>
                            </span>

                            <span className="footer-dot"></span>

                            <span>
                                {t.readerAccount}
                            </span>
                        </div>
                    </div>
                </footer>
            </div>

            <style>{`
                /* =====================================================
                   PUBLIC DOCUMENT PORTAL
                   ===================================================== */

                .public-layout {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F7F9FC;
                    --surface: #FFFFFF;

                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: var(--background);
                    color: var(--ink);
                }

                /* =====================================================
                   HEADER
                   ===================================================== */

                .public-header {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(255, 255, 255, .96);
                    border-bottom: 1px solid var(--border);
                    backdrop-filter: blur(12px);
                }

                .header-inner {
                    max-width: 1240px;
                    height: 70px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                }

                /* BRAND */

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    text-decoration: none;
                    color: var(--ink);
                    flex-shrink: 0;
                }

                .brand-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 11px;
                    background: var(--blue);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 5px 14px rgba(93, 137, 200, .22);
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .brand-text strong {
                    font-size: 14px;
                    font-weight: 800;
                    letter-spacing: -.01em;
                }

                .brand-text span {
                    margin-top: 3px;
                    font-size: 9.5px;
                    color: #919BA9;
                    font-weight: 500;
                }

                /* NAV */

                .desktop-nav {
                    display: flex;
                    align-items: center;
                    margin-left: 55px;
                    height: 100%;
                }

                .nav-link {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0 15px;
                    color: #687587;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 650;
                    position: relative;
                    transition: .2s ease;
                }

                .nav-link:hover {
                    color: var(--blue);
                }

                .nav-link.active {
                    color: var(--blue);
                }

                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    left: 15px;
                    right: 15px;
                    bottom: 0;
                    height: 2px;
                    border-radius: 2px 2px 0 0;
                    background: var(--blue);
                }

                /* USER */

                .user-area {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .user-details {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                .user-details strong {
                    max-width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #303B4D;
                    font-size: 11.5px;
                    font-weight: 750;
                }

                .user-details span {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    margin-top: 3px;
                    color: #929CAB;
                    font-size: 9px;
                }

                .user-details span svg {
                    color: #5CA47C;
                }

                .user-chevron {
                    color: #A1AAB6;
                    margin-left: 1px;
                }

                .header-divider {
                    width: 1px;
                    height: 29px;
                    background: var(--border);
                }

                /* LOGOUT */

                .logout-button {
                    height: 36px;
                    padding: 0 12px;
                    border: 1px solid #E0E5EC;
                    border-radius: 9px;
                    background: white;
                    color: #687587;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10.5px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: .2s ease;
                }

                .logout-button:hover {
                    color: #C45454;
                    border-color: #EBCFCF;
                    background: #FFF8F8;
                }

                /* =====================================================
                   LANGUAGE SWITCHER (desktop)
                   ===================================================== */

                .header-language {
                    position: relative;
                }

                .header-language-button {
                    height: 34px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0 9px;
                    border: 1px solid #E0E5EC;
                    border-radius: 8px;
                    background: white;
                    color: #687587;
                    font-family: inherit;
                    font-size: 9px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .header-language-button:hover {
                    border-color: #cbd5e1;
                    color: var(--blue-dark);
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
                    top: calc(100% + 9px);
                    width: 175px;
                    padding: 6px;
                    background: white;
                    border: 1px solid #e3e8ef;
                    border-radius: 10px;
                    box-shadow: 0 15px 35px rgba(24,35,51,.12);
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
                    color: var(--blue-dark);
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
                    background: var(--blue);
                    color: white;
                }

                .language-name {
                    flex: 1;
                }

                .language-option svg {
                    color: var(--blue);
                }

                /* =====================================================
                   MAIN
                   ===================================================== */

                .public-main {
                    width: 100%;
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 30px 24px 45px;
                    box-sizing: border-box;
                    flex: 1;
                }

                /* =====================================================
                   FOOTER
                   ===================================================== */

                .public-footer {
                    background: #fff;
                    border-top: 1px solid var(--border);
                }

                .footer-inner {
                    max-width: 1240px;
                    min-height: 55px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #7A8696;
                    font-size: 10px;
                    font-weight: 700;
                }

                .footer-logo {
                    width: 24px;
                    height: 24px;
                    border-radius: 7px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .footer-right {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    color: #9AA3AF;
                    font-size: 9.5px;
                }

                .footer-right strong {
                    color: #677486;
                }

                .footer-dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: #C2C9D2;
                }

                /* =====================================================
                   MOBILE
                   ===================================================== */

                .mobile-menu-button {
                    display: none;
                    margin-left: auto;
                    width: 38px;
                    height: 38px;
                    border: 1px solid var(--border);
                    border-radius: 9px;
                    background: white;
                    color: #566375;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .mobile-menu {
                    display: none;
                }

                @media (max-width: 760px) {

                    .header-inner {
                        height: 62px;
                        padding: 0 16px;
                    }

                    .brand-icon {
                        width: 35px;
                        height: 35px;
                    }

                    .brand-text strong {
                        font-size: 13px;
                    }

                    .brand-text span {
                        font-size: 8.5px;
                    }

                    .desktop-nav,
                    .user-area {
                        display: none;
                    }

                    .mobile-menu-button {
                        display: flex;
                    }

                    .mobile-menu {
                        display: block;
                        padding: 10px 16px 16px;
                        border-top: 1px solid #F0F2F5;
                        background: white;
                    }

                    .mobile-nav-link {
                        height: 43px;
                        padding: 0 12px;
                        border-radius: 9px;
                        background: var(--blue-light);
                        color: var(--blue);
                        display: flex;
                        align-items: center;
                        gap: 9px;
                        text-decoration: none;
                        font-size: 12px;
                        font-weight: 750;
                        margin-bottom: 12px;
                    }

                    /* Mobile language switcher */

                    .mobile-language {
                        margin-bottom: 12px;
                        padding: 10px 12px;
                        border-radius: 9px;
                        background: #F7F9FC;
                        border: 1px solid #EEF1F5;
                    }

                    .mobile-language-title {
                        color: #9aa4b1;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    }

                    .mobile-language-options {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                    }

                    .mobile-language-option {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        padding: 7px 10px;
                        border: 1px solid #E0E5EC;
                        border-radius: 7px;
                        background: white;
                        color: #566273;
                        font-family: inherit;
                        font-size: 10px;
                        font-weight: 600;
                        cursor: pointer;
                    }

                    .mobile-language-option .language-code {
                        width: 22px;
                        height: 18px;
                        font-size: 7.5px;
                    }

                    .mobile-language-option.active {
                        border-color: var(--blue);
                        color: var(--blue-dark);
                        background: var(--blue-light);
                        font-weight: 750;
                    }

                    .mobile-language-option.active .language-code {
                        background: var(--blue);
                        color: white;
                    }

                    .mobile-language-option svg {
                        color: var(--blue);
                    }

                    .mobile-user {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 0;
                        border-top: 1px solid #EEF1F5;
                        border-bottom: 1px solid #EEF1F5;
                    }

                    .mobile-user strong {
                        display: block;
                        font-size: 12px;
                        color: #303B4D;
                    }

                    .mobile-user span {
                        display: block;
                        margin-top: 3px;
                        font-size: 9.5px;
                        color: #929CAB;
                    }

                    .mobile-logout {
                        width: 100%;
                        height: 40px;
                        margin-top: 12px;
                        border: 1px solid #EBCFCF;
                        border-radius: 9px;
                        background: #FFF8F8;
                        color: #C45454;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 7px;
                        font-size: 11px;
                        font-weight: 700;
                        cursor: pointer;
                    }

                    .public-main {
                        padding: 22px 16px 35px;
                    }

                    .footer-inner {
                        min-height: 60px;
                        padding: 10px 16px;
                    }

                    .footer-right {
                        display: none;
                    }
                }

                @media (max-width: 420px) {
                    .brand-text span {
                        display: none;
                    }

                    .public-main {
                        padding-left: 12px;
                        padding-right: 12px;
                    }
                }
            `}</style>
        </>
    );
}