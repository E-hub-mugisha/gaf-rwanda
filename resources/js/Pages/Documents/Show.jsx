import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Show({ document, language, availableLanguages }) {
    return (
        <AppLayout title={document.title}>
            <Link href={route('documents.index')} style={{ fontSize: '.85rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
                ← All documents
            </Link>

            <div className="card" style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: '0 0 .3rem' }}>{document.title}</h1>
                        {document.description && (
                            <p className="doc-desc" style={{ margin: 0 }}>{document.description}</p>
                        )}
                    </div>
                    <div>
                        {availableLanguages.map(({ code, label }) => (
                            <Link
                                key={code}
                                href={`${route('documents.show', document.id)}?lang=${code}`}
                                style={{
                                    display: 'inline-block', padding: '.45rem .9rem', marginLeft: '.35rem',
                                    borderRadius: 8, textDecoration: 'none', fontSize: '.85rem', fontWeight: 600,
                                    background: language === code ? 'var(--color-primary)' : '#eef2f3',
                                    color: language === code ? '#fff' : 'var(--color-text)',
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <iframe
                    src={route('documents.stream', [document.id, language])}
                    style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }}
                    title={document.title}
                />
            </div>
        </AppLayout>
    );
}
