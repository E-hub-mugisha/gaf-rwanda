import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { Breadcrumbs, Cover, EmptyState, Pagination } from "@/Components/Gaf/Page";
import { formatDate, localized, pick, readingMinutes } from "@/lib/gafLocale";

const articleUrl = (article) => route("news.show", { slug: article.slug });

/** Small horizontal post card: thumbnail left, text right. */
function PostCard({ article, lang, t, featured = false }) {
    const title = localized(article, "title", lang);
    const excerpt = localized(article, "excerpt", lang);
    const category = localized(article.category, "name", lang);
    const minutes = readingMinutes(localized(article, "content", lang));

    return (
        <article className={`bl-post${featured ? " is-featured" : ""}`}>
            <Link href={articleUrl(article)} className="bl-post-thumb" aria-label={title}>
                <Cover src={article.featured_image_url} alt={title} icon="bi-newspaper" />
            </Link>

            <div className="bl-post-body">
                <div className="bl-post-meta">
                    {featured && (
                        <span className="bl-badge">
                            <i className="bi bi-star-fill" aria-hidden="true" /> {t.featured}
                        </span>
                    )}
                    {category && <span className="bl-cat">{category}</span>}
                    <time>{formatDate(article.published_at, lang, { month: "short" })}</time>
                </div>

                <h2 className="bl-post-title">
                    <Link href={articleUrl(article)}>{title}</Link>
                </h2>

                {excerpt && <p className="bl-post-excerpt">{excerpt}</p>}

                <div className="bl-post-foot">
                    <span>
                        <i className="bi bi-clock" aria-hidden="true" /> {minutes} {pick(lang, { en: "min read", rw: "iminota yo gusoma" })}
                    </span>
                    <Link href={articleUrl(article)} className="bl-more">
                        {t.readMore} <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
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
    const firstPage = (articles?.current_page || 1) === 1;
    const showFeatured = featuredArticle && !filtering && firstPage;
    const total = (articles?.total || 0) + (featuredArticle && !filtering ? 1 : 0);
    const activeCategory = categories.find((category) => category.slug === filters.category);

    return (
        <>
            <Head title={t.pageTitle}>
                <meta head-key="description" name="description" content={t.title} />
            </Head>

            <main className="bl-page">
                {/* Slim title bar */}
                <div className="bl-titlebar">
                    <div className="gaf-container">
                        <Breadcrumbs
                            items={[
                                { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                                { label: t.title },
                            ]}
                        />
                        <div className="bl-titlebar-row">
                            <h1>{t.title}</h1>
                            <span className="bl-total">
                                {total} {pick(lang, { en: total === 1 ? "article" : "articles", rw: "inkuru" })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="gaf-container bl-layout">
                    {/* Posts */}
                    <section className="bl-main" aria-label={t.allNews}>
                        {filtering && (
                            <div className="bl-filter-note">
                                <span>
                                    {filters.search && (
                                        <>
                                            {t.search}: <strong>“{filters.search}”</strong>
                                        </>
                                    )}
                                    {filters.search && activeCategory && " · "}
                                    {activeCategory && <strong>{localized(activeCategory, "name", lang)}</strong>}
                                </span>
                                <button type="button" onClick={() => router.get(route("news.index"))}>
                                    <i className="bi bi-x-lg" aria-hidden="true" /> {t.clearFilters}
                                </button>
                            </div>
                        )}

                        {showFeatured || items.length ? (
                            <div className="bl-list">
                                {showFeatured && <PostCard article={featuredArticle} lang={lang} t={t} featured />}
                                {items.map((article) => (
                                    <PostCard key={article.id} article={article} lang={lang} t={t} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState icon="bi-newspaper" title={t.noNews} text={t.noNewsIntro} />
                        )}

                        <Pagination links={articles?.links} label={t.allNews} />
                    </section>

                    {/* Sidebar */}
                    <aside className="bl-side">
                        <div className="bl-widget">
                            <h3>{t.search}</h3>
                            <form
                                className="bl-search"
                                role="search"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    visit({ search });
                                }}
                            >
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    aria-label={t.search}
                                />
                                <button type="submit" aria-label={t.search}>
                                    <i className="bi bi-search" aria-hidden="true" />
                                </button>
                            </form>
                        </div>

                        {categories.length > 0 && (
                            <div className="bl-widget">
                                <h3>{pick(lang, { en: "Categories", rw: "Ibyiciro" })}</h3>
                                <ul className="bl-cats">
                                    <li>
                                        <button type="button" className={!filters.category ? "is-active" : ""} onClick={() => visit({ category: "" })}>
                                            <span>{t.allCategories}</span>
                                        </button>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                type="button"
                                                className={filters.category === category.slug ? "is-active" : ""}
                                                onClick={() => visit({ category: category.slug })}
                                            >
                                                <span>{localized(category, "name", lang)}</span>
                                                <em>{category.published_articles_count}</em>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {featuredArticle && !showFeatured && (
                            <div className="bl-widget">
                                <h3>{t.featured}</h3>
                                <Link href={articleUrl(featuredArticle)} className="bl-mini">
                                    <Cover src={featuredArticle.featured_image_url} alt="" icon="bi-newspaper" />
                                    <span>
                                        <strong>{localized(featuredArticle, "title", lang)}</strong>
                                        <small>{formatDate(featuredArticle.published_at, lang, { month: "short" })}</small>
                                    </span>
                                </Link>
                            </div>
                        )}

                        <div className="bl-widget bl-widget-cta">
                            <h3>{pick(lang, { en: "Events & activities", rw: "Ibikorwa" })}</h3>
                            <p>{pick(lang, { en: "See trainings, workshops and meetings of the study.", rw: "Reba amahugurwa n’inama by’ubushakashatsi." })}</p>
                            <Link href={route("events.index")} className="bl-more">
                                {pick(lang, { en: "View activities", rw: "Reba ibikorwa" })} <i className="bi bi-arrow-right" aria-hidden="true" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
