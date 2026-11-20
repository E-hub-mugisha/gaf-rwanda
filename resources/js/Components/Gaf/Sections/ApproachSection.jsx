import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";

export default function ApproachSection() {
    const { t } = useGaf();

    return (
        <section className="gaf-section gaf-approach">
            <div className="gaf-container">
                <SectionHeading eyebrow={t.approach.eyebrow} title={t.approach.title} intro={t.approach.intro} />
                <div className="gaf-programmes">
                    <article className="gaf-programme">
                        <div className="gaf-programme-top">
                            <img className="gaf-programme-icon" src="/images/programme-guided.jpg" alt="" aria-hidden="true" width="56" height="56" />
                            <span className="gaf-programme-symbol">↗</span>
                        </div>
                        <div>
                            <h3>{t.approach.firstTitle}</h3>
                            <p>{t.approach.firstText}</p>
                        </div>
                        <div className="gaf-programme-bottom">
                            <span>{t.ui.guidedLabel}</span>
                        </div>
                    </article>
                    <article className="gaf-programme gaf-programme-dark">
                        <div className="gaf-programme-top">
                            <img className="gaf-programme-icon" src="/images/programme-info.jpg" alt="" aria-hidden="true" width="56" height="56" />
                            <span className="gaf-programme-symbol">↗</span>
                        </div>
                        <div>
                            <h3>{t.approach.secondTitle}</h3>
                            <p>{t.approach.secondText}</p>
                        </div>
                        <div className="gaf-programme-bottom">
                            <span>{t.ui.infoLabel}</span>
                        </div>
                    </article>
                </div>
                <p className="gaf-section-footnote">{t.approach.footnote}</p>
            </div>
        </section>
    );
}