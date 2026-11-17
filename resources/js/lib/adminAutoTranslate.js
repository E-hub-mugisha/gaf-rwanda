import { useEffect } from "react";
import adminRw from "./adminRw";

/**
 * Translates the admin interface into Kinyarwanda using the adminRw
 * dictionary, for pages whose text is written in English in the code.
 *
 * - Only exact interface phrases from the dictionary are replaced, so typed
 *   content (titles, names, descriptions) stays as it is.
 * - Text inputs, textareas, rich-text editors and anything inside
 *   [data-no-translate] are never touched.
 * - Original text is remembered, so switching back to English restores it.
 */

const ATTRIBUTES = ["placeholder", "title", "aria-label", "alt"];

const SKIP =
    "script, style, textarea, code, pre, input, [contenteditable], .ProseMirror, .tiptap, .ql-editor, [data-no-translate]";

// text node -> { original, translated }
const textMemory = new WeakMap();
// element -> { [attribute]: { original, translated } }
const attrMemory = new WeakMap();

function lookup(text) {
    const core = text.replace(/\s+/g, " ").trim();
    if (!core || core.length > 400) return null;

    if (adminRw[core]) return adminRw[core];

    // Same phrase followed by ":" or "*" (e.g. "Category:", "Title *").
    const suffix = core.match(/^(.*?)(\s*[:*]+)$/);
    if (suffix && adminRw[suffix[1]]) return adminRw[suffix[1]] + suffix[2];

    return null;
}

const keepSpacing = (original, translated) =>
    original.match(/^\s*/)[0] + translated + original.match(/\s*$/)[0];

function skipped(element) {
    return !element || element.closest(SKIP);
}

function translateTextNode(node, lang) {
    if (skipped(node.parentElement)) return;

    const current = node.nodeValue;
    let memory = textMemory.get(node);

    // React replaced the text since we last translated it: start over.
    if (memory && current !== memory.translated) memory = null;

    const original = memory ? memory.original : current;

    if (lang === "rw") {
        const translated = lookup(original);
        if (!translated) return;

        const value = keepSpacing(original, translated);
        if (current !== value) node.nodeValue = value;
        textMemory.set(node, { original, translated: value });
    } else if (memory) {
        node.nodeValue = memory.original;
        textMemory.delete(node);
    }
}

function translateAttributes(element, lang) {
    if (skipped(element.parentElement) && !element.matches("input, textarea")) return;

    const memory = attrMemory.get(element) || {};

    for (const name of ATTRIBUTES) {
        if (!element.hasAttribute(name)) continue;

        const current = element.getAttribute(name);
        let saved = memory[name];
        if (saved && current !== saved.translated) saved = null;

        const original = saved ? saved.original : current;

        if (lang === "rw") {
            const translated = lookup(original);
            if (!translated) continue;
            if (current !== translated) element.setAttribute(name, translated);
            memory[name] = { original, translated };
        } else if (saved) {
            element.setAttribute(name, saved.original);
            delete memory[name];
        }
    }

    attrMemory.set(element, memory);
}

function translateTree(root, lang) {
    if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root, lang);
        return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, lang);

    const selector = ATTRIBUTES.map((a) => `[${a}]`).join(",");
    if (root.matches?.(selector)) translateAttributes(root, lang);
    root.querySelectorAll(selector).forEach((el) => translateAttributes(el, lang));
}

// Browser tab title, e.g. "Events - GAF" -> "Ibikorwa - GAF".
let originalTitle = null;
function translateTitle(lang) {
    const title = document.title;

    if (lang !== "rw") {
        if (originalTitle && title === originalTitle.translated) document.title = originalTitle.original;
        originalTitle = null;
        return;
    }

    const base = originalTitle && title === originalTitle.translated ? originalTitle.original : title;
    const parts = base.split(/(\s[-|–]\s)/);
    const translated = parts.map((part) => lookup(part) || part).join("");

    if (translated !== base) {
        originalTitle = { original: base, translated };
        if (title !== translated) document.title = translated;
    }
}

export function useAdminAutoTranslate(lang) {
    useEffect(() => {
        if (typeof window === "undefined") return undefined;

        translateTree(document.body, lang);
        translateTitle(lang);

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "characterData") {
                    translateTextNode(mutation.target, lang);
                } else if (mutation.type === "attributes") {
                    translateAttributes(mutation.target, lang);
                } else {
                    mutation.addedNodes.forEach((node) => translateTree(node, lang));
                }
            }
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ATTRIBUTES,
        });

        const titleElement = document.querySelector("title");
        const titleObserver = titleElement ? new MutationObserver(() => translateTitle(lang)) : null;
        titleObserver?.observe(titleElement, { childList: true, characterData: true, subtree: true });

        return () => {
            observer.disconnect();
            titleObserver?.disconnect();
        };
    }, [lang]);
}
