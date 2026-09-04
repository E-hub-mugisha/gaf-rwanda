import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const translations = {
    rw: {
        language: "Ururimi",
        secureAccess: "KWINJIRA MU MUTEKANO",
        welcome: "Murakaza neza",
        subtitle:
            "Injira kugira ngo ubashe gukoresha konti yawe ya Guided Act & Feel Rwanda.",
        email: "Imeyili",
        emailPlaceholder: "urugero@example.com",
        password: "Ijambobanga",
        passwordPlaceholder: "Andika ijambobanga ryawe",
        remember: "Nyibuke",
        signIn: "Injira",
        signingIn: "Kwinjira...",
        signInFailed: "Kwinjira ntibyashobotse",
        checkForm: "Reba amakuru watanze",
        checkFormText: "Hari amakuru amwe agomba gukosorwa.",
        success: "Byagenze neza",
        secureConnection: "Uburyo bwo kwinjira buratekanye",
        encrypted: "Amakuru yawe ararinzwe kandi arabitswe mu mutekano.",
    },

    en: {
        language: "Language",
        secureAccess: "SECURE ACCESS",
        welcome: "Welcome back",
        subtitle: "Sign in to access your Guided Act & Feel Rwanda account.",
        email: "Email address",
        emailPlaceholder: "you@example.com",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        remember: "Remember me",
        signIn: "Sign in",
        signingIn: "Signing in...",
        signInFailed: "Sign in failed",
        checkForm: "Please check the form",
        checkFormText: "Some information needs your attention.",
        success: "Success",
        secureConnection: "Secure connection",
        encrypted: "Your information is encrypted and protected.",
    },

    fr: {
        language: "Langue",
        secureAccess: "ACCÈS SÉCURISÉ",
        welcome: "Bon retour",
        subtitle:
            "Connectez-vous pour accéder à votre compte Guided Act & Feel Rwanda.",
        email: "Adresse e-mail",
        emailPlaceholder: "vous@example.com",
        password: "Mot de passe",
        passwordPlaceholder: "Entrez votre mot de passe",
        remember: "Se souvenir de moi",
        signIn: "Se connecter",
        signingIn: "Connexion...",
        signInFailed: "Échec de la connexion",
        checkForm: "Veuillez vérifier le formulaire",
        checkFormText: "Certaines informations nécessitent votre attention.",
        success: "Succès",
        secureConnection: "Connexion sécurisée",
        encrypted: "Vos informations sont chiffrées et protégées.",
    },

    nl: {
        language: "Taal",
        secureAccess: "VEILIGE TOEGANG",
        welcome: "Welkom terug",
        subtitle:
            "Log in om toegang te krijgen tot uw Guided Act & Feel Rwanda-account.",
        email: "E-mailadres",
        emailPlaceholder: "u@example.com",
        password: "Wachtwoord",
        passwordPlaceholder: "Voer uw wachtwoord in",
        remember: "Onthoud mij",
        signIn: "Inloggen",
        signingIn: "Inloggen...",
        signInFailed: "Inloggen mislukt",
        checkForm: "Controleer het formulier",
        checkFormText: "Sommige informatie vereist uw aandacht.",
        success: "Succes",
        secureConnection: "Beveiligde verbinding",
        encrypted: "Uw gegevens zijn versleuteld en beschermd.",
    },
};

const languageNames = {
    rw: "Kinyarwanda",
    en: "English",
    fr: "Français",
    nl: "Nederlands",
};

export default function Login({ status }) {
    const [language, setLanguage] = useState(() => {
        if (typeof window === "undefined") {
            return "rw";
        }

        return localStorage.getItem("gaf_language") || "rw";
    });
    const [languageOpen, setLanguageOpen] = useState(false);

    const t = translations[language];

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        clearErrors();

        post("/login", {
            preserveScroll: true,
        });
    };

    const isAuthenticationError =
        errors.email &&
        (errors.email.toLowerCase().includes("credentials") ||
            errors.email.toLowerCase().includes("password") ||
            errors.email.toLowerCase().includes("incorrect") ||
            errors.email.toLowerCase().includes("match our records"));

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setLanguageOpen(false);
    };

    useEffect(() => {
        localStorage.setItem("gaf_language", language);
        document.documentElement.lang = language;
    }, [language]);

    return (
        <>
            <Head title={t.signIn} />

            <div className="login-page">
                {/* Background */}
                <div className="background-shape background-shape-one"></div>
                <div className="background-shape background-shape-two"></div>

                <main className="login-card">
                    {/* =========================================
                        TOP BAR
                    ========================================= */}

                    <div className="top-bar">
                        {/* Brand */}
                        <div className="brand">
                            <div className="logo-container">
                                <img
                                    src="/images/guided-logo.png"
                                    alt="Guided Act & Feel Rwanda"
                                />
                            </div>

                            <div className="brand-name">
                                <span>GAF</span>
                                <small>RWANDA</small>
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="language-wrapper">
                            <button
                                type="button"
                                className="language-button"
                                onClick={() => setLanguageOpen(!languageOpen)}
                                aria-label={t.language}
                                aria-expanded={languageOpen}
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M3 12h18" />
                                    <path d="M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
                                </svg>

                                <span>{language.toUpperCase()}</span>

                                <svg
                                    className={`chevron ${
                                        languageOpen ? "open" : ""
                                    }`}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {languageOpen && (
                                <div className="language-menu">
                                    <div className="language-title">
                                        {t.language}
                                    </div>

                                    {Object.entries(languageNames).map(
                                        ([code, name]) => (
                                            <button
                                                type="button"
                                                key={code}
                                                className={`language-option ${
                                                    language === code
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    changeLanguage(code)
                                                }
                                            >
                                                <span className="language-code">
                                                    {code.toUpperCase()}
                                                </span>

                                                <span>{name}</span>

                                                {language === code && (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                    >
                                                        <path d="m5 12 4 4L19 6" />
                                                    </svg>
                                                )}
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* =========================================
                        HEADER
                    ========================================= */}

                    <div className="login-header">
                        <span className="welcome-label">{t.secureAccess}</span>

                        <h1>{t.welcome}</h1>

                        <p>{t.subtitle}</p>
                    </div>

                    {/* =========================================
                        AUTHENTICATION ERROR
                    ========================================= */}

                    {isAuthenticationError && (
                        <div className="alert alert-error" role="alert">
                            <div className="alert-icon">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                >
                                    <path d="M12 9v4" />
                                    <path d="M12 17h.01" />
                                    <path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
                                </svg>
                            </div>

                            <div className="alert-content">
                                <strong>{t.signInFailed}</strong>

                                <p>{errors.email}</p>
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        OTHER ERRORS
                    ========================================= */}

                    {Object.keys(errors).length > 0 &&
                        !isAuthenticationError &&
                        !errors.email && (
                            <div className="alert alert-error" role="alert">
                                <div className="alert-icon">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                    >
                                        <path d="M12 9v4" />
                                        <path d="M12 17h.01" />
                                        <path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75 3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
                                    </svg>
                                </div>

                                <div className="alert-content">
                                    <strong>{t.checkForm}</strong>

                                    <p>{t.checkFormText}</p>
                                </div>
                            </div>
                        )}

                    {/* =========================================
                        SUCCESS
                    ========================================= */}

                    {status && (
                        <div className="alert alert-success" role="status">
                            <div className="alert-icon">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                >
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                            </div>

                            <div className="alert-content">
                                <strong>{t.success}</strong>

                                <p>{status}</p>
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        FORM
                    ========================================= */}

                    <form onSubmit={submit} className="login-form">
                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email">{t.email}</label>

                            <div
                                className={`input-wrapper ${
                                    errors.email && !isAuthenticationError
                                        ? "has-error"
                                        : ""
                                }`}
                            >
                                <span className="input-icon">
                                    <svg
                                        width="17"
                                        height="17"
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
                                    placeholder={t.emailPlaceholder}
                                    autoComplete="email"
                                    autoFocus
                                    value={data.email}
                                    onChange={(e) => {
                                        setData("email", e.target.value);

                                        if (errors.email) {
                                            clearErrors("email");
                                        }
                                    }}
                                />

                                {errors.email && !isAuthenticationError && (
                                    <span className="input-error-icon">!</span>
                                )}
                            </div>

                            {errors.email && !isAuthenticationError && (
                                <div className="field-error">
                                    <span>!</span>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="password">{t.password}</label>

                            <div
                                className={`input-wrapper ${
                                    errors.password ? "has-error" : ""
                                }`}
                            >
                                <span className="input-icon">
                                    <svg
                                        width="17"
                                        height="17"
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
                                    placeholder={t.passwordPlaceholder}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData("password", e.target.value);

                                        if (errors.password) {
                                            clearErrors("password");
                                        }
                                    }}
                                />

                                {errors.password && (
                                    <span className="input-error-icon">!</span>
                                )}
                            </div>

                            {errors.password && (
                                <div className="field-error">
                                    <span>!</span>
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Remember */}
                        <div className="form-options">
                            <label className="remember">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />

                                <span className="custom-checkbox">
                                    {data.remember && (
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        >
                                            <path d="m5 12 4 4L19 6" />
                                        </svg>
                                    )}
                                </span>

                                <span>{t.remember}</span>
                            </label>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>{t.signingIn}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t.signIn}</span>

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* =========================================
                        SECURITY
                    ========================================= */}

                    <div className="login-security">
                        <div className="security-icon">
                            <svg
                                width="14"
                                height="14"
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
                        </div>

                        <div>
                            <strong>{t.secureConnection}</strong>

                            <span>{t.encrypted}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="login-footer">
                        © {new Date().getFullYear()} Guided Act & Feel Rwanda
                    </div>
                </main>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #app {
                    min-height: 100%;
                    margin: 0;
                }

                body {
                    font-family:
                        "Manrope",
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                    background: #f4f7fb;
                    color: #182333;
                }

                /* =========================================
                   PAGE
                ========================================= */

                .login-page {
                    position: relative;

                    min-height: 100vh;
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 35px 20px;

                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 10% 10%,
                            rgba(93, 137, 200, 0.08),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 90% 90%,
                            rgba(32, 96, 61, 0.06),
                            transparent 30%
                        ),
                        #f4f7fb;
                }

                .background-shape {
                    position: absolute;

                    border-radius: 50%;

                    pointer-events: none;

                    opacity: 0.55;
                }

                .background-shape-one {
                    width: 280px;
                    height: 280px;

                    top: -130px;
                    left: -100px;

                    background: rgba(93, 137, 200, 0.08);
                }

                .background-shape-two {
                    width: 350px;
                    height: 350px;

                    right: -180px;
                    bottom: -180px;

                    background: rgba(32, 96, 61, 0.06);
                }

                /* =========================================
                   CARD
                ========================================= */

                .login-card {
                    position: relative;
                    z-index: 2;

                    width: 100%;
                    max-width: 420px;

                    padding: 30px 38px 27px;

                    background: rgba(255, 255, 255, 0.98);

                    border: 1px solid #e5eaf0;

                    border-radius: 18px;

                    box-shadow:
                        0 25px 70px rgba(24, 35, 51, 0.09),
                        0 4px 15px rgba(24, 35, 51, 0.03);
                }

                /* =========================================
                   TOP BAR
                ========================================= */

                .top-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    margin-bottom: 27px;
                }

                /* =========================================
                   BRAND
                ========================================= */

                .brand {
                    display: flex;
                    align-items: center;

                    gap: 9px;
                }

                .logo-container {
                    width: 44px;
                    height: 44px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    overflow: hidden;

                    border-radius: 11px;

                    background: #ffffff;

                    border: 1px solid #e3e9f0;

                    box-shadow:
                        0 5px 16px rgba(93, 137, 200, 0.11);
                }

                .logo-container img {
                    width: 35px;
                    height: 35px;

                    object-fit: contain;
                }

                .brand-name {
                    display: flex;
                    flex-direction: column;

                    line-height: 1;
                }

                .brand-name span {
                    color: #294d7c;

                    font-size: 16px;
                    font-weight: 800;

                    letter-spacing: -0.3px;
                }

                .brand-name small {
                    margin-top: 4px;

                    color: #7c8796;

                    font-size: 7.5px;
                    font-weight: 800;

                    letter-spacing: 1.6px;
                }

                /* =========================================
                   LANGUAGE
                ========================================= */

                .language-wrapper {
                    position: relative;
                }

                .language-button {
                    height: 34px;

                    display: flex;
                    align-items: center;

                    gap: 6px;

                    padding: 0 9px;

                    border: 1px solid #e1e6ed;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #667384;

                    font-family: inherit;

                    font-size: 10px;
                    font-weight: 750;

                    cursor: pointer;

                    transition: 0.18s ease;
                }

                .language-button:hover {
                    border-color: #cbd5e1;

                    color: #456b9d;

                    background: #f9fbfd;
                }

                .language-button .chevron {
                    transition: transform 0.18s ease;
                }

                .language-button .chevron.open {
                    transform: rotate(180deg);
                }

                .language-menu {
                    position: absolute;

                    top: calc(100% + 7px);
                    right: 0;

                    width: 175px;

                    padding: 6px;

                    background: #ffffff;

                    border: 1px solid #e3e8ef;

                    border-radius: 10px;

                    box-shadow:
                        0 15px 35px rgba(24, 35, 51, 0.12);

                    z-index: 20;

                    animation: languageMenu 0.15s ease;
                }

                @keyframes languageMenu {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .language-title {
                    padding: 7px 9px 6px;

                    color: #9aa4b1;

                    font-size: 8px;
                    font-weight: 800;

                    letter-spacing: 1px;

                    text-transform: uppercase;
                }

                .language-option {
                    width: 100%;

                    display: flex;
                    align-items: center;

                    gap: 9px;

                    padding: 8px 9px;

                    border: 0;

                    border-radius: 7px;

                    background: transparent;

                    color: #566273;

                    font-family: inherit;

                    font-size: 10.5px;

                    text-align: left;

                    cursor: pointer;
                }

                .language-option:hover {
                    background: #f4f7fb;
                }

                .language-option.active {
                    background: rgba(93, 137, 200, 0.09);

                    color: #426b9e;

                    font-weight: 700;
                }

                .language-option svg {
                    margin-left: auto;

                    color: #5d89c8;
                }

                .language-code {
                    width: 25px;
                    height: 20px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 5px;

                    background: #f0f3f7;

                    color: #7c8795;

                    font-size: 8px;
                    font-weight: 800;
                }

                .language-option.active .language-code {
                    background: #5d89c8;

                    color: white;
                }

                /* =========================================
                   HEADER
                ========================================= */

                .login-header {
                    text-align: center;

                    margin-bottom: 26px;
                }

                .welcome-label {
                    display: inline-block;

                    margin-bottom: 9px;

                    color: #5d89c8;

                    font-size: 8.5px;
                    font-weight: 800;

                    letter-spacing: 1.4px;
                }

                .login-header h1 {
                    margin: 0 0 7px;

                    color: #182333;

                    font-size: 26px;

                    line-height: 1.2;

                    font-weight: 750;

                    letter-spacing: -0.6px;
                }

                .login-header p {
                    max-width: 315px;

                    margin: 0 auto;

                    color: #7a8594;

                    font-size: 12px;

                    line-height: 1.6;
                }

                /* =========================================
                   ALERTS
                ========================================= */

                .alert {
                    display: flex;

                    align-items: flex-start;

                    gap: 10px;

                    padding: 11px 12px;

                    margin-bottom: 18px;

                    border-radius: 9px;

                    font-size: 11.5px;
                }

                .alert-error {
                    color: #a92727;

                    background: #fff7f7;

                    border: 1px solid #f4d0d0;
                }

                .alert-success {
                    color: #287447;

                    background: #f3faf5;

                    border: 1px solid #cee8d6;
                }

                .alert-icon {
                    width: 21px;
                    height: 21px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: rgba(169, 39, 39, 0.08);
                }

                .alert-success .alert-icon {
                    background: rgba(40, 116, 71, 0.09);
                }

                .alert-content strong {
                    display: block;

                    margin-bottom: 2px;

                    font-size: 11.5px;

                    font-weight: 750;
                }

                .alert-content p {
                    margin: 0;

                    font-size: 10.5px;

                    line-height: 1.5;
                }

                /* =========================================
                   FORM
                ========================================= */

                .login-form {
                    display: flex;

                    flex-direction: column;

                    gap: 17px;
                }

                .form-group {
                    display: flex;

                    flex-direction: column;
                }

                .form-group label {
                    margin-bottom: 6px;

                    color: #364152;

                    font-size: 11px;

                    font-weight: 700;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;

                    left: 13px;
                    top: 50%;

                    transform: translateY(-50%);

                    display: flex;

                    color: #9ba6b4;

                    pointer-events: none;

                    z-index: 2;
                }

                .input-wrapper input {
                    width: 100%;

                    height: 46px;

                    padding: 0 39px;

                    outline: none;

                    border: 1px solid #dce2e9;

                    border-radius: 9px;

                    background: #fbfcfd;

                    color: #1b2636;

                    font-family: inherit;

                    font-size: 12px;

                    transition: 0.18s ease;
                }

                .input-wrapper input::placeholder {
                    color: #a8b0bb;
                }

                .input-wrapper input:hover {
                    border-color: #cbd3de;
                }

                .input-wrapper input:focus {
                    background: #ffffff;

                    border-color: #5d89c8;

                    box-shadow:
                        0 0 0 3px rgba(93, 137, 200, 0.11);
                }

                .input-wrapper.has-error input {
                    border-color: #dc5a5a;

                    background: #fffafa;
                }

                .input-error-icon {
                    position: absolute;

                    right: 12px;
                    top: 50%;

                    transform: translateY(-50%);

                    width: 18px;
                    height: 18px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #dc5a5a;

                    color: white;

                    font-size: 10px;

                    font-weight: 800;
                }

                .field-error {
                    display: flex;

                    align-items: center;

                    gap: 6px;

                    margin-top: 5px;

                    color: #c03939;

                    font-size: 10px;

                    line-height: 1.4;
                }

                .field-error span {
                    width: 14px;
                    height: 14px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #fce3e3;

                    font-size: 8px;

                    font-weight: 800;
                }

                /* =========================================
                   REMEMBER
                ========================================= */

                .remember {
                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    cursor: pointer;

                    color: #6f7a89;

                    font-size: 11px;

                    user-select: none;
                }

                .remember input {
                    position: absolute;

                    width: 1px;
                    height: 1px;

                    opacity: 0;
                }

                .custom-checkbox {
                    width: 17px;
                    height: 17px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border: 1px solid #cbd3dd;

                    border-radius: 4px;

                    color: white;
                }

                .remember input:checked + .custom-checkbox {
                    background: #5d89c8;

                    border-color: #5d89c8;
                }

                /* =========================================
                   BUTTON
                ========================================= */

                .login-button {
                    width: 100%;

                    height: 46px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 8px;

                    margin-top: 1px;

                    border: 0;

                    border-radius: 9px;

                    background: #5d89c8;

                    color: white;

                    font-family: inherit;

                    font-size: 12px;

                    font-weight: 750;

                    cursor: pointer;

                    box-shadow:
                        0 7px 18px rgba(93, 137, 200, 0.20);

                    transition: 0.18s ease;
                }

                .login-button:hover:not(:disabled) {
                    background: #4f79b4;

                    transform: translateY(-1px);

                    box-shadow:
                        0 10px 22px rgba(93, 137, 200, 0.25);
                }

                .login-button:disabled {
                    opacity: 0.7;

                    cursor: not-allowed;
                }

                .spinner {
                    width: 15px;
                    height: 15px;

                    border: 2px solid rgba(255,255,255,0.35);

                    border-top-color: white;

                    border-radius: 50%;

                    animation: spin 0.7s linear infinite;
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
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 7px;

                    margin-top: 21px;
                    padding-top: 17px;

                    border-top: 1px solid #edf0f4;

                    color: #9aa4b1;
                }

                .security-icon {
                    display: flex;

                    color: #8290a0;
                }

                .login-security div:last-child {
                    display: flex;

                    flex-direction: column;

                    gap: 1px;
                }

                .login-security strong {
                    color: #7d8794;

                    font-size: 9.5px;

                    font-weight: 700;
                }

                .login-security span {
                    font-size: 9px;
                }

                /* =========================================
                   FOOTER
                ========================================= */

                .login-footer {
                    margin-top: 15px;

                    text-align: center;

                    color: #a5adb8;

                    font-size: 9px;
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 480px) {
                    .login-page {
                        padding: 20px 14px;
                    }

                    .login-card {
                        padding: 26px 23px 24px;

                        border-radius: 15px;
                    }

                    .top-bar {
                        margin-bottom: 23px;
                    }

                    .login-header h1 {
                        font-size: 24px;
                    }

                    .login-header p {
                        font-size: 11.5px;
                    }

                    .language-menu {
                        width: 165px;
                    }
                }
            `}</style>
        </>
    );
}
