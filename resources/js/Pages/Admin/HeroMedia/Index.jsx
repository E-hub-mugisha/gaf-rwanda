
import React, { useEffect, useMemo, useState } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { parseVimeo, vimeoEmbedUrl } from "@/lib/vimeo";

const initialValues = {
    title: "",
    vimeo_url: "",
    banner_image: null,
    alt_text: "",
    caption: "",
    is_active: false,
    sort_order: 0,
};

export default function Index({ media = [] }) {
    const { flash } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        transform,
    } = useForm(initialValues);

    // Live player preview of the Vimeo link being typed.
    const videoPreview = useMemo(
        () => vimeoEmbedUrl(data.vimeo_url),
        [data.vimeo_url]
    );

    const vimeoLinkInvalid = Boolean(data.vimeo_url) && !parseVimeo(data.vimeo_url);

    const previewImage = imagePreview;

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const openCreateModal = () => {
        setEditing(null);
        reset();
        clearErrors();
        setImagePreview(null);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditing(item);
        clearErrors();

        setData({
            title: item.title || "",
            vimeo_url: item.vimeo_url || "",
            banner_image: null,
            alt_text: item.alt_text || "",
            caption: item.caption || "",
            is_active: Boolean(item.is_active),
            sort_order: item.sort_order ?? 0,
        });

        setImagePreview(item.banner_image || null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditing(null);
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] || null;

        setData("banner_image", file);

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    // CORRECTED CREATE AND UPDATE SUBMISSION
    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        };

        if (editing) {
            // Laravel method spoofing for multipart image updates.
            transform((formData) => ({
                ...formData,
                _method: "PUT",
            }));

            post(
                route("admin.hero-media.update", editing.id),
                options
            );
        } else {
            transform((formData) => {
                const { _method, ...rest } = formData;
                return rest;
            });

            post(
                route("admin.hero-media.store"),
                options
            );
        }
    };

    const activateMedia = (item) => {
        if (item.is_active) return;

        router.patch(
            route("admin.hero-media.activate", item.id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const deleteMedia = (item) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.title || "this hero media"}"?`
        );

        if (!confirmed) return;

        router.delete(
            route("admin.hero-media.destroy", item.id),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Hero Media Management" />

            <div className="container-fluid py-4">

                {/* PAGE HEADER */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                        <div className="text-uppercase small fw-semibold text-primary mb-1">
                            Website Content
                        </div>

                        <h3 className="fw-bold mb-1">
                            Hero Media
                        </h3>

                        <p className="text-muted mb-0">
                            Manage the video and banner displayed in the homepage hero section.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={openCreateModal}
                    >
                        <i className="bi bi-plus-lg me-2" />
                        Add Hero Media
                    </button>
                </div>

                {/* FLASH MESSAGE */}
                {flash?.success && (
                    <div className="alert alert-success alert-dismissible fade show">
                        {flash.success}

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {/* STATISTICS */}
                <div className="row g-3 mb-4">

                    <div className="col-sm-6 col-xl-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 p-3 bg-primary bg-opacity-10 text-primary">
                                    <i className="bi bi-images fs-4" />
                                </div>

                                <div>
                                    <div className="text-muted small">
                                        Total media
                                    </div>
                                    <h4 className="fw-bold mb-0">
                                        {media.length}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success">
                                    <i className="bi bi-check-circle fs-4" />
                                </div>

                                <div>
                                    <div className="text-muted small">
                                        Active media
                                    </div>
                                    <h4 className="fw-bold mb-0">
                                        {media.filter(item => item.is_active).length}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 p-3 bg-info bg-opacity-10 text-info">
                                    <i className="bi bi-play-circle fs-4" />
                                </div>

                                <div>
                                    <div className="text-muted small">
                                        Vimeo videos
                                    </div>
                                    <h4 className="fw-bold mb-0">
                                        {media.filter(item => item.vimeo_url).length}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* MEDIA TABLE */}
                <div className="card border-0 shadow-sm">

                    <div className="card-header bg-white border-0 py-3">
                        <h6 className="fw-bold mb-0">
                            Homepage hero media
                        </h6>
                    </div>

                    <div className="card-body p-0">

                        {media.length === 0 ? (
                            <div className="text-center py-5 px-3">
                                <i className="bi bi-camera-video fs-1 text-muted" />

                                <h6 className="fw-bold mt-3">
                                    No hero media added
                                </h6>

                                <p className="text-muted mb-3">
                                    Add a Vimeo video or banner image to display on the homepage.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={openCreateModal}
                                >
                                    Add Hero Media
                                </button>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">

                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-4">Media</th>
                                            <th>Type</th>
                                            <th>Order</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th className="text-end pe-4">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {media.map(item => {
                                            const thumbnail =
                                                item.banner_image ||
                                                item.video_thumbnail ||
                                                null;

                                            return (
                                                <tr key={item.id}>

                                                    <td className="ps-4">
                                                        <div className="d-flex align-items-center gap-3">

                                                            <div
                                                                className="rounded-2 overflow-hidden bg-light flex-shrink-0"
                                                                style={{
                                                                    width: 100,
                                                                    height: 62,
                                                                }}
                                                            >
                                                                {thumbnail ? (
                                                                    <img
                                                                        src={thumbnail}
                                                                        alt={item.alt_text || item.title || "Hero media"}
                                                                        className="w-100 h-100"
                                                                        style={{
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                                                        <i className="bi bi-image fs-3" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <div className="fw-semibold">
                                                                    {item.title || "Untitled hero media"}
                                                                </div>

                                                                <div
                                                                    className="text-muted small"
                                                                    style={{
                                                                        maxWidth: 260,
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                    }}
                                                                >
                                                                    {item.caption || item.vimeo_url || "No caption"}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td>
                                                        {item.vimeo_url ? (
                                                            <span className="badge text-bg-info">
                                                                <i className="bi bi-vimeo me-1" />
                                                                Vimeo
                                                            </span>
                                                        ) : (
                                                            <span className="badge text-bg-secondary">
                                                                <i className="bi bi-image me-1" />
                                                                Image
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>{item.sort_order}</td>

                                                    <td>
                                                        {item.is_active ? (
                                                            <span className="badge text-bg-success">
                                                                Active
                                                            </span>
                                                        ) : (
                                                            <span className="badge text-bg-secondary">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="text-muted small">
                                                        {item.created_at || "—"}
                                                    </td>

                                                    <td className="text-end pe-4">
                                                        <div className="d-inline-flex gap-1">

                                                            {!item.is_active && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-success"
                                                                    title="Activate"
                                                                    onClick={() => activateMedia(item)}
                                                                >
                                                                    <i className="bi bi-check-lg" />
                                                                </button>
                                                            )}

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                                title="Edit"
                                                                onClick={() => openEditModal(item)}
                                                            >
                                                                <i className="bi bi-pencil" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                title="Delete"
                                                                onClick={() => deleteMedia(item)}
                                                            >
                                                                <i className="bi bi-trash" />
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* CREATE / EDIT MODAL */}
            {showModal && (
                <>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content border-0 shadow">

                                <form onSubmit={handleSubmit}>

                                    <div className="modal-header">
                                        <div>
                                            <h5 className="modal-title fw-bold">
                                                {editing ? "Edit Hero Media" : "Add Hero Media"}
                                            </h5>

                                            <p className="text-muted small mb-0">
                                                Configure the video and image for the homepage hero.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={closeModal}
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="modal-body">
                                        <div className="row g-3">

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Media title
                                                </label>

                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                    value={data.title}
                                                    onChange={e => setData("title", e.target.value)}
                                                    placeholder="e.g. GAF Rwanda introduction"
                                                />

                                                {errors.title && (
                                                    <div className="invalid-feedback">
                                                        {errors.title}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Vimeo video URL
                                                </label>

                                                <input
                                                    type="url"
                                                    className={`form-control ${errors.vimeo_url || vimeoLinkInvalid ? "is-invalid" : ""}`}
                                                    value={data.vimeo_url}
                                                    onChange={e => setData("vimeo_url", e.target.value)}
                                                    placeholder="https://vimeo.com/76979871 or <iframe src=…>"
                                                />

                                                {(errors.vimeo_url || vimeoLinkInvalid) && (
                                                    <div className="invalid-feedback">
                                                        {errors.vimeo_url || "This is not a Vimeo video link."}
                                                    </div>
                                                )}

                                                <div className="form-text">
                                                    Paste a Vimeo video link or the Vimeo embed code (&lt;iframe&gt;).
                                                    Leave empty for an image-only hero.
                                                </div>
                                            </div>

                                            {videoPreview && (
                                                <div className="col-12">
                                                    <label className="form-label fw-semibold">
                                                        Video preview
                                                    </label>

                                                    <div className="ratio ratio-16x9 rounded-3 overflow-hidden bg-dark">
                                                        <iframe
                                                            src={videoPreview}
                                                            title="Vimeo video preview"
                                                            allow="autoplay; fullscreen; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-12">
                                                <label className="form-label fw-semibold">
                                                    Banner image
                                                </label>

                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className={`form-control ${errors.banner_image ? "is-invalid" : ""}`}
                                                    onChange={handleImageChange}
                                                />

                                                {errors.banner_image && (
                                                    <div className="invalid-feedback">
                                                        {errors.banner_image}
                                                    </div>
                                                )}

                                                <div className="form-text">
                                                    JPG, PNG or WEBP. Maximum 5 MB.
                                                    If no image is uploaded, the Vimeo thumbnail is used.
                                                </div>
                                            </div>

                                            {previewImage && (
                                                <div className="col-12">
                                                    <label className="form-label fw-semibold">
                                                        Image preview
                                                    </label>

                                                    <div
                                                        className="rounded-3 overflow-hidden bg-light"
                                                        style={{ maxHeight: 260 }}
                                                    >
                                                        <img
                                                            src={previewImage}
                                                            alt="Hero media preview"
                                                            className="w-100"
                                                            style={{
                                                                maxHeight: 260,
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Image alternative text
                                                </label>

                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.alt_text ? "is-invalid" : ""}`}
                                                    value={data.alt_text}
                                                    onChange={e => setData("alt_text", e.target.value)}
                                                    placeholder="Describe the banner image"
                                                />

                                                {errors.alt_text && (
                                                    <div className="invalid-feedback">
                                                        {errors.alt_text}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Image caption
                                                </label>

                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.caption ? "is-invalid" : ""}`}
                                                    value={data.caption}
                                                    onChange={e => setData("caption", e.target.value)}
                                                    placeholder="Short caption shown on the hero"
                                                />

                                                {errors.caption && (
                                                    <div className="invalid-feedback">
                                                        {errors.caption}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">
                                                    Display order
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={`form-control ${errors.sort_order ? "is-invalid" : ""}`}
                                                    value={data.sort_order}
                                                    onChange={e => setData("sort_order", e.target.value)}
                                                />

                                                {errors.sort_order && (
                                                    <div className="invalid-feedback">
                                                        {errors.sort_order}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-6 d-flex align-items-center">
                                                <div className="form-check form-switch mt-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="heroMediaActive"
                                                        checked={data.is_active}
                                                        onChange={e => setData("is_active", e.target.checked)}
                                                    />

                                                    <label
                                                        className="form-check-label fw-semibold"
                                                        htmlFor="heroMediaActive"
                                                    >
                                                        Set as active homepage media
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="alert alert-light border mb-0 small">
                                                    <i className="bi bi-info-circle me-2 text-primary" />
                                                    When a valid video URL is provided, the homepage
                                                    embeds the Vimeo video muted. Otherwise, it displays
                                                    the banner image.
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={closeModal}
                                            disabled={processing}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
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
                                                    {editing ? "Save Changes" : "Create Media"}
                                                </>
                                            )}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal-backdrop fade show"
                        onClick={processing ? undefined : closeModal}
                    />
                </>
            )}
        </AdminLayout>
    );
}
