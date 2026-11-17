import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ArticleForm from "./ArticleForm";

export default function Edit({ article, categories = [] }) {
    return (
        <AdminLayout>
            <Head title={`Edit ${article.title}`} />

            <div className="gaf-article-editor-page">
                <div className="gaf-editor-heading">
                    <div>
                        <nav className="gaf-breadcrumb">
                            <Link href={route("admin.news-articles.index")}>
                                News & Research
                            </Link>
                            <i className="bi bi-chevron-right" />
                            <span>Edit Article</span>
                        </nav>

                        <div className="d-flex align-items-center gap-3 mt-3">
                            <div className="gaf-editor-heading-icon">
                                <i className="bi bi-pencil-square" />
                            </div>

                            <div>
                                <h3 className="gaf-editor-title mb-1">
                                    Edit Article
                                </h3>
                                <p className="gaf-editor-subtitle mb-0">
                                    Update your article content, publication
                                    settings and search appearance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={route("admin.news-articles.index")}
                        className="btn gaf-back-button"
                    >
                        <i className="bi bi-arrow-left me-2" />
                        Back to articles
                    </Link>
                </div>

                <ArticleForm
                    article={article}
                    categories={categories}
                    mode="edit"
                />
            </div>

            <style>{editorStyles}</style>
        </AdminLayout>
    );
}

const editorStyles = `
    .gaf-article-editor-page {
        padding: 28px 30px 45px;
        max-width: 1600px;
        margin: 0 auto;
        color: #172033;
    }

    .gaf-editor-heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 28px;
    }

    .gaf-breadcrumb {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8993a4;
        font-size: 13px;
    }

    .gaf-breadcrumb a {
        color: #20603d;
        text-decoration: none;
        font-weight: 600;
    }

    .gaf-breadcrumb a:hover {
        text-decoration: underline;
    }

    .gaf-breadcrumb i {
        font-size: 10px;
    }

    .gaf-editor-heading-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        background: #f1f8f4;
        color: #20603d;
        font-size: 21px;
    }

    .gaf-editor-title {
        font-size: 25px;
        font-weight: 750;
        letter-spacing: -0.7px;
        color: #172033;
    }

    .gaf-editor-subtitle {
        color: #7b8494;
        font-size: 13px;
    }

    .gaf-back-button {
        border: 1px solid #e5e9f0;
        background: #fff;
        color: #596579;
        border-radius: 9px;
        padding: 10px 15px;
        font-size: 13px;
        font-weight: 600;
    }

    .gaf-back-button:hover {
        background: #f7f9fc;
        border-color: #d0e5d9;
        color: #172033;
    }

    @media(max-width: 767px) {
        .gaf-article-editor-page {
            padding: 20px 14px 35px;
        }

        .gaf-editor-heading {
            align-items: flex-start;
            flex-direction: column;
        }

        .gaf-editor-title {
            font-size: 22px;
        }
    }
`;