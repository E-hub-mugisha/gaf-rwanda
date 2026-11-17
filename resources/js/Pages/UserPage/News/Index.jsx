
import React, { useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";

const formatDate = (value, lang) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(
        lang === "rw" ? "rw-RW" : "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date);
};

const localized = (item, field, lang) => {
    if (!item) return "";

    return lang === "rw"
        ? item[`${field}_rw`] || item[field] || ""
        : item[field] || "";
};

const ArticleImage = ({ article, className = "" }) => {
    const image = article?.featured_image_url;

    if (!image) {
        return (
            <div className={`gaf-news-image-placeholder ${className}`}>
                <i className="bi bi-newspaper"></i>
            </div>
        );
    }

    return (
        <div className={`gaf-news-image ${className}`}>
            <img
                src={image}
                alt={article.title || "GAF-RW news"}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
        </div>
    );
};

const ArticleCard = ({ article, lang, t }) => {
    const title = localized(article, "title", lang);
    const excerpt = localized(article, "excerpt", lang);
    const category = localized(article.category, "name", lang);

    return (
        <article className="gaf-news-card">
            <Link
                href={route("news.show", { slug: article.slug })}
                className="gaf-news-card-image-link"
            >
                <ArticleImage article={article} />
            </Link>

            <div className="gaf-news-card-body">
                <div className="gaf-news-card-meta">
                    {category && (
                        <span className="gaf-news-category">
                            {category}
                        </span>
                    )}

                    <span>
                        {formatDate(article.published_at, lang)}
                    </span>
                </div>

                <h3>
                    <Link href={route("news.show", { slug: article.slug })}>
                        {title}
                    </Link>
                </h3>

                {excerpt && <p>{excerpt}</p>}

                <Link
                    href={route("news.show", { slug: article.slug })}
                    className="gaf-news-read-more"
                >
                    {t.readMore || "Read more"}
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </article>
    );
};

const Index = ({
    featuredArticle,
    articles,
    categories = [],
    filters = {},
}) => {
    const { lang, t: content } = useGaf();
    const t = content?.newsPage || {};

    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        setSearch(filters.search || "");
    }, [filters.search]);

    const submitSearch = (e) => {
        e.preventDefault();

        router.get(
            route("news.index"),
            {
                search: search || undefined,
                category: filters.category || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const filterCategory = (slug) => {
        router.get(
            route("news.index"),
            {
                search: filters.search || undefined,
                category: slug || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const articleItems = articles?.data || [];

    return (
        <>
            <Head title={t.pageTitle || "News & Updates | GAF Rwanda"}>
                <meta
                    head-key="description"
                    name="description"
                    content={
                        t.intro ||
                        "Discover the latest news, activities and updates from GAF-RW."
                    }
                />
            </Head>

            <main className="gaf-news-page">
                {/* Header */}
                <section className="gaf-news-header">
                    <div className="container">
                        <div className="gaf-news-header-content">
                            <span className="gaf-news-eyebrow">
                                {t.eyebrow || "NEWS & UPDATES"}
                            </span>

                            <h1>
                                {t.title || "News & Updates"}
                            </h1>

                            <p>
                                {t.intro ||
                                    "Explore the latest news, research activities and updates from GAF-RW."}
                            </p>
                            {Array.isArray(t.topics) && t.topics.length > 0 && (
                                <ul className="gaf-page-topics">
                                    {t.topics.map((topic) => (
                                        <li key={topic}>{topic}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>

                <section className="gaf-news-content">
                    <div className="container">
                        {/* Featured article */}
                        {featuredArticle && !filters.search && !filters.category && (
                            <section className="gaf-news-featured-section">
                                <div className="gaf-news-section-heading">
                                    <div>
                                        <span className="gaf-news-eyebrow">
                                            {t.featured || "FEATURED STORY"}
                                        </span>

                                        <h2>
                                            {t.featuredTitle ||
                                                "Featured update"}
                                        </h2>
                                    </div>
                                </div>

                                <article className="gaf-news-featured">
                                    <div className="gaf-news-featured-image">
                                        <ArticleImage article={featuredArticle} />
                                    </div>

                                    <div className="gaf-news-featured-body">
                                        <div className="gaf-news-card-meta">
                                            {localized(
                                                featuredArticle.category,
                                                "name",
                                                lang
                                            ) && (
                                                <span className="gaf-news-category">
                                                    {localized(
                                                        featuredArticle.category,
                                                        "name",
                                                        lang
                                                    )}
                                                </span>
                                            )}

                                            <span>
                                                {formatDate(
                                                    featuredArticle.published_at,
                                                    lang
                                                )}
                                            </span>
                                        </div>

                                        <h2>
                                            {localized(
                                                featuredArticle,
                                                "title",
                                                lang
                                            )}
                                        </h2>

                                        <p>
                                            {localized(
                                                featuredArticle,
                                                "excerpt",
                                                lang
                                            )}
                                        </p>

                                        <Link
                                            href={route("news.show", {
                                                slug: featuredArticle.slug,
                                            })}
                                            className="gaf-news-featured-link"
                                        >
                                            {t.readStory || "Read full story"}
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </Link>
                                    </div>
                                </article>
                            </section>
                        )}

                        {/* Filters */}
                        <section className="gaf-news-filter-section">
                            <div className="gaf-news-filter-heading">
                                <div>
                                    <span className="gaf-news-eyebrow">
                                        {t.latest || "LATEST STORIES"}
                                    </span>

                                    <h2>
                                        {t.allNews || "All news and updates"}
                                    </h2>
                                </div>

                                <form
                                    onSubmit={submitSearch}
                                    className="gaf-news-search"
                                >
                                    <i className="bi bi-search"></i>

                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder={
                                            t.searchPlaceholder ||
                                            "Search news..."
                                        }
                                    />

                                    <button type="submit">
                                        {t.search || "Search"}
                                    </button>
                                </form>
                            </div>

                            <div className="gaf-news-categories">
                                <button
                                    type="button"
                                    onClick={() => filterCategory("")}
                                    className={
                                        !filters.category ? "active" : ""
                                    }
                                >
                                    {t.allCategories || "All"}
                                </button>

                                {categories.map((category) => (
                                    <button
                                        type="button"
                                        key={category.id}
                                        onClick={() =>
                                            filterCategory(category.slug)
                                        }
                                        className={
                                            filters.category === category.slug
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {localized(category, "name", lang)}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Articles */}
                        {articleItems.length > 0 ? (
                            <>
                                <div className="row g-4">
                                    {articleItems.map((article) => (
                                        <div
                                            className="col-md-6 col-lg-4"
                                            key={article.id}
                                        >
                                            <ArticleCard
                                                article={article}
                                                lang={lang}
                                                t={t}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {articles.links?.length > 3 && (
                                    <nav
                                        className="gaf-news-pagination"
                                        aria-label="News pagination"
                                    >
                                        {articles.links.map((link, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                disabled={!link.url}
                                                className={[
                                                    link.active ? "active" : "",
                                                    !link.url ? "disabled" : "",
                                                ].join(" ")}
                                                onClick={() =>
                                                    link.url &&
                                                    router.visit(link.url, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    })
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </nav>
                                )}
                            </>
                        ) : (
                            <div className="gaf-news-empty">
                                <i className="bi bi-newspaper"></i>

                                <h3>
                                    {t.noNews || "No news articles found"}
                                </h3>

                                <p>
                                    {t.noNewsIntro ||
                                        "There are currently no news articles matching your search."}
                                </p>

                                {(filters.search || filters.category) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.get(route("news.index"))
                                        }
                                        className="gaf-news-clear-button"
                                    >
                                        {t.clearFilters || "Clear filters"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

Index.layout = (page) => <GafLayout>{page}</GafLayout>;

export default Index;
