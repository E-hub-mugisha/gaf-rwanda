import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    FileText,
    Languages,
    Maximize2,
    ShieldCheck,
} from 'lucide-react';

export default function Show({
    document: doc,
    language,
    availableLanguages = [],
}) {
    const activeLanguage = availableLanguages.find(
        (item) => item.code === language
    );

    const formatDate = (date) => {
        if (!date) return null;

        try {
            return new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return null;
        }
    };

    const createdDate = formatDate(doc?.created_at);

    const openFullscreen = () => {
        const iframe = window.document.getElementById('document-viewer');

        if (iframe?.requestFullscreen) {
            iframe.requestFullscreen();
        }
    };

    return (
        <AppLayout title={doc?.title || 'Document'}>
            <div className="document-page">

                {/* =========================================
                    TOP NAVIGATION
                ========================================== */}
                <div className="page-navigation">
                    <Link
                        href={route('documents.index')}
                        className="back-link"
                    >
                        <ArrowLeft size={17} />
                        <span>All documents</span>
                    </Link>

                    <div className="secure-reading">
                        <ShieldCheck size={15} />
                        Secure document viewer
                    </div>
                </div>

                {/* =========================================
                    DOCUMENT HEADER
                ========================================== */}
                <section className="document-header">

                    <div className="header-main">

                        <div className="document-icon">
                            <FileText
                                size={28}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div className="document-heading">

                            <div className="eyebrow">
                                <span className="published-dot"></span>
                                Published document
                            </div>

                            <h1>
                                {doc?.title}
                            </h1>

                            {doc?.description && (
                                <p className="document-description">
                                    {doc.description}
                                </p>
                            )}

                            <div className="document-meta">

                                {activeLanguage && (
                                    <div className="meta-item">
                                        <Languages size={15} />

                                        <span>
                                            {activeLanguage.label}
                                        </span>
                                    </div>
                                )}

                                {createdDate && (
                                    <div className="meta-item">
                                        <CalendarDays size={15} />

                                        <span>
                                            {createdDate}
                                        </span>
                                    </div>
                                )}

                                <div className="meta-item">
                                    <BookOpen size={15} />

                                    <span>
                                        Online reading
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        LANGUAGE SELECTOR
                    ========================================== */}
                    {availableLanguages.length > 0 && (
                        <div className="language-section">

                            <div className="language-label">
                                <Languages size={16} />

                                <span>
                                    Available languages
                                </span>
                            </div>

                            <div className="language-list">

                                {availableLanguages.map(
                                    ({ code, label }) => {
                                        const isActive =
                                            language === code;

                                        return (
                                            <Link
                                                key={code}
                                                href={`${route(
                                                    'documents.show',
                                                    doc.id
                                                )}?lang=${code}`}
                                                className={`language-button ${
                                                    isActive
                                                        ? 'active'
                                                        : ''
                                                }`}
                                            >
                                                {isActive && (
                                                    <CheckCircle2
                                                        size={15}
                                                    />
                                                )}

                                                <span>
                                                    {label}
                                                </span>
                                            </Link>
                                        );
                                    }
                                )}

                            </div>
                        </div>
                    )}

                </section>

                {/* =========================================
                    READER TOOLBAR
                ========================================== */}
                <div className="reader-toolbar">

                    <div className="reader-info">

                        <div className="reader-status">
                            <span className="status-dot"></span>

                            <span>
                                Reading
                            </span>
                        </div>

                        <span className="toolbar-divider"></span>

                        <span className="current-language">
                            {activeLanguage?.label ||
                                language ||
                                'Document'}
                        </span>

                    </div>

                    <button
                        type="button"
                        className="fullscreen-button"
                        onClick={openFullscreen}
                        title="Open viewer fullscreen"
                    >
                        <Maximize2 size={16} />

                        <span>
                            Fullscreen
                        </span>
                    </button>

                </div>

                {/* =========================================
                    DOCUMENT VIEWER
                ========================================== */}
                <section className="viewer-card">

                    <div className="viewer-top">

                        <div className="viewer-title">

                            <FileText size={17} />

                            <span>
                                {doc?.title}
                            </span>

                        </div>

                        <div className="viewer-language">
                            {activeLanguage?.label ||
                                language}
                        </div>

                    </div>

                    <div className="viewer-container">

                        <iframe
                            id="document-viewer"
                            src={route(
                                'documents.stream',
                                [doc.id, language]
                            )}
                            title={doc?.title || 'Document viewer'}
                            className="document-iframe"
                        />

                    </div>

                </section>

                {/* =========================================
                    FOOTER INFORMATION
                ========================================== */}
                <div className="reader-footer">

                    <div className="footer-note">

                        <ShieldCheck size={17} />

                        <div>
                            <strong>
                                You're viewing an official document
                            </strong>

                            <span>
                                This document is provided through
                                the Document Portal.
                            </span>
                        </div>

                    </div>

                    <Link
                        href={route('documents.index')}
                        className="footer-back"
                    >
                        <ArrowLeft size={15} />

                        <span>
                            Back to documents
                        </span>
                    </Link>

                </div>

            </div>

            <style>{`

                /* =========================================
                   DOCUMENT PAGE
                ========================================== */

                .document-page {
                    width: 100%;
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 8px 0 40px;
                }


                /* =========================================
                   TOP NAVIGATION
                ========================================== */

                .page-navigation {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 18px;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    color: #5D89C8;
                    text-decoration: none;

                    font-size: 14px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .back-link:hover {
                    gap: 11px;
                }

                .secure-reading {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    padding: 7px 11px;

                    border-radius: 999px;

                    background: #f3f7fc;
                    border: 1px solid #e2ebf6;

                    color: #607086;

                    font-size: 12px;
                    font-weight: 600;
                }

                .secure-reading svg {
                    color: #5D89C8;
                }


                /* =========================================
                   DOCUMENT HEADER
                ========================================== */

                .document-header {
                    background: #ffffff;

                    border: 1px solid #e6ebf2;
                    border-radius: 20px;

                    padding: 26px;
                    margin-bottom: 16px;

                    box-shadow:
                        0 8px 30px rgba(25, 45, 70, .055);
                }

                .header-main {
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                }

                .document-icon {
                    width: 58px;
                    height: 58px;

                    flex: 0 0 58px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 15px;

                    color: #5D89C8;

                    background:
                        linear-gradient(
                            145deg,
                            #edf4fc,
                            #f7faff
                        );

                    border: 1px solid #dce8f6;
                }

                .document-heading {
                    min-width: 0;
                    flex: 1;
                }

                .eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 7px;

                    margin-bottom: 7px;

                    color: #6d7c90;

                    text-transform: uppercase;
                    letter-spacing: .07em;

                    font-size: 10px;
                    font-weight: 800;
                }

                .published-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #5D89C8;

                    box-shadow:
                        0 0 0 4px #eaf2fb;
                }

                .document-heading h1 {
                    margin: 0;

                    color: #152238;

                    font-size: clamp(
                        1.35rem,
                        2vw,
                        1.9rem
                    );

                    line-height: 1.25;

                    font-weight: 800;

                    letter-spacing: -.025em;

                    overflow-wrap: anywhere;
                }

                .document-description {
                    max-width: 850px;

                    margin: 9px 0 0;

                    color: #69788c;

                    font-size: 14px;
                    line-height: 1.7;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    gap: 16px;

                    margin-top: 16px;
                }

                .meta-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    color: #738196;

                    font-size: 12px;
                    font-weight: 600;
                }

                .meta-item svg {
                    color: #5D89C8;
                }


                /* =========================================
                   LANGUAGE SELECTOR
                ========================================== */

                .language-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;
                    flex-wrap: wrap;

                    margin-top: 25px;
                    padding-top: 20px;

                    border-top: 1px solid #edf0f4;
                }

                .language-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    color: #35445a;

                    font-size: 13px;
                    font-weight: 750;
                }

                .language-label svg {
                    color: #5D89C8;
                }

                .language-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .language-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    gap: 6px;

                    min-height: 36px;

                    padding: 0 13px;

                    border-radius: 9px;

                    background: #f5f7fa;

                    border: 1px solid #e4e9ef;

                    color: #536175;

                    text-decoration: none;

                    font-size: 12px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .language-button:hover {
                    border-color: #b9cde5;

                    background: #f1f6fc;

                    color: #5D89C8;
                }

                .language-button.active {
                    color: #ffffff;

                    background: #5D89C8;

                    border-color: #5D89C8;

                    box-shadow:
                        0 5px 15px
                        rgba(93, 137, 200, .22);
                }


                /* =========================================
                   READER TOOLBAR
                ========================================== */

                .reader-toolbar {
                    min-height: 52px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 15px;

                    padding: 9px 14px;

                    margin-bottom: 10px;

                    background: #ffffff;

                    border: 1px solid #e6ebf2;

                    border-radius: 13px;
                }

                .reader-info {
                    display: flex;
                    align-items: center;

                    gap: 12px;

                    min-width: 0;
                }

                .reader-status {
                    display: inline-flex;
                    align-items: center;

                    gap: 7px;

                    color: #3f4d61;

                    font-size: 12px;
                    font-weight: 750;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #5D89C8;

                    box-shadow:
                        0 0 0 4px #edf4fc;
                }

                .toolbar-divider {
                    width: 1px;
                    height: 20px;

                    background: #e5e9ee;
                }

                .current-language {
                    color: #7a8798;

                    font-size: 12px;
                    font-weight: 600;

                    white-space: nowrap;

                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .fullscreen-button {
                    display: inline-flex;
                    align-items: center;

                    gap: 7px;

                    min-height: 34px;

                    padding: 0 11px;

                    border: 1px solid #e0e6ed;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #526176;

                    cursor: pointer;

                    font-size: 12px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .fullscreen-button:hover {
                    border-color: #b9cde5;

                    color: #5D89C8;

                    background: #f7faff;
                }


                /* =========================================
                   DOCUMENT VIEWER
                ========================================== */

                .viewer-card {
                    overflow: hidden;

                    background: #ffffff;

                    border: 1px solid #dfe5ec;

                    border-radius: 16px;

                    box-shadow:
                        0 12px 35px
                        rgba(20, 38, 60, .08);
                }

                .viewer-top {
                    height: 48px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 12px;

                    padding: 0 16px;

                    background: #fafbfd;

                    border-bottom: 1px solid #e6ebf0;
                }

                .viewer-title {
                    display: flex;
                    align-items: center;

                    gap: 8px;

                    min-width: 0;

                    color: #35445a;

                    font-size: 12px;
                    font-weight: 700;
                }

                .viewer-title svg {
                    flex: 0 0 auto;

                    color: #5D89C8;
                }

                .viewer-title span {
                    overflow: hidden;

                    white-space: nowrap;

                    text-overflow: ellipsis;
                }

                .viewer-language {
                    flex: 0 0 auto;

                    padding: 5px 9px;

                    border-radius: 6px;

                    background: #edf4fc;

                    color: #5D89C8;

                    font-size: 10px;
                    font-weight: 800;
                }

                .viewer-container {
                    width: 100%;

                    height: min(78vh, 950px);

                    min-height: 600px;

                    background: #eef1f5;
                }

                .document-iframe {
                    display: block;

                    width: 100%;
                    height: 100%;

                    border: 0;

                    background: #ffffff;
                }


                /* =========================================
                   FOOTER
                ========================================== */

                .reader-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;

                    flex-wrap: wrap;

                    margin-top: 16px;

                    padding: 15px 17px;

                    border: 1px solid #e5eaf0;

                    border-radius: 13px;

                    background: #ffffff;
                }

                .footer-note {
                    display: flex;
                    align-items: center;

                    gap: 11px;
                }

                .footer-note > svg {
                    flex: 0 0 auto;

                    color: #5D89C8;
                }

                .footer-note div {
                    display: flex;
                    flex-direction: column;

                    gap: 2px;
                }

                .footer-note strong {
                    color: #3b495d;

                    font-size: 11px;
                    font-weight: 750;
                }

                .footer-note span {
                    color: #8994a3;

                    font-size: 10px;
                }

                .footer-back {
                    display: inline-flex;
                    align-items: center;

                    gap: 6px;

                    color: #5D89C8;

                    text-decoration: none;

                    font-size: 11px;
                    font-weight: 750;
                }

                .footer-back:hover {
                    text-decoration: underline;
                }


                /* =========================================
                   TABLET
                ========================================== */

                @media (max-width: 768px) {

                    .document-page {
                        padding: 4px 0 28px;
                    }

                    .page-navigation {
                        margin-bottom: 13px;
                    }

                    .secure-reading {
                        display: none;
                    }

                    .document-header {
                        padding: 19px;

                        border-radius: 15px;
                    }

                    .header-main {
                        gap: 13px;
                    }

                    .document-icon {
                        width: 46px;
                        height: 46px;

                        flex-basis: 46px;

                        border-radius: 12px;
                    }

                    .document-icon svg {
                        width: 22px;
                        height: 22px;
                    }

                    .document-heading h1 {
                        font-size: 1.25rem;
                    }

                    .document-description {
                        font-size: 13px;
                    }

                    .document-meta {
                        gap: 10px;

                        margin-top: 13px;
                    }

                    .language-section {
                        align-items: flex-start;

                        flex-direction: column;

                        gap: 11px;

                        margin-top: 20px;

                        padding-top: 17px;
                    }

                    .language-list {
                        width: 100%;
                    }

                    .language-button {
                        flex: 1;
                    }

                    .reader-toolbar {
                        padding: 8px 10px;
                    }

                    .fullscreen-button span {
                        display: none;
                    }

                    .fullscreen-button {
                        width: 34px;

                        justify-content: center;

                        padding: 0;
                    }

                    .viewer-card {
                        border-radius: 12px;
                    }

                    .viewer-container {
                        height: 70vh;

                        min-height: 480px;
                    }

                    .viewer-top {
                        padding: 0 11px;
                    }

                    .reader-footer {
                        align-items: flex-start;

                        flex-direction: column;
                    }

                }


                /* =========================================
                   MOBILE
                ========================================== */

                @media (max-width: 480px) {

                    .document-header {
                        padding: 16px;
                    }

                    .header-main {
                        align-items: flex-start;
                    }

                    .document-icon {
                        display: none;
                    }

                    .document-meta {
                        flex-direction: column;

                        align-items: flex-start;

                        gap: 7px;
                    }

                    .language-button {
                        min-width: 0;

                        padding: 0 9px;

                        font-size: 11px;
                    }

                    .viewer-container {
                        height: 68vh;

                        min-height: 430px;
                    }

                    .viewer-title {
                        max-width: 70%;
                    }

                }

            `}</style>
        </AppLayout>
    );
}