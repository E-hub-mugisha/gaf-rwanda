import { Head, Link, usePage, router } from '@inertiajs/react';

export default function AdminLayout({ title, children }) {
    const { url } = usePage();
    const isActive = (prefix) => url.startsWith(prefix);

    const logout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="admin-shell">
            {title && <Head title={title} />}
            <aside className="sidebar">
                <h2>Document Portal</h2>
                <nav>
                    <Link href={route('admin.dashboard')} className={isActive('/admin/dashboard') ? 'active' : ''}>Dashboard</Link>
                    <Link href={route('admin.documents.index')} className={isActive('/admin/documents') ? 'active' : ''}>Documents</Link>
                    <Link href={route('admin.users.index')} className={isActive('/admin/users') ? 'active' : ''}>Reader Accounts</Link>
                    <Link href={route('admin.activity.index')} className={isActive('/admin/activity') ? 'active' : ''}>Activity Log</Link>
                </nav>
                <form onSubmit={logout}>
                    <button type="submit" className="logout">Log out</button>
                </form>
            </aside>
            <div className="admin-main">
                {children}
            </div>
        </div>
    );
}
