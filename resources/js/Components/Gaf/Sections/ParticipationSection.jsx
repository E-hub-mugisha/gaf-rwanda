import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";

export default function ParticipationSection() {
    const { t, tr, site } = useGaf();

    return (
        <section className="gaf-section gaf-participation" id="participation">
            <div className="gaf-container">
                <div className="gaf-participation-heading">
                    <SectionHeading
                        eyebrow={t.participation.eyebrow}
                        title={t.participation.title}
                        intro={t.participation.intro}
                    />
                    <a className="gaf-button gaf-button-primary" href={site.surveyUrl} target="_blank" rel="noreferrer">
                        {t.participation.cta} <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <div className="gaf-participation-grid">
                    <div className="gaf-eligibility">
                        <h3>{t.participation.eligibleTitle}</h3>
                        <ul>
                            {t.participation.criteria.map((item) => (
                                <li key={item}><span aria-hidden="true">+</span>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="gaf-process">
                        <h3>{t.participation.processTitle}</h3>

                        {/* Animated poster with the steps to join; opens the survey. */}
                        <a
                            className="gaf-participation-poster is-steps"
                            href={site.surveyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src="/images/participation-steps.gif"
                                alt={t.participation.posterAlt}
                                width="1080"
                                height="1125"
                                loading="lazy"
                            />
                        </a>
                    </div>
                </div>
                <p className="gaf-participation-disclaimer">{t.participation.disclaimer}</p>
            </div>
        </section>
    );
}