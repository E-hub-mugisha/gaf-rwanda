import{j as e,L as s}from"./app-BqJN-hOp.js";import{A as p}from"./AdminLayout-rP-hubzG.js";import"./adminI18n-C9DLtJ83.js";import"./Language-ChUCrwIh.js";function u({event:a}){const r={draft:{label:"Draft",className:"gaf-event-show-status-draft",icon:"bi-pencil-square"},published:{label:"Published",className:"gaf-event-show-status-published",icon:"bi-check-circle-fill"},cancelled:{label:"Cancelled",className:"gaf-event-show-status-cancelled",icon:"bi-x-circle-fill"},completed:{label:"Completed",className:"gaf-event-show-status-completed",icon:"bi-flag-fill"}}[a.status]||{label:a.status||"Unknown",className:"gaf-event-show-status-draft",icon:"bi-info-circle"},o=t=>{if(!t)return"Not specified";const i=new Date(t);return Number.isNaN(i.getTime())?"Not specified":i.toLocaleString("en-GB",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})},c=t=>{if(!t)return"Date not specified";const i=new Date(t);return Number.isNaN(i.getTime())?"Date not specified":i.toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})},g=t=>t||null,n=Array.isArray(a.agenda)?a.agenda:[],d=a.category?.color||"#20603d",l=!!a.description?.trim(),f=l&&/<\/?[a-z][\s\S]*>/i.test(a.description);return e.jsxs(p,{title:a.title,children:[e.jsxs("div",{className:"gaf-event-show-page",children:[e.jsxs("div",{className:"gaf-event-show-header",children:[e.jsxs("div",{children:[e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb gaf-event-show-breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(s,{href:route("admin.dashboard"),children:"Dashboard"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(s,{href:route("admin.events.index"),children:"Events"})}),e.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Event Details"})]})}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("div",{className:"gaf-event-show-heading-icon",children:e.jsx("i",{className:"bi bi-calendar2-event"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center flex-wrap gap-2 mb-1",children:[e.jsx("h3",{className:"gaf-event-show-page-title mb-0",children:"Event Details"}),e.jsxs("span",{className:`gaf-event-show-status ${r.className}`,children:[e.jsx("i",{className:`bi ${r.icon}`}),r.label]})]}),e.jsx("p",{className:"gaf-event-show-page-subtitle mb-0",children:"View event information, schedule, registration and related content."})]})]})]}),e.jsxs("div",{className:"gaf-event-show-header-actions",children:[e.jsxs(s,{href:route("admin.events.index"),className:"btn gaf-event-show-btn-back",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to Events"]}),e.jsxs(s,{href:route("admin.events.edit",a.id),className:"btn gaf-event-show-btn-edit",children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),"Edit Event"]}),e.jsxs(s,{href:route("admin.events.galleries.index",a.id),className:"btn gaf-event-show-btn-gallery",children:[e.jsx("i",{className:"bi bi-images me-2"}),"Manage Gallery"]})]})]}),e.jsxs("div",{className:"gaf-event-show-summary",children:[e.jsxs("div",{className:"gaf-event-show-summary-main",children:[e.jsx("div",{className:"gaf-event-show-summary-icon",children:e.jsx("i",{className:"bi bi-calendar-check"})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("span",{className:"gaf-event-show-summary-label",children:"EVENT"}),e.jsx("h5",{className:"gaf-event-show-summary-title",children:a.title}),e.jsxs("div",{className:"gaf-event-show-summary-meta",children:[e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-hash me-1"}),"Event #",a.id]}),a.category?.name&&e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-folder2 me-1"}),a.category.name]}),a.is_featured&&e.jsxs("span",{className:"gaf-event-featured-label",children:[e.jsx("i",{className:"bi bi-star-fill me-1"}),"Featured Event"]})]})]})]}),e.jsxs("div",{className:"gaf-event-show-summary-date",children:[e.jsx("span",{children:"EVENT DATE"}),e.jsx("strong",{children:c(a.starts_at)})]})]}),e.jsxs("div",{className:"gaf-event-show-layout",children:[e.jsxs("main",{className:"gaf-event-show-main",children:[e.jsxs("section",{className:"gaf-event-show-cover-card",children:[a.cover_image?e.jsx("img",{src:`/uploads/${a.cover_image}`,alt:a.title,className:"gaf-event-show-cover"}):e.jsxs("div",{className:"gaf-event-show-cover-placeholder",children:[e.jsx("i",{className:"bi bi-image"}),e.jsx("span",{children:"No event cover image uploaded"})]}),e.jsxs("div",{className:"gaf-event-show-cover-caption",children:[e.jsxs("div",{children:[e.jsx("span",{className:"gaf-event-cover-eyebrow",children:"EVENT"}),e.jsx("h2",{children:a.title})]}),a.is_featured&&e.jsxs("span",{className:"gaf-event-cover-featured",children:[e.jsx("i",{className:"bi bi-star-fill me-2"}),"Featured"]})]})]}),e.jsxs("section",{className:"gaf-event-show-card",children:[e.jsxs("div",{className:"gaf-event-show-section-heading",children:[e.jsx("div",{className:"gaf-event-show-section-icon",children:e.jsx("i",{className:"bi bi-file-text"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"About this Event"}),e.jsx("p",{children:"Overview and details of the event"})]})]}),a.excerpt&&e.jsx("div",{className:"gaf-event-show-excerpt",children:a.excerpt}),e.jsx("div",{className:"gaf-event-show-description",children:l?f?e.jsx("div",{className:"gaf-event-rich-content",dangerouslySetInnerHTML:{__html:a.description}}):e.jsx("div",{className:"gaf-event-plain-content",children:a.description}):e.jsx("p",{className:"gaf-event-empty-text",children:"No event description has been added."})})]}),e.jsxs("section",{className:"gaf-event-show-card",children:[e.jsxs("div",{className:"gaf-event-show-section-heading gaf-event-agenda-heading",children:[e.jsx("div",{className:"gaf-event-show-section-icon",children:e.jsx("i",{className:"bi bi-list-check"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Event Agenda"}),e.jsx("p",{children:n.length>0?`${n.length} scheduled ${n.length===1?"session":"sessions"}`:"Event programme and sessions"})]})]}),n.length>0?e.jsx("div",{className:"gaf-event-agenda-list",children:n.map((t,i)=>e.jsxs("div",{className:"gaf-event-agenda-item",children:[e.jsx("div",{className:"gaf-event-agenda-marker",children:e.jsx("span",{children:i+1})}),e.jsxs("div",{className:"gaf-event-agenda-content",children:[e.jsxs("div",{className:"gaf-event-agenda-time",children:[e.jsx("i",{className:"bi bi-clock me-2"}),g(t.time)||"Scheduled session"]}),e.jsx("h6",{children:t.title||"Untitled session"}),t.description&&e.jsx("p",{children:t.description})]})]},i))}):e.jsxs("div",{className:"gaf-event-empty-state",children:[e.jsx("i",{className:"bi bi-calendar2-week"}),e.jsx("strong",{children:"No agenda available"}),e.jsx("span",{children:"No agenda sessions have been added to this event yet."})]})]}),a.program&&e.jsxs("section",{className:"gaf-event-show-card",children:[e.jsxs("div",{className:"gaf-event-show-section-heading",children:[e.jsx("div",{className:"gaf-event-show-section-icon",children:e.jsx("i",{className:"bi bi-diagram-3"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Related Program"}),e.jsx("p",{children:"Programme associated with this event"})]})]}),e.jsxs("div",{className:"gaf-event-related-program",children:[e.jsx("div",{className:"gaf-event-related-program-icon",children:e.jsx("i",{className:"bi bi-journal-bookmark"})}),e.jsxs("div",{children:[e.jsx("strong",{children:a.program.title}),e.jsx("span",{children:"This event is associated with the selected GAF program."})]})]})]}),e.jsxs("section",{className:"gaf-event-registration-card",children:[e.jsx("div",{className:"gaf-event-registration-icon",children:e.jsx("i",{className:"bi bi-person-plus"})}),e.jsxs("div",{className:"gaf-event-registration-content",children:[e.jsx("h5",{children:"Event Registration"}),e.jsx("p",{children:a.registration_url?"Registration is available through the external link below.":"No registration link has been provided for this event."})]}),a.registration_url&&e.jsxs("a",{href:a.registration_url,target:"_blank",rel:"noopener noreferrer",className:"btn gaf-event-registration-btn",children:["Open Registration",e.jsx("i",{className:"bi bi-box-arrow-up-right ms-2"})]})]})]}),e.jsxs("aside",{className:"gaf-event-show-sidebar",children:[e.jsxs("section",{className:"gaf-event-show-card gaf-event-sidebar-card",children:[e.jsxs("div",{className:"gaf-event-sidebar-heading",children:[e.jsx("div",{className:"gaf-event-sidebar-icon",children:e.jsx("i",{className:"bi bi-calendar3"})}),e.jsx("h6",{children:"Event Schedule"})]}),e.jsxs("div",{className:"gaf-event-schedule",children:[e.jsxs("div",{className:"gaf-event-schedule-item",children:[e.jsx("span",{className:"gaf-event-schedule-dot gaf-event-dot-start"}),e.jsxs("div",{children:[e.jsx("span",{children:"START DATE & TIME"}),e.jsx("strong",{children:o(a.starts_at)})]})]}),e.jsx("div",{className:"gaf-event-schedule-line"}),e.jsxs("div",{className:"gaf-event-schedule-item",children:[e.jsx("span",{className:"gaf-event-schedule-dot gaf-event-dot-end"}),e.jsxs("div",{children:[e.jsx("span",{children:"END DATE & TIME"}),e.jsx("strong",{children:o(a.ends_at)})]})]})]}),e.jsxs("div",{className:"gaf-event-sidebar-info",children:[e.jsx("i",{className:"bi bi-globe2"}),e.jsxs("div",{children:[e.jsx("span",{children:"TIMEZONE"}),e.jsx("strong",{children:a.timezone||"Not specified"})]})]})]}),e.jsxs("section",{className:"gaf-event-show-card gaf-event-sidebar-card",children:[e.jsxs("div",{className:"gaf-event-sidebar-heading",children:[e.jsx("div",{className:"gaf-event-sidebar-icon",children:e.jsx("i",{className:"bi bi-geo-alt"})}),e.jsx("h6",{children:"Event Location"})]}),e.jsxs("div",{className:"gaf-event-location",children:[e.jsx("strong",{children:a.venue||"Venue not specified"}),a.address&&e.jsx("p",{children:a.address}),e.jsx("p",{className:"mb-0",children:[a.city,a.country].filter(Boolean).join(", ")||"Location not specified"})]}),a.city&&a.country&&e.jsxs("a",{href:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([a.venue,a.address,a.city,a.country].filter(Boolean).join(", "))}`,target:"_blank",rel:"noopener noreferrer",className:"gaf-event-map-link",children:[e.jsx("i",{className:"bi bi-map me-2"}),"View on Google Maps",e.jsx("i",{className:"bi bi-arrow-up-right ms-auto"})]})]}),e.jsxs("section",{className:"gaf-event-show-card gaf-event-sidebar-card",children:[e.jsxs("div",{className:"gaf-event-sidebar-heading",children:[e.jsx("div",{className:"gaf-event-sidebar-icon",children:e.jsx("i",{className:"bi bi-tags"})}),e.jsx("h6",{children:"Classification"})]}),e.jsxs("div",{className:"gaf-event-detail-row",children:[e.jsx("span",{children:"Category"}),a.category?e.jsx("span",{className:"gaf-event-category-badge",style:{color:d,backgroundColor:`color-mix(in srgb, ${d} 12%, white)`},children:a.category.name}):e.jsx("strong",{children:"Not assigned"})]}),e.jsxs("div",{className:"gaf-event-detail-row",children:[e.jsx("span",{children:"Featured"}),e.jsx("strong",{children:a.is_featured?e.jsxs("span",{className:"gaf-event-yes",children:[e.jsx("i",{className:"bi bi-check-circle-fill me-1"}),"Yes"]}):"No"})]}),e.jsxs("div",{className:"gaf-event-detail-row",children:[e.jsx("span",{children:"Program"}),e.jsx("strong",{className:"gaf-event-detail-value",children:a.program?.title||"None"})]})]}),e.jsxs("section",{className:"gaf-event-show-card gaf-event-sidebar-card",children:[e.jsxs("div",{className:"gaf-event-sidebar-heading",children:[e.jsx("div",{className:"gaf-event-sidebar-icon",children:e.jsx("i",{className:"bi bi-info-circle"})}),e.jsx("h6",{children:"Record Information"})]}),e.jsxs("div",{className:"gaf-event-record-item",children:[e.jsx("span",{children:"URL Slug"}),e.jsx("strong",{className:"gaf-event-slug",children:a.slug||"Not set"})]}),e.jsxs("div",{className:"gaf-event-record-item",children:[e.jsx("span",{children:"Created By"}),e.jsx("strong",{children:a.creator?.name||"Unknown"})]}),e.jsxs("div",{className:"gaf-event-record-item",children:[e.jsx("span",{children:"Published At"}),e.jsx("strong",{children:a.published_at?o(a.published_at):"Not published"})]}),e.jsxs("div",{className:"gaf-event-record-item",children:[e.jsx("span",{children:"Last Updated"}),e.jsx("strong",{children:o(a.updated_at)})]})]}),e.jsxs("section",{className:"gaf-event-quick-actions",children:[e.jsx("span",{children:"QUICK ACTIONS"}),e.jsxs(s,{href:route("admin.events.galleries.index",a.id),children:[e.jsx("i",{className:"bi bi-images"}),"Manage Event Gallery",e.jsx("i",{className:"bi bi-chevron-right ms-auto"})]}),e.jsxs(s,{href:route("admin.events.edit",a.id),children:[e.jsx("i",{className:"bi bi-pencil-square"}),"Edit Event Details",e.jsx("i",{className:"bi bi-chevron-right ms-auto"})]})]})]})]})]}),e.jsx("style",{children:`
                .gaf-event-show-page {
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 8px 0 35px;
                    color: #172033;
                }

                .gaf-event-show-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    gap: 22px;
                    margin-bottom: 25px;
                }

                .gaf-event-show-breadcrumb {
                    font-size: 12px;
                    margin-bottom: 17px;
                }

                .gaf-event-show-breadcrumb a {
                    color: #788397;
                    text-decoration: none;
                }

                .gaf-event-show-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-event-show-breadcrumb .active {
                    color: #263247;
                    font-weight: 600;
                }

                .gaf-event-show-heading-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 47px;
                    height: 47px;
                    flex: 0 0 47px;
                    border-radius: 12px;
                    background: #eff6f2;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-show-page-title {
                    color: #172033;
                    font-size: 24px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .gaf-event-show-page-subtitle {
                    margin-top: 5px;
                    color: #8791a1;
                    font-size: 12px;
                }

                .gaf-event-show-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: .3px;
                    text-transform: uppercase;
                }

                .gaf-event-show-status-draft {
                    color: #667085;
                    background: #f0f2f5;
                }

                .gaf-event-show-status-published {
                    color: #23814d;
                    background: #e8f6ee;
                }

                .gaf-event-show-status-cancelled {
                    color: #c14b45;
                    background: #fff0ef;
                }

                .gaf-event-show-status-completed {
                    color: #20603d;
                    background: #eff6f2;
                }

                .gaf-event-show-header-actions {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .gaf-event-show-header-actions .btn {
                    min-height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    padding: 0 14px;
                    font-size: 12px;
                    font-weight: 650;
                    transition: all .2s ease;
                }

                .gaf-event-show-btn-back {
                    border: 1px solid #e1e6ee;
                    color: #536075;
                    background: #fff;
                }

                .gaf-event-show-btn-back:hover {
                    background: #f5f7fa;
                    color: #263247;
                }

                .gaf-event-show-btn-edit {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .gaf-event-show-btn-edit:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                }

                .gaf-event-show-btn-gallery {
                    border: 1px solid #deeee5;
                    background: #f5f8fc;
                    color: #174a2f;
                }

                .gaf-event-show-btn-gallery:hover {
                    background: #eff6f2;
                    color: #174a2f;
                }

                /* Summary */

                .gaf-event-show-summary {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    padding: 17px 21px;
                    margin-bottom: 23px;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                .gaf-event-show-summary-main {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    min-width: 0;
                }

                .gaf-event-show-summary-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    flex: 0 0 40px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #f0f5fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-show-summary-label,
                .gaf-event-show-summary-date > span {
                    display: block;
                    margin-bottom: 3px;
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .8px;
                }

                .gaf-event-show-summary-title {
                    overflow: hidden;
                    margin-bottom: 4px;
                    color: #263247;
                    font-size: 14px;
                    font-weight: 700;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .gaf-event-show-summary-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    color: #8490a1;
                    font-size: 11px;
                }

                .gaf-event-featured-label {
                    color: #b58127;
                    font-weight: 650;
                }

                .gaf-event-show-summary-date {
                    padding-left: 22px;
                    border-left: 1px solid #edf0f4;
                    text-align: right;
                    flex-shrink: 0;
                }

                .gaf-event-show-summary-date strong {
                    color: #344158;
                    font-size: 12px;
                    font-weight: 700;
                }

                /* Content layout */

                .gaf-event-show-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1.8fr) minmax(285px, .85fr);
                    align-items: start;
                    gap: 23px;
                }

                .gaf-event-show-main,
                .gaf-event-show-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .gaf-event-show-card,
                .gaf-event-show-cover-card {
                    overflow: hidden;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 3px 12px rgba(25, 42, 70, .025);
                }

                /* Cover */

                .gaf-event-show-cover-card {
                    position: relative;
                    min-height: 250px;
                    background: #eaf0f7;
                }

                .gaf-event-show-cover {
                    display: block;
                    width: 100%;
                    height: 340px;
                    object-fit: cover;
                }

                .gaf-event-show-cover-placeholder {
                    display: flex;
                    min-height: 280px;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 10px;
                    color: #8996a8;
                    background: #eef3f9;
                    font-size: 12px;
                }

                .gaf-event-show-cover-placeholder i {
                    font-size: 38px;
                    color: #9aacc2;
                }

                .gaf-event-show-cover-caption {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 55px 23px 20px;
                    color: #fff;
                    background: rgba(15, 26, 44, 0.7);
                }

                .gaf-event-cover-eyebrow {
                    display: block;
                    margin-bottom: 5px;
                    color: rgba(255,255,255,.8);
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: 1.5px;
                }

                .gaf-event-show-cover-caption h2 {
                    margin: 0;
                    color: #fff;
                    font-size: 22px;
                    font-weight: 750;
                    line-height: 1.35;
                }

                .gaf-event-cover-featured {
                    flex-shrink: 0;
                    padding: 7px 11px;
                    border: 1px solid rgba(255,255,255,.3);
                    border-radius: 20px;
                    background: rgba(255,255,255,.16);
                    color: #fff;
                    font-size: 10px;
                    font-weight: 650;
                    backdrop-filter: blur(8px);
                }

                /* Section headings */

                .gaf-event-show-card {
                    padding: 22px;
                }

                .gaf-event-show-section-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .gaf-event-show-section-icon {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    flex: 0 0 38px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 16px;
                }

                .gaf-event-show-section-heading h5 {
                    margin: 0 0 3px;
                    color: #263247;
                    font-size: 14px;
                    font-weight: 750;
                }

                .gaf-event-show-section-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                }

                .gaf-event-show-excerpt {
                    margin-bottom: 18px;
                    padding: 14px 16px;
                    border-left: 3px solid #20603d;
                    border-radius: 0 7px 7px 0;
                    background: #f5f8fc;
                    color: #48566b;
                    font-size: 13px;
                    font-weight: 550;
                    line-height: 1.8;
                }

                .gaf-event-show-description {
                    color: #5d6879;
                    font-size: 13px;
                    line-height: 1.85;
                    overflow-wrap: anywhere;
                }

                .gaf-event-rich-content {
                    color: #5d6879;
                    line-height: 1.85;
                }

                .gaf-event-rich-content > *:last-child {
                    margin-bottom: 0;
                }

                .gaf-event-rich-content h1,
                .gaf-event-rich-content h2,
                .gaf-event-rich-content h3,
                .gaf-event-rich-content h4,
                .gaf-event-rich-content h5,
                .gaf-event-rich-content h6 {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    color: #263247;
                    font-weight: 700;
                }

                .gaf-event-rich-content h2 {
                    font-size: 20px;
                }

                .gaf-event-rich-content h3 {
                    font-size: 17px;
                }

                .gaf-event-rich-content h4 {
                    font-size: 15px;
                }

                .gaf-event-rich-content p {
                    margin-bottom: 13px;
                }

                .gaf-event-rich-content ul,
                .gaf-event-rich-content ol {
                    padding-left: 23px;
                    margin-bottom: 15px;
                }

                .gaf-event-rich-content li {
                    margin-bottom: 5px;
                }

                .gaf-event-rich-content blockquote {
                    margin: 17px 0;
                    padding: 12px 17px;
                    border-left: 3px solid #93c8aa;
                    background: #f5f8fc;
                    color: #65758b;
                }

                .gaf-event-rich-content a {
                    color: #20603d;
                    text-decoration: underline;
                }

                .gaf-event-rich-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .gaf-event-rich-content table {
                    width: 100%;
                    margin: 15px 0;
                    border-collapse: collapse;
                }

                .gaf-event-rich-content th,
                .gaf-event-rich-content td {
                    padding: 9px;
                    border: 1px solid #e5eaf0;
                    text-align: left;
                }

                .gaf-event-plain-content {
                    white-space: pre-line;
                }

                .gaf-event-empty-text {
                    margin: 0;
                    color: #9aa3b0;
                    font-size: 12px;
                    font-style: italic;
                }

                /* Agenda */

                .gaf-event-agenda-list {
                    position: relative;
                    padding-left: 4px;
                }

                .gaf-event-agenda-item {
                    position: relative;
                    display: flex;
                    gap: 15px;
                    padding-bottom: 24px;
                }

                .gaf-event-agenda-item:last-child {
                    padding-bottom: 0;
                }

                .gaf-event-agenda-item:not(:last-child)::before {
                    position: absolute;
                    top: 36px;
                    bottom: 0;
                    left: 17px;
                    width: 1px;
                    background: #e5f1ea;
                    content: "";
                }

                .gaf-event-agenda-marker {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    width: 35px;
                    height: 35px;
                    flex: 0 0 35px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e2f0e8;
                    border-radius: 50%;
                    background: #f0f5fb;
                    color: #20603d;
                    font-size: 12px;
                    font-weight: 750;
                }

                .gaf-event-agenda-content {
                    min-width: 0;
                    padding-top: 1px;
                }

                .gaf-event-agenda-time {
                    margin-bottom: 5px;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 650;
                }

                .gaf-event-agenda-content h6 {
                    margin-bottom: 5px;
                    color: #29364a;
                    font-size: 13px;
                    font-weight: 700;
                }

                .gaf-event-agenda-content p {
                    margin: 0;
                    color: #8791a0;
                    font-size: 12px;
                    line-height: 1.7;
                }

                .gaf-event-empty-state {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 7px;
                    padding: 25px 15px;
                    border: 1px dashed #e1e7ef;
                    border-radius: 9px;
                    text-align: center;
                }

                .gaf-event-empty-state i {
                    margin-bottom: 3px;
                    color: #9ba9ba;
                    font-size: 25px;
                }

                .gaf-event-empty-state strong {
                    color: #536075;
                    font-size: 12px;
                }

                .gaf-event-empty-state span {
                    color: #98a1af;
                    font-size: 11px;
                }

                /* Related program */

                .gaf-event-related-program {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 15px;
                    border: 1px solid #e8edf3;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .gaf-event-related-program-icon {
                    display: flex;
                    width: 39px;
                    height: 39px;
                    flex: 0 0 39px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-related-program > div:last-child {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-event-related-program strong {
                    color: #344158;
                    font-size: 12px;
                }

                .gaf-event-related-program span {
                    color: #909aaa;
                    font-size: 11px;
                }

                /* Registration */

                .gaf-event-registration-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 19px;
                    border: 1px solid #e4f1ea;
                    border-radius: 11px;
                    background: #f5f8fc;
                }

                .gaf-event-registration-icon {
                    display: flex;
                    width: 40px;
                    height: 40px;
                    flex: 0 0 40px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #eaf4ee;
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-event-registration-content {
                    flex: 1;
                    min-width: 0;
                }

                .gaf-event-registration-content h5 {
                    margin-bottom: 4px;
                    color: #29364a;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-event-registration-content p {
                    margin: 0;
                    color: #8290a2;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .gaf-event-registration-btn {
                    flex-shrink: 0;
                    border: 1px solid #20603d;
                    border-radius: 7px;
                    background: #20603d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 650;
                }

                .gaf-event-registration-btn:hover {
                    border-color: #174a2f;
                    background: #174a2f;
                    color: #fff;
                }

                /* Sidebar */

                .gaf-event-sidebar-card {
                    padding: 19px;
                }

                .gaf-event-sidebar-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 19px;
                    padding-bottom: 14px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-event-sidebar-icon {
                    display: flex;
                    width: 32px;
                    height: 32px;
                    flex: 0 0 32px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-sidebar-heading h6 {
                    margin: 0;
                    color: #344158;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-event-schedule {
                    padding-left: 5px;
                }

                .gaf-event-schedule-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }

                .gaf-event-schedule-dot {
                    width: 10px;
                    height: 10px;
                    flex: 0 0 10px;
                    margin-top: 4px;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #acd4bd;
                }

                .gaf-event-dot-start {
                    background: #20603d;
                }

                .gaf-event-dot-end {
                    background: #8a9bb1;
                    box-shadow: 0 0 0 2px #d0d8e3;
                }

                .gaf-event-schedule-item > div {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    min-width: 0;
                }

                .gaf-event-schedule-item span:not(.gaf-event-schedule-dot) {
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .5px;
                }

                .gaf-event-schedule-item strong {
                    color: #445168;
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1.6;
                }

                .gaf-event-schedule-line {
                    width: 1px;
                    height: 24px;
                    margin: 3px 0 3px 9px;
                    background: #deeee5;
                }

                .gaf-event-sidebar-info {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    margin-top: 19px;
                    padding: 12px;
                    border-radius: 8px;
                    background: #f6f8fb;
                    color: #7890ad;
                }

                .gaf-event-sidebar-info > i {
                    font-size: 15px;
                }

                .gaf-event-sidebar-info > div {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .gaf-event-sidebar-info span {
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 700;
                }

                .gaf-event-sidebar-info strong {
                    color: #4a576d;
                    font-size: 11px;
                }

                /* Location */

                .gaf-event-location {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 16px;
                }

                .gaf-event-location strong {
                    color: #344158;
                    font-size: 13px;
                    font-weight: 700;
                }

                .gaf-event-location p {
                    margin: 0;
                    color: #8490a1;
                    font-size: 11px;
                    line-height: 1.65;
                }

                .gaf-event-map-link {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding-top: 13px;
                    border-top: 1px solid #edf0f4;
                    color: #20603d;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .gaf-event-map-link:hover {
                    color: #174a2f;
                }

                /* Classification */

                .gaf-event-detail-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    padding: 10px 0;
                    border-bottom: 1px solid #f0f2f5;
                }

                .gaf-event-detail-row:first-of-type {
                    padding-top: 0;
                }

                .gaf-event-detail-row:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-detail-row > span:first-child {
                    color: #8993a2;
                    font-size: 11px;
                }

                .gaf-event-detail-row strong {
                    color: #465268;
                    font-size: 11px;
                    font-weight: 650;
                    text-align: right;
                }

                .gaf-event-category-badge {
                    max-width: 150px;
                    padding: 5px 9px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    text-align: right;
                }

                .gaf-event-yes {
                    color: #278451 !important;
                }

                .gaf-event-detail-value {
                    max-width: 155px;
                    overflow-wrap: anywhere;
                }

                /* Record information */

                .gaf-event-record-item {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    padding: 11px 0;
                    border-bottom: 1px solid #f0f2f5;
                }

                .gaf-event-record-item:first-of-type {
                    padding-top: 0;
                }

                .gaf-event-record-item:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-record-item span {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-record-item strong {
                    color: #465268;
                    font-size: 11px;
                    font-weight: 650;
                    line-height: 1.6;
                }

                .gaf-event-record-item .gaf-event-slug {
                    overflow-wrap: anywhere;
                    color: #20603d;
                    font-size: 10px;
                }

                /* Quick actions */

                .gaf-event-quick-actions {
                    padding: 18px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: #fff;
                }

                .gaf-event-quick-actions > span {
                    display: block;
                    margin-bottom: 12px;
                    color: #98a1af;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: .8px;
                }

                .gaf-event-quick-actions a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 11px 0;
                    border-bottom: 1px solid #f0f2f5;
                    color: #536075;
                    font-size: 11px;
                    font-weight: 600;
                    text-decoration: none;
                }

                .gaf-event-quick-actions a:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }

                .gaf-event-quick-actions a > i:first-child {
                    color: #20603d;
                    font-size: 14px;
                }

                .gaf-event-quick-actions a:hover {
                    color: #20603d;
                }

                .gaf-event-quick-actions a > i:last-child {
                    color: #a5afbd;
                    font-size: 10px;
                }

                @media (max-width: 1100px) {
                    .gaf-event-show-layout {
                        grid-template-columns: minmax(0, 1.5fr) minmax(260px, .9fr);
                    }

                    .gaf-event-show-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }
                }

                @media (max-width: 850px) {
                    .gaf-event-show-layout {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-event-show-sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        align-items: start;
                    }

                    .gaf-event-quick-actions {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 600px) {
                    .gaf-event-show-page-title {
                        font-size: 20px;
                    }

                    .gaf-event-show-header-actions {
                        display: grid;
                        width: 100%;
                        grid-template-columns: 1fr 1fr;
                    }

                    .gaf-event-show-header-actions .btn {
                        width: 100%;
                        padding: 0 8px;
                        font-size: 11px;
                    }

                    .gaf-event-show-btn-gallery {
                        grid-column: 1 / -1;
                    }

                    .gaf-event-show-summary {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .gaf-event-show-summary-date {
                        width: 100%;
                        padding: 12px 0 0;
                        border-top: 1px solid #edf0f4;
                        border-left: 0;
                        text-align: left;
                    }

                    .gaf-event-show-cover {
                        height: 240px;
                    }

                    .gaf-event-show-cover-caption {
                        padding: 45px 16px 16px;
                    }

                    .gaf-event-show-cover-caption h2 {
                        font-size: 17px;
                    }

                    .gaf-event-show-card {
                        padding: 17px;
                    }

                    .gaf-event-show-sidebar {
                        display: flex;
                    }

                    .gaf-event-registration-card {
                        align-items: flex-start;
                        flex-wrap: wrap;
                    }

                    .gaf-event-registration-content {
                        flex-basis: calc(100% - 60px);
                    }

                    .gaf-event-registration-btn {
                        width: 100%;
                    }
                }
            `})]})}export{u as default};
