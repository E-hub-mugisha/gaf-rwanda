
import React, { useEffect, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const initialForm = {
    type: "image",
    file: null,
    external_url: "",
    alt_text: "",
    caption: "",
    alt_text_rw: "",
    caption_rw: "",
    is_featured: false,
    sort_order: 0,
};

const isFeatured = (value) =>
    value === true || value === 1 || value === "1";

const formatSize = (bytes) => {
    if (!bytes) return "External media";

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function Index({ event, gallery, media = [] }) {
    const { flash } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [preview, setPreview] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(initialForm);

    const mediaItems = Array.isArray(media) ? media : [];

    const images = mediaItems.filter((item) => item.type === "image");
    const videos = mediaItems.filter((item) => item.type === "video");
    const featured = mediaItems.filter((item) =>
        isFeatured(item.is_featured)
    );

    // Generate a temporary preview URL for newly selected files.
    useEffect(() => {
        if (!data.file) return undefined;

        const objectUrl = URL.createObjectURL(data.file);

        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [data.file]);

    const isExternal = (item) =>
        !item.file_path && Boolean(item.external_url);

    const openCreate = () => {
        reset();
        clearErrors();

        setSelectedMedia(null);
        setPreview(null);
        setModalMode("create");
        setModalOpen(true);
    };

    const openEdit = (item) => {
        reset();
        clearErrors();

        setSelectedMedia(item);

        setData({
            type: item.type,
            file: null,
            external_url: item.external_url || "",
            alt_text: item.alt_text || "",
            caption: item.caption || "",
            alt_text_rw: item.alt_text_rw || "",
            caption_rw: item.caption_rw || "",
            is_featured: isFeatured(item.is_featured),
            sort_order: item.sort_order ?? 0,
        });

        setPreview(item.url || null);
        setModalMode("edit");
        setModalOpen(true);
    };

    const openView = (item) => {
        setSelectedMedia(item);
        setModalMode("view");
        setModalOpen(true);
    };

    const closeModal = () => {
        if (processing) return;

        setModalOpen(false);
        setSelectedMedia(null);
        setPreview(null);

        reset();
        clearErrors();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;

        setData("file", file);

        if (file) {
            setData("external_url", "");
        }
    };

    const handleTypeChange = (type) => {
        setData((current) => ({
            ...current,
            type,
            file: null,
            external_url: "",
        }));

        setPreview(null);
    };

    const handleExternalUrlChange = (value) => {
        setData((current) => ({
            ...current,
            external_url: value,
            file: null,
        }));

        setPreview(null);
    };

    const submit = (e) => {
        e.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                setSelectedMedia(null);
                setPreview(null);
                reset();
                clearErrors();
            },
        };

        if (modalMode === "edit" && selectedMedia) {
            router.post(
                route("admin.events.galleries.media.update", [
                    event.id,
                    gallery.id,
                    selectedMedia.id,
                ]),
                {
                    ...data,
                    _method: "put",
                },
                options
            );
        } else {
            post(
                route("admin.events.galleries.media.store", [
                    event.id,
                    gallery.id,
                ]),
                options
            );
        }
    };

    const deleteMedia = (item) => {
        const name =
            item.caption ||
            item.original_name ||
            "this media";

        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        router.delete(
            route("admin.events.galleries.media.destroy", [
                event.id,
                gallery.id,
                item.id,
            ]),
            {
                preserveScroll: true,
            }
        );
    };

    const stats = [
        {
            label: "Total media",
            value: mediaItems.length,
            icon: "bi-collection",
            color: "blue",
            description: "All gallery items",
        },
        {
            label: "Images",
            value: images.length,
            icon: "bi-images",
            color: "purple",
            description: "Uploaded photographs",
        },
        {
            label: "Videos",
            value: videos.length,
            icon: "bi-camera-video",
            color: "orange",
            description: "Video collections",
        },
        {
            label: "Featured",
            value: featured.length,
            icon: "bi-star",
            color: "green",
            description: "Highlighted media",
        },
    ];

    return (
        <AdminLayout>
            <Head title={`Media - ${gallery.title}`} />

            <div className="gaf-media-page">

                {/* Page header */}
                <div className="gaf-media-header">
                    <div className="gaf-media-heading">
                        <div className="gaf-breadcrumb">
                            <Link href={route("admin.dashboard")}>
                                Dashboard
                            </Link>

                            <i className="bi bi-chevron-right" />

                            <Link href={route("admin.events.index")}>
                                Events
                            </Link>

                            <i className="bi bi-chevron-right" />

                            <Link
                                href={route(
                                    "admin.events.galleries.index",
                                    event.id
                                )}
                            >
                                Galleries
                            </Link>

                            <i className="bi bi-chevron-right" />

                            <span>Media</span>
                        </div>

                        <div className="gaf-page-eyebrow">
                            EVENT MANAGEMENT
                        </div>

                        <h2>Gallery media</h2>

                        <p>
                            Manage photographs, videos and external media
                            for this event gallery.
                        </p>
                    </div>

                    <div className="gaf-header-actions">
                        <Link
                            href={route(
                                "admin.events.galleries.index",
                                event.id
                            )}
                            className="btn gaf-btn-outline"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back to galleries
                        </Link>

                        <button
                            type="button"
                            onClick={openCreate}
                            className="btn gaf-btn-primary"
                        >
                            <i className="bi bi-plus-lg me-2" />
                            Add media
                        </button>
                    </div>
                </div>

                {/* Gallery information */}
                <div className="gaf-gallery-context">
                    <div className="gaf-context-icon">
                        <i className="bi bi-images" />
                    </div>

                    <div className="gaf-context-content">
                        <span>MANAGING GALLERY</span>
                        <h5>{gallery.title}</h5>
                        <p>{event.title}</p>
                    </div>

                    <div className="gaf-context-count">
                        <strong>{mediaItems.length}</strong>
                        <span>
                            {mediaItems.length === 1
                                ? "Media item"
                                : "Media items"}
                        </span>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="gaf-alert gaf-alert-success">
                        <i className="bi bi-check-circle-fill" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {flash?.error && (
                    <div className="gaf-alert gaf-alert-danger">
                        <i className="bi bi-exclamation-circle-fill" />
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 mb-4">
                    {stats.map((stat) => (
                        <div
                            className="col-6 col-xl-3"
                            key={stat.label}
                        >
                            <div className="gaf-stat-card">
                                <div className={`gaf-stat-icon ${stat.color}`}>
                                    <i className={`bi ${stat.icon}`} />
                                </div>

                                <div className="gaf-stat-content">
                                    <span>{stat.label}</span>
                                    <h3>{stat.value}</h3>
                                    <small>{stat.description}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Media section heading */}
                <div className="gaf-section-heading">
                    <div>
                        <h5>All media</h5>
                        <p>
                            Browse and manage the content in this gallery.
                        </p>
                    </div>

                    <span className="gaf-result-count">
                        {mediaItems.length}{" "}
                        {mediaItems.length === 1 ? "item" : "items"}
                    </span>
                </div>

                {/* Media grid */}
                {mediaItems.length > 0 ? (
                    <div className="row g-4">
                        {mediaItems.map((item) => (
                            <div
                                className="col-sm-6 col-lg-4 col-xl-3"
                                key={item.id}
                            >
                                <div className="gaf-media-card">

                                    <div
                                        className="gaf-media-thumbnail"
                                        onClick={() => openView(item)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                e.preventDefault();
                                                openView(item);
                                            }
                                        }}
                                    >
                                        {item.type === "image" && item.url ? (
                                            <img
                                                src={item.url}
                                                alt={
                                                    item.alt_text ||
                                                    item.caption ||
                                                    "Gallery image"
                                                }
                                            />
                                        ) : item.type === "video" && item.url ? (
                                            <video
                                                src={item.url}
                                                preload="metadata"
                                            />
                                        ) : (
                                            <div className="gaf-media-placeholder">
                                                <i
                                                    className={`bi ${
                                                        item.type === "video"
                                                            ? "bi-play-circle"
                                                            : "bi-link-45deg"
                                                    }`}
                                                />
                                                <span>
                                                    {item.type === "video"
                                                        ? "Video media"
                                                        : "External media"}
                                                </span>
                                            </div>
                                        )}

                                        <div className="gaf-media-overlay">
                                            <span>
                                                <i className="bi bi-eye me-1" />
                                                View details
                                            </span>
                                        </div>

                                        <span className="gaf-type-badge">
                                            {item.type}
                                        </span>

                                        {isFeatured(item.is_featured) && (
                                            <span className="gaf-featured-badge">
                                                <i className="bi bi-star-fill me-1" />
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <div className="gaf-media-card-body">
                                        <div className="gaf-media-title-row">
                                            <h6 title={item.caption || item.original_name}>
                                                {item.caption ||
                                                    item.original_name ||
                                                    "Untitled media"}
                                            </h6>
                                        </div>

                                        <div className="gaf-media-meta">
                                            <span>
                                                <i className="bi bi-file-earmark me-1" />
                                                {isExternal(item)
                                                    ? "External URL"
                                                    : formatSize(item.file_size)}
                                            </span>

                                            <span>
                                                <i className="bi bi-sort-numeric-down me-1" />
                                                Order {item.sort_order ?? 0}
                                            </span>
                                        </div>

                                        <div className="gaf-media-card-footer">
                                            <span className="gaf-media-kind">
                                                <i
                                                    className={`bi ${
                                                        item.type === "image"
                                                            ? "bi-image"
                                                            : "bi-camera-video"
                                                    }`}
                                                />
                                                {item.type}
                                            </span>

                                            <div className="gaf-media-actions">
                                                <button
                                                    type="button"
                                                    onClick={() => openView(item)}
                                                    title="View media"
                                                    className="gaf-icon-btn"
                                                >
                                                    <i className="bi bi-eye" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openEdit(item)}
                                                    title="Edit media"
                                                    className="gaf-icon-btn"
                                                >
                                                    <i className="bi bi-pencil" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => deleteMedia(item)}
                                                    title="Delete media"
                                                    className="gaf-icon-btn danger"
                                                >
                                                    <i className="bi bi-trash3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="gaf-empty-state">
                        <div className="gaf-empty-icon">
                            <i className="bi bi-images" />
                        </div>

                        <h5>No media in this gallery yet</h5>

                        <p>
                            Upload photographs, add videos or link external
                            media to start building this collection.
                        </p>

                        <button
                            type="button"
                            className="btn gaf-btn-primary"
                            onClick={openCreate}
                        >
                            <i className="bi bi-plus-lg me-2" />
                            Add your first media
                        </button>
                    </div>
                )}
            </div>

            {/* Create / Edit / View modal */}
            {modalOpen && (
                <div
                    className="gaf-media-modal-backdrop"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div
                        className="gaf-media-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gafMediaModalTitle"
                    >
                        {/* Modal header - scrolls with the modal */}
                        <div className="gaf-modal-header">
                            <div>
                                <span className="gaf-modal-eyebrow">
                                    GALLERY CONTENT
                                </span>

                                <h5 id="gafMediaModalTitle">
                                    {modalMode === "create"
                                        ? "Add media"
                                        : modalMode === "edit"
                                        ? "Edit media"
                                        : "Media details"}
                                </h5>

                                <p>{gallery.title}</p>
                            </div>

                            <button
                                type="button"
                                className="gaf-modal-close"
                                onClick={closeModal}
                                disabled={processing}
                                aria-label="Close modal"
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>

                        {modalMode === "view" ? (
                            <>
                                <div className="gaf-modal-body">
                                    {selectedMedia?.type === "image" &&
                                        selectedMedia?.url && (
                                            <div className="gaf-detail-preview">
                                                <img
                                                    src={selectedMedia.url}
                                                    alt={
                                                        selectedMedia.alt_text || ""
                                                    }
                                                />
                                            </div>
                                        )}

                                    {selectedMedia?.type === "video" &&
                                        selectedMedia?.url && (
                                            <div className="gaf-detail-preview">
                                                <video
                                                    src={selectedMedia.url}
                                                    controls
                                                />
                                            </div>
                                        )}

                                    {selectedMedia?.external_url && (
                                        <div className="gaf-external-preview">
                                            <i className="bi bi-link-45deg" />

                                            <div>
                                                <strong>External media</strong>

                                                <a
                                                    href={selectedMedia.external_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Open external media
                                                    <i className="bi bi-box-arrow-up-right ms-2" />
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="gaf-detail-grid">
                                        <div className="gaf-detail-item">
                                            <span>Media type</span>
                                            <strong className="text-capitalize">
                                                {selectedMedia?.type || "—"}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Featured</span>
                                            <strong>
                                                {isFeatured(selectedMedia?.is_featured)
                                                    ? "Yes"
                                                    : "No"}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item full">
                                            <span>Caption</span>
                                            <strong>
                                                {selectedMedia?.caption || "—"}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item full">
                                            <span>Alternative text</span>
                                            <strong>
                                                {selectedMedia?.alt_text || "—"}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Original filename</span>
                                            <strong className="text-break">
                                                {selectedMedia?.original_name ||
                                                    "External media"}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>File size</span>
                                            <strong>
                                                {formatSize(selectedMedia?.file_size)}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Display order</span>
                                            <strong>
                                                {selectedMedia?.sort_order ?? 0}
                                            </strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal footer - scrolls with the modal */}
                                <div className="gaf-modal-footer">
                                    <button
                                        type="button"
                                        className="btn gaf-btn-outline"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        className="btn gaf-btn-primary"
                                        onClick={() => openEdit(selectedMedia)}
                                    >
                                        <i className="bi bi-pencil me-2" />
                                        Edit media
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={submit}>
                                <div className="gaf-modal-body">

                                    {/* Media type */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            Media type
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="gaf-type-selector">
                                            {[
                                                {
                                                    value: "image",
                                                    label: "Image",
                                                    icon: "bi-image",
                                                },
                                                {
                                                    value: "video",
                                                    label: "Video",
                                                    icon: "bi-camera-video",
                                                },
                                            ].map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() =>
                                                        handleTypeChange(type.value)
                                                    }
                                                    className={`gaf-type-option ${
                                                        data.type === type.value
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >
                                                    <i className={`bi ${type.icon}`} />
                                                    <span>{type.label}</span>

                                                    {data.type === type.value && (
                                                        <i className="bi bi-check-circle-fill gaf-type-check" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {errors.type && (
                                            <div className="text-danger small mt-2">
                                                {errors.type}
                                            </div>
                                        )}
                                    </div>

                                    {/* File upload */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            Upload {data.type}
                                        </label>

                                        <label className="gaf-upload-area">
                                            <input
                                                type="file"
                                                hidden
                                                accept={
                                                    data.type === "image"
                                                        ? "image/jpeg,image/png,image/webp,image/gif"
                                                        : "video/mp4,video/quicktime,video/webm"
                                                }
                                                onChange={handleFileChange}
                                            />

                                            <div className="gaf-upload-icon">
                                                <i className="bi bi-cloud-arrow-up" />
                                            </div>

                                            <strong>
                                                Choose a {data.type} to upload
                                            </strong>

                                            <span>
                                                {data.type === "image"
                                                    ? "JPG, PNG, WEBP or GIF · Maximum 10 MB"
                                                    : "MP4, MOV or WEBM · Maximum 100 MB"}
                                            </span>

                                            <small>
                                                Click here to browse files
                                            </small>
                                        </label>

                                        {data.file && (
                                            <div className="gaf-selected-file">
                                                <i className="bi bi-file-earmark-check" />
                                                <span>{data.file.name}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData("file", null);
                                                        setPreview(
                                                            selectedMedia?.url || null
                                                        );
                                                    }}
                                                    aria-label="Remove selected file"
                                                >
                                                    <i className="bi bi-x-lg" />
                                                </button>
                                            </div>
                                        )}

                                        {errors.file && (
                                            <div className="text-danger small mt-2">
                                                {errors.file}
                                            </div>
                                        )}
                                    </div>

                                    {/* Preview */}
                                    {preview && (
                                        <div className="gaf-form-section">
                                            <label className="gaf-form-label">
                                                Media preview
                                            </label>

                                            <div className="gaf-upload-preview">
                                                {data.type === "image" ? (
                                                    <img
                                                        src={preview}
                                                        alt="Media preview"
                                                    />
                                                ) : (
                                                    <video
                                                        src={preview}
                                                        controls
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* External URL */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            External media URL
                                        </label>

                                        <input
                                            type="url"
                                            className={`form-control gaf-form-control ${
                                                errors.external_url
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={data.external_url}
                                            onChange={(e) =>
                                                handleExternalUrlChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="https://example.com/media..."
                                        />

                                        <small className="gaf-form-help">
                                            Alternatively, provide a URL to externally
                                            hosted media.
                                        </small>

                                        {errors.external_url && (
                                            <div className="invalid-feedback">
                                                {errors.external_url}
                                            </div>
                                        )}
                                    </div>

                                    <div className="gaf-form-divider" />

                                    {/* Caption */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            Caption
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control gaf-form-control ${
                                                errors.caption ? "is-invalid" : ""
                                            }`}
                                            value={data.caption}
                                            onChange={(e) =>
                                                setData("caption", e.target.value)
                                            }
                                            placeholder="Enter a descriptive caption"
                                        />

                                        {errors.caption && (
                                            <div className="invalid-feedback">
                                                {errors.caption}
                                            </div>
                                        )}
                                    </div>

                                    {/* Alt text */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            Alternative text
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control gaf-form-control ${
                                                errors.alt_text ? "is-invalid" : ""
                                            }`}
                                            value={data.alt_text}
                                            onChange={(e) =>
                                                setData("alt_text", e.target.value)
                                            }
                                            placeholder="Describe the image for accessibility"
                                        />

                                        {errors.alt_text && (
                                            <div className="invalid-feedback">
                                                {errors.alt_text}
                                            </div>
                                        )}
                                    </div>

                                    {/* Kinyarwanda caption & alt text */}
                                    <div className="gaf-form-section">
                                        <div className="mb-3">
                                            <label className="gaf-form-label">
                                                Caption (Kinyarwanda)
                                            </label>

                                            <input
                                                type="text"
                                            className={`form-control gaf-form-control ${
                                                    errors.caption_rw ? "is-invalid" : ""
                                                }`}
                                                value={data.caption_rw || ""}
                                                onChange={(e) =>
                                                    setData("caption_rw", e.target.value)
                                                }
                                                placeholder="Andika ibisobanuro by’ifoto mu Kinyarwanda"
                                            />

                                            {errors.caption_rw && (
                                                <div className="invalid-feedback">
                                                    {errors.caption_rw}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="gaf-form-label">
                                                Alternative text (Kinyarwanda)
                                            </label>

                                            <input
                                                type="text"
                                            className={`form-control gaf-form-control ${
                                                    errors.alt_text_rw ? "is-invalid" : ""
                                                }`}
                                                value={data.alt_text_rw || ""}
                                                onChange={(e) =>
                                                    setData("alt_text_rw", e.target.value)
                                                }
                                                placeholder="Sobanura ifoto mu Kinyarwanda"
                                            />

                                            {errors.alt_text_rw && (
                                                <div className="invalid-feedback">
                                                    {errors.alt_text_rw}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sort order */}
                                    <div className="gaf-form-section">
                                        <label className="gaf-form-label">
                                            Display order
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className={`form-control gaf-form-control ${
                                                errors.sort_order ? "is-invalid" : ""
                                            }`}
                                            value={data.sort_order}
                                            onChange={(e) =>
                                                setData("sort_order", e.target.value)
                                            }
                                        />

                                        <small className="gaf-form-help">
                                            Lower numbers appear first in the gallery.
                                        </small>

                                        {errors.sort_order && (
                                            <div className="invalid-feedback">
                                                {errors.sort_order}
                                            </div>
                                        )}
                                    </div>

                                    {/* Featured */}
                                    <div className="gaf-featured-setting">
                                        <div>
                                            <strong>
                                                <i className="bi bi-star me-2" />
                                                Featured media
                                            </strong>

                                            <p>
                                                Highlight this item in the gallery.
                                            </p>
                                        </div>

                                        <div className="form-check form-switch">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="mediaFeatured"
                                                checked={Boolean(data.is_featured)}
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

                                {/* Modal footer - scrolls with the modal */}
                                <div className="gaf-modal-footer">
                                    <button
                                        type="button"
                                        className="btn gaf-btn-outline"
                                        onClick={closeModal}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn gaf-btn-primary"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-lg me-2" />
                                                {modalMode === "edit"
                                                    ? "Save changes"
                                                    : "Add media"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <style>{`

                /* =========================================
                   PAGE
                ========================================= */

                .gaf-media-page {
                    color: #172033;
                    font-family: inherit;
                }

                .gaf-media-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-bottom: 26px;
                }

                .gaf-breadcrumb {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 10px;
                    font-size: 12px;
                    color: #8993a4;
                    margin-bottom: 20px;
                }

                .gaf-breadcrumb a {
                    color: #748094;
                    text-decoration: none;
                }

                .gaf-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-breadcrumb i {
                    font-size: 10px;
                }

                .gaf-page-eyebrow,
                .gaf-modal-eyebrow {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    margin-bottom: 7px;
                }

                .gaf-media-heading h2 {
                    font-size: 27px;
                    font-weight: 800;
                    letter-spacing: -0.8px;
                    margin-bottom: 7px;
                    color: #172033;
                }

                .gaf-media-heading p {
                    color: #7c8798;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-header-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .gaf-btn-primary {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    border-radius: 8px;
                    padding: 10px 17px;
                    font-size: 12px;
                    font-weight: 700;
                    transition: .2s ease;
                }

                .gaf-btn-primary:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .gaf-btn-outline {
                    background: #fff;
                    border: 1px solid #e1e6ed;
                    color: #465267;
                    border-radius: 8px;
                    padding: 10px 16px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .gaf-btn-outline:hover {
                    background: #f5f7fa;
                    border-color: #ccd5e0;
                    color: #172033;
                }

                /* =========================================
                   GALLERY CONTEXT
                ========================================= */

                .gaf-gallery-context {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    padding: 17px 20px;
                    margin-bottom: 23px;
                }

                .gaf-context-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .gaf-context-content {
                    min-width: 0;
                }

                .gaf-context-content > span {
                    display: block;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: #8b95a5;
                    margin-bottom: 3px;
                }

                .gaf-context-content h5 {
                    font-size: 14px;
                    font-weight: 800;
                    margin: 0 0 3px;
                    color: #172033;
                }

                .gaf-context-content p {
                    font-size: 11px;
                    color: #8993a4;
                    margin: 0;
                }

                .gaf-context-count {
                    margin-left: auto;
                    text-align: right;
                    flex-shrink: 0;
                }

                .gaf-context-count strong {
                    display: block;
                    font-size: 21px;
                    color: #172033;
                    line-height: 1.2;
                }

                .gaf-context-count span {
                    font-size: 10px;
                    color: #8993a4;
                }

                /* =========================================
                   ALERTS
                ========================================= */

                .gaf-alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-radius: 9px;
                    padding: 12px 15px;
                    margin-bottom: 18px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .gaf-alert-success {
                    color: #19734b;
                    background: #edf8f2;
                    border: 1px solid #d5eee0;
                }

                .gaf-alert-danger {
                    color: #b33b45;
                    background: #fff1f1;
                    border: 1px solid #f3dada;
                }

                .gaf-alert > i {
                    font-size: 16px;
                }

                /* =========================================
                   STATISTICS
                ========================================= */

                .gaf-stat-card {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    padding: 17px;
                    transition: .2s ease;
                }

                .gaf-stat-card:hover {
                    border-color: #d5e8dd;
                    transform: translateY(-2px);
                }

                .gaf-stat-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 10px;
                    font-size: 19px;
                }

                .gaf-stat-icon.blue {
                    background: #edf3fb;
                    color: #20603d;
                }

                .gaf-stat-icon.purple {
                    background: #f2effb;
                    color: #8069b9;
                }

                .gaf-stat-icon.orange {
                    background: #fff3e8;
                    color: #d48a42;
                }

                .gaf-stat-icon.green {
                    background: #eaf6f0;
                    color: #438d6c;
                }

                .gaf-stat-content span {
                    display: block;
                    color: #7d8899;
                    font-size: 11px;
                    font-weight: 600;
                    margin-bottom: 3px;
                }

                .gaf-stat-content h3 {
                    font-size: 23px;
                    font-weight: 800;
                    color: #172033;
                    margin: 0 0 3px;
                }

                .gaf-stat-content small {
                    color: #9aa3b1;
                    font-size: 10px;
                }

                /* =========================================
                   MEDIA GRID
                ========================================= */

                .gaf-section-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin: 31px 0 17px;
                }

                .gaf-section-heading h5 {
                    color: #172033;
                    font-size: 16px;
                    font-weight: 800;
                    margin-bottom: 4px;
                }

                .gaf-section-heading p {
                    color: #8993a4;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-result-count {
                    color: #758195;
                    background: #fff;
                    border: 1px solid #e7ebf0;
                    padding: 7px 11px;
                    border-radius: 7px;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-media-card {
                    height: 100%;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    overflow: hidden;
                    transition: .2s ease;
                }

                .gaf-media-card:hover {
                    transform: translateY(-3px);
                    border-color: #d5e8dd;
                    box-shadow: 0 9px 24px rgba(23, 32, 51, .07);
                }

                .gaf-media-thumbnail {
                    height: 190px;
                    position: relative;
                    overflow: hidden;
                    background: #f0f3f7;
                    cursor: pointer;
                }

                .gaf-media-thumbnail > img,
                .gaf-media-thumbnail > video {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    transition: transform .35s ease;
                }

                .gaf-media-card:hover .gaf-media-thumbnail > img {
                    transform: scale(1.04);
                }

                .gaf-media-placeholder {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 8px;
                    color: #9aa5b5;
                }

                .gaf-media-placeholder i {
                    font-size: 39px;
                }

                .gaf-media-placeholder span {
                    font-size: 11px;
                    font-weight: 600;
                }

                .gaf-media-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(23, 32, 51, .35);
                    opacity: 0;
                    transition: opacity .2s ease;
                }

                .gaf-media-thumbnail:hover .gaf-media-overlay,
                .gaf-media-thumbnail:focus .gaf-media-overlay {
                    opacity: 1;
                }

                .gaf-media-overlay span {
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 9px 13px;
                    border: 1px solid rgba(255,255,255,.5);
                    border-radius: 6px;
                }

                .gaf-type-badge,
                .gaf-featured-badge {
                    position: absolute;
                    top: 11px;
                    padding: 5px 9px;
                    border-radius: 5px;
                    font-size: 9px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .gaf-type-badge {
                    right: 11px;
                    background: rgba(23, 32, 51, .83);
                    color: #fff;
                }

                .gaf-featured-badge {
                    left: 11px;
                    background: #fff1cf;
                    color: #8a641e;
                }

                .gaf-media-card-body {
                    padding: 15px;
                }

                .gaf-media-title-row h6 {
                    color: #263249;
                    font-size: 12px;
                    font-weight: 800;
                    margin: 0 0 11px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .gaf-media-meta {
                    display: flex;
                    justify-content: space-between;
                    gap: 8px;
                    color: #8b95a5;
                    font-size: 9px;
                    margin-bottom: 14px;
                }

                .gaf-media-card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 11px;
                    border-top: 1px solid #f0f2f5;
                }

                .gaf-media-kind {
                    color: #8290a3;
                    font-size: 10px;
                    text-transform: capitalize;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .gaf-media-kind i {
                    color: #20603d;
                    font-size: 13px;
                }

                .gaf-media-actions {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .gaf-icon-btn {
                    width: 29px;
                    height: 29px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e8edf3;
                    border-radius: 6px;
                    background: #fff;
                    color: #758195;
                    font-size: 12px;
                    transition: .2s ease;
                }

                .gaf-icon-btn:hover {
                    background: #edf3fb;
                    color: #20603d;
                    border-color: #ddede4;
                }

                .gaf-icon-btn.danger:hover {
                    background: #fff0f0;
                    color: #c34c56;
                    border-color: #f1d4d6;
                }

                /* =========================================
                   EMPTY STATE
                ========================================= */

                .gaf-empty-state {
                    text-align: center;
                    background: #fff;
                    border: 1px dashed #d9e0e9;
                    border-radius: 13px;
                    padding: 65px 20px;
                }

                .gaf-empty-icon {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 19px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 30px;
                }

                .gaf-empty-state h5 {
                    font-size: 16px;
                    font-weight: 800;
                    color: #172033;
                    margin-bottom: 8px;
                }

                .gaf-empty-state p {
                    max-width: 420px;
                    margin: 0 auto 20px;
                    color: #8993a4;
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* =========================================
                   MODAL BACKDROP - IMPORTANT FIX

                   The backdrop is the scrolling container.
                   The modal itself is NOT height restricted.
                ========================================= */

                .gaf-media-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    padding: 24px 16px;

                    background: rgba(15, 24, 40, .58);
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);

                    /* Scroll the complete modal */
                    overflow-x: hidden;
                    overflow-y: auto;

                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior-y: contain;
                }

                /* =========================================
                   MODAL CONTAINER

                   No max-height.
                   No overflow:hidden.
                   No internal flex scrolling.
                ========================================= */

                .gaf-media-modal {
                    position: relative;

                    display: block;

                    width: 100%;
                    max-width: 680px;

                    height: auto;
                    max-height: none;
                    min-height: 0;

                    flex: 0 0 auto;

                    margin: 0 auto;

                    background: #fff;
                    border: 1px solid #e9edf2;
                    border-radius: 13px;

                    overflow: visible;

                    box-shadow: 0 20px 70px rgba(15, 24, 40, .22);

                    animation: gafModalIn .2s ease;
                }

                @keyframes gafModalIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* =========================================
                   MODAL HEADER

                   Normal document flow.
                   Not fixed.
                   Not sticky.
                ========================================= */

                .gaf-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;

                    padding: 21px 24px;

                    background: #fff;
                    border-bottom: 1px solid #edf0f4;

                    position: static;
                    flex-shrink: 1;
                }

                .gaf-modal-header h5 {
                    color: #172033;
                    font-size: 17px;
                    font-weight: 800;
                    margin: 0 0 4px;
                }

                .gaf-modal-header p {
                    color: #8993a4;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-modal-close {
                    width: 34px;
                    height: 34px;

                    border: 1px solid #e8edf3;
                    border-radius: 7px;

                    background: #fff;
                    color: #778397;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    flex-shrink: 0;
                    cursor: pointer;
                }

                .gaf-modal-close:hover {
                    background: #f4f6f9;
                    color: #172033;
                }

                /* =========================================
                   MODAL BODY

                   No max-height.
                   No overflow-y:auto.
                   No separate scrollbar.
                ========================================= */

                .gaf-modal-body {
                    display: block;

                    width: 100%;
                    height: auto;
                    max-height: none;
                    min-height: 0;

                    padding: 23px 24px;

                    overflow: visible;

                    background: #fff;
                }

                /* Form must also remain in normal flow */
                .gaf-media-modal form {
                    display: block;
                    width: 100%;
                    height: auto;
                    overflow: visible;
                }

                /* =========================================
                   MODAL FOOTER

                   Normal document flow.
                   Not fixed.
                   Not sticky.
                ========================================= */

                .gaf-modal-footer {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                    gap: 9px;

                    padding: 16px 24px;

                    background: #fbfcfd;
                    border-top: 1px solid #edf0f4;

                    position: static;
                    flex-shrink: 1;
                }

                .gaf-modal-footer .btn {
                    min-height: 40px;
                    padding: 9px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                }

                /* =========================================
                   FORM ELEMENTS
                ========================================= */

                .gaf-form-section {
                    margin-bottom: 19px;
                }

                .gaf-form-label {
                    display: block;
                    color: #344158;
                    font-size: 11px;
                    font-weight: 800;
                    margin-bottom: 9px;
                }

                .gaf-form-label .text-danger {
                    margin-left: 4px;
                }

                .gaf-form-control {
                    border: 1px solid #dfe5ec;
                    border-radius: 7px;
                    padding: 10px 12px;
                    font-size: 12px;
                    color: #344158;
                    box-shadow: none;
                }

                .gaf-form-control:focus {
                    border-color: #97caad;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .10);
                }

                .gaf-form-help {
                    display: block;
                    color: #98a1af;
                    font-size: 10px;
                    margin-top: 7px;
                    line-height: 1.5;
                }

                .gaf-type-selector {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .gaf-type-option {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    border: 1px solid #e2e7ee;
                    background: #fff;
                    border-radius: 8px;

                    padding: 13px;

                    color: #69768a;
                    font-size: 11px;
                    font-weight: 700;
                    text-align: left;
                }

                .gaf-type-option > i:first-child {
                    font-size: 19px;
                }

                .gaf-type-option.active {
                    border-color: #20603d;
                    background: #f2f6fc;
                    color: #174a2f;
                }

                .gaf-type-check {
                    margin-left: auto;
                    color: #20603d;
                }

                /* =========================================
                   UPLOAD AREA
                ========================================= */

                .gaf-upload-area {
                    min-height: 145px;

                    border: 1px dashed #cbd6e3;
                    border-radius: 9px;

                    background: #fafbfd;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;

                    cursor: pointer;
                    padding: 20px;
                    text-align: center;

                    transition: .2s ease;
                }

                .gaf-upload-area:hover {
                    background: #f3f7fc;
                    border-color: #20603d;
                }

                .gaf-upload-icon {
                    color: #20603d;
                    font-size: 27px;
                    margin-bottom: 2px;
                }

                .gaf-upload-area strong {
                    font-size: 11px;
                    color: #344158;
                }

                .gaf-upload-area span {
                    color: #8993a4;
                    font-size: 10px;
                }

                .gaf-upload-area small {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-selected-file {
                    display: flex;
                    align-items: center;
                    gap: 9px;

                    background: #f1f7f3;
                    border: 1px solid #dcece1;
                    border-radius: 7px;

                    padding: 9px 11px;
                    margin-top: 9px;

                    color: #3d805e;
                    font-size: 11px;
                }

                .gaf-selected-file span {
                    overflow-wrap: anywhere;
                    flex: 1;
                }

                .gaf-selected-file button {
                    border: 0;
                    background: transparent;
                    color: #648c74;
                }

                /* =========================================
                   PREVIEWS
                ========================================= */

                .gaf-upload-preview,
                .gaf-detail-preview {
                    background: #f3f5f8;
                    border: 1px solid #e8edf3;
                    border-radius: 8px;
                    padding: 8px;
                    text-align: center;
                }

                .gaf-upload-preview img,
                .gaf-upload-preview video {
                    max-width: 100%;
                    max-height: 230px;
                    object-fit: contain;
                    border-radius: 5px;
                }

                .gaf-detail-preview {
                    margin-bottom: 21px;
                }

                .gaf-detail-preview img,
                .gaf-detail-preview video {
                    max-width: 100%;
                    max-height: 350px;
                    object-fit: contain;
                }

                .gaf-form-divider {
                    height: 1px;
                    background: #edf0f4;
                    margin: 23px 0;
                }

                /* =========================================
                   FEATURED SETTING
                ========================================= */

                .gaf-featured-setting {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;

                    background: #fafbfd;
                    border: 1px solid #e9edf2;
                    border-radius: 8px;

                    padding: 14px;
                }

                .gaf-featured-setting strong {
                    display: block;
                    font-size: 11px;
                    color: #344158;
                }

                .gaf-featured-setting strong i {
                    color: #d39a3e;
                }

                .gaf-featured-setting p {
                    font-size: 10px;
                    color: #8993a4;
                    margin: 4px 0 0;
                }

                .gaf-featured-setting .form-check {
                    margin: 0;
                }

                .gaf-featured-setting .form-check-input {
                    width: 2.3em;
                    height: 1.2em;
                    cursor: pointer;
                }

                .gaf-featured-setting .form-check-input:checked {
                    background-color: #20603d;
                    border-color: #20603d;
                }

                /* =========================================
                   DETAIL VIEW
                ========================================= */

                .gaf-detail-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 17px;
                }

                .gaf-detail-item {
                    min-width: 0;
                }

                .gaf-detail-item.full {
                    grid-column: 1 / -1;
                }

                .gaf-detail-item span {
                    display: block;
                    color: #929cac;
                    font-size: 10px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .gaf-detail-item strong {
                    display: block;
                    color: #344158;
                    font-size: 12px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                .gaf-external-preview {
                    display: flex;
                    align-items: center;
                    gap: 13px;

                    background: #f2f6fc;
                    border-radius: 8px;

                    padding: 15px;
                    margin-bottom: 20px;

                    color: #20603d;
                }

                .gaf-external-preview > i {
                    font-size: 25px;
                }

                .gaf-external-preview strong {
                    display: block;
                    font-size: 11px;
                    color: #344158;
                    margin-bottom: 4px;
                }

                .gaf-external-preview a {
                    color: #20603d;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                /* =========================================
                   RESPONSIVE
                ========================================= */

                @media (max-width: 767px) {
                    .gaf-media-header {
                        align-items: flex-start;
                    }

                    .gaf-header-actions {
                        width: 100%;
                    }

                    .gaf-header-actions .btn {
                        flex: 1;
                        justify-content: center;
                    }

                    .gaf-media-heading h2 {
                        font-size: 23px;
                    }

                    .gaf-gallery-context {
                        padding: 13px;
                    }

                    .gaf-context-count {
                        display: none;
                    }

                    .gaf-stat-card {
                        padding: 13px;
                        gap: 10px;
                    }

                    .gaf-stat-icon {
                        width: 39px;
                        height: 39px;
                        font-size: 16px;
                    }

                    .gaf-stat-content h3 {
                        font-size: 20px;
                    }

                    /* Mobile modal scrolling */
                    .gaf-media-modal-backdrop {
                        padding: 12px 10px;
                        align-items: center;
                    }

                    .gaf-media-modal {
                        width: 100%;
                        max-width: 100%;
                        margin: 0 auto;
                    }

                    .gaf-modal-header,
                    .gaf-modal-body {
                        padding-left: 17px;
                        padding-right: 17px;
                    }

                    .gaf-modal-footer {
                        padding: 13px 17px;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-header-actions {
                        flex-direction: column;
                    }

                    .gaf-detail-grid {
                        grid-template-columns: 1fr;
                    }

                    .gaf-detail-item.full {
                        grid-column: auto;
                    }

                    .gaf-modal-footer .btn {
                        flex: 1;
                    }
                }

            `}</style>
        </AdminLayout>
    );
}
