import React from "react";
import { useGaf, imageFallback, navItems, navUrl } from "@/Context/GafContext";

const SOCIAL_ICONS = {
    facebook: "bi-facebook",
    instagram: "bi-instagram",
    linkedin: "bi-linkedin",
    tiktok: "bi-tiktok",
    youtube: "bi-youtube",
    thread: "bi-threads",
    threads: "bi-threads",
    x: "bi-twitter-x",
};

const socialIcon = (label = "") => SOCIAL_ICONS[label.toLowerCase()] || "bi-link-45deg";

// Footer columns follow the website structure document:
// Iyobora · Kwitabira / Abo turibo · Vugana natwe · Contacts.
export default function Footer() {
    const { t, site } = useGaf();
    const website = site.website.replace(/^https?:\/\//, "");
    // Only real links (placeholders like "#" are skipped).
    const socials = (site.socials || []).filter((social) => social.url && social.url !== "#");

    return (
        <footer className="gaf-footer">
            <div className="gaf-container gaf-footer-main">
                <div className="gaf-footer-brand">
                    <a href="/" className="gaf-brand gaf-brand-footer">
                        <img src={site.logo} alt={site.name} onError={imageFallback} />
                    </a>
                    <p>{t.footer.description}</p>
                </div>

                <div className="gaf-footer-links">
                    <h4>{t.footer.navigation}</h4>
                    {navItems.map(([label, id]) => (
                        <a href={navUrl(id)} key={id}>{t.nav[label]}</a>
                    ))}
                </div>

                <div className="gaf-footer-links">
                    <h4>{t.footer.participate}</h4>
                    <a href="/#participation">{t.footer.participateLink}</a>
                    <a href={site.surveyUrl} target="_blank" rel="noreferrer">
                        {t.hero.primary} ↗
                    </a>

                    <h4 className="gaf-footer-subheading">{t.footer.about}</h4>
                    <a href="/team">{t.footer.aboutTeam}</a>
                    <a href="/#research">{t.footer.aboutStudy}</a>
                </div>

                <div className="gaf-footer-links">
                    <h4>{t.footer.follow}</h4>
                    {socials.map((social) => (
                        <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="gaf-footer-social">
                            <i className={`bi ${socialIcon(social.label)}`} aria-hidden="true" />
                            {social.label}
                        </a>
                    ))}
                </div>

                <div className="gaf-footer-links">
                    <h4>{t.footer.contact}</h4>
                    <a href={site.website} target="_blank" rel="noreferrer">{website}</a>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                    <a href={`tel:${site.phone}`}>Tel: {site.phone}</a>
                </div>
            </div>

            <div className="gaf-container gaf-footer-bottom">
                <span>© {new Date().getFullYear()} Guided Act & Feel Rwanda</span>
                <a href="/#privacy">{t.footer.privacy}</a>
                <span>{t.footer.rights}</span>
            </div>
        </footer>
    );
}
