import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ stats, recentDocuments }) {
    const [chatOpen, setChatOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [processing, setProcessing] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            message:
                "Hello! I’m your portal analytics assistant. I can help you understand documents, readers, languages, and portal activity.",
        },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, processing]);

    const formatNumber = (value) => {
        return new Intl.NumberFormat().format(value ?? 0);
    };

    const askAnalytics = async () => {
        if (!analyticsQuestion.trim()) return;

        setAnalyticsLoading(true);
        setAnalyticsError(null);

        try {
            const response = await fetch(route("admin.analytics.chat"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    question: analyticsQuestion,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();

                console.error("Analytics API error:", {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText,
                });

                throw new Error(
                    `Analytics request failed (${response.status})`,
                );
            }

            const data = await response.json();

            setAnalyticsMessages((messages) => [
                ...messages,
                {
                    role: "user",
                    content: analyticsQuestion,
                },
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);

            setAnalyticsQuestion("");
        } catch (error) {
            console.error("Analytics request failed:", error);
            setAnalyticsError(error.message);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        askAnalytics();
    };

    const quickQuestions = [
        "Give me a portal overview",
        "Analyze our documents",
        "Analyze our reader accounts",
        "Which languages have the most resources?",
    ];

    return (
        <>
            <Head title="Dashboard" />

            <AdminLayout title="Dashboard">
                <div className="ngo-dashboard">
                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}
                    <section className="dashboard-header">
                        <div>
                            <div className="eyebrow">ORGANIZATION OVERVIEW</div>

                            <h1>Dashboard</h1>

                            <p>
                                Monitor your document portal, resources, readers
                                and organizational activity from one place.
                            </p>
                        </div>

                        <div className="header-actions">
                            <button
                                type="button"
                                className="analytics-button"
                                onClick={() => setChatOpen(true)}
                            >
                                <span className="button-icon">✦</span>
                                Ask Analytics
                            </button>

                            <Link
                                href={route("admin.documents.create")}
                                className="upload-button"
                            >
                                <span>＋</span>
                                Upload Document
                            </Link>
                        </div>
                    </section>

                    {/* =====================================================
                        KPI CARDS
                    ====================================================== */}
                    <section className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon documents-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="8" y1="13" x2="16" y2="13" />
                                        <line x1="8" y1="17" x2="16" y2="17" />
                                    </svg>
                                </div>

                                <span className="stat-label">RESOURCES</span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.documents)}
                            </div>

                            <div className="stat-description">
                                Total documents available in the portal
                            </div>

                            <Link
                                href={route("admin.documents.index")}
                                className="stat-link"
                            >
                                Manage documents
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon readers-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>

                                <span className="stat-label">READERS</span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.users)}
                            </div>

                            <div className="stat-description">
                                Registered reader accounts
                            </div>

                            <Link
                                href={route("admin.users.index")}
                                className="stat-link"
                            >
                                Manage readers
                                <span>→</span>
                            </Link>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon admin-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M12 2l3 5 5.5 1.5-3.5 4.5.5 5.5L12 16l-5.5 2.5.5-5.5L3.5 8.5 9 7z" />
                                    </svg>
                                </div>

                                <span className="stat-label">
                                    ADMINISTRATION
                                </span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.admins)}
                            </div>

                            <div className="stat-description">
                                Active administrator accounts
                            </div>

                            <Link
                                href={route("admin.users.index")}
                                className="stat-link"
                            >
                                View accounts
                                <span>→</span>
                            </Link>
                        </div>
                    </section>

                    {/* =====================================================
                        ANALYTICS BANNER
                    ====================================================== */}
                    <section className="analytics-banner">
                        <div className="analytics-banner-icon">✦</div>

                        <div className="analytics-banner-content">
                            <span>PORTAL INTELLIGENCE</span>

                            <h2>Ask questions about your organization</h2>

                            <p>
                                Use the analytics assistant to explore your
                                documents, reader accounts, languages and portal
                                activity.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setChatOpen(true)}
                            className="analytics-banner-button"
                        >
                            Start analysis
                            <span>→</span>
                        </button>
                    </section>

                    {/* =====================================================
                        MAIN CONTENT
                    ====================================================== */}
                    <div className="dashboard-columns">
                        {/* QUICK ACCESS */}
                        <section className="content-card quick-access-card">
                            <div className="card-heading">
                                <div>
                                    <span className="card-eyebrow">
                                        SHORTCUTS
                                    </span>

                                    <h2>Quick Access</h2>
                                </div>
                            </div>

                            <div className="quick-actions">
                                <Link
                                    href={route("admin.documents.create")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">＋</div>

                                    <div>
                                        <strong>Add Document</strong>

                                        <span>Upload a new resource</span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.documents.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">▤</div>

                                    <div>
                                        <strong>Manage Documents</strong>

                                        <span>Browse portal resources</span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.users.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">♙</div>

                                    <div>
                                        <strong>Reader Accounts</strong>

                                        <span>Manage registered readers</span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.activity.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">◷</div>

                                    <div>
                                        <strong>Activity Log</strong>

                                        <span>Review portal activity</span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>
                            </div>
                        </section>

                        {/* RECENT DOCUMENTS */}
                        <section className="content-card recent-card">
                            <div className="card-heading">
                                <div>
                                    <span className="card-eyebrow">
                                        LATEST RESOURCES
                                    </span>

                                    <h2>Recent Documents</h2>
                                </div>

                                <Link
                                    href={route("admin.documents.index")}
                                    className="view-all"
                                >
                                    View all
                                    <span>→</span>
                                </Link>
                            </div>

                            {recentDocuments?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">▤</div>

                                    <h3>No documents uploaded yet</h3>

                                    <p>
                                        Upload your first resource to start
                                        building the document library.
                                    </p>

                                    <Link
                                        href={route("admin.documents.create")}
                                        className="empty-button"
                                    >
                                        Upload Document
                                    </Link>
                                </div>
                            ) : (
                                <div className="documents-list">
                                    {recentDocuments.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={route(
                                                "admin.documents.edit",
                                                doc.id,
                                            )}
                                            className="document-row"
                                        >
                                            <div className="document-icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                >
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>

                                            <div className="document-info">
                                                <strong>{doc.title}</strong>

                                                <div className="document-meta">
                                                    {doc.versions?.length >
                                                    0 ? (
                                                        doc.versions.map(
                                                            (version) => (
                                                                <span
                                                                    key={
                                                                        version.id
                                                                    }
                                                                    className="language-tag"
                                                                >
                                                                    {
                                                                        version.language_label
                                                                    }
                                                                </span>
                                                            ),
                                                        )
                                                    ) : (
                                                        <span>
                                                            No language versions
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="document-date">
                                                {doc.created_at_human}
                                            </div>

                                            <div className="document-arrow">
                                                →
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* =====================================================
                        ANALYTICS CHAT
                    ====================================================== */}
                    {chatOpen && (
                        <>
                            <div
                                className="chat-overlay"
                                onClick={() => setChatOpen(false)}
                            />

                            <aside className="analytics-chat">
                                <div className="chat-header">
                                    <div className="chat-header-left">
                                        <div className="chat-avatar">✦</div>

                                        <div>
                                            <strong>Analytics Assistant</strong>

                                            <span>Portal intelligence</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="chat-close"
                                        onClick={() => setChatOpen(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="chat-body">
                                    <div className="chat-introduction">
                                        <div className="chat-welcome-icon">
                                            ✦
                                        </div>

                                        <h3>How can I help?</h3>

                                        <p>
                                            Ask me questions about your document
                                            portal and organization.
                                        </p>
                                    </div>

                                    <div className="chat-messages">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`chat-message ${
                                                    message.role === "user"
                                                        ? "user-message"
                                                        : "assistant-message"
                                                }`}
                                            >
                                                {message.role ===
                                                    "assistant" && (
                                                    <div className="message-avatar">
                                                        ✦
                                                    </div>
                                                )}

                                                <div className="message-bubble">
                                                    {message.message}
                                                </div>
                                            </div>
                                        ))}

                                        {processing && (
                                            <div className="chat-message assistant-message">
                                                <div className="message-avatar">
                                                    ✦
                                                </div>

                                                <div className="message-bubble typing">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>

                                    <div className="suggestions">
                                        <span>Try asking</span>

                                        {quickQuestions.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() =>
                                                    askAnalytics(item)
                                                }
                                                disabled={processing}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="chat-input-area"
                                >
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                        placeholder="Ask about your portal..."
                                        disabled={processing}
                                    />

                                    <button
                                        type="submit"
                                        disabled={
                                            processing || !question.trim()
                                        }
                                    >
                                        ↑
                                    </button>
                                </form>
                            </aside>
                        </>
                    )}
                </div>

                {/* =========================================================
                    PAGE STYLES
                ========================================================== */}
                <style>{`
                    .ngo-dashboard {
                        --ngo-blue: #5D89C8;
                        --ngo-blue-dark: #416FAE;
                        --ngo-blue-soft: #EEF4FC;
                        --ngo-blue-pale: #F7FAFE;

                        --ngo-ink: #17202A;
                        --ngo-muted: #718096;
                        --ngo-border: #E5EAF0;
                        --ngo-bg: #F6F8FB;
                        --ngo-white: #FFFFFF;

                        min-height: 100%;
                        color: var(--ngo-ink);
                    }

                    /* ===============================
                       HEADER
                    =============================== */

                    .dashboard-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        gap: 2rem;
                        margin-bottom: 2rem;
                    }

                    .eyebrow,
                    .card-eyebrow {
                        font-size: .68rem;
                        font-weight: 800;
                        letter-spacing: .14em;
                        color: var(--ngo-blue);
                        margin-bottom: .45rem;
                    }

                    .dashboard-header h1 {
                        margin: 0;
                        font-size: 2rem;
                        line-height: 1.15;
                        font-weight: 750;
                        letter-spacing: -.035em;
                    }

                    .dashboard-header p {
                        margin: .65rem 0 0;
                        max-width: 680px;
                        color: var(--ngo-muted);
                        font-size: .93rem;
                        line-height: 1.6;
                    }

                    .header-actions {
                        display: flex;
                        align-items: center;
                        gap: .7rem;
                        flex-shrink: 0;
                    }

                    .analytics-button,
                    .upload-button {
                        height: 44px;
                        padding: 0 1rem;
                        border-radius: 9px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: .5rem;
                        font-size: .82rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all .2s ease;
                        text-decoration: none;
                    }

                    .analytics-button {
                        color: var(--ngo-blue-dark);
                        background: var(--ngo-blue-soft);
                        border: 1px solid #D8E5F7;
                    }

                    .analytics-button:hover {
                        background: #E5EEF9;
                        transform: translateY(-1px);
                    }

                    .upload-button {
                        color: white;
                        background: var(--ngo-blue);
                        border: 1px solid var(--ngo-blue);
                        box-shadow: 0 5px 14px rgba(93, 137, 200, .18);
                    }

                    .upload-button:hover {
                        background: var(--ngo-blue-dark);
                        border-color: var(--ngo-blue-dark);
                        transform: translateY(-1px);
                        color: white;
                    }

                    .button-icon {
                        font-size: 1rem;
                    }

                    /* ===============================
                       STATISTICS
                    =============================== */

                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }

                    .stat-card {
                        background: var(--ngo-white);
                        border: 1px solid var(--ngo-border);
                        border-radius: 13px;
                        padding: 1.25rem;
                        box-shadow: 0 2px 8px rgba(24, 39, 75, .025);
                        transition: all .2s ease;
                    }

                    .stat-card:hover {
                        border-color: #D6E0ED;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 22px rgba(24, 39, 75, .06);
                    }

                    .stat-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: .85rem;
                    }

                    .stat-icon {
                        width: 38px;
                        height: 38px;
                        border-radius: 9px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .stat-icon svg {
                        width: 20px;
                        height: 20px;
                    }

                    .documents-icon {
                        color: var(--ngo-blue);
                        background: var(--ngo-blue-soft);
                    }

                    .readers-icon {
                        color: #5D7F72;
                        background: #EDF5F1;
                    }

                    .admin-icon {
                        color: #866E3D;
                        background: #F7F2E8;
                    }

                    .stat-label {
                        color: #9AA5B1;
                        font-size: .63rem;
                        font-weight: 800;
                        letter-spacing: .12em;
                    }

                    .stat-value {
                        font-size: 2rem;
                        line-height: 1;
                        font-weight: 760;
                        letter-spacing: -.04em;
                        margin-bottom: .55rem;
                    }

                    .stat-description {
                        color: var(--ngo-muted);
                        font-size: .78rem;
                        line-height: 1.45;
                        min-height: 34px;
                    }

                    .stat-link {
                        margin-top: .95rem;
                        padding-top: .85rem;
                        border-top: 1px solid #EEF1F5;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: var(--ngo-blue-dark);
                        text-decoration: none;
                        font-size: .75rem;
                        font-weight: 700;
                    }

                    .stat-link:hover {
                        color: var(--ngo-blue);
                    }

                    /* ===============================
                       ANALYTICS BANNER
                    =============================== */

                    .analytics-banner {
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        background: linear-gradient(
                            100deg,
                            #F2F7FD 0%,
                            #F9FBFE 100%
                        );
                        border: 1px solid #DDE8F5;
                        border-radius: 13px;
                        padding: 1.1rem 1.2rem;
                        margin-bottom: 1rem;
                    }

                    .analytics-banner::after {
                        content: "";
                        position: absolute;
                        width: 170px;
                        height: 170px;
                        border-radius: 50%;
                        border: 30px solid rgba(93, 137, 200, .04);
                        right: -70px;
                        top: -100px;
                    }

                    .analytics-banner-icon {
                        width: 42px;
                        height: 42px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        background: var(--ngo-blue);
                        font-size: 1.15rem;
                    }

                    .analytics-banner-content {
                        flex: 1;
                        min-width: 0;
                    }

                    .analytics-banner-content span {
                        color: var(--ngo-blue);
                        font-size: .6rem;
                        font-weight: 800;
                        letter-spacing: .12em;
                    }

                    .analytics-banner-content h2 {
                        margin: .2rem 0 .2rem;
                        font-size: .95rem;
                        font-weight: 750;
                    }

                    .analytics-banner-content p {
                        margin: 0;
                        color: var(--ngo-muted);
                        font-size: .75rem;
                    }

                    .analytics-banner-button {
                        position: relative;
                        z-index: 1;
                        border: 0;
                        background: transparent;
                        color: var(--ngo-blue-dark);
                        font-size: .75rem;
                        font-weight: 750;
                        display: flex;
                        align-items: center;
                        gap: .45rem;
                        cursor: pointer;
                        white-space: nowrap;
                    }

                    .analytics-banner-button:hover {
                        color: var(--ngo-blue);
                    }

                    /* ===============================
                       CONTENT CARDS
                    =============================== */

                    .dashboard-columns {
                        display: grid;
                        grid-template-columns: 330px minmax(0, 1fr);
                        gap: 1rem;
                    }

                    .content-card {
                        background: var(--ngo-white);
                        border: 1px solid var(--ngo-border);
                        border-radius: 13px;
                        overflow: hidden;
                    }

                    .card-heading {
                        padding: 1.2rem 1.25rem;
                        border-bottom: 1px solid #EEF1F5;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 1rem;
                    }

                    .card-heading h2 {
                        margin: 0;
                        font-size: .98rem;
                        font-weight: 750;
                        letter-spacing: -.015em;
                    }

                    .view-all {
                        color: var(--ngo-blue-dark);
                        font-size: .72rem;
                        font-weight: 700;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: .35rem;
                    }

                    .view-all:hover {
                        color: var(--ngo-blue);
                    }

                    /* ===============================
                       QUICK ACCESS
                    =============================== */

                    .quick-actions {
                        padding: .5rem;
                    }

                    .quick-action {
                        display: flex;
                        align-items: center;
                        gap: .75rem;
                        padding: .85rem .7rem;
                        border-radius: 9px;
                        text-decoration: none;
                        color: var(--ngo-ink);
                        transition: background .18s ease;
                    }

                    .quick-action:hover {
                        background: var(--ngo-blue-pale);
                    }

                    .quick-icon {
                        width: 34px;
                        height: 34px;
                        flex-shrink: 0;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #F2F5F8;
                        color: var(--ngo-blue-dark);
                        font-size: 1rem;
                        font-weight: 700;
                    }

                    .quick-action strong {
                        display: block;
                        font-size: .78rem;
                        font-weight: 750;
                        margin-bottom: .2rem;
                    }

                    .quick-action span {
                        color: var(--ngo-muted);
                        font-size: .67rem;
                    }

                    .quick-arrow {
                        margin-left: auto;
                        color: #AAB3BD !important;
                        font-size: .9rem !important;
                    }

                    /* ===============================
                       DOCUMENTS
                    =============================== */

                    .documents-list {
                        padding: .4rem 0;
                    }

                    .document-row {
                        display: flex;
                        align-items: center;
                        gap: .8rem;
                        padding: .9rem 1.25rem;
                        border-bottom: 1px solid #F0F2F5;
                        text-decoration: none;
                        color: var(--ngo-ink);
                        transition: background .18s ease;
                    }

                    .document-row:last-child {
                        border-bottom: 0;
                    }

                    .document-row:hover {
                        background: #FAFCFE;
                    }

                    .document-icon {
                        width: 37px;
                        height: 37px;
                        border-radius: 8px;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .document-icon svg {
                        width: 18px;
                        height: 18px;
                    }

                    .document-info {
                        flex: 1;
                        min-width: 0;
                    }

                    .document-info strong {
                        display: block;
                        font-size: .78rem;
                        font-weight: 700;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .document-meta {
                        display: flex;
                        flex-wrap: wrap;
                        gap: .3rem;
                        margin-top: .35rem;
                    }

                    .language-tag {
                        display: inline-flex;
                        align-items: center;
                        padding: .2rem .42rem;
                        background: #F1F4F7;
                        color: #687481;
                        border-radius: 4px;
                        font-size: .58rem;
                        font-weight: 700;
                    }

                    .document-date {
                        color: #9AA5B1;
                        font-size: .65rem;
                        white-space: nowrap;
                    }

                    .document-arrow {
                        color: #B0BAC4;
                        font-size: .9rem;
                    }

                    /* ===============================
                       EMPTY STATE
                    =============================== */

                    .empty-state {
                        text-align: center;
                        padding: 3rem 1.5rem;
                    }

                    .empty-icon {
                        width: 52px;
                        height: 52px;
                        margin: 0 auto .9rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        border-radius: 12px;
                        font-size: 1.2rem;
                    }

                    .empty-state h3 {
                        margin: 0 0 .35rem;
                        font-size: .9rem;
                    }

                    .empty-state p {
                        max-width: 350px;
                        margin: 0 auto 1rem;
                        color: var(--ngo-muted);
                        font-size: .75rem;
                        line-height: 1.5;
                    }

                    .empty-button {
                        display: inline-flex;
                        padding: .65rem .9rem;
                        border-radius: 7px;
                        background: var(--ngo-blue);
                        color: white;
                        text-decoration: none;
                        font-size: .7rem;
                        font-weight: 700;
                    }

                    /* ===============================
                       CHAT OVERLAY
                    =============================== */

                    .chat-overlay {
                        position: fixed;
                        inset: 0;
                        z-index: 999;
                        background: rgba(15, 23, 42, .28);
                        backdrop-filter: blur(2px);
                    }

                    .analytics-chat {
                        position: fixed;
                        z-index: 1000;
                        right: 1.25rem;
                        bottom: 1.25rem;
                        width: min(430px, calc(100vw - 2rem));
                        height: min(690px, calc(100vh - 2rem));
                        background: white;
                        border: 1px solid #DDE3EA;
                        border-radius: 16px;
                        box-shadow: 0 24px 70px rgba(15, 23, 42, .2);
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }

                    .chat-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: .95rem 1rem;
                        background: #fff;
                        border-bottom: 1px solid #EDF0F3;
                    }

                    .chat-header-left {
                        display: flex;
                        align-items: center;
                        gap: .65rem;
                    }

                    .chat-avatar {
                        width: 37px;
                        height: 37px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        background: var(--ngo-blue);
                        font-size: 1rem;
                    }

                    .chat-header strong {
                        display: block;
                        font-size: .8rem;
                    }

                    .chat-header span {
                        display: block;
                        color: #8A96A3;
                        font-size: .61rem;
                        margin-top: .15rem;
                    }

                    .chat-close {
                        width: 30px;
                        height: 30px;
                        border: 0;
                        border-radius: 7px;
                        background: #F3F5F7;
                        color: #6F7B87;
                        font-size: 1.25rem;
                        cursor: pointer;
                    }

                    .chat-close:hover {
                        background: #EAEDEF;
                    }

                    .chat-body {
                        flex: 1;
                        overflow-y: auto;
                        padding: 1rem;
                        background: #FAFBFC;
                    }

                    .chat-introduction {
                        text-align: center;
                        padding: .7rem 1rem 1.15rem;
                    }

                    .chat-welcome-icon {
                        width: 45px;
                        height: 45px;
                        margin: 0 auto .65rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--ngo-blue);
                        background: var(--ngo-blue-soft);
                    }

                    .chat-introduction h3 {
                        margin: 0 0 .3rem;
                        font-size: .9rem;
                    }

                    .chat-introduction p {
                        margin: 0 auto;
                        max-width: 310px;
                        color: #788592;
                        font-size: .7rem;
                        line-height: 1.5;
                    }

                    .chat-messages {
                        display: flex;
                        flex-direction: column;
                        gap: .8rem;
                    }

                    .chat-message {
                        display: flex;
                        gap: .45rem;
                        align-items: flex-end;
                    }

                    .user-message {
                        justify-content: flex-end;
                    }

                    .message-avatar {
                        width: 25px;
                        height: 25px;
                        flex-shrink: 0;
                        border-radius: 7px;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: .65rem;
                    }

                    .message-bubble {
                        max-width: 82%;
                        padding: .65rem .75rem;
                        border-radius: 10px 10px 10px 3px;
                        background: white;
                        border: 1px solid #E6EAEE;
                        color: #4C5865;
                        font-size: .72rem;
                        line-height: 1.5;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, .02);
                    }

                    .user-message .message-bubble {
                        color: white;
                        background: var(--ngo-blue);
                        border-color: var(--ngo-blue);
                        border-radius: 10px 10px 3px 10px;
                    }

                    .typing {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        min-width: 52px;
                    }

                    .typing span {
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background: #9AA7B4;
                        animation: typing 1.1s infinite ease-in-out;
                    }

                    .typing span:nth-child(2) {
                        animation-delay: .15s;
                    }

                    .typing span:nth-child(3) {
                        animation-delay: .3s;
                    }

                    @keyframes typing {
                        0%, 60%, 100% {
                            transform: translateY(0);
                            opacity: .45;
                        }

                        30% {
                            transform: translateY(-3px);
                            opacity: 1;
                        }
                    }

                    .suggestions {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: .4rem;
                        margin-top: 1.1rem;
                    }

                    .suggestions > span {
                        color: #929DA8;
                        font-size: .61rem;
                        font-weight: 700;
                        margin-bottom: .1rem;
                    }

                    .suggestions button {
                        border: 1px solid #DDE4EB;
                        background: white;
                        color: #647180;
                        border-radius: 7px;
                        padding: .48rem .65rem;
                        font-size: .64rem;
                        cursor: pointer;
                        text-align: left;
                    }

                    .suggestions button:hover:not(:disabled) {
                        color: var(--ngo-blue-dark);
                        border-color: #BDD1EA;
                        background: var(--ngo-blue-pale);
                    }

                    .suggestions button:disabled {
                        opacity: .55;
                        cursor: not-allowed;
                    }

                    .chat-input-area {
                        display: flex;
                        gap: .5rem;
                        padding: .8rem;
                        background: white;
                        border-top: 1px solid #E9EDF1;
                    }

                    .chat-input-area input {
                        flex: 1;
                        min-width: 0;
                        height: 40px;
                        padding: 0 .75rem;
                        border: 1px solid #DCE2E8;
                        border-radius: 8px;
                        outline: none;
                        font-size: .72rem;
                        color: #26313C;
                        background: #FAFBFC;
                    }

                    .chat-input-area input:focus {
                        border-color: #9CB8DD;
                        background: white;
                        box-shadow: 0 0 0 3px rgba(93, 137, 200, .08);
                    }

                    .chat-input-area button {
                        width: 40px;
                        height: 40px;
                        flex-shrink: 0;
                        border: 0;
                        border-radius: 8px;
                        background: var(--ngo-blue);
                        color: white;
                        font-size: 1rem;
                        cursor: pointer;
                    }

                    .chat-input-area button:hover:not(:disabled) {
                        background: var(--ngo-blue-dark);
                    }

                    .chat-input-area button:disabled {
                        opacity: .45;
                        cursor: not-allowed;
                    }

                    /* ===============================
                       TABLET
                    =============================== */

                    @media (max-width: 1100px) {
                        .dashboard-columns {
                            grid-template-columns: 1fr;
                        }

                        .quick-actions {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 850px) {
                        .dashboard-header {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .header-actions {
                            width: 100%;
                        }

                        .analytics-button,
                        .upload-button {
                            flex: 1;
                        }

                        .stats-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    /* ===============================
                       MOBILE
                    =============================== */

                    @media (max-width: 600px) {
                        .dashboard-header {
                            margin-bottom: 1.25rem;
                        }

                        .dashboard-header h1 {
                            font-size: 1.55rem;
                        }

                        .dashboard-header p {
                            font-size: .78rem;
                        }

                        .header-actions {
                            flex-direction: column;
                        }

                        .analytics-button,
                        .upload-button {
                            width: 100%;
                        }

                        .analytics-banner {
                            align-items: flex-start;
                            flex-wrap: wrap;
                        }

                        .analytics-banner-content {
                            flex: 1;
                            min-width: calc(100% - 60px);
                        }

                        .analytics-banner-content p {
                            line-height: 1.45;
                        }

                        .analytics-banner-button {
                            margin-left: 54px;
                        }

                        .quick-actions {
                            display: block;
                        }

                        .document-row {
                            padding: .8rem .9rem;
                        }

                        .document-date {
                            display: none;
                        }

                        .document-arrow {
                            display: none;
                        }

                        .analytics-chat {
                            right: .5rem;
                            bottom: .5rem;
                            width: calc(100vw - 1rem);
                            height: calc(100vh - 1rem);
                            border-radius: 14px;
                        }
                    }
                `}</style>
            </AdminLayout>
        </>
    );
}
