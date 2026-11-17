
import React, { useEffect, useState } from "react";
import { useForm, Link } from "@inertiajs/react";

const DEFAULT_COLOR = "#20603d";

const colorPresets = [
    "#20603d",
    "#D05208",
    "#254035",
    "#16A085",
    "#8E44AD",
    "#E74C3C",
    "#D4A017",
    "#34495E",
];

export default function CategoryForm({ mode = "create", category = null }) {
    const isEdit = mode === "edit";

    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || "",
        name_rw: category?.name_rw || "",
        slug: category?.slug || "",
        description: category?.description || "",
        color: category?.color || DEFAULT_COLOR,
        is_active: category?.is_active ?? true,
        sort_order: category?.sort_order ?? 0,
    });

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);

    useEffect(() => {
        if (isEdit || slugManuallyEdited) return;

        const slug = data.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        setData("slug", slug);
    }, [data.name, isEdit, slugManuallyEdited]);

    const normalizeColor = (color) => {
        return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : DEFAULT_COLOR;
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("admin.event-categories.update", category.id), {
                preserveScroll: true,
            });
        } else {
            post(route("admin.event-categories.store"), {
                preserveScroll: true,
            });
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="row g-4 event-category-form">
                {/* MAIN FORM */}
                <div className="col-lg-8">
                    <div className="category-form-card">
                        <div className="category-form-heading">
                            <div className="category-heading-icon">
                                <i className="bi bi-info-circle" />
                            </div>

                            <div>
                                <h5>Category information</h5>
                                <p>
                                    Provide the basic information used to
                                    identify and organize this category.
                                </p>
                            </div>
                        </div>

                        <div className="category-form-body">
                            {/* NAME */}
                            <div className="mb-4">
                                <label className="category-label">
                                    Category name
                                    <span className="text-danger ms-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    className={`form-control category-input ${
                                        errors.name ? "is-invalid" : ""
                                    }`}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="e.g. Workshops, Conferences, Training"
                                    maxLength={150}
                                    required
                                />

                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}

                                <div className="category-help">
                                    Choose a short, recognizable category name.
                                </div>
                            </div>

                            {/* NAME (KINYARWANDA) */}
                            <div className="mb-4">
                                <label className="category-label">
                                    Category name (Kinyarwanda)
                                </label>

                                <input
                                    type="text"
                                    className={`form-control category-input ${
                                        errors.name_rw ? "is-invalid" : ""
                                    }`}
                                    value={data.name_rw}
                                    onChange={(e) =>
                                        setData("name_rw", e.target.value)
                                    }
                                    placeholder="Urugero: Amahugurwa, Inama"
                                    maxLength={150}
                                />

                                {errors.name_rw && (
                                    <div className="invalid-feedback">
                                        {errors.name_rw}
                                    </div>
                                )}

                                <div className="category-help">
                                    Shown to Kinyarwanda visitors. The English name is used when empty.
                                </div>
                            </div>

                            {/* SLUG */}
                            <div className="mb-4">
                                <label className="category-label">
                                    URL slug
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text category-input-prefix">
                                        <i className="bi bi-link-45deg" />
                                    </span>

                                    <input
                                        type="text"
                                        className={`form-control category-input ${
                                            errors.slug ? "is-invalid" : ""
                                        }`}
                                        value={data.slug}
                                        onChange={(e) => {
                                            setSlugManuallyEdited(true);
                                            setData(
                                                "slug",
                                                e.target.value
                                                    .toLowerCase()
                                                    .trim()
                                                    .replace(/[^a-z0-9-]+/g, "-")
                                                    .replace(/-+/g, "-")
                                            );
                                        }}
                                        placeholder="workshops"
                                    />
                                </div>

                                {errors.slug && (
                                    <div className="text-danger small mt-1">
                                        {errors.slug}
                                    </div>
                                )}

                                <div className="category-help">
                                    Used in category URLs. You can customize
                                    this value.
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="category-label mb-0">
                                        Description
                                    </label>

                                    <span className="category-character-count">
                                        {data.description.length} characters
                                    </span>
                                </div>

                                <textarea
                                    className={`form-control category-textarea ${
                                        errors.description ? "is-invalid" : ""
                                    }`}
                                    rows="6"
                                    maxLength={1000}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Explain what this category represents and the types of events that belong to it..."
                                />

                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}

                                <div className="category-help">
                                    An optional description to help visitors
                                    understand the category.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DISPLAY SETTINGS */}
                    <div className="category-form-card mt-4">
                        <div className="category-form-heading">
                            <div className="category-heading-icon">
                                <i className="bi bi-sliders" />
                            </div>

                            <div>
                                <h5>Display settings</h5>
                                <p>
                                    Control how this category appears across
                                    the website.
                                </p>
                            </div>
                        </div>

                        <div className="category-form-body">
                            <div className="mb-4">
                                <label className="category-label">
                                    Category color
                                </label>

                                <div className="category-color-selector">
                                    <div className="category-color-preview">
                                        <input
                                            type="color"
                                            value={normalizeColor(data.color)}
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                            aria-label="Choose category color"
                                        />
                                    </div>

                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            className={`form-control category-input ${
                                                errors.color ? "is-invalid" : ""
                                            }`}
                                            value={data.color}
                                            onChange={(e) =>
                                                setData(
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="#20603d"
                                        />

                                        {errors.color && (
                                            <div className="invalid-feedback">
                                                {errors.color}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="category-color-presets mt-3">
                                    {colorPresets.map((color) => (
                                        <button
                                            type="button"
                                            key={color}
                                            className={`category-color-swatch ${
                                                data.color.toLowerCase() ===
                                                color.toLowerCase()
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                            onClick={() =>
                                                setData("color", color)
                                            }
                                            aria-label={`Select ${color}`}
                                            title={color}
                                        >
                                            {data.color.toLowerCase() ===
                                                color.toLowerCase() && (
                                                <i className="bi bi-check-lg" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="category-help">
                                    This color identifies the category in
                                    event listings and category badges.
                                </div>
                            </div>

                            <div className="category-divider" />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="category-label">
                                        Display order
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        className={`form-control category-input ${
                                            errors.sort_order
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={data.sort_order}
                                        onChange={(e) =>
                                            setData(
                                                "sort_order",
                                                e.target.value
                                            )
                                        }
                                    />

                                    {errors.sort_order && (
                                        <div className="invalid-feedback">
                                            {errors.sort_order}
                                        </div>
                                    )}

                                    <div className="category-help">
                                        Lower numbers appear first.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="category-label">
                                        Visibility
                                    </label>

                                    <div
                                        className={`category-status-select ${
                                            data.is_active ? "is-active" : ""
                                        }`}
                                    >
                                        <div>
                                            <strong>
                                                {data.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </strong>
                                            <span>
                                                {data.is_active
                                                    ? "Available for events"
                                                    : "Not available for new events"}
                                            </span>
                                        </div>

                                        <div className="form-check form-switch mb-0">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                role="switch"
                                                checked={data.is_active}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_active",
                                                        e.target.checked
                                                    )
                                                }
                                                aria-label="Toggle category status"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="col-lg-4">
                    {/* LIVE PREVIEW */}
                    <div className="category-form-card category-preview-card">
                        <div className="category-form-heading">
                            <div className="category-heading-icon">
                                <i className="bi bi-eye" />
                            </div>

                            <div>
                                <h5>Live preview</h5>
                                <p>How the category will appear.</p>
                            </div>
                        </div>

                        <div className="category-preview-body">
                            <div className="category-preview-label">
                                CATEGORY BADGE
                            </div>

                            <div className="category-preview-display">
                                <span
                                    className="category-preview-badge"
                                    style={{
                                        color: normalizeColor(data.color),
                                        backgroundColor: `${normalizeColor(data.color)}18`,
                                        borderColor: `${normalizeColor(data.color)}45`,
                                    }}
                                >
                                    <span
                                        className="category-preview-dot"
                                        style={{
                                            backgroundColor: normalizeColor(
                                                data.color
                                            ),
                                        }}
                                    />

                                    {data.name || "Category name"}
                                </span>
                            </div>

                            <div className="category-preview-description">
                                {data.description ||
                                    "Your category description will appear here."}
                            </div>

                            <div className="category-preview-meta">
                                <div>
                                    <span>URL slug</span>
                                    <strong>{data.slug || "category-slug"}</strong>
                                </div>

                                <div>
                                    <span>Display order</span>
                                    <strong>{data.sort_order || 0}</strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong
                                        className={
                                            data.is_active
                                                ? "text-success"
                                                : "text-secondary"
                                        }
                                    >
                                        {data.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GUIDANCE */}
                    <div className="category-guidance-card mt-4">
                        <div className="category-guidance-icon">
                            <i className="bi bi-lightbulb" />
                        </div>

                        <div>
                            <strong>Category management</strong>
                            <p>
                                Use clear category names to help visitors
                                discover relevant events. Keep categories
                                consistent and avoid unnecessary duplicates.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FORM ACTIONS */}
                <div className="col-12">
                    <div className="category-form-actions">
                        <div className="category-action-note">
                            <i className="bi bi-shield-check" />
                            <span>
                                Changes will be saved to the event category
                                records.
                            </span>
                        </div>

                        <div className="d-flex gap-2">
                            <Link
                                href={route("admin.event-categories.index")}
                                className="btn category-cancel-button"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="btn category-submit-button"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i
                                            className={`bi ${
                                                isEdit
                                                    ? "bi-check2-circle"
                                                    : "bi-plus-circle"
                                            } me-2`}
                                        />
                                        {isEdit
                                            ? "Save changes"
                                            : "Create category"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .event-category-form {
                    color: #172033;
                }

                .category-form-card {
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 13px;
                    overflow: hidden;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-form-heading {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    padding: 21px 23px;
                    border-bottom: 1px solid #edf0f4;
                }

                .category-heading-icon {
                    width: 39px;
                    height: 39px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 17px;
                }

                .category-form-heading h5 {
                    margin: 1px 0 5px;
                    color: #172033;
                    font-size: 13px;
                    font-weight: 800;
                }

                .category-form-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .category-form-body {
                    padding: 24px;
                }

                .category-label {
                    display: block;
                    margin-bottom: 9px;
                    color: #364256;
                    font-size: 11px;
                    font-weight: 750;
                }

                .category-input,
                .category-textarea {
                    min-height: 43px;
                    padding: 10px 13px;
                    border: 1px solid #e3e8ef;
                    border-radius: 8px;
                    color: #253247;
                    font-family: inherit;
                    font-size: 11px;
                    box-shadow: none !important;
                }

                .category-input:focus,
                .category-textarea:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.09) !important;
                }

                .category-textarea {
                    min-height: 125px;
                    resize: vertical;
                    line-height: 1.7;
                }

                .category-input::placeholder,
                .category-textarea::placeholder {
                    color: #adb5c1;
                }

                .category-input-prefix {
                    background: #f7f9fc;
                    border-color: #e3e8ef;
                    color: #8994a5;
                }

                .category-help {
                    margin-top: 7px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .category-character-count {
                    color: #9aa4b1;
                    font-size: 9px;
                }

                .category-color-selector {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .category-color-preview {
                    width: 45px;
                    height: 43px;
                    padding: 4px;
                    border: 1px solid #e3e8ef;
                    border-radius: 8px;
                }

                .category-color-preview input {
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    border: 0;
                    background: none;
                    cursor: pointer;
                }

                .category-color-presets {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .category-color-swatch {
                    width: 27px;
                    height: 27px;
                    display: grid;
                    place-items: center;
                    border: 2px solid #fff;
                    outline: 1px solid transparent;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 12px;
                    cursor: pointer;
                    transition: transform .15s ease;
                }

                .category-color-swatch:hover {
                    transform: scale(1.12);
                }

                .category-color-swatch.selected {
                    outline-color: #68778c;
                }

                .category-divider {
                    height: 1px;
                    margin: 23px 0;
                    background: #edf0f4;
                }

                .category-status-select {
                    min-height: 58px;
                    padding: 10px 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    border: 1px solid #e5e9ef;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .category-status-select.is-active {
                    background: #f5faf7;
                    border-color: #d9eee1;
                }

                .category-status-select strong,
                .category-status-select span {
                    display: block;
                }

                .category-status-select strong {
                    color: #354155;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-status-select span {
                    margin-top: 4px;
                    color: #929baa;
                    font-size: 8px;
                }

                .category-status-select .form-check-input {
                    width: 34px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                }

                .category-status-select .form-check-input:checked {
                    background-color: #3c9b6b;
                    border-color: #3c9b6b;
                }

                .category-preview-body {
                    padding: 23px;
                }

                .category-preview-label {
                    margin-bottom: 15px;
                    color: #a0a9b6;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .category-preview-display {
                    min-height: 80px;
                    padding: 18px;
                    display: flex;
                    align-items: center;
                    background: #f8f9fb;
                    border: 1px dashed #e2e7ee;
                    border-radius: 9px;
                }

                .category-preview-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 13px;
                    border: 1px solid;
                    border-radius: 30px;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-preview-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                }

                .category-preview-description {
                    margin-top: 17px;
                    color: #8792a2;
                    font-size: 10px;
                    line-height: 1.8;
                    overflow-wrap: anywhere;
                }

                .category-preview-meta {
                    margin-top: 22px;
                    padding-top: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                    border-top: 1px solid #edf0f4;
                }

                .category-preview-meta div {
                    display: flex;
                    justify-content: space-between;
                    gap: 12px;
                }

                .category-preview-meta span {
                    color: #929baa;
                    font-size: 9px;
                }

                .category-preview-meta strong {
                    color: #39465a;
                    font-size: 9px;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                    text-align: right;
                }

                .category-guidance-card {
                    padding: 18px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: #f1f6fc;
                    border: 1px solid #e6f2eb;
                    border-radius: 11px;
                }

                .category-guidance-icon {
                    width: 32px;
                    height: 32px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #fff;
                    color: #20603d;
                    font-size: 15px;
                }

                .category-guidance-card strong {
                    display: block;
                    margin: 2px 0 6px;
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-guidance-card p {
                    margin: 0;
                    color: #71849d;
                    font-size: 9px;
                    line-height: 1.8;
                }

                .category-form-actions {
                    padding: 17px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 11px;
                }

                .category-action-note {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #929baa;
                    font-size: 9px;
                }

                .category-action-note i {
                    color: #4c9b70;
                    font-size: 14px;
                }

                .category-cancel-button,
                .category-submit-button {
                    min-height: 40px;
                    padding: 0 17px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-cancel-button {
                    background: #fff;
                    border: 1px solid #e3e8ef;
                    color: #697587;
                }

                .category-cancel-button:hover {
                    background: #f7f9fc;
                    color: #344054;
                }

                .category-submit-button {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    box-shadow: 0 4px 10px rgba(32, 96, 61,.15);
                }

                .category-submit-button:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                }

                .category-submit-button:disabled {
                    opacity: .65;
                }

                @media(max-width: 767px) {
                    .category-form-heading {
                        padding: 17px;
                    }

                    .category-form-body {
                        padding: 18px;
                    }

                    .category-preview-body {
                        padding: 18px;
                    }

                    .category-form-actions {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .category-action-note {
                        line-height: 1.6;
                    }

                    .category-form-actions > div:last-child {
                        width: 100%;
                    }

                    .category-form-actions .btn {
                        flex: 1;
                    }
                }
            `}</style>
        </form>
    );
}
