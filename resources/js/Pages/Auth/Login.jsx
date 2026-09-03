import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        clearErrors();

        post('/login', {
            preserveScroll: true,
        });
    };

    // Determine whether the email error is an authentication error
    const isAuthenticationError =
        errors.email &&
        (
            errors.email.toLowerCase().includes('credentials') ||
            errors.email.toLowerCase().includes('password') ||
            errors.email.toLowerCase().includes('incorrect') ||
            errors.email.toLowerCase().includes('match our records')
        );

    return (
        <>
            <Head title="Sign In" />

            <div className="login-page">

                {/* =========================================
                    LEFT BRANDING PANEL
                ========================================= */}
                <div className="login-brand">

                    <div className="brand-content">

                        <div className="brand-logo">
                            <span>G</span>
                        </div>

                        <div className="brand-name">
                            GAF Rwanda
                        </div>

                        <h1>
                            Your documents,
                            <span> organized.</span>
                        </h1>

                        <p>
                            Securely access, manage and collaborate on your
                            organization's documents from one place.
                        </p>

                        <div className="brand-features">

                            <div className="feature">
                                <div className="feature-icon">✓</div>

                                <div>
                                    <strong>
                                        Secure document management
                                    </strong>

                                    <small>
                                        Keep important files protected and organized.
                                    </small>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">✓</div>

                                <div>
                                    <strong>
                                        Easy access
                                    </strong>

                                    <small>
                                        Find the documents you need quickly.
                                    </small>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">✓</div>

                                <div>
                                    <strong>
                                        Built for organizations
                                    </strong>

                                    <small>
                                        Simple collaboration for your team.
                                    </small>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="brand-footer">
                        © {new Date().getFullYear()} GAF Rwanda. All rights reserved.
                    </div>
                </div>


                {/* =========================================
                    LOGIN AREA
                ========================================= */}
                <div className="login-area">

                    <div className="login-container">

                        {/* Mobile logo */}
                        <div className="mobile-logo">

                            <div className="brand-logo">
                                <span>G</span>
                            </div>

                            <strong>
                                GAF Rwanda
                            </strong>

                        </div>


                        {/* Header */}
                        <div className="login-header">

                            <div className="welcome">
                                Welcome back
                            </div>

                            <h2>
                                Sign in to your account
                            </h2>

                            <p>
                                Enter your credentials to continue to the
                                document portal.
                            </p>

                        </div>


                        {/* =========================================
                            AUTHENTICATION ERROR
                        ========================================= */}
                        {isAuthenticationError && (
                            <div
                                className="alert alert-error"
                                role="alert"
                            >
                                <div className="alert-icon">
                                    !
                                </div>

                                <div className="alert-content">

                                    <strong>
                                        Sign in failed
                                    </strong>

                                    <p>
                                        {errors.email}
                                    </p>

                                </div>
                            </div>
                        )}


                        {/* Other errors */}
                        {Object.keys(errors).length > 0 &&
                            !isAuthenticationError &&
                            !errors.email &&
                            (
                                <div
                                    className="alert alert-error"
                                    role="alert"
                                >
                                    <div className="alert-icon">
                                        !
                                    </div>

                                    <div className="alert-content">

                                        <strong>
                                            Please check the form
                                        </strong>

                                        <p>
                                            Some information needs your attention.
                                        </p>

                                    </div>
                                </div>
                            )
                        }


                        {/* Status */}
                        {status && (
                            <div
                                className="alert alert-success"
                                role="status"
                            >
                                <div className="alert-icon">
                                    ✓
                                </div>

                                <div className="alert-content">
                                    <strong>
                                        Success
                                    </strong>

                                    <p>
                                        {status}
                                    </p>
                                </div>
                            </div>
                        )}


                        {/* =========================================
                            FORM
                        ========================================= */}
                        <form
                            onSubmit={submit}
                            className="login-form"
                        >

                            {/* EMAIL */}
                            <div className="form-group">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div
                                    className={`input-wrapper ${
                                        errors.email && !isAuthenticationError
                                            ? 'has-error'
                                            : ''
                                    }`}
                                >

                                    <span className="input-icon">

                                        <svg
                                            width="19"
                                            height="19"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="14"
                                                rx="2"
                                            />

                                            <path d="m3 7 9 6 9-6" />
                                        </svg>

                                    </span>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) => {
                                            setData('email', e.target.value);

                                            if (errors.email) {
                                                clearErrors('email');
                                            }
                                        }}
                                        className={
                                            errors.email &&
                                            !isAuthenticationError
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {/* Error icon */}
                                    {errors.email &&
                                        !isAuthenticationError && (
                                            <span className="input-error-icon">
                                                !
                                            </span>
                                        )}

                                </div>

                                {/* Email validation error */}
                                {errors.email &&
                                    !isAuthenticationError && (
                                        <div className="field-error">
                                            <span>!</span>
                                            {errors.email}
                                        </div>
                                    )}

                            </div>


                            {/* PASSWORD */}
                            <div className="form-group">

                                <div className="label-row">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                </div>

                                <div
                                    className={`input-wrapper ${
                                        errors.password
                                            ? 'has-error'
                                            : ''
                                    }`}
                                >

                                    <span className="input-icon">

                                        <svg
                                            width="19"
                                            height="19"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <rect
                                                x="4"
                                                y="10"
                                                width="16"
                                                height="11"
                                                rx="2"
                                            />

                                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                        </svg>

                                    </span>

                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => {
                                            setData(
                                                'password',
                                                e.target.value
                                            );

                                            if (errors.password) {
                                                clearErrors('password');
                                            }
                                        }}
                                        className={
                                            errors.password
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {errors.password && (
                                        <span className="input-error-icon">
                                            !
                                        </span>
                                    )}

                                </div>

                                {/* Password error */}
                                {errors.password && (
                                    <div className="field-error">
                                        <span>!</span>
                                        {errors.password}
                                    </div>
                                )}

                            </div>


                            {/* REMEMBER ME */}
                            <div className="form-options">

                                <label className="remember">

                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span className="custom-checkbox">
                                        {data.remember && '✓'}
                                    </span>

                                    <span>
                                        Remember me
                                    </span>

                                </label>

                            </div>


                            {/* LOGIN BUTTON */}
                            <button
                                type="submit"
                                className="login-button"
                                disabled={processing}
                            >

                                {processing ? (
                                    <>
                                        <span className="spinner"></span>

                                        <span>
                                            Signing in...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            Sign in
                                        </span>

                                        <span className="arrow">
                                            →
                                        </span>
                                    </>
                                )}

                            </button>

                        </form>


                        {/* SECURITY */}
                        <div className="login-security">

                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect
                                    x="4"
                                    y="10"
                                    width="16"
                                    height="11"
                                    rx="2"
                                />

                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                            </svg>

                            <span>
                                Your connection is secure and encrypted
                            </span>

                        </div>

                    </div>
                </div>
            </div>


            {/* =========================================
                STYLES
            ========================================= */}
            <style>{`

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family:
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                    background: #f6f8fb;
                    color: #172033;
                }

                .login-page {
                    min-height: 100vh;
                    display: flex;
                    background: #fff;
                }


                /* =========================================
                   BRAND
                ========================================= */

                .login-brand {
                    width: 48%;
                    min-height: 100vh;
                    padding: 55px 7%;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    position: relative;
                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 80% 15%,
                            rgba(93, 137, 200, .25),
                            transparent 32%
                        ),
                        linear-gradient(
                            145deg,
                            #315f99 0%,
                            #4e7fba 48%,
                            #5d89c8 100%
                        );
                }

                .login-brand::before {
                    content: "";

                    position: absolute;

                    width: 430px;
                    height: 430px;

                    border: 1px solid rgba(255,255,255,.12);

                    border-radius: 50%;

                    right: -200px;
                    bottom: -120px;
                }

                .login-brand::after {
                    content: "";

                    position: absolute;

                    width: 300px;
                    height: 300px;

                    border: 1px solid rgba(255,255,255,.08);

                    border-radius: 50%;

                    right: -80px;
                    bottom: -30px;
                }

                .brand-content,
                .brand-footer {
                    position: relative;
                    z-index: 2;
                }

                .brand-logo {
                    width: 52px;
                    height: 52px;

                    border-radius: 15px;

                    background: rgba(255,255,255,.16);

                    border: 1px solid rgba(255,255,255,.22);

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    color: white;

                    font-size: 25px;
                    font-weight: 800;

                    box-shadow: 0 10px 30px rgba(0,0,0,.12);
                }

                .brand-name {
                    margin-top: 15px;

                    color: white;

                    font-size: 19px;
                    font-weight: 700;

                    letter-spacing: -.3px;
                }

                .brand-content h1 {
                    max-width: 550px;

                    margin: 105px 0 20px;

                    color: white;

                    font-size: clamp(42px, 4vw, 66px);

                    line-height: 1.02;

                    letter-spacing: -2.8px;

                    font-weight: 750;
                }

                .brand-content h1 span {
                    display: block;

                    color: rgba(255,255,255,.72);
                }

                .brand-content > p {
                    max-width: 510px;

                    color: rgba(255,255,255,.78);

                    font-size: 16px;

                    line-height: 1.75;

                    margin-bottom: 45px;
                }

                .brand-features {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .feature {
                    display: flex;

                    align-items: flex-start;

                    gap: 14px;

                    color: white;
                }

                .feature-icon {
                    width: 27px;
                    height: 27px;

                    border-radius: 50%;

                    background: rgba(255,255,255,.16);

                    display: flex;

                    justify-content: center;
                    align-items: center;

                    font-size: 13px;

                    flex-shrink: 0;
                }

                .feature strong {
                    display: block;

                    font-size: 14px;

                    margin-bottom: 3px;
                }

                .feature small {
                    color: rgba(255,255,255,.62);

                    font-size: 12px;
                }

                .brand-footer {
                    color: rgba(255,255,255,.55);

                    font-size: 12px;
                }


                /* =========================================
                   LOGIN AREA
                ========================================= */

                .login-area {
                    flex: 1;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding: 50px;
                }

                .login-container {
                    width: 100%;
                    max-width: 440px;
                }

                .mobile-logo {
                    display: none;
                }

                .login-header {
                    margin-bottom: 32px;
                }

                .welcome {
                    color: #5d89c8;

                    font-size: 13px;

                    font-weight: 700;

                    text-transform: uppercase;

                    letter-spacing: 1.2px;

                    margin-bottom: 9px;
                }

                .login-header h2 {
                    margin: 0 0 10px;

                    font-size: 31px;

                    line-height: 1.2;

                    letter-spacing: -1px;

                    color: #172033;
                }

                .login-header p {
                    margin: 0;

                    color: #7b8495;

                    font-size: 14px;

                    line-height: 1.6;
                }


                /* =========================================
                   ALERT
                ========================================= */

                .alert {
                    display: flex;

                    align-items: flex-start;

                    gap: 12px;

                    padding: 14px 15px;

                    border-radius: 12px;

                    margin-bottom: 24px;

                    font-size: 13px;

                    animation: alertIn .25s ease;
                }

                @keyframes alertIn {
                    from {
                        opacity: 0;
                        transform: translateY(-5px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .alert-error {
                    background: #fff4f4;

                    border: 1px solid #fecaca;

                    color: #b42318;
                }

                .alert-success {
                    background: #f0fdf4;

                    border: 1px solid #bbf7d0;

                    color: #15803d;
                }

                .alert-icon {
                    width: 23px;
                    height: 23px;

                    border-radius: 50%;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    font-weight: 800;

                    flex-shrink: 0;

                    background: rgba(180,35,24,.09);
                }

                .alert-success .alert-icon {
                    background: rgba(21,128,61,.09);
                }

                .alert-content strong {
                    display: block;

                    font-size: 13px;

                    margin-bottom: 3px;
                }

                .alert-content p {
                    margin: 0;

                    font-size: 12px;

                    line-height: 1.5;
                }


                /* =========================================
                   FORM
                ========================================= */

                .login-form {
                    display: flex;

                    flex-direction: column;

                    gap: 22px;
                }

                .form-group {
                    display: flex;

                    flex-direction: column;
                }

                .form-group label {
                    font-size: 13px;

                    font-weight: 650;

                    color: #30394a;

                    margin-bottom: 8px;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;

                    left: 15px;
                    top: 50%;

                    transform: translateY(-50%);

                    color: #9ba4b3;

                    display: flex;

                    pointer-events: none;

                    z-index: 2;
                }

                .input-wrapper input {
                    width: 100%;

                    height: 52px;

                    border: 1px solid #dfe4eb;

                    border-radius: 11px;

                    outline: none;

                    background: #fbfcfd;

                    padding: 0 45px;

                    font-size: 14px;

                    color: #172033;

                    transition: .2s ease;
                }

                .input-wrapper input::placeholder {
                    color: #adb4c0;
                }

                .input-wrapper input:hover {
                    border-color: #c8d0dc;
                }

                .input-wrapper input:focus {
                    background: white;

                    border-color: #5d89c8;

                    box-shadow:
                        0 0 0 4px rgba(93,137,200,.11);
                }

                .input-wrapper.has-error input,
                .input-wrapper input.input-error {
                    border-color: #ef4444;

                    background: #fffafa;
                }

                .input-wrapper.has-error input:focus {
                    border-color: #ef4444;

                    box-shadow:
                        0 0 0 4px rgba(239,68,68,.10);
                }

                .input-error-icon {
                    position: absolute;

                    right: 15px;

                    top: 50%;

                    transform: translateY(-50%);

                    width: 20px;
                    height: 20px;

                    border-radius: 50%;

                    background: #ef4444;

                    color: white;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-size: 12px;

                    font-weight: 800;
                }

                .field-error {
                    display: flex;

                    align-items: center;

                    gap: 6px;

                    color: #dc2626;

                    font-size: 12px;

                    margin-top: 7px;

                    line-height: 1.4;
                }

                .field-error span {
                    width: 15px;
                    height: 15px;

                    border-radius: 50%;

                    background: #fee2e2;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-size: 10px;

                    font-weight: 800;

                    flex-shrink: 0;
                }


                /* =========================================
                   REMEMBER
                ========================================= */

                .form-options {
                    margin-top: -4px;
                }

                .remember {
                    display: inline-flex;

                    align-items: center;

                    gap: 9px;

                    cursor: pointer;

                    color: #667085;

                    font-size: 13px;

                    user-select: none;

                    position: relative;
                }

                .remember input {
                    position: absolute;

                    opacity: 0;

                    pointer-events: none;
                }

                .custom-checkbox {
                    width: 18px;
                    height: 18px;

                    border: 1.5px solid #cbd2dc;

                    border-radius: 5px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    color: white;

                    font-size: 11px;

                    font-weight: 800;

                    transition: .15s ease;
                }

                .remember input:checked + .custom-checkbox {
                    background: #5d89c8;

                    border-color: #5d89c8;
                }


                /* =========================================
                   BUTTON
                ========================================= */

                .login-button {
                    height: 53px;

                    border: 0;

                    border-radius: 11px;

                    background: #5d89c8;

                    color: white;

                    font-size: 14px;

                    font-weight: 700;

                    cursor: pointer;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 12px;

                    box-shadow:
                        0 10px 25px rgba(93,137,200,.24);

                    transition: .2s ease;
                }

                .login-button:hover:not(:disabled) {
                    background: #4d79b5;

                    transform: translateY(-1px);

                    box-shadow:
                        0 14px 30px rgba(93,137,200,.3);
                }

                .login-button:disabled {
                    opacity: .7;

                    cursor: not-allowed;

                    transform: none;
                }

                .arrow {
                    font-size: 20px;

                    line-height: 1;

                    transition: transform .2s ease;
                }

                .login-button:hover .arrow {
                    transform: translateX(3px);
                }

                .spinner {
                    width: 17px;
                    height: 17px;

                    border: 2px solid rgba(255,255,255,.35);

                    border-top-color: white;

                    border-radius: 50%;

                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }


                /* =========================================
                   SECURITY
                ========================================= */

                .login-security {
                    margin-top: 27px;

                    padding-top: 22px;

                    border-top: 1px solid #edf0f4;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 7px;

                    color: #98a1af;

                    font-size: 11px;
                }


                /* =========================================
                   RESPONSIVE
                ========================================= */

                @media (max-width: 900px) {

                    .login-brand {
                        width: 42%;

                        padding: 40px;
                    }

                    .brand-content h1 {
                        margin-top: 80px;

                        font-size: 42px;
                    }

                    .login-area {
                        padding: 35px;
                    }
                }


                @media (max-width: 700px) {

                    .login-page {
                        display: block;

                        min-height: 100vh;
                    }

                    .login-brand {
                        display: none;
                    }

                    .login-area {
                        min-height: 100vh;

                        padding: 30px 22px;

                        align-items: center;
                    }

                    .mobile-logo {
                        display: flex;

                        align-items: center;

                        gap: 12px;

                        margin-bottom: 55px;

                        color: #172033;

                        font-size: 18px;
                    }

                    .mobile-logo .brand-logo {
                        width: 42px;
                        height: 42px;

                        border-radius: 12px;

                        background: #5d89c8;

                        border: 0;

                        font-size: 20px;
                    }

                    .login-header h2 {
                        font-size: 27px;
                    }
                }

            `}</style>
        </>
    );
}