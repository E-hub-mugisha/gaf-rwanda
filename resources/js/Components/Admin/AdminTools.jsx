// Interactive admin tools used by AdminLayout:
//   CommandPalette   Ctrl/Cmd+K: pages, quick actions and content search
//   Toaster          success / error messages that dismiss themselves
//   useUnsavedGuard  warns before leaving a form with unsaved edits
//   useShortcuts     keyboard shortcuts (g d, g e, ...) and the ? help
//   ShortcutsHelp    list of shortcuts
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { router } from "@inertiajs/react";

const safeRoute = (name, params) => {
    try {
        return route(name, params);
    } catch {
        return null;
    }
};

const isTyping = (element) =>
    element &&
    (element.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName));

/* ------------------------------------------------------------------ */
/* Command palette                                                     */
/* ------------------------------------------------------------------ */
export function CommandPalette({ open, onClose, navigation, t }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    // Quick actions (only those whose route exists).
    const actions = useMemo(
        () =>
            [
                { label: t({ en: "New event", rw: "Igikorwa gishya" }), icon: "bi-calendar-plus", route: "admin.events.create" },
                { label: t({ en: "New news article", rw: "Inkuru nshya" }), icon: "bi-file-earmark-plus", route: "admin.news-articles.create" },
                { label: t({ en: "New program", rw: "Gahunda nshya" }), icon: "bi-collection", route: "admin.programs.create" },
                { label: t({ en: "New event category", rw: "Icyiciro gishya" }), icon: "bi-tag", route: "admin.event-categories.create" },
                { label: t({ en: "Upload a document", rw: "Ohereza inyandiko" }), icon: "bi-upload", route: "admin.documents.create" },
                { label: t({ en: "Add a user", rw: "Ongeraho umukoresha" }), icon: "bi-person-plus", route: "admin.users.create" },
                { label: t({ en: "Add a team member", rw: "Ongeraho umunyamuryango" }), icon: "bi-person-badge", route: "admin.team.index" },
                { label: t({ en: "Add an FAQ", rw: "Ongeraho ikibazo" }), icon: "bi-question-circle", route: "admin.faqs.index" },
                { label: t({ en: "Change homepage video", rw: "Hindura video y’ahabanza" }), icon: "bi-play-btn", route: "admin.hero-media.index" },
            ]
                .map((action) => ({ ...action, url: safeRoute(action.route) }))
                .filter((action) => action.url),
        [t]
    );

    const pages = useMemo(
        () =>
            navigation.flatMap((section) =>
                section.items.map((item) => ({
                    label: item.label,
                    icon: item.icon,
                    url: safeRoute(item.route),
                    meta: section.label,
                }))
            ).filter((page) => page.url),
        [navigation]
    );

    // Server content search (debounced).
    useEffect(() => {
        if (!open) return undefined;

        const term = query.trim();
        if (term.length < 2) {
            setResults([]);
            setLoading(false);
            return undefined;
        }

        const controller = new AbortController();
        setLoading(true);

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${route("admin.search")}?q=${encodeURIComponent(term)}`, {
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                    credentials: "same-origin",
                    signal: controller.signal,
                });
                const data = response.ok ? await response.json() : { groups: [] };
                setResults(data.groups || []);
            } catch (error) {
                if (error.name !== "AbortError") setResults([]);
            } finally {
                setLoading(false);
            }
        }, 220);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query, open]);

    // Reset when opened.
    useEffect(() => {
        if (open) {
            setQuery("");
            setResults([]);
            setActive(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [open]);

    const term = query.trim().toLowerCase();
    const match = (text) => !term || String(text || "").toLowerCase().includes(term);

    // Flat list of sections for display and keyboard navigation.
    const sections = useMemo(() => {
        const list = [];
        const filteredActions = actions.filter((item) => match(item.label));
        const filteredPages = pages.filter((item) => match(item.label) || match(item.meta));

        if (filteredActions.length) {
            list.push({ label: t({ en: "Quick actions", rw: "Ibikorwa byihuse" }), items: filteredActions });
        }
        if (filteredPages.length) {
            list.push({ label: t({ en: "Pages", rw: "Paji" }), items: filteredPages.slice(0, term ? 8 : 6) });
        }
        results.forEach((group) => {
            list.push({
                label: t(group.label),
                items: group.items.map((item) => ({ label: item.title, meta: item.meta, url: item.url, icon: group.icon })),
            });
        });
        return list;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actions, pages, results, term, t]);

    const flat = sections.flatMap((section) => section.items);

    useEffect(() => {
        setActive(0);
    }, [term, results]);

    // Keep the highlighted row visible.
    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const go = useCallback(
        (item) => {
            if (!item?.url) return;
            onClose();
            router.visit(item.url);
        },
        [onClose]
    );

    const onKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((index) => Math.min(index + 1, flat.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((index) => Math.max(index - 1, 0));
        } else if (event.key === "Enter") {
            event.preventDefault();
            go(flat[active]);
        } else if (event.key === "Escape") {
            onClose();
        }
    };

    if (!open) return null;

    let index = -1;

    return (
        <div className="adm-palette-backdrop" onMouseDown={onClose} role="presentation">
            <div
                className="adm-palette"
                role="dialog"
                aria-modal="true"
                aria-label={t({ en: "Search the admin", rw: "Shakisha" })}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="adm-palette-input">
                    <i className="bi bi-search" aria-hidden="true" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder={t({
                            en: "Search pages, actions, events, news, team…",
                            rw: "Shakisha paji, ibikorwa, amakuru, itsinda…",
                        })}
                        aria-label={t({ en: "Search", rw: "Shakisha" })}
                    />
                    {loading && <span className="spinner-border spinner-border-sm text-secondary" role="status" />}
                    <kbd>Esc</kbd>
                </div>

                <div className="adm-palette-list" ref={listRef}>
                    {sections.map((section) => (
                        <div key={section.label} className="adm-palette-section">
                            <span className="adm-palette-label">{section.label}</span>
                            {section.items.map((item) => {
                                index += 1;
                                const current = index;
                                return (
                                    <button
                                        key={`${section.label}-${current}`}
                                        type="button"
                                        data-index={current}
                                        className={`adm-palette-item${current === active ? " is-active" : ""}`}
                                        onMouseEnter={() => setActive(current)}
                                        onClick={() => go(item)}
                                    >
                                        <i className={`bi ${item.icon || "bi-arrow-right"}`} aria-hidden="true" />
                                        <span className="adm-palette-text">
                                            <strong>{item.label}</strong>
                                            {item.meta && <small>{item.meta}</small>}
                                        </span>
                                        <i className="bi bi-arrow-return-left adm-palette-enter" aria-hidden="true" />
                                    </button>
                                );
                            })}
                        </div>
                    ))}

                    {!flat.length && !loading && (
                        <p className="adm-palette-empty">
                            {t({ en: "No results. Try another word.", rw: "Nta bisubizo. Gerageza irindi jambo." })}
                        </p>
                    )}
                </div>

                <div className="adm-palette-foot">
                    <span>
                        <kbd>↑</kbd>
                        <kbd>↓</kbd> {t({ en: "move", rw: "himura" })}
                    </span>
                    <span>
                        <kbd>Enter</kbd> {t({ en: "open", rw: "fungura" })}
                    </span>
                    <span>
                        <kbd>?</kbd> {t({ en: "shortcuts", rw: "inzira z’ubusamo" })}
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */
let toastId = 0;

export function Toaster({ initialFlash, t }) {
    const [toasts, setToasts] = useState([]);

    const dismiss = useCallback((id) => {
        setToasts((list) => list.filter((toast) => toast.id !== id));
    }, []);

    const push = useCallback(
        (flash) => {
            if (!flash) return;
            const items = [
                flash.success && { tone: "success", text: flash.success },
                flash.status && { tone: "info", text: flash.status },
                flash.error && { tone: "error", text: flash.error },
            ].filter(Boolean);

            items.forEach((item) => {
                const id = ++toastId;
                setToasts((list) => [...list.slice(-3), { ...item, id }]);
                setTimeout(() => dismiss(id), item.tone === "error" ? 8000 : 4500);
            });
        },
        [dismiss]
    );

    // First page load, then every successful Inertia visit.
    useEffect(() => {
        push(initialFlash);
        return router.on("success", (event) => push(event.detail.page.props.flash));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Validation errors after a form submit.
    useEffect(
        () =>
            router.on("error", (event) => {
                const count = Object.keys(event.detail.errors || {}).length;
                if (!count) return;
                push({
                    error: t({
                        en: `Please check the form: ${count} field${count > 1 ? "s need" : " needs"} attention.`,
                        rw: `Reba ifishi: hari ${count} ahakeneye gukosorwa.`,
                    }),
                });
            }),
        [push, t]
    );

    return (
        <div className="adm-toasts" role="status" aria-live="polite">
            {toasts.map((toast) => (
                <div key={toast.id} className={`adm-toast is-${toast.tone}`}>
                    <i
                        className={`bi ${
                            toast.tone === "success"
                                ? "bi-check-circle-fill"
                                : toast.tone === "error"
                                  ? "bi-exclamation-octagon-fill"
                                  : "bi-info-circle-fill"
                        }`}
                        aria-hidden="true"
                    />
                    <span>{toast.text}</span>
                    <button type="button" onClick={() => dismiss(toast.id)} aria-label={t({ en: "Close", rw: "Funga" })}>
                        <i className="bi bi-x-lg" />
                    </button>
                </div>
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Unsaved changes guard                                               */
/* ------------------------------------------------------------------ */
export function useUnsavedGuard(t) {
    const dirtyForms = useRef(new Set());

    useEffect(() => {
        const content = document.querySelector(".adm-content");
        if (!content) return undefined;

        const markDirty = (event) => {
            const field = event.target;
            const form = field.closest?.("form");
            // Search and filter boxes are not real edits.
            if (!form || field.type === "search" || field.closest("[data-no-guard]")) return;
            dirtyForms.current.add(form);
        };

        const markClean = (event) => {
            dirtyForms.current.delete(event.target);
        };

        content.addEventListener("input", markDirty, true);
        content.addEventListener("change", markDirty, true);
        content.addEventListener("submit", markClean, true);

        const hasUnsaved = () => {
            // Forms closed without saving (modals) no longer count.
            dirtyForms.current.forEach((form) => {
                if (!form.isConnected) dirtyForms.current.delete(form);
            });
            return dirtyForms.current.size > 0;
        };

        const message = t({
            en: "You have unsaved changes. Leave this page without saving?",
            rw: "Hari ibyo wahinduye utabitse. Urashaka kuva kuri iyi paji utabitse?",
        });

        const removeBefore = router.on("before", (event) => {
            const visit = event.detail.visit;
            if (visit.method !== "get" || !hasUnsaved()) return;
            if (!window.confirm(message)) {
                event.preventDefault();
            } else {
                dirtyForms.current.clear();
            }
        });

        // After a successful save, nothing is pending any more.
        const removeSuccess = router.on("success", (event) => {
            if (event.detail.page) dirtyForms.current.clear();
        });

        const onUnload = (event) => {
            if (!hasUnsaved()) return;
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", onUnload);

        return () => {
            content.removeEventListener("input", markDirty, true);
            content.removeEventListener("change", markDirty, true);
            content.removeEventListener("submit", markClean, true);
            removeBefore();
            removeSuccess();
            window.removeEventListener("beforeunload", onUnload);
        };
    }, [t]);
}

/* ------------------------------------------------------------------ */
/* Keyboard shortcuts                                                  */
/* ------------------------------------------------------------------ */
export const SHORTCUTS = [
    { keys: ["Ctrl", "K"], label: { en: "Open search and quick actions", rw: "Fungura gushakisha" } },
    { keys: ["/"], label: { en: "Open search", rw: "Fungura gushakisha" } },
    { keys: ["g", "d"], label: { en: "Go to dashboard", rw: "Jya ku kibaho" }, route: "admin.dashboard" },
    { keys: ["g", "e"], label: { en: "Go to events", rw: "Jya ku bikorwa" }, route: "admin.events.index" },
    { keys: ["g", "n"], label: { en: "Go to news", rw: "Jya ku makuru" }, route: "admin.news-articles.index" },
    { keys: ["g", "t"], label: { en: "Go to team", rw: "Jya ku itsinda" }, route: "admin.team.index" },
    { keys: ["g", "f"], label: { en: "Go to FAQs", rw: "Jya ku bibazo" }, route: "admin.faqs.index" },
    { keys: ["g", "s"], label: { en: "Go to settings", rw: "Jya ku igenamiterere" }, route: "admin.settings.edit" },
    { keys: ["?"], label: { en: "Show keyboard shortcuts", rw: "Erekana inzira z’ubusamo" } },
    { keys: ["Esc"], label: { en: "Close a window", rw: "Funga idirishya" } },
];

export function useShortcuts({ openPalette, openHelp, closeAll }) {
    useEffect(() => {
        let leader = false;
        let timer;

        const onKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                openPalette();
                return;
            }

            if (event.key === "Escape") {
                closeAll();
                return;
            }

            if (isTyping(document.activeElement) || event.ctrlKey || event.metaKey || event.altKey) return;

            if (event.key === "/") {
                event.preventDefault();
                openPalette();
                return;
            }

            if (event.key === "?") {
                event.preventDefault();
                openHelp();
                return;
            }

            if (leader) {
                leader = false;
                clearTimeout(timer);
                const shortcut = SHORTCUTS.find((item) => item.keys[0] === "g" && item.keys[1] === event.key.toLowerCase());
                const url = shortcut && safeRoute(shortcut.route);
                if (url) {
                    event.preventDefault();
                    router.visit(url);
                }
                return;
            }

            if (event.key.toLowerCase() === "g") {
                leader = true;
                timer = setTimeout(() => {
                    leader = false;
                }, 900);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            clearTimeout(timer);
        };
    }, [openPalette, openHelp, closeAll]);
}

export function ShortcutsHelp({ open, onClose, t }) {
    if (!open) return null;

    return (
        <div className="adm-palette-backdrop" onMouseDown={onClose} role="presentation">
            <div
                className="adm-palette adm-shortcuts"
                role="dialog"
                aria-modal="true"
                aria-label={t({ en: "Keyboard shortcuts", rw: "Inzira z’ubusamo" })}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="adm-shortcuts-head">
                    <h3>
                        <i className="bi bi-keyboard" /> {t({ en: "Keyboard shortcuts", rw: "Inzira z’ubusamo" })}
                    </h3>
                    <button type="button" onClick={onClose} aria-label={t({ en: "Close", rw: "Funga" })}>
                        <i className="bi bi-x-lg" />
                    </button>
                </div>
                <ul>
                    {SHORTCUTS.map((shortcut) => (
                        <li key={shortcut.keys.join("+")}>
                            <span>{t(shortcut.label)}</span>
                            <span className="adm-shortcuts-keys">
                                {shortcut.keys.map((key, index) => (
                                    <React.Fragment key={key + index}>
                                        {index > 0 && shortcut.keys[0] === "g" && <em>{t({ en: "then", rw: "hanyuma" })}</em>}
                                        <kbd>{key}</kbd>
                                    </React.Fragment>
                                ))}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
