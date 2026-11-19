import{r as f,b as v,j as e,L as N}from"./app-BqJN-hOp.js";import{R as w}from"./RichTextEditor-DgVr7kfA.js";import{L as y}from"./LangTabs-Dxqbz3Zu.js";import"./adminI18n-C9DLtJ83.js";import"./Language-ChUCrwIh.js";const _=s=>{if(!s)return"";const l=new Date(s);return Number.isNaN(l.getTime())?"":new Date(l.getTime()-l.getTimezoneOffset()*6e4).toISOString().slice(0,16)},p=s=>s?s.startsWith("http")||s.startsWith("/")?s:`/uploads/${s}`:null;function A({article:s=null,categories:l=[],mode:m="create"}){const o=m==="edit",[n,g]=f.useState(p(s?.featured_image)),[i,x]=f.useState("en"),r=t=>i==="rw"?`${t}_rw`:t,a=v({news_category_id:s?.news_category_id||"",title:s?.title||"",slug:s?.slug||"",excerpt:s?.excerpt||"",content:s?.content||"",featured_image:null,status:s?.status||"draft",is_featured:!!s?.is_featured,published_at:_(s?.published_at),meta_title:s?.meta_title||"",meta_description:s?.meta_description||"",title_rw:s?.title_rw||"",excerpt_rw:s?.excerpt_rw||"",content_rw:s?.content_rw||"",meta_title_rw:s?.meta_title_rw||"",meta_description_rw:s?.meta_description_rw||""});f.useEffect(()=>{if(!a.data.featured_image)return;const t=URL.createObjectURL(a.data.featured_image);return g(t),()=>URL.revokeObjectURL(t)},[a.data.featured_image]);const h=t=>{a.setData(d=>({...d,title:t,slug:o?d.slug:t.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-")}))},u=t=>{t.preventDefault();const d={forceFormData:!0,preserveScroll:!0};o?(a.transform(c=>({...c,_method:"put"})),a.post(route("admin.news-articles.update",s.id),d)):(a.transform(c=>{const{_method:C,...j}=c;return j}),a.post(route("admin.news-articles.store"),d))},b=()=>{a.setData("featured_image",null),g(p(s?.featured_image))};return e.jsxs(e.Fragment,{children:[e.jsx("form",{onSubmit:u,className:"gaf-article-form",children:e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-xl-8",children:[e.jsxs("div",{className:"gaf-form-card",children:[e.jsxs("div",{className:"gaf-card-heading",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-card-title",children:[e.jsx("i",{className:"bi bi-pencil-square"}),"Article Content"]}),e.jsx("p",{children:"Add the main information and body of your publication."})]}),e.jsx("span",{className:"gaf-required-note",children:"* Required fields"})]}),e.jsxs("div",{className:"gaf-card-body",children:[e.jsx(y,{value:i,onChange:x,data:a.data,errors:a.errors,fields:["title","excerpt","content"]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"gaf-form-label",children:["Article Title (",i.toUpperCase(),")",i==="en"&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),e.jsx("input",{type:"text",className:`form-control gaf-title-input ${a.errors[r("title")]?"is-invalid":""}`,value:a.data[r("title")],onChange:t=>i==="en"?h(t.target.value):a.setData("title_rw",t.target.value),placeholder:i==="rw"?"Umutwe w’inkuru mu Kinyarwanda":"Enter a clear and engaging article title"}),a.errors[r("title")]&&e.jsx("div",{className:"invalid-feedback",children:a.errors[r("title")]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"URL Slug"}),e.jsxs("div",{className:"gaf-slug-field",children:[e.jsx("span",{children:e.jsx("i",{className:"bi bi-link-45deg"})}),e.jsx("input",{type:"text",className:`form-control ${a.errors.slug?"is-invalid":""}`,value:a.data.slug,onChange:t=>a.setData("slug",t.target.value),placeholder:"article-url-slug"})]}),a.errors.slug&&e.jsx("div",{className:"text-danger small mt-1",children:a.errors.slug}),e.jsx("div",{className:"gaf-field-help",children:"The URL-friendly address of your article. Automatically generated from the title when creating."})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[e.jsxs("label",{className:"gaf-form-label mb-0",children:["Article Excerpt (",i.toUpperCase(),")"]}),e.jsxs("span",{className:"gaf-character-count",children:[(a.data[r("excerpt")]||"").length,"/500"]})]}),e.jsx("textarea",{rows:"4",maxLength:"500",className:`form-control gaf-textarea ${a.errors[r("excerpt")]?"is-invalid":""}`,value:a.data[r("excerpt")],onChange:t=>a.setData(r("excerpt"),t.target.value),placeholder:"Write a concise introduction or summary of this article..."}),a.errors[r("excerpt")]&&e.jsx("div",{className:"invalid-feedback",children:a.errors[r("excerpt")]}),e.jsx("div",{className:"gaf-field-help",children:"A short introduction that helps readers understand what the article is about."})]}),e.jsxs("div",{className:"gaf-editor-content",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between mb-2",children:[e.jsxs("label",{className:"gaf-form-label mb-0",children:["Article Body (",i.toUpperCase(),")",i==="en"&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),e.jsxs("span",{className:"gaf-editor-indicator",children:[e.jsx("i",{className:"bi bi-text-paragraph me-1"}),"Rich text editor"]})]}),e.jsx(w,{value:a.data[r("content")],onChange:t=>a.setData(r("content"),t),error:a.errors[r("content")],placeholder:"Start writing your article..."},`content-${i}`),a.errors[r("content")]&&e.jsx("div",{className:"text-danger small mt-2",children:a.errors[r("content")]})]})]})]}),e.jsxs("div",{className:"gaf-form-card mt-4",children:[e.jsxs("div",{className:"gaf-card-heading",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-card-title",children:[e.jsx("i",{className:"bi bi-search"}),"Search Engine Optimization"]}),e.jsx("p",{children:"Improve how your article appears in search engine results."})]}),e.jsx("span",{className:"gaf-optional-badge",children:"Optional"})]}),e.jsxs("div",{className:"gaf-card-body",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"gaf-form-label",children:["Meta Title (",i.toUpperCase(),")"]}),e.jsx("input",{type:"text",maxLength:"255",className:`form-control ${a.errors[r("meta_title")]?"is-invalid":""}`,value:a.data[r("meta_title")],onChange:t=>a.setData(r("meta_title"),t.target.value),placeholder:"Enter SEO title"}),a.errors[r("meta_title")]&&e.jsx("div",{className:"invalid-feedback",children:a.errors[r("meta_title")]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[e.jsxs("label",{className:"gaf-form-label mb-0",children:["Meta Description (",i.toUpperCase(),")"]}),e.jsxs("span",{className:"gaf-character-count",children:[(a.data[r("meta_description")]||"").length,"/500"]})]}),e.jsx("textarea",{rows:"4",maxLength:"500",className:`form-control gaf-textarea ${a.errors[r("meta_description")]?"is-invalid":""}`,value:a.data[r("meta_description")],onChange:t=>a.setData(r("meta_description"),t.target.value),placeholder:"Describe this article for search engine results..."}),a.errors[r("meta_description")]&&e.jsx("div",{className:"invalid-feedback",children:a.errors[r("meta_description")]}),e.jsx("div",{className:"gaf-field-help",children:"Write a concise description that summarizes the article."})]})]})]})]}),e.jsxs("div",{className:"col-xl-4",children:[e.jsxs("div",{className:"gaf-form-card mb-4",children:[e.jsx("div",{className:"gaf-card-heading",children:e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-card-title",children:[e.jsx("i",{className:"bi bi-send"}),"Publishing"]}),e.jsx("p",{children:"Control the visibility of your article."})]})}),e.jsxs("div",{className:"gaf-card-body",children:[e.jsx("label",{className:"gaf-form-label",children:"Publication Status"}),e.jsxs("select",{className:`form-select ${a.errors.status?"is-invalid":""}`,value:a.data.status,onChange:t=>a.setData("status",t.target.value),children:[e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"}),e.jsx("option",{value:"archived",children:"Archived"})]}),a.errors.status&&e.jsx("div",{className:"invalid-feedback",children:a.errors.status}),e.jsxs("div",{className:"gaf-status-description",children:[a.data.status==="draft"&&"This article will remain unpublished until you publish it.",a.data.status==="published"&&"This article will be available to public visitors.",a.data.status==="archived"&&"This article will be marked as archived."]}),a.data.status==="published"&&e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Publication Date"}),e.jsx("input",{type:"datetime-local",className:`form-control ${a.errors.published_at?"is-invalid":""}`,value:a.data.published_at,onChange:t=>a.setData("published_at",t.target.value)}),a.errors.published_at&&e.jsx("div",{className:"invalid-feedback",children:a.errors.published_at}),e.jsx("div",{className:"gaf-field-help",children:"Leave empty to publish immediately, if supported by your backend."})]}),e.jsxs("div",{className:"gaf-featured-setting mt-4",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-featured-title",children:[e.jsx("i",{className:"bi bi-star me-2"}),"Featured Article"]}),e.jsx("div",{className:"gaf-field-help",children:"Highlight this article on the website."})]}),e.jsx("div",{className:"form-check form-switch mb-0",children:e.jsx("input",{type:"checkbox",className:"form-check-input",id:"isFeatured",checked:a.data.is_featured,onChange:t=>a.setData("is_featured",t.target.checked)})})]})]}),e.jsxs("div",{className:"gaf-publish-actions",children:[e.jsx("button",{type:"submit",className:"btn gaf-submit-button w-100",disabled:a.processing,children:a.processing?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Saving article..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check2-circle me-2"}),o?"Update Article":"Save Article"]})}),e.jsx(N,{href:route("admin.news-articles.index"),className:"btn gaf-cancel-button w-100 mt-2",children:"Cancel"})]})]}),e.jsxs("div",{className:"gaf-form-card mb-4",children:[e.jsx("div",{className:"gaf-card-heading",children:e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-card-title",children:[e.jsx("i",{className:"bi bi-folder2-open"}),"Article Category"]}),e.jsx("p",{children:"Organize your article by subject."})]})}),e.jsxs("div",{className:"gaf-card-body",children:[e.jsx("label",{className:"gaf-form-label",children:"Category"}),e.jsxs("select",{className:`form-select ${a.errors.news_category_id?"is-invalid":""}`,value:a.data.news_category_id,onChange:t=>a.setData("news_category_id",t.target.value),children:[e.jsx("option",{value:"",children:"Select a category"}),l.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),a.errors.news_category_id&&e.jsx("div",{className:"invalid-feedback",children:a.errors.news_category_id})]})]}),e.jsxs("div",{className:"gaf-form-card",children:[e.jsx("div",{className:"gaf-card-heading",children:e.jsxs("div",{children:[e.jsxs("div",{className:"gaf-card-title",children:[e.jsx("i",{className:"bi bi-image"}),"Featured Image"]}),e.jsx("p",{children:"Choose the main image for your article."})]})}),e.jsxs("div",{className:"gaf-card-body",children:[e.jsx("div",{className:"gaf-image-upload",children:n?e.jsxs("div",{className:"gaf-image-preview",children:[e.jsx("img",{src:n,alt:"Featured article preview"}),e.jsx("button",{type:"button",className:"gaf-remove-image",onClick:b,title:"Remove selected preview",children:e.jsx("i",{className:"bi bi-x-lg"})})]}):e.jsxs("div",{className:"gaf-image-placeholder",children:[e.jsx("div",{className:"gaf-upload-icon",children:e.jsx("i",{className:"bi bi-cloud-arrow-up"})}),e.jsx("div",{className:"fw-semibold",children:"No image selected"}),e.jsx("div",{className:"small text-muted",children:"Upload an image for your article"})]})}),e.jsxs("label",{htmlFor:"featuredImage",className:"btn gaf-upload-button w-100 mt-3",children:[e.jsx("i",{className:"bi bi-upload me-2"}),n?"Change Image":"Upload Image"]}),e.jsx("input",{id:"featuredImage",type:"file",accept:"image/jpeg,image/png,image/webp",className:"d-none",onChange:t=>a.setData("featured_image",t.target.files?.[0]||null)}),a.errors.featured_image&&e.jsx("div",{className:"text-danger small mt-2",children:a.errors.featured_image}),e.jsxs("div",{className:"gaf-field-help mt-3",children:["Recommended: landscape image. JPG, PNG or WEBP, maximum 5MB.",o&&" Leave unchanged to retain the existing image."]})]})]})]})]})}),e.jsx("style",{children:k})]})}const k=`
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
`;export{A as default};
