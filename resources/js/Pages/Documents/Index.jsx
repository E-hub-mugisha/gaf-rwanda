import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import { Link, usePage } from '@inertiajs/react';
import {
    FileText,
    Search,
    Eye,
    Languages,
    CalendarDays,
    ArrowRight,
    BookOpen,
    X,
    User,
    Library,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Index({ documents }) {
    const { props } = usePage();
    const user = props.auth?.user;

    const [search, setSearch] = useState('');

    const filteredDocuments = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return documents.data;
        }

        return documents.data.filter((doc) => {
            return (
                doc.title?.toLowerCase().includes(query) ||
                doc.description?.toLowerCase().includes(query) ||
                doc.versions?.some((version) =>
                    version.language_label
                        ?.toLowerCase()
                        .includes(query)
                )
            );
        });
    }, [documents.data, search]);

    const getInitials = (name) => {
        if (!name) return 'U';

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    };

    return (
        <AppLayout title="Documents">

            <div className="documents-page">

                {/* =====================================================
                   HERO / PAGE HEADER
                   ===================================================== */}

                <section className="library-hero">
                    <div className="hero-content">

                        <div className="welcome-badge">
                            <User size={13} />
                            <span>
                                Welcome back, {user?.name || 'Reader'}
                            </span>
                        </div>

                        <h1>
                            Your Document Library
                        </h1>

                        <p>
                            Browse and access the latest documents,
                            resources, and publications available to you.
                        </p>

                        <div className="hero-stats">
                            <div className="hero-stat">
                                <div className="hero-stat-icon">
                                    <FileText size={16} />
                                </div>

                                <div>
                                    <strong>
                                        {documents.total ??
                                            documents.data.length}
                                    </strong>

                                    <span>Documents</span>
                                </div>
                            </div>

                            <div className="hero-stat-divider"></div>

                            <div className="hero-stat">
                                <div className="hero-stat-icon">
                                    <Library size={16} />
                                </div>

                                <div>
                                    <strong>
                                        Available
                                    </strong>

                                    <span>Resources</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-decoration">
                        <div className="decoration-circle circle-one"></div>
                        <div className="decoration-circle circle-two"></div>
                        <FileText
                            size={95}
                            strokeWidth={1}
                            className="decoration-icon"
                        />
                    </div>
                </section>

                {/* =====================================================
                   TOOLBAR
                   ===================================================== */}

                <div className="library-toolbar">

                    <div className="section-heading">
                        <div className="section-icon">
                            <BookOpen size={18} />
                        </div>

                        <div>
                            <h2>Available Documents</h2>
                            <p>
                                Explore published resources
                            </p>
                        </div>
                    </div>

                    <div className="search-box">
                        <Search
                            size={17}
                            className="search-icon"
                        />

                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (
                            <button
                                type="button"
                                className="clear-search"
                                onClick={() => setSearch('')}
                            >
                                <X size={15} />
                            </button>
                        )}
                    </div>
                </div>

                {/* =====================================================
                   DOCUMENTS
                   ===================================================== */}

                {documents.data.length === 0 ? (
                    <div className="empty-state">

                        <div className="empty-icon">
                            <FileText size={32} />
                        </div>

                        <h3>
                            No documents available
                        </h3>

                        <p>
                            There are currently no published documents
                            available in the portal.
                        </p>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="empty-state">

                        <div className="empty-icon">
                            <Search size={30} />
                        </div>

                        <h3>
                            No documents found
                        </h3>

                        <p>
                            We couldn't find any documents matching
                            "{search}".
                        </p>

                        <button
                            type="button"
                            className="clear-filter-button"
                            onClick={() => setSearch('')}
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="documents-grid">

                            {filteredDocuments.map((doc) => (
                                <article
                                    className="document-card"
                                    key={doc.id}
                                >

                                    {/* CARD TOP */}
                                    <div className="document-card-top">

                                        <div className="document-type-icon">
                                            <FileText size={22} />
                                        </div>

                                        <span className="published-badge">
                                            Published
                                        </span>
                                    </div>

                                    {/* TITLE */}
                                    <div className="document-body">

                                        <h3>
                                            {doc.title}
                                        </h3>

                                        {doc.description ? (
                                            <p className="document-description">
                                                {doc.description.length > 125
                                                    ? `${doc.description.slice(
                                                          0,
                                                          125
                                                      )}…`
                                                    : doc.description}
                                            </p>
                                        ) : (
                                            <p className="document-description no-description">
                                                No description provided for
                                                this document.
                                            </p>
                                        )}

                                        {/* LANGUAGES */}
                                        {doc.versions?.length > 0 && (
                                            <div className="language-section">

                                                <div className="language-heading">
                                                    <Languages size={13} />
                                                    <span>
                                                        Available languages
                                                    </span>
                                                </div>

                                                <div className="language-list">
                                                    {doc.versions.map(
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
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* CARD FOOTER */}
                                    <div className="document-footer">

                                        <div className="document-meta">
                                            <CalendarDays size={14} />

                                            <span>
                                                Available resource
                                            </span>
                                        </div>

                                        <Link
                                            href={route(
                                                'documents.show',
                                                doc.id
                                            )}
                                            className="view-button"
                                        >
                                            <span>
                                                View Document
                                            </span>

                                            <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* PAGINATION */}

                        {!search && (
                            <div className="pagination-wrapper">
                                <Pagination
                                    links={documents.links}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                /* =====================================================
                   DOCUMENT LIBRARY
                   ===================================================== */

                .documents-page {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F7F9FC;
                    --surface: #FFFFFF;

                    width: 100%;
                    max-width: 1120px;
                    margin: 0 auto;
                }

                /* =====================================================
                   HERO
                   ===================================================== */

                .library-hero {
                    position: relative;
                    min-height: 235px;
                    overflow: hidden;
                    border-radius: 20px;
                    background:
                        linear-gradient(
                            120deg,
                            #EEF4FC 0%,
                            #F7FAFE 55%,
                            #FFFFFF 100%
                        );
                    border: 1px solid #DDE7F3;
                    padding: 30px 34px;
                    box-sizing: border-box;
                    margin-bottom: 28px;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 650px;
                }

                .welcome-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 8px;
                    background: rgba(255,255,255,.8);
                    border: 1px solid #DCE7F4;
                    color: var(--blue);
                    font-size: 10px;
                    font-weight: 750;
                    margin-bottom: 13px;
                }

                .library-hero h1 {
                    margin: 0;
                    color: var(--ink);
                    font-size: 29px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -.035em;
                }

                .library-hero p {
                    max-width: 560px;
                    margin: 9px 0 20px;
                    color: #687587;
                    font-size: 13px;
                    line-height: 1.6;
                }

                /* HERO STATS */

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 17px;
                }

                .hero-stat {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .hero-stat-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: rgba(255,255,255,.9);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #DDE7F3;
                }

                .hero-stat strong {
                    display: block;
                    font-size: 13px;
                    font-weight: 800;
                    color: #354154;
                }

                .hero-stat span {
                    display: block;
                    margin-top: 2px;
                    font-size: 9px;
                    color: #8A95A5;
                }

                .hero-stat-divider {
                    width: 1px;
                    height: 27px;
                    background: #D8E2EE;
                }

                /* HERO DECORATION */

                .hero-decoration {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 330px;
                    height: 100%;
                    pointer-events: none;
                }

                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(93,137,200,.13);
                }

                .circle-one {
                    width: 250px;
                    height: 250px;
                    right: -80px;
                    top: -85px;
                }

                .circle-two {
                    width: 180px;
                    height: 180px;
                    right: 25px;
                    bottom: -110px;
                }

                .decoration-icon {
                    position: absolute;
                    right: 100px;
                    top: 70px;
                    color: rgba(93,137,200,.12);
                }

                /* =====================================================
                   TOOLBAR
                   ===================================================== */

                .library-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 17px;
                }

                .section-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-icon {
                    width: 37px;
                    height: 37px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .section-heading h2 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 800;
                    color: var(--ink);
                }

                .section-heading p {
                    margin: 3px 0 0;
                    font-size: 10px;
                    color: #929DAC;
                }

                /* SEARCH */

                .search-box {
                    position: relative;
                    width: 275px;
                }

                .search-box input {
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    padding: 0 38px 0 38px;
                    border: 1px solid #DCE2EA;
                    border-radius: 10px;
                    background: #fff;
                    outline: none;
                    color: var(--ink);
                    font-size: 11.5px;
                    transition: .2s ease;
                }

                .search-box input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px rgba(93,137,200,.1);
                }

                .search-box input::placeholder {
                    color: #A1AAB7;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 12px;
                    color: #8D99A8;
                    pointer-events: none;
                }

                .clear-search {
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    width: 28px;
                    height: 28px;
                    border: 0;
                    border-radius: 7px;
                    background: transparent;
                    color: #8D99A8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .clear-search:hover {
                    background: var(--blue-light);
                    color: var(--blue);
                }

                /* =====================================================
                   DOCUMENT GRID
                   ===================================================== */

                .documents-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));
                    gap: 17px;
                }

                /* =====================================================
                   DOCUMENT CARD
                   ===================================================== */

                .document-card {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    min-height: 315px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow:
                        0 4px 18px rgba(24,43,70,.035);
                    transition:
                        transform .2s ease,
                        box-shadow .2s ease,
                        border-color .2s ease;
                }

                .document-card:hover {
                    transform: translateY(-3px);
                    border-color: #D3DFED;
                    box-shadow:
                        0 12px 28px rgba(24,43,70,.08);
                }

                .document-card-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 17px 17px 12px;
                }

                .document-type-icon {
                    width: 43px;
                    height: 43px;
                    border-radius: 12px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .published-badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 8px;
                    border-radius: 7px;
                    background: #F1F8F4;
                    border: 1px solid #DDEDE4;
                    color: #4A8B68;
                    font-size: 8.5px;
                    font-weight: 800;
                }

                /* BODY */

                .document-body {
                    flex: 1;
                    padding: 7px 17px 18px;
                }

                .document-body h3 {
                    margin: 0;
                    color: #2D394B;
                    font-size: 15px;
                    line-height: 1.4;
                    font-weight: 800;
                    letter-spacing: -.012em;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .document-description {
                    margin: 8px 0 16px;
                    color: #788596;
                    font-size: 11px;
                    line-height: 1.6;
                    min-height: 35px;
                }

                .document-description.no-description {
                    color: #A3ACB8;
                    font-style: italic;
                }

                /* LANGUAGES */

                .language-section {
                    margin-top: 10px;
                }

                .language-heading {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #929DAC;
                    font-size: 9px;
                    font-weight: 650;
                    margin-bottom: 7px;
                }

                .language-heading svg {
                    color: var(--blue);
                }

                .language-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .language-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 7px;
                    background: #F8FAFC;
                    border: 1px solid #E2E7ED;
                    border-radius: 6px;
                    color: #657285;
                    font-size: 8.5px;
                    font-weight: 700;
                }

                /* FOOTER */

                .document-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    padding: 12px 15px;
                    border-top: 1px solid #EEF1F5;
                    background: #FCFDFE;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #99A3AF;
                    font-size: 8.5px;
                    white-space: nowrap;
                }

                .view-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    min-height: 31px;
                    padding: 0 10px;
                    border-radius: 8px;
                    background: var(--blue);
                    color: #fff;
                    text-decoration: none;
                    font-size: 9.5px;
                    font-weight: 750;
                    transition: .2s ease;
                    white-space: nowrap;
                }

                .view-button:hover {
                    background: var(--blue-dark);
                    transform: translateX(1px);
                }

                /* =====================================================
                   EMPTY STATE
                   ===================================================== */

                .empty-state {
                    min-height: 300px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 30px;
                }

                .empty-icon {
                    width: 65px;
                    height: 65px;
                    border-radius: 18px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 14px;
                }

                .empty-state h3 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 800;
                    color: #344052;
                }

                .empty-state p {
                    max-width: 400px;
                    margin: 7px 0 15px;
                    color: #8994A4;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .clear-filter-button {
                    border: 1px solid #DCE3EC;
                    background: #fff;
                    color: #5D6B7D;
                    border-radius: 8px;
                    padding: 8px 13px;
                    font-size: 10.5px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .clear-filter-button:hover {
                    border-color: var(--blue);
                    background: var(--blue-light);
                    color: var(--blue);
                }

                /* =====================================================
                   PAGINATION
                   ===================================================== */

                .pagination-wrapper {
                    margin-top: 20px;
                    padding: 14px 17px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 13px;
                    overflow-x: auto;
                }

                /* =====================================================
                   RESPONSIVE
                   ===================================================== */

                @media (max-width: 1000px) {
                    .documents-grid {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                    }

                    .hero-decoration {
                        opacity: .65;
                    }
                }

                @media (max-width: 700px) {
                    .library-hero {
                        min-height: auto;
                        padding: 24px 22px;
                        border-radius: 16px;
                    }

                    .library-hero h1 {
                        font-size: 23px;
                    }

                    .library-hero p {
                        font-size: 11.5px;
                    }

                    .hero-decoration {
                        display: none;
                    }

                    .library-toolbar {
                        align-items: stretch;
                        flex-direction: column;
                        gap: 13px;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .documents-grid {
                        grid-template-columns: 1fr;
                    }

                    .document-card {
                        min-height: 290px;
                    }
                }

                @media (max-width: 480px) {
                    .library-hero {
                        padding: 20px 17px;
                    }

                    .library-hero h1 {
                        font-size: 21px;
                    }

                    .hero-stats {
                        gap: 12px;
                    }

                    .hero-stat-divider {
                        height: 23px;
                    }

                    .hero-stat-icon {
                        width: 29px;
                        height: 29px;
                    }

                    .section-heading h2 {
                        font-size: 14px;
                    }

                    .document-card-top {
                        padding: 15px 15px 10px;
                    }

                    .document-body {
                        padding-left: 15px;
                        padding-right: 15px;
                    }

                    .document-footer {
                        padding: 11px 13px;
                    }
                }
            `}</style>
        </AppLayout>
    );
}