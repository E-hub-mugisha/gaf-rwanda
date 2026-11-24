import React from "react";
import { useGaf } from "@/Context/GafContext";
import { RD, RD_STORIES } from "@/Data/gafRedesign";
import { formatDate } from "@/lib/gafLocale";

// Inline rich text: [["t"|"em"|"b"|"g", text], ...]
function Rich({ parts }) {
    return parts.map(([kind, text], i) => {
        if (kind === "em") return <em key={i}>{text}</em>;
        if (kind === "b") return <span key={i} className="rd-hl-blue">{text}</span>;
        if (kind === "g") return <span key={i} className="rd-hl-green">{text}</span>;
        return <React.Fragment key={i}>{text}</React.Fragment>;
    });
}

export function Bar({ wide = false }) {
    return (
        <div className={`rd-bar${wide ? " is-wide" : ""}`} aria-hidden="true">
            <span /><span /><span /><span />
        </div>
    );
}

const Icon = ({ name }) => {
    const p = { width: 54, height: 54, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
    if (name === "heart") return <svg {...p}><path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.3 12c-2.3 4.6-9.3 9-9.3 9z" /></svg>;
    if (name === "wifi") return <svg {...p}><path d="M5 12.5a10 10 0 0 1 14 0" /><path d="M8.5 16a5 5 0 0 1 7 0" /><path d="M2 9a15 15 0 0 1 20 0" /><circle cx="12" cy="19.5" r="1" /></svg>;
    if (name === "talk") return <svg {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>;
    return <span>{name}</span>;
};

export function HelpBox() {
    const { lang } = useGaf();
    return (
        <div className="rd-help">
            <div className="rd-help-text">
                <p><strong>{RD.help.title[lang]}</strong> {RD.help.line1[lang]}</p>
                <p>{RD.help.line2[lang]}</p>
            </div>
            <div className="rd-help-actions">
                <a className="rd-btn" href="tel:912">SAMU 912</a>
                <a className="rd-btn-line" href="tel:114">RBC 114</a>
                <a className="rd-btn-line" href={`tel:${RD.phone}`}>{RD.phone}</a>
            </div>
        </div>
    );
}

export function Partners() {
    const { lang } = useGaf();
    return (
        <section className="rd-section rd-bg-1" id="contact">
            <div className="rd-wrap rd-stack">
                <p className="rd-kicker rd-center">{RD.partnersTitle[lang]}</p>
                <div className="rd-logos">
                    {RD.partners.map((p) => (
                        <div key={p.name} className={`rd-logo${p.dark ? " is-eu" : ""}`}>
                            <img src={p.img} alt={p.name} loading="lazy" />
                        </div>
                    ))}
                </div>
                <HelpBox />
            </div>
        </section>
    );
}

export default function RedesignHome({ news = [], heroVideo }) {
    const { lang, tr } = useGaf();
    const L = (o) => (o ? o[lang] ?? o.en : "");
    const video = heroVideo || RD.vimeoUrl;

    const stories = news.length
        ? news.slice(0, 3).map((n) => ({ url: n.url, image: n.image, date: formatDate(n.date, lang), title: tr(n.title) }))
        : RD_STORIES.map((s) => ({ url: s.url, image: s.image, date: L(s.date), title: L(s.title) }));

    const marquee = (row, cls) => {
        const imgs = row.map((name, i) => <img key={i} src={`${RD.img}/gallery/${name}.jpg`} alt="" loading="lazy" />);
        return <div className={`gaf-track ${cls}`}>{imgs}{imgs}</div>;
    };

    return (
        <div className="rd">
            {/* HERO */}
            <section className="rd-hero">
                {RD.hero.slides.map((src, i) => (
                    <img key={src} className={`rd-hero-slide d${i + 1}`} src={src} alt={i === 0 ? L(RD.hero.alt) : ""} style={{ objectPosition: RD.hero.slidePos[i] }} />
                ))}
                <div className="rd-hero-shade" aria-hidden="true" />
                <div className="rd-wrap rd-hero-content">
                    <h1><Rich parts={RD.hero.title[lang]} /></h1>
                    <Bar wide />
                    <div className="rd-actions">
                        <a className="rd-btn rd-btn-lg" href={RD.surveyUrl} target="_blank" rel="noreferrer">{L(RD.hero.primary)}</a>
                        <a className="rd-btn-line rd-btn-lg" href="#ubushakashatsi">{L(RD.hero.secondary)}</a>
                    </div>
                </div>
            </section>

            {/* STUDY + VIDEO */}
            <section className="rd-section rd-bg-2" id="ubushakashatsi">
                <div className="rd-wrap rd-stack-lg">
                    <div className="rd-statement">
                        <p className="rd-statement-text" id="research"><Rich parts={RD.study.statement[lang]} /></p>
                        <Bar />
                        <p className="rd-lead">{L(RD.study.partners)}</p>
                    </div>
                    <div className="rd-video">
                        <a className="rd-video-frame" href={video} target="_blank" rel="noreferrer" aria-label={L(RD.study.videoTitle)}>
                            <img src={`${RD.img}/video-poster.jpg`} alt="" />
                            <span className="rd-play" aria-hidden="true"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                        </a>
                        <div className="rd-video-text">
                            <p className="rd-eyebrow">VIDEO</p>
                            <h2>{L(RD.study.videoTitle)}</h2>
                            <p>{L(RD.study.videoText)}</p>
                            <a className="rd-link" href={video} target="_blank" rel="noreferrer">{L(RD.study.videoLink)}</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRIAL LEAD */}
            <section className="rd-section rd-bg-green">
                <div className="rd-wrap rd-lead-row">
                    <div className="rd-lead-photo"><img src={`${RD.img}/team-theogene.jpg`} alt={RD.lead.name} /></div>
                    <div className="rd-stack">
                        <p className="rd-eyebrow">{L(RD.lead.eyebrow)}</p>
                        <h2 className="rd-h2-xl">{RD.lead.name}</h2>
                        <p className="rd-soft">{RD.lead.role}</p>
                        <p className="rd-on-green">{L(RD.lead.bio)}</p>
                        <p className="rd-strong">{L(RD.lead.phd)}</p>
                        <p className="rd-soft rd-small">{L(RD.lead.supervisedBy)}</p>
                        <div className="rd-chips">
                            {RD.lead.supervisors.map((s) => (
                                <span key={s.name} className="rd-chip"><img src={s.img} alt="" />{s.name}<em> · {s.org}</em></span>
                            ))}
                        </div>
                        <a className="rd-link" href="/team">{L(RD.lead.teamLink)}</a>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="rd-section rd-bg-0" id="porogaramu">
                <div className="rd-wrap rd-stack-lg">
                    <div className="rd-heading">
                        <h2>{L(RD.how.title)}</h2>
                        <Bar />
                        <p>{L(RD.how.intro)}</p>
                    </div>
                    <article className="rd-programme is-teal">
                        <div className="rd-programme-text">
                            <span className="rd-tag">{L(RD.how.group1.tag)}</span>
                            <h3>{L(RD.how.group1.title)}</h3>
                            <p>{L(RD.how.group1.text)}</p>
                        </div>
                        <div className="rd-programme-media"><img src={RD.how.group1.img} alt="" /></div>
                    </article>
                    <article className="rd-programme is-green is-reverse">
                        <div className="rd-programme-media is-white"><img src={RD.how.group2.img} alt="" /></div>
                        <div className="rd-programme-text">
                            <span className="rd-tag">{L(RD.how.group2.tag)}</span>
                            <h3>{L(RD.how.group2.title)}</h3>
                            <p>{L(RD.how.group2.text)}</p>
                        </div>
                    </article>
                </div>
            </section>

            {/* ELIGIBILITY */}
            <section className="rd-section rd-bg-1" id="kwitabira">
                <div className="rd-wrap rd-stack-lg" id="participation">
                    <div className="rd-heading">
                        <h2>{L(RD.eligibility.title)}</h2>
                        <Bar />
                    </div>
                    <div className="rd-rings">
                        {RD.eligibility.items.map((it, i) => (
                            <div className="rd-ring-item" key={i}>
                                <div className="rd-ring">
                                    <div className={`rd-ring-arc gaf-spin${i % 2 ? " r" : ""}`} style={{ borderTopColor: it.a, borderRightColor: it.b, animationDelay: `-${i * 1.4}s` }} aria-hidden="true" />
                                    <div className="rd-ring-icon gaf-pulse" style={{ animationDelay: `-${i * 1.4}s` }}><Icon name={it.icon} /></div>
                                </div>
                                <p>{L(it.text)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rd-steps">
                        <div className="rd-stack">
                            <h3>{L(RD.eligibility.stepsTitle)}</h3>
                            <p>{L(RD.eligibility.stepsText)}</p>
                            <div><a className="rd-btn rd-btn-lg" href={RD.surveyUrl} target="_blank" rel="noreferrer">{L(RD.hero.primary)}</a></div>
                        </div>
                        <div className="rd-steps-visual">
                            {lang === "rw" ? (
                                <img src={RD.eligibility.stepsGif} alt="Intambwe 5 zo kwinjira mu bushakashatsi bwa GAF-Rwanda" />
                            ) : (
                                <ol className="rd-step-list">
                                    {RD.eligibility.stepsEn.map(([t, d], i) => (
                                        <li key={t}><span className={`rd-step-n n${i + 1}`}>{i + 1}</span><span><strong>{t}</strong><br />{d}</span></li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* PHOTOS (moving background) */}
            <section className="rd-photos" aria-label={L(RD.photos.eyebrow)}>
                <div className="rd-photos-tracks" aria-hidden="true">
                    {marquee(RD.photos.rows[0], "")}
                    {marquee(RD.photos.rows[1], "rev")}
                    {marquee(RD.photos.rows[2], "slow")}
                </div>
                <div className="rd-photos-shade" aria-hidden="true" />
                <div className="rd-photos-content">
                    <p className="rd-eyebrow">{L(RD.photos.eyebrow)}</p>
                    <h2>{RD.photos.title[lang][0]}<em>{RD.photos.title[lang][1]}</em></h2>
                    <p>{L(RD.photos.text)}</p>
                    <a className="rd-btn rd-btn-lg" href="/gallery">{L(RD.photos.button)}</a>
                </div>
            </section>

            {/* NEWS */}
            <section className="rd-section rd-bg-2">
                <div className="rd-wrap rd-stack-lg">
                    <div className="rd-heading"><h2>{L(RD.news.title)}</h2><Bar /></div>
                    <div className="rd-cards">
                        {stories.map((s, i) => (
                            <a key={i} className="rd-card" href={s.url}>
                                <div className="rd-card-media">{s.image && <img src={s.image} alt="" loading="lazy" />}</div>
                                <div className="rd-card-body">
                                    <p className="rd-muted">{s.date}</p>
                                    <h3>{s.title}</h3>
                                    <span className="rd-link">{L(RD.news.readMore)}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                    <p className="rd-center"><a className="rd-link" href="/news">{L(RD.news.all)}</a></p>
                </div>
            </section>

            {/* SOCIAL */}
            <section className="rd-section rd-bg-1">
                <div className="rd-wrap rd-stack-lg">
                    <div className="rd-social-head">
                        <div className="rd-stack">
                            <h2>{L(RD.social.title)}</h2>
                            <Bar />
                            <p><strong className="rd-yellow">@gafrwanda</strong></p>
                        </div>
                        <div className="rd-actions">
                            <a className="rd-btn" href="https://www.instagram.com/gafrwanda" target="_blank" rel="noreferrer">Instagram</a>
                            <a className="rd-btn-line" href="https://www.linkedin.com/company/guided-act-feel-rwanda/" target="_blank" rel="noreferrer">LinkedIn</a>
                            <a className="rd-btn-line" href="https://vm.tiktok.com/ZS9fRjheTpVGf-rmBbH/" target="_blank" rel="noreferrer">TikTok</a>
                        </div>
                    </div>
                    <div className="rd-social">
                        {RD.social.posts.map((p) => (
                            <a key={p.url} className="rd-card" href={p.url} target="_blank" rel="noreferrer">
                                <div className="rd-card-media is-tall"><img src={p.img} alt="" loading="lazy" /></div>
                                <div className="rd-card-body"><h3 className="rd-h3-sm">{L(p.title)}</h3><p className="rd-muted rd-push">{L(p.date)}</p></div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="rd-section rd-bg-green rd-cta">
                <div className="rd-wrap rd-cta-row">
                    <div>
                        <h2 className="rd-yellow">{L(RD.cta.title)}</h2>
                        <p className="rd-on-green">{L(RD.cta.text)}</p>
                    </div>
                    <a className="rd-btn rd-btn-lg" href={RD.surveyUrl} target="_blank" rel="noreferrer">{L(RD.hero.primary)}</a>
                </div>
            </section>
        </div>
    );
}
