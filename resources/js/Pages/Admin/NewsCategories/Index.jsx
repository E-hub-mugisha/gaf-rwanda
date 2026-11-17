
import React, { useEffect, useState } from "react";
import {
    Head,
    Link,
    router,
    useForm,
    usePage,
} from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const emptyForm = {
    name: "",
    name_rw: "",
    slug: "",
    description: "",
    is_active: true,
    sort_order: 0,
};

export default function Index({ categories, filters = {}, stats = {} }) {
    const { flash } = usePage().props;

    const categoryItems = categories?.data || [];

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

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

    // --------------------------------------------------
    // Helpers
    // --------------------------------------------------

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const isActive = (value) =>
        value === true || value === 1 || value === "1";

    const closeModal = () => {
        if (processing) return;

        setModalOpen(false);
        setSelectedCategory(null);
        reset();
        clearErrors();
        transform((formData) => formData);
    };

    // --------------------------------------------------
    // Modal actions
    // --------------------------------------------------

    const openCreateModal = () => {
        reset();
        clearErrors();
        transform((formData) => formData);

        setSelectedCategory(null);
        setModalMode("create");
        setModalOpen(true);
    };

    const openEditModal = (category) => {
        reset();
        clearErrors();
        transform((formData) => formData);

        setSelectedCategory(category);
        setModalMode("edit");

        setData({
            name: category.name || "",
            name_rw: category.name_rw || "",
            slug: category.slug || "",
            description: category.description || "",
            is_active: isActive(category.is_active),
            sort_order: category.sort_order ?? 0,
        });

        setModalOpen(true);
    };

    const openViewModal = (category) => {
        setSelectedCategory(category);
        setModalMode("view");
        setModalOpen(true);
    };

    // --------------------------------------------------
    // Automatic slug generation
    // --------------------------------------------------

    useEffect(() => {
        if (modalMode !== "create" || !modalOpen) return;

        const slug = data.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        if (slug !== data.slug) {
            setData("slug", slug);
        }
    }, [data.name, modalMode, modalOpen]);

    // --------------------------------------------------
    // Form submission
    // --------------------------------------------------

    const submit = (e) => {
        e.preventDefault();

        if (modalMode === "edit" && selectedCategory) {
            transform((formData) => ({
                ...formData,
                _method: "put",
            }));

            post(
                route("admin.news-categories.update", selectedCategory.id),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setModalOpen(false);
                        setSelectedCategory(null);
                        reset();
                    },
                }
            );

            return;
        }

        post(route("admin.news-categories.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                setSelectedCategory(null);
                reset();
            },
        });
    };

    // --------------------------------------------------
    // Delete
    // --------------------------------------------------

    const deleteCategory = (category) => {
        if (
            !window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            )
        ) {
            return;
        }

        router.delete(
            route("admin.news-categories.destroy", category.id),
            { preserveScroll: true }
        );
    };

    // --------------------------------------------------
    // Filters
    // --------------------------------------------------

    const applyFilters = (e) => {
        e.preventDefault();

        router.get(
            route("admin.news-categories.index"),
            { search, status },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");

        router.get(
            route("admin.news-categories.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // --------------------------------------------------
    // Pagination
    // --------------------------------------------------

    const goToPage = (url) => {
        if (!url) return;

        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const total = stats.total ?? 0;
    const active = stats.active ?? 0;
    const inactive = stats.inactive ?? 0;

    return (
        <AdminLayout>
            <Head title="News Categories" />

            <div className="gaf-category-page">

                {/* Page heading */}
                <div className="gaf-page-heading">
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb gaf-breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href={route("admin.dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    News Categories
                                </li>
                            </ol>
                        </nav>

                        <div className="d-flex align-items-center gap-3">
                            <div className="gaf-heading-icon">
                                <i className="bi bi-collection" />
                            </div>

                            <div>
                                <h3 className="gaf-page-title">
                                    News Categories
                                </h3>
                                <p className="gaf-page-subtitle">
                                    Organize and manage the categories used
                                    across your news publications.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn gaf-primary-btn"
                        onClick={openCreateModal}
                    >
                        <i className="bi bi-plus-lg me-2" />
                        Add Category
                    </button>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="alert gaf-alert-success alert-dismissible fade show">
                        <i className="bi bi-check-circle-fill me-2" />
                        {flash.success}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {flash?.error && (
                    <div className="alert gaf-alert-danger alert-dismissible fade show">
                        <i className="bi bi-exclamation-circle-fill me-2" />
                        {flash.error}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 mb-4">
                    <div className="col-sm-6 col-xl-4">
                        <div className="gaf-stat-card">
                            <div className="gaf-stat-icon gaf-stat-blue">
                                <i className="bi bi-collection" />
                            </div>
                            <div className="gaf-stat-content">
                                <span>Total Categories</span>
                                <h3>{total}</h3>
                                <small>All registered categories</small>
                            </div>
                            <div className="gaf-stat-decoration">
                                <i className="bi bi-collection" />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-4">
                        <div className="gaf-stat-card">
                            <div className="gaf-stat-icon gaf-stat-green">
                                <i className="bi bi-check-circle" />
                            </div>
                            <div className="gaf-stat-content">
                                <span>Active Categories</span>
                                <h3>{active}</h3>
                                <small>Available for publications</small>
                            </div>
                            <div className="gaf-stat-decoration">
                                <i className="bi bi-check-circle" />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-4">
                        <div className="gaf-stat-card">
                            <div className="gaf-stat-icon gaf-stat-orange">
                                <i className="bi bi-pause-circle" />
                            </div>
                            <div className="gaf-stat-content">
                                <span>Inactive Categories</span>
                                <h3>{inactive}</h3>
                                <small>Currently unavailable</small>
                            </div>
                            <div className="gaf-stat-decoration">
                                <i className="bi bi-pause-circle" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="gaf-content-card">

                    <div className="gaf-content-header">
                        <div>
                            <h5>Category Management</h5>
                            <p>
                                View, search, update and organize your news
                                categories.
                            </p>
                        </div>

                        <span className="gaf-record-count">
                            <i className="bi bi-folder2-open me-2" />
                            {categories?.total ?? categoryItems.length} records
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="gaf-filter-section">
                        <form onSubmit={applyFilters}>
                            <div className="row g-2 align-items-center">
                                <div className="col-lg-6">
                                    <div className="gaf-search-box">
                                        <i className="bi bi-search" />
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="Search categories by name, slug or description..."
                                        />
                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => setSearch("")}
                                                aria-label="Clear search"
                                            >
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3">
                                    <select
                                        className="form-select gaf-filter-select"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="">All statuses</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-sm-6 col-lg-3">
                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn gaf-filter-btn flex-grow-1"
                                        >
                                            <i className="bi bi-funnel me-2" />
                                            Apply Filters
                                        </button>

                                        <button
                                            type="button"
                                            className="btn gaf-clear-btn"
                                            onClick={clearFilters}
                                            title="Clear filters"
                                        >
                                            <i className="bi bi-arrow-counterclockwise" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="table gaf-category-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-4">CATEGORY</th>
                                    <th>URL SLUG</th>
                                    <th>DESCRIPTION</th>
                                    <th>ORDER</th>
                                    <th>STATUS</th>
                                    <th>CREATED</th>
                                    <th className="text-end pe-4">ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categoryItems.length > 0 ? (
                                    categoryItems.map((category) => (
                                        <tr key={category.id}>
                                            <td className="ps-4">
                                                <div className="gaf-category-identity">
                                                    <div className="gaf-category-icon">
                                                        <i className="bi bi-folder2-open" />
                                                    </div>
                                                    <div>
                                                        <div className="gaf-category-name">
                                                            {category.name}
                                                        </div>
                                                        <small>
                                                            Category #{category.id}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="gaf-slug">
                                                    {category.slug}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="gaf-description">
                                                    {category.description ||
                                                        "No description provided"}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="gaf-order">
                                                    {category.sort_order ?? 0}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={`gaf-status ${
                                                        isActive(category.is_active)
                                                            ? "gaf-status-active"
                                                            : "gaf-status-inactive"
                                                    }`}
                                                >
                                                    <span />
                                                    {isActive(category.is_active)
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="gaf-date">
                                                    {formatDate(category.created_at)}
                                                </span>
                                            </td>

                                            <td className="text-end pe-4">
                                                <div className="gaf-actions">
                                                    <button
                                                        type="button"
                                                        className="gaf-action-btn"
                                                        onClick={() =>
                                                            openViewModal(category)
                                                        }
                                                        title="View category"
                                                    >
                                                        <i className="bi bi-eye" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="gaf-action-btn gaf-action-edit"
                                                        onClick={() =>
                                                            openEditModal(category)
                                                        }
                                                        title="Edit category"
                                                    >
                                                        <i className="bi bi-pencil-square" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="gaf-action-btn gaf-action-delete"
                                                        onClick={() =>
                                                            deleteCategory(category)
                                                        }
                                                        title="Delete category"
                                                    >
                                                        <i className="bi bi-trash3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="gaf-empty-state">
                                                <div className="gaf-empty-icon">
                                                    <i className="bi bi-folder2-open" />
                                                </div>
                                                <h6>No categories found</h6>
                                                <p>
                                                    There are no categories matching
                                                    your current search or filters.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn gaf-primary-btn"
                                                    onClick={openCreateModal}
                                                >
                                                    <i className="bi bi-plus-lg me-2" />
                                                    Create Category
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {categories?.links && categoryItems.length > 0 && (
                        <div className="gaf-pagination">
                            <div className="gaf-pagination-info">
                                Showing <strong>{categories.from || 0}</strong>
                                {" "}to <strong>{categories.to || 0}</strong>
                                {" "}of <strong>{categories.total || 0}</strong>
                                {" "}categories
                            </div>

                            <div className="d-flex flex-wrap gap-1">
                                {categories.links.map((link, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => goToPage(link.url)}
                                        className={`gaf-page-link ${
                                            link.active ? "active" : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ==================================================
                CATEGORY MODAL
            ================================================== */}

            {modalOpen && (
                <div
                    className="gaf-category-modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="gaf-category-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="category-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header - scrolls with modal */}
                        <div className="gaf-modal-header">
                            <div className="d-flex align-items-center gap-3">
                                <div className="gaf-modal-heading-icon">
                                    <i
                                        className={`bi ${
                                            modalMode === "view"
                                                ? "bi-folder2-open"
                                                : modalMode === "edit"
                                                ? "bi-pencil-square"
                                                : "bi-folder-plus"
                                        }`}
                                    />
                                </div>

                                <div>
                                    <h5 id="category-modal-title">
                                        {modalMode === "create"
                                            ? "Create News Category"
                                            : modalMode === "edit"
                                            ? "Edit News Category"
                                            : "Category Details"}
                                    </h5>
                                    <p>
                                        {modalMode === "view"
                                            ? "Review the category information."
                                            : "Enter the details for this news category."}
                                    </p>
                                </div>
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

                        {/* View mode */}
                        {modalMode === "view" && selectedCategory && (
                            <>
                                <div className="gaf-modal-body">
                                    <div className="gaf-detail-identity">
                                        <div className="gaf-detail-icon">
                                            <i className="bi bi-folder2-open" />
                                        </div>

                                        <div>
                                            <h4>{selectedCategory.name}</h4>
                                            <span
                                                className={`gaf-status ${
                                                    isActive(selectedCategory.is_active)
                                                        ? "gaf-status-active"
                                                        : "gaf-status-inactive"
                                                }`}
                                            >
                                                <span />
                                                {isActive(selectedCategory.is_active)
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="gaf-detail-section">
                                        <label>Description</label>
                                        <p>
                                            {selectedCategory.description ||
                                                "No description has been provided for this category."}
                                        </p>
                                    </div>

                                    <div className="gaf-detail-grid">
                                        <div className="gaf-detail-item">
                                            <span>URL Slug</span>
                                            <strong>{selectedCategory.slug || "—"}</strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Display Order</span>
                                            <strong>
                                                {selectedCategory.sort_order ?? 0}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Created At</span>
                                            <strong>
                                                {formatDate(selectedCategory.created_at)}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Last Updated</span>
                                            <strong>
                                                {formatDate(selectedCategory.updated_at)}
                                            </strong>
                                        </div>

                                        <div className="gaf-detail-item">
                                            <span>Category ID</span>
                                            <strong>#{selectedCategory.id}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="gaf-modal-footer">
                                    <button
                                        type="button"
                                        className="btn gaf-cancel-btn"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        className="btn gaf-primary-btn"
                                        onClick={() =>
                                            openEditModal(selectedCategory)
                                        }
                                    >
                                        <i className="bi bi-pencil-square me-2" />
                                        Edit Category
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Create / Edit mode */}
                        {(modalMode === "create" || modalMode === "edit") && (
                            <form onSubmit={submit}>
                                <div className="gaf-modal-body">
                                    <div className="gaf-form-intro">
                                        <h6>Category Information</h6>
                                        <p>
                                            Fields marked with{" "}
                                            <span className="text-danger">*</span>
                                            {" "}are required.
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="gaf-form-label">
                                            Category Name
                                            <span className="text-danger ms-1">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control gaf-form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="e.g. Research Updates"
                                            required
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="gaf-form-label">
                                            Category Name (Kinyarwanda)
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control gaf-form-control ${
                                                errors.name_rw ? "is-invalid" : ""
                                            }`}
                                            value={data.name_rw}
                                            onChange={(e) =>
                                                setData("name_rw", e.target.value)
                                            }
                                            placeholder="Urugero: Amakuru y’ubushakashatsi"
                                        />

                                        {errors.name_rw && (
                                            <div className="invalid-feedback">
                                                {errors.name_rw}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="gaf-form-label">
                                            URL Slug
                                        </label>

                                        <div className="gaf-slug-input">
                                            <span>
                                                <i className="bi bi-link-45deg" />
                                            </span>
                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.slug ? "is-invalid" : ""
                                                }`}
                                                value={data.slug}
                                                onChange={(e) =>
                                                    setData("slug", e.target.value)
                                                }
                                                placeholder="research-updates"
                                            />
                                        </div>

                                        {errors.slug && (
                                            <div className="text-danger small mt-1">
                                                {errors.slug}
                                            </div>
                                        )}

                                        <div className="gaf-field-hint">
                                            <i className="bi bi-info-circle me-1" />
                                            Used in category URLs. Automatically
                                            generated from the category name when creating.
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="gaf-form-label">
                                            Description
                                        </label>

                                        <textarea
                                            rows="4"
                                            className={`form-control gaf-form-control gaf-textarea ${
                                                errors.description ? "is-invalid" : ""
                                            }`}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Describe the type of news that belongs to this category..."
                                        />

                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="gaf-form-label">
                                                Display Order
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                className={`form-control gaf-form-control ${
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

                                        <div className="col-md-6">
                                            <label className="gaf-form-label">
                                                Category Visibility
                                            </label>

                                            <label className="gaf-toggle-card">
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(data.is_active)}
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_active",
                                                            e.target.checked
                                                        )
                                                    }
                                                />

                                                <span className="gaf-toggle-switch" />

                                                <span>
                                                    <strong>
                                                        {data.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </strong>
                                                    <small>
                                                        {data.is_active
                                                            ? "Available for use"
                                                            : "Hidden from new submissions"}
                                                    </small>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="gaf-information-note mt-4">
                                        <i className="bi bi-info-circle-fill" />
                                        <span>
                                            Inactive categories can be retained
                                            for existing records but will not
                                            be offered for new public news submissions.
                                        </span>
                                    </div>
                                </div>

                                <div className="gaf-modal-footer">
                                    <button
                                        type="button"
                                        className="btn gaf-cancel-btn"
                                        onClick={closeModal}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn gaf-primary-btn"
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
                                                    ? "Update Category"
                                                    : "Create Category"}
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
                .gaf-category-page {
                    color: #172033;
                    font-family: inherit;
                    padding-bottom: 25px;
                }

                .gaf-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 15px;
                }

                .gaf-breadcrumb a {
                    color: #718096;
                    text-decoration: none;
                }

                .gaf-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-breadcrumb .active {
                    color: #172033;
                    font-weight: 600;
                }

                .gaf-page-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 28px;
                }

                .gaf-heading-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    border-radius: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #20603d;
                    background: #edf3fb;
                    font-size: 21px;
                }

                .gaf-page-title {
                    font-size: 23px;
                    font-weight: 800;
                    letter-spacing: -0.6px;
                    margin: 0 0 5px;
                }

                .gaf-page-subtitle {
                    color: #8290a3;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-primary-btn {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    border-radius: 8px;
                    padding: 10px 17px;
                    font-size: 13px;
                    font-weight: 700;
                    transition: .2s ease;
                }

                .gaf-primary-btn:hover,
                .gaf-primary-btn:focus {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(32, 96, 61,.2);
                }

                .gaf-primary-btn:disabled {
                    opacity: .65;
                }

                .gaf-alert-success,
                .gaf-alert-danger {
                    border: 0;
                    border-radius: 9px;
                    font-size: 13px;
                    padding: 14px 17px;
                }

                .gaf-alert-success {
                    background: #edf8f1;
                    color: #247548;
                }

                .gaf-alert-danger {
                    background: #fff0ef;
                    color: #b53d38;
                }

                .gaf-stat-card {
                    height: 100%;
                    min-height: 132px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 22px;
                    background: #fff;
                    border: 1px solid #edf0f4;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(23,32,51,.025);
                }

                .gaf-stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .gaf-stat-blue {
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-stat-green {
                    background: #eaf7ef;
                    color: #29945b;
                }

                .gaf-stat-orange {
                    background: #fff4e9;
                    color: #d58a3d;
                }

                .gaf-stat-content {
                    position: relative;
                    z-index: 1;
                }

                .gaf-stat-content > span {
                    display: block;
                    color: #758197;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .gaf-stat-content h3 {
                    font-size: 25px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin: 0 0 4px;
                    color: #172033;
                }

                .gaf-stat-content small {
                    color: #9aa4b3;
                    font-size: 10px;
                }

                .gaf-stat-decoration {
                    position: absolute;
                    right: 17px;
                    bottom: -15px;
                    color: #f5f7fa;
                    font-size: 65px;
                }

                .gaf-content-card {
                    background: #fff;
                    border: 1px solid #edf0f4;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 3px 15px rgba(23,32,51,.025);
                }

                .gaf-content-header {
                    padding: 23px 24px 18px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                }

                .gaf-content-header h5 {
                    color: #172033;
                    font-size: 15px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .gaf-content-header p {
                    color: #8994a5;
                    font-size: 12px;
                    margin: 0;
                }

                .gaf-record-count {
                    background: #f4f6f9;
                    color: #69778b;
                    padding: 7px 11px;
                    border-radius: 7px;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-filter-section {
                    padding: 0 24px 20px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-search-box {
                    height: 41px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 12px;
                    background: #fafbfd;
                    border: 1px solid #e8ecf1;
                    border-radius: 7px;
                }

                .gaf-search-box > i {
                    color: #9aa5b4;
                    font-size: 14px;
                }

                .gaf-search-box input {
                    width: 100%;
                    min-width: 0;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    color: #172033;
                    font-size: 12px;
                }

                .gaf-search-box input::placeholder {
                    color: #a3adba;
                }

                .gaf-search-box button {
                    border: 0;
                    background: transparent;
                    color: #8994a5;
                    padding: 3px;
                }

                .gaf-filter-select {
                    height: 41px;
                    background-color: #fafbfd;
                    border-color: #e8ecf1;
                    border-radius: 7px;
                    color: #526176;
                    font-size: 12px;
                    box-shadow: none;
                }

                .gaf-filter-btn {
                    height: 41px;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-filter-btn:hover {
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-clear-btn {
                    width: 41px;
                    height: 41px;
                    flex-shrink: 0;
                    border: 1px solid #e8ecf1;
                    border-radius: 7px;
                    color: #758197;
                    background: #fff;
                }

                .gaf-clear-btn:hover {
                    background: #f4f6f9;
                }

                .gaf-category-table {
                    min-width: 950px;
                }

                .gaf-category-table thead th {
                    background: #fafbfd;
                    color: #8b97a8;
                    border-bottom: 1px solid #edf0f4;
                    padding: 13px 12px;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: .7px;
                    white-space: nowrap;
                }

                .gaf-category-table tbody td {
                    border-bottom: 1px solid #f0f2f5;
                    padding: 14px 12px;
                    color: #536176;
                    font-size: 12px;
                    vertical-align: middle;
                }

                .gaf-category-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .gaf-category-table tbody tr:hover {
                    background: #fbfcfe;
                }

                .gaf-category-identity {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    min-width: 175px;
                }

                .gaf-category-icon {
                    width: 39px;
                    height: 39px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-category-name {
                    color: #26344a;
                    font-size: 12px;
                    font-weight: 800;
                    margin-bottom: 3px;
                }

                .gaf-category-identity small {
                    color: #a0a9b6;
                    font-size: 10px;
                }

                .gaf-slug {
                    display: inline-block;
                    padding: 5px 7px;
                    background: #f4f6f9;
                    border-radius: 5px;
                    color: #65748a;
                    font-family: monospace;
                    font-size: 11px;
                }

                .gaf-description {
                    display: -webkit-box;
                    max-width: 220px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    color: #8390a1;
                    line-height: 1.5;
                    font-size: 11px;
                }

                .gaf-order {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 27px;
                    height: 26px;
                    padding: 0 7px;
                    border-radius: 6px;
                    background: #f4f6f9;
                    color: #637187;
                    font-size: 11px;
                    font-weight: 700;
                }

                .gaf-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 9px;
                    border-radius: 30px;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .gaf-status-active {
                    background: #eaf7ef;
                    color: #278451;
                }

                .gaf-status-active > span {
                    background: #2caa68;
                }

                .gaf-status-inactive {
                    background: #f0f2f5;
                    color: #7c8796;
                }

                .gaf-status-inactive > span {
                    background: #9aa4b1;
                }

                .gaf-date {
                    color: #8793a4;
                    font-size: 11px;
                    white-space: nowrap;
                }

                .gaf-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 5px;
                }

                .gaf-action-btn {
                    width: 31px;
                    height: 31px;
                    border: 1px solid #e9edf2;
                    border-radius: 7px;
                    background: #fff;
                    color: #77859a;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: .2s ease;
                }

                .gaf-action-btn:hover {
                    background: #f2f5f9;
                    color: #172033;
                }

                .gaf-action-edit:hover {
                    background: #f1f8f4;
                    border-color: #e4f0e9;
                    color: #20603d;
                }

                .gaf-action-delete:hover {
                    background: #fff0ef;
                    border-color: #f8d9d7;
                    color: #d64b45;
                }

                .gaf-empty-state {
                    padding: 55px 20px;
                    text-align: center;
                }

                .gaf-empty-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    background: #f1f5fa;
                    color: #8fc6a7;
                    font-size: 25px;
                }

                .gaf-empty-state h6 {
                    color: #26344a;
                    font-size: 14px;
                    font-weight: 800;
                    margin-bottom: 7px;
                }

                .gaf-empty-state p {
                    color: #929eae;
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                .gaf-pagination {
                    padding: 17px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    border-top: 1px solid #edf0f4;
                }

                .gaf-pagination-info {
                    color: #8994a5;
                    font-size: 11px;
                }

                .gaf-pagination-info strong {
                    color: #435168;
                }

                .gaf-page-link {
                    min-width: 31px;
                    height: 31px;
                    padding: 0 8px;
                    border: 1px solid #e9edf2;
                    border-radius: 6px;
                    background: #fff;
                    color: #68778c;
                    font-size: 11px;
                }

                .gaf-page-link.active {
                    border-color: #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-page-link:disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                /* Modal overlay: the entire modal scrolls as one unit */
                .gaf-category-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;
                    display: block;
                    overflow-x: hidden;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    box-sizing: border-box;
                    padding: 25px 16px;
                    background: rgba(16, 27, 45, .58);
                    backdrop-filter: blur(3px);
                }

                .gaf-category-modal {
                    width: 100%;
                    max-width: 660px;
                    height: auto;
                    max-height: none;
                    margin: 0 auto;
                    overflow: visible;
                    border-radius: 13px;
                    background: #fff;
                    box-shadow: 0 20px 70px rgba(0,0,0,.2);
                    box-sizing: border-box;
                }

                .gaf-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 21px 25px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-modal-heading-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 18px;
                }

                .gaf-modal-header h5 {
                    margin: 0 0 4px;
                    color: #172033;
                    font-size: 15px;
                    font-weight: 800;
                }

                .gaf-modal-header p {
                    margin: 0;
                    color: #929eae;
                    font-size: 11px;
                }

                .gaf-modal-close {
                    width: 33px;
                    height: 33px;
                    border: 0;
                    border-radius: 7px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #f3f5f8;
                    color: #78869a;
                }

                .gaf-modal-close:hover {
                    background: #e9edf2;
                    color: #172033;
                }

                .gaf-modal-body {
                    padding: 25px;
                    overflow: visible;
                }

                .gaf-modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 9px;
                    padding: 17px 25px;
                    border-top: 1px solid #edf0f4;
                    background: #fff;
                }

                .gaf-cancel-btn {
                    border: 1px solid #e4e8ee;
                    border-radius: 7px;
                    padding: 9px 17px;
                    background: #fff;
                    color: #69778b;
                    font-size: 12px;
                    font-weight: 700;
                }

                .gaf-cancel-btn:hover {
                    background: #f5f7f9;
                    color: #26344a;
                }

                .gaf-form-intro {
                    margin-bottom: 23px;
                }

                .gaf-form-intro h6 {
                    color: #26344a;
                    font-size: 13px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .gaf-form-intro p {
                    color: #929eae;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-form-label {
                    display: block;
                    color: #344258;
                    font-size: 11px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .gaf-form-control {
                    min-height: 42px;
                    border: 1px solid #e4e9ef;
                    border-radius: 7px;
                    color: #26344a;
                    font-size: 12px;
                    box-shadow: none !important;
                }

                .gaf-form-control:focus {
                    border-color: #9acbaf;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.1) !important;
                }

                .gaf-form-control::placeholder {
                    color: #a9b2bf;
                }

                .gaf-textarea {
                    min-height: 105px;
                    resize: vertical;
                }

                .gaf-slug-input {
                    display: flex;
                    align-items: stretch;
                }

                .gaf-slug-input > span {
                    width: 40px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e4e9ef;
                    border-right: 0;
                    border-radius: 7px 0 0 7px;
                    background: #f7f9fb;
                    color: #8392a6;
                }

                .gaf-slug-input input {
                    border-radius: 0 7px 7px 0;
                }

                .gaf-field-hint {
                    color: #9aa5b3;
                    font-size: 10px;
                    margin-top: 7px;
                }

                .gaf-toggle-card {
                    min-height: 65px;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    padding: 10px 12px;
                    border: 1px solid #e5eaf0;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .gaf-toggle-card input {
                    position: absolute;
                    opacity: 0;
                    pointer-events: none;
                }

                .gaf-toggle-switch {
                    position: relative;
                    width: 34px;
                    height: 19px;
                    flex-shrink: 0;
                    border-radius: 20px;
                    background: #cbd2dc;
                    transition: .2s ease;
                }

                .gaf-toggle-switch::after {
                    content: "";
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #fff;
                    transition: .2s ease;
                }

                .gaf-toggle-card input:checked + .gaf-toggle-switch {
                    background: #20603d;
                }

                .gaf-toggle-card input:checked + .gaf-toggle-switch::after {
                    transform: translateX(15px);
                }

                .gaf-toggle-card strong {
                    display: block;
                    color: #344258;
                    font-size: 11px;
                }

                .gaf-toggle-card small {
                    display: block;
                    color: #9aa5b3;
                    font-size: 9px;
                    margin-top: 3px;
                }

                .gaf-information-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 12px 14px;
                    border-radius: 7px;
                    background: #f1f6fc;
                    color: #6e83a1;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-information-note i {
                    color: #20603d;
                    font-size: 13px;
                    margin-top: 1px;
                }

                .gaf-detail-identity {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 28px;
                }

                .gaf-detail-icon {
                    width: 58px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 13px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 25px;
                }

                .gaf-detail-identity h4 {
                    color: #26344a;
                    font-size: 17px;
                    font-weight: 800;
                    margin: 0 0 8px;
                }

                .gaf-detail-section {
                    padding: 17px;
                    margin-bottom: 20px;
                    border: 1px solid #edf0f4;
                    border-radius: 9px;
                }

                .gaf-detail-section label {
                    display: block;
                    color: #929eae;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                    margin-bottom: 9px;
                }

                .gaf-detail-section p {
                    color: #526176;
                    font-size: 12px;
                    line-height: 1.7;
                    margin: 0;
                    white-space: pre-wrap;
                }

                .gaf-detail-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 11px;
                }

                .gaf-detail-item {
                    min-width: 0;
                    padding: 14px;
                    border: 1px solid #edf0f4;
                    border-radius: 8px;
                    background: #fafbfd;
                }

                .gaf-detail-item span {
                    display: block;
                    color: #929eae;
                    font-size: 10px;
                    margin-bottom: 7px;
                }

                .gaf-detail-item strong {
                    display: block;
                    overflow-wrap: anywhere;
                    color: #344258;
                    font-size: 12px;
                    font-weight: 700;
                }

                @media (max-width: 767px) {
                    .gaf-page-heading {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-page-heading > button {
                        width: 100%;
                    }

                    .gaf-page-title {
                        font-size: 20px;
                    }

                    .gaf-content-header {
                        padding: 19px 16px 15px;
                    }

                    .gaf-filter-section {
                        padding: 0 16px 17px;
                    }

                    .gaf-pagination {
                        align-items: flex-start;
                        flex-direction: column;
                        padding: 15px 16px;
                    }

                    .gaf-category-modal-overlay {
                        padding: 10px;
                    }

                    .gaf-category-modal {
                        width: 100%;
                        max-width: none;
                        max-height: none;
                        margin: 0 auto;
                    }

                    .gaf-modal-header {
                        padding: 17px;
                    }

                    .gaf-modal-body {
                        padding: 19px 17px;
                    }

                    .gaf-modal-footer {
                        padding: 14px 17px;
                    }

                    .gaf-detail-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-stat-card {
                        padding: 17px;
                    }

                    .gaf-stat-decoration {
                        font-size: 52px;
                    }

                    .gaf-modal-heading-icon {
                        width: 37px;
                        height: 37px;
                    }

                    .gaf-modal-header h5 {
                        font-size: 13px;
                    }

                    .gaf-modal-header p {
                        max-width: 210px;
                        line-height: 1.5;
                    }

                    .gaf-modal-footer {
                        flex-direction: column-reverse;
                    }

                    .gaf-modal-footer .btn {
                        width: 100%;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
