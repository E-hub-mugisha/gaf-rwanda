import{u as P,r as m,b as B,j as e,H as V,L as v,a as M}from"./app-DoAJgbZk.js";import{A as Y}from"./AdminLayout-DV7Sh3Xr.js";import"./adminI18n-DANLOJQy.js";import"./Language-ChUCrwIh.js";const K={type:"image",file:null,external_url:"",alt_text:"",caption:"",alt_text_rw:"",caption_rw:"",is_featured:!1,sort_order:0},y=l=>l===!0||l===1||l==="1",A=l=>l?l<1024*1024?`${(l/1024).toFixed(1)} KB`:`${(l/(1024*1024)).toFixed(2)} MB`:"External media";function J({event:l,gallery:c,media:_=[]}){const{flash:h}=P().props,[C,f]=m.useState(!1),[p,N]=m.useState("create"),[t,g]=m.useState(null),[w,d]=m.useState(null),{data:r,setData:s,post:T,processing:x,errors:i,reset:b,clearErrors:u}=B(K),n=Array.isArray(_)?_:[],L=n.filter(a=>a.type==="image"),O=n.filter(a=>a.type==="video"),D=n.filter(a=>y(a.is_featured));m.useEffect(()=>{if(!r.file)return;const a=URL.createObjectURL(r.file);return d(a),()=>{URL.revokeObjectURL(a)}},[r.file]);const R=a=>!a.file_path&&!!a.external_url,z=()=>{b(),u(),g(null),d(null),N("create"),f(!0)},E=a=>{b(),u(),g(a),s({type:a.type,file:null,external_url:a.external_url||"",alt_text:a.alt_text||"",caption:a.caption||"",alt_text_rw:a.alt_text_rw||"",caption_rw:a.caption_rw||"",is_featured:y(a.is_featured),sort_order:a.sort_order??0}),d(a.url||null),N("edit"),f(!0)},k=a=>{g(a),N("view"),f(!0)},j=()=>{x||(f(!1),g(null),d(null),b(),u())},S=a=>{const o=a.target.files?.[0]||null;s("file",o),o&&s("external_url","")},F=a=>{s(o=>({...o,type:a,file:null,external_url:""})),d(null)},I=a=>{s(o=>({...o,external_url:a,file:null})),d(null)},$=a=>{a.preventDefault();const o={forceFormData:!0,preserveScroll:!0,onSuccess:()=>{f(!1),g(null),d(null),b(),u()}};p==="edit"&&t?M.post(route("admin.events.galleries.media.update",[l.id,c.id,t.id]),{...r,_method:"put"},o):T(route("admin.events.galleries.media.store",[l.id,c.id]),o)},G=a=>{const o=a.caption||a.original_name||"this media";window.confirm(`Are you sure you want to delete "${o}"?`)&&M.delete(route("admin.events.galleries.media.destroy",[l.id,c.id,a.id]),{preserveScroll:!0})},U=[{label:"Total media",value:n.length,icon:"bi-collection",color:"blue",description:"All gallery items"},{label:"Images",value:L.length,icon:"bi-images",color:"purple",description:"Uploaded photographs"},{label:"Videos",value:O.length,icon:"bi-camera-video",color:"orange",description:"Video collections"},{label:"Featured",value:D.length,icon:"bi-star",color:"green",description:"Highlighted media"}];return e.jsxs(Y,{children:[e.jsx(V,{title:`Media - ${c.title}`}),e.jsxs("div",{className:"gaf-media-page",children:[e.jsxs("div",{className:"gaf-media-header",children:[e.jsxs("div",{className:"gaf-media-heading",children:[e.jsxs("div",{className:"gaf-breadcrumb",children:[e.jsx(v,{href:route("admin.dashboard"),children:"Dashboard"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx(v,{href:route("admin.events.index"),children:"Events"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx(v,{href:route("admin.events.galleries.index",l.id),children:"Galleries"}),e.jsx("i",{className:"bi bi-chevron-right"}),e.jsx("span",{children:"Media"})]}),e.jsx("div",{className:"gaf-page-eyebrow",children:"EVENT MANAGEMENT"}),e.jsx("h2",{children:"Gallery media"}),e.jsx("p",{children:"Manage photographs, videos and external media for this event gallery."})]}),e.jsxs("div",{className:"gaf-header-actions",children:[e.jsxs(v,{href:route("admin.events.galleries.index",l.id),className:"btn gaf-btn-outline",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Back to galleries"]}),e.jsxs("button",{type:"button",onClick:z,className:"btn gaf-btn-primary",children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Add media"]})]})]}),e.jsxs("div",{className:"gaf-gallery-context",children:[e.jsx("div",{className:"gaf-context-icon",children:e.jsx("i",{className:"bi bi-images"})}),e.jsxs("div",{className:"gaf-context-content",children:[e.jsx("span",{children:"MANAGING GALLERY"}),e.jsx("h5",{children:c.title}),e.jsx("p",{children:l.title})]}),e.jsxs("div",{className:"gaf-context-count",children:[e.jsx("strong",{children:n.length}),e.jsx("span",{children:n.length===1?"Media item":"Media items"})]})]}),h?.success&&e.jsxs("div",{className:"gaf-alert gaf-alert-success",children:[e.jsx("i",{className:"bi bi-check-circle-fill"}),e.jsx("span",{children:h.success})]}),h?.error&&e.jsxs("div",{className:"gaf-alert gaf-alert-danger",children:[e.jsx("i",{className:"bi bi-exclamation-circle-fill"}),e.jsx("span",{children:h.error})]}),e.jsx("div",{className:"row g-3 mb-4",children:U.map(a=>e.jsx("div",{className:"col-6 col-xl-3",children:e.jsxs("div",{className:"gaf-stat-card",children:[e.jsx("div",{className:`gaf-stat-icon ${a.color}`,children:e.jsx("i",{className:`bi ${a.icon}`})}),e.jsxs("div",{className:"gaf-stat-content",children:[e.jsx("span",{children:a.label}),e.jsx("h3",{children:a.value}),e.jsx("small",{children:a.description})]})]})},a.label))}),e.jsxs("div",{className:"gaf-section-heading",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"All media"}),e.jsx("p",{children:"Browse and manage the content in this gallery."})]}),e.jsxs("span",{className:"gaf-result-count",children:[n.length," ",n.length===1?"item":"items"]})]}),n.length>0?e.jsx("div",{className:"row g-4",children:n.map(a=>e.jsx("div",{className:"col-sm-6 col-lg-4 col-xl-3",children:e.jsxs("div",{className:"gaf-media-card",children:[e.jsxs("div",{className:"gaf-media-thumbnail",onClick:()=>k(a),role:"button",tabIndex:0,onKeyDown:o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(a))},children:[a.type==="image"&&a.url?e.jsx("img",{src:a.url,alt:a.alt_text||a.caption||"Gallery image"}):a.type==="video"&&a.url?e.jsx("video",{src:a.url,preload:"metadata"}):e.jsxs("div",{className:"gaf-media-placeholder",children:[e.jsx("i",{className:`bi ${a.type==="video"?"bi-play-circle":"bi-link-45deg"}`}),e.jsx("span",{children:a.type==="video"?"Video media":"External media"})]}),e.jsx("div",{className:"gaf-media-overlay",children:e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-eye me-1"}),"View details"]})}),e.jsx("span",{className:"gaf-type-badge",children:a.type}),y(a.is_featured)&&e.jsxs("span",{className:"gaf-featured-badge",children:[e.jsx("i",{className:"bi bi-star-fill me-1"}),"Featured"]})]}),e.jsxs("div",{className:"gaf-media-card-body",children:[e.jsx("div",{className:"gaf-media-title-row",children:e.jsx("h6",{title:a.caption||a.original_name,children:a.caption||a.original_name||"Untitled media"})}),e.jsxs("div",{className:"gaf-media-meta",children:[e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-file-earmark me-1"}),R(a)?"External URL":A(a.file_size)]}),e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-sort-numeric-down me-1"}),"Order ",a.sort_order??0]})]}),e.jsxs("div",{className:"gaf-media-card-footer",children:[e.jsxs("span",{className:"gaf-media-kind",children:[e.jsx("i",{className:`bi ${a.type==="image"?"bi-image":"bi-camera-video"}`}),a.type]}),e.jsxs("div",{className:"gaf-media-actions",children:[e.jsx("button",{type:"button",onClick:()=>k(a),title:"View media",className:"gaf-icon-btn",children:e.jsx("i",{className:"bi bi-eye"})}),e.jsx("button",{type:"button",onClick:()=>E(a),title:"Edit media",className:"gaf-icon-btn",children:e.jsx("i",{className:"bi bi-pencil"})}),e.jsx("button",{type:"button",onClick:()=>G(a),title:"Delete media",className:"gaf-icon-btn danger",children:e.jsx("i",{className:"bi bi-trash3"})})]})]})]})]})},a.id))}):e.jsxs("div",{className:"gaf-empty-state",children:[e.jsx("div",{className:"gaf-empty-icon",children:e.jsx("i",{className:"bi bi-images"})}),e.jsx("h5",{children:"No media in this gallery yet"}),e.jsx("p",{children:"Upload photographs, add videos or link external media to start building this collection."}),e.jsxs("button",{type:"button",className:"btn gaf-btn-primary",onClick:z,children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Add your first media"]})]})]}),C&&e.jsx("div",{className:"gaf-media-modal-backdrop",onMouseDown:a=>{a.target===a.currentTarget&&j()},children:e.jsxs("div",{className:"gaf-media-modal",role:"dialog","aria-modal":"true","aria-labelledby":"gafMediaModalTitle",children:[e.jsxs("div",{className:"gaf-modal-header",children:[e.jsxs("div",{children:[e.jsx("span",{className:"gaf-modal-eyebrow",children:"GALLERY CONTENT"}),e.jsx("h5",{id:"gafMediaModalTitle",children:p==="create"?"Add media":p==="edit"?"Edit media":"Media details"}),e.jsx("p",{children:c.title})]}),e.jsx("button",{type:"button",className:"gaf-modal-close",onClick:j,disabled:x,"aria-label":"Close modal",children:e.jsx("i",{className:"bi bi-x-lg"})})]}),p==="view"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"gaf-modal-body",children:[t?.type==="image"&&t?.url&&e.jsx("div",{className:"gaf-detail-preview",children:e.jsx("img",{src:t.url,alt:t.alt_text||""})}),t?.type==="video"&&t?.url&&e.jsx("div",{className:"gaf-detail-preview",children:e.jsx("video",{src:t.url,controls:!0})}),t?.external_url&&e.jsxs("div",{className:"gaf-external-preview",children:[e.jsx("i",{className:"bi bi-link-45deg"}),e.jsxs("div",{children:[e.jsx("strong",{children:"External media"}),e.jsxs("a",{href:t.external_url,target:"_blank",rel:"noopener noreferrer",children:["Open external media",e.jsx("i",{className:"bi bi-box-arrow-up-right ms-2"})]})]})]}),e.jsxs("div",{className:"gaf-detail-grid",children:[e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Media type"}),e.jsx("strong",{className:"text-capitalize",children:t?.type||"—"})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Featured"}),e.jsx("strong",{children:y(t?.is_featured)?"Yes":"No"})]}),e.jsxs("div",{className:"gaf-detail-item full",children:[e.jsx("span",{children:"Caption"}),e.jsx("strong",{children:t?.caption||"—"})]}),e.jsxs("div",{className:"gaf-detail-item full",children:[e.jsx("span",{children:"Alternative text"}),e.jsx("strong",{children:t?.alt_text||"—"})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Original filename"}),e.jsx("strong",{className:"text-break",children:t?.original_name||"External media"})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"File size"}),e.jsx("strong",{children:A(t?.file_size)})]}),e.jsxs("div",{className:"gaf-detail-item",children:[e.jsx("span",{children:"Display order"}),e.jsx("strong",{children:t?.sort_order??0})]})]})]}),e.jsxs("div",{className:"gaf-modal-footer",children:[e.jsx("button",{type:"button",className:"btn gaf-btn-outline",onClick:j,children:"Close"}),e.jsxs("button",{type:"button",className:"btn gaf-btn-primary",onClick:()=>E(t),children:[e.jsx("i",{className:"bi bi-pencil me-2"}),"Edit media"]})]})]}):e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{className:"gaf-modal-body",children:[e.jsxs("div",{className:"gaf-form-section",children:[e.jsxs("label",{className:"gaf-form-label",children:["Media type",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("div",{className:"gaf-type-selector",children:[{value:"image",label:"Image",icon:"bi-image"},{value:"video",label:"Video",icon:"bi-camera-video"}].map(a=>e.jsxs("button",{type:"button",onClick:()=>F(a.value),className:`gaf-type-option ${r.type===a.value?"active":""}`,children:[e.jsx("i",{className:`bi ${a.icon}`}),e.jsx("span",{children:a.label}),r.type===a.value&&e.jsx("i",{className:"bi bi-check-circle-fill gaf-type-check"})]},a.value))}),i.type&&e.jsx("div",{className:"text-danger small mt-2",children:i.type})]}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsxs("label",{className:"gaf-form-label",children:["Upload ",r.type]}),e.jsxs("label",{className:"gaf-upload-area",children:[e.jsx("input",{type:"file",hidden:!0,accept:r.type==="image"?"image/jpeg,image/png,image/webp,image/gif":"video/mp4,video/quicktime,video/webm",onChange:S}),e.jsx("div",{className:"gaf-upload-icon",children:e.jsx("i",{className:"bi bi-cloud-arrow-up"})}),e.jsxs("strong",{children:["Choose a ",r.type," to upload"]}),e.jsx("span",{children:r.type==="image"?"JPG, PNG, WEBP or GIF · Maximum 10 MB":"MP4, MOV or WEBM · Maximum 100 MB"}),e.jsx("small",{children:"Click here to browse files"})]}),r.file&&e.jsxs("div",{className:"gaf-selected-file",children:[e.jsx("i",{className:"bi bi-file-earmark-check"}),e.jsx("span",{children:r.file.name}),e.jsx("button",{type:"button",onClick:()=>{s("file",null),d(t?.url||null)},"aria-label":"Remove selected file",children:e.jsx("i",{className:"bi bi-x-lg"})})]}),i.file&&e.jsx("div",{className:"text-danger small mt-2",children:i.file})]}),w&&e.jsxs("div",{className:"gaf-form-section",children:[e.jsx("label",{className:"gaf-form-label",children:"Media preview"}),e.jsx("div",{className:"gaf-upload-preview",children:r.type==="image"?e.jsx("img",{src:w,alt:"Media preview"}):e.jsx("video",{src:w,controls:!0})})]}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsx("label",{className:"gaf-form-label",children:"External media URL"}),e.jsx("input",{type:"url",className:`form-control gaf-form-control ${i.external_url?"is-invalid":""}`,value:r.external_url,onChange:a=>I(a.target.value),placeholder:"https://example.com/media..."}),e.jsx("small",{className:"gaf-form-help",children:"Alternatively, provide a URL to externally hosted media."}),i.external_url&&e.jsx("div",{className:"invalid-feedback",children:i.external_url})]}),e.jsx("div",{className:"gaf-form-divider"}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsx("label",{className:"gaf-form-label",children:"Caption"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.caption?"is-invalid":""}`,value:r.caption,onChange:a=>s("caption",a.target.value),placeholder:"Enter a descriptive caption"}),i.caption&&e.jsx("div",{className:"invalid-feedback",children:i.caption})]}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsx("label",{className:"gaf-form-label",children:"Alternative text"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.alt_text?"is-invalid":""}`,value:r.alt_text,onChange:a=>s("alt_text",a.target.value),placeholder:"Describe the image for accessibility"}),i.alt_text&&e.jsx("div",{className:"invalid-feedback",children:i.alt_text})]}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"gaf-form-label",children:"Caption (Kinyarwanda)"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.caption_rw?"is-invalid":""}`,value:r.caption_rw||"",onChange:a=>s("caption_rw",a.target.value),placeholder:"Andika ibisobanuro by’ifoto mu Kinyarwanda"}),i.caption_rw&&e.jsx("div",{className:"invalid-feedback",children:i.caption_rw})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"gaf-form-label",children:"Alternative text (Kinyarwanda)"}),e.jsx("input",{type:"text",className:`form-control gaf-form-control ${i.alt_text_rw?"is-invalid":""}`,value:r.alt_text_rw||"",onChange:a=>s("alt_text_rw",a.target.value),placeholder:"Sobanura ifoto mu Kinyarwanda"}),i.alt_text_rw&&e.jsx("div",{className:"invalid-feedback",children:i.alt_text_rw})]})]}),e.jsxs("div",{className:"gaf-form-section",children:[e.jsx("label",{className:"gaf-form-label",children:"Display order"}),e.jsx("input",{type:"number",min:"0",className:`form-control gaf-form-control ${i.sort_order?"is-invalid":""}`,value:r.sort_order,onChange:a=>s("sort_order",a.target.value)}),e.jsx("small",{className:"gaf-form-help",children:"Lower numbers appear first in the gallery."}),i.sort_order&&e.jsx("div",{className:"invalid-feedback",children:i.sort_order})]}),e.jsxs("div",{className:"gaf-featured-setting",children:[e.jsxs("div",{children:[e.jsxs("strong",{children:[e.jsx("i",{className:"bi bi-star me-2"}),"Featured media"]}),e.jsx("p",{children:"Highlight this item in the gallery."})]}),e.jsx("div",{className:"form-check form-switch",children:e.jsx("input",{type:"checkbox",className:"form-check-input",id:"mediaFeatured",checked:!!r.is_featured,onChange:a=>s("is_featured",a.target.checked)})})]})]}),e.jsxs("div",{className:"gaf-modal-footer",children:[e.jsx("button",{type:"button",className:"btn gaf-btn-outline",onClick:j,disabled:x,children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn gaf-btn-primary",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check-lg me-2"}),p==="edit"?"Save changes":"Add media"]})})]})]})]})}),e.jsx("style",{children:`

                /* =========================================
                   PAGE
                ========================================= */

                .gaf-media-page {
                    color: #172033;
                    font-family: inherit;
                }

                .gaf-media-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-bottom: 26px;
                }

                .gaf-breadcrumb {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 10px;
                    font-size: 12px;
                    color: #8993a4;
                    margin-bottom: 20px;
                }

                .gaf-breadcrumb a {
                    color: #748094;
                    text-decoration: none;
                }

                .gaf-breadcrumb a:hover {
                    color: #20603d;
                }

                .gaf-breadcrumb i {
                    font-size: 10px;
                }

                .gaf-page-eyebrow,
                .gaf-modal-eyebrow {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    margin-bottom: 7px;
                }

                .gaf-media-heading h2 {
                    font-size: 27px;
                    font-weight: 800;
                    letter-spacing: -0.8px;
                    margin-bottom: 7px;
                    color: #172033;
                }

                .gaf-media-heading p {
                    color: #7c8798;
                    font-size: 13px;
                    margin: 0;
                }

                .gaf-header-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .gaf-btn-primary {
                    background: #20603d;
                    border: 1px solid #20603d;
                    color: #fff;
                    border-radius: 8px;
                    padding: 10px 17px;
                    font-size: 12px;
                    font-weight: 700;
                    transition: .2s ease;
                }

                .gaf-btn-primary:hover {
                    background: #174a2f;
                    border-color: #174a2f;
                    color: #fff;
                    transform: translateY(-1px);
                }

                .gaf-btn-outline {
                    background: #fff;
                    border: 1px solid #e1e6ed;
                    color: #465267;
                    border-radius: 8px;
                    padding: 10px 16px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .gaf-btn-outline:hover {
                    background: #f5f7fa;
                    border-color: #ccd5e0;
                    color: #172033;
                }

                /* =========================================
                   GALLERY CONTEXT
                ========================================= */

                .gaf-gallery-context {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 12px;
                    padding: 17px 20px;
                    margin-bottom: 23px;
                }

                .gaf-context-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .gaf-context-content {
                    min-width: 0;
                }

                .gaf-context-content > span {
                    display: block;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: #8b95a5;
                    margin-bottom: 3px;
                }

                .gaf-context-content h5 {
                    font-size: 14px;
                    font-weight: 800;
                    margin: 0 0 3px;
                    color: #172033;
                }

                .gaf-context-content p {
                    font-size: 11px;
                    color: #8993a4;
                    margin: 0;
                }

                .gaf-context-count {
                    margin-left: auto;
                    text-align: right;
                    flex-shrink: 0;
                }

                .gaf-context-count strong {
                    display: block;
                    font-size: 21px;
                    color: #172033;
                    line-height: 1.2;
                }

                .gaf-context-count span {
                    font-size: 10px;
                    color: #8993a4;
                }

                /* =========================================
                   ALERTS
                ========================================= */

                .gaf-alert {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-radius: 9px;
                    padding: 12px 15px;
                    margin-bottom: 18px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .gaf-alert-success {
                    color: #19734b;
                    background: #edf8f2;
                    border: 1px solid #d5eee0;
                }

                .gaf-alert-danger {
                    color: #b33b45;
                    background: #fff1f1;
                    border: 1px solid #f3dada;
                }

                .gaf-alert > i {
                    font-size: 16px;
                }

                /* =========================================
                   STATISTICS
                ========================================= */

                .gaf-stat-card {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    padding: 17px;
                    transition: .2s ease;
                }

                .gaf-stat-card:hover {
                    border-color: #d5e8dd;
                    transform: translateY(-2px);
                }

                .gaf-stat-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border-radius: 10px;
                    font-size: 19px;
                }

                .gaf-stat-icon.blue {
                    background: #edf3fb;
                    color: #20603d;
                }

                .gaf-stat-icon.purple {
                    background: #f2effb;
                    color: #8069b9;
                }

                .gaf-stat-icon.orange {
                    background: #fff3e8;
                    color: #d48a42;
                }

                .gaf-stat-icon.green {
                    background: #eaf6f0;
                    color: #438d6c;
                }

                .gaf-stat-content span {
                    display: block;
                    color: #7d8899;
                    font-size: 11px;
                    font-weight: 600;
                    margin-bottom: 3px;
                }

                .gaf-stat-content h3 {
                    font-size: 23px;
                    font-weight: 800;
                    color: #172033;
                    margin: 0 0 3px;
                }

                .gaf-stat-content small {
                    color: #9aa3b1;
                    font-size: 10px;
                }

                /* =========================================
                   MEDIA GRID
                ========================================= */

                .gaf-section-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    margin: 31px 0 17px;
                }

                .gaf-section-heading h5 {
                    color: #172033;
                    font-size: 16px;
                    font-weight: 800;
                    margin-bottom: 4px;
                }

                .gaf-section-heading p {
                    color: #8993a4;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-result-count {
                    color: #758195;
                    background: #fff;
                    border: 1px solid #e7ebf0;
                    padding: 7px 11px;
                    border-radius: 7px;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-media-card {
                    height: 100%;
                    background: #fff;
                    border: 1px solid #e8edf3;
                    border-radius: 11px;
                    overflow: hidden;
                    transition: .2s ease;
                }

                .gaf-media-card:hover {
                    transform: translateY(-3px);
                    border-color: #d5e8dd;
                    box-shadow: 0 9px 24px rgba(23, 32, 51, .07);
                }

                .gaf-media-thumbnail {
                    height: 190px;
                    position: relative;
                    overflow: hidden;
                    background: #f0f3f7;
                    cursor: pointer;
                }

                .gaf-media-thumbnail > img,
                .gaf-media-thumbnail > video {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    transition: transform .35s ease;
                }

                .gaf-media-card:hover .gaf-media-thumbnail > img {
                    transform: scale(1.04);
                }

                .gaf-media-placeholder {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 8px;
                    color: #9aa5b5;
                }

                .gaf-media-placeholder i {
                    font-size: 39px;
                }

                .gaf-media-placeholder span {
                    font-size: 11px;
                    font-weight: 600;
                }

                .gaf-media-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(23, 32, 51, .35);
                    opacity: 0;
                    transition: opacity .2s ease;
                }

                .gaf-media-thumbnail:hover .gaf-media-overlay,
                .gaf-media-thumbnail:focus .gaf-media-overlay {
                    opacity: 1;
                }

                .gaf-media-overlay span {
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 9px 13px;
                    border: 1px solid rgba(255,255,255,.5);
                    border-radius: 6px;
                }

                .gaf-type-badge,
                .gaf-featured-badge {
                    position: absolute;
                    top: 11px;
                    padding: 5px 9px;
                    border-radius: 5px;
                    font-size: 9px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .5px;
                }

                .gaf-type-badge {
                    right: 11px;
                    background: rgba(23, 32, 51, .83);
                    color: #fff;
                }

                .gaf-featured-badge {
                    left: 11px;
                    background: #fff1cf;
                    color: #8a641e;
                }

                .gaf-media-card-body {
                    padding: 15px;
                }

                .gaf-media-title-row h6 {
                    color: #263249;
                    font-size: 12px;
                    font-weight: 800;
                    margin: 0 0 11px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .gaf-media-meta {
                    display: flex;
                    justify-content: space-between;
                    gap: 8px;
                    color: #8b95a5;
                    font-size: 9px;
                    margin-bottom: 14px;
                }

                .gaf-media-card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 11px;
                    border-top: 1px solid #f0f2f5;
                }

                .gaf-media-kind {
                    color: #8290a3;
                    font-size: 10px;
                    text-transform: capitalize;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .gaf-media-kind i {
                    color: #20603d;
                    font-size: 13px;
                }

                .gaf-media-actions {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .gaf-icon-btn {
                    width: 29px;
                    height: 29px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e8edf3;
                    border-radius: 6px;
                    background: #fff;
                    color: #758195;
                    font-size: 12px;
                    transition: .2s ease;
                }

                .gaf-icon-btn:hover {
                    background: #edf3fb;
                    color: #20603d;
                    border-color: #ddede4;
                }

                .gaf-icon-btn.danger:hover {
                    background: #fff0f0;
                    color: #c34c56;
                    border-color: #f1d4d6;
                }

                /* =========================================
                   EMPTY STATE
                ========================================= */

                .gaf-empty-state {
                    text-align: center;
                    background: #fff;
                    border: 1px dashed #d9e0e9;
                    border-radius: 13px;
                    padding: 65px 20px;
                }

                .gaf-empty-icon {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 19px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 30px;
                }

                .gaf-empty-state h5 {
                    font-size: 16px;
                    font-weight: 800;
                    color: #172033;
                    margin-bottom: 8px;
                }

                .gaf-empty-state p {
                    max-width: 420px;
                    margin: 0 auto 20px;
                    color: #8993a4;
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* =========================================
                   MODAL BACKDROP - IMPORTANT FIX

                   The backdrop is the scrolling container.
                   The modal itself is NOT height restricted.
                ========================================= */

                .gaf-media-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    z-index: 2000;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    padding: 24px 16px;

                    background: rgba(15, 24, 40, .58);
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);

                    /* Scroll the complete modal */
                    overflow-x: hidden;
                    overflow-y: auto;

                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior-y: contain;
                }

                /* =========================================
                   MODAL CONTAINER

                   No max-height.
                   No overflow:hidden.
                   No internal flex scrolling.
                ========================================= */

                .gaf-media-modal {
                    position: relative;

                    display: block;

                    width: 100%;
                    max-width: 680px;

                    height: auto;
                    max-height: none;
                    min-height: 0;

                    flex: 0 0 auto;

                    margin: 0 auto;

                    background: #fff;
                    border: 1px solid #e9edf2;
                    border-radius: 13px;

                    overflow: visible;

                    box-shadow: 0 20px 70px rgba(15, 24, 40, .22);

                    animation: gafModalIn .2s ease;
                }

                @keyframes gafModalIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* =========================================
                   MODAL HEADER

                   Normal document flow.
                   Not fixed.
                   Not sticky.
                ========================================= */

                .gaf-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;

                    padding: 21px 24px;

                    background: #fff;
                    border-bottom: 1px solid #edf0f4;

                    position: static;
                    flex-shrink: 1;
                }

                .gaf-modal-header h5 {
                    color: #172033;
                    font-size: 17px;
                    font-weight: 800;
                    margin: 0 0 4px;
                }

                .gaf-modal-header p {
                    color: #8993a4;
                    font-size: 11px;
                    margin: 0;
                }

                .gaf-modal-close {
                    width: 34px;
                    height: 34px;

                    border: 1px solid #e8edf3;
                    border-radius: 7px;

                    background: #fff;
                    color: #778397;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    flex-shrink: 0;
                    cursor: pointer;
                }

                .gaf-modal-close:hover {
                    background: #f4f6f9;
                    color: #172033;
                }

                /* =========================================
                   MODAL BODY

                   No max-height.
                   No overflow-y:auto.
                   No separate scrollbar.
                ========================================= */

                .gaf-modal-body {
                    display: block;

                    width: 100%;
                    height: auto;
                    max-height: none;
                    min-height: 0;

                    padding: 23px 24px;

                    overflow: visible;

                    background: #fff;
                }

                /* Form must also remain in normal flow */
                .gaf-media-modal form {
                    display: block;
                    width: 100%;
                    height: auto;
                    overflow: visible;
                }

                /* =========================================
                   MODAL FOOTER

                   Normal document flow.
                   Not fixed.
                   Not sticky.
                ========================================= */

                .gaf-modal-footer {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                    gap: 9px;

                    padding: 16px 24px;

                    background: #fbfcfd;
                    border-top: 1px solid #edf0f4;

                    position: static;
                    flex-shrink: 1;
                }

                .gaf-modal-footer .btn {
                    min-height: 40px;
                    padding: 9px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                }

                /* =========================================
                   FORM ELEMENTS
                ========================================= */

                .gaf-form-section {
                    margin-bottom: 19px;
                }

                .gaf-form-label {
                    display: block;
                    color: #344158;
                    font-size: 11px;
                    font-weight: 800;
                    margin-bottom: 9px;
                }

                .gaf-form-label .text-danger {
                    margin-left: 4px;
                }

                .gaf-form-control {
                    border: 1px solid #dfe5ec;
                    border-radius: 7px;
                    padding: 10px 12px;
                    font-size: 12px;
                    color: #344158;
                    box-shadow: none;
                }

                .gaf-form-control:focus {
                    border-color: #97caad;
                    box-shadow: 0 0 0 3px rgba(32, 96, 61, .10);
                }

                .gaf-form-help {
                    display: block;
                    color: #98a1af;
                    font-size: 10px;
                    margin-top: 7px;
                    line-height: 1.5;
                }

                .gaf-type-selector {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .gaf-type-option {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    border: 1px solid #e2e7ee;
                    background: #fff;
                    border-radius: 8px;

                    padding: 13px;

                    color: #69768a;
                    font-size: 11px;
                    font-weight: 700;
                    text-align: left;
                }

                .gaf-type-option > i:first-child {
                    font-size: 19px;
                }

                .gaf-type-option.active {
                    border-color: #20603d;
                    background: #f2f6fc;
                    color: #174a2f;
                }

                .gaf-type-check {
                    margin-left: auto;
                    color: #20603d;
                }

                /* =========================================
                   UPLOAD AREA
                ========================================= */

                .gaf-upload-area {
                    min-height: 145px;

                    border: 1px dashed #cbd6e3;
                    border-radius: 9px;

                    background: #fafbfd;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;

                    cursor: pointer;
                    padding: 20px;
                    text-align: center;

                    transition: .2s ease;
                }

                .gaf-upload-area:hover {
                    background: #f3f7fc;
                    border-color: #20603d;
                }

                .gaf-upload-icon {
                    color: #20603d;
                    font-size: 27px;
                    margin-bottom: 2px;
                }

                .gaf-upload-area strong {
                    font-size: 11px;
                    color: #344158;
                }

                .gaf-upload-area span {
                    color: #8993a4;
                    font-size: 10px;
                }

                .gaf-upload-area small {
                    color: #20603d;
                    font-size: 10px;
                    font-weight: 700;
                }

                .gaf-selected-file {
                    display: flex;
                    align-items: center;
                    gap: 9px;

                    background: #f1f7f3;
                    border: 1px solid #dcece1;
                    border-radius: 7px;

                    padding: 9px 11px;
                    margin-top: 9px;

                    color: #3d805e;
                    font-size: 11px;
                }

                .gaf-selected-file span {
                    overflow-wrap: anywhere;
                    flex: 1;
                }

                .gaf-selected-file button {
                    border: 0;
                    background: transparent;
                    color: #648c74;
                }

                /* =========================================
                   PREVIEWS
                ========================================= */

                .gaf-upload-preview,
                .gaf-detail-preview {
                    background: #f3f5f8;
                    border: 1px solid #e8edf3;
                    border-radius: 8px;
                    padding: 8px;
                    text-align: center;
                }

                .gaf-upload-preview img,
                .gaf-upload-preview video {
                    max-width: 100%;
                    max-height: 230px;
                    object-fit: contain;
                    border-radius: 5px;
                }

                .gaf-detail-preview {
                    margin-bottom: 21px;
                }

                .gaf-detail-preview img,
                .gaf-detail-preview video {
                    max-width: 100%;
                    max-height: 350px;
                    object-fit: contain;
                }

                .gaf-form-divider {
                    height: 1px;
                    background: #edf0f4;
                    margin: 23px 0;
                }

                /* =========================================
                   FEATURED SETTING
                ========================================= */

                .gaf-featured-setting {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;

                    background: #fafbfd;
                    border: 1px solid #e9edf2;
                    border-radius: 8px;

                    padding: 14px;
                }

                .gaf-featured-setting strong {
                    display: block;
                    font-size: 11px;
                    color: #344158;
                }

                .gaf-featured-setting strong i {
                    color: #d39a3e;
                }

                .gaf-featured-setting p {
                    font-size: 10px;
                    color: #8993a4;
                    margin: 4px 0 0;
                }

                .gaf-featured-setting .form-check {
                    margin: 0;
                }

                .gaf-featured-setting .form-check-input {
                    width: 2.3em;
                    height: 1.2em;
                    cursor: pointer;
                }

                .gaf-featured-setting .form-check-input:checked {
                    background-color: #20603d;
                    border-color: #20603d;
                }

                /* =========================================
                   DETAIL VIEW
                ========================================= */

                .gaf-detail-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 17px;
                }

                .gaf-detail-item {
                    min-width: 0;
                }

                .gaf-detail-item.full {
                    grid-column: 1 / -1;
                }

                .gaf-detail-item span {
                    display: block;
                    color: #929cac;
                    font-size: 10px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .gaf-detail-item strong {
                    display: block;
                    color: #344158;
                    font-size: 12px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                .gaf-external-preview {
                    display: flex;
                    align-items: center;
                    gap: 13px;

                    background: #f2f6fc;
                    border-radius: 8px;

                    padding: 15px;
                    margin-bottom: 20px;

                    color: #20603d;
                }

                .gaf-external-preview > i {
                    font-size: 25px;
                }

                .gaf-external-preview strong {
                    display: block;
                    font-size: 11px;
                    color: #344158;
                    margin-bottom: 4px;
                }

                .gaf-external-preview a {
                    color: #20603d;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                /* =========================================
                   RESPONSIVE
                ========================================= */

                @media (max-width: 767px) {
                    .gaf-media-header {
                        align-items: flex-start;
                    }

                    .gaf-header-actions {
                        width: 100%;
                    }

                    .gaf-header-actions .btn {
                        flex: 1;
                        justify-content: center;
                    }

                    .gaf-media-heading h2 {
                        font-size: 23px;
                    }

                    .gaf-gallery-context {
                        padding: 13px;
                    }

                    .gaf-context-count {
                        display: none;
                    }

                    .gaf-stat-card {
                        padding: 13px;
                        gap: 10px;
                    }

                    .gaf-stat-icon {
                        width: 39px;
                        height: 39px;
                        font-size: 16px;
                    }

                    .gaf-stat-content h3 {
                        font-size: 20px;
                    }

                    /* Mobile modal scrolling */
                    .gaf-media-modal-backdrop {
                        padding: 12px 10px;
                        align-items: center;
                    }

                    .gaf-media-modal {
                        width: 100%;
                        max-width: 100%;
                        margin: 0 auto;
                    }

                    .gaf-modal-header,
                    .gaf-modal-body {
                        padding-left: 17px;
                        padding-right: 17px;
                    }

                    .gaf-modal-footer {
                        padding: 13px 17px;
                    }
                }

                @media (max-width: 420px) {
                    .gaf-header-actions {
                        flex-direction: column;
                    }

                    .gaf-detail-grid {
                        grid-template-columns: 1fr;
                    }

                    .gaf-detail-item.full {
                        grid-column: auto;
                    }

                    .gaf-modal-footer .btn {
                        flex: 1;
                    }
                }

            `})]})}export{J as default};
