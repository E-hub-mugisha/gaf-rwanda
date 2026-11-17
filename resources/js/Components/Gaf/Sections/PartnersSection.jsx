import React from "react";
import { useGaf, imageFallback } from "@/Context/GafContext";
import { assetPath } from "@/lib/gafFormat";

export default function PartnersSection() {
    const { t, site } = useGaf();

    return (
        <section className="gaf-partners">
            <div className="gaf-container">
                <p>{t.partners}</p>
                <div className="gaf-partner-logos">
                    {(site.partners || []).map((partner, index) => (
                        <img
                            key={`${partner}-${index}`}
                            src={assetPath(partner)}
                            alt={`Research partner ${index + 1}`}
                            onError={imageFallback}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}