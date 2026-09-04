import { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import { getLanguage, LANGUAGE_EVENT } from "@/lib/language";

const translations = {
    rw: {
        dashboard: "Imbonerahamwe",
        organizationOverview: "INCAMAKE Y’UMURYANGO",
        dashboardDescription:
            "Kurikirana urubuga rw’inyandiko, ibikoresho, abasoma n’ibikorwa by’umuryango ahantu hamwe.",
        askAnalytics: "Baza Analytics",
        uploadDocument: "Shyiraho Inyandiko",

        resources: "IBIKORESHO",
        readers: "ABASOMA",
        administration: "UBUYOBOZI",

        totalDocuments: "Inyandiko zose ziboneka ku rubuga",
        registeredReaders: "Konti z’abasoma zanditswe",
        activeAdministrators: "Konti z’abayobozi zikora",

        manageDocuments: "Gucunga inyandiko",
        manageReaders: "Gucunga abasoma",
        viewAccounts: "Reba konti",

        portalIntelligence: "UBWENGE BW’URUBUGA",
        analyticsTitle: "Baza ibibazo ku muryango wawe",
        analyticsDescription:
            "Koresha umufasha wa analytics kugira ngo usesengure inyandiko, konti z’abasoma, indimi n’ibikorwa by’urubuga.",
        startAnalysis: "Tangira isesengura",

        shortcuts: "SHORTCUTS",
        quickAccess: "Kwinjira vuba",

        addDocument: "Ongeramo Inyandiko",
        addDocumentDescription: "Shyiraho ibikoresho bishya",

        manageDocumentsTitle: "Gucunga Inyandiko",
        manageDocumentsDescription: "Reba ibikoresho biri ku rubuga",

        readerAccounts: "Konti z’Abasoma",
        readerAccountsDescription: "Gucunga abasoma biyandikishije",

        activityLog: "Amateka y’Ibikorwa",
        activityLogDescription: "Reba ibikorwa byabereye ku rubuga",

        latestResources: "IBIKORESHO BISHYA",
        recentDocuments: "Inyandiko ziheruka",
        viewAll: "Reba byose",

        noDocuments: "Nta nyandiko zirashyirwaho",
        noDocumentsDescription:
            "Shyiraho igikoresho cya mbere kugira ngo utangire kubaka ububiko bw’inyandiko.",
        noLanguageVersions: "Nta verisiyo y’ururimi ihari",

        analyticsAssistant: "Umufasha wa Analytics",
        portalIntelligenceShort: "Ubwenge bw’urubuga",
        howCanIHelp: "Nakugirira iki?",
        askPortalQuestions:
            "Mbaza ibibazo ku rubuga rw’inyandiko n’umuryango wawe.",
        tryAsking: "Gerageza kubaza",
        askPlaceholder: "Baza ku rubuga rwawe...",

        greeting:
            "Muraho! Ndi umufasha wanyu wa portal analytics. Nshobora kubafasha gusobanukirwa inyandiko, abasoma, indimi n’ibikorwa by’urubuga.",

        quickOverview: "Mpa incamake y’urubuga",
        quickDocuments: "Sesengura inyandiko zacu",
        quickReaders: "Sesengura konti z’abasoma",
        quickLanguages: "Ni izihe ndimi zifite ibikoresho byinshi?",

        analyticsError: "Isesengura ntiryashobotse. Ongera ugerageze.",
    },

    en: {
        dashboard: "Dashboard",
        organizationOverview: "ORGANIZATION OVERVIEW",
        dashboardDescription:
            "Monitor your document portal, resources, readers and organizational activity from one place.",
        askAnalytics: "Ask Analytics",
        uploadDocument: "Upload Document",

        resources: "RESOURCES",
        readers: "READERS",
        administration: "ADMINISTRATION",

        totalDocuments: "Total documents available in the portal",
        registeredReaders: "Registered reader accounts",
        activeAdministrators: "Active administrator accounts",

        manageDocuments: "Manage documents",
        manageReaders: "Manage readers",
        viewAccounts: "View accounts",

        portalIntelligence: "PORTAL INTELLIGENCE",
        analyticsTitle: "Ask questions about your organization",
        analyticsDescription:
            "Use the analytics assistant to explore your documents, reader accounts, languages and portal activity.",
        startAnalysis: "Start analysis",

        shortcuts: "SHORTCUTS",
        quickAccess: "Quick Access",

        addDocument: "Add Document",
        addDocumentDescription: "Upload a new resource",

        manageDocumentsTitle: "Manage Documents",
        manageDocumentsDescription: "Browse portal resources",

        readerAccounts: "Reader Accounts",
        readerAccountsDescription: "Manage registered readers",

        activityLog: "Activity Log",
        activityLogDescription: "Review portal activity",

        latestResources: "LATEST RESOURCES",
        recentDocuments: "Recent Documents",
        viewAll: "View all",

        noDocuments: "No documents uploaded yet",
        noDocumentsDescription:
            "Upload your first resource to start building the document library.",
        noLanguageVersions: "No language versions",

        analyticsAssistant: "Analytics Assistant",
        portalIntelligenceShort: "Portal intelligence",
        howCanIHelp: "How can I help?",
        askPortalQuestions:
            "Ask me questions about your document portal and organization.",
        tryAsking: "Try asking",
        askPlaceholder: "Ask about your portal...",

        greeting:
            "Hello! I’m your portal analytics assistant. I can help you understand documents, readers, languages, and portal activity.",

        quickOverview: "Give me a portal overview",
        quickDocuments: "Analyze our documents",
        quickReaders: "Analyze our reader accounts",
        quickLanguages: "Which languages have the most resources?",

        analyticsError: "Analytics request failed. Please try again.",
    },

    fr: {
        dashboard: "Tableau de bord",
        organizationOverview: "APERÇU DE L’ORGANISATION",
        dashboardDescription:
            "Surveillez votre portail documentaire, vos ressources, vos lecteurs et les activités de l’organisation depuis un seul endroit.",
        askAnalytics: "Demander une analyse",
        uploadDocument: "Télécharger un document",

        resources: "RESSOURCES",
        readers: "LECTEURS",
        administration: "ADMINISTRATION",

        totalDocuments: "Nombre total de documents disponibles",
        registeredReaders: "Comptes lecteurs enregistrés",
        activeAdministrators: "Comptes administrateurs actifs",

        manageDocuments: "Gérer les documents",
        manageReaders: "Gérer les lecteurs",
        viewAccounts: "Voir les comptes",

        portalIntelligence: "INTELLIGENCE DU PORTAIL",
        analyticsTitle: "Posez des questions sur votre organisation",
        analyticsDescription:
            "Utilisez l’assistant analytique pour explorer vos documents, comptes lecteurs, langues et activités du portail.",
        startAnalysis: "Commencer l’analyse",

        shortcuts: "RACCOURCIS",
        quickAccess: "Accès rapide",

        addDocument: "Ajouter un document",
        addDocumentDescription: "Télécharger une nouvelle ressource",

        manageDocumentsTitle: "Gérer les documents",
        manageDocumentsDescription: "Parcourir les ressources du portail",

        readerAccounts: "Comptes lecteurs",
        readerAccountsDescription: "Gérer les lecteurs enregistrés",

        activityLog: "Journal d’activité",
        activityLogDescription: "Consulter les activités du portail",

        latestResources: "DERNIÈRES RESSOURCES",
        recentDocuments: "Documents récents",
        viewAll: "Voir tout",

        noDocuments: "Aucun document téléchargé",
        noDocumentsDescription:
            "Téléchargez votre première ressource pour commencer à créer la bibliothèque documentaire.",
        noLanguageVersions: "Aucune version linguistique",

        analyticsAssistant: "Assistant analytique",
        portalIntelligenceShort: "Intelligence du portail",
        howCanIHelp: "Comment puis-je vous aider ?",
        askPortalQuestions:
            "Posez-moi des questions sur votre portail documentaire et votre organisation.",
        tryAsking: "Essayez de demander",
        askPlaceholder: "Posez une question sur votre portail...",

        greeting:
            "Bonjour ! Je suis votre assistant analytique du portail. Je peux vous aider à comprendre les documents, les lecteurs, les langues et les activités du portail.",

        quickOverview: "Donnez-moi un aperçu du portail",
        quickDocuments: "Analysez nos documents",
        quickReaders: "Analysez nos comptes lecteurs",
        quickLanguages: "Quelles langues ont le plus de ressources ?",

        analyticsError: "La demande d’analyse a échoué. Veuillez réessayer.",
    },

    nl: {
        dashboard: "Dashboard",
        organizationOverview: "ORGANISATIEOVERZICHT",
        dashboardDescription:
            "Monitor uw documentenportaal, bronnen, lezers en organisatieactiviteiten vanuit één plek.",
        askAnalytics: "Analytics vragen",
        uploadDocument: "Document uploaden",

        resources: "BRONNEN",
        readers: "LEZERS",
        administration: "BEHEER",

        totalDocuments: "Totaal aantal beschikbare documenten",
        registeredReaders: "Geregistreerde lezersaccounts",
        activeAdministrators: "Actieve beheerdersaccounts",

        manageDocuments: "Documenten beheren",
        manageReaders: "Lezers beheren",
        viewAccounts: "Accounts bekijken",

        portalIntelligence: "PORTALINTELLIGENTIE",
        analyticsTitle: "Stel vragen over uw organisatie",
        analyticsDescription:
            "Gebruik de analytics-assistent om documenten, lezersaccounts, talen en portalactiviteiten te onderzoeken.",
        startAnalysis: "Analyse starten",

        shortcuts: "SNELKOPPELINGEN",
        quickAccess: "Snelle toegang",

        addDocument: "Document toevoegen",
        addDocumentDescription: "Een nieuwe bron uploaden",

        manageDocumentsTitle: "Documenten beheren",
        manageDocumentsDescription: "Portalbronnen bekijken",

        readerAccounts: "Lezersaccounts",
        readerAccountsDescription: "Geregistreerde lezers beheren",

        activityLog: "Activiteitenlogboek",
        activityLogDescription: "Portalactiviteiten bekijken",

        latestResources: "LAATSTE BRONNEN",
        recentDocuments: "Recente documenten",
        viewAll: "Alles bekijken",

        noDocuments: "Nog geen documenten geüpload",
        noDocumentsDescription:
            "Upload uw eerste bron om de documentbibliotheek op te bouwen.",
        noLanguageVersions: "Geen taalversies",

        analyticsAssistant: "Analytics-assistent",
        portalIntelligenceShort: "Portalintelligentie",
        howCanIHelp: "Hoe kan ik helpen?",
        askPortalQuestions:
            "Stel vragen over uw documentenportaal en organisatie.",
        tryAsking: "Probeer te vragen",
        askPlaceholder: "Vraag iets over uw portal...",

        greeting:
            "Hallo! Ik ben uw portal analytics-assistent. Ik kan u helpen met documenten, lezers, talen en portalactiviteiten.",

        quickOverview: "Geef me een portaloverzicht",
        quickDocuments: "Analyseer onze documenten",
        quickReaders: "Analyseer onze lezersaccounts",
        quickLanguages: "Welke talen hebben de meeste bronnen?",

        analyticsError: "Analytics-aanvraag mislukt. Probeer het opnieuw.",
    },
};

export default function Dashboard({ stats, recentDocuments }) {
    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    | Reads the shared language on mount and subscribes to the
    | "gaf-language-change" window event (see resources/js/lib/language.js)
    | so that switching languages from AdminLayout's header dropdown --
    | or from anywhere else -- updates this page immediately too, instead
    | of only taking effect after a full reload.
    */

    const [language, setLanguage] = useState(getLanguage);

    const [chatOpen, setChatOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [processing, setProcessing] = useState(false);
    const [analyticsError, setAnalyticsError] = useState(null);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            message: translations[getLanguage()].greeting,
        },
    ]);

    const messagesEndRef = useRef(null);

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

    useEffect(() => {
        document.documentElement.lang = language;

        setMessages((currentMessages) => {
            if (
                currentMessages.length === 1 &&
                currentMessages[0].role === "assistant"
            ) {
                return [
                    {
                        role: "assistant",
                        message: t.greeting,
                    },
                ];
            }

            return currentMessages;
        });
    }, [language]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, processing]);

    const formatNumber = (value) => {
        return new Intl.NumberFormat().format(value ?? 0);
    };

    const askAnalytics = async (questionToAsk = question) => {
        const cleanQuestion = questionToAsk.trim();

        if (!cleanQuestion || processing) {
            return;
        }

        setProcessing(true);
        setAnalyticsError(null);

        setMessages((currentMessages) => [
            ...currentMessages,
            {
                role: "user",
                message: cleanQuestion,
            },
        ]);

        try {
            const response = await fetch(route("admin.analytics.chat"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    question: cleanQuestion,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();

                console.error("Analytics API error:", {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText,
                });

                throw new Error(
                    `Analytics request failed (${response.status})`,
                );
            }

            const data = await response.json();

            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    role: "assistant",
                    message:
                        data.answer ||
                        "I was unable to generate an answer.",
                },
            ]);

            setQuestion("");
        } catch (error) {
            console.error("Analytics request failed:", error);

            setAnalyticsError(error.message);

            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    role: "assistant",
                    message: t.analyticsError,
                },
            ]);
        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        askAnalytics();
    };

    const quickQuestions = [
        t.quickOverview,
        t.quickDocuments,
        t.quickReaders,
        t.quickLanguages,
    ];

    return (
        <>
            <Head title={t.dashboard} />

            <AdminLayout title={t.dashboard}>
                <div className="ngo-dashboard">
                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}

                    <section className="dashboard-header">
                        <div>
                            <div className="eyebrow">
                                {t.organizationOverview}
                            </div>

                            <h1>{t.dashboard}</h1>

                            <p>{t.dashboardDescription}</p>
                        </div>

                        <div className="header-actions">
                            <button
                                type="button"
                                className="analytics-button"
                                onClick={() => setChatOpen(true)}
                            >
                                <span className="button-icon">✦</span>

                                {t.askAnalytics}
                            </button>

                            <Link
                                href={route("admin.documents.create")}
                                className="upload-button"
                            >
                                <span>＋</span>

                                {t.uploadDocument}
                            </Link>
                        </div>
                    </section>

                    {/* =====================================================
                        KPI CARDS
                    ====================================================== */}

                    <section className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon documents-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line
                                            x1="8"
                                            y1="13"
                                            x2="16"
                                            y2="13"
                                        />
                                        <line
                                            x1="8"
                                            y1="17"
                                            x2="16"
                                            y2="17"
                                        />
                                    </svg>
                                </div>

                                <span className="stat-label">
                                    {t.resources}
                                </span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.documents)}
                            </div>

                            <div className="stat-description">
                                {t.totalDocuments}
                            </div>

                            <Link
                                href={route("admin.documents.index")}
                                className="stat-link"
                            >
                                {t.manageDocuments}

                                <span>→</span>
                            </Link>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon readers-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>

                                <span className="stat-label">
                                    {t.readers}
                                </span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.users)}
                            </div>

                            <div className="stat-description">
                                {t.registeredReaders}
                            </div>

                            <Link
                                href={route("admin.users.index")}
                                className="stat-link"
                            >
                                {t.manageReaders}

                                <span>→</span>
                            </Link>
                        </div>

                        <div className="stat-card">
                            <div className="stat-top">
                                <div className="stat-icon admin-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M12 2l3 5 5.5 1.5-3.5 4.5.5 5.5L12 16l-5.5 2.5.5-5.5L3.5 8.5 9 7z" />
                                    </svg>
                                </div>

                                <span className="stat-label">
                                    {t.administration}
                                </span>
                            </div>

                            <div className="stat-value">
                                {formatNumber(stats?.admins)}
                            </div>

                            <div className="stat-description">
                                {t.activeAdministrators}
                            </div>

                            <Link
                                href={route("admin.users.index")}
                                className="stat-link"
                            >
                                {t.viewAccounts}

                                <span>→</span>
                            </Link>
                        </div>
                    </section>

                    {/* =====================================================
                        ANALYTICS BANNER
                    ====================================================== */}

                    <section className="analytics-banner">
                        <div className="analytics-banner-icon">✦</div>

                        <div className="analytics-banner-content">
                            <span>{t.portalIntelligence}</span>

                            <h2>{t.analyticsTitle}</h2>

                            <p>{t.analyticsDescription}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setChatOpen(true)}
                            className="analytics-banner-button"
                        >
                            {t.startAnalysis}

                            <span>→</span>
                        </button>
                    </section>

                    {/* =====================================================
                        MAIN CONTENT
                    ====================================================== */}

                    <div className="dashboard-columns">
                        {/* QUICK ACCESS */}

                        <section className="content-card quick-access-card">
                            <div className="card-heading">
                                <div>
                                    <span className="card-eyebrow">
                                        {t.shortcuts}
                                    </span>

                                    <h2>{t.quickAccess}</h2>
                                </div>
                            </div>

                            <div className="quick-actions">
                                <Link
                                    href={route("admin.documents.create")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">＋</div>

                                    <div>
                                        <strong>{t.addDocument}</strong>

                                        <span>
                                            {t.addDocumentDescription}
                                        </span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.documents.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">▤</div>

                                    <div>
                                        <strong>
                                            {t.manageDocumentsTitle}
                                        </strong>

                                        <span>
                                            {t.manageDocumentsDescription}
                                        </span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.users.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">♙</div>

                                    <div>
                                        <strong>{t.readerAccounts}</strong>

                                        <span>
                                            {t.readerAccountsDescription}
                                        </span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>

                                <Link
                                    href={route("admin.activity.index")}
                                    className="quick-action"
                                >
                                    <div className="quick-icon">◷</div>

                                    <div>
                                        <strong>{t.activityLog}</strong>

                                        <span>{t.activityLogDescription}</span>
                                    </div>

                                    <span className="quick-arrow">→</span>
                                </Link>
                            </div>
                        </section>

                        {/* RECENT DOCUMENTS */}

                        <section className="content-card recent-card">
                            <div className="card-heading">
                                <div>
                                    <span className="card-eyebrow">
                                        {t.latestResources}
                                    </span>

                                    <h2>{t.recentDocuments}</h2>
                                </div>

                                <Link
                                    href={route("admin.documents.index")}
                                    className="view-all"
                                >
                                    {t.viewAll}

                                    <span>→</span>
                                </Link>
                            </div>

                            {recentDocuments?.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">▤</div>

                                    <h3>{t.noDocuments}</h3>

                                    <p>{t.noDocumentsDescription}</p>

                                    <Link
                                        href={route(
                                            "admin.documents.create",
                                        )}
                                        className="empty-button"
                                    >
                                        {t.uploadDocument}
                                    </Link>
                                </div>
                            ) : (
                                <div className="documents-list">
                                    {recentDocuments.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={route(
                                                "admin.documents.edit",
                                                doc.id,
                                            )}
                                            className="document-row"
                                        >
                                            <div className="document-icon">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                >
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                            </div>

                                            <div className="document-info">
                                                <strong>{doc.title}</strong>

                                                <div className="document-meta">
                                                    {doc.versions?.length >
                                                    0 ? (
                                                        doc.versions.map(
                                                            (version) => (
                                                                <span
                                                                    key={
                                                                        version.id
                                                                    }
                                                                    className="language-tag"
                                                                >
                                                                    {
                                                                        version.language_label
                                                                    }
                                                                </span>
                                                            ),
                                                        )
                                                    ) : (
                                                        <span>
                                                            {
                                                                t.noLanguageVersions
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="document-date">
                                                {doc.created_at_human}
                                            </div>

                                            <div className="document-arrow">
                                                →
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* =====================================================
                        ANALYTICS CHAT
                    ====================================================== */}

                    {chatOpen && (
                        <>
                            <div
                                className="chat-overlay"
                                onClick={() => setChatOpen(false)}
                            />

                            <aside className="analytics-chat">
                                <div className="chat-header">
                                    <div className="chat-header-left">
                                        <div className="chat-avatar">✦</div>

                                        <div>
                                            <strong>
                                                {t.analyticsAssistant}
                                            </strong>

                                            <span>
                                                {t.portalIntelligenceShort}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="chat-close"
                                        onClick={() => setChatOpen(false)}
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="chat-body">
                                    <div className="chat-introduction">
                                        <div className="chat-welcome-icon">
                                            ✦
                                        </div>

                                        <h3>{t.howCanIHelp}</h3>

                                        <p>{t.askPortalQuestions}</p>
                                    </div>

                                    {analyticsError && (
                                        <div className="analytics-error">
                                            {t.analyticsError}
                                        </div>
                                    )}

                                    <div className="chat-messages">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`chat-message ${
                                                    message.role === "user"
                                                        ? "user-message"
                                                        : "assistant-message"
                                                }`}
                                            >
                                                {message.role ===
                                                    "assistant" && (
                                                    <div className="message-avatar">
                                                        ✦
                                                    </div>
                                                )}

                                                <div className="message-bubble">
                                                    {message.message}
                                                </div>
                                            </div>
                                        ))}

                                        {processing && (
                                            <div className="chat-message assistant-message">
                                                <div className="message-avatar">
                                                    ✦
                                                </div>

                                                <div className="message-bubble typing">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>

                                    <div className="suggestions">
                                        <span>{t.tryAsking}</span>

                                        {quickQuestions.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() =>
                                                    askAnalytics(item)
                                                }
                                                disabled={processing}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="chat-input-area"
                                >
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                        placeholder={t.askPlaceholder}
                                        disabled={processing}
                                    />

                                    <button
                                        type="submit"
                                        disabled={
                                            processing || !question.trim()
                                        }
                                        aria-label="Send"
                                    >
                                        ↑
                                    </button>
                                </form>
                            </aside>
                        </>
                    )}
                </div>

                {/* =========================================================
                    PAGE STYLES
                ========================================================== */}

                <style>{`
                    .ngo-dashboard {
                        --ngo-blue: #5D89C8;
                        --ngo-blue-dark: #416FAE;
                        --ngo-blue-soft: #EEF4FC;
                        --ngo-blue-pale: #F7FAFE;

                        --ngo-ink: #17202A;
                        --ngo-muted: #718096;
                        --ngo-border: #E5EAF0;
                        --ngo-bg: #F6F8FB;
                        --ngo-white: #FFFFFF;

                        min-height: 100%;
                        color: var(--ngo-ink);
                    }

                    .dashboard-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        gap: 2rem;
                        margin-bottom: 2rem;
                    }

                    .eyebrow,
                    .card-eyebrow {
                        font-size: .68rem;
                        font-weight: 800;
                        letter-spacing: .14em;
                        color: var(--ngo-blue);
                        margin-bottom: .45rem;
                    }

                    .dashboard-header h1 {
                        margin: 0;
                        font-size: 2rem;
                        line-height: 1.15;
                        font-weight: 750;
                        letter-spacing: -.035em;
                    }

                    .dashboard-header p {
                        margin: .65rem 0 0;
                        max-width: 680px;
                        color: var(--ngo-muted);
                        font-size: .93rem;
                        line-height: 1.6;
                    }

                    .header-actions {
                        display: flex;
                        align-items: center;
                        gap: .7rem;
                        flex-shrink: 0;
                    }

                    .analytics-button,
                    .upload-button {
                        height: 44px;
                        padding: 0 1rem;
                        border-radius: 9px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: .5rem;
                        font-size: .82rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all .2s ease;
                        text-decoration: none;
                    }

                    .analytics-button {
                        color: var(--ngo-blue-dark);
                        background: var(--ngo-blue-soft);
                        border: 1px solid #D8E5F7;
                    }

                    .analytics-button:hover {
                        background: #E5EEF9;
                        transform: translateY(-1px);
                    }

                    .upload-button {
                        color: white;
                        background: var(--ngo-blue);
                        border: 1px solid var(--ngo-blue);
                        box-shadow: 0 5px 14px rgba(93, 137, 200, .18);
                    }

                    .upload-button:hover {
                        background: var(--ngo-blue-dark);
                        border-color: var(--ngo-blue-dark);
                        transform: translateY(-1px);
                        color: white;
                    }

                    .button-icon {
                        font-size: 1rem;
                    }

                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }

                    .stat-card {
                        background: var(--ngo-white);
                        border: 1px solid var(--ngo-border);
                        border-radius: 13px;
                        padding: 1.25rem;
                        box-shadow: 0 2px 8px rgba(24, 39, 75, .025);
                        transition: all .2s ease;
                    }

                    .stat-card:hover {
                        border-color: #D6E0ED;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 22px rgba(24, 39, 75, .06);
                    }

                    .stat-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: .85rem;
                    }

                    .stat-icon {
                        width: 38px;
                        height: 38px;
                        border-radius: 9px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .stat-icon svg {
                        width: 20px;
                        height: 20px;
                    }

                    .documents-icon {
                        color: var(--ngo-blue);
                        background: var(--ngo-blue-soft);
                    }

                    .readers-icon {
                        color: #5D7F72;
                        background: #EDF5F1;
                    }

                    .admin-icon {
                        color: #866E3D;
                        background: #F7F2E8;
                    }

                    .stat-label {
                        color: #9AA5B1;
                        font-size: .63rem;
                        font-weight: 800;
                        letter-spacing: .12em;
                    }

                    .stat-value {
                        font-size: 2rem;
                        line-height: 1;
                        font-weight: 760;
                        letter-spacing: -.04em;
                        margin-bottom: .55rem;
                    }

                    .stat-description {
                        color: var(--ngo-muted);
                        font-size: .78rem;
                        line-height: 1.45;
                        min-height: 34px;
                    }

                    .stat-link {
                        margin-top: .95rem;
                        padding-top: .85rem;
                        border-top: 1px solid #EEF1F5;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: var(--ngo-blue-dark);
                        text-decoration: none;
                        font-size: .75rem;
                        font-weight: 700;
                    }

                    .stat-link:hover {
                        color: var(--ngo-blue);
                    }

                    .analytics-banner {
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        background: linear-gradient(
                            100deg,
                            #F2F7FD 0%,
                            #F9FBFE 100%
                        );
                        border: 1px solid #DDE8F5;
                        border-radius: 13px;
                        padding: 1.1rem 1.2rem;
                        margin-bottom: 1rem;
                    }

                    .analytics-banner::after {
                        content: "";
                        position: absolute;
                        width: 170px;
                        height: 170px;
                        border-radius: 50%;
                        border: 30px solid rgba(93, 137, 200, .04);
                        right: -70px;
                        top: -100px;
                    }

                    .analytics-banner-icon {
                        width: 42px;
                        height: 42px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        background: var(--ngo-blue);
                        font-size: 1.15rem;
                    }

                    .analytics-banner-content {
                        flex: 1;
                        min-width: 0;
                    }

                    .analytics-banner-content span {
                        color: var(--ngo-blue);
                        font-size: .6rem;
                        font-weight: 800;
                        letter-spacing: .12em;
                    }

                    .analytics-banner-content h2 {
                        margin: .2rem 0 .2rem;
                        font-size: .95rem;
                        font-weight: 750;
                    }

                    .analytics-banner-content p {
                        margin: 0;
                        color: var(--ngo-muted);
                        font-size: .75rem;
                    }

                    .analytics-banner-button {
                        position: relative;
                        z-index: 1;
                        border: 0;
                        background: transparent;
                        color: var(--ngo-blue-dark);
                        font-size: .75rem;
                        font-weight: 750;
                        display: flex;
                        align-items: center;
                        gap: .45rem;
                        cursor: pointer;
                        white-space: nowrap;
                    }

                    .analytics-banner-button:hover {
                        color: var(--ngo-blue);
                    }

                    .dashboard-columns {
                        display: grid;
                        grid-template-columns: 330px minmax(0, 1fr);
                        gap: 1rem;
                    }

                    .content-card {
                        background: var(--ngo-white);
                        border: 1px solid var(--ngo-border);
                        border-radius: 13px;
                        overflow: hidden;
                    }

                    .card-heading {
                        padding: 1.2rem 1.25rem;
                        border-bottom: 1px solid #EEF1F5;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 1rem;
                    }

                    .card-heading h2 {
                        margin: 0;
                        font-size: .98rem;
                        font-weight: 750;
                        letter-spacing: -.015em;
                    }

                    .view-all {
                        color: var(--ngo-blue-dark);
                        font-size: .72rem;
                        font-weight: 700;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: .35rem;
                    }

                    .view-all:hover {
                        color: var(--ngo-blue);
                    }

                    .quick-actions {
                        padding: .5rem;
                    }

                    .quick-action {
                        display: flex;
                        align-items: center;
                        gap: .75rem;
                        padding: .85rem .7rem;
                        border-radius: 9px;
                        text-decoration: none;
                        color: var(--ngo-ink);
                        transition: background .18s ease;
                    }

                    .quick-action:hover {
                        background: var(--ngo-blue-pale);
                    }

                    .quick-icon {
                        width: 34px;
                        height: 34px;
                        flex-shrink: 0;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #F2F5F8;
                        color: var(--ngo-blue-dark);
                        font-size: 1rem;
                        font-weight: 700;
                    }

                    .quick-action strong {
                        display: block;
                        font-size: .78rem;
                        font-weight: 750;
                        margin-bottom: .2rem;
                    }

                    .quick-action span {
                        color: var(--ngo-muted);
                        font-size: .67rem;
                    }

                    .quick-arrow {
                        margin-left: auto;
                        color: #AAB3BD !important;
                        font-size: .9rem !important;
                    }

                    .documents-list {
                        padding: .4rem 0;
                    }

                    .document-row {
                        display: flex;
                        align-items: center;
                        gap: .8rem;
                        padding: .9rem 1.25rem;
                        border-bottom: 1px solid #F0F2F5;
                        text-decoration: none;
                        color: var(--ngo-ink);
                        transition: background .18s ease;
                    }

                    .document-row:last-child {
                        border-bottom: 0;
                    }

                    .document-row:hover {
                        background: #FAFCFE;
                    }

                    .document-icon {
                        width: 37px;
                        height: 37px;
                        border-radius: 8px;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .document-icon svg {
                        width: 18px;
                        height: 18px;
                    }

                    .document-info {
                        flex: 1;
                        min-width: 0;
                    }

                    .document-info strong {
                        display: block;
                        font-size: .78rem;
                        font-weight: 700;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .document-meta {
                        display: flex;
                        flex-wrap: wrap;
                        gap: .3rem;
                        margin-top: .35rem;
                    }

                    .language-tag {
                        display: inline-flex;
                        align-items: center;
                        padding: .2rem .42rem;
                        background: #F1F4F7;
                        color: #687481;
                        border-radius: 4px;
                        font-size: .58rem;
                        font-weight: 700;
                    }

                    .document-date {
                        color: #9AA5B1;
                        font-size: .65rem;
                        white-space: nowrap;
                    }

                    .document-arrow {
                        color: #B0BAC4;
                        font-size: .9rem;
                    }

                    .empty-state {
                        text-align: center;
                        padding: 3rem 1.5rem;
                    }

                    .empty-icon {
                        width: 52px;
                        height: 52px;
                        margin: 0 auto .9rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        border-radius: 12px;
                        font-size: 1.2rem;
                    }

                    .empty-state h3 {
                        margin: 0 0 .35rem;
                        font-size: .9rem;
                    }

                    .empty-state p {
                        max-width: 350px;
                        margin: 0 auto 1rem;
                        color: var(--ngo-muted);
                        font-size: .75rem;
                        line-height: 1.5;
                    }

                    .empty-button {
                        display: inline-flex;
                        padding: .65rem .9rem;
                        border-radius: 7px;
                        background: var(--ngo-blue);
                        color: white;
                        text-decoration: none;
                        font-size: .7rem;
                        font-weight: 700;
                    }

                    /* ===============================
                       CHAT
                    =============================== */

                    .chat-overlay {
                        position: fixed;
                        inset: 0;
                        z-index: 999;
                        background: rgba(15, 23, 42, .28);
                        backdrop-filter: blur(2px);
                    }

                    .analytics-chat {
                        position: fixed;
                        z-index: 1000;
                        right: 1.25rem;
                        bottom: 1.25rem;
                        width: min(430px, calc(100vw - 2rem));
                        height: min(690px, calc(100vh - 2rem));
                        background: white;
                        border: 1px solid #DDE3EA;
                        border-radius: 16px;
                        box-shadow: 0 24px 70px rgba(15, 23, 42, .2);
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }

                    .chat-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: .95rem 1rem;
                        background: #fff;
                        border-bottom: 1px solid #EDF0F3;
                    }

                    .chat-header-left {
                        display: flex;
                        align-items: center;
                        gap: .65rem;
                    }

                    .chat-avatar {
                        width: 37px;
                        height: 37px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        background: var(--ngo-blue);
                        font-size: 1rem;
                    }

                    .chat-header strong {
                        display: block;
                        font-size: .8rem;
                    }

                    .chat-header span {
                        display: block;
                        color: #8A96A3;
                        font-size: .61rem;
                        margin-top: .15rem;
                    }

                    .chat-close {
                        width: 30px;
                        height: 30px;
                        border: 0;
                        border-radius: 7px;
                        background: #F3F5F7;
                        color: #6F7B87;
                        font-size: 1.25rem;
                        cursor: pointer;
                    }

                    .chat-close:hover {
                        background: #EAEDEF;
                    }

                    .chat-body {
                        flex: 1;
                        overflow-y: auto;
                        padding: 1rem;
                        background: #FAFBFC;
                    }

                    .chat-introduction {
                        text-align: center;
                        padding: .7rem 1rem 1.15rem;
                    }

                    .chat-welcome-icon {
                        width: 45px;
                        height: 45px;
                        margin: 0 auto .65rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--ngo-blue);
                        background: var(--ngo-blue-soft);
                    }

                    .chat-introduction h3 {
                        margin: 0 0 .3rem;
                        font-size: .9rem;
                    }

                    .chat-introduction p {
                        margin: 0 auto;
                        max-width: 310px;
                        color: #788592;
                        font-size: .7rem;
                        line-height: 1.5;
                    }

                    .analytics-error {
                        margin-bottom: .8rem;
                        padding: .6rem .7rem;
                        border-radius: 7px;
                        background: #FFF5F5;
                        border: 1px solid #F3D1D1;
                        color: #A33A3A;
                        font-size: .68rem;
                    }

                    .chat-messages {
                        display: flex;
                        flex-direction: column;
                        gap: .8rem;
                    }

                    .chat-message {
                        display: flex;
                        gap: .45rem;
                        align-items: flex-end;
                    }

                    .user-message {
                        justify-content: flex-end;
                    }

                    .message-avatar {
                        width: 25px;
                        height: 25px;
                        flex-shrink: 0;
                        border-radius: 7px;
                        background: var(--ngo-blue-soft);
                        color: var(--ngo-blue);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: .65rem;
                    }

                    .message-bubble {
                        max-width: 82%;
                        padding: .65rem .75rem;
                        border-radius: 10px 10px 10px 3px;
                        background: white;
                        border: 1px solid #E6EAEE;
                        color: #4C5865;
                        font-size: .72rem;
                        line-height: 1.5;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, .02);
                        white-space: pre-wrap;
                    }

                    .user-message .message-bubble {
                        color: white;
                        background: var(--ngo-blue);
                        border-color: var(--ngo-blue);
                        border-radius: 10px 10px 3px 10px;
                    }

                    .typing {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        min-width: 52px;
                    }

                    .typing span {
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background: #9AA7B4;
                        animation: typing 1.1s infinite ease-in-out;
                    }

                    .typing span:nth-child(2) {
                        animation-delay: .15s;
                    }

                    .typing span:nth-child(3) {
                        animation-delay: .3s;
                    }

                    @keyframes typing {
                        0%, 60%, 100% {
                            transform: translateY(0);
                            opacity: .45;
                        }

                        30% {
                            transform: translateY(-3px);
                            opacity: 1;
                        }
                    }

                    .suggestions {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: .4rem;
                        margin-top: 1.1rem;
                    }

                    .suggestions > span {
                        color: #929DA8;
                        font-size: .61rem;
                        font-weight: 700;
                        margin-bottom: .1rem;
                    }

                    .suggestions button {
                        border: 1px solid #DDE4EB;
                        background: white;
                        color: #647180;
                        border-radius: 7px;
                        padding: .48rem .65rem;
                        font-size: .64rem;
                        cursor: pointer;
                        text-align: left;
                    }

                    .suggestions button:hover:not(:disabled) {
                        color: var(--ngo-blue-dark);
                        border-color: #BDD1EA;
                        background: var(--ngo-blue-pale);
                    }

                    .suggestions button:disabled {
                        opacity: .55;
                        cursor: not-allowed;
                    }

                    .chat-input-area {
                        display: flex;
                        gap: .5rem;
                        padding: .8rem;
                        background: white;
                        border-top: 1px solid #E9EDF1;
                    }

                    .chat-input-area input {
                        flex: 1;
                        min-width: 0;
                        height: 40px;
                        padding: 0 .75rem;
                        border: 1px solid #DCE2E8;
                        border-radius: 8px;
                        outline: none;
                        font-size: .72rem;
                        color: #26313C;
                        background: #FAFBFC;
                    }

                    .chat-input-area input:focus {
                        border-color: #9CB8DD;
                        background: white;
                        box-shadow: 0 0 0 3px rgba(93, 137, 200, .08);
                    }

                    .chat-input-area button {
                        width: 40px;
                        height: 40px;
                        flex-shrink: 0;
                        border: 0;
                        border-radius: 8px;
                        background: var(--ngo-blue);
                        color: white;
                        font-size: 1rem;
                        cursor: pointer;
                    }

                    .chat-input-area button:hover:not(:disabled) {
                        background: var(--ngo-blue-dark);
                    }

                    .chat-input-area button:disabled {
                        opacity: .45;
                        cursor: not-allowed;
                    }

                    @media (max-width: 1100px) {
                        .dashboard-columns {
                            grid-template-columns: 1fr;
                        }

                        .quick-actions {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 850px) {
                        .dashboard-header {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .header-actions {
                            width: 100%;
                        }

                        .analytics-button,
                        .upload-button {
                            flex: 1;
                        }

                        .stats-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    @media (max-width: 600px) {
                        .dashboard-header {
                            margin-bottom: 1.25rem;
                        }

                        .dashboard-header h1 {
                            font-size: 1.55rem;
                        }

                        .dashboard-header p {
                            font-size: .78rem;
                        }

                        .header-actions {
                            flex-direction: column;
                        }

                        .analytics-button,
                        .upload-button {
                            width: 100%;
                        }

                        .analytics-banner {
                            align-items: flex-start;
                            flex-wrap: wrap;
                        }

                        .analytics-banner-content {
                            flex: 1;
                            min-width: calc(100% - 60px);
                        }

                        .analytics-banner-content p {
                            line-height: 1.45;
                        }

                        .analytics-banner-button {
                            margin-left: 54px;
                        }

                        .quick-actions {
                            display: block;
                        }

                        .document-row {
                            padding: .8rem .9rem;
                        }

                        .document-date {
                            display: none;
                        }

                        .document-arrow {
                            display: none;
                        }

                        .analytics-chat {
                            right: .5rem;
                            bottom: .5rem;
                            width: calc(100vw - 1rem);
                            height: calc(100vh - 1rem);
                            border-radius: 14px;
                        }
                    }
                `}</style>
            </AdminLayout>
        </>
    );
}