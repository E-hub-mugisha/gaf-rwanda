import{r as x,b as R,j as e,L as U}from"./app-B2r5GH2N.js";import{R as T}from"./RichTextEditor-DPbKt09a.js";import{L as C}from"./LangTabs-8-QVm6bk.js";import"./adminI18n-CmBL3FjY.js";import"./Language-ChUCrwIh.js";const z=c=>{if(!c)return"";const i=new Date(c);return Number.isNaN(i.getTime())?"":new Date(i.getTime()-i.getTimezoneOffset()*6e4).toISOString().slice(0,16)},D=c=>c.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),h=({number:c,title:i,description:m})=>e.jsxs("div",{className:"gaf-form-section-heading",children:[e.jsx("span",{className:"gaf-form-section-number",children:c}),e.jsxs("div",{children:[e.jsx("h5",{children:i}),m&&e.jsx("p",{children:m})]})]}),l=({message:c})=>c?e.jsx("div",{className:"gaf-field-error",children:c}):null;function q({mode:c="create",event:i=null,categories:m=[],programs:$=[],newsArticles:v=[]}){const p=c==="edit",[d,N]=x.useState("en"),t=a=>d==="rw"?`${a}_rw`:a,[f,u]=x.useState(i?.cover_image?`/uploads/${i.cover_image}`:null),{data:r,setData:o,post:y,processing:w,errors:s,transform:E}=R({event_category_id:i?.event_category_id||"",program_id:i?.program_id||"",title:i?.title||"",slug:i?.slug||"",excerpt:i?.excerpt||"",description:i?.description||"",title_rw:i?.title_rw||"",excerpt_rw:i?.excerpt_rw||"",description_rw:i?.description_rw||"",venue_rw:i?.venue_rw||"",address_rw:i?.address_rw||"",city_rw:i?.city_rw||"",cover_image:null,venue:i?.venue||"",address:i?.address||"",city:i?.city||"Kigali",country:i?.country||"Rwanda",starts_at:z(i?.starts_at),ends_at:z(i?.ends_at),timezone:i?.timezone||"Africa/Kigali",status:i?.status||"draft",is_featured:i?.is_featured??!1,registration_url:i?.registration_url||"",agenda:Array.isArray(i?.agenda)?i.agenda:[],news_article_ids:i?.news_articles?.map(a=>a.id)||[]});x.useEffect(()=>{p||o("slug",D(r.title))},[r.title]),x.useEffect(()=>()=>{f?.startsWith("blob:")&&URL.revokeObjectURL(f)},[f]);const _=a=>{f?.startsWith("blob:")&&URL.revokeObjectURL(f),o("cover_image",a),a?u(URL.createObjectURL(a)):i?.cover_image?u(`/uploads/${i.cover_image}`):u(null)},b=(a,n,g)=>{const j=[...r.agenda];j[a]={...j[a],[n]:g},o("agenda",j)},k=()=>{o("agenda",[...r.agenda,{time:"",title:"",description:""}])},S=a=>{o("agenda",r.agenda.filter((n,g)=>g!==a))},A=a=>{const n=Array.from(a.target.selectedOptions,g=>Number(g.value));o("news_article_ids",n)},L=a=>{a.preventDefault(),p?(E(n=>({...n,_method:"put"})),y(route("admin.events.update",i.id),{forceFormData:!0,preserveScroll:!0})):y(route("admin.events.store"),{forceFormData:!0,preserveScroll:!0})};return e.jsxs("form",{onSubmit:L,className:"gaf-event-form",children:[e.jsxs("div",{className:"gaf-event-form-layout",children:[e.jsxs("div",{className:"gaf-event-form-main",children:[e.jsxs("section",{className:"gaf-form-card",children:[e.jsx(h,{number:"01",title:"Event information",description:"Start with the essential details about your event."}),e.jsxs("div",{className:"gaf-form-card-body",children:[e.jsx(C,{value:d,onChange:N,data:r,errors:s,fields:["title","excerpt","description"]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"gaf-form-label",children:["Event title (",d.toUpperCase(),") ",d==="en"&&e.jsx("span",{children:"*"})]}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${s[t("title")]?"is-invalid":""}`,value:r[t("title")],onChange:a=>o(t("title"),a.target.value),placeholder:d==="rw"?"Umutwe w’igikorwa mu Kinyarwanda":"e.g. Annual Mental Health Research Conference",required:d==="en"}),e.jsx(l,{message:s[t("title")]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"URL slug"}),e.jsxs("div",{className:"gaf-slug-field",children:[e.jsx("span",{children:"gaf.rw/events/"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${s.slug?"is-invalid":""}`,value:r.slug,onChange:a=>o("slug",a.target.value),placeholder:"event-url"})]}),e.jsx(l,{message:s.slug}),!p&&e.jsx("small",{className:"gaf-form-hint",children:"Generated automatically from the event title. You can edit it if needed."})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[e.jsxs("label",{className:"gaf-form-label mb-0",children:["Short summary (",d.toUpperCase(),")"]}),e.jsxs("span",{className:"gaf-character-count",children:[(r[t("excerpt")]||"").length,"/500"]})]}),e.jsx("textarea",{rows:"3",maxLength:500,className:`form-control gaf-form-control ${s[t("excerpt")]?"is-invalid":""}`,value:r[t("excerpt")],onChange:a=>o(t("excerpt"),a.target.value),placeholder:"Write a short introduction that will appear in event listings..."}),e.jsx(l,{message:s[t("excerpt")]}),e.jsx("small",{className:"gaf-form-hint",children:"A concise introduction to help visitors understand what the event is about."})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"gaf-form-label",children:["Event description (",d.toUpperCase(),")"]}),e.jsx("div",{className:"gaf-rich-editor",children:e.jsx(T,{value:r[t("description")],onChange:a=>o(t("description"),a),placeholder:"Write the full event description..."},`description-${d}`)}),e.jsx(l,{message:s[t("description")]}),e.jsx("small",{className:"gaf-form-hint",children:"Use headings, paragraphs, lists and links to structure your event information."})]})]})]}),e.jsxs("section",{className:"gaf-form-card",children:[e.jsx(h,{number:"02",title:"Event cover image",description:"Choose a strong visual to represent this event."}),e.jsx("div",{className:"gaf-form-card-body",children:e.jsxs("div",{className:"gaf-event-image-upload",children:[f?e.jsxs("div",{className:"gaf-event-image-preview",children:[e.jsx("img",{src:f,alt:"Event cover preview"}),e.jsx("button",{type:"button",className:"gaf-image-remove",onClick:()=>_(null),title:"Remove selected image",children:e.jsx("i",{className:"bi bi-trash3"})})]}):e.jsxs("label",{htmlFor:"event-cover-image",className:"gaf-event-image-placeholder",children:[e.jsx("span",{className:"gaf-upload-icon",children:e.jsx("i",{className:"bi bi-cloud-arrow-up"})}),e.jsx("strong",{children:"Upload event cover image"}),e.jsx("span",{children:"Browse your files or drag and drop an image here"}),e.jsx("small",{children:"JPG, PNG or WEBP · Maximum 5 MB"})]}),e.jsx("input",{id:"event-cover-image",type:"file",accept:"image/jpeg,image/png,image/webp",className:"form-control gaf-form-control mt-3",onChange:a=>_(a.target.files[0]||null)}),e.jsx(l,{message:s.cover_image}),f&&e.jsx("small",{className:"gaf-form-hint",children:"Select another file above to replace the current image."})]})})]}),e.jsxs("section",{className:"gaf-form-card",children:[e.jsx(h,{number:"03",title:"Location and schedule",description:"Tell attendees where and when the event will take place."}),e.jsxs("div",{className:"gaf-form-card-body",children:[e.jsx(C,{value:d,onChange:N,data:r,errors:s,fields:["venue","city","address"]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:["Venue (",d.toUpperCase(),")"]}),e.jsx("input",{className:`form-control gaf-form-control ${s[t("venue")]?"is-invalid":""}`,value:r[t("venue")],onChange:a=>o(t("venue"),a.target.value),placeholder:"e.g. Kigali Convention Centre"}),e.jsx(l,{message:s[t("venue")]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:["City (",d.toUpperCase(),")"]}),e.jsx("input",{className:`form-control gaf-form-control ${s[t("city")]?"is-invalid":""}`,value:r[t("city")],onChange:a=>o(t("city"),a.target.value),placeholder:"Kigali"}),e.jsx(l,{message:s[t("city")]})]}),e.jsxs("div",{className:"col-12",children:[e.jsxs("label",{className:"gaf-form-label",children:["Street address (",d.toUpperCase(),")"]}),e.jsx("input",{className:`form-control gaf-form-control ${s[t("address")]?"is-invalid":""}`,value:r[t("address")],onChange:a=>o(t("address"),a.target.value),placeholder:"Enter the full venue address"}),e.jsx(l,{message:s[t("address")]})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:["Country ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-control gaf-form-control ${s.country?"is-invalid":""}`,value:r.country,onChange:a=>o("country",a.target.value),required:!0}),e.jsx(l,{message:s.country})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:["Timezone ",e.jsx("span",{children:"*"})]}),e.jsxs("select",{className:`form-select gaf-form-control ${s.timezone?"is-invalid":""}`,value:r.timezone,onChange:a=>o("timezone",a.target.value),required:!0,children:[e.jsx("option",{value:"Africa/Kigali",children:"Africa/Kigali (CAT)"}),e.jsx("option",{value:"Africa/Nairobi",children:"Africa/Nairobi (EAT)"}),e.jsx("option",{value:"UTC",children:"UTC"}),e.jsx("option",{value:"Europe/London",children:"Europe/London"})]}),e.jsx(l,{message:s.timezone})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:[e.jsx("i",{className:"bi bi-calendar-event me-1"}),"Start date and time ",e.jsx("span",{children:"*"})]}),e.jsx("input",{type:"datetime-local",className:`form-control gaf-form-control ${s.starts_at?"is-invalid":""}`,value:r.starts_at,onChange:a=>o("starts_at",a.target.value),required:!0}),e.jsx(l,{message:s.starts_at})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsxs("label",{className:"gaf-form-label",children:[e.jsx("i",{className:"bi bi-calendar-check me-1"}),"End date and time"]}),e.jsx("input",{type:"datetime-local",className:`form-control gaf-form-control ${s.ends_at?"is-invalid":""}`,value:r.ends_at,min:r.starts_at||void 0,onChange:a=>o("ends_at",a.target.value)}),e.jsx(l,{message:s.ends_at})]})]})]})]}),e.jsxs("section",{className:"gaf-form-card",children:[e.jsxs("div",{className:"gaf-form-card-header",children:[e.jsx(h,{number:"04",title:"Event agenda",description:"Build a schedule for your attendees."}),e.jsxs("button",{type:"button",className:"gaf-outline-btn",onClick:k,children:[e.jsx("i",{className:"bi bi-plus-lg"}),"Add session"]})]}),e.jsx("div",{className:"gaf-form-card-body",children:r.agenda.length===0?e.jsxs("div",{className:"gaf-agenda-empty",children:[e.jsx("i",{className:"bi bi-list-check"}),e.jsx("strong",{children:"No agenda items yet"}),e.jsx("span",{children:"Add sessions, activities or presentations to create an event schedule."}),e.jsxs("button",{type:"button",className:"gaf-outline-btn mt-3",onClick:k,children:[e.jsx("i",{className:"bi bi-plus-lg"}),"Add first session"]})]}):e.jsx("div",{className:"gaf-agenda-list",children:r.agenda.map((a,n)=>e.jsxs("div",{className:"gaf-agenda-item",children:[e.jsxs("div",{className:"gaf-agenda-item-top",children:[e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("span",{className:"gaf-agenda-index",children:String(n+1).padStart(2,"0")}),e.jsx("strong",{children:"Agenda session"})]}),e.jsx("button",{type:"button",className:"gaf-agenda-delete",onClick:()=>S(n),title:"Remove session",children:e.jsx("i",{className:"bi bi-trash3"})})]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Time"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${s[`agenda.${n}.time`]?"is-invalid":""}`,value:a.time||"",onChange:g=>b(n,"time",g.target.value),placeholder:"09:00 AM"}),e.jsx(l,{message:s[`agenda.${n}.time`]})]}),e.jsxs("div",{className:"col-md-8",children:[e.jsx("label",{className:"gaf-form-label",children:"Session title"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${s[`agenda.${n}.title`]?"is-invalid":""}`,value:a.title||"",onChange:g=>b(n,"title",g.target.value),placeholder:"e.g. Opening remarks"}),e.jsx(l,{message:s[`agenda.${n}.title`]})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"gaf-form-label",children:"Description"}),e.jsx("textarea",{rows:"2",className:`form-control gaf-form-control ${s[`agenda.${n}.description`]?"is-invalid":""}`,value:a.description||"",onChange:g=>b(n,"description",g.target.value),placeholder:"Describe this session..."}),e.jsx(l,{message:s[`agenda.${n}.description`]})]})]})]},n))})})]})]}),e.jsxs("aside",{className:"gaf-event-form-sidebar",children:[e.jsxs("section",{className:"gaf-form-card",children:[e.jsxs("div",{className:"gaf-form-sidebar-heading",children:[e.jsx("i",{className:"bi bi-diagram-3"}),e.jsx("h5",{children:"Organization"})]}),e.jsxs("div",{className:"gaf-form-card-body",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Event category"}),e.jsxs("select",{className:`form-select gaf-form-control ${s.event_category_id?"is-invalid":""}`,value:r.event_category_id,onChange:a=>o("event_category_id",a.target.value),children:[e.jsx("option",{value:"",children:"Select a category"}),m.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx(l,{message:s.event_category_id})]}),e.jsxs("div",{children:[e.jsx("label",{className:"gaf-form-label",children:"Related program"}),e.jsxs("select",{className:`form-select gaf-form-control ${s.program_id?"is-invalid":""}`,value:r.program_id,onChange:a=>o("program_id",a.target.value),children:[e.jsx("option",{value:"",children:"No linked program"}),$.map(a=>e.jsx("option",{value:a.id,children:a.title},a.id))]}),e.jsx(l,{message:s.program_id})]})]})]}),e.jsxs("section",{className:"gaf-form-card",children:[e.jsxs("div",{className:"gaf-form-sidebar-heading",children:[e.jsx("i",{className:"bi bi-newspaper"}),e.jsx("h5",{children:"Related news"})]}),e.jsxs("div",{className:"gaf-form-card-body",children:[e.jsx("p",{className:"gaf-form-description",children:"Connect published news or articles that provide additional information about this event."}),v.length>0?e.jsxs(e.Fragment,{children:[e.jsx("select",{multiple:!0,size:7,className:`form-select gaf-news-select ${s.news_article_ids?"is-invalid":""}`,value:r.news_article_ids.map(String),onChange:A,children:v.map(a=>e.jsx("option",{value:a.id,children:a.title},a.id))}),e.jsx(l,{message:s.news_article_ids}),e.jsx("small",{className:"gaf-form-hint",children:"Hold Ctrl (Windows) or Command (Mac) to select multiple articles."}),r.news_article_ids.length>0&&e.jsxs("div",{className:"gaf-selected-count",children:[e.jsx("i",{className:"bi bi-check-circle-fill"}),r.news_article_ids.length," article(s) selected"]}),r.news_article_ids.length>0&&e.jsx("button",{type:"button",className:"gaf-clear-selection",onClick:()=>o("news_article_ids",[]),children:"Clear selection"})]}):e.jsxs("div",{className:"gaf-no-related-content",children:[e.jsx("i",{className:"bi bi-info-circle"}),"No news articles available."]})]})]}),e.jsxs("section",{className:"gaf-form-card",children:[e.jsxs("div",{className:"gaf-form-sidebar-heading",children:[e.jsx("i",{className:"bi bi-send"}),e.jsx("h5",{children:"Publishing"})]}),e.jsxs("div",{className:"gaf-form-card-body",children:[e.jsx("label",{className:"gaf-form-label",children:"Publication status"}),e.jsxs("select",{className:`form-select gaf-form-control mb-3 ${s.status?"is-invalid":""}`,value:r.status,onChange:a=>o("status",a.target.value),children:[e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]}),e.jsx(l,{message:s.status}),e.jsxs("div",{className:"gaf-featured-toggle",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Featured event"}),e.jsx("span",{children:"Highlight this event on the website."})]}),e.jsx("div",{className:"form-check form-switch mb-0",children:e.jsx("input",{type:"checkbox",className:"form-check-input",id:"event-featured",checked:!!r.is_featured,onChange:a=>o("is_featured",a.target.checked)})})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"gaf-form-label",children:"Registration URL"}),e.jsx("input",{type:"url",className:`form-control gaf-form-control ${s.registration_url?"is-invalid":""}`,value:r.registration_url,onChange:a=>o("registration_url",a.target.value),placeholder:"https://..."}),e.jsx(l,{message:s.registration_url}),e.jsx("small",{className:"gaf-form-hint",children:"Optional link where visitors can register."})]})]})]}),e.jsxs("section",{className:"gaf-form-actions-card",children:[e.jsxs("div",{className:"gaf-form-actions-intro",children:[e.jsx("i",{className:"bi bi-check2-square"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Ready to save?"}),e.jsx("span",{children:"Review your event details before submitting."})]})]}),e.jsx("button",{type:"submit",className:"gaf-form-submit",disabled:w,children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm"}),"Saving event..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check-lg"}),p?"Save changes":"Create event"]})}),e.jsx(U,{href:route("admin.events.index"),className:"gaf-form-cancel",children:"Cancel"})]})]})]}),e.jsx("style",{children:`
                .gaf-event-form {
                    width: 100%;
                    color: #172033;
                }

                .gaf-event-form-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 330px;
                    align-items: start;
                    gap: 22px;
                }

                .gaf-event-form-main,
                .gaf-event-form-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .gaf-form-card {
                    min-width: 0;
                    overflow: hidden;
                    border: 1px solid #e8edf3;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-form-card-body {
                    padding: 22px;
                }

                .gaf-form-section-heading {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    padding: 19px 22px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-section-number {
                    display: flex;
                    flex: 0 0 31px;
                    width: 31px;
                    height: 31px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                }

                .gaf-form-section-heading h5 {
                    margin: 1px 0 5px;
                    color: #26344a;
                    font-size: 13px;
                    font-weight: 750;
                }

                .gaf-form-section-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .gaf-form-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-card-header .gaf-form-section-heading {
                    flex: 1;
                    border-bottom: 0;
                }

                .gaf-form-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #46536a;
                    font-size: 11px;
                    font-weight: 750;
                }

                .gaf-form-label span {
                    color: #d45c5c;
                }

                .gaf-form-control {
                    min-height: 42px;
                    border-color: #e2e7ee;
                    border-radius: 6px;
                    color: #344054;
                    font-size: 12px;
                    box-shadow: none;
                }

                textarea.gaf-form-control {
                    min-height: auto;
                    resize: vertical;
                }

                .gaf-form-control:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-form-control::placeholder {
                    color: #a8b0bd;
                }

                .gaf-form-hint {
                    display: block;
                    margin-top: 7px;
                    color: #98a1af;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-field-error {
                    margin-top: 6px;
                    color: #c74747;
                    font-size: 10px;
                }

                .gaf-character-count {
                    color: #9aa3b1;
                    font-size: 10px;
                }

                .gaf-slug-field {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    overflow: hidden;
                    border: 1px solid #e2e7ee;
                    border-radius: 6px;
                }

                .gaf-slug-field > span {
                    display: flex;
                    align-items: center;
                    align-self: stretch;
                    padding: 0 11px;
                    border-right: 1px solid #e2e7ee;
                    background: #f8fafc;
                    color: #8994a5;
                    font-size: 10px;
                    white-space: nowrap;
                }

                .gaf-slug-field .gaf-form-control {
                    border: 0;
                    border-radius: 0;
                }

                .gaf-slug-field:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-slug-field .gaf-form-control:focus {
                    box-shadow: none;
                }

                .gaf-rich-editor {
                    overflow: hidden;
                    border: 1px solid #e2e7ee;
                    border-radius: 7px;
                }

                .gaf-rich-editor:focus-within {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .09);
                }

                .gaf-event-image-placeholder {
                    display: flex;
                    min-height: 215px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 25px;
                    border: 1px dashed #cbe4d6;
                    border-radius: 8px;
                    background: #fafbfd;
                    text-align: center;
                    cursor: pointer;
                    transition: background .2s ease, border-color .2s ease;
                }

                .gaf-event-image-placeholder:hover {
                    border-color: #20603d;
                    background: #f5f8fc;
                }

                .gaf-upload-icon {
                    display: flex;
                    width: 45px;
                    height: 45px;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 4px;
                    border-radius: 50%;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 21px;
                }

                .gaf-event-image-placeholder strong {
                    color: #39475d;
                    font-size: 12px;
                }

                .gaf-event-image-placeholder span:not(.gaf-upload-icon) {
                    color: #929baa;
                    font-size: 10px;
                }

                .gaf-event-image-placeholder small {
                    color: #a0a8b4;
                    font-size: 10px;
                }

                .gaf-event-image-preview {
                    position: relative;
                    overflow: hidden;
                    border-radius: 8px;
                    background: #f1f3f6;
                }

                .gaf-event-image-preview img {
                    display: block;
                    width: 100%;
                    max-height: 340px;
                    object-fit: cover;
                }

                .gaf-image-remove {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    display: flex;
                    width: 34px;
                    height: 34px;
                    align-items: center;
                    justify-content: center;
                    border: 0;
                    border-radius: 6px;
                    background: rgba(30, 40, 55, .8);
                    color: #fff;
                    cursor: pointer;
                }

                .gaf-image-remove:hover {
                    background: #c74747;
                }

                .gaf-outline-btn {
                    display: inline-flex;
                    min-height: 34px;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    margin-right: 20px;
                    padding: 0 11px;
                    border: 1px solid #deeee5;
                    border-radius: 6px;
                    background: #fff;
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .gaf-outline-btn:hover {
                    border-color: #aed6bf;
                    background: #f5f8fc;
                }

                .gaf-agenda-empty {
                    display: flex;
                    min-height: 190px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .gaf-agenda-empty > i {
                    margin-bottom: 12px;
                    color: #8dc5a5;
                    font-size: 28px;
                }

                .gaf-agenda-empty strong {
                    color: #46536a;
                    font-size: 12px;
                }

                .gaf-agenda-empty span {
                    max-width: 310px;
                    margin-top: 6px;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-agenda-empty .gaf-outline-btn {
                    margin-right: 0;
                }

                .gaf-agenda-item {
                    margin-bottom: 13px;
                    padding: 16px;
                    border: 1px solid #e9edf3;
                    border-radius: 7px;
                    background: #fcfdff;
                }

                .gaf-agenda-item:last-child {
                    margin-bottom: 0;
                }

                .gaf-agenda-item-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 15px;
                }

                .gaf-agenda-item-top strong {
                    color: #47546a;
                    font-size: 11px;
                }

                .gaf-agenda-index {
                    display: flex;
                    width: 25px;
                    height: 25px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 9px;
                    font-weight: 800;
                }

                .gaf-agenda-delete {
                    display: flex;
                    width: 29px;
                    height: 29px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #f0dddd;
                    border-radius: 5px;
                    background: #fff;
                    color: #c65c5c;
                    font-size: 11px;
                }

                .gaf-agenda-delete:hover {
                    background: #fff1f1;
                }

                .gaf-form-sidebar-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 17px 19px;
                    border-bottom: 1px solid #edf0f4;
                }

                .gaf-form-sidebar-heading > i {
                    color: #20603d;
                    font-size: 15px;
                }

                .gaf-form-sidebar-heading h5 {
                    margin: 0;
                    color: #26344a;
                    font-size: 12px;
                    font-weight: 750;
                }

                .gaf-form-sidebar .gaf-form-card-body {
                    padding: 19px;
                }

                .gaf-form-description {
                    margin: 0 0 13px;
                    color: #8d97a6;
                    font-size: 10px;
                    line-height: 1.65;
                }

                .gaf-news-select {
                    min-height: 150px;
                    border-color: #e2e7ee;
                    border-radius: 6px;
                    color: #596579;
                    font-size: 10px;
                }

                .gaf-news-select option {
                    padding: 7px;
                }

                .gaf-selected-count {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 12px;
                    color: #25845f;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-clear-selection {
                    margin-top: 9px;
                    padding: 0;
                    border: 0;
                    background: transparent;
                    color: #bf5555;
                    font-size: 10px;
                    font-weight: 650;
                }

                .gaf-no-related-content {
                    padding: 13px;
                    border: 1px solid #edf0f4;
                    border-radius: 6px;
                    background: #fafbfd;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .gaf-featured-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 13px;
                    border: 1px solid #e9edf3;
                    border-radius: 7px;
                    background: #fafbfd;
                }

                .gaf-featured-toggle > div:first-child {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-featured-toggle strong {
                    color: #47546a;
                    font-size: 11px;
                }

                .gaf-featured-toggle span {
                    color: #929baa;
                    font-size: 9px;
                }

                .gaf-featured-toggle .form-check-input {
                    width: 34px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                }

                .gaf-featured-toggle .form-check-input:checked {
                    border-color: #20603d;
                    background-color: #20603d;
                }

                .gaf-form-actions-card {
                    padding: 19px;
                    border: 1px solid #e5f1ea;
                    border-radius: 9px;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(25, 42, 70, .025);
                }

                .gaf-form-actions-intro {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    margin-bottom: 17px;
                }

                .gaf-form-actions-intro > i {
                    color: #20603d;
                    font-size: 17px;
                }

                .gaf-form-actions-intro div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .gaf-form-actions-intro strong {
                    color: #39475d;
                    font-size: 11px;
                }

                .gaf-form-actions-intro span {
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .gaf-form-submit {
                    display: flex;
                    width: 100%;
                    min-height: 42px;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: 1px solid #20603d;
                    border-radius: 6px;
                    background: #20603d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 750;
                    transition: background .2s ease;
                }

                .gaf-form-submit:hover:not(:disabled) {
                    background: #174a2f;
                }

                .gaf-form-submit:disabled {
                    cursor: not-allowed;
                    opacity: .7;
                }

                .gaf-form-cancel {
                    display: flex;
                    min-height: 39px;
                    align-items: center;
                    justify-content: center;
                    margin-top: 8px;
                    border: 1px solid #e5e9ef;
                    border-radius: 6px;
                    background: #fff;
                    color: #687589;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .gaf-form-cancel:hover {
                    background: #f7f8fa;
                    color: #344054;
                }

                @media (max-width: 1050px) {
                    .gaf-event-form-layout {
                        grid-template-columns: minmax(0, 1fr) 290px;
                        gap: 16px;
                    }
                }

                @media (max-width: 850px) {
                    .gaf-event-form-layout {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .gaf-event-form-sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        align-items: start;
                    }

                    .gaf-form-actions-card {
                        align-self: start;
                    }
                }

                @media (max-width: 600px) {
                    .gaf-event-form-sidebar {
                        display: flex;
                    }

                    .gaf-form-card-body {
                        padding: 17px;
                    }

                    .gaf-form-section-heading {
                        padding: 16px 17px;
                    }

                    .gaf-form-card-header {
                        align-items: flex-start;
                    }

                    .gaf-form-card-header .gaf-outline-btn {
                        margin-top: 15px;
                        margin-right: 12px;
                    }

                    .gaf-slug-field > span {
                        padding: 0 7px;
                        font-size: 9px;
                    }
                }
            `})]})}export{q as default};
