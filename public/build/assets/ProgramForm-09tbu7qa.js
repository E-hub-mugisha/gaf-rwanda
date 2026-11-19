import{b as N,r as n,j as e,L as y}from"./app-B2r5GH2N.js";function k({program:i,mode:m}){const d=m==="edit",{data:s,setData:o,post:c,transform:g,processing:p,errors:a}=N({title:i?.title||"",slug:i?.slug||"",short_description:i?.short_description||"",description:i?.description||"",cover_image:null,status:i?.status||"active",start_date:i?.start_date||"",end_date:i?.end_date||"",is_featured:i?.is_featured??!1,sort_order:i?.sort_order??0}),[t,x]=n.useState(i?.cover_image?`/uploads/${i.cover_image}`:null),[h,u]=n.useState(!!i?.slug);n.useEffect(()=>()=>{t?.startsWith("blob:")&&URL.revokeObjectURL(t)},[t]);const f=r=>{if(o("title",r),!h){const l=r.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");o("slug",l)}},b=r=>{const l=r.target.files?.[0]||null;o("cover_image",l),t?.startsWith("blob:")&&URL.revokeObjectURL(t),x(l?URL.createObjectURL(l):i?.cover_image?`/uploads/${i.cover_image}`:null)},v=r=>{if(r.preventDefault(),d&&i?.id){g(l=>({...l,_method:"put"})),c(route("admin.programs.update",i.id),{forceFormData:!0,preserveScroll:!0});return}c(route("admin.programs.store"),{forceFormData:!0,preserveScroll:!0})},j=[{value:"active",label:"Active",description:"Visible as an active program",icon:"bi-check-circle"},{value:"inactive",label:"Inactive",description:"Not currently active",icon:"bi-pause-circle"},{value:"completed",label:"Completed",description:"Program activities are complete",icon:"bi-flag"}];return e.jsxs("form",{onSubmit:v,className:"program-form",children:[e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs("section",{className:"program-form-card",children:[e.jsxs("div",{className:"program-card-header",children:[e.jsxs("div",{className:"program-card-heading",children:[e.jsx("div",{className:"program-card-icon",children:e.jsx("i",{className:"bi bi-card-text"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Program information"}),e.jsx("p",{children:"Provide the essential details about this program."})]})]}),e.jsx("span",{className:"program-required-note",children:"* Required fields"})]}),e.jsxs("div",{className:"program-card-body",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"program-label",children:["Program title ",e.jsx("span",{children:"*"})]}),e.jsx("input",{type:"text",className:`form-control program-input ${a.title?"is-invalid":""}`,value:s.title,onChange:r=>f(r.target.value),placeholder:"e.g. Community Mental Health Research",required:!0}),a.title&&e.jsx("div",{className:"invalid-feedback",children:a.title})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"program-label",children:"URL slug"}),e.jsxs("div",{className:"program-slug-input",children:[e.jsx("span",{children:e.jsx("i",{className:"bi bi-link-45deg"})}),e.jsx("input",{type:"text",className:`form-control program-input ${a.slug?"is-invalid":""}`,value:s.slug,onChange:r=>{u(!0),o("slug",r.target.value)},placeholder:"program-url"})]}),a.slug&&e.jsx("div",{className:"text-danger small mt-1",children:a.slug}),e.jsx("div",{className:"program-help",children:"Used in the public program URL. It is generated from the title by default."})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center gap-2 mb-2",children:[e.jsx("label",{className:"program-label mb-0",children:"Short description"}),e.jsxs("span",{className:"program-counter",children:[s.short_description.length,"/500"]})]}),e.jsx("textarea",{className:`form-control program-input program-textarea ${a.short_description?"is-invalid":""}`,rows:3,maxLength:500,value:s.short_description,onChange:r=>o("short_description",r.target.value),placeholder:"Write a concise introduction to this program..."}),a.short_description&&e.jsx("div",{className:"invalid-feedback",children:a.short_description}),e.jsx("div",{className:"program-help",children:"This summary can be used on program cards and listing pages."})]}),e.jsxs("div",{children:[e.jsx("label",{className:"program-label",children:"Full description"}),e.jsx("textarea",{className:`form-control program-input program-description ${a.description?"is-invalid":""}`,rows:11,value:s.description,onChange:r=>o("description",r.target.value),placeholder:"Describe the program, its objectives, target audience, activities and expected outcomes..."}),a.description&&e.jsx("div",{className:"invalid-feedback",children:a.description}),e.jsx("div",{className:"program-help",children:"Provide enough detail to help visitors understand the purpose and scope of the program."})]})]})]}),e.jsxs("section",{className:"program-form-card mt-4",children:[e.jsx("div",{className:"program-card-header",children:e.jsxs("div",{className:"program-card-heading",children:[e.jsx("div",{className:"program-card-icon",children:e.jsx("i",{className:"bi bi-image"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Program cover image"}),e.jsx("p",{children:"Add a visual image to represent this program."})]})]})}),e.jsxs("div",{className:"program-card-body",children:[t?e.jsxs("div",{className:"program-image-preview",children:[e.jsx("img",{src:t,alt:"Program cover preview"}),e.jsx("div",{className:"program-image-overlay",children:e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-eye me-1"}),"Image preview"]})})]}):e.jsxs("div",{className:"program-image-placeholder",children:[e.jsx("div",{className:"program-image-placeholder-icon",children:e.jsx("i",{className:"bi bi-cloud-arrow-up"})}),e.jsx("strong",{children:"No cover image selected"}),e.jsx("span",{children:"Upload an image to create a visual identity for this program."})]}),e.jsxs("div",{className:"program-upload-area mt-3",children:[e.jsxs("label",{htmlFor:"program-cover-image",className:"program-upload-label",children:[e.jsx("i",{className:"bi bi-upload"}),e.jsx("span",{children:t?"Change cover image":"Choose an image"})]}),e.jsx("input",{id:"program-cover-image",type:"file",accept:"image/png,image/jpeg,image/webp",className:`form-control program-file-input ${a.cover_image?"is-invalid":""}`,onChange:b}),a.cover_image&&e.jsx("div",{className:"text-danger small mt-2",children:a.cover_image})]}),e.jsxs("div",{className:"program-upload-hint",children:[e.jsx("i",{className:"bi bi-info-circle"}),"JPG, PNG or WEBP. Maximum file size: 4 MB."]})]})]})]}),e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("section",{className:"program-form-card",children:[e.jsx("div",{className:"program-card-header",children:e.jsxs("div",{className:"program-card-heading",children:[e.jsx("div",{className:"program-card-icon",children:e.jsx("i",{className:"bi bi-sliders"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Publishing settings"}),e.jsx("p",{children:"Control the program's status."})]})]})}),e.jsxs("div",{className:"program-card-body",children:[e.jsxs("label",{className:"program-label",children:["Program status ",e.jsx("span",{children:"*"})]}),e.jsx("div",{className:"program-status-options",children:j.map(r=>e.jsxs("button",{type:"button",className:`program-status-option ${s.status===r.value?"selected":""}`,onClick:()=>o("status",r.value),children:[e.jsx("span",{className:"program-status-icon",children:e.jsx("i",{className:`bi ${r.icon}`})}),e.jsxs("span",{className:"program-status-copy",children:[e.jsx("strong",{children:r.label}),e.jsx("small",{children:r.description})]}),e.jsx("span",{className:"program-status-check",children:s.status===r.value&&e.jsx("i",{className:"bi bi-check-circle-fill"})})]},r.value))}),a.status&&e.jsx("div",{className:"text-danger small mt-2",children:a.status}),e.jsx("div",{className:"program-field-divider"}),e.jsx("label",{className:"program-label",children:"Display order"}),e.jsx("input",{type:"number",min:"0",className:`form-control program-input ${a.sort_order?"is-invalid":""}`,value:s.sort_order,onChange:r=>o("sort_order",r.target.value===""?"":Number(r.target.value))}),a.sort_order&&e.jsx("div",{className:"invalid-feedback",children:a.sort_order}),e.jsx("div",{className:"program-help",children:"Lower numbers appear first when programs are sorted by display order."}),e.jsxs("div",{className:"program-featured-setting",children:[e.jsx("div",{className:"program-featured-icon",children:e.jsx("i",{className:"bi bi-star"})}),e.jsxs("div",{className:"program-featured-copy",children:[e.jsx("strong",{children:"Featured program"}),e.jsx("span",{children:"Highlight this program on the website."})]}),e.jsx("div",{className:"form-check form-switch mb-0",children:e.jsx("input",{className:"form-check-input program-switch",type:"checkbox",role:"switch",id:"program-featured",checked:s.is_featured,onChange:r=>o("is_featured",r.target.checked)})})]})]})]}),e.jsxs("section",{className:"program-form-card mt-4",children:[e.jsx("div",{className:"program-card-header",children:e.jsxs("div",{className:"program-card-heading",children:[e.jsx("div",{className:"program-card-icon",children:e.jsx("i",{className:"bi bi-calendar3"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Program timeline"}),e.jsx("p",{children:"Set the program duration."})]})]})}),e.jsxs("div",{className:"program-card-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"program-label",children:"Start date"}),e.jsxs("div",{className:"program-date-field",children:[e.jsx("i",{className:"bi bi-calendar-event"}),e.jsx("input",{type:"date",className:`form-control program-input ${a.start_date?"is-invalid":""}`,value:s.start_date,onChange:r=>o("start_date",r.target.value)})]}),a.start_date&&e.jsx("div",{className:"text-danger small mt-1",children:a.start_date})]}),e.jsxs("div",{children:[e.jsx("label",{className:"program-label",children:"End date"}),e.jsxs("div",{className:"program-date-field",children:[e.jsx("i",{className:"bi bi-calendar-check"}),e.jsx("input",{type:"date",min:s.start_date||void 0,className:`form-control program-input ${a.end_date?"is-invalid":""}`,value:s.end_date,onChange:r=>o("end_date",r.target.value)})]}),a.end_date&&e.jsx("div",{className:"text-danger small mt-1",children:a.end_date})]}),e.jsx("div",{className:"program-help mt-3",children:"Leave the dates empty if the program does not have a confirmed schedule."})]})]}),e.jsxs("div",{className:"program-form-tip mt-4",children:[e.jsx("div",{className:"program-tip-icon",children:e.jsx("i",{className:"bi bi-lightbulb"})}),e.jsxs("div",{children:[e.jsx("strong",{children:"Before you save"}),e.jsx("p",{children:"Review the program title, description, status and cover image to ensure the information is ready for your website."})]})]})]})]}),e.jsxs("div",{className:"program-form-actions",children:[e.jsxs("div",{className:"program-form-action-info",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:d?"Your changes will update this program.":"Your program details will be saved securely."})]}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(y,{href:route("admin.programs.index"),className:"program-cancel-button",children:"Cancel"}),e.jsx("button",{type:"submit",className:"program-submit-button",disabled:p,children:p?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:`bi ${d?"bi-check2-circle":"bi-plus-circle"}`}),d?"Save changes":"Create program"]})})]})]}),e.jsx("style",{children:`
                .program-form {
                    color: #172033;
                }

                .program-form-card {
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    box-shadow: 0 3px 12px rgba(25,42,70,.025);
                }

                .program-card-header {
                    min-height: 76px;
                    padding: 16px 21px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border-bottom: 1px solid #edf0f4;
                }

                .program-card-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .program-card-icon {
                    width: 37px;
                    height: 37px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 10px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 17px;
                }

                .program-card-heading h5 {
                    margin: 0;
                    color: #263348;
                    font-size: 12px;
                    font-weight: 800;
                }

                .program-card-heading p {
                    margin: 4px 0 0;
                    color: #929baa;
                    font-size: 10px;
                }

                .program-required-note {
                    color: #9aa4b1;
                    font-size: 9px;
                    white-space: nowrap;
                }

                .program-card-body {
                    padding: 22px;
                }

                .program-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #344054;
                    font-size: 10.5px;
                    font-weight: 800;
                }

                .program-label > span {
                    color: #d65b5b;
                }

                .program-input {
                    min-height: 42px;
                    padding: 10px 12px;
                    border: 1px solid #e1e7ef;
                    border-radius: 8px;
                    background-color: #fff;
                    color: #344054;
                    font-family: inherit;
                    font-size: 11px;
                    box-shadow: none;
                    transition: border-color .18s ease, box-shadow .18s ease;
                }

                .program-input::placeholder {
                    color: #a7b0bd;
                }

                .program-input:focus {
                    border-color: #93c7aa;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.1);
                }

                .program-textarea {
                    min-height: 90px;
                    resize: vertical;
                    line-height: 1.7;
                }

                .program-description {
                    min-height: 250px;
                    line-height: 1.8;
                }

                .program-help {
                    margin-top: 7px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .program-counter {
                    color: #98a2b1;
                    font-size: 9px;
                    font-weight: 700;
                }

                .program-slug-input {
                    display: flex;
                    align-items: stretch;
                }

                .program-slug-input > span {
                    width: 40px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border: 1px solid #e1e7ef;
                    border-right: 0;
                    border-radius: 8px 0 0 8px;
                    background: #f7f9fc;
                    color: #8793a4;
                }

                .program-slug-input .program-input {
                    border-radius: 0 8px 8px 0;
                }

                .program-image-preview {
                    position: relative;
                    overflow: hidden;
                    height: 250px;
                    border-radius: 10px;
                    background: #f3f6fa;
                    border: 1px solid #e8edf3;
                }

                .program-image-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .program-image-overlay {
                    position: absolute;
                    inset: auto 0 0;
                    padding: 24px 13px 12px;
                    background: rgba(15, 25, 40, 0.51);
                    color: #fff;
                    font-size: 10px;
                    font-weight: 700;
                }

                .program-image-placeholder {
                    min-height: 190px;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #cbe4d6;
                    border-radius: 10px;
                    background: #fafbfd;
                    text-align: center;
                }

                .program-image-placeholder-icon {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 12px;
                    border-radius: 13px;
                    background: #f1f8f4;
                    color: #20603d;
                    font-size: 22px;
                }

                .program-image-placeholder strong {
                    color: #465267;
                    font-size: 11px;
                    font-weight: 800;
                }

                .program-image-placeholder span {
                    max-width: 270px;
                    margin-top: 6px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .program-upload-area {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 10px;
                }

                .program-upload-label {
                    min-height: 37px;
                    padding: 0 13px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: 1px solid #deeee5;
                    border-radius: 7px;
                    background: #f8fafd;
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .program-upload-label:hover {
                    border-color: #c0decd;
                    background: #f1f8f4;
                }

                .program-file-input {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                    clip: rect(0,0,0,0);
                    white-space: nowrap;
                }

                .program-upload-hint {
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #98a2b1;
                    font-size: 9px;
                }

                .program-upload-hint i {
                    color: #20603d;
                }

                /* STATUS OPTIONS */
                .program-status-options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .program-status-option {
                    width: 100%;
                    min-height: 59px;
                    padding: 9px 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #e7ebf1;
                    border-radius: 9px;
                    background: #fff;
                    text-align: left;
                    transition: .18s ease;
                }

                .program-status-option:hover {
                    border-color: #d0e6da;
                    background: #fafcff;
                }

                .program-status-option.selected {
                    border-color: #b2d7c2;
                    background: #f4f8fd;
                }

                .program-status-icon {
                    width: 31px;
                    height: 31px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #f1f4f8;
                    color: #718096;
                    font-size: 14px;
                }

                .program-status-option.selected .program-status-icon {
                    background: #e9f3ed;
                    color: #174a2f;
                }

                .program-status-copy {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .program-status-copy strong {
                    color: #344054;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-status-copy small {
                    color: #98a2b1;
                    font-size: 8.5px;
                }

                .program-status-check {
                    color: #20603d;
                    font-size: 15px;
                }

                .program-field-divider {
                    height: 1px;
                    margin: 20px 0;
                    background: #edf0f4;
                }

                .program-featured-setting {
                    margin-top: 21px;
                    padding: 13px 11px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #edf0f4;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .program-featured-icon {
                    width: 32px;
                    height: 32px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #fff5df;
                    color: #c18b2e;
                    font-size: 14px;
                }

                .program-featured-copy {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .program-featured-copy strong {
                    color: #344054;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-featured-copy span {
                    color: #98a2b1;
                    font-size: 8.5px;
                    line-height: 1.4;
                }

                .program-switch {
                    width: 2.1em;
                    height: 1.1em;
                    margin: 0;
                    cursor: pointer;
                }

                .program-switch:checked {
                    background-color: #20603d;
                    border-color: #20603d;
                }

                .program-date-field {
                    position: relative;
                }

                .program-date-field > i {
                    position: absolute;
                    top: 50%;
                    left: 12px;
                    z-index: 2;
                    color: #8b98a9;
                    font-size: 13px;
                    transform: translateY(-50%);
                    pointer-events: none;
                }

                .program-date-field .program-input {
                    padding-left: 36px;
                }

                .program-form-tip {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    padding: 15px;
                    border: 1px solid #e9f3ed;
                    border-radius: 10px;
                    background: #f6f9fd;
                }

                .program-tip-icon {
                    width: 30px;
                    height: 30px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background: #ecf5f0;
                    color: #20603d;
                    font-size: 14px;
                }

                .program-form-tip strong {
                    display: block;
                    margin: 2px 0 5px;
                    color: #41516a;
                    font-size: 10px;
                    font-weight: 800;
                }

                .program-form-tip p {
                    margin: 0;
                    color: #8793a4;
                    font-size: 9px;
                    line-height: 1.7;
                }

                /* ACTION BAR */
                .program-form-actions {
                    position: sticky;
                    bottom: 0;
                    z-index: 10;
                    margin-top: 25px;
                    padding: 14px 18px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    background: rgba(255,255,255,.97);
                    box-shadow: 0 -5px 20px rgba(25,42,70,.035);
                    backdrop-filter: blur(10px);
                }

                .program-form-action-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #8994a5;
                    font-size: 9px;
                }

                .program-form-action-info i {
                    color: #20603d;
                    font-size: 14px;
                }

                .program-cancel-button,
                .program-submit-button {
                    min-height: 39px;
                    padding: 0 16px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .program-cancel-button {
                    border: 1px solid #e1e7ef;
                    background: #fff;
                    color: #667085;
                }

                .program-cancel-button:hover {
                    background: #f7f9fc;
                    color: #344054;
                }

                .program-submit-button {
                    border: 1px solid #20603d;
                    background: #20603d;
                    color: #fff;
                }

                .program-submit-button:hover:not(:disabled) {
                    border-color: #174a2f;
                    background: #174a2f;
                    box-shadow: 0 4px 12px rgba(23, 74, 47,.18);
                }

                .program-submit-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                @media (max-width: 767px) {
                    .program-card-body {
                        padding: 17px;
                    }

                    .program-card-header {
                        padding: 14px 17px;
                    }

                    .program-image-preview {
                        height: 200px;
                    }

                    .program-form-actions {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .program-form-action-info {
                        justify-content: center;
                    }

                    .program-form-actions > .d-flex {
                        width: 100%;
                    }

                    .program-cancel-button,
                    .program-submit-button {
                        flex: 1;
                    }
                }

                @media (max-width: 420px) {
                    .program-required-note {
                        display: none;
                    }

                    .program-status-copy small {
                        font-size: 8px;
                    }

                    .program-form-actions {
                        padding: 12px;
                    }
                }
            `})]})}export{k as default};
