import React from "react";
import { useGaf, imageFallback } from "@/Context/GafContext";
import { fmt } from "@/lib/gafFormat";

export default function EventCard({ item, index = 0 }) {
    const { t, tr } = useGaf();
    const badge = t.activities[item.timing];

    return (
        <article className="gaf-activity-item">
            <div className="gaf-activity-image">
                {item.image ? (
                    <img src={item.image} alt={tr(item.title)} loading="lazy" onError={imageFallback} />
                ) : (
                    <div className="gaf-image-empty">GAF-Rwanda</div>
                )}
                <span className="gaf-image-index">{String(index + 1).padStart(2, "0")}</span>
                {badge && <span className={`gaf-badge gaf-badge-${item.timing}`}>{badge}</span>}
            </div>
            <div className="gaf-activity-copy">
                <p className="gaf-meta">
                    {fmt(item.date)}
                    {item.endDate && item.endDate !== item.date ? ` – ${fmt(item.endDate)}` : ""}
                    {item.place ? ` · ${item.place}` : ""}
                </p>
                <h3>{tr(item.title)}</h3>
                <p>{tr(item.text)}</p>
                {item.registrationUrl && item.timing === "upcoming" && (
                    <a className="gaf-text-link" href={item.registrationUrl} target="_blank" rel="noreferrer">
                        {t.activities.register} <span aria-hidden="true">↗</span>
                    </a>
                )}
            </div>
        </article>
    );
}