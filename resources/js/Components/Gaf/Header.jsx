import React, { useEffect, useRef, useState } from "react";
import { useGaf, imageFallback, navItems, navUrl } from "@/Context/GafContext";

export default function Header() {
    const { lang, setLang, t, site } = useGaf();

    const [menuOpen, setMenuOpen] = useState(false);
    const [updatesOpen, setUpdatesOpen] = useState(false);

    const updatesRef = useRef(null);

    const getNavUrl = navUrl;

    const updatesLinks = [
        {
            label: t.activities.eventsTitle,
            description: t.activities.eventsIntro,
            href: "/events",
        },
        {
            label: t.activities.galleryTitle,
            description: t.activities.galleryIntro,
            href: "/gallery",
        },
        {
            label: t.updates.title,
            description: t.updates.intro,
            href: "/news",
        },
    ];

    const closeNavigation = () => {
        setMenuOpen(false);
        setUpdatesOpen(false);
    };

    // Close dropdown when clicking outside.
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                updatesRef.current &&
                !updatesRef.current.contains(event.target)
            ) {
                setUpdatesOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // Close navigation using Escape.
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setUpdatesOpen(false);
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <>
            <div className="gaf-topline">
                <div className="gaf-container gaf-topline-inner">
                    <span>{t.topLine}</span>

                    <div className="gaf-top-contact">
                        <a href={`mailto:${site.email}`}>
                            {site.email}
                        </a>

                        <span aria-hidden="true">/</span>

                        <a href={`tel:${site.phone}`}>
                            {site.phone}
                        </a>
                    </div>
                </div>
            </div>

            <header className="gaf-header">
                <div className="gaf-container gaf-header-inner">
                    {/* Brand */}
                    <a
                        className="gaf-brand"
                        href="/"
                        aria-label="Guided Act & Feel Rwanda home"
                    >
                        <img
                            src={site.logo}
                            alt={site.name}
                            onError={imageFallback}
                        />

                        {/* <span>
                            <strong>GUIDED ACT & FEEL</strong>
                            <small>RWANDA RESEARCH STUDY</small>
                        </span> */}
                    </a>

                    {/* Mobile menu */}
                    <button
                        className="gaf-menu-toggle"
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                        onClick={() => {
                            setMenuOpen((open) => !open);
                            setUpdatesOpen(false);
                        }}
                    >
                        <span />
                        <span />
                    </button>

                    {/* Main navigation */}
                    <nav
                        className={menuOpen ? "gaf-nav is-open" : "gaf-nav"}
                        aria-label="Main navigation"
                    >
                        {navItems.map(([label, id]) => {
                            if (id === "activities") {
                                return (
                                    <div
                                        className={`gaf-nav-dropdown ${
                                            updatesOpen ? "is-open" : ""
                                        }`}
                                        key={id}
                                        ref={updatesRef}
                                        onMouseEnter={() => {
                                            if (
                                                window.matchMedia(
                                                    "(min-width: 901px)"
                                                ).matches
                                            ) {
                                                setUpdatesOpen(true);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (
                                                window.matchMedia(
                                                    "(min-width: 901px)"
                                                ).matches
                                            ) {
                                                setUpdatesOpen(false);
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="gaf-nav-dropdown-toggle"
                                            aria-expanded={updatesOpen}
                                            aria-haspopup="true"
                                            onClick={() =>
                                                setUpdatesOpen(
                                                    (open) => !open
                                                )
                                            }
                                        >
                                            {t.nav?.[label] || label}

                                            <span
                                                className="gaf-dropdown-arrow"
                                                aria-hidden="true"
                                            >
                                                ▾
                                            </span>
                                        </button>

                                        <div
                                            className="gaf-nav-dropdown-menu"
                                            aria-label={t.nav?.activities}
                                            hidden={!updatesOpen}
                                        >
                                            {updatesLinks.map((item) => (
                                                <a
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={closeNavigation}
                                                >
                                                    <span className="gaf-dropdown-link-content">
                                                        <strong>
                                                            {item.label}
                                                        </strong>

                                                        <small>
                                                            {item.description}
                                                        </small>
                                                    </span>

                                                    <span
                                                        className="gaf-dropdown-link-arrow"
                                                        aria-hidden="true"
                                                    >
                                                        →
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <a
                                    key={id}
                                    href={getNavUrl(id)}
                                    onClick={closeNavigation}
                                >
                                    {t.nav?.[label] || label}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Header actions */}
                    <div className="gaf-header-actions">
                        {/* Language selector */}
                        <div
                            className="gaf-language"
                            aria-label="Hitamo ururimi / Choose language"
                        >
                            <button
                                type="button"
                                className={lang === "rw" ? "active" : ""}
                                aria-pressed={lang === "rw"}
                                onClick={() => setLang("rw")}
                            >
                                RW
                            </button>

                            <span aria-hidden="true">/</span>

                            <button
                                type="button"
                                className={lang === "en" ? "active" : ""}
                                aria-pressed={lang === "en"}
                                onClick={() => setLang("en")}
                            >
                                EN
                            </button>
                        </div>

                        {/* Participation button */}
                        <a
                            className="gaf-header-cta"
                            href={site.surveyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {t.participation.cta}

                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
