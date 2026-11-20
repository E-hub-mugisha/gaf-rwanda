import{j as e,H as l,L as s}from"./app-DgqhyOnw.js";import{A as f}from"./AdminLayout-CErUPkqY.js";import"./adminI18n-C7pkKo0P.js";import"./Language-ChUCrwIh.js";function b({article:a}){const r=a.featured_image?a.featured_image.startsWith("http")||a.featured_image.startsWith("/")?a.featured_image:`/uploads/${a.featured_image}`:null,o={draft:"gaf-status-draft",published:"gaf-status-published",archived:"gaf-status-archived"},i=(t,c=!1)=>{if(!t)return"Not available";const n=new Date(t);return Number.isNaN(n.getTime())?"Not available":n.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",...c&&{hour:"2-digit",minute:"2-digit"}})},d=()=>{const t=`${window.location.origin}/news/${a.slug}`;navigator.clipboard?.writeText&&navigator.clipboard.writeText(t)};return e.jsxs(f,{children:[e.jsx(l,{title:`Article: ${a.title}`}),e.jsxs("div",{className:"gaf-article-show-page",children:[e.jsxs("div",{className:"gaf-show-header",children:[e.jsxs("div",{children:[e.jsxs("nav",{className:"gaf-show-breadcrumb",children:[e.jsx(s,{href:route("admin.news-articles.index"),children:"News & Research"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{children:"Article Details"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3 mt-3",children:[e.jsx("div",{className:"gaf-show-heading-icon",children:e.jsx("i",{className:"bi bi-file-earmark-text"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"gaf-show-heading-title mb-1",children:"Article Details"}),e.jsx("p",{className:"gaf-show-heading-subtitle mb-0",children:"Review publication content, status and article information."})]})]})]}),e.jsxs("div",{className:"d-flex flex-wrap gap-2",children:[e.jsxs(s,{href:route("admin.news-articles.index"),className:"btn gaf-show-back-btn",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back"]}),e.jsxs(s,{href:route("admin.news-articles.edit",a.id),className:"btn gaf-show-edit-btn",children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),"Edit Article"]})]})]}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-xl-8",children:e.jsx("div",{className:"gaf-article-preview-card",children:e.jsxs("div",{className:"gaf-article-preview-body",children:[e.jsxs("div",{className:"d-flex flex-wrap align-items-center gap-2 mb-3",children:[e.jsxs("span",{className:`gaf-status-badge ${o[a.status]||"gaf-status-archived"}`,children:[e.jsx("span",{className:"gaf-status-dot"}),a.status]}),a.is_featured&&e.jsxs("span",{className:"gaf-featured-badge",children:[e.jsx("i",{className:"bi bi-star-fill me-1"}),"Featured"]}),a.category?.name&&e.jsx("span",{className:"gaf-category-badge",children:a.category.name})]}),e.jsx("h1",{className:"gaf-article-title",children:a.title}),e.jsxs("div",{className:"gaf-article-meta",children:[e.jsxs("div",{className:"gaf-meta-item",children:[e.jsx("div",{className:"gaf-meta-icon",children:e.jsx("i",{className:"bi bi-person"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Author"}),e.jsx("strong",{children:a.author?.name||"Unknown author"})]})]}),e.jsxs("div",{className:"gaf-meta-item",children:[e.jsx("div",{className:"gaf-meta-icon",children:e.jsx("i",{className:"bi bi-calendar3"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Published"}),e.jsx("strong",{children:i(a.published_at)})]})]}),e.jsxs("div",{className:"gaf-meta-item",children:[e.jsx("div",{className:"gaf-meta-icon",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Views"}),e.jsx("strong",{children:Number(a.views_count||0).toLocaleString()})]})]})]}),r&&e.jsx("div",{className:"gaf-article-cover",children:e.jsx("img",{src:r,alt:a.title})}),a.excerpt&&e.jsxs("div",{className:"gaf-article-excerpt",children:[e.jsx("div",{className:"gaf-excerpt-label",children:"ARTICLE SUMMARY"}),e.jsx("p",{children:a.excerpt})]}),e.jsx("div",{className:"gaf-article-content",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a.content||""}})}),e.jsxs("div",{className:"gaf-article-footer",children:[e.jsxs("div",{children:[e.jsx("span",{className:"gaf-footer-label",children:"Article reference"}),e.jsxs("strong",{children:["#",a.id]})]}),e.jsxs("button",{type:"button",className:"gaf-copy-button",onClick:d,children:[e.jsx("i",{className:"bi bi-link-45deg me-1"}),"Copy article URL"]})]})]})})}),e.jsxs("div",{className:"col-xl-4",children:[e.jsxs("div",{className:"gaf-info-card mb-4",children:[e.jsxs("div",{className:"gaf-info-card-header",children:[e.jsx("div",{className:"gaf-info-icon",children:e.jsx("i",{className:"bi bi-send"})}),e.jsxs("div",{children:[e.jsx("h6",{children:"Publishing Information"}),e.jsx("p",{children:"Publication and record details"})]})]}),e.jsxs("div",{className:"gaf-info-card-body",children:[e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Publication status"}),e.jsx("strong",{className:`gaf-status-badge ${o[a.status]||"gaf-status-archived"}`,children:a.status})]}),e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Publication date"}),e.jsx("strong",{children:i(a.published_at,!0)})]}),e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Created on"}),e.jsx("strong",{children:i(a.created_at,!0)})]}),e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Last updated"}),e.jsx("strong",{children:i(a.updated_at,!0)})]}),e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Featured article"}),e.jsx("strong",{children:a.is_featured?e.jsx("span",{className:"text-success",children:"Yes"}):e.jsx("span",{className:"text-muted",children:"No"})})]}),e.jsxs("div",{className:"gaf-info-row",children:[e.jsx("span",{children:"Views"}),e.jsx("strong",{children:Number(a.views_count||0).toLocaleString()})]})]})]}),e.jsxs("div",{className:"gaf-info-card mb-4",children:[e.jsxs("div",{className:"gaf-info-card-header",children:[e.jsx("div",{className:"gaf-info-icon",children:e.jsx("i",{className:"bi bi-folder2-open"})}),e.jsxs("div",{children:[e.jsx("h6",{children:"Category"}),e.jsx("p",{children:"Article classification"})]})]}),e.jsx("div",{className:"gaf-info-card-body",children:e.jsxs("div",{className:"gaf-category-detail",children:[e.jsx("div",{className:"gaf-category-detail-icon",children:e.jsx("i",{className:"bi bi-folder"})}),e.jsxs("div",{children:[e.jsx("strong",{children:a.category?.name||"Uncategorized"}),e.jsx("span",{children:"News article category"})]})]})})]}),e.jsxs("div",{className:"gaf-info-card mb-4",children:[e.jsxs("div",{className:"gaf-info-card-header",children:[e.jsx("div",{className:"gaf-info-icon",children:e.jsx("i",{className:"bi bi-search"})}),e.jsxs("div",{children:[e.jsx("h6",{children:"SEO Information"}),e.jsx("p",{children:"Search engine metadata"})]})]}),e.jsxs("div",{className:"gaf-info-card-body",children:[e.jsxs("div",{className:"gaf-seo-item",children:[e.jsx("span",{children:"Meta title"}),e.jsx("p",{children:a.meta_title||"No meta title provided."})]}),e.jsxs("div",{className:"gaf-seo-item",children:[e.jsx("span",{children:"Meta description"}),e.jsx("p",{children:a.meta_description||"No meta description provided."})]}),e.jsxs("div",{className:"gaf-seo-item",children:[e.jsx("span",{children:"URL slug"}),e.jsx("div",{className:"gaf-slug-display",children:a.slug||"Not available"})]})]})]}),e.jsxs("div",{className:"gaf-quick-action-card",children:[e.jsx("div",{className:"gaf-quick-action-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("h6",{children:"Need to make changes?"}),e.jsx("p",{children:"Update the article content, image or publishing settings."})]}),e.jsxs(s,{href:route("admin.news-articles.edit",a.id),className:"btn gaf-quick-action-button",children:["Edit this article",e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})]})]}),e.jsx("style",{children:g})]})}const g=`
    .gaf-article-show-page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 28px 30px 45px;
        color: #172033;
    }

    .gaf-show-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 28px;
    }

    .gaf-show-breadcrumb {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #8993a4;
        font-size: 13px;
    }

    .gaf-show-breadcrumb a {
        color: #20603d;
        text-decoration: none;
        font-weight: 600;
    }

    .gaf-show-breadcrumb a:hover {
        text-decoration: underline;
    }

    .gaf-show-breadcrumb i {
        font-size: 10px;
    }

    .gaf-show-heading-icon {
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

    .gaf-show-heading-title {
        font-size: 25px;
        font-weight: 750;
        letter-spacing: -0.7px;
        color: #172033;
    }

    .gaf-show-heading-subtitle {
        font-size: 13px;
        color: #7b8494;
    }

    .gaf-show-back-btn,
    .gaf-show-edit-btn {
        padding: 10px 15px;
        border-radius: 9px;
        font-size: 13px;
        font-weight: 650;
    }

    .gaf-show-back-btn {
        background: #fff;
        color: #596579;
        border: 1px solid #e5e9f0;
    }

    .gaf-show-back-btn:hover {
        background: #f7f9fc;
        color: #172033;
    }

    .gaf-show-edit-btn {
        background: #20603d;
        color: #fff;
        border: 1px solid #20603d;
    }

    .gaf-show-edit-btn:hover {
        background: #20603d;
        border-color: #20603d;
        color: #fff;
    }

    .gaf-article-preview-card,
    .gaf-info-card {
        background: #fff;
        border: 1px solid #e8edf3;
        border-radius: 13px;
        box-shadow: 0 3px 14px rgba(23, 32, 51, 0.035);
        overflow: hidden;
    }

    .gaf-article-preview-body {
        padding: 30px;
    }

    .gaf-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        width: fit-content;
        padding: 6px 10px;
        border-radius: 30px;
        font-size: 10px;
        font-weight: 750;
        text-transform: capitalize;
        white-space: nowrap;
    }

    .gaf-status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
    }

    .gaf-status-published {
        background: #eaf6ef;
        color: #27804b;
    }

    .gaf-status-draft {
        background: #fff5df;
        color: #a46b0b;
    }

    .gaf-status-archived {
        background: #eef0f3;
        color: #687385;
    }

    .gaf-featured-badge {
        padding: 6px 10px;
        border-radius: 30px;
        background: #fff5e6;
        color: #b47a19;
        font-size: 10px;
        font-weight: 700;
    }

    .gaf-category-badge {
        padding: 6px 10px;
        border-radius: 30px;
        background: #f1f8f4;
        color: #20603d;
        font-size: 10px;
        font-weight: 700;
    }

    .gaf-article-title {
        color: #172033;
        font-size: clamp(25px, 3vw, 35px);
        font-weight: 800;
        letter-spacing: -1px;
        line-height: 1.3;
        margin: 15px 0 22px;
        overflow-wrap: anywhere;
    }

    .gaf-article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding-bottom: 23px;
        margin-bottom: 25px;
        border-bottom: 1px solid #edf0f4;
    }

    .gaf-meta-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .gaf-meta-icon {
        width: 35px;
        height: 35px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f2f5fa;
        color: #20603d;
        font-size: 14px;
    }

    .gaf-meta-item span {
        display: block;
        margin-bottom: 2px;
        color: #929baa;
        font-size: 10px;
    }

    .gaf-meta-item strong {
        display: block;
        color: #384459;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-article-cover {
        margin-bottom: 28px;
        overflow: hidden;
        border-radius: 11px;
        background: #f3f5f8;
    }

    .gaf-article-cover img {
        display: block;
        width: 100%;
        max-height: 460px;
        object-fit: cover;
    }

    .gaf-article-excerpt {
        padding: 19px 22px;
        margin-bottom: 30px;
        border-left: 4px solid #20603d;
        border-radius: 0 9px 9px 0;
        background: #f5f8fc;
    }

    .gaf-excerpt-label {
        color: #20603d;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1px;
        margin-bottom: 8px;
    }

    .gaf-article-excerpt p {
        margin: 0;
        color: #536176;
        font-size: 15px;
        line-height: 1.8;
    }

    .gaf-article-content {
        color: #465267;
        font-size: 14px;
        line-height: 1.95;
        overflow-wrap: anywhere;
    }

    .gaf-article-content > div > *:first-child {
        margin-top: 0;
    }

    .gaf-article-content h1,
    .gaf-article-content h2,
    .gaf-article-content h3,
    .gaf-article-content h4 {
        color: #172033;
        font-weight: 750;
        line-height: 1.4;
        margin-top: 1.7em;
        margin-bottom: 0.7em;
    }

    .gaf-article-content h1 {
        font-size: 27px;
    }

    .gaf-article-content h2 {
        font-size: 23px;
    }

    .gaf-article-content h3 {
        font-size: 19px;
    }

    .gaf-article-content p {
        margin-bottom: 1.2em;
    }

    .gaf-article-content img {
        max-width: 100%;
        height: auto;
        border-radius: 9px;
        margin: 12px 0;
    }

    .gaf-article-content figure {
        max-width: 100%;
        margin: 20px 0;
    }

    .gaf-article-content figcaption {
        margin-top: 7px;
        color: #929baa;
        font-size: 12px;
        text-align: center;
    }

    .gaf-article-content blockquote {
        margin: 22px 0;
        padding: 15px 20px;
        border-left: 4px solid #20603d;
        background: #f5f8fc;
        color: #5c687b;
        border-radius: 0 8px 8px 0;
    }

    .gaf-article-content ul,
    .gaf-article-content ol {
        padding-left: 25px;
        margin-bottom: 20px;
    }

    .gaf-article-content li {
        margin-bottom: 7px;
    }

    .gaf-article-content a {
        color: #20603d;
        text-decoration: underline;
        overflow-wrap: anywhere;
    }

    .gaf-article-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 13px;
    }

    .gaf-article-content th,
    .gaf-article-content td {
        border: 1px solid #e3e8ef;
        padding: 11px 13px;
        text-align: left;
    }

    .gaf-article-content th {
        background: #f5f7fa;
        color: #27354a;
        font-weight: 700;
    }

    .gaf-article-content pre {
        max-width: 100%;
        overflow-x: auto;
        padding: 16px;
        background: #f5f7fa;
        border-radius: 9px;
    }

    .gaf-article-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        flex-wrap: wrap;
        margin-top: 35px;
        padding-top: 20px;
        border-top: 1px solid #edf0f4;
    }

    .gaf-footer-label {
        display: block;
        color: #929baa;
        font-size: 10px;
        margin-bottom: 4px;
    }

    .gaf-article-footer strong {
        color: #354156;
        font-size: 12px;
    }

    .gaf-copy-button {
        border: 1px solid #e0eee6;
        border-radius: 8px;
        background: #fff;
        color: #20603d;
        padding: 9px 12px;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-copy-button:hover {
        background: #f1f8f4;
    }

    .gaf-info-card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid #edf0f4;
    }

    .gaf-info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 37px;
        height: 37px;
        flex-shrink: 0;
        background: #f1f8f4;
        border-radius: 10px;
        color: #20603d;
        font-size: 16px;
    }

    .gaf-info-card-header h6 {
        margin: 0 0 3px;
        color: #263247;
        font-size: 13px;
        font-weight: 750;
    }

    .gaf-info-card-header p {
        margin: 0;
        color: #929baa;
        font-size: 10px;
    }

    .gaf-info-card-body {
        padding: 19px 20px;
    }

    .gaf-info-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        padding: 11px 0;
        border-bottom: 1px solid #f0f2f5;
    }

    .gaf-info-row:first-child {
        padding-top: 0;
    }

    .gaf-info-row:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }

    .gaf-info-row > span {
        color: #8993a3;
        font-size: 11px;
    }

    .gaf-info-row > strong {
        color: #344156;
        font-size: 11px;
        font-weight: 650;
        text-align: right;
        overflow-wrap: anywhere;
    }

    .gaf-info-row .gaf-status-badge {
        padding: 5px 8px;
        font-size: 9px;
    }

    .gaf-category-detail {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .gaf-category-detail-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;
        background: #f1f5fb;
        color: #20603d;
        font-size: 17px;
    }

    .gaf-category-detail strong {
        display: block;
        color: #344156;
        font-size: 12px;
    }

    .gaf-category-detail span {
        display: block;
        color: #929baa;
        font-size: 10px;
        margin-top: 4px;
    }

    .gaf-seo-item {
        margin-bottom: 18px;
    }

    .gaf-seo-item:last-child {
        margin-bottom: 0;
    }

    .gaf-seo-item > span {
        display: block;
        margin-bottom: 7px;
        color: #929baa;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .4px;
    }

    .gaf-seo-item p {
        margin: 0;
        color: #465267;
        font-size: 12px;
        line-height: 1.7;
        overflow-wrap: anywhere;
    }

    .gaf-slug-display {
        padding: 10px;
        border-radius: 7px;
        background: #f5f7fa;
        color: #596579;
        font-size: 11px;
        overflow-wrap: anywhere;
    }

    .gaf-quick-action-card {
        padding: 20px;
        border: 1px solid #e2efe8;
        border-radius: 12px;
        background: #f3f7fc;
    }

    .gaf-quick-action-icon {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 13px;
        background: #e9f3ed;
        color: #20603d;
        border-radius: 10px;
        font-size: 17px;
    }

    .gaf-quick-action-card h6 {
        margin-bottom: 6px;
        color: #263247;
        font-size: 13px;
        font-weight: 750;
    }

    .gaf-quick-action-card p {
        margin-bottom: 15px;
        color: #778397;
        font-size: 11px;
        line-height: 1.7;
    }

    .gaf-quick-action-button {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        background: #20603d;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
    }

    .gaf-quick-action-button:hover {
        background: #20603d;
        color: #fff;
    }

    @media(max-width: 1199px) {
        .gaf-article-show-page {
            padding: 22px 20px 35px;
        }
    }

    @media(max-width: 767px) {
        .gaf-article-show-page {
            padding: 20px 14px 30px;
        }

        .gaf-show-header {
            align-items: flex-start;
            flex-direction: column;
        }

        .gaf-show-heading-title {
            font-size: 22px;
        }

        .gaf-article-preview-body {
            padding: 20px 16px;
        }

        .gaf-article-meta {
            gap: 15px;
        }

        .gaf-article-title {
            font-size: 25px;
        }

        .gaf-article-footer {
            align-items: flex-start;
            flex-direction: column;
        }
    }
`;export{b as default};
