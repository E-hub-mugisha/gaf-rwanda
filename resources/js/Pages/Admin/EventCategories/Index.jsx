import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ categories, filters = {}, stats = {} }) {
    const { flash } = usePage().props;

    const categoryList = categories?.data || [];

    const handleSearch = (e) => {
        router.get(
            route("admin.event-categories.index"),
            {
                ...filters,
                search: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleStatus = (e) => {
        router.get(
            route("admin.event-categories.index"),
            {
                ...filters,
                status: e.target.value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const deleteCategory = (category) => {
        if (
            !window.confirm(
                `Are you sure you want to delete "${category.name}"? This action cannot be undone.`
            )
        ) {
            return;
        }

        router.delete(
            route("admin.event-categories.destroy", category.id),
            {
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        router.get(
            route("admin.event-categories.index"),
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const getPaginationLabel = (label) => {
        return label
            .replace("&laquo;", "‹")
            .replace("&raquo;", "›")
            .replace("Previous", "Previous")
            .replace("Next", "Next");
    };

    return (
        <AdminLayout>
            <Head title="Event Categories" />

            <div className="event-categories-page">
                {/* Page Header */}
                <div className="page-heading">
                    <div className="heading-content">
                        <div className="breadcrumb-text">
                            <Link href={route("admin.dashboard")}>
                                Dashboard
                            </Link>
                            <i className="bi bi-chevron-right" />
                            <span>Event Categories</span>
                        </div>

                        <div className="d-flex align-items-center gap-3 mt-2">
                            <div className="heading-icon">
                                <i className="bi bi-tags" />
                            </div>

                            <div>
                                <h3>Event Categories</h3>
                                <p>
                                    Organize and manage the categories used
                                    across your events.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("admin.event-categories.create")}
                        className="btn btn-create-category"
                    >
                        <i className="bi bi-plus-lg" />
                        <span>Add Category</span>
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="alert custom-alert alert-success">
                        <i className="bi bi-check-circle-fill" />
                        <span>{flash.success}</span>
                        <button
                            type="button"
                            className="btn-close ms-auto"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {flash?.error && (
                    <div className="alert custom-alert alert-danger">
                        <i className="bi bi-exclamation-circle-fill" />
                        <span>{flash.error}</span>
                        <button
                            type="button"
                            className="btn-close ms-auto"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 stats-row">
                    <div className="col-xl-4 col-md-4">
                        <div className="stat-card">
                            <div className="stat-info">
                                <span className="stat-label">
                                    Total Categories
                                </span>
                                <h3>{stats.total || 0}</h3>
                                <small>All event categories</small>
                            </div>

                            <div className="stat-icon icon-blue">
                                <i className="bi bi-tags" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-4">
                        <div className="stat-card">
                            <div className="stat-info">
                                <span className="stat-label">
                                    Active Categories
                                </span>
                                <h3>{stats.active || 0}</h3>
                                <small>Available for events</small>
                            </div>

                            <div className="stat-icon icon-green">
                                <i className="bi bi-check-circle" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-4">
                        <div className="stat-card">
                            <div className="stat-info">
                                <span className="stat-label">
                                    Inactive Categories
                                </span>
                                <h3>{stats.inactive || 0}</h3>
                                <small>Currently unavailable</small>
                            </div>

                            <div className="stat-icon icon-gray">
                                <i className="bi bi-pause-circle" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="categories-panel">
                    {/* Panel Header */}
                    <div className="panel-heading">
                        <div>
                            <h5>All Categories</h5>
                            <p>
                                View, edit and organize your event categories.
                            </p>
                        </div>

                        <span className="total-count">
                            {categories?.total || 0}{" "}
                            {categories?.total === 1
                                ? "category"
                                : "categories"}
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="filter-area">
                        <div className="row g-3 align-items-center">
                            <div className="col-lg-7">
                                <div className="search-control">
                                    <i className="bi bi-search" />
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search by category name, slug or description..."
                                        value={filters.search || ""}
                                        onChange={handleSearch}
                                    />
                                    {filters.search && (
                                        <button
                                            type="button"
                                            className="clear-search"
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "admin.event-categories.index"
                                                    ),
                                                    {
                                                        ...filters,
                                                        search: "",
                                                    },
                                                    {
                                                        preserveState: true,
                                                        replace: true,
                                                    }
                                                )
                                            }
                                        >
                                            <i className="bi bi-x-circle" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="filter-control">
                                    <i className="bi bi-funnel" />
                                    <select
                                        className="form-select"
                                        value={filters.status || ""}
                                        onChange={handleStatus}
                                    >
                                        <option value="">
                                            All statuses
                                        </option>
                                        <option value="active">
                                            Active
                                        </option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-reset w-100"
                                    onClick={clearFilters}
                                    disabled={
                                        !filters.search && !filters.status
                                    }
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2" />
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="table category-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-4">CATEGORY</th>
                                    <th>SLUG</th>
                                    <th>COLOR</th>
                                    <th>ORDER</th>
                                    <th>STATUS</th>
                                    <th className="text-end pe-4">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categoryList.length > 0 ? (
                                    categoryList.map((category) => {
                                        const categoryColor =
                                            category.color || "#20603d";

                                        return (
                                            <tr key={category.id}>
                                                <td className="ps-4">
                                                    <div className="category-identity">
                                                        <div
                                                            className="category-color-indicator"
                                                            style={{
                                                                backgroundColor:
                                                                    categoryColor,
                                                            }}
                                                        />

                                                        <div className="category-details">
                                                            <Link
                                                                href={route(
                                                                    "admin.event-categories.show",
                                                                    category.id
                                                                )}
                                                                className="category-name"
                                                            >
                                                                {category.name}
                                                            </Link>

                                                            <span className="category-description">
                                                                {category.description
                                                                    ? category.description.length >
                                                                      75
                                                                        ? `${category.description.substring(
                                                                              0,
                                                                              75
                                                                          )}...`
                                                                        : category.description
                                                                    : "No description provided"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <code className="slug-label">
                                                        {category.slug}
                                                    </code>
                                                </td>

                                                <td>
                                                    <div className="color-value">
                                                        <span
                                                            className="color-swatch"
                                                            style={{
                                                                backgroundColor:
                                                                    categoryColor,
                                                            }}
                                                        />
                                                        <span>
                                                            {category.color ||
                                                                "Default"}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="order-value">
                                                        {category.sort_order ??
                                                            0}
                                                    </span>
                                                </td>

                                                <td>
                                                    {category.is_active ? (
                                                        <span className="status-pill status-active">
                                                            <span />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="status-pill status-inactive">
                                                            <span />
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="text-end pe-4">
                                                    <div className="category-actions">
                                                        <Link
                                                            href={route(
                                                                "admin.event-categories.show",
                                                                category.id
                                                            )}
                                                            className="action-btn"
                                                            title="View category"
                                                        >
                                                            <i className="bi bi-eye" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                "admin.event-categories.edit",
                                                                category.id
                                                            )}
                                                            className="action-btn action-edit"
                                                            title="Edit category"
                                                        >
                                                            <i className="bi bi-pencil-square" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="action-btn action-delete"
                                                            title="Delete category"
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash3" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6">
                                            <div className="empty-state">
                                                <div className="empty-icon">
                                                    <i className="bi bi-tags" />
                                                </div>

                                                <h6>
                                                    No categories found
                                                </h6>

                                                <p>
                                                    {filters.search ||
                                                    filters.status
                                                        ? "Try changing your search or filters."
                                                        : "You haven't created any event categories yet."}
                                                </p>

                                                {filters.search ||
                                                filters.status ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-reset"
                                                        onClick={clearFilters}
                                                    >
                                                        Clear filters
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={route(
                                                            "admin.event-categories.create"
                                                        )}
                                                        className="btn btn-create-category"
                                                    >
                                                        <i className="bi bi-plus-lg me-2" />
                                                        Create first category
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {categories?.links &&
                        categories.links.length > 3 && (
                            <div className="pagination-area">
                                <div className="pagination-summary">
                                    Showing{" "}
                                    <strong>{categories.from || 0}</strong>{" "}
                                    to{" "}
                                    <strong>{categories.to || 0}</strong>{" "}
                                    of{" "}
                                    <strong>{categories.total || 0}</strong>{" "}
                                    categories
                                </div>

                                <div className="pagination-controls">
                                    {categories.links.map((link, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                })
                                            }
                                            className={`pagination-btn ${
                                                link.active ? "active" : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: getPaginationLabel(
                                                    link.label
                                                ),
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>

            <style>{`
                .event-categories-page {
                    padding: 28px 30px 40px;
                    color: #172033;
                    min-height: 100%;
                    background: #f6f8fb;
                }

                .page-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 27px;
                }

                .breadcrumb-text {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    color: #8b95a7;
                }

                .breadcrumb-text a {
                    color: #6f7c91;
                    text-decoration: none;
                }

                .breadcrumb-text a:hover {
                    color: #20603d;
                }

                .breadcrumb-text i {
                    font-size: 10px;
                }

                .heading-content h3 {
                    font-size: 23px;
                    font-weight: 750;
                    letter-spacing: -0.6px;
                    margin: 0 0 5px;
                    color: #172033;
                }

                .heading-content p {
                    font-size: 13px;
                    color: #7d8798;
                    margin: 0;
                }

                .heading-icon {
                    width: 47px;
                    height: 47px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #eef6f1;
                    color: #20603d;
                    border-radius: 13px;
                    font-size: 21px;
                }

                .btn-create-category {
                    min-height: 42px;
                    padding: 10px 17px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    background: #20603d;
                    border: 1px solid #20603d;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all .2s ease;
                }

                .btn-create-category:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .custom-alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 0;
                    border-radius: 9px;
                    padding: 13px 16px;
                    font-size: 13px;
                    margin-bottom: 20px;
                }

                .stats-row {
                    margin-bottom: 25px;
                }

                .stat-card {
                    height: 100%;
                    min-height: 125px;
                    padding: 21px 22px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fff;
                    border: 1px solid #edf0f5;
                    border-radius: 11px;
                    box-shadow: 0 2px 8px rgba(20, 35, 60, .025);
                }

                .stat-label {
                    display: block;
                    color: #7c8799;
                    font-size: 12px;
                    font-weight: 550;
                    margin-bottom: 8px;
                }

                .stat-info h3 {
                    color: #172033;
                    font-size: 27px;
                    line-height: 1;
                    font-weight: 750;
                    margin: 0 0 8px;
                }

                .stat-info small {
                    color: #a0a9b7;
                    font-size: 11px;
                }

                .stat-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    font-size: 20px;
                }

                .icon-blue {
                    background: #f1f8f4;
                    color: #20603d;
                }

                .icon-green {
                    background: #eaf6f0;
                    color: #30966b;
                }

                .icon-gray {
                    background: #f0f2f5;
                    color: #7e8999;
                }

                .categories-panel {
                    background: #fff;
                    border: 1px solid #edf0f5;
                    border-radius: 11px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(20, 35, 60, .025);
                }

                .panel-heading {
                    padding: 21px 23px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border-bottom: 1px solid #f0f2f6;
                }

                .panel-heading h5 {
                    font-size: 15px;
                    font-weight: 700;
                    margin: 0 0 5px;
                    color: #202b3d;
                }

                .panel-heading p {
                    margin: 0;
                    font-size: 12px;
                    color: #929bab;
                }

                .total-count {
                    background: #f0f4fa;
                    color: #61738f;
                    padding: 6px 11px;
                    font-size: 11px;
                    font-weight: 650;
                    border-radius: 20px;
                    white-space: nowrap;
                }

                .filter-area {
                    padding: 17px 22px;
                    border-bottom: 1px solid #f0f2f6;
                }

                .search-control,
                .filter-control {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .search-control > i,
                .filter-control > i {
                    position: absolute;
                    left: 13px;
                    z-index: 2;
                    color: #9aa5b5;
                    font-size: 14px;
                }

                .search-control .form-control,
                .filter-control .form-select {
                    height: 41px;
                    border: 1px solid #e8ecf2;
                    background-color: #fafbfd;
                    border-radius: 7px !important;
                    color: #344054;
                    font-size: 12px;
                    box-shadow: none;
                }

                .search-control .form-control {
                    padding-left: 38px;
                    padding-right: 38px;
                }

                .filter-control .form-select {
                    padding-left: 37px;
                }

                .search-control .form-control:focus,
                .filter-control .form-select:focus {
                    background: #fff;
                    border-color: #9bcbb0;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .search-control .form-control::placeholder {
                    color: #a5adba;
                }

                .clear-search {
                    position: absolute;
                    right: 11px;
                    border: 0;
                    background: transparent;
                    color: #9aa5b5;
                    padding: 3px;
                }

                .btn-reset {
                    height: 41px;
                    background: #fff;
                    border: 1px solid #e8ecf2;
                    border-radius: 7px;
                    color: #687589;
                    font-size: 12px;
                    font-weight: 550;
                }

                .btn-reset:hover:not(:disabled) {
                    background: #f5f7fa;
                    border-color: #d6dce6;
                    color: #344054;
                }

                .btn-reset:disabled {
                    opacity: .55;
                }

                .category-table {
                    min-width: 850px;
                }

                .category-table thead th {
                    background: #fafbfd;
                    border-bottom: 1px solid #edf0f5;
                    padding: 14px 13px;
                    color: #929bab;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .65px;
                    white-space: nowrap;
                }

                .category-table tbody td {
                    padding: 15px 13px;
                    border-bottom: 1px solid #f0f2f6;
                    font-size: 12px;
                    color: #586579;
                }

                .category-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .category-table tbody tr:hover {
                    background: #fcfdff;
                }

                .category-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 240px;
                }

                .category-color-indicator {
                    width: 4px;
                    height: 39px;
                    border-radius: 5px;
                    flex-shrink: 0;
                }

                .category-details {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                }

                .category-name {
                    color: #253147;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                    width: fit-content;
                }

                .category-name:hover {
                    color: #20603d;
                }

                .category-description {
                    color: #99a2b0;
                    font-size: 11px;
                    max-width: 310px;
                    line-height: 1.5;
                }

                .slug-label {
                    background: #f5f7fa;
                    color: #68768a;
                    border-radius: 5px;
                    padding: 5px 7px;
                    font-size: 10px;
                }

                .color-value {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    font-size: 11px;
                    color: #7d8798;
                }

                .color-swatch {
                    width: 17px;
                    height: 17px;
                    border-radius: 5px;
                    border: 1px solid rgba(0,0,0,.08);
                }

                .order-value {
                    color: #687589;
                    font-size: 12px;
                    font-weight: 650;
                }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 6px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 650;
                }

                .status-pill > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .status-active {
                    background: #eaf6f0;
                    color: #27845d;
                }

                .status-active > span {
                    background: #35a574;
                }

                .status-inactive {
                    background: #f0f2f5;
                    color: #788394;
                }

                .status-inactive > span {
                    background: #9aa3b1;
                }

                .category-actions {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                .action-btn {
                    width: 31px;
                    height: 31px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e9edf2;
                    background: #fff;
                    border-radius: 7px;
                    color: #758196;
                    font-size: 13px;
                    text-decoration: none;
                    transition: all .15s ease;
                }

                .action-btn:hover {
                    background: #f2f6fc;
                    border-color: #deeee5;
                    color: #174a2f;
                }

                .action-edit {
                    color: #20603d;
                }

                .action-delete {
                    color: #d66b6b;
                }

                .action-delete:hover {
                    background: #fff1f1;
                    border-color: #f5dada;
                    color: #c74747;
                }

                .empty-state {
                    padding: 55px 20px;
                    text-align: center;
                }

                .empty-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 17px;
                    background: #f0f4fa;
                    color: #20603d;
                    font-size: 25px;
                }

                .empty-state h6 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #29364b;
                    margin-bottom: 7px;
                }

                .empty-state p {
                    font-size: 12px;
                    color: #929bab;
                    margin-bottom: 17px;
                }

                .empty-state .btn-create-category {
                    font-size: 12px;
                    min-height: 37px;
                }

                .pagination-area {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 15px;
                    padding: 16px 22px;
                    border-top: 1px solid #f0f2f6;
                }

                .pagination-summary {
                    color: #929bab;
                    font-size: 11px;
                }

                .pagination-summary strong {
                    color: #526078;
                    font-weight: 700;
                }

                .pagination-controls {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .pagination-btn {
                    min-width: 31px;
                    height: 31px;
                    padding: 0 9px;
                    border: 1px solid #e9edf2;
                    border-radius: 6px;
                    background: #fff;
                    color: #687589;
                    font-size: 11px;
                    font-weight: 600;
                }

                .pagination-btn:hover:not(:disabled) {
                    background: #f3f6fb;
                    color: #174a2f;
                }

                .pagination-btn.active {
                    background: #20603d;
                    border-color: #20603d;
                    color: #fff;
                }

                .pagination-btn:disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                @media (max-width: 767px) {
                    .event-categories-page {
                        padding: 20px 14px 30px;
                    }

                    .page-heading {
                        align-items: flex-start;
                    }

                    .page-heading .btn-create-category {
                        width: 100%;
                    }

                    .heading-content h3 {
                        font-size: 20px;
                    }

                    .stat-card {
                        min-height: 110px;
                    }

                    .panel-heading {
                        padding: 17px;
                    }

                    .filter-area {
                        padding: 15px;
                    }

                    .pagination-area {
                        padding: 15px;
                    }

                    .pagination-summary {
                        width: 100%;
                    }

                    .pagination-controls {
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}