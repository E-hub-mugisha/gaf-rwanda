import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { TEAM } from "@/Data/gafStories";
import { Partners } from "@/Components/Gaf/Redesign/Home";

// Team page with fixed content (Data/gafStories.js). Roles stay in English.
const IMG = "/images/redesign";

function Person({ p, big = false }) {
    return (
        <article className={`rd-person${big ? " is-big" : ""}`}>
            <img src={`${IMG}/team-${p.img}.jpg`} alt={p.name} loading="lazy" />
            <div>
                <h3>{p.name}</h3>
                <p className="rd-person-role">{p.role}</p>
                <p className="rd-muted">{p.org}</p>
            </div>
        </article>
    );
}

function Content() {
    const { lang } = useGaf();
    const rw = lang === "rw";

    return (
        <div className="rd">
            <section className="rd-page-hero">
                <div className="rd-wrap rd-stack">
                    <p className="rd-eyebrow">{rw ? "ITSINDA" : "TEAM"}</p>
                    <h1>{rw ? "Itsinda ry'abashakashatsi" : "Research team"}</h1>
                    <p className="rd-lead">
                        {rw
                            ? "Ubushakashatsi bwa GAF-Rwanda bukorwa ku bufatanye bw'Ikigo cy'Igihugu cy'Ubuzima (RBC) na Amsterdam University Medical Centre (UMC)."
                            : "GAF-Rwanda is conducted by Amsterdam University Medical Centre (UMC) and the Mental Health Division of Rwanda Biomedical Centre (RBC)."}
                    </p>
                </div>
            </section>

            <section className="rd-section rd-bg-1">
                <div className="rd-wrap rd-stack-lg">
                    <h2 className="rd-h2-sm">{rw ? "Abayobozi b'ubushakashatsi" : "Study team"}</h2>
                    <div className="rd-team-grid is-big">
                        {TEAM.study.map((p) => <Person key={p.name} p={p} big />)}
                    </div>

                    <h2 className="rd-h2-sm">{rw ? "Itsinda rikorera mu Rwanda" : "Rwanda team"}</h2>
                    <div className="rd-team-grid">
                        {TEAM.rwanda.map((p) => <Person key={p.name} p={p} />)}
                    </div>

                    <div className="rd-team-count">
                        <div><strong>30</strong><span>{rw ? "Abajyanama b'ubuzima" : "Community health workers"}</span></div>
                        <div><strong>15</strong><span>{rw ? "Inzobere mu by'imitekerereze zikurikirana abajyanama b'ubuzima" : "Clinical psychologists supervising the CHWs"}</span></div>
                        <div><strong>18</strong><span>{rw ? "Inzobere zikora ikiganiro cy'ibanze (SCID-5)" : "SCID-5 interviewers"}</span></div>
                    </div>
                </div>
            </section>

            <Partners />
        </div>
    );
}

export default function TeamStatic() {
    return (
        <>
            <Head title="GAF-Rwanda · Itsinda / Team" />
            <Content />
        </>
    );
}

TeamStatic.layout = (page) => <GafLayout>{page}</GafLayout>;
