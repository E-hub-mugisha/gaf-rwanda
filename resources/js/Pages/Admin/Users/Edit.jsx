import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.update', user.id));
    };

    return (
        <AdminLayout title="Edit Reader Account">
            <div className="topbar">
                <h1>Edit Reader Account</h1>
                <Link href={route('admin.users.index')} className="btn btn-outline">Back</Link>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="errors">
                    <ul>{Object.values(errors).map((msg, i) => <li key={i}>{msg}</li>)}</ul>
                </div>
            )}

            <div className="card" style={{ maxWidth: 480 }}>
                <form onSubmit={submit}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text" id="name" required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email" id="email" required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <label htmlFor="password">New Password</label>
                    <input
                        type="text" id="password"
                        placeholder="Leave blank to keep current password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <button type="submit" className="btn" disabled={processing}>Save Changes</button>
                </form>
            </div>
        </AdminLayout>
    );
}
