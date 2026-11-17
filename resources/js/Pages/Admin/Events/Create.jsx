
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EventForm from "./EventForm";

export default function Create({
    categories = [],
    programs = [],
    newsArticles = [],
}) {
    return (
        <AdminLayout title="Create Event">
            <Head title="Create Event" />

            <div className="gaf-event-create-page">
                <div className="gaf-event-create-header">
                    <div>
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
                                <li className="breadcrumb-item active">
                                    Create event
                                </li>
                            </ol>
                        </nav>

                        <div className="gaf-event-create-title">
                            <div className="gaf-event-create-icon">
                                <i className="bi bi-calendar2-plus" />
                            </div>

                            <div>
                                <h2>Create a new event</h2>
                                <p>
                                    Add the event details, schedule and
                                    information for your audience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("admin.events.index")}
                        className="gaf-event-back-link"
                    >
                        <i className="bi bi-arrow-left" />
                        Back to events
                    </Link>
                </div>

                <div className="gaf-event-create-note">
                    <i className="bi bi-info-circle" />
                    <span>
                        Fields marked with <strong>*</strong> are required.
                        You can save your event as a draft before publishing.
                    </span>
                </div>

                <EventForm
                    mode="create"
                    categories={categories}
                    programs={programs}
                    newsArticles={newsArticles}
                />
            </div>

            <style>{`
                .gaf-event-create-page {
                    width: 100%;
                    min-width: 0;
                }

                .gaf-event-create-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 20px;
                    margin-bottom: 22px;
                }

                .gaf-event-breadcrumb {
                    margin-bottom: 16px;
                    font-size: 10px;
                }

                .gaf-event-breadcrumb a {
                    color: #8290a3;
                    text-decoration: none;
                }

                .gaf-event-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-event-breadcrumb .active {
                    color: #4b5870;
                }

                .gaf-event-create-title {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .gaf-event-create-icon {
                    display: flex;
                    width: 48px;
                    height: 48px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-create-title h2 {
                    margin: 0 0 5px;
                    color: #172033;
                    font-size: 23px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .gaf-event-create-title p {
                    margin: 0;
                    color: #8993a2;
                    font-size: 11px;
                }

                .gaf-event-back-link {
                    display: inline-flex;
                    min-height: 37px;
                    align-items: center;
                    gap: 8px;
                    padding: 0 12px;
                    border: 1px solid #e2e7ee;
                    border-radius: 6px;
                    background: #fff;
                    color: #627087;
                    font-size: 10px;
                    font-weight: 700;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .gaf-event-back-link:hover {
                    border-color: #cce4d6;
                    background: #f7f9fc;
                    color: #20603d;
                }

                .gaf-event-create-note {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin-bottom: 20px;
                    padding: 12px 15px;
                    border: 1px solid #e5f1ea;
                    border-radius: 7px;
                    background: #f7faff;
                    color: #71829a;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-event-create-note i {
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-create-note strong {
                    color: #d45c5c;
                }

                @media (max-width: 650px) {
                    .gaf-event-create-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-event-create-title h2 {
                        font-size: 20px;
                    }

                    .gaf-event-create-title p {
                        line-height: 1.6;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
