import React from "react";

export default function SectionHeading({ eyebrow, title, intro, light = false }) {
    return (
        <div className={`gaf-section-heading${light ? " is-light" : ""}`}>
            <h2>{title}</h2>
            {intro && <p>{intro}</p>}
        </div>
    );
}