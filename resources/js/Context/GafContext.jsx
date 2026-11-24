
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { usePage } from "@inertiajs/react";
import { content, defaultSite } from "@/Data/gafContent";

const GafContext = createContext(null);

const DEFAULT_LANGUAGE = "rw";
const SUPPORTED_LANGUAGES = ["rw", "en"];
const LANGUAGE_STORAGE_KEY = "gaf_language_v2";

export function GafProvider({ site, children }) {
    const { props } = usePage();

    const [lang, setLangState] = useState(DEFAULT_LANGUAGE);

    // Restore the saved language on the visitor's first page load.
    useEffect(() => {
        try {
            const savedLanguage = localStorage.getItem(
                LANGUAGE_STORAGE_KEY
            );

            if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
                setLangState(savedLanguage);
            } else {
                localStorage.setItem(
                    LANGUAGE_STORAGE_KEY,
                    DEFAULT_LANGUAGE
                );
            }
        } catch (error) {
            setLangState(DEFAULT_LANGUAGE);
        }
    }, []);

    // Update the document language.
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // Change language and remember the visitor's choice.
    const setLang = useCallback((nextLanguage) => {
        if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) {
            return;
        }

        setLangState(nextLanguage);

        try {
            localStorage.setItem(
                LANGUAGE_STORAGE_KEY,
                nextLanguage
            );
        } catch (error) {
            // Language switching still works if storage is unavailable.
        }
    }, []);

    // Load the active translation dictionary.
    const t = useMemo(() => {
        return content?.[lang] || content?.rw || content?.en || {};
    }, [lang]);

    // Translate bilingual database or component values.
    const tr = useCallback(
        (value) => {
            if (value === null || value === undefined) {
                return "";
            }

            if (
                typeof value === "object" &&
                !Array.isArray(value)
            ) {
                return value[lang] ?? value.en ?? value.rw ?? "";
            }

            return value;
        },
        [lang]
    );

    // Database hero media.
    const databaseHero = props.heroMedia || null;

    // Merge database media with the default site configuration.
    const siteSettings = useMemo(
        () => ({
            ...defaultSite,
            ...(site || {}),

            heroVideo:
                databaseHero?.heroVideo ??
                site?.heroVideo ??
                defaultSite.heroVideo,

            heroVideoThumbnail:
                databaseHero?.heroVideoThumbnail ??
                site?.heroVideoThumbnail ??
                null,

            heroImage:
                databaseHero?.heroImage ??
                site?.heroImage ??
                defaultSite.heroImage,

            altText:
                databaseHero?.altText ??
                site?.altText ??
                defaultSite.altText,

            caption:
                databaseHero?.caption ??
                site?.caption ??
                defaultSite.caption,
        }),
        [site, databaseHero]
    );

    const value = useMemo(
        () => ({
            lang,
            setLang,
            t,
            tr,
            tx: tr,
            busy: false,
            notice: null,
            site: siteSettings,
        }),
        [lang, setLang, t, tr, siteSettings]
    );

    return (
        <GafContext.Provider value={value}>
            {children}
        </GafContext.Provider>
    );
}

export function useGaf() {
    const ctx = useContext(GafContext);

    if (!ctx) {
        throw new Error(
            "useGaf must be used inside <GafProvider> (GafLayout)."
        );
    }

    return ctx;
}

export const imageFallback = (event) => {
    event.currentTarget.style.display = "none";
};

// Main navigation (redesign): Study, How it works, Eligibility, Team, News & photos, FAQ.
export const navItems = [
    ["research", "research"],
    ["how", "how"],
    ["participation", "participation"],
    ["team", "team"],
    ["activities", "activities"],
    ["faq", "faq"],
];

// Absolute URLs so links work from every page, not only the home page.
export const navUrl = (id) => {
    if (id === "home") return "/";
    if (id === "research") return "/#ubushakashatsi";
    if (id === "how") return "/#porogaramu";
    if (id === "participation") return "/#kwitabira";
    if (id === "team") return "/team";
    if (id === "activities") return "/events";
    if (id === "updates") return "/news";
    if (id === "gallery") return "/gallery";
    if (id === "faq") return "/ibibazo";

    return `/#${id}`;
};
