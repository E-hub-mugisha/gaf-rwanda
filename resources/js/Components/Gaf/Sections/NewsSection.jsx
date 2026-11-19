import React from "react";
import { Link } from "@inertiajs/react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";
import { Cover } from "@/Components/Gaf/Page";
import { formatDate } from "@/lib/gafLocale";

// Home "News & Updates": a compact list of the latest articles
// (small thumbnail, category, date and title) with a link to all news.
export default function NewsSection({ news = [] }) {
    const { t, tr, lang } = useGaf();

    return (
        <section className="gaf-section bl-home-news" id="updates">
            <div className="gaf-container">
                <div className="bl-home-news-head">
                    <SectionHeading eyebrow={t.updates.eyebrow} title={t.updates.title} intro={t.updates.intro} />
                    {news.length > 0 && (
                        <Link href={route("news.index")} className="bl-more">
                            {t.newsPage.viewAll} <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                    )}
                </div>

                {news.length ? (
                    <ul className="bl-news-list">
                        {news.map((item) => (
                            <li key={item.id}>
                                <Link href={item.url} className="bl-news-row">
                                    <span className="bl-news-thumb">
                                        <Cover src={item.image} alt="" icon="bi-newspaper" />
                                    </span>
                                    <span className="bl-news-text">
                                        <span className="bl-post-meta">
                                            {item.category && <span className="bl-cat">{tr(item.category)}</span>}
                                            <time>{formatDate(item.date, lang, { month: "short" })}</time>
                                        </span>
                                        <strong>{tr(item.title)}</strong>
                                    </span>
                                    <i className="bi bi-chevron-right bl-news-arrow" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="gaf-empty">{t.activities.emptyNews}</p>
                )}
            </div>
        </section>
    );
}
