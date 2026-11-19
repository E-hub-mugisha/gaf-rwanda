import React from "react";
import { useGaf } from "@/Context/GafContext";

// Contact details only: heading on the left, email / phone / website and
// social links on the right.
export default function ContactSection() {
    const { t, site } = useGaf();

    return (
        <section className="gaf-contact" id="contact">
            <div className="gaf-container gaf-contact-grid">
                <div>
                    <span className="gaf-eyebrow gaf-eyebrow-light">{t.contact.eyebrow}</span>
                    <h2>{t.contact.title}</h2>
                    <p>{t.contact.intro}</p>
                </div>

                <div>
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
            </div>
        </section>
    );
}
