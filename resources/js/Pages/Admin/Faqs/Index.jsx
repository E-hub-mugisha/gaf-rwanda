import React, { useEffect, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import LangTabs from "@/Components/Admin/LangTabs";
import { useAdminLang } from "@/lib/adminI18n";

const emptyForm = {
    question: "",
    answer: "",
    question_rw: "",
    answer_rw: "",
    sort_order: 0,
    is_active: true,
};

export default function Index({ faqs, filters, statistics }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [viewingFaq, setViewingFaq] = useState(null);
    const [deletingFaq, setDeletingFaq] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "all");

    const form = useForm(emptyForm);

    const { t, lang } = useAdminLang();
    const [editLang, setEditLang] = useState("en");
    const field = (name) => (editLang === "rw" ? `${name}_rw` : name);

    // Show the question/answer in the admin's interface language when available.
    const localized = (faq, name) =>
        lang === "rw"
            ? faq[`${name}_rw`] || faq[name] || ""
            : faq[name] || faq[`${name}_rw`] || "";

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.faqs.index"),
                { search, status },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 350);

        return () => clearTimeout(timeout);
    }, [search, status]);

    useEffect(() => {
        if (!showModal && !viewingFaq && !deletingFaq) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeModal();
                setViewingFaq(null);
                setDeletingFaq(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [showModal, viewingFaq, deletingFaq]);

    const openCreateModal = () => {
        setEditingFaq(null);
        form.reset();
        form.clearErrors();
        form.setData({ ...emptyForm, sort_order: (statistics.total || 0) + 1 });
        setEditLang("rw");
        setShowModal(true);
    };

    const openEditModal = (faq) => {
        setEditingFaq(faq);
        form.clearErrors();
        form.setData({
            question: faq.question || "",
            answer: faq.answer || "",
            question_rw: faq.question_rw || "",
            answer_rw: faq.answer_rw || "",
            sort_order: faq.sort_order ?? 0,
            is_active: Boolean(faq.is_active),
        });
        setEditLang(faq.question_rw || !faq.question ? "rw" : "en");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingFaq(null);
        form.reset();
        form.clearErrors();
    };

    const submit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: closeModal,
            onError: (errors) => {
                if (errors.question_rw || errors.answer_rw) setEditLang("rw");
                else if (errors.question || errors.answer) setEditLang("en");
            },
        };

        if (editingFaq) {
            form.put(route("admin.faqs.update", editingFaq.id), options);
        } else {
            form.post(route("admin.faqs.store"), options);
        }
    };

    const deleteFaq = () => {
        if (!deletingFaq) return;

        router.delete(route("admin.faqs.destroy", deletingFaq.id), {
            preserveScroll: true,
            onSuccess: () => setDeletingFaq(null),
        });
    };

    const toggleStatus = (faq) => {
        router.patch(route("admin.faqs.toggle-status", faq.id), {}, {
            preserveScroll: true,
        });
    };

    const insertTag = (tag) => {
        form.setData(field("answer"), `${form.data[field("answer")] || ""}${tag}`);
    };

    const paginationLinks = faqs.links || [];

    return (
        <AdminLayout>
            <Head title={t("faqs")} />

            <div className="container-fluid py-4 px-3 px-lg-4">
                {/* Page heading */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div>
                        <div className="text-muted small mb-1">
                            {t("administration")} / {t({ en: "Website content", rw: "Ibiri ku rubuga" })}
                        </div>
                        <h3 className="fw-bold mb-1">{t("faqs")}</h3>
                        <p className="text-muted mb-0">
                            {t({ en: "Manage the questions and answers shown on the GAF-Rwanda website, in English and Kinyarwanda.", rw: "Gucunga ibibazo n’ibisubizo bigaragara ku rubuga rwa GAF-Rwanda, mu Cyongereza no mu Kinyarwanda." })}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={openCreateModal}
                    >
                        <i className="bi bi-plus-lg me-2" />
                        {t({ en: "Add FAQ", rw: "Ongeraho ikibazo" })}
                    </button>
                </div>

                {/* Flash message */}
                {flash.success && (
                    <div className="alert alert-success alert-dismissible fade show">
                        <i className="bi bi-check-circle me-2" />
                        {flash.success}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                        />
                    </div>
                )}

                {/* Statistics */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3">
                                    <i className="bi bi-question-circle fs-4" />
                                </div>
                                <div>
                                    <div className="text-muted small">{t({ en: "Total FAQs", rw: "Ibibazo byose" })}</div>
                                    <h4 className="fw-bold mb-0">{statistics.total}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 bg-success bg-opacity-10 text-success p-3">
                                    <i className="bi bi-check-circle fs-4" />
                                </div>
                                <div>
                                    <div className="text-muted small">{t({ en: "Active FAQs", rw: "Ibikora" })}</div>
                                    <h4 className="fw-bold mb-0">{statistics.active}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="rounded-3 bg-secondary bg-opacity-10 text-secondary p-3">
                                    <i className="bi bi-eye-slash fs-4" />
                                </div>
                                <div>
                                    <div className="text-muted small">{t({ en: "Inactive FAQs", rw: "Ibidakora" })}</div>
                                    <h4 className="fw-bold mb-0">{statistics.inactive}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ table */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 p-3 p-lg-4">
                        <div className="row g-3 align-items-center">
                            <div className="col-12 col-lg-7">
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="bi bi-search text-muted" />
                                    </span>
                                    <input
                                        type="search"
                                        className="form-control bg-light border-start-0"
                                        placeholder={t({ en: "Search questions and answers…", rw: "Shakisha ibibazo n’ibisubizo…" })}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-3 ms-lg-auto">
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="all">{t("all")}</option>
                                    <option value="active">{t("active")}</option>
                                    <option value="inactive">{t("inactive")}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4" style={{ width: 75 }}>{t("order")}</th>
                                    <th>{t({ en: "Question", rw: "Ikibazo" })}</th>
                                    <th style={{ width: 120 }}>{t("status")}</th>
                                    <th style={{ width: 150 }}>{t("lastUpdated")}</th>
                                    <th className="text-end pe-4" style={{ width: 180 }}>
                                        {t("actions")}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {faqs.data.length > 0 ? (
                                    faqs.data.map((faq) => (
                                        <tr key={faq.id}>
                                            <td className="ps-4">
                                                <span className="badge bg-light text-dark border">
                                                    {faq.sort_order}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="fw-semibold text-dark">
                                                    {localized(faq, "question")}
                                                </div>
                                                <div className="d-flex gap-1 mt-1">
                                                    <span className={`badge border ${faq.question ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"}`}>
                                                        EN {faq.question ? "✓" : "—"}
                                                    </span>
                                                    <span className={`badge border ${faq.question_rw ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"}`}>
                                                        RW {faq.question_rw ? "✓" : "—"}
                                                    </span>
                                                </div>
                                                <div
                                                    className="text-muted small mt-1"
                                                    style={{
                                                        maxWidth: 620,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: localized(faq, "answer"),
                                                    }}
                                                />
                                            </td>

                                            <td>
                                                {faq.is_active ? (
                                                    <span className="badge rounded-pill bg-success bg-opacity-10 text-success">
                                                        {t("active")}
                                                    </span>
                                                ) : (
                                                    <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary">
                                                        {t("inactive")}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="text-muted small">
                                                {new Date(faq.updated_at).toLocaleDateString()}
                                            </td>

                                            <td className="text-end pe-4">
                                                <div className="d-inline-flex gap-1">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light"
                                                        title="View FAQ"
                                                        onClick={() => setViewingFaq(faq)}
                                                    >
                                                        <i className="bi bi-eye" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-primary"
                                                        title="Edit FAQ"
                                                        onClick={() => openEditModal(faq)}
                                                    >
                                                        <i className="bi bi-pencil-square" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm btn-light ${
                                                            faq.is_active ? "text-warning" : "text-success"
                                                        }`}
                                                        title={faq.is_active ? "Deactivate" : "Activate"}
                                                        onClick={() => toggleStatus(faq)}
                                                    >
                                                        <i className={`bi ${
                                                            faq.is_active ? "bi-eye-slash" : "bi-eye"
                                                        }`} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-light text-danger"
                                                        title="Delete FAQ"
                                                        onClick={() => setDeletingFaq(faq)}
                                                    >
                                                        <i className="bi bi-trash" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <i className="bi bi-question-circle display-6 text-muted" />
                                            <h6 className="mt-3 fw-semibold">{t("noResults")}</h6>
                                            <p className="text-muted small mb-3">
                                                {t({ en: "Add a new FAQ or adjust your search filters.", rw: "Ongeraho ikibazo gishya cyangwa uhindure ibyo washakishije." })}
                                            </p>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={openCreateModal}
                                            >
                                                {t({ en: "Add FAQ", rw: "Ongeraho ikibazo" })}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {faqs.data.length > 0 && (
                        <div className="card-footer bg-white border-0 p-3">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                                <small className="text-muted">
                                    {t("showing", { from: faqs.from || 0, to: faqs.to || 0, total: faqs.total })}
                                </small>

                                <div className="d-flex flex-wrap gap-1">
                                    {paginationLinks.map((link, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url, {
                                                preserveScroll: true,
                                                preserveState: true,
                                            })}
                                            className={`btn btn-sm ${
                                                link.active
                                                    ? "btn-primary"
                                                    : "btn-outline-secondary"
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="faq-modal-backdrop" onMouseDown={(e) => {
                    if (e.target === e.currentTarget) closeModal();
                }}>
                    <div
                        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable faq-modal-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="faqModalTitle"
                    >
                        <div className="modal-content border-0 shadow">
                            <form onSubmit={submit}>
                                <div className="modal-header px-4 py-3">
                                    <div>
                                        <h5 className="modal-title fw-bold" id="faqModalTitle">
                                            {editingFaq ? t({ en: "Edit FAQ", rw: "Hindura ikibazo" }) : t({ en: "Create FAQ", rw: "Ongeraho ikibazo" })}
                                        </h5>
                                        <p className="text-muted small mb-0">
                                            {t({ en: "Fill in at least one language. Visitors see the other language when a translation is missing.", rw: "Uzuza nibura ururimi rumwe. Iyo ubusobanuro budahari, abasura babona urundi rurimi." })}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    />
                                </div>

                                <div className="modal-body p-4">
                                    <LangTabs
                                        value={editLang}
                                        onChange={setEditLang}
                                        data={form.data}
                                        errors={form.errors}
                                        fields={["question", "answer"]}
                                    />

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            {t({ en: "Question", rw: "Ikibazo" })} ({editLang.toUpperCase()})
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${form.errors[field("question")] ? "is-invalid" : ""}`}
                                            placeholder={editLang === "rw" ? "Andika ikibazo mu Kinyarwanda" : "Enter the FAQ question"}
                                            value={form.data[field("question")] || ""}
                                            onChange={(e) => form.setData(field("question"), e.target.value)}
                                        />
                                        {form.errors[field("question")] && (
                                            <div className="invalid-feedback">{form.errors[field("question")]}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            {t({ en: "Answer", rw: "Igisubizo" })} ({editLang.toUpperCase()})
                                        </label>

                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => insertTag("<p></p>")}
                                            >
                                                Paragraph
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => insertTag("<ul>\n<li></li>\n</ul>")}
                                            >
                                                Bullet list
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => insertTag('<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link text</a>')}
                                            >
                                                Insert link
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => insertTag("<strong></strong>")}
                                            >
                                                Bold
                                            </button>
                                        </div>

                                        <textarea
                                            rows="11"
                                            className={`form-control font-monospace ${form.errors[field("answer")] ? "is-invalid" : ""}`}
                                            placeholder="Basic HTML is supported: <p>, <ul>, <li>, <strong>, <a>..."
                                            value={form.data[field("answer")] || ""}
                                            onChange={(e) => form.setData(field("answer"), e.target.value)}
                                        />
                                        {form.errors[field("answer")] && (
                                            <div className="invalid-feedback">{form.errors[field("answer")]}</div>
                                        )}
                                        <div className="form-text">
                                            Basic HTML formatting is supported. Only enter trusted HTML content.
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">{t({ en: "Display order", rw: "Umwanya ugaragaraho" })}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                className={`form-control ${form.errors.sort_order ? "is-invalid" : ""}`}
                                                value={form.data.sort_order}
                                                onChange={(e) => form.setData("sort_order", e.target.value)}
                                            />
                                            {form.errors.sort_order && (
                                                <div className="invalid-feedback">{form.errors.sort_order}</div>
                                            )}
                                            <div className="form-text">{t({ en: "Lower numbers appear first.", rw: "Imibare mito igaragara mbere." })}</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold d-block">{t({ en: "Visibility", rw: "Kugaragara" })}</label>
                                            <div className="form-check form-switch mt-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="faqActive"
                                                    checked={Boolean(form.data.is_active)}
                                                    onChange={(e) => form.setData("is_active", e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="faqActive">
                                                    {form.data.is_active
                                                        ? t({ en: "Active — visible on website", rw: "Birakora — biragaragara ku rubuga" })
                                                        : t({ en: "Inactive — hidden from website", rw: "Ntibikora — ntibigaragara ku rubuga" })}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer px-4 py-3">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={closeModal}
                                        disabled={form.processing}
                                    >
                                        {t("cancel")}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={form.processing}
                                    >
                                        {form.processing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                {t("saving")}
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check2 me-2" />
                                                {editingFaq ? t("save") : t({ en: "Create FAQ", rw: "Ongeraho ikibazo" })}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewingFaq && (
                <div className="faq-modal-backdrop" onMouseDown={(e) => {
                    if (e.target === e.currentTarget) setViewingFaq(null);
                }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable faq-modal-dialog">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header px-4">
                                <div>
                                    <span className="text-muted small">FAQ #{viewingFaq.id}</span>
                                    <h5 className="modal-title fw-bold mt-1">{t({ en: "FAQ details", rw: "Ibisobanuro by’ikibazo" })}</h5>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setViewingFaq(null)}
                                />
                            </div>

                            <div className="modal-body p-4">
                                <div className="row g-4">
                                    {[
                                        ["EN", viewingFaq.question, viewingFaq.answer],
                                        ["RW", viewingFaq.question_rw, viewingFaq.answer_rw],
                                    ].map(([code, question, answer]) => (
                                        <div className="col-lg-6" key={code}>
                                            <span className="badge bg-primary bg-opacity-10 text-primary mb-2">{code}</span>
                                            {question ? (
                                                <>
                                                    <h6 className="fw-bold">{question}</h6>
                                                    <div
                                                        className="faq-answer-preview small"
                                                        dangerouslySetInnerHTML={{ __html: answer || "" }}
                                                    />
                                                </>
                                            ) : (
                                                <p className="text-warning small mb-0">
                                                    <i className="bi bi-exclamation-circle me-1" />
                                                    {t("missingTranslation")}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex flex-wrap gap-3 mt-4">
                                    <span className="badge bg-light text-dark border">
                                        {t({ en: "Display order", rw: "Umwanya ugaragaraho" })}: {viewingFaq.sort_order}
                                    </span>
                                    <span className={`badge ${
                                        viewingFaq.is_active
                                            ? "bg-success bg-opacity-10 text-success"
                                            : "bg-secondary bg-opacity-10 text-secondary"
                                    }`}>
                                        {viewingFaq.is_active ? t("active") : t("inactive")}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-footer px-4">
                                <button
                                    className="btn btn-light"
                                    onClick={() => setViewingFaq(null)}
                                >
                                    {t("close")}
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const faq = viewingFaq;
                                        setViewingFaq(null);
                                        openEditModal(faq);
                                    }}
                                >
                                    <i className="bi bi-pencil-square me-2" />
                                    {t({ en: "Edit FAQ", rw: "Hindura ikibazo" })}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deletingFaq && (
                <div className="faq-modal-backdrop">
                    <div className="modal-dialog modal-dialog-centered faq-confirm-dialog">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-body p-4 text-center">
                                <div className="rounded-circle bg-danger bg-opacity-10 text-danger d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{ width: 60, height: 60 }}>
                                    <i className="bi bi-trash fs-4" />
                                </div>

                                <h5 className="fw-bold">{t({ en: "Delete this FAQ?", rw: "Gusiba iki kibazo?" })}</h5>
                                <p className="text-muted mb-4">
                                    <strong>“{localized(deletingFaq, "question")}”</strong>
                                    <br />
                                    {t("cannotUndo")}
                                </p>

                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        className="btn btn-light px-4"
                                        onClick={() => setDeletingFaq(null)}
                                    >
                                        {t("cancel")}
                                    </button>
                                    <button
                                        className="btn btn-danger px-4"
                                        onClick={deleteFaq}
                                    >
                                        {t("delete")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}