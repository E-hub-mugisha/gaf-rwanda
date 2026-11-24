import{j as e,H as d,L as r}from"./app-DLKA4Xg6.js";import{A as l}from"./AdminLayout-BbYLf1Bo.js";import"./adminI18n-BQsNvKgN.js";import"./Language-ChUCrwIh.js";function w({category:o,eventsCount:t=0}){const a=o.color||"#20603d",n=s=>{if(!s)return"Not available";const i=new Date(s);return Number.isNaN(i.getTime())?"Not available":i.toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})},c=s=>{if(!s)return"Not available";const i=new Date(s);return Number.isNaN(i.getTime())?"Not available":i.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})};return e.jsxs(l,{title:"Category Details",children:[e.jsx(d,{title:`${o.name} - Event Category`}),e.jsxs("div",{className:"event-category-show",children:[e.jsx("nav",{"aria-label":"breadcrumb",className:"mb-3",children:e.jsxs("ol",{className:"breadcrumb category-show-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(r,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(r,{href:route("admin.event-categories.index"),children:"Event Categories"})}),e.jsx("li",{className:"breadcrumb-item active",children:"Details"})]})}),e.jsxs("div",{className:"category-show-header",children:[e.jsxs("div",{className:"category-show-heading",children:[e.jsx("div",{className:"category-show-heading-icon",children:e.jsx("i",{className:"bi bi-tags"})}),e.jsxs("div",{children:[e.jsx("div",{className:"category-show-eyebrow",children:"CATEGORY MANAGEMENT"}),e.jsx("h2",{children:"Category details"}),e.jsx("p",{children:"Review category information, appearance and associated events."})]})]}),e.jsxs("div",{className:"category-show-actions",children:[e.jsxs(r,{href:route("admin.event-categories.index"),className:"category-show-back",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to categories"]}),e.jsxs(r,{href:route("admin.event-categories.edit",o.id),className:"category-show-edit",children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),"Edit category"]})]})]}),e.jsxs("div",{className:"category-show-hero",children:[e.jsx("div",{className:"category-show-color-strip",style:{backgroundColor:a}}),e.jsxs("div",{className:"category-show-hero-content",children:[e.jsx("div",{className:"category-show-symbol",style:{backgroundColor:`${a}16`,color:a,borderColor:`${a}35`},children:e.jsx("i",{className:"bi bi-tag-fill"})}),e.jsxs("div",{className:"category-show-hero-info",children:[e.jsxs("div",{className:"category-show-hero-top",children:[e.jsx("span",{className:"category-show-label",children:"EVENT CATEGORY"}),e.jsxs("span",{className:`category-show-status ${o.is_active?"active":"inactive"}`,children:[e.jsx("span",{}),o.is_active?"Active":"Inactive"]})]}),e.jsx("h3",{children:o.name}),e.jsx("p",{children:o.description||"No description has been added to this category yet."}),e.jsxs("div",{className:"category-show-hero-meta",children:[e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-link-45deg"}),o.slug]}),e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-hash"}),"Category ID: ",o.id]})]})]})]}),e.jsxs("div",{className:"category-show-hero-footer",children:[e.jsxs("div",{children:[e.jsx("span",{className:"category-show-footer-label",children:"Display order"}),e.jsx("strong",{children:o.sort_order??0})]}),e.jsxs("div",{children:[e.jsx("span",{className:"category-show-footer-label",children:"Associated events"}),e.jsx("strong",{children:t})]}),e.jsxs("div",{children:[e.jsx("span",{className:"category-show-footer-label",children:"Created"}),e.jsx("strong",{children:n(o.created_at)})]})]})]}),e.jsxs("div",{className:"row g-4 mt-1",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs("div",{className:"category-show-card",children:[e.jsx("div",{className:"category-show-card-header",children:e.jsxs("div",{className:"category-show-card-title",children:[e.jsx("div",{className:"category-show-card-icon",children:e.jsx("i",{className:"bi bi-file-text"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"About this category"}),e.jsx("p",{children:"Category description and information"})]})]})}),e.jsx("div",{className:"category-show-description",children:o.description?e.jsx("p",{children:o.description}):e.jsxs("div",{className:"category-show-empty",children:[e.jsx("i",{className:"bi bi-file-earmark-text"}),e.jsx("span",{children:"No description has been provided for this category."})]})})]}),e.jsxs("div",{className:"category-show-card mt-4",children:[e.jsx("div",{className:"category-show-card-header",children:e.jsxs("div",{className:"category-show-card-title",children:[e.jsx("div",{className:"category-show-card-icon",children:e.jsx("i",{className:"bi bi-palette"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Category appearance"}),e.jsx("p",{children:"How this category is identified across the platform"})]})]})}),e.jsxs("div",{className:"category-show-appearance",children:[e.jsxs("div",{className:"category-show-appearance-preview",children:[e.jsx("span",{className:"category-show-preview-label",children:"CATEGORY BADGE PREVIEW"}),e.jsx("div",{children:e.jsxs("span",{className:"category-show-badge",style:{color:a,backgroundColor:`${a}16`,borderColor:`${a}45`},children:[e.jsx("span",{className:"category-show-badge-dot",style:{backgroundColor:a}}),o.name]})})]}),e.jsxs("div",{className:"category-show-color-details",children:[e.jsx("span",{children:"Selected color"}),e.jsxs("div",{className:"category-show-color-value",children:[e.jsx("span",{style:{backgroundColor:a}}),e.jsx("strong",{children:a.toUpperCase()})]})]})]})]})]}),e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("div",{className:"category-show-card",children:[e.jsx("div",{className:"category-show-card-header",children:e.jsxs("div",{className:"category-show-card-title",children:[e.jsx("div",{className:"category-show-card-icon",children:e.jsx("i",{className:"bi bi-info-circle"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Category overview"}),e.jsx("p",{children:"Key category information"})]})]})}),e.jsxs("div",{className:"category-show-information",children:[e.jsxs("div",{className:"category-show-info-row",children:[e.jsx("div",{className:"category-show-info-icon",children:e.jsx("i",{className:"bi bi-hash"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Category ID"}),e.jsxs("strong",{children:["#",o.id]})]})]}),e.jsxs("div",{className:"category-show-info-row",children:[e.jsx("div",{className:"category-show-info-icon",children:e.jsx("i",{className:"bi bi-link-45deg"})}),e.jsxs("div",{children:[e.jsx("span",{children:"URL slug"}),e.jsx("strong",{className:"category-show-break",children:o.slug})]})]}),e.jsxs("div",{className:"category-show-info-row",children:[e.jsx("div",{className:"category-show-info-icon",children:e.jsx("i",{className:"bi bi-sort-numeric-down"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Display order"}),e.jsx("strong",{children:o.sort_order??0})]})]}),e.jsxs("div",{className:"category-show-info-row",children:[e.jsx("div",{className:"category-show-info-icon",children:e.jsx("i",{className:"bi bi-calendar-event"})}),e.jsxs("div",{children:[e.jsx("span",{children:"Associated events"}),e.jsx("strong",{children:t})]})]})]})]}),e.jsxs("div",{className:"category-show-card mt-4",children:[e.jsx("div",{className:"category-show-card-header",children:e.jsxs("div",{className:"category-show-card-title",children:[e.jsx("div",{className:"category-show-card-icon",children:e.jsx("i",{className:"bi bi-clock-history"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Record information"}),e.jsx("p",{children:"Creation and update history"})]})]})}),e.jsxs("div",{className:"category-show-timeline",children:[e.jsxs("div",{className:"category-show-timeline-item",children:[e.jsx("span",{className:"category-show-timeline-dot created"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Category created"}),e.jsx("span",{children:c(o.created_at)})]})]}),e.jsxs("div",{className:"category-show-timeline-item",children:[e.jsx("span",{className:"category-show-timeline-dot updated"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Last updated"}),e.jsx("span",{children:c(o.updated_at)})]})]})]})]}),e.jsxs("div",{className:"category-show-quick-action mt-4",children:[e.jsx("div",{className:"category-show-quick-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("strong",{children:"Need to make changes?"}),e.jsx("p",{children:"Update the category name, description, color or visibility."})]}),e.jsxs(r,{href:route("admin.event-categories.edit",o.id),children:["Edit category",e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})]})]}),e.jsx("style",{children:`
                .event-category-show {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    color: #172033;
                }

                .category-show-breadcrumb {
                    margin-bottom: 0;
                    font-size: 10px;
                    font-weight: 600;
                }

                .category-show-breadcrumb a {
                    color: #8994a5;
                    text-decoration: none;
                }

                .category-show-breadcrumb a:hover {
                    color: #174a2f;
                }

                .category-show-breadcrumb .active {
                    color: #344054;
                }

                /* PAGE HEADER */
                .category-show-header {
                    margin: 22px 0 25px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 18px;
                    flex-wrap: wrap;
                }

                .category-show-heading {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .category-show-heading-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 12px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 21px;
                }

                .category-show-eyebrow {
                    margin-bottom: 5px;
                    color: #8b98aa;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                }

                .category-show-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .category-show-heading p {
                    margin: 6px 0 0;
                    color: #8994a5;
                    font-size: 10px;
                }

                .category-show-actions {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .category-show-back,
                .category-show-edit {
                    min-height: 39px;
                    padding: 0 14px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .category-show-back {
                    border: 1px solid #e5eaf0;
                    background: #fff;
                    color: #647184;
                }

                .category-show-back:hover {
                    background: #f7f9fc;
                    color: #174a2f;
                }

                .category-show-edit {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .category-show-edit:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                }

                /* HERO */
                .category-show-hero {
                    position: relative;
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 13px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-show-color-strip {
                    height: 5px;
                    width: 100%;
                }

                .category-show-hero-content {
                    padding: 25px 27px;
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                }

                .category-show-symbol {
                    width: 56px;
                    height: 56px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border: 1px solid;
                    border-radius: 13px;
                    font-size: 23px;
                }

                .category-show-hero-info {
                    min-width: 0;
                    flex: 1;
                }

                .category-show-hero-top {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .category-show-label {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .category-show-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 9px;
                    border-radius: 20px;
                    font-size: 8px;
                    font-weight: 800;
                }

                .category-show-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .category-show-status.active {
                    background: #eaf7ef;
                    color: #278653;
                }

                .category-show-status.active > span {
                    background: #278653;
                }

                .category-show-status.inactive {
                    background: #f0f2f5;
                    color: #778293;
                }

                .category-show-status.inactive > span {
                    background: #8994a5;
                }

                .category-show-hero-info h3 {
                    margin: 10px 0 7px;
                    color: #172033;
                    font-size: 21px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                    overflow-wrap: anywhere;
                }

                .category-show-hero-info > p {
                    max-width: 750px;
                    margin: 0;
                    color: #8792a2;
                    font-size: 10px;
                    line-height: 1.8;
                    white-space: pre-line;
                    overflow-wrap: anywhere;
                }

                .category-show-hero-meta {
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .category-show-hero-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: #7e8a9b;
                    font-size: 9px;
                }

                .category-show-hero-meta i {
                    color: #9ca7b5;
                    font-size: 12px;
                }

                .category-show-hero-footer {
                    padding: 16px 27px;
                    display: flex;
                    align-items: center;
                    gap: 50px;
                    flex-wrap: wrap;
                    background: #fafbfd;
                    border-top: 1px solid #edf0f4;
                }

                .category-show-hero-footer > div {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .category-show-footer-label {
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .category-show-hero-footer strong {
                    color: #354155;
                    font-size: 11px;
                    font-weight: 800;
                }

                /* CARDS */
                .category-show-card {
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-show-card-header {
                    padding: 18px 21px;
                    border-bottom: 1px solid #edf0f4;
                }

                .category-show-card-title {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .category-show-card-icon {
                    width: 34px;
                    height: 34px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 9px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 15px;
                }

                .category-show-card-title h5 {
                    margin: 0;
                    color: #253247;
                    font-size: 11px;
                    font-weight: 800;
                }

                .category-show-card-title p {
                    margin: 4px 0 0;
                    color: #9aa4b1;
                    font-size: 9px;
                }

                /* DESCRIPTION */
                .category-show-description {
                    min-height: 145px;
                    padding: 24px;
                }

                .category-show-description > p {
                    margin: 0;
                    color: #697789;
                    font-size: 11px;
                    line-height: 2;
                    white-space: pre-line;
                    overflow-wrap: anywhere;
                }

                .category-show-empty {
                    min-height: 95px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 10px;
                    color: #a0a9b6;
                    font-size: 10px;
                    text-align: center;
                }

                .category-show-empty i {
                    font-size: 23px;
                    color: #c3ccd7;
                }

                /* APPEARANCE */
                .category-show-appearance {
                    padding: 21px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .category-show-appearance-preview {
                    flex: 1;
                    min-width: 180px;
                    padding: 16px;
                    background: #f8f9fb;
                    border: 1px dashed #e2e7ee;
                    border-radius: 9px;
                }

                .category-show-preview-label {
                    display: block;
                    margin-bottom: 15px;
                    color: #a0a9b6;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: .8px;
                }

                .category-show-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 13px;
                    border: 1px solid;
                    border-radius: 25px;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                }

                .category-show-color-details {
                    min-width: 110px;
                }

                .category-show-color-details > span {
                    display: block;
                    margin-bottom: 10px;
                    color: #929baa;
                    font-size: 9px;
                }

                .category-show-color-value {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .category-show-color-value > span {
                    width: 23px;
                    height: 23px;
                    border: 1px solid rgba(0,0,0,.08);
                    border-radius: 6px;
                }

                .category-show-color-value strong {
                    color: #465267;
                    font-size: 10px;
                    font-weight: 800;
                }

                /* INFORMATION */
                .category-show-information {
                    padding: 7px 20px;
                }

                .category-show-info-row {
                    padding: 13px 0;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    border-bottom: 1px solid #f0f2f5;
                }

                .category-show-info-row:last-child {
                    border-bottom: 0;
                }

                .category-show-info-icon {
                    width: 31px;
                    height: 31px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #f5f7fa;
                    color: #8290a2;
                    font-size: 13px;
                }

                .category-show-info-row > div:last-child {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .category-show-info-row span {
                    color: #9aa4b1;
                    font-size: 8px;
                }

                .category-show-info-row strong {
                    color: #39465a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-break {
                    overflow-wrap: anywhere;
                }

                /* TIMELINE */
                .category-show-timeline {
                    padding: 22px;
                }

                .category-show-timeline-item {
                    position: relative;
                    min-height: 59px;
                    padding-left: 23px;
                    display: flex;
                    align-items: flex-start;
                }

                .category-show-timeline-item:not(:last-child)::before {
                    content: "";
                    position: absolute;
                    top: 12px;
                    bottom: -1px;
                    left: 4px;
                    width: 1px;
                    background: #e5eaf0;
                }

                .category-show-timeline-dot {
                    position: absolute;
                    top: 3px;
                    left: 0;
                    width: 9px;
                    height: 9px;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 1px #99caae;
                    background: #20603d;
                }

                .category-show-timeline-dot.updated {
                    background: #3c9b6b;
                    box-shadow: 0 0 0 1px #8bc9a6;
                }

                .category-show-timeline-item strong,
                .category-show-timeline-item span {
                    display: block;
                }

                .category-show-timeline-item strong {
                    color: #465267;
                    font-size: 9px;
                    font-weight: 800;
                }

                .category-show-timeline-item div span {
                    margin-top: 5px;
                    color: #929baa;
                    font-size: 9px;
                }

                /* QUICK ACTION */
                .category-show-quick-action {
                    padding: 17px;
                    background: #f1f6fc;
                    border: 1px solid #e6f2eb;
                    border-radius: 11px;
                }

                .category-show-quick-icon {
                    width: 33px;
                    height: 33px;
                    margin-bottom: 12px;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #fff;
                    color: #20603d;
                    font-size: 15px;
                }

                .category-show-quick-action strong {
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-show-quick-action p {
                    margin: 6px 0 12px;
                    color: #71849d;
                    font-size: 9px;
                    line-height: 1.7;
                }

                .category-show-quick-action a {
                    color: #174a2f;
                    font-size: 9px;
                    font-weight: 800;
                    text-decoration: none;
                }

                .category-show-quick-action a:hover {
                    color: #174a2f;
                }

                @media(max-width: 767px) {
                    .category-show-hero-content {
                        padding: 20px;
                        gap: 13px;
                    }

                    .category-show-hero-footer {
                        padding: 15px 20px;
                        gap: 22px;
                    }

                    .category-show-appearance {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .category-show-color-details {
                        padding-top: 5px;
                    }
                }

                @media(max-width: 480px) {
                    .category-show-heading h2 {
                        font-size: 17px;
                    }

                    .category-show-heading-icon {
                        width: 42px;
                        height: 42px;
                    }

                    .category-show-actions {
                        width: 100%;
                    }

                    .category-show-actions a {
                        flex: 1;
                    }

                    .category-show-hero-content {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .category-show-hero-info h3 {
                        font-size: 18px;
                    }

                    .category-show-hero-footer {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 18px;
                    }
                }
            `})]})}export{w as default};
