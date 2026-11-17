
import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function ProgramForm({ program, mode }) {
    const isEdit = mode === "edit";

    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
    } = useForm({
        title: program?.title || "",
        slug: program?.slug || "",
        short_description: program?.short_description || "",
        description: program?.description || "",
        cover_image: null,
        status: program?.status || "active",
        start_date: program?.start_date || "",
        end_date: program?.end_date || "",
        is_featured: program?.is_featured ?? false,
        sort_order: program?.sort_order ?? 0,
    });

    const [preview, setPreview] = useState(
        program?.cover_image ? `/uploads/${program.cover_image}` : null
    );

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(
        Boolean(program?.slug)
    );

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleTitleChange = (value) => {
        setData("title", value);

        if (!slugManuallyEdited) {
            const slug = value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            setData("slug", slug);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] || null;

        setData("cover_image", file);

        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setPreview(
            file
                ? URL.createObjectURL(file)
                : program?.cover_image
                  ? `/uploads/${program.cover_image}`
                  : null
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEdit && program?.id) {
            transform((formData) => ({
                ...formData,
                _method: "put",
            }));

            post(route("admin.programs.update", program.id), {
                forceFormData: true,
                preserveScroll: true,
            });

            return;
        }

        post(route("admin.programs.store"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const statusOptions = [
        {
            value: "active",
            label: "Active",
            description: "Visible as an active program",
            icon: "bi-check-circle",
        },
        {
            value: "inactive",
            label: "Inactive",
            description: "Not currently active",
            icon: "bi-pause-circle",
        },
        {
            value: "completed",
            label: "Completed",
            description: "Program activities are complete",
            icon: "bi-flag",
        },
    ];

    return (
        <form onSubmit={handleSubmit} className="program-form">
            <div className="row g-4">
                {/* MAIN COLUMN */}
                <div className="col-lg-8">
                    {/* GENERAL INFORMATION */}
                    <section className="program-form-card">
                        <div className="program-card-header">
                            <div className="program-card-heading">
                                <div className="program-card-icon">
                                    <i className="bi bi-card-text" />
                                </div>
                                <div>
                                    <h5>Program information</h5>
                                    <p>
                                        Provide the essential details about this
                                        program.
                                    </p>
                                </div>
                            </div>
                            <span className="program-required-note">
                                * Required fields
                            </span>
                        </div>

                        <div className="program-card-body">
                            <div className="mb-4">
                                <label className="program-label">
                                    Program title <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    className={`form-control program-input ${errors.title ? "is-invalid" : ""}`}
                                    value={data.title}
                                    onChange={(e) =>
                                        handleTitleChange(e.target.value)
                                    }
                                    placeholder="e.g. Community Mental Health Research"
                                    required
                                />

                                {errors.title && (
                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="program-label">
                                    URL slug
                                </label>

                                <div className="program-slug-input">
                                    <span>
                                        <i className="bi bi-link-45deg" />
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control program-input ${errors.slug ? "is-invalid" : ""}`}
                                        value={data.slug}
                                        onChange={(e) => {
                                            setSlugManuallyEdited(true);
                                            setData("slug", e.target.value);
                                        }}
                                        placeholder="program-url"
                                    />
                                </div>

                                {errors.slug && (
                                    <div className="text-danger small mt-1">
                                        {errors.slug}
                                    </div>
                                )}

                                <div className="program-help">
                                    Used in the public program URL. It is
                                    generated from the title by default.
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                                    <label className="program-label mb-0">
                                        Short description
                                    </label>
                                    <span className="program-counter">
                                        {data.short_description.length}/500
                                    </span>
                                </div>

                                <textarea
                                    className={`form-control program-input program-textarea ${errors.short_description ? "is-invalid" : ""}`}
                                    rows={3}
                                    maxLength={500}
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData(
                                            "short_description",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write a concise introduction to this program..."
                                />

                                {errors.short_description && (
                                    <div className="invalid-feedback">
                                        {errors.short_description}
                                    </div>
                                )}

                                <div className="program-help">
                                    This summary can be used on program cards
                                    and listing pages.
                                </div>
                            </div>

                            <div>
                                <label className="program-label">
                                    Full description
                                </label>

                                <textarea
                                    className={`form-control program-input program-description ${errors.description ? "is-invalid" : ""}`}
                                    rows={11}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Describe the program, its objectives, target audience, activities and expected outcomes..."
                                />

                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}

                                <div className="program-help">
                                    Provide enough detail to help visitors
                                    understand the purpose and scope of the
                                    program.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* COVER IMAGE */}
                    <section className="program-form-card mt-4">
                        <div className="program-card-header">
                            <div className="program-card-heading">
                                <div className="program-card-icon">
                                    <i className="bi bi-image" />
                                </div>
                                <div>
                                    <h5>Program cover image</h5>
                                    <p>
                                        Add a visual image to represent this
                                        program.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="program-card-body">
                            {preview ? (
                                <div className="program-image-preview">
                                    <img
                                        src={preview}
                                        alt="Program cover preview"
                                    />
                                    <div className="program-image-overlay">
                                        <span>
                                            <i className="bi bi-eye me-1" />
                                            Image preview
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="program-image-placeholder">
                                    <div className="program-image-placeholder-icon">
                                        <i className="bi bi-cloud-arrow-up" />
                                    </div>
                                    <strong>No cover image selected</strong>
                                    <span>
                                        Upload an image to create a visual
                                        identity for this program.
                                    </span>
                                </div>
                            )}

                            <div className="program-upload-area mt-3">
                                <label
                                    htmlFor="program-cover-image"
                                    className="program-upload-label"
                                >
                                    <i className="bi bi-upload" />
                                    <span>
                                        {preview
                                            ? "Change cover image"
                                            : "Choose an image"}
                                    </span>
                                </label>

                                <input
                                    id="program-cover-image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className={`form-control program-file-input ${errors.cover_image ? "is-invalid" : ""}`}
                                    onChange={handleImageChange}
                                />

                                {errors.cover_image && (
                                    <div className="text-danger small mt-2">
                                        {errors.cover_image}
                                    </div>
                                )}
                            </div>

                            <div className="program-upload-hint">
                                <i className="bi bi-info-circle" />
                                JPG, PNG or WEBP. Maximum file size: 4 MB.
                            </div>
                        </div>
                    </section>
                </div>

                {/* SIDEBAR COLUMN */}
                <div className="col-lg-4">
                    {/* PUBLISHING */}
                    <section className="program-form-card">
                        <div className="program-card-header">
                            <div className="program-card-heading">
                                <div className="program-card-icon">
                                    <i className="bi bi-sliders" />
                                </div>
                                <div>
                                    <h5>Publishing settings</h5>
                                    <p>Control the program's status.</p>
                                </div>
                            </div>
                        </div>

                        <div className="program-card-body">
                            <label className="program-label">
                                Program status <span>*</span>
                            </label>

                            <div className="program-status-options">
                                {statusOptions.map((option) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`program-status-option ${data.status === option.value ? "selected" : ""}`}
                                        onClick={() =>
                                            setData("status", option.value)
                                        }
                                    >
                                        <span className="program-status-icon">
                                            <i className={`bi ${option.icon}`} />
                                        </span>

                                        <span className="program-status-copy">
                                            <strong>{option.label}</strong>
                                            <small>{option.description}</small>
                                        </span>

                                        <span className="program-status-check">
                                            {data.status === option.value && (
                                                <i className="bi bi-check-circle-fill" />
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {errors.status && (
                                <div className="text-danger small mt-2">
                                    {errors.status}
                                </div>
                            )}

                            <div className="program-field-divider" />

                            <label className="program-label">
                                Display order
                            </label>

                            <input
                                type="number"
                                min="0"
                                className={`form-control program-input ${errors.sort_order ? "is-invalid" : ""}`}
                                value={data.sort_order}
                                onChange={(e) =>
                                    setData(
                                        "sort_order",
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                    )
                                }
                            />

                            {errors.sort_order && (
                                <div className="invalid-feedback">
                                    {errors.sort_order}
                                </div>
                            )}

                            <div className="program-help">
                                Lower numbers appear first when programs are
                                sorted by display order.
                            </div>

                            <div className="program-featured-setting">
                                <div className="program-featured-icon">
                                    <i className="bi bi-star" />
                                </div>

                                <div className="program-featured-copy">
                                    <strong>Featured program</strong>
                                    <span>
                                        Highlight this program on the website.
                                    </span>
                                </div>

                                <div className="form-check form-switch mb-0">
                                    <input
                                        className="form-check-input program-switch"
                                        type="checkbox"
                                        role="switch"
                                        id="program-featured"
                                        checked={data.is_featured}
                                        onChange={(e) =>
                                            setData(
                                                "is_featured",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* DATES */}
                    <section className="program-form-card mt-4">
                        <div className="program-card-header">
                            <div className="program-card-heading">
                                <div className="program-card-icon">
                                    <i className="bi bi-calendar3" />
                                </div>
                                <div>
                                    <h5>Program timeline</h5>
                                    <p>Set the program duration.</p>
                                </div>
                            </div>
                        </div>

                        <div className="program-card-body">
                            <div className="mb-3">
                                <label className="program-label">
                                    Start date
                                </label>

                                <div className="program-date-field">
                                    <i className="bi bi-calendar-event" />
                                    <input
                                        type="date"
                                        className={`form-control program-input ${errors.start_date ? "is-invalid" : ""}`}
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData("start_date", e.target.value)
                                        }
                                    />
                                </div>

                                {errors.start_date && (
                                    <div className="text-danger small mt-1">
                                        {errors.start_date}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="program-label">
                                    End date
                                </label>

                                <div className="program-date-field">
                                    <i className="bi bi-calendar-check" />
                                    <input
                                        type="date"
                                        min={data.start_date || undefined}
                                        className={`form-control program-input ${errors.end_date ? "is-invalid" : ""}`}
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData("end_date", e.target.value)
                                        }
                                    />
                                </div>

                                {errors.end_date && (
                                    <div className="text-danger small mt-1">
                                        {errors.end_date}
                                    </div>
                                )}
                            </div>

                            <div className="program-help mt-3">
                                Leave the dates empty if the program does not
                                have a confirmed schedule.
                            </div>
                        </div>
                    </section>

                    {/* HELPFUL NOTE */}
                    <div className="program-form-tip mt-4">
                        <div className="program-tip-icon">
                            <i className="bi bi-lightbulb" />
                        </div>
                        <div>
                            <strong>Before you save</strong>
                            <p>
                                Review the program title, description, status
                                and cover image to ensure the information is
                                ready for your website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FORM ACTIONS */}
            <div className="program-form-actions">
                <div className="program-form-action-info">
                    <i className="bi bi-shield-check" />
                    <span>
                        {isEdit
                            ? "Your changes will update this program."
                            : "Your program details will be saved securely."}
                    </span>
                </div>

                <div className="d-flex gap-2">
                    <Link
                        href={route("admin.programs.index")}
                        className="program-cancel-button"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="program-submit-button"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <span className="spinner-border spinner-border-sm" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <i
                                    className={`bi ${isEdit ? "bi-check2-circle" : "bi-plus-circle"}`}
                                />
                                {isEdit ? "Save changes" : "Create program"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                .program-form {
                    color: #172033;
                }

                .program-form-card {
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(25,42,70,.025);
                }

                .program-card-header {
                    min-height: 76px;
                    padding: 16px 21px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border-bottom: 1px solid #edf0f4;
                }

                .program-card-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .program-card-icon {
                    width: 37px;
                    height: 37px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 10px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 17px;
                }

                .program-card-heading h5 {
                    margin: 0;
                    color: #263348;
                    font-size: 12px;
                    font-weight: 800;
                }

                .program-card-heading p {
                    margin: 4px 0 0;
                    color: #929baa;
                    font-size: 10px;
                }

                .program-required-note {
                    color: #9aa4b1;
                    font-size: 9px;
                    white-space: nowrap;
                }

                .program-card-body {
                    padding: 22px;
                }

                .program-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #344054;
                    font-size: 10.5px;
                    font-weight: 800;
                }

                .program-label > span {
                    color: #d65b5b;
                }

                .program-input {
                    min-height: 42px;
                    padding: 10px 12px;
                    border: 1px solid #e1e7ef;
                    border-radius: 8px;
                    background-color: #fff;
                    color: #344054;
                    font-family: inherit;
                    font-size: 11px;
                    box-shadow: none;
                    transition: border-color .18s ease, box-shadow .18s ease;
                }

                .program-input::placeholder {
                    color: #a7b0bd;
                }

                .program-input:focus {
                    border-color: #93c7aa;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.1);
                }

                .program-textarea {
                    min-height: 90px;
                    resize: vertical;
                    line-height: 1.7;
                }

                .program-description {
                    min-height: 250px;
                    line-height: 1.8;
                }

                .program-help {
                    margin-top: 7px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .program-counter {
                    color: #98a2b1;
                    font-size: 9px;
                    font-weight: 700;
                }

                .program-slug-input {
                    display: flex;
                    align-items: stretch;
                }

                .program-slug-input > span {
                    width: 40px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border: 1px solid #e1e7ef;
                    border-right: 0;
                    border-radius: 8px 0 0 8px;
                    background: #f7f9fc;
                    color: #8793a4;
                }

                .program-slug-input .program-input {
                    border-radius: 0 8px 8px 0;
                }

                .program-image-preview {
                    position: relative;
                    overflow: hidden;
                    height: 250px;
                    border-radius: 10px;
                    background: #f3f6fa;
                    border: 1px solid #e8edf3;
                }

                .program-image-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .program-image-overlay {
                    position: absolute;
                    inset: auto 0 0;
                    padding: 24px 13px 12px;
                    background: linear-gradient(transparent, rgba(15,25,40,.6));
                    color: #fff;
                    font-size: 10px;
                    font-weight: 700;
                }

                .program-image-placeholder {
                    min-height: 190px;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #cbe4d6;
                    border-radius: 10px;
                    background: #fafbfd;
                    text-align: center;
                }

                .program-image-placeholder-icon {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 12px;
                    border-radius: 13px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 22px;
                }

                .program-image-placeholder strong {
                    color: #465267;
                    font-size: 11px;
                    font-weight: 800;
                }

                .program-image-placeholder span {
                    max-width: 270px;
                    margin-top: 6px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .program-upload-area {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                }

                .program-upload-label {
                    min-height: 37px;
                    padding: 0 13px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: 1px solid #deeee5;
                    border-radius: 7px;
                    background: #f8fafd;
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .program-upload-label:hover {
                    border-color: #c0decd;
                    background: #f1f8f4;
                }

                .program-file-input {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                    clip: rect(0,0,0,0);
                    white-space: nowrap;
                }

                .program-upload-hint {
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #98a2b1;
                    font-size: 9px;
                }

                .program-upload-hint i {
                    color: #20603d;
                }

                /* STATUS OPTIONS */
                .program-status-options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .program-status-option {
                    width: 100%;
                    min-height: 59px;
                    padding: 9px 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #e7ebf1;
                    border-radius: 9px;
                    background: #fff;
                    text-align: left;
                    transition: .18s ease;
                }

                .program-status-option:hover {
                    border-color: #d0e6da;
                    background: #fafcff;
                }

                .program-status-option.selected {
                    border-color: #b2d7c2;
                    background: #f4f8fd;
                }

                .program-status-icon {
                    width: 31px;
                    height: 31px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #f1f4f8;
                    color: #718096;
                    font-size: 14px;
                }

                .program-status-option.selected .program-status-icon {
                    background: #e9f3ed;
                    color: #174a2f;
                }

                .program-status-copy {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .program-status-copy strong {
                    color: #344054;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-status-copy small {
                    color: #98a2b1;
                    font-size: 8.5px;
                }

                .program-status-check {
                    color: #20603d;
                    font-size: 15px;
                }

                .program-field-divider {
                    height: 1px;
                    margin: 20px 0;
                    background: #edf0f4;
                }

                .program-featured-setting {
                    margin-top: 21px;
                    padding: 13px 11px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #edf0f4;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .program-featured-icon {
                    width: 32px;
                    height: 32px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #fff5df;
                    color: #c18b2e;
                    font-size: 14px;
                }

                .program-featured-copy {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .program-featured-copy strong {
                    color: #344054;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-featured-copy span {
                    color: #98a2b1;
                    font-size: 8.5px;
                    line-height: 1.4;
                }

                .program-switch {
                    width: 2.1em;
                    height: 1.1em;
                    margin: 0;
                    cursor: pointer;
                }

                .program-switch:checked {
                    background-color: #20603d;
                    border-color: #20603d;
                }

                .program-date-field {
                    position: relative;
                }

                .program-date-field > i {
                    position: absolute;
                    top: 50%;
                    left: 12px;
                    z-index: 2;
                    color: #8b98a9;
                    font-size: 13px;
                    transform: translateY(-50%);
                    pointer-events: none;
                }

                .program-date-field .program-input {
                    padding-left: 36px;
                }

                .program-form-tip {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    padding: 15px;
                    border: 1px solid #e9f3ed;
                    border-radius: 10px;
                    background: #f6f9fd;
                }

                .program-tip-icon {
                    width: 30px;
                    height: 30px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #ecf5f0;
                    color: #20603d;
                    font-size: 14px;
                }

                .program-form-tip strong {
                    display: block;
                    margin: 2px 0 5px;
                    color: #41516a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-form-tip p {
                    margin: 0;
                    color: #8793a4;
                    font-size: 9px;
                    line-height: 1.7;
                }

                /* ACTION BAR */
                .program-form-actions {
                    position: sticky;
                    bottom: 0;
                    z-index: 10;
                    margin-top: 25px;
                    padding: 14px 18px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: rgba(255,255,255,.97);
                    box-shadow: 0 -5px 20px rgba(25,42,70,.035);
                    backdrop-filter: blur(10px);
                }

                .program-form-action-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #8994a5;
                    font-size: 9px;
                }

                .program-form-action-info i {
                    color: #20603d;
                    font-size: 14px;
                }

                .program-cancel-button,
                .program-submit-button {
                    min-height: 39px;
                    padding: 0 16px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .program-cancel-button {
                    border: 1px solid #e1e7ef;
                    background: #fff;
                    color: #667085;
                }

                .program-cancel-button:hover {
                    background: #f7f9fc;
                    color: #344054;
                }

                .program-submit-button {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .program-submit-button:hover:not(:disabled) {
                    border-color: #174a2f;
                    background: #174a2f;
                    box-shadow: 0 4px 12px rgba(23, 74, 47,.18);
                }

                .program-submit-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                @media (max-width: 767px) {
                    .program-card-body {
                        padding: 17px;
                    }

                    .program-card-header {
                        padding: 14px 17px;
                    }

                    .program-image-preview {
                        height: 200px;
                    }

                    .program-form-actions {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .program-form-action-info {
                        justify-content: center;
                    }

                    .program-form-actions > .d-flex {
                        width: 100%;
                    }

                    .program-cancel-button,
                    .program-submit-button {
                        flex: 1;
                    }
                }

                @media (max-width: 420px) {
                    .program-required-note {
                        display: none;
                    }

                    .program-status-copy small {
                        font-size: 8px;
                    }

                    .program-form-actions {
                        padding: 12px;
                    }
                }
            `}</style>
        </form>
    );
}
