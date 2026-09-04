import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    UserPlus,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Info,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.users.store'));
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout title="New Reader Account">

            <div className="create-reader-page">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="page-header">

                    <div>

                        <Link
                            href={route('admin.users.index')}
                            className="back-link"
                        >
                            <ArrowLeft size={16} />
                            Back to Reader Accounts
                        </Link>

                        <div className="page-heading">

                            <div className="heading-icon">
                                <UserPlus
                                    size={24}
                                    strokeWidth={2}
                                />
                            </div>

                            <div>
                                <h1>New Reader Account</h1>

                                <p>
                                    Create an account for a reader to access
                                    the document library.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    ERROR MESSAGE
                ====================================================== */}

                {hasErrors && (
                    <div className="error-alert">

                        <div className="error-alert-icon">
                            <Info size={17} />
                        </div>

                        <div>
                            <strong>
                                Please check the form
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
                    MAIN CONTENT
                ====================================================== */}

                <div className="create-layout">

                    {/* =================================================
                        FORM
                    ================================================== */}

                    <div className="form-card">

                        <div className="form-card-header">

                            <div>
                                <h2>Account Details</h2>

                                <p>
                                    Enter the reader's information below.
                                </p>
                            </div>

                            <div className="header-badge">
                                <User size={14} />
                                Reader
                            </div>

                        </div>

                        <form onSubmit={submit}>

                            {/* =========================================
                                NAME
                            ========================================== */}

                            <div className="form-group">

                                <label htmlFor="name">
                                    Full Name
                                    <span>*</span>
                                </label>

                                <div
                                    className={`input-wrapper ${
                                        errors.name ? 'has-error' : ''
                                    }`}
                                >
                                    <User
                                        size={17}
                                        className="input-icon"
                                    />

                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter full name"
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                    />

                                    {data.name &&
                                        !errors.name && (
                                            <CheckCircle2
                                                size={16}
                                                className="valid-icon"
                                            />
                                        )}
                                </div>

                                {errors.name && (
                                    <p className="field-error">
                                        {errors.name}
                                    </p>
                                )}

                            </div>

                            {/* =========================================
                                EMAIL
                            ========================================== */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email Address
                                    <span>*</span>
                                </label>

                                <div
                                    className={`input-wrapper ${
                                        errors.email ? 'has-error' : ''
                                    }`}
                                >
                                    <Mail
                                        size={17}
                                        className="input-icon"
                                    />

                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="reader@example.com"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                    />

                                    {data.email &&
                                        !errors.email && (
                                            <CheckCircle2
                                                size={16}
                                                className="valid-icon"
                                            />
                                        )}
                                </div>

                                {errors.email && (
                                    <p className="field-error">
                                        {errors.email}
                                    </p>
                                )}

                            </div>

                            {/* =========================================
                                PASSWORD
                            ========================================== */}

                            <div className="form-group">

                                <label htmlFor="password">
                                    Password
                                    <span>*</span>
                                </label>

                                <div
                                    className={`input-wrapper ${
                                        errors.password
                                            ? 'has-error'
                                            : ''
                                    }`}
                                >

                                    <Lock
                                        size={17}
                                        className="input-icon"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        id="password"
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>

                                </div>

                                {errors.password ? (
                                    <p className="field-error">
                                        {errors.password}
                                    </p>
                                ) : (
                                    <p className="field-help">
                                        Create a secure password and share it
                                        with the reader directly.
                                    </p>
                                )}

                            </div>

                            {/* =========================================
                                PASSWORD NOTICE
                            ========================================== */}

                            <div className="password-notice">

                                <div className="notice-icon">
                                    <ShieldCheck size={17} />
                                </div>

                                <div>
                                    <strong>Password responsibility</strong>

                                    <p>
                                        This account does not use self
                                        registration or password-reset
                                        emails. Make sure the reader receives
                                        their login credentials securely.
                                    </p>
                                </div>

                            </div>

                            {/* =========================================
                                BUTTONS
                            ========================================== */}

                            <div className="form-actions">

                                <Link
                                    href={route(
                                        'admin.users.index'
                                    )}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={17} />
                                            Create Reader Account
                                        </>
                                    )}
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* =================================================
                        SIDE INFORMATION
                    ================================================== */}

                    <aside className="information-column">

                        {/* ACCOUNT PREVIEW */}

                        <div className="info-card preview-card">

                            <div className="info-card-header">

                                <div className="info-card-icon">
                                    <User size={17} />
                                </div>

                                <div>
                                    <h3>Account Preview</h3>
                                    <p>
                                        Reader account
                                    </p>
                                </div>

                            </div>

                            <div className="preview-profile">

                                <div className="preview-avatar">
                                    {data.name
                                        ? data.name
                                              .split(' ')
                                              .map(
                                                  (word) =>
                                                      word.charAt(0)
                                              )
                                              .slice(0, 2)
                                              .join('')
                                              .toUpperCase()
                                        : 'U'}
                                </div>

                                <div className="preview-details">

                                    <strong>
                                        {data.name ||
                                            'Reader Name'}
                                    </strong>

                                    <span>
                                        {data.email ||
                                            'reader@example.com'}
                                    </span>

                                </div>

                            </div>

                            <div className="preview-status">

                                <span className="status-dot" />

                                <span>
                                    Reader access
                                </span>

                            </div>

                        </div>

                        {/* ACCESS INFORMATION */}

                        <div className="info-card">

                            <div className="info-card-header">

                                <div className="info-card-icon">
                                    <ShieldCheck size={17} />
                                </div>

                                <div>
                                    <h3>Reader Access</h3>
                                    <p>
                                        What this account can do
                                    </p>
                                </div>

                            </div>

                            <div className="permission-list">

                                <div className="permission-item">
                                    <CheckCircle2 size={15} />
                                    <span>
                                        Log in to the portal
                                    </span>
                                </div>

                                <div className="permission-item">
                                    <CheckCircle2 size={15} />
                                    <span>
                                        Browse available documents
                                    </span>
                                </div>

                                <div className="permission-item">
                                    <CheckCircle2 size={15} />
                                    <span>
                                        View document versions
                                    </span>
                                </div>

                                <div className="permission-item">
                                    <CheckCircle2 size={15} />
                                    <span>
                                        Access supported languages
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* HELP */}

                        <div className="help-card">

                            <div className="help-icon">
                                <Info size={17} />
                            </div>

                            <div>
                                <strong>
                                    Need to manage accounts?
                                </strong>

                                <p>
                                    You can edit or remove reader accounts
                                    later from the Reader Accounts page.
                                </p>

                                <Link
                                    href={route(
                                        'admin.users.index'
                                    )}
                                >
                                    Manage Readers →
                                </Link>
                            </div>

                        </div>

                    </aside>

                </div>

            </div>

            {/* =========================================================
                STYLES
            ========================================================== */}

            <style>{`

                .create-reader-page {
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

                /* =====================================================
                   HEADER
                ====================================================== */

                .page-header {
                    margin-bottom: 24px;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    margin-bottom: 14px;

                    color: #667085;

                    text-decoration: none;

                    font-size: 12px;
                    font-weight: 600;

                    transition: .2s ease;
                }

                .back-link:hover {
                    color: var(--primary);
                }

                .page-heading {
                    display: flex;
                    align-items: center;

                    gap: 15px;
                }

                .heading-icon {
                    width: 48px;
                    height: 48px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 13px;

                    background: #EAF1FC;

                    color: var(--primary);
                }

                .page-heading h1 {
                    margin: 0;

                    color: var(--text);

                    font-size: 26px;
                    font-weight: 750;

                    letter-spacing: -.5px;
                }

                .page-heading p {
                    margin: 4px 0 0;

                    color: var(--muted);

                    font-size: 14px;
                }

                /* =====================================================
                   ERROR
                ====================================================== */

                .error-alert {
                    display: flex;
                    align-items: flex-start;

                    gap: 11px;

                    padding: 14px 16px;

                    margin-bottom: 20px;

                    border: 1px solid #F0C9CE;

                    border-radius: 12px;

                    background: #FFF6F7;

                    color: #A83D48;
                }

                .error-alert-icon {
                    width: 30px;
                    height: 30px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 8px;

                    background: #FCE3E6;
                }

                .error-alert strong {
                    display: block;

                    margin-top: 2px;

                    font-size: 12px;
                }

                .error-alert ul {
                    margin: 5px 0 0;
                    padding-left: 17px;
                }

                .error-alert li {
                    margin: 2px 0;

                    font-size: 11px;
                }

                /* =====================================================
                   LAYOUT
                ====================================================== */

                .create-layout {
                    display: grid;

                    grid-template-columns:
                        minmax(0, 1fr) 300px;

                    gap: 20px;

                    max-width: 1100px;
                }

                /* =====================================================
                   FORM CARD
                ====================================================== */

                .form-card {
                    overflow: hidden;

                    background: white;

                    border: 1px solid var(--border);

                    border-radius: 15px;

                    box-shadow:
                        0 3px 12px
                        rgba(20, 30, 50, .035);
                }

                .form-card-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 15px;

                    padding: 20px 22px;

                    border-bottom: 1px solid var(--border);
                }

                .form-card-header h2 {
                    margin: 0;

                    color: var(--text);

                    font-size: 16px;
                    font-weight: 700;
                }

                .form-card-header p {
                    margin: 4px 0 0;

                    color: var(--muted);

                    font-size: 11px;
                }

                .header-badge {
                    display: inline-flex;
                    align-items: center;

                    gap: 5px;

                    padding: 6px 9px;

                    border-radius: 7px;

                    background: #EEF4FC;

                    color: #5275A6;

                    font-size: 10px;
                    font-weight: 700;
                }

                .form-card form {
                    padding: 24px 22px;
                }

                /* =====================================================
                   FORM GROUP
                ====================================================== */

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;

                    margin-bottom: 7px;

                    color: #344054;

                    font-size: 12px;

                    font-weight: 700;
                }

                .form-group label span {
                    margin-left: 3px;

                    color: #D14B58;
                }

                .input-wrapper {
                    position: relative;

                    display: flex;
                    align-items: center;

                    width: 100%;
                    height: 44px;

                    border: 1px solid #DCE2EA;

                    border-radius: 9px;

                    background: #FAFBFC;

                    transition: .2s ease;
                }

                .input-wrapper:focus-within {
                    border-color: var(--primary);

                    background: white;

                    box-shadow:
                        0 0 0 3px
                        rgba(93, 137, 200, .10);
                }

                .input-wrapper.has-error {
                    border-color: #D97882;

                    background: #FFF9FA;
                }

                .input-icon {
                    flex: 0 0 auto;

                    margin-left: 13px;

                    color: #98A2B3;
                }

                .input-wrapper:focus-within .input-icon {
                    color: var(--primary);
                }

                .input-wrapper input {
                    width: 100%;
                    height: 100%;

                    padding: 0 12px;

                    border: none;
                    outline: none;

                    background: transparent;

                    color: var(--text);

                    font-size: 13px;
                }

                .input-wrapper input::placeholder {
                    color: #A5ADBA;
                }

                .valid-icon {
                    flex: 0 0 auto;

                    margin-right: 13px;

                    color: #31945A;
                }

                .password-toggle {
                    width: 40px;
                    height: 100%;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: none;

                    background: transparent;

                    color: #98A2B3;

                    cursor: pointer;
                }

                .password-toggle:hover {
                    color: var(--primary);
                }

                .field-error {
                    margin: 6px 0 0;

                    color: #C54855;

                    font-size: 10px;
                }

                .field-help {
                    margin: 6px 0 0;

                    color: #98A2B3;

                    font-size: 10px;

                    line-height: 1.5;
                }

                /* =====================================================
                   NOTICE
                ====================================================== */

                .password-notice {
                    display: flex;
                    align-items: flex-start;

                    gap: 10px;

                    padding: 13px;

                    margin-top: 2px;
                    margin-bottom: 24px;

                    border: 1px solid #DDE8F6;

                    border-radius: 10px;

                    background: #F7FAFE;
                }

                .notice-icon {
                    width: 31px;
                    height: 31px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 8px;

                    background: #E5EFFB;

                    color: var(--primary);
                }

                .password-notice strong {
                    display: block;

                    color: #385C8C;

                    font-size: 11px;
                }

                .password-notice p {
                    margin: 3px 0 0;

                    color: #6C7E96;

                    font-size: 10px;

                    line-height: 1.6;
                }

                /* =====================================================
                   FORM ACTIONS
                ====================================================== */

                .form-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    gap: 8px;

                    padding-top: 20px;

                    border-top: 1px solid #F0F2F5;
                }

                .cancel-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    height: 40px;

                    padding: 0 15px;

                    border: 1px solid #DCE2EA;

                    border-radius: 8px;

                    background: white;

                    color: #667085;

                    text-decoration: none;

                    font-size: 11px;
                    font-weight: 650;
                }

                .cancel-btn:hover {
                    background: #F8F9FB;

                    color: #526581;
                }

                .submit-btn {
                    height: 40px;

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    gap: 7px;

                    padding: 0 16px;

                    border: none;

                    border-radius: 8px;

                    background: var(--primary);

                    color: white;

                    font-size: 11px;
                    font-weight: 700;

                    cursor: pointer;

                    box-shadow:
                        0 4px 10px
                        rgba(93, 137, 200, .18);

                    transition: .2s ease;
                }

                .submit-btn:hover:not(:disabled) {
                    background: var(--primary-dark);

                    transform: translateY(-1px);
                }

                .submit-btn:disabled {
                    opacity: .65;

                    cursor: not-allowed;
                }

                .spinner {
                    width: 14px;
                    height: 14px;

                    border: 2px solid
                        rgba(255,255,255,.35);

                    border-top-color: white;

                    border-radius: 50%;

                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* =====================================================
                   SIDEBAR
                ====================================================== */

                .information-column {
                    display: flex;
                    flex-direction: column;

                    gap: 16px;
                }

                .info-card {
                    padding: 18px;

                    background: white;

                    border: 1px solid var(--border);

                    border-radius: 14px;

                    box-shadow:
                        0 3px 12px
                        rgba(20, 30, 50, .035);
                }

                .info-card-header {
                    display: flex;
                    align-items: center;

                    gap: 9px;

                    padding-bottom: 13px;

                    margin-bottom: 14px;

                    border-bottom: 1px solid #F0F2F5;
                }

                .info-card-icon {
                    width: 33px;
                    height: 33px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 8px;

                    background: #EDF3FC;

                    color: var(--primary);
                }

                .info-card-header h3 {
                    margin: 0;

                    color: var(--text);

                    font-size: 12px;
                    font-weight: 700;
                }

                .info-card-header p {
                    margin: 2px 0 0;

                    color: #98A2B3;

                    font-size: 9px;
                }

                /* =====================================================
                   PREVIEW
                ====================================================== */

                .preview-profile {
                    display: flex;
                    align-items: center;

                    gap: 10px;
                }

                .preview-avatar {
                    width: 45px;
                    height: 45px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 12px;

                    background:
                        linear-gradient(
                            135deg,
                            #EAF1FC,
                            #DCE9F8
                        );

                    color: var(--primary-dark);

                    font-size: 13px;
                    font-weight: 800;
                }

                .preview-details {
                    min-width: 0;
                }

                .preview-details strong {
                    display: block;

                    overflow: hidden;

                    color: var(--text);

                    font-size: 12px;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                .preview-details span {
                    display: block;

                    margin-top: 3px;

                    overflow: hidden;

                    color: #98A2B3;

                    font-size: 9px;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                .preview-status {
                    display: flex;
                    align-items: center;

                    gap: 6px;

                    margin-top: 14px;

                    padding-top: 12px;

                    border-top: 1px solid #F0F2F5;

                    color: #667085;

                    font-size: 10px;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #3DAA68;
                }

                /* =====================================================
                   PERMISSIONS
                ====================================================== */

                .permission-list {
                    display: flex;
                    flex-direction: column;

                    gap: 11px;
                }

                .permission-item {
                    display: flex;
                    align-items: center;

                    gap: 8px;

                    color: #667085;

                    font-size: 10px;
                }

                .permission-item svg {
                    flex: 0 0 auto;

                    color: #31945A;
                }

                /* =====================================================
                   HELP
                ====================================================== */

                .help-card {
                    display: flex;
                    align-items: flex-start;

                    gap: 10px;

                    padding: 15px;

                    border: 1px solid #DDE8F6;

                    border-radius: 12px;

                    background: #F7FAFE;
                }

                .help-icon {
                    width: 30px;
                    height: 30px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 8px;

                    background: #E5EFFB;

                    color: var(--primary);
                }

                .help-card strong {
                    display: block;

                    color: #385C8C;

                    font-size: 10px;
                }

                .help-card p {
                    margin: 4px 0 7px;

                    color: #718096;

                    font-size: 9px;

                    line-height: 1.6;
                }

                .help-card a {
                    color: var(--primary-dark);

                    font-size: 9px;

                    font-weight: 700;

                    text-decoration: none;
                }

                .help-card a:hover {
                    text-decoration: underline;
                }

                /* =====================================================
                   RESPONSIVE
                ====================================================== */

                @media (max-width: 900px) {

                    .create-layout {
                        grid-template-columns: 1fr;
                    }

                    .information-column {
                        display: grid;

                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                    }

                    .help-card {
                        grid-column: 1 / -1;
                    }

                }

                @media (max-width: 700px) {

                    .create-reader-page {
                        padding: 18px 14px;
                    }

                    .page-heading h1 {
                        font-size: 22px;
                    }

                    .page-heading p {
                        font-size: 12px;
                    }

                    .heading-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .form-card-header {
                        align-items: flex-start;

                        flex-direction: column;
                    }

                    .information-column {
                        grid-template-columns: 1fr;
                    }

                }

                @media (max-width: 480px) {

                    .form-card form {
                        padding: 20px 16px;
                    }

                    .form-card-header {
                        padding: 17px 16px;
                    }

                    .form-actions {
                        flex-direction: column-reverse;
                    }

                    .cancel-btn,
                    .submit-btn {
                        width: 100%;
                    }

                }

            `}</style>

        </AdminLayout>
    );
}