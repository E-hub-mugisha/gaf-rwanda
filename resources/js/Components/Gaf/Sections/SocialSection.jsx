import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";

// Home page social media section.
// Posts come from Admin › Settings › "Social media feeds": the official
// LinkedIn and Instagram embeds are shown side by side. A live-feed widget
// link (SociableKIT, Juicer, Elfsight...) replaces them when set.
// The section is hidden when nothing is configured.

function FeedColumn({ network, icon, title, followUrl, followLabel, posts, emptyText, frameTitle }) {
    return (
        <div className={`sf-column is-${network}`}>
            <div className="sf-column-head">
                <span className="sf-network">
                    <i className={`bi ${icon}`} aria-hidden="true" />
                    {title}
                </span>
                {followUrl && (
                    <a href={followUrl} target="_blank" rel="noopener noreferrer" className="sf-follow">
                        {followLabel} <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                    </a>
                )}
            </div>

            {posts.length ? (
                <div className="sf-feed" tabIndex={0} aria-label={title}>
                    {posts.map((src, index) => (
                        <div className="sf-post" key={src}>
                            <iframe
                                src={src}
                                title={`${frameTitle} ${index + 1}`}
                                loading="lazy"
                                allowFullScreen
                                allow="encrypted-media; clipboard-write; picture-in-picture"
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="sf-empty">
                    <i className={`bi ${icon}`} aria-hidden="true" />
                    <p>{emptyText}</p>
                    {followUrl && (
                        <a href={followUrl} target="_blank" rel="noopener noreferrer" className="sf-follow">
                            {followLabel} <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SocialSection() {
    const { site, tr } = useGaf();
    const feed = site.socialFeed || {};
    const linkedin = feed.linkedin || [];
    const instagram = feed.instagram || [];

    const hasAnything = feed.widget || linkedin.length || instagram.length || feed.linkedinUrl || feed.instagramUrl;
    if (!hasAnything) return null;

    const follow = tr({ en: "Follow us", rw: "Dukurikire" });

    return (
        <section className="gaf-section sf-section" id="social">
            <div className="gaf-container">
                <SectionHeading
                    title={tr({ en: "Follow our work", rw: "Kurikira ibikorwa byacu" })}
                    intro={tr({
                        en: "The latest from GAF-Rwanda on LinkedIn and Instagram.",
                        rw: "Ibiheruka bya GAF-Rwanda kuri LinkedIn no kuri Instagram.",
                    })}
                />

                {feed.widget ? (
                    <div className="sf-widget">
                        <iframe
                            src={feed.widget}
                            title={tr({ en: "Social media feed", rw: "Ibyo dushyira ku mbuga nkoranyambaga" })}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                ) : (
                    <div className="sf-grid">
                        <FeedColumn
                            network="linkedin"
                            icon="bi-linkedin"
                            title="LinkedIn"
                            followUrl={feed.linkedinUrl}
                            followLabel={follow}
                            posts={linkedin}
                            frameTitle={tr({ en: "LinkedIn post", rw: "Ibyashyizwe kuri LinkedIn" })}
                            emptyText={tr({ en: "Our latest LinkedIn posts will appear here.", rw: "Ibyo dushyira kuri LinkedIn biheruka bizagaragara hano." })}
                        />
                        <FeedColumn
                            network="instagram"
                            icon="bi-instagram"
                            title="Instagram"
                            followUrl={feed.instagramUrl}
                            followLabel={follow}
                            posts={instagram}
                            frameTitle={tr({ en: "Instagram post", rw: "Ibyashyizwe kuri Instagram" })}
                            emptyText={tr({ en: "Our latest Instagram posts will appear here.", rw: "Ibyo dushyira kuri Instagram biheruka bizagaragara hano." })}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
