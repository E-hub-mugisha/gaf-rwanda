import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm, router } from '@inertiajs/react';

const LANGUAGES = [
    ['en', 'English'],
    ['es', 'Spanish'],
    ['rw', 'Kinyarwanda'],
];

export default function Edit({ document }) {
    const { data, setData, post, processing, errors } = useForm({
        title: document.title,
        description: document.description ?? '',
        file_en: null,
        file_es: null,
        file_rw: null,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.documents.update', document.id), { forceFormData: true });
    };

    const removeVersion = (version, label) => {
        if (confirm(`Remove the ${label} version?`)) {
            router.delete(route('admin.documents.versions.destroy', [document.id, version.id]));
        }
    };

    const versionFor = (code) => document.versions.find((v) => v.language === code);

    return (
        <AdminLayout title="Edit Document">
            <div className="topbar">
                <h1>Edit Document</h1>
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

                    {LANGUAGES.map(([code, label]) => {
                        const existing = versionFor(code);
                        return (
                            <div className="file-row" key={code}>
                                <strong>{label}</strong>
                                {existing ? (
                                    <>
                                        <div style={{ fontSize: '.82rem', color: 'var(--color-muted)', margin: '.3rem 0' }}>
                                            Current file: {existing.original_filename}
                                            {' · '}
                                            <a href={route('documents.stream', [document.id, code])} target="_blank" rel="noreferrer">preview</a>
                                            {' · '}
                                            <button
                                                type="button"
                                                onClick={() => removeVersion(existing, label)}
                                                style={{ border: 'none', background: 'none', color: '#b3261e', cursor: 'pointer', padding: 0, fontSize: '.82rem' }}
                                            >
                                                remove
                                            </button>
                                        </div>
                                        <input
                                            type="file" accept="application/pdf"
                                            onChange={(e) => setData(`file_${code}`, e.target.files[0] ?? null)}
                                        />
                                        <div style={{ fontSize: '.78rem', color: 'var(--color-muted)', marginTop: '.25rem' }}>
                                            Choose a file only to replace the current one.
                                        </div>
                                    </>
                                ) : (
                                    <input
                                        type="file" accept="application/pdf" style={{ marginTop: '.5rem' }}
                                        onChange={(e) => setData(`file_${code}`, e.target.files[0] ?? null)}
                                    />
                                )}
                            </div>
                        );
                    })}

                    <button type="submit" className="btn" disabled={processing}>Save Changes</button>
                </form>
            </div>
        </AdminLayout>
    );
}
