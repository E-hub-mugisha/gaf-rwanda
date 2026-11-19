
import React, { useEffect, useState } from "react";
import {
    Link,
    router,
    useForm,
    usePage,
} from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const emptyForm = {
    title: "",
    title_rw: "",
    slug: "",
    description: "",
    description_rw: "",
    cover_image: null,
    is_public: true,
    sort_order: 0,
};

export default function Index({ event, galleries = [] }) {
    const { flash } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedGallery, setSelectedGallery] = useState(null);
    const [preview, setPreview] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        transform,
    } = useForm(emptyForm);

    const totalGalleries = galleries.length;
    const publicGalleries = galleries.filter(
        (gallery) => Boolean(gallery.is_public)
    ).length;
    const privateGalleries = totalGalleries - publicGalleries;

    const closeModal = () => {
        if (processing) return;

        setModalOpen(false);
        setSelectedGallery(null);
        setPreview(null);
        reset();
        clearErrors();
        transform((formData) => formData);
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        transform((formData) => formData);

        setSelectedGallery(null);
        setPreview(null);
        setModalMode("create");
        setModalOpen(true);
    };

    const openEditModal = (gallery) => {
        clearErrors();
        setSelectedGallery(gallery);
        setModalMode("edit");

        setData({
            title: gallery.title || "",
            title_rw: gallery.title_rw || "",
            slug: gallery.slug || "",
            description: gallery.description || "",
            description_rw: gallery.description_rw || "",
            cover_image: null,
            is_public: Boolean(gallery.is_public),
            sort_order: gallery.sort_order ?? 0,
        });

        setPreview(
            gallery.cover_image
                ? `/uploads/${gallery.cover_image}`
                : null
        );

        setModalOpen(true);
    };

    const openViewModal = (gallery) => {
        setSelectedGallery(gallery);
        setModalMode("view");
        setModalOpen(true);
    };

    // Generate a slug automatically when creating a gallery.
    useEffect(() => {
        if (modalMode !== "create") return;

        const slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        setData("slug", slug);
    }, [data.title, modalMode]);

    // Release temporary image previews when the component unmounts.
    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleImage = (file) => {
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setData("cover_image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(
                selectedGallery?.cover_image
                    ? `/uploads/${selectedGallery.cover_image}`
                    : null
            );
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (modalMode === "edit" && selectedGallery) {
            transform((formData) => ({
                ...formData,
                _method: "put",
            }));

            post(
                route("admin.events.galleries.update", [
                    event.id,
                    selectedGallery.id,
                ]),
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setModalOpen(false);
                        setSelectedGallery(null);
                        setPreview(null);
                        reset();
                        clearErrors();
                        transform((formData) => formData);
                    },
                }
            );

            return;
        }

        post(route("admin.events.galleries.store", event.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                setSelectedGallery(null);
                setPreview(null);
                reset();
                clearErrors();
            },
        });
    };

    const deleteGallery = (gallery) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${gallery.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        router.delete(
            route("admin.events.galleries.destroy", [
                event.id,
                gallery.id,
            ]),
            {
                preserveScroll: true,
            }
        );
    };

    const formatDate = (value) => {
        if (!value) return "Not available";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Not available";

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <AdminLayout title={`Galleries - ${event.title}`}>
            <div className="gaf-gallery-page">
                {/* Page heading */}
                <div className="gaf-gallery-header">
                    <div className="gaf-gallery-heading-content">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb gaf-gallery-breadcrumb">
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

                                <li className="breadcrumb-item">
                                    <Link
                                        href={route(
                                            "admin.events.show",
                                            event.id
                                        )}
                                    >
                                        {event.title}
                                    </Link>
                                </li>

                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Galleries
                                </li>
                            </ol>
                        </nav>

                        <div className="d-flex align-items-center gap-3">
                            <div className="gaf-gallery-heading-icon">
                                <i className="bi bi-images" />
                            </div>

                            <div>
                                <h3 className="gaf-gallery-page-title">
                                    Event Galleries
                                </h3>

                                <p className="gaf-gallery-page-subtitle">
                                    Organize and manage photo collections for
                                    <strong> {event.title}</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="gaf-gallery-header-actions">
                        <Link
                            href={route("admin.events.show", event.id)}
                            className="btn gaf-gallery-back-btn"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Back to Event
                        </Link>

                        <button
                            type="button"
                            className="btn gaf-gallery-create-btn"
                            onClick={openCreateModal}
                        >
                            <i className="bi bi-plus-lg me-2" />
                            Create Gallery
                        </button>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="gaf-gallery-alert gaf-gallery-alert-success">
                        <i className="bi bi-check-circle-fill" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {flash?.error && (
                    <div className="gaf-gallery-alert gaf-gallery-alert-error">
                        <i className="bi bi-exclamation-circle-fill" />
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Event context */}
                <div className="gaf-gallery-event-context">
                    <div className="gaf-gallery-event-context-icon">
                        <i className="bi bi-calendar2-event" />
                    </div>

                    <div className="gaf-gallery-event-context-info">
                        <span>MANAGING GALLERIES FOR</span>
                        <strong>{event.title}</strong>
                    </div>

                    <div className="gaf-gallery-event-context-meta">
                        <span>Event ID</span>
                        <strong>#{event.id}</strong>
                    </div>

                    <Link
                        href={route("admin.events.show", event.id)}
                        className="gaf-gallery-event-link"
                    >
                        View Event
                        <i className="bi bi-arrow-up-right ms-2" />
                    </Link>
                </div>

                {/* Statistics */}
                <div className="gaf-gallery-stats">
                    <div className="gaf-gallery-stat-card">
                        <div className="gaf-gallery-stat-content">
                            <span>Total Galleries</span>
                            <strong>{totalGalleries}</strong>
                            <small>All event collections</small>
                        </div>

                        <div className="gaf-gallery-stat-icon gaf-stat-blue">
                            <i className="bi bi-collection" />
                        </div>
                    </div>

                    <div className="gaf-gallery-stat-card">
                        <div className="gaf-gallery-stat-content">
                            <span>Public Galleries</span>
                            <strong>{publicGalleries}</strong>
                            <small>Visible on the website</small>
                        </div>

                        <div className="gaf-gallery-stat-icon gaf-stat-green">
                            <i className="bi bi-globe2" />
                        </div>
                    </div>

                    <div className="gaf-gallery-stat-card">
                        <div className="gaf-gallery-stat-content">
                            <span>Private Galleries</span>
                            <strong>{privateGalleries}</strong>
                            <small>Hidden from visitors</small>
                        </div>

                        <div className="gaf-gallery-stat-icon gaf-stat-grey">
                            <i className="bi bi-lock" />
                        </div>
                    </div>
                </div>

                {/* Gallery section heading */}
                <div className="gaf-gallery-section-header">
                    <div>
                        <h5>All Galleries</h5>
                        <p>
                            {totalGalleries}{" "}
                            {totalGalleries === 1 ? "gallery" : "galleries"}{" "}
                            created for this event
                        </p>
                    </div>

                    <span className="gaf-gallery-count">
                        {totalGalleries} Collections
                    </span>
                </div>

                {/* Gallery cards */}
                {galleries.length > 0 ? (
                    <div className="gaf-gallery-grid">
                        {galleries.map((gallery) => (
                            <article
                                className="gaf-gallery-card"
                                key={gallery.id}
                            >
                                <div className="gaf-gallery-card-image">
                                    {gallery.cover_image ? (
                                        <img
                                            src={`/uploads/${gallery.cover_image}`}
                                            alt={gallery.title}
                                        />
                                    ) : (
                                        <div className="gaf-gallery-no-image">
                                            <i className="bi bi-images" />
                                            <span>No cover image</span>
                                        </div>
                                    )}

                                    <span
                                        className={`gaf-gallery-visibility ${
                                            gallery.is_public
                                                ? "is-public"
                                                : "is-private"
                                        }`}
                                    >
                                        <i
                                            className={`bi ${
                                                gallery.is_public
                                                    ? "bi-globe2"
                                                    : "bi-lock-fill"
                                            }`}
                                        />
                                        {gallery.is_public
                                            ? "Public"
                                            : "Private"}
                                    </span>

                                    <span className="gaf-gallery-order">
                                        #{gallery.sort_order ?? 0}
                                    </span>
                                </div>

                                <div className="gaf-gallery-card-body">
                                    <div className="gaf-gallery-card-title-row">
                                        <h6>{gallery.title}</h6>

                                        <button
                                            type="button"
                                            className="gaf-gallery-more-btn"
                                            title="View gallery details"
                                            onClick={() =>
                                                openViewModal(gallery)
                                            }
                                        >
                                            <i className="bi bi-three-dots" />
                                        </button>
                                    </div>

                                    <p className="gaf-gallery-card-description">
                                        {gallery.description ||
                                            "No description has been provided for this gallery."}
                                    </p>

                                    <div className="gaf-gallery-card-meta">
                                        <span>
                                            <i className="bi bi-calendar3 me-1" />
                                            {formatDate(gallery.created_at)}
                                        </span>

                                        <span>
                                            <i className="bi bi-hash me-1" />
                                            ID {gallery.id}
                                        </span>
                                    </div>

                                    <div className="gaf-gallery-card-actions">
                                        <Link
                                            href={route(
                                                "admin.events.galleries.media.index",
                                                [event.id, gallery.id]
                                            )}
                                            className="gaf-gallery-manage-btn"
                                        >
                                            <i className="bi bi-images me-2" />
                                            Manage Media
                                            <i className="bi bi-arrow-right ms-auto" />
                                        </Link>

                                        <div className="gaf-gallery-icon-actions">
                                            <button
                                                type="button"
                                                title="View gallery"
                                                onClick={() =>
                                                    openViewModal(gallery)
                                                }
                                            >
                                                <i className="bi bi-eye" />
                                            </button>

                                            <button
                                                type="button"
                                                title="Edit gallery"
                                                onClick={() =>
                                                    openEditModal(gallery)
                                                }
                                            >
                                                <i className="bi bi-pencil" />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete gallery"
                                                className="gaf-gallery-delete-btn"
                                                onClick={() =>
                                                    deleteGallery(gallery)
                                                }
                                            >
                                                <i className="bi bi-trash3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="gaf-gallery-empty">
                        <div className="gaf-gallery-empty-icon">
                            <i className="bi bi-images" />
                        </div>

                        <h5>No galleries created yet</h5>

                        <p>
                            Start organizing event photos by creating your
                            first gallery. You can add images and manage their
                            visibility afterwards.
                        </p>

                        <button
                            type="button"
                            className="btn gaf-gallery-create-btn"
                            onClick={openCreateModal}
                        >
                            <i className="bi bi-plus-lg me-2" />
                            Create First Gallery
                        </button>
                    </div>
                )}
            </div>

            {/* Gallery modal */}
            {modalOpen && (
                <>
                    <div
                        className="gaf-gallery-modal-backdrop"
                        onClick={closeModal}
                    />

                    <div
                        className="gaf-gallery-modal-wrapper"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gafGalleryModalTitle"
                    >
                        <div className="gaf-gallery-modal">
                            {/* Modal header */}
                            <div className="gaf-gallery-modal-header">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="gaf-gallery-modal-icon">
                                        <i
                                            className={`bi ${
                                                modalMode === "view"
                                                    ? "bi-eye"
                                                    : modalMode === "edit"
                                                    ? "bi-pencil-square"
                                                    : "bi-plus-lg"
                                            }`}
                                        />
                                    </div>

                                    <div>
                                        <h5 id="gafGalleryModalTitle">
                                            {modalMode === "create"
                                                ? "Create Gallery"
                                                : modalMode === "edit"
                                                ? "Edit Gallery"
                                                : "Gallery Details"}
                                        </h5>

                                        <p>
                                            {modalMode === "view"
                                                ? "Review this gallery's information."
                                                : "Add and manage your event gallery details."}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="gaf-gallery-modal-close"
                                    onClick={closeModal}
                                    disabled={processing}
                                    aria-label="Close"
                                >
                                    <i className="bi bi-x-lg" />
                                </button>
                            </div>

                            {/* View mode */}
                            {modalMode === "view" && selectedGallery && (
                                <>
                                    <div className="gaf-gallery-modal-body">
                                        <div className="gaf-gallery-view-image">
                                            {selectedGallery.cover_image ? (
                                                <img
                                                    src={`/uploads/${selectedGallery.cover_image}`}
                                                    alt={selectedGallery.title}
                                                />
                                            ) : (
                                                <div className="gaf-gallery-no-image">
                                                    <i className="bi bi-images" />
                                                    <span>No cover image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="gaf-gallery-view-title-row">
                                            <div>
                                                <h4>{selectedGallery.title}</h4>
                                                <span className="gaf-gallery-view-slug">
                                                    {selectedGallery.slug}
                                                </span>
                                            </div>

                                            <span
                                                className={`gaf-gallery-visibility ${
                                                    selectedGallery.is_public
                                                        ? "is-public"
                                                        : "is-private"
                                                }`}
                                            >
                                                <i
                                                    className={`bi ${
                                                        selectedGallery.is_public
                                                            ? "bi-globe2"
                                                            : "bi-lock-fill"
                                                    }`}
                                                />
                                                {selectedGallery.is_public
                                                    ? "Public"
                                                    : "Private"}
                                            </span>
                                        </div>

                                        <div className="gaf-gallery-view-description">
                                            <span>DESCRIPTION</span>
                                            <p>
                                                {selectedGallery.description ||
                                                    "No description provided."}
                                            </p>
                                        </div>

                                        <div className="gaf-gallery-view-details">
                                            <div>
                                                <span>Display Order</span>
                                                <strong>
                                                    {selectedGallery.sort_order ??
                                                        0}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Created</span>
                                                <strong>
                                                    {formatDate(
                                                        selectedGallery.created_at
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Last Updated</span>
                                                <strong>
                                                    {formatDate(
                                                        selectedGallery.updated_at
                                                    )}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gaf-gallery-modal-footer">
                                        <button
                                            type="button"
                                            className="gaf-gallery-cancel-btn"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>

                                        <button
                                            type="button"
                                            className="gaf-gallery-create-btn"
                                            onClick={() =>
                                                openEditModal(selectedGallery)
                                            }
                                        >
                                            <i className="bi bi-pencil me-2" />
                                            Edit Gallery
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Create and edit modes */}
                            {(modalMode === "create" ||
                                modalMode === "edit") && (
                                <form onSubmit={submit}>
                                    <div className="gaf-gallery-modal-body">
                                        <div className="gaf-gallery-form-section">
                                            <div className="gaf-gallery-form-section-heading">
                                                <h6>Gallery Information</h6>
                                                <p>
                                                    Provide the basic details
                                                    for this collection.
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="gaf-gallery-label">
                                                    Gallery Title
                                                    <span>*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    className={`form-control gaf-gallery-input ${
                                                        errors.title
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Community Outreach 2026"
                                                    required
                                                />

                                                {errors.title && (
                                                    <div className="invalid-feedback">
                                                        {errors.title}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="gaf-gallery-label">
                                                    Gallery Title (Kinyarwanda)
                                                </label>

                                                <input
                                                    type="text"
                                                className={`form-control gaf-gallery-input ${
                                                        errors.title_rw ? "is-invalid" : ""
                                                    }`}
                                                    value={data.title_rw || ""}
                                                    onChange={(e) =>
                                                        setData("title_rw", e.target.value)
                                                    }
                                                    placeholder="Urugero: Ubukangurambaga 2026"
                                                />

                                                {errors.title_rw && (
                                                    <div className="invalid-feedback">
                                                        {errors.title_rw}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label className="gaf-gallery-label">
                                                    URL Slug
                                                </label>

                                                <div className="gaf-gallery-slug-input">
                                                    <span>
                                                        <i className="bi bi-link-45deg" />
                                                    </span>

                                                    <input
                                                        type="text"
                                                        className={`form-control gaf-gallery-input ${
                                                            errors.slug
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={data.slug}
                                                        onChange={(e) =>
                                                            setData(
                                                                "slug",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="gallery-url-slug"
                                                    />
                                                </div>

                                                {errors.slug && (
                                                    <div className="text-danger small mt-1">
                                                        {errors.slug}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label className="gaf-gallery-label">
                                                    Description
                                                </label>

                                                <textarea
                                                    rows="4"
                                                    className={`form-control gaf-gallery-input gaf-gallery-textarea ${
                                                        errors.description
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={data.description}
                                                    onChange={(e) =>
                                                        setData(
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Write a short description about this gallery..."
                                                />

                                                {errors.description && (
                                                    <div className="invalid-feedback">
                                                        {errors.description}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="gaf-gallery-label">
                                                    Description (Kinyarwanda)
                                                </label>

                                                <textarea
                                                    rows="3"
                                                className={`form-control gaf-gallery-input ${
                                                        errors.description_rw ? "is-invalid" : ""
                                                    }`}
                                                    value={data.description_rw || ""}
                                                    onChange={(e) =>
                                                        setData("description_rw", e.target.value)
                                                    }
                                                    placeholder="Ibisobanuro bigufi mu Kinyarwanda..."
                                                />

                                                {errors.description_rw && (
                                                    <div className="invalid-feedback">
                                                        {errors.description_rw}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="gaf-gallery-form-section">
                                            <div className="gaf-gallery-form-section-heading">
                                                <h6>Gallery Cover</h6>
                                                <p>
                                                    Upload an image to represent
                                                    this gallery.
                                                </p>
                                            </div>

                                            <div className="gaf-gallery-upload">
                                                {preview ? (
                                                    <div className="gaf-gallery-upload-preview">
                                                        <img
                                                            src={preview}
                                                            alt="Gallery cover preview"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleImage(null)
                                                            }
                                                            title="Remove selected image"
                                                        >
                                                            <i className="bi bi-x-lg" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="gaf-gallery-upload-empty">
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp"
                                                            onChange={(e) =>
                                                                handleImage(
                                                                    e.target
                                                                        .files?.[0] ||
                                                                        null
                                                                )
                                                            }
                                                        />

                                                        <span className="gaf-gallery-upload-icon">
                                                            <i className="bi bi-cloud-arrow-up" />
                                                        </span>

                                                        <strong>
                                                            Choose a cover image
                                                        </strong>

                                                        <span>
                                                            Click to browse JPG,
                                                            PNG or WEBP
                                                        </span>

                                                        <small>
                                                            Maximum file size:
                                                            5 MB
                                                        </small>
                                                    </label>
                                                )}

                                                {preview && (
                                                    <label className="gaf-gallery-replace-image">
                                                        <input
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/webp"
                                                            onChange={(e) =>
                                                                handleImage(
                                                                    e.target
                                                                        .files?.[0] ||
                                                                        null
                                                                )
                                                            }
                                                        />
                                                        <i className="bi bi-arrow-repeat me-2" />
                                                        Replace image
                                                    </label>
                                                )}
                                            </div>

                                            {errors.cover_image && (
                                                <div className="text-danger small mt-2">
                                                    {errors.cover_image}
                                                </div>
                                            )}
                                        </div>

                                        <div className="gaf-gallery-form-section">
                                            <div className="gaf-gallery-form-section-heading">
                                                <h6>Display Settings</h6>
                                                <p>
                                                    Control the order and
                                                    visibility of this gallery.
                                                </p>
                                            </div>

                                            <div className="gaf-gallery-settings-grid">
                                                <div>
                                                    <label className="gaf-gallery-label">
                                                        Display Order
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        className={`form-control gaf-gallery-input ${
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
                                                </div>

                                                <div className="gaf-gallery-visibility-setting">
                                                    <div>
                                                        <strong>
                                                            Public Gallery
                                                        </strong>
                                                        <span>
                                                            Visible to website
                                                            visitors
                                                        </span>
                                                    </div>

                                                    <div className="form-check form-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            role="switch"
                                                            id="gallery_is_public"
                                                            checked={Boolean(
                                                                data.is_public
                                                            )}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_public",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="gaf-gallery-visibility-note">
                                                <i className="bi bi-info-circle" />
                                                <span>
                                                    {data.is_public
                                                        ? "This gallery can be displayed on the public website."
                                                        : "This gallery will remain hidden from public visitors."}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gaf-gallery-modal-footer">
                                        <button
                                            type="button"
                                            className="gaf-gallery-cancel-btn"
                                            onClick={closeModal}
                                            disabled={processing}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="gaf-gallery-create-btn"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check2 me-2" />
                                                    {modalMode === "edit"
                                                        ? "Save Changes"
                                                        : "Create Gallery"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </>
            )}

            <style>{`
                .gaf-gallery-page {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 8px 0 35px;
                    color: #172033;
                }

                .gaf-gallery-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 22px;
                    margin-bottom: 25px;
                }

                .gaf-gallery-breadcrumb {
                    margin-bottom: 17px;
                    font-size: 12px;
                }

                .gaf-gallery-breadcrumb a {
                    color: #8490a1;
                    text-decoration: none;
                }

                .gaf-gallery-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-gallery-breadcrumb .active {
                    color: #263247;
                    font-weight: 600;
                }

                .gaf-gallery-heading-icon {
                    display: flex;
                    width: 47px;
                    height: 47px;
                    flex: 0 0 47px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-gallery-page-title {
                    margin: 0 0 5px;
                    color: #172033;
                    font-size: 24px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .gaf-gallery-page-subtitle {
                    margin: 0;
                    color: #8791a1;
                    font-size: 12px;
                    line-height: 1.6;
                }

                .gaf-gallery-page-subtitle strong {
                    color: #56647a;
                    font-weight: 650;
                }

                .gaf-gallery-header-actions {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 9px;
                }

                .gaf-gallery-header-actions .btn {
                    min-height: 41px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 15px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 650;
                    transition: all .2s ease;
                }

                .gaf-gallery-back-btn {
                    border: 1px solid #e1e6ee;
                    background: #fff;
                    color: #536075;
                }

                .gaf-gallery-back-btn:hover {
                    background: #f5f7fa;
                    color: #263247;
                }

                .gaf-gallery-create-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 40px;
                    padding: 0 16px;
                    border: 1px solid #20603d;
                    border-radius: 8px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 650;
                    text-decoration: none;
                    transition: all .2s ease;
                }

                .gaf-gallery-create-btn:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-gallery-create-btn:disabled {
                    opacity: .7;
                    cursor: not-allowed;
                }

                /* Alerts */

                .gaf-gallery-alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 13px 16px;
                    margin-bottom: 18px;
                    border: 1px solid transparent;
                    border-radius: 9px;
                    font-size: 12px;
                }

                .gaf-gallery-alert-success {
                    border-color: #d5eadc;
                    background: #f0f8f2;
                    color: #28794a;
                }

                .gaf-gallery-alert-error {
                    border-color: #f0d8d5;
                    background: #fff4f2;
                    color: #b54e45;
                }

                /* Event context */

                .gaf-gallery-event-context {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 15px 19px;
                    margin-bottom: 20px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-gallery-event-context-icon {
                    display: flex;
                    width: 38px;
                    height: 38px;
                    flex: 0 0 38px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #f0f5fb;
                    color: #20603d;
                    font-size: 16px;
                }

                .gaf-gallery-event-context-info {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    gap: 3px;
                    min-width: 0;
                }

                .gaf-gallery-event-context-info span,
                .gaf-gallery-event-context-meta span {
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .6px;
                }

                .gaf-gallery-event-context-info strong {
                    overflow: hidden;
                    color: #344158;
                    font-size: 12px;
                    font-weight: 700;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-gallery-event-context-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    padding: 0 20px;
                    border-left: 1px solid #edf0f4;
                }

                .gaf-gallery-event-context-meta strong {
                    color: #465268;
                    font-size: 12px;
                }

                .gaf-gallery-event-link {
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .gaf-gallery-event-link:hover {
                    color: #174a2f;
                }

                /* Statistics */

                .gaf-gallery-stats {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .gaf-gallery-stat-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    min-height: 120px;
                    padding: 19px 21px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-gallery-stat-content {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-gallery-stat-content > span {
                    color: #7e899a;
                    font-size: 11px;
                    font-weight: 600;
                }

                .gaf-gallery-stat-content strong {
                    color: #263247;
                    font-size: 27px;
                    font-weight: 750;
                    line-height: 1.2;
                }

                .gaf-gallery-stat-content small {
                    color: #a0a8b4;
                    font-size: 10px;
                }

                .gaf-gallery-stat-icon {
                    display: flex;
                    width: 43px;
                    height: 43px;
                    flex: 0 0 43px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 11px;
                    font-size: 18px;
                }

                .gaf-stat-blue {
                    background: #edf3fb;
                    color: #20603d;
                }

                .gaf-stat-green {
                    background: #eaf6ef;
                    color: #31885a;
                }

                .gaf-stat-grey {
                    background: #f0f2f5;
                    color: #788397;
                }

                /* Gallery heading */

                .gaf-gallery-section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin-bottom: 17px;
                }

                .gaf-gallery-section-header h5 {
                    margin: 0 0 4px;
                    color: #29364a;
                    font-size: 15px;
                    font-weight: 750;
                }

                .gaf-gallery-section-header p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                }

                .gaf-gallery-count {
                    padding: 6px 10px;
                    border: 1px solid #e6ebf2;
                    border-radius: 20px;
                    background: #fff;
                    color: #68758a;
                    font-size: 10px;
                    font-weight: 650;
                }

                /* Gallery cards */

                .gaf-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 20px;
                }

                .gaf-gallery-card {
                    min-width: 0;
                    overflow: hidden;
                    border: 1px solid #e7ecf2;
                    border-radius: 11px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                    transition: transform .2s ease, box-shadow .2s ease;
                }

                .gaf-gallery-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 9px 22px rgba(25, 42, 70, .075);
                }

                .gaf-gallery-card-image {
                    position: relative;
                    height: 205px;
                    overflow: hidden;
                    background: #eef2f7;
                }

                .gaf-gallery-card-image > img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform .35s ease;
                }

                .gaf-gallery-card:hover .gaf-gallery-card-image > img {
                    transform: scale(1.035);
                }

                .gaf-gallery-no-image {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 9px;
                    background: #eef3f9;
                    color: #97a5b7;
                    font-size: 11px;
                }

                .gaf-gallery-no-image i {
                    color: #9bacc1;
                    font-size: 35px;
                }

                .gaf-gallery-visibility {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                    line-height: 1;
                }

                .gaf-gallery-card-image .gaf-gallery-visibility {
                    position: absolute;
                    top: 13px;
                    left: 13px;
                    box-shadow: 0 2px 7px rgba(0,0,0,.08);
                }

                .gaf-gallery-visibility.is-public {
                    background: #e8f6ee;
                    color: #278451;
                }

                .gaf-gallery-visibility.is-private {
                    background: #f0f2f5;
                    color: #687386;
                }

                .gaf-gallery-order {
                    position: absolute;
                    top: 13px;
                    right: 13px;
                    padding: 5px 8px;
                    border: 1px solid rgba(255,255,255,.4);
                    border-radius: 6px;
                    background: rgba(23,32,51,.58);
                    color: #fff;
                    font-size: 10px;
                    font-weight: 650;
                    backdrop-filter: blur(5px);
                }

                .gaf-gallery-card-body {
                    padding: 16px;
                }

                .gaf-gallery-card-title-row {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 8px;
                }

                .gaf-gallery-card-title-row h6 {
                    overflow: hidden;
                    margin: 0;
                    color: #29364a;
                    font-size: 13px;
                    font-weight: 750;
                    line-height: 1.5;
                    text-overflow: ellipsis;
                }

                .gaf-gallery-more-btn {
                    display: flex;
                    width: 27px;
                    height: 27px;
                    flex: 0 0 27px;
                    align-items: center;
                    justify-content: center;
                    margin-top: -5px;
                    border: 0;
                    border-radius: 6px;
                    background: transparent;
                    color: #8994a4;
                }

                .gaf-gallery-more-btn:hover {
                    background: #f1f5fa;
                    color: #20603d;
                }

                .gaf-gallery-card-description {
                    display: -webkit-box;
                    min-height: 37px;
                    overflow: hidden;
                    margin: 8px 0 13px;
                    color: #8b95a4;
                    font-size: 11px;
                    line-height: 1.7;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .gaf-gallery-card-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    padding: 10px 0;
                    border-top: 1px solid #f0f2f5;
                    color: #9aa3b0;
                    font-size: 9px;
                }

                .gaf-gallery-card-meta span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-gallery-card-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-top: 11px;
                    border-top: 1px solid #f0f2f5;
                }

                .gaf-gallery-manage-btn {
                    display: inline-flex;
                    min-width: 0;
                    min-height: 36px;
                    flex: 1;
                    align-items: center;
                    padding: 0 10px;
                    border: 1px solid #e2efe8;
                    border-radius: 7px;
                    background: #f3f7fc;
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all .2s ease;
                }

                .gaf-gallery-manage-btn:hover {
                    border-color: #20603d;
                    background: #eff6f2;
                    color: #174a2f;
                }

                .gaf-gallery-icon-actions {
                    display: flex;
                    gap: 4px;
                }

                .gaf-gallery-icon-actions button {
                    display: flex;
                    width: 33px;
                    height: 33px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e9edf2;
                    border-radius: 7px;
                    background: #fff;
                    color: #788397;
                    font-size: 12px;
                    transition: all .2s ease;
                }

                .gaf-gallery-icon-actions button:hover {
                    border-color: #d0e6da;
                    background: #f4f7fb;
                    color: #20603d;
                }

                .gaf-gallery-icon-actions button.gaf-gallery-delete-btn:hover {
                    border-color: #f0d6d3;
                    background: #fff4f2;
                    color: #c04e46;
                }

                /* Empty state */

                .gaf-gallery-empty {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    padding: 65px 25px;
                    border: 1px dashed #dce3ec;
                    border-radius: 12px;
                    background: #fff;
                    text-align: center;
                }

                .gaf-gallery-empty-icon {
                    display: flex;
                    width: 68px;
                    height: 68px;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 18px;
                    border-radius: 20px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 27px;
                }

                .gaf-gallery-empty h5 {
                    margin-bottom: 7px;
                    color: #344158;
                    font-size: 16px;
                    font-weight: 750;
                }

                .gaf-gallery-empty p {
                    max-width: 430px;
                    margin-bottom: 20px;
                    color: #929baa;
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* Modal */

                .gaf-gallery-modal-backdrop {
                    position: fixed;
                    z-index: 1040;
                    inset: 0;
                    background: rgba(19, 29, 45, .55);
                    backdrop-filter: blur(2px);
                }

                .gaf-gallery-modal-wrapper {
                    position: fixed;
                    z-index: 1050;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow-y: auto;
                }

                .gaf-gallery-modal {
                    width: 100%;
                    max-width: 680px;
                    max-height: calc(100vh - 40px);
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,.5);
                    border-radius: 14px;
                    background: #fff;
                    box-shadow: 0 20px 65px rgba(10, 24, 45, .2);
                    animation: gafGalleryModalIn .2s ease-out;
                }

                @keyframes gafGalleryModalIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .gaf-gallery-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 20px 23px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-gallery-modal-icon {
                    display: flex;
                    width: 39px;
                    height: 39px;
                    flex: 0 0 39px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 16px;
                }

                .gaf-gallery-modal-header h5 {
                    margin: 0 0 4px;
                    color: #263247;
                    font-size: 15px;
                    font-weight: 750;
                }

                .gaf-gallery-modal-header p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                }

                .gaf-gallery-modal-close {
                    display: flex;
                    width: 33px;
                    height: 33px;
                    flex: 0 0 33px;
                    align-items: center;
                    justify-content: center;
                    border: 0;
                    border-radius: 8px;
                    background: #f3f5f8;
                    color: #778397;
                    font-size: 13px;
                }

                .gaf-gallery-modal-close:hover {
                    background: #e9edf3;
                    color: #344158;
                }

                .gaf-gallery-modal-body {
                    max-height: calc(100vh - 180px);
                    padding: 22px 23px;
                    overflow-y: auto;
                }

                .gaf-gallery-modal-footer {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 9px;
                    padding: 15px 23px;
                    border-top: 1px solid #edf0f4;
                    background: #fbfcfd;
                }

                .gaf-gallery-cancel-btn {
                    min-height: 39px;
                    padding: 0 15px;
                    border: 1px solid #e1e6ed;
                    border-radius: 8px;
                    background: #fff;
                    color: #59667a;
                    font-size: 11px;
                    font-weight: 650;
                }

                .gaf-gallery-cancel-btn:hover {
                    background: #f4f6f9;
                }

                /* Modal form */

                .gaf-gallery-form-section {
                    padding-bottom: 21px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-gallery-form-section:last-child {
                    padding-bottom: 0;
                    margin-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-gallery-form-section-heading {
                    margin-bottom: 16px;
                }

                .gaf-gallery-form-section-heading h6 {
                    margin: 0 0 4px;
                    color: #344158;
                    font-size: 12px;
                    font-weight: 750;
                }

                .gaf-gallery-form-section-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-gallery-label {
                    display: block;
                    margin-bottom: 7px;
                    color: #48566b;
                    font-size: 11px;
                    font-weight: 700;
                }

                .gaf-gallery-label > span {
                    margin-left: 3px;
                    color: #d05a50;
                }

                .gaf-gallery-input {
                    min-height: 40px;
                    border: 1px solid #dfe5ed;
                    border-radius: 7px;
                    background: #fff;
                    color: #344158;
                    font-size: 12px;
                    box-shadow: none;
                }

                .gaf-gallery-input:focus {
                    border-color: #98caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .1);
                }

                .gaf-gallery-input::placeholder {
                    color: #aab2be;
                }

                .gaf-gallery-textarea {
                    min-height: 100px;
                    resize: vertical;
                    line-height: 1.65;
                }

                .gaf-gallery-slug-input {
                    position: relative;
                }

                .gaf-gallery-slug-input > span {
                    position: absolute;
                    z-index: 1;
                    top: 50%;
                    left: 12px;
                    color: #91a0b3;
                    transform: translateY(-50%);
                }

                .gaf-gallery-slug-input input {
                    padding-left: 34px;
                }

                /* Image upload */

                .gaf-gallery-upload-empty {
                    display: flex;
                    min-height: 170px;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 7px;
                    padding: 20px;
                    border: 1px dashed #cee5d8;
                    border-radius: 10px;
                    background: #f8fafd;
                    cursor: pointer;
                    text-align: center;
                    transition: all .2s ease;
                }

                .gaf-gallery-upload-empty:hover {
                    border-color: #20603d;
                    background: #f1f6fc;
                }

                .gaf-gallery-upload-empty input,
                .gaf-gallery-replace-image input {
                    display: none;
                }

                .gaf-gallery-upload-icon {
                    display: flex;
                    width: 42px;
                    height: 42px;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 3px;
                    border-radius: 12px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 20px;
                }

                .gaf-gallery-upload-empty strong {
                    color: #46566e;
                    font-size: 12px;
                }

                .gaf-gallery-upload-empty > span:not(.gaf-gallery-upload-icon) {
                    color: #8995a6;
                    font-size: 10px;
                }

                .gaf-gallery-upload-empty small {
                    color: #a1aab7;
                    font-size: 9px;
                }

                .gaf-gallery-upload-preview {
                    position: relative;
                    overflow: hidden;
                    border-radius: 9px;
                    background: #eef2f7;
                }

                .gaf-gallery-upload-preview img {
                    display: block;
                    width: 100%;
                    max-height: 220px;
                    object-fit: cover;
                }

                .gaf-gallery-upload-preview button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    width: 30px;
                    height: 30px;
                    align-items: center;
                    justify-content: center;
                    border: 0;
                    border-radius: 50%;
                    background: rgba(25, 35, 52, .75);
                    color: #fff;
                    font-size: 11px;
                }

                .gaf-gallery-replace-image {
                    display: inline-flex;
                    align-items: center;
                    margin-top: 10px;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 650;
                    cursor: pointer;
                }

                .gaf-gallery-settings-grid {
                    display: grid;
                    grid-template-columns: minmax(120px, .7fr) minmax(0, 1.3fr);
                    gap: 15px;
                    align-items: end;
                }

                .gaf-gallery-visibility-setting {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    min-height: 40px;
                    padding: 8px 12px;
                    border: 1px solid #e5eaf1;
                    border-radius: 8px;
                    background: #fafbfd;
                }

                .gaf-gallery-visibility-setting > div:first-child {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .gaf-gallery-visibility-setting strong {
                    color: #48566b;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-gallery-visibility-setting span {
                    color: #939eac;
                    font-size: 9px;
                }

                .gaf-gallery-visibility-setting .form-check {
                    margin: 0;
                }

                .gaf-gallery-visibility-setting .form-check-input {
                    width: 34px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                }

                .gaf-gallery-visibility-setting .form-check-input:checked {
                    border-color: #20603d;
                    background-color: #20603d;
                }

                .gaf-gallery-visibility-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    margin-top: 12px;
                    color: #8190a4;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-gallery-visibility-note i {
                    color: #20603d;
                }

                /* View modal */

                .gaf-gallery-view-image {
                    height: 220px;
                    overflow: hidden;
                    margin-bottom: 18px;
                    border-radius: 9px;
                    background: #eef2f7;
                }

                .gaf-gallery-view-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gaf-gallery-view-title-row {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .gaf-gallery-view-title-row h4 {
                    margin: 0 0 5px;
                    color: #29364a;
                    font-size: 17px;
                    font-weight: 750;
                }

                .gaf-gallery-view-slug {
                    color: #8c98a8;
                    font-size: 10px;
                    overflow-wrap: anywhere;
                }

                .gaf-gallery-view-description {
                    padding: 15px;
                    margin-bottom: 17px;
                    border-radius: 8px;
                    background: #f7f9fc;
                }

                .gaf-gallery-view-description > span {
                    display: block;
                    margin-bottom: 7px;
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .6px;
                }

                .gaf-gallery-view-description p {
                    margin: 0;
                    color: #667387;
                    font-size: 11px;
                    line-height: 1.7;
                }

                .gaf-gallery-view-details {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 10px;
                }

                .gaf-gallery-view-details > div {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 12px;
                    border: 1px solid #edf0f4;
                    border-radius: 8px;
                }

                .gaf-gallery-view-details span {
                    color: #929baa;
                    font-size: 9px;
                }

                .gaf-gallery-view-details strong {
                    color: #465268;
                    font-size: 10px;
                }

                @media (max-width: 1100px) {
                    .gaf-gallery-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .gaf-gallery-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }
                }

                @media (max-width: 700px) {
                    .gaf-gallery-stats {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }

                    .gaf-gallery-stat-card {
                        min-height: 95px;
                    }

                    .gaf-gallery-grid {
                        grid-template-columns: 1fr;
                    }

                    .gaf-gallery-card-image {
                        height: 220px;
                    }

                    .gaf-gallery-event-context {
                        flex-wrap: wrap;
                    }

                    .gaf-gallery-event-context-info {
                        flex-basis: calc(100% - 60px);
                    }

                    .gaf-gallery-event-context-meta {
                        padding-left: 0;
                        border-left: 0;
                    }

                    .gaf-gallery-event-link {
                        margin-left: auto;
                    }
                }

                @media (max-width: 520px) {
                    .gaf-gallery-header-actions {
                        display: grid;
                        width: 100%;
                        grid-template-columns: 1fr 1fr;
                    }

                    .gaf-gallery-header-actions .btn {
                        padding: 0 8px;
                        font-size: 10px;
                    }

                    .gaf-gallery-page-title {
                        font-size: 21px;
                    }

                    .gaf-gallery-modal-wrapper {
                        align-items: flex-end;
                        padding: 8px;
                    }

                    .gaf-gallery-modal {
                        max-height: calc(100vh - 16px);
                        border-radius: 13px;
                    }

                    .gaf-gallery-modal-header,
                    .gaf-gallery-modal-body {
                        padding-right: 16px;
                        padding-left: 16px;
                    }

                    .gaf-gallery-modal-footer {
                        padding-right: 16px;
                        padding-left: 16px;
                    }

                    .gaf-gallery-settings-grid {
                        grid-template-columns: 1fr;
                    }

                    .gaf-gallery-view-details {
                        grid-template-columns: 1fr;
                    }

                    .gaf-gallery-view-title-row {
                        flex-direction: column;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
