import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Users,
    UserPlus,
    Search,
    Pencil,
    Trash2,
    Mail,
    CalendarDays,
    ShieldCheck,
    UserRound,
    UserCircle,
    MoreHorizontal,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Index({ users }) {
    const { props } = usePage();
    const status = props.flash?.status;

    const [search, setSearch] = useState('');

    const destroy = (user) => {
        if (
            confirm(
                `Remove "${user.name}" from the reader accounts? This action cannot be undone.`
            )
        ) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return users.data;

        const query = search.toLowerCase();

        return users.data.filter(
            (user) =>
                user.name?.toLowerCase().includes(query) ||
                user.email?.toLowerCase().includes(query)
        );
    }, [users.data, search]);

    const getInitials = (name) => {
        if (!name) return 'U';

        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <AdminLayout title="Reader Accounts">
            <div className="readers-page">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="page-header">

                    <div className="page-heading">

                        <div className="heading-icon">
                            <Users size={24} strokeWidth={2} />
                        </div>

                        <div>
                            <h1>Reader Accounts</h1>

                            <p>
                                Manage public reader accounts and access.
                            </p>
                        </div>

                    </div>

                    <Link
                        href={route('admin.users.create')}
                        className="create-btn"
                    >
                        <UserPlus size={18} />
                        <span>New Reader</span>
                    </Link>

                </div>

                {/* =====================================================
                    SUCCESS ALERT
                ====================================================== */}

                {status && (
                    <div className="success-alert">

                        <div className="success-icon">
                            <ShieldCheck size={17} />
                        </div>

                        <div>
                            <strong>Success</strong>
                            <p>{status}</p>
                        </div>

                    </div>
                )}

                {/* =====================================================
                    STATISTICS
                ====================================================== */}

                <div className="reader-stats">

                    <div className="stat-card">

                        <div className="stat-icon blue">
                            <Users size={20} />
                        </div>

                        <div>
                            <span>Total Readers</span>
                            <strong>{users.total}</strong>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon green">
                            <UserCircle size={20} />
                        </div>

                        <div>
                            <span>Current Page</span>
                            <strong>
                                {users.current_page} / {users.last_page}
                            </strong>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon purple">
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <span>Account Type</span>
                            <strong>Reader</strong>
                        </div>

                    </div>

                </div>

                {/* =====================================================
                    MAIN CARD
                ====================================================== */}

                <div className="readers-card">

                    {/* TOOLBAR */}

                    <div className="readers-toolbar">

                        <div>
                            <h2>All Reader Accounts</h2>

                            <p>
                                {users.total}{' '}
                                {users.total === 1
                                    ? 'reader account'
                                    : 'reader accounts'}{' '}
                                registered
                            </p>
                        </div>

                        <div className="search-box">

                            <Search size={17} />

                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* =================================================
                        EMPTY STATE
                    ================================================== */}

                    {filteredUsers.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                {search ? (
                                    <Search size={32} />
                                ) : (
                                    <Users size={34} />
                                )}
                            </div>

                            {search ? (
                                <>
                                    <h3>No readers found</h3>

                                    <p>
                                        We couldn't find an account matching
                                        "{search}".
                                    </p>

                                    <button
                                        type="button"
                                        className="clear-search"
                                        onClick={() => setSearch('')}
                                    >
                                        Clear Search
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3>No reader accounts yet</h3>

                                    <p>
                                        Create a reader account so members of
                                        the public can log in and access
                                        documents.
                                    </p>

                                    <Link
                                        href={route(
                                            'admin.users.create'
                                        )}
                                        className="empty-create-btn"
                                    >
                                        <UserPlus size={17} />
                                        Create Reader Account
                                    </Link>
                                </>
                            )}

                        </div>

                    ) : (

                        <>
                            {/* =============================================
                                DESKTOP TABLE
                            ============================================== */}

                            <div className="table-wrapper">

                                <table className="readers-table">

                                    <thead>
                                        <tr>
                                            <th>READER</th>
                                            <th>EMAIL ADDRESS</th>
                                            <th>ACCOUNT TYPE</th>
                                            <th>CREATED</th>
                                            <th className="actions-header">
                                                ACTIONS
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {filteredUsers.map((user) => (

                                            <tr key={user.id}>

                                                {/* READER */}

                                                <td>

                                                    <div className="reader-info">

                                                        <div className="avatar">
                                                            {getInitials(
                                                                user.name
                                                            )}
                                                        </div>

                                                        <div>
                                                            <div className="reader-name">
                                                                {user.name}
                                                            </div>

                                                            <div className="reader-id">
                                                                Reader #{user.id}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </td>

                                                {/* EMAIL */}

                                                <td>

                                                    <div className="email-info">

                                                        <Mail size={14} />

                                                        <span>
                                                            {user.email}
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* ACCOUNT TYPE */}

                                                <td>

                                                    <span className="role-badge">

                                                        <UserRound size={12} />

                                                        Reader

                                                    </span>

                                                </td>

                                                {/* CREATED */}

                                                <td>

                                                    <div className="date-info">

                                                        <CalendarDays
                                                            size={15}
                                                        />

                                                        {user.created_at_date}

                                                    </div>

                                                </td>

                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="actions">

                                                        <Link
                                                            href={route(
                                                                'admin.users.edit',
                                                                user.id
                                                            )}
                                                            className="action-btn edit"
                                                            title="Edit reader"
                                                        >
                                                            <Pencil size={16} />

                                                            <span>
                                                                Edit
                                                            </span>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="action-btn delete"
                                                            onClick={() =>
                                                                destroy(user)
                                                            }
                                                            title="Delete reader"
                                                        >
                                                            <Trash2 size={16} />

                                                            <span>
                                                                Delete
                                                            </span>
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            {/* =============================================
                                MOBILE CARDS
                            ============================================== */}

                            <div className="mobile-readers">

                                {filteredUsers.map((user) => (

                                    <div
                                        className="mobile-reader"
                                        key={user.id}
                                    >

                                        <div className="mobile-reader-top">

                                            <div className="reader-info">

                                                <div className="avatar">
                                                    {getInitials(
                                                        user.name
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="reader-name">
                                                        {user.name}
                                                    </div>

                                                    <div className="reader-id">
                                                        Reader #{user.id}
                                                    </div>
                                                </div>

                                            </div>

                                            <MoreHorizontal
                                                size={19}
                                                color="#98A2B3"
                                            />

                                        </div>

                                        <div className="mobile-reader-meta">

                                            <div className="mobile-meta-item">

                                                <span>Email</span>

                                                <div className="mobile-email">
                                                    <Mail size={13} />

                                                    {user.email}
                                                </div>

                                            </div>

                                            <div className="mobile-meta-item">

                                                <span>Created</span>

                                                <strong>
                                                    {user.created_at_date}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="mobile-status">

                                            <span className="role-badge">
                                                <UserRound size={12} />
                                                Reader Account
                                            </span>

                                        </div>

                                        <div className="mobile-actions">

                                            <Link
                                                href={route(
                                                    'admin.users.edit',
                                                    user.id
                                                )}
                                                className="action-btn edit"
                                            >
                                                <Pencil size={16} />
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                className="action-btn delete"
                                                onClick={() =>
                                                    destroy(user)
                                                }
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* =============================================
                                PAGINATION
                            ============================================== */}

                            {users.last_page > 1 && (
                                <div className="pagination-wrapper">
                                    <Pagination links={users.links} />
                                </div>
                            )}

                        </>

                    )}

                </div>

            </div>

            {/* =========================================================
                STYLES
            ========================================================== */}

            <style>{`

                .readers-page {
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

                    letter-spacing: -.5px;
                }

                .page-heading p {
                    margin: 4px 0 0;

                    color: var(--muted);

                    font-size: 14px;
                }

                .create-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;

                    padding: 12px 17px;

                    border-radius: 10px;

                    background: var(--primary);
                    color: white;

                    text-decoration: none;

                    font-size: 14px;
                    font-weight: 650;

                    box-shadow:
                        0 4px 12px rgba(
                            93,
                            137,
                            200,
                            .20
                        );

                    transition: .2s ease;
                }

                .create-btn:hover {
                    background: var(--primary-dark);
                    color: white;

                    transform: translateY(-1px);
                }

                /* =====================================================
                   ALERT
                ====================================================== */

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

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #D9F2E1;
                }

                .success-alert strong {
                    display: block;

                    font-size: 13px;
                }

                .success-alert p {
                    margin: 2px 0 0;

                    font-size: 13px;
                }

                /* =====================================================
                   STATS
                ====================================================== */

                .reader-stats {
                    display: grid;

                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));

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

                    box-shadow:
                        0 2px 8px
                        rgba(20, 30, 50, .03);
                }

                .stat-icon {
                    width: 42px;
                    height: 42px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 11px;
                }

                .stat-icon.blue {
                    background: #EAF1FC;
                    color: #5D89C8;
                }

                .stat-icon.green {
                    background: #E9F7EF;
                    color: #31945A;
                }

                .stat-icon.purple {
                    background: #F1ECFC;
                    color: #805AD5;
                }

                .stat-card span {
                    display: block;

                    margin-bottom: 3px;

                    color: var(--muted);

                    font-size: 12px;
                }

                .stat-card strong {
                    color: var(--text);

                    font-size: 20px;
                    font-weight: 750;
                }

                /* =====================================================
                   MAIN CARD
                ====================================================== */

                .readers-card {
                    overflow: hidden;

                    background: white;

                    border: 1px solid var(--border);

                    border-radius: 16px;

                    box-shadow:
                        0 3px 12px
                        rgba(20, 30, 50, .035);
                }

                /* =====================================================
                   TOOLBAR
                ====================================================== */

                .readers-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;

                    padding: 20px 22px;

                    border-bottom: 1px solid var(--border);
                }

                .readers-toolbar h2 {
                    margin: 0;

                    color: var(--text);

                    font-size: 16px;
                    font-weight: 700;
                }

                .readers-toolbar p {
                    margin: 4px 0 0;

                    color: var(--muted);

                    font-size: 12px;
                }

                .search-box {
                    width: 300px;
                    height: 39px;

                    display: flex;
                    align-items: center;

                    gap: 9px;

                    padding: 0 12px;

                    border: 1px solid var(--border);

                    border-radius: 9px;

                    color: #98A2B3;

                    background: #FAFBFC;

                    transition: .2s ease;
                }

                .search-box:focus-within {
                    border-color: var(--primary);

                    background: white;

                    box-shadow:
                        0 0 0 3px
                        rgba(93, 137, 200, .10);
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

                /* =====================================================
                   TABLE
                ====================================================== */

                .table-wrapper {
                    overflow-x: auto;
                }

                .readers-table {
                    width: 100%;

                    border-collapse: collapse;
                }

                .readers-table th {
                    padding: 12px 22px;

                    text-align: left;

                    background: #FAFBFC;

                    border-bottom: 1px solid var(--border);

                    color: #8A94A6;

                    font-size: 10px;

                    font-weight: 750;

                    letter-spacing: .6px;
                }

                .readers-table td {
                    padding: 17px 22px;

                    border-bottom: 1px solid #F0F2F5;

                    vertical-align: middle;
                }

                .readers-table tbody tr {
                    transition: background .15s ease;
                }

                .readers-table tbody tr:hover {
                    background: #FBFCFE;
                }

                .readers-table tbody tr:last-child td {
                    border-bottom: none;
                }

                /* =====================================================
                   READER
                ====================================================== */

                .reader-info {
                    display: flex;
                    align-items: center;

                    gap: 11px;
                }

                .avatar {
                    width: 40px;
                    height: 40px;

                    flex: 0 0 auto;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 11px;

                    background:
                        linear-gradient(
                            135deg,
                            #EAF1FC,
                            #DCE9F8
                        );

                    color: var(--primary-dark);

                    font-size: 12px;

                    font-weight: 800;
                }

                .reader-name {
                    max-width: 230px;

                    overflow: hidden;

                    color: var(--text);

                    font-size: 14px;

                    font-weight: 650;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                .reader-id {
                    margin-top: 3px;

                    color: #98A2B3;

                    font-size: 11px;
                }

                /* =====================================================
                   EMAIL
                ====================================================== */

                .email-info {
                    display: flex;
                    align-items: center;

                    gap: 7px;

                    color: #667085;

                    font-size: 12px;
                }

                .email-info svg {
                    flex: 0 0 auto;

                    color: #98A2B3;
                }

                /* =====================================================
                   ROLE
                ====================================================== */

                .role-badge {
                    display: inline-flex;
                    align-items: center;

                    gap: 5px;

                    padding: 6px 9px;

                    border-radius: 7px;

                    background: #EEF4FC;

                    color: #5275A6;

                    font-size: 10px;

                    font-weight: 700;

                    white-space: nowrap;
                }

                /* =====================================================
                   DATE
                ====================================================== */

                .date-info {
                    display: flex;
                    align-items: center;

                    gap: 7px;

                    color: #667085;

                    font-size: 12px;

                    white-space: nowrap;
                }

                .date-info svg {
                    color: #98A2B3;
                }

                /* =====================================================
                   ACTIONS
                ====================================================== */

                .actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    gap: 6px;
                }

                .action-btn {
                    height: 34px;

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    gap: 6px;

                    padding: 0 10px;

                    border: 1px solid transparent;

                    border-radius: 8px;

                    background: white;

                    text-decoration: none;

                    font-size: 11px;

                    font-weight: 650;

                    cursor: pointer;

                    transition: .15s ease;
                }

                .action-btn.edit {
                    color: #4C72A9;

                    border-color: #DCE8F8;

                    background: #F7FAFE;
                }

                .action-btn.edit:hover {
                    background: #EAF1FC;

                    border-color: #C6D8EE;
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

                /* =====================================================
                   EMPTY STATE
                ====================================================== */

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
                    max-width: 440px;

                    margin: 7px auto 20px;

                    color: var(--muted);

                    font-size: 13px;

                    line-height: 1.6;
                }

                .empty-create-btn,
                .clear-search {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

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

                .empty-create-btn:hover {
                    background: var(--primary-dark);

                    color: white;
                }

                .clear-search {
                    background: #EEF2F7;

                    color: #526581;
                }

                /* =====================================================
                   PAGINATION
                ====================================================== */

                .pagination-wrapper {
                    padding: 16px 22px;

                    border-top: 1px solid var(--border);
                }

                /* =====================================================
                   MOBILE
                ====================================================== */

                .mobile-readers {
                    display: none;
                }

                @media (max-width: 1050px) {

                    .readers-table th:nth-child(3),
                    .readers-table td:nth-child(3) {
                        display: none;
                    }

                    .action-btn {
                        width: 34px;
                        padding: 0;
                    }

                    .action-btn span {
                        display: none;
                    }

                }

                @media (max-width: 760px) {

                    .readers-page {
                        padding: 18px 14px;
                    }

                    .page-header {
                        align-items: flex-start;

                        flex-direction: column;
                    }

                    .create-btn {
                        width: 100%;
                    }

                    .reader-stats {
                        grid-template-columns: 1fr;
                    }

                    .readers-toolbar {
                        align-items: stretch;

                        flex-direction: column;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .table-wrapper {
                        display: none;
                    }

                    .mobile-readers {
                        display: block;
                    }

                    .mobile-reader {
                        padding: 17px;

                        border-bottom: 1px solid var(--border);
                    }

                    .mobile-reader:last-child {
                        border-bottom: none;
                    }

                    .mobile-reader-top {
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;

                        gap: 10px;
                    }

                    .mobile-reader-meta {
                        display: grid;

                        grid-template-columns: 1fr;

                        gap: 13px;

                        margin-top: 16px;

                        padding: 14px 0;

                        border-top: 1px solid #F0F2F5;

                        border-bottom: 1px solid #F0F2F5;
                    }

                    .mobile-meta-item span {
                        display: block;

                        margin-bottom: 5px;

                        color: #98A2B3;

                        font-size: 10px;

                        font-weight: 700;

                        text-transform: uppercase;

                        letter-spacing: .4px;
                    }

                    .mobile-meta-item strong {
                        color: #526581;

                        font-size: 12px;

                        font-weight: 600;
                    }

                    .mobile-email {
                        display: flex;
                        align-items: center;

                        gap: 6px;

                        color: #667085;

                        font-size: 12px;

                        word-break: break-word;
                    }

                    .mobile-email svg {
                        flex: 0 0 auto;

                        color: #98A2B3;
                    }

                    .mobile-status {
                        margin-top: 13px;
                    }

                    .mobile-actions {
                        display: grid;

                        grid-template-columns: 1fr 1fr;

                        gap: 7px;

                        margin-top: 13px;
                    }

                    .mobile-actions .action-btn {
                        width: 100%;
                        height: 37px;
                    }

                    .mobile-actions .action-btn span {
                        display: inline;
                    }

                    .reader-name {
                        max-width: 230px;
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

                    .avatar {
                        width: 38px;
                        height: 38px;
                    }

                    .reader-name {
                        max-width: 190px;
                    }

                    .mobile-actions {
                        grid-template-columns: 1fr;
                    }

                }

            `}</style>
        </AdminLayout>
    );
}