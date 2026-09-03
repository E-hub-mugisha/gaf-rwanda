import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';

const LANGUAGES = [
    ['en', 'English'],
    ['es', 'Spanish'],
    ['rw', 'Kinyarwanda'],
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        file_en: null,
        file_es: null,
        file_rw: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.documents.store'), { forceFormData: true });
    };

    return (
        <AdminLayout title="Upload Document">
            <div className="topbar">
                <h1>Upload Document</h1>
                <Link href={route('admin.documents.index')} className="btn btn-outline">Back</Link>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="errors">
                    <ul>{Object.values(errors).map((msg, i) => <li key={i}>{msg}</li>)}</ul>
                </div>
            )}

            <div className="card">
                <form onSubmit={submit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text" id="title" required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    <label htmlFor="description">Description (optional)</label>
                    <textarea
                        id="description" rows={3}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <p style={{ fontSize: '.85rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                        Upload the PDF for each language you have available now. You can add or replace a
                        language version later from the Edit screen — at least one is required.
                    </p>

                    {LANGUAGES.map(([code, label]) => (
                        <div className="file-row" key={code}>
                            <strong>{label}</strong>
                            <input
                                type="file" accept="application/pdf" style={{ marginTop: '.5rem' }}
                                onChange={(e) => setData(`file_${code}`, e.target.files[0] ?? null)}
                            />
                        </div>
                    ))}

                    <button type="submit" className="btn" disabled={processing}>Upload Document</button>
                </form>
            </div>
        </AdminLayout>
    );
}
