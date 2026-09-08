import{r as d,j as e,H as y,L as r}from"./app-DSoONET_.js";import{A as k}from"./AdminLayout-C4DTiU8v.js";import{g as L,L as x}from"./createLucideIcon-CisFSg_k.js";const n="#5D89C8",f={rw:{pageTitle:"Ubuzima bwo mu Mutwe",breadcrumb:"Agahinda Gakabije",preview:"Aperçu y'Inyandiko",edit:"Hindura Inyandiko",viewPublic:"Reba kuri Website",published:"Yatangajwe",unpublished:"Ntabwo Yatangajwe",status:"Imiterere",language:"Ururimi",availableLanguages:"Indimi Zihari",lastUpdated:"Ivugururwa Ryanyuma",content:"Ibikubiye mu Nyandiko",noContent:"Nta nyandiko ihari muri uru rurimi.",back:"Subira inyuma",articleInformation:"Amakuru y'Inyandiko",documentPreview:"Aperçu y'Inyandiko",editMessage:"Hindura inyandiko niba ushaka kugira ibyo uhindura.",contentAvailable:"Ibikubiye birahari",languages:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}},en:{pageTitle:"Mental Health",breadcrumb:"Depression",preview:"Document Preview",edit:"Edit Document",viewPublic:"View on Website",published:"Published",unpublished:"Unpublished",status:"Status",language:"Language",availableLanguages:"Available Languages",lastUpdated:"Last Updated",content:"Document Content",noContent:"No content is available in this language.",back:"Back",articleInformation:"Document information",documentPreview:"Document Preview",editMessage:"Edit the document if you need to make changes.",contentAvailable:"Content available",languages:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}},fr:{pageTitle:"Santé Mentale",breadcrumb:"Dépression",preview:"Aperçu du document",edit:"Modifier le document",viewPublic:"Voir sur le site",published:"Publié",unpublished:"Non publié",status:"Statut",language:"Langue",availableLanguages:"Langues disponibles",lastUpdated:"Dernière mise à jour",content:"Contenu du document",noContent:"Aucun contenu n'est disponible dans cette langue.",back:"Retour",articleInformation:"Informations du document",documentPreview:"Aperçu du document",editMessage:"Modifiez le document si vous souhaitez apporter des changements.",contentAvailable:"Contenu disponible",languages:{rw:"Kinyarwanda",en:"Anglais",fr:"Français",nl:"Néerlandais"}},nl:{pageTitle:"Geestelijke Gezondheid",breadcrumb:"Depressie",preview:"Documentvoorbeeld",edit:"Document bewerken",viewPublic:"Bekijk op website",published:"Gepubliceerd",unpublished:"Niet gepubliceerd",status:"Status",language:"Taal",availableLanguages:"Beschikbare talen",lastUpdated:"Laatst bijgewerkt",content:"Documentinhoud",noContent:"Er is geen inhoud beschikbaar in deze taal.",back:"Terug",articleInformation:"Documentinformatie",documentPreview:"Documentvoorbeeld",editMessage:"Bewerk het document als u wijzigingen wilt aanbrengen.",contentAvailable:"Inhoud beschikbaar",languages:{rw:"Kinyarwanda",en:"Engels",fr:"Frans",nl:"Nederlands"}}},c={rw:{code:"RW",flag:"🇷🇼"},en:{code:"EN",flag:"🇬🇧"},fr:{code:"FR",flag:"🇫🇷"},nl:{code:"NL",flag:"🇳🇱"}};function D({page:s}){const[i,j]=d.useState(L());d.useEffect(()=>{const t=o=>{o?.detail&&j(o.detail)};return window.addEventListener(x,t),()=>{window.removeEventListener(x,t)}},[]);const a=f[i]||f.rw,l=s?.content||{},h=l?.[i]||l?.rw||{},u=h?.pageTitle||"Depression",m=h?.body||"",w=c[i]||c.rw,p=d.useMemo(()=>Object.keys(l).filter(t=>l?.[t]?.pageTitle||l?.[t]?.body),[l]),v=s?.updated_at?new Date(s.updated_at).toLocaleDateString(i==="rw"?"rw-RW":i==="fr"?"fr-FR":i==="nl"?"nl-NL":"en-US",{year:"numeric",month:"long",day:"numeric"}):"—";return e.jsxs(k,{children:[e.jsx(y,{title:`${u} — ${a.preview}`}),e.jsxs("div",{className:"health-page",children:[e.jsx("div",{className:"health-header",children:e.jsx("div",{className:"container-fluid px-3 px-lg-4",children:e.jsxs("div",{className:"d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"health-breadcrumb",children:[e.jsxs(r,{href:route("admin.health-content.depression.edit"),children:[e.jsx("i",{className:"bi bi-arrow-left me-1"}),a.back]}),e.jsx("span",{children:"/"}),e.jsx("span",{children:a.pageTitle}),e.jsx("span",{children:"/"}),e.jsx("strong",{children:a.breadcrumb})]}),e.jsx("h1",{children:a.preview}),e.jsx("p",{children:a.articleInformation})]}),e.jsxs("div",{className:"health-actions",children:[e.jsxs(r,{href:route("mental-health.depression"),target:"_blank",className:"btn btn-light border",children:[e.jsx("i",{className:"bi bi-globe2 me-2"}),a.viewPublic]}),e.jsxs(r,{href:route("admin.health-content.depression.edit"),className:"btn text-white",style:{backgroundColor:n,borderColor:n},children:[e.jsx("i",{className:"bi bi-pencil me-2"}),a.edit]})]})]})})}),e.jsx("div",{className:"container-fluid px-3 px-lg-4 py-4",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs("div",{className:"document-card",children:[e.jsxs("div",{className:"document-meta",children:[e.jsxs("div",{className:"d-flex flex-wrap gap-2",children:[e.jsxs("span",{className:"language-badge",children:[e.jsx("span",{children:w.flag}),a.languages[i]]}),e.jsxs("span",{className:s?.is_published?"status-badge published":"status-badge unpublished",children:[e.jsx("span",{className:"status-dot"}),s?.is_published?a.published:a.unpublished]})]}),e.jsxs("div",{className:"updated-date",children:[e.jsx("i",{className:"bi bi-clock me-1"}),a.lastUpdated,":",e.jsx("strong",{className:"ms-1",children:v})]})]}),e.jsxs("div",{className:"document-title",children:[e.jsx("div",{className:"document-label",children:a.documentPreview}),e.jsx("h2",{children:u})]}),e.jsx("div",{className:"document-content",children:m?e.jsx("article",{className:"health-content",dangerouslySetInnerHTML:{__html:m}}):e.jsxs("div",{className:"empty-content",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"bi bi-file-earmark-text"})}),e.jsx("h5",{children:a.noContent}),e.jsx("p",{children:a.editMessage}),e.jsxs(r,{href:route("admin.health-content.depression.edit"),className:"btn btn-sm text-white",style:{backgroundColor:n},children:[e.jsx("i",{className:"bi bi-pencil me-1"}),a.edit]})]})})]})}),e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("div",{className:"simple-card mb-4",children:[e.jsxs("div",{className:"simple-card-title",children:[e.jsx("i",{className:"bi bi-circle-half"}),a.status]}),e.jsxs("div",{className:"status-display",children:[e.jsx("div",{className:s?.is_published?"status-icon published":"status-icon unpublished",children:e.jsx("i",{className:s?.is_published?"bi bi-check-lg":"bi bi-dash"})}),e.jsxs("div",{children:[e.jsx("strong",{children:s?.is_published?a.published:a.unpublished}),e.jsxs("span",{children:[a.language,":"," ",a.languages[i]]})]})]})]}),e.jsxs("div",{className:"simple-card mb-4",children:[e.jsxs("div",{className:"simple-card-title",children:[e.jsx("i",{className:"bi bi-translate"}),a.availableLanguages]}),e.jsx("div",{className:"language-list",children:p.length>0?p.map(t=>{const o=c[t]||{},g=l?.[t]||{},N=!!(g?.pageTitle||g?.body),b=t===i;return e.jsxs("div",{className:b?"language-row active":"language-row",children:[e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("span",{className:"flag",children:o.flag}),e.jsxs("div",{children:[e.jsx("strong",{children:a.languages[t]||t.toUpperCase()}),e.jsx("small",{children:N?a.contentAvailable:a.noContent})]})]}),b&&e.jsx("i",{className:"bi bi-check-circle-fill",style:{color:n}})]},t)}):e.jsx("p",{className:"text-muted small mb-0",children:a.noContent})})]}),e.jsxs("div",{className:"edit-card",children:[e.jsx("div",{className:"edit-card-icon",children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsxs("div",{children:[e.jsx("h6",{children:a.edit}),e.jsx("p",{children:a.editMessage}),e.jsxs(r,{href:route("admin.health-content.depression.edit"),className:"edit-link",children:[a.edit,e.jsx("i",{className:"bi bi-arrow-right ms-1"})]})]})]})]})]})})]}),e.jsx("style",{children:`

                .health-page {
                    min-height: 100vh;
                    background: #f7f8fa;
                }

                /* HEADER */

                .health-header {
                    background: #fff;
                    border-bottom: 1px solid #e8ebef;
                    padding: 22px 0;
                }

                .health-breadcrumb {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    color: #8a929e;
                    font-size: .75rem;
                    margin-bottom: 8px;
                }

                .health-breadcrumb a {
                    color: #7a8491;
                    text-decoration: none;
                }

                .health-breadcrumb a:hover {
                    color: ${n};
                }

                .health-breadcrumb strong {
                    color: #303947;
                    font-weight: 600;
                }

                .health-header h1 {
                    color: #202938;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }

                .health-header p {
                    color: #89919e;
                    font-size: .82rem;
                    margin: 3px 0 0;
                }

                .health-actions {
                    display: flex;
                    gap: 8px;
                }


                /* DOCUMENT */

                .document-card {
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,.025);
                }

                .document-meta {
                    padding: 17px 22px;
                    border-bottom: 1px solid #edf0f3;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .language-badge,
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 20px;
                    font-size: .72rem;
                    font-weight: 600;
                }

                .language-badge {
                    color: #315f96;
                    background: #edf4fc;
                }

                .status-badge.published {
                    color: #237b46;
                    background: #eaf7ef;
                }

                .status-badge.unpublished {
                    color: #68717d;
                    background: #f0f1f3;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .updated-date {
                    color: #9199a5;
                    font-size: .7rem;
                }

                .updated-date strong {
                    color: #596474;
                    font-weight: 600;
                }


                /* TITLE */

                .document-title {
                    padding: 30px 30px 25px;
                    border-bottom: 1px solid #edf0f3;
                }

                .document-label {
                    color: ${n};
                    font-size: .67rem;
                    font-weight: 700;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }

                .document-title h2 {
                    color: #172033;
                    font-size: 2rem;
                    line-height: 1.3;
                    font-weight: 700;
                    margin: 0;
                }


                /* CONTENT */

                .document-content {
                    padding: 30px;
                }

                .health-content {
                    color: #3f4957;
                    font-size: 1rem;
                    line-height: 1.85;
                }

                .health-content h1,
                .health-content h2,
                .health-content h3,
                .health-content h4,
                .health-content h5,
                .health-content h6 {
                    color: #182131;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }

                .health-content h1:first-child,
                .health-content h2:first-child,
                .health-content h3:first-child {
                    margin-top: 0;
                }

                .health-content p {
                    margin-bottom: 1.1rem;
                }

                .health-content ul,
                .health-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1.25rem;
                }

                .health-content li {
                    margin-bottom: .45rem;
                }

                .health-content blockquote {
                    margin: 1.5rem 0;
                    padding: 12px 16px;
                    background: #f7f9fc;
                    border-left: 3px solid ${n};
                    border-radius: 0 7px 7px 0;
                }

                .health-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .health-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                }

                .health-content th,
                .health-content td {
                    padding: 8px;
                    border: 1px solid #dee2e6;
                }

                .health-content th {
                    background: #f8f9fa;
                }

                .health-content a {
                    color: ${n};
                }


                /* SIDEBAR */

                .simple-card {
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    padding: 18px;
                    box-shadow: 0 2px 8px rgba(0,0,0,.025);
                }

                .simple-card-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #293342;
                    font-size: .88rem;
                    font-weight: 700;
                    margin-bottom: 16px;
                }

                .simple-card-title i {
                    color: ${n};
                }

                .status-display {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .status-icon {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                }

                .status-icon.published {
                    background: #eaf7ef;
                    color: #23814a;
                }

                .status-icon.unpublished {
                    background: #f0f1f3;
                    color: #6c7480;
                }

                .status-display strong {
                    display: block;
                    color: #303947;
                    font-size: .8rem;
                }

                .status-display span {
                    display: block;
                    color: #929aa5;
                    font-size: .68rem;
                    margin-top: 2px;
                }


                /* LANGUAGES */

                .language-list {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .language-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 9px;
                    border-radius: 8px;
                    background: #f8f9fa;
                }

                .language-row.active {
                    background: #edf4fc;
                }

                .language-row .flag {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    background: #fff;
                    font-size: .95rem;
                }

                .language-row strong {
                    display: block;
                    color: #3a4452;
                    font-size: .75rem;
                    font-weight: 600;
                }

                .language-row small {
                    display: block;
                    color: #929aa5;
                    font-size: .62rem;
                    margin-top: 1px;
                }


                /* EDIT CARD */

                .edit-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: #fff;
                    border: 1px solid #e5e9ee;
                    border-radius: 12px;
                    padding: 17px;
                }

                .edit-card-icon {
                    width: 36px;
                    height: 36px;
                    flex: 0 0 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #edf4fc;
                    color: ${n};
                }

                .edit-card h6 {
                    color: #303947;
                    font-size: .8rem;
                    font-weight: 700;
                    margin: 0 0 4px;
                }

                .edit-card p {
                    color: #8b94a0;
                    font-size: .69rem;
                    line-height: 1.5;
                    margin: 0 0 6px;
                }

                .edit-link {
                    color: ${n};
                    font-size: .7rem;
                    font-weight: 700;
                    text-decoration: none;
                }

                .edit-link:hover {
                    color: #315f96;
                }


                /* EMPTY */

                .empty-content {
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                .empty-icon {
                    width: 55px;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: #edf4fc;
                    color: ${n};
                    font-size: 1.3rem;
                    margin-bottom: 13px;
                }

                .empty-content h5 {
                    color: #303947;
                    font-size: .9rem;
                    margin-bottom: 5px;
                }

                .empty-content p {
                    color: #929aa5;
                    font-size: .72rem;
                    margin-bottom: 14px;
                }


                /* MOBILE */

                @media (max-width: 767px) {

                    .health-header {
                        padding: 18px 0;
                    }

                    .health-actions {
                        width: 100%;
                    }

                    .health-actions .btn {
                        flex: 1;
                    }

                    .document-title {
                        padding: 24px 20px;
                    }

                    .document-title h2 {
                        font-size: 1.5rem;
                    }

                    .document-content {
                        padding: 22px 20px;
                    }

                    .document-meta {
                        padding: 14px 18px;
                    }

                    .health-content {
                        font-size: .95rem;
                    }

                }

            `})]})}export{D as default};
