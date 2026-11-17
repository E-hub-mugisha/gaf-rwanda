
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const statusConfig = {
    active: {
        label: "Active",
        className: "program-status-active",
        icon: "bi-check-circle-fill",
    },
    inactive: {
        label: "Inactive",
        className: "program-status-inactive",
        icon: "bi-pause-circle-fill",
    },
    completed: {
        label: "Completed",
        className: "program-status-completed",
        icon: "bi-flag-fill",
    },
};

const formatDate = (value) => {
    if (!value) return "Not specified";

    const date = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(value)
            ? `${value}T00:00:00`
            : value
    );

    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};

const formatDateTime = (value) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

export default function Show({ program }) {
    const status = statusConfig[program.status] || {
        label: program.status || "Unknown",
        className: "program-status-inactive",
        icon: "bi-question-circle",
    };

    return (
        <AdminLayout title="Program Details">
            <Head title={`${program.title} | Program Details`} />

            <div className="program-show-page">
                {/* Breadcrumb */}
                <div className="program-show-breadcrumb">
                    <Link href={route("admin.dashboard")}>
                        Administration
                    </Link>
                    <i className="bi bi-chevron-right" />
                    <Link href={route("admin.programs.index")}>
                        Programs
                    </Link>
                    <i className="bi bi-chevron-right" />
                    <span>{program.title}</span>
                </div>

                {/* Page heading */}
                <div className="program-show-heading">
                    <div>
                        <div className="program-show-eyebrow">
                            <i className="bi bi-collection" />
                            PROGRAM MANAGEMENT
                        </div>

                        <h2>Program details</h2>

                        <p>
                            Review program information, publishing status,
                            and management details.
                        </p>
                    </div>

                    <div className="program-show-header-actions">
                        <Link
                            href={route("admin.programs.index")}
                            className="program-back-button"
                        >
                            <i className="bi bi-arrow-left" />
                            Back to programs
                        </Link>

                        <Link
                            href={route("admin.programs.edit", program.id)}
                            className="program-edit-button"
                        >
                            <i className="bi bi-pencil-square" />
                            Edit program
                        </Link>
                    </div>
                </div>

                {/* Main content */}
                <div className="row g-4">
                    <div className="col-lg-8">
                        {/* Main program card */}
                        <div className="program-main-card">
                            {/* Cover image */}
                            <div className="program-hero">
                                {program.cover_image ? (
                                    <img
                                        src={`/uploads/${program.cover_image}`}
                                        alt={program.title}
                                    />
                                ) : (
                                    <div className="program-hero-placeholder">
                                        <i className="bi bi-image" />
                                        <span>No cover image available</span>
                                    </div>
                                )}

                                <div className="program-hero-overlay" />

                                <div className="program-hero-badges">
                                    <span className={`program-status-badge ${status.className}`}>
                                        <i className={`bi ${status.icon}`} />
                                        {status.label}
                                    </span>

                                    {program.is_featured && (
                                        <span className="program-featured-badge">
                                            <i className="bi bi-star-fill" />
                                            Featured program
                                        </span>
                                    )}
                                </div>

                                <div className="program-hero-caption">
                                    <span>GAF RWANDA PROGRAM</span>
                                    <h3>{program.title}</h3>
                                </div>
                            </div>

                            {/* Program content */}
                            <div className="program-main-body">
                                <div className="program-content-top">
                                    <div>
                                        <div className="program-section-label">
                                            <span />
                                            PROGRAM OVERVIEW
                                        </div>

                                        <h3>{program.title}</h3>

                                        {program.short_description && (
                                            <p className="program-short-description">
                                                {program.short_description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="program-content-divider" />

                                <div className="program-description-section">
                                    <div className="program-description-heading">
                                        <div className="program-description-icon">
                                            <i className="bi bi-file-text" />
                                        </div>

                                        <div>
                                            <h5>About this program</h5>
                                            <p>
                                                Detailed information and objectives
                                            </p>
                                        </div>
                                    </div>

                                    {program.description ? (
                                        <div className="program-description-text">
                                            {program.description}
                                        </div>
                                    ) : (
                                        <div className="program-no-description">
                                            <i className="bi bi-file-earmark-text" />
                                            <span>
                                                No full description has been
                                                added to this program yet.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Schedule card */}
                        <div className="program-schedule-card">
                            <div className="program-card-heading">
                                <div className="program-heading-icon">
                                    <i className="bi bi-calendar-range" />
                                </div>

                                <div>
                                    <h5>Program schedule</h5>
                                    <p>Timeline and planned program dates</p>
                                </div>
                            </div>

                            <div className="program-timeline">
                                <div className="program-timeline-item">
                                    <div className="timeline-marker start">
                                        <i className="bi bi-play-fill" />
                                    </div>

                                    <div>
                                        <span>START DATE</span>
                                        <strong>
                                            {formatDate(program.start_date)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="program-timeline-line" />

                                <div className="program-timeline-item">
                                    <div className="timeline-marker end">
                                        <i className="bi bi-flag-fill" />
                                    </div>

                                    <div>
                                        <span>END DATE</span>
                                        <strong>
                                            {formatDate(program.end_date)}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="col-lg-4">
                        {/* Program information */}
                        <div className="program-sidebar-card">
                            <div className="program-sidebar-heading">
                                <div className="program-sidebar-heading-icon">
                                    <i className="bi bi-info-circle" />
                                </div>

                                <div>
                                    <h5>Program information</h5>
                                    <p>General program details</p>
                                </div>
                            </div>

                            <div className="program-information-list">
                                <div className="program-info-item">
                                    <div className="program-info-icon">
                                        <i className="bi bi-link-45deg" />
                                    </div>

                                    <div className="program-info-content">
                                        <span>URL slug</span>
                                        <strong className="program-slug-value">
                                            {program.slug || "Not specified"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="program-info-item">
                                    <div className="program-info-icon">
                                        <i className="bi bi-sort-numeric-down" />
                                    </div>

                                    <div className="program-info-content">
                                        <span>Display order</span>
                                        <strong>
                                            {program.sort_order ?? 0}
                                        </strong>
                                    </div>
                                </div>

                                <div className="program-info-item">
                                    <div className="program-info-icon">
                                        <i className="bi bi-star" />
                                    </div>

                                    <div className="program-info-content">
                                        <span>Featured status</span>
                                        <strong>
                                            {program.is_featured ? (
                                                <span className="program-featured-text">
                                                    <i className="bi bi-check-circle-fill" />
                                                    Featured
                                                </span>
                                            ) : (
                                                "Standard"
                                            )}
                                        </strong>
                                    </div>
                                </div>

                                <div className="program-info-item">
                                    <div className="program-info-icon">
                                        <i className="bi bi-activity" />
                                    </div>

                                    <div className="program-info-content">
                                        <span>Current status</span>
                                        <strong className="program-status-text">
                                            {status.label}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Record information */}
                        <div className="program-sidebar-card">
                            <div className="program-sidebar-heading">
                                <div className="program-sidebar-heading-icon">
                                    <i className="bi bi-clock-history" />
                                </div>

                                <div>
                                    <h5>Record information</h5>
                                    <p>Creation and update history</p>
                                </div>
                            </div>

                            <div className="program-record-list">
                                <div>
                                    <span>Created on</span>
                                    <strong>
                                        {formatDateTime(program.created_at)}
                                    </strong>
                                </div>

                                <div>
                                    <span>Last updated</span>
                                    <strong>
                                        {formatDateTime(program.updated_at)}
                                    </strong>
                                </div>

                                <div>
                                    <span>Program ID</span>
                                    <strong>#{program.id}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="program-quick-actions">
                            <div className="program-quick-actions-heading">
                                <h5>Quick actions</h5>
                                <p>Manage this program</p>
                            </div>

                            <Link
                                href={route("admin.programs.edit", program.id)}
                                className="program-quick-action primary"
                            >
                                <i className="bi bi-pencil-square" />
                                <span>Edit program details</span>
                                <i className="bi bi-arrow-right ms-auto" />
                            </Link>

                            <Link
                                href={route("admin.programs.index")}
                                className="program-quick-action"
                            >
                                <i className="bi bi-grid" />
                                <span>View all programs</span>
                                <i className="bi bi-arrow-right ms-auto" />
                            </Link>
                        </div>

                        {/* Publishing note */}
                        <div className="program-publishing-note">
                            <div>
                                <i className="bi bi-lightbulb" />
                            </div>

                            <p>
                                <strong>Publishing tip</strong>
                                <span>
                                    Keep program descriptions and dates updated
                                    to provide accurate information to website
                                    visitors.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Styles */}
                <style>{`
                    .program-show-page {
                        width: 100%;
                        color: #263449;
                    }

                    .program-show-breadcrumb {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        gap: 9px;
                        margin-bottom: 18px;
                        color: #98a3b3;
                        font-size: 10px;
                    }

                    .program-show-breadcrumb a {
                        color: #8490a1;
                        text-decoration: none;
                    }

                    .program-show-breadcrumb a:hover {
                        color: #20603d;
                    }

                    .program-show-breadcrumb i {
                        font-size: 8px;
                    }

                    .program-show-breadcrumb span {
                        color: #20603d;
                        font-weight: 700;
                    }

                    .program-show-heading {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        flex-wrap: wrap;
                        gap: 18px;
                        margin-bottom: 25px;
                    }

                    .program-show-eyebrow {
                        display: flex;
                        align-items: center;
                        gap: 7px;
                        margin-bottom: 9px;
                        color: #20603d;
                        font-size: 9px;
                        font-weight: 800;
                        letter-spacing: 1px;
                    }

                    .program-show-heading h2 {
                        margin: 0 0 6px;
                        color: #172033;
                        font-size: 25px;
                        font-weight: 800;
                        letter-spacing: -.7px;
                    }

                    .program-show-heading p {
                        margin: 0;
                        color: #8490a1;
                        font-size: 11px;
                        line-height: 1.7;
                    }

                    .program-show-header-actions {
                        display: flex;
                        align-items: center;
                        gap: 9px;
                    }

                    .program-back-button,
                    .program-edit-button {
                        min-height: 40px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 0 14px;
                        border-radius: 7px;
                        font-size: 10px;
                        font-weight: 700;
                        text-decoration: none;
                        transition: .2s ease;
                    }

                    .program-back-button {
                        border: 1px solid #e5eaf0;
                        background: #fff;
                        color: #637187;
                    }

                    .program-back-button:hover {
                        background: #f5f8fc;
                        color: #174a2f;
                    }

                    .program-edit-button {
                        border: 1px solid #20603d;
                        background: #20603d;
                        color: #fff;
                        box-shadow: 0 3px 9px rgba(32, 96, 61,.13);
                    }

                    .program-edit-button:hover {
                        border-color: #174a2f;
                        background: #174a2f;
                        color: #fff;
                    }

                    .program-main-card,
                    .program-schedule-card,
                    .program-sidebar-card,
                    .program-quick-actions {
                        overflow: hidden;
                        margin-bottom: 20px;
                        border: 1px solid #e9edf2;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: 0 3px 14px rgba(28,43,64,.025);
                    }

                    .program-hero {
                        position: relative;
                        height: 300px;
                        overflow: hidden;
                        background: #edf2f8;
                    }

                    .program-hero > img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .program-hero-placeholder {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        background: linear-gradient(135deg, #edf3fa, #e2f0e8);
                        color: #829ab8;
                    }

                    .program-hero-placeholder i {
                        font-size: 42px;
                    }

                    .program-hero-placeholder span {
                        font-size: 10px;
                        font-weight: 600;
                    }

                    .program-hero-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(
                            180deg,
                            rgba(14,28,47,.16),
                            transparent 35%,
                            rgba(14,28,47,.76)
                        );
                    }

                    .program-hero-badges {
                        position: absolute;
                        top: 17px;
                        left: 18px;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    .program-status-badge,
                    .program-featured-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 7px 11px;
                        border-radius: 20px;
                        background: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        box-shadow: 0 2px 8px rgba(0,0,0,.08);
                    }

                    .program-status-active {
                        color: #328355;
                    }

                    .program-status-inactive {
                        color: #7c8795;
                    }

                    .program-status-completed {
                        color: #20603d;
                    }

                    .program-featured-badge {
                        background: #fff5e5;
                        color: #b77b25;
                    }

                    .program-hero-caption {
                        position: absolute;
                        right: 22px;
                        bottom: 22px;
                        left: 22px;
                        color: #fff;
                    }

                    .program-hero-caption span {
                        display: block;
                        margin-bottom: 7px;
                        color: rgba(255,255,255,.8);
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: 1.2px;
                    }

                    .program-hero-caption h3 {
                        max-width: 650px;
                        margin: 0;
                        color: #fff;
                        font-size: 25px;
                        font-weight: 800;
                        letter-spacing: -.5px;
                        line-height: 1.3;
                    }

                    .program-main-body {
                        padding: 25px;
                    }

                    .program-section-label {
                        display: flex;
                        align-items: center;
                        gap: 7px;
                        margin-bottom: 10px;
                        color: #20603d;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: .9px;
                    }

                    .program-section-label span {
                        width: 17px;
                        height: 2px;
                        border-radius: 2px;
                        background: #20603d;
                    }

                    .program-content-top h3 {
                        margin: 0 0 9px;
                        color: #263449;
                        font-size: 19px;
                        font-weight: 800;
                    }

                    .program-short-description {
                        max-width: 720px;
                        margin: 0;
                        color: #778599;
                        font-size: 12px;
                        line-height: 1.8;
                    }

                    .program-content-divider {
                        height: 1px;
                        margin: 23px 0;
                        background: #edf0f4;
                    }

                    .program-description-heading {
                        display: flex;
                        align-items: center;
                        gap: 11px;
                        margin-bottom: 17px;
                    }

                    .program-description-icon,
                    .program-heading-icon,
                    .program-sidebar-heading-icon {
                        width: 36px;
                        height: 36px;
                        flex: 0 0 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 9px;
                        background: #f1f8f4;
                        color: #20603d;
                        font-size: 15px;
                    }

                    .program-description-heading h5,
                    .program-card-heading h5,
                    .program-sidebar-heading h5 {
                        margin: 0 0 4px;
                        color: #344054;
                        font-size: 12px;
                        font-weight: 800;
                    }

                    .program-description-heading p,
                    .program-card-heading p,
                    .program-sidebar-heading p {
                        margin: 0;
                        color: #9aa4b2;
                        font-size: 9px;
                    }

                    .program-description-text {
                        color: #647287;
                        font-size: 11px;
                        line-height: 1.95;
                        white-space: pre-line;
                        overflow-wrap: anywhere;
                    }

                    .program-no-description {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 17px;
                        border: 1px dashed #e0e6ed;
                        border-radius: 8px;
                        background: #fafbfd;
                        color: #929dac;
                        font-size: 10px;
                    }

                    .program-no-description i {
                        color: #8dc4a5;
                        font-size: 17px;
                    }

                    .program-card-heading,
                    .program-sidebar-heading {
                        display: flex;
                        align-items: center;
                        gap: 11px;
                        padding: 18px 20px;
                        border-bottom: 1px solid #edf0f4;
                    }

                    .program-timeline {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 23px 20px;
                    }

                    .program-timeline-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex: 1;
                        min-width: 0;
                    }

                    .timeline-marker {
                        width: 34px;
                        height: 34px;
                        flex: 0 0 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        font-size: 13px;
                    }

                    .timeline-marker.start {
                        background: #eaf7ef;
                        color: #369762;
                    }

                    .timeline-marker.end {
                        background: #f1f8f4;
                        color: #20603d;
                    }

                    .program-timeline-item span {
                        display: block;
                        margin-bottom: 5px;
                        color: #a0aab7;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: .5px;
                    }

                    .program-timeline-item strong {
                        display: block;
                        color: #526074;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .program-timeline-line {
                        width: 40px;
                        height: 1px;
                        flex: 0 0 40px;
                        background: #ddece3;
                    }

                    .program-information-list {
                        padding: 5px 20px 10px;
                    }

                    .program-info-item {
                        display: flex;
                        align-items: center;
                        gap: 11px;
                        padding: 14px 0;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .program-info-item:last-child {
                        border-bottom: 0;
                    }

                    .program-info-icon {
                        width: 32px;
                        height: 32px;
                        flex: 0 0 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 8px;
                        background: #f3f6fa;
                        color: #8298b5;
                        font-size: 13px;
                    }

                    .program-info-content {
                        min-width: 0;
                    }

                    .program-info-content > span {
                        display: block;
                        margin-bottom: 4px;
                        color: #99a3b0;
                        font-size: 9px;
                    }

                    .program-info-content > strong {
                        display: block;
                        overflow-wrap: anywhere;
                        color: #47556a;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .program-slug-value {
                        color: #20603d !important;
                    }

                    .program-featured-text {
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                        color: #b77b25;
                    }

                    .program-status-text {
                        color: #526b8c !important;
                    }

                    .program-record-list {
                        padding: 8px 20px;
                    }

                    .program-record-list > div {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        padding: 12px 0;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .program-record-list > div:last-child {
                        border-bottom: 0;
                    }

                    .program-record-list span {
                        color: #99a3b0;
                        font-size: 9px;
                    }

                    .program-record-list strong {
                        color: #526074;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .program-quick-actions {
                        padding: 18px;
                    }

                    .program-quick-actions-heading {
                        margin-bottom: 14px;
                    }

                    .program-quick-actions-heading h5 {
                        margin: 0 0 4px;
                        color: #344054;
                        font-size: 12px;
                        font-weight: 800;
                    }

                    .program-quick-actions-heading p {
                        margin: 0;
                        color: #9aa4b2;
                        font-size: 9px;
                    }

                    .program-quick-action {
                        min-height: 42px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-top: 8px;
                        padding: 0 12px;
                        border: 1px solid #e8ecf1;
                        border-radius: 7px;
                        background: #fff;
                        color: #66758a;
                        font-size: 10px;
                        font-weight: 700;
                        text-decoration: none;
                        transition: .2s ease;
                    }

                    .program-quick-action > i:first-child {
                        color: #8198b5;
                        font-size: 13px;
                    }

                    .program-quick-action:hover {
                        border-color: #d0e6da;
                        background: #f5f8fc;
                        color: #174a2f;
                    }

                    .program-quick-action.primary {
                        border-color: #20603d;
                        background: #20603d;
                        color: #fff;
                    }

                    .program-quick-action.primary > i:first-child {
                        color: #fff;
                    }

                    .program-quick-action.primary:hover {
                        border-color: #174a2f;
                        background: #174a2f;
                    }

                    .program-publishing-note {
                        display: flex;
                        align-items: flex-start;
                        gap: 11px;
                        padding: 15px;
                        border: 1px solid #eaf3ee;
                        border-radius: 9px;
                        background: #f5f8fc;
                    }

                    .program-publishing-note > div {
                        width: 29px;
                        height: 29px;
                        flex: 0 0 29px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 7px;
                        background: #eaf3ee;
                        color: #20603d;
                    }

                    .program-publishing-note p {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        margin: 0;
                    }

                    .program-publishing-note strong {
                        color: #455a77;
                        font-size: 10px;
                    }

                    .program-publishing-note span {
                        color: #8290a2;
                        font-size: 9px;
                        line-height: 1.7;
                    }

                    @media (max-width: 991px) {
                        .program-hero {
                            height: 260px;
                        }
                    }

                    @media (max-width: 767px) {
                        .program-show-heading {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .program-show-header-actions {
                            width: 100%;
                        }

                        .program-show-header-actions > a {
                            flex: 1;
                        }

                        .program-hero {
                            height: 220px;
                        }

                        .program-hero-caption h3 {
                            font-size: 20px;
                        }

                        .program-main-body {
                            padding: 19px;
                        }

                        .program-timeline {
                            align-items: flex-start;
                            flex-direction: column;
                            gap: 13px;
                        }

                        .program-timeline-line {
                            width: 1px;
                            height: 18px;
                            margin-left: 16px;
                        }
                    }

                    @media (max-width: 420px) {
                        .program-show-heading h2 {
                            font-size: 22px;
                        }

                        .program-show-header-actions {
                            flex-direction: column;
                        }

                        .program-show-header-actions > a {
                            width: 100%;
                        }

                        .program-hero {
                            height: 190px;
                        }

                        .program-hero-caption {
                            right: 15px;
                            bottom: 16px;
                            left: 15px;
                        }

                        .program-hero-caption h3 {
                            font-size: 18px;
                        }

                        .program-hero-badges {
                            top: 12px;
                            left: 12px;
                        }

                        .program-status-badge,
                        .program-featured-badge {
                            padding: 6px 8px;
                            font-size: 8px;
                        }
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}
