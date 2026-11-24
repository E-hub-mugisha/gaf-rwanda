import{j as e,H as n,L as t}from"./app-CnQ2naJx.js";import{A as s}from"./AdminLayout-BVsaJnXH.js";import d from"./CategoryForm-C53K9yH3.js";import"./adminI18n-FDcM2fzV.js";import"./Language-ChUCrwIh.js";function p({category:i}){const a=i.color||"#20603d";return e.jsxs(s,{title:"Edit Event Category",children:[e.jsx(n,{title:`Edit ${i.name}`}),e.jsxs("div",{className:"event-category-edit-page",children:[e.jsx("nav",{"aria-label":"breadcrumb",className:"mb-3",children:e.jsxs("ol",{className:"breadcrumb event-edit-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(t,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(t,{href:route("admin.event-categories.index"),children:"Event Categories"})}),e.jsx("li",{className:"breadcrumb-item active",children:"Edit Category"})]})}),e.jsxs("div",{className:"event-edit-header",children:[e.jsxs("div",{className:"event-edit-heading",children:[e.jsx("div",{className:"event-edit-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("div",{className:"event-edit-eyebrow",children:"CATEGORY MANAGEMENT"}),e.jsx("h2",{children:"Edit event category"}),e.jsx("p",{children:"Update category information, appearance and publishing settings."})]})]}),e.jsxs(t,{href:route("admin.event-categories.index"),className:"event-edit-back-button",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"All categories"]})]}),e.jsxs("div",{className:"event-edit-summary",children:[e.jsxs("div",{className:"event-edit-summary-main",children:[e.jsx("div",{className:"event-edit-category-marker",style:{backgroundColor:a},children:e.jsx("i",{className:"bi bi-tag-fill"})}),e.jsxs("div",{className:"event-edit-category-info",children:[e.jsx("span",{children:"Currently editing"}),e.jsx("h5",{children:i.name}),e.jsxs("small",{children:[e.jsx("i",{className:"bi bi-link-45deg me-1"}),i.slug]})]})]}),e.jsxs("div",{className:"event-edit-summary-details",children:[e.jsxs("div",{className:"event-edit-detail",children:[e.jsx("span",{children:"Status"}),e.jsxs("span",{className:`event-edit-status ${i.is_active?"active":"inactive"}`,children:[e.jsx("span",{}),i.is_active?"Active":"Inactive"]})]}),e.jsxs("div",{className:"event-edit-detail",children:[e.jsx("span",{children:"Display order"}),e.jsx("strong",{children:i.sort_order??0})]}),e.jsxs("div",{className:"event-edit-detail",children:[e.jsx("span",{children:"Category ID"}),e.jsxs("strong",{children:["#",i.id]})]})]})]}),e.jsxs("div",{className:"event-edit-form-heading",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"Category settings"}),e.jsx("p",{children:"Make the necessary changes and save when finished."})]}),e.jsxs("span",{className:"event-edit-required",children:[e.jsx("span",{children:"*"})," Required fields"]})]}),e.jsx(d,{mode:"edit",category:i})]}),e.jsx("style",{children:`
                .event-category-edit-page {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    color: #172033;
                }

                .event-edit-breadcrumb {
                    margin-bottom: 0;
                    font-size: 10px;
                    font-weight: 600;
                }

                .event-edit-breadcrumb a {
                    color: #8994a5;
                    text-decoration: none;
                }

                .event-edit-breadcrumb a:hover {
                    color: #174a2f;
                }

                .event-edit-breadcrumb .active {
                    color: #344054;
                }

                /* HEADER */
                .event-edit-header {
                    margin: 23px 0 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .event-edit-heading {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .event-edit-icon {
                    width: 49px;
                    height: 49px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 21px;
                }

                .event-edit-eyebrow {
                    margin-bottom: 5px;
                    color: #8b98aa;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                }

                .event-edit-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .event-edit-heading p {
                    margin: 6px 0 0;
                    color: #8994a5;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .event-edit-back-button {
                    min-height: 39px;
                    padding: 0 15px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e5eaf0;
                    border-radius: 8px;
                    background: #fff;
                    color: #647184;
                    font-size: 10px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .event-edit-back-button:hover {
                    background: #f7f9fc;
                    border-color: #d3e7dc;
                    color: #174a2f;
                }

                /* SUMMARY */
                .event-edit-summary {
                    margin-bottom: 28px;
                    padding: 19px 22px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .event-edit-summary-main {
                    min-width: 0;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .event-edit-category-marker {
                    width: 43px;
                    height: 43px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 11px;
                    color: #fff;
                    font-size: 17px;
                }

                .event-edit-category-info {
                    min-width: 0;
                }

                .event-edit-category-info > span {
                    display: block;
                    margin-bottom: 3px;
                    color: #99a3b1;
                    font-size: 9px;
                    font-weight: 600;
                }

                .event-edit-category-info h5 {
                    margin: 0;
                    color: #263348;
                    font-size: 13px;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                }

                .event-edit-category-info small {
                    display: block;
                    margin-top: 5px;
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-summary-details {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }

                .event-edit-detail {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .event-edit-detail > span:first-child {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .event-edit-detail strong {
                    color: #39465a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .event-edit-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 9px;
                    font-weight: 800;
                }

                .event-edit-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .event-edit-status.active {
                    color: #29935f;
                }

                .event-edit-status.active > span {
                    background: #29935f;
                }

                .event-edit-status.inactive {
                    color: #8994a5;
                }

                .event-edit-status.inactive > span {
                    background: #8994a5;
                }

                /* FORM SECTION HEADER */
                .event-edit-form-heading {
                    margin-bottom: 17px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                }

                .event-edit-form-heading h5 {
                    margin: 0;
                    color: #253247;
                    font-size: 12px;
                    font-weight: 800;
                }

                .event-edit-form-heading p {
                    margin: 5px 0 0;
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-required {
                    color: #929baa;
                    font-size: 9px;
                }

                .event-edit-required span {
                    color: #dc5555;
                    font-weight: 800;
                }

                @media(max-width: 767px) {
                    .event-edit-summary {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .event-edit-summary-details {
                        width: 100%;
                        padding-top: 15px;
                        border-top: 1px solid #edf0f4;
                        justify-content: space-between;
                        gap: 12px;
                    }
                }

                @media(max-width: 480px) {
                    .event-edit-heading h2 {
                        font-size: 17px;
                    }

                    .event-edit-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .event-edit-form-heading {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .event-edit-summary {
                        padding: 16px;
                    }
                }
            `})]})}export{p as default};
