import React from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EventForm from "./EventForm";

export default function Edit({
    event,
    categories = [],
    programs = [],
    newsArticles = [],
}) {
    return (
        <AdminLayout title={`Edit ${event.title}`}>
            <div className="gaf-event-edit-page">
                <div className="gaf-event-edit-header">
                    <div className="gaf-event-edit-heading">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb gaf-event-breadcrumb">
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
                                    Edit Event
                                </li>
                            </ol>
                        </nav>

                        <div className="d-flex align-items-start gap-3">
                            <div className="gaf-event-edit-icon">
                                <i className="bi bi-calendar2-event" />
                            </div>

                            <div>
                                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                                    <h3 className="gaf-event-edit-title mb-0">
                                        Edit Event
                                    </h3>

                                    <span
                                        className={`gaf-event-status gaf-event-status-${event.status || "draft"}`}
                                    >
                                        <span className="gaf-event-status-dot" />
                                        {event.status
                                            ? event.status.replace("_", " ")
                                            : "Draft"}
                                    </span>
                                </div>

                                <p className="gaf-event-edit-subtitle mb-0">
                                    Update event details, schedule, location,
                                    registration information and related content.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="gaf-event-edit-actions">
                        <Link
                            href={route("admin.events.index")}
                            className="btn gaf-event-back-btn"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back to Events
                        </Link>
                    </div>
                </div>

                <div className="gaf-event-edit-context">
                    <div className="gaf-event-context-item">
                        <span className="gaf-event-context-icon">
                            <i className="bi bi-pencil-square" />
                        </span>

                        <div>
                            <span className="gaf-event-context-label">
                                Currently editing
                            </span>
                            <strong>{event.title}</strong>
                        </div>
                    </div>

                    <div className="gaf-event-context-divider" />

                    <div className="gaf-event-context-item">
                        <span className="gaf-event-context-icon">
                            <i className="bi bi-hash" />
                        </span>

                        <div>
                            <span className="gaf-event-context-label">
                                Event ID
                            </span>
                            <strong>#{event.id}</strong>
                        </div>
                    </div>

                    <div className="gaf-event-context-divider" />

                    <div className="gaf-event-context-item">
                        <span className="gaf-event-context-icon">
                            <i className="bi bi-globe2" />
                        </span>

                        <div>
                            <span className="gaf-event-context-label">
                                Visibility
                            </span>
                            <strong>
                                {event.status === "published"
                                    ? "Published"
                                    : "Not publicly published"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="gaf-event-edit-form">
                    <EventForm
                        mode="edit"
                        event={event}
                        categories={categories}
                        programs={programs}
                        newsArticles={newsArticles}
                    />
                </div>
            </div>

            <style>{`
                .gaf-event-edit-page {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 8px 0 32px;
                    color: #172033;
                }

                .gaf-event-edit-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 26px;
                }

                .gaf-event-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                .gaf-event-breadcrumb .breadcrumb-item a {
                    color: #718096;
                    text-decoration: none;
                    transition: color .2s ease;
                }

                .gaf-event-breadcrumb .breadcrumb-item a:hover {
                    color: #20603d;
                }

                .gaf-event-breadcrumb .breadcrumb-item.active {
                    color: #172033;
                    font-weight: 600;
                }

                .gaf-event-edit-icon {
                    width: 48px;
                    height: 48px;
                    flex: 0 0 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-edit-title {
                    color: #172033;
                    font-size: 25px;
                    font-weight: 750;
                    letter-spacing: -.6px;
                }

                .gaf-event-edit-subtitle {
                    max-width: 650px;
                    margin-top: 7px;
                    color: #788397;
                    font-size: 13px;
                    line-height: 1.7;
                }

                .gaf-event-back-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 42px;
                    padding: 0 16px;
                    border: 1px solid #e2e7ef;
                    border-radius: 9px;
                    background: #fff;
                    color: #465268;
                    font-size: 13px;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: all .2s ease;
                }

                .gaf-event-back-btn:hover {
                    border-color: #c1dfce;
                    background: #f5f8fc;
                    color: #20603d;
                }

                .gaf-event-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    background: #f0f2f5;
                    color: #647084;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .35px;
                    text-transform: uppercase;
                }

                .gaf-event-status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .gaf-event-status-published {
                    background: #e8f6ee;
                    color: #268451;
                }

                .gaf-event-status-draft {
                    background: #f0f2f5;
                    color: #697586;
                }

                .gaf-event-status-cancelled {
                    background: #fff0ef;
                    color: #c44c45;
                }

                .gaf-event-status-completed {
                    background: #eff6f2;
                    color: #20603d;
                }

                .gaf-event-edit-context {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 22px;
                    padding: 17px 21px;
                    margin-bottom: 26px;
                    border: 1px solid #e9edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-event-context-item {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    min-width: 150px;
                }

                .gaf-event-context-icon {
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 35px;
                    border-radius: 9px;
                    background: #f2f6fb;
                    color: #20603d;
                    font-size: 15px;
                }

                .gaf-event-context-item > div {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    min-width: 0;
                }

                .gaf-event-context-label {
                    color: #8993a3;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: .4px;
                    text-transform: uppercase;
                }

                .gaf-event-context-item strong {
                    overflow: hidden;
                    max-width: 260px;
                    color: #263247;
                    font-size: 12px;
                    font-weight: 650;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-event-context-divider {
                    width: 1px;
                    height: 30px;
                    background: #edf0f4;
                }

                .gaf-event-edit-form {
                    width: 100%;
                }

                @media (max-width: 767px) {
                    .gaf-event-edit-page {
                        padding-top: 2px;
                    }

                    .gaf-event-edit-header {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 17px;
                    }

                    .gaf-event-edit-title {
                        font-size: 21px;
                    }

                    .gaf-event-edit-actions,
                    .gaf-event-back-btn {
                        width: 100%;
                    }

                    .gaf-event-edit-context {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 15px;
                        padding: 16px;
                    }

                    .gaf-event-context-divider {
                        width: 100%;
                        height: 1px;
                    }

                    .gaf-event-context-item strong {
                        max-width: 100%;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}