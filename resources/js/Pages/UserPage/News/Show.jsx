import React from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Breadcrumbs, Cover, SectionTitle, ShareLinks } from "@/Components/Gaf/Page";
import { formatDate, localized, pick, readingMinutes } from "@/lib/gafLocale";

export default function Show({ article, relatedArticles = [] }) {
    const { lang, t: content } = useGaf();
    const t = content.newsPage;

    const title = localized(article, "title", lang);
    const excerpt = localized(article, "excerpt", lang);
    const body = localized(article, "content", lang);
    const category = localized(article.category, "name", lang);
    const metaTitle = localized(article, "meta_title", lang) || title;
    const metaDescription = localized(article, "meta_description", lang) || excerpt || title;
    const minutes = readingMinutes(body);
    const minRead = pick(lang, { en: "min read", rw: "iminota yo gusoma" });

    return (
        <>
            <Head title={`${metaTitle} | GAF Rwanda`}>
                <meta head-key="description" name="description" content={metaDescription} />
                <meta head-key="og:title" property="og:title" content={metaTitle} />
                <meta head-key="og:description" property="og:description" content={metaDescription} />
                {article.featured_image_url && <meta head-key="og:image" property="og:image" content={article.featured_image_url} />}
            </Head>

            <main className="gp-page">
                {/* Article header */}
                <header className="gp-article-head">
                    <div className="gaf-container gp-article-head-inner">
                        <Breadcrumbs
                            items={[
                                { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                                { label: t.title, href: route("news.index") },
                                { label: title },
                            ]}
                        />

                        {category && (
                            <Link href={route("news.index", { category: article.category.slug })} className="gp-tag">
                                {category}
                            </Link>
                        )}

                        <h1>{title}</h1>
                        {excerpt && <p className="gp-detail-lead is-dark">{excerpt}</p>}

                        <div className="gp-byline">
                            {article.author?.name && (
                                <span className="gp-avatar" aria-hidden="true">
                                    {article.author.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                            <ul className="gp-meta is-large">
                                {article.author?.name && (
                                    <li>
                                        <strong>{article.author.name}</strong>
                                    </li>
                                )}
                                <li>
                                    <i className="bi bi-calendar3" aria-hidden="true" />
                                    {formatDate(article.published_at, lang)}
                                </li>
                                <li>
                                    <i className="bi bi-clock" aria-hidden="true" />
                                    {minutes} {minRead}
                                </li>
                                <li>
                                    <i className="bi bi-eye" aria-hidden="true" />
                                    {article.views_count || 0} {t.views}
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                {article.featured_image_url && (
                    <div className="gaf-container">
                        <figure className="gp-article-figure">
                            <Cover src={article.featured_image_url} alt={title} icon="bi-newspaper" eager />
                        </figure>
                    </div>
                )}

                <div className="gaf-container gp-article-layout">
                    {/* Share rail (beside the text on large screens) */}
                    <aside className="gp-article-rail" aria-label={pick(lang, { en: "Share", rw: "Sangiza" })}>
                        <div className="gp-sticky">
                            <small>{pick(lang, { en: "Share", rw: "Sangiza" })}</small>
                            <ShareLinks title={title} lang={lang} />
                        </div>
                    </aside>

                    <article className="gp-article">
                        <div className="gp-prose is-article" dangerouslySetInnerHTML={{ __html: body || "" }} />

                        <footer className="gp-article-foot">
                            <Link href={route("news.index")} className="gp-back">
                                <i className="bi bi-arrow-left" aria-hidden="true" />
                                {t.backToNews}
                            </Link>
                            {category && (
                                <span className="gp-article-foot-tag">
                                    <i className="bi bi-tag" aria-hidden="true" /> {category}
                                </span>
                            )}
                        </footer>
                    </article>
                </div>

                {relatedArticles.length > 0 && (
                    <section className="gp-related">
                        <div className="gaf-container">
                            <SectionTitle
                                eyebrow={t.keepReading}
                                title={t.related}
                                aside={
                                    <Link href={route("news.index")} className="gp-card-link">
                                        {t.viewAll}
                                        <i className="bi bi-arrow-right" aria-hidden="true" />
                                    </Link>
                                }
                            />

                            <div className="gp-grid">
                                {relatedArticles.map((item) => {
                                    const itemTitle = localized(item, "title", lang);
                                    const itemCategory = localized(item.category, "name", lang);
                                    const url = route("news.show", { slug: item.slug });

                                    return (
                                        <article key={item.id} className="gp-card">
                                            <Link href={url} className="gp-card-media" aria-label={itemTitle}>
                                                <Cover src={item.featured_image_url} alt={itemTitle} icon="bi-newspaper" />
                                                {itemCategory && <span className="gp-tag is-floating">{itemCategory}</span>}
                                            </Link>
                                            <div className="gp-card-body">
                                                <ul className="gp-meta">
                                                    <li>
                                                        <i className="bi bi-calendar3" aria-hidden="true" />
                                                        {formatDate(item.published_at, lang)}
                                                    </li>
                                                </ul>
                                                <h3>
                                                    <Link href={url}>{itemTitle}</Link>
                                                </h3>
                                                <p className="gp-card-text">{localized(item, "excerpt", lang)}</p>
                                                <Link href={url} className="gp-card-link">
                                                    {t.readMore}
                                                    <i className="bi bi-arrow-right" aria-hidden="true" />
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}

Show.layout = (page) => <GafLayout>{page}</GafLayout>;
