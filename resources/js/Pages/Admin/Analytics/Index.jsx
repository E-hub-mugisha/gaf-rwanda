import { Head, router } from "@inertiajs/react";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    Eye,
    Globe2,
    HeartPulse,
    RefreshCw,
    Search,
    TrendingUp,
    UserCheck,
    Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import {
    getLanguage,
    LANGUAGE_EVENT,
} from "@/lib/Language";

/*
|--------------------------------------------------------------------------
| TRANSLATIONS
|--------------------------------------------------------------------------
*/

const translations = {
    rw: {
        pageTitle: "Isesengura ry'Ubuzima bwo mu Mutwe",
        eyebrow: "ISESENGURA RY'UMUYOBOZI",

        description:
            "Kurikirana uko abakoresha bafite konti bakoresha inyandiko z'ubuzima bwo mu mutwe.",

        refresh: "Ongera usubiremo",

        totalViews: "Abasuye bose",
        uniqueUsers: "Abakoresha badasubiramo",
        viewsToday: "Abasuye uyu munsi",
        returningUsers: "Abakoresha bagaruka",

        lastDays: "Mu minsi {period} ishize",
        authenticatedUsers: "Abakoresha bafite konti",
        uniqueUsersToday: "{users} abakoresha badasubiramo",
        viewedMoreThanOnce: "Basomye inshuro zirenze imwe",

        viewsCompared:
            "Abasuye ugereranyije n'iminsi {period} yabanje",

        dataControls: "IBIKORESHO BY'AMAKURU",
        analyticsFilters: "Akayunguruzo k'isesengura",

        narrowData:
            "Hitamo urupapuro, ururimi cyangwa igihe ushaka kureba.",

        clearFilters: "Kuraho akayunguruzo",

        page: "Urupapuro",
        allPages: "Amapaji yose",

        language: "Ururimi",
        allLanguages: "Indimi zose",

        period: "Igihe",
        last7Days: "Iminsi 7 ishize",
        last30Days: "Iminsi 30 ishize",
        last90Days: "Iminsi 90 ishize",
        last12Months: "Amezi 12 ashize",

        applyFilters: "Shyiraho akayunguruzo",

        traffic: "IMIKORESHEREZE",
        pageActivity: "Ibikorwa ku mapaji",

        pageActivityDescription:
            "Abasuye n'abakoresha badasubiramo uko igihe kigenda.",

        content: "INYANDIKO",
        languages: "Indimi",

        languageUsage:
            "Uko inyandiko zikoreshwa hakurikijwe ururimi.",

        contentPerformance: "IMIKORESHEREZE Y'INYANDIKO",
        mostViewedPages: "Amapaji yarebwe cyane",

        mostViewedDescription:
            "Amapaji y'inyandiko z'ubuzima bwo mu mutwe akundwa cyane.",

        liveActivity: "IBIKORWA BYA VUBA",
        recentActivity: "Ibikorwa bya vuba",

        recentActivityDescription:
            "Abakoresha bafite konti baheruka gufungura inyandiko zikurikiranwa.",

        views: "Abasuye",
        uniqueUsersTable: "Abakoresha badasubiramo",
        engagement: "Imikoranire",
        viewsPerUser: "abasuwe / umukoresha",
        users: "abakoresha",

        noActivity: "Nta bikorwa birabaho",

        noActivityDescription:
            "Abasuye amapaji bazagaragara hano abakoresha nibatangira gusura inyandiko zikurikiranwa.",

        noLanguageData: "Nta makuru y'indimi",

        noLanguageDataDescription:
            "Imibare y'indimi izagaragara nyuma y'uko abasuye bakurikiranwe.",

        noPageData: "Nta makuru y'amapaji",

        noPageDataDescription:
            "Amapaji yakurikiranwe azagaragara hano.",

        noRecentActivity: "Nta bikorwa bya vuba",

        noRecentActivityDescription:
            "Abakoresha bafite konti baheruka gusura amapaji bazagaragara hano.",

        unknownPage: "Urupapuro rutazwi",
        unknownLanguage: "Ururimi rutazwi",
        unknownUser: "Umukoresha utazwi",
        noEmail: "Nta email ihari",

        depression: "Inyigisho ku Agahinda Gakabije",
        mentalHealth: "Ubuzima bwo mu Mutwe",

        totalViewsChart: "Abasuye bose",
    },

    en: {
        pageTitle: "Mental Health Analytics",
        eyebrow: "ADMIN ANALYTICS",

        description:
            "Monitor how authenticated users interact with your mental-health education content.",

        refresh: "Refresh",

        totalViews: "Total views",
        uniqueUsers: "Unique users",
        viewsToday: "Views today",
        returningUsers: "Returning users",

        lastDays: "Last {period} days",
        authenticatedUsers: "Authenticated users",
        uniqueUsersToday: "{users} unique users",
        viewedMoreThanOnce: "Viewed more than once",

        viewsCompared:
            "Views compared with the previous {period} days",

        dataControls: "DATA CONTROLS",
        analyticsFilters: "Analytics filters",

        narrowData:
            "Narrow the data to a specific page, language or period.",

        clearFilters: "Clear filters",

        page: "Page",
        allPages: "All pages",

        language: "Language",
        allLanguages: "All languages",

        period: "Period",
        last7Days: "Last 7 days",
        last30Days: "Last 30 days",
        last90Days: "Last 90 days",
        last12Months: "Last 12 months",

        applyFilters: "Apply filters",

        traffic: "TRAFFIC",
        pageActivity: "Page activity",

        pageActivityDescription:
            "Views and unique users over time.",

        content: "CONTENT",
        languages: "Languages",

        languageUsage:
            "Content usage by language.",

        contentPerformance: "CONTENT PERFORMANCE",
        mostViewedPages: "Most viewed pages",

        mostViewedDescription:
            "Which educational pages receive the most attention.",

        liveActivity: "LIVE ACTIVITY",
        recentActivity: "Recent activity",

        recentActivityDescription:
            "Latest authenticated users who opened tracked content.",

        views: "Views",
        uniqueUsersTable: "Unique users",
        engagement: "Engagement",
        viewsPerUser: "views/user",
        users: "users",

        noActivity: "No activity yet",

        noActivityDescription:
            "Page views will appear here once users start visiting tracked pages.",

        noLanguageData: "No language data",

        noLanguageDataDescription:
            "Language statistics will appear after tracked views are recorded.",

        noPageData: "No page data",

        noPageDataDescription:
            "Tracked pages will appear here.",

        noRecentActivity: "No recent activity",

        noRecentActivityDescription:
            "Recent authenticated page views will appear here.",

        unknownPage: "Unknown page",
        unknownLanguage: "Unknown",
        unknownUser: "Unknown user",
        noEmail: "No email available",

        depression: "Depression Education",
        mentalHealth: "Mental Health",

        totalViewsChart: "Total views",
    },

    fr: {
        pageTitle: "Analytique de la santé mentale",
        eyebrow: "ANALYTIQUE ADMINISTRATIVE",

        description:
            "Surveillez la manière dont les utilisateurs authentifiés interagissent avec vos contenus éducatifs sur la santé mentale.",

        refresh: "Actualiser",

        totalViews: "Vues totales",
        uniqueUsers: "Utilisateurs uniques",
        viewsToday: "Vues aujourd'hui",
        returningUsers: "Utilisateurs récurrents",

        lastDays: "Les {period} derniers jours",
        authenticatedUsers: "Utilisateurs authentifiés",
        uniqueUsersToday: "{users} utilisateurs uniques",
        viewedMoreThanOnce: "Ont consulté plus d'une fois",

        viewsCompared:
            "Vues comparées aux {period} jours précédents",

        dataControls: "CONTRÔLES DES DONNÉES",
        analyticsFilters: "Filtres analytiques",

        narrowData:
            "Affinez les données par page, langue ou période.",

        clearFilters: "Effacer les filtres",

        page: "Page",
        allPages: "Toutes les pages",

        language: "Langue",
        allLanguages: "Toutes les langues",

        period: "Période",
        last7Days: "7 derniers jours",
        last30Days: "30 derniers jours",
        last90Days: "90 derniers jours",
        last12Months: "12 derniers mois",

        applyFilters: "Appliquer les filtres",

        traffic: "TRAFIC",
        pageActivity: "Activité des pages",

        pageActivityDescription:
            "Vues et utilisateurs uniques au fil du temps.",

        content: "CONTENU",
        languages: "Langues",

        languageUsage:
            "Utilisation du contenu par langue.",

        contentPerformance: "PERFORMANCE DU CONTENU",
        mostViewedPages: "Pages les plus consultées",

        mostViewedDescription:
            "Pages éducatives recevant le plus d'attention.",

        liveActivity: "ACTIVITÉ EN DIRECT",
        recentActivity: "Activité récente",

        recentActivityDescription:
            "Derniers utilisateurs authentifiés ayant ouvert du contenu suivi.",

        views: "Vues",
        uniqueUsersTable: "Utilisateurs uniques",
        engagement: "Engagement",
        viewsPerUser: "vues/utilisateur",
        users: "utilisateurs",

        noActivity: "Aucune activité",

        noActivityDescription:
            "Les vues apparaîtront ici lorsque les utilisateurs commenceront à visiter les pages suivies.",

        noLanguageData: "Aucune donnée linguistique",

        noLanguageDataDescription:
            "Les statistiques linguistiques apparaîtront après l'enregistrement des vues.",

        noPageData: "Aucune donnée de page",

        noPageDataDescription:
            "Les pages suivies apparaîtront ici.",

        noRecentActivity: "Aucune activité récente",

        noRecentActivityDescription:
            "Les dernières visites authentifiées apparaîtront ici.",

        unknownPage: "Page inconnue",
        unknownLanguage: "Inconnu",
        unknownUser: "Utilisateur inconnu",
        noEmail: "Aucun e-mail disponible",

        depression: "Éducation sur la dépression",
        mentalHealth: "Santé mentale",

        totalViewsChart: "Vues totales",
    },

    nl: {
        pageTitle: "Geestelijke gezondheidsanalyse",
        eyebrow: "BEHEERDERSANALYSE",

        description:
            "Monitor hoe geauthenticeerde gebruikers omgaan met uw educatieve inhoud over geestelijke gezondheid.",

        refresh: "Vernieuwen",

        totalViews: "Totaal aantal weergaven",
        uniqueUsers: "Unieke gebruikers",
        viewsToday: "Weergaven vandaag",
        returningUsers: "Terugkerende gebruikers",

        lastDays: "Laatste {period} dagen",
        authenticatedUsers: "Geauthenticeerde gebruikers",
        uniqueUsersToday: "{users} unieke gebruikers",
        viewedMoreThanOnce: "Meer dan één keer bekeken",

        viewsCompared:
            "Weergaven vergeleken met de vorige {period} dagen",

        dataControls: "GEGEVENSCONTROLES",
        analyticsFilters: "Analyserfilters",

        narrowData:
            "Beperk de gegevens tot een pagina, taal of periode.",

        clearFilters: "Filters wissen",

        page: "Pagina",
        allPages: "Alle pagina's",

        language: "Taal",
        allLanguages: "Alle talen",

        period: "Periode",
        last7Days: "Laatste 7 dagen",
        last30Days: "Laatste 30 dagen",
        last90Days: "Laatste 90 dagen",
        last12Months: "Laatste 12 maanden",

        applyFilters: "Filters toepassen",

        traffic: "VERKEER",
        pageActivity: "Pagina-activiteit",

        pageActivityDescription:
            "Weergaven en unieke gebruikers in de tijd.",

        content: "INHOUD",
        languages: "Talen",

        languageUsage:
            "Gebruik van inhoud per taal.",

        contentPerformance: "INHOUDSPRESTATIES",
        mostViewedPages: "Meest bekeken pagina's",

        mostViewedDescription:
            "Educatieve pagina's die de meeste aandacht krijgen.",

        liveActivity: "LIVE ACTIVITEIT",
        recentActivity: "Recente activiteit",

        recentActivityDescription:
            "Laatste geauthenticeerde gebruikers die gevolgde inhoud hebben geopend.",

        views: "Weergaven",
        uniqueUsersTable: "Unieke gebruikers",
        engagement: "Betrokkenheid",
        viewsPerUser: "weergaven/gebruiker",
        users: "gebruikers",

        noActivity: "Nog geen activiteit",

        noActivityDescription:
            "Paginaweergaven verschijnen hier zodra gebruikers de gevolgde pagina's bezoeken.",

        noLanguageData: "Geen taalgegevens",

        noLanguageDataDescription:
            "Taalstatistieken verschijnen nadat weergaven zijn geregistreerd.",

        noPageData: "Geen paginagegevens",

        noPageDataDescription:
            "Gevolgde pagina's verschijnen hier.",

        noRecentActivity: "Geen recente activiteit",

        noRecentActivityDescription:
            "Recente geauthenticeerde paginaweergaven verschijnen hier.",

        unknownPage: "Onbekende pagina",
        unknownLanguage: "Onbekend",
        unknownUser: "Onbekende gebruiker",
        noEmail: "Geen e-mail beschikbaar",

        depression: "Voorlichting over depressie",
        mentalHealth: "Geestelijke gezondheid",

        totalViewsChart: "Totaal aantal weergaven",
    },
};

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

export default function Index({
    stats = {},
    dailyStats = [],
    pageStats = [],
    languageStats = [],
    recentViews = [],
    pages = [],
    languages = [],
    filters = {},
}) {
    /*
    |--------------------------------------------------------------------------
    | CURRENT INTERFACE LANGUAGE
    |--------------------------------------------------------------------------
    */

    const [currentLanguage, setCurrentLanguage] = useState(
        () => getLanguage() || "rw"
    );

    /*
    |--------------------------------------------------------------------------
    | ANALYTICS FILTERS
    |--------------------------------------------------------------------------
    |
    | This "language" is intentionally separate from currentLanguage.
    | It filters analytics data and does NOT control the UI language.
    |
    */

    const [page, setPage] = useState(filters.page ?? "");
    const [language, setLanguage] = useState(
        filters.language ?? ""
    );
    const [period, setPeriod] = useState(
        filters.period ?? "30"
    );

    /*
    |--------------------------------------------------------------------------
    | LISTEN FOR HEADER LANGUAGE CHANGES
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setCurrentLanguage(
                event.detail ||
                    getLanguage() ||
                    "rw"
            );
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

    /*
    |--------------------------------------------------------------------------
    | UPDATE HTML LANGUAGE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        document.documentElement.lang =
            currentLanguage;
    }, [currentLanguage]);

    /*
    |--------------------------------------------------------------------------
    | ACTIVE TRANSLATION
    |--------------------------------------------------------------------------
    */

    const t = useMemo(() => {
        return (
            translations[currentLanguage] ||
            translations.rw
        );
    }, [currentLanguage]);

    /*
    |--------------------------------------------------------------------------
    | LANGUAGE NAMES FROM BACKEND
    |--------------------------------------------------------------------------
    */

    const languageNames = useMemo(() => {
        return languages.reduce(
            (result, item) => {
                result[item.code] = item.name;
                return result;
            },
            {}
        );
    }, [languages]);

    /*
    |--------------------------------------------------------------------------
    | APPLY FILTERS
    |--------------------------------------------------------------------------
    */

    const applyFilters = () => {
        router.get(
            route("admin.analytics.index"),
            {
                page: page || undefined,
                language: language || undefined,
                period,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | CLEAR FILTERS
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setPage("");
        setLanguage("");
        setPeriod("30");

        router.get(
            route("admin.analytics.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | HELPERS
    |--------------------------------------------------------------------------
    */

    const hasFilters =
        Boolean(page) ||
        Boolean(language) ||
        period !== "30";

    const formatNumber = (value) => {
        return new Intl.NumberFormat().format(
            Number(value || 0)
        );
    };

    const getPageName = (value) => {
        const names = {
            depression: t.depression,
            "mental-health": t.mentalHealth,
        };

        return (
            names[value] ||
            value ||
            t.unknownPage
        );
    };

    const getLanguageName = (value) => {
        return (
            languageNames[value] ||
            value ||
            t.unknownLanguage
        );
    };

    /*
    |--------------------------------------------------------------------------
    | PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <AdminLayout>
            <Head title={t.pageTitle} />

            <div className="analytics-page">
                <div className="analytics-shell">

                    {/* =====================================================
                        HEADER
                    ===================================================== */}

                    <header className="analytics-header">
                        <div className="header-content">

                            <div className="analytics-eyebrow">
                                <BarChart3 size={15} />
                                <span>
                                    {t.eyebrow}
                                </span>
                            </div>

                            <h1>
                                {t.pageTitle}
                            </h1>

                            <p>
                                {t.description}
                            </p>

                        </div>

                        <button
                            type="button"
                            className="refresh-button"
                            onClick={() =>
                                router.reload({
                                    preserveScroll: true,
                                    preserveState: true,
                                })
                            }
                        >
                            <RefreshCw size={17} />

                            <span>
                                {t.refresh}
                            </span>
                        </button>
                    </header>


                    {/* =====================================================
                        KPI CARDS
                    ===================================================== */}

                    <section className="stats-grid">

                        <StatCard
                            icon={<Eye size={21} />}
                            label={t.totalViews}
                            value={formatNumber(
                                stats.totalViews
                            )}
                            description={t.lastDays.replace(
                                "{period}",
                                period
                            )}
                            accent="blue"
                        />

                        <StatCard
                            icon={<Users size={21} />}
                            label={t.uniqueUsers}
                            value={formatNumber(
                                stats.uniqueUsers
                            )}
                            description={
                                t.authenticatedUsers
                            }
                            accent="purple"
                        />

                        <StatCard
                            icon={<Activity size={21} />}
                            label={t.viewsToday}
                            value={formatNumber(
                                stats.todayViews
                            )}
                            description={t.uniqueUsersToday.replace(
                                "{users}",
                                formatNumber(
                                    stats.todayUsers
                                )
                            )}
                            accent="green"
                        />

                        <StatCard
                            icon={<UserCheck size={21} />}
                            label={t.returningUsers}
                            value={formatNumber(
                                stats.returningUsers
                            )}
                            description={
                                t.viewedMoreThanOnce
                            }
                            accent="orange"
                        />

                    </section>


                    {/* =====================================================
                        GROWTH
                    ===================================================== */}

                    <div className="growth-card">

                        <div className="growth-icon">
                            <TrendingUp size={20} />
                        </div>

                        <div className="growth-content">

                            <strong>
                                {stats.viewsChange >= 0
                                    ? "+"
                                    : ""}
                                {stats.viewsChange ?? 0}%
                            </strong>

                            <span>
                                {t.viewsCompared.replace(
                                    "{period}",
                                    period
                                )}
                            </span>

                        </div>

                        <div
                            className={`growth-direction ${
                                stats.viewsChange >= 0
                                    ? "positive"
                                    : "negative"
                            }`}
                        >
                            {stats.viewsChange >= 0 ? (
                                <ArrowUpRight size={18} />
                            ) : (
                                <ArrowDownRight size={18} />
                            )}
                        </div>

                    </div>


                    {/* =====================================================
                        FILTERS
                    ===================================================== */}

                    <section className="filter-card">

                        <div className="filter-heading">

                            <div>

                                <div className="section-kicker">
                                    {t.dataControls}
                                </div>

                                <h2>
                                    {t.analyticsFilters}
                                </h2>

                                <p>
                                    {t.narrowData}
                                </p>

                            </div>

                            {hasFilters && (
                                <button
                                    type="button"
                                    className="clear-button"
                                    onClick={clearFilters}
                                >
                                    {t.clearFilters}
                                </button>
                            )}

                        </div>


                        <div className="filters">

                            {/* Page */}

                            <div className="filter-field">

                                <label>
                                    {t.page}
                                </label>

                                <div className="input-wrap">

                                    <Search size={16} />

                                    <select
                                        value={page}
                                        onChange={(e) =>
                                            setPage(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            {t.allPages}
                                        </option>

                                        {pages.map(
                                            (item) => (
                                                <option
                                                    key={item}
                                                    value={item}
                                                >
                                                    {getPageName(
                                                        item
                                                    )}
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* Language */}

                            <div className="filter-field">

                                <label>
                                    {t.language}
                                </label>

                                <div className="input-wrap">

                                    <Globe2 size={16} />

                                    <select
                                        value={language}
                                        onChange={(e) =>
                                            setLanguage(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            {t.allLanguages}
                                        </option>

                                        {languages.map(
                                            (item) => (
                                                <option
                                                    key={
                                                        item.code
                                                    }
                                                    value={
                                                        item.code
                                                    }
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* Period */}

                            <div className="filter-field">

                                <label>
                                    {t.period}
                                </label>

                                <div className="input-wrap">

                                    <CalendarDays size={16} />

                                    <select
                                        value={period}
                                        onChange={(e) =>
                                            setPeriod(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="7">
                                            {t.last7Days}
                                        </option>

                                        <option value="30">
                                            {t.last30Days}
                                        </option>

                                        <option value="90">
                                            {t.last90Days}
                                        </option>

                                        <option value="365">
                                            {t.last12Months}
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* Apply */}

                            <button
                                type="button"
                                className="apply-button"
                                onClick={applyFilters}
                            >
                                {t.applyFilters}
                            </button>

                        </div>

                    </section>


                    {/* =====================================================
                        MAIN ANALYTICS
                    ===================================================== */}

                    <section className="analytics-grid">

                        {/* Activity */}

                        <div className="panel chart-panel">

                            <div className="panel-header">

                                <div>

                                    <div className="section-kicker">
                                        {t.traffic}
                                    </div>

                                    <h2>
                                        {t.pageActivity}
                                    </h2>

                                    <p>
                                        {t.pageActivityDescription}
                                    </p>

                                </div>

                                <div className="panel-icon">
                                    <TrendingUp size={18} />
                                </div>

                            </div>

                            <ActivityChart
                                data={dailyStats}
                                formatNumber={formatNumber}
                                t={t}
                            />

                        </div>


                        {/* Languages */}

                        <div className="panel language-panel">

                            <div className="panel-header">

                                <div>

                                    <div className="section-kicker">
                                        {t.content}
                                    </div>

                                    <h2>
                                        {t.languages}
                                    </h2>

                                    <p>
                                        {t.languageUsage}
                                    </p>

                                </div>

                                <div className="panel-icon">
                                    <Globe2 size={18} />
                                </div>

                            </div>

                            <LanguageBreakdown
                                data={languageStats}
                                getLanguageName={
                                    getLanguageName
                                }
                                formatNumber={
                                    formatNumber
                                }
                                t={t}
                            />

                        </div>

                    </section>


                    {/* =====================================================
                        MOST VIEWED PAGES
                    ===================================================== */}

                    <section className="panel">

                        <div className="panel-header">

                            <div>

                                <div className="section-kicker">
                                    {t.contentPerformance}
                                </div>

                                <h2>
                                    {t.mostViewedPages}
                                </h2>

                                <p>
                                    {t.mostViewedDescription}
                                </p>

                            </div>

                            <div className="panel-icon">
                                <HeartPulse size={18} />
                            </div>

                        </div>

                        <PageTable
                            data={pageStats}
                            getPageName={getPageName}
                            formatNumber={formatNumber}
                            t={t}
                        />

                    </section>


                    {/* =====================================================
                        RECENT ACTIVITY
                    ===================================================== */}

                    <section className="panel">

                        <div className="panel-header">

                            <div>

                                <div className="section-kicker">
                                    {t.liveActivity}
                                </div>

                                <h2>
                                    {t.recentActivity}
                                </h2>

                                <p>
                                    {t.recentActivityDescription}
                                </p>

                            </div>

                            <div className="panel-icon">
                                <Users size={18} />
                            </div>

                        </div>

                        <RecentActivity
                            data={recentViews}
                            getPageName={getPageName}
                            getLanguageName={
                                getLanguageName
                            }
                            t={t}
                        />

                    </section>

                </div>
            </div>

            <style>{styles}</style>
        </AdminLayout>
    );
}


/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function StatCard({
    icon,
    label,
    value,
    description,
    accent,
}) {
    return (
        <div
            className={`stat-card ${accent}`}
        >
            <div className="stat-top">

                <div className="stat-icon">
                    {icon}
                </div>

            </div>

            <div className="stat-value">
                {value}
            </div>

            <div className="stat-label">
                {label}
            </div>

            <div className="stat-description">
                {description}
            </div>
        </div>
    );
}


/*
|--------------------------------------------------------------------------
| ACTIVITY CHART
|--------------------------------------------------------------------------
*/

function ActivityChart({
    data,
    formatNumber,
    t,
}) {
    if (!data.length) {
        return (
            <div className="empty-chart">

                <div className="empty-icon">
                    <BarChart3 size={28} />
                </div>

                <strong>
                    {t.noActivity}
                </strong>

                <span>
                    {t.noActivityDescription}
                </span>

            </div>
        );
    }

    const max = Math.max(
        ...data.map(
            (item) =>
                Number(item.views || 0)
        ),
        1
    );

    const points = data
        .map((item, index) => {

            const x =
                data.length === 1
                    ? 50
                    : (index /
                          (data.length - 1)) *
                      100;

            const y =
                100 -
                (Number(
                    item.views || 0
                ) /
                    max) *
                    88;

            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="activity-chart">

            <div className="chart-summary">

                <div>

                    <strong>
                        {formatNumber(
                            data.reduce(
                                (
                                    sum,
                                    item
                                ) =>
                                    sum +
                                    Number(
                                        item.views ||
                                            0
                                    ),
                                0
                            )
                        )}
                    </strong>

                    <span>
                        {t.totalViewsChart}
                    </span>

                </div>

            </div>


            <div className="chart-area">

                <div className="chart-grid-lines">

                    <span />
                    <span />
                    <span />
                    <span />

                </div>

                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="chart-svg"
                >

                    <polyline
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {data.map(
                        (
                            item,
                            index
                        ) => {

                            const x =
                                data.length ===
                                1
                                    ? 50
                                    : (index /
                                          (data.length -
                                              1)) *
                                      100;

                            const y =
                                100 -
                                (Number(
                                    item.views ||
                                        0
                                ) /
                                    max) *
                                    88;

                            return (
                                <circle
                                    key={`${item.date}-${index}`}
                                    cx={x}
                                    cy={y}
                                    r="1.6"
                                    fill="currentColor"
                                    vectorEffect="non-scaling-stroke"
                                />
                            );
                        }
                    )}

                </svg>

            </div>


            <div className="chart-labels">

                {data
                    .filter(
                        (_, index) => {

                            if (
                                data.length <=
                                7
                            ) {
                                return true;
                            }

                            const interval =
                                Math.ceil(
                                    data.length /
                                        7
                                );

                            return (
                                index %
                                    interval ===
                                0
                            );
                        }
                    )
                    .map(
                        (
                            item,
                            index
                        ) => (
                            <span
                                key={`${item.date}-${index}`}
                            >
                                {item.date}
                            </span>
                        )
                    )}

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| LANGUAGE BREAKDOWN
|--------------------------------------------------------------------------
*/

function LanguageBreakdown({
    data,
    getLanguageName,
    formatNumber,
    t,
}) {
    const total = data.reduce(
        (sum, item) =>
            sum +
            Number(
                item.views || 0
            ),
        0
    );

    if (!data.length) {
        return (
            <div className="empty-state">

                <div className="empty-icon">
                    <Globe2 size={25} />
                </div>

                <strong>
                    {t.noLanguageData}
                </strong>

                <span>
                    {t.noLanguageDataDescription}
                </span>

            </div>
        );
    }

    return (
        <div className="language-list">

            {data.map((item) => {

                const percentage =
                    total > 0
                        ? Math.round(
                              (Number(
                                  item.views ||
                                      0
                              ) /
                                  total) *
                                  100
                          )
                        : 0;

                return (
                    <div
                        className="language-row"
                        key={
                            item.language
                        }
                    >

                        <div className="language-row-top">

                            <div className="language-name">

                                <span className="language-dot" />

                                {getLanguageName(
                                    item.language
                                )}

                            </div>

                            <strong>
                                {percentage}%
                            </strong>

                        </div>


                        <div className="progress-track">

                            <div
                                className="progress-bar"
                                style={{
                                    width: `${percentage}%`,
                                }}
                            />

                        </div>


                        <div className="language-meta">

                            <span>
                                {formatNumber(
                                    item.views
                                )}{" "}
                                {t.views.toLowerCase()}
                            </span>

                            <span>
                                •
                            </span>

                            <span>
                                {formatNumber(
                                    item.users
                                )}{" "}
                                {t.users}
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| PAGE TABLE
|--------------------------------------------------------------------------
*/

function PageTable({
    data,
    getPageName,
    formatNumber,
    t,
}) {
    if (!data.length) {
        return (
            <div className="empty-state table-empty">

                <div className="empty-icon">
                    <HeartPulse size={26} />
                </div>

                <strong>
                    {t.noPageData}
                </strong>

                <span>
                    {t.noPageDataDescription}
                </span>

            </div>
        );
    }

    return (
        <div className="table-wrapper">

            <table className="analytics-table">

                <thead>

                    <tr>

                        <th>
                            {t.page}
                        </th>

                        <th>
                            {t.views}
                        </th>

                        <th>
                            {t.uniqueUsersTable}
                        </th>

                        <th>
                            {t.engagement}
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {data.map(
                        (
                            item,
                            index
                        ) => {

                            const engagement =
                                Number(
                                    item.users ||
                                        0
                                ) > 0
                                    ? (
                                          Number(
                                              item.views ||
                                                  0
                                          ) /
                                          Number(
                                              item.users ||
                                                  0
                                          )
                                      ).toFixed(
                                          1
                                      )
                                    : "0.0";

                            return (
                                <tr
                                    key={
                                        item.page
                                    }
                                >

                                    <td>

                                        <div className="page-name">

                                            <span className="rank">
                                                {index +
                                                    1}
                                            </span>

                                            <div>

                                                <strong>
                                                    {getPageName(
                                                        item.page
                                                    )}
                                                </strong>

                                                <small>
                                                    /
                                                    {
                                                        item.page
                                                    }
                                                </small>

                                            </div>

                                        </div>

                                    </td>


                                    <td>

                                        <strong>
                                            {formatNumber(
                                                item.views
                                            )}
                                        </strong>

                                    </td>


                                    <td>
                                        {formatNumber(
                                            item.users
                                        )}
                                    </td>


                                    <td>

                                        <span className="engagement-badge">

                                            {
                                                engagement
                                            }{" "}

                                            {
                                                t.viewsPerUser
                                            }

                                        </span>

                                    </td>

                                </tr>
                            );
                        }
                    )}

                </tbody>

            </table>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| RECENT ACTIVITY
|--------------------------------------------------------------------------
*/

function RecentActivity({
    data,
    getPageName,
    getLanguageName,
    t,
}) {
    if (!data.length) {
        return (
            <div className="empty-state">

                <div className="empty-icon">
                    <Users size={26} />
                </div>

                <strong>
                    {t.noRecentActivity}
                </strong>

                <span>
                    {t.noRecentActivityDescription}
                </span>

            </div>
        );
    }

    return (
        <div className="activity-list">

            {data.map((item) => {

                const initials =
                    item.user?.name
                        ?.split(/\s+/)
                        .slice(0, 2)
                        .map(
                            (part) =>
                                part
                                    .charAt(
                                        0
                                    )
                                    .toUpperCase()
                        )
                        .join("") ||
                    "U";

                return (
                    <div
                        className="activity-item"
                        key={item.id}
                    >

                        <div className="activity-avatar">
                            {initials}
                        </div>


                        <div className="activity-user">

                            <strong>
                                {item.user
                                    ?.name ||
                                    t.unknownUser}
                            </strong>

                            <span>
                                {item.user
                                    ?.email ||
                                    t.noEmail}
                            </span>

                        </div>


                        <div className="activity-page">

                            <strong>
                                {getPageName(
                                    item.page
                                )}
                            </strong>

                            <span>
                                {getLanguageName(
                                    item.language
                                )}
                            </span>

                        </div>


                        <div className="activity-time">

                            <strong>
                                {item.viewed_at}
                            </strong>

                            <span>
                                {item.created_at}
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/

const styles = `
.analytics-page {
    min-height: 100%;
    background:
        radial-gradient(
            circle at 90% 0%,
            rgba(93, 137, 200, .12),
            transparent 30%
        ),
        #f6f8fb;
    color: #172033;
    padding: 32px 24px 70px;
}

.analytics-shell {
    width: min(1440px, 100%);
    margin: 0 auto;
}


/* =========================================================
   HEADER
========================================================= */

.analytics-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;
}

.header-content {
    min-width: 0;
}

.analytics-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #5D89C8;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    margin-bottom: 9px;
}

.analytics-header h1 {
    margin: 0;
    color: #172033;
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.1;
    letter-spacing: -.035em;
    font-weight: 850;
}

.analytics-header p {
    margin: 10px 0 0;
    max-width: 680px;
    color: #6d7788;
    font-size: 14px;
    line-height: 1.65;
}

.refresh-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-shrink: 0;
    border: 1px solid #dce3ed;
    background: #fff;
    color: #263348;
    border-radius: 12px;
    padding: 11px 15px;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(23, 32, 51, .04);
    transition: .2s ease;
}

.refresh-button:hover {
    border-color: #5D89C8;
    color: #5D89C8;
    transform: translateY(-1px);
}


/* =========================================================
   KPI
========================================================= */

.stats-grid {
    display: grid;
    grid-template-columns:
        repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 16px;
}

.stat-card {
    position: relative;
    overflow: hidden;
    min-height: 170px;
    padding: 20px;
    background: #fff;
    border: 1px solid #e6ebf2;
    border-radius: 18px;
    box-shadow:
        0 10px 35px rgba(23, 32, 51, .045);
    transition:
        transform .2s ease,
        box-shadow .2s ease,
        border-color .2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    border-color: #d7e1ee;
    box-shadow:
        0 14px 38px rgba(23, 32, 51, .07);
}

.stat-card::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    right: -35px;
    top: -35px;
    border-radius: 50%;
    background: rgba(93, 137, 200, .07);
}

.stat-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 19px;
}

.stat-icon {
    position: relative;
    z-index: 1;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: #edf4fc;
    color: #5D89C8;
}

.stat-card.purple .stat-icon {
    background: #f3effd;
    color: #7958c7;
}

.stat-card.green .stat-icon {
    background: #edf8f1;
    color: #37845b;
}

.stat-card.orange .stat-icon {
    background: #fff5e9;
    color: #c87b28;
}

.stat-value {
    font-size: 30px;
    line-height: 1;
    font-weight: 850;
    letter-spacing: -.035em;
}

.stat-label {
    margin-top: 9px;
    font-size: 13px;
    font-weight: 800;
}

.stat-description {
    margin-top: 5px;
    color: #8993a3;
    font-size: 12px;
}


/* =========================================================
   GROWTH
========================================================= */

.growth-card {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 14px 18px;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #e6ebf2;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(23, 32, 51, .025);
}

.growth-icon {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 11px;
    background: #edf4fc;
    color: #5D89C8;
}

.growth-content {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 7px;
}

.growth-content strong {
    font-size: 15px;
}

.growth-content span {
    color: #7d8797;
    font-size: 12px;
}

.growth-direction {
    margin-left: auto;
}

.growth-direction.positive {
    color: #36835a;
}

.growth-direction.negative {
    color: #c85858;
}


/* =========================================================
   CARDS
========================================================= */

.filter-card,
.panel {
    background: #fff;
    border: 1px solid #e6ebf2;
    border-radius: 18px;
    box-shadow:
        0 10px 35px rgba(23, 32, 51, .045);
}

.filter-card {
    padding: 20px;
    margin-bottom: 20px;
}

.panel {
    padding: 21px;
    margin-bottom: 20px;
}

.analytics-grid .panel {
    margin-bottom: 0;
}


/* =========================================================
   SECTION HEADER
========================================================= */

.filter-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 17px;
}

.filter-heading h2,
.panel-header h2 {
    margin: 0;
    color: #202b3e;
    font-size: 16px;
    letter-spacing: -.015em;
}

.filter-heading p,
.panel-header p {
    margin: 5px 0 0;
    color: #8791a1;
    font-size: 12px;
    line-height: 1.5;
}

.section-kicker {
    margin-bottom: 5px;
    color: #5D89C8;
    font-size: 9px;
    font-weight: 850;
    letter-spacing: .13em;
}

.clear-button {
    border: 0;
    background: transparent;
    color: #5D89C8;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    padding: 3px 0;
}

.clear-button:hover {
    text-decoration: underline;
}


/* =========================================================
   FILTERS
========================================================= */

.filters {
    display: grid;
    grid-template-columns:
        minmax(180px, 1fr)
        minmax(180px, 1fr)
        minmax(180px, 1fr)
        auto;
    gap: 12px;
    align-items: end;
}

.filter-field label {
    display: block;
    margin-bottom: 7px;
    color: #667184;
    font-size: 11px;
    font-weight: 800;
}

.input-wrap {
    height: 43px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border: 1px solid #dce3ec;
    border-radius: 11px;
    color: #8993a3;
    background: #fbfcfe;
    transition: .2s ease;
}

.input-wrap:focus-within {
    border-color: #5D89C8;
    box-shadow:
        0 0 0 3px rgba(93, 137, 200, .1);
}

.input-wrap select {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #263348;
    font: inherit;
    font-size: 12px;
    cursor: pointer;
}

.apply-button {
    height: 43px;
    padding: 0 19px;
    border: 0;
    border-radius: 11px;
    background: #5D89C8;
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    box-shadow:
        0 7px 18px rgba(93, 137, 200, .22);
    transition: .2s ease;
}

.apply-button:hover {
    background: #4f7dbd;
    transform: translateY(-1px);
    box-shadow:
        0 10px 22px rgba(93, 137, 200, .27);
}


/* =========================================================
   ANALYTICS GRID
========================================================= */

.analytics-grid {
    display: grid;
    grid-template-columns:
        minmax(0, 1.75fr)
        minmax(320px, .85fr);
    gap: 20px;
    margin-bottom: 20px;
}


/* =========================================================
   PANEL
========================================================= */

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
}

.panel-icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: #f0f5fb;
    color: #5D89C8;
}


/* =========================================================
   CHART
========================================================= */

.chart-summary {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin-bottom: 15px;
}

.chart-summary strong {
    display: block;
    font-size: 25px;
    letter-spacing: -.03em;
}

.chart-summary span {
    color: #8a94a3;
    font-size: 11px;
}

.chart-area {
    position: relative;
    height: 255px;
}

.chart-grid-lines {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chart-grid-lines span {
    display: block;
    width: 100%;
    border-top: 1px dashed #e9edf3;
}

.chart-svg {
    position: absolute;
    inset: 5px 0 10px;
    width: 100%;
    height: calc(100% - 15px);
    color: #5D89C8;
    overflow: visible;
}

.chart-labels {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: #99a2b0;
    font-size: 10px;
    margin-top: 3px;
}


/* =========================================================
   LANGUAGE
========================================================= */

.language-list {
    display: flex;
    flex-direction: column;
    gap: 21px;
}

.language-row-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.language-name {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #29354a;
    font-size: 12px;
    font-weight: 750;
}

.language-dot {
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #5D89C8;
}

.language-row-top strong {
    font-size: 12px;
}

.progress-track {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: #edf0f5;
}

.progress-bar {
    height: 100%;
    border-radius: inherit;
    background: #5D89C8;
    transition: width .4s ease;
}

.language-meta {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    color: #9aa3b1;
    font-size: 10px;
}


/* =========================================================
   TABLE
========================================================= */

.table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.analytics-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 680px;
}

.analytics-table th {
    padding: 11px 10px;
    text-align: left;
    border-bottom: 1px solid #e8edf3;
    color: #8a94a3;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .08em;
}

.analytics-table td {
    padding: 15px 10px;
    border-bottom: 1px solid #f0f2f6;
    color: #566174;
    font-size: 12px;
}

.analytics-table tbody tr {
    transition: background .15s ease;
}

.analytics-table tbody tr:hover {
    background: #fafbfd;
}

.analytics-table tbody tr:last-child td {
    border-bottom: 0;
}

.page-name {
    display: flex;
    align-items: center;
    gap: 11px;
}

.page-name strong {
    display: block;
    color: #202c40;
    font-size: 12px;
}

.page-name small {
    display: block;
    margin-top: 3px;
    color: #9aa3b1;
    font-size: 10px;
}

.rank {
    width: 27px;
    height: 27px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    background: #f0f5fb;
    color: #5D89C8;
    font-size: 10px;
    font-weight: 850;
}

.engagement-badge {
    display: inline-flex;
    padding: 5px 8px;
    border-radius: 7px;
    background: #f1f5fa;
    color: #627084;
    font-size: 10px;
    font-weight: 700;
}


/* =========================================================
   RECENT ACTIVITY
========================================================= */

.activity-list {
    display: flex;
    flex-direction: column;
}

.activity-item {
    display: grid;
    grid-template-columns:
        auto
        minmax(180px, 1fr)
        minmax(180px, 1fr)
        minmax(140px, auto);
    align-items: center;
    gap: 13px;
    padding: 13px 0;
    border-bottom: 1px solid #eff2f6;
}

.activity-item:last-child {
    border-bottom: 0;
}

.activity-avatar {
    width: 39px;
    height: 39px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: #edf4fc;
    color: #5D89C8;
    font-size: 11px;
    font-weight: 850;
}

.activity-user strong,
.activity-page strong,
.activity-time strong {
    display: block;
    color: #29354a;
    font-size: 12px;
}

.activity-user span,
.activity-page span,
.activity-time span {
    display: block;
    margin-top: 4px;
    color: #929baa;
    font-size: 10px;
}

.activity-time {
    text-align: right;
}


/* =========================================================
   EMPTY STATES
========================================================= */

.empty-state,
.empty-chart {
    min-height: 190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;
    color: #9aa3b1;
    text-align: center;
}

.empty-icon {
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    margin-bottom: 5px;
    border-radius: 13px;
    background: #f4f7fa;
    color: #aeb8c6;
}

.empty-state strong,
.empty-chart strong {
    color: #526075;
    font-size: 13px;
}

.empty-state span,
.empty-chart span {
    max-width: 300px;
    font-size: 11px;
    line-height: 1.5;
}

.table-empty {
    min-height: 220px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1200px) {

    .stats-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    .analytics-grid {
        grid-template-columns: 1fr;
    }

    .filters {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    .apply-button {
        width: 100%;
    }
}


@media (max-width: 760px) {

    .analytics-page {
        padding: 22px 14px 50px;
    }

    .analytics-header {
        flex-direction: column;
        gap: 16px;
    }

    .refresh-button {
        width: 100%;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .filter-card,
    .panel {
        padding: 16px;
        border-radius: 15px;
    }

    .filters {
        grid-template-columns: 1fr;
    }

    .filter-heading {
        flex-direction: column;
    }

    .clear-button {
        padding: 0;
    }

    .growth-card {
        align-items: flex-start;
    }

    .growth-content {
        display: block;
    }

    .growth-content span {
        display: block;
        margin-top: 4px;
    }

    .activity-item {
        grid-template-columns:
            auto
            minmax(0, 1fr);
    }

    .activity-page {
        grid-column: 2;
    }

    .activity-time {
        grid-column: 2;
        text-align: left;
    }

    .chart-area {
        height: 210px;
    }

    .chart-labels {
        overflow: hidden;
        font-size: 9px;
    }
}


@media (max-width: 430px) {

    .analytics-page {
        padding-left: 10px;
        padding-right: 10px;
    }

    .analytics-header h1 {
        font-size: 27px;
    }

    .stat-card {
        min-height: 155px;
        padding: 17px;
    }

    .stat-value {
        font-size: 27px;
    }

    .growth-card {
        padding: 13px;
    }

    .panel-header {
        gap: 10px;
    }

    .panel-icon {
        width: 32px;
        height: 32px;
    }
}
`;