import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    FileText,
    Languages,
    Eye,
    Trash2,
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    CalendarDays,
    Hash,
    X,
} from 'lucide-react';
import { useState } from 'react';

const LANGUAGES = [
    {
        code: 'en',
        label: 'English',
        short: 'EN',
        description: 'English version',
    },
    {
        code: 'es',
        label: 'Spanish',
        short: 'ES',
        description: 'Spanish version',
    },
    {
        code: 'rw',
        label: 'Kinyarwanda',
        short: 'RW',
        description: 'Kinyarwanda version',
    },
];

export default function Edit({ document }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        title: document.title,
        description: document.description ?? '',
        file_en: null,
        file_es: null,
        file_rw: null,
        _method: 'put',
    });

    const [selectedFiles, setSelectedFiles] = useState({
        en: null,
        es: null,
        rw: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(
            route('admin.documents.update', document.id),
            {
                forceFormData: true,
            }
        );
    };

    const removeVersion = (version, label) => {
        if (
            confirm(
                `Remove the ${label} version?\n\nThis will permanently remove the existing PDF version.`
            )
        ) {
            router.delete(
                route(
                    'admin.documents.versions.destroy',
                    [document.id, version.id]
                )
            );
        }
    };

    const versionFor = (code) =>
        document.versions.find(
            (version) => version.language === code
        );

    const handleFileChange = (code, file) => {
        setData(`file_${code}`, file || null);

        setSelectedFiles((previous) => ({
            ...previous,
            [code]: file || null,
        }));
    };

    const removeSelectedFile = (code) => {
        setData(`file_${code}`, null);

        setSelectedFiles((previous) => ({
            ...previous,
            [code]: null,
        }));
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const totalVersions = document.versions.length;

    return (
        <AdminLayout title="Edit Document">
            <div className="edit-page">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="page-header">
                    <div className="header-left">

                        <Link
                            href={route('admin.documents.index')}
                            className="back-button"
                        >
                            <ArrowLeft size={17} />
                        </Link>

                        <div>
                            <div className="breadcrumb">
                                Documents
                                <span>/</span>
                                Edit
                            </div>

                            <h1>Edit Document</h1>

                            <p>
                                Update document information and manage
                                language versions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    DOCUMENT SUMMARY
                ====================================================== */}

                <div className="document-summary">

                    <div className="summary-main">
                        <div className="summary-icon">
                            <FileText size={24} />
                        </div>

                        <div>
                            <h2>{document.title}</h2>

                            <div className="summary-meta">
                                <span>
                                    <Hash size={13} />
                                    Document #{document.id}
                                </span>

                                <span>
                                    <Languages size={13} />
                                    {totalVersions}{' '}
                                    {totalVersions === 1
                                        ? 'language'
                                        : 'languages'}
                                </span>

                                {document.created_at && (
                                    <span>
                                        <CalendarDays size={13} />
                                        {document.created_at}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="version-badge">
                        <CheckCircle2 size={15} />
                        {totalVersions > 0
                            ? 'Active'
                            : 'No versions'}
                    </div>
                </div>

                {/* =====================================================
                    ERRORS
                ====================================================== */}

                {Object.keys(errors).length > 0 && (
                    <div className="error-alert">

                        <div className="error-icon">
                            <AlertCircle size={18} />
                        </div>

                        <div>
                            <strong>
                                Please fix the following errors
                            </strong>

                            <ul>
                                {Object.values(errors).map(
                                    (message, index) => (
                                        <li key={index}>
                                            {message}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <form onSubmit={submit}>

                    <div className="content-grid">

                        {/* =================================================
                            MAIN COLUMN
                        ================================================== */}

                        <div className="main-column">

                            {/* DOCUMENT DETAILS */}

                            <section className="form-card">

                                <div className="card-heading">

                                    <div className="heading-icon blue">
                                        <FileText size={19} />
                                    </div>

                                    <div>
                                        <h2>Document Details</h2>

                                        <p>
                                            Update the title and description
                                            of this document.
                                        </p>
                                    </div>
                                </div>

                                <div className="form-body">

                                    {/* TITLE */}

                                    <div className="form-group">

                                        <label htmlFor="title">
                                            Document Title
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="title"
                                            type="text"
                                            required
                                            value={data.title}
                                            onChange={(e) =>
                                                setData(
                                                    'title',
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.title
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />

                                        {errors.title && (
                                            <small className="field-error">
                                                {errors.title}
                                            </small>
                                        )}
                                    </div>

                                    {/* DESCRIPTION */}

                                    <div className="form-group">

                                        <label htmlFor="description">
                                            Description
                                            <span className="optional">
                                                Optional
                                            </span>
                                        </label>

                                        <textarea
                                            id="description"
                                            rows={5}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Describe this document..."
                                            className={
                                                errors.description
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />

                                        {errors.description && (
                                            <small className="field-error">
                                                {errors.description}
                                            </small>
                                        )}

                                    </div>
                                </div>
                            </section>

                            {/* LANGUAGE VERSIONS */}

                            <section className="form-card">

                                <div className="card-heading">

                                    <div className="heading-icon purple">
                                        <Languages size={19} />
                                    </div>

                                    <div>
                                        <h2>Language Versions</h2>

                                        <p>
                                            Manage the PDF available for
                                            each language.
                                        </p>
                                    </div>
                                </div>

                                <div className="versions-body">

                                    <div className="info-banner">
                                        <AlertCircle size={16} />

                                        <p>
                                            Existing files can be previewed,
                                            replaced, or removed. Upload a
                                            new PDF only when you want to
                                            add or replace a version.
                                        </p>
                                    </div>

                                    <div className="versions-list">

                                        {LANGUAGES.map((language) => {

                                            const existing =
                                                versionFor(
                                                    language.code
                                                );

                                            const selected =
                                                selectedFiles[
                                                    language.code
                                                ];

                                            const error =
                                                errors[
                                                    `file_${language.code}`
                                                ];

                                            return (
                                                <div
                                                    className={`version-card ${
                                                        existing
                                                            ? 'existing'
                                                            : 'missing'
                                                    } ${
                                                        selected
                                                            ? 'replacement'
                                                            : ''
                                                    }`}
                                                    key={language.code}
                                                >

                                                    {/* VERSION HEADER */}

                                                    <div className="version-header">

                                                        <div className="language-info">

                                                            <div className="language-badge">
                                                                {
                                                                    language.short
                                                                }
                                                            </div>

                                                            <div>
                                                                <strong>
                                                                    {
                                                                        language.label
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {
                                                                        language.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {existing ? (
                                                            <span className="status-badge active">
                                                                <CheckCircle2
                                                                    size={13}
                                                                />
                                                                Available
                                                            </span>
                                                        ) : (
                                                            <span className="status-badge missing">
                                                                <AlertCircle
                                                                    size={13}
                                                                />
                                                                Missing
                                                            </span>
                                                        )}

                                                    </div>

                                                    {/* EXISTING FILE */}

                                                    {existing && !selected && (
                                                        <div className="existing-file">

                                                            <div className="pdf-icon">
                                                                <FileText
                                                                    size={20}
                                                                />
                                                            </div>

                                                            <div className="file-details">
                                                                <strong>
                                                                    {
                                                                        existing.original_filename
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    Current
                                                                    language
                                                                    version
                                                                </span>
                                                            </div>

                                                            <div className="file-actions">

                                                                <a
                                                                    href={route(
                                                                        'documents.stream',
                                                                        [
                                                                            document.id,
                                                                            language.code,
                                                                        ]
                                                                    )}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="preview-btn"
                                                                >
                                                                    <Eye
                                                                        size={15}
                                                                    />
                                                                    Preview
                                                                </a>

                                                                <button
                                                                    type="button"
                                                                    className="remove-btn"
                                                                    onClick={() =>
                                                                        removeVersion(
                                                                            existing,
                                                                            language.label
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2
                                                                        size={15}
                                                                    />
                                                                    Remove
                                                                </button>

                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* REPLACEMENT FILE */}

                                                    {selected && (
                                                        <div className="selected-file">

                                                            <div className="pdf-icon">
                                                                <FileText
                                                                    size={20}
                                                                />
                                                            </div>

                                                            <div className="file-details">
                                                                <strong>
                                                                    {
                                                                        selected.name
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {formatFileSize(
                                                                        selected.size
                                                                    )}
                                                                    {' · '}
                                                                    New replacement
                                                                </span>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                className="remove-selected"
                                                                onClick={() =>
                                                                    removeSelectedFile(
                                                                        language.code
                                                                    )
                                                                }
                                                            >
                                                                <X
                                                                    size={16}
                                                                />
                                                            </button>

                                                        </div>
                                                    )}

                                                    {/* UPLOAD AREA */}

                                                    {!selected && (
                                                        <label className="replace-zone">

                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    handleFileChange(
                                                                        language.code,
                                                                        e
                                                                            .target
                                                                            .files?.[0]
                                                                    )
                                                                }
                                                            />

                                                            <UploadCloud
                                                                size={20}
                                                            />

                                                            <div>
                                                                <strong>
                                                                    {existing
                                                                        ? 'Replace PDF'
                                                                        : 'Add PDF version'}
                                                                </strong>

                                                                <span>
                                                                    PDF files only
                                                                </span>
                                                            </div>

                                                        </label>
                                                    )}

                                                    {error && (
                                                        <div className="file-error">
                                                            {error}
                                                        </div>
                                                    )}

                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* =================================================
                            SIDEBAR
                        ================================================== */}

                        <aside className="side-column">

                            {/* SAVE CARD */}

                            <div className="side-card save-card">

                                <div className="side-card-heading">
                                    <div className="save-heading-icon">
                                        <Save size={18} />
                                    </div>

                                    <div>
                                        <h3>Save Changes</h3>

                                        <p>
                                            Update this document with your
                                            latest changes.
                                        </p>
                                    </div>
                                </div>

                                <div className="save-summary">

                                    <div>
                                        <span>Document</span>
                                        <strong>
                                            #{document.id}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Language versions</span>
                                        <strong>
                                            {totalVersions}
                                        </strong>
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="save-button"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={17} />
                                            Save Changes
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={route(
                                        'admin.documents.index'
                                    )}
                                    className="cancel-button"
                                >
                                    Cancel
                                </Link>

                            </div>

                            {/* DOCUMENT STATUS */}

                            <div className="side-card status-card">

                                <div className="status-title">
                                    <span className="status-dot" />
                                    Document Status
                                </div>

                                <div className="status-content">

                                    <div className="status-row">
                                        <span>Languages</span>

                                        <strong>
                                            {totalVersions}/3
                                        </strong>
                                    </div>

                                    <div className="progress-track">
                                        <div
                                            className="progress-value"
                                            style={{
                                                width: `${Math.min(
                                                    (totalVersions / 3) *
                                                        100,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>

                                    <p>
                                        {totalVersions === 3
                                            ? 'All supported language versions are available.'
                                            : `${3 - totalVersions} language version${
                                                  3 - totalVersions === 1
                                                      ? ''
                                                      : 's'
                                              } still missing.`}
                                    </p>

                                </div>

                            </div>

                            {/* HELP */}

                            <div className="side-card help-card">

                                <div className="help-icon">
                                    <AlertCircle size={17} />
                                </div>

                                <div>
                                    <h3>Managing versions</h3>

                                    <p>
                                        Removing a language version deletes
                                        that PDF from the document. Replacing
                                        it uploads a new PDF while keeping
                                        the language assignment.
                                    </p>
                                </div>

                            </div>

                        </aside>
                    </div>
                </form>
            </div>

            {/* =========================================================
                STYLES
            ========================================================== */}

            <style>{`
                .edit-page {
                    --primary: #5D89C8;
                    --primary-dark: #416FAE;
                    --text: #172033;
                    --muted: #718096;
                    --border: #E5E9F0;
                    --background: #F6F8FB;
                    --white: #FFFFFF;

                    min-height: 100%;
                    padding: 28px;
                    background: var(--background);
                }

                /* ================= HEADER ================= */

                .page-header {
                    margin-bottom: 20px;
                }

                .header-left {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                }

                .back-button {
                    width: 40px;
                    height: 40px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--border);
                    border-radius: 10px;
                    background: white;
                    color: #667085;
                    text-decoration: none;
                    transition: .2s ease;
                }

                .back-button:hover {
                    color: var(--primary);
                    border-color: #CBD8EA;
                    background: #F9FBFE;
                }

                .breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    margin-bottom: 4px;
                    color: #98A2B3;
                    font-size: 10px;
                    font-weight: 600;
                }

                .breadcrumb span {
                    color: #C5CBD4;
                }

                .header-left h1 {
                    margin: 0;
                    color: var(--text);
                    font-size: 25px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .header-left p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 12px;
                }

                /* ================= SUMMARY ================= */

                .document-summary {
                    max-width: 1250px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 16px 18px;
                    margin-bottom: 20px;
                    border: 1px solid var(--border);
                    border-radius: 13px;
                    background: white;
                    box-shadow: 0 2px 8px rgba(20, 30, 50, .025);
                }

                .summary-main {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 0;
                }

                .summary-icon {
                    width: 43px;
                    height: 43px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .summary-main h2 {
                    max-width: 500px;
                    margin: 0;
                    overflow: hidden;
                    color: var(--text);
                    font-size: 14px;
                    font-weight: 700;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .summary-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: 5px;
                }

                .summary-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    color: #98A2B3;
                    font-size: 10px;
                }

                .version-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 6px 9px;
                    border-radius: 7px;
                    background: #ECF8F0;
                    color: #31945A;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                /* ================= ERROR ================= */

                .error-alert {
                    max-width: 1250px;
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    margin-bottom: 20px;
                    padding: 14px 16px;
                    border: 1px solid #F0C9CE;
                    border-radius: 11px;
                    background: #FFF7F8;
                    color: #A93442;
                }

                .error-icon {
                    flex: 0 0 auto;
                    margin-top: 1px;
                }

                .error-alert strong {
                    font-size: 12px;
                }

                .error-alert ul {
                    margin: 5px 0 0;
                    padding-left: 17px;
                    font-size: 11px;
                    line-height: 1.6;
                }

                /* ================= GRID ================= */

                .content-grid {
                    max-width: 1250px;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 310px;
                    gap: 20px;
                    align-items: start;
                }

                .main-column {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .side-column {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    position: sticky;
                    top: 20px;
                }

                /* ================= CARD ================= */

                .form-card,
                .side-card {
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    background: white;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .03);
                    overflow: hidden;
                }

                .card-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 20px;
                    border-bottom: 1px solid var(--border);
                }

                .heading-icon {
                    width: 38px;
                    height: 38px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                }

                .heading-icon.blue {
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .heading-icon.purple {
                    background: #F1ECFC;
                    color: #805AD5;
                }

                .card-heading h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 14px;
                    font-weight: 700;
                }

                .card-heading p {
                    margin: 3px 0 0;
                    color: var(--muted);
                    font-size: 10px;
                }

                /* ================= FORM ================= */

                .form-body {
                    padding: 20px;
                }

                .form-group {
                    margin-bottom: 19px;
                }

                .form-group:last-child {
                    margin-bottom: 0;
                }

                .form-group label {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 7px;
                    color: #344054;
                    font-size: 11px;
                    font-weight: 700;
                }

                .form-group label > span:first-child {
                    color: #D14B58;
                }

                .form-group label .optional {
                    margin-left: 5px;
                    color: #98A2B3;
                    font-size: 9px;
                    font-weight: 500;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #DCE2EA;
                    border-radius: 9px;
                    outline: none;
                    background: #FCFDFE;
                    color: var(--text);
                    font-family: inherit;
                    font-size: 12px;
                    transition: .2s ease;
                }

                .form-group input {
                    height: 42px;
                    padding: 0 12px;
                }

                .form-group textarea {
                    padding: 10px 12px;
                    resize: vertical;
                    line-height: 1.5;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--primary);
                    background: white;
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .09);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #A7AFBC;
                }

                .input-error {
                    border-color: #D14B58 !important;
                }

                .field-error {
                    display: block;
                    margin-top: 5px;
                    color: #D14B58;
                    font-size: 10px;
                }

                /* ================= VERSIONS ================= */

                .versions-body {
                    padding: 19px 20px 21px;
                }

                .info-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    margin-bottom: 15px;
                    padding: 11px 12px;
                    border-radius: 8px;
                    background: #F4F7FC;
                    color: #526581;
                }

                .info-banner svg {
                    flex: 0 0 auto;
                    margin-top: 1px;
                }

                .info-banner p {
                    margin: 0;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .versions-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .version-card {
                    padding: 14px;
                    border: 1px solid #E3E7EE;
                    border-radius: 11px;
                    background: #FCFDFE;
                    transition: .2s ease;
                }

                .version-card.existing {
                    background: #FBFDFC;
                    border-color: #DDE9E1;
                }

                .version-card.missing {
                    background: #FEFCFA;
                    border-color: #EAE4DB;
                }

                .version-card.replacement {
                    border-color: #BED3ED;
                    background: #F9FBFE;
                }

                .version-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    margin-bottom: 12px;
                }

                .language-info {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .language-badge {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                    font-size: 9px;
                    font-weight: 800;
                }

                .language-info strong {
                    display: block;
                    color: #344054;
                    font-size: 11px;
                }

                .language-info span {
                    display: block;
                    margin-top: 2px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 5px 8px;
                    border-radius: 6px;
                    font-size: 9px;
                    font-weight: 700;
                }

                .status-badge.active {
                    background: #EAF7EE;
                    color: #31945A;
                }

                .status-badge.missing {
                    background: #FFF4E5;
                    color: #B7791F;
                }

                /* ================= EXISTING FILE ================= */

                .existing-file,
                .selected-file {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 10px;
                    border-radius: 8px;
                    background: white;
                    border: 1px solid #E9EDF2;
                }

                .selected-file {
                    background: #F1F8F3;
                    border-color: #D6E9DB;
                }

                .pdf-icon {
                    width: 34px;
                    height: 34px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #FDECEC;
                    color: #D65A5A;
                }

                .file-details {
                    min-width: 0;
                    flex: 1;
                }

                .file-details strong {
                    display: block;
                    overflow: hidden;
                    color: #344054;
                    font-size: 10px;
                    font-weight: 650;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .file-details span {
                    display: block;
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .file-actions {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .preview-btn,
                .remove-btn {
                    height: 30px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 0 9px;
                    border-radius: 7px;
                    text-decoration: none;
                    font-family: inherit;
                    font-size: 9px;
                    font-weight: 650;
                    cursor: pointer;
                }

                .preview-btn {
                    border: 1px solid #DCE5F1;
                    background: #F7FAFE;
                    color: #4C72A9;
                }

                .preview-btn:hover {
                    background: #EAF1FC;
                }

                .remove-btn {
                    border: 1px solid #F0D7DA;
                    background: #FFF9FA;
                    color: #D14B58;
                }

                .remove-btn:hover {
                    background: #FFF0F2;
                }

                /* ================= SELECTED ================= */

                .remove-selected {
                    width: 28px;
                    height: 28px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #DDE6DF;
                    border-radius: 7px;
                    background: white;
                    color: #98A2B3;
                    cursor: pointer;
                }

                .remove-selected:hover {
                    color: #D14B58;
                    border-color: #E5B9BE;
                }

                /* ================= UPLOAD ================= */

                .replace-zone {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-height: 48px;
                    padding: 8px 11px;
                    margin-top: 8px;
                    border: 1px dashed #CCD5E2;
                    border-radius: 8px;
                    background: #FAFBFD;
                    color: #6B7C93;
                    cursor: pointer;
                    transition: .2s ease;
                }

                .replace-zone:hover {
                    border-color: var(--primary);
                    background: #F6F9FE;
                    color: var(--primary);
                }

                .replace-zone input {
                    display: none;
                }

                .replace-zone svg {
                    width: 20px;
                    flex: 0 0 auto;
                }

                .replace-zone strong {
                    display: block;
                    color: #526581;
                    font-size: 10px;
                }

                .replace-zone span {
                    display: block;
                    margin-top: 2px;
                    color: #98A2B3;
                    font-size: 8px;
                }

                .file-error {
                    margin-top: 6px;
                    color: #D14B58;
                    font-size: 9px;
                }

                /* ================= SIDEBAR ================= */

                .side-card {
                    padding: 18px;
                }

                .side-card-heading {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                }

                .save-heading-icon {
                    width: 33px;
                    height: 33px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .side-card h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 13px;
                    font-weight: 700;
                }

                .side-card-heading p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 10px;
                    line-height: 1.5;
                }

                .save-summary {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    margin: 16px 0;
                    padding: 12px 0;
                    border-top: 1px solid #F0F2F5;
                    border-bottom: 1px solid #F0F2F5;
                }

                .save-summary span {
                    display: block;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .save-summary strong {
                    display: block;
                    margin-top: 3px;
                    color: #526581;
                    font-size: 12px;
                }

                .save-button {
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    border: none;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    font-family: inherit;
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(93, 137, 200, .18);
                    transition: .2s ease;
                }

                .save-button:hover:not(:disabled) {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .save-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                .cancel-button {
                    width: 100%;
                    height: 37px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 6px;
                    border-radius: 8px;
                    color: #667085;
                    font-size: 10px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .cancel-button:hover {
                    background: #F6F8FB;
                }

                /* ================= STATUS ================= */

                .status-card {
                    background: #FBFCFE;
                }

                .status-title {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #344054;
                    font-size: 11px;
                    font-weight: 700;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #35A060;
                }

                .status-content {
                    margin-top: 14px;
                }

                .status-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 7px;
                }

                .status-row span {
                    color: #98A2B3;
                    font-size: 9px;
                }

                .status-row strong {
                    color: #526581;
                    font-size: 10px;
                }

                .progress-track {
                    height: 6px;
                    overflow: hidden;
                    border-radius: 10px;
                    background: #E9EDF2;
                }

                .progress-value {
                    height: 100%;
                    border-radius: inherit;
                    background: var(--primary);
                    transition: width .3s ease;
                }

                .status-content p {
                    margin: 8px 0 0;
                    color: #98A2B3;
                    font-size: 9px;
                    line-height: 1.5;
                }

                /* ================= HELP ================= */

                .help-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    background: #F8FAFD;
                }

                .help-icon {
                    width: 30px;
                    height: 30px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .help-card h3 {
                    margin: 1px 0 5px;
                    font-size: 11px;
                }

                .help-card p {
                    margin: 0;
                    color: #718096;
                    font-size: 9px;
                    line-height: 1.55;
                }

                /* ================= SPINNER ================= */

                .spinner {
                    width: 13px;
                    height: 13px;
                    border: 2px solid rgba(255,255,255,.4);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* ================= RESPONSIVE ================= */

                @media (max-width: 1050px) {
                    .content-grid {
                        grid-template-columns: 1fr;
                    }

                    .side-column {
                        position: static;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 800px) {
                    .edit-page {
                        padding: 20px 15px;
                    }

                    .side-column {
                        grid-template-columns: 1fr;
                    }

                    .document-summary {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .version-badge {
                        align-self: flex-start;
                    }
                }

                @media (max-width: 600px) {
                    .header-left h1 {
                        font-size: 22px;
                    }

                    .header-left p {
                        font-size: 11px;
                    }

                    .summary-main {
                        align-items: flex-start;
                    }

                    .summary-main h2 {
                        max-width: 240px;
                    }

                    .summary-meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 5px;
                    }

                    .card-heading {
                        padding: 15px;
                    }

                    .form-body,
                    .versions-body {
                        padding: 15px;
                    }

                    .version-header {
                        align-items: flex-start;
                    }

                    .existing-file,
                    .selected-file {
                        flex-wrap: wrap;
                    }

                    .file-actions {
                        width: 100%;
                        margin-top: 3px;
                    }

                    .preview-btn,
                    .remove-btn {
                        flex: 1;
                        justify-content: center;
                    }
                }

                @media (max-width: 420px) {
                    .edit-page {
                        padding: 16px 11px;
                    }

                    .back-button {
                        width: 36px;
                        height: 36px;
                    }

                    .document-summary {
                        padding: 13px;
                    }

                    .summary-icon {
                        width: 38px;
                        height: 38px;
                    }

                    .version-card {
                        padding: 11px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}