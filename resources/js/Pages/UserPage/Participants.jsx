import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { RD } from "@/Data/gafRedesign";
import { HelpBox } from "@/Components/Gaf/Redesign/Home";

// Participant login page. Not in the main menu; linked discreetly from the footer ("Abitabiriye").
function Content() {
    const { lang } = useGaf();
    const L = (o) => o[lang] ?? o.en;
    const P = RD.participants;

    return (
        <div className="rd">
            <section className="rd-page-hero">
                <div className="rd-wrap rd-stack">
                    <p className="rd-eyebrow">{L(P.eyebrow)}</p>
                    <h1>{L(P.title)}</h1>
                    <p className="rd-lead">{L(P.intro)}</p>
                </div>
            </section>
            <section className="rd-section rd-bg-1">
                <div className="rd-wrap rd-stack-lg">
                    <div className="rd-login-grid">
                        <article className="rd-login-card is-teal">
                            <span className="rd-tag">{L(RD.how.group1.tag)}</span>
                            <h2>Guided Act &amp; Feel Rwanda</h2>
                            <p>{L(P.g1)}</p>
                            <div className="rd-actions">
                                <a className="rd-store" href={RD.playStore} target="_blank" rel="noreferrer"><small>{L(P.getIt)}</small>Google Play</a>
                                <a className="rd-store" href={RD.appStore} target="_blank" rel="noreferrer"><small>{L(P.getIt)}</small>App Store</a>
                            </div>
                        </article>
                        <article className="rd-login-card is-green">
                            <span className="rd-tag">{L(RD.how.group2.tag)}</span>
                            <h2>{L(RD.how.group2.title)}</h2>
                            <p>{L(P.g2)}</p>
                            <div><a className="rd-btn rd-btn-lg" href="/login">{L(P.login)}</a></div>
                        </article>
                    </div>
                    <p>{L(P.trouble)}</p>
                    <HelpBox />
                </div>
            </section>
        </div>
    );
}

export default function Participants() {
    return (
        <>
            <Head title="Abitabiriye · Participants">
                <meta name="robots" content="noindex" />
            </Head>
            <Content />
        </>
    );
}

Participants.layout = (page) => <GafLayout>{page}</GafLayout>;
