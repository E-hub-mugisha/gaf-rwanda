import{u,j as e,H as b,L as i,a as d}from"./app-BqJN-hOp.js";import{A as j}from"./AdminLayout-rP-hubzG.js";import"./adminI18n-C9DLtJ83.js";import"./Language-ChUCrwIh.js";const y=s=>{if(!s)return"Not scheduled";const a=new Date(s);return Number.isNaN(a.getTime())?"Not scheduled":a.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})},g={draft:{label:"Draft",className:"gaf-event-status--draft",icon:"bi-file-earmark"},published:{label:"Published",className:"gaf-event-status--published",icon:"bi-check-circle"},cancelled:{label:"Cancelled",className:"gaf-event-status--cancelled",icon:"bi-x-circle"}};function C({events:s,filters:a={},categories:x=[],stats:r={}}){const{flash:l}=u().props,f=s?.data||[],o=(t,n)=>{d.get(route("admin.events.index"),{...a,[t]:n,page:1},{preserveState:!0,preserveScroll:!0,replace:!0})},p=()=>{d.get(route("admin.events.index"),{},{preserveState:!0,preserveScroll:!0,replace:!0})},c=!!(a.search||a.status||a.category||a.date_filter),h=t=>{window.confirm(`Are you sure you want to delete "${t.title}"?`)&&d.delete(route("admin.events.destroy",t.id),{preserveScroll:!0})},v=[{label:"Total events",value:r.total||0,icon:"bi-calendar-event",color:"blue",description:"All recorded events"},{label:"Published",value:r.published||0,icon:"bi-check-circle",color:"green",description:"Visible to the public"},{label:"Drafts",value:r.draft||0,icon:"bi-file-earmark-text",color:"orange",description:"Awaiting publication"},{label:"Upcoming",value:r.upcoming||0,icon:"bi-clock-history",color:"purple",description:"Scheduled events"}];return e.jsxs(j,{title:"Events",children:[e.jsx(b,{title:"Events"}),e.jsxs("div",{className:"gaf-events-page",children:[e.jsxs("div",{className:"gaf-events-heading",children:[e.jsxs("div",{children:[e.jsx("div",{className:"gaf-events-eyebrow",children:"CONTENT MANAGEMENT"}),e.jsx("h2",{children:"Events"}),e.jsx("p",{children:"Organise GAF Rwanda events, manage schedules and keep your audience informed."})]}),e.jsxs(i,{href:route("admin.events.create"),className:"gaf-events-create-btn",children:[e.jsx("i",{className:"bi bi-plus-lg"}),e.jsx("span",{children:"Create event"})]})]}),l?.success&&e.jsxs("div",{className:"alert alert-success alert-dismissible fade show gaf-events-alert",children:[e.jsx("i",{className:"bi bi-check-circle-fill me-2"}),l.success,e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]}),l?.error&&e.jsxs("div",{className:"alert alert-danger alert-dismissible fade show gaf-events-alert",children:[e.jsx("i",{className:"bi bi-exclamation-circle-fill me-2"}),l.error,e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]}),e.jsx("div",{className:"gaf-events-stats",children:v.map(t=>e.jsxs("div",{className:"gaf-event-stat",children:[e.jsxs("div",{className:"gaf-event-stat-top",children:[e.jsx("span",{children:t.label}),e.jsx("div",{className:`gaf-event-stat-icon ${t.color}`,children:e.jsx("i",{className:`bi ${t.icon}`})})]}),e.jsx("div",{className:"gaf-event-stat-value",children:Number(t.value).toLocaleString()}),e.jsx("div",{className:"gaf-event-stat-description",children:t.description})]},t.label))}),e.jsxs("section",{className:"gaf-events-filter-card",children:[e.jsxs("div",{className:"gaf-events-filter-heading",children:[e.jsxs("div",{children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-funnel me-2"}),"Filter events"]}),e.jsx("p",{children:"Find events using the available filters."})]}),c&&e.jsxs("button",{type:"button",className:"gaf-events-clear-btn",onClick:p,children:[e.jsx("i",{className:"bi bi-arrow-counterclockwise me-1"}),"Clear filters"]})]}),e.jsxs("div",{className:"gaf-events-filter-grid",children:[e.jsxs("div",{className:"gaf-events-search",children:[e.jsx("label",{htmlFor:"event-search",children:"Search events"}),e.jsxs("div",{className:"gaf-events-search-input",children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{id:"event-search",type:"search",placeholder:"Search by title, venue or city...",value:a.search||"",onChange:t=>o("search",t.target.value)})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"event-status",children:"Status"}),e.jsxs("select",{id:"event-status",className:"gaf-events-select",value:a.status||"",onChange:t=>o("status",t.target.value),children:[e.jsx("option",{value:"",children:"All statuses"}),e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"event-category",children:"Category"}),e.jsxs("select",{id:"event-category",className:"gaf-events-select",value:a.category||"",onChange:t=>o("category",t.target.value),children:[e.jsx("option",{value:"",children:"All categories"}),x.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"event-date",children:"Event date"}),e.jsxs("select",{id:"event-date",className:"gaf-events-select",value:a.date_filter||"",onChange:t=>o("date_filter",t.target.value),children:[e.jsx("option",{value:"",children:"All dates"}),e.jsx("option",{value:"upcoming",children:"Upcoming"}),e.jsx("option",{value:"past",children:"Past events"})]})]})]})]}),e.jsxs("section",{className:"gaf-events-list-card",children:[e.jsxs("div",{className:"gaf-events-list-header",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"All events"}),e.jsx("p",{children:"Manage your events and their publication status."})]}),e.jsxs("span",{className:"gaf-events-count",children:[Number(s?.total||0).toLocaleString()," events"]})]}),f.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table gaf-events-table align-middle mb-0",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"event-column",children:"Event"}),e.jsx("th",{children:"Category"}),e.jsx("th",{children:"Schedule"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Featured"}),e.jsx("th",{className:"text-end",children:"Actions"})]})}),e.jsx("tbody",{children:f.map(t=>{const n=g[t.status]||g.draft,m=t.category?.color||"#20603d";return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"gaf-event-identity",children:[e.jsx("div",{className:"gaf-event-cover",children:t.cover_image?e.jsx("img",{src:`/uploads/${t.cover_image}`,alt:t.title}):e.jsx("div",{className:"gaf-event-cover-placeholder",children:e.jsx("i",{className:"bi bi-calendar-event"})})}),e.jsxs("div",{className:"gaf-event-name",children:[e.jsx(i,{href:route("admin.events.show",t.id),children:t.title}),e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-geo-alt me-1"}),t.venue||t.city||"Location not specified"]})]})]})}),e.jsx("td",{children:t.category?e.jsxs("span",{className:"gaf-event-category",children:[e.jsx("span",{className:"gaf-event-category-dot",style:{backgroundColor:m}}),t.category.name]}):e.jsx("span",{className:"gaf-event-muted",children:"Uncategorized"})}),e.jsx("td",{children:e.jsxs("div",{className:"gaf-event-date",children:[e.jsx("span",{children:y(t.starts_at)}),e.jsx("small",{children:t.city||t.country||"Location not specified"})]})}),e.jsx("td",{children:e.jsxs("span",{className:`gaf-event-status ${n.className}`,children:[e.jsx("i",{className:`bi ${n.icon}`}),n.label]})}),e.jsx("td",{children:t.is_featured?e.jsxs("span",{className:"gaf-event-featured",children:[e.jsx("i",{className:"bi bi-star-fill"}),"Featured"]}):e.jsx("span",{className:"gaf-event-muted",children:"Standard"})}),e.jsx("td",{children:e.jsxs("div",{className:"gaf-event-actions",children:[e.jsx(i,{href:route("admin.events.show",t.id),className:"gaf-event-action",title:"View event","aria-label":"View event",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsx(i,{href:route("admin.events.edit",t.id),className:"gaf-event-action edit",title:"Edit event","aria-label":"Edit event",children:e.jsx("i",{className:"bi bi-pencil"})}),e.jsx("button",{type:"button",className:"gaf-event-action delete",title:"Delete event","aria-label":"Delete event",onClick:()=>h(t),children:e.jsx("i",{className:"bi bi-trash3"})})]})})]},t.id)})})]})}),s?.links&&s.links.length>3&&e.jsxs("div",{className:"gaf-events-pagination",children:[e.jsxs("span",{children:["Showing"," ",e.jsxs("strong",{children:[s.from||0,"–",s.to||0]})," ","of ",e.jsx("strong",{children:s.total||0})," events"]}),e.jsx("div",{className:"gaf-events-pagination-links",children:s.links.map((t,n)=>e.jsx("button",{type:"button",disabled:!t.url,onClick:()=>t.url&&d.visit(t.url,{preserveScroll:!0,preserveState:!0}),className:["gaf-events-page-link",t.active?"active":"",t.url?"":"disabled"].join(" "),dangerouslySetInnerHTML:{__html:t.label}},n))})]})]}):e.jsxs("div",{className:"gaf-events-empty",children:[e.jsx("div",{className:"gaf-events-empty-icon",children:e.jsx("i",{className:"bi bi-calendar2-x"})}),e.jsx("h5",{children:"No events found"}),e.jsx("p",{children:c?"No events match your current filters. Try adjusting your search.":"There are no events available yet. Create your first event to get started."}),e.jsxs("div",{className:"d-flex justify-content-center gap-2 flex-wrap",children:[c&&e.jsx("button",{type:"button",className:"btn btn-light border",onClick:p,children:"Clear filters"}),e.jsxs(i,{href:route("admin.events.create"),className:"gaf-events-create-btn",children:[e.jsx("i",{className:"bi bi-plus-lg"}),"Create event"]})]})]})]})]}),e.jsx("style",{children:`
                .gaf-events-page {
                    width: 100%;
                    min-width: 0;
                    color: #172033;
                }

                .gaf-events-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 24px;
                    margin-bottom: 26px;
                }

                .gaf-events-eyebrow {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    margin-bottom: 7px;
                }

                .gaf-events-heading h2 {
                    color: #172033;
                    font-size: 27px;
                    font-weight: 750;
                    letter-spacing: -0.8px;
                    margin: 0 0 6px;
                }

                .gaf-events-heading p {
                    color: #7b8494;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-events-create-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    min-height: 43px;
                    padding: 0 17px;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                    white-space: nowrap;
                    transition: background .2s ease, transform .2s ease;
                }

                .gaf-events-create-btn:hover {
                    background: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .gaf-events-alert {
                    border-radius: 8px;
                    font-size: 13px;
                    margin-bottom: 20px;
                }

                .gaf-events-stats {
                    display: grid !important;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 16px;
                    margin-bottom: 22px;
                    width: 100%;
                }

                .gaf-event-stat {
                    min-width: 0;
                    padding: 19px 20px;
                    border: 1px solid #e9edf3;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-event-stat-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    color: #7c8798;
                    font-size: 12px;
                    font-weight: 600;
                }

                .gaf-event-stat-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 37px;
                    height: 37px;
                    border-radius: 8px;
                    font-size: 17px;
                }

                .gaf-event-stat-icon.blue {
                    color: #20603d;
                    background: #f1f8f4;
                }

                .gaf-event-stat-icon.green {
                    color: #27966a;
                    background: #eaf7f0;
                }

                .gaf-event-stat-icon.orange {
                    color: #c77b31;
                    background: #fff4e8;
                }

                .gaf-event-stat-icon.purple {
                    color: #8064bb;
                    background: #f2effb;
                }

                .gaf-event-stat-value {
                    margin-top: 12px;
                    color: #172033;
                    font-size: 27px;
                    line-height: 1.2;
                    font-weight: 750;
                    letter-spacing: -.7px;
                }

                .gaf-event-stat-description {
                    margin-top: 5px;
                    color: #9aa2af;
                    font-size: 11px;
                }

                .gaf-events-filter-card,
                .gaf-events-list-card {
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 9px;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                    margin-bottom: 20px;
                    min-width: 0;
                }

                .gaf-events-filter-card {
                    padding: 20px;
                }

                .gaf-events-filter-heading,
                .gaf-events-list-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                }

                .gaf-events-filter-heading {
                    margin-bottom: 18px;
                }

                .gaf-events-filter-heading h5,
                .gaf-events-list-header h5 {
                    color: #202c40;
                    font-size: 14px;
                    font-weight: 750;
                    margin: 0 0 5px;
                }

                .gaf-events-filter-heading p,
                .gaf-events-list-header p {
                    color: #929baa;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-events-clear-btn {
                    border: 0;
                    background: transparent;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-events-clear-btn:hover {
                    color: #174a2f;
                }

                .gaf-events-filter-grid {
                    display: grid !important;
                    grid-template-columns: minmax(220px, 1.7fr) repeat(3, minmax(130px, 1fr));
                    gap: 15px;
                    align-items: end;
                    width: 100%;
                }

                .gaf-events-filter-grid label {
                    display: block;
                    color: #596579;
                    font-size: 11px;
                    font-weight: 700;
                    margin-bottom: 7px;
                }

                .gaf-events-search-input {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    height: 40px;
                    padding: 0 12px;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    background: #fff;
                }

                .gaf-events-search-input:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-events-search-input i {
                    color: #a0a9b6;
                    font-size: 13px;
                }

                .gaf-events-search-input input {
                    width: 100%;
                    min-width: 0;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    color: #273348;
                    font-size: 11px;
                }

                .gaf-events-search-input input::placeholder {
                    color: #a6aebb;
                }

                .gaf-events-select {
                    width: 100%;
                    height: 40px;
                    padding: 0 30px 0 11px;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    outline: none;
                    background-color: #fff;
                    color: #536075;
                    font-size: 11px;
                }

                .gaf-events-select:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-events-list-card {
                    overflow: hidden;
                }

                .gaf-events-list-header {
                    padding: 19px 21px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-events-count {
                    padding: 6px 10px;
                    border-radius: 5px;
                    background: #f1f5fa;
                    color: #5d789c;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-events-table {
                    min-width: 850px;
                    color: #344054;
                }

                .gaf-events-table thead th {
                    padding: 13px 14px;
                    border-bottom: 1px solid #edf0f4;
                    background: #fafbfd;
                    color: #8791a1;
                    font-size: 10px;
                    font-weight: 750;
                    letter-spacing: .45px;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .gaf-events-table thead th:first-child,
                .gaf-events-table tbody td:first-child {
                    padding-left: 21px;
                }

                .gaf-events-table thead th:last-child,
                .gaf-events-table tbody td:last-child {
                    padding-right: 21px;
                }

                .gaf-events-table tbody td {
                    padding: 14px;
                    border-bottom: 1px solid #f0f2f5;
                    font-size: 11px;
                    vertical-align: middle;
                }

                .gaf-events-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                .gaf-events-table tbody tr:hover {
                    background: #fbfcfe;
                }

                .gaf-event-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 220px;
                }

                .gaf-event-cover {
                    flex: 0 0 58px;
                    width: 58px;
                    height: 48px;
                    overflow: hidden;
                    border-radius: 6px;
                    background: #f0f3f7;
                }

                .gaf-event-cover img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gaf-event-cover-placeholder {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                    color: #8ba1bd;
                    font-size: 19px;
                }

                .gaf-event-name {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    min-width: 0;
                }

                .gaf-event-name a {
                    max-width: 250px;
                    overflow: hidden;
                    color: #26344a;
                    font-size: 11px;
                    font-weight: 750;
                    line-height: 1.4;
                    text-decoration: none;
                    text-overflow: ellipsis;
                }

                .gaf-event-name a:hover {
                    color: #20603d;
                }

                .gaf-event-name span {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-category {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #596579;
                    font-size: 10px;
                    font-weight: 650;
                    white-space: nowrap;
                }

                .gaf-event-category-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    flex: 0 0 7px;
                }

                .gaf-event-date {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    white-space: nowrap;
                }

                .gaf-event-date span {
                    color: #455166;
                    font-size: 10px;
                    font-weight: 650;
                }

                .gaf-event-date small {
                    color: #9aa2af;
                    font-size: 10px;
                }

                .gaf-event-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 5px;
                    font-size: 9px;
                    font-weight: 750;
                    white-space: nowrap;
                }

                .gaf-event-status--draft {
                    color: #778294;
                    background: #f0f2f5;
                }

                .gaf-event-status--published {
                    color: #25845f;
                    background: #eaf6ef;
                }

                .gaf-event-status--cancelled {
                    color: #c35454;
                    background: #fceeee;
                }

                .gaf-event-featured {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    color: #b9822e;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-event-featured i {
                    font-size: 11px;
                }

                .gaf-event-muted {
                    color: #a1a9b5;
                    font-size: 10px;
                }

                .gaf-event-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 5px;
                }

                .gaf-event-action {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    border: 1px solid #e9edf2;
                    border-radius: 5px;
                    background: #fff;
                    color: #748196;
                    font-size: 12px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all .15s ease;
                }

                .gaf-event-action:hover {
                    border-color: #cfe5d9;
                    background: #f1f6fc;
                    color: #20603d;
                }

                .gaf-event-action.edit:hover {
                    border-color: #cfe5d9;
                    background: #f1f8f4;
                    color: #20603d;
                }

                .gaf-event-action.delete:hover {
                    border-color: #f1d0d0;
                    background: #fff1f1;
                    color: #c44e4e;
                }

                .gaf-events-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 15px 21px;
                    border-top: 1px solid #edf0f4;
                }

                .gaf-events-pagination > span {
                    color: #8993a2;
                    font-size: 10px;
                }

                .gaf-events-pagination > span strong {
                    color: #4a566a;
                }

                .gaf-events-pagination-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                }

                .gaf-events-page-link {
                    min-width: 29px;
                    height: 29px;
                    padding: 0 8px;
                    border: 1px solid #e8ecf1;
                    border-radius: 5px;
                    background: #fff;
                    color: #6c788b;
                    font-size: 10px;
                    cursor: pointer;
                }

                .gaf-events-page-link.active {
                    border-color: #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-events-page-link.disabled {
                    opacity: .4;
                    cursor: not-allowed;
                }

                .gaf-events-empty {
                    padding: 55px 20px;
                    text-align: center;
                }

                .gaf-events-empty-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 62px;
                    height: 62px;
                    margin: 0 auto 16px;
                    border-radius: 50%;
                    background: #f0f4f9;
                    color: #20603d;
                    font-size: 25px;
                }

                .gaf-events-empty h5 {
                    color: #26344a;
                    font-size: 15px;
                    font-weight: 750;
                }

                .gaf-events-empty p {
                    max-width: 390px;
                    margin: 7px auto 20px;
                    color: #929baa;
                    font-size: 12px;
                    line-height: 1.7;
                }

                @media (max-width: 1100px) {
                    .gaf-events-filter-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .gaf-events-stats {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (max-width: 767px) {
                    .gaf-events-heading {
                        align-items: flex-start;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .gaf-events-heading h2 {
                        font-size: 23px;
                    }

                    .gaf-events-create-btn {
                        min-height: 40px;
                    }

                    .gaf-events-filter-card {
                        padding: 16px;
                    }

                    .gaf-events-filter-grid {
                        grid-template-columns: minmax(0, 1fr);
                        gap: 12px;
                    }

                    .gaf-events-list-header {
                        padding: 16px;
                    }

                    .gaf-events-pagination {
                        align-items: flex-start;
                        flex-direction: column;
                        padding: 14px 16px;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-events-stats {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-events-filter-heading {
                        align-items: flex-start;
                    }
                }
            `})]})}export{C as default};
