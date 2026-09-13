import{r as s,j as e,L as c}from"./app-D-8e34z-.js";import{A as f}from"./AdminLayout-W6ZtKX7g.js";import{c as p,g as b,L as m}from"./createLucideIcon-BLlzzcJK.js";import{A as w}from"./arrow-left-B2a8HRSX.js";import{F as d}from"./file-text-CBVvWmjO.js";import{C as y}from"./calendar-days-DsvNdQp2.js";import{E as j}from"./eye-CqYLNvg7.js";import{L as k}from"./languages-HeF5vsJS.js";import{C as D}from"./circle-check-veDugMKN.js";import{C as F}from"./circle-alert-BieHnYsK.js";const N=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],A=p("download",N);const E=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],z=p("external-link",E);const I=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],u=p("pen-line",I),x={rw:{viewTitlePrefix:"Reba",backToDocuments:"Subira ku Nyandiko",documentHash:"Inyandiko #",editDocument:"Hindura Inyandiko",documentInformation:"Amakuru y’Inyandiko",documentDetails:"Ibisobanuro by’inyandiko",documentId:"ID y’Inyandiko",availableLanguages:"Indimi Ziboneka",uploaded:"Yashyizweho",description:"Ibisobanuro",aboutThisDocument:"Ibirebana n’iyi nyandiko",languageVersions:"Verisiyo z’Indimi",selectVersionToPreview:"Hitamo verisiyo kugira ngo uyirebe",noLanguageVersions:"Nta verisiyo y’ururimi iboneka.",documentPreview:"Kureba Inyandiko",noFileSelected:"Nta dosiye yatoranyijwe",open:"Fungura",download:"Kuramo",noDocumentAvailable:"Nta nyandiko iboneka",noDocumentAvailableDescription:"Iyi nyandiko ntabwo ifite verisiyo y’ururimi iboneka kugira ngo yerekwe.",addDocumentVersion:"Ongeramo Verisiyo y’Inyandiko"},en:{viewTitlePrefix:"View",backToDocuments:"Back to Documents",documentHash:"Document #",editDocument:"Edit Document",documentInformation:"Document Information",documentDetails:"Document details",documentId:"Document ID",availableLanguages:"Available Languages",uploaded:"Uploaded",description:"Description",aboutThisDocument:"About this document",languageVersions:"Language Versions",selectVersionToPreview:"Select a version to preview",noLanguageVersions:"No language versions are available.",documentPreview:"Document Preview",noFileSelected:"No file selected",open:"Open",download:"Download",noDocumentAvailable:"No document available",noDocumentAvailableDescription:"This document does not currently have a language version available for preview.",addDocumentVersion:"Add Document Version"},fr:{viewTitlePrefix:"Voir",backToDocuments:"Retour aux documents",documentHash:"Document n°",editDocument:"Modifier le document",documentInformation:"Informations sur le document",documentDetails:"Détails du document",documentId:"ID du document",availableLanguages:"Langues disponibles",uploaded:"Téléchargé",description:"Description",aboutThisDocument:"À propos de ce document",languageVersions:"Versions linguistiques",selectVersionToPreview:"Sélectionnez une version à prévisualiser",noLanguageVersions:"Aucune version linguistique disponible.",documentPreview:"Aperçu du document",noFileSelected:"Aucun fichier sélectionné",open:"Ouvrir",download:"Télécharger",noDocumentAvailable:"Aucun document disponible",noDocumentAvailableDescription:"Ce document n’a actuellement aucune version linguistique disponible pour aperçu.",addDocumentVersion:"Ajouter une version du document"},nl:{viewTitlePrefix:"Bekijk",backToDocuments:"Terug naar documenten",documentHash:"Document #",editDocument:"Document bewerken",documentInformation:"Documentinformatie",documentDetails:"Documentgegevens",documentId:"Document-ID",availableLanguages:"Beschikbare talen",uploaded:"Geüpload",description:"Beschrijving",aboutThisDocument:"Over dit document",languageVersions:"Taalversies",selectVersionToPreview:"Selecteer een versie om te bekijken",noLanguageVersions:"Er zijn geen taalversies beschikbaar.",documentPreview:"Documentvoorbeeld",noFileSelected:"Geen bestand geselecteerd",open:"Openen",download:"Downloaden",noDocumentAvailable:"Geen document beschikbaar",noDocumentAvailableDescription:"Dit document heeft momenteel geen taalversie beschikbaar voor voorvertoning.",addDocumentVersion:"Documentversie toevoegen"}};function O({document:n}){const[l,g]=s.useState(n.versions?.[0]?.language??null),[h,v]=s.useState(b),i=x[h]||x.en;s.useEffect(()=>{const a=t=>{v(t.detail)};return window.addEventListener(m,a),()=>{window.removeEventListener(m,a)}},[]);const o=s.useMemo(()=>n.versions?.find(a=>a.language===l),[n.versions,l]),r=o?route("documents.stream",[n.id,o.language]):null;return e.jsxs(f,{title:`${i.viewTitlePrefix} ${n.title}`,children:[e.jsxs("div",{className:"document-view-page",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("div",{className:"header-left",children:[e.jsxs(c,{href:route("admin.documents.index"),className:"back-btn",children:[e.jsx(w,{size:17}),i.backToDocuments]}),e.jsxs("div",{className:"title-section",children:[e.jsx("div",{className:"title-icon",children:e.jsx(d,{size:25})}),e.jsxs("div",{children:[e.jsx("h1",{children:n.title}),e.jsxs("div",{className:"document-meta",children:[e.jsxs("span",{children:[i.documentHash,n.id]}),n.created_at&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"meta-dot",children:"•"}),e.jsxs("span",{children:[e.jsx(y,{size:13}),n.created_at]})]})]})]})]})]}),e.jsx("div",{className:"header-actions",children:e.jsxs(c,{href:route("admin.documents.edit",n.id),className:"secondary-btn",children:[e.jsx(u,{size:16}),i.editDocument]})})]}),e.jsxs("div",{className:"viewer-layout",children:[e.jsxs("aside",{className:"document-sidebar",children:[e.jsxs("div",{className:"side-card",children:[e.jsxs("div",{className:"side-card-header",children:[e.jsx("div",{className:"side-icon",children:e.jsx(d,{size:17})}),e.jsxs("div",{children:[e.jsx("h3",{children:i.documentInformation}),e.jsx("p",{children:i.documentDetails})]})]}),e.jsxs("div",{className:"info-list",children:[e.jsxs("div",{className:"info-item",children:[e.jsx("span",{children:i.documentId}),e.jsxs("strong",{children:["#",n.id]})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{children:i.availableLanguages}),e.jsx("strong",{children:n.versions?.length??0})]}),n.created_at&&e.jsxs("div",{className:"info-item",children:[e.jsx("span",{children:i.uploaded}),e.jsx("strong",{children:n.created_at})]})]})]}),n.description&&e.jsxs("div",{className:"side-card",children:[e.jsxs("div",{className:"side-card-header",children:[e.jsx("div",{className:"side-icon",children:e.jsx(j,{size:17})}),e.jsxs("div",{children:[e.jsx("h3",{children:i.description}),e.jsx("p",{children:i.aboutThisDocument})]})]}),e.jsx("p",{className:"description",children:n.description})]}),e.jsxs("div",{className:"side-card",children:[e.jsxs("div",{className:"side-card-header",children:[e.jsx("div",{className:"side-icon",children:e.jsx(k,{size:17})}),e.jsxs("div",{children:[e.jsx("h3",{children:i.languageVersions}),e.jsx("p",{children:i.selectVersionToPreview})]})]}),n.versions?.length>0?e.jsx("div",{className:"language-options",children:n.versions.map(a=>{const t=l===a.language;return e.jsxs("button",{type:"button",className:`language-option ${t?"active":""}`,onClick:()=>g(a.language),children:[e.jsx("div",{className:"language-avatar",children:a.language.substring(0,2).toUpperCase()}),e.jsxs("div",{className:"language-details",children:[e.jsx("strong",{children:a.language_label}),e.jsx("span",{children:a.original_filename})]}),t&&e.jsx(D,{size:18})]},a.id)})}):e.jsxs("div",{className:"no-versions",children:[e.jsx(F,{size:19}),e.jsx("span",{children:i.noLanguageVersions})]})]})]}),e.jsxs("main",{className:"viewer-card",children:[e.jsxs("div",{className:"viewer-toolbar",children:[e.jsxs("div",{className:"viewer-title",children:[e.jsx("div",{className:"pdf-icon",children:e.jsx(d,{size:18})}),e.jsxs("div",{children:[e.jsx("strong",{children:o?o.language_label:i.documentPreview}),e.jsx("span",{children:o?o.original_filename:i.noFileSelected})]})]}),r&&e.jsxs("div",{className:"viewer-actions",children:[e.jsxs("a",{href:r,target:"_blank",rel:"noreferrer",className:"viewer-action",children:[e.jsx(z,{size:15}),i.open]}),e.jsxs("a",{href:r,download:o?.original_filename,className:"viewer-action primary",children:[e.jsx(A,{size:15}),i.download]})]})]}),r?e.jsx("div",{className:"pdf-container",children:e.jsx("iframe",{src:r,title:`Preview of ${n.title}`,className:"pdf-frame"})}):e.jsxs("div",{className:"empty-viewer",children:[e.jsx("div",{className:"empty-viewer-icon",children:e.jsx(d,{size:35})}),e.jsx("h2",{children:i.noDocumentAvailable}),e.jsx("p",{children:i.noDocumentAvailableDescription}),e.jsxs(c,{href:route("admin.documents.edit",n.id),className:"primary-btn",children:[e.jsx(u,{size:16}),i.addDocumentVersion]})]})]})]})]}),e.jsx("style",{children:`

                .document-view-page {
                    --primary: #5D89C8;
                    --primary-dark: #416FAE;
                    --text: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F6F8FB;
                    --white: #FFFFFF;

                    min-height: 100%;
                    padding: 28px;
                    background: var(--background);
                }

                /* ================= HEADER ================= */

                .page-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 24px;
                }

                .header-left {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .back-btn {
                    width: fit-content;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    color: #667085;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 600;
                    transition: .2s ease;
                }

                .back-btn:hover {
                    color: var(--primary);
                }

                .title-section {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .title-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .title-section h1 {
                    margin: 0;
                    color: var(--text);
                    font-size: 25px;
                    font-weight: 750;
                    letter-spacing: -.4px;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 5px;
                    color: #8A94A6;
                    font-size: 11px;
                }

                .document-meta span {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                .meta-dot {
                    color: #C3CAD5;
                }

                .header-actions {
                    display: flex;
                    gap: 8px;
                }

                .secondary-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    height: 38px;
                    padding: 0 14px;
                    border: 1px solid #DCE3ED;
                    border-radius: 9px;
                    background: white;
                    color: #526581;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 650;
                    transition: .2s ease;
                }

                .secondary-btn:hover {
                    border-color: #BFD0E7;
                    background: #F8FAFD;
                    color: var(--primary-dark);
                }

                /* ================= LAYOUT ================= */

                .viewer-layout {
                    display: grid;
                    grid-template-columns: 300px minmax(0, 1fr);
                    gap: 20px;
                    align-items: start;
                }

                /* ================= SIDEBAR ================= */

                .document-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .side-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    padding: 18px;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .035);
                }

                .side-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-bottom: 14px;
                    margin-bottom: 13px;
                    border-bottom: 1px solid #F0F2F5;
                }

                .side-icon {
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .side-card-header h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 13px;
                    font-weight: 700;
                }

                .side-card-header p {
                    margin: 3px 0 0;
                    color: #98A2B3;
                    font-size: 10px;
                }

                /* ================= INFO ================= */

                .info-list {
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }

                .info-item span {
                    color: #8A94A6;
                    font-size: 11px;
                }

                .info-item strong {
                    color: #526581;
                    font-size: 11px;
                    font-weight: 650;
                    text-align: right;
                }

                /* ================= DESCRIPTION ================= */

                .description {
                    margin: 0;
                    color: #667085;
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* ================= LANGUAGES ================= */

                .language-options {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .language-option {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 10px;
                    border: 1px solid #E7EBF2;
                    border-radius: 9px;
                    background: #FAFBFC;
                    color: #667085;
                    text-align: left;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .language-option:hover {
                    border-color: #C9D8EB;
                    background: #F7FAFE;
                }

                .language-option.active {
                    border-color: #9EBBE0;
                    background: #EDF4FD;
                    color: var(--primary-dark);
                    box-shadow: 0 0 0 2px rgba(93, 137, 200, .07);
                }

                .language-avatar {
                    width: 31px;
                    height: 31px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #E5ECF7;
                    color: #5275A6;
                    font-size: 9px;
                    font-weight: 800;
                }

                .language-option.active .language-avatar {
                    background: #D9E7F8;
                    color: var(--primary-dark);
                }

                .language-details {
                    min-width: 0;
                    flex: 1;
                }

                .language-details strong {
                    display: block;
                    color: var(--text);
                    font-size: 11px;
                    font-weight: 700;
                }

                .language-details span {
                    display: block;
                    max-width: 170px;
                    margin-top: 2px;
                    overflow: hidden;
                    color: #98A2B3;
                    font-size: 9px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .language-option > svg {
                    color: var(--primary);
                    flex: 0 0 auto;
                }

                .no-versions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px;
                    border-radius: 9px;
                    background: #FFF9ED;
                    color: #9A6B20;
                    font-size: 11px;
                    line-height: 1.5;
                }

                /* ================= VIEWER ================= */

                .viewer-card {
                    min-width: 0;
                    overflow: hidden;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 15px;
                    box-shadow: 0 3px 14px rgba(20, 30, 50, .045);
                }

                .viewer-toolbar {
                    min-height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 15px;
                    padding: 10px 15px;
                    border-bottom: 1px solid var(--border);
                }

                .viewer-title {
                    min-width: 0;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .pdf-icon {
                    width: 34px;
                    height: 34px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #FFF0F1;
                    color: #C9505A;
                }

                .viewer-title strong {
                    display: block;
                    color: var(--text);
                    font-size: 12px;
                    font-weight: 700;
                }

                .viewer-title span {
                    display: block;
                    max-width: 300px;
                    margin-top: 2px;
                    overflow: hidden;
                    color: #98A2B3;
                    font-size: 9px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .viewer-actions {
                    display: flex;
                    gap: 6px;
                    flex: 0 0 auto;
                }

                .viewer-action {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    height: 32px;
                    padding: 0 10px;
                    border: 1px solid #DCE3ED;
                    border-radius: 7px;
                    background: white;
                    color: #526581;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 650;
                }

                .viewer-action:hover {
                    background: #F7F9FC;
                }

                .viewer-action.primary {
                    border-color: var(--primary);
                    background: var(--primary);
                    color: white;
                }

                .viewer-action.primary:hover {
                    background: var(--primary-dark);
                }

                /* ================= PDF ================= */

                .pdf-container {
                    width: 100%;
                    height: calc(100vh - 205px);
                    min-height: 650px;
                    background: #525659;
                }

                .pdf-frame {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 650px;
                    border: none;
                    background: white;
                }

                /* ================= EMPTY ================= */

                .empty-viewer {
                    min-height: 600px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    text-align: center;
                    background: #FBFCFE;
                }

                .empty-viewer-icon {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    border-radius: 18px;
                    background: #EDF3FC;
                    color: var(--primary);
                }

                .empty-viewer h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 17px;
                }

                .empty-viewer p {
                    max-width: 390px;
                    margin: 7px 0 20px;
                    color: var(--muted);
                    font-size: 12px;
                    line-height: 1.6;
                }

                .primary-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 14px;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 650;
                }

                .primary-btn:hover {
                    background: var(--primary-dark);
                    color: white;
                }

                /* ================= RESPONSIVE ================= */

                @media (max-width: 1100px) {
                    .viewer-layout {
                        grid-template-columns: 250px minmax(0, 1fr);
                    }
                }

                @media (max-width: 850px) {
                    .document-view-page {
                        padding: 18px 14px;
                    }

                    .page-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .viewer-layout {
                        grid-template-columns: 1fr;
                    }

                    .document-sidebar {
                        order: 2;
                    }

                    .viewer-card {
                        order: 1;
                    }

                    .pdf-container {
                        height: 75vh;
                        min-height: 550px;
                    }
                }

                @media (max-width: 600px) {
                    .title-section h1 {
                        font-size: 20px;
                    }

                    .title-icon {
                        width: 43px;
                        height: 43px;
                    }

                    .header-actions,
                    .secondary-btn {
                        width: 100%;
                    }

                    .secondary-btn {
                        justify-content: center;
                    }

                    .viewer-toolbar {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .viewer-actions {
                        width: 100%;
                    }

                    .viewer-action {
                        flex: 1;
                        justify-content: center;
                    }

                    .pdf-container {
                        height: 70vh;
                        min-height: 500px;
                    }

                    .document-meta {
                        flex-wrap: wrap;
                    }
                }

            `})]})}export{O as default};
