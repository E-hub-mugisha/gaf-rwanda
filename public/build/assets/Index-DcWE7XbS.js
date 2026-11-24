import{u as H,r as c,b as P,j as e,H as V,L as G,a as j}from"./app-DoSfGtOe.js";import{A as B}from"./AdminLayout-DrpG72CY.js";import"./adminI18n-Q4tBDW-m.js";import"./Language-ChUCrwIh.js";const K={name:"",name_rw:"",slug:"",description:"",is_active:!0,sort_order:0};function W({categories:n,filters:_={},stats:v={}}){const{flash:m}=H().props,h=n?.data||[],[y,l]=c.useState(!1),[t,N]=c.useState("create"),[s,d]=c.useState(null),[w,k]=c.useState(_.search||""),[S,A]=c.useState(_.status||""),{data:r,setData:o,post:D,processing:g,errors:i,reset:f,clearErrors:z,transform:b}=P(K),C=a=>a?new Date(a).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"—",p=a=>a===!0||a===1||a==="1",u=()=>{g||(l(!1),d(null),f(),z(),b(a=>a))},E=()=>{f(),z(),b(a=>a),d(null),N("create"),l(!0)},I=a=>{f(),z(),b(x=>x),d(a),N("edit"),o({name:a.name||"",name_rw:a.name_rw||"",slug:a.slug||"",description:a.description||"",is_active:p(a.is_active),sort_order:a.sort_order??0}),l(!0)},L=a=>{d(a),N("view"),l(!0)};c.useEffect(()=>{if(t!=="create"||!y)return;const a=r.name.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");a!==r.slug&&o("slug",a)},[r.name,t,y]);const R=a=>{if(a.preventDefault(),t==="edit"&&s){b(x=>({...x,_method:"put"})),D(route("admin.news-categories.update",s.id),{preserveScroll:!0,onSuccess:()=>{l(!1),d(null),f()}});return}D(route("admin.news-categories.store"),{preserveScroll:!0,onSuccess:()=>{l(!1),d(null),f()}})},M=a=>{window.confirm(`Are you sure you want to delete "${a.name}"?`)&&j.delete(route("admin.news-categories.destroy",a.id),{preserveScroll:!0})},U=a=>{a.preventDefault(),j.get(route("admin.news-categories.index"),{search:w,status:S},{preserveState:!0,preserveScroll:!0,replace:!0})},$=()=>{k(""),A(""),j.get(route("admin.news-categories.index"),{},{preserveState:!0,preserveScroll:!0,replace:!0})},T=a=>{a&&j.visit(a,{preserveScroll:!0,preserveState:!0})},F=v.total??0,O=v.active??0,q=v.inactive??0;return e.jsxs(B,{children:[e.jsx(V,{title:"News Categories"}),e.jsxs("div",{className:"gaf-category-page",children:[e.jsxs("div",{className:"gaf-page-heading",children:[e.jsxs("div",{children:[e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb gaf-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(G,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item active",children:"News Categories"})]})}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("div",{className:"gaf-heading-icon",children:e.jsx("i",{className:"bi bi-collection"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"gaf-page-title",children:"News Categories"}),e.jsx("p",{className:"gaf-page-subtitle",children:"Organize and manage the categories used across your news publications."})]})]})]}),e.jsxs("button",{type:"button",className:"btn gaf-primary-btn",onClick:E,children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Add Category"]})]}),m?.success&&e.jsxs("div",{className:"alert gaf-alert-success alert-dismissible fade show",children:[e.jsx("i",{className:"bi bi-check-circle-fill me-2"}),m.success,e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert"})]}),m?.error&&e.jsxs("div",{className:"alert gaf-alert-danger alert-dismissible fade show",children:[e.jsx("i",{className:"bi bi-exclamation-circle-fill me-2"}),m.error,e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert"})]}),e.jsxs("div",{className:"row g-3 mb-4",children:[e.jsx("div",{className:"col-sm-6 col-xl-4",children:e.jsxs("div",{className:"gaf-stat-card",children:[e.jsx("div",{className:"gaf-stat-icon gaf-stat-blue",children:e.jsx("i",{className:"bi bi-collection"})}),e.jsxs("div",{className:"gaf-stat-content",children:[e.jsx("span",{children:"Total Categories"}),e.jsx("h3",{children:F}),e.jsx("small",{children:"All registered categories"})]}),e.jsx("div",{className:"gaf-stat-decoration",children:e.jsx("i",{className:"bi bi-collection"})})]})}),e.jsx("div",{className:"col-sm-6 col-xl-4",children:e.jsxs("div",{className:"gaf-stat-card",children:[e.jsx("div",{className:"gaf-stat-icon gaf-stat-green",children:e.jsx("i",{className:"bi bi-check-circle"})}),e.jsxs("div",{className:"gaf-stat-content",children:[e.jsx("span",{children:"Active Categories"}),e.jsx("h3",{children:O}),e.jsx("small",{children:"Available for publications"})]}),e.jsx("div",{className:"gaf-stat-decoration",children:e.jsx("i",{className:"bi bi-check-circle"})})]})}),e.jsx("div",{className:"col-sm-6 col-xl-4",children:e.jsxs("div",{className:"gaf-stat-card",children:[e.jsx("div",{className:"gaf-stat-icon gaf-stat-orange",children:e.jsx("i",{className:"bi bi-pause-circle"})}),e.jsxs("div",{className:"gaf-stat-content",children:[e.jsx("span",{children:"Inactive Categories"}),e.jsx("h3",{children:q}),e.jsx("small",{children:"Currently unavailable"})]}),e.jsx("div",{className:"gaf-stat-decoration",children:e.jsx("i",{className:"bi bi-pause-circle"})})]})})]}),e.jsxs("div",{className:"gaf-content-card",children:[e.jsxs("div",{className:"gaf-content-header",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"Category Management"}),e.jsx("p",{children:"View, search, update and organize your news categories."})]}),e.jsxs("span",{className:"gaf-record-count",children:[e.jsx("i",{className:"bi bi-folder2-open me-2"}),n?.total??h.length," records"]})]}),e.jsx("div",{className:"gaf-filter-section",children:e.jsx("form",{onSubmit:U,children:e.jsxs("div",{className:"row g-2 align-items-center",children:[e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"gaf-search-box",children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{type:"search",value:w,onChange:a=>k(a.target.value),placeholder:"Search categories by name, slug or description..."}),w&&e.jsx("button",{type:"button",onClick:()=>k(""),"aria-label":"Clear search",children:e.jsx("i",{className:"bi bi-x-lg"})})]})}),e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("select",{className:"form-select gaf-filter-select",value:S,onChange:a=>A(a.target.value),children:[e.jsx("option",{value:"",children:"All statuses"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"Inactive"})]})}),e.jsx("div",{className:"col-sm-6 col-lg-3",children:e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"submit",className:"btn gaf-filter-btn flex-grow-1",children:[e.jsx("i",{className:"bi bi-funnel me-2"}),"Apply Filters"]}),e.jsx("button",{type:"button",className:"btn gaf-clear-btn",onClick:$,title:"Clear filters",children:e.jsx("i",{className:"bi bi-arrow-counterclockwise"})})]})})]})})}),e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table gaf-category-table align-middle mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"ps-4",children:"CATEGORY"}),e.jsx("th",{children:"URL SLUG"}),e.jsx("th",{children:"DESCRIPTION"}),e.jsx("th",{children:"ORDER"}),e.jsx("th",{children:"STATUS"}),e.jsx("th",{children:"CREATED"}),e.jsx("th",{className:"text-end pe-4",children:"ACTIONS"})]})}),e.jsx("tbody",{children:h.length>0?h.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"ps-4",children:e.jsxs("div",{className:"gaf-category-identity",children:[e.jsx("div",{className:"gaf-category-icon",children:e.jsx("i",{className:"bi bi-folder2-open"})}),e.jsxs("div",{children:[e.jsx("div",{className:"gaf-category-name",children:a.name}),e.jsxs("small",{children:["Category #",a.id]})]})]})}),e.jsx("td",{children:e.jsx("span",{className:"gaf-slug",children:a.slug})}),e.jsx("td",{children:e.jsx("span",{className:"gaf-description",children:a.description||"No description provided"})}),e.jsx("td",{children:e.jsx("span",{className:"gaf-order",children:a.sort_order??0})}),e.jsx("td",{children:e.jsxs("span",{className:`gaf-status ${p(a.is_active)?"gaf-status-active":"gaf-status-inactive"}`,children:[e.jsx("span",{}),p(a.is_active)?"Active":"Inactive"]})}),e.jsx("td",{children:e.jsx("span",{className:"gaf-date",children:C(a.created_at)})}),e.jsx("td",{className:"text-end pe-4",children:e.jsxs("div",{className:"gaf-actions",children:[e.jsx("button",{type:"button",className:"gaf-action-btn",onClick:()=>L(a),title:"View category",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsx("button",{type:"button",className:"gaf-action-btn gaf-action-edit",onClick:()=>I(a),title:"Edit category",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsx("button",{type:"button",className:"gaf-action-btn gaf-action-delete",onClick:()=>M(a),title:"Delete category",children:e.jsx("i",{className:"bi bi-trash3"})})]})})]},a.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:"7",children:e.jsxs("div",{className:"gaf-empty-state",children:[e.jsx("div",{className:"gaf-empty-icon",children:e.jsx("i",{className:"bi bi-folder2-open"})}),e.jsx("h6",{children:"No categories found"}),e.jsx("p",{children:"There are no categories matching your current search or filters."}),e.jsxs("button",{type:"button",className:"btn gaf-primary-btn",onClick:E,children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Create Category"]})]})})})})]})}),n?.links&&h.length>0&&e.jsxs("div",{className:"gaf-pagination",children:[e.jsxs("div",{className:"gaf-pagination-info",children:["Showing ",e.jsx("strong",{children:n.from||0})," ","to ",e.jsx("strong",{children:n.to||0})," ","of ",e.jsx("strong",{children:n.total||0})," ","categories"]}),e.jsx("div",{className:"d-flex flex-wrap gap-1",children:n.links.map((a,x)=>e.jsx("button",{type:"button",disabled:!a.url,onClick:()=>T(a.url),className:`gaf-page-link ${a.active?"active":""}`,dangerouslySetInnerHTML:{__html:a.label}},x))})]})]})]}),y&&e.jsx("div",{className:"gaf-category-modal-overlay",onClick:u,children:e.jsxs("div",{className:"gaf-category-modal",role:"dialog","aria-modal":"true","aria-labelledby":"category-modal-title",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"gaf-modal-header",children:[e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("div",{className:"gaf-modal-heading-icon",children:e.jsx("i",{className:`bi ${t==="view"?"bi-folder2-open":t==="edit"?"bi-pencil-square":"bi-folder-plus"}`})}),e.jsxs("div",{children:[e.jsx("h5",{id:"category-modal-title",children:t==="create"?"Create News Category":t==="edit"?"Edit News Category":"Category Details"}),e.jsx("p",{children:t==="view"?"Review the category information.":"Enter the details for this news category."})]})]}),e.jsx("button",{type:"button",className:"gaf-modal-close",onClick:u,disabled:g,"aria-label":"Close modal",children:e.jsx("i",{className:"bi bi-x-lg"})})]}),t==="view"&&s&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gaf-modal-body",children:[e.jsxs("div",{className:"gaf-detail-identity",children:[e.jsx("div",{className:"gaf-detail-icon",children:e.jsx("i",{className:"bi bi-folder2-open"})}),e.jsxs("div",{children:[e.jsx("h4",{children:s.name}),e.jsxs("span",{className:`gaf-status ${p(s.is_active)?"gaf-status-active":"gaf-status-inactive"}`,children:[e.jsx("span",{}),p(s.is_active)?"Active":"Inactive"]})]})]}),e.jsxs("div",{className:"gaf-detail-section",children:[e.jsx("label",{children:"Description"}),e.jsx("p",{children:s.description||"No description has been provided for this category."})]}),e.jsxs("div",{className:"gaf-detail-grid",children:[e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"URL Slug"}),e.jsx("strong",{children:s.slug||"—"})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Display Order"}),e.jsx("strong",{children:s.sort_order??0})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Created At"}),e.jsx("strong",{children:C(s.created_at)})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Last Updated"}),e.jsx("strong",{children:C(s.updated_at)})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Category ID"}),e.jsxs("strong",{children:["#",s.id]})]})]})]}),e.jsxs("div",{className:"gaf-modal-footer",children:[e.jsx("button",{type:"button",className:"btn gaf-cancel-btn",onClick:u,children:"Close"}),e.jsxs("button",{type:"button",className:"btn gaf-primary-btn",onClick:()=>I(s),children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),"Edit Category"]})]})]}),(t==="create"||t==="edit")&&e.jsxs("form",{onSubmit:R,children:[e.jsxs("div",{className:"gaf-modal-body",children:[e.jsxs("div",{className:"gaf-form-intro",children:[e.jsx("h6",{children:"Category Information"}),e.jsxs("p",{children:["Fields marked with"," ",e.jsx("span",{className:"text-danger",children:"*"})," ","are required."]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"gaf-form-label",children:["Category Name",e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.name?"is-invalid":""}`,value:r.name,onChange:a=>o("name",a.target.value),placeholder:"e.g. Research Updates",required:!0}),i.name&&e.jsx("div",{className:"invalid-feedback",children:i.name})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Category Name (Kinyarwanda)"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.name_rw?"is-invalid":""}`,value:r.name_rw,onChange:a=>o("name_rw",a.target.value),placeholder:"Urugero: Amakuru y’ubushakashatsi"}),i.name_rw&&e.jsx("div",{className:"invalid-feedback",children:i.name_rw})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"URL Slug"}),e.jsxs("div",{className:"gaf-slug-input",children:[e.jsx("span",{children:e.jsx("i",{className:"bi bi-link-45deg"})}),e.jsx("input",{type:"text",className:`form-control ${i.slug?"is-invalid":""}`,value:r.slug,onChange:a=>o("slug",a.target.value),placeholder:"research-updates"})]}),i.slug&&e.jsx("div",{className:"text-danger small mt-1",children:i.slug}),e.jsxs("div",{className:"gaf-field-hint",children:[e.jsx("i",{className:"bi bi-info-circle me-1"}),"Used in category URLs. Automatically generated from the category name when creating."]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Description"}),e.jsx("textarea",{rows:"4",className:`form-control gaf-form-control gaf-textarea ${i.description?"is-invalid":""}`,value:r.description,onChange:a=>o("description",a.target.value),placeholder:"Describe the type of news that belongs to this category..."}),i.description&&e.jsx("div",{className:"invalid-feedback",children:i.description})]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"gaf-form-label",children:"Display Order"}),e.jsx("input",{type:"number",min:"0",className:`form-control gaf-form-control ${i.sort_order?"is-invalid":""}`,value:r.sort_order,onChange:a=>o("sort_order",a.target.value)}),i.sort_order&&e.jsx("div",{className:"invalid-feedback",children:i.sort_order})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"gaf-form-label",children:"Category Visibility"}),e.jsxs("label",{className:"gaf-toggle-card",children:[e.jsx("input",{type:"checkbox",checked:!!r.is_active,onChange:a=>o("is_active",a.target.checked)}),e.jsx("span",{className:"gaf-toggle-switch"}),e.jsxs("span",{children:[e.jsx("strong",{children:r.is_active?"Active":"Inactive"}),e.jsx("small",{children:r.is_active?"Available for use":"Hidden from new submissions"})]})]})]})]}),e.jsxs("div",{className:"gaf-information-note mt-4",children:[e.jsx("i",{className:"bi bi-info-circle-fill"}),e.jsx("span",{children:"Inactive categories can be retained for existing records but will not be offered for new public news submissions."})]})]}),e.jsxs("div",{className:"gaf-modal-footer",children:[e.jsx("button",{type:"button",className:"btn gaf-cancel-btn",onClick:u,disabled:g,children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn gaf-primary-btn",disabled:g,children:g?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check-lg me-2"}),t==="edit"?"Update Category":"Create Category"]})})]})]})]})}),e.jsx("style",{children:`
                .gaf-category-page {
                    color: #172033;
                    font-family: inherit;
                    padding-bottom: 25px;
                }

                .gaf-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 15px;
                }

                .gaf-breadcrumb a {
                    color: #718096;
                    text-decoration: none;
                }

                .gaf-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-breadcrumb .active {
                    color: #172033;
                    font-weight: 600;
                }

                .gaf-page-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 28px;
                }

                .gaf-heading-icon {
                    width: 48px;
                    height: 48px;
                    flex-shrink: 0;
                    border-radius: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #20603d;
                    background: #edf3fb;
                    font-size: 21px;
                }

                .gaf-page-title {
                    font-size: 23px;
                    font-weight: 800;
                    letter-spacing: -0.6px;
                    margin: 0 0 5px;
                }

                .gaf-page-subtitle {
                    color: #8290a3;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-primary-btn {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    border-radius: 8px;
                    padding: 10px 17px;
                    font-size: 13px;
                    font-weight: 700;
                    transition: .2s ease;
                }

                .gaf-primary-btn:hover,
                .gaf-primary-btn:focus {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(32, 96, 61,.2);
                }

                .gaf-primary-btn:disabled {
                    opacity: .65;
                }

                .gaf-alert-success,
                .gaf-alert-danger {
                    border: 0;
                    border-radius: 9px;
                    font-size: 13px;
                    padding: 14px 17px;
                }

                .gaf-alert-success {
                    background: #edf8f1;
                    color: #247548;
                }

                .gaf-alert-danger {
                    background: #fff0ef;
                    color: #b53d38;
                }

                .gaf-stat-card {
                    height: 100%;
                    min-height: 132px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 22px;
                    background: #fff;
                    border: 1px solid #edf0f4;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(23,32,51,.025);
                }

                .gaf-stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .gaf-stat-blue {
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-stat-green {
                    background: #eaf7ef;
                    color: #29945b;
                }

                .gaf-stat-orange {
                    background: #fff4e9;
                    color: #d58a3d;
                }

                .gaf-stat-content {
                    position: relative;
                    z-index: 1;
                }

                .gaf-stat-content > span {
                    display: block;
                    color: #758197;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .gaf-stat-content h3 {
                    font-size: 25px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin: 0 0 4px;
                    color: #172033;
                }

                .gaf-stat-content small {
                    color: #9aa4b3;
                    font-size: 10px;
                }

                .gaf-stat-decoration {
                    position: absolute;
                    right: 17px;
                    bottom: -15px;
                    color: #f5f7fa;
                    font-size: 65px;
                }

                .gaf-content-card {
                    background: #fff;
                    border: 1px solid #edf0f4;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 3px 15px rgba(23,32,51,.025);
                }

                .gaf-content-header {
                    padding: 23px 24px 18px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                }

                .gaf-content-header h5 {
                    color: #172033;
                    font-size: 15px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .gaf-content-header p {
                    color: #8994a5;
                    font-size: 12px;
                    margin: 0;
                }

                .gaf-record-count {
                    background: #f4f6f9;
                    color: #69778b;
                    padding: 7px 11px;
                    border-radius: 7px;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-filter-section {
                    padding: 0 24px 20px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-search-box {
                    height: 41px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 12px;
                    background: #fafbfd;
                    border: 1px solid #e8ecf1;
                    border-radius: 7px;
                }

                .gaf-search-box > i {
                    color: #9aa5b4;
                    font-size: 14px;
                }

                .gaf-search-box input {
                    width: 100%;
                    min-width: 0;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    color: #172033;
                    font-size: 12px;
                }

                .gaf-search-box input::placeholder {
                    color: #a3adba;
                }

                .gaf-search-box button {
                    border: 0;
                    background: transparent;
                    color: #8994a5;
                    padding: 3px;
                }

                .gaf-filter-select {
                    height: 41px;
                    background-color: #fafbfd;
                    border-color: #e8ecf1;
                    border-radius: 7px;
                    color: #526176;
                    font-size: 12px;
                    box-shadow: none;
                }

                .gaf-filter-btn {
                    height: 41px;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-filter-btn:hover {
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-clear-btn {
                    width: 41px;
                    height: 41px;
                    flex-shrink: 0;
                    border: 1px solid #e8ecf1;
                    border-radius: 7px;
                    color: #758197;
                    background: #fff;
                }

                .gaf-clear-btn:hover {
                    background: #f4f6f9;
                }

                .gaf-category-table {
                    min-width: 950px;
                }

                .gaf-category-table thead th {
                    background: #fafbfd;
                    color: #8b97a8;
                    border-bottom: 1px solid #edf0f4;
                    padding: 13px 12px;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: .7px;
                    white-space: nowrap;
                }

                .gaf-category-table tbody td {
                    border-bottom: 1px solid #f0f2f5;
                    padding: 14px 12px;
                    color: #536176;
                    font-size: 12px;
                    vertical-align: middle;
                }

                .gaf-category-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .gaf-category-table tbody tr:hover {
                    background: #fbfcfe;
                }

                .gaf-category-identity {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    min-width: 175px;
                }

                .gaf-category-icon {
                    width: 39px;
                    height: 39px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-category-name {
                    color: #26344a;
                    font-size: 12px;
                    font-weight: 800;
                    margin-bottom: 3px;
                }

                .gaf-category-identity small {
                    color: #a0a9b6;
                    font-size: 10px;
                }

                .gaf-slug {
                    display: inline-block;
                    padding: 5px 7px;
                    background: #f4f6f9;
                    border-radius: 5px;
                    color: #65748a;
                    font-family: monospace;
                    font-size: 11px;
                }

                .gaf-description {
                    display: -webkit-box;
                    max-width: 220px;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    color: #8390a1;
                    line-height: 1.5;
                    font-size: 11px;
                }

                .gaf-order {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 27px;
                    height: 26px;
                    padding: 0 7px;
                    border-radius: 6px;
                    background: #f4f6f9;
                    color: #637187;
                    font-size: 11px;
                    font-weight: 700;
                }

                .gaf-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 9px;
                    border-radius: 30px;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-status > span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .gaf-status-active {
                    background: #eaf7ef;
                    color: #278451;
                }

                .gaf-status-active > span {
                    background: #2caa68;
                }

                .gaf-status-inactive {
                    background: #f0f2f5;
                    color: #7c8796;
                }

                .gaf-status-inactive > span {
                    background: #9aa4b1;
                }

                .gaf-date {
                    color: #8793a4;
                    font-size: 11px;
                    white-space: nowrap;
                }

                .gaf-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 5px;
                }

                .gaf-action-btn {
                    width: 31px;
                    height: 31px;
                    border: 1px solid #e9edf2;
                    border-radius: 7px;
                    background: #fff;
                    color: #77859a;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: .2s ease;
                }

                .gaf-action-btn:hover {
                    background: #f2f5f9;
                    color: #172033;
                }

                .gaf-action-edit:hover {
                    background: #f1f8f4;
                    border-color: #e4f0e9;
                    color: #20603d;
                }

                .gaf-action-delete:hover {
                    background: #fff0ef;
                    border-color: #f8d9d7;
                    color: #d64b45;
                }

                .gaf-empty-state {
                    padding: 55px 20px;
                    text-align: center;
                }

                .gaf-empty-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    background: #f1f5fa;
                    color: #8fc6a7;
                    font-size: 25px;
                }

                .gaf-empty-state h6 {
                    color: #26344a;
                    font-size: 14px;
                    font-weight: 800;
                    margin-bottom: 7px;
                }

                .gaf-empty-state p {
                    color: #929eae;
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                .gaf-pagination {
                    padding: 17px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    border-top: 1px solid #edf0f4;
                }

                .gaf-pagination-info {
                    color: #8994a5;
                    font-size: 11px;
                }

                .gaf-pagination-info strong {
                    color: #435168;
                }

                .gaf-page-link {
                    min-width: 31px;
                    height: 31px;
                    padding: 0 8px;
                    border: 1px solid #e9edf2;
                    border-radius: 6px;
                    background: #fff;
                    color: #68778c;
                    font-size: 11px;
                }

                .gaf-page-link.active {
                    border-color: #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-page-link:disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                /* Modal overlay: the entire modal scrolls as one unit */
                .gaf-category-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;
                    display: block;
                    overflow-x: hidden;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    box-sizing: border-box;
                    padding: 25px 16px;
                    background: rgba(16, 27, 45, .58);
                    backdrop-filter: blur(3px);
                }

                .gaf-category-modal {
                    width: 100%;
                    max-width: 660px;
                    height: auto;
                    max-height: none;
                    margin: 0 auto;
                    overflow: visible;
                    border-radius: 13px;
                    background: #fff;
                    box-shadow: 0 20px 70px rgba(0,0,0,.2);
                    box-sizing: border-box;
                }

                .gaf-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 21px 25px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-modal-heading-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 18px;
                }

                .gaf-modal-header h5 {
                    margin: 0 0 4px;
                    color: #172033;
                    font-size: 15px;
                    font-weight: 800;
                }

                .gaf-modal-header p {
                    margin: 0;
                    color: #929eae;
                    font-size: 11px;
                }

                .gaf-modal-close {
                    width: 33px;
                    height: 33px;
                    border: 0;
                    border-radius: 7px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    background: #f3f5f8;
                    color: #78869a;
                }

                .gaf-modal-close:hover {
                    background: #e9edf2;
                    color: #172033;
                }

                .gaf-modal-body {
                    padding: 25px;
                    overflow: visible;
                }

                .gaf-modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 9px;
                    padding: 17px 25px;
                    border-top: 1px solid #edf0f4;
                    background: #fff;
                }

                .gaf-cancel-btn {
                    border: 1px solid #e4e8ee;
                    border-radius: 7px;
                    padding: 9px 17px;
                    background: #fff;
                    color: #69778b;
                    font-size: 12px;
                    font-weight: 700;
                }

                .gaf-cancel-btn:hover {
                    background: #f5f7f9;
                    color: #26344a;
                }

                .gaf-form-intro {
                    margin-bottom: 23px;
                }

                .gaf-form-intro h6 {
                    color: #26344a;
                    font-size: 13px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .gaf-form-intro p {
                    color: #929eae;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-form-label {
                    display: block;
                    color: #344258;
                    font-size: 11px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .gaf-form-control {
                    min-height: 42px;
                    border: 1px solid #e4e9ef;
                    border-radius: 7px;
                    color: #26344a;
                    font-size: 12px;
                    box-shadow: none !important;
                }

                .gaf-form-control:focus {
                    border-color: #9acbaf;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.1) !important;
                }

                .gaf-form-control::placeholder {
                    color: #a9b2bf;
                }

                .gaf-textarea {
                    min-height: 105px;
                    resize: vertical;
                }

                .gaf-slug-input {
                    display: flex;
                    align-items: stretch;
                }

                .gaf-slug-input > span {
                    width: 40px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e4e9ef;
                    border-right: 0;
                    border-radius: 7px 0 0 7px;
                    background: #f7f9fb;
                    color: #8392a6;
                }

                .gaf-slug-input input {
                    border-radius: 0 7px 7px 0;
                }

                .gaf-field-hint {
                    color: #9aa5b3;
                    font-size: 10px;
                    margin-top: 7px;
                }

                .gaf-toggle-card {
                    min-height: 65px;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    padding: 10px 12px;
                    border: 1px solid #e5eaf0;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .gaf-toggle-card input {
                    position: absolute;
                    opacity: 0;
                    pointer-events: none;
                }

                .gaf-toggle-switch {
                    position: relative;
                    width: 34px;
                    height: 19px;
                    flex-shrink: 0;
                    border-radius: 20px;
                    background: #cbd2dc;
                    transition: .2s ease;
                }

                .gaf-toggle-switch::after {
                    content: "";
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #fff;
                    transition: .2s ease;
                }

                .gaf-toggle-card input:checked + .gaf-toggle-switch {
                    background: #20603d;
                }

                .gaf-toggle-card input:checked + .gaf-toggle-switch::after {
                    transform: translateX(15px);
                }

                .gaf-toggle-card strong {
                    display: block;
                    color: #344258;
                    font-size: 11px;
                }

                .gaf-toggle-card small {
                    display: block;
                    color: #9aa5b3;
                    font-size: 9px;
                    margin-top: 3px;
                }

                .gaf-information-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 12px 14px;
                    border-radius: 7px;
                    background: #f1f6fc;
                    color: #6e83a1;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-information-note i {
                    color: #20603d;
                    font-size: 13px;
                    margin-top: 1px;
                }

                .gaf-detail-identity {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 28px;
                }

                .gaf-detail-icon {
                    width: 58px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 13px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 25px;
                }

                .gaf-detail-identity h4 {
                    color: #26344a;
                    font-size: 17px;
                    font-weight: 800;
                    margin: 0 0 8px;
                }

                .gaf-detail-section {
                    padding: 17px;
                    margin-bottom: 20px;
                    border: 1px solid #edf0f4;
                    border-radius: 9px;
                }

                .gaf-detail-section label {
                    display: block;
                    color: #929eae;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                    margin-bottom: 9px;
                }

                .gaf-detail-section p {
                    color: #526176;
                    font-size: 12px;
                    line-height: 1.7;
                    margin: 0;
                    white-space: pre-wrap;
                }

                .gaf-detail-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 11px;
                }

                .gaf-detail-item {
                    min-width: 0;
                    padding: 14px;
                    border: 1px solid #edf0f4;
                    border-radius: 8px;
                    background: #fafbfd;
                }

                .gaf-detail-item span {
                    display: block;
                    color: #929eae;
                    font-size: 10px;
                    margin-bottom: 7px;
                }

                .gaf-detail-item strong {
                    display: block;
                    overflow-wrap: anywhere;
                    color: #344258;
                    font-size: 12px;
                    font-weight: 700;
                }

                @media (max-width: 767px) {
                    .gaf-page-heading {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-page-heading > button {
                        width: 100%;
                    }

                    .gaf-page-title {
                        font-size: 20px;
                    }

                    .gaf-content-header {
                        padding: 19px 16px 15px;
                    }

                    .gaf-filter-section {
                        padding: 0 16px 17px;
                    }

                    .gaf-pagination {
                        align-items: flex-start;
                        flex-direction: column;
                        padding: 15px 16px;
                    }

                    .gaf-category-modal-overlay {
                        padding: 10px;
                    }

                    .gaf-category-modal {
                        width: 100%;
                        max-width: none;
                        max-height: none;
                        margin: 0 auto;
                    }

                    .gaf-modal-header {
                        padding: 17px;
                    }

                    .gaf-modal-body {
                        padding: 19px 17px;
                    }

                    .gaf-modal-footer {
                        padding: 14px 17px;
                    }

                    .gaf-detail-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-stat-card {
                        padding: 17px;
                    }

                    .gaf-stat-decoration {
                        font-size: 52px;
                    }

                    .gaf-modal-heading-icon {
                        width: 37px;
                        height: 37px;
                    }

                    .gaf-modal-header h5 {
                        font-size: 13px;
                    }

                    .gaf-modal-header p {
                        max-width: 210px;
                        line-height: 1.5;
                    }

                    .gaf-modal-footer {
                        flex-direction: column-reverse;
                    }

                    .gaf-modal-footer .btn {
                        width: 100%;
                    }
                }
            `})]})}export{W as default};
