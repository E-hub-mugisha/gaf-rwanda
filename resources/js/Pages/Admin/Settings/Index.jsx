import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useAdminLang } from "@/lib/adminI18n";

const SOCIALS = [
    { key: "facebook_url", label: "Facebook", icon: "bi-facebook", placeholder: "https://facebook.com/…" },
    { key: "instagram_url", label: "Instagram", icon: "bi-instagram", placeholder: "https://instagram.com/…" },
    { key: "linkedin_url", label: "LinkedIn", icon: "bi-linkedin", placeholder: "https://linkedin.com/company/…" },
    { key: "youtube_url", label: "YouTube", icon: "bi-youtube", placeholder: "https://youtube.com/@…" },
    { key: "x_url", label: "X (Twitter)", icon: "bi-twitter-x", placeholder: "https://x.com/…" },
];

export default function Index({ settings }) {
    const { t } = useAdminLang();
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors, isDirty, recentlySuccessful } = useForm({
        email: settings.email || "",
        phone: settings.phone || "",
        website: settings.website || "",
        survey_url: settings.survey_url || "",
        ...Object.fromEntries(SOCIALS.map(({ key }) => [key, settings[key] || ""])),
    });

    const submit = (event) => {
        event.preventDefault();
        put(route("admin.settings.update"), { preserveScroll: true });
    };

    const field = ({ name, label, icon, type = "text", placeholder, hint, required }) => (
        <div className="col-md-6" key={name}>
            <label className="form-label fw-semibold" htmlFor={name}>
                {label} {required && <span className="text-danger">*</span>}
            </label>
            <div className="input-group">
                <span className="input-group-text">
                    <i className={`bi ${icon}`} />
                </span>
                <input
                    id={name}
                    type={type}
                    className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                    value={data[name]}
                    onChange={(event) => setData(name, event.target.value)}
                    placeholder={placeholder}
                />
                {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
            </div>
            {hint && <div className="form-text">{hint}</div>}
        </div>
    );

    return (
        <AdminLayout title={t("settings")}>
            <Head title={t("settings")} />

            <form className="adm-page" onSubmit={submit}>
                <div className="adm-page-head">
                    <div>
                        <span className="adm-breadcrumb">
                            {t("administration")} / {t("settings")}
                        </span>
                        <h2>{t("settings")}</h2>
                        <p>
                            {t({
                                en: "Contact details, the participation link and social media shown across the public website.",
                                rw: "Aho batwandikira, ihuza ryo kwitabira n’imbuga nkoranyambaga bigaragara ku rubuga.",
                            })}
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {recentlySuccessful && (
                            <span className="text-success small">
                                <i className="bi bi-check-circle me-1" />
                                {flash?.success || t({ en: "Saved", rw: "Byabitswe" })}
                            </span>
                        )}
                        <button type="submit" className="btn btn-primary px-4" disabled={processing || !isDirty}>
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    {t("saving")}
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check2 me-2" />
                                    {t("save")}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="adm-card adm-card-padded mb-4">
                    <div className="adm-card-title">
                        <span className="adm-icon is-blue">
                            <i className="bi bi-telephone" />
                        </span>
                        <div>
                            <h5>{t({ en: "Contact details", rw: "Aho batwandikira" })}</h5>
                            <p>{t({ en: "Shown in the header, contact section and footer.", rw: "Bigaragara hejuru, mu gice cya “Vugana natwe” no hasi ku rubuga." })}</p>
                        </div>
                    </div>

                    <div className="row g-3">
                        {field({ name: "email", label: t({ en: "Email", rw: "Imeyili" }), icon: "bi-envelope", type: "email", required: true })}
                        {field({ name: "phone", label: t({ en: "Telephone", rw: "Telefoni" }), icon: "bi-telephone", required: true })}
                        {field({ name: "website", label: t({ en: "Website", rw: "Urubuga" }), icon: "bi-globe2", type: "url", required: true })}
                        {field({
                            name: "survey_url",
                            label: t({ en: "Participation link (“Itabire” button)", rw: "Ihuza ryo kwitabira (buto “Itabire”)" }),
                            icon: "bi-ui-checks",
                            type: "url",
                            required: true,
                            hint: t({ en: "Where the “Take part” buttons and the poster send visitors.", rw: "Aho buto “Itabire” n’ifoto bijyana abasura urubuga." }),
                        })}
                    </div>
                </div>

                <div className="adm-card adm-card-padded">
                    <div className="adm-card-title">
                        <span className="adm-icon is-green">
                            <i className="bi bi-share" />
                        </span>
                        <div>
                            <h5>{t({ en: "Social media", rw: "Imbuga nkoranyambaga" })}</h5>
                            <p>{t({ en: "Only networks with a link are shown on the website.", rw: "Imbuga zifite ihuza ni zo zonyine zigaragara ku rubuga." })}</p>
                        </div>
                    </div>

                    <div className="row g-3">
                        {SOCIALS.map(({ key, label, icon, placeholder }) =>
                            field({ name: key, label, icon, type: "url", placeholder })
                        )}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
