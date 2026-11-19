import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Cover, EmptyState, PageHero, Pagination, SectionTitle } from "@/Components/Gaf/Page";
import { formatDate, localized, pick, readingMinutes } from "@/lib/gafLocale";

const articleUrl = (article) => route("news.show", { slug: article.slug });

function ArticleCard({ article, lang, t }) {
    const title = localized(article, "title", lang);
    const excerpt = localized(article, "excerpt", lang);
    const category = localized(article.category, "name", lang);
    const minutes = readingMinutes(localized(article, "content", lang));

    return (
        <article className="gp-card">
            <Link href={articleUrl(article)} className="gp-card-media" aria-label={title}>
                <Cover src={article.featured_image_url} alt={title} icon="bi-newspaper" />
                {category && <span className="gp-tag is-floating">{category}</span>}
            </Link>

            <div className="gp-card-body">
                <ul className="gp-meta">
                    <li>
                        <i className="bi bi-calendar3" aria-hidden="true" />
                        {formatDate(article.published_at, lang)}
                    </li>
                    <li>
                        <i className="bi bi-clock" aria-hidden="true" />
                        {minutes} {pick(lang, { en: "min read", rw: "iminota yo gusoma" })}
                    </li>
                </ul>

                <h3>
                    <Link href={articleUrl(article)}>{title}</Link>
                </h3>

                {excerpt && <p className="gp-card-text">{excerpt}</p>}

                <Link href={articleUrl(article)} className="gp-card-link">
                    {t.readMore}
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}

export default function Index({ featuredArticle, articles, categories = [], filters = {} }) {
    const { lang, t: content } = useGaf();
    const t = content.newsPage;
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => setSearch(filters.search || ""), [filters.search]);

    const visit = (params) =>
        router.get(
            route("news.index"),
            {
                search: (params.search ?? filters.search) || undefined,
                category: (params.category ?? filters.category) || undefined,
            },
            { preserveState: true, preserveScroll: true, replace: true }
        );

    const items = articles?.data || [];
    const filtering = Boolean(filters.search || filters.category);
    const showFeatured = featuredArticle && !filtering;

    const featuredTitle = showFeatured ? localized(featuredArticle, "title", lang) : "";
    const featuredCategory = showFeatured ? localized(featuredArticle.category, "name", lang) : "";

    return (
        <>
            <Head title={t.pageTitle}>
                <meta head-key="description" name="description" content={t.title} />
            </Head>

            <main className="gp-page">
                <PageHero
                    icon="bi-newspaper"
                    crumbs={[
                        { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                        { label: t.title },
                    ]}
                    eyebrow={t.eyebrow}
                    title={t.title}
                    intro={t.intro}
                    topics={t.topics || []}
                    stats={[
                        { label: pick(lang, { en: "Articles", rw: "Inkuru" }), value: (articles?.total || 0) + (featuredArticle ? 1 : 0) },
                        { label: pick(lang, { en: "Topics", rw: "Ingingo" }), value: categories.length },
                    ]}
                />

                <div className="gaf-container gp-content">
                    {showFeatured && (
                        <article className="gp-feature">
                            <Link href={articleUrl(featuredArticle)} className="gp-feature-media" aria-label={featuredTitle}>
                                <Cover src={featuredArticle.featured_image_url} alt={featuredTitle} icon="bi-newspaper" eager />
                            </Link>

                            <div className="gp-feature-body">
                                <div className="gp-feature-tags">
                                    <span className="gp-eyebrow">
                                        <i className="bi bi-star-fill" aria-hidden="true" />
                                        {t.featured}
                                    </span>
                                    {featuredCategory && <span className="gp-tag">{featuredCategory}</span>}
                                </div>

                                <h2>
                                    <Link href={articleUrl(featuredArticle)}>{featuredTitle}</Link>
                                </h2>

                                <p>{localized(featuredArticle, "excerpt", lang)}</p>

                                <ul className="gp-meta is-large">
                                    <li>
                                        <i className="bi bi-calendar3" aria-hidden="true" />
                                        {formatDate(featuredArticle.published_at, lang)}
                                    </li>
                                    {featuredArticle.author?.name && (
                                        <li>
                                            <i className="bi bi-person" aria-hidden="true" />
                                            {featuredArticle.author.name}
                                        </li>
                                    )}
                                </ul>

                                <Link href={articleUrl(featuredArticle)} className="gp-button">
                                    {t.readStory}
                                    <i className="bi bi-arrow-right" aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    )}

                    {/* Search and topics */}
                    <div className="gp-toolbar">
                        <form
                            className="gp-search"
                            role="search"
                            onSubmit={(event) => {
                                event.preventDefault();
                                visit({ search });
                            }}
                        >
                            <i className="bi bi-search" aria-hidden="true" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder={t.searchPlaceholder}
                                aria-label={t.search}
                            />
                            <button type="submit">{t.search}</button>
                        </form>

                        {categories.length > 0 && (
                            <div className="gp-tabs is-scroll">
                                <button type="button" className={!filters.category ? "is-active" : ""} onClick={() => visit({ category: "" })}>
                                    {t.allCategories}
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className={filters.category === category.slug ? "is-active" : ""}
                                        onClick={() => visit({ category: category.slug })}
                                    >
                                        {localized(category, "name", lang)}
                                        <span>{category.published_articles_count}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <section className="gp-section">
                        <SectionTitle
                            eyebrow={t.latest}
                            title={t.allNews}
                            aside={
                                filtering && (
                                    <button type="button" className="gp-clear" onClick={() => router.get(route("news.index"))}>
                                        <i className="bi bi-x-lg" aria-hidden="true" />
                                        {t.clearFilters}
                                    </button>
                                )
                            }
                        />

                        {items.length ? (
                            <>
                                <div className="gp-grid">
                                    {items.map((article) => (
                                        <ArticleCard key={article.id} article={article} lang={lang} t={t} />
                                    ))}
                                </div>
                                <Pagination links={articles.links} label={t.allNews} />
                            </>
                        ) : (
                            <EmptyState
                                icon="bi-newspaper"
                                title={t.noNews}
                                text={t.noNewsIntro}
                                action={
                                    filtering && (
                                        <button type="button" className="gp-button is-outline" onClick={() => router.get(route("news.index"))}>
                                            {t.clearFilters}
                                        </button>
                                    )
                                }
                            />
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
