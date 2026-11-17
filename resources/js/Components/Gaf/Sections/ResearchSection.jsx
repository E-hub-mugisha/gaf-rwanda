import React from "react";
import { useGaf, imageFallback } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";

export default function ResearchSection() {
    const { t, site } = useGaf();

    return (
        <section className="gaf-section gaf-research" id="research">
            <div className="gaf-container">
                <div className="gaf-research-layout">
                    <div className="gaf-research-intro">
                        <SectionHeading eyebrow={t.research.eyebrow} title={t.research.title} intro={t.research.intro} />
                    </div>
                    <div className="gaf-research-detail">
                        <span className="gaf-small-number">01 — {t.ui.purpose}</span>
                        <h3>{t.research.objectiveTitle}</h3>
                        <p>{t.research.objective}</p>
                        <div className="gaf-research-note">
                            <span className="gaf-note-rule" />
                            <p>{t.research.note}</p>
                        </div>
                    </div>
                </div>
                <div className="gaf-research-image">
                    <img src={site.heroImage} alt={t.ui.researchAlt} onError={imageFallback} />
                    <div className="gaf-image-overlay-copy">
                        <span>GAF-RWANDA</span>
                        <p>{t.ui.tagline}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}