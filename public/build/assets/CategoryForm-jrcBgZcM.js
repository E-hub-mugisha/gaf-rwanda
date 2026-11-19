import{b as f,r as d,j as e,L as b}from"./app-BqJN-hOp.js";const g="#20603d",u=["#20603d","#D05208","#254035","#16A085","#8E44AD","#E74C3C","#D4A017","#34495E"];function j({mode:p="create",category:o=null}){const t=p==="edit",{data:r,setData:i,post:x,put:h,processing:l,errors:s}=f({name:o?.name||"",name_rw:o?.name_rw||"",slug:o?.slug||"",description:o?.description||"",color:o?.color||g,is_active:o?.is_active??!0,sort_order:o?.sort_order??0}),[n,m]=d.useState(t);d.useEffect(()=>{if(t||n)return;const a=r.name.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");i("slug",a)},[r.name,t,n]);const c=a=>/^#[0-9A-Fa-f]{6}$/.test(a)?a:g,y=a=>{a.preventDefault(),t?h(route("admin.event-categories.update",o.id),{preserveScroll:!0}):x(route("admin.event-categories.store"),{preserveScroll:!0})};return e.jsxs("form",{onSubmit:y,children:[e.jsxs("div",{className:"row g-4 event-category-form",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs("div",{className:"category-form-card",children:[e.jsxs("div",{className:"category-form-heading",children:[e.jsx("div",{className:"category-heading-icon",children:e.jsx("i",{className:"bi bi-info-circle"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Category information"}),e.jsx("p",{children:"Provide the basic information used to identify and organize this category."})]})]}),e.jsxs("div",{className:"category-form-body",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"category-label",children:["Category name",e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),e.jsx("input",{type:"text",className:`form-control category-input ${s.name?"is-invalid":""}`,value:r.name,onChange:a=>i("name",a.target.value),placeholder:"e.g. Workshops, Conferences, Training",maxLength:150,required:!0}),s.name&&e.jsx("div",{className:"invalid-feedback",children:s.name}),e.jsx("div",{className:"category-help",children:"Choose a short, recognizable category name."})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"category-label",children:"Category name (Kinyarwanda)"}),e.jsx("input",{type:"text",className:`form-control category-input ${s.name_rw?"is-invalid":""}`,value:r.name_rw,onChange:a=>i("name_rw",a.target.value),placeholder:"Urugero: Amahugurwa, Inama",maxLength:150}),s.name_rw&&e.jsx("div",{className:"invalid-feedback",children:s.name_rw}),e.jsx("div",{className:"category-help",children:"Shown to Kinyarwanda visitors. The English name is used when empty."})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"category-label",children:"URL slug"}),e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text category-input-prefix",children:e.jsx("i",{className:"bi bi-link-45deg"})}),e.jsx("input",{type:"text",className:`form-control category-input ${s.slug?"is-invalid":""}`,value:r.slug,onChange:a=>{m(!0),i("slug",a.target.value.toLowerCase().trim().replace(/[^a-z0-9-]+/g,"-").replace(/-+/g,"-"))},placeholder:"workshops"})]}),s.slug&&e.jsx("div",{className:"text-danger small mt-1",children:s.slug}),e.jsx("div",{className:"category-help",children:"Used in category URLs. You can customize this value."})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[e.jsx("label",{className:"category-label mb-0",children:"Description"}),e.jsxs("span",{className:"category-character-count",children:[r.description.length," characters"]})]}),e.jsx("textarea",{className:`form-control category-textarea ${s.description?"is-invalid":""}`,rows:"6",maxLength:1e3,value:r.description,onChange:a=>i("description",a.target.value),placeholder:"Explain what this category represents and the types of events that belong to it..."}),s.description&&e.jsx("div",{className:"invalid-feedback",children:s.description}),e.jsx("div",{className:"category-help",children:"An optional description to help visitors understand the category."})]})]})]}),e.jsxs("div",{className:"category-form-card mt-4",children:[e.jsxs("div",{className:"category-form-heading",children:[e.jsx("div",{className:"category-heading-icon",children:e.jsx("i",{className:"bi bi-sliders"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Display settings"}),e.jsx("p",{children:"Control how this category appears across the website."})]})]}),e.jsxs("div",{className:"category-form-body",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"category-label",children:"Category color"}),e.jsxs("div",{className:"category-color-selector",children:[e.jsx("div",{className:"category-color-preview",children:e.jsx("input",{type:"color",value:c(r.color),onChange:a=>i("color",a.target.value),"aria-label":"Choose category color"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("input",{type:"text",className:`form-control category-input ${s.color?"is-invalid":""}`,value:r.color,onChange:a=>i("color",a.target.value),placeholder:"#20603d"}),s.color&&e.jsx("div",{className:"invalid-feedback",children:s.color})]})]}),e.jsx("div",{className:"category-color-presets mt-3",children:u.map(a=>e.jsx("button",{type:"button",className:`category-color-swatch ${r.color.toLowerCase()===a.toLowerCase()?"selected":""}`,style:{backgroundColor:a},onClick:()=>i("color",a),"aria-label":`Select ${a}`,title:a,children:r.color.toLowerCase()===a.toLowerCase()&&e.jsx("i",{className:"bi bi-check-lg"})},a))}),e.jsx("div",{className:"category-help",children:"This color identifies the category in event listings and category badges."})]}),e.jsx("div",{className:"category-divider"}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"category-label",children:"Display order"}),e.jsx("input",{type:"number",min:"0",className:`form-control category-input ${s.sort_order?"is-invalid":""}`,value:r.sort_order,onChange:a=>i("sort_order",a.target.value)}),s.sort_order&&e.jsx("div",{className:"invalid-feedback",children:s.sort_order}),e.jsx("div",{className:"category-help",children:"Lower numbers appear first."})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"category-label",children:"Visibility"}),e.jsxs("div",{className:`category-status-select ${r.is_active?"is-active":""}`,children:[e.jsxs("div",{children:[e.jsx("strong",{children:r.is_active?"Active":"Inactive"}),e.jsx("span",{children:r.is_active?"Available for events":"Not available for new events"})]}),e.jsx("div",{className:"form-check form-switch mb-0",children:e.jsx("input",{type:"checkbox",className:"form-check-input",role:"switch",checked:r.is_active,onChange:a=>i("is_active",a.target.checked),"aria-label":"Toggle category status"})})]})]})]})]})]})]}),e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("div",{className:"category-form-card category-preview-card",children:[e.jsxs("div",{className:"category-form-heading",children:[e.jsx("div",{className:"category-heading-icon",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsxs("div",{children:[e.jsx("h5",{children:"Live preview"}),e.jsx("p",{children:"How the category will appear."})]})]}),e.jsxs("div",{className:"category-preview-body",children:[e.jsx("div",{className:"category-preview-label",children:"CATEGORY BADGE"}),e.jsx("div",{className:"category-preview-display",children:e.jsxs("span",{className:"category-preview-badge",style:{color:c(r.color),backgroundColor:`${c(r.color)}18`,borderColor:`${c(r.color)}45`},children:[e.jsx("span",{className:"category-preview-dot",style:{backgroundColor:c(r.color)}}),r.name||"Category name"]})}),e.jsx("div",{className:"category-preview-description",children:r.description||"Your category description will appear here."}),e.jsxs("div",{className:"category-preview-meta",children:[e.jsxs("div",{children:[e.jsx("span",{children:"URL slug"}),e.jsx("strong",{children:r.slug||"category-slug"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Display order"}),e.jsx("strong",{children:r.sort_order||0})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Status"}),e.jsx("strong",{className:r.is_active?"text-success":"text-secondary",children:r.is_active?"Active":"Inactive"})]})]})]})]}),e.jsxs("div",{className:"category-guidance-card mt-4",children:[e.jsx("div",{className:"category-guidance-icon",children:e.jsx("i",{className:"bi bi-lightbulb"})}),e.jsxs("div",{children:[e.jsx("strong",{children:"Category management"}),e.jsx("p",{children:"Use clear category names to help visitors discover relevant events. Keep categories consistent and avoid unnecessary duplicates."})]})]})]}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"category-form-actions",children:[e.jsxs("div",{className:"category-action-note",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:"Changes will be saved to the event category records."})]}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsx(b,{href:route("admin.event-categories.index"),className:"btn category-cancel-button",children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn category-submit-button",disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:`bi ${t?"bi-check2-circle":"bi-plus-circle"} me-2`}),t?"Save changes":"Create category"]})})]})]})})]}),e.jsx("style",{children:`
                .event-category-form {
                    color: #172033;
                }

                .category-form-card {
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 13px;
                    overflow: hidden;
                    box-shadow: 0 3px 12px rgba(20,35,55,.025);
                }

                .category-form-heading {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    padding: 21px 23px;
                    border-bottom: 1px solid #edf0f4;
                }

                .category-heading-icon {
                    width: 39px;
                    height: 39px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #f1f8f4;
                    color: #174a2f;
                    font-size: 17px;
                }

                .category-form-heading h5 {
                    margin: 1px 0 5px;
                    color: #172033;
                    font-size: 13px;
                    font-weight: 800;
                }

                .category-form-heading p {
                    margin: 0;
                    color: #929baa;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .category-form-body {
                    padding: 24px;
                }

                .category-label {
                    display: block;
                    margin-bottom: 9px;
                    color: #364256;
                    font-size: 11px;
                    font-weight: 750;
                }

                .category-input,
                .category-textarea {
                    min-height: 43px;
                    padding: 10px 13px;
                    border: 1px solid #e3e8ef;
                    border-radius: 8px;
                    color: #253247;
                    font-family: inherit;
                    font-size: 11px;
                    box-shadow: none !important;
                }

                .category-input:focus,
                .category-textarea:focus {
                    border-color: #99caae;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61,.09) !important;
                }

                .category-textarea {
                    min-height: 125px;
                    resize: vertical;
                    line-height: 1.7;
                }

                .category-input::placeholder,
                .category-textarea::placeholder {
                    color: #adb5c1;
                }

                .category-input-prefix {
                    background: #f7f9fc;
                    border-color: #e3e8ef;
                    color: #8994a5;
                }

                .category-help {
                    margin-top: 7px;
                    color: #98a2b1;
                    font-size: 9.5px;
                    line-height: 1.6;
                }

                .category-character-count {
                    color: #9aa4b1;
                    font-size: 9px;
                }

                .category-color-selector {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .category-color-preview {
                    width: 45px;
                    height: 43px;
                    padding: 4px;
                    border: 1px solid #e3e8ef;
                    border-radius: 8px;
                }

                .category-color-preview input {
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    border: 0;
                    background: none;
                    cursor: pointer;
                }

                .category-color-presets {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .category-color-swatch {
                    width: 27px;
                    height: 27px;
                    display: grid;
                    place-items: center;
                    border: 2px solid #fff;
                    outline: 1px solid transparent;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 12px;
                    cursor: pointer;
                    transition: transform .15s ease;
                }

                .category-color-swatch:hover {
                    transform: scale(1.12);
                }

                .category-color-swatch.selected {
                    outline-color: #68778c;
                }

                .category-divider {
                    height: 1px;
                    margin: 23px 0;
                    background: #edf0f4;
                }

                .category-status-select {
                    min-height: 58px;
                    padding: 10px 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    border: 1px solid #e5e9ef;
                    border-radius: 9px;
                    background: #fafbfd;
                }

                .category-status-select.is-active {
                    background: #f5faf7;
                    border-color: #d9eee1;
                }

                .category-status-select strong,
                .category-status-select span {
                    display: block;
                }

                .category-status-select strong {
                    color: #354155;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-status-select span {
                    margin-top: 4px;
                    color: #929baa;
                    font-size: 8px;
                }

                .category-status-select .form-check-input {
                    width: 34px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                }

                .category-status-select .form-check-input:checked {
                    background-color: #3c9b6b;
                    border-color: #3c9b6b;
                }

                .category-preview-body {
                    padding: 23px;
                }

                .category-preview-label {
                    margin-bottom: 15px;
                    color: #a0a9b6;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .category-preview-display {
                    min-height: 80px;
                    padding: 18px;
                    display: flex;
                    align-items: center;
                    background: #f8f9fb;
                    border: 1px dashed #e2e7ee;
                    border-radius: 9px;
                }

                .category-preview-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 13px;
                    border: 1px solid;
                    border-radius: 30px;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-preview-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                }

                .category-preview-description {
                    margin-top: 17px;
                    color: #8792a2;
                    font-size: 10px;
                    line-height: 1.8;
                    overflow-wrap: anywhere;
                }

                .category-preview-meta {
                    margin-top: 22px;
                    padding-top: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                    border-top: 1px solid #edf0f4;
                }

                .category-preview-meta div {
                    display: flex;
                    justify-content: space-between;
                    gap: 12px;
                }

                .category-preview-meta span {
                    color: #929baa;
                    font-size: 9px;
                }

                .category-preview-meta strong {
                    color: #39465a;
                    font-size: 9px;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                    text-align: right;
                }

                .category-guidance-card {
                    padding: 18px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: #f1f6fc;
                    border: 1px solid #e6f2eb;
                    border-radius: 11px;
                }

                .category-guidance-icon {
                    width: 32px;
                    height: 32px;
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #fff;
                    color: #20603d;
                    font-size: 15px;
                }

                .category-guidance-card strong {
                    display: block;
                    margin: 2px 0 6px;
                    color: #174a2f;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-guidance-card p {
                    margin: 0;
                    color: #71849d;
                    font-size: 9px;
                    line-height: 1.8;
                }

                .category-form-actions {
                    padding: 17px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    background: #fff;
                    border: 1px solid #e9edf3;
                    border-radius: 11px;
                }

                .category-action-note {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #929baa;
                    font-size: 9px;
                }

                .category-action-note i {
                    color: #4c9b70;
                    font-size: 14px;
                }

                .category-cancel-button,
                .category-submit-button {
                    min-height: 40px;
                    padding: 0 17px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 800;
                }

                .category-cancel-button {
                    background: #fff;
                    border: 1px solid #e3e8ef;
                    color: #697587;
                }

                .category-cancel-button:hover {
                    background: #f7f9fc;
                    color: #344054;
                }

                .category-submit-button {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    box-shadow: 0 4px 10px rgba(32, 96, 61,.15);
                }

                .category-submit-button:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                }

                .category-submit-button:disabled {
                    opacity: .65;
                }

                @media(max-width: 767px) {
                    .category-form-heading {
                        padding: 17px;
                    }

                    .category-form-body {
                        padding: 18px;
                    }

                    .category-preview-body {
                        padding: 18px;
                    }

                    .category-form-actions {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .category-action-note {
                        line-height: 1.6;
                    }

                    .category-form-actions > div:last-child {
                        width: 100%;
                    }

                    .category-form-actions .btn {
                        flex: 1;
                    }
                }
            `})]})}export{j as default};
