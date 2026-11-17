import React from "react";
import { useGaf } from "@/Context/GafContext";

export default function PrivacySection() {
    const { t } = useGaf();

    return (
        <section className="gaf-privacy" id="privacy">
            <div className="gaf-container gaf-privacy-inner">
                <div className="gaf-privacy-symbol" aria-hidden="true">§</div>
                <div>
                    <span className="gaf-eyebrow gaf-eyebrow-light">{t.privacy.eyebrow}</span>
                    <h2>{t.privacy.title}</h2>
                    <p>{t.privacy.text}</p>
                    <small>{t.privacy.note}</small>
                </div>
            </div>
        </section>
    );
}