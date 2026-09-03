import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentDocuments }) {
    return (
        <AdminLayout title="Dashboard">
            <div className="topbar">
                <h1>Dashboard</h1>
                <Link href={route('admin.documents.create')} className="btn">+ Upload Document</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card">
                    <div style={{ color: 'var(--color-muted)', fontSize: '.8rem' }}>Documents</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.documents}</div>
                </div>
                <div className="card">
                    <div style={{ color: 'var(--color-muted)', fontSize: '.8rem' }}>Reader Accounts</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.users}</div>
                </div>
                <div className="card">
                    <div style={{ color: 'var(--color-muted)', fontSize: '.8rem' }}>Admins</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.admins}</div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ marginTop: 0, fontSize: '1rem' }}>Recent Documents</h2>
                {recentDocuments.length === 0 ? (
                    <p className="empty">No documents uploaded yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr><th>Title</th><th>Languages</th><th>Uploaded</th></tr>
                        </thead>
                        <tbody>
                            {recentDocuments.map((doc) => (
                                <tr key={doc.id}>
                                    <td><Link href={route('admin.documents.edit', doc.id)}>{doc.title}</Link></td>
                                    <td>
                                        {doc.versions.map((v) => (
                                            <span key={v.id} className="tag">{v.language_label}</span>
                                        ))}
                                    </td>
                                    <td>{doc.created_at_human}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
