import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';

export default function Index({ documents }) {
    return (
        <AppLayout title="Documents">
            <h1 style={{ fontSize: '1.3rem', marginBottom: '1.2rem' }}>Available Documents</h1>

            {documents.data.length === 0 ? (
                <div className="empty">No documents have been published yet.</div>
            ) : (
                <>
                    <div className="grid">
                        {documents.data.map((doc) => (
                            <div className="card" key={doc.id}>
                                <div className="doc-title">{doc.title}</div>
                                {doc.description && (
                                    <p className="doc-desc">
                                        {doc.description.length > 100 ? `${doc.description.slice(0, 100)}…` : doc.description}
                                    </p>
                                )}
                                <div>
                                    {doc.versions.map((v) => (
                                        <span key={v.id} className="lang-tag">{v.language_label}</span>
                                    ))}
                                </div>
                                <Link href={route('documents.show', doc.id)} className="btn">View Document</Link>
                            </div>
                        ))}
                    </div>
                    <Pagination links={documents.links} />
                </>
            )}
        </AppLayout>
    );
}
