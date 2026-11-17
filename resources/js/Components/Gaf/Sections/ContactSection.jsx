import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useGaf } from "@/Context/GafContext";

export default function ContactSection() {
    const { t, site } = useGaf();
    const f = t.contact.form;

    const [sent, setSent] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        website_url: "", // honeypot, hidden from visitors
    });

    const submit = (event) => {
        event.preventDefault();

        post(route("contact.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSent(true);
            },
        });
    };

    const input = (name, label, type = "text", required = false) => (
        <label className="gaf-contact-field">
            <span>{label}{required && " *"}</span>
            <input
                type={type}
                value={data[name]}
                onChange={(event) => {
                    setData(name, event.target.value);
                    setSent(false);
                }}
                required={required}
                className={errors[name] ? "is-invalid" : ""}
            />
            {errors[name] && <small className="gaf-contact-error">{errors[name]}</small>}
        </label>
    );

    return (
        <section className="gaf-contact" id="contact">
            <div className="gaf-container gaf-contact-grid">
                <div>
                    <span className="gaf-eyebrow gaf-eyebrow-light">{t.contact.eyebrow}</span>
                    <h2>{t.contact.title}</h2>
                    <p>{t.contact.intro}</p>

                    <div className="gaf-contact-details">
                        <a href={`mailto:${site.email}`}>
                            <span>{t.contact.email}</span>
                            <strong>{site.email}</strong>
                            <b aria-hidden="true">↗</b>
                        </a>
                        <a href={`tel:${site.phone}`}>
                            <span>{t.contact.phone}</span>
                            <strong>{site.phone}</strong>
                            <b aria-hidden="true">↗</b>
                        </a>
                        <a href={site.website} target="_blank" rel="noreferrer">
                            <span>{t.contact.website}</span>
                            <strong>{site.website.replace(/^https?:\/\//, "")}</strong>
                            <b aria-hidden="true">↗</b>
                        </a>
                    </div>

                    {(site.socials || []).length > 0 && (
                        <div className="gaf-contact-socials">
                            <span>{t.contact.socials}</span>
                            <div>
                                {site.socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {social.label} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <form className="gaf-contact-form" onSubmit={submit} noValidate>
                    <h3>{f.title}</h3>

                    {sent && (
                        <p className="gaf-contact-success" role="status">
                            {f.success}
                        </p>
                    )}

                    <div className="gaf-contact-form-row">
                        {input("name", f.name, "text", true)}
                        {input("email", f.email, "email", true)}
                    </div>

                    <div className="gaf-contact-form-row">
                        {input("phone", f.phone, "tel")}
                        {input("subject", f.subject)}
                    </div>

                    <label className="gaf-contact-field">
                        <span>{f.message} *</span>
                        <textarea
                            rows={5}
                            value={data.message}
                            onChange={(event) => {
                                setData("message", event.target.value);
                                setSent(false);
                            }}
                            required
                            className={errors.message ? "is-invalid" : ""}
                        />
                        {errors.message && <small className="gaf-contact-error">{errors.message}</small>}
                    </label>

                    {/* Honeypot field for spam bots */}
                    <input
                        type="text"
                        name="website_url"
                        value={data.website_url}
                        onChange={(event) => setData("website_url", event.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="gaf-contact-hp"
                        aria-hidden="true"
                    />

                    <button type="submit" className="gaf-contact-submit" disabled={processing}>
                        {processing ? f.sending : f.submit}
                        <span aria-hidden="true">→</span>
                    </button>

                    <small className="gaf-contact-note">{f.privacy}</small>
                </form>
            </div>
        </section>
    );
}
