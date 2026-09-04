import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import { Link, router, usePage } from "@inertiajs/react";
import {
    FileText,
    Upload,
    Languages,
    CalendarDays,
    Activity,
    Pencil,
    Trash2,
    MoreHorizontal,
    Search,
    FileStack,
    Eye,
} from "lucide-react";

import { getLanguage, LANGUAGE_EVENT } from "@/lib/language";

const translations = {
    rw: {
        documents: "Inyandiko",
        pageDescription: "Gucunga inyandiko zawe n'indimi zazo.",
        uploadDocument: "Shyiraho Inyandiko",

        totalDocuments: "Inyandiko Zose",
        languageVersions: "Verisiyo z'Indimi",
        currentPage: "Ipaji Iriho",

        allDocuments: "Inyandiko Zose",
        documentCountSingular: "inyandiko iri mu bubiko bwawe",
        documentCountPlural: "inyandiko ziri mu bubiko bwawe",
        searchPlaceholder: "Shakisha inyandiko...",

        colDocument: "INYANDIKO",
        colLanguages: "INDIMI",
        colUploaded: "YASHYIZWEHO",
        colActions: "IBIKORWA",

        documentHash: "Inyandiko #",
        noVersions: "Nta verisiyo",
        none: "Nta na kimwe",

        view: "Reba",
        activity: "Ibikorwa",
        edit: "Hindura",
        delete: "Siba",

        noDocumentsFound: "Nta nyandiko yabonetse",
        noDocumentsFoundDescription:
            'Ntabwo twabashije kubona inyandiko ihuye na "{search}".',
        clearSearch: "Siba Ishakiro",

        noDocumentsYet: "Nta nyandiko zirahari",
        noDocumentsYetDescription:
            "Shyiraho inyandiko ya mbere kugira ngo utangire kubaka ububiko bw'inyandiko zawe.",

        deleteConfirm:
            'Gusiba "{title}" hamwe na verisiyo zayo zose z\'indimi? Iki gikorwa ntikigaruka.',
        successTitle: "Byagenze neza",

        languages: {
            rw: "Kinyarwanda",
            en: "Icyongereza",
            fr: "Igifaransa",
            nl: "Ikidage",
        },
    },

    en: {
        documents: "Documents",
        pageDescription: "Manage your documents and their language versions.",
        uploadDocument: "Upload Document",

        totalDocuments: "Total Documents",
        languageVersions: "Language Versions",
        currentPage: "Current Page",

        allDocuments: "All Documents",
        documentCountSingular: "document in your library",
        documentCountPlural: "documents in your library",
        searchPlaceholder: "Search documents...",

        colDocument: "DOCUMENT",
        colLanguages: "LANGUAGES",
        colUploaded: "UPLOADED",
        colActions: "ACTIONS",

        documentHash: "Document #",
        noVersions: "No versions",
        none: "None",

        view: "View",
        activity: "Activity",
        edit: "Edit",
        delete: "Delete",

        noDocumentsFound: "No documents found",
        noDocumentsFoundDescription:
            'We couldn\'t find any document matching "{search}".',
        clearSearch: "Clear Search",

        noDocumentsYet: "No documents yet",
        noDocumentsYetDescription:
            "Upload your first document to start building your document library.",

        deleteConfirm:
            'Delete "{title}" and all its language versions? This action cannot be undone.',
        successTitle: "Success",

        languages: {
            rw: "Kinyarwanda",
            en: "English",
            fr: "Français",
            nl: "Nederlands",
        },
    },

    fr: {
        documents: "Documents",
        pageDescription:
            "Gérez vos documents et leurs versions linguistiques.",
        uploadDocument: "Télécharger un document",

        totalDocuments: "Total des documents",
        languageVersions: "Versions linguistiques",
        currentPage: "Page actuelle",

        allDocuments: "Tous les documents",
        documentCountSingular: "document dans votre bibliothèque",
        documentCountPlural: "documents dans votre bibliothèque",
        searchPlaceholder: "Rechercher des documents...",

        colDocument: "DOCUMENT",
        colLanguages: "LANGUES",
        colUploaded: "TÉLÉCHARGÉ",
        colActions: "ACTIONS",

        documentHash: "Document n°",
        noVersions: "Aucune version",
        none: "Aucune",

        view: "Voir",
        activity: "Activité",
        edit: "Modifier",
        delete: "Supprimer",

        noDocumentsFound: "Aucun document trouvé",
        noDocumentsFoundDescription:
            'Nous n\'avons trouvé aucun document correspondant à "{search}".',
        clearSearch: "Effacer la recherche",

        noDocumentsYet: "Aucun document pour le moment",
        noDocumentsYetDescription:
            "Téléchargez votre premier document pour commencer à créer votre bibliothèque documentaire.",

        deleteConfirm:
            'Supprimer "{title}" et toutes ses versions linguistiques ? Cette action est irréversible.',
        successTitle: "Succès",

        languages: {
            rw: "Kinyarwanda",
            en: "Anglais",
            fr: "Français",
            nl: "Néerlandais",
        },
    },

    nl: {
        documents: "Documenten",
        pageDescription: "Beheer uw documenten en hun taalversies.",
        uploadDocument: "Document uploaden",

        totalDocuments: "Totaal aantal documenten",
        languageVersions: "Taalversies",
        currentPage: "Huidige pagina",

        allDocuments: "Alle documenten",
        documentCountSingular: "document in uw bibliotheek",
        documentCountPlural: "documenten in uw bibliotheek",
        searchPlaceholder: "Documenten zoeken...",

        colDocument: "DOCUMENT",
        colLanguages: "TALEN",
        colUploaded: "GEÜPLOAD",
        colActions: "ACTIES",

        documentHash: "Document #",
        noVersions: "Geen versies",
        none: "Geen",

        view: "Bekijken",
        activity: "Activiteit",
        edit: "Bewerken",
        delete: "Verwijderen",

        noDocumentsFound: "Geen documenten gevonden",
        noDocumentsFoundDescription:
            'We konden geen document vinden dat overeenkomt met "{search}".',
        clearSearch: "Zoekopdracht wissen",

        noDocumentsYet: "Nog geen documenten",
        noDocumentsYetDescription:
            "Upload uw eerste document om uw documentbibliotheek op te bouwen.",

        deleteConfirm:
            'Weet u zeker dat u "{title}" en alle taalversies wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
        successTitle: "Gelukt",

        languages: {
            rw: "Kinyarwanda",
            en: "Engels",
            fr: "Frans",
            nl: "Nederlands",
        },
    },
};

export default function Index({ documents }) {
    const { props } = usePage();
    const status = props.flash?.status;

    const [search, setSearch] = useState("");

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    | Reads the shared language on mount and subscribes to the
    | "gaf-language-change" window event (see resources/js/lib/language.js)
    | so switching languages from AdminLayout's header dropdown updates this
    | page immediately too.
    */

    const [language, setLanguage] = useState(getLanguage);

    const t = translations[language] || translations.en;

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguage(event.detail);
        };

        window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);

        return () => {
            window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
        };
    }, []);

    const destroy = (doc) => {
        if (confirm(t.deleteConfirm.replace("{title}", doc.title))) {
            router.delete(route("admin.documents.destroy", doc.id));
        }
    };

    const filteredDocuments = useMemo(() => {
        if (!search.trim()) return documents.data;

        return documents.data.filter((doc) =>
            doc.title.toLowerCase().includes(search.toLowerCase()),
        );
    }, [documents.data, search]);

    return (
        <AdminLayout title={t.documents}>
            <div className="documents-page">
                {/* ================= HEADER ================= */}
                <div className="page-header">
                    <div className="page-heading">
                        <div className="heading-icon">
                            <FileStack size={24} strokeWidth={2} />
                        </div>

                        <div>
                            <h1>{t.documents}</h1>
                            <p>{t.pageDescription}</p>
                        </div>
                    </div>

                    <Link
                        href={route("admin.documents.create")}
                        className="upload-btn"
                    >
                        <Upload size={18} />
                        <span>{t.uploadDocument}</span>
                    </Link>
                </div>

                {/* ================= FLASH MESSAGE ================= */}
                {status && (
                    <div className="success-alert">
                        <div className="success-icon">✓</div>
                        <div>
                            <strong>{t.successTitle}</strong>
                            <p>{status}</p>
                        </div>
                    </div>
                )}

                {/* ================= STATS ================= */}
                <div className="document-stats">
                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <FileText size={20} />
                        </div>

                        <div>
                            <span>{t.totalDocuments}</span>
                            <strong>{documents.total}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon purple">
                            <Languages size={20} />
                        </div>

                        <div>
                            <span>{t.languageVersions}</span>
                            <strong>
                                {documents.data.reduce(
                                    (total, doc) => total + doc.versions.length,
                                    0,
                                )}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <CalendarDays size={20} />
                        </div>

                        <div>
                            <span>{t.currentPage}</span>
                            <strong>
                                {documents.current_page} / {documents.last_page}
                            </strong>
                        </div>
                    </div>
                </div>

                {/* ================= DOCUMENT CARD ================= */}
                <div className="documents-card">
                    {/* CARD HEADER */}
                    <div className="documents-toolbar">
                        <div>
                            <h2>{t.allDocuments}</h2>
                            <p>
                                {documents.total}{" "}
                                {documents.total === 1
                                    ? t.documentCountSingular
                                    : t.documentCountPlural}
                            </p>
                        </div>

                        <div className="search-box">
                            <Search size={17} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ================= EMPTY STATE ================= */}
                    {filteredDocuments.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <FileText size={34} />
                            </div>

                            {search ? (
                                <>
                                    <h3>{t.noDocumentsFound}</h3>
                                    <p>
                                        {t.noDocumentsFoundDescription.replace(
                                            "{search}",
                                            search,
                                        )}
                                    </p>

                                    <button
                                        className="clear-search"
                                        onClick={() => setSearch("")}
                                    >
                                        {t.clearSearch}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3>{t.noDocumentsYet}</h3>
                                    <p>{t.noDocumentsYetDescription}</p>

                                    <Link
                                        href={route("admin.documents.create")}
                                        className="empty-upload-btn"
                                    >
                                        <Upload size={17} />
                                        {t.uploadDocument}
                                    </Link>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* ================= DESKTOP TABLE ================= */}
                            <div className="table-wrapper">
                                <table className="documents-table">
                                    <thead>
                                        <tr>
                                            <th>{t.colDocument}</th>
                                            <th>{t.colLanguages}</th>
                                            <th>{t.colUploaded}</th>
                                            <th className="actions-header">
                                                {t.colActions}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredDocuments.map((doc) => (
                                            <tr key={doc.id}>
                                                {/* DOCUMENT */}
                                                <td>
                                                    <div className="document-info">
                                                        <div className="document-icon">
                                                            <FileText
                                                                size={21}
                                                            />
                                                        </div>

                                                        <div>
                                                            <div className="document-title">
                                                                {doc.title}
                                                            </div>

                                                            <div className="document-id">
                                                                {
                                                                    t.documentHash
                                                                }
                                                                {doc.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* LANGUAGES */}
                                                <td>
                                                    {doc.versions.length ===
                                                    0 ? (
                                                        <span className="no-language">
                                                            {t.noVersions}
                                                        </span>
                                                    ) : (
                                                        <div className="language-list">
                                                            {doc.versions.map(
                                                                (version) => (
                                                                    <span
                                                                        key={
                                                                            version.id
                                                                        }
                                                                        className="language-pill"
                                                                    >
                                                                        <Languages
                                                                            size={
                                                                                13
                                                                            }
                                                                        />
                                                                        {
                                                                            version.language_label
                                                                        }
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* DATE */}
                                                <td>
                                                    <div className="date-info">
                                                        <CalendarDays
                                                            size={15}
                                                        />
                                                        {doc.created_at_date}
                                                    </div>
                                                </td>

                                                {/* ACTIONS */}
                                                <td>
                                                    <div className="actions">
                                                        <Link
                                                            href={route(
                                                                "admin.documents.view",
                                                                doc.id,
                                                            )}
                                                            className="action-btn view"
                                                            title={t.view}
                                                        >
                                                            <Eye size={16} />
                                                            <span>
                                                                {t.view}
                                                            </span>
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                "admin.activity.index",
                                                                {
                                                                    document:
                                                                        doc.id,
                                                                },
                                                            )}
                                                            className="action-btn activity"
                                                            title={t.activity}
                                                        >
                                                            <Activity
                                                                size={16}
                                                            />
                                                            <span>
                                                                {t.activity}
                                                            </span>
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                "admin.documents.edit",
                                                                doc.id,
                                                            )}
                                                            className="action-btn edit"
                                                            title={t.edit}
                                                        >
                                                            <Pencil size={16} />
                                                            <span>
                                                                {t.edit}
                                                            </span>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="action-btn delete"
                                                            onClick={() =>
                                                                destroy(doc)
                                                            }
                                                            title={t.delete}
                                                        >
                                                            <Trash2 size={16} />
                                                            <span>
                                                                {t.delete}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ================= MOBILE CARDS ================= */}
                            <div className="mobile-documents">
                                {filteredDocuments.map((doc) => (
                                    <div
                                        className="mobile-document"
                                        key={doc.id}
                                    >
                                        <div className="mobile-document-top">
                                            <div className="document-info">
                                                <div className="document-icon">
                                                    <FileText size={20} />
                                                </div>

                                                <div>
                                                    <div className="document-title">
                                                        {doc.title}
                                                    </div>

                                                    <div className="document-id">
                                                        #{doc.id}
                                                    </div>
                                                </div>
                                            </div>

                                            <MoreHorizontal size={20} />
                                        </div>

                                        <div className="mobile-meta">
                                            <div>
                                                <span>
                                                    {t.colLanguages}
                                                </span>

                                                <div className="language-list">
                                                    {doc.versions.length ===
                                                    0 ? (
                                                        <span className="no-language">
                                                            {t.none}
                                                        </span>
                                                    ) : (
                                                        doc.versions.map(
                                                            (version) => (
                                                                <span
                                                                    key={
                                                                        version.id
                                                                    }
                                                                    className="language-pill"
                                                                >
                                                                    {
                                                                        version.language_label
                                                                    }
                                                                </span>
                                                            ),
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <span>
                                                    {t.colUploaded}
                                                </span>

                                                <strong>
                                                    {doc.created_at_date}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="mobile-actions">
                                            <Link
                                                href={route(
                                                    "admin.documents.view",
                                                    doc.id,
                                                )}
                                                className="action-btn view"
                                            >
                                                <Eye size={16} />
                                                {t.view}
                                            </Link>

                                            <Link
                                                href={route(
                                                    "admin.activity.index",
                                                    {
                                                        document: doc.id,
                                                    },
                                                )}
                                                className="action-btn activity"
                                            >
                                                <Activity size={16} />
                                                {t.activity}
                                            </Link>

                                            <Link
                                                href={route(
                                                    "admin.documents.edit",
                                                    doc.id,
                                                )}
                                                className="action-btn edit"
                                            >
                                                <Pencil size={16} />
                                                {t.edit}
                                            </Link>

                                            <button
                                                type="button"
                                                className="action-btn delete"
                                                onClick={() => destroy(doc)}
                                            >
                                                <Trash2 size={16} />
                                                {t.delete}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ================= PAGINATION ================= */}
                            {documents.last_page > 1 && (
                                <div className="pagination-wrapper">
                                    <Pagination links={documents.links} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* ================= STYLES ================= */}
            <style>{`
                .documents-page {
                    --primary: #5D89C8;
                    --primary-dark: #416FAE;
                    --text: #172033;
                    --muted: #718096;
                    --border: #E7EBF2;
                    --background: #F6F8FB;
                    --white: #FFFFFF;

                    padding: 28px;
                    min-height: 100%;
                    background: var(--background);
                }

                /* ================= HEADER ================= */

                .page-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 26px;
                }

                .page-heading {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .heading-icon {
                    width: 48px;
                    height: 48px;
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
                    letter-spacing: -0.5px;
                }

                .page-heading p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 14px;
                }

                .upload-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 17px;
                    border-radius: 10px;
                    background: var(--primary);
                    color: white;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 650;
                    transition: .2s ease;
                    box-shadow: 0 4px 12px rgba(93, 137, 200, .20);
                }

                .upload-btn:hover {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                    color: white;
                }

                /* ================= ALERT ================= */

                .success-alert {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 16px;
                    margin-bottom: 22px;
                    background: #F0FAF4;
                    border: 1px solid #D3EFDC;
                    border-radius: 12px;
                    color: #237A43;
                }

                .success-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #D9F2E1;
                    font-weight: 800;
                }

                .success-alert strong {
                    display: block;
                    font-size: 13px;
                }

                .success-alert p {
                    margin: 2px 0 0;
                    font-size: 13px;
                }

                /* ================= STATS ================= */

                .document-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 22px;
                }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 18px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    box-shadow: 0 2px 8px rgba(20, 30, 50, .03);
                }

                .stat-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-icon.blue {
                    background: #EAF1FC;
                    color: #5D89C8;
                }

                .stat-icon.purple {
                    background: #F1ECFC;
                    color: #805AD5;
                }

                .stat-icon.green {
                    background: #E9F7EF;
                    color: #31945A;
                }

                .stat-card span {
                    display: block;
                    color: var(--muted);
                    font-size: 12px;
                    margin-bottom: 3px;
                }

                .stat-card strong {
                    color: var(--text);
                    font-size: 21px;
                    font-weight: 750;
                }

                /* ================= CARD ================= */

                .documents-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .035);
                }

                .documents-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    padding: 20px 22px;
                    border-bottom: 1px solid var(--border);
                }

                .documents-toolbar h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 16px;
                    font-weight: 700;
                }

                .documents-toolbar p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 12px;
                }

                .search-box {
                    width: 280px;
                    height: 39px;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 0 12px;
                    border: 1px solid var(--border);
                    border-radius: 9px;
                    color: #98A2B3;
                    background: #FAFBFC;
                }

                .search-box:focus-within {
                    border-color: var(--primary);
                    background: white;
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .10);
                }

                .search-box input {
                    width: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: var(--text);
                    font-size: 13px;
                }

                .search-box input::placeholder {
                    color: #A0A8B5;
                }

                /* ================= TABLE ================= */

                .table-wrapper {
                    overflow-x: auto;
                }

                .documents-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .documents-table th {
                    padding: 12px 22px;
                    text-align: left;
                    background: #FAFBFC;
                    border-bottom: 1px solid var(--border);
                    color: #8A94A6;
                    font-size: 10px;
                    font-weight: 750;
                    letter-spacing: .6px;
                }

                .documents-table td {
                    padding: 17px 22px;
                    border-bottom: 1px solid #F0F2F5;
                    vertical-align: middle;
                }

                .documents-table tbody tr {
                    transition: background .15s ease;
                }

                .documents-table tbody tr:hover {
                    background: #FBFCFE;
                }

                .documents-table tbody tr:last-child td {
                    border-bottom: none;
                }

                /* ================= DOCUMENT ================= */

                .document-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .document-icon {
                    flex: 0 0 auto;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .document-title {
                    max-width: 280px;
                    color: var(--text);
                    font-size: 14px;
                    font-weight: 650;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .document-id {
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 11px;
                }

                /* ================= LANGUAGES ================= */

                .language-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .language-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 5px 8px;
                    border-radius: 6px;
                    background: #F0F4FA;
                    color: #526581;
                    font-size: 11px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .no-language {
                    color: #A0A8B5;
                    font-size: 12px;
                }

                /* ================= DATE ================= */

                .date-info {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #667085;
                    font-size: 12px;
                    white-space: nowrap;
                }

                /* ================= ACTIONS ================= */

                .actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 6px;
                }

                .action-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    height: 34px;
                    padding: 0 10px;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                    cursor: pointer;
                    transition: .15s ease;
                    background: white;
                }

                .action-btn.view {
                    color: #416FAE;
                    border-color: #D8E5F7;
                    background: #F5F9FF;
                }

                .action-btn.view:hover {
                    background: #EAF1FC;
                    border-color: #BFD3EE;
                }

                .action-btn.activity {
                    color: #526581;
                    border-color: #E3E8EF;
                }

                .action-btn.activity:hover {
                    background: #F5F7FA;
                    border-color: #CBD3DE;
                }

                .action-btn.edit {
                    color: #4C72A9;
                    border-color: #DCE8F8;
                    background: #F7FAFE;
                }

                .action-btn.edit:hover {
                    background: #EAF1FC;
                }

                .action-btn.delete {
                    color: #D14B58;
                    border-color: #F2D9DC;
                    background: #FFF9FA;
                }

                .action-btn.delete:hover {
                    background: #FFF0F2;
                    border-color: #E9B9BF;
                }

                /* ================= EMPTY ================= */

                .empty-state {
                    padding: 75px 25px;
                    text-align: center;
                }

                .empty-icon {
                    width: 68px;
                    height: 68px;
                    margin: 0 auto 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .empty-state h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 17px;
                }

                .empty-state p {
                    max-width: 420px;
                    margin: 7px auto 20px;
                    color: var(--muted);
                    font-size: 13px;
                    line-height: 1.6;
                }

                .empty-upload-btn,
                .clear-search {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 14px;
                    border: none;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    font-size: 12px;
                    font-weight: 650;
                    text-decoration: none;
                    cursor: pointer;
                }

                .clear-search {
                    background: #EEF2F7;
                    color: #526581;
                }

                /* ================= PAGINATION ================= */

                .pagination-wrapper {
                    padding: 16px 22px;
                    border-top: 1px solid var(--border);
                }

                /* ================= MOBILE ================= */

                .mobile-documents {
                    display: none;
                }

                @media (max-width: 1000px) {
                    .actions .action-btn span {
                        display: none;
                    }

                    .action-btn {
                        width: 34px;
                        padding: 0;
                    }
                }

                @media (max-width: 760px) {
                    .documents-page {
                        padding: 18px 14px;
                    }

                    .page-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .upload-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .document-stats {
                        grid-template-columns: 1fr;
                    }

                    .documents-toolbar {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .table-wrapper {
                        display: none;
                    }

                    .mobile-documents {
                        display: block;
                    }

                    .mobile-document {
                        padding: 17px;
                        border-bottom: 1px solid var(--border);
                    }

                    .mobile-document:last-child {
                        border-bottom: none;
                    }

                    .mobile-document-top {
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        gap: 10px;
                    }

                    .mobile-meta {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-top: 17px;
                        padding: 14px 0;
                        border-top: 1px solid #F0F2F5;
                        border-bottom: 1px solid #F0F2F5;
                    }

                    .mobile-meta > div > span {
                        display: block;
                        margin-bottom: 6px;
                        color: #98A2B3;
                        font-size: 10px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: .4px;
                    }

                    .mobile-meta strong {
                        color: #526581;
                        font-size: 12px;
                        font-weight: 600;
                    }

                    .mobile-actions {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 6px;
                        margin-top: 13px;
                    }

                    .mobile-actions .action-btn {
                        width: 100%;
                        height: 36px;
                    }

                    .mobile-actions .action-btn span {
                        display: inline;
                    }

                    .document-title {
                        max-width: 220px;
                    }
                }

                @media (max-width: 480px) {
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

                    .mobile-actions {
                        grid-template-columns: 1fr;
                    }

                    .mobile-actions .action-btn {
                        justify-content: center;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}