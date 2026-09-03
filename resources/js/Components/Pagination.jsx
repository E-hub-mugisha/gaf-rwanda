import { Link } from '@inertiajs/react';

// Expects Laravel's default paginator "links" array (from ->links() equivalent,
// i.e. $paginator->toArray()['links'] or a resource that includes it).
export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="pagination">
            {links.map((link, i) => (
                link.url ? (
                    <Link key={i} href={link.url} className={link.active ? 'active' : ''}
                        dangerouslySetInnerHTML={{ __html: link.label }} preserveScroll />
                ) : (
                    <span key={i} style={{ opacity: 0.4 }} dangerouslySetInnerHTML={{ __html: link.label }} />
                )
            ))}
        </div>
    );
}
