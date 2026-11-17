
import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const formatDate = (date) => {
    if (!date) return "Not published";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Not published";

    return parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const statusClass = (status) => {
    const classes = {
        published: "gaf-article-published",
        draft: "gaf-article-draft",
        archived: "gaf-article-archived",
    };

    return classes[status] || "gaf-article-archived";
};

const imageUrl = (article) => {
    if (!article?.featured_image) return null;

    if (
        article.featured_image.startsWith("http://") ||
        article.featured_image.startsWith("https://")
    ) {
        return article.featured_image;
    }

    return `/uploads/${article.featured_image}`;
};

export default function Index({
    articles,
    categories = [],
    filters = {},
    stats = {},
}) {
    const { flash } = usePage().props;

    const search = filters.search || "";
    const statusFilter = filters.status || "";
    const categoryFilter = filters.category || "";
    const featuredFilter = filters.featured || "";

    const applyFilters = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        router.get(
            route("admin.news-articles.index"),
            {
                search: formData.get("search") || "",
                status: formData.get("status") || "",
                category: formData.get("category") || "",
                featured: formData.get("featured") || "",
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        router.get(
            route("admin.news-articles.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const deleteArticle = (article) => {
        if (
            !window.confirm(
                `Are you sure you want to move "${article.title}" to trash?`
            )
        ) {
            return;
        }

        router.delete(
            route("admin.news-articles.destroy", article.id),
            {
                preserveScroll: true,
            }
        );
    };

    const goToPage = (url) => {
        if (!url) return;

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const statistics = [
        {
            label: "Total Articles",
            value: stats.total ?? 0,
            description: "All news publications",
            icon: "bi-newspaper",
            color: "blue",
        },
        {
            label: "Published",
            value: stats.published ?? 0,
            description: "Publicly available",
            icon: "bi-check-circle",
            color: "green",
        },
        {
            label: "Drafts",
            value: stats.drafts ?? 0,
            description: "Awaiting publication",
            icon: "bi-pencil-square",
            color: "orange",
        },
        {
            label: "Archived",
            value: stats.archived ?? 0,
            description: "Archived publications",
            icon: "bi-archive",
            color: "grey",
        },
        {
            label: "Featured",
            value: stats.featured ?? 0,
            description: "Highlighted articles",
            icon: "bi-star",
            color: "purple",
        },
    ];

    const articleItems = articles?.data || [];

    return (
        <AdminLayout>
            <Head title="News Articles" />

            <div className="gaf-news-page">

                {/* Page heading */}
                <div className="gaf-news-heading">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb gaf-news-breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href={route("admin.dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    News Articles
                                </li>
                            </ol>
                        </nav>

                        <div className="d-flex align-items-center gap-3">
                            <div className="gaf-news-heading-icon">
                                <i className="bi bi-newspaper" />
                            </div>

                            <div>
                                <h3 className="gaf-news-title">
                                    News Articles
                                </h3>
                                <p className="gaf-news-subtitle">
                                    Manage news, research publications and
                                    organizational updates.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("admin.news-articles.create")}
                        className="btn gaf-news-primary-btn"
                    >
                        <i className="bi bi-plus-lg me-2" />
                        Create Article
                    </Link>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="alert gaf-news-alert-success alert-dismissible fade show">
                        <i className="bi bi-check-circle-fill me-2" />
                        {flash.success}

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {flash?.error && (
                    <div className="alert gaf-news-alert-danger alert-dismissible fade show">
                        <i className="bi bi-exclamation-circle-fill me-2" />
                        {flash.error}

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 mb-4">
                    {statistics.map((item) => (
                        <div
                            className="col-6 col-md-4 col-xl"
                            key={item.label}
                        >
                            <div className="gaf-news-stat-card">
                                <div
                                    className={`gaf-news-stat-icon gaf-stat-${item.color}`}
                                >
                                    <i className={`bi ${item.icon}`} />
                                </div>

                                <div className="gaf-news-stat-content">
                                    <span>{item.label}</span>
                                    <h3>{item.value}</h3>
                                    <small>{item.description}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Article management */}
                <div className="gaf-news-card">

                    {/* Card heading */}
                    <div className="gaf-news-card-header">
                        <div>
                            <h5>Article Management</h5>
                            <p>
                                Browse, review and manage your news
                                publications.
                            </p>
                        </div>

                        <span className="gaf-news-total">
                            <i className="bi bi-files me-2" />
                            {articles?.total ?? articleItems.length} articles
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="gaf-news-filters">
                        <form onSubmit={applyFilters}>
                            <div className="row g-2 align-items-end">
                                <div className="col-xl-4 col-lg-12">
                                    <label className="gaf-filter-label">
                                        Search articles
                                    </label>

                                    <div className="gaf-news-search">
                                        <i className="bi bi-search" />
                                        <input
                                            type="search"
                                            name="search"
                                            defaultValue={search}
                                            placeholder="Search by title, slug or excerpt..."
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xl-2">
                                    <label className="gaf-filter-label">
                                        Category
                                    </label>

                                    <select
                                        className="form-select gaf-news-select"
                                        name="category"
                                        defaultValue={categoryFilter}
                                    >
                                        <option value="">
                                            All categories
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-6 col-xl-2">
                                    <label className="gaf-filter-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select gaf-news-select"
                                        name="status"
                                        defaultValue={statusFilter}
                                    >
                                        <option value="">All statuses</option>
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>
                                </div>

                                <div className="col-sm-6 col-xl-2">
                                    <label className="gaf-filter-label">
                                        Featured
                                    </label>

                                    <select
                                        className="form-select gaf-news-select"
                                        name="featured"
                                        defaultValue={featuredFilter}
                                    >
                                        <option value="">All articles</option>
                                        <option value="1">Featured</option>
                                        <option value="0">Not featured</option>
                                    </select>
                                </div>

                                <div className="col-sm-6 col-xl-2">
                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn gaf-news-filter-btn flex-grow-1"
                                        >
                                            <i className="bi bi-funnel me-2" />
                                            Filter
                                        </button>

                                        <button
                                            type="button"
                                            className="btn gaf-news-clear-btn"
                                            onClick={clearFilters}
                                            title="Clear filters"
                                        >
                                            <i className="bi bi-arrow-counterclockwise" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="table gaf-news-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-4">ARTICLE</th>
                                    <th>CATEGORY</th>
                                    <th>AUTHOR</th>
                                    <th>STATUS</th>
                                    <th>PUBLISHED</th>
                                    <th>VIEWS</th>
                                    <th className="text-end pe-4">ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {articleItems.length > 0 ? (
                                    articleItems.map((article) => (
                                        <tr key={article.id}>
                                            {/* Article */}
                                            <td className="ps-4">
                                                <div className="gaf-article-info">
                                                    <div className="gaf-article-thumbnail">
                                                        {imageUrl(article) ? (
                                                            <img
                                                                src={imageUrl(article)}
                                                                alt={article.title}
                                                            />
                                                        ) : (
                                                            <div className="gaf-article-no-image">
                                                                <i className="bi bi-image" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="gaf-article-details">
                                                        <Link
                                                            href={route(
                                                                "admin.news-articles.show",
                                                                article.id
                                                            )}
                                                            className="gaf-article-title"
                                                        >
                                                            {article.title}
                                                        </Link>

                                                        <span className="gaf-article-slug">
                                                            /{article.slug}
                                                        </span>

                                                        {article.is_featured && (
                                                            <span className="gaf-featured-label">
                                                                <i className="bi bi-star-fill" />
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td>
                                                <span className="gaf-category-label">
                                                    <i className="bi bi-folder2-open" />
                                                    {article.category?.name ||
                                                        "Uncategorized"}
                                                </span>
                                            </td>

                                            {/* Author */}
                                            <td>
                                                <div className="gaf-author">
                                                    <div className="gaf-author-avatar">
                                                        {article.author?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "—"}
                                                    </div>

                                                    <span>
                                                        {article.author?.name ||
                                                            "Unknown"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td>
                                                <span
                                                    className={`gaf-article-status ${statusClass(
                                                        article.status
                                                    )}`}
                                                >
                                                    <span />
                                                    {article.status}
                                                </span>
                                            </td>

                                            {/* Published date */}
                                            <td>
                                                <span className="gaf-article-date">
                                                    {formatDate(
                                                        article.published_at
                                                    )}
                                                </span>
                                            </td>

                                            {/* Views */}
                                            <td>
                                                <span className="gaf-views">
                                                    <i className="bi bi-eye" />
                                                    {Number(
                                                        article.views_count || 0
                                                    ).toLocaleString()}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="text-end pe-4">
                                                <div className="gaf-article-actions">
                                                    <Link
                                                        href={route(
                                                            "admin.news-articles.show",
                                                            article.id
                                                        )}
                                                        className="gaf-news-action"
                                                        title="View article"
                                                    >
                                                        <i className="bi bi-eye" />
                                                    </Link>

                                                    <Link
                                                        href={route(
                                                            "admin.news-articles.edit",
                                                            article.id
                                                        )}
                                                        className="gaf-news-action gaf-news-edit"
                                                        title="Edit article"
                                                    >
                                                        <i className="bi bi-pencil-square" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="gaf-news-action gaf-news-delete"
                                                        title="Delete article"
                                                        onClick={() =>
                                                            deleteArticle(article)
                                                        }
                                                    >
                                                        <i className="bi bi-trash3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="gaf-news-empty">
                                                <div className="gaf-news-empty-icon">
                                                    <i className="bi bi-newspaper" />
                                                </div>

                                                <h6>No articles found</h6>

                                                <p>
                                                    There are no articles matching
                                                    your current search or filters.
                                                </p>

                                                <Link
                                                    href={route(
                                                        "admin.news-articles.create"
                                                    )}
                                                    className="btn gaf-news-primary-btn"
                                                >
                                                    <i className="bi bi-plus-lg me-2" />
                                                    Create First Article
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {articles?.links && articles.links.length > 3 && (
                        <div className="gaf-news-pagination">
                            <div className="gaf-news-pagination-info">
                                Showing <strong>{articles.from || 0}</strong>
                                {" "}to <strong>{articles.to || 0}</strong>
                                {" "}of <strong>{articles.total || 0}</strong>
                                {" "}articles
                            </div>

                            <div className="d-flex flex-wrap gap-1">
                                {articles.links.map((link, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => goToPage(link.url)}
                                        className={`gaf-news-page-link ${
                                            link.active ? "active" : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .gaf-news-page {
                    font-family: inherit;
                    color: #172033;
                    padding-bottom: 25px;
                }

                .gaf-news-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 15px;
                }

                .gaf-news-breadcrumb a {
                    text-decoration: none;
                    color: #8290a3;
                }

                .gaf-news-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-news-breadcrumb .active {
                    color: #172033;
                    font-weight: 600;
                }

                .gaf-news-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 28px;
                }

                .gaf-news-heading-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 12px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-news-title {
                    font-size: 23px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                    margin: 0 0 5px;
                }

                .gaf-news-subtitle {
                    color: #8995a6;
                    font-size: 12px;
                    margin: 0;
                }

                .gaf-news-primary-btn {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px 17px;
                    border: 1px solid #20603d;
                    border-radius: 8px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: .2s ease;
                }

                .gaf-news-primary-btn:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(32, 96, 61,.2);
                }

                .gaf-news-alert-success,
                .gaf-news-alert-danger {
                    border: 0;
                    border-radius: 9px;
                    font-size: 12px;
                    padding: 14px 17px;
                }

                .gaf-news-alert-success {
                    background: #edf8f1;
                    color: #247548;
                }

                .gaf-news-alert-danger {
                    background: #fff0ef;
                    color: #b53d38;
                }

                /* Statistics */
                .gaf-news-stat-card {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    height: 100%;
                    min-height: 115px;
                    padding: 17px;
                    border: 1px solid #edf0f4;
                    border-radius: 11px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(23,32,51,.025);
                }

                .gaf-news-stat-icon {
                    width: 43px;
                    height: 43px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 10px;
                    font-size: 18px;
                }

                .gaf-stat-blue {
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-stat-green {
                    background: #eaf7ef;
                    color: #29945b;
                }

                .gaf-stat-orange {
                    background: #fff4e9;
                    color: #d58a3d;
                }

                .gaf-stat-grey {
                    background: #f0f2f5;
                    color: #7c8796;
                }

                .gaf-stat-purple {
                    background: #f2edfc;
                    color: #8665bd;
                }

                .gaf-news-stat-content {
                    min-width: 0;
                }

                .gaf-news-stat-content span {
                    display: block;
                    color: #78869a;
                    font-size: 10px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                .gaf-news-stat-content h3 {
                    color: #172033;
                    font-size: 23px;
                    font-weight: 800;
                    margin: 0 0 3px;
                }

                .gaf-news-stat-content small {
                    color: #a0a9b6;
                    font-size: 9px;
                }

                /* Main card */
                .gaf-news-card {
                    overflow: hidden;
                    border: 1px solid #edf0f4;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 15px rgba(23,32,51,.025);
                }

                .gaf-news-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    padding: 22px 24px 18px;
                }

                .gaf-news-card-header h5 {
                    color: #172033;
                    font-size: 15px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .gaf-news-card-header p {
                    color: #8995a6;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-news-total {
                    padding: 7px 11px;
                    border-radius: 7px;
                    background: #f3f5f8;
                    color: #69778b;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                /* Filters */
                .gaf-news-filters {
                    padding: 0 24px 20px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-filter-label {
                    display: block;
                    margin-bottom: 7px;
                    color: #526176;
                    font-size: 10px;
                    font-weight: 800;
                }

                .gaf-news-search {
                    height: 41px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 12px;
                    border: 1px solid #e6eaf0;
                    border-radius: 7px;
                    background: #fafbfd;
                }

                .gaf-news-search i {
                    color: #9aa5b4;
                    font-size: 13px;
                }

                .gaf-news-search input {
                    width: 100%;
                    min-width: 0;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    color: #26344a;
                    font-size: 11px;
                }

                .gaf-news-search input::placeholder {
                    color: #a4adba;
                }

                .gaf-news-select {
                    height: 41px;
                    border-color: #e6eaf0;
                    border-radius: 7px;
                    background-color: #fafbfd;
                    color: #526176;
                    font-size: 11px;
                    box-shadow: none !important;
                }

                .gaf-news-select:focus {
                    border-color: #9acbaf;
                }

                .gaf-news-filter-btn {
                    height: 41px;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-news-filter-btn:hover {
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-news-clear-btn {
                    width: 41px;
                    height: 41px;
                    flex-shrink: 0;
                    border: 1px solid #e6eaf0;
                    border-radius: 7px;
                    background: #fff;
                    color: #758197;
                }

                .gaf-news-clear-btn:hover {
                    background: #f4f6f9;
                }

                /* Table */
                .gaf-news-table {
                    min-width: 1050px;
                }

                .gaf-news-table thead th {
                    padding: 13px 12px;
                    border-bottom: 1px solid #edf0f4;
                    background: #fafbfd;
                    color: #8b97a8;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: .6px;
                    white-space: nowrap;
                }

                .gaf-news-table tbody td {
                    padding: 13px 12px;
                    border-bottom: 1px solid #f0f2f5;
                    color: #536176;
                    font-size: 11px;
                    vertical-align: middle;
                }

                .gaf-news-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .gaf-news-table tbody tr:hover {
                    background: #fbfcfe;
                }

                .gaf-article-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 250px;
                }

                .gaf-article-thumbnail {
                    width: 65px;
                    height: 49px;
                    overflow: hidden;
                    flex-shrink: 0;
                    border-radius: 7px;
                    background: #f0f3f7;
                }

                .gaf-article-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gaf-article-no-image {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a2afc0;
                    font-size: 19px;
                }

                .gaf-article-details {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 3px;
                }

                .gaf-article-title {
                    display: block;
                    max-width: 260px;
                    overflow: hidden;
                    color: #26344a;
                    font-size: 11px;
                    font-weight: 800;
                    text-decoration: none;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-article-title:hover {
                    color: #20603d;
                }

                .gaf-article-slug {
                    display: block;
                    max-width: 260px;
                    overflow: hidden;
                    color: #9aa5b3;
                    font-size: 9px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-featured-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    color: #b27b2c;
                    font-size: 9px;
                    font-weight: 700;
                }

                .gaf-featured-label i {
                    font-size: 9px;
                }

                .gaf-category-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #69778b;
                    font-size: 10px;
                    white-space: nowrap;
                }

                .gaf-category-label i {
                    color: #8fc6a7;
                }

                .gaf-author {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                }

                .gaf-author-avatar {
                    width: 27px;
                    height: 27px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                }

                .gaf-author span {
                    color: #69778b;
                    font-size: 10px;
                }

                .gaf-article-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 9px;
                    border-radius: 30px;
                    font-size: 9px;
                    font-weight: 800;
                    text-transform: capitalize;
                    white-space: nowrap;
                }

                .gaf-article-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .gaf-article-published {
                    background: #eaf7ef;
                    color: #278451;
                }

                .gaf-article-published > span {
                    background: #2caa68;
                }

                .gaf-article-draft {
                    background: #fff5e8;
                    color: #bd812f;
                }

                .gaf-article-draft > span {
                    background: #d99b43;
                }

                .gaf-article-archived {
                    background: #f0f2f5;
                    color: #7c8796;
                }

                .gaf-article-archived > span {
                    background: #9aa4b1;
                }

                .gaf-article-date {
                    color: #8793a4;
                    font-size: 10px;
                    white-space: nowrap;
                }

                .gaf-views {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: #748298;
                    font-size: 10px;
                }

                .gaf-views i {
                    color: #9aa8ba;
                }

                .gaf-article-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 5px;
                }

                .gaf-news-action {
                    width: 31px;
                    height: 31px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e9edf2;
                    border-radius: 7px;
                    background: #fff;
                    color: #77859a;
                    text-decoration: none;
                    transition: .2s ease;
                    cursor: pointer;
                }

                .gaf-news-action:hover {
                    background: #f2f5f9;
                    color: #26344a;
                }

                .gaf-news-edit:hover {
                    border-color: #e4f0e9;
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-news-delete:hover {
                    border-color: #f8d9d7;
                    background: #fff0ef;
                    color: #d64b45;
                }

                /* Empty state */
                .gaf-news-empty {
                    padding: 55px 20px;
                    text-align: center;
                }

                .gaf-news-empty-icon {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    border-radius: 15px;
                    background: #f0f4fa;
                    color: #8fc6a7;
                    font-size: 25px;
                }

                .gaf-news-empty h6 {
                    margin-bottom: 7px;
                    color: #26344a;
                    font-size: 14px;
                    font-weight: 800;
                }

                .gaf-news-empty p {
                    margin-bottom: 18px;
                    color: #929eae;
                    font-size: 11px;
                }

                /* Pagination */
                .gaf-news-pagination {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    padding: 16px 24px;
                    border-top: 1px solid #edf0f4;
                }

                .gaf-news-pagination-info {
                    color: #8994a5;
                    font-size: 10px;
                }

                .gaf-news-pagination-info strong {
                    color: #435168;
                }

                .gaf-news-page-link {
                    min-width: 31px;
                    height: 31px;
                    padding: 0 8px;
                    border: 1px solid #e8ecf1;
                    border-radius: 6px;
                    background: #fff;
                    color: #69778b;
                    font-size: 10px;
                }

                .gaf-news-page-link.active {
                    border-color: #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-news-page-link:disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                @media (max-width: 991px) {
                    .gaf-news-heading {
                        align-items: flex-start;
                    }

                    .gaf-news-stat-card {
                        min-height: 105px;
                    }
                }

                @media (max-width: 767px) {
                    .gaf-news-heading {
                        flex-direction: column;
                    }

                    .gaf-news-heading > div,
                    .gaf-news-heading > a {
                        width: 100%;
                    }

                    .gaf-news-title {
                        font-size: 20px;
                    }

                    .gaf-news-primary-btn {
                        width: 100%;
                    }

                    .gaf-news-card-header {
                        padding: 18px 16px;
                    }

                    .gaf-news-filters {
                        padding: 0 16px 17px;
                    }

                    .gaf-news-pagination {
                        align-items: flex-start;
                        flex-direction: column;
                        padding: 15px 16px;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-news-stat-card {
                        padding: 13px;
                        gap: 9px;
                    }

                    .gaf-news-stat-icon {
                        width: 36px;
                        height: 36px;
                        font-size: 15px;
                    }

                    .gaf-news-stat-content h3 {
                        font-size: 20px;
                    }

                    .gaf-news-stat-content span {
                        font-size: 9px;
                    }

                    .gaf-news-stat-content small {
                        font-size: 8px;
                    }

                    .gaf-news-total {
                        font-size: 9px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
