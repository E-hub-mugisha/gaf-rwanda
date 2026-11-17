import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";
import { NewsCard } from "../Cards";

export default function NewsSection({ news = [] }) {
    const { t } = useGaf();

    return (
        <section className="gaf-section gaf-updates" id="updates">
            <div className="gaf-container">
                <SectionHeading eyebrow={t.updates.eyebrow} title={t.updates.title} intro={t.updates.intro} />
                <div className="gaf-news-list">
                    {news.length ? (
                        news.map((item) => <NewsCard key={item.id} item={item} />)
                    ) : (
                        <p className="gaf-empty">{t.activities.emptyNews}</p>
                    )}
                </div>
            </div>
        </section>
    );
}