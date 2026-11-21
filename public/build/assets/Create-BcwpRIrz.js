import{j as e,H as n,L as a}from"./app-BoaN8el2.js";import{A as s}from"./AdminLayout-DfaHNGbY.js";import c from"./EventForm-G_sHaGuG.js";import"./adminI18n-CMOU2D81.js";import"./Language-ChUCrwIh.js";import"./RichTextEditor-BQqPQGDJ.js";import"./LangTabs-BNoFexIC.js";function g({categories:t=[],programs:r=[],newsArticles:i=[]}){return e.jsxs(s,{title:"Create Event",children:[e.jsx(n,{title:"Create Event"}),e.jsxs("div",{className:"gaf-event-create-page",children:[e.jsxs("div",{className:"gaf-event-create-header",children:[e.jsxs("div",{children:[e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb gaf-event-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(a,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(a,{href:route("admin.events.index"),children:"Events"})}),e.jsx("li",{className:"breadcrumb-item active",children:"Create event"})]})}),e.jsxs("div",{className:"gaf-event-create-title",children:[e.jsx("div",{className:"gaf-event-create-icon",children:e.jsx("i",{className:"bi bi-calendar2-plus"})}),e.jsxs("div",{children:[e.jsx("h2",{children:"Create a new event"}),e.jsx("p",{children:"Add the event details, schedule and information for your audience."})]})]})]}),e.jsxs(a,{href:route("admin.events.index"),className:"gaf-event-back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),"Back to events"]})]}),e.jsxs("div",{className:"gaf-event-create-note",children:[e.jsx("i",{className:"bi bi-info-circle"}),e.jsxs("span",{children:["Fields marked with ",e.jsx("strong",{children:"*"})," are required. You can save your event as a draft before publishing."]})]}),e.jsx(c,{mode:"create",categories:t,programs:r,newsArticles:i})]}),e.jsx("style",{children:`
                .gaf-event-create-page {
                    width: 100%;
                    min-width: 0;
                }

                .gaf-event-create-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 20px;
                    margin-bottom: 22px;
                }

                .gaf-event-breadcrumb {
                    margin-bottom: 16px;
                    font-size: 10px;
                }

                .gaf-event-breadcrumb a {
                    color: #8290a3;
                    text-decoration: none;
                }

                .gaf-event-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-event-breadcrumb .active {
                    color: #4b5870;
                }

                .gaf-event-create-title {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .gaf-event-create-icon {
                    display: flex;
                    width: 48px;
                    height: 48px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-create-title h2 {
                    margin: 0 0 5px;
                    color: #172033;
                    font-size: 23px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .gaf-event-create-title p {
                    margin: 0;
                    color: #8993a2;
                    font-size: 11px;
                }

                .gaf-event-back-link {
                    display: inline-flex;
                    min-height: 37px;
                    align-items: center;
                    gap: 8px;
                    padding: 0 12px;
                    border: 1px solid #e2e7ee;
                    border-radius: 6px;
                    background: #fff;
                    color: #627087;
                    font-size: 10px;
                    font-weight: 700;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .gaf-event-back-link:hover {
                    border-color: #cce4d6;
                    background: #f7f9fc;
                    color: #20603d;
                }

                .gaf-event-create-note {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin-bottom: 20px;
                    padding: 12px 15px;
                    border: 1px solid #e5f1ea;
                    border-radius: 7px;
                    background: #f7faff;
                    color: #71829a;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-event-create-note i {
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-create-note strong {
                    color: #d45c5c;
                }

                @media (max-width: 650px) {
                    .gaf-event-create-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-event-create-title h2 {
                        font-size: 20px;
                    }

                    .gaf-event-create-title p {
                        line-height: 1.6;
                    }
                }
            `})]})}export{g as default};
