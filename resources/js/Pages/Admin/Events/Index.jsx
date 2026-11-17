
import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const formatDate = (value) => {
    if (!value) return "Not scheduled";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Not scheduled";

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const statusConfig = {
    draft: {
        label: "Draft",
        className: "gaf-event-status--draft",
        icon: "bi-file-earmark",
    },
    published: {
        label: "Published",
        className: "gaf-event-status--published",
        icon: "bi-check-circle",
    },
    cancelled: {
        label: "Cancelled",
        className: "gaf-event-status--cancelled",
        icon: "bi-x-circle",
    },
};

export default function Index({
    events,
    filters = {},
    categories = [],
    stats = {},
}) {
    const { flash } = usePage().props;

    const eventList = events?.data || [];

    const applyFilters = (key, value) => {
        router.get(
            route("admin.events.index"),
            {
                ...filters,
                [key]: value,
                page: 1,
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
            route("admin.events.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const hasFilters = Boolean(
        filters.search ||
        filters.status ||
        filters.category ||
        filters.date_filter
    );

    const deleteEvent = (event) => {
        if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
            return;
        }

        router.delete(route("admin.events.destroy", event.id), {
            preserveScroll: true,
        });
    };

    const statItems = [
        {
            label: "Total events",
            value: stats.total || 0,
            icon: "bi-calendar-event",
            color: "blue",
            description: "All recorded events",
        },
        {
            label: "Published",
            value: stats.published || 0,
            icon: "bi-check-circle",
            color: "green",
            description: "Visible to the public",
        },
        {
            label: "Drafts",
            value: stats.draft || 0,
            icon: "bi-file-earmark-text",
            color: "orange",
            description: "Awaiting publication",
        },
        {
            label: "Upcoming",
            value: stats.upcoming || 0,
            icon: "bi-clock-history",
            color: "purple",
            description: "Scheduled events",
        },
    ];

    return (
        <AdminLayout title="Events">
            <Head title="Events" />

            <div className="gaf-events-page">
                {/* Page heading */}
                <div className="gaf-events-heading">
                    <div>
                        <div className="gaf-events-eyebrow">
                            CONTENT MANAGEMENT
                        </div>

                        <h2>Events</h2>

                        <p>
                            Organise GAF Rwanda events, manage schedules and
                            keep your audience informed.
                        </p>
                    </div>

                    <Link
                        href={route("admin.events.create")}
                        className="gaf-events-create-btn"
                    >
                        <i className="bi bi-plus-lg" />
                        <span>Create event</span>
                    </Link>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="alert alert-success alert-dismissible fade show gaf-events-alert">
                        <i className="bi bi-check-circle-fill me-2" />
                        {flash.success}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        />
                    </div>
                )}

                {flash?.error && (
                    <div className="alert alert-danger alert-dismissible fade show gaf-events-alert">
                        <i className="bi bi-exclamation-circle-fill me-2" />
                        {flash.error}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        />
                    </div>
                )}

                {/* Statistics */}
                <div className="gaf-events-stats">
                    {statItems.map((item) => (
                        <div className="gaf-event-stat" key={item.label}>
                            <div className="gaf-event-stat-top">
                                <span>{item.label}</span>

                                <div className={`gaf-event-stat-icon ${item.color}`}>
                                    <i className={`bi ${item.icon}`} />
                                </div>
                            </div>

                            <div className="gaf-event-stat-value">
                                {Number(item.value).toLocaleString()}
                            </div>

                            <div className="gaf-event-stat-description">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <section className="gaf-events-filter-card">
                    <div className="gaf-events-filter-heading">
                        <div>
                            <h5>
                                <i className="bi bi-funnel me-2" />
                                Filter events
                            </h5>
                            <p>Find events using the available filters.</p>
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                className="gaf-events-clear-btn"
                                onClick={clearFilters}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1" />
                                Clear filters
                            </button>
                        )}
                    </div>

                    <div className="gaf-events-filter-grid">
                        <div className="gaf-events-search">
                            <label htmlFor="event-search">Search events</label>

                            <div className="gaf-events-search-input">
                                <i className="bi bi-search" />

                                <input
                                    id="event-search"
                                    type="search"
                                    placeholder="Search by title, venue or city..."
                                    value={filters.search || ""}
                                    onChange={(e) =>
                                        applyFilters("search", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="event-status">Status</label>

                            <select
                                id="event-status"
                                className="gaf-events-select"
                                value={filters.status || ""}
                                onChange={(e) =>
                                    applyFilters("status", e.target.value)
                                }
                            >
                                <option value="">All statuses</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="event-category">Category</label>

                            <select
                                id="event-category"
                                className="gaf-events-select"
                                value={filters.category || ""}
                                onChange={(e) =>
                                    applyFilters("category", e.target.value)
                                }
                            >
                                <option value="">All categories</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="event-date">Event date</label>

                            <select
                                id="event-date"
                                className="gaf-events-select"
                                value={filters.date_filter || ""}
                                onChange={(e) =>
                                    applyFilters("date_filter", e.target.value)
                                }
                            >
                                <option value="">All dates</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past events</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Event listing */}
                <section className="gaf-events-list-card">
                    <div className="gaf-events-list-header">
                        <div>
                            <h5>All events</h5>
                            <p>
                                Manage your events and their publication status.
                            </p>
                        </div>

                        <span className="gaf-events-count">
                            {Number(events?.total || 0).toLocaleString()} events
                        </span>
                    </div>

                    {eventList.length > 0 ? (
                        <>
                            <div className="table-responsive">
                                <table className="table gaf-events-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="event-column">Event</th>
                                            <th>Category</th>
                                            <th>Schedule</th>
                                            <th>Status</th>
                                            <th>Featured</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {eventList.map((event) => {
                                            const status =
                                                statusConfig[event.status] ||
                                                statusConfig.draft;

                                            const categoryColor =
                                                event.category?.color || "#20603d";

                                            return (
                                                <tr key={event.id}>
                                                    <td>
                                                        <div className="gaf-event-identity">
                                                            <div className="gaf-event-cover">
                                                                {event.cover_image ? (
                                                                    <img
                                                                        src={`/uploads/${event.cover_image}`}
                                                                        alt={event.title}
                                                                    />
                                                                ) : (
                                                                    <div className="gaf-event-cover-placeholder">
                                                                        <i className="bi bi-calendar-event" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="gaf-event-name">
                                                                <Link
                                                                    href={route(
                                                                        "admin.events.show",
                                                                        event.id
                                                                    )}
                                                                >
                                                                    {event.title}
                                                                </Link>

                                                                <span>
                                                                    <i className="bi bi-geo-alt me-1" />
                                                                    {event.venue ||
                                                                        event.city ||
                                                                        "Location not specified"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {event.category ? (
                                                            <span className="gaf-event-category">
                                                                <span
                                                                    className="gaf-event-category-dot"
                                                                    style={{
                                                                        backgroundColor:
                                                                            categoryColor,
                                                                    }}
                                                                />
                                                                {event.category.name}
                                                            </span>
                                                        ) : (
                                                            <span className="gaf-event-muted">
                                                                Uncategorized
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <div className="gaf-event-date">
                                                            <span>
                                                                {formatDate(event.starts_at)}
                                                            </span>

                                                            <small>
                                                                {event.city ||
                                                                    event.country ||
                                                                    "Location not specified"}
                                                            </small>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`gaf-event-status ${status.className}`}
                                                        >
                                                            <i className={`bi ${status.icon}`} />
                                                            {status.label}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {event.is_featured ? (
                                                            <span className="gaf-event-featured">
                                                                <i className="bi bi-star-fill" />
                                                                Featured
                                                            </span>
                                                        ) : (
                                                            <span className="gaf-event-muted">
                                                                Standard
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <div className="gaf-event-actions">
                                                            <Link
                                                                href={route(
                                                                    "admin.events.show",
                                                                    event.id
                                                                )}
                                                                className="gaf-event-action"
                                                                title="View event"
                                                                aria-label="View event"
                                                            >
                                                                <i className="bi bi-eye" />
                                                            </Link>

                                                            <Link
                                                                href={route(
                                                                    "admin.events.edit",
                                                                    event.id
                                                                )}
                                                                className="gaf-event-action edit"
                                                                title="Edit event"
                                                                aria-label="Edit event"
                                                            >
                                                                <i className="bi bi-pencil" />
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                className="gaf-event-action delete"
                                                                title="Delete event"
                                                                aria-label="Delete event"
                                                                onClick={() =>
                                                                    deleteEvent(event)
                                                                }
                                                            >
                                                                <i className="bi bi-trash3" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {events?.links && events.links.length > 3 && (
                                <div className="gaf-events-pagination">
                                    <span>
                                        Showing{" "}
                                        <strong>{events.from || 0}–{events.to || 0}</strong>{" "}
                                        of <strong>{events.total || 0}</strong> events
                                    </span>

                                    <div className="gaf-events-pagination-links">
                                        {events.links.map((link, index) => (
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
                                                className={[
                                                    "gaf-events-page-link",
                                                    link.active ? "active" : "",
                                                    !link.url ? "disabled" : "",
                                                ].join(" ")}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="gaf-events-empty">
                            <div className="gaf-events-empty-icon">
                                <i className="bi bi-calendar2-x" />
                            </div>

                            <h5>No events found</h5>

                            <p>
                                {hasFilters
                                    ? "No events match your current filters. Try adjusting your search."
                                    : "There are no events available yet. Create your first event to get started."}
                            </p>

                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                                {hasFilters && (
                                    <button
                                        type="button"
                                        className="btn btn-light border"
                                        onClick={clearFilters}
                                    >
                                        Clear filters
                                    </button>
                                )}

                                <Link
                                    href={route("admin.events.create")}
                                    className="gaf-events-create-btn"
                                >
                                    <i className="bi bi-plus-lg" />
                                    Create event
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <style>{`
                .gaf-events-page {
                    width: 100%;
                    min-width: 0;
                    color: #172033;
                }

                .gaf-events-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 24px;
                    margin-bottom: 26px;
                }

                .gaf-events-eyebrow {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    margin-bottom: 7px;
                }

                .gaf-events-heading h2 {
                    color: #172033;
                    font-size: 27px;
                    font-weight: 750;
                    letter-spacing: -0.8px;
                    margin: 0 0 6px;
                }

                .gaf-events-heading p {
                    color: #7b8494;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-events-create-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    min-height: 43px;
                    padding: 0 17px;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                    white-space: nowrap;
                    transition: background .2s ease, transform .2s ease;
                }

                .gaf-events-create-btn:hover {
                    background: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .gaf-events-alert {
                    border-radius: 8px;
                    font-size: 13px;
                    margin-bottom: 20px;
                }

                .gaf-events-stats {
                    display: grid !important;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 16px;
                    margin-bottom: 22px;
                    width: 100%;
                }

                .gaf-event-stat {
                    min-width: 0;
                    padding: 19px 20px;
                    border: 1px solid #e9edf3;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-event-stat-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    color: #7c8798;
                    font-size: 12px;
                    font-weight: 600;
                }

                .gaf-event-stat-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 37px;
                    height: 37px;
                    border-radius: 8px;
                    font-size: 17px;
                }

                .gaf-event-stat-icon.blue {
                    color: #20603d;
                    background: #f1f8f4;
                }

                .gaf-event-stat-icon.green {
                    color: #27966a;
                    background: #eaf7f0;
                }

                .gaf-event-stat-icon.orange {
                    color: #c77b31;
                    background: #fff4e8;
                }

                .gaf-event-stat-icon.purple {
                    color: #8064bb;
                    background: #f2effb;
                }

                .gaf-event-stat-value {
                    margin-top: 12px;
                    color: #172033;
                    font-size: 27px;
                    line-height: 1.2;
                    font-weight: 750;
                    letter-spacing: -.7px;
                }

                .gaf-event-stat-description {
                    margin-top: 5px;
                    color: #9aa2af;
                    font-size: 11px;
                }

                .gaf-events-filter-card,
                .gaf-events-list-card {
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 9px;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                    margin-bottom: 20px;
                    min-width: 0;
                }

                .gaf-events-filter-card {
                    padding: 20px;
                }

                .gaf-events-filter-heading,
                .gaf-events-list-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                }

                .gaf-events-filter-heading {
                    margin-bottom: 18px;
                }

                .gaf-events-filter-heading h5,
                .gaf-events-list-header h5 {
                    color: #202c40;
                    font-size: 14px;
                    font-weight: 750;
                    margin: 0 0 5px;
                }

                .gaf-events-filter-heading p,
                .gaf-events-list-header p {
                    color: #929baa;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-events-clear-btn {
                    border: 0;
                    background: transparent;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-events-clear-btn:hover {
                    color: #174a2f;
                }

                .gaf-events-filter-grid {
                    display: grid !important;
                    grid-template-columns: minmax(220px, 1.7fr) repeat(3, minmax(130px, 1fr));
                    gap: 15px;
                    align-items: end;
                    width: 100%;
                }

                .gaf-events-filter-grid label {
                    display: block;
                    color: #596579;
                    font-size: 11px;
                    font-weight: 700;
                    margin-bottom: 7px;
                }

                .gaf-events-search-input {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    height: 40px;
                    padding: 0 12px;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    background: #fff;
                }

                .gaf-events-search-input:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-events-search-input i {
                    color: #a0a9b6;
                    font-size: 13px;
                }

                .gaf-events-search-input input {
                    width: 100%;
                    min-width: 0;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    color: #273348;
                    font-size: 11px;
                }

                .gaf-events-search-input input::placeholder {
                    color: #a6aebb;
                }

                .gaf-events-select {
                    width: 100%;
                    height: 40px;
                    padding: 0 30px 0 11px;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    outline: none;
                    background-color: #fff;
                    color: #536075;
                    font-size: 11px;
                }

                .gaf-events-select:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-events-list-card {
                    overflow: hidden;
                }

                .gaf-events-list-header {
                    padding: 19px 21px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-events-count {
                    padding: 6px 10px;
                    border-radius: 5px;
                    background: #f1f5fa;
                    color: #5d789c;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-events-table {
                    min-width: 850px;
                    color: #344054;
                }

                .gaf-events-table thead th {
                    padding: 13px 14px;
                    border-bottom: 1px solid #edf0f4;
                    background: #fafbfd;
                    color: #8791a1;
                    font-size: 10px;
                    font-weight: 750;
                    letter-spacing: .45px;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .gaf-events-table thead th:first-child,
                .gaf-events-table tbody td:first-child {
                    padding-left: 21px;
                }

                .gaf-events-table thead th:last-child,
                .gaf-events-table tbody td:last-child {
                    padding-right: 21px;
                }

                .gaf-events-table tbody td {
                    padding: 14px;
                    border-bottom: 1px solid #f0f2f5;
                    font-size: 11px;
                    vertical-align: middle;
                }

                .gaf-events-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .gaf-events-table tbody tr:hover {
                    background: #fbfcfe;
                }

                .gaf-event-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 220px;
                }

                .gaf-event-cover {
                    flex: 0 0 58px;
                    width: 58px;
                    height: 48px;
                    overflow: hidden;
                    border-radius: 6px;
                    background: #f0f3f7;
                }

                .gaf-event-cover img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gaf-event-cover-placeholder {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                    color: #8ba1bd;
                    font-size: 19px;
                }

                .gaf-event-name {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    min-width: 0;
                }

                .gaf-event-name a {
                    max-width: 250px;
                    overflow: hidden;
                    color: #26344a;
                    font-size: 11px;
                    font-weight: 750;
                    line-height: 1.4;
                    text-decoration: none;
                    text-overflow: ellipsis;
                }

                .gaf-event-name a:hover {
                    color: #20603d;
                }

                .gaf-event-name span {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-category {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #596579;
                    font-size: 10px;
                    font-weight: 650;
                    white-space: nowrap;
                }

                .gaf-event-category-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    flex: 0 0 7px;
                }

                .gaf-event-date {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    white-space: nowrap;
                }

                .gaf-event-date span {
                    color: #455166;
                    font-size: 10px;
                    font-weight: 650;
                }

                .gaf-event-date small {
                    color: #9aa2af;
                    font-size: 10px;
                }

                .gaf-event-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 5px;
                    font-size: 9px;
                    font-weight: 750;
                    white-space: nowrap;
                }

                .gaf-event-status--draft {
                    color: #778294;
                    background: #f0f2f5;
                }

                .gaf-event-status--published {
                    color: #25845f;
                    background: #eaf6ef;
                }

                .gaf-event-status--cancelled {
                    color: #c35454;
                    background: #fceeee;
                }

                .gaf-event-featured {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    color: #b9822e;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-event-featured i {
                    font-size: 11px;
                }

                .gaf-event-muted {
                    color: #a1a9b5;
                    font-size: 10px;
                }

                .gaf-event-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 5px;
                }

                .gaf-event-action {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #e9edf2;
                    border-radius: 5px;
                    background: #fff;
                    color: #748196;
                    font-size: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all .15s ease;
                }

                .gaf-event-action:hover {
                    border-color: #cfe5d9;
                    background: #f1f6fc;
                    color: #20603d;
                }

                .gaf-event-action.edit:hover {
                    border-color: #cfe5d9;
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-event-action.delete:hover {
                    border-color: #f1d0d0;
                    background: #fff1f1;
                    color: #c44e4e;
                }

                .gaf-events-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 15px 21px;
                    border-top: 1px solid #edf0f4;
                }

                .gaf-events-pagination > span {
                    color: #8993a2;
                    font-size: 10px;
                }

                .gaf-events-pagination > span strong {
                    color: #4a566a;
                }

                .gaf-events-pagination-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                }

                .gaf-events-page-link {
                    min-width: 29px;
                    height: 29px;
                    padding: 0 8px;
                    border: 1px solid #e8ecf1;
                    border-radius: 5px;
                    background: #fff;
                    color: #6c788b;
                    font-size: 10px;
                    cursor: pointer;
                }

                .gaf-events-page-link.active {
                    border-color: #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-events-page-link.disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                .gaf-events-empty {
                    padding: 55px 20px;
                    text-align: center;
                }

                .gaf-events-empty-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 62px;
                    height: 62px;
                    margin: 0 auto 16px;
                    border-radius: 50%;
                    background: #f0f4f9;
                    color: #20603d;
                    font-size: 25px;
                }

                .gaf-events-empty h5 {
                    color: #26344a;
                    font-size: 15px;
                    font-weight: 750;
                }

                .gaf-events-empty p {
                    max-width: 390px;
                    margin: 7px auto 20px;
                    color: #929baa;
                    font-size: 12px;
                    line-height: 1.7;
                }

                @media (max-width: 1100px) {
                    .gaf-events-filter-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .gaf-events-stats {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (max-width: 767px) {
                    .gaf-events-heading {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .gaf-events-heading h2 {
                        font-size: 23px;
                    }

                    .gaf-events-create-btn {
                        min-height: 40px;
                    }

                    .gaf-events-filter-card {
                        padding: 16px;
                    }

                    .gaf-events-filter-grid {
                        grid-template-columns: minmax(0, 1fr);
                        gap: 12px;
                    }

                    .gaf-events-list-header {
                        padding: 16px;
                    }

                    .gaf-events-pagination {
                        align-items: flex-start;
                        flex-direction: column;
                        padding: 14px 16px;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-events-stats {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-events-filter-heading {
                        align-items: flex-start;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
