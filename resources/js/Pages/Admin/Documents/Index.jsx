import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { Link, router, usePage } from '@inertiajs/react';

export default function Index({ documents }) {
    const { props } = usePage();
    const status = props.flash?.status;

    const destroy = (doc) => {
        if (confirm('Delete this document and all its language versions?')) {
            router.delete(route('admin.documents.destroy', doc.id));
        }
    };

    return (
        <AdminLayout title="Documents">
            <div className="topbar">
                <h1>Documents</h1>
                <Link href={route('admin.documents.create')} className="btn">+ Upload Document</Link>
            </div>

            {status && <div className="status">{status}</div>}

            <div className="card">
                {documents.data.length === 0 ? (
                    <p className="empty">No documents uploaded yet.</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr><th>Title</th><th>Languages available</th><th>Uploaded</th><th></th></tr>
                            </thead>
                            <tbody>
                                {documents.data.map((doc) => (
                                    <tr key={doc.id}>
                                        <td>{doc.title}</td>
                                        <td>
                                            {doc.versions.length === 0 ? (
                                                <span style={{ color: 'var(--color-muted)', fontSize: '.85rem' }}>none</span>
                                            ) : (
                                                doc.versions.map((v) => (
                                                    <span key={v.id} className="tag">{v.language_label}</span>
                                                ))
                                            )}
                                        </td>
                                        <td>{doc.created_at_date}</td>
                                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            <Link href={route('admin.activity.index', { document: doc.id })} className="btn btn-outline">Activity</Link>{' '}
                                            <Link href={route('admin.documents.edit', doc.id)} className="btn btn-outline">Edit</Link>{' '}
                                            <button type="button" className="btn btn-danger" onClick={() => destroy(doc)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={documents.links} />
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
