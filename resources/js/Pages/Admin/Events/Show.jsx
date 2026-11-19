
import React from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ event }) {
    const statusConfig = {
        draft: {
            label: "Draft",
            className: "gaf-event-show-status-draft",
            icon: "bi-pencil-square",
        },
        published: {
            label: "Published",
            className: "gaf-event-show-status-published",
            icon: "bi-check-circle-fill",
        },
        cancelled: {
            label: "Cancelled",
            className: "gaf-event-show-status-cancelled",
            icon: "bi-x-circle-fill",
        },
        completed: {
            label: "Completed",
            className: "gaf-event-show-status-completed",
            icon: "bi-flag-fill",
        },
    };

    const status =
        statusConfig[event.status] || {
            label: event.status || "Unknown",
            className: "gaf-event-show-status-draft",
            icon: "bi-info-circle",
        };

    const formatDate = (value) => {
        if (!value) return "Not specified";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not specified";

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDateOnly = (value) => {
        if (!value) return "Date not specified";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Date not specified";

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (value) => {
        if (!value) return null;

        // Agenda times may be stored as simple strings such as "09:00 AM".
        return value;
    };

    const agenda = Array.isArray(event.agenda) ? event.agenda : [];

    const categoryColor = event.category?.color || "#20603d";

    const hasDescription = Boolean(event.description?.trim());

    const descriptionIsHtml =
        hasDescription && /<\/?[a-z][\s\S]*>/i.test(event.description);

    return (
        <AdminLayout title={event.title}>
            <div className="gaf-event-show-page">
                {/* Page header */}
                <div className="gaf-event-show-header">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb gaf-event-show-breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href={route("admin.dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="breadcrumb-item">
                                    <Link href={route("admin.events.index")}>
                                        Events
                                    </Link>
                                </li>

                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Event Details
                                </li>
                            </ol>
                        </nav>

                        <div className="d-flex align-items-center gap-3">
                            <div className="gaf-event-show-heading-icon">
                                <i className="bi bi-calendar2-event" />
                            </div>

                            <div>
                                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                                    <h3 className="gaf-event-show-page-title mb-0">
                                        Event Details
                                    </h3>

                                    <span
                                        className={`gaf-event-show-status ${status.className}`}
                                    >
                                        <i className={`bi ${status.icon}`} />
                                        {status.label}
                                    </span>
                                </div>

                                <p className="gaf-event-show-page-subtitle mb-0">
                                    View event information, schedule,
                                    registration and related content.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="gaf-event-show-header-actions">
                        <Link
                            href={route("admin.events.index")}
                            className="btn gaf-event-show-btn-back"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back to Events
                        </Link>

                        <Link
                            href={route("admin.events.edit", event.id)}
                            className="btn gaf-event-show-btn-edit"
                        >
                            <i className="bi bi-pencil-square me-2" />
                            Edit Event
                        </Link>

                        <Link
                            href={route(
                                "admin.events.galleries.index",
                                event.id
                            )}
                            className="btn gaf-event-show-btn-gallery"
                        >
                            <i className="bi bi-images me-2" />
                            Manage Gallery
                        </Link>
                    </div>
                </div>

                {/* Event summary */}
                <div className="gaf-event-show-summary">
                    <div className="gaf-event-show-summary-main">
                        <div className="gaf-event-show-summary-icon">
                            <i className="bi bi-calendar-check" />
                        </div>

                        <div className="min-w-0">
                            <span className="gaf-event-show-summary-label">
                                EVENT
                            </span>

                            <h5 className="gaf-event-show-summary-title">
                                {event.title}
                            </h5>

                            <div className="gaf-event-show-summary-meta">
                                <span>
                                    <i className="bi bi-hash me-1" />
                                    Event #{event.id}
                                </span>

                                {event.category?.name && (
                                    <span>
                                        <i className="bi bi-folder2 me-1" />
                                        {event.category.name}
                                    </span>
                                )}

                                {event.is_featured && (
                                    <span className="gaf-event-featured-label">
                                        <i className="bi bi-star-fill me-1" />
                                        Featured Event
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="gaf-event-show-summary-date">
                        <span>EVENT DATE</span>
                        <strong>{formatDateOnly(event.starts_at)}</strong>
                    </div>
                </div>

                {/* Main content */}
                <div className="gaf-event-show-layout">
                    <main className="gaf-event-show-main">
                        {/* Cover image */}
                        <section className="gaf-event-show-cover-card">
                            {event.cover_image ? (
                                <img
                                    src={`/uploads/${event.cover_image}`}
                                    alt={event.title}
                                    className="gaf-event-show-cover"
                                />
                            ) : (
                                <div className="gaf-event-show-cover-placeholder">
                                    <i className="bi bi-image" />
                                    <span>No event cover image uploaded</span>
                                </div>
                            )}

                            <div className="gaf-event-show-cover-caption">
                                <div>
                                    <span className="gaf-event-cover-eyebrow">
                                        EVENT
                                    </span>
                                    <h2>{event.title}</h2>
                                </div>

                                {event.is_featured && (
                                    <span className="gaf-event-cover-featured">
                                        <i className="bi bi-star-fill me-2" />
                                        Featured
                                    </span>
                                )}
                            </div>
                        </section>

                        {/* Event description */}
                        <section className="gaf-event-show-card">
                            <div className="gaf-event-show-section-heading">
                                <div className="gaf-event-show-section-icon">
                                    <i className="bi bi-file-text" />
                                </div>

                                <div>
                                    <h5>About this Event</h5>
                                    <p>
                                        Overview and details of the event
                                    </p>
                                </div>
                            </div>

                            {event.excerpt && (
                                <div className="gaf-event-show-excerpt">
                                    {event.excerpt}
                                </div>
                            )}

                            <div className="gaf-event-show-description">
                                {hasDescription ? (
                                    descriptionIsHtml ? (
                                        <div
                                            className="gaf-event-rich-content"
                                            dangerouslySetInnerHTML={{
                                                __html: event.description,
                                            }}
                                        />
                                    ) : (
                                        <div className="gaf-event-plain-content">
                                            {event.description}
                                        </div>
                                    )
                                ) : (
                                    <p className="gaf-event-empty-text">
                                        No event description has been added.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Agenda */}
                        <section className="gaf-event-show-card">
                            <div className="gaf-event-show-section-heading gaf-event-agenda-heading">
                                <div className="gaf-event-show-section-icon">
                                    <i className="bi bi-list-check" />
                                </div>

                                <div>
                                    <h5>Event Agenda</h5>
                                    <p>
                                        {agenda.length > 0
                                            ? `${agenda.length} scheduled ${agenda.length === 1 ? "session" : "sessions"}`
                                            : "Event programme and sessions"}
                                    </p>
                                </div>
                            </div>

                            {agenda.length > 0 ? (
                                <div className="gaf-event-agenda-list">
                                    {agenda.map((item, index) => (
                                        <div
                                            className="gaf-event-agenda-item"
                                            key={index}
                                        >
                                            <div className="gaf-event-agenda-marker">
                                                <span>{index + 1}</span>
                                            </div>

                                            <div className="gaf-event-agenda-content">
                                                <div className="gaf-event-agenda-time">
                                                    <i className="bi bi-clock me-2" />
                                                    {formatTime(item.time) ||
                                                        "Scheduled session"}
                                                </div>

                                                <h6>
                                                    {item.title ||
                                                        "Untitled session"}
                                                </h6>

                                                {item.description && (
                                                    <p>{item.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="gaf-event-empty-state">
                                    <i className="bi bi-calendar2-week" />
                                    <strong>No agenda available</strong>
                                    <span>
                                        No agenda sessions have been added to
                                        this event yet.
                                    </span>
                                </div>
                            )}
                        </section>

                        {/* Related program */}
                        {event.program && (
                            <section className="gaf-event-show-card">
                                <div className="gaf-event-show-section-heading">
                                    <div className="gaf-event-show-section-icon">
                                        <i className="bi bi-diagram-3" />
                                    </div>

                                    <div>
                                        <h5>Related Program</h5>
                                        <p>
                                            Programme associated with this event
                                        </p>
                                    </div>
                                </div>

                                <div className="gaf-event-related-program">
                                    <div className="gaf-event-related-program-icon">
                                        <i className="bi bi-journal-bookmark" />
                                    </div>

                                    <div>
                                        <strong>{event.program.title}</strong>
                                        <span>
                                            This event is associated with the
                                            selected GAF program.
                                        </span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Registration */}
                        <section className="gaf-event-registration-card">
                            <div className="gaf-event-registration-icon">
                                <i className="bi bi-person-plus" />
                            </div>

                            <div className="gaf-event-registration-content">
                                <h5>Event Registration</h5>
                                <p>
                                    {event.registration_url
                                        ? "Registration is available through the external link below."
                                        : "No registration link has been provided for this event."}
                                </p>
                            </div>

                            {event.registration_url && (
                                <a
                                    href={event.registration_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn gaf-event-registration-btn"
                                >
                                    Open Registration
                                    <i className="bi bi-box-arrow-up-right ms-2" />
                                </a>
                            )}
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className="gaf-event-show-sidebar">
                        {/* Schedule */}
                        <section className="gaf-event-show-card gaf-event-sidebar-card">
                            <div className="gaf-event-sidebar-heading">
                                <div className="gaf-event-sidebar-icon">
                                    <i className="bi bi-calendar3" />
                                </div>

                                <h6>Event Schedule</h6>
                            </div>

                            <div className="gaf-event-schedule">
                                <div className="gaf-event-schedule-item">
                                    <span className="gaf-event-schedule-dot gaf-event-dot-start" />

                                    <div>
                                        <span>START DATE & TIME</span>
                                        <strong>
                                            {formatDate(event.starts_at)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="gaf-event-schedule-line" />

                                <div className="gaf-event-schedule-item">
                                    <span className="gaf-event-schedule-dot gaf-event-dot-end" />

                                    <div>
                                        <span>END DATE & TIME</span>
                                        <strong>
                                            {formatDate(event.ends_at)}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className="gaf-event-sidebar-info">
                                <i className="bi bi-globe2" />
                                <div>
                                    <span>TIMEZONE</span>
                                    <strong>
                                        {event.timezone || "Not specified"}
                                    </strong>
                                </div>
                            </div>
                        </section>

                        {/* Location */}
                        <section className="gaf-event-show-card gaf-event-sidebar-card">
                            <div className="gaf-event-sidebar-heading">
                                <div className="gaf-event-sidebar-icon">
                                    <i className="bi bi-geo-alt" />
                                </div>

                                <h6>Event Location</h6>
                            </div>

                            <div className="gaf-event-location">
                                <strong>
                                    {event.venue || "Venue not specified"}
                                </strong>

                                {event.address && (
                                    <p>{event.address}</p>
                                )}

                                <p className="mb-0">
                                    {[event.city, event.country]
                                        .filter(Boolean)
                                        .join(", ") || "Location not specified"}
                                </p>
                            </div>

                            {event.city && event.country && (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        [
                                            event.venue,
                                            event.address,
                                            event.city,
                                            event.country,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="gaf-event-map-link"
                                >
                                    <i className="bi bi-map me-2" />
                                    View on Google Maps
                                    <i className="bi bi-arrow-up-right ms-auto" />
                                </a>
                            )}
                        </section>

                        {/* Classification */}
                        <section className="gaf-event-show-card gaf-event-sidebar-card">
                            <div className="gaf-event-sidebar-heading">
                                <div className="gaf-event-sidebar-icon">
                                    <i className="bi bi-tags" />
                                </div>

                                <h6>Classification</h6>
                            </div>

                            <div className="gaf-event-detail-row">
                                <span>Category</span>

                                {event.category ? (
                                    <span
                                        className="gaf-event-category-badge"
                                        style={{
                                            color: categoryColor,
                                            backgroundColor: `color-mix(in srgb, ${categoryColor} 12%, white)`,
                                        }}
                                    >
                                        {event.category.name}
                                    </span>
                                ) : (
                                    <strong>Not assigned</strong>
                                )}
                            </div>

                            <div className="gaf-event-detail-row">
                                <span>Featured</span>
                                <strong>
                                    {event.is_featured ? (
                                        <span className="gaf-event-yes">
                                            <i className="bi bi-check-circle-fill me-1" />
                                            Yes
                                        </span>
                                    ) : (
                                        "No"
                                    )}
                                </strong>
                            </div>

                            <div className="gaf-event-detail-row">
                                <span>Program</span>
                                <strong className="gaf-event-detail-value">
                                    {event.program?.title || "None"}
                                </strong>
                            </div>
                        </section>

                        {/* Publishing information */}
                        <section className="gaf-event-show-card gaf-event-sidebar-card">
                            <div className="gaf-event-sidebar-heading">
                                <div className="gaf-event-sidebar-icon">
                                    <i className="bi bi-info-circle" />
                                </div>

                                <h6>Record Information</h6>
                            </div>

                            <div className="gaf-event-record-item">
                                <span>URL Slug</span>
                                <strong className="gaf-event-slug">
                                    {event.slug || "Not set"}
                                </strong>
                            </div>

                            <div className="gaf-event-record-item">
                                <span>Created By</span>
                                <strong>
                                    {event.creator?.name || "Unknown"}
                                </strong>
                            </div>

                            <div className="gaf-event-record-item">
                                <span>Published At</span>
                                <strong>
                                    {event.published_at
                                        ? formatDate(event.published_at)
                                        : "Not published"}
                                </strong>
                            </div>

                            <div className="gaf-event-record-item">
                                <span>Last Updated</span>
                                <strong>{formatDate(event.updated_at)}</strong>
                            </div>
                        </section>

                        {/* Quick actions */}
                        <section className="gaf-event-quick-actions">
                            <span>QUICK ACTIONS</span>

                            <Link
                                href={route(
                                    "admin.events.galleries.index",
                                    event.id
                                )}
                            >
                                <i className="bi bi-images" />
                                Manage Event Gallery
                                <i className="bi bi-chevron-right ms-auto" />
                            </Link>

                            <Link
                                href={route("admin.events.edit", event.id)}
                            >
                                <i className="bi bi-pencil-square" />
                                Edit Event Details
                                <i className="bi bi-chevron-right ms-auto" />
                            </Link>
                        </section>
                    </aside>
                </div>
            </div>

            <style>{`
                .gaf-event-show-page {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 8px 0 35px;
                    color: #172033;
                }

                .gaf-event-show-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    gap: 22px;
                    margin-bottom: 25px;
                }

                .gaf-event-show-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 17px;
                }

                .gaf-event-show-breadcrumb a {
                    color: #788397;
                    text-decoration: none;
                }

                .gaf-event-show-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-event-show-breadcrumb .active {
                    color: #263247;
                    font-weight: 600;
                }

                .gaf-event-show-heading-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 47px;
                    height: 47px;
                    flex: 0 0 47px;
                    border-radius: 12px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-show-page-title {
                    color: #172033;
                    font-size: 24px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .gaf-event-show-page-subtitle {
                    margin-top: 5px;
                    color: #8791a1;
                    font-size: 12px;
                }

                .gaf-event-show-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .3px;
                    text-transform: uppercase;
                }

                .gaf-event-show-status-draft {
                    color: #667085;
                    background: #f0f2f5;
                }

                .gaf-event-show-status-published {
                    color: #23814d;
                    background: #e8f6ee;
                }

                .gaf-event-show-status-cancelled {
                    color: #c14b45;
                    background: #fff0ef;
                }

                .gaf-event-show-status-completed {
                    color: #20603d;
                    background: #eff6f2;
                }

                .gaf-event-show-header-actions {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .gaf-event-show-header-actions .btn {
                    min-height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    padding: 0 14px;
                    font-size: 12px;
                    font-weight: 650;
                    transition: all .2s ease;
                }

                .gaf-event-show-btn-back {
                    border: 1px solid #e1e6ee;
                    color: #536075;
                    background: #fff;
                }

                .gaf-event-show-btn-back:hover {
                    background: #f5f7fa;
                    color: #263247;
                }

                .gaf-event-show-btn-edit {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-event-show-btn-edit:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-event-show-btn-gallery {
                    border: 1px solid #deeee5;
                    background: #f5f8fc;
                    color: #174a2f;
                }

                .gaf-event-show-btn-gallery:hover {
                    background: #eff6f2;
                    color: #174a2f;
                }

                /* Summary */

                .gaf-event-show-summary {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    padding: 17px 21px;
                    margin-bottom: 23px;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-event-show-summary-main {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    min-width: 0;
                }

                .gaf-event-show-summary-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    flex: 0 0 40px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #f0f5fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-show-summary-label,
                .gaf-event-show-summary-date > span {
                    display: block;
                    margin-bottom: 3px;
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .8px;
                }

                .gaf-event-show-summary-title {
                    overflow: hidden;
                    margin-bottom: 4px;
                    color: #263247;
                    font-size: 14px;
                    font-weight: 700;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-event-show-summary-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    color: #8490a1;
                    font-size: 11px;
                }

                .gaf-event-featured-label {
                    color: #b58127;
                    font-weight: 650;
                }

                .gaf-event-show-summary-date {
                    padding-left: 22px;
                    border-left: 1px solid #edf0f4;
                    text-align: right;
                    flex-shrink: 0;
                }

                .gaf-event-show-summary-date strong {
                    color: #344158;
                    font-size: 12px;
                    font-weight: 700;
                }

                /* Content layout */

                .gaf-event-show-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1.8fr) minmax(285px, .85fr);
                    align-items: start;
                    gap: 23px;
                }

                .gaf-event-show-main,
                .gaf-event-show-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .gaf-event-show-card,
                .gaf-event-show-cover-card {
                    overflow: hidden;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                /* Cover */

                .gaf-event-show-cover-card {
                    position: relative;
                    min-height: 250px;
                    background: #eaf0f7;
                }

                .gaf-event-show-cover {
                    display: block;
                    width: 100%;
                    height: 340px;
                    object-fit: cover;
                }

                .gaf-event-show-cover-placeholder {
                    display: flex;
                    min-height: 280px;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 10px;
                    color: #8996a8;
                    background: #eef3f9;
                    font-size: 12px;
                }

                .gaf-event-show-cover-placeholder i {
                    font-size: 38px;
                    color: #9aacc2;
                }

                .gaf-event-show-cover-caption {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 55px 23px 20px;
                    color: #fff;
                    background: rgba(15, 26, 44, 0.7);
                }

                .gaf-event-cover-eyebrow {
                    display: block;
                    margin-bottom: 5px;
                    color: rgba(255,255,255,.8);
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: 1.5px;
                }

                .gaf-event-show-cover-caption h2 {
                    margin: 0;
                    color: #fff;
                    font-size: 22px;
                    font-weight: 750;
                    line-height: 1.35;
                }

                .gaf-event-cover-featured {
                    flex-shrink: 0;
                    padding: 7px 11px;
                    border: 1px solid rgba(255,255,255,.3);
                    border-radius: 20px;
                    background: rgba(255,255,255,.16);
                    color: #fff;
                    font-size: 10px;
                    font-weight: 650;
                    backdrop-filter: blur(8px);
                }

                /* Section headings */

                .gaf-event-show-card {
                    padding: 22px;
                }

                .gaf-event-show-section-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .gaf-event-show-section-icon {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    flex: 0 0 38px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 16px;
                }

                .gaf-event-show-section-heading h5 {
                    margin: 0 0 3px;
                    color: #263247;
                    font-size: 14px;
                    font-weight: 750;
                }

                .gaf-event-show-section-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                }

                .gaf-event-show-excerpt {
                    margin-bottom: 18px;
                    padding: 14px 16px;
                    border-left: 3px solid #20603d;
                    border-radius: 0 7px 7px 0;
                    background: #f5f8fc;
                    color: #48566b;
                    font-size: 13px;
                    font-weight: 550;
                    line-height: 1.8;
                }

                .gaf-event-show-description {
                    color: #5d6879;
                    font-size: 13px;
                    line-height: 1.85;
                    overflow-wrap: anywhere;
                }

                .gaf-event-rich-content {
                    color: #5d6879;
                    line-height: 1.85;
                }

                .gaf-event-rich-content > *:last-child {
                    margin-bottom: 0;
                }

                .gaf-event-rich-content h1,
                .gaf-event-rich-content h2,
                .gaf-event-rich-content h3,
                .gaf-event-rich-content h4,
                .gaf-event-rich-content h5,
                .gaf-event-rich-content h6 {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    color: #263247;
                    font-weight: 700;
                }

                .gaf-event-rich-content h2 {
                    font-size: 20px;
                }

                .gaf-event-rich-content h3 {
                    font-size: 17px;
                }

                .gaf-event-rich-content h4 {
                    font-size: 15px;
                }

                .gaf-event-rich-content p {
                    margin-bottom: 13px;
                }

                .gaf-event-rich-content ul,
                .gaf-event-rich-content ol {
                    padding-left: 23px;
                    margin-bottom: 15px;
                }

                .gaf-event-rich-content li {
                    margin-bottom: 5px;
                }

                .gaf-event-rich-content blockquote {
                    margin: 17px 0;
                    padding: 12px 17px;
                    border-left: 3px solid #93c8aa;
                    background: #f5f8fc;
                    color: #65758b;
                }

                .gaf-event-rich-content a {
                    color: #20603d;
                    text-decoration: underline;
                }

                .gaf-event-rich-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .gaf-event-rich-content table {
                    width: 100%;
                    margin: 15px 0;
                    border-collapse: collapse;
                }

                .gaf-event-rich-content th,
                .gaf-event-rich-content td {
                    padding: 9px;
                    border: 1px solid #e5eaf0;
                    text-align: left;
                }

                .gaf-event-plain-content {
                    white-space: pre-line;
                }

                .gaf-event-empty-text {
                    margin: 0;
                    color: #9aa3b0;
                    font-size: 12px;
                    font-style: italic;
                }

                /* Agenda */

                .gaf-event-agenda-list {
                    position: relative;
                    padding-left: 4px;
                }

                .gaf-event-agenda-item {
                    position: relative;
                    display: flex;
                    gap: 15px;
                    padding-bottom: 24px;
                }

                .gaf-event-agenda-item:last-child {
                    padding-bottom: 0;
                }

                .gaf-event-agenda-item:not(:last-child)::before {
                    position: absolute;
                    top: 36px;
                    bottom: 0;
                    left: 17px;
                    width: 1px;
                    background: #e5f1ea;
                    content: "";
                }

                .gaf-event-agenda-marker {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    width: 35px;
                    height: 35px;
                    flex: 0 0 35px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e2f0e8;
                    border-radius: 50%;
                    background: #f0f5fb;
                    color: #20603d;
                    font-size: 12px;
                    font-weight: 750;
                }

                .gaf-event-agenda-content {
                    min-width: 0;
                    padding-top: 1px;
                }

                .gaf-event-agenda-time {
                    margin-bottom: 5px;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 650;
                }

                .gaf-event-agenda-content h6 {
                    margin-bottom: 5px;
                    color: #29364a;
                    font-size: 13px;
                    font-weight: 700;
                }

                .gaf-event-agenda-content p {
                    margin: 0;
                    color: #8791a0;
                    font-size: 12px;
                    line-height: 1.7;
                }

                .gaf-event-empty-state {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 7px;
                    padding: 25px 15px;
                    border: 1px dashed #e1e7ef;
                    border-radius: 9px;
                    text-align: center;
                }

                .gaf-event-empty-state i {
                    margin-bottom: 3px;
                    color: #9ba9ba;
                    font-size: 25px;
                }

                .gaf-event-empty-state strong {
                    color: #536075;
                    font-size: 12px;
                }

                .gaf-event-empty-state span {
                    color: #98a1af;
                    font-size: 11px;
                }

                /* Related program */

                .gaf-event-related-program {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 15px;
                    border: 1px solid #e8edf3;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .gaf-event-related-program-icon {
                    display: flex;
                    width: 39px;
                    height: 39px;
                    flex: 0 0 39px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-related-program > div:last-child {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-event-related-program strong {
                    color: #344158;
                    font-size: 12px;
                }

                .gaf-event-related-program span {
                    color: #909aaa;
                    font-size: 11px;
                }

                /* Registration */

                .gaf-event-registration-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 19px;
                    border: 1px solid #e4f1ea;
                    border-radius: 11px;
                    background: #f5f8fc;
                }

                .gaf-event-registration-icon {
                    display: flex;
                    width: 40px;
                    height: 40px;
                    flex: 0 0 40px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #eaf4ee;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-registration-content {
                    flex: 1;
                    min-width: 0;
                }

                .gaf-event-registration-content h5 {
                    margin-bottom: 4px;
                    color: #29364a;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-event-registration-content p {
                    margin: 0;
                    color: #8290a2;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .gaf-event-registration-btn {
                    flex-shrink: 0;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 650;
                }

                .gaf-event-registration-btn:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                }

                /* Sidebar */

                .gaf-event-sidebar-card {
                    padding: 19px;
                }

                .gaf-event-sidebar-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 19px;
                    padding-bottom: 14px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-event-sidebar-icon {
                    display: flex;
                    width: 32px;
                    height: 32px;
                    flex: 0 0 32px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-sidebar-heading h6 {
                    margin: 0;
                    color: #344158;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-event-schedule {
                    padding-left: 5px;
                }

                .gaf-event-schedule-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }

                .gaf-event-schedule-dot {
                    width: 10px;
                    height: 10px;
                    flex: 0 0 10px;
                    margin-top: 4px;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #acd4bd;
                }

                .gaf-event-dot-start {
                    background: #20603d;
                }

                .gaf-event-dot-end {
                    background: #8a9bb1;
                    box-shadow: 0 0 0 2px #d0d8e3;
                }

                .gaf-event-schedule-item > div {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    min-width: 0;
                }

                .gaf-event-schedule-item span:not(.gaf-event-schedule-dot) {
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .5px;
                }

                .gaf-event-schedule-item strong {
                    color: #445168;
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1.6;
                }

                .gaf-event-schedule-line {
                    width: 1px;
                    height: 24px;
                    margin: 3px 0 3px 9px;
                    background: #deeee5;
                }

                .gaf-event-sidebar-info {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    margin-top: 19px;
                    padding: 12px;
                    border-radius: 8px;
                    background: #f6f8fb;
                    color: #7890ad;
                }

                .gaf-event-sidebar-info > i {
                    font-size: 15px;
                }

                .gaf-event-sidebar-info > div {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .gaf-event-sidebar-info span {
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 700;
                }

                .gaf-event-sidebar-info strong {
                    color: #4a576d;
                    font-size: 11px;
                }

                /* Location */

                .gaf-event-location {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 16px;
                }

                .gaf-event-location strong {
                    color: #344158;
                    font-size: 13px;
                    font-weight: 700;
                }

                .gaf-event-location p {
                    margin: 0;
                    color: #8490a1;
                    font-size: 11px;
                    line-height: 1.65;
                }

                .gaf-event-map-link {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding-top: 13px;
                    border-top: 1px solid #edf0f4;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .gaf-event-map-link:hover {
                    color: #174a2f;
                }

                /* Classification */

                .gaf-event-detail-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    padding: 10px 0;
                    border-bottom: 1px solid #f0f2f5;
                }

                .gaf-event-detail-row:first-of-type {
                    padding-top: 0;
                }

                .gaf-event-detail-row:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-detail-row > span:first-child {
                    color: #8993a2;
                    font-size: 11px;
                }

                .gaf-event-detail-row strong {
                    color: #465268;
                    font-size: 11px;
                    font-weight: 650;
                    text-align: right;
                }

                .gaf-event-category-badge {
                    max-width: 150px;
                    padding: 5px 9px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    text-align: right;
                }

                .gaf-event-yes {
                    color: #278451 !important;
                }

                .gaf-event-detail-value {
                    max-width: 155px;
                    overflow-wrap: anywhere;
                }

                /* Record information */

                .gaf-event-record-item {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 11px 0;
                    border-bottom: 1px solid #f0f2f5;
                }

                .gaf-event-record-item:first-of-type {
                    padding-top: 0;
                }

                .gaf-event-record-item:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-record-item span {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-record-item strong {
                    color: #465268;
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1.6;
                }

                .gaf-event-record-item .gaf-event-slug {
                    overflow-wrap: anywhere;
                    color: #20603d;
                    font-size: 10px;
                }

                /* Quick actions */

                .gaf-event-quick-actions {
                    padding: 18px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: #fff;
                }

                .gaf-event-quick-actions > span {
                    display: block;
                    margin-bottom: 12px;
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .8px;
                }

                .gaf-event-quick-actions a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 11px 0;
                    border-bottom: 1px solid #f0f2f5;
                    color: #536075;
                    font-size: 11px;
                    font-weight: 600;
                    text-decoration: none;
                }

                .gaf-event-quick-actions a:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-quick-actions a > i:first-child {
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-quick-actions a:hover {
                    color: #20603d;
                }

                .gaf-event-quick-actions a > i:last-child {
                    color: #a5afbd;
                    font-size: 10px;
                }

                @media (max-width: 1100px) {
                    .gaf-event-show-layout {
                        grid-template-columns: minmax(0, 1.5fr) minmax(260px, .9fr);
                    }

                    .gaf-event-show-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }
                }

                @media (max-width: 850px) {
                    .gaf-event-show-layout {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-event-show-sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        align-items: start;
                    }

                    .gaf-event-quick-actions {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 600px) {
                    .gaf-event-show-page-title {
                        font-size: 20px;
                    }

                    .gaf-event-show-header-actions {
                        display: grid;
                        width: 100%;
                        grid-template-columns: 1fr 1fr;
                    }

                    .gaf-event-show-header-actions .btn {
                        width: 100%;
                        padding: 0 8px;
                        font-size: 11px;
                    }

                    .gaf-event-show-btn-gallery {
                        grid-column: 1 / -1;
                    }

                    .gaf-event-show-summary {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-event-show-summary-date {
                        width: 100%;
                        padding: 12px 0 0;
                        border-top: 1px solid #edf0f4;
                        border-left: 0;
                        text-align: left;
                    }

                    .gaf-event-show-cover {
                        height: 240px;
                    }

                    .gaf-event-show-cover-caption {
                        padding: 45px 16px 16px;
                    }

                    .gaf-event-show-cover-caption h2 {
                        font-size: 17px;
                    }

                    .gaf-event-show-card {
                        padding: 17px;
                    }

                    .gaf-event-show-sidebar {
                        display: flex;
                    }

                    .gaf-event-registration-card {
                        align-items: flex-start;
                        flex-wrap: wrap;
                    }

                    .gaf-event-registration-content {
                        flex-basis: calc(100% - 60px);
                    }

                    .gaf-event-registration-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
