
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const initialForm = {
    name: "",
    position: "",
    category: "research_assistant",
    affiliation: "rwanda",
    institution: "",
    responsibilities: "",
    position_rw: "",
    institution_rw: "",
    responsibilities_rw: "",
    reports_to_id: "",
    group_number: "",
    group_role: "",
    photo: null,
    sort_order: 0,
    is_active: true,
};

const categoryLabels = {
    leadership: "Leadership",
    support_team: "Support team",
    research_assistant: "Research assistants",
    psychologist: "Psychologists",
    community_health_worker: "Community health workers",
    other: "Other",
};

const categoryStyles = {
    leadership: "bg-primary-subtle text-primary-emphasis",
    support_team: "bg-info-subtle text-info-emphasis",
    research_assistant: "bg-success-subtle text-success-emphasis",
    psychologist: "bg-warning-subtle text-warning-emphasis",
    community_health_worker: "bg-danger-subtle text-danger-emphasis",
    other: "bg-secondary-subtle text-secondary-emphasis",
};

const affiliationLabels = {
    netherlands: "Netherlands",
    rwanda: "Rwanda",
    both: "Both teams",
};

const avatarColors = [
    "#20603d",
    "#2f8f83",
    "#c9772f",
    "#8a63b8",
    "#b8566b",
    "#4f7f4a",
];

const avatarColor = (name = "") => {
    let hash = 0;

    for (let i = 0; i < name.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return avatarColors[Math.abs(hash) % avatarColors.length];
};

/* =========================================================
   BOOTSTRAP-STYLE MODAL
   ========================================================= */

function ModalShell({
    show,
    onClose,
    size = "lg",
    locked = false,
    children,
}) {
    const closeRef = useRef(onClose);
    closeRef.current = onClose;

    useEffect(() => {
        if (!show) return;

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !locked) {
                closeRef.current?.();
            }
        };

        document.body.classList.add("modal-open");
        document.body.style.overflow = "hidden";

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.overflow = previousOverflow;

            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, locked]);

    if (!show) return null;

    return createPortal(
        <>
            <div
                className="team-modal-backdrop"
                onClick={() => !locked && onClose()}
            />

            <div
                className="team-modal-wrapper"
                role="dialog"
                aria-modal="true"
                onMouseDown={(event) => {
                    if (
                        event.target === event.currentTarget &&
                        !locked
                    ) {
                        onClose();
                    }
                }}
            >
                <div className={`team-modal-dialog modal-${size}`}>
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
}

/* =========================================================
   FORM COMPONENTS
   ========================================================= */

function Field({
    label,
    error,
    hint,
    required = false,
    className = "col-12",
    children,
}) {
    return (
        <div className={className}>
            <label className="form-label fw-semibold small mb-1">
                {label}

                {required && (
                    <span className="text-danger ms-1">*</span>
                )}
            </label>

            {children}

            {hint && !error && (
                <div className="form-text">{hint}</div>
            )}

            {error && (
                <div className="invalid-feedback d-block">
                    {error}
                </div>
            )}
        </div>
    );
}

function SectionTitle({ icon, children }) {
    return (
        <div className="col-12 mt-4 mb-0">
            <div className="d-flex align-items-center gap-2 pb-2 border-bottom">
                <i className={`bi ${icon} text-primary`} />

                <span
                    className="text-uppercase small fw-bold text-secondary"
                    style={{ letterSpacing: ".06em" }}
                >
                    {children}
                </span>
            </div>
        </div>
    );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function Index({
    members = [],
    categories = [],
}) {
    const { flash } = usePage().props;

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [deleteBusy, setDeleteBusy] = useState(false);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [affiliationFilter, setAffiliationFilter] = useState("all");

    const [photoPreview, setPhotoPreview] = useState(null);
    const [flashVisible, setFlashVisible] = useState(false);

    const blobRef = useRef(null);
    const photoInputRef = useRef(null);

    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        clearErrors,
    } = useForm(initialForm);

    /*
     * Use POST with _method=PUT for updates.
     * This supports multipart image uploads.
     */
    transform((formData) => ({
        ...formData,
        ...(editing ? { _method: "PUT" } : {}),
    }));

    /* Flash messages */

    useEffect(() => {
        if (!flash?.success) return;

        setFlashVisible(true);

        const timer = setTimeout(() => {
            setFlashVisible(false);
        }, 4500);

        return () => clearTimeout(timer);
    }, [flash]);

    /* Photo preview */

    const revokeBlob = () => {
        if (blobRef.current) {
            URL.revokeObjectURL(blobRef.current);
            blobRef.current = null;
        }
    };

    useEffect(() => {
        return () => revokeBlob();
    }, []);

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0] || null;

        revokeBlob();
        setData("photo", file);

        if (file) {
            const url = URL.createObjectURL(file);

            blobRef.current = url;
            setPhotoPreview(url);
        } else {
            setPhotoPreview(editing?.photo || null);
        }
    };

    /* Open create modal */

    const openCreate = () => {
        revokeBlob();
        clearErrors();

        setEditing(null);
        setData({ ...initialForm });
        setPhotoPreview(null);

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }

        setFormOpen(true);
    };

    /* Open edit modal */

    const openEdit = (member) => {
        revokeBlob();
        clearErrors();

        setEditing(member);

        setData({
            name: member.name || "",
            position: member.position || "",
            category: member.category || "research_assistant",
            affiliation: member.affiliation || "rwanda",
            institution: member.institution || "",
            responsibilities: member.responsibilities || "",
            position_rw: member.position_rw || "",
            institution_rw: member.institution_rw || "",
            responsibilities_rw: member.responsibilities_rw || "",
            reports_to_id: member.reports_to_id || "",
            group_number: member.group_number || "",
            group_role: member.group_role || "",
            photo: null,
            sort_order: member.sort_order ?? 0,
            is_active: Boolean(member.is_active),
        });

        setPhotoPreview(member.photo || null);

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }

        setFormOpen(true);
    };

    /* Close form */

    const closeForm = () => {
        if (processing) return;

        revokeBlob();

        setFormOpen(false);
        setEditing(null);
        setPhotoPreview(null);

        clearErrors();
    };

    /* Submit form */

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = editing
            ? route("admin.team.update", editing.id)
            : route("admin.team.store");

        post(url, {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                revokeBlob();

                setFormOpen(false);
                setEditing(null);
                setPhotoPreview(null);

                if (photoInputRef.current) {
                    photoInputRef.current.value = "";
                }
            },
        });
    };

    /* Delete member */

    const confirmDelete = () => {
        if (!deleting) return;

        router.delete(
            route("admin.team.destroy", deleting.id),
            {
                preserveScroll: true,

                onStart: () => setDeleteBusy(true),

                onFinish: () => {
                    setDeleteBusy(false);
                    setDeleting(null);
                },
            }
        );
    };

    /* Search and filters */

    const filteredMembers = useMemo(() => {
        const term = search.toLowerCase().trim();

        return members.filter((member) => {
            const matchesSearch =
                !term ||
                [
                    member.name,
                    member.position,
                    member.institution,
                    member.responsibilities,
                    member.position_rw,
                    member.institution_rw,
                    member.responsibilities_rw,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(term)
                    );

            const matchesCategory =
                categoryFilter === "all" ||
                member.category === categoryFilter;

            const matchesAffiliation =
                affiliationFilter === "all" ||
                member.affiliation === affiliationFilter;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesAffiliation
            );
        });
    }, [
        members,
        search,
        categoryFilter,
        affiliationFilter,
    ]);

    const filtersActive =
        search ||
        categoryFilter !== "all" ||
        affiliationFilter !== "all";

    const clearFilters = () => {
        setSearch("");
        setCategoryFilter("all");
        setAffiliationFilter("all");
    };

    const countBy = (value) =>
        members.filter((member) => member.category === value).length;

    const tabs = [
        {
            value: "all",
            label: "All members",
            count: members.length,
        },
        ...categories.map((category) => ({
            value: category.value,
            label: category.label,
            count: countBy(category.value),
        })),
    ];

    const stats = [
        {
            label: "Total members",
            value: members.length,
            icon: "bi-people",
            tone: "primary",
        },
        {
            label: "Active members",
            value: members.filter((member) => member.is_active).length,
            icon: "bi-person-check",
            tone: "success",
        },
        {
            label: "Psychologists",
            value: countBy("psychologist"),
            icon: "bi-heart-pulse",
            tone: "warning",
        },
        {
            label: "Community health workers",
            value: countBy("community_health_worker"),
            icon: "bi-people-fill",
            tone: "danger",
        },
    ];

    return (
        <AdminLayout>
            <Head title="Team Management" />

            <div className="container-fluid py-4 team-page">

                {/* PAGE HEADER */}

                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                        <div className="text-uppercase small fw-semibold text-primary mb-1">
                            Website management
                        </div>

                        <h3 className="fw-bold mb-1">
                            Team management
                        </h3>

                        <p className="text-muted mb-0">
                            Manage GAF-RW team members, affiliations and organizational roles.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={openCreate}
                    >
                        <i className="bi bi-plus-lg me-2" />
                        Add team member
                    </button>
                </div>

                {/* FLASH MESSAGE */}

                {flash?.success && flashVisible && (
                    <div
                        className="alert alert-success d-flex align-items-center justify-content-between"
                        role="alert"
                    >
                        <span>
                            <i className="bi bi-check-circle me-2" />
                            {flash.success}
                        </span>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setFlashVisible(false)}
                            aria-label="Close"
                        />
                    </div>
                )}

                {/* STATISTICS */}

                <div className="row g-3 mb-4">
                    {stats.map((stat) => (
                        <div
                            className="col-6 col-xl-3"
                            key={stat.label}
                        >
                            <div className="card border-0 shadow-sm h-100 team-stat-card">
                                <div className="card-body d-flex align-items-center gap-3">
                                    <div
                                        className={`team-stat-icon bg-${stat.tone}-subtle text-${stat.tone}`}
                                    >
                                        <i className={`bi ${stat.icon}`} />
                                    </div>

                                    <div>
                                        <div className="text-muted small">
                                            {stat.label}
                                        </div>

                                        <div className="fs-4 fw-bold lh-1 mt-1">
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TEAM DIRECTORY */}

                <div className="card border-0 shadow-sm team-directory">

                    {/* DIRECTORY FILTERS */}

                    <div className="card-body border-bottom">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div className="input-group team-search">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search text-muted" />
                                </span>

                                <input
                                    type="search"
                                    className="form-control border-start-0"
                                    placeholder="Search name, role or institution..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <select
                                    className="form-select form-select-sm"
                                    style={{ minWidth: 150 }}
                                    value={affiliationFilter}
                                    onChange={(event) =>
                                        setAffiliationFilter(event.target.value)
                                    }
                                    aria-label="Filter by affiliation"
                                >
                                    <option value="all">All affiliations</option>
                                    <option value="netherlands">Netherlands</option>
                                    <option value="rwanda">Rwanda</option>
                                    <option value="both">Both teams</option>
                                </select>

                                {filtersActive && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-link text-decoration-none"
                                        onClick={clearFilters}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* CATEGORY TABS */}

                        <div className="d-flex flex-nowrap gap-2 mt-3 overflow-auto pb-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    className={`btn btn-sm rounded-pill text-nowrap ${
                                        categoryFilter === tab.value
                                            ? "btn-primary"
                                            : "btn-outline-secondary"
                                    }`}
                                    onClick={() =>
                                        setCategoryFilter(tab.value)
                                    }
                                >
                                    {tab.label}

                                    <span
                                        className={`badge rounded-pill ms-2 ${
                                            categoryFilter === tab.value
                                                ? "text-bg-light"
                                                : "text-bg-secondary"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MEMBERS TABLE */}

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0 team-table">
                            <thead>
                                <tr>
                                    <th className="ps-4">Team member</th>
                                    <th>Category</th>
                                    <th>Affiliation</th>
                                    <th className="d-none d-xl-table-cell">
                                        Reports to
                                    </th>
                                    <th className="d-none d-lg-table-cell">
                                        Group
                                    </th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <tr key={member.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    {member.photo ? (
                                                        <img
                                                            src={member.photo}
                                                            alt={member.name}
                                                            className="team-avatar"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="team-avatar team-initials"
                                                            style={{
                                                                background: avatarColor(member.name),
                                                            }}
                                                        >
                                                            {member.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}

                                                    <div className="min-w-0">
                                                        <div className="fw-semibold">
                                                            {member.name}
                                                        </div>

                                                        <div className="small text-muted">
                                                            {member.position}
                                                        </div>

                                                        {member.institution && (
                                                            <div className="small text-muted opacity-75">
                                                                {member.institution}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge rounded-pill fw-semibold ${
                                                        categoryStyles[member.category] ||
                                                        categoryStyles.other
                                                    }`}
                                                >
                                                    {categoryLabels[member.category] ||
                                                        member.category}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="small">
                                                    <i className="bi bi-geo-alt me-1 text-muted" />
                                                    {affiliationLabels[member.affiliation] ||
                                                        member.affiliation}
                                                </span>
                                            </td>

                                            <td className="d-none d-xl-table-cell small">
                                                {member.reports_to || "—"}
                                            </td>

                                            <td className="d-none d-lg-table-cell small">
                                                {member.group_number ? (
                                                    <>
                                                        Group {member.group_number}

                                                        {member.group_role && (
                                                            <span className="d-block text-muted text-capitalize">
                                                                {member.group_role.replaceAll("_", " ")}
                                                            </span>
                                                        )}
                                                    </>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge rounded-pill ${
                                                        member.is_active
                                                            ? "bg-success-subtle text-success-emphasis"
                                                            : "bg-secondary-subtle text-secondary-emphasis"
                                                    }`}
                                                >
                                                    <i
                                                        className="bi bi-circle-fill me-1"
                                                        style={{ fontSize: 7 }}
                                                    />

                                                    {member.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="text-end pe-4">
                                                <div
                                                    className="btn-group btn-group-sm"
                                                    role="group"
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        title="Edit member"
                                                        onClick={() => openEdit(member)}
                                                    >
                                                        <i className="bi bi-pencil-square" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        title="Delete member"
                                                        onClick={() => setDeleting(member)}
                                                    >
                                                        <i className="bi bi-trash3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-5">
                                            <i className="bi bi-people fs-1 text-muted" />

                                            <h6 className="fw-semibold mt-3 mb-1">
                                                {members.length === 0
                                                    ? "No team members yet"
                                                    : "No matching team members"}
                                            </h6>

                                            <p className="text-muted small mb-3">
                                                {members.length === 0
                                                    ? "Add your first team member to display them on the website."
                                                    : "Try a different search or clear the filters."}
                                            </p>

                                            {members.length === 0 ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={openCreate}
                                                >
                                                    Add team member
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={clearFilters}
                                                >
                                                    Clear filters
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="card-footer bg-white border-0 small text-muted py-3 px-4">
                        Showing {filteredMembers.length} of {members.length} members
                    </div>
                </div>
            </div>

            {/* =================================================
                CREATE / EDIT MODAL
            ================================================= */}

            <ModalShell
                show={formOpen}
                onClose={closeForm}
                size="lg"
                locked={processing}
            >
                <form
                    className="modal-content border-0 shadow-lg"
                    onSubmit={handleSubmit}
                >
                    {/* FIXED HEADER */}

                    <div className="modal-header border-0">
                        <div>
                            <div className="text-primary small fw-semibold text-uppercase mb-1">
                                Team directory
                            </div>

                            <h5 className="modal-title fw-bold">
                                {editing
                                    ? "Edit team member"
                                    : "Add team member"}
                            </h5>

                            <p className="text-muted small mb-0">
                                {editing
                                    ? `Update ${editing.name}'s details and organizational role.`
                                    : "Enter the team member's details and organizational role."}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeForm}
                            disabled={processing}
                            aria-label="Close"
                        />
                    </div>

                    {/* SCROLLABLE BODY */}

                    <div className="modal-body px-4">
                        <div className="row g-3">

                            <SectionTitle icon="bi-person-badge">
                                Profile information
                            </SectionTitle>

                            <Field
                                label="Profile photo"
                                error={errors.photo}
                                hint="JPG, PNG or WEBP. Maximum 5 MB."
                            >
                                <div className="d-flex align-items-center gap-3">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Photo preview"
                                            className="team-photo"
                                        />
                                    ) : (
                                        <div className="team-photo team-photo-empty">
                                            <i className="bi bi-person" />
                                        </div>
                                    )}

                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        className={`form-control ${
                                            errors.photo ? "is-invalid" : ""
                                        }`}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Full name"
                                required
                                error={errors.name}
                                className="col-md-6"
                            >
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                    }`}
                                    value={data.name}
                                    onChange={(event) =>
                                        setData("name", event.target.value)
                                    }
                                    placeholder="Enter full name"
                                />
                            </Field>

                            <Field
                                label="Position / role"
                                required
                                error={errors.position}
                                className="col-md-6"
                            >
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.position ? "is-invalid" : ""
                                    }`}
                                    value={data.position}
                                    onChange={(event) =>
                                        setData("position", event.target.value)
                                    }
                                    placeholder="e.g. Main supervisor (PI)"
                                />
                            </Field>

                            <SectionTitle icon="bi-diagram-3">
                                Role and affiliation
                            </SectionTitle>

                            <Field
                                label="Category"
                                required
                                error={errors.category}
                                className="col-md-6"
                            >
                                <select
                                    className={`form-select ${
                                        errors.category ? "is-invalid" : ""
                                    }`}
                                    value={data.category}
                                    onChange={(event) =>
                                        setData("category", event.target.value)
                                    }
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Team affiliation"
                                required
                                error={errors.affiliation}
                                className="col-md-6"
                            >
                                <select
                                    className={`form-select ${
                                        errors.affiliation ? "is-invalid" : ""
                                    }`}
                                    value={data.affiliation}
                                    onChange={(event) =>
                                        setData("affiliation", event.target.value)
                                    }
                                >
                                    <option value="netherlands">
                                        Netherlands team
                                    </option>
                                    <option value="rwanda">
                                        Rwanda team
                                    </option>
                                    <option value="both">
                                        Both teams
                                    </option>
                                </select>
                            </Field>

                            <Field
                                label="Institution / organization"
                                error={errors.institution}
                            >
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.institution ? "is-invalid" : ""
                                    }`}
                                    value={data.institution}
                                    onChange={(event) =>
                                        setData("institution", event.target.value)
                                    }
                                    placeholder="e.g. Amsterdam UMC"
                                />
                            </Field>

                            <Field
                                label="Responsibilities / description"
                                error={errors.responsibilities}
                            >
                                <textarea
                                    className={`form-control ${
                                        errors.responsibilities ? "is-invalid" : ""
                                    }`}
                                    rows={4}
                                    value={data.responsibilities}
                                    onChange={(event) =>
                                        setData("responsibilities", event.target.value)
                                    }
                                    placeholder="Describe the person's responsibilities..."
                                />
                            </Field>

                            <SectionTitle icon="bi-translate">
                                Kinyarwanda translation (Ikinyarwanda)
                            </SectionTitle>

                            <div className="col-12">
                                <p className="text-muted small mb-0">
                                    Shown on the public team page when visitors choose Kinyarwanda.
                                    The English text is used for any field left empty.
                                </p>
                            </div>

                            <Field
                                label="Position / role (RW)"
                                error={errors.position_rw}
                                className="col-md-6"
                            >
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.position_rw ? "is-invalid" : ""
                                    }`}
                                    value={data.position_rw}
                                    onChange={(event) =>
                                        setData("position_rw", event.target.value)
                                    }
                                    placeholder={data.position || "Urugero: Umuyobozi mukuru w’ubushakashatsi"}
                                />
                            </Field>

                            <Field
                                label="Institution (RW)"
                                error={errors.institution_rw}
                                className="col-md-6"
                            >
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.institution_rw ? "is-invalid" : ""
                                    }`}
                                    value={data.institution_rw}
                                    onChange={(event) =>
                                        setData("institution_rw", event.target.value)
                                    }
                                    placeholder={data.institution || "Urugero: Ikigo cy’Igihugu gishinzwe Ubuzima (RBC)"}
                                />
                            </Field>

                            <Field
                                label="Responsibilities (RW)"
                                error={errors.responsibilities_rw}
                            >
                                <textarea
                                    className={`form-control ${
                                        errors.responsibilities_rw ? "is-invalid" : ""
                                    }`}
                                    rows={3}
                                    value={data.responsibilities_rw}
                                    onChange={(event) =>
                                        setData("responsibilities_rw", event.target.value)
                                    }
                                    placeholder="Sobanura inshingano ze mu Kinyarwanda..."
                                />
                            </Field>

                            <SectionTitle icon="bi-signpost-split">
                                Organizational structure
                            </SectionTitle>

                            <Field
                                label="Reports to"
                                error={errors.reports_to_id}
                                className="col-md-6"
                            >
                                <select
                                    className={`form-select ${
                                        errors.reports_to_id ? "is-invalid" : ""
                                    }`}
                                    value={data.reports_to_id}
                                    onChange={(event) =>
                                        setData("reports_to_id", event.target.value)
                                    }
                                >
                                    <option value="">
                                        No reporting relationship
                                    </option>

                                    {members
                                        .filter((member) => member.id !== editing?.id)
                                        .map((member) => (
                                            <option
                                                key={member.id}
                                                value={member.id}
                                            >
                                                {member.name} — {member.position}
                                            </option>
                                        ))}
                                </select>
                            </Field>

                            <Field
                                label="Display order"
                                error={errors.sort_order}
                                className="col-md-6"
                            >
                                <input
                                    type="number"
                                    min="0"
                                    className={`form-control ${
                                        errors.sort_order ? "is-invalid" : ""
                                    }`}
                                    value={data.sort_order}
                                    onChange={(event) =>
                                        setData("sort_order", event.target.value)
                                    }
                                />
                            </Field>

                            <Field
                                label="Intervention group number"
                                error={errors.group_number}
                                className="col-md-6"
                            >
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    className={`form-control ${
                                        errors.group_number ? "is-invalid" : ""
                                    }`}
                                    value={data.group_number}
                                    onChange={(event) =>
                                        setData("group_number", event.target.value)
                                    }
                                    placeholder="e.g. 1"
                                />
                            </Field>

                            <Field
                                label="Group responsibility"
                                error={errors.group_role}
                                className="col-md-6"
                            >
                                <select
                                    className={`form-select ${
                                        errors.group_role ? "is-invalid" : ""
                                    }`}
                                    value={data.group_role}
                                    onChange={(event) =>
                                        setData("group_role", event.target.value)
                                    }
                                >
                                    <option value="">Not assigned</option>
                                    <option value="psychologist">
                                        Psychologist / group lead
                                    </option>
                                    <option value="community_health_worker">
                                        Community health worker
                                    </option>
                                </select>
                            </Field>

                            <SectionTitle icon="bi-toggle2-on">
                                Visibility settings
                            </SectionTitle>

                            <div className="col-12">
                                <div className="team-visibility-box">
                                    <div className="form-check form-switch mb-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="teamMemberActive"
                                            checked={data.is_active}
                                            onChange={(event) =>
                                                setData("is_active", event.target.checked)
                                            }
                                        />

                                        <label
                                            className="form-check-label fw-semibold"
                                            htmlFor="teamMemberActive"
                                        >
                                            Active team member
                                        </label>
                                    </div>

                                    <div className="form-text">
                                        Inactive members will not be displayed on the public website.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FIXED FOOTER */}

                    <div className="modal-footer bg-light border-0">
                        <button
                            type="button"
                            className="btn btn-light border"
                            onClick={closeForm}
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
                                    <i className="bi bi-check2 me-2" />
                                    {editing ? "Save changes" : "Add team member"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </ModalShell>

            {/* =================================================
                DELETE CONFIRMATION MODAL
            ================================================= */}

            <ModalShell
                show={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                size="sm"
                locked={deleteBusy}
            >
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-body text-center p-4">
                        <div className="team-delete-icon mx-auto mb-3">
                            <i className="bi bi-trash3" />
                        </div>

                        <h5 className="fw-bold mb-2">
                            Delete team member?
                        </h5>

                        <p className="text-muted small mb-0">
                            <strong>{deleting?.name}</strong> will be permanently
                            removed. This action cannot be undone.
                        </p>
                    </div>

                    <div className="modal-footer border-0 justify-content-center pt-0 pb-4">
                        <button
                            type="button"
                            className="btn btn-light border px-4"
                            onClick={() => setDeleting(null)}
                            disabled={deleteBusy}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={confirmDelete}
                            disabled={deleteBusy}
                        >
                            {deleteBusy ? (
                                <span className="spinner-border spinner-border-sm" />
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </ModalShell>

            {/* =================================================
                PAGE AND MODAL STYLES
            ================================================= */}

            <style>{`
                .team-page {
                    color: #172033;
                }

                .team-stat-card,
                .team-directory {
                    border-radius: 12px;
                }

                .team-stat-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .team-search {
                    max-width: 360px;
                    flex: 1 1 260px;
                }

                .team-table thead th {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: .05em;
                    color: #6c757d;
                    font-weight: 600;
                    white-space: nowrap;
                    background: #f8f9fa;
                    padding-top: 13px;
                    padding-bottom: 13px;
                    border-bottom: 1px solid #edf0f4;
                }

                .team-table td {
                    padding-top: 14px;
                    padding-bottom: 14px;
                }

                .team-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                }

                .team-initials {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                }

                .team-photo {
                    width: 84px;
                    height: 84px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    border: 3px solid #edf2f8;
                }

                .team-photo-empty {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 34px;
                }

                .team-visibility-box {
                    background: #f8fafc;
                    border: 1px solid #e9edf3;
                    padding: 16px;
                    border-radius: 10px;
                }

                .team-delete-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fdecee;
                    color: #dc3545;
                    font-size: 24px;
                }

                /* ==========================================
                   MODAL FIX - HEADER AND FOOTER STAY VISIBLE
                ========================================== */

                .team-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, .55);
                    z-index: 2000;
                }

                .team-modal-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 2001;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                    padding: 16px;
                    -webkit-overflow-scrolling: touch;
                }

                .team-modal-dialog {
                    width: 100%;
                    max-width: 800px;
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                }

                .team-modal-dialog.modal-sm {
                    max-width: 400px;
                }

                .team-modal-dialog .modal-content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-height: calc(100vh - 32px);
                    max-height: calc(100dvh - 32px);
                    overflow: hidden;
                    border-radius: 14px;
                    background: #fff;
                }

                .team-modal-dialog .modal-header {
                    flex: 0 0 auto;
                    padding: 22px 24px;
                    background: #fff;
                    border-radius: 14px 14px 0 0;
                }

                .team-modal-dialog .modal-body {
                    flex: 1 1 auto;
                    min-height: 0;
                    overflow-x: hidden;
                    overflow-y: auto !important;
                    overscroll-behavior: contain;
                    -webkit-overflow-scrolling: touch;
                    padding: 20px 24px;
                }

                .team-modal-dialog .modal-footer {
                    flex: 0 0 auto;
                    padding: 16px 24px;
                    background: #f8f9fa;
                    border-radius: 0 0 14px 14px;
                }

                .team-modal-dialog .form-control,
                .team-modal-dialog .form-select {
                    min-height: 42px;
                    border-color: #dfe4eb;
                }

                .team-modal-dialog textarea.form-control {
                    min-height: auto;
                }

                .team-modal-dialog .form-control:focus,
                .team-modal-dialog .form-select:focus {
                    border-color: #20603d;
                    box-shadow: 0 0 0 .2rem rgba(32, 96, 61, .12);
                }

                @media (max-width: 575.98px) {
                    .team-modal-wrapper {
                        padding: 8px;
                    }

                    .team-modal-dialog .modal-content {
                        max-height: calc(100vh - 16px);
                        max-height: calc(100dvh - 16px);
                    }

                    .team-modal-dialog .modal-header {
                        padding: 16px;
                    }

                    .team-modal-dialog .modal-body {
                        padding: 16px;
                    }

                    .team-modal-dialog .modal-footer {
                        padding: 12px 16px;
                    }

                    .team-modal-dialog .modal-footer .btn {
                        flex: 1;
                    }

                    .team-photo {
                        width: 64px;
                        height: 64px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
