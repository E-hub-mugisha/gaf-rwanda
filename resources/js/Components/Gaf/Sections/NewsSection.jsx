import React from "react";
import { Link } from "@inertiajs/react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";
import { Cover } from "@/Components/Gaf/Page";
import { formatDate } from "@/lib/gafLocale";

// Home "News & Updates": the newest update large on the left, the next ones
// as image cards beside it, and a link to all news.
export default function NewsSection({ news = [] }) {
    const { t, tr, lang } = useGaf();
    const [lead, ...rest] = news;
    const side = rest.slice(0, 4);

    return (
        <section className="gaf-section gp-updates" id="updates">
            <div className="gaf-container">
                <div className="gp-updates-head">
                    <SectionHeading eyebrow={t.updates.eyebrow} title={t.updates.title} intro={t.updates.intro} />
                    {news.length > 0 && (
                        <Link href={route("news.index")} className="gp-button is-outline">
                            {t.newsPage.viewAll}
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                    )}
                </div>

                {lead ? (
                    <div className={`gp-updates-grid${side.length ? "" : " is-single"}`}>
                        <Link href={lead.url} className="gp-update-lead">
                            <span className="gp-update-lead-media">
                                <Cover src={lead.image} alt={tr(lead.title)} icon="bi-newspaper" />
                            </span>
                            <span className="gp-update-lead-body">
                                <span className="gp-update-meta">
                                    {lead.category && <span className="gp-tag">{tr(lead.category)}</span>}
                                    <time>{formatDate(lead.date, lang)}</time>
                                </span>
                                <strong>{tr(lead.title)}</strong>
                                {lead.text && <span className="gp-update-text">{tr(lead.text)}</span>}
                                <span className="gp-card-link">
                                    {t.updates.read}
                                    <i className="bi bi-arrow-right" aria-hidden="true" />
                                </span>
                            </span>
                        </Link>

                        {side.length > 0 && (
                            <div className="gp-update-list">
                                {side.map((item) => (
                                    <Link key={item.id} href={item.url} className="gp-update-item">
                                        <Cover src={item.image} alt={tr(item.title)} icon="bi-newspaper" />
                                        <span className="gp-update-item-body">
                                            <span className="gp-update-meta">
                                                {item.category && <span className="gp-tag">{tr(item.category)}</span>}
                                                <time>{formatDate(item.date, lang, { month: "short" })}</time>
                                            </span>
                                            <strong>{tr(item.title)}</strong>
                                            <span className="gp-card-link">
                                                {t.updates.read}
                                                <i className="bi bi-arrow-right" aria-hidden="true" />
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="gaf-empty">{t.activities.emptyNews}</p>
                )}
            </div>
        </section>
    );
}
