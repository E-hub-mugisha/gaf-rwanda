import{r as h,u as N,j as e,H as y,L as i,a as p}from"./app-B2r5GH2N.js";import{A as k}from"./AdminLayout-CCuR1VdT.js";import"./adminI18n-CmBL3FjY.js";import"./Language-ChUCrwIh.js";const g=a=>{if(!a)return"Not set";const o=new Date(/^\d{4}-\d{2}-\d{2}$/.test(a)?`${a}T00:00:00`:a);return Number.isNaN(o.getTime())?a:new Intl.DateTimeFormat("en",{day:"numeric",month:"short",year:"numeric"}).format(o)},z={active:{label:"Active",className:"status-active",icon:"bi-check-circle-fill"},inactive:{label:"Inactive",className:"status-inactive",icon:"bi-pause-circle-fill"},completed:{label:"Completed",className:"status-completed",icon:"bi-flag-fill"}};function F({programs:a,filters:o={},statistics:n={}}){const[t,c]=h.useState(o.search||""),[l,m]=h.useState(o.status||"all"),{flash:x}=N().props,f=a?.data||[],b=[{label:"Total programs",value:n.total??a?.total??0,description:"All registered programs",icon:"bi-collection",color:"blue"},{label:"Active programs",value:n.active??0,description:"Currently running",icon:"bi-activity",color:"green"},{label:"Completed",value:n.completed??0,description:"Successfully completed",icon:"bi-flag",color:"purple"},{label:"Featured",value:n.featured??0,description:"Highlighted on the website",icon:"bi-star",color:"orange"}],u=r=>{r.preventDefault(),p.get(route("admin.programs.index"),{search:t.trim(),status:l},{preserveState:!0,preserveScroll:!0,replace:!0})},d=()=>{c(""),m("all"),p.get(route("admin.programs.index"),{},{preserveState:!0,preserveScroll:!0,replace:!0})},j=r=>{window.confirm(`Delete "${r.title}"?

This action cannot be undone.`)&&p.delete(route("admin.programs.destroy",r.id),{preserveScroll:!0})},v=r=>z[r]||{label:r||"Unknown",className:"status-inactive",icon:"bi-question-circle"},w=!!o.search||!!(o.status&&o.status!=="all");return e.jsxs(k,{title:"Programs",children:[e.jsx(y,{title:"Programs Management"}),e.jsxs("div",{className:"programs-page",children:[e.jsxs("div",{className:"programs-heading",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"programs-breadcrumb",children:[e.jsx("span",{children:"Administration"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{children:"Content Management"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{className:"current",children:"Programs"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2 mb-2",children:[e.jsx("div",{className:"programs-heading-icon",children:e.jsx("i",{className:"bi bi-collection"})}),e.jsx("h2",{children:"Programs"})]}),e.jsx("p",{children:"Manage your organization's programs, monitor their progress, and control what appears on the public website."})]}),e.jsxs(i,{href:route("admin.programs.create"),className:"btn programs-add-button",children:[e.jsx("i",{className:"bi bi-plus-lg"}),"Add New Program"]})]}),x?.success&&e.jsxs("div",{className:"programs-alert",role:"alert",children:[e.jsx("i",{className:"bi bi-check-circle-fill"}),e.jsx("span",{children:x.success})]}),e.jsx("div",{className:"row g-3 programs-statistics",children:b.map(r=>e.jsx("div",{className:"col-6 col-xl-3",children:e.jsxs("div",{className:"program-stat-card",children:[e.jsxs("div",{className:"program-stat-top",children:[e.jsx("div",{className:`program-stat-icon ${r.color}`,children:e.jsx("i",{className:`bi ${r.icon}`})}),e.jsx("i",{className:"bi bi-three-dots stat-more"})]}),e.jsx("div",{className:"program-stat-value",children:r.value}),e.jsx("div",{className:"program-stat-label",children:r.label}),e.jsx("div",{className:"program-stat-description",children:r.description})]})},r.label))}),e.jsxs("div",{className:"programs-content",children:[e.jsxs("div",{className:"programs-content-header",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"Program directory"}),e.jsx("p",{children:"Browse and manage all programs registered in GAF Rwanda."})]}),e.jsxs("span",{className:"programs-total",children:[e.jsx("i",{className:"bi bi-grid me-2"}),a?.total??0," programs"]})]}),e.jsxs("div",{className:"programs-filter-area",children:[e.jsx("form",{onSubmit:u,children:e.jsxs("div",{className:"row g-3 align-items-end",children:[e.jsxs("div",{className:"col-lg-7",children:[e.jsx("label",{htmlFor:"program-search",className:"program-field-label",children:"Search programs"}),e.jsxs("div",{className:"program-search-box",children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{id:"program-search",type:"search",value:t,onChange:r=>c(r.target.value),placeholder:"Search by title, slug or description..."}),t&&e.jsx("button",{type:"button",onClick:()=>c(""),"aria-label":"Clear search",children:e.jsx("i",{className:"bi bi-x-circle"})})]})]}),e.jsxs("div",{className:"col-sm-6 col-lg-3",children:[e.jsx("label",{htmlFor:"program-status",className:"program-field-label",children:"Filter by status"}),e.jsxs("select",{id:"program-status",className:"program-filter-select",value:l,onChange:r=>m(r.target.value),children:[e.jsx("option",{value:"all",children:"All statuses"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"Inactive"}),e.jsx("option",{value:"completed",children:"Completed"})]})]}),e.jsx("div",{className:"col-sm-6 col-lg-2",children:e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"submit",className:"btn programs-search-button flex-grow-1",children:[e.jsx("i",{className:"bi bi-funnel me-1"}),"Filter"]}),e.jsx("button",{type:"button",onClick:d,className:"program-reset-button",title:"Reset filters","aria-label":"Reset filters",children:e.jsx("i",{className:"bi bi-arrow-counterclockwise"})})]})})]})}),w&&e.jsxs("div",{className:"program-active-filters",children:[e.jsx("span",{children:"Active filters:"}),o.search&&e.jsxs("span",{className:"program-filter-chip",children:[e.jsx("i",{className:"bi bi-search me-1"}),o.search]}),o.status&&o.status!=="all"&&e.jsxs("span",{className:"program-filter-chip",children:[e.jsx("i",{className:"bi bi-funnel me-1"}),o.status]}),e.jsx("button",{type:"button",onClick:d,children:"Clear all"})]})]}),e.jsxs("div",{className:"programs-grid-heading",children:[e.jsxs("div",{children:[e.jsxs("h6",{children:["All programs",e.jsx("span",{children:a?.total??0})]}),e.jsx("p",{children:"Select a program to view its details or manage its information."})]}),e.jsxs("div",{className:"program-view-label",children:[e.jsx("i",{className:"bi bi-grid-3x3-gap-fill"}),"Card view"]})]}),f.length>0?e.jsx("div",{className:"row g-4 programs-grid",children:f.map(r=>{const s=v(r.status);return e.jsx("div",{className:"col-md-6 col-xl-4",children:e.jsxs("div",{className:"program-card",children:[e.jsxs("div",{className:"program-card-cover",children:[r.cover_image?e.jsx("img",{src:`/uploads/${r.cover_image}`,alt:r.title}):e.jsxs("div",{className:"program-cover-placeholder",children:[e.jsx("i",{className:"bi bi-image"}),e.jsx("span",{children:"No cover image"})]}),e.jsx("div",{className:"program-cover-overlay"}),e.jsxs("span",{className:`program-card-status ${s.className}`,children:[e.jsx("i",{className:`bi ${s.icon}`}),s.label]}),r.is_featured&&e.jsxs("span",{className:"program-featured-tag",children:[e.jsx("i",{className:"bi bi-star-fill"}),"Featured"]}),e.jsxs("div",{className:"program-cover-number",children:["#",r.sort_order??0]})]}),e.jsxs("div",{className:"program-card-body",children:[e.jsxs("div",{className:"program-card-category",children:[e.jsx("i",{className:"bi bi-folder2-open"}),"ORGANIZATION PROGRAM"]}),e.jsx(i,{href:route("admin.programs.show",r.id),className:"program-card-title",children:r.title}),e.jsxs("div",{className:"program-card-slug",children:["/",r.slug]}),e.jsx("p",{className:"program-card-description",children:r.short_description||"No short description has been added for this program yet."}),e.jsxs("div",{className:"program-card-dates",children:[e.jsxs("div",{children:[e.jsx("span",{className:"date-icon",children:e.jsx("i",{className:"bi bi-calendar-event"})}),e.jsxs("div",{children:[e.jsx("small",{children:"Start date"}),e.jsx("strong",{children:g(r.start_date)})]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"date-icon",children:e.jsx("i",{className:"bi bi-calendar-check"})}),e.jsxs("div",{children:[e.jsx("small",{children:"End date"}),e.jsx("strong",{children:g(r.end_date)})]})]})]}),e.jsxs("div",{className:"program-card-footer",children:[e.jsxs("div",{className:"program-created",children:[e.jsx("i",{className:"bi bi-clock-history"}),"Created ",g(r.created_at)]}),e.jsxs("div",{className:"program-card-actions",children:[e.jsx(i,{href:route("admin.programs.show",r.id),className:"program-card-action view",title:"View program","aria-label":"View program",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsx(i,{href:route("admin.programs.edit",r.id),className:"program-card-action edit",title:"Edit program","aria-label":"Edit program",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsx("button",{type:"button",onClick:()=>j(r),className:"program-card-action delete",title:"Delete program","aria-label":`Delete ${r.title}`,children:e.jsx("i",{className:"bi bi-trash3"})})]})]})]})]})},r.id)})}):e.jsxs("div",{className:"programs-empty-state",children:[e.jsx("div",{className:"programs-empty-icon",children:e.jsx("i",{className:"bi bi-folder2-open"})}),e.jsx("h5",{children:"No programs found"}),e.jsx("p",{children:t||l!=="all"?"No programs match your current search or filters. Try adjusting your selection.":"There are no programs yet. Create your first program to get started."}),t||l!=="all"?e.jsxs("button",{type:"button",onClick:d,className:"btn programs-empty-button",children:[e.jsx("i",{className:"bi bi-arrow-counterclockwise me-2"}),"Clear filters"]}):e.jsxs(i,{href:route("admin.programs.create"),className:"btn programs-empty-button",children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Create first program"]})]}),a?.last_page>1&&e.jsxs("div",{className:"programs-pagination",children:[e.jsxs("div",{children:["Showing ",e.jsx("strong",{children:a.from})," to"," ",e.jsx("strong",{children:a.to})," of"," ",e.jsx("strong",{children:a.total})," programs"]}),e.jsx("nav",{"aria-label":"Programs pagination",children:e.jsx("ul",{className:"pagination mb-0",children:(a.links||[]).map((r,s)=>e.jsx("li",{className:`page-item ${r.active?"active":""} ${r.url?"":"disabled"}`,children:r.url?e.jsx(i,{href:r.url,preserveScroll:!0,className:"page-link",dangerouslySetInnerHTML:{__html:r.label}}):e.jsx("span",{className:"page-link",dangerouslySetInnerHTML:{__html:r.label}})},s))})})]})]}),e.jsx("style",{children:`
                    .programs-page {
                        width: 100%;
                        color: #263449;
                    }

                    .programs-heading {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        gap: 20px;
                        margin-bottom: 25px;
                    }

                    .programs-breadcrumb {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-bottom: 12px;
                        color: #98a3b3;
                        font-size: 10px;
                        font-weight: 600;
                    }

                    .programs-breadcrumb i {
                        font-size: 8px;
                    }

                    .programs-breadcrumb .current {
                        color: #20603d;
                    }

                    .programs-heading-icon {
                        width: 34px;
                        height: 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 8px;
                        background: #f1f8f4;
                        color: #20603d;
                        font-size: 16px;
                    }

                    .programs-heading h2 {
                        margin: 0;
                        color: #172033;
                        font-size: 25px;
                        font-weight: 800;
                        letter-spacing: -.7px;
                    }

                    .programs-heading p {
                        margin: 0;
                        color: #8490a1;
                        font-size: 12px;
                        line-height: 1.7;
                    }

                    .programs-add-button {
                        min-height: 42px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 9px;
                        padding: 0 17px;
                        border: 0;
                        border-radius: 8px;
                        background: #20603d;
                        color: #fff;
                        font-size: 11px;
                        font-weight: 700;
                        white-space: nowrap;
                        box-shadow: 0 4px 10px rgba(32, 96, 61,.16);
                    }

                    .programs-add-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .programs-alert {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 13px 16px;
                        margin-bottom: 20px;
                        border: 1px solid #d6efdf;
                        border-radius: 9px;
                        background: #effaf3;
                        color: #287747;
                        font-size: 11px;
                    }

                    .programs-alert i {
                        font-size: 16px;
                    }

                    .programs-statistics {
                        margin-bottom: 25px;
                    }

                    .program-stat-card {
                        height: 100%;
                        min-height: 145px;
                        padding: 18px;
                        border: 1px solid #edf0f4;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: 0 3px 12px rgba(28,43,64,.025);
                        transition: .2s ease;
                    }

                    .program-stat-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(28,43,64,.06);
                    }

                    .program-stat-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    .program-stat-icon {
                        width: 38px;
                        height: 38px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 9px;
                        font-size: 17px;
                    }

                    .program-stat-icon.blue {
                        background: #f1f8f4;
                        color: #20603d;
                    }

                    .program-stat-icon.green {
                        background: #eaf7ef;
                        color: #369762;
                    }

                    .program-stat-icon.purple {
                        background: #f2effc;
                        color: #8066bd;
                    }

                    .program-stat-icon.orange {
                        background: #fff4e9;
                        color: #d18a3c;
                    }

                    .stat-more {
                        color: #b5bec9;
                    }

                    .program-stat-value {
                        margin-top: 13px;
                        color: #1e2b40;
                        font-size: 25px;
                        line-height: 1;
                        font-weight: 800;
                    }

                    .program-stat-label {
                        margin-top: 7px;
                        color: #4a5668;
                        font-size: 11px;
                        font-weight: 700;
                    }

                    .program-stat-description {
                        margin-top: 4px;
                        color: #9aa4b2;
                        font-size: 9px;
                    }

                    .programs-content {
                        overflow: hidden;
                        border: 1px solid #e9edf2;
                        border-radius: 11px;
                        background: #fff;
                        box-shadow: 0 3px 14px rgba(28,43,64,.025);
                    }

                    .programs-content-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                        padding: 20px 22px;
                    }

                    .programs-content-header h5 {
                        margin: 0 0 5px;
                        color: #25334a;
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .programs-content-header p {
                        margin: 0;
                        color: #929dac;
                        font-size: 10px;
                    }

                    .programs-total {
                        padding: 7px 11px;
                        border: 1px solid #edf0f4;
                        border-radius: 7px;
                        color: #7e8999;
                        font-size: 10px;
                        white-space: nowrap;
                    }

                    .programs-filter-area {
                        padding: 17px 22px;
                        border-top: 1px solid #edf0f4;
                        border-bottom: 1px solid #edf0f4;
                        background: #fafbfd;
                    }

                    .program-field-label {
                        display: block;
                        margin-bottom: 7px;
                        color: #526074;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .program-search-box {
                        height: 40px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 0 12px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                    }

                    .program-search-box:focus-within {
                        border-color: #99cbaf;
                        box-shadow: 0 0 0 3px rgba(32, 96, 61,.09);
                    }

                    .program-search-box > i {
                        color: #9aa5b4;
                        font-size: 13px;
                    }

                    .program-search-box input {
                        width: 100%;
                        min-width: 0;
                        border: 0;
                        outline: 0;
                        background: transparent;
                        color: #344054;
                        font-size: 10px;
                    }

                    .program-search-box input::placeholder {
                        color: #a5afbc;
                    }

                    .program-search-box button {
                        border: 0;
                        background: transparent;
                        color: #98a3b1;
                    }

                    .program-filter-select {
                        width: 100%;
                        height: 40px;
                        padding: 0 11px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                        color: #526074;
                        font-size: 10px;
                        outline: none;
                    }

                    .program-filter-select:focus {
                        border-color: #99cbaf;
                        box-shadow: 0 0 0 3px rgba(32, 96, 61,.09);
                    }

                    .programs-search-button {
                        min-height: 40px;
                        padding: 0 12px;
                        border: 0;
                        border-radius: 7px;
                        background: #20603d;
                        color: #fff;
                        font-size: 10px;
                        font-weight: 700;
                        white-space: nowrap;
                    }

                    .programs-search-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .program-reset-button {
                        width: 40px;
                        height: 40px;
                        flex: 0 0 40px;
                        border: 1px solid #e4e9ef;
                        border-radius: 7px;
                        background: #fff;
                        color: #69778b;
                    }

                    .program-reset-button:hover {
                        background: #f1f5fa;
                        color: #174a2f;
                    }

                    .program-active-filters {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 13px;
                        color: #8994a3;
                        font-size: 9px;
                    }

                    .program-filter-chip {
                        padding: 5px 9px;
                        border-radius: 5px;
                        background: #f1f8f4;
                        color: #174a2f;
                        font-weight: 700;
                    }

                    .program-active-filters button {
                        padding: 0;
                        border: 0;
                        background: transparent;
                        color: #20603d;
                        font-size: 9px;
                        font-weight: 700;
                    }

                    .programs-grid-heading {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                        padding: 20px 22px 5px;
                    }

                    .programs-grid-heading h6 {
                        display: flex;
                        align-items: center;
                        gap: 9px;
                        margin: 0 0 5px;
                        color: #344054;
                        font-size: 12px;
                        font-weight: 800;
                    }

                    .programs-grid-heading h6 span {
                        padding: 3px 7px;
                        border-radius: 5px;
                        background: #f1f8f4;
                        color: #20603d;
                        font-size: 9px;
                    }

                    .programs-grid-heading p {
                        margin: 0;
                        color: #929dac;
                        font-size: 9px;
                    }

                    .program-view-label {
                        display: flex;
                        align-items: center;
                        gap: 7px;
                        color: #8290a2;
                        font-size: 9px;
                        font-weight: 700;
                    }

                    .program-view-label i {
                        color: #20603d;
                    }

                    .programs-grid {
                        padding: 17px 22px 23px;
                    }

                    .program-card {
                        height: 100%;
                        overflow: hidden;
                        border: 1px solid #e9edf2;
                        border-radius: 10px;
                        background: #fff;
                        transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
                    }

                    .program-card:hover {
                        transform: translateY(-4px);
                        border-color: #dbece2;
                        box-shadow: 0 10px 25px rgba(28,43,64,.08);
                    }

                    .program-card-cover {
                        position: relative;
                        height: 175px;
                        overflow: hidden;
                        background: #edf1f6;
                    }

                    .program-card-cover > img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform .35s ease;
                    }

                    .program-card:hover .program-card-cover > img {
                        transform: scale(1.04);
                    }

                    .program-cover-placeholder {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: #edf3fa;
                        color: #91a3ba;
                    }

                    .program-cover-placeholder i {
                        font-size: 32px;
                    }

                    .program-cover-placeholder span {
                        font-size: 9px;
                        font-weight: 600;
                    }

                    .program-cover-overlay {
                        position: absolute;
                        inset: 0;
                        background: transparent;
                        pointer-events: none;
                    }

                    .program-card-status {
                        position: absolute;
                        top: 12px;
                        left: 12px;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 9px;
                        border-radius: 20px;
                        background: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        box-shadow: 0 2px 8px rgba(0,0,0,.08);
                    }

                    .program-card-status.status-active {
                        color: #328355;
                    }

                    .program-card-status.status-inactive {
                        color: #7c8795;
                    }

                    .program-card-status.status-completed {
                        color: #20603d;
                    }

                    .program-featured-tag {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                        padding: 6px 9px;
                        border-radius: 20px;
                        background: #fff6e7;
                        color: #b77b25;
                        font-size: 9px;
                        font-weight: 700;
                        box-shadow: 0 2px 8px rgba(0,0,0,.06);
                    }

                    .program-cover-number {
                        position: absolute;
                        right: 12px;
                        bottom: 12px;
                        padding: 5px 8px;
                        border: 1px solid rgba(255,255,255,.25);
                        border-radius: 5px;
                        background: rgba(22,34,52,.55);
                        color: #fff;
                        font-size: 9px;
                        font-weight: 700;
                        backdrop-filter: blur(5px);
                    }

                    .program-card-body {
                        display: flex;
                        flex-direction: column;
                        padding: 17px;
                    }

                    .program-card-category {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        margin-bottom: 9px;
                        color: #8c9aab;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: .65px;
                    }

                    .program-card-category i {
                        color: #20603d;
                        font-size: 11px;
                    }

                    .program-card-title {
                        display: block;
                        overflow: hidden;
                        color: #263449;
                        font-size: 14px;
                        font-weight: 800;
                        line-height: 1.45;
                        text-decoration: none;
                        text-overflow: ellipsis;
                    }

                    .program-card-title:hover {
                        color: #20603d;
                    }

                    .program-card-slug {
                        overflow: hidden;
                        margin-top: 3px;
                        color: #a0aab7;
                        font-size: 9px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .program-card-description {
                        display: -webkit-box;
                        min-height: 48px;
                        overflow: hidden;
                        margin: 12px 0 15px;
                        color: #7d8999;
                        font-size: 10px;
                        line-height: 1.7;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                    }

                    .program-card-dates {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 9px;
                        padding: 12px 0;
                        border-top: 1px solid #f0f2f5;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .program-card-dates > div {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        min-width: 0;
                    }

                    .date-icon {
                        width: 30px;
                        height: 30px;
                        flex: 0 0 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 7px;
                        background: #f1f5fa;
                        color: #20603d;
                        font-size: 12px;
                    }

                    .program-card-dates small {
                        display: block;
                        margin-bottom: 3px;
                        color: #a0aab7;
                        font-size: 8px;
                    }

                    .program-card-dates strong {
                        display: block;
                        color: #526074;
                        font-size: 9px;
                        font-weight: 700;
                        white-space: nowrap;
                    }

                    .program-card-footer {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                        padding-top: 13px;
                    }

                    .program-created {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: #9aa4b2;
                        font-size: 8px;
                        white-space: nowrap;
                    }

                    .program-card-actions {
                        display: flex;
                        gap: 5px;
                    }

                    .program-card-action {
                        width: 29px;
                        height: 29px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #e8ecf1;
                        border-radius: 6px;
                        background: #fff;
                        color: #748195;
                        font-size: 11px;
                        text-decoration: none;
                        transition: .15s ease;
                    }

                    .program-card-action:hover {
                        border-color: #d0e6da;
                        background: #f1f6fc;
                        color: #20603d;
                    }

                    .program-card-action.delete:hover {
                        border-color: #f0d1d1;
                        background: #fff3f3;
                        color: #c34f4f;
                    }

                    .programs-empty-state {
                        padding: 65px 20px;
                        text-align: center;
                    }

                    .programs-empty-icon {
                        width: 60px;
                        height: 60px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 15px;
                        border-radius: 15px;
                        background: #f1f5fa;
                        color: #20603d;
                        font-size: 25px;
                    }

                    .programs-empty-state h5 {
                        margin-bottom: 7px;
                        color: #344054;
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .programs-empty-state p {
                        max-width: 390px;
                        margin: 0 auto 18px;
                        color: #929dac;
                        font-size: 10px;
                        line-height: 1.7;
                    }

                    .programs-empty-button {
                        padding: 9px 15px;
                        border: 0;
                        border-radius: 7px;
                        background: #20603d;
                        color: #fff;
                        font-size: 10px;
                        font-weight: 700;
                    }

                    .programs-empty-button:hover {
                        background: #174a2f;
                        color: #fff;
                    }

                    .programs-pagination {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 15px;
                        padding: 15px 22px;
                        border-top: 1px solid #edf0f4;
                        color: #8d98a7;
                        font-size: 9px;
                    }

                    .programs-pagination strong {
                        color: #4a586c;
                    }

                    .programs-pagination .page-link {
                        min-width: 30px;
                        min-height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: 4px;
                        border: 1px solid #e8ecf1;
                        border-radius: 6px !important;
                        color: #66758a;
                        font-size: 10px;
                    }

                    .programs-pagination .page-item.active .page-link {
                        border-color: #20603d;
                        background: #20603d;
                        color: #fff;
                    }

                    .programs-pagination .page-item.disabled .page-link {
                        color: #b9c1cc;
                        background: #fafbfd;
                    }

                    @media (max-width: 767px) {
                        .programs-heading {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .programs-add-button {
                            width: 100%;
                        }

                        .programs-heading h2 {
                            font-size: 22px;
                        }

                        .programs-content-header {
                            align-items: flex-start;
                            flex-direction: column;
                            padding: 17px;
                        }

                        .programs-filter-area {
                            padding: 16px;
                        }

                        .programs-grid {
                            padding: 15px;
                        }

                        .programs-grid-heading {
                            padding: 18px 16px 5px;
                        }

                        .programs-pagination {
                            align-items: flex-start;
                            flex-direction: column;
                            padding: 15px;
                        }
                    }

                    @media (max-width: 420px) {
                        .program-stat-card {
                            min-height: 135px;
                            padding: 14px;
                        }

                        .program-stat-value {
                            font-size: 22px;
                        }

                        .programs-grid-heading {
                            align-items: flex-start;
                            flex-direction: column;
                        }

                        .program-card-cover {
                            height: 155px;
                        }
                    }
                `})]})]})}export{F as default};
