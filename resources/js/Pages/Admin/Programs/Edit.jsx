
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ProgramForm from "./ProgramForm";

export default function Edit({ program }) {
    return (
        <AdminLayout>
            <Head title={`Edit ${program.title}`} />

            <div className="program-page">
                <div className="program-page-header">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb program-breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href={route("admin.dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href={route("admin.programs.index")}>
                                        Programs
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Edit
                                </li>
                            </ol>
                        </nav>

                        <div className="program-heading">
                            <div className="program-heading-icon">
                                <i className="bi bi-pencil-square" />
                            </div>
                            <div>
                                <h2>Edit Program</h2>
                                <p>
                                    Update the details, schedule and publishing
                                    settings for this program.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("admin.programs.index")}
                        className="program-back-link"
                    >
                        <i className="bi bi-arrow-left" />
                        Back to programs
                    </Link>
                </div>

                <ProgramForm mode="edit" program={program} />
            </div>

            <style>{`
                .program-page {
                    max-width: 1500px;
                    margin: 0 auto;
                }

                .program-page-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 26px;
                }

                .program-breadcrumb {
                    margin-bottom: 17px;
                    font-size: 11px;
                }

                .program-breadcrumb a {
                    color: #718096;
                    text-decoration: none;
                }

                .program-breadcrumb a:hover {
                    color: #174a2f;
                }

                .program-breadcrumb .active {
                    color: #344054;
                    font-weight: 700;
                }

                .program-heading {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .program-heading-icon {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 13px;
                    background: #eff7f3;
                    color: #174a2f;
                    font-size: 21px;
                }

                .program-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 22px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .program-heading p {
                    margin: 5px 0 0;
                    color: #8792a2;
                    font-size: 11px;
                }

                .program-back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border: 1px solid #e4e9f0;
                    border-radius: 8px;
                    background: #fff;
                    color: #536174;
                    font-size: 11px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .program-back-link:hover {
                    border-color: #d0e6da;
                    background: #f8fafd;
                    color: #174a2f;
                }

                @media (max-width: 650px) {
                    .program-page-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .program-heading h2 {
                        font-size: 19px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
