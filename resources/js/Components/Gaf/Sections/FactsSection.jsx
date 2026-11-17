import React from "react";
import { useGaf } from "@/Context/GafContext";

export default function FactsSection() {
    const { t } = useGaf();

    return (
        <section className="gaf-facts" aria-label="Study at a glance">
            <div className="gaf-container gaf-facts-grid">
                {t.facts.map(([value, label]) => (
                    <div className="gaf-fact" key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}