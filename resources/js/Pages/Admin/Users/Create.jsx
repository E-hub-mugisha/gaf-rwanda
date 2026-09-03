import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout title="New Reader Account">
            <div className="topbar">
                <h1>New Reader Account</h1>
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

                    <label htmlFor="password">Password</label>
                    <input
                        type="text" id="password" required
                        placeholder="Set a password to share with them"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <p style={{ fontSize: '.8rem', color: 'var(--color-muted)', margin: '-.5rem 0 1rem' }}>
                        Share this password with the person directly — there is no self-registration or password-reset email.
                    </p>

                    <button type="submit" className="btn" disabled={processing}>Create Account</button>
                </form>
            </div>
        </AdminLayout>
    );
}
