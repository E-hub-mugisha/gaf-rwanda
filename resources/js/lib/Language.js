// resources/js/lib/language.js
//
// Single source of truth for the admin portal's language selection.
// localStorage persists the choice across page loads, and a custom
// window event keeps every mounted component in sync the moment the
// language changes -- localStorage alone does NOT trigger a re-render
// in the same tab, which is why the dashboard and layout could get
// out of sync before.

export const LANGUAGE_EVENT = 'gaf-language-change';
export const DEFAULT_LANGUAGE = 'rw';

export function getLanguage() {
    if (typeof window === 'undefined') {
        return DEFAULT_LANGUAGE;
    }

    return localStorage.getItem('gaf_language') || DEFAULT_LANGUAGE;
}

export function setLanguage(lang) {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem('gaf_language', lang);
    document.documentElement.lang = lang;

    window.dispatchEvent(
        new CustomEvent(LANGUAGE_EVENT, { detail: lang })
    );
}