import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';

export default function Index({ views }) {
    return (
        <AdminLayout title="Activity Log">
            <div className="topbar">
                <h1>Activity Log</h1>
            </div>

            <div className="card">
                {views.data.length === 0 ? (
                    <p className="empty">No document views recorded yet.</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr><th>Reader</th><th>Document</th><th>Language</th><th>Viewed</th></tr>
                            </thead>
                            <tbody>
                                {views.data.map((view) => (
                                    <tr key={view.id}>
                                        <td>{view.user_name}</td>
                                        <td>{view.document_title}</td>
                                        <td><span className="tag">{view.language_label}</span></td>
                                        <td>{view.viewed_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={views.links} />
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
