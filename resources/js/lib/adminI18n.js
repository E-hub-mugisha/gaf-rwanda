import { useCallback, useEffect, useState } from "react";
import { getLanguage, setLanguage, LANGUAGE_EVENT } from "@/lib/Language";

// The admin works in the same two languages as the public website.
export const ADMIN_LANGUAGES = {
    rw: "Kinyarwanda",
    en: "English",
};

const normalise = (lang) => (lang in ADMIN_LANGUAGES ? lang : "en");

const dictionary = {
    en: {
        // Layout
        language: "Language",
        content: "WEBSITE CONTENT",
        management: "MANAGEMENT",
        dashboard: "Dashboard",
        programs: "Programs",
        eventCategories: "Event categories",
        events: "Events",
        newsCategories: "News categories",
        newsArticles: "News articles",
        heroMedia: "Hero media",
        team: "Team members",
        faqs: "FAQs",
        messages: "Messages",
        settings: "Site settings",
        users: "Accounts",
        analytics: "Analytics",
        activity: "Activity log",
        viewWebsite: "View website",
        signOut: "Sign out",
        administrator: "Administrator",
        administration: "Administration",
        portal: "Administration portal",
        systemOnline: "System online",
        searchPlaceholder: "Search the menu…",

        // Common
        save: "Save changes",
        saving: "Saving…",
        create: "Create",
        cancel: "Cancel",
        close: "Close",
        edit: "Edit",
        view: "View",
        delete: "Delete",
        search: "Search",
        actions: "Actions",
        status: "Status",
        all: "All",
        active: "Active",
        inactive: "Inactive",
        order: "Order",
        lastUpdated: "Last updated",
        showing: "Showing {from} to {to} of {total}",
        noResults: "Nothing found",
        cannotUndo: "This action cannot be undone.",
        required: "Required",

        // Language tabs
        editingIn: "Editing language",
        english: "English",
        kinyarwanda: "Kinyarwanda",
        missingTranslation: "Kinyarwanda translation missing",
        translationHint: "Fill in both languages. Visitors see the version that matches their language; English is used when Kinyarwanda is empty.",
    },
    rw: {
        language: "Ururimi",
        content: "IBIRI KU RUBUGA",
        management: "UBUYOBOZI",
        dashboard: "Imbonerahamwe",
        programs: "Porogarame",
        eventCategories: "Ibyiciro by’ibikorwa",
        events: "Ibikorwa",
        newsCategories: "Ibyiciro by’amakuru",
        newsArticles: "Amakuru",
        heroMedia: "Video n’ifoto by’ahabanza",
        team: "Abagize itsinda",
        faqs: "Ibibazo bikunze kubazwa",
        messages: "Ubutumwa",
        settings: "Igenamiterere ry’urubuga",
        users: "Konti",
        analytics: "Isesengura",
        activity: "Amateka y’ibikorwa",
        viewWebsite: "Reba urubuga",
        signOut: "Sohoka",
        administrator: "Umuyobozi",
        administration: "Ubuyobozi",
        portal: "Urubuga rw’ubuyobozi",
        systemOnline: "Sisitemu irakora",
        searchPlaceholder: "Shakisha muri menu…",

        save: "Bika impinduka",
        saving: "Birabikwa…",
        create: "Kora",
        cancel: "Reka",
        close: "Funga",
        edit: "Hindura",
        view: "Reba",
        delete: "Siba",
        search: "Shakisha",
        actions: "Ibikorwa",
        status: "Imiterere",
        all: "Byose",
        active: "Birakora",
        inactive: "Ntibikora",
        order: "Urutonde",
        lastUpdated: "Byahinduwe",
        showing: "Herekanwe {from} – {to} kuri {total}",
        noResults: "Nta kintu cyabonetse",
        cannotUndo: "Iki gikorwa ntigishobora gusubizwa inyuma.",
        required: "Birakenewe",

        editingIn: "Ururimi uri guhinduramo",
        english: "Icyongereza",
        kinyarwanda: "Ikinyarwanda",
        missingTranslation: "Ubusobanuro bw’Ikinyarwanda ntiburuzuzwa",
        translationHint: "Uzuza indimi zombi. Abasura urubuga babona ururimi rwabo; Icyongereza gikoreshwa iyo Ikinyarwanda kitujujwe.",
    },
};

/**
 * Admin interface language.
 *
 * const { lang, t, setLang } = useAdminLang();
 * t("save") or t("showing", { from: 1, to: 10, total: 42 })
 * t({ en: "Text", rw: "Inyandiko" }) for page-specific strings.
 */
export function useAdminLang() {
    const [lang, setLangState] = useState(() => normalise(getLanguage()));

    useEffect(() => {
        const onChange = (event) => setLangState(normalise(event.detail));
        window.addEventListener(LANGUAGE_EVENT, onChange);
        return () => window.removeEventListener(LANGUAGE_EVENT, onChange);
    }, []);

    const t = useCallback(
        (key, vars = {}) => {
            let text =
                typeof key === "object" && key !== null
                    ? key[lang] ?? key.en ?? ""
                    : dictionary[lang]?.[key] ?? dictionary.en[key] ?? key;

            Object.entries(vars).forEach(([name, value]) => {
                text = text.replace(`{${name}}`, value);
            });

            return text;
        },
        [lang]
    );

    const setLang = useCallback((next) => setLanguage(normalise(next)), []);

    return { lang, t, setLang };
}
