import{j as e,H as r,L as t}from"./app-DgqhyOnw.js";import{A as s}from"./AdminLayout-CErUPkqY.js";import d from"./ArticleForm-BVtq7x3j.js";import"./adminI18n-C7pkKo0P.js";import"./Language-ChUCrwIh.js";import"./RichTextEditor-C_or_3sF.js";import"./LangTabs-jLErzsUX.js";function m({article:i,categories:a=[]}){return e.jsxs(s,{children:[e.jsx(r,{title:`Edit ${i.title}`}),e.jsxs("div",{className:"gaf-article-editor-page",children:[e.jsxs("div",{className:"gaf-editor-heading",children:[e.jsxs("div",{children:[e.jsxs("nav",{className:"gaf-breadcrumb",children:[e.jsx(t,{href:route("admin.news-articles.index"),children:"News & Research"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{children:"Edit Article"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3 mt-3",children:[e.jsx("div",{className:"gaf-editor-heading-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"gaf-editor-title mb-1",children:"Edit Article"}),e.jsx("p",{className:"gaf-editor-subtitle mb-0",children:"Update your article content, publication settings and search appearance."})]})]})]}),e.jsxs(t,{href:route("admin.news-articles.index"),className:"btn gaf-back-button",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to articles"]})]}),e.jsx(d,{article:i,categories:a,mode:"edit"})]}),e.jsx("style",{children:o})]})}const o=`
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
`;export{m as default};
