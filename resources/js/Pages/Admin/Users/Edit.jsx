import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Info,
    CheckCircle2,
    UserRoundPen,
    KeyRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Edit({ user }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.update', user.id));
    };

    const initials = useMemo(() => {
        if (!data.name?.trim()) return 'U';

        return data.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
    }, [data.name]);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout title="Edit Reader Account">
            <div className="edit-user-page">

                {/* ================= HEADER ================= */}
                <div className="page-header">
                    <div className="header-left">
                        <Link
                            href={route('admin.users.index')}
                            className="back-button"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="eyebrow">
                                Reader Management
                            </div>

                            <h1>Edit Reader Account</h1>

                            <p>
                                Update the reader's account information and
                                password settings.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= ERROR MESSAGE ================= */}
                {hasErrors && (
                    <div className="error-alert">
                        <div className="error-icon">
                            <Info size={19} />
                        </div>

                        <div>
                            <strong>
                                Please check the information below
                            </strong>

                            <ul>
                                {Object.values(errors).map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* ================= MAIN CONTENT ================= */}
                <div className="content-grid">

                    {/* ================= FORM ================= */}
                    <div className="main-card">

                        <div className="card-header">
                            <div className="card-header-icon">
                                <UserRoundPen size={21} />
                            </div>

                            <div>
                                <h2>Account Information</h2>
                                <p>
                                    Update the reader's personal and login
                                    details.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit}>

                            {/* NAME */}
                            <div className="form-group">
                                <label htmlFor="name">
                                    Full Name
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">
                                    <User
                                        size={18}
                                        className="input-icon"
                                    />

                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        required
                                        autoComplete="name"
                                        placeholder="Enter full name"
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.name
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {data.name && !errors.name && (
                                        <CheckCircle2
                                            size={18}
                                            className="valid-icon"
                                        />
                                    )}
                                </div>

                                {errors.name && (
                                    <div className="field-error">
                                        {errors.name}
                                    </div>
                                )}

                                <div className="field-hint">
                                    The reader's full name as it should appear
                                    in the system.
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                    <span>*</span>
                                </label>

                                <div className="input-wrapper">
                                    <Mail
                                        size={18}
                                        className="input-icon"
                                    />

                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        required
                                        autoComplete="email"
                                        placeholder="reader@example.com"
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.email
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {data.email && !errors.email && (
                                        <CheckCircle2
                                            size={18}
                                            className="valid-icon"
                                        />
                                    )}
                                </div>

                                {errors.email && (
                                    <div className="field-error">
                                        {errors.email}
                                    </div>
                                )}

                                <div className="field-hint">
                                    This email address will be used to sign in.
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="password-section">
                                <div className="section-title">
                                    <KeyRound size={18} />
                                    <span>Password</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        New Password
                                    </label>

                                    <div className="input-wrapper">
                                        <Lock
                                            size={18}
                                            className="input-icon"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            placeholder="Leave blank to keep current password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.password
                                                    ? 'input-error'
                                                    : ''
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
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <div className="field-error">
                                            {errors.password}
                                        </div>
                                    )}

                                    <div className="field-hint">
                                        Leave this field blank if you do not
                                        want to change the current password.
                                    </div>
                                </div>

                                <div className="password-notice">
                                    <div className="notice-icon">
                                        <ShieldCheck size={19} />
                                    </div>

                                    <div>
                                        <strong>Password security</strong>
                                        <p>
                                            Only enter a new password when you
                                            need to replace the existing one.
                                            Never share passwords publicly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="form-actions">
                                <Link
                                    href={route('admin.users.index')}
                                    className="cancel-button"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="save-button"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ================= SIDEBAR ================= */}
                    <aside className="sidebar">

                        {/* ACCOUNT PREVIEW */}
                        <div className="side-card preview-card">
                            <div className="side-card-header">
                                <div className="side-icon">
                                    <User size={19} />
                                </div>

                                <div>
                                    <h3>Account Preview</h3>
                                    <p>Current reader information</p>
                                </div>
                            </div>

                            <div className="profile-preview">
                                <div className="avatar">
                                    {initials}
                                </div>

                                <div className="profile-info">
                                    <h4>
                                        {data.name || 'Reader Name'}
                                    </h4>

                                    <span>
                                        {data.email ||
                                            'reader@example.com'}
                                    </span>
                                </div>
                            </div>

                            <div className="account-status">
                                <span className="status-dot"></span>

                                <span>Reader Account</span>
                            </div>
                        </div>

                        {/* PERMISSIONS */}
                        <div className="side-card">
                            <div className="side-card-header">
                                <div className="side-icon">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <h3>Access Level</h3>
                                    <p>Account permissions</p>
                                </div>
                            </div>

                            <div className="permission">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>Reader</strong>
                                    <span>
                                        Can access published documents
                                    </span>
                                </div>
                            </div>

                            <div className="permission">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>Document Viewing</strong>
                                    <span>
                                        Can view available document versions
                                    </span>
                                </div>
                            </div>

                            <div className="permission disabled">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>Administration</strong>
                                    <span>
                                        No administrative privileges
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* INFORMATION */}
                        <div className="info-card">
                            <div className="info-card-icon">
                                <Info size={19} />
                            </div>

                            <div>
                                <h3>Important</h3>

                                <p>
                                    Changes to the email address may affect
                                    how this reader signs in. If you change
                                    their password, make sure they receive the
                                    new password securely.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`
                .edit-user-page {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --surface: #FFFFFF;
                    --background: #F6F8FB;
                    --danger: #DC5A5A;
                    --success: #2E9B68;

                    min-height: 100%;
                    padding: 4px 0 40px;
                    color: var(--ink);
                }

                /* HEADER */

                .page-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 26px;
                }

                .header-left {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }

                .back-button {
                    width: 42px;
                    height: 42px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: #fff;
                    color: #526174;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: .2s ease;
                    flex-shrink: 0;
                }

                .back-button:hover {
                    color: var(--blue);
                    border-color: #C9D9EE;
                    background: var(--blue-light);
                    transform: translateX(-2px);
                }

                .eyebrow {
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .09em;
                    color: var(--blue);
                    margin-bottom: 5px;
                }

                .page-header h1 {
                    margin: 0;
                    font-size: 27px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -.025em;
                    color: var(--ink);
                }

                .page-header p {
                    margin: 7px 0 0;
                    color: var(--muted);
                    font-size: 14px;
                }

                /* ERROR */

                .error-alert {
                    display: flex;
                    gap: 12px;
                    padding: 15px 17px;
                    margin-bottom: 22px;
                    border: 1px solid #F0C8C8;
                    background: #FFF7F7;
                    border-radius: 13px;
                    color: #8D3535;
                }

                .error-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: #FBE2E2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .error-alert strong {
                    display: block;
                    font-size: 13px;
                    margin-bottom: 5px;
                }

                .error-alert ul {
                    margin: 0;
                    padding-left: 17px;
                    font-size: 13px;
                }

                .error-alert li {
                    margin-top: 3px;
                }

                /* GRID */

                .content-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 340px;
                    gap: 22px;
                    align-items: start;
                }

                /* MAIN CARD */

                .main-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    box-shadow: 0 5px 20px rgba(24, 43, 70, .045);
                    overflow: hidden;
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 23px 25px;
                    border-bottom: 1px solid var(--border);
                }

                .card-header-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card-header h2 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 750;
                }

                .card-header p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 12px;
                }

                .main-card form {
                    padding: 25px;
                }

                /* FORM */

                .form-group {
                    margin-bottom: 22px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #303C4D;
                }

                .form-group label span {
                    color: var(--danger);
                    margin-left: 3px;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-wrapper input {
                    width: 100%;
                    height: 48px;
                    border: 1px solid #DCE2EA;
                    border-radius: 11px;
                    background: #fff;
                    padding: 0 45px 0 43px;
                    font-size: 14px;
                    color: var(--ink);
                    outline: none;
                    transition: .2s ease;
                    box-sizing: border-box;
                }

                .input-wrapper input::placeholder {
                    color: #A5AFBD;
                }

                .input-wrapper input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .12);
                }

                .input-icon {
                    position: absolute;
                    left: 14px;
                    color: #8995A5;
                    pointer-events: none;
                    z-index: 2;
                }

                .valid-icon {
                    position: absolute;
                    right: 14px;
                    color: var(--success);
                    pointer-events: none;
                }

                .input-error {
                    border-color: #E09A9A !important;
                }

                .input-error:focus {
                    box-shadow: 0 0 0 3px rgba(220, 90, 90, .10) !important;
                }

                .field-error {
                    margin-top: 6px;
                    color: var(--danger);
                    font-size: 12px;
                    font-weight: 600;
                }

                .field-hint {
                    margin-top: 7px;
                    color: #8994A4;
                    font-size: 11.5px;
                    line-height: 1.5;
                }

                /* PASSWORD */

                .password-section {
                    padding-top: 5px;
                    margin-top: 4px;
                    border-top: 1px solid var(--border);
                }

                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 22px 0 17px;
                    font-size: 13px;
                    font-weight: 800;
                    color: #3B4657;
                }

                .section-title svg {
                    color: var(--blue);
                }

                .password-toggle {
                    position: absolute;
                    right: 8px;
                    width: 35px;
                    height: 35px;
                    border: 0;
                    border-radius: 8px;
                    background: transparent;
                    color: #7B8796;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .password-toggle:hover {
                    color: var(--blue);
                    background: var(--blue-light);
                }

                .password-notice {
                    display: flex;
                    gap: 11px;
                    padding: 13px 14px;
                    border: 1px solid #DDE8F6;
                    background: #F5F8FD;
                    border-radius: 11px;
                    margin-top: 5px;
                }

                .notice-icon {
                    width: 31px;
                    height: 31px;
                    border-radius: 8px;
                    background: #E5EFFB;
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .password-notice strong {
                    font-size: 12px;
                    display: block;
                    margin-bottom: 3px;
                    color: #344155;
                }

                .password-notice p {
                    margin: 0;
                    color: #718096;
                    font-size: 11.5px;
                    line-height: 1.55;
                }

                /* ACTIONS */

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    border-top: 1px solid var(--border);
                    padding-top: 21px;
                    margin-top: 25px;
                }

                .cancel-button,
                .save-button {
                    min-height: 44px;
                    padding: 0 17px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: .2s ease;
                }

                .cancel-button {
                    border: 1px solid #DCE2EA;
                    background: #fff;
                    color: #566375;
                }

                .cancel-button:hover {
                    background: #F7F9FB;
                    border-color: #C8D0DA;
                }

                .save-button {
                    border: 1px solid var(--blue);
                    background: var(--blue);
                    color: #fff;
                    box-shadow: 0 5px 13px rgba(93, 137, 200, .22);
                }

                .save-button:hover:not(:disabled) {
                    background: var(--blue-dark);
                    border-color: var(--blue-dark);
                    transform: translateY(-1px);
                }

                .save-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                .spinner {
                    width: 15px;
                    height: 15px;
                    border: 2px solid rgba(255,255,255,.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* SIDEBAR */

                .sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .side-card {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 19px;
                    box-shadow: 0 5px 20px rgba(24, 43, 70, .035);
                }

                .side-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #EEF1F5;
                }

                .side-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .side-card-header h3 {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 800;
                }

                .side-card-header p {
                    margin: 3px 0 0;
                    color: var(--muted);
                    font-size: 11px;
                }

                /* PROFILE */

                .profile-preview {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 0 14px;
                }

                .avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 13px;
                    background: linear-gradient(
                        135deg,
                        var(--blue),
                        #779DD0
                    );
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 15px;
                    box-shadow: 0 5px 12px rgba(93,137,200,.2);
                    flex-shrink: 0;
                }

                .profile-info {
                    min-width: 0;
                }

                .profile-info h4 {
                    margin: 0 0 4px;
                    font-size: 13px;
                    font-weight: 750;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .profile-info span {
                    display: block;
                    color: var(--muted);
                    font-size: 11px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .account-status {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 10px;
                    background: #F4FAF7;
                    border: 1px solid #D9EDE2;
                    border-radius: 9px;
                    color: #38805E;
                    font-size: 11px;
                    font-weight: 700;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #39A56F;
                }

                /* PERMISSIONS */

                .permission {
                    display: flex;
                    gap: 9px;
                    padding: 13px 0;
                    border-bottom: 1px solid #EEF1F5;
                }

                .permission:last-child {
                    border-bottom: 0;
                    padding-bottom: 1px;
                }

                .permission-check {
                    color: #49A373;
                    padding-top: 1px;
                }

                .permission strong {
                    display: block;
                    font-size: 11.5px;
                    color: #394558;
                    margin-bottom: 3px;
                }

                .permission span {
                    display: block;
                    color: #8994A4;
                    font-size: 10.5px;
                    line-height: 1.45;
                }

                .permission.disabled {
                    opacity: .6;
                }

                /* INFO */

                .info-card {
                    display: flex;
                    gap: 11px;
                    padding: 15px;
                    background: #F5F8FC;
                    border: 1px solid #DEE8F4;
                    border-radius: 14px;
                }

                .info-card-icon {
                    width: 31px;
                    height: 31px;
                    background: #E5EFFB;
                    color: var(--blue);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .info-card h3 {
                    margin: 0 0 5px;
                    font-size: 12px;
                    font-weight: 800;
                }

                .info-card p {
                    margin: 0;
                    color: #748195;
                    font-size: 10.8px;
                    line-height: 1.55;
                }

                /* RESPONSIVE */

                @media (max-width: 1000px) {
                    .content-grid {
                        grid-template-columns: 1fr;
                    }

                    .sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .info-card {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 700px) {
                    .edit-user-page {
                        padding-bottom: 25px;
                    }

                    .page-header {
                        margin-bottom: 20px;
                    }

                    .page-header h1 {
                        font-size: 22px;
                    }

                    .page-header p {
                        font-size: 12px;
                    }

                    .back-button {
                        width: 38px;
                        height: 38px;
                    }

                    .card-header {
                        padding: 18px;
                    }

                    .main-card form {
                        padding: 18px;
                    }

                    .sidebar {
                        display: flex;
                    }

                    .form-actions {
                        flex-direction: column-reverse;
                    }

                    .cancel-button,
                    .save-button {
                        width: 100%;
                    }
                }

                @media (max-width: 430px) {
                    .header-left {
                        gap: 10px;
                    }

                    .page-header h1 {
                        font-size: 20px;
                    }

                    .eyebrow {
                        font-size: 9px;
                    }

                    .card-header-icon {
                        width: 38px;
                        height: 38px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}