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