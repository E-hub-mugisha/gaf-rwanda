import React, { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useAdminLang } from "@/lib/adminI18n";

const STATUS_META = {
    new: { icon: "bi-envelope-fill", tone: "primary", en: "New", rw: "Bishya" },
    read: { icon: "bi-envelope-open", tone: "secondary", en: "Read", rw: "Byasomwe" },
    replied: { icon: "bi-reply-fill", tone: "success", en: "Replied", rw: "Byasubijwe" },
    archived: { icon: "bi-archive", tone: "dark", en: "Archived", rw: "Byabitswe" },
};

const formatDate = (value, lang) =>
    value
        ? new Date(value).toLocaleString(lang === "rw" ? "rw-RW" : "en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

export default function Index({ messages, filters, counts }) {
    const { t, lang } = useAdminLang();
    const { flash } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");
    const [selectedId, setSelectedId] = useState(messages.data[0]?.id ?? null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const selected = messages.data.find((m) => m.id === selectedId) || null;

    // Debounced search.
    useEffect(() => {
        if (search === (filters.search || "")) return;

        const timer = setTimeout(() => {
            router.get(
                route("admin.messages.index"),
                { status: filters.status, search },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    const filterBy = (status) => {
        router.get(
            route("admin.messages.index"),
            { status, search },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const setStatus = (message, status) => {
        router.patch(
            route("admin.messages.update", message.id),
            { status },
            { preserveScroll: true, preserveState: true }
        );
    };

    const open = (message) => {
        setSelectedId(message.id);
        if (message.status === "new") setStatus(message, "read");
    };

    const destroy = () => {
        router.delete(route("admin.messages.destroy", confirmDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmDelete(null);
                setSelectedId(null);
            },
        });
    };

    const replyLink = (message) =>
        `mailto:${message.email}?subject=${encodeURIComponent(
            `Re: ${message.subject || "GAF-Rwanda"}`
        )}&body=${encodeURIComponent(`\n\n---\n${message.message}`)}`;

    const tabs = ["all", "new", "read", "replied", "archived"];

    return (
        <AdminLayout title={t("messages")}>
            <Head title={t("messages")} />

            <div className="adm-page">
                <div className="adm-page-head">
                    <div>
                        <span className="adm-breadcrumb">
                            {t("administration")} / {t("messages")}
                        </span>
                        <h2>{t("messages")}</h2>
                        <p>
                            {t({
                                en: "Messages sent by visitors through the “Contact us” form on the website.",
                                rw: "Ubutumwa abasura urubuga bohereza bakoresheje ifishi ya “Vugana natwe”.",
                            })}
                        </p>
                    </div>
                </div>

                {flash?.success && (
                    <div className="alert alert-success d-flex align-items-center gap-2">
                        <i className="bi bi-check-circle" /> {flash.success}
                    </div>
                )}

                <div className="adm-card">
                    <div className="adm-toolbar">
                        <div className="adm-tabs">
                            {tabs.map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    className={filters.status === status ? "is-active" : ""}
                                    onClick={() => filterBy(status)}
                                >
                                    {status === "all" ? t("all") : t(STATUS_META[status])}
                                    <span className="adm-count">{counts[status] ?? 0}</span>
                                </button>
                            ))}
                        </div>

                        <div className="adm-search">
                            <i className="bi bi-search" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder={t({ en: "Search name, email or message…", rw: "Shakisha izina, imeyili cyangwa ubutumwa…" })}
                            />
                        </div>
                    </div>

                    {messages.data.length === 0 ? (
                        <div className="adm-empty">
                            <i className="bi bi-inbox" />
                            <h5>{t({ en: "No messages yet", rw: "Nta butumwa buraboneka" })}</h5>
                            <p>
                                {t({
                                    en: "New messages from the website contact form will appear here.",
                                    rw: "Ubutumwa bushya buturuka ku rubuga buzagaragara hano.",
                                })}
                            </p>
                        </div>
                    ) : (
                        <div className="adm-inbox">
                            <ul className="adm-inbox-list">
                                {messages.data.map((message) => {
                                    const meta = STATUS_META[message.status] || STATUS_META.read;

                                    return (
                                        <li key={message.id}>
                                            <button
                                                type="button"
                                                className={`${selectedId === message.id ? "is-active" : ""} ${message.status === "new" ? "is-unread" : ""}`}
                                                onClick={() => open(message)}
                                            >
                                                <span className="adm-avatar">
                                                    {message.name.charAt(0).toUpperCase()}
                                                </span>
                                                <span className="adm-inbox-text">
                                                    <span className="adm-inbox-top">
                                                        <strong>{message.name}</strong>
                                                        <time>{formatDate(message.created_at, lang)}</time>
                                                    </span>
                                                    <span className="adm-inbox-subject">
                                                        {message.subject || t({ en: "(No subject)", rw: "(Nta mpamvu)" })}
                                                    </span>
                                                    <span className="adm-inbox-preview">{message.message}</span>
                                                </span>
                                                <span className={`adm-dot text-${meta.tone}`} title={t(meta)}>
                                                    <i className={`bi ${meta.icon}`} />
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="adm-inbox-reader">
                                {selected ? (
                                    <>
                                        <div className="adm-reader-head">
                                            <div>
                                                <h4>{selected.subject || t({ en: "(No subject)", rw: "(Nta mpamvu)" })}</h4>
                                                <div className="adm-reader-from">
                                                    <strong>{selected.name}</strong>
                                                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                                                    {selected.phone && (
                                                        <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                                                    )}
                                                </div>
                                                <small className="text-muted">{formatDate(selected.created_at, lang)}</small>
                                            </div>

                                            <span className={`badge rounded-pill bg-${STATUS_META[selected.status]?.tone || "secondary"} bg-opacity-10 text-${STATUS_META[selected.status]?.tone || "secondary"}`}>
                                                {t(STATUS_META[selected.status] || STATUS_META.read)}
                                            </span>
                                        </div>

                                        <div className="adm-reader-body">{selected.message}</div>

                                        <div className="adm-reader-actions">
                                            <a
                                                className="btn btn-primary"
                                                href={replyLink(selected)}
                                                onClick={() => setStatus(selected, "replied")}
                                            >
                                                <i className="bi bi-reply me-2" />
                                                {t({ en: "Reply by email", rw: "Subiza kuri imeyili" })}
                                            </a>

                                            {selected.status !== "archived" ? (
                                                <button type="button" className="btn btn-light" onClick={() => setStatus(selected, "archived")}>
                                                    <i className="bi bi-archive me-2" />
                                                    {t({ en: "Archive", rw: "Bika" })}
                                                </button>
                                            ) : (
                                                <button type="button" className="btn btn-light" onClick={() => setStatus(selected, "read")}>
                                                    <i className="bi bi-box-arrow-up me-2" />
                                                    {t({ en: "Restore", rw: "Garura" })}
                                                </button>
                                            )}

                                            <button type="button" className="btn btn-light" onClick={() => setStatus(selected, "new")}>
                                                <i className="bi bi-envelope me-2" />
                                                {t({ en: "Mark as unread", rw: "Garura nk’ibitarasomwe" })}
                                            </button>

                                            <button type="button" className="btn btn-light text-danger ms-auto" onClick={() => setConfirmDelete(selected)}>
                                                <i className="bi bi-trash me-2" />
                                                {t("delete")}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="adm-empty">
                                        <i className="bi bi-envelope-open" />
                                        <p>{t({ en: "Select a message to read it.", rw: "Hitamo ubutumwa ushaka gusoma." })}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {messages.last_page > 1 && (
                        <div className="adm-pagination">
                            <small>
                                {t("showing", { from: messages.from, to: messages.to, total: messages.total })}
                            </small>
                            <div>
                                {messages.links.map((link, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        className={link.active ? "is-active" : ""}
                                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true, preserveState: true })}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {confirmDelete && (
                <div className="adm-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setConfirmDelete(null)}>
                    <div className="adm-modal adm-modal-sm" role="dialog" aria-modal="true">
                        <div className="adm-modal-icon is-danger">
                            <i className="bi bi-trash" />
                        </div>
                        <h5>{t({ en: "Delete this message?", rw: "Gusiba ubu butumwa?" })}</h5>
                        <p>
                            <strong>{confirmDelete.name}</strong> — {confirmDelete.subject || confirmDelete.email}
                            <br />
                            {t("cannotUndo")}
                        </p>
                        <div className="adm-modal-actions">
                            <button type="button" className="btn btn-light" onClick={() => setConfirmDelete(null)}>
                                {t("cancel")}
                            </button>
                            <button type="button" className="btn btn-danger" onClick={destroy}>
                                {t("delete")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
