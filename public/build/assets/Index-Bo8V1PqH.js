import{u as b,j as e,H as f,L as i,a as r}from"./app-DgqhyOnw.js";import{A as m}from"./AdminLayout-CErUPkqY.js";import"./adminI18n-C7pkKo0P.js";import"./Language-ChUCrwIh.js";function N({categories:s,filters:t={},stats:c={}}){const{flash:n}=b().props,l=s?.data||[],p=a=>{r.get(route("admin.event-categories.index"),{...t,search:a.target.value},{preserveState:!0,preserveScroll:!0,replace:!0})},x=a=>{r.get(route("admin.event-categories.index"),{...t,status:a.target.value},{preserveState:!0,preserveScroll:!0,replace:!0})},h=a=>{window.confirm(`Are you sure you want to delete "${a.name}"? This action cannot be undone.`)&&r.delete(route("admin.event-categories.destroy",a.id),{preserveScroll:!0})},d=()=>{r.get(route("admin.event-categories.index"),{},{preserveState:!0,replace:!0})},g=a=>a.replace("&laquo;","‹").replace("&raquo;","›").replace("Previous","Previous").replace("Next","Next");return e.jsxs(m,{children:[e.jsx(f,{title:"Event Categories"}),e.jsxs("div",{className:"event-categories-page",children:[e.jsxs("div",{className:"page-heading",children:[e.jsxs("div",{className:"heading-content",children:[e.jsxs("div",{className:"breadcrumb-text",children:[e.jsx(i,{href:route("admin.dashboard"),children:"Dashboard"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{children:"Event Categories"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3 mt-2",children:[e.jsx("div",{className:"heading-icon",children:e.jsx("i",{className:"bi bi-tags"})}),e.jsxs("div",{children:[e.jsx("h3",{children:"Event Categories"}),e.jsx("p",{children:"Organize and manage the categories used across your events."})]})]})]}),e.jsxs(i,{href:route("admin.event-categories.create"),className:"btn btn-create-category",children:[e.jsx("i",{className:"bi bi-plus-lg"}),e.jsx("span",{children:"Add Category"})]})]}),n?.success&&e.jsxs("div",{className:"alert custom-alert alert-success",children:[e.jsx("i",{className:"bi bi-check-circle-fill"}),e.jsx("span",{children:n.success}),e.jsx("button",{type:"button",className:"btn-close ms-auto","data-bs-dismiss":"alert"})]}),n?.error&&e.jsxs("div",{className:"alert custom-alert alert-danger",children:[e.jsx("i",{className:"bi bi-exclamation-circle-fill"}),e.jsx("span",{children:n.error}),e.jsx("button",{type:"button",className:"btn-close ms-auto","data-bs-dismiss":"alert"})]}),e.jsxs("div",{className:"row g-3 stats-row",children:[e.jsx("div",{className:"col-xl-4 col-md-4",children:e.jsxs("div",{className:"stat-card",children:[e.jsxs("div",{className:"stat-info",children:[e.jsx("span",{className:"stat-label",children:"Total Categories"}),e.jsx("h3",{children:c.total||0}),e.jsx("small",{children:"All event categories"})]}),e.jsx("div",{className:"stat-icon icon-blue",children:e.jsx("i",{className:"bi bi-tags"})})]})}),e.jsx("div",{className:"col-xl-4 col-md-4",children:e.jsxs("div",{className:"stat-card",children:[e.jsxs("div",{className:"stat-info",children:[e.jsx("span",{className:"stat-label",children:"Active Categories"}),e.jsx("h3",{children:c.active||0}),e.jsx("small",{children:"Available for events"})]}),e.jsx("div",{className:"stat-icon icon-green",children:e.jsx("i",{className:"bi bi-check-circle"})})]})}),e.jsx("div",{className:"col-xl-4 col-md-4",children:e.jsxs("div",{className:"stat-card",children:[e.jsxs("div",{className:"stat-info",children:[e.jsx("span",{className:"stat-label",children:"Inactive Categories"}),e.jsx("h3",{children:c.inactive||0}),e.jsx("small",{children:"Currently unavailable"})]}),e.jsx("div",{className:"stat-icon icon-gray",children:e.jsx("i",{className:"bi bi-pause-circle"})})]})})]}),e.jsxs("div",{className:"categories-panel",children:[e.jsxs("div",{className:"panel-heading",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"All Categories"}),e.jsx("p",{children:"View, edit and organize your event categories."})]}),e.jsxs("span",{className:"total-count",children:[s?.total||0," ",s?.total===1?"category":"categories"]})]}),e.jsx("div",{className:"filter-area",children:e.jsxs("div",{className:"row g-3 align-items-center",children:[e.jsx("div",{className:"col-lg-7",children:e.jsxs("div",{className:"search-control",children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{type:"search",className:"form-control",placeholder:"Search by category name, slug or description...",value:t.search||"",onChange:p}),t.search&&e.jsx("button",{type:"button",className:"clear-search",onClick:()=>r.get(route("admin.event-categories.index"),{...t,search:""},{preserveState:!0,replace:!0}),children:e.jsx("i",{className:"bi bi-x-circle"})})]})}),e.jsx("div",{className:"col-lg-3 col-md-6",children:e.jsxs("div",{className:"filter-control",children:[e.jsx("i",{className:"bi bi-funnel"}),e.jsxs("select",{className:"form-select",value:t.status||"",onChange:x,children:[e.jsx("option",{value:"",children:"All statuses"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"Inactive"})]})]})}),e.jsx("div",{className:"col-lg-2 col-md-6",children:e.jsxs("button",{type:"button",className:"btn btn-reset w-100",onClick:d,disabled:!t.search&&!t.status,children:[e.jsx("i",{className:"bi bi-arrow-counterclockwise me-2"}),"Reset"]})})]})}),e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table category-table align-middle mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"ps-4",children:"CATEGORY"}),e.jsx("th",{children:"SLUG"}),e.jsx("th",{children:"COLOR"}),e.jsx("th",{children:"ORDER"}),e.jsx("th",{children:"STATUS"}),e.jsx("th",{className:"text-end pe-4",children:"ACTIONS"})]})}),e.jsx("tbody",{children:l.length>0?l.map(a=>{const o=a.color||"#20603d";return e.jsxs("tr",{children:[e.jsx("td",{className:"ps-4",children:e.jsxs("div",{className:"category-identity",children:[e.jsx("div",{className:"category-color-indicator",style:{backgroundColor:o}}),e.jsxs("div",{className:"category-details",children:[e.jsx(i,{href:route("admin.event-categories.show",a.id),className:"category-name",children:a.name}),e.jsx("span",{className:"category-description",children:a.description?a.description.length>75?`${a.description.substring(0,75)}...`:a.description:"No description provided"})]})]})}),e.jsx("td",{children:e.jsx("code",{className:"slug-label",children:a.slug})}),e.jsx("td",{children:e.jsxs("div",{className:"color-value",children:[e.jsx("span",{className:"color-swatch",style:{backgroundColor:o}}),e.jsx("span",{children:a.color||"Default"})]})}),e.jsx("td",{children:e.jsx("span",{className:"order-value",children:a.sort_order??0})}),e.jsx("td",{children:a.is_active?e.jsxs("span",{className:"status-pill status-active",children:[e.jsx("span",{}),"Active"]}):e.jsxs("span",{className:"status-pill status-inactive",children:[e.jsx("span",{}),"Inactive"]})}),e.jsx("td",{className:"text-end pe-4",children:e.jsxs("div",{className:"category-actions",children:[e.jsx(i,{href:route("admin.event-categories.show",a.id),className:"action-btn",title:"View category",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsx(i,{href:route("admin.event-categories.edit",a.id),className:"action-btn action-edit",title:"Edit category",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsx("button",{type:"button",className:"action-btn action-delete",title:"Delete category",onClick:()=>h(a),children:e.jsx("i",{className:"bi bi-trash3"})})]})})]},a.id)}):e.jsx("tr",{children:e.jsx("td",{colSpan:"6",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"bi bi-tags"})}),e.jsx("h6",{children:"No categories found"}),e.jsx("p",{children:t.search||t.status?"Try changing your search or filters.":"You haven't created any event categories yet."}),t.search||t.status?e.jsx("button",{type:"button",className:"btn btn-reset",onClick:d,children:"Clear filters"}):e.jsxs(i,{href:route("admin.event-categories.create"),className:"btn btn-create-category",children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Create first category"]})]})})})})]})}),s?.links&&s.links.length>3&&e.jsxs("div",{className:"pagination-area",children:[e.jsxs("div",{className:"pagination-summary",children:["Showing"," ",e.jsx("strong",{children:s.from||0})," ","to"," ",e.jsx("strong",{children:s.to||0})," ","of"," ",e.jsx("strong",{children:s.total||0})," ","categories"]}),e.jsx("div",{className:"pagination-controls",children:s.links.map((a,o)=>e.jsx("button",{type:"button",disabled:!a.url,onClick:()=>a.url&&r.visit(a.url,{preserveScroll:!0,preserveState:!0}),className:`pagination-btn ${a.active?"active":""}`,dangerouslySetInnerHTML:{__html:g(a.label)}},o))})]})]})]}),e.jsx("style",{children:`
                .event-categories-page {
                    padding: 28px 30px 40px;
                    color: #172033;
                    min-height: 100%;
                    background: #f6f8fb;
                }

                .page-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 27px;
                }

                .breadcrumb-text {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    color: #8b95a7;
                }

                .breadcrumb-text a {
                    color: #6f7c91;
                    text-decoration: none;
                }

                .breadcrumb-text a:hover {
                    color: #20603d;
                }

                .breadcrumb-text i {
                    font-size: 10px;
                }

                .heading-content h3 {
                    font-size: 23px;
                    font-weight: 750;
                    letter-spacing: -0.6px;
                    margin: 0 0 5px;
                    color: #172033;
                }

                .heading-content p {
                    font-size: 13px;
                    color: #7d8798;
                    margin: 0;
                }

                .heading-icon {
                    width: 47px;
                    height: 47px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #eef6f1;
                    color: #20603d;
                    border-radius: 13px;
                    font-size: 21px;
                }

                .btn-create-category {
                    min-height: 42px;
                    padding: 10px 17px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    background: #20603d;
                    border: 1px solid #20603d;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all .2s ease;
                }

                .btn-create-category:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .custom-alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 0;
                    border-radius: 9px;
                    padding: 13px 16px;
                    font-size: 13px;
                    margin-bottom: 20px;
                }

                .stats-row {
                    margin-bottom: 25px;
                }

                .stat-card {
                    height: 100%;
                    min-height: 125px;
                    padding: 21px 22px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fff;
                    border: 1px solid #edf0f5;
                    border-radius: 11px;
                    box-shadow: 0 2px 8px rgba(20, 35, 60, .025);
                }

                .stat-label {
                    display: block;
                    color: #7c8799;
                    font-size: 12px;
                    font-weight: 550;
                    margin-bottom: 8px;
                }

                .stat-info h3 {
                    color: #172033;
                    font-size: 27px;
                    line-height: 1;
                    font-weight: 750;
                    margin: 0 0 8px;
                }

                .stat-info small {
                    color: #a0a9b7;
                    font-size: 11px;
                }

                .stat-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    font-size: 20px;
                }

                .icon-blue {
                    background: #f1f8f4;
                    color: #20603d;
                }

                .icon-green {
                    background: #eaf6f0;
                    color: #30966b;
                }

                .icon-gray {
                    background: #f0f2f5;
                    color: #7e8999;
                }

                .categories-panel {
                    background: #fff;
                    border: 1px solid #edf0f5;
                    border-radius: 11px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(20, 35, 60, .025);
                }

                .panel-heading {
                    padding: 21px 23px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border-bottom: 1px solid #f0f2f6;
                }

                .panel-heading h5 {
                    font-size: 15px;
                    font-weight: 700;
                    margin: 0 0 5px;
                    color: #202b3d;
                }

                .panel-heading p {
                    margin: 0;
                    font-size: 12px;
                    color: #929bab;
                }

                .total-count {
                    background: #f0f4fa;
                    color: #61738f;
                    padding: 6px 11px;
                    font-size: 11px;
                    font-weight: 650;
                    border-radius: 20px;
                    white-space: nowrap;
                }

                .filter-area {
                    padding: 17px 22px;
                    border-bottom: 1px solid #f0f2f6;
                }

                .search-control,
                .filter-control {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .search-control > i,
                .filter-control > i {
                    position: absolute;
                    left: 13px;
                    z-index: 2;
                    color: #9aa5b5;
                    font-size: 14px;
                }

                .search-control .form-control,
                .filter-control .form-select {
                    height: 41px;
                    border: 1px solid #e8ecf2;
                    background-color: #fafbfd;
                    border-radius: 7px !important;
                    color: #344054;
                    font-size: 12px;
                    box-shadow: none;
                }

                .search-control .form-control {
                    padding-left: 38px;
                    padding-right: 38px;
                }

                .filter-control .form-select {
                    padding-left: 37px;
                }

                .search-control .form-control:focus,
                .filter-control .form-select:focus {
                    background: #fff;
                    border-color: #9bcbb0;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .search-control .form-control::placeholder {
                    color: #a5adba;
                }

                .clear-search {
                    position: absolute;
                    right: 11px;
                    border: 0;
                    background: transparent;
                    color: #9aa5b5;
                    padding: 3px;
                }

                .btn-reset {
                    height: 41px;
                    background: #fff;
                    border: 1px solid #e8ecf2;
                    border-radius: 7px;
                    color: #687589;
                    font-size: 12px;
                    font-weight: 550;
                }

                .btn-reset:hover:not(:disabled) {
                    background: #f5f7fa;
                    border-color: #d6dce6;
                    color: #344054;
                }

                .btn-reset:disabled {
                    opacity: .55;
                }

                .category-table {
                    min-width: 850px;
                }

                .category-table thead th {
                    background: #fafbfd;
                    border-bottom: 1px solid #edf0f5;
                    padding: 14px 13px;
                    color: #929bab;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .65px;
                    white-space: nowrap;
                }

                .category-table tbody td {
                    padding: 15px 13px;
                    border-bottom: 1px solid #f0f2f6;
                    font-size: 12px;
                    color: #586579;
                }

                .category-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .category-table tbody tr:hover {
                    background: #fcfdff;
                }

                .category-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 240px;
                }

                .category-color-indicator {
                    width: 4px;
                    height: 39px;
                    border-radius: 5px;
                    flex-shrink: 0;
                }

                .category-details {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                }

                .category-name {
                    color: #253147;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                    width: fit-content;
                }

                .category-name:hover {
                    color: #20603d;
                }

                .category-description {
                    color: #99a2b0;
                    font-size: 11px;
                    max-width: 310px;
                    line-height: 1.5;
                }

                .slug-label {
                    background: #f5f7fa;
                    color: #68768a;
                    border-radius: 5px;
                    padding: 5px 7px;
                    font-size: 10px;
                }

                .color-value {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    font-size: 11px;
                    color: #7d8798;
                }

                .color-swatch {
                    width: 17px;
                    height: 17px;
                    border-radius: 5px;
                    border: 1px solid rgba(0,0,0,.08);
                }

                .order-value {
                    color: #687589;
                    font-size: 12px;
                    font-weight: 650;
                }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 6px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 650;
                }

                .status-pill > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .status-active {
                    background: #eaf6f0;
                    color: #27845d;
                }

                .status-active > span {
                    background: #35a574;
                }

                .status-inactive {
                    background: #f0f2f5;
                    color: #788394;
                }

                .status-inactive > span {
                    background: #9aa3b1;
                }

                .category-actions {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                .action-btn {
                    width: 31px;
                    height: 31px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e9edf2;
                    background: #fff;
                    border-radius: 7px;
                    color: #758196;
                    font-size: 13px;
                    text-decoration: none;
                    transition: all .15s ease;
                }

                .action-btn:hover {
                    background: #f2f6fc;
                    border-color: #deeee5;
                    color: #174a2f;
                }

                .action-edit {
                    color: #20603d;
                }

                .action-delete {
                    color: #d66b6b;
                }

                .action-delete:hover {
                    background: #fff1f1;
                    border-color: #f5dada;
                    color: #c74747;
                }

                .empty-state {
                    padding: 55px 20px;
                    text-align: center;
                }

                .empty-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 17px;
                    background: #f0f4fa;
                    color: #20603d;
                    font-size: 25px;
                }

                .empty-state h6 {
                    font-size: 14px;
                    font-weight: 700;
                    color: #29364b;
                    margin-bottom: 7px;
                }

                .empty-state p {
                    font-size: 12px;
                    color: #929bab;
                    margin-bottom: 17px;
                }

                .empty-state .btn-create-category {
                    font-size: 12px;
                    min-height: 37px;
                }

                .pagination-area {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 15px;
                    padding: 16px 22px;
                    border-top: 1px solid #f0f2f6;
                }

                .pagination-summary {
                    color: #929bab;
                    font-size: 11px;
                }

                .pagination-summary strong {
                    color: #526078;
                    font-weight: 700;
                }

                .pagination-controls {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .pagination-btn {
                    min-width: 31px;
                    height: 31px;
                    padding: 0 9px;
                    border: 1px solid #e9edf2;
                    border-radius: 6px;
                    background: #fff;
                    color: #687589;
                    font-size: 11px;
                    font-weight: 600;
                }

                .pagination-btn:hover:not(:disabled) {
                    background: #f3f6fb;
                    color: #174a2f;
                }

                .pagination-btn.active {
                    background: #20603d;
                    border-color: #20603d;
                    color: #fff;
                }

                .pagination-btn:disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                @media (max-width: 767px) {
                    .event-categories-page {
                        padding: 20px 14px 30px;
                    }

                    .page-heading {
                        align-items: flex-start;
                    }

                    .page-heading .btn-create-category {
                        width: 100%;
                    }

                    .heading-content h3 {
                        font-size: 20px;
                    }

                    .stat-card {
                        min-height: 110px;
                    }

                    .panel-heading {
                        padding: 17px;
                    }

                    .filter-area {
                        padding: 15px;
                    }

                    .pagination-area {
                        padding: 15px;
                    }

                    .pagination-summary {
                        width: 100%;
                    }

                    .pagination-controls {
                        flex-wrap: wrap;
                    }
                }
            `})]})}export{N as default};
