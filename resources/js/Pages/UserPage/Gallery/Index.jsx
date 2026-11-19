import React from "react";
import { Head, Link } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { AlbumCard as Album, EmptyState, PageHero, Pagination, SectionTitle } from "@/Components/Gaf/Page";
import { formatDate, localized, pick } from "@/lib/gafLocale";

function AlbumCard({ gallery, lang, t, large = false }) {
    const title = localized(gallery, "title", lang);
    const description = localized(gallery, "description", lang);
    const eventTitle = localized(gallery.event, "title", lang);

    const date = gallery.event?.starts_at ? formatDate(gallery.event.starts_at, lang, { month: "short" }) : "";

    return (
        <Album
            href={route("gallery.show", { slug: gallery.slug })}
            image={gallery.cover_image_url}
            title={title}
            meta={[eventTitle, date].filter(Boolean).join(" · ")}
            count={gallery.media_count || 0}
            description={large ? description : ""}
            cta={t.viewGallery}
            large={large}
        />
    );
}

export default function Index({ galleries, mediaTotal = 0 }) {
    const { lang, t: content } = useGaf();
    const t = content.galleryPage;

    const items = galleries?.data || [];
    const firstPage = (galleries?.current_page || 1) === 1;

    return (
        <>
            <Head title={t.pageTitle}>
                <meta head-key="description" name="description" content={t.intro} />
            </Head>

            <main className="gp-page">
                <PageHero
                    icon="bi-images"
                    crumbs={[
                        { label: pick(lang, { en: "Home", rw: "Ahabanza" }), href: "/" },
                        { label: t.title },
                    ]}
                    eyebrow={t.eyebrow}
                    title={t.title}
                    intro={t.intro}
                    topics={t.topics || []}
                    stats={[
                        { label: t.albums, value: galleries?.total || 0 },
                        { label: pick(lang, { en: "Photos & videos", rw: "Amafoto n’amashusho" }), value: mediaTotal },
                    ]}
                />

                <div className="gaf-container gp-content">
                    <section className="gp-section">
                        <SectionTitle
                            eyebrow={t.collections}
                            title={t.albums}
                            aside={
                                <span className="gp-count">
                                    {galleries?.total || 0} {t.galleries}
                                </span>
                            }
                        />

                        {items.length ? (
                            <>
                                <div className="gp-album-grid">
                                    {items.map((gallery, index) => (
                                        <AlbumCard
                                            key={gallery.id}
                                            gallery={gallery}
                                            lang={lang}
                                            t={t}
                                            // The newest album gets a large tile on the first page.
                                            large={firstPage && index === 0 && items.length > 2}
                                        />
                                    ))}
                                </div>
                                <Pagination links={galleries.links} label={t.albums} />
                            </>
                        ) : (
                            <EmptyState icon="bi-images" title={t.noGalleries} text={t.noGalleriesIntro} />
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
