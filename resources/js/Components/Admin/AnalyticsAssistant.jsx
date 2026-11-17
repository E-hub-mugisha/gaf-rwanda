import React, { useEffect, useRef, useState } from "react";
import { useAdminLang } from "@/lib/adminI18n";

const TEXT = {
    title: { en: "Analytics assistant", rw: "Umufasha wa Analytics" },
    subtitle: { en: "Ask questions about your portal", rw: "Baza ibibazo ku rubuga rwawe" },
    greeting: {
        en: "Hello! I'm your portal analytics assistant. I can help you understand documents, readers, languages and website activity.",
        rw: "Muraho! Ndi umufasha wanyu wa portal analytics. Nshobora kubafasha gusobanukirwa inyandiko, abasoma, indimi n’ibikorwa by’urubuga.",
    },
    placeholder: { en: "Ask about your portal…", rw: "Baza ku rubuga rwawe…" },
    tryAsking: { en: "Try asking", rw: "Gerageza kubaza" },
    error: { en: "The analysis could not be completed. Please try again.", rw: "Isesengura ntiryashobotse. Ongera ugerageze." },
    quick: [
        { en: "Give me an overview of the portal", rw: "Mpa incamake y’urubuga" },
        { en: "Analyse our documents", rw: "Sesengura inyandiko zacu" },
        { en: "Analyse reader accounts", rw: "Sesengura konti z’abasoma" },
        { en: "Which languages have the most resources?", rw: "Ni izihe ndimi zifite ibikoresho byinshi?" },
    ],
};

/**
 * Floating analytics chat (posts to admin.analytics.chat).
 * Open it from anywhere with <AnalyticsAssistant open={…} onClose={…} />.
 */
export default function AnalyticsAssistant({ open, onClose }) {
    const { t } = useAdminLang();

    const [question, setQuestion] = useState("");
    const [processing, setProcessing] = useState(false);
    const [messages, setMessages] = useState([]);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, processing]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event) => event.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const ask = async (text = question) => {
        const clean = text.trim();
        if (!clean || processing) return;

        setProcessing(true);
        setMessages((current) => [...current, { role: "user", message: clean }]);
        setQuestion("");

        try {
            const response = await fetch(route("admin.analytics.chat"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                },
                credentials: "same-origin",
                body: JSON.stringify({ question: clean }),
            });

            if (!response.ok) throw new Error(`Analytics request failed (${response.status})`);

            const data = await response.json();
            setMessages((current) => [...current, { role: "assistant", message: data.answer || t(TEXT.error) }]);
        } catch (error) {
            console.error(error);
            setMessages((current) => [...current, { role: "assistant", message: t(TEXT.error), error: true }]);
        } finally {
            setProcessing(false);
        }
    };

    if (!open) return null;

    return (
        <div className="adm-assistant" role="dialog" aria-label={t(TEXT.title)}>
            <div className="adm-assistant-head">
                <span className="adm-icon is-yellow">
                    <i className="bi bi-stars" />
                </span>
                <div>
                    <strong>{t(TEXT.title)}</strong>
                    <small>{t(TEXT.subtitle)}</small>
                </div>
                <button type="button" className="adm-icon-btn ms-auto" onClick={onClose} aria-label={t("close")}>
                    <i className="bi bi-x-lg" />
                </button>
            </div>

            <div className="adm-assistant-body">
                <div className="adm-bubble is-assistant">{t(TEXT.greeting)}</div>

                {messages.length === 0 && (
                    <div className="adm-assistant-quick">
                        <small>{t(TEXT.tryAsking)}</small>
                        {TEXT.quick.map((item) => (
                            <button key={item.en} type="button" onClick={() => ask(t(item))}>
                                {t(item)}
                            </button>
                        ))}
                    </div>
                )}

                {messages.map((item, index) => (
                    <div
                        key={index}
                        className={`adm-bubble ${item.role === "user" ? "is-user" : "is-assistant"}${item.error ? " is-error" : ""}`}
                    >
                        {item.message}
                    </div>
                ))}

                {processing && (
                    <div className="adm-bubble is-assistant adm-typing">
                        <span />
                        <span />
                        <span />
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <form
                className="adm-assistant-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    ask();
                }}
            >
                <input
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder={t(TEXT.placeholder)}
                    disabled={processing}
                />
                <button type="submit" className="btn btn-primary" disabled={processing || !question.trim()}>
                    <i className="bi bi-send" />
                </button>
            </form>
        </div>
    );
}
