
import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const formatDate = (value) => {
    if (!value) return "Not set";

    const date = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value
    );

    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
};

const statusConfig = {
    active: {
        label: "Active",
        className: "status-active",
        icon: "bi-check-circle-fill",
    },
    inactive: {
        label: "Inactive",
        className: "status-inactive",
        icon: "bi-pause-circle-fill",
    },
    completed: {
        label: "Completed",
        className: "status-completed",
        icon: "bi-flag-fill",
    },
};

export default function Index({
    programs,
    filters = {},
    statistics = {},
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "all");

    const { flash } = usePage().props;

    const programList = programs?.data || [];

    const stats = [
        {
            label: "Total programs",
            value: statistics.total ?? programs?.total ?? 0,
            description: "All registered programs",
            icon: "bi-collection",
            color: "blue",
        },
        {
            label: "Active programs",
            value: statistics.active ?? 0,
            description: "Currently running",
            icon: "bi-activity",
            color: "green",
        },
        {
            label: "Completed",
            value: statistics.completed ?? 0,
            description: "Successfully completed",
            icon: "bi-flag",
            color: "purple",
        },
        {
            label: "Featured",
            value: statistics.featured ?? 0,
            description: "Highlighted on the website",
            icon: "bi-star",
            color: "orange",
        },
    ];

    const handleFilter = (e) => {
        e.preventDefault();

        router.get(
            route("admin.programs.index"),
            {
                search: search.trim(),
                status,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("all");

        router.get(
            route("admin.programs.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const deleteProgram = (program) => {
        const confirmed = window.confirm(
            `Delete "${program.title}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        router.delete(
            route("admin.programs.destroy", program.id),
            { preserveScroll: true }
        );
    };

    const getStatus = (value) =>
        statusConfig[value] || {
            label: value || "Unknown",
            className: "status-inactive",
            icon: "bi-question-circle",
        };

    const hasFilters =
        Boolean(filters.search) ||
        Boolean(filters.status && filters.status !== "all");

    return (
        <AdminLayout title="Programs">
            <Head title="Programs Management" />

            <div className="programs-page">
                {/* Page heading */}
                <div className="programs-heading">
                    <div>
                        <div className="programs-breadcrumb">
                            <span>Administration</span>
                            <i className="bi bi-chevron-right" />
                            <span>Content Management</span>
                            <i className="bi bi-chevron-right" />
                            <span className="current">Programs</span>
                        </div>

                        <div className="d-flex align-items-center gap-2 mb-2">
                            <div className="programs-heading-icon">
                                <i className="bi bi-collection" />
                            </div>
                            <h2>Programs</h2>
                        </div>

                        <p>
                            Manage your organization's programs, monitor their
                            progress, and control what appears on the public
                            website.
                        </p>
                    </div>

                    <Link
                        href={route("admin.programs.create")}
                        className="btn programs-add-button"
                    >
                        <i className="bi bi-plus-lg" />
                        Add New Program
                    </Link>
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div
                        className="programs-alert"
                        role="alert"
                    >
                        <i className="bi bi-check-circle-fill" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 programs-statistics">
                    {stats.map((item) => (
                        <div className="col-6 col-xl-3" key={item.label}>
                            <div className="program-stat-card">
                                <div className="program-stat-top">
                                    <div className={`program-stat-icon ${item.color}`}>
                                        <i className={`bi ${item.icon}`} />
                                    </div>
                                    <i className="bi bi-three-dots stat-more" />
                                </div>

                                <div className="program-stat-value">
                                    {item.value}
                                </div>

                                <div className="program-stat-label">
                                    {item.label}
                                </div>

                                <div className="program-stat-description">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Programs section */}
                <div className="programs-content">
                    <div className="programs-content-header">
                        <div>
                            <h5>Program directory</h5>
                            <p>
                                Browse and manage all programs registered in
                                GAF Rwanda.
                            </p>
                        </div>

                        <span className="programs-total">
                            <i className="bi bi-grid me-2" />
                            {programs?.total ?? 0} programs
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="programs-filter-area">
                        <form onSubmit={handleFilter}>
                            <div className="row g-3 align-items-end">
                                <div className="col-lg-7">
                                    <label
                                        htmlFor="program-search"
                                        className="program-field-label"
                                    >
                                        Search programs
                                    </label>

                                    <div className="program-search-box">
                                        <i className="bi bi-search" />

                                        <input
                                            id="program-search"
                                            type="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="Search by title, slug or description..."
                                        />

                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => setSearch("")}
                                                aria-label="Clear search"
                                            >
                                                <i className="bi bi-x-circle" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3">
                                    <label
                                        htmlFor="program-status"
                                        className="program-field-label"
                                    >
                                        Filter by status
                                    </label>

                                    <select
                                        id="program-status"
                                        className="program-filter-select"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="all">All statuses</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div className="col-sm-6 col-lg-2">
                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn programs-search-button flex-grow-1"
                                        >
                                            <i className="bi bi-funnel me-1" />
                                            Filter
                                        </button>

                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="program-reset-button"
                                            title="Reset filters"
                                            aria-label="Reset filters"
                                        >
                                            <i className="bi bi-arrow-counterclockwise" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {hasFilters && (
                            <div className="program-active-filters">
                                <span>Active filters:</span>

                                {filters.search && (
                                    <span className="program-filter-chip">
                                        <i className="bi bi-search me-1" />
                                        {filters.search}
                                    </span>
                                )}

                                {filters.status && filters.status !== "all" && (
                                    <span className="program-filter-chip">
                                        <i className="bi bi-funnel me-1" />
                                        {filters.status}
                                    </span>
                                )}

                                <button type="button" onClick={resetFilters}>
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cards heading */}
                    <div className="programs-grid-heading">
                        <div>
                            <h6>
                                All programs
                                <span>{programs?.total ?? 0}</span>
                            </h6>
                            <p>
                                Select a program to view its details or manage
                                its information.
                            </p>
                        </div>

                        <div className="program-view-label">
                            <i className="bi bi-grid-3x3-gap-fill" />
                            Card view
                        </div>
                    </div>

                    {/* Program cards */}
                    {programList.length > 0 ? (
                        <div className="row g-4 programs-grid">
                            {programList.map((program) => {
                                const currentStatus = getStatus(program.status);

                                return (
                                    <div
                                        className="col-md-6 col-xl-4"
                                        key={program.id}
                                    >
                                        <div className="program-card">
                                            {/* Cover */}
                                            <div className="program-card-cover">
                                                {program.cover_image ? (
                                                    <img
                                                        src={`/uploads/${program.cover_image}`}
                                                        alt={program.title}
                                                    />
                                                ) : (
                                                    <div className="program-cover-placeholder">
                                                        <i className="bi bi-image" />
                                                        <span>No cover image</span>
                                                    </div>
                                                )}

                                                <div className="program-cover-overlay" />

                                                <span className={`program-card-status ${currentStatus.className}`}>
                                                    <i className={`bi ${currentStatus.icon}`} />
                                                    {currentStatus.label}
                                                </span>

                                                {program.is_featured && (
                                                    <span className="program-featured-tag">
                                                        <i className="bi bi-star-fill" />
                                                        Featured
                                                    </span>
                                                )}

                                                <div className="program-cover-number">
                                                    #{program.sort_order ?? 0}
                                                </div>
                                            </div>

                                            {/* Card body */}
                                            <div className="program-card-body">
                                                <div className="program-card-category">
                                                    <i className="bi bi-folder2-open" />
                                                    ORGANIZATION PROGRAM
                                                </div>

                                                <Link
                                                    href={route(
                                                        "admin.programs.show",
                                                        program.id
                                                    )}
                                                    className="program-card-title"
                                                >
                                                    {program.title}
                                                </Link>

                                                <div className="program-card-slug">
                                                    /{program.slug}
                                                </div>

                                                <p className="program-card-description">
                                                    {program.short_description ||
                                                        "No short description has been added for this program yet."}
                                                </p>

                                                {/* Program dates */}
                                                <div className="program-card-dates">
                                                    <div>
                                                        <span className="date-icon">
                                                            <i className="bi bi-calendar-event" />
                                                        </span>
                                                        <div>
                                                            <small>Start date</small>
                                                            <strong>
                                                                {formatDate(program.start_date)}
                                                            </strong>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <span className="date-icon">
                                                            <i className="bi bi-calendar-check" />
                                                        </span>
                                                        <div>
                                                            <small>End date</small>
                                                            <strong>
                                                                {formatDate(program.end_date)}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card footer */}
                                                <div className="program-card-footer">
                                                    <div className="program-created">
                                                        <i className="bi bi-clock-history" />
                                                        Created {formatDate(program.created_at)}
                                                    </div>

                                                    <div className="program-card-actions">
                                                        <Link
                                                            href={route(
                                                                "admin.programs.show",
                                                                program.id
                                                            )}
                                                            className="program-card-action view"
                                                            title="View program"
                                                            aria-label="View program"
                                                        >
                                                            <i className="bi bi-eye" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                "admin.programs.edit",
                                                                program.id
                                                            )}
                                                            className="program-card-action edit"
                                                            title="Edit program"
                                                            aria-label="Edit program"
                                                        >
                                                            <i className="bi bi-pencil-square" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() => deleteProgram(program)}
                                                            className="program-card-action delete"
                                                            title="Delete program"
                                                            aria-label={`Delete ${program.title}`}
                                                        >
                                                            <i className="bi bi-trash3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="programs-empty-state">
                            <div className="programs-empty-icon">
                                <i className="bi bi-folder2-open" />
                            </div>

                            <h5>No programs found</h5>

                            <p>
                                {search || status !== "all"
                                    ? "No programs match your current search or filters. Try adjusting your selection."
                                    : "There are no programs yet. Create your first program to get started."}
                            </p>

                            {search || status !== "all" ? (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="btn programs-empty-button"
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2" />
                                    Clear filters
                                </button>
                            ) : (
                                <Link
                                    href={route("admin.programs.create")}
                                    className="btn programs-empty-button"
                                >
                                    <i className="bi bi-plus-lg me-2" />
                                    Create first program
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {programs?.last_page > 1 && (
                        <div className="programs-pagination">
                            <div>
                                Showing <strong>{programs.from}</strong> to{" "}
                                <strong>{programs.to}</strong> of{" "}
                                <strong>{programs.total}</strong> programs
                            </div>

                            <nav aria-label="Programs pagination">
                                <ul className="pagination mb-0">
                                    {(programs.links || []).map((link, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${
                                                link.active ? "active" : ""
                                            } ${!link.url ? "disabled" : ""}`}
                                        >
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    preserveScroll
                                                    className="page-link"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    className="page-link"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>

                {/* Styles */}
                <style>{`
                    .programs-page {
                        width: 100%;
                        color: #263449;
                    }

                    .programs-heading {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        gap: 20px;
                        margin-bottom: 25px;
                    }

                    .programs-breadcrumb {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-bottom: 12px;
                        color: #98a3b3;
                        font-size: 10px;
                        font-weight: 600;
                    }

                    .programs-breadcrumb i {
                        font-size: 8px;
                    }

                    .programs-breadcrumb .current {
                        color: #20603d;
                    }

                    .programs-heading-icon {
                        width: 34px;
                        height: 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 8px;
                        background: #f1f8f4;
                        color: #20603d;
                        font-size: 16px;
                    }

                    .programs-heading h2 {
                        margin: 0;
                        color: #172033;
                        font-size: 25px;
                        font-weight: 800;
                        letter-spacing: -.7px;
                    }

                    .programs-heading p {
                        margin: 0;
                        color: #8490a1;
                        font-size: 12px;
                        line-height: 1.7;
                    }

                    .programs-add-button {
                        min-height: 42px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 9px;
                        padding: 0 17px;
                        border: 0;
                        border-radius: 8px;
                        background: #20603d;
                        color: #fff;
                        font-size: 11px;
                        font-weight: 700;
                        white-space: nowrap;
                        box-shadow: 0 4px 10px rgba(32, 96, 61,.16);
                    }

                    .programs-add-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .programs-alert {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 13px 16px;
                        margin-bottom: 20px;
                        border: 1px solid #d6efdf;
                        border-radius: 9px;
                        background: #effaf3;
                        color: #287747;
                        font-size: 11px;
                    }

                    .programs-alert i {
                        font-size: 16px;
                    }

                    .programs-statistics {
                        margin-bottom: 25px;
                    }

                    .program-stat-card {
                        height: 100%;
                        min-height: 145px;
                        padding: 18px;
                        border: 1px solid #edf0f4;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: 0 3px 12px rgba(28,43,64,.025);
                        transition: .2s ease;
                    }

                    .program-stat-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(28,43,64,.06);
                    }

                    .program-stat-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .program-stat-icon {
                        width: 38px;
                        height: 38px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 9px;
                        font-size: 17px;
                    }

                    .program-stat-icon.blue {
                        background: #f1f8f4;
                        color: #20603d;
                    }

                    .program-stat-icon.green {
                        background: #eaf7ef;
                        color: #369762;
                    }

                    .program-stat-icon.purple {
                        background: #f2effc;
                        color: #8066bd;
                    }

                    .program-stat-icon.orange {
                        background: #fff4e9;
                        color: #d18a3c;
                    }

                    .stat-more {
                        color: #b5bec9;
                    }

                    .program-stat-value {
                        margin-top: 13px;
                        color: #1e2b40;
                        font-size: 25px;
                        line-height: 1;
                        font-weight: 800;
                    }

                    .program-stat-label {
                        margin-top: 7px;
                        color: #4a5668;
                        font-size: 11px;
                        font-weight: 700;
                    }

                    .program-stat-description {
                        margin-top: 4px;
                        color: #9aa4b2;
                        font-size: 9px;
                    }

                    .programs-content {
                        overflow: hidden;
                        border: 1px solid #e9edf2;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: 0 3px 14px rgba(28,43,64,.025);
                    }

                    .programs-content-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                        padding: 20px 22px;
                    }

                    .programs-content-header h5 {
                        margin: 0 0 5px;
                        color: #25334a;
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .programs-content-header p {
                        margin: 0;
                        color: #929dac;
                        font-size: 10px;
                    }

                    .programs-total {
                        padding: 7px 11px;
                        border: 1px solid #edf0f4;
                        border-radius: 7px;
                        color: #7e8999;
                        font-size: 10px;
                        white-space: nowrap;
                    }

                    .programs-filter-area {
                        padding: 17px 22px;
                        border-top: 1px solid #edf0f4;
                        border-bottom: 1px solid #edf0f4;
                        background: #fafbfd;
                    }

                    .program-field-label {
                        display: block;
                        margin-bottom: 7px;
                        color: #526074;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .program-search-box {
                        height: 40px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 0 12px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                    }

                    .program-search-box:focus-within {
                        border-color: #99cbaf;
                        box-shadow: 0 0 0 3px rgba(32, 96, 61,.09);
                    }

                    .program-search-box > i {
                        color: #9aa5b4;
                        font-size: 13px;
                    }

                    .program-search-box input {
                        width: 100%;
                        min-width: 0;
                        border: 0;
                        outline: 0;
                        background: transparent;
                        color: #344054;
                        font-size: 10px;
                    }

                    .program-search-box input::placeholder {
                        color: #a5afbc;
                    }

                    .program-search-box button {
                        border: 0;
                        background: transparent;
                        color: #98a3b1;
                    }

                    .program-filter-select {
                        width: 100%;
                        height: 40px;
                        padding: 0 11px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                        color: #526074;
                        font-size: 10px;
                        outline: none;
                    }

                    .program-filter-select:focus {
                        border-color: #99cbaf;
                        box-shadow: 0 0 0 3px rgba(32, 96, 61,.09);
                    }

                    .programs-search-button {
                        min-height: 40px;
                        padding: 0 12px;
                        border: 0;
                        border-radius: 7px;
                        background: #20603d;
                        color: #fff;
                        font-size: 10px;
                        font-weight: 700;
                        white-space: nowrap;
                    }

                    .programs-search-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .program-reset-button {
                        width: 40px;
                        height: 40px;
                        flex: 0 0 40px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                        color: #69778b;
                    }

                    .program-reset-button:hover {
                        background: #f1f5fa;
                        color: #174a2f;
                    }

                    .program-active-filters {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 13px;
                        color: #8994a3;
                        font-size: 9px;
                    }

                    .program-filter-chip {
                        padding: 5px 9px;
                        border-radius: 5px;
                        background: #f1f8f4;
                        color: #174a2f;
                        font-weight: 700;
                    }

                    .program-active-filters button {
                        padding: 0;
                        border: 0;
                        background: transparent;
                        color: #20603d;
                        font-size: 9px;
                        font-weight: 700;
                    }

                    .programs-grid-heading {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                        padding: 20px 22px 5px;
                    }

                    .programs-grid-heading h6 {
                        display: flex;
                        align-items: center;
                        gap: 9px;
                        margin: 0 0 5px;
                        color: #344054;
                        font-size: 12px;
                        font-weight: 800;
                    }

                    .programs-grid-heading h6 span {
                        padding: 3px 7px;
                        border-radius: 5px;
                        background: #f1f8f4;
                        color: #20603d;
                        font-size: 9px;
                    }

                    .programs-grid-heading p {
                        margin: 0;
                        color: #929dac;
                        font-size: 9px;
                    }

                    .program-view-label {
                        display: flex;
                        align-items: center;
                        gap: 7px;
                        color: #8290a2;
                        font-size: 9px;
                        font-weight: 700;
                    }

                    .program-view-label i {
                        color: #20603d;
                    }

                    .programs-grid {
                        padding: 17px 22px 23px;
                    }

                    .program-card {
                        height: 100%;
                        overflow: hidden;
                        border: 1px solid #e9edf2;
                        border-radius: 10px;
                        background: #fff;
                        transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
                    }

                    .program-card:hover {
                        transform: translateY(-4px);
                        border-color: #dbece2;
                        box-shadow: 0 10px 25px rgba(28,43,64,.08);
                    }

                    .program-card-cover {
                        position: relative;
                        height: 175px;
                        overflow: hidden;
                        background: #edf1f6;
                    }

                    .program-card-cover > img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform .35s ease;
                    }

                    .program-card:hover .program-card-cover > img {
                        transform: scale(1.04);
                    }

                    .program-cover-placeholder {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: #edf3fa;
                        color: #91a3ba;
                    }

                    .program-cover-placeholder i {
                        font-size: 32px;
                    }

                    .program-cover-placeholder span {
                        font-size: 9px;
                        font-weight: 600;
                    }

                    .program-cover-overlay {
                        position: absolute;
                        inset: 0;
                        background: transparent;
                        pointer-events: none;
                    }

                    .program-card-status {
                        position: absolute;
                        top: 12px;
                        left: 12px;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 9px;
                        border-radius: 20px;
                        background: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        box-shadow: 0 2px 8px rgba(0,0,0,.08);
                    }

                    .program-card-status.status-active {
                        color: #328355;
                    }

                    .program-card-status.status-inactive {
                        color: #7c8795;
                    }

                    .program-card-status.status-completed {
                        color: #20603d;
                    }

                    .program-featured-tag {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                        padding: 6px 9px;
                        border-radius: 20px;
                        background: #fff6e7;
                        color: #b77b25;
                        font-size: 9px;
                        font-weight: 700;
                        box-shadow: 0 2px 8px rgba(0,0,0,.06);
                    }

                    .program-cover-number {
                        position: absolute;
                        right: 12px;
                        bottom: 12px;
                        padding: 5px 8px;
                        border: 1px solid rgba(255,255,255,.25);
                        border-radius: 5px;
                        background: rgba(22,34,52,.55);
                        color: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        backdrop-filter: blur(5px);
                    }

                    .program-card-body {
                        display: flex;
                        flex-direction: column;
                        padding: 17px;
                    }

                    .program-card-category {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        margin-bottom: 9px;
                        color: #8c9aab;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: .65px;
                    }

                    .program-card-category i {
                        color: #20603d;
                        font-size: 11px;
                    }

                    .program-card-title {
                        display: block;
                        overflow: hidden;
                        color: #263449;
                        font-size: 14px;
                        font-weight: 800;
                        line-height: 1.45;
                        text-decoration: none;
                        text-overflow: ellipsis;
                    }

                    .program-card-title:hover {
                        color: #20603d;
                    }

                    .program-card-slug {
                        overflow: hidden;
                        margin-top: 3px;
                        color: #a0aab7;
                        font-size: 9px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .program-card-description {
                        display: -webkit-box;
                        min-height: 48px;
                        overflow: hidden;
                        margin: 12px 0 15px;
                        color: #7d8999;
                        font-size: 10px;
                        line-height: 1.7;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }

                    .program-card-dates {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 9px;
                        padding: 12px 0;
                        border-top: 1px solid #f0f2f5;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .program-card-dates > div {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        min-width: 0;
                    }

                    .date-icon {
                        width: 30px;
                        height: 30px;
                        flex: 0 0 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 7px;
                        background: #f1f5fa;
                        color: #20603d;
                        font-size: 12px;
                    }

                    .program-card-dates small {
                        display: block;
                        margin-bottom: 3px;
                        color: #a0aab7;
                        font-size: 8px;
                    }

                    .program-card-dates strong {
                        display: block;
                        color: #526074;
                        font-size: 9px;
                        font-weight: 700;
                        white-space: nowrap;
                    }

                    .program-card-footer {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                        padding-top: 13px;
                    }

                    .program-created {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #9aa4b2;
                        font-size: 8px;
                        white-space: nowrap;
                    }

                    .program-card-actions {
                        display: flex;
                        gap: 5px;
                    }

                    .program-card-action {
                        width: 29px;
                        height: 29px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #e8ecf1;
                        border-radius: 6px;
                        background: #fff;
                        color: #748195;
                        font-size: 11px;
                        text-decoration: none;
                        transition: .15s ease;
                    }

                    .program-card-action:hover {
                        border-color: #d0e6da;
                        background: #f1f6fc;
                        color: #20603d;
                    }

                    .program-card-action.delete:hover {
                        border-color: #f0d1d1;
                        background: #fff3f3;
                        color: #c34f4f;
                    }

                    .programs-empty-state {
                        padding: 65px 20px;
                        text-align: center;
                    }

                    .programs-empty-icon {
                        width: 60px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 15px;
                        border-radius: 15px;
                        background: #f1f5fa;
                        color: #20603d;
                        font-size: 25px;
                    }

                    .programs-empty-state h5 {
                        margin-bottom: 7px;
                        color: #344054;
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .programs-empty-state p {
                        max-width: 390px;
                        margin: 0 auto 18px;
                        color: #929dac;
                        font-size: 10px;
                        line-height: 1.7;
                    }

                    .programs-empty-button {
                        padding: 9px 15px;
                        border: 0;
                        border-radius: 7px;
                        background: #20603d;
                        color: #fff;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .programs-empty-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .programs-pagination {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 15px;
                        padding: 15px 22px;
                        border-top: 1px solid #edf0f4;
                        color: #8d98a7;
                        font-size: 9px;
                    }

                    .programs-pagination strong {
                        color: #4a586c;
                    }

                    .programs-pagination .page-link {
                        min-width: 30px;
                        min-height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: 4px;
                        border: 1px solid #e8ecf1;
                        border-radius: 6px !important;
                        color: #66758a;
                        font-size: 10px;
                    }

                    .programs-pagination .page-item.active .page-link {
                        border-color: #20603d;
                        background: #20603d;
                        color: #fff;
                    }

                    .programs-pagination .page-item.disabled .page-link {
                        color: #b9c1cc;
                        background: #fafbfd;
                    }

                    @media (max-width: 767px) {
                        .programs-heading {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .programs-add-button {
                            width: 100%;
                        }

                        .programs-heading h2 {
                            font-size: 22px;
                        }

                        .programs-content-header {
                            align-items: flex-start;
                            flex-direction: column;
                            padding: 17px;
                        }

                        .programs-filter-area {
                            padding: 16px;
                        }

                        .programs-grid {
                            padding: 15px;
                        }

                        .programs-grid-heading {
                            padding: 18px 16px 5px;
                        }

                        .programs-pagination {
                            align-items: flex-start;
                            flex-direction: column;
                            padding: 15px;
                        }
                    }

                    @media (max-width: 420px) {
                        .program-stat-card {
                            min-height: 135px;
                            padding: 14px;
                        }

                        .program-stat-value {
                            font-size: 22px;
                        }

                        .programs-grid-heading {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .program-card-cover {
                            height: 155px;
                        }
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}
