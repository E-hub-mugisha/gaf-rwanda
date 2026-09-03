import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { Link, router, usePage } from '@inertiajs/react';

export default function Index({ users }) {
    const { props } = usePage();
    const status = props.flash?.status;

    const destroy = (user) => {
        if (confirm('Remove this account?')) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    return (
        <AdminLayout title="Reader Accounts">
            <div className="topbar">
                <h1>Reader Accounts</h1>
                <Link href={route('admin.users.create')} className="btn">+ New Account</Link>
            </div>

            {status && <div className="status">{status}</div>}

            <div className="card">
                {users.data.length === 0 ? (
                    <p className="empty">No reader accounts yet. Create one so the public can log in and view documents.</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr><th>Name</th><th>Email</th><th>Created</th><th></th></tr>
                            </thead>
                            <tbody>
                                {users.data.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at_date}</td>
                                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            <Link href={route('admin.users.edit', user.id)} className="btn btn-outline">Edit</Link>{' '}
                                            <button type="button" className="btn btn-danger" onClick={() => destroy(user)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={users.links} />
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
