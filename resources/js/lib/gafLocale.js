// Shared helpers for the public Events, News and Gallery pages.

const locale = (lang) => (lang === "rw" ? "rw-RW" : "en-GB");

const toDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

/** "18 November 2026" */
export const formatDate = (value, lang, options = {}) => {
    const date = toDate(value);
    if (!date) return "";

    return new Intl.DateTimeFormat(locale(lang), {
        day: "numeric",
        month: "long",
        year: "numeric",
        ...options,
    }).format(date);
};

/** "14:30" (empty when the time is midnight, i.e. no time was set) */
export const formatTime = (value, lang) => {
    const date = toDate(value);
    if (!date || (date.getHours() === 0 && date.getMinutes() === 0)) return "";

    return new Intl.DateTimeFormat(locale(lang), {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

/** Day number and short month for date tiles: { day: "18", month: "Nov" } */
export const dateParts = (value, lang) => {
    const date = toDate(value);
    if (!date) return null;

    return {
        day: String(date.getDate()),
        month: new Intl.DateTimeFormat(locale(lang), { month: "short" }).format(date),
        year: String(date.getFullYear()),
    };
};

/** Field in the visitor's language, falling back to the other language. */
export const localized = (item, field, lang) => {
    if (!item) return "";

    return lang === "rw"
        ? item[`${field}_rw`] || item[field] || ""
        : item[field] || item[`${field}_rw`] || "";
};

/** Small inline translation: pick(lang, { en: "...", rw: "..." }) */
export const pick = (lang, value) => value[lang] ?? value.en;

/** Plain text from HTML content. */
export const stripHtml = (html = "") =>
    String(html)
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

/** Estimated reading time in minutes (200 words per minute). */
export const readingMinutes = (html) => {
    const words = stripHtml(html).split(" ").filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
};

/** upcoming | ongoing | past | cancelled */
export const eventStatus = (event) => {
    if (!event) return "upcoming";
    if (event.status === "cancelled") return "cancelled";
    if (event.timing) return event.timing;

    const now = new Date();
    const start = toDate(event.starts_at);
    const end = toDate(event.ends_at);

    if (end && end < now) return "past";
    if (!end && start && start < now) return "past";
    if (start && start <= now && (!end || end >= now)) return "ongoing";

    return "upcoming";
};
