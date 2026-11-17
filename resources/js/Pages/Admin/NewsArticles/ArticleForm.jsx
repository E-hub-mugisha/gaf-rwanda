import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import RichTextEditor from "@/Components/RichTextEditor";
import LangTabs from "@/Components/Admin/LangTabs";

const toDateTimeLocal = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const local = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
    );

    return local.toISOString().slice(0, 16);
};

const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http") || image.startsWith("/")) {
        return image;
    }

    return `/uploads/${image}`;
};

export default function ArticleForm({
    article = null,
    categories = [],
    mode = "create",
}) {
    const isEdit = mode === "edit";

    const [imagePreview, setImagePreview] = useState(
        getImageUrl(article?.featured_image)
    );

    // English / Kinyarwanda editing for translatable fields.
    const [editLang, setEditLang] = useState("en");
    const field = (name) => (editLang === "rw" ? `${name}_rw` : name);

    const form = useForm({
        news_category_id: article?.news_category_id || "",
        title: article?.title || "",
        slug: article?.slug || "",
        excerpt: article?.excerpt || "",
        content: article?.content || "",
        featured_image: null,
        status: article?.status || "draft",
        is_featured: Boolean(article?.is_featured),
        published_at: toDateTimeLocal(article?.published_at),
        meta_title: article?.meta_title || "",
        meta_description: article?.meta_description || "",
        title_rw: article?.title_rw || "",
        excerpt_rw: article?.excerpt_rw || "",
        content_rw: article?.content_rw || "",
        meta_title_rw: article?.meta_title_rw || "",
        meta_description_rw: article?.meta_description_rw || "",
    });

    useEffect(() => {
        if (!form.data.featured_image) return;

        const url = URL.createObjectURL(form.data.featured_image);

        setImagePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [form.data.featured_image]);

    const updateTitle = (value) => {
        form.setData((data) => ({
            ...data,
            title: value,
            slug: isEdit
                ? data.slug
                : value
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-"),
        }));
    };

    const submit = (event) => {
        event.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true,
        };

        if (isEdit) {
            form.transform((data) => ({
                ...data,
                _method: "put",
            }));

            form.post(
                route("admin.news-articles.update", article.id),
                options
            );
        } else {
            form.transform((data) => {
                const { _method, ...payload } = data;
                return payload;
            });

            form.post(
                route("admin.news-articles.store"),
                options
            );
        }
    };

    const removeSelectedImage = () => {
        form.setData("featured_image", null);
        setImagePreview(getImageUrl(article?.featured_image));
    };

    return (
        <>
            <form onSubmit={submit} className="gaf-article-form">
                <div className="row g-4">
                    {/* Main writing workspace */}
                    <div className="col-xl-8">
                        <div className="gaf-form-card">
                            <div className="gaf-card-heading">
                                <div>
                                    <div className="gaf-card-title">
                                        <i className="bi bi-pencil-square" />
                                        Article Content
                                    </div>
                                    <p>
                                        Add the main information and body of
                                        your publication.
                                    </p>
                                </div>

                                <span className="gaf-required-note">
                                    * Required fields
                                </span>
                            </div>

                            <div className="gaf-card-body">
                                <LangTabs
                                    value={editLang}
                                    onChange={setEditLang}
                                    data={form.data}
                                    errors={form.errors}
                                    fields={["title", "excerpt", "content"]}
                                />

                                {/* Title */}
                                <div className="mb-4">
                                    <label className="gaf-form-label">
                                        Article Title ({editLang.toUpperCase()})
                                        {editLang === "en" && (
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control gaf-title-input ${
                                            form.errors[field("title")]
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={form.data[field("title")]}
                                        onChange={(e) =>
                                            editLang === "en"
                                                ? updateTitle(e.target.value)
                                                : form.setData("title_rw", e.target.value)
                                        }
                                        placeholder={editLang === "rw" ? "Umutwe w’inkuru mu Kinyarwanda" : "Enter a clear and engaging article title"}
                                    />

                                    {form.errors[field("title")] && (
                                        <div className="invalid-feedback">
                                            {form.errors[field("title")]}
                                        </div>
                                    )}
                                </div>

                                {/* Slug */}
                                <div className="mb-4">
                                    <label className="gaf-form-label">
                                        URL Slug
                                    </label>

                                    <div className="gaf-slug-field">
                                        <span>
                                            <i className="bi bi-link-45deg" />
                                        </span>

                                        <input
                                            type="text"
                                            className={`form-control ${
                                                form.errors.slug
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={form.data.slug}
                                            onChange={(e) =>
                                                form.setData(
                                                    "slug",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="article-url-slug"
                                        />
                                    </div>

                                    {form.errors.slug && (
                                        <div className="text-danger small mt-1">
                                            {form.errors.slug}
                                        </div>
                                    )}

                                    <div className="gaf-field-help">
                                        The URL-friendly address of your
                                        article. Automatically generated from
                                        the title when creating.
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="gaf-form-label mb-0">
                                            Article Excerpt ({editLang.toUpperCase()})
                                        </label>

                                        <span className="gaf-character-count">
                                            {(form.data[field("excerpt")] || "").length}/500
                                        </span>
                                    </div>

                                    <textarea
                                        rows="4"
                                        maxLength="500"
                                        className={`form-control gaf-textarea ${
                                            form.errors[field("excerpt")]
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={form.data[field("excerpt")]}
                                        onChange={(e) =>
                                            form.setData(
                                                field("excerpt"),
                                                e.target.value
                                            )
                                        }
                                        placeholder="Write a concise introduction or summary of this article..."
                                    />

                                    {form.errors[field("excerpt")] && (
                                        <div className="invalid-feedback">
                                            {form.errors[field("excerpt")]}
                                        </div>
                                    )}

                                    <div className="gaf-field-help">
                                        A short introduction that helps readers
                                        understand what the article is about.
                                    </div>
                                </div>

                                {/* Rich Text Editor */}
                                <div className="gaf-editor-content">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <label className="gaf-form-label mb-0">
                                            Article Body ({editLang.toUpperCase()})
                                            {editLang === "en" && (
                                                <span className="text-danger ms-1">
                                                    *
                                                </span>
                                            )}
                                        </label>

                                        <span className="gaf-editor-indicator">
                                            <i className="bi bi-text-paragraph me-1" />
                                            Rich text editor
                                        </span>
                                    </div>

                                    {/* Remount per language so the editor loads the right text. */}
                                    <RichTextEditor
                                        key={`content-${editLang}`}
                                        value={form.data[field("content")]}
                                        onChange={(value) =>
                                            form.setData(field("content"), value)
                                        }
                                        error={form.errors[field("content")]}
                                        placeholder="Start writing your article..."
                                    />

                                    {form.errors[field("content")] && (
                                        <div className="text-danger small mt-2">
                                            {form.errors[field("content")]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="gaf-form-card mt-4">
                            <div className="gaf-card-heading">
                                <div>
                                    <div className="gaf-card-title">
                                        <i className="bi bi-search" />
                                        Search Engine Optimization
                                    </div>
                                    <p>
                                        Improve how your article appears in
                                        search engine results.
                                    </p>
                                </div>

                                <span className="gaf-optional-badge">
                                    Optional
                                </span>
                            </div>

                            <div className="gaf-card-body">
                                <div className="mb-4">
                                    <label className="gaf-form-label">
                                        Meta Title ({editLang.toUpperCase()})
                                    </label>

                                    <input
                                        type="text"
                                        maxLength="255"
                                        className={`form-control ${
                                            form.errors[field("meta_title")]
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={form.data[field("meta_title")]}
                                        onChange={(e) =>
                                            form.setData(
                                                field("meta_title"),
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter SEO title"
                                    />

                                    {form.errors[field("meta_title")] && (
                                        <div className="invalid-feedback">
                                            {form.errors[field("meta_title")]}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="gaf-form-label mb-0">
                                            Meta Description ({editLang.toUpperCase()})
                                        </label>

                                        <span className="gaf-character-count">
                                            {
                                                (form.data[field("meta_description")] || "")
                                                    .length
                                            }
                                            /500
                                        </span>
                                    </div>

                                    <textarea
                                        rows="4"
                                        maxLength="500"
                                        className={`form-control gaf-textarea ${
                                            form.errors[field("meta_description")]
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={form.data[field("meta_description")]}
                                        onChange={(e) =>
                                            form.setData(
                                                field("meta_description"),
                                                e.target.value
                                            )
                                        }
                                        placeholder="Describe this article for search engine results..."
                                    />

                                    {form.errors[field("meta_description")] && (
                                        <div className="invalid-feedback">
                                            {form.errors[field("meta_description")]}
                                        </div>
                                    )}

                                    <div className="gaf-field-help">
                                        Write a concise description that
                                        summarizes the article.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Publishing sidebar */}
                    <div className="col-xl-4">
                        {/* Publish settings */}
                        <div className="gaf-form-card mb-4">
                            <div className="gaf-card-heading">
                                <div>
                                    <div className="gaf-card-title">
                                        <i className="bi bi-send" />
                                        Publishing
                                    </div>
                                    <p>
                                        Control the visibility of your article.
                                    </p>
                                </div>
                            </div>

                            <div className="gaf-card-body">
                                <label className="gaf-form-label">
                                    Publication Status
                                </label>

                                <select
                                    className={`form-select ${
                                        form.errors.status
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData("status", e.target.value)
                                    }
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">
                                        Published
                                    </option>
                                    <option value="archived">Archived</option>
                                </select>

                                {form.errors.status && (
                                    <div className="invalid-feedback">
                                        {form.errors.status}
                                    </div>
                                )}

                                <div className="gaf-status-description">
                                    {form.data.status === "draft" &&
                                        "This article will remain unpublished until you publish it."}

                                    {form.data.status === "published" &&
                                        "This article will be available to public visitors."}

                                    {form.data.status === "archived" &&
                                        "This article will be marked as archived."}
                                </div>

                                {form.data.status === "published" && (
                                    <div className="mt-4">
                                        <label className="gaf-form-label">
                                            Publication Date
                                        </label>

                                        <input
                                            type="datetime-local"
                                            className={`form-control ${
                                                form.errors.published_at
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            value={form.data.published_at}
                                            onChange={(e) =>
                                                form.setData(
                                                    "published_at",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {form.errors.published_at && (
                                            <div className="invalid-feedback">
                                                {form.errors.published_at}
                                            </div>
                                        )}

                                        <div className="gaf-field-help">
                                            Leave empty to publish immediately,
                                            if supported by your backend.
                                        </div>
                                    </div>
                                )}

                                <div className="gaf-featured-setting mt-4">
                                    <div>
                                        <div className="gaf-featured-title">
                                            <i className="bi bi-star me-2" />
                                            Featured Article
                                        </div>
                                        <div className="gaf-field-help">
                                            Highlight this article on the
                                            website.
                                        </div>
                                    </div>

                                    <div className="form-check form-switch mb-0">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isFeatured"
                                            checked={form.data.is_featured}
                                            onChange={(e) =>
                                                form.setData(
                                                    "is_featured",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="gaf-publish-actions">
                                <button
                                    type="submit"
                                    className="btn gaf-submit-button w-100"
                                    disabled={form.processing}
                                >
                                    {form.processing ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Saving article...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check2-circle me-2" />
                                            {isEdit
                                                ? "Update Article"
                                                : "Save Article"}
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={route(
                                        "admin.news-articles.index"
                                    )}
                                    className="btn gaf-cancel-button w-100 mt-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="gaf-form-card mb-4">
                            <div className="gaf-card-heading">
                                <div>
                                    <div className="gaf-card-title">
                                        <i className="bi bi-folder2-open" />
                                        Article Category
                                    </div>
                                    <p>
                                        Organize your article by subject.
                                    </p>
                                </div>
                            </div>

                            <div className="gaf-card-body">
                                <label className="gaf-form-label">
                                    Category
                                </label>

                                <select
                                    className={`form-select ${
                                        form.errors.news_category_id
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    value={form.data.news_category_id}
                                    onChange={(e) =>
                                        form.setData(
                                            "news_category_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select a category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {form.errors.news_category_id && (
                                    <div className="invalid-feedback">
                                        {form.errors.news_category_id}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured image */}
                        <div className="gaf-form-card">
                            <div className="gaf-card-heading">
                                <div>
                                    <div className="gaf-card-title">
                                        <i className="bi bi-image" />
                                        Featured Image
                                    </div>
                                    <p>
                                        Choose the main image for your article.
                                    </p>
                                </div>
                            </div>

                            <div className="gaf-card-body">
                                <div className="gaf-image-upload">
                                    {imagePreview ? (
                                        <div className="gaf-image-preview">
                                            <img
                                                src={imagePreview}
                                                alt="Featured article preview"
                                            />

                                            <button
                                                type="button"
                                                className="gaf-remove-image"
                                                onClick={removeSelectedImage}
                                                title="Remove selected preview"
                                            >
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="gaf-image-placeholder">
                                            <div className="gaf-upload-icon">
                                                <i className="bi bi-cloud-arrow-up" />
                                            </div>
                                            <div className="fw-semibold">
                                                No image selected
                                            </div>
                                            <div className="small text-muted">
                                                Upload an image for your article
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <label
                                    htmlFor="featuredImage"
                                    className="btn gaf-upload-button w-100 mt-3"
                                >
                                    <i className="bi bi-upload me-2" />
                                    {imagePreview
                                        ? "Change Image"
                                        : "Upload Image"}
                                </label>

                                <input
                                    id="featuredImage"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="d-none"
                                    onChange={(e) =>
                                        form.setData(
                                            "featured_image",
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />

                                {form.errors.featured_image && (
                                    <div className="text-danger small mt-2">
                                        {form.errors.featured_image}
                                    </div>
                                )}

                                <div className="gaf-field-help mt-3">
                                    Recommended: landscape image. JPG, PNG or
                                    WEBP, maximum 5MB.
                                    {isEdit &&
                                        " Leave unchanged to retain the existing image."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <style>{articleFormStyles}</style>
        </>
    );
}

const articleFormStyles = `
    .gaf-article-form {
        color: #172033;
    }

    .gaf-form-card {
        background: #fff;
        border: 1px solid #e8edf3;
        border-radius: 13px;
        overflow: hidden;
        box-shadow: 0 3px 14px rgba(23, 32, 51, 0.035);
    }

    .gaf-card-heading {
        padding: 20px 23px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-bottom: 1px solid #edf0f4;
    }

    .gaf-card-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        font-weight: 750;
        color: #172033;
    }

    .gaf-card-title > i {
        color: #20603d;
        font-size: 17px;
    }

    .gaf-card-heading p {
        margin: 5px 0 0;
        color: #8992a2;
        font-size: 12px;
    }

    .gaf-card-body {
        padding: 23px;
    }

    .gaf-required-note,
    .gaf-optional-badge {
        font-size: 11px;
        font-weight: 600;
        color: #8791a1;
        white-space: nowrap;
    }

    .gaf-optional-badge {
        padding: 5px 9px;
        border-radius: 20px;
        background: #f1f4f8;
    }

    .gaf-form-label {
        display: block;
        margin-bottom: 9px;
        color: #303c50;
        font-size: 12px;
        font-weight: 700;
    }

    .gaf-article-form .form-control,
    .gaf-article-form .form-select {
        border-color: #dfe5ed;
        border-radius: 8px;
        min-height: 43px;
        color: #263247;
        font-size: 13px;
        box-shadow: none;
    }

    .gaf-article-form .form-control:focus,
    .gaf-article-form .form-select:focus {
        border-color: #20603d;
        box-shadow: 0 0 0 3px rgba(32, 96, 61, 0.12);
    }

    .gaf-article-form .form-control::placeholder {
        color: #aab2bf;
    }

    .gaf-article-form .gaf-title-input {
        min-height: 53px;
        font-size: 17px;
        font-weight: 600;
    }

    .gaf-textarea {
        resize: vertical;
        line-height: 1.7;
        min-height: 100px !important;
    }

    .gaf-slug-field {
        display: flex;
        border: 1px solid #dfe5ed;
        border-radius: 8px;
        overflow: hidden;
    }

    .gaf-slug-field > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 43px;
        flex-shrink: 0;
        background: #f6f8fb;
        border-right: 1px solid #e5e9f0;
        color: #8793a5;
    }

    .gaf-slug-field .form-control {
        border: 0;
        border-radius: 0;
    }

    .gaf-slug-field:focus-within {
        border-color: #20603d;
        box-shadow: 0 0 0 3px rgba(32, 96, 61, 0.12);
    }

    .gaf-slug-field .form-control:focus {
        box-shadow: none;
    }

    .gaf-field-help {
        margin-top: 7px;
        color: #929baa;
        font-size: 11px;
        line-height: 1.6;
    }

    .gaf-character-count {
        font-size: 11px;
        color: #929baa;
    }

    .gaf-editor-indicator {
        font-size: 11px;
        color: #8b95a4;
    }

    .gaf-editor-content .invalid-feedback {
        display: block;
    }

    .gaf-status-description {
        margin-top: 9px;
        padding: 10px 11px;
        border-radius: 7px;
        background: #f5f7fa;
        color: #758093;
        font-size: 11px;
        line-height: 1.6;
    }

    .gaf-featured-setting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px;
        background: #f8f9fb;
        border: 1px solid #edf0f4;
        border-radius: 9px;
    }

    .gaf-featured-title {
        font-size: 12px;
        font-weight: 700;
        color: #354156;
    }

    .gaf-featured-title i {
        color: #d59b37;
    }

    .gaf-article-form .form-switch .form-check-input {
        width: 2.3em;
        height: 1.2em;
        cursor: pointer;
        box-shadow: none;
    }

    .gaf-article-form .form-switch .form-check-input:checked {
        background-color: #20603d;
        border-color: #20603d;
    }

    .gaf-publish-actions {
        padding: 17px 23px 21px;
        background: #fafbfd;
        border-top: 1px solid #edf0f4;
    }

    .gaf-submit-button {
        background: #20603d;
        border: 1px solid #20603d;
        border-radius: 8px;
        color: #fff;
        padding: 12px 15px;
        font-size: 13px;
        font-weight: 700;
    }

    .gaf-submit-button:hover {
        background: #20603d;
        border-color: #20603d;
        color: #fff;
    }

    .gaf-submit-button:disabled {
        opacity: 0.7;
    }

    .gaf-cancel-button {
        background: #fff;
        border: 1px solid #e1e6ed;
        border-radius: 8px;
        color: #647084;
        padding: 11px 15px;
        font-size: 13px;
        font-weight: 600;
    }

    .gaf-cancel-button:hover {
        background: #f4f6f9;
        color: #172033;
    }

    .gaf-image-upload {
        width: 100%;
    }

    .gaf-image-placeholder {
        min-height: 190px;
        border: 1px dashed #cfd8e5;
        border-radius: 10px;
        background: #f9fbfd;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 7px;
        color: #5b6678;
        font-size: 12px;
        text-align: center;
        padding: 20px;
    }

    .gaf-upload-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f8f4;
        color: #20603d;
        border-radius: 12px;
        font-size: 22px;
        margin-bottom: 5px;
    }

    .gaf-image-preview {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        background: #f3f5f8;
        border: 1px solid #e8edf3;
    }

    .gaf-image-preview img {
        display: block;
        width: 100%;
        max-height: 240px;
        aspect-ratio: 16 / 10;
        object-fit: cover;
    }

    .gaf-remove-image {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 31px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 7px;
        background: rgba(23, 32, 51, 0.8);
        color: #fff;
        font-size: 12px;
        cursor: pointer;
    }

    .gaf-remove-image:hover {
        background: #172033;
    }

    .gaf-upload-button {
        border: 1px solid #deede4;
        border-radius: 8px;
        background: #f8fafd;
        color: #20603d;
        padding: 10px;
        font-size: 12px;
        font-weight: 700;
    }

    .gaf-upload-button:hover {
        background: #f1f8f4;
        border-color: #cfe5d9;
        color: #174a2f;
    }

    @media(max-width: 1199px) {
        .gaf-card-body {
            padding: 19px;
        }

        .gaf-card-heading {
            padding: 18px 19px;
        }
    }

    @media(max-width: 575px) {
        .gaf-card-heading {
            align-items: flex-start;
        }

        .gaf-required-note {
            display: none;
        }

        .gaf-card-body {
            padding: 17px;
        }

        .gaf-publish-actions {
            padding: 15px 17px 18px;
        }

        .gaf-article-form .gaf-title-input {
            font-size: 15px;
        }
    }
`;