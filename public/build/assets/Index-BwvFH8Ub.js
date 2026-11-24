import{u as se,r,b as le,j as e,H as ie,a as oe,e as ne}from"./app-CnQ2naJx.js";import{A as re}from"./AdminLayout-BVsaJnXH.js";import"./adminI18n-FDcM2fzV.js";import"./Language-ChUCrwIh.js";const M={name:"",position:"",category:"research_assistant",affiliation:"rwanda",institution:"",responsibilities:"",position_rw:"",institution_rw:"",responsibilities_rw:"",reports_to_id:"",group_number:"",group_role:"",photo:null,sort_order:0,is_active:!0},ce={leadership:"Leadership",support_team:"Support team",research_assistant:"Research assistants",psychologist:"Psychologists",community_health_worker:"Community health workers",other:"Other"},U={leadership:"bg-primary-subtle text-primary-emphasis",support_team:"bg-info-subtle text-info-emphasis",research_assistant:"bg-success-subtle text-success-emphasis",psychologist:"bg-warning-subtle text-warning-emphasis",community_health_worker:"bg-danger-subtle text-danger-emphasis",other:"bg-secondary-subtle text-secondary-emphasis"},de={netherlands:"Netherlands",rwanda:"Rwanda",both:"Both teams"},O=["#20603d","#2f8f83","#c9772f","#8a63b8","#b8566b","#4f7f4a"],me=(s="")=>{let l=0;for(let m=0;m<s.length;m+=1)l=s.charCodeAt(m)+((l<<5)-l);return O[Math.abs(l)%O.length]};function W({show:s,onClose:l,size:m="lg",locked:p=!1,children:u}){const c=r.useRef(l);return c.current=l,r.useEffect(()=>{if(!s)return;const h=document.body.style.overflow,x=g=>{g.key==="Escape"&&!p&&c.current?.()};return document.body.classList.add("modal-open"),document.body.style.overflow="hidden",document.addEventListener("keydown",x),()=>{document.body.classList.remove("modal-open"),document.body.style.overflow=h,document.removeEventListener("keydown",x)}},[s,p]),s?ne.createPortal(e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"team-modal-backdrop",onClick:()=>!p&&l()}),e.jsx("div",{className:"team-modal-wrapper",role:"dialog","aria-modal":"true",onMouseDown:h=>{h.target===h.currentTarget&&!p&&l()},children:e.jsx("div",{className:`team-modal-dialog modal-${m}`,children:u})})]}),document.body):null}function d({label:s,error:l,hint:m,required:p=!1,className:u="col-12",children:c}){return e.jsxs("div",{className:u,children:[e.jsxs("label",{className:"form-label fw-semibold small mb-1",children:[s,p&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),c,m&&!l&&e.jsx("div",{className:"form-text",children:m}),l&&e.jsx("div",{className:"invalid-feedback d-block",children:l})]})}function w({icon:s,children:l}){return e.jsx("div",{className:"col-12 mt-4 mb-0",children:e.jsxs("div",{className:"d-flex align-items-center gap-2 pb-2 border-bottom",children:[e.jsx("i",{className:`bi ${s} text-primary`}),e.jsx("span",{className:"text-uppercase small fw-bold text-secondary",style:{letterSpacing:".06em"},children:l})]})})}function be({members:s=[],categories:l=[]}){const{flash:m}=se().props,[p,u]=r.useState(!1),[c,h]=r.useState(null),[x,g]=r.useState(null),[_,z]=r.useState(!1),[k,P]=r.useState(()=>{try{return new URLSearchParams(window.location.search).get("search")||""}catch{return""}}),[f,D]=r.useState("all"),[N,L]=r.useState("all"),[T,j]=r.useState(null),[G,A]=r.useState(!1),C=r.useRef(null),b=r.useRef(null),{data:n,setData:i,post:q,transform:K,processing:v,errors:a,clearErrors:R}=le(M);K(t=>({...t,...c?{_method:"PUT"}:{}})),r.useEffect(()=>{if(!m?.success)return;A(!0);const t=setTimeout(()=>{A(!1)},4500);return()=>clearTimeout(t)},[m]);const y=()=>{C.current&&(URL.revokeObjectURL(C.current),C.current=null)};r.useEffect(()=>()=>y(),[]);const V=t=>{const o=t.target.files?.[0]||null;if(y(),i("photo",o),o){const S=URL.createObjectURL(o);C.current=S,j(S)}else j(c?.photo||null)},B=()=>{y(),R(),h(null),i({...M}),j(null),b.current&&(b.current.value=""),u(!0)},H=t=>{y(),R(),h(t),i({name:t.name||"",position:t.position||"",category:t.category||"research_assistant",affiliation:t.affiliation||"rwanda",institution:t.institution||"",responsibilities:t.responsibilities||"",position_rw:t.position_rw||"",institution_rw:t.institution_rw||"",responsibilities_rw:t.responsibilities_rw||"",reports_to_id:t.reports_to_id||"",group_number:t.group_number||"",group_role:t.group_role||"",photo:null,sort_order:t.sort_order??0,is_active:!!t.is_active}),j(t.photo||null),b.current&&(b.current.value=""),u(!0)},$=()=>{v||(y(),u(!1),h(null),j(null),R())},J=t=>{t.preventDefault();const o=c?route("admin.team.update",c.id):route("admin.team.store");q(o,{forceFormData:!0,preserveScroll:!0,onSuccess:()=>{y(),u(!1),h(null),j(null),b.current&&(b.current.value="")}})},X=()=>{x&&oe.delete(route("admin.team.destroy",x.id),{preserveScroll:!0,onStart:()=>z(!0),onFinish:()=>{z(!1),g(null)}})},F=r.useMemo(()=>{const t=k.toLowerCase().trim();return s.filter(o=>{const S=!t||[o.name,o.position,o.institution,o.responsibilities,o.position_rw,o.institution_rw,o.responsibilities_rw].filter(Boolean).some(ae=>String(ae).toLowerCase().includes(t)),ee=f==="all"||o.category===f,te=N==="all"||o.affiliation===N;return S&&ee&&te})},[s,k,f,N]),Y=k||f!=="all"||N!=="all",I=()=>{P(""),D("all"),L("all")},E=t=>s.filter(o=>o.category===t).length,Q=[{value:"all",label:"All members",count:s.length},...l.map(t=>({value:t.value,label:t.label,count:E(t.value)}))],Z=[{label:"Total members",value:s.length,icon:"bi-people",tone:"primary"},{label:"Active members",value:s.filter(t=>t.is_active).length,icon:"bi-person-check",tone:"success"},{label:"Psychologists",value:E("psychologist"),icon:"bi-heart-pulse",tone:"warning"},{label:"Community health workers",value:E("community_health_worker"),icon:"bi-people-fill",tone:"danger"}];return e.jsxs(re,{children:[e.jsx(ie,{title:"Team Management"}),e.jsxs("div",{className:"container-fluid py-4 team-page",children:[e.jsxs("div",{className:"d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-uppercase small fw-semibold text-primary mb-1",children:"Website management"}),e.jsx("h3",{className:"fw-bold mb-1",children:"Team management"}),e.jsx("p",{className:"text-muted mb-0",children:"Manage GAF-RW team members, affiliations and organizational roles."})]}),e.jsxs("button",{type:"button",className:"btn btn-primary px-4",onClick:B,children:[e.jsx("i",{className:"bi bi-plus-lg me-2"}),"Add team member"]})]}),m?.success&&G&&e.jsxs("div",{className:"alert alert-success d-flex align-items-center justify-content-between",role:"alert",children:[e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),m.success]}),e.jsx("button",{type:"button",className:"btn-close",onClick:()=>A(!1),"aria-label":"Close"})]}),e.jsx("div",{className:"row g-3 mb-4",children:Z.map(t=>e.jsx("div",{className:"col-6 col-xl-3",children:e.jsx("div",{className:"card border-0 shadow-sm h-100 team-stat-card",children:e.jsxs("div",{className:"card-body d-flex align-items-center gap-3",children:[e.jsx("div",{className:`team-stat-icon bg-${t.tone}-subtle text-${t.tone}`,children:e.jsx("i",{className:`bi ${t.icon}`})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-muted small",children:t.label}),e.jsx("div",{className:"fs-4 fw-bold lh-1 mt-1",children:t.value})]})]})})},t.label))}),e.jsxs("div",{className:"card border-0 shadow-sm team-directory",children:[e.jsxs("div",{className:"card-body border-bottom",children:[e.jsxs("div",{className:"d-flex flex-wrap align-items-center justify-content-between gap-3",children:[e.jsxs("div",{className:"input-group team-search",children:[e.jsx("span",{className:"input-group-text bg-white",children:e.jsx("i",{className:"bi bi-search text-muted"})}),e.jsx("input",{type:"search",className:"form-control border-start-0",placeholder:"Search name, role or institution...",value:k,onChange:t=>P(t.target.value)})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsxs("select",{className:"form-select form-select-sm",style:{minWidth:150},value:N,onChange:t=>L(t.target.value),"aria-label":"Filter by affiliation",children:[e.jsx("option",{value:"all",children:"All affiliations"}),e.jsx("option",{value:"netherlands",children:"Netherlands"}),e.jsx("option",{value:"rwanda",children:"Rwanda"}),e.jsx("option",{value:"both",children:"Both teams"})]}),Y&&e.jsx("button",{type:"button",className:"btn btn-sm btn-link text-decoration-none",onClick:I,children:"Clear"})]})]}),e.jsx("div",{className:"d-flex flex-nowrap gap-2 mt-3 overflow-auto pb-1",children:Q.map(t=>e.jsxs("button",{type:"button",className:`btn btn-sm rounded-pill text-nowrap ${f===t.value?"btn-primary":"btn-outline-secondary"}`,onClick:()=>D(t.value),children:[t.label,e.jsx("span",{className:`badge rounded-pill ms-2 ${f===t.value?"text-bg-light":"text-bg-secondary"}`,children:t.count})]},t.value))})]}),e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover align-middle mb-0 team-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"ps-4",children:"Team member"}),e.jsx("th",{children:"Category"}),e.jsx("th",{children:"Affiliation"}),e.jsx("th",{className:"d-none d-xl-table-cell",children:"Reports to"}),e.jsx("th",{className:"d-none d-lg-table-cell",children:"Group"}),e.jsx("th",{children:"Status"}),e.jsx("th",{className:"text-end pe-4",children:"Actions"})]})}),e.jsx("tbody",{children:F.length>0?F.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"ps-4",children:e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[t.photo?e.jsx("img",{src:t.photo,alt:t.name,className:"team-avatar"}):e.jsx("div",{className:"team-avatar team-initials",style:{background:me(t.name)},children:t.name?.charAt(0).toUpperCase()}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"fw-semibold",children:t.name}),e.jsx("div",{className:"small text-muted",children:t.position}),t.institution&&e.jsx("div",{className:"small text-muted opacity-75",children:t.institution})]})]})}),e.jsx("td",{children:e.jsx("span",{className:`badge rounded-pill fw-semibold ${U[t.category]||U.other}`,children:ce[t.category]||t.category})}),e.jsx("td",{children:e.jsxs("span",{className:"small",children:[e.jsx("i",{className:"bi bi-geo-alt me-1 text-muted"}),de[t.affiliation]||t.affiliation]})}),e.jsx("td",{className:"d-none d-xl-table-cell small",children:t.reports_to||"—"}),e.jsx("td",{className:"d-none d-lg-table-cell small",children:t.group_number?e.jsxs(e.Fragment,{children:["Group ",t.group_number,t.group_role&&e.jsx("span",{className:"d-block text-muted text-capitalize",children:t.group_role.replaceAll("_"," ")})]}):"—"}),e.jsx("td",{children:e.jsxs("span",{className:`badge rounded-pill ${t.is_active?"bg-success-subtle text-success-emphasis":"bg-secondary-subtle text-secondary-emphasis"}`,children:[e.jsx("i",{className:"bi bi-circle-fill me-1",style:{fontSize:7}}),t.is_active?"Active":"Inactive"]})}),e.jsx("td",{className:"text-end pe-4",children:e.jsxs("div",{className:"btn-group btn-group-sm",role:"group",children:[e.jsx("button",{type:"button",className:"btn btn-outline-primary",title:"Edit member",onClick:()=>H(t),children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsx("button",{type:"button",className:"btn btn-outline-danger",title:"Delete member",onClick:()=>g(t),children:e.jsx("i",{className:"bi bi-trash3"})})]})})]},t.id)):e.jsx("tr",{children:e.jsxs("td",{colSpan:7,className:"text-center py-5",children:[e.jsx("i",{className:"bi bi-people fs-1 text-muted"}),e.jsx("h6",{className:"fw-semibold mt-3 mb-1",children:s.length===0?"No team members yet":"No matching team members"}),e.jsx("p",{className:"text-muted small mb-3",children:s.length===0?"Add your first team member to display them on the website.":"Try a different search or clear the filters."}),s.length===0?e.jsx("button",{type:"button",className:"btn btn-primary btn-sm",onClick:B,children:"Add team member"}):e.jsx("button",{type:"button",className:"btn btn-outline-secondary btn-sm",onClick:I,children:"Clear filters"})]})})})]})}),e.jsxs("div",{className:"card-footer bg-white border-0 small text-muted py-3 px-4",children:["Showing ",F.length," of ",s.length," members"]})]})]}),e.jsx(W,{show:p,onClose:$,size:"lg",locked:v,children:e.jsxs("form",{className:"modal-content border-0 shadow-lg",onSubmit:J,children:[e.jsxs("div",{className:"modal-header border-0",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-primary small fw-semibold text-uppercase mb-1",children:"Team directory"}),e.jsx("h5",{className:"modal-title fw-bold",children:c?"Edit team member":"Add team member"}),e.jsx("p",{className:"text-muted small mb-0",children:c?`Update ${c.name}'s details and organizational role.`:"Enter the team member's details and organizational role."})]}),e.jsx("button",{type:"button",className:"btn-close",onClick:$,disabled:v,"aria-label":"Close"})]}),e.jsx("div",{className:"modal-body px-4",children:e.jsxs("div",{className:"row g-3",children:[e.jsx(w,{icon:"bi-person-badge",children:"Profile information"}),e.jsx(d,{label:"Profile photo",error:a.photo,hint:"JPG, PNG or WEBP. Maximum 5 MB.",children:e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[T?e.jsx("img",{src:T,alt:"Photo preview",className:"team-photo"}):e.jsx("div",{className:"team-photo team-photo-empty",children:e.jsx("i",{className:"bi bi-person"})}),e.jsx("input",{ref:b,type:"file",className:`form-control ${a.photo?"is-invalid":""}`,accept:".jpg,.jpeg,.png,.webp",onChange:V})]})}),e.jsx(d,{label:"Full name",required:!0,error:a.name,className:"col-md-6",children:e.jsx("input",{type:"text",className:`form-control ${a.name?"is-invalid":""}`,value:n.name,onChange:t=>i("name",t.target.value),placeholder:"Enter full name"})}),e.jsx(d,{label:"Position / role",required:!0,error:a.position,className:"col-md-6",children:e.jsx("input",{type:"text",className:`form-control ${a.position?"is-invalid":""}`,value:n.position,onChange:t=>i("position",t.target.value),placeholder:"e.g. Main supervisor (PI)"})}),e.jsx(w,{icon:"bi-diagram-3",children:"Role and affiliation"}),e.jsx(d,{label:"Category",required:!0,error:a.category,className:"col-md-6",children:e.jsx("select",{className:`form-select ${a.category?"is-invalid":""}`,value:n.category,onChange:t=>i("category",t.target.value),children:l.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))})}),e.jsx(d,{label:"Team affiliation",required:!0,error:a.affiliation,className:"col-md-6",children:e.jsxs("select",{className:`form-select ${a.affiliation?"is-invalid":""}`,value:n.affiliation,onChange:t=>i("affiliation",t.target.value),children:[e.jsx("option",{value:"netherlands",children:"Netherlands team"}),e.jsx("option",{value:"rwanda",children:"Rwanda team"}),e.jsx("option",{value:"both",children:"Both teams"})]})}),e.jsx(d,{label:"Institution / organization",error:a.institution,children:e.jsx("input",{type:"text",className:`form-control ${a.institution?"is-invalid":""}`,value:n.institution,onChange:t=>i("institution",t.target.value),placeholder:"e.g. Amsterdam UMC"})}),e.jsx(d,{label:"Responsibilities / description",error:a.responsibilities,children:e.jsx("textarea",{className:`form-control ${a.responsibilities?"is-invalid":""}`,rows:4,value:n.responsibilities,onChange:t=>i("responsibilities",t.target.value),placeholder:"Describe the person's responsibilities..."})}),e.jsx(w,{icon:"bi-translate",children:"Kinyarwanda translation (Ikinyarwanda)"}),e.jsx("div",{className:"col-12",children:e.jsx("p",{className:"text-muted small mb-0",children:"Shown on the public team page when visitors choose Kinyarwanda. The English text is used for any field left empty."})}),e.jsx(d,{label:"Position / role (RW)",error:a.position_rw,className:"col-md-6",children:e.jsx("input",{type:"text",className:`form-control ${a.position_rw?"is-invalid":""}`,value:n.position_rw,onChange:t=>i("position_rw",t.target.value),placeholder:n.position||"Urugero: Umuyobozi mukuru w’ubushakashatsi"})}),e.jsx(d,{label:"Institution (RW)",error:a.institution_rw,className:"col-md-6",children:e.jsx("input",{type:"text",className:`form-control ${a.institution_rw?"is-invalid":""}`,value:n.institution_rw,onChange:t=>i("institution_rw",t.target.value),placeholder:n.institution||"Urugero: Ikigo cy’Igihugu gishinzwe Ubuzima (RBC)"})}),e.jsx(d,{label:"Responsibilities (RW)",error:a.responsibilities_rw,children:e.jsx("textarea",{className:`form-control ${a.responsibilities_rw?"is-invalid":""}`,rows:3,value:n.responsibilities_rw,onChange:t=>i("responsibilities_rw",t.target.value),placeholder:"Sobanura inshingano ze mu Kinyarwanda..."})}),e.jsx(w,{icon:"bi-signpost-split",children:"Organizational structure"}),e.jsx(d,{label:"Reports to",error:a.reports_to_id,className:"col-md-6",children:e.jsxs("select",{className:`form-select ${a.reports_to_id?"is-invalid":""}`,value:n.reports_to_id,onChange:t=>i("reports_to_id",t.target.value),children:[e.jsx("option",{value:"",children:"No reporting relationship"}),s.filter(t=>t.id!==c?.id).map(t=>e.jsxs("option",{value:t.id,children:[t.name," — ",t.position]},t.id))]})}),e.jsx(d,{label:"Display order",error:a.sort_order,className:"col-md-6",children:e.jsx("input",{type:"number",min:"0",className:`form-control ${a.sort_order?"is-invalid":""}`,value:n.sort_order,onChange:t=>i("sort_order",t.target.value)})}),e.jsx(d,{label:"Intervention group number",error:a.group_number,className:"col-md-6",children:e.jsx("input",{type:"number",min:"1",max:"100",className:`form-control ${a.group_number?"is-invalid":""}`,value:n.group_number,onChange:t=>i("group_number",t.target.value),placeholder:"e.g. 1"})}),e.jsx(d,{label:"Group responsibility",error:a.group_role,className:"col-md-6",children:e.jsxs("select",{className:`form-select ${a.group_role?"is-invalid":""}`,value:n.group_role,onChange:t=>i("group_role",t.target.value),children:[e.jsx("option",{value:"",children:"Not assigned"}),e.jsx("option",{value:"psychologist",children:"Psychologist / group lead"}),e.jsx("option",{value:"community_health_worker",children:"Community health worker"})]})}),e.jsx(w,{icon:"bi-toggle2-on",children:"Visibility settings"}),e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"team-visibility-box",children:[e.jsxs("div",{className:"form-check form-switch mb-0",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",role:"switch",id:"teamMemberActive",checked:n.is_active,onChange:t=>i("is_active",t.target.checked)}),e.jsx("label",{className:"form-check-label fw-semibold",htmlFor:"teamMemberActive",children:"Active team member"})]}),e.jsx("div",{className:"form-text",children:"Inactive members will not be displayed on the public website."})]})})]})}),e.jsxs("div",{className:"modal-footer bg-light border-0",children:[e.jsx("button",{type:"button",className:"btn btn-light border",onClick:$,disabled:v,children:"Cancel"}),e.jsx("button",{type:"submit",className:"btn btn-primary px-4",disabled:v,children:v?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check2 me-2"}),c?"Save changes":"Add team member"]})})]})]})}),e.jsx(W,{show:!!x,onClose:()=>g(null),size:"sm",locked:_,children:e.jsxs("div",{className:"modal-content border-0 shadow-lg",children:[e.jsxs("div",{className:"modal-body text-center p-4",children:[e.jsx("div",{className:"team-delete-icon mx-auto mb-3",children:e.jsx("i",{className:"bi bi-trash3"})}),e.jsx("h5",{className:"fw-bold mb-2",children:"Delete team member?"}),e.jsxs("p",{className:"text-muted small mb-0",children:[e.jsx("strong",{children:x?.name})," will be permanently removed. This action cannot be undone."]})]}),e.jsxs("div",{className:"modal-footer border-0 justify-content-center pt-0 pb-4",children:[e.jsx("button",{type:"button",className:"btn btn-light border px-4",onClick:()=>g(null),disabled:_,children:"Cancel"}),e.jsx("button",{type:"button",className:"btn btn-danger px-4",onClick:X,disabled:_,children:_?e.jsx("span",{className:"spinner-border spinner-border-sm"}):"Delete"})]})]})}),e.jsx("style",{children:`
                .team-page {
                    color: #172033;
                }

                .team-stat-card,
                .team-directory {
                    border-radius: 12px;
                }

                .team-stat-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    font-size: 21px;
                    flex-shrink: 0;
                }

                .team-search {
                    max-width: 360px;
                    flex: 1 1 260px;
                }

                .team-table thead th {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: .05em;
                    color: #6c757d;
                    font-weight: 600;
                    white-space: nowrap;
                    background: #f8f9fa;
                    padding-top: 13px;
                    padding-bottom: 13px;
                    border-bottom: 1px solid #edf0f4;
                }

                .team-table td {
                    padding-top: 14px;
                    padding-bottom: 14px;
                }

                .team-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                }

                .team-initials {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                }

                .team-photo {
                    width: 84px;
                    height: 84px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    border: 3px solid #edf2f8;
                }

                .team-photo-empty {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #edf3fb;
                    color: #20603d;
                    font-size: 34px;
                }

                .team-visibility-box {
                    background: #f8fafc;
                    border: 1px solid #e9edf3;
                    padding: 16px;
                    border-radius: 10px;
                }

                .team-delete-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fdecee;
                    color: #dc3545;
                    font-size: 24px;
                }

                /* ==========================================
                   MODAL FIX - HEADER AND FOOTER STAY VISIBLE
                ========================================== */

                .team-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, .55);
                    z-index: 2000;
                }

                .team-modal-wrapper {
                    position: fixed;
                    inset: 0;
                    z-index: 2001;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                    padding: 16px;
                    -webkit-overflow-scrolling: touch;
                }

                .team-modal-dialog {
                    width: 100%;
                    max-width: 800px;
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                }

                .team-modal-dialog.modal-sm {
                    max-width: 400px;
                }

                .team-modal-dialog .modal-content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-height: calc(100vh - 32px);
                    max-height: calc(100dvh - 32px);
                    overflow: hidden;
                    border-radius: 14px;
                    background: #fff;
                }

                .team-modal-dialog .modal-header {
                    flex: 0 0 auto;
                    padding: 22px 24px;
                    background: #fff;
                    border-radius: 14px 14px 0 0;
                }

                .team-modal-dialog .modal-body {
                    flex: 1 1 auto;
                    min-height: 0;
                    overflow-x: hidden;
                    overflow-y: auto !important;
                    overscroll-behavior: contain;
                    -webkit-overflow-scrolling: touch;
                    padding: 20px 24px;
                }

                .team-modal-dialog .modal-footer {
                    flex: 0 0 auto;
                    padding: 16px 24px;
                    background: #f8f9fa;
                    border-radius: 0 0 14px 14px;
                }

                .team-modal-dialog .form-control,
                .team-modal-dialog .form-select {
                    min-height: 42px;
                    border-color: #dfe4eb;
                }

                .team-modal-dialog textarea.form-control {
                    min-height: auto;
                }

                .team-modal-dialog .form-control:focus,
                .team-modal-dialog .form-select:focus {
                    border-color: #20603d;
                    box-shadow: 0 0 0 .2rem rgba(32, 96, 61, .12);
                }

                @media (max-width: 575.98px) {
                    .team-modal-wrapper {
                        padding: 8px;
                    }

                    .team-modal-dialog .modal-content {
                        max-height: calc(100vh - 16px);
                        max-height: calc(100dvh - 16px);
                    }

                    .team-modal-dialog .modal-header {
                        padding: 16px;
                    }

                    .team-modal-dialog .modal-body {
                        padding: 16px;
                    }

                    .team-modal-dialog .modal-footer {
                        padding: 12px 16px;
                    }

                    .team-modal-dialog .modal-footer .btn {
                        flex: 1;
                    }

                    .team-photo {
                        width: 64px;
                        height: 64px;
                    }
                }
            `})]})}export{be as default};
