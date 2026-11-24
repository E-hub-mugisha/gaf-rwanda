import{j as e,H as a,L as t}from"./app-DoSfGtOe.js";import{A as r}from"./AdminLayout-DrpG72CY.js";import i from"./CategoryForm-WERLUBzT.js";import"./adminI18n-Q4tBDW-m.js";import"./Language-ChUCrwIh.js";function d(){return e.jsxs(r,{title:"Create Event Category",children:[e.jsx(a,{title:"Create Event Category"}),e.jsxs("div",{className:"event-category-page",children:[e.jsx("nav",{"aria-label":"breadcrumb",className:"mb-3",children:e.jsxs("ol",{className:"breadcrumb event-category-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(t,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(t,{href:route("admin.event-categories.index"),children:"Event Categories"})}),e.jsx("li",{className:"breadcrumb-item active",children:"Create"})]})}),e.jsxs("div",{className:"event-category-page-header",children:[e.jsxs("div",{className:"event-category-title",children:[e.jsx("div",{className:"event-category-title-icon",children:e.jsx("i",{className:"bi bi-tags"})}),e.jsxs("div",{children:[e.jsx("h2",{children:"Create event category"}),e.jsx("p",{children:"Set up a category to organize and classify events across the GAF Rwanda platform."})]})]}),e.jsxs(t,{href:route("admin.event-categories.index"),className:"event-category-back-link",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to categories"]})]}),e.jsx(i,{mode:"create"})]}),e.jsx("style",{children:`
                .event-category-page {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                }

                .event-category-breadcrumb {
                    font-size: 10px;
                    font-weight: 600;
                }

                .event-category-breadcrumb a {
                    color: #8290a2;
                    text-decoration: none;
                }

                .event-category-breadcrumb a:hover {
                    color: #174a2f;
                }

                .event-category-breadcrumb .active {
                    color: #344054;
                }

                .event-category-page-header {
                    margin-bottom: 27px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .event-category-title {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .event-category-title-icon {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 21px;
                }

                .event-category-title h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .event-category-title p {
                    margin: 6px 0 0;
                    color: #8994a5;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .event-category-back-link {
                    min-height: 39px;
                    padding: 0 14px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e5eaf0;
                    border-radius: 8px;
                    background: #fff;
                    color: #647184;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 750;
                    transition: .18s ease;
                }

                .event-category-back-link:hover {
                    background: #f7f9fc;
                    color: #174a2f;
                    border-color: #d3e7dc;
                }

                @media(max-width: 575px) {
                    .event-category-title {
                        align-items: flex-start;
                    }

                    .event-category-title h2 {
                        font-size: 17px;
                    }

                    .event-category-title-icon {
                        width: 42px;
                        height: 42px;
                    }
                }
            `})]})}export{d as default};
