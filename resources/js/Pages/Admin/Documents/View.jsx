import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Download,
    Edit3,
    Eye,
    FileText,
    Languages,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function View({ document }) {
    const [selectedLanguage, setSelectedLanguage] = useState(
        document.versions?.[0]?.language ?? null
    );

    const selectedVersion = useMemo(() => {
        return document.versions?.find(
            (version) => version.language === selectedLanguage
        );
    }, [document.versions, selectedLanguage]);

    const pdfUrl = selectedVersion
        ? route('documents.stream', [
              document.id,
              selectedVersion.language,
          ])
        : null;

    return (
        <AdminLayout title={`View ${document.title}`}>
            <div className="document-view-page">

                {/* ================= HEADER ================= */}

                <div className="page-header">

                    <div className="header-left">

                        <Link
                            href={route('admin.documents.index')}
                            className="back-btn"
                        >
                            <ArrowLeft size={17} />
                            Back to Documents
                        </Link>

                        <div className="title-section">

                            <div className="title-icon">
                                <FileText size={25} />
                            </div>

                            <div>
                                <h1>{document.title}</h1>

                                <div className="document-meta">
                                    <span>
                                        Document #{document.id}
                                    </span>

                                    {document.created_at && (
                                        <>
                                            <span className="meta-dot">
                                                •
                                            </span>

                                            <span>
                                                <CalendarDays size={13} />
                                                {document.created_at}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="header-actions">

                        <Link
                            href={route(
                                'admin.documents.edit',
                                document.id
                            )}
                            className="secondary-btn"
                        >
                            <Edit3 size={16} />
                            Edit Document
                        </Link>

                    </div>

                </div>

                {/* ================= CONTENT ================= */}

                <div className="viewer-layout">

                    {/* ================= SIDEBAR ================= */}

                    <aside className="document-sidebar">

                        {/* Information */}

                        <div className="side-card">

                            <div className="side-card-header">
                                <div className="side-icon">
                                    <FileText size={17} />
                                </div>

                                <div>
                                    <h3>Document Information</h3>
                                    <p>Document details</p>
                                </div>
                            </div>

                            <div className="info-list">

                                <div className="info-item">
                                    <span>Document ID</span>
                                    <strong>#{document.id}</strong>
                                </div>

                                <div className="info-item">
                                    <span>Available Languages</span>
                                    <strong>
                                        {document.versions?.length ?? 0}
                                    </strong>
                                </div>

                                {document.created_at && (
                                    <div className="info-item">
                                        <span>Uploaded</span>
                                        <strong>
                                            {document.created_at}
                                        </strong>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Description */}

                        {document.description && (
                            <div className="side-card">

                                <div className="side-card-header">
                                    <div className="side-icon">
                                        <Eye size={17} />
                                    </div>

                                    <div>
                                        <h3>Description</h3>
                                        <p>About this document</p>
                                    </div>
                                </div>

                                <p className="description">
                                    {document.description}
                                </p>

                            </div>
                        )}

                        {/* Languages */}

                        <div className="side-card">

                            <div className="side-card-header">

                                <div className="side-icon">
                                    <Languages size={17} />
                                </div>

                                <div>
                                    <h3>Language Versions</h3>
                                    <p>Select a version to preview</p>
                                </div>

                            </div>

                            {document.versions?.length > 0 ? (
                                <div className="language-options">

                                    {document.versions.map((version) => {

                                        const active =
                                            selectedLanguage ===
                                            version.language;

                                        return (
                                            <button
                                                key={version.id}
                                                type="button"
                                                className={`language-option ${
                                                    active
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    setSelectedLanguage(
                                                        version.language
                                                    )
                                                }
                                            >

                                                <div className="language-avatar">
                                                    {version.language
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <div className="language-details">
                                                    <strong>
                                                        {
                                                            version.language_label
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            version.original_filename
                                                        }
                                                    </span>
                                                </div>

                                                {active && (
                                                    <CheckCircle2
                                                        size={18}
                                                    />
                                                )}

                                            </button>
                                        );
                                    })}

                                </div>
                            ) : (
                                <div className="no-versions">
                                    <AlertCircle size={19} />
                                    <span>
                                        No language versions are available.
                                    </span>
                                </div>
                            )}

                        </div>

                    </aside>

                    {/* ================= PDF VIEWER ================= */}

                    <main className="viewer-card">

                        <div className="viewer-toolbar">

                            <div className="viewer-title">

                                <div className="pdf-icon">
                                    <FileText size={18} />
                                </div>

                                <div>
                                    <strong>
                                        {selectedVersion
                                            ? selectedVersion.language_label
                                            : 'Document Preview'}
                                    </strong>

                                    <span>
                                        {selectedVersion
                                            ? selectedVersion.original_filename
                                            : 'No file selected'}
                                    </span>
                                </div>

                            </div>

                            {pdfUrl && (
                                <div className="viewer-actions">

                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="viewer-action"
                                    >
                                        <ExternalLink size={15} />
                                        Open
                                    </a>

                                    <a
                                        href={pdfUrl}
                                        download={
                                            selectedVersion?.original_filename
                                        }
                                        className="viewer-action primary"
                                    >
                                        <Download size={15} />
                                        Download
                                    </a>

                                </div>
                            )}

                        </div>

                        {/* PDF */}

                        {pdfUrl ? (
                            <div className="pdf-container">

                                <iframe
                                    src={pdfUrl}
                                    title={`Preview of ${document.title}`}
                                    className="pdf-frame"
                                />

                            </div>
                        ) : (
                            <div className="empty-viewer">

                                <div className="empty-viewer-icon">
                                    <FileText size={35} />
                                </div>

                                <h2>No document available</h2>

                                <p>
                                    This document does not currently have
                                    a language version available for
                                    preview.
                                </p>

                                <Link
                                    href={route(
                                        'admin.documents.edit',
                                        document.id
                                    )}
                                    className="primary-btn"
                                >
                                    <Edit3 size={16} />
                                    Add Document Version
                                </Link>

                            </div>
                        )}

                    </main>

                </div>

            </div>

            <style>{`

                .document-view-page {
                    --primary: #5D89C8;
                    --primary-dark: #416FAE;
                    --text: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F6F8FB;
                    --white: #FFFFFF;

                    min-height: 100%;
                    padding: 28px;
                    background: var(--background);
                }

                /* ================= HEADER ================= */

                .page-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 24px;
                }

                .header-left {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .back-btn {
                    width: fit-content;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #667085;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 600;
                    transition: .2s ease;
                }

                .back-btn:hover {
                    color: var(--primary);
                }

                .title-section {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .title-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .title-section h1 {
                    margin: 0;
                    color: var(--text);
                    font-size: 25px;
                    font-weight: 750;
                    letter-spacing: -.4px;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 5px;
                    color: #8A94A6;
                    font-size: 11px;
                }

                .document-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                .meta-dot {
                    color: #C3CAD5;
                }

                .header-actions {
                    display: flex;
                    gap: 8px;
                }

                .secondary-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    height: 38px;
                    padding: 0 14px;
                    border: 1px solid #DCE3ED;
                    border-radius: 9px;
                    background: white;
                    color: #526581;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 650;
                    transition: .2s ease;
                }

                .secondary-btn:hover {
                    border-color: #BFD0E7;
                    background: #F8FAFD;
                    color: var(--primary-dark);
                }

                /* ================= LAYOUT ================= */

                .viewer-layout {
                    display: grid;
                    grid-template-columns: 300px minmax(0, 1fr);
                    gap: 20px;
                    align-items: start;
                }

                /* ================= SIDEBAR ================= */

                .document-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .side-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    padding: 18px;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .035);
                }

                .side-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-bottom: 14px;
                    margin-bottom: 13px;
                    border-bottom: 1px solid #F0F2F5;
                }

                .side-icon {
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .side-card-header h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 13px;
                    font-weight: 700;
                }

                .side-card-header p {
                    margin: 3px 0 0;
                    color: #98A2B3;
                    font-size: 10px;
                }

                /* ================= INFO ================= */

                .info-list {
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }

                .info-item span {
                    color: #8A94A6;
                    font-size: 11px;
                }

                .info-item strong {
                    color: #526581;
                    font-size: 11px;
                    font-weight: 650;
                    text-align: right;
                }

                /* ================= DESCRIPTION ================= */

                .description {
                    margin: 0;
                    color: #667085;
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* ================= LANGUAGES ================= */

                .language-options {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .language-option {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 10px;
                    border: 1px solid #E7EBF2;
                    border-radius: 9px;
                    background: #FAFBFC;
                    color: #667085;
                    text-align: left;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .language-option:hover {
                    border-color: #C9D8EB;
                    background: #F7FAFE;
                }

                .language-option.active {
                    border-color: #9EBBE0;
                    background: #EDF4FD;
                    color: var(--primary-dark);
                    box-shadow: 0 0 0 2px rgba(93, 137, 200, .07);
                }

                .language-avatar {
                    width: 31px;
                    height: 31px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #E5ECF7;
                    color: #5275A6;
                    font-size: 9px;
                    font-weight: 800;
                }

                .language-option.active .language-avatar {
                    background: #D9E7F8;
                    color: var(--primary-dark);
                }

                .language-details {
                    min-width: 0;
                    flex: 1;
                }

                .language-details strong {
                    display: block;
                    color: var(--text);
                    font-size: 11px;
                    font-weight: 700;
                }

                .language-details span {
                    display: block;
                    max-width: 170px;
                    margin-top: 2px;
                    overflow: hidden;
                    color: #98A2B3;
                    font-size: 9px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .language-option > svg {
                    color: var(--primary);
                    flex: 0 0 auto;
                }

                .no-versions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px;
                    border-radius: 9px;
                    background: #FFF9ED;
                    color: #9A6B20;
                    font-size: 11px;
                    line-height: 1.5;
                }

                /* ================= VIEWER ================= */

                .viewer-card {
                    min-width: 0;
                    overflow: hidden;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 15px;
                    box-shadow: 0 3px 14px rgba(20, 30, 50, .045);
                }

                .viewer-toolbar {
                    min-height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 10px 15px;
                    border-bottom: 1px solid var(--border);
                }

                .viewer-title {
                    min-width: 0;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .pdf-icon {
                    width: 34px;
                    height: 34px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #FFF0F1;
                    color: #C9505A;
                }

                .viewer-title strong {
                    display: block;
                    color: var(--text);
                    font-size: 12px;
                    font-weight: 700;
                }

                .viewer-title span {
                    display: block;
                    max-width: 300px;
                    margin-top: 2px;
                    overflow: hidden;
                    color: #98A2B3;
                    font-size: 9px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .viewer-actions {
                    display: flex;
                    gap: 6px;
                    flex: 0 0 auto;
                }

                .viewer-action {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    height: 32px;
                    padding: 0 10px;
                    border: 1px solid #DCE3ED;
                    border-radius: 7px;
                    background: white;
                    color: #526581;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 650;
                }

                .viewer-action:hover {
                    background: #F7F9FC;
                }

                .viewer-action.primary {
                    border-color: var(--primary);
                    background: var(--primary);
                    color: white;
                }

                .viewer-action.primary:hover {
                    background: var(--primary-dark);
                }

                /* ================= PDF ================= */

                .pdf-container {
                    width: 100%;
                    height: calc(100vh - 205px);
                    min-height: 650px;
                    background: #525659;
                }

                .pdf-frame {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 650px;
                    border: none;
                    background: white;
                }

                /* ================= EMPTY ================= */

                .empty-viewer {
                    min-height: 600px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    text-align: center;
                    background: #FBFCFE;
                }

                .empty-viewer-icon {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    border-radius: 18px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .empty-viewer h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 17px;
                }

                .empty-viewer p {
                    max-width: 390px;
                    margin: 7px 0 20px;
                    color: var(--muted);
                    font-size: 12px;
                    line-height: 1.6;
                }

                .primary-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 14px;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 650;
                }

                .primary-btn:hover {
                    background: var(--primary-dark);
                    color: white;
                }

                /* ================= RESPONSIVE ================= */

                @media (max-width: 1100px) {
                    .viewer-layout {
                        grid-template-columns: 250px minmax(0, 1fr);
                    }
                }

                @media (max-width: 850px) {
                    .document-view-page {
                        padding: 18px 14px;
                    }

                    .page-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .viewer-layout {
                        grid-template-columns: 1fr;
                    }

                    .document-sidebar {
                        order: 2;
                    }

                    .viewer-card {
                        order: 1;
                    }

                    .pdf-container {
                        height: 75vh;
                        min-height: 550px;
                    }
                }

                @media (max-width: 600px) {
                    .title-section h1 {
                        font-size: 20px;
                    }

                    .title-icon {
                        width: 43px;
                        height: 43px;
                    }

                    .header-actions,
                    .secondary-btn {
                        width: 100%;
                    }

                    .secondary-btn {
                        justify-content: center;
                    }

                    .viewer-toolbar {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .viewer-actions {
                        width: 100%;
                    }

                    .viewer-action {
                        flex: 1;
                        justify-content: center;
                    }

                    .pdf-container {
                        height: 70vh;
                        min-height: 500px;
                    }

                    .document-meta {
                        flex-wrap: wrap;
                    }
                }

            `}</style>
        </AdminLayout>
    );
}