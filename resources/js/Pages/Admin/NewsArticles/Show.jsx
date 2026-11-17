
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ article }) {
    const image = article.featured_image
        ? article.featured_image.startsWith("http") ||
          article.featured_image.startsWith("/")
            ? article.featured_image
            : `/uploads/${article.featured_image}`
        : null;

    const statusClasses = {
        draft: "gaf-status-draft",
        published: "gaf-status-published",
        archived: "gaf-status-archived",
    };

    const formatDate = (value, includeTime = false) => {
        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not available";

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            ...(includeTime && {
                hour: "2-digit",
                minute: "2-digit",
            }),
        });
    };

    const copyArticleUrl = () => {
        const url = `${window.location.origin}/news/${article.slug}`;

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(url);
        }
    };

    return (
        <AdminLayout>
            <Head title={`Article: ${article.title}`} />

            <div className="gaf-article-show-page">
                {/* Page Header */}
                <div className="gaf-show-header">
                    <div>
                        <nav className="gaf-show-breadcrumb">
                            <Link href={route("admin.news-articles.index")}>
                                News & Research
                            </Link>
                            <i className="bi bi-chevron-right" />
                            <span>Article Details</span>
                        </nav>

                        <div className="d-flex align-items-center gap-3 mt-3">
                            <div className="gaf-show-heading-icon">
                                <i className="bi bi-file-earmark-text" />
                            </div>

                            <div>
                                <h3 className="gaf-show-heading-title mb-1">
                                    Article Details
                                </h3>
                                <p className="gaf-show-heading-subtitle mb-0">
                                    Review publication content, status and
                                    article information.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <Link
                            href={route("admin.news-articles.index")}
                            className="btn gaf-show-back-btn"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back
                        </Link>

                        <Link
                            href={route(
                                "admin.news-articles.edit",
                                article.id
                            )}
                            className="btn gaf-show-edit-btn"
                        >
                            <i className="bi bi-pencil-square me-2" />
                            Edit Article
                        </Link>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Main Article */}
                    <div className="col-xl-8">
                        <div className="gaf-article-preview-card">
                            <div className="gaf-article-preview-body">
                                {/* Status */}
                                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                    <span
                                        className={`gaf-status-badge ${
                                            statusClasses[article.status] ||
                                            "gaf-status-archived"
                                        }`}
                                    >
                                        <span className="gaf-status-dot" />
                                        {article.status}
                                    </span>

                                    {article.is_featured && (
                                        <span className="gaf-featured-badge">
                                            <i className="bi bi-star-fill me-1" />
                                            Featured
                                        </span>
                                    )}

                                    {article.category?.name && (
                                        <span className="gaf-category-badge">
                                            {article.category.name}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="gaf-article-title">
                                    {article.title}
                                </h1>

                                {/* Article Metadata */}
                                <div className="gaf-article-meta">
                                    <div className="gaf-meta-item">
                                        <div className="gaf-meta-icon">
                                            <i className="bi bi-person" />
                                        </div>
                                        <div>
                                            <span>Author</span>
                                            <strong>
                                                {article.author?.name ||
                                                    "Unknown author"}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="gaf-meta-item">
                                        <div className="gaf-meta-icon">
                                            <i className="bi bi-calendar3" />
                                        </div>
                                        <div>
                                            <span>Published</span>
                                            <strong>
                                                {formatDate(
                                                    article.published_at
                                                )}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="gaf-meta-item">
                                        <div className="gaf-meta-icon">
                                            <i className="bi bi-eye" />
                                        </div>
                                        <div>
                                            <span>Views</span>
                                            <strong>
                                                {Number(
                                                    article.views_count || 0
                                                ).toLocaleString()}
                                            </strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                {image && (
                                    <div className="gaf-article-cover">
                                        <img
                                            src={image}
                                            alt={article.title}
                                        />
                                    </div>
                                )}

                                {/* Excerpt */}
                                {article.excerpt && (
                                    <div className="gaf-article-excerpt">
                                        <div className="gaf-excerpt-label">
                                            ARTICLE SUMMARY
                                        </div>
                                        <p>{article.excerpt}</p>
                                    </div>
                                )}

                                {/* Article Body */}
                                <div className="gaf-article-content">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: article.content || "",
                                        }}
                                    />
                                </div>

                                {/* Article Footer */}
                                <div className="gaf-article-footer">
                                    <div>
                                        <span className="gaf-footer-label">
                                            Article reference
                                        </span>
                                        <strong>#{article.id}</strong>
                                    </div>

                                    <button
                                        type="button"
                                        className="gaf-copy-button"
                                        onClick={copyArticleUrl}
                                    >
                                        <i className="bi bi-link-45deg me-1" />
                                        Copy article URL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information Sidebar */}
                    <div className="col-xl-4">
                        {/* Publishing Information */}
                        <div className="gaf-info-card mb-4">
                            <div className="gaf-info-card-header">
                                <div className="gaf-info-icon">
                                    <i className="bi bi-send" />
                                </div>
                                <div>
                                    <h6>Publishing Information</h6>
                                    <p>Publication and record details</p>
                                </div>
                            </div>

                            <div className="gaf-info-card-body">
                                <div className="gaf-info-row">
                                    <span>Publication status</span>
                                    <strong
                                        className={`gaf-status-badge ${
                                            statusClasses[article.status] ||
                                            "gaf-status-archived"
                                        }`}
                                    >
                                        {article.status}
                                    </strong>
                                </div>

                                <div className="gaf-info-row">
                                    <span>Publication date</span>
                                    <strong>
                                        {formatDate(
                                            article.published_at,
                                            true
                                        )}
                                    </strong>
                                </div>

                                <div className="gaf-info-row">
                                    <span>Created on</span>
                                    <strong>
                                        {formatDate(
                                            article.created_at,
                                            true
                                        )}
                                    </strong>
                                </div>

                                <div className="gaf-info-row">
                                    <span>Last updated</span>
                                    <strong>
                                        {formatDate(
                                            article.updated_at,
                                            true
                                        )}
                                    </strong>
                                </div>

                                <div className="gaf-info-row">
                                    <span>Featured article</span>
                                    <strong>
                                        {article.is_featured ? (
                                            <span className="text-success">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-muted">
                                                No
                                            </span>
                                        )}
                                    </strong>
                                </div>

                                <div className="gaf-info-row">
                                    <span>Views</span>
                                    <strong>
                                        {Number(
                                            article.views_count || 0
                                        ).toLocaleString()}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Category Information */}
                        <div className="gaf-info-card mb-4">
                            <div className="gaf-info-card-header">
                                <div className="gaf-info-icon">
                                    <i className="bi bi-folder2-open" />
                                </div>
                                <div>
                                    <h6>Category</h6>
                                    <p>Article classification</p>
                                </div>
                            </div>

                            <div className="gaf-info-card-body">
                                <div className="gaf-category-detail">
                                    <div className="gaf-category-detail-icon">
                                        <i className="bi bi-folder" />
                                    </div>
                                    <div>
                                        <strong>
                                            {article.category?.name ||
                                                "Uncategorized"}
                                        </strong>
                                        <span>News article category</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Information */}
                        <div className="gaf-info-card mb-4">
                            <div className="gaf-info-card-header">
                                <div className="gaf-info-icon">
                                    <i className="bi bi-search" />
                                </div>
                                <div>
                                    <h6>SEO Information</h6>
                                    <p>Search engine metadata</p>
                                </div>
                            </div>

                            <div className="gaf-info-card-body">
                                <div className="gaf-seo-item">
                                    <span>Meta title</span>
                                    <p>
                                        {article.meta_title ||
                                            "No meta title provided."}
                                    </p>
                                </div>

                                <div className="gaf-seo-item">
                                    <span>Meta description</span>
                                    <p>
                                        {article.meta_description ||
                                            "No meta description provided."}
                                    </p>
                                </div>

                                <div className="gaf-seo-item">
                                    <span>URL slug</span>
                                    <div className="gaf-slug-display">
                                        {article.slug || "Not available"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="gaf-quick-action-card">
                            <div className="gaf-quick-action-icon">
                                <i className="bi bi-pencil-square" />
                            </div>

                            <div>
                                <h6>Need to make changes?</h6>
                                <p>
                                    Update the article content, image or
                                    publishing settings.
                                </p>
                            </div>

                            <Link
                                href={route(
                                    "admin.news-articles.edit",
                                    article.id
                                )}
                                className="btn gaf-quick-action-button"
                            >
                                Edit this article
                                <i className="bi bi-arrow-right ms-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{showStyles}</style>
        </AdminLayout>
    );
}

const showStyles = `
    .gaf-article-show-page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 28px 30px 45px;
        color: #172033;
    }

    .gaf-show-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 28px;
    }

    .gaf-show-breadcrumb {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8993a4;
        font-size: 13px;
    }

    .gaf-show-breadcrumb a {
        color: #20603d;
        text-decoration: none;
        font-weight: 600;
    }

    .gaf-show-breadcrumb a:hover {
        text-decoration: underline;
    }

    .gaf-show-breadcrumb i {
        font-size: 10px;
    }

    .gaf-show-heading-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        background: #f1f8f4;
        color: #20603d;
        font-size: 21px;
    }

    .gaf-show-heading-title {
        font-size: 25px;
        font-weight: 750;
        letter-spacing: -0.7px;
        color: #172033;
    }

    .gaf-show-heading-subtitle {
        font-size: 13px;
        color: #7b8494;
    }

    .gaf-show-back-btn,
    .gaf-show-edit-btn {
        padding: 10px 15px;
        border-radius: 9px;
        font-size: 13px;
        font-weight: 650;
    }

    .gaf-show-back-btn {
        background: #fff;
        color: #596579;
        border: 1px solid #e5e9f0;
    }

    .gaf-show-back-btn:hover {
        background: #f7f9fc;
        color: #172033;
    }

    .gaf-show-edit-btn {
        background: #20603d;
        color: #fff;
        border: 1px solid #20603d;
    }

    .gaf-show-edit-btn:hover {
        background: #20603d;
        border-color: #20603d;
        color: #fff;
    }

    .gaf-article-preview-card,
    .gaf-info-card {
        background: #fff;
        border: 1px solid #e8edf3;
        border-radius: 13px;
        box-shadow: 0 3px 14px rgba(23, 32, 51, 0.035);
        overflow: hidden;
    }

    .gaf-article-preview-body {
        padding: 30px;
    }

    .gaf-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        width: fit-content;
        padding: 6px 10px;
        border-radius: 30px;
        font-size: 10px;
        font-weight: 750;
        text-transform: capitalize;
        white-space: nowrap;
    }

    .gaf-status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
    }

    .gaf-status-published {
        background: #eaf6ef;
        color: #27804b;
    }

    .gaf-status-draft {
        background: #fff5df;
        color: #a46b0b;
    }

    .gaf-status-archived {
        background: #eef0f3;
        color: #687385;
    }

    .gaf-featured-badge {
        padding: 6px 10px;
        border-radius: 30px;
        background: #fff5e6;
        color: #b47a19;
        font-size: 10px;
        font-weight: 700;
    }

    .gaf-category-badge {
        padding: 6px 10px;
        border-radius: 30px;
        background: #f1f8f4;
        color: #20603d;
        font-size: 10px;
        font-weight: 700;
    }

    .gaf-article-title {
        color: #172033;
        font-size: clamp(25px, 3vw, 35px);
        font-weight: 800;
        letter-spacing: -1px;
        line-height: 1.3;
        margin: 15px 0 22px;
        overflow-wrap: anywhere;
    }

    .gaf-article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding-bottom: 23px;
        margin-bottom: 25px;
        border-bottom: 1px solid #edf0f4;
    }

    .gaf-meta-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .gaf-meta-icon {
        width: 35px;
        height: 35px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f2f5fa;
        color: #20603d;
        font-size: 14px;
    }

    .gaf-meta-item span {
        display: block;
        margin-bottom: 2px;
        color: #929baa;
        font-size: 10px;
    }

    .gaf-meta-item strong {
        display: block;
        color: #384459;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-article-cover {
        margin-bottom: 28px;
        overflow: hidden;
        border-radius: 11px;
        background: #f3f5f8;
    }

    .gaf-article-cover img {
        display: block;
        width: 100%;
        max-height: 460px;
        object-fit: cover;
    }

    .gaf-article-excerpt {
        padding: 19px 22px;
        margin-bottom: 30px;
        border-left: 4px solid #20603d;
        border-radius: 0 9px 9px 0;
        background: #f5f8fc;
    }

    .gaf-excerpt-label {
        color: #20603d;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1px;
        margin-bottom: 8px;
    }

    .gaf-article-excerpt p {
        margin: 0;
        color: #536176;
        font-size: 15px;
        line-height: 1.8;
    }

    .gaf-article-content {
        color: #465267;
        font-size: 14px;
        line-height: 1.95;
        overflow-wrap: anywhere;
    }

    .gaf-article-content > div > *:first-child {
        margin-top: 0;
    }

    .gaf-article-content h1,
    .gaf-article-content h2,
    .gaf-article-content h3,
    .gaf-article-content h4 {
        color: #172033;
        font-weight: 750;
        line-height: 1.4;
        margin-top: 1.7em;
        margin-bottom: 0.7em;
    }

    .gaf-article-content h1 {
        font-size: 27px;
    }

    .gaf-article-content h2 {
        font-size: 23px;
    }

    .gaf-article-content h3 {
        font-size: 19px;
    }

    .gaf-article-content p {
        margin-bottom: 1.2em;
    }

    .gaf-article-content img {
        max-width: 100%;
        height: auto;
        border-radius: 9px;
        margin: 12px 0;
    }

    .gaf-article-content figure {
        max-width: 100%;
        margin: 20px 0;
    }

    .gaf-article-content figcaption {
        margin-top: 7px;
        color: #929baa;
        font-size: 12px;
        text-align: center;
    }

    .gaf-article-content blockquote {
        margin: 22px 0;
        padding: 15px 20px;
        border-left: 4px solid #20603d;
        background: #f5f8fc;
        color: #5c687b;
        border-radius: 0 8px 8px 0;
    }

    .gaf-article-content ul,
    .gaf-article-content ol {
        padding-left: 25px;
        margin-bottom: 20px;
    }

    .gaf-article-content li {
        margin-bottom: 7px;
    }

    .gaf-article-content a {
        color: #20603d;
        text-decoration: underline;
        overflow-wrap: anywhere;
    }

    .gaf-article-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 13px;
    }

    .gaf-article-content th,
    .gaf-article-content td {
        border: 1px solid #e3e8ef;
        padding: 11px 13px;
        text-align: left;
    }

    .gaf-article-content th {
        background: #f5f7fa;
        color: #27354a;
        font-weight: 700;
    }

    .gaf-article-content pre {
        max-width: 100%;
        overflow-x: auto;
        padding: 16px;
        background: #f5f7fa;
        border-radius: 9px;
    }

    .gaf-article-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        flex-wrap: wrap;
        margin-top: 35px;
        padding-top: 20px;
        border-top: 1px solid #edf0f4;
    }

    .gaf-footer-label {
        display: block;
        color: #929baa;
        font-size: 10px;
        margin-bottom: 4px;
    }

    .gaf-article-footer strong {
        color: #354156;
        font-size: 12px;
    }

    .gaf-copy-button {
        border: 1px solid #e0eee6;
        border-radius: 8px;
        background: #fff;
        color: #20603d;
        padding: 9px 12px;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-copy-button:hover {
        background: #f1f8f4;
    }

    .gaf-info-card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid #edf0f4;
    }

    .gaf-info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 37px;
        height: 37px;
        flex-shrink: 0;
        background: #f1f8f4;
        border-radius: 10px;
        color: #20603d;
        font-size: 16px;
    }

    .gaf-info-card-header h6 {
        margin: 0 0 3px;
        color: #263247;
        font-size: 13px;
        font-weight: 750;
    }

    .gaf-info-card-header p {
        margin: 0;
        color: #929baa;
        font-size: 10px;
    }

    .gaf-info-card-body {
        padding: 19px 20px;
    }

    .gaf-info-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        padding: 11px 0;
        border-bottom: 1px solid #f0f2f5;
    }

    .gaf-info-row:first-child {
        padding-top: 0;
    }

    .gaf-info-row:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }

    .gaf-info-row > span {
        color: #8993a3;
        font-size: 11px;
    }

    .gaf-info-row > strong {
        color: #344156;
        font-size: 11px;
        font-weight: 650;
        text-align: right;
        overflow-wrap: anywhere;
    }

    .gaf-info-row .gaf-status-badge {
        padding: 5px 8px;
        font-size: 9px;
    }

    .gaf-category-detail {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .gaf-category-detail-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        background: #f1f5fb;
        color: #20603d;
        font-size: 17px;
    }

    .gaf-category-detail strong {
        display: block;
        color: #344156;
        font-size: 12px;
    }

    .gaf-category-detail span {
        display: block;
        color: #929baa;
        font-size: 10px;
        margin-top: 4px;
    }

    .gaf-seo-item {
        margin-bottom: 18px;
    }

    .gaf-seo-item:last-child {
        margin-bottom: 0;
    }

    .gaf-seo-item > span {
        display: block;
        margin-bottom: 7px;
        color: #929baa;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .4px;
    }

    .gaf-seo-item p {
        margin: 0;
        color: #465267;
        font-size: 12px;
        line-height: 1.7;
        overflow-wrap: anywhere;
    }

    .gaf-slug-display {
        padding: 10px;
        border-radius: 7px;
        background: #f5f7fa;
        color: #596579;
        font-size: 11px;
        overflow-wrap: anywhere;
    }

    .gaf-quick-action-card {
        padding: 20px;
        border: 1px solid #e2efe8;
        border-radius: 12px;
        background: #f3f7fc;
    }

    .gaf-quick-action-icon {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 13px;
        background: #e9f3ed;
        color: #20603d;
        border-radius: 10px;
        font-size: 17px;
    }

    .gaf-quick-action-card h6 {
        margin-bottom: 6px;
        color: #263247;
        font-size: 13px;
        font-weight: 750;
    }

    .gaf-quick-action-card p {
        margin-bottom: 15px;
        color: #778397;
        font-size: 11px;
        line-height: 1.7;
    }

    .gaf-quick-action-button {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        background: #20603d;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-quick-action-button:hover {
        background: #20603d;
        color: #fff;
    }

    @media(max-width: 1199px) {
        .gaf-article-show-page {
            padding: 22px 20px 35px;
        }
    }

    @media(max-width: 767px) {
        .gaf-article-show-page {
            padding: 20px 14px 30px;
        }

        .gaf-show-header {
            align-items: flex-start;
            flex-direction: column;
        }

        .gaf-show-heading-title {
            font-size: 22px;
        }

        .gaf-article-preview-body {
            padding: 20px 16px;
        }

        .gaf-article-meta {
            gap: 15px;
        }

        .gaf-article-title {
            font-size: 25px;
        }

        .gaf-article-footer {
            align-items: flex-start;
            flex-direction: column;
        }
    }
`;
