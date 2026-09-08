import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    getLanguage,
    LANGUAGE_EVENT,
} from "@/lib/language";

const BRAND = "#5D89C8";

const UI_TRANSLATIONS = {
    rw: {
        pageTitle: "Ubuzima bwo mu Mutwe",
        breadcrumb: "Agahinda Gakabije",
        preview: "Aperçu y'Inyandiko",
        edit: "Hindura Inyandiko",
        viewPublic: "Reba kuri Website",
        published: "Yatangajwe",
        unpublished: "Ntabwo Yatangajwe",
        status: "Imiterere",
        language: "Ururimi",
        availableLanguages: "Indimi Zihari",
        lastUpdated: "Ivugururwa Ryanyuma",
        content: "Ibikubiye mu Nyandiko",
        noContent: "Nta nyandiko ihari muri uru rurimi.",
        back: "Subira inyuma",
        articleInformation: "Amakuru y'Inyandiko",
        documentPreview: "Aperçu y'Inyandiko",
        editMessage: "Hindura inyandiko niba ushaka kugira ibyo uhindura.",
        contentAvailable: "Ibikubiye birahari",
        languages: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    en: {
        pageTitle: "Mental Health",
        breadcrumb: "Depression",
        preview: "Document Preview",
        edit: "Edit Document",
        viewPublic: "View on Website",
        published: "Published",
        unpublished: "Unpublished",
        status: "Status",
        language: "Language",
        availableLanguages: "Available Languages",
        lastUpdated: "Last Updated",
        content: "Document Content",
        noContent: "No content is available in this language.",
        back: "Back",
        articleInformation: "Document information",
        documentPreview: "Document Preview",
        editMessage: "Edit the document if you need to make changes.",
        contentAvailable: "Content available",
        languages: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    fr: {
        pageTitle: "Santé Mentale",
        breadcrumb: "Dépression",
        preview: "Aperçu du document",
        edit: "Modifier le document",
        viewPublic: "Voir sur le site",
        published: "Publié",
        unpublished: "Non publié",
        status: "Statut",
        language: "Langue",
        availableLanguages: "Langues disponibles",
        lastUpdated: "Dernière mise à jour",
        content: "Contenu du document",
        noContent: "Aucun contenu n'est disponible dans cette langue.",
        back: "Retour",
        articleInformation: "Informations du document",
        documentPreview: "Aperçu du document",
        editMessage: "Modifiez le document si vous souhaitez apporter des changements.",
        contentAvailable: "Contenu disponible",
        languages: {
            rw: "Kinyarwanda",
            en: "Anglais",
            fr: "Français",
            nl: "Néerlandais",
        },
    },

    nl: {
        pageTitle: "Geestelijke Gezondheid",
        breadcrumb: "Depressie",
        preview: "Documentvoorbeeld",
        edit: "Document bewerken",
        viewPublic: "Bekijk op website",
        published: "Gepubliceerd",
        unpublished: "Niet gepubliceerd",
        status: "Status",
        language: "Taal",
        availableLanguages: "Beschikbare talen",
        lastUpdated: "Laatst bijgewerkt",
        content: "Documentinhoud",
        noContent: "Er is geen inhoud beschikbaar in deze taal.",
        back: "Terug",
        articleInformation: "Documentinformatie",
        documentPreview: "Documentvoorbeeld",
        editMessage: "Bewerk het document als u wijzigingen wilt aanbrengen.",
        contentAvailable: "Inhoud beschikbaar",
        languages: {
            rw: "Kinyarwanda",
            en: "Engels",
            fr: "Frans",
            nl: "Nederlands",
        },
    },
};

const LANGUAGE_META = {
    rw: {
        code: "RW",
        flag: "🇷🇼",
    },
    en: {
        code: "EN",
        flag: "🇬🇧",
    },
    fr: {
        code: "FR",
        flag: "🇫🇷",
    },
    nl: {
        code: "NL",
        flag: "🇳🇱",
    },
};

export default function Show({ page }) {
    const [language, setLanguage] = useState(getLanguage());

    /*
     * AdminLayout controls the active language.
     */
    useEffect(() => {
        const handleLanguageChange = (event) => {
            if (event?.detail) {
                setLanguage(event.detail);
            }
        };

        window.addEventListener(
            LANGUAGE_EVENT,
            handleLanguageChange
        );

        return () => {
            window.removeEventListener(
                LANGUAGE_EVENT,
                handleLanguageChange
            );
        };
    }, []);

    const t =
        UI_TRANSLATIONS[language] ||
        UI_TRANSLATIONS.rw;

    const content = page?.content || {};

    const currentContent =
        content?.[language] ||
        content?.rw ||
        {};

    const title =
        currentContent?.pageTitle ||
        "Depression";

    const body =
        currentContent?.body ||
        "";

    const languageMeta =
        LANGUAGE_META[language] ||
        LANGUAGE_META.rw;

    const availableLanguages = useMemo(() => {
        return Object.keys(content).filter(
            (lang) =>
                content?.[lang]?.pageTitle ||
                content?.[lang]?.body
        );
    }, [content]);

    const formattedDate = page?.updated_at
        ? new Date(page.updated_at).toLocaleDateString(
              language === "rw"
                  ? "rw-RW"
                  : language === "fr"
                  ? "fr-FR"
                  : language === "nl"
                  ? "nl-NL"
                  : "en-US",
              {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              }
          )
        : "—";

    return (
        <AdminLayout>

            <Head title={`${title} — ${t.preview}`} />

            <div className="health-page">

                {/* ============================================
                    PAGE HEADER
                ============================================ */}
                <div className="health-header">

                    <div className="container-fluid px-3 px-lg-4">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                            <div>

                                <div className="health-breadcrumb">

                                    <Link
                                        href={route(
                                            "admin.health-content.depression.edit"
                                        )}
                                    >
                                        <i className="bi bi-arrow-left me-1"></i>
                                        {t.back}
                                    </Link>

                                    <span>/</span>

                                    <span>
                                        {t.pageTitle}
                                    </span>

                                    <span>/</span>

                                    <strong>
                                        {t.breadcrumb}
                                    </strong>

                                </div>

                                <h1>
                                    {t.preview}
                                </h1>

                                <p>
                                    {t.articleInformation}
                                </p>

                            </div>


                            <div className="health-actions">

                                <Link
                                    href={route(
                                        "mental-health.depression"
                                    )}
                                    target="_blank"
                                    className="btn btn-light border"
                                >
                                    <i className="bi bi-globe2 me-2"></i>
                                    {t.viewPublic}
                                </Link>

                                <Link
                                    href={route(
                                        "admin.health-content.depression.edit"
                                    )}
                                    className="btn text-white"
                                    style={{
                                        backgroundColor: BRAND,
                                        borderColor: BRAND,
                                    }}
                                >
                                    <i className="bi bi-pencil me-2"></i>
                                    {t.edit}
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ============================================
                    MAIN
                ============================================ */}
                <div className="container-fluid px-3 px-lg-4 py-4">

                    <div className="row g-4">

                        {/* ========================================
                            DOCUMENT
                        ======================================== */}
                        <div className="col-lg-8">

                            <div className="document-card">

                                {/* Document Meta */}
                                <div className="document-meta">

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="language-badge">
                                            <span>
                                                {languageMeta.flag}
                                            </span>

                                            {
                                                t.languages[
                                                    language
                                                ]
                                            }
                                        </span>

                                        <span
                                            className={
                                                page?.is_published
                                                    ? "status-badge published"
                                                    : "status-badge unpublished"
                                            }
                                        >
                                            <span className="status-dot"></span>

                                            {page?.is_published
                                                ? t.published
                                                : t.unpublished}
                                        </span>

                                    </div>

                                    <div className="updated-date">

                                        <i className="bi bi-clock me-1"></i>

                                        {t.lastUpdated}:

                                        <strong className="ms-1">
                                            {formattedDate}
                                        </strong>

                                    </div>

                                </div>


                                {/* Title */}
                                <div className="document-title">

                                    <div className="document-label">
                                        {t.documentPreview}
                                    </div>

                                    <h2>
                                        {title}
                                    </h2>

                                </div>


                                {/* Content */}
                                <div className="document-content">

                                    {body ? (

                                        <article
                                            className="health-content"
                                            dangerouslySetInnerHTML={{
                                                __html: body,
                                            }}
                                        />

                                    ) : (

                                        <div className="empty-content">

                                            <div className="empty-icon">
                                                <i className="bi bi-file-earmark-text"></i>
                                            </div>

                                            <h5>
                                                {t.noContent}
                                            </h5>

                                            <p>
                                                {t.editMessage}
                                            </p>

                                            <Link
                                                href={route(
                                                    "admin.health-content.depression.edit"
                                                )}
                                                className="btn btn-sm text-white"
                                                style={{
                                                    backgroundColor:
                                                        BRAND,
                                                }}
                                            >
                                                <i className="bi bi-pencil me-1"></i>
                                                {t.edit}
                                            </Link>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ========================================
                            SIDEBAR
                        ======================================== */}
                        <div className="col-lg-4">

                            {/* STATUS */}
                            <div className="simple-card mb-4">

                                <div className="simple-card-title">
                                    <i className="bi bi-circle-half"></i>
                                    {t.status}
                                </div>

                                <div className="status-display">

                                    <div
                                        className={
                                            page?.is_published
                                                ? "status-icon published"
                                                : "status-icon unpublished"
                                        }
                                    >
                                        <i
                                            className={
                                                page?.is_published
                                                    ? "bi bi-check-lg"
                                                    : "bi bi-dash"
                                            }
                                        ></i>
                                    </div>

                                    <div>

                                        <strong>
                                            {page?.is_published
                                                ? t.published
                                                : t.unpublished}
                                        </strong>

                                        <span>
                                            {t.language}:{" "}
                                            {
                                                t.languages[
                                                    language
                                                ]
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* LANGUAGES */}
                            <div className="simple-card mb-4">

                                <div className="simple-card-title">
                                    <i className="bi bi-translate"></i>
                                    {t.availableLanguages}
                                </div>

                                <div className="language-list">

                                    {availableLanguages.length > 0 ? (

                                        availableLanguages.map(
                                            (lang) => {

                                                const meta =
                                                    LANGUAGE_META[
                                                        lang
                                                    ] || {};

                                                const langContent =
                                                    content?.[
                                                        lang
                                                    ] || {};

                                                const hasContent =
                                                    Boolean(
                                                        langContent?.pageTitle ||
                                                        langContent?.body
                                                    );

                                                const active =
                                                    lang ===
                                                    language;

                                                return (
                                                    <div
                                                        key={lang}
                                                        className={
                                                            active
                                                                ? "language-row active"
                                                                : "language-row"
                                                        }
                                                    >

                                                        <div className="d-flex align-items-center gap-2">

                                                            <span className="flag">
                                                                {
                                                                    meta.flag
                                                                }
                                                            </span>

                                                            <div>

                                                                <strong>
                                                                    {t
                                                                        .languages[
                                                                        lang
                                                                    ] ||
                                                                        lang.toUpperCase()}
                                                                </strong>

                                                                <small>
                                                                    {hasContent
                                                                        ? t.contentAvailable
                                                                        : t.noContent}
                                                                </small>

                                                            </div>

                                                        </div>

                                                        {active && (
                                                            <i
                                                                className="bi bi-check-circle-fill"
                                                                style={{
                                                                    color: BRAND,
                                                                }}
                                                            ></i>
                                                        )}

                                                    </div>
                                                );
                                            }
                                        )

                                    ) : (

                                        <p className="text-muted small mb-0">
                                            {t.noContent}
                                        </p>

                                    )}

                                </div>

                            </div>


                            {/* EDIT */}
                            <div className="edit-card">

                                <div className="edit-card-icon">
                                    <i className="bi bi-pencil-square"></i>
                                </div>

                                <div>

                                    <h6>
                                        {t.edit}
                                    </h6>

                                    <p>
                                        {t.editMessage}
                                    </p>

                                    <Link
                                        href={route(
                                            "admin.health-content.depression.edit"
                                        )}
                                        className="edit-link"
                                    >
                                        {t.edit}
                                        <i className="bi bi-arrow-right ms-1"></i>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================
                MINIMAL CSS
            ================================================= */}
            <style>{`

                .health-page {
                    min-height: 100vh;
                    background: #f7f8fa;
                }

                /* HEADER */

                .health-header {
                    background: #fff;
                    border-bottom: 1px solid #e8ebef;
                    padding: 22px 0;
                }

                .health-breadcrumb {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    color: #8a929e;
                    font-size: .75rem;
                    margin-bottom: 8px;
                }

                .health-breadcrumb a {
                    color: #7a8491;
                    text-decoration: none;
                }

                .health-breadcrumb a:hover {
                    color: ${BRAND};
                }

                .health-breadcrumb strong {
                    color: #303947;
                    font-weight: 600;
                }

                .health-header h1 {
                    color: #202938;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }

                .health-header p {
                    color: #89919e;
                    font-size: .82rem;
                    margin: 3px 0 0;
                }

                .health-actions {
                    display: flex;
                    gap: 8px;
                }


                /* DOCUMENT */

                .document-card {
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,.025);
                }

                .document-meta {
                    padding: 17px 22px;
                    border-bottom: 1px solid #edf0f3;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .language-badge,
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 20px;
                    font-size: .72rem;
                    font-weight: 600;
                }

                .language-badge {
                    color: #315f96;
                    background: #edf4fc;
                }

                .status-badge.published {
                    color: #237b46;
                    background: #eaf7ef;
                }

                .status-badge.unpublished {
                    color: #68717d;
                    background: #f0f1f3;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .updated-date {
                    color: #9199a5;
                    font-size: .7rem;
                }

                .updated-date strong {
                    color: #596474;
                    font-weight: 600;
                }


                /* TITLE */

                .document-title {
                    padding: 30px 30px 25px;
                    border-bottom: 1px solid #edf0f3;
                }

                .document-label {
                    color: ${BRAND};
                    font-size: .67rem;
                    font-weight: 700;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }

                .document-title h2 {
                    color: #172033;
                    font-size: 2rem;
                    line-height: 1.3;
                    font-weight: 700;
                    margin: 0;
                }


                /* CONTENT */

                .document-content {
                    padding: 30px;
                }

                .health-content {
                    color: #3f4957;
                    font-size: 1rem;
                    line-height: 1.85;
                }

                .health-content h1,
                .health-content h2,
                .health-content h3,
                .health-content h4,
                .health-content h5,
                .health-content h6 {
                    color: #182131;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }

                .health-content h1:first-child,
                .health-content h2:first-child,
                .health-content h3:first-child {
                    margin-top: 0;
                }

                .health-content p {
                    margin-bottom: 1.1rem;
                }

                .health-content ul,
                .health-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1.25rem;
                }

                .health-content li {
                    margin-bottom: .45rem;
                }

                .health-content blockquote {
                    margin: 1.5rem 0;
                    padding: 12px 16px;
                    background: #f7f9fc;
                    border-left: 3px solid ${BRAND};
                    border-radius: 0 7px 7px 0;
                }

                .health-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .health-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                }

                .health-content th,
                .health-content td {
                    padding: 8px;
                    border: 1px solid #dee2e6;
                }

                .health-content th {
                    background: #f8f9fa;
                }

                .health-content a {
                    color: ${BRAND};
                }


                /* SIDEBAR */

                .simple-card {
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    padding: 18px;
                    box-shadow: 0 2px 8px rgba(0,0,0,.025);
                }

                .simple-card-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #293342;
                    font-size: .88rem;
                    font-weight: 700;
                    margin-bottom: 16px;
                }

                .simple-card-title i {
                    color: ${BRAND};
                }

                .status-display {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .status-icon {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                }

                .status-icon.published {
                    background: #eaf7ef;
                    color: #23814a;
                }

                .status-icon.unpublished {
                    background: #f0f1f3;
                    color: #6c7480;
                }

                .status-display strong {
                    display: block;
                    color: #303947;
                    font-size: .8rem;
                }

                .status-display span {
                    display: block;
                    color: #929aa5;
                    font-size: .68rem;
                    margin-top: 2px;
                }


                /* LANGUAGES */

                .language-list {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .language-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 9px;
                    border-radius: 8px;
                    background: #f8f9fa;
                }

                .language-row.active {
                    background: #edf4fc;
                }

                .language-row .flag {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    background: #fff;
                    font-size: .95rem;
                }

                .language-row strong {
                    display: block;
                    color: #3a4452;
                    font-size: .75rem;
                    font-weight: 600;
                }

                .language-row small {
                    display: block;
                    color: #929aa5;
                    font-size: .62rem;
                    margin-top: 1px;
                }


                /* EDIT CARD */

                .edit-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    padding: 17px;
                }

                .edit-card-icon {
                    width: 36px;
                    height: 36px;
                    flex: 0 0 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #edf4fc;
                    color: ${BRAND};
                }

                .edit-card h6 {
                    color: #303947;
                    font-size: .8rem;
                    font-weight: 700;
                    margin: 0 0 4px;
                }

                .edit-card p {
                    color: #8b94a0;
                    font-size: .69rem;
                    line-height: 1.5;
                    margin: 0 0 6px;
                }

                .edit-link {
                    color: ${BRAND};
                    font-size: .7rem;
                    font-weight: 700;
                    text-decoration: none;
                }

                .edit-link:hover {
                    color: #315f96;
                }


                /* EMPTY */

                .empty-content {
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                .empty-icon {
                    width: 55px;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: #edf4fc;
                    color: ${BRAND};
                    font-size: 1.3rem;
                    margin-bottom: 13px;
                }

                .empty-content h5 {
                    color: #303947;
                    font-size: .9rem;
                    margin-bottom: 5px;
                }

                .empty-content p {
                    color: #929aa5;
                    font-size: .72rem;
                    margin-bottom: 14px;
                }


                /* MOBILE */

                @media (max-width: 767px) {

                    .health-header {
                        padding: 18px 0;
                    }

                    .health-actions {
                        width: 100%;
                    }

                    .health-actions .btn {
                        flex: 1;
                    }

                    .document-title {
                        padding: 24px 20px;
                    }

                    .document-title h2 {
                        font-size: 1.5rem;
                    }

                    .document-content {
                        padding: 22px 20px;
                    }

                    .document-meta {
                        padding: 14px 18px;
                    }

                    .health-content {
                        font-size: .95rem;
                    }

                }

            `}</style>

        </AdminLayout>
    );
}