import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { STORIES, storyUrl } from "@/Data/gafStories";
import PhotoGrid from "@/Components/Gaf/Redesign/PhotoGrid";

// One news story (content in Data/gafStories.js), at /stories/{slug}.
function Content({ story }) {
    const { lang } = useGaf();
    const L = (o) => (o ? o[lang] ?? o.en : "");
    const others = STORIES.filter((s) => s.slug !== story.slug).slice(0, 3);

    return (
        <div className="rd">
            <section className="rd-page-hero">
                <div className="rd-wrap rd-narrow rd-stack">
                    <a className="rd-link" href="/news">← {lang === "rw" ? "Amakuru yose" : "All news"}</a>
                    <p className="rd-eyebrow">{L(story.tag)} · {L(story.label).toUpperCase()}</p>
                    <h1 className="rd-story-title">{L(story.title)}</h1>
                </div>
            </section>

            <section className="rd-section rd-bg-1">
                <div className="rd-wrap rd-narrow rd-stack-lg">
                    <img className="rd-story-cover" src={story.cover} alt="" />
                    <div className="rd-story-body">
                        {story.body[lang === "rw" ? "rw" : "en"].map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    {story.links.length > 0 && (
                        <div className="rd-actions">
                            {story.links.map((l) => (
                                <a key={l.url} className="rd-btn-line" href={l.url} target="_blank" rel="noreferrer">
                                    {lang === "rw" ? "Reba kuri" : "View on"} {l.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div className="rd-wrap rd-stack" id="photos" style={{ marginTop: 56 }}>
                    <h2 className="rd-h2-sm">{lang === "rw" ? "Amafoto" : "Photos"}</h2>
                    <PhotoGrid photos={story.photos} caption={L(story.title)} />
                </div>
            </section>

            {others.length > 0 && (
                <section className="rd-section rd-bg-2">
                    <div className="rd-wrap rd-stack-lg">
                        <h2 className="rd-h2-sm">{lang === "rw" ? "Andi makuru" : "More news"}</h2>
                        <div className="rd-cards">
                            {others.map((s) => (
                                <a key={s.slug} className="rd-card" href={storyUrl(s)}>
                                    <div className="rd-card-media"><img src={s.cover} alt="" loading="lazy" /></div>
                                    <div className="rd-card-body">
                                        <p className="rd-muted">{L(s.label)}</p>
                                        <h3>{L(s.title)}</h3>
                                        <span className="rd-link">{lang === "rw" ? "Soma inkuru →" : "Read the story →"}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default function Story({ slug }) {
    const story = STORIES.find((s) => s.slug === slug) || STORIES[0];
    return (
        <>
            <Head title={`GAF-Rwanda · ${story.title.en}`}>
                <meta name="description" content={story.body.en[0]} />
                <meta property="og:image" content={story.cover} />
            </Head>
            <Content story={story} />
        </>
    );
}

Story.layout = (page) => <GafLayout>{page}</GafLayout>;
