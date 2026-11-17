
import React, { useEffect, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import RichTextEditor from "@/Components/RichTextEditor";
import LangTabs from "@/Components/Admin/LangTabs";

const toDateTimeLocal = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return local.toISOString().slice(0, 16);
};

const makeSlug = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const SectionHeading = ({ number, title, description }) => (
    <div className="gaf-form-section-heading">
        <span className="gaf-form-section-number">{number}</span>
        <div>
            <h5>{title}</h5>
            {description && <p>{description}</p>}
        </div>
    </div>
);

const FieldError = ({ message }) =>
    message ? <div className="gaf-field-error">{message}</div> : null;

export default function EventForm({
    mode = "create",
    event = null,
    categories = [],
    programs = [],
    newsArticles = [],
}) {
    const isEdit = mode === "edit";

    // English / Kinyarwanda editing for translatable fields.
    const [editLang, setEditLang] = useState("en");
    const field = (name) => (editLang === "rw" ? `${name}_rw` : name);

    const [preview, setPreview] = useState(
        event?.cover_image ? `/uploads/${event.cover_image}` : null
    );

    const {
        data,
        setData,
        post,
        processing,
        errors,
        transform,
    } = useForm({
        event_category_id: event?.event_category_id || "",
        program_id: event?.program_id || "",
        title: event?.title || "",
        slug: event?.slug || "",
        excerpt: event?.excerpt || "",
        description: event?.description || "",
        title_rw: event?.title_rw || "",
        excerpt_rw: event?.excerpt_rw || "",
        description_rw: event?.description_rw || "",
        venue_rw: event?.venue_rw || "",
        address_rw: event?.address_rw || "",
        city_rw: event?.city_rw || "",
        cover_image: null,
        venue: event?.venue || "",
        address: event?.address || "",
        city: event?.city || "Kigali",
        country: event?.country || "Rwanda",
        starts_at: toDateTimeLocal(event?.starts_at),
        ends_at: toDateTimeLocal(event?.ends_at),
        timezone: event?.timezone || "Africa/Kigali",
        status: event?.status || "draft",
        is_featured: event?.is_featured ?? false,
        registration_url: event?.registration_url || "",
        agenda: Array.isArray(event?.agenda) ? event.agenda : [],
        news_article_ids:
            event?.news_articles?.map((article) => article.id) || [],
    });

    useEffect(() => {
        if (!isEdit) {
            setData("slug", makeSlug(data.title));
        }
    }, [data.title]);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleImage = (file) => {
        if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setData("cover_image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else if (!event?.cover_image) {
            setPreview(null);
        } else {
            setPreview(`/uploads/${event.cover_image}`);
        }
    };

    const updateAgenda = (index, field, value) => {
        const updated = [...data.agenda];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setData("agenda", updated);
    };

    const addAgendaItem = () => {
        setData("agenda", [
            ...data.agenda,
            { time: "", title: "", description: "" },
        ]);
    };

    const removeAgendaItem = (index) => {
        setData(
            "agenda",
            data.agenda.filter((_, itemIndex) => itemIndex !== index)
        );
    };

    const handleNewsArticlesChange = (e) => {
        const selectedIds = Array.from(
            e.target.selectedOptions,
            (option) => Number(option.value)
        );

        setData("news_article_ids", selectedIds);
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            transform((formData) => ({
                ...formData,
                _method: "put",
            }));

            post(route("admin.events.update", event.id), {
                forceFormData: true,
                preserveScroll: true,
            });
        } else {
            post(route("admin.events.store"), {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <form onSubmit={submit} className="gaf-event-form">
            <div className="gaf-event-form-layout">
                {/* Main form column */}
                <div className="gaf-event-form-main">

                    {/* Basic information */}
                    <section className="gaf-form-card">
                        <SectionHeading
                            number="01"
                            title="Event information"
                            description="Start with the essential details about your event."
                        />

                        <div className="gaf-form-card-body">
                            <LangTabs
                                value={editLang}
                                onChange={setEditLang}
                                data={data}
                                errors={errors}
                                fields={["title", "excerpt", "description"]}
                            />

                            <div className="mb-4">
                                <label className="gaf-form-label">
                                    Event title ({editLang.toUpperCase()}) {editLang === "en" && <span>*</span>}
                                </label>

                                <input
                                    type="text"
                                    className={`form-control gaf-form-control ${
                                        errors[field("title")] ? "is-invalid" : ""
                                    }`}
                                    value={data[field("title")]}
                                    onChange={(e) =>
                                        setData(field("title"), e.target.value)
                                    }
                                    placeholder={editLang === "rw" ? "Umutwe w’igikorwa mu Kinyarwanda" : "e.g. Annual Mental Health Research Conference"}
                                    required={editLang === "en"}
                                />

                                <FieldError message={errors[field("title")]} />
                            </div>

                            <div className="mb-4">
                                <label className="gaf-form-label">
                                    URL slug
                                </label>

                                <div className="gaf-slug-field">
                                    <span>gaf.rw/events/</span>
                                    <input
                                        type="text"
                                        className={`form-control gaf-form-control ${
                                            errors.slug ? "is-invalid" : ""
                                        }`}
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        placeholder="event-url"
                                    />
                                </div>

                                <FieldError message={errors.slug} />

                                {!isEdit && (
                                    <small className="gaf-form-hint">
                                        Generated automatically from the event
                                        title. You can edit it if needed.
                                    </small>
                                )}
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="gaf-form-label mb-0">
                                        Short summary ({editLang.toUpperCase()})
                                    </label>
                                    <span className="gaf-character-count">
                                        {(data[field("excerpt")] || "").length}/500
                                    </span>
                                </div>

                                <textarea
                                    rows="3"
                                    maxLength={500}
                                    className={`form-control gaf-form-control ${
                                        errors[field("excerpt")] ? "is-invalid" : ""
                                    }`}
                                    value={data[field("excerpt")]}
                                    onChange={(e) =>
                                        setData(field("excerpt"), e.target.value)
                                    }
                                    placeholder="Write a short introduction that will appear in event listings..."
                                />

                                <FieldError message={errors[field("excerpt")]} />
                                <small className="gaf-form-hint">
                                    A concise introduction to help visitors
                                    understand what the event is about.
                                </small>
                            </div>

                            <div>
                                <label className="gaf-form-label">
                                    Event description ({editLang.toUpperCase()})
                                </label>

                                <div className="gaf-rich-editor">
                                    {/* Remount per language so the editor loads the right text. */}
                                    <RichTextEditor
                                        key={`description-${editLang}`}
                                        value={data[field("description")]}
                                        onChange={(value) =>
                                            setData(field("description"), value)
                                        }
                                        placeholder="Write the full event description..."
                                    />
                                </div>

                                <FieldError message={errors[field("description")]} />
                                <small className="gaf-form-hint">
                                    Use headings, paragraphs, lists and links
                                    to structure your event information.
                                </small>
                            </div>
                        </div>
                    </section>

                    {/* Cover image */}
                    <section className="gaf-form-card">
                        <SectionHeading
                            number="02"
                            title="Event cover image"
                            description="Choose a strong visual to represent this event."
                        />

                        <div className="gaf-form-card-body">
                            <div className="gaf-event-image-upload">
                                {preview ? (
                                    <div className="gaf-event-image-preview">
                                        <img src={preview} alt="Event cover preview" />

                                        <button
                                            type="button"
                                            className="gaf-image-remove"
                                            onClick={() => handleImage(null)}
                                            title="Remove selected image"
                                        >
                                            <i className="bi bi-trash3" />
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="event-cover-image"
                                        className="gaf-event-image-placeholder"
                                    >
                                        <span className="gaf-upload-icon">
                                            <i className="bi bi-cloud-arrow-up" />
                                        </span>
                                        <strong>Upload event cover image</strong>
                                        <span>
                                            Browse your files or drag and drop
                                            an image here
                                        </span>
                                        <small>JPG, PNG or WEBP · Maximum 5 MB</small>
                                    </label>
                                )}

                                <input
                                    id="event-cover-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="form-control gaf-form-control mt-3"
                                    onChange={(e) =>
                                        handleImage(e.target.files[0] || null)
                                    }
                                />

                                <FieldError message={errors.cover_image} />

                                {preview && (
                                    <small className="gaf-form-hint">
                                        Select another file above to replace
                                        the current image.
                                    </small>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Location and schedule */}
                    <section className="gaf-form-card">
                        <SectionHeading
                            number="03"
                            title="Location and schedule"
                            description="Tell attendees where and when the event will take place."
                        />

                        <div className="gaf-form-card-body">
                            <LangTabs
                                value={editLang}
                                onChange={setEditLang}
                                data={data}
                                errors={errors}
                                fields={["venue", "city", "address"]}
                            />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        Venue ({editLang.toUpperCase()})
                                    </label>

                                    <input
                                        className={`form-control gaf-form-control ${
                                            errors[field("venue")] ? "is-invalid" : ""
                                        }`}
                                        value={data[field("venue")]}
                                        onChange={(e) =>
                                            setData(field("venue"), e.target.value)
                                        }
                                        placeholder="e.g. Kigali Convention Centre"
                                    />

                                    <FieldError message={errors[field("venue")]} />
                                </div>

                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        City ({editLang.toUpperCase()})
                                    </label>

                                    <input
                                        className={`form-control gaf-form-control ${
                                            errors[field("city")] ? "is-invalid" : ""
                                        }`}
                                        value={data[field("city")]}
                                        onChange={(e) =>
                                            setData(field("city"), e.target.value)
                                        }
                                        placeholder="Kigali"
                                    />

                                    <FieldError message={errors[field("city")]} />
                                </div>

                                <div className="col-12">
                                    <label className="gaf-form-label">
                                        Street address ({editLang.toUpperCase()})
                                    </label>

                                    <input
                                        className={`form-control gaf-form-control ${
                                            errors[field("address")] ? "is-invalid" : ""
                                        }`}
                                        value={data[field("address")]}
                                        onChange={(e) =>
                                            setData(field("address"), e.target.value)
                                        }
                                        placeholder="Enter the full venue address"
                                    />

                                    <FieldError message={errors[field("address")]} />
                                </div>

                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        Country <span>*</span>
                                    </label>

                                    <input
                                        className={`form-control gaf-form-control ${
                                            errors.country ? "is-invalid" : ""
                                        }`}
                                        value={data.country}
                                        onChange={(e) =>
                                            setData("country", e.target.value)
                                        }
                                        required
                                    />

                                    <FieldError message={errors.country} />
                                </div>

                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        Timezone <span>*</span>
                                    </label>

                                    <select
                                        className={`form-select gaf-form-control ${
                                            errors.timezone ? "is-invalid" : ""
                                        }`}
                                        value={data.timezone}
                                        onChange={(e) =>
                                            setData("timezone", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="Africa/Kigali">
                                            Africa/Kigali (CAT)
                                        </option>
                                        <option value="Africa/Nairobi">
                                            Africa/Nairobi (EAT)
                                        </option>
                                        <option value="UTC">UTC</option>
                                        <option value="Europe/London">
                                            Europe/London
                                        </option>
                                    </select>

                                    <FieldError message={errors.timezone} />
                                </div>

                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        <i className="bi bi-calendar-event me-1" />
                                        Start date and time <span>*</span>
                                    </label>

                                    <input
                                        type="datetime-local"
                                        className={`form-control gaf-form-control ${
                                            errors.starts_at ? "is-invalid" : ""
                                        }`}
                                        value={data.starts_at}
                                        onChange={(e) =>
                                            setData("starts_at", e.target.value)
                                        }
                                        required
                                    />

                                    <FieldError message={errors.starts_at} />
                                </div>

                                <div className="col-md-6">
                                    <label className="gaf-form-label">
                                        <i className="bi bi-calendar-check me-1" />
                                        End date and time
                                    </label>

                                    <input
                                        type="datetime-local"
                                        className={`form-control gaf-form-control ${
                                            errors.ends_at ? "is-invalid" : ""
                                        }`}
                                        value={data.ends_at}
                                        min={data.starts_at || undefined}
                                        onChange={(e) =>
                                            setData("ends_at", e.target.value)
                                        }
                                    />

                                    <FieldError message={errors.ends_at} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Agenda */}
                    <section className="gaf-form-card">
                        <div className="gaf-form-card-header">
                            <SectionHeading
                                number="04"
                                title="Event agenda"
                                description="Build a schedule for your attendees."
                            />

                            <button
                                type="button"
                                className="gaf-outline-btn"
                                onClick={addAgendaItem}
                            >
                                <i className="bi bi-plus-lg" />
                                Add session
                            </button>
                        </div>

                        <div className="gaf-form-card-body">
                            {data.agenda.length === 0 ? (
                                <div className="gaf-agenda-empty">
                                    <i className="bi bi-list-check" />
                                    <strong>No agenda items yet</strong>
                                    <span>
                                        Add sessions, activities or presentations
                                        to create an event schedule.
                                    </span>

                                    <button
                                        type="button"
                                        className="gaf-outline-btn mt-3"
                                        onClick={addAgendaItem}
                                    >
                                        <i className="bi bi-plus-lg" />
                                        Add first session
                                    </button>
                                </div>
                            ) : (
                                <div className="gaf-agenda-list">
                                    {data.agenda.map((item, index) => (
                                        <div
                                            className="gaf-agenda-item"
                                            key={index}
                                        >
                                            <div className="gaf-agenda-item-top">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="gaf-agenda-index">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <strong>Agenda session</strong>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="gaf-agenda-delete"
                                                    onClick={() =>
                                                        removeAgendaItem(index)
                                                    }
                                                    title="Remove session"
                                                >
                                                    <i className="bi bi-trash3" />
                                                </button>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <label className="gaf-form-label">
                                                        Time
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className={`form-control gaf-form-control ${
                                                            errors[`agenda.${index}.time`]
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={item.time || ""}
                                                        onChange={(e) =>
                                                            updateAgenda(
                                                                index,
                                                                "time",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="09:00 AM"
                                                    />

                                                    <FieldError
                                                        message={errors[`agenda.${index}.time`]}
                                                    />
                                                </div>

                                                <div className="col-md-8">
                                                    <label className="gaf-form-label">
                                                        Session title
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className={`form-control gaf-form-control ${
                                                            errors[`agenda.${index}.title`]
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={item.title || ""}
                                                        onChange={(e) =>
                                                            updateAgenda(
                                                                index,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g. Opening remarks"
                                                    />

                                                    <FieldError
                                                        message={errors[`agenda.${index}.title`]}
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label className="gaf-form-label">
                                                        Description
                                                    </label>

                                                    <textarea
                                                        rows="2"
                                                        className={`form-control gaf-form-control ${
                                                            errors[`agenda.${index}.description`]
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={item.description || ""}
                                                        onChange={(e) =>
                                                            updateAgenda(
                                                                index,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Describe this session..."
                                                    />

                                                    <FieldError
                                                        message={errors[`agenda.${index}.description`]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="gaf-event-form-sidebar">

                    {/* Organization */}
                    <section className="gaf-form-card">
                        <div className="gaf-form-sidebar-heading">
                            <i className="bi bi-diagram-3" />
                            <h5>Organization</h5>
                        </div>

                        <div className="gaf-form-card-body">
                            <div className="mb-4">
                                <label className="gaf-form-label">
                                    Event category
                                </label>

                                <select
                                    className={`form-select gaf-form-control ${
                                        errors.event_category_id ? "is-invalid" : ""
                                    }`}
                                    value={data.event_category_id}
                                    onChange={(e) =>
                                        setData("event_category_id", e.target.value)
                                    }
                                >
                                    <option value="">Select a category</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <FieldError message={errors.event_category_id} />
                            </div>

                            <div>
                                <label className="gaf-form-label">
                                    Related program
                                </label>

                                <select
                                    className={`form-select gaf-form-control ${
                                        errors.program_id ? "is-invalid" : ""
                                    }`}
                                    value={data.program_id}
                                    onChange={(e) =>
                                        setData("program_id", e.target.value)
                                    }
                                >
                                    <option value="">No linked program</option>

                                    {programs.map((program) => (
                                        <option
                                            key={program.id}
                                            value={program.id}
                                        >
                                            {program.title}
                                        </option>
                                    ))}
                                </select>

                                <FieldError message={errors.program_id} />
                            </div>
                        </div>
                    </section>

                    {/* Related news */}
                    <section className="gaf-form-card">
                        <div className="gaf-form-sidebar-heading">
                            <i className="bi bi-newspaper" />
                            <h5>Related news</h5>
                        </div>

                        <div className="gaf-form-card-body">
                            <p className="gaf-form-description">
                                Connect published news or articles that provide
                                additional information about this event.
                            </p>

                            {newsArticles.length > 0 ? (
                                <>
                                    <select
                                        multiple
                                        size={7}
                                        className={`form-select gaf-news-select ${
                                            errors.news_article_ids ? "is-invalid" : ""
                                        }`}
                                        value={data.news_article_ids.map(String)}
                                        onChange={handleNewsArticlesChange}
                                    >
                                        {newsArticles.map((article) => (
                                            <option
                                                key={article.id}
                                                value={article.id}
                                            >
                                                {article.title}
                                            </option>
                                        ))}
                                    </select>

                                    <FieldError message={errors.news_article_ids} />

                                    <small className="gaf-form-hint">
                                        Hold Ctrl (Windows) or Command (Mac) to
                                        select multiple articles.
                                    </small>

                                    {data.news_article_ids.length > 0 && (
                                        <div className="gaf-selected-count">
                                            <i className="bi bi-check-circle-fill" />
                                            {data.news_article_ids.length} article(s) selected
                                        </div>
                                    )}

                                    {data.news_article_ids.length > 0 && (
                                        <button
                                            type="button"
                                            className="gaf-clear-selection"
                                            onClick={() =>
                                                setData("news_article_ids", [])
                                            }
                                        >
                                            Clear selection
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="gaf-no-related-content">
                                    <i className="bi bi-info-circle" />
                                    No news articles available.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Publishing */}
                    <section className="gaf-form-card">
                        <div className="gaf-form-sidebar-heading">
                            <i className="bi bi-send" />
                            <h5>Publishing</h5>
                        </div>

                        <div className="gaf-form-card-body">
                            <label className="gaf-form-label">
                                Publication status
                            </label>

                            <select
                                className={`form-select gaf-form-control mb-3 ${
                                    errors.status ? "is-invalid" : ""
                                }`}
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <FieldError message={errors.status} />

                            <div className="gaf-featured-toggle">
                                <div>
                                    <strong>Featured event</strong>
                                    <span>Highlight this event on the website.</span>
                                </div>

                                <div className="form-check form-switch mb-0">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="event-featured"
                                        checked={Boolean(data.is_featured)}
                                        onChange={(e) =>
                                            setData("is_featured", e.target.checked)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="gaf-form-label">
                                    Registration URL
                                </label>

                                <input
                                    type="url"
                                    className={`form-control gaf-form-control ${
                                        errors.registration_url ? "is-invalid" : ""
                                    }`}
                                    value={data.registration_url}
                                    onChange={(e) =>
                                        setData("registration_url", e.target.value)
                                    }
                                    placeholder="https://..."
                                />

                                <FieldError message={errors.registration_url} />
                                <small className="gaf-form-hint">
                                    Optional link where visitors can register.
                                </small>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <section className="gaf-form-actions-card">
                        <div className="gaf-form-actions-intro">
                            <i className="bi bi-check2-square" />
                            <div>
                                <strong>Ready to save?</strong>
                                <span>
                                    Review your event details before submitting.
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="gaf-form-submit"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" />
                                    Saving event...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg" />
                                    {isEdit ? "Save changes" : "Create event"}
                                </>
                            )}
                        </button>

                        <Link
                            href={route("admin.events.index")}
                            className="gaf-form-cancel"
                        >
                            Cancel
                        </Link>
                    </section>
                </aside>
            </div>

            <style>{`
                .gaf-event-form {
                    width: 100%;
                    color: #172033;
                }

                .gaf-event-form-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 330px;
                    align-items: start;
                    gap: 22px;
                }

                .gaf-event-form-main,
                .gaf-event-form-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .gaf-form-card {
                    min-width: 0;
                    overflow: hidden;
                    border: 1px solid #e8edf3;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-form-card-body {
                    padding: 22px;
                }

                .gaf-form-section-heading {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    padding: 19px 22px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-section-number {
                    display: flex;
                    flex: 0 0 31px;
                    width: 31px;
                    height: 31px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                }

                .gaf-form-section-heading h5 {
                    margin: 1px 0 5px;
                    color: #26344a;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-form-section-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .gaf-form-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-card-header .gaf-form-section-heading {
                    flex: 1;
                    border-bottom: 0;
                }

                .gaf-form-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #46536a;
                    font-size: 11px;
                    font-weight: 750;
                }

                .gaf-form-label span {
                    color: #d45c5c;
                }

                .gaf-form-control {
                    min-height: 42px;
                    border-color: #e2e7ee;
                    border-radius: 6px;
                    color: #344054;
                    font-size: 12px;
                    box-shadow: none;
                }

                textarea.gaf-form-control {
                    min-height: auto;
                    resize: vertical;
                }

                .gaf-form-control:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-form-control::placeholder {
                    color: #a8b0bd;
                }

                .gaf-form-hint {
                    display: block;
                    margin-top: 7px;
                    color: #98a1af;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-field-error {
                    margin-top: 6px;
                    color: #c74747;
                    font-size: 10px;
                }

                .gaf-character-count {
                    color: #9aa3b1;
                    font-size: 10px;
                }

                .gaf-slug-field {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    overflow: hidden;
                    border: 1px solid #e2e7ee;
                    border-radius: 6px;
                }

                .gaf-slug-field > span {
                    display: flex;
                    align-items: center;
                    align-self: stretch;
                    padding: 0 11px;
                    border-right: 1px solid #e2e7ee;
                    background: #f8fafc;
                    color: #8994a5;
                    font-size: 10px;
                    white-space: nowrap;
                }

                .gaf-slug-field .gaf-form-control {
                    border: 0;
                    border-radius: 0;
                }

                .gaf-slug-field:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-slug-field .gaf-form-control:focus {
                    box-shadow: none;
                }

                .gaf-rich-editor {
                    overflow: hidden;
                    border: 1px solid #e2e7ee;
                    border-radius: 7px;
                }

                .gaf-rich-editor:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-event-image-placeholder {
                    display: flex;
                    min-height: 215px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 25px;
                    border: 1px dashed #cbe4d6;
                    border-radius: 8px;
                    background: #fafbfd;
                    text-align: center;
                    cursor: pointer;
                    transition: background .2s ease, border-color .2s ease;
                }

                .gaf-event-image-placeholder:hover {
                    border-color: #20603d;
                    background: #f5f8fc;
                }

                .gaf-upload-icon {
                    display: flex;
                    width: 45px;
                    height: 45px;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 4px;
                    border-radius: 50%;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-image-placeholder strong {
                    color: #39475d;
                    font-size: 12px;
                }

                .gaf-event-image-placeholder span:not(.gaf-upload-icon) {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-image-placeholder small {
                    color: #a0a8b4;
                    font-size: 10px;
                }

                .gaf-event-image-preview {
                    position: relative;
                    overflow: hidden;
                    border-radius: 8px;
                    background: #f1f3f6;
                }

                .gaf-event-image-preview img {
                    display: block;
                    width: 100%;
                    max-height: 340px;
                    object-fit: cover;
                }

                .gaf-image-remove {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    display: flex;
                    width: 34px;
                    height: 34px;
                    align-items: center;
                    justify-content: center;
                    border: 0;
                    border-radius: 6px;
                    background: rgba(30, 40, 55, .8);
                    color: #fff;
                    cursor: pointer;
                }

                .gaf-image-remove:hover {
                    background: #c74747;
                }

                .gaf-outline-btn {
                    display: inline-flex;
                    min-height: 34px;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    margin-right: 20px;
                    padding: 0 11px;
                    border: 1px solid #deeee5;
                    border-radius: 6px;
                    background: #fff;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-outline-btn:hover {
                    border-color: #aed6bf;
                    background: #f5f8fc;
                }

                .gaf-agenda-empty {
                    display: flex;
                    min-height: 190px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .gaf-agenda-empty > i {
                    margin-bottom: 12px;
                    color: #8dc5a5;
                    font-size: 28px;
                }

                .gaf-agenda-empty strong {
                    color: #46536a;
                    font-size: 12px;
                }

                .gaf-agenda-empty span {
                    max-width: 310px;
                    margin-top: 6px;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-agenda-empty .gaf-outline-btn {
                    margin-right: 0;
                }

                .gaf-agenda-item {
                    margin-bottom: 13px;
                    padding: 16px;
                    border: 1px solid #e9edf3;
                    border-radius: 7px;
                    background: #fcfdff;
                }

                .gaf-agenda-item:last-child {
                    margin-bottom: 0;
                }

                .gaf-agenda-item-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 15px;
                }

                .gaf-agenda-item-top strong {
                    color: #47546a;
                    font-size: 11px;
                }

                .gaf-agenda-index {
                    display: flex;
                    width: 25px;
                    height: 25px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 9px;
                    font-weight: 800;
                }

                .gaf-agenda-delete {
                    display: flex;
                    width: 29px;
                    height: 29px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #f0dddd;
                    border-radius: 5px;
                    background: #fff;
                    color: #c65c5c;
                    font-size: 11px;
                }

                .gaf-agenda-delete:hover {
                    background: #fff1f1;
                }

                .gaf-form-sidebar-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 17px 19px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-sidebar-heading > i {
                    color: #20603d;
                    font-size: 15px;
                }

                .gaf-form-sidebar-heading h5 {
                    margin: 0;
                    color: #26344a;
                    font-size: 12px;
                    font-weight: 750;
                }

                .gaf-form-sidebar .gaf-form-card-body {
                    padding: 19px;
                }

                .gaf-form-description {
                    margin: 0 0 13px;
                    color: #8d97a6;
                    font-size: 10px;
                    line-height: 1.65;
                }

                .gaf-news-select {
                    min-height: 150px;
                    border-color: #e2e7ee;
                    border-radius: 6px;
                    color: #596579;
                    font-size: 10px;
                }

                .gaf-news-select option {
                    padding: 7px;
                }

                .gaf-selected-count {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 12px;
                    color: #25845f;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-clear-selection {
                    margin-top: 9px;
                    padding: 0;
                    border: 0;
                    background: transparent;
                    color: #bf5555;
                    font-size: 10px;
                    font-weight: 650;
                }

                .gaf-no-related-content {
                    padding: 13px;
                    border: 1px solid #edf0f4;
                    border-radius: 6px;
                    background: #fafbfd;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-featured-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 13px;
                    border: 1px solid #e9edf3;
                    border-radius: 7px;
                    background: #fafbfd;
                }

                .gaf-featured-toggle > div:first-child {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-featured-toggle strong {
                    color: #47546a;
                    font-size: 11px;
                }

                .gaf-featured-toggle span {
                    color: #929baa;
                    font-size: 9px;
                }

                .gaf-featured-toggle .form-check-input {
                    width: 34px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                }

                .gaf-featured-toggle .form-check-input:checked {
                    border-color: #20603d;
                    background-color: #20603d;
                }

                .gaf-form-actions-card {
                    padding: 19px;
                    border: 1px solid #e5f1ea;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-form-actions-intro {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    margin-bottom: 17px;
                }

                .gaf-form-actions-intro > i {
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-form-actions-intro div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-form-actions-intro strong {
                    color: #39475d;
                    font-size: 11px;
                }

                .gaf-form-actions-intro span {
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .gaf-form-submit {
                    display: flex;
                    width: 100%;
                    min-height: 42px;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: 1px solid #20603d;
                    border-radius: 6px;
                    background: #20603d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 750;
                    transition: background .2s ease;
                }

                .gaf-form-submit:hover:not(:disabled) {
                    background: #174a2f;
                }

                .gaf-form-submit:disabled {
                    cursor: not-allowed;
                    opacity: .7;
                }

                .gaf-form-cancel {
                    display: flex;
                    min-height: 39px;
                    align-items: center;
                    justify-content: center;
                    margin-top: 8px;
                    border: 1px solid #e5e9ef;
                    border-radius: 6px;
                    background: #fff;
                    color: #687589;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .gaf-form-cancel:hover {
                    background: #f7f8fa;
                    color: #344054;
                }

                @media (max-width: 1050px) {
                    .gaf-event-form-layout {
                        grid-template-columns: minmax(0, 1fr) 290px;
                        gap: 16px;
                    }
                }

                @media (max-width: 850px) {
                    .gaf-event-form-layout {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-event-form-sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        align-items: start;
                    }

                    .gaf-form-actions-card {
                        align-self: start;
                    }
                }

                @media (max-width: 600px) {
                    .gaf-event-form-sidebar {
                        display: flex;
                    }

                    .gaf-form-card-body {
                        padding: 17px;
                    }

                    .gaf-form-section-heading {
                        padding: 16px 17px;
                    }

                    .gaf-form-card-header {
                        align-items: flex-start;
                    }

                    .gaf-form-card-header .gaf-outline-btn {
                        margin-top: 15px;
                        margin-right: 12px;
                    }

                    .gaf-slug-field > span {
                        padding: 0 7px;
                        font-size: 9px;
                    }
                }
            `}</style>
        </form>
    );
}
