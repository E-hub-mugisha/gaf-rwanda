import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";
import { EventCard, GalleryCard } from "../Cards";

export default function ActivitiesSection({ events = [], gallery = [] }) {
    const { t } = useGaf();

    return (
        <section className="gaf-section gaf-activities" id="activities">
            <div className="gaf-container">
                <SectionHeading eyebrow={t.activities.eyebrow} title={t.activities.title} intro={t.activities.intro} />

                <div className="gaf-subsection-heading">
                    <div>
                        <h3>{t.activities.eventsTitle}</h3>
                        <p>{t.activities.eventsIntro}</p>
                    </div>
                </div>
                {events.length ? (
                    <div className="gaf-activity-grid">
                        {events.map((item, index) => (
                            <EventCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="gaf-empty">{t.activities.emptyEvents}</p>
                )}

                <div className="gaf-gallery-heading">
                    <div>
                        <h3>{t.activities.galleryTitle}</h3>
                        <p>{t.activities.galleryIntro}</p>
                    </div>
                    <span className="gaf-gallery-count">
                        {String(gallery.length).padStart(2, "0")} / {t.ui.gallery}
                    </span>
                </div>
                {gallery.length ? (
                    <div className="gaf-gallery-grid">
                        {gallery.map((item, index) => (
                            <GalleryCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="gaf-empty">{t.activities.emptyGallery}</p>
                )}
            </div>
        </section>
    );
}