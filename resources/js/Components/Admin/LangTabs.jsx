import React from "react";
import { useAdminLang } from "@/lib/adminI18n";

/**
 * English / Kinyarwanda switch for bilingual forms.
 *
 * const [editLang, setEditLang] = useState("en");
 * const field = (name) => (editLang === "rw" ? `${name}_rw` : name);
 *
 * <LangTabs value={editLang} onChange={setEditLang}
 *           data={form.data} errors={form.errors} fields={["title", "excerpt"]} />
 *
 * A dot appears on a tab when one of its fields is empty or has an error.
 */
export default function LangTabs({ value, onChange, data = {}, errors = {}, fields = [] }) {
    const { t } = useAdminLang();

    const isBlank = (v) => v === null || v === undefined || String(v).replace(/<[^>]*>/g, "").trim() === "";

    const state = (lang) => {
        const names = fields.map((f) => (lang === "rw" ? `${f}_rw` : f));
        return {
            hasError: names.some((n) => errors[n]),
            incomplete: names.some((n) => isBlank(data[n])),
        };
    };

    const tabs = [
        { code: "en", label: t("english") },
        { code: "rw", label: t("kinyarwanda") },
    ];

    const rwState = state("rw");

    return (
        <div className="adm-langtabs">
            <div className="adm-langtabs-bar" role="tablist" aria-label={t("editingIn")}>
                <span className="adm-langtabs-label">
                    <i className="bi bi-translate" /> {t("editingIn")}
                </span>

                <div className="adm-langtabs-switch">
                    {tabs.map(({ code, label }) => {
                        const { hasError, incomplete } = state(code);

                        return (
                            <button
                                key={code}
                                type="button"
                                role="tab"
                                aria-selected={value === code}
                                className={`${value === code ? "is-active" : ""} ${hasError ? "has-error" : ""}`}
                                onClick={() => onChange(code)}
                            >
                                <span className="adm-langtabs-code">{code.toUpperCase()}</span>
                                {label}
                                {(hasError || incomplete) && <span className="adm-langtabs-dot" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {value === "rw" && rwState.incomplete && (
                <p className="adm-langtabs-hint">
                    <i className="bi bi-info-circle" /> {t("translationHint")}
                </p>
            )}
        </div>
    );
}
