
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ category, eventsCount = 0 }) {
    const color = category.color || "#20603d";

    const formatDate = (value) => {
        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not available";

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateTime = (value) => {
        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not available";

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AdminLayout title="Category Details">
            <Head title={`${category.name} - Event Category`} />

            <div className="event-category-show">
                {/* BREADCRUMB */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb category-show-breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href={route("admin.dashboard")}>
                                Dashboard
                            </Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link href={route("admin.event-categories.index")}>
                                Event Categories
                            </Link>
                        </li>

                        <li className="breadcrumb-item active">
                            Details
                        </li>
                    </ol>
                </nav>

                {/* PAGE HEADER */}
                <div className="category-show-header">
                    <div className="category-show-heading">
                        <div className="category-show-heading-icon">
                            <i className="bi bi-tags" />
                        </div>

                        <div>
                            <div className="category-show-eyebrow">
                                CATEGORY MANAGEMENT
                            </div>

                            <h2>Category details</h2>

                            <p>
                                Review category information, appearance and
                                associated events.
                            </p>
                        </div>
                    </div>

                    <div className="category-show-actions">
                        <Link
                            href={route("admin.event-categories.index")}
                            className="category-show-back"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back to categories
                        </Link>

                        <Link
                            href={route(
                                "admin.event-categories.edit",
                                category.id
                            )}
                            className="category-show-edit"
                        >
                            <i className="bi bi-pencil-square me-2" />
                            Edit category
                        </Link>
                    </div>
                </div>

                {/* CATEGORY HERO */}
                <div className="category-show-hero">
                    <div
                        className="category-show-color-strip"
                        style={{ backgroundColor: color }}
                    />

                    <div className="category-show-hero-content">
                        <div
                            className="category-show-symbol"
                            style={{
                                backgroundColor: `${color}16`,
                                color: color,
                                borderColor: `${color}35`,
                            }}
                        >
                            <i className="bi bi-tag-fill" />
                        </div>

                        <div className="category-show-hero-info">
                            <div className="category-show-hero-top">
                                <span className="category-show-label">
                                    EVENT CATEGORY
                                </span>

                                <span
                                    className={`category-show-status ${
                                        category.is_active
                                            ? "active"
                                            : "inactive"
                                    }`}
                                >
                                    <span />
                                    {category.is_active
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>

                            <h3>{category.name}</h3>

                            <p>
                                {category.description ||
                                    "No description has been added to this category yet."}
                            </p>

                            <div className="category-show-hero-meta">
                                <span>
                                    <i className="bi bi-link-45deg" />
                                    {category.slug}
                                </span>

                                <span>
                                    <i className="bi bi-hash" />
                                    Category ID: {category.id}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="category-show-hero-footer">
                        <div>
                            <span className="category-show-footer-label">
                                Display order
                            </span>
                            <strong>{category.sort_order ?? 0}</strong>
                        </div>

                        <div>
                            <span className="category-show-footer-label">
                                Associated events
                            </span>
                            <strong>{eventsCount}</strong>
                        </div>

                        <div>
                            <span className="category-show-footer-label">
                                Created
                            </span>
                            <strong>{formatDate(category.created_at)}</strong>
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="row g-4 mt-1">
                    {/* LEFT COLUMN */}
                    <div className="col-lg-8">
                        {/* DESCRIPTION */}
                        <div className="category-show-card">
                            <div className="category-show-card-header">
                                <div className="category-show-card-title">
                                    <div className="category-show-card-icon">
                                        <i className="bi bi-file-text" />
                                    </div>

                                    <div>
                                        <h5>About this category</h5>
                                        <p>
                                            Category description and information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="category-show-description">
                                {category.description ? (
                                    <p>{category.description}</p>
                                ) : (
                                    <div className="category-show-empty">
                                        <i className="bi bi-file-earmark-text" />
                                        <span>
                                            No description has been provided
                                            for this category.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* APPEARANCE */}
                        <div className="category-show-card mt-4">
                            <div className="category-show-card-header">
                                <div className="category-show-card-title">
                                    <div className="category-show-card-icon">
                                        <i className="bi bi-palette" />
                                    </div>

                                    <div>
                                        <h5>Category appearance</h5>
                                        <p>
                                            How this category is identified
                                            across the platform
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="category-show-appearance">
                                <div className="category-show-appearance-preview">
                                    <span className="category-show-preview-label">
                                        CATEGORY BADGE PREVIEW
                                    </span>

                                    <div>
                                        <span
                                            className="category-show-badge"
                                            style={{
                                                color: color,
                                                backgroundColor: `${color}16`,
                                                borderColor: `${color}45`,
                                            }}
                                        >
                                            <span
                                                className="category-show-badge-dot"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            />
                                            {category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="category-show-color-details">
                                    <span>Selected color</span>

                                    <div className="category-show-color-value">
                                        <span
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        />
                                        <strong>{color.toUpperCase()}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-lg-4">
                        {/* OVERVIEW */}
                        <div className="category-show-card">
                            <div className="category-show-card-header">
                                <div className="category-show-card-title">
                                    <div className="category-show-card-icon">
                                        <i className="bi bi-info-circle" />
                                    </div>

                                    <div>
                                        <h5>Category overview</h5>
                                        <p>Key category information</p>
                                    </div>
                                </div>
                            </div>

                            <div className="category-show-information">
                                <div className="category-show-info-row">
                                    <div className="category-show-info-icon">
                                        <i className="bi bi-hash" />
                                    </div>

                                    <div>
                                        <span>Category ID</span>
                                        <strong>#{category.id}</strong>
                                    </div>
                                </div>

                                <div className="category-show-info-row">
                                    <div className="category-show-info-icon">
                                        <i className="bi bi-link-45deg" />
                                    </div>

                                    <div>
                                        <span>URL slug</span>
                                        <strong className="category-show-break">
                                            {category.slug}
                                        </strong>
                                    </div>
                                </div>

                                <div className="category-show-info-row">
                                    <div className="category-show-info-icon">
                                        <i className="bi bi-sort-numeric-down" />
                                    </div>

                                    <div>
                                        <span>Display order</span>
                                        <strong>
                                            {category.sort_order ?? 0}
                                        </strong>
                                    </div>
                                </div>

                                <div className="category-show-info-row">
                                    <div className="category-show-info-icon">
                                        <i className="bi bi-calendar-event" />
                                    </div>

                                    <div>
                                        <span>Associated events</span>
                                        <strong>{eventsCount}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RECORD INFORMATION */}
                        <div className="category-show-card mt-4">
                            <div className="category-show-card-header">
                                <div className="category-show-card-title">
                                    <div className="category-show-card-icon">
                                        <i className="bi bi-clock-history" />
                                    </div>

                                    <div>
                                        <h5>Record information</h5>
                                        <p>Creation and update history</p>
                                    </div>
                                </div>
                            </div>

                            <div className="category-show-timeline">
                                <div className="category-show-timeline-item">
                                    <span className="category-show-timeline-dot created" />

                                    <div>
                                        <strong>Category created</strong>
                                        <span>
                                            {formatDateTime(category.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="category-show-timeline-item">
                                    <span className="category-show-timeline-dot updated" />

                                    <div>
                                        <strong>Last updated</strong>
                                        <span>
                                            {formatDateTime(category.updated_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QUICK ACTION */}
                        <div className="category-show-quick-action mt-4">
                            <div className="category-show-quick-icon">
                                <i className="bi bi-pencil-square" />
                            </div>

                            <div>
                                <strong>Need to make changes?</strong>
                                <p>
                                    Update the category name, description,
                                    color or visibility.
                                </p>
                            </div>

                            <Link
                                href={route(
                                    "admin.event-categories.edit",
                                    category.id
                                )}
                            >
                                Edit category
                                <i className="bi bi-arrow-right ms-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .event-category-show {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    color: #172033;
                }

                .category-show-breadcrumb {
                    margin-bottom: 0;
                    font-size: 10px;
                    font-weight: 600;
                }

                .category-show-breadcrumb a {
                    color: #8994a5;
                    text-decoration: none;
                }

                .category-show-breadcrumb a:hover {
                    color: #174a2f;
                }

                .category-show-breadcrumb .active {
                    color: #344054;
                }

                /* PAGE HEADER */
                .category-show-header {
                    margin: 22px 0 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 18px;
                    flex-wrap: wrap;
                }

                .category-show-heading {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .category-show-heading-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 21px;
                }

                .category-show-eyebrow {
                    margin-bottom: 5px;
                    color: #8b98aa;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                }

                .category-show-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .category-show-heading p {
                    margin: 6px 0 0;
                    color: #8994a5;
                    font-size: 10px;
                }

                .category-show-actions {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .category-show-back,
                .category-show-edit {
                    min-height: 39px;
                    padding: 0 14px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .category-show-back {
                    border: 1px solid #e5eaf0;
                    background: #fff;
                    color: #647184;
                }

                .category-show-back:hover {
                    background: #f7f9fc;
                    color: #174a2f;
                }

                .category-show-edit {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .category-show-edit:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                }

                /* HERO */
                .category-show-hero {
                    position: relative;
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 13px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-show-color-strip {
                    height: 5px;
                    width: 100%;
                }

                .category-show-hero-content {
                    padding: 25px 27px;
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                }

                .category-show-symbol {
                    width: 56px;
                    height: 56px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border: 1px solid;
                    border-radius: 13px;
                    font-size: 23px;
                }

                .category-show-hero-info {
                    min-width: 0;
                    flex: 1;
                }

                .category-show-hero-top {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .category-show-label {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .category-show-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 9px;
                    border-radius: 20px;
                    font-size: 8px;
                    font-weight: 800;
                }

                .category-show-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .category-show-status.active {
                    background: #eaf7ef;
                    color: #278653;
                }

                .category-show-status.active > span {
                    background: #278653;
                }

                .category-show-status.inactive {
                    background: #f0f2f5;
                    color: #778293;
                }

                .category-show-status.inactive > span {
                    background: #8994a5;
                }

                .category-show-hero-info h3 {
                    margin: 10px 0 7px;
                    color: #172033;
                    font-size: 21px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                    overflow-wrap: anywhere;
                }

                .category-show-hero-info > p {
                    max-width: 750px;
                    margin: 0;
                    color: #8792a2;
                    font-size: 10px;
                    line-height: 1.8;
                    white-space: pre-line;
                    overflow-wrap: anywhere;
                }

                .category-show-hero-meta {
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .category-show-hero-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: #7e8a9b;
                    font-size: 9px;
                }

                .category-show-hero-meta i {
                    color: #9ca7b5;
                    font-size: 12px;
                }

                .category-show-hero-footer {
                    padding: 16px 27px;
                    display: flex;
                    align-items: center;
                    gap: 50px;
                    flex-wrap: wrap;
                    background: #fafbfd;
                    border-top: 1px solid #edf0f4;
                }

                .category-show-hero-footer > div {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .category-show-footer-label {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .category-show-hero-footer strong {
                    color: #354155;
                    font-size: 11px;
                    font-weight: 800;
                }

                /* CARDS */
                .category-show-card {
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-show-card-header {
                    padding: 18px 21px;
                    border-bottom: 1px solid #edf0f4;
                }

                .category-show-card-title {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .category-show-card-icon {
                    width: 34px;
                    height: 34px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 9px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 15px;
                }

                .category-show-card-title h5 {
                    margin: 0;
                    color: #253247;
                    font-size: 11px;
                    font-weight: 800;
                }

                .category-show-card-title p {
                    margin: 4px 0 0;
                    color: #9aa4b1;
                    font-size: 9px;
                }

                /* DESCRIPTION */
                .category-show-description {
                    min-height: 145px;
                    padding: 24px;
                }

                .category-show-description > p {
                    margin: 0;
                    color: #697789;
                    font-size: 11px;
                    line-height: 2;
                    white-space: pre-line;
                    overflow-wrap: anywhere;
                }

                .category-show-empty {
                    min-height: 95px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 10px;
                    color: #a0a9b6;
                    font-size: 10px;
                    text-align: center;
                }

                .category-show-empty i {
                    font-size: 23px;
                    color: #c3ccd7;
                }

                /* APPEARANCE */
                .category-show-appearance {
                    padding: 21px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .category-show-appearance-preview {
                    flex: 1;
                    min-width: 180px;
                    padding: 16px;
                    background: #f8f9fb;
                    border: 1px dashed #e2e7ee;
                    border-radius: 9px;
                }

                .category-show-preview-label {
                    display: block;
                    margin-bottom: 15px;
                    color: #a0a9b6;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: .8px;
                }

                .category-show-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 13px;
                    border: 1px solid;
                    border-radius: 25px;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                }

                .category-show-color-details {
                    min-width: 110px;
                }

                .category-show-color-details > span {
                    display: block;
                    margin-bottom: 10px;
                    color: #929baa;
                    font-size: 9px;
                }

                .category-show-color-value {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .category-show-color-value > span {
                    width: 23px;
                    height: 23px;
                    border: 1px solid rgba(0,0,0,.08);
                    border-radius: 6px;
                }

                .category-show-color-value strong {
                    color: #465267;
                    font-size: 10px;
                    font-weight: 800;
                }

                /* INFORMATION */
                .category-show-information {
                    padding: 7px 20px;
                }

                .category-show-info-row {
                    padding: 13px 0;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .category-show-info-row:last-child {
                    border-bottom: 0;
                }

                .category-show-info-icon {
                    width: 31px;
                    height: 31px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #f5f7fa;
                    color: #8290a2;
                    font-size: 13px;
                }

                .category-show-info-row > div:last-child {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .category-show-info-row span {
                    color: #9aa4b1;
                    font-size: 8px;
                }

                .category-show-info-row strong {
                    color: #39465a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-break {
                    overflow-wrap: anywhere;
                }

                /* TIMELINE */
                .category-show-timeline {
                    padding: 22px;
                }

                .category-show-timeline-item {
                    position: relative;
                    min-height: 59px;
                    padding-left: 23px;
                    display: flex;
                    align-items: flex-start;
                }

                .category-show-timeline-item:not(:last-child)::before {
                    content: "";
                    position: absolute;
                    top: 12px;
                    bottom: -1px;
                    left: 4px;
                    width: 1px;
                    background: #e5eaf0;
                }

                .category-show-timeline-dot {
                    position: absolute;
                    top: 3px;
                    left: 0;
                    width: 9px;
                    height: 9px;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 1px #99caae;
                    background: #20603d;
                }

                .category-show-timeline-dot.updated {
                    background: #3c9b6b;
                    box-shadow: 0 0 0 1px #8bc9a6;
                }

                .category-show-timeline-item strong,
                .category-show-timeline-item span {
                    display: block;
                }

                .category-show-timeline-item strong {
                    color: #465267;
                    font-size: 9px;
                    font-weight: 800;
                }

                .category-show-timeline-item div span {
                    margin-top: 5px;
                    color: #929baa;
                    font-size: 9px;
                }

                /* QUICK ACTION */
                .category-show-quick-action {
                    padding: 17px;
                    background: #f1f6fc;
                    border: 1px solid #e6f2eb;
                    border-radius: 11px;
                }

                .category-show-quick-icon {
                    width: 33px;
                    height: 33px;
                    margin-bottom: 12px;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #fff;
                    color: #20603d;
                    font-size: 15px;
                }

                .category-show-quick-action strong {
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-quick-action p {
                    margin: 6px 0 12px;
                    color: #71849d;
                    font-size: 9px;
                    line-height: 1.7;
                }

                .category-show-quick-action a {
                    color: #174a2f;
                    font-size: 9px;
                    font-weight: 800;
                    text-decoration: none;
                }

                .category-show-quick-action a:hover {
                    color: #174a2f;
                }

                @media(max-width: 767px) {
                    .category-show-hero-content {
                        padding: 20px;
                        gap: 13px;
                    }

                    .category-show-hero-footer {
                        padding: 15px 20px;
                        gap: 22px;
                    }

                    .category-show-appearance {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .category-show-color-details {
                        padding-top: 5px;
                    }
                }

                @media(max-width: 480px) {
                    .category-show-heading h2 {
                        font-size: 17px;
                    }

                    .category-show-heading-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .category-show-actions {
                        width: 100%;
                    }

                    .category-show-actions a {
                        flex: 1;
                    }

                    .category-show-hero-content {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .category-show-hero-info h3 {
                        font-size: 18px;
                    }

                    .category-show-hero-footer {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 18px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
