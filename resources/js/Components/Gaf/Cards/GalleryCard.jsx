import React from "react";
import { useGaf, imageFallback } from "@/Context/GafContext";
import { fmt } from "@/lib/gafFormat";

export default function GalleryCard({ item, index = 0 }) {
    const { t, tr } = useGaf();

    return (
        <article className="gaf-activity-item">
            <div className="gaf-activity-image">
                {item.image ? (
                    <img src={item.image} alt={tr(item.title)} loading="lazy" onError={imageFallback} />
                ) : (
                    <div className="gaf-image-empty">GAF-Rwanda</div>
                )}
                <span className="gaf-image-index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="gaf-activity-copy">
                <p className="gaf-meta">
                    {item.date ? fmt(item.date) : ""}
                    {item.place ? ` · ${item.place}` : ""}
                    {item.count ? ` · ${item.count} ${t.activities.photos}` : ""}
                </p>
                <h3>{tr(item.title)}</h3>
                {item.text && <p>{tr(item.text)}</p>}
            </div>
        </article>
    );
}