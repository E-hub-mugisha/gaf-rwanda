import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
    } = useForm({
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
                <div className="login-card">

                    {/* Logo */}
                    <div className="login-logo">
                        <span>G</span>
                    </div>

                    {/* Header */}
                    <div className="login-header">
                        <h1>Welcome back</h1>

                        <p>
                            Sign in to your GAF Rwanda account
                        </p>
                    </div>

                    {/* Authentication Error */}
                    {isAuthenticationError && (
                        <div className="alert alert-error" role="alert">
                            <div className="alert-icon">!</div>

                            <div className="alert-content">
                                <strong>Sign in failed</strong>

                                <p>{errors.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Other Errors */}
                    {Object.keys(errors).length > 0 &&
                        !isAuthenticationError &&
                        !errors.email && (
                            <div className="alert alert-error" role="alert">
                                <div className="alert-icon">!</div>

                                <div className="alert-content">
                                    <strong>Please check the form</strong>

                                    <p>
                                        Some information needs your attention.
                                    </p>
                                </div>
                            </div>
                        )}

                    {/* Success Status */}
                    {status && (
                        <div className="alert alert-success" role="status">
                            <div className="alert-icon">✓</div>

                            <div className="alert-content">
                                <strong>Success</strong>

                                <p>{status}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="login-form">

                        {/* Email */}
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
                                        width="18"
                                        height="18"
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

                                {errors.email &&
                                    !isAuthenticationError && (
                                        <span className="input-error-icon">
                                            !
                                        </span>
                                    )}
                            </div>

                            {errors.email &&
                                !isAuthenticationError && (
                                    <div className="field-error">
                                        <span>!</span>
                                        {errors.email}
                                    </div>
                                )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <div
                                className={`input-wrapper ${
                                    errors.password
                                        ? 'has-error'
                                        : ''
                                }`}
                            >
                                <span className="input-icon">
                                    <svg
                                        width="18"
                                        height="18"
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

                            {errors.password && (
                                <div className="field-error">
                                    <span>!</span>
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Remember Me */}
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

                                <span>Remember me</span>
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner"></span>

                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign in</span>
                            )}
                        </button>
                    </form>

                    {/* Security */}
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

                    {/* Footer */}
                    <div className="login-footer">
                        © {new Date().getFullYear()} GAF Rwanda
                    </div>

                </div>
            </div>

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

                    background: #f5f7fa;
                    color: #172033;
                }

                .login-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px 20px;
                    background: #f5f7fa;
                }

                .login-card {
                    width: 100%;
                    max-width: 430px;
                    background: #ffffff;
                    border: 1px solid #e8ecf1;
                    border-radius: 18px;
                    padding: 42px 40px 32px;
                    box-shadow:
                        0 20px 50px rgba(20, 35, 55, 0.08);
                }

                /* LOGO */

                .login-logo {
                    width: 52px;
                    height: 52px;
                    margin: 0 auto 24px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 14px;

                    background: #5d89c8;
                    color: white;

                    font-size: 23px;
                    font-weight: 800;

                    box-shadow:
                        0 8px 20px rgba(93, 137, 200, .22);
                }

                /* HEADER */

                .login-header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .login-header h1 {
                    margin: 0 0 9px;

                    color: #172033;

                    font-size: 28px;
                    line-height: 1.2;
                    letter-spacing: -.7px;
                    font-weight: 750;
                }

                .login-header p {
                    margin: 0;

                    color: #7b8495;

                    font-size: 14px;
                    line-height: 1.6;
                }

                /* ALERTS */

                .alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;

                    padding: 13px 14px;
                    margin-bottom: 22px;

                    border-radius: 10px;

                    font-size: 13px;
                }

                .alert-error {
                    background: #fff5f5;
                    border: 1px solid #fecaca;
                    color: #b42318;
                }

                .alert-success {
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    color: #15803d;
                }

                .alert-icon {
                    width: 22px;
                    height: 22px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: rgba(180, 35, 24, .09);

                    font-size: 12px;
                    font-weight: 800;
                }

                .alert-success .alert-icon {
                    background: rgba(21, 128, 61, .09);
                }

                .alert-content strong {
                    display: block;
                    margin-bottom: 3px;
                    font-size: 13px;
                }

                .alert-content p {
                    margin: 0;
                    font-size: 12px;
                    line-height: 1.5;
                }

                /* FORM */

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    margin-bottom: 8px;

                    color: #30394a;

                    font-size: 13px;
                    font-weight: 650;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;

                    transform: translateY(-50%);

                    display: flex;

                    color: #9ba4b3;

                    pointer-events: none;
                    z-index: 2;
                }

                .input-wrapper input {
                    width: 100%;
                    height: 50px;

                    border: 1px solid #dfe4eb;
                    border-radius: 10px;

                    outline: none;

                    background: #fbfcfd;

                    padding: 0 44px;

                    color: #172033;

                    font-size: 14px;

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
                        0 0 0 4px rgba(93, 137, 200, .10);
                }

                .input-wrapper input.input-error,
                .input-wrapper.has-error input {
                    border-color: #ef4444;
                    background: #fffafa;
                }

                .input-error-icon {
                    position: absolute;

                    right: 14px;
                    top: 50%;

                    transform: translateY(-50%);

                    width: 19px;
                    height: 19px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #ef4444;
                    color: white;

                    font-size: 11px;
                    font-weight: 800;
                }

                .field-error {
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    margin-top: 6px;

                    color: #dc2626;

                    font-size: 12px;
                    line-height: 1.4;
                }

                .field-error span {
                    width: 15px;
                    height: 15px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #fee2e2;

                    font-size: 10px;
                    font-weight: 800;
                }

                /* REMEMBER */

                .form-options {
                    margin-top: -2px;
                }

                .remember {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;

                    cursor: pointer;

                    color: #667085;

                    font-size: 13px;
                    user-select: none;
                }

                .remember input {
                    position: absolute;
                    opacity: 0;
                    pointer-events: none;
                }

                .custom-checkbox {
                    width: 18px;
                    height: 18px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: 1.5px solid #cbd2dc;
                    border-radius: 5px;

                    color: white;

                    font-size: 11px;
                    font-weight: 800;

                    transition: .15s ease;
                }

                .remember input:checked + .custom-checkbox {
                    background: #5d89c8;
                    border-color: #5d89c8;
                }

                /* BUTTON */

                .login-button {
                    width: 100%;
                    height: 50px;

                    border: 0;
                    border-radius: 10px;

                    background: #5d89c8;
                    color: white;

                    font-size: 14px;
                    font-weight: 700;

                    cursor: pointer;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;

                    box-shadow:
                        0 8px 20px rgba(93, 137, 200, .20);

                    transition: .2s ease;
                }

                .login-button:hover:not(:disabled) {
                    background: #4d79b5;

                    transform: translateY(-1px);

                    box-shadow:
                        0 11px 25px rgba(93, 137, 200, .25);
                }

                .login-button:active:not(:disabled) {
                    transform: translateY(0);
                }

                .login-button:disabled {
                    opacity: .7;
                    cursor: not-allowed;
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

                /* SECURITY */

                .login-security {
                    margin-top: 24px;
                    padding-top: 20px;

                    border-top: 1px solid #edf0f4;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;

                    color: #98a1af;

                    font-size: 11px;
                }

                /* FOOTER */

                .login-footer {
                    margin-top: 18px;

                    text-align: center;

                    color: #a0a8b5;

                    font-size: 11px;
                }

                /* RESPONSIVE */

                @media (max-width: 480px) {
                    .login-page {
                        padding: 20px 15px;
                    }

                    .login-card {
                        padding: 34px 24px 27px;
                        border-radius: 15px;
                        box-shadow:
                            0 12px 35px rgba(20, 35, 55, .07);
                    }

                    .login-header h1 {
                        font-size: 26px;
                    }
                }
            `}</style>
        </>
    );
}