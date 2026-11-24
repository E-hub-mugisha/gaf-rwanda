import React from "react";
import { useGaf, imageFallback } from "@/Context/GafContext";
import { RD } from "@/Data/gafRedesign";

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

export default function Footer() {
    const { lang, site } = useGaf();
    const L = (o) => o[lang] ?? o.en;
    // Only real links (placeholders like "#" are skipped).
    const socials = (site.socials || []).filter((social) => social.url && social.url !== "#");
    const F = RD.footer;

    return (
        <footer className="rd-footer">
            <div className="rd-wrap rd-footer-main">
                <div className="rd-footer-brand">
                    <a href="/" className="rd-logo-pill"><img src={site.logo} alt={site.name} onError={imageFallback} /></a>
                    <p>{L(F.tagline)}</p>
                    <div className="rd-footer-socials">
                        {socials.map((social) => (
                            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                                <i className={`bi ${socialIcon(social.label)}`} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
                <nav className="rd-footer-col" aria-label={L(F.pages)}>
                    <h4>{L(F.pages)}</h4>
                    {F.links.map(([href, label]) => <a key={href} href={href}>{L(label)}</a>)}
                </nav>
                <div className="rd-footer-col">
                    <h4>{L(F.contact)}</h4>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                    <a href={`tel:${site.phone}`}>{site.phone} (WhatsApp)</a>
                </div>
            </div>
            <div className="rd-footer-bottom">
                <div className="rd-wrap rd-footer-bottom-inner">
                    <span>© {new Date().getFullYear()} GAF-Rwanda · {L(F.approved)}: {RD.rnec}</span>
                    <a href="/abitabiriye">{L(F.participants)}</a>
                </div>
            </div>
        </footer>
    );
}
