import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    UploadCloud,
    FileText,
    CheckCircle2,
    Languages,
    Info,
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

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        title: '',
        description: '',
        file_en: null,
        file_es: null,
        file_rw: null,
    });

    const [selectedFiles, setSelectedFiles] = useState({
        en: null,
        es: null,
        rw: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.documents.store'), {
            forceFormData: true,
        });
    };

    const handleFileChange = (code, file) => {
        setData(`file_${code}`, file || null);

        setSelectedFiles((prev) => ({
            ...prev,
            [code]: file || null,
        }));
    };

    const removeFile = (code) => {
        setData(`file_${code}`, null);

        setSelectedFiles((prev) => ({
            ...prev,
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

    return (
        <AdminLayout title="Upload Document">
            <div className="upload-page">

                {/* ================= HEADER ================= */}

                <div className="page-header">
                    <div className="header-left">
                        <Link
                            href={route('admin.documents.index')}
                            className="back-button"
                        >
                            <ArrowLeft size={17} />
                        </Link>

                        <div>
                            <h1>Upload Document</h1>
                            <p>
                                Add a new document and provide its available
                                language versions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= ERRORS ================= */}

                {Object.keys(errors).length > 0 && (
                    <div className="error-alert">
                        <div className="error-alert-icon">
                            !
                        </div>

                        <div>
                            <strong>
                                Please fix the following errors
                            </strong>

                            <ul>
                                {Object.values(errors).map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* ================= FORM ================= */}

                <form onSubmit={submit}>

                    <div className="content-grid">

                        {/* ================= LEFT COLUMN ================= */}

                        <div className="main-column">

                            {/* DOCUMENT DETAILS */}

                            <div className="form-card">
                                <div className="card-heading">
                                    <div className="heading-icon blue">
                                        <FileText size={19} />
                                    </div>

                                    <div>
                                        <h2>Document Details</h2>
                                        <p>
                                            Basic information about the
                                            document.
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
                                            type="text"
                                            id="title"
                                            placeholder="e.g. Annual Health Report 2026"
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

                                        <small className="field-hint">
                                            Use a clear and descriptive title
                                            that readers can easily recognize.
                                        </small>
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
                                            placeholder="Briefly describe what this document contains..."
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
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

                                        <small className="field-hint">
                                            A short description helps readers
                                            understand the document before
                                            opening it.
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* LANGUAGE VERSIONS */}

                            <div className="form-card">
                                <div className="card-heading">
                                    <div className="heading-icon purple">
                                        <Languages size={19} />
                                    </div>

                                    <div>
                                        <h2>Language Versions</h2>
                                        <p>
                                            Upload the PDF available for each
                                            language.
                                        </p>
                                    </div>
                                </div>

                                <div className="language-body">

                                    <div className="language-info">
                                        <Info size={16} />

                                        <p>
                                            Upload at least one PDF version.
                                            Additional language versions can
                                            be added or replaced later.
                                        </p>
                                    </div>

                                    <div className="language-grid">
                                        {LANGUAGES.map((language) => {
                                            const file =
                                                selectedFiles[language.code];

                                            const error =
                                                errors[
                                                    `file_${language.code}`
                                                ];

                                            return (
                                                <div
                                                    className={`language-card ${
                                                        file
                                                            ? 'has-file'
                                                            : ''
                                                    } ${
                                                        error
                                                            ? 'has-error'
                                                            : ''
                                                    }`}
                                                    key={language.code}
                                                >
                                                    <div className="language-card-header">
                                                        <div className="language-name">
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

                                                        {file && (
                                                            <CheckCircle2
                                                                size={19}
                                                                className="file-success"
                                                            />
                                                        )}
                                                    </div>

                                                    {!file ? (
                                                        <label className="file-dropzone">
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

                                                            <div className="upload-icon">
                                                                <UploadCloud
                                                                    size={24}
                                                                />
                                                            </div>

                                                            <strong>
                                                                Choose PDF
                                                                file
                                                            </strong>

                                                            <span>
                                                                PDF only
                                                            </span>
                                                        </label>
                                                    ) : (
                                                        <div className="selected-file">
                                                            <div className="selected-file-icon">
                                                                <FileText
                                                                    size={21}
                                                                />
                                                            </div>

                                                            <div className="selected-file-info">
                                                                <strong>
                                                                    {
                                                                        file.name
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {formatFileSize(
                                                                        file.size
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeFile(
                                                                        language.code
                                                                    )
                                                                }
                                                                className="remove-file"
                                                                title="Remove file"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
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
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN ================= */}

                        <aside className="side-column">

                            {/* PUBLISH CARD */}

                            <div className="side-card publish-card">
                                <div className="side-card-heading">
                                    <h3>Ready to upload?</h3>
                                    <p>
                                        Review your information before
                                        submitting.
                                    </p>
                                </div>

                                <div className="check-list">

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            Document title provided
                                        </span>
                                    </div>

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            At least one PDF required
                                        </span>
                                    </div>

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            Language versions supported
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud size={18} />
                                            Upload Document
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

                            {/* GUIDELINES */}

                            <div className="side-card guidelines-card">
                                <div className="guideline-icon">
                                    <Info size={18} />
                                </div>

                                <div>
                                    <h3>Upload guidelines</h3>

                                    <ul>
                                        <li>
                                            Files must be in PDF format.
                                        </li>

                                        <li>
                                            Upload at least one language
                                            version.
                                        </li>

                                        <li>
                                            Use meaningful document titles.
                                        </li>

                                        <li>
                                            You can add more languages later.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </aside>
                    </div>
                </form>
            </div>

            {/* ================= STYLES ================= */}

            <style>{`
                .upload-page {
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
                    margin-bottom: 25px;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .back-button {
                    width: 40px;
                    height: 40px;
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
                    border-color: #C7D5E8;
                    background: #F8FAFD;
                    color: var(--primary);
                }

                .header-left h1 {
                    margin: 0;
                    color: var(--text);
                    font-size: 26px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .header-left p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 13px;
                }

                /* ================= ERROR ================= */

                .error-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 22px;
                    padding: 15px 17px;
                    border: 1px solid #F1C9CE;
                    border-radius: 12px;
                    background: #FFF7F8;
                    color: #A93442;
                }

                .error-alert-icon {
                    width: 27px;
                    height: 27px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #FCE1E4;
                    font-weight: 800;
                }

                .error-alert strong {
                    font-size: 13px;
                }

                .error-alert ul {
                    margin: 6px 0 0;
                    padding-left: 18px;
                    font-size: 12px;
                    line-height: 1.6;
                }

                /* ================= GRID ================= */

                .content-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 310px;
                    gap: 20px;
                    align-items: start;
                    max-width: 1250px;
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
                    gap: 16px;
                    position: sticky;
                    top: 20px;
                }

                /* ================= CARDS ================= */

                .form-card,
                .side-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 15px;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .035);
                    overflow: hidden;
                }

                .card-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 19px 21px;
                    border-bottom: 1px solid var(--border);
                }

                .heading-icon {
                    width: 39px;
                    height: 39px;
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
                    font-size: 15px;
                    font-weight: 700;
                }

                .card-heading p {
                    margin: 3px 0 0;
                    color: var(--muted);
                    font-size: 11px;
                }

                .form-body {
                    padding: 22px;
                }

                /* ================= FORM ================= */

                .form-group {
                    margin-bottom: 20px;
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
                    font-size: 12px;
                    font-weight: 700;
                }

                .form-group label > span:first-of-type {
                    color: #D14B58;
                }

                .form-group label .optional {
                    margin-left: 5px;
                    color: #98A2B3;
                    font-size: 10px;
                    font-weight: 500;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #DCE2EA;
                    border-radius: 9px;
                    background: #FCFDFE;
                    color: var(--text);
                    font-family: inherit;
                    font-size: 13px;
                    outline: none;
                    transition: .2s ease;
                }

                .form-group input {
                    height: 43px;
                    padding: 0 12px;
                }

                .form-group textarea {
                    padding: 11px 12px;
                    resize: vertical;
                    line-height: 1.5;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--primary);
                    background: white;
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .10);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #A7AFBC;
                }

                .input-error {
                    border-color: #D14B58 !important;
                }

                .field-hint {
                    display: block;
                    margin-top: 6px;
                    color: #98A2B3;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .field-error {
                    display: block;
                    margin-top: 5px;
                    color: #D14B58;
                    font-size: 11px;
                }

                /* ================= LANGUAGE ================= */

                .language-body {
                    padding: 20px 21px 22px;
                }

                .language-info {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 11px 13px;
                    margin-bottom: 17px;
                    border-radius: 9px;
                    background: #F4F7FC;
                    color: #526581;
                }

                .language-info svg {
                    flex: 0 0 auto;
                    margin-top: 1px;
                }

                .language-info p {
                    margin: 0;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .language-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .language-card {
                    padding: 14px;
                    border: 1px solid #E3E7EE;
                    border-radius: 11px;
                    background: #FCFDFE;
                    transition: .2s ease;
                }

                .language-card:hover {
                    border-color: #CBD7E8;
                }

                .language-card.has-file {
                    border-color: #BFD7C8;
                    background: #FBFEFC;
                }

                .language-card.has-error {
                    border-color: #E5B5BB;
                }

                .language-card-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    margin-bottom: 13px;
                }

                .language-name {
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
                    font-size: 10px;
                    font-weight: 800;
                }

                .language-name strong {
                    display: block;
                    color: #344054;
                    font-size: 12px;
                }

                .language-name span {
                    display: block;
                    margin-top: 2px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .file-success {
                    color: #35A060;
                }

                /* ================= DROPZONE ================= */

                .file-dropzone {
                    min-height: 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 12px;
                    border: 1px dashed #CBD5E3;
                    border-radius: 9px;
                    background: #FAFBFD;
                    cursor: pointer;
                    text-align: center;
                    transition: .2s ease;
                }

                .file-dropzone:hover {
                    border-color: var(--primary);
                    background: #F6F9FE;
                }

                .file-dropzone input {
                    display: none;
                }

                .upload-icon {
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 7px;
                    border-radius: 9px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .file-dropzone strong {
                    color: #475467;
                    font-size: 11px;
                }

                .file-dropzone span {
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                /* ================= SELECTED FILE ================= */

                .selected-file {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-height: 65px;
                    padding: 9px;
                    border-radius: 9px;
                    background: #F4FAF6;
                }

                .selected-file-icon {
                    width: 34px;
                    height: 34px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #DFF2E5;
                    color: #31945A;
                }

                .selected-file-info {
                    min-width: 0;
                    flex: 1;
                }

                .selected-file-info strong {
                    display: block;
                    overflow: hidden;
                    color: #344054;
                    font-size: 10px;
                    font-weight: 650;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .selected-file-info span {
                    display: block;
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .remove-file {
                    width: 27px;
                    height: 27px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #E1E7E3;
                    border-radius: 7px;
                    background: white;
                    color: #98A2B3;
                    cursor: pointer;
                }

                .remove-file:hover {
                    border-color: #E5B5BB;
                    background: #FFF7F8;
                    color: #D14B58;
                }

                .file-error {
                    margin-top: 7px;
                    color: #D14B58;
                    font-size: 10px;
                }

                /* ================= SIDE ================= */

                .side-card {
                    padding: 20px;
                }

                .side-card-heading h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 15px;
                    font-weight: 700;
                }

                .side-card-heading p {
                    margin: 5px 0 17px;
                    color: var(--muted);
                    font-size: 11px;
                    line-height: 1.5;
                }

                .check-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 14px 0;
                    border-top: 1px solid #F0F2F5;
                    border-bottom: 1px solid #F0F2F5;
                }

                .check-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #667085;
                    font-size: 11px;
                }

                .check-item svg {
                    color: #35A060;
                }

                .submit-button {
                    width: 100%;
                    height: 43px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 17px;
                    border: none;
                    border-radius: 9px;
                    background: var(--primary);
                    color: white;
                    font-family: inherit;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(93, 137, 200, .18);
                    transition: .2s ease;
                }

                .submit-button:hover:not(:disabled) {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .submit-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                .cancel-button {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 7px;
                    border-radius: 9px;
                    color: #667085;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .cancel-button:hover {
                    background: #F6F8FB;
                }

                .spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,.45);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* ================= GUIDELINES ================= */

                .guidelines-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    background: #F8FAFD;
                }

                .guideline-icon {
                    width: 31px;
                    height: 31px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .guidelines-card h3 {
                    margin: 1px 0 9px;
                    color: #344054;
                    font-size: 12px;
                }

                .guidelines-card ul {
                    margin: 0;
                    padding-left: 15px;
                    color: #667085;
                    font-size: 10px;
                    line-height: 1.8;
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
                    .upload-page {
                        padding: 20px 15px;
                    }

                    .language-grid {
                        grid-template-columns: 1fr;
                    }

                    .side-column {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 520px) {
                    .header-left {
                        align-items: flex-start;
                    }

                    .header-left h1 {
                        font-size: 22px;
                    }

                    .header-left p {
                        font-size: 11px;
                    }

                    .back-button {
                        width: 36px;
                        height: 36px;
                    }

                    .form-body,
                    .language-body {
                        padding: 16px;
                    }

                    .card-heading {
                        padding: 16px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}