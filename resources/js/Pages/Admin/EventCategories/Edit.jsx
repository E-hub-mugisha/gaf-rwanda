
import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CategoryForm from "./CategoryForm";

export default function Edit({ category }) {
    const color = category.color || "#20603d";

    return (
        <AdminLayout title="Edit Event Category">
            <Head title={`Edit ${category.name}`} />

            <div className="event-category-edit-page">
                {/* BREADCRUMB */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb event-edit-breadcrumb">
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
                            Edit Category
                        </li>
                    </ol>
                </nav>

                {/* PAGE HEADER */}
                <div className="event-edit-header">
                    <div className="event-edit-heading">
                        <div className="event-edit-icon">
                            <i className="bi bi-pencil-square" />
                        </div>

                        <div>
                            <div className="event-edit-eyebrow">
                                CATEGORY MANAGEMENT
                            </div>

                            <h2>Edit event category</h2>

                            <p>
                                Update category information, appearance and
                                publishing settings.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route("admin.event-categories.index")}
                        className="event-edit-back-button"
                    >
                        <i className="bi bi-arrow-left me-2" />
                        All categories
                    </Link>
                </div>

                {/* CURRENT CATEGORY INFORMATION */}
                <div className="event-edit-summary">
                    <div className="event-edit-summary-main">
                        <div
                            className="event-edit-category-marker"
                            style={{ backgroundColor: color }}
                        >
                            <i className="bi bi-tag-fill" />
                        </div>

                        <div className="event-edit-category-info">
                            <span>Currently editing</span>
                            <h5>{category.name}</h5>
                            <small>
                                <i className="bi bi-link-45deg me-1" />
                                {category.slug}
                            </small>
                        </div>
                    </div>

                    <div className="event-edit-summary-details">
                        <div className="event-edit-detail">
                            <span>Status</span>

                            <span
                                className={`event-edit-status ${
                                    category.is_active
                                        ? "active"
                                        : "inactive"
                                }`}
                            >
                                <span />
                                {category.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="event-edit-detail">
                            <span>Display order</span>
                            <strong>{category.sort_order ?? 0}</strong>
                        </div>

                        <div className="event-edit-detail">
                            <span>Category ID</span>
                            <strong>#{category.id}</strong>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <div className="event-edit-form-heading">
                    <div>
                        <h5>Category settings</h5>
                        <p>
                            Make the necessary changes and save when finished.
                        </p>
                    </div>

                    <span className="event-edit-required">
                        <span>*</span> Required fields
                    </span>
                </div>

                <CategoryForm
                    mode="edit"
                    category={category}
                />
            </div>

            <style>{`
                .event-category-edit-page {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    color: #172033;
                }

                .event-edit-breadcrumb {
                    margin-bottom: 0;
                    font-size: 10px;
                    font-weight: 600;
                }

                .event-edit-breadcrumb a {
                    color: #8994a5;
                    text-decoration: none;
                }

                .event-edit-breadcrumb a:hover {
                    color: #174a2f;
                }

                .event-edit-breadcrumb .active {
                    color: #344054;
                }

                /* HEADER */
                .event-edit-header {
                    margin: 23px 0 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .event-edit-heading {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .event-edit-icon {
                    width: 49px;
                    height: 49px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 21px;
                }

                .event-edit-eyebrow {
                    margin-bottom: 5px;
                    color: #8b98aa;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                }

                .event-edit-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .event-edit-heading p {
                    margin: 6px 0 0;
                    color: #8994a5;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .event-edit-back-button {
                    min-height: 39px;
                    padding: 0 15px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e5eaf0;
                    border-radius: 8px;
                    background: #fff;
                    color: #647184;
                    font-size: 10px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .event-edit-back-button:hover {
                    background: #f7f9fc;
                    border-color: #d3e7dc;
                    color: #174a2f;
                }

                /* SUMMARY */
                .event-edit-summary {
                    margin-bottom: 28px;
                    padding: 19px 22px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .event-edit-summary-main {
                    min-width: 0;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .event-edit-category-marker {
                    width: 43px;
                    height: 43px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 11px;
                    color: #fff;
                    font-size: 17px;
                }

                .event-edit-category-info {
                    min-width: 0;
                }

                .event-edit-category-info > span {
                    display: block;
                    margin-bottom: 3px;
                    color: #99a3b1;
                    font-size: 9px;
                    font-weight: 600;
                }

                .event-edit-category-info h5 {
                    margin: 0;
                    color: #263348;
                    font-size: 13px;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                }

                .event-edit-category-info small {
                    display: block;
                    margin-top: 5px;
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-summary-details {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }

                .event-edit-detail {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .event-edit-detail > span:first-child {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .event-edit-detail strong {
                    color: #39465a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .event-edit-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 9px;
                    font-weight: 800;
                }

                .event-edit-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .event-edit-status.active {
                    color: #29935f;
                }

                .event-edit-status.active > span {
                    background: #29935f;
                }

                .event-edit-status.inactive {
                    color: #8994a5;
                }

                .event-edit-status.inactive > span {
                    background: #8994a5;
                }

                /* FORM SECTION HEADER */
                .event-edit-form-heading {
                    margin-bottom: 17px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                }

                .event-edit-form-heading h5 {
                    margin: 0;
                    color: #253247;
                    font-size: 12px;
                    font-weight: 800;
                }

                .event-edit-form-heading p {
                    margin: 5px 0 0;
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-required {
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-required span {
                    color: #dc5555;
                    font-weight: 800;
                }

                @media(max-width: 767px) {
                    .event-edit-summary {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .event-edit-summary-details {
                        width: 100%;
                        padding-top: 15px;
                        border-top: 1px solid #edf0f4;
                        justify-content: space-between;
                        gap: 12px;
                    }
                }

                @media(max-width: 480px) {
                    .event-edit-heading h2 {
                        font-size: 17px;
                    }

                    .event-edit-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .event-edit-form-heading {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .event-edit-summary {
                        padding: 16px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
