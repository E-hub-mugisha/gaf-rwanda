import { Head, Link, usePage, router } from '@inertiajs/react';

export default function AppLayout({ title, children }) {
    const { props } = usePage();
    const user = props.auth?.user;

    const logout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <>
            {title && <Head title={title} />}
            <header className="app-header">
                <Link className="brand" href={route('documents.index')}>Document Portal</Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '.85rem' }}>{user?.name}</span>
                    <form onSubmit={logout}>
                        <button type="submit" className="logout">Log out</button>
                    </form>
                </div>
            </header>
            <main className="app-main">
                {children}
            </main>
        </>
    );
}
