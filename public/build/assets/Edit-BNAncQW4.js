import{j as e,L as a}from"./app-CnQ2naJx.js";import{A as d}from"./AdminLayout-BVsaJnXH.js";import r from"./EventForm-CA3x2kS4.js";import"./adminI18n-FDcM2fzV.js";import"./Language-ChUCrwIh.js";import"./RichTextEditor-DR4NHoD6.js";import"./LangTabs-CxZkzvKL.js";function m({event:t,categories:i=[],programs:n=[],newsArticles:s=[]}){return e.jsxs(d,{title:`Edit ${t.title}`,children:[e.jsxs("div",{className:"gaf-event-edit-page",children:[e.jsxs("div",{className:"gaf-event-edit-header",children:[e.jsxs("div",{className:"gaf-event-edit-heading",children:[e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb gaf-event-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(a,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(a,{href:route("admin.events.index"),children:"Events"})}),e.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Edit Event"})]})}),e.jsxs("div",{className:"d-flex align-items-start gap-3",children:[e.jsx("div",{className:"gaf-event-edit-icon",children:e.jsx("i",{className:"bi bi-calendar2-event"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center flex-wrap gap-2 mb-1",children:[e.jsx("h3",{className:"gaf-event-edit-title mb-0",children:"Edit Event"}),e.jsxs("span",{className:`gaf-event-status gaf-event-status-${t.status||"draft"}`,children:[e.jsx("span",{className:"gaf-event-status-dot"}),t.status?t.status.replace("_"," "):"Draft"]})]}),e.jsx("p",{className:"gaf-event-edit-subtitle mb-0",children:"Update event details, schedule, location, registration information and related content."})]})]})]}),e.jsx("div",{className:"gaf-event-edit-actions",children:e.jsxs(a,{href:route("admin.events.index"),className:"btn gaf-event-back-btn",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to Events"]})})]}),e.jsxs("div",{className:"gaf-event-edit-context",children:[e.jsxs("div",{className:"gaf-event-context-item",children:[e.jsx("span",{className:"gaf-event-context-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("span",{className:"gaf-event-context-label",children:"Currently editing"}),e.jsx("strong",{children:t.title})]})]}),e.jsx("div",{className:"gaf-event-context-divider"}),e.jsxs("div",{className:"gaf-event-context-item",children:[e.jsx("span",{className:"gaf-event-context-icon",children:e.jsx("i",{className:"bi bi-hash"})}),e.jsxs("div",{children:[e.jsx("span",{className:"gaf-event-context-label",children:"Event ID"}),e.jsxs("strong",{children:["#",t.id]})]})]}),e.jsx("div",{className:"gaf-event-context-divider"}),e.jsxs("div",{className:"gaf-event-context-item",children:[e.jsx("span",{className:"gaf-event-context-icon",children:e.jsx("i",{className:"bi bi-globe2"})}),e.jsxs("div",{children:[e.jsx("span",{className:"gaf-event-context-label",children:"Visibility"}),e.jsx("strong",{children:t.status==="published"?"Published":"Not publicly published"})]})]})]}),e.jsx("div",{className:"gaf-event-edit-form",children:e.jsx(r,{mode:"edit",event:t,categories:i,programs:n,newsArticles:s})})]}),e.jsx("style",{children:`
                .gaf-event-edit-page {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 8px 0 32px;
                    color: #172033;
                }

                .gaf-event-edit-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 26px;
                }

                .gaf-event-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                .gaf-event-breadcrumb .breadcrumb-item a {
                    color: #718096;
                    text-decoration: none;
                    transition: color .2s ease;
                }

                .gaf-event-breadcrumb .breadcrumb-item a:hover {
                    color: #20603d;
                }

                .gaf-event-breadcrumb .breadcrumb-item.active {
                    color: #172033;
                    font-weight: 600;
                }

                .gaf-event-edit-icon {
                    width: 48px;
                    height: 48px;
                    flex: 0 0 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-edit-title {
                    color: #172033;
                    font-size: 25px;
                    font-weight: 750;
                    letter-spacing: -.6px;
                }

                .gaf-event-edit-subtitle {
                    max-width: 650px;
                    margin-top: 7px;
                    color: #788397;
                    font-size: 13px;
                    line-height: 1.7;
                }

                .gaf-event-back-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 42px;
                    padding: 0 16px;
                    border: 1px solid #e2e7ef;
                    border-radius: 9px;
                    background: #fff;
                    color: #465268;
                    font-size: 13px;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: all .2s ease;
                }

                .gaf-event-back-btn:hover {
                    border-color: #c1dfce;
                    background: #f5f8fc;
                    color: #20603d;
                }

                .gaf-event-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    background: #f0f2f5;
                    color: #647084;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .35px;
                    text-transform: uppercase;
                }

                .gaf-event-status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .gaf-event-status-published {
                    background: #e8f6ee;
                    color: #268451;
                }

                .gaf-event-status-draft {
                    background: #f0f2f5;
                    color: #697586;
                }

                .gaf-event-status-cancelled {
                    background: #fff0ef;
                    color: #c44c45;
                }

                .gaf-event-status-completed {
                    background: #eff6f2;
                    color: #20603d;
                }

                .gaf-event-edit-context {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 22px;
                    padding: 17px 21px;
                    margin-bottom: 26px;
                    border: 1px solid #e9edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-event-context-item {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    min-width: 150px;
                }

                .gaf-event-context-icon {
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 35px;
                    border-radius: 9px;
                    background: #f2f6fb;
                    color: #20603d;
                    font-size: 15px;
                }

                .gaf-event-context-item > div {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    min-width: 0;
                }

                .gaf-event-context-label {
                    color: #8993a3;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: .4px;
                    text-transform: uppercase;
                }

                .gaf-event-context-item strong {
                    overflow: hidden;
                    max-width: 260px;
                    color: #263247;
                    font-size: 12px;
                    font-weight: 650;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-event-context-divider {
                    width: 1px;
                    height: 30px;
                    background: #edf0f4;
                }

                .gaf-event-edit-form {
                    width: 100%;
                }

                @media (max-width: 767px) {
                    .gaf-event-edit-page {
                        padding-top: 2px;
                    }

                    .gaf-event-edit-header {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 17px;
                    }

                    .gaf-event-edit-title {
                        font-size: 21px;
                    }

                    .gaf-event-edit-actions,
                    .gaf-event-back-btn {
                        width: 100%;
                    }

                    .gaf-event-edit-context {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 15px;
                        padding: 16px;
                    }

                    .gaf-event-context-divider {
                        width: 100%;
                        height: 1px;
                    }

                    .gaf-event-context-item strong {
                        max-width: 100%;
                    }
                }
            `})]})}export{m as default};
