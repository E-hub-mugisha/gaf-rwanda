
import React from "react";
import { Head, Link } from "@inertiajs/react";
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

const ArticleImage = ({ article }) => {
    if (!article?.featured_image_url) return null;

    return (
        <div className="gaf-news-detail-image">
            <img
                src={article.featured_image_url}
                alt={article.title}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
        </div>
    );
};

const Show = ({ article, relatedArticles = [] }) => {
    const { lang, t: content } = useGaf();
    const t = content?.newsPage || {};

    const title = localized(article, "title", lang);
    const excerpt = localized(article, "excerpt", lang);
    const body = localized(article, "content", lang);
    const category = localized(article.category, "name", lang);

    const metaTitle =
        localized(article, "meta_title", lang) || title;

    const metaDescription =
        localized(article, "meta_description", lang) ||
        excerpt ||
        title;

    return (
        <>
            <Head title={`${metaTitle} | GAF Rwanda`}>
                <meta
                    head-key="description"
                    name="description"
                    content={metaDescription}
                />

                <meta
                    head-key="og:title"
                    property="og:title"
                    content={metaTitle}
                />

                <meta
                    head-key="og:description"
                    property="og:description"
                    content={metaDescription}
                />

                {article.featured_image_url && (
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={article.featured_image_url}
                    />
                )}
            </Head>

            <main className="gaf-news-detail-page">
                {/* Article header */}
                <section className="gaf-news-detail-header">
                    <div className="container">
                        <Link
                            href={route("news.index")}
                            className="gaf-news-back-link"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            {t.backToNews || "Back to news"}
                        </Link>

                        <div className="gaf-news-detail-heading">
                            {category && (
                                <span className="gaf-news-category">
                                    {category}
                                </span>
                            )}

                            <h1>{title}</h1>

                            {excerpt && (
                                <p className="gaf-news-detail-excerpt">
                                    {excerpt}
                                </p>
                            )}

                            <div className="gaf-news-detail-meta">
                                {article.published_at && (
                                    <span>
                                        <i className="bi bi-calendar3 me-2"></i>
                                        {formatDate(
                                            article.published_at,
                                            lang
                                        )}
                                    </span>
                                )}

                                {article.author?.name && (
                                    <span>
                                        <i className="bi bi-person me-2"></i>
                                        {article.author.name}
                                    </span>
                                )}

                                <span>
                                    <i className="bi bi-eye me-2"></i>
                                    {article.views_count || 0}{" "}
                                    {t.views || "views"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article content */}
                <section className="gaf-news-detail-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                <ArticleImage article={article} />

                                <article className="gaf-news-article-body">
                                    <div
                                        className="gaf-news-article-content"
                                        dangerouslySetInnerHTML={{
                                            __html: body || "",
                                        }}
                                    />
                                </article>

                                {/* Back link */}
                                <div className="gaf-news-detail-bottom">
                                    <Link
                                        href={route("news.index")}
                                        className="gaf-news-back-link"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        {t.backToNews || "Back to news"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                    <section className="gaf-news-related-section">
                        <div className="container">
                            <div className="gaf-news-section-heading">
                                <div>
                                    <span className="gaf-news-eyebrow">
                                        {t.keepReading || "KEEP READING"}
                                    </span>

                                    <h2>
                                        {t.related || "Related news"}
                                    </h2>
                                </div>

                                <Link
                                    href={route("news.index")}
                                    className="gaf-news-view-all"
                                >
                                    {t.viewAll || "View all news"}
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                            </div>

                            <div className="row g-4">
                                {relatedArticles.map((item) => (
                                    <div
                                        className="col-md-6 col-lg-4"
                                        key={item.id}
                                    >
                                        <article className="gaf-news-card">
                                            <Link
                                                href={route("news.show", {
                                                    slug: item.slug,
                                                })}
                                                className="gaf-news-card-image-link"
                                            >
                                                {item.featured_image_url ? (
                                                    <div className="gaf-news-image">
                                                        <img
                                                            src={item.featured_image_url}
                                                            alt={localized(
                                                                item,
                                                                "title",
                                                                lang
                                                            )}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="gaf-news-image-placeholder">
                                                        <i className="bi bi-newspaper"></i>
                                                    </div>
                                                )}
                                            </Link>

                                            <div className="gaf-news-card-body">
                                                <div className="gaf-news-card-meta">
                                                    <span>
                                                        {formatDate(
                                                            item.published_at,
                                                            lang
                                                        )}
                                                    </span>
                                                </div>

                                                <h3>
                                                    <Link
                                                        href={route(
                                                            "news.show",
                                                            {
                                                                slug: item.slug,
                                                            }
                                                        )}
                                                    >
                                                        {localized(
                                                            item,
                                                            "title",
                                                            lang
                                                        )}
                                                    </Link>
                                                </h3>

                                                <p>
                                                    {localized(
                                                        item,
                                                        "excerpt",
                                                        lang
                                                    )}
                                                </p>

                                                <Link
                                                    href={route("news.show", {
                                                        slug: item.slug,
                                                    })}
                                                    className="gaf-news-read-more"
                                                >
                                                    {t.readMore || "Read more"}
                                                    <i className="bi bi-arrow-right ms-2"></i>
                                                </Link>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};

Show.layout = (page) => <GafLayout>{page}</GafLayout>;

export default Show;
