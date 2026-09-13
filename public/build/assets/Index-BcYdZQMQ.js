import{b as f,r,j as e,L as v}from"./app-D-8e34z-.js";import{A as y}from"./AppLayout-DXTFGWt9.js";import{P as j}from"./Pagination-DNr4fsn5.js";import{c as w,g as k,L as d}from"./createLucideIcon-BLlzzcJK.js";import{U as D}from"./user-DM3YcyMY.js";import{F as s}from"./file-text-CBVvWmjO.js";import{B as N}from"./book-open-B9atVX6V.js";import{S as p}from"./search-Ew6wlD40.js";import{X as F}from"./x-__RWdXBQ.js";import{L as z}from"./languages-HeF5vsJS.js";import{C as E}from"./calendar-days-DsvNdQp2.js";import{A}from"./arrow-right-C9vkprTr.js";import"./heart-pulse-Bih3AYge.js";import"./shield-check-C3hYpQIL.js";const R=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],B=w("library",R),u={rw:{welcomeBack:"Murakaza neza",heroTitle:"Ububiko bwawe bw’Inyandiko",heroSubtitle:"Reba kandi ubone inyandiko ziheruka, umutungo, n’ibitabo biboneka kuri wewe.",statDocuments:"Inyandiko",statAvailable:"Biraboneka",statResources:"Umutungo",availableDocuments:"Inyandiko Ziboneka",exploreResources:"Reba umutungo watangajwe",searchPlaceholder:"Shakisha inyandiko...",published:"Byatangajwe",noDescription:"Nta bisobanuro bitanzwe kuri iyi nyandiko.",availableLanguages:"Indimi ziboneka",availableResource:"Umutungo uboneka",viewDocument:"Reba Inyandiko",noDocumentsTitle:"Nta nyandiko ziboneka",noDocumentsBody:"Ubu nta nyandiko zatangajwe ziboneka kuri portal.",notFoundTitle:"Nta nyandiko yabonetse",notFoundBodyPrefix:"Ntitwabashije kubona inyandiko ihuye na",clearSearch:"Siba Ishakiro"},en:{welcomeBack:"Welcome back",heroTitle:"Your Document Library",heroSubtitle:"Browse and access the latest documents, resources, and publications available to you.",statDocuments:"Documents",statAvailable:"Available",statResources:"Resources",availableDocuments:"Available Documents",exploreResources:"Explore published resources",searchPlaceholder:"Search documents...",published:"Published",noDescription:"No description provided for this document.",availableLanguages:"Available languages",availableResource:"Available resource",viewDocument:"View Document",noDocumentsTitle:"No documents available",noDocumentsBody:"There are currently no published documents available in the portal.",notFoundTitle:"No documents found",notFoundBodyPrefix:"We couldn't find any documents matching",clearSearch:"Clear Search"},fr:{welcomeBack:"Bon retour",heroTitle:"Votre bibliothèque de documents",heroSubtitle:"Parcourez et accédez aux derniers documents, ressources et publications qui vous sont accessibles.",statDocuments:"Documents",statAvailable:"Disponible",statResources:"Ressources",availableDocuments:"Documents disponibles",exploreResources:"Explorez les ressources publiées",searchPlaceholder:"Rechercher des documents...",published:"Publié",noDescription:"Aucune description fournie pour ce document.",availableLanguages:"Langues disponibles",availableResource:"Ressource disponible",viewDocument:"Voir le document",noDocumentsTitle:"Aucun document disponible",noDocumentsBody:"Aucun document publié n'est actuellement disponible sur le portail.",notFoundTitle:"Aucun document trouvé",notFoundBodyPrefix:"Nous n'avons trouvé aucun document correspondant à",clearSearch:"Effacer la recherche"},nl:{welcomeBack:"Welkom terug",heroTitle:"Jouw documentenbibliotheek",heroSubtitle:"Blader door en krijg toegang tot de nieuwste documenten, bronnen en publicaties die voor jou beschikbaar zijn.",statDocuments:"Documenten",statAvailable:"Beschikbaar",statResources:"Bronnen",availableDocuments:"Beschikbare documenten",exploreResources:"Verken gepubliceerde bronnen",searchPlaceholder:"Documenten zoeken...",published:"Gepubliceerd",noDescription:"Geen beschrijving beschikbaar voor dit document.",availableLanguages:"Beschikbare talen",availableResource:"Beschikbare bron",viewDocument:"Document bekijken",noDocumentsTitle:"Geen documenten beschikbaar",noDocumentsBody:"Er zijn momenteel geen gepubliceerde documenten beschikbaar op het portaal.",notFoundTitle:"Geen documenten gevonden",notFoundBodyPrefix:"We konden geen documenten vinden die overeenkomen met",clearSearch:"Zoekopdracht wissen"}};function q({documents:n}){const{props:x}=f(),h=x.auth?.user,[t,l]=r.useState(""),[m,b]=r.useState(k),i=u[m]||u.rw;r.useEffect(()=>{const o=a=>{b(a.detail)};return window.addEventListener(d,o),()=>{window.removeEventListener(d,o)}},[]);const c=r.useMemo(()=>{const o=t.trim().toLowerCase();return o?n.data.filter(a=>a.title?.toLowerCase().includes(o)||a.description?.toLowerCase().includes(o)||a.versions?.some(g=>g.language_label?.toLowerCase().includes(o))):n.data},[n.data,t]);return e.jsxs(y,{title:"Documents",children:[e.jsxs("div",{className:"documents-page",children:[e.jsxs("section",{className:"library-hero",children:[e.jsxs("div",{className:"hero-content",children:[e.jsxs("div",{className:"welcome-badge",children:[e.jsx(D,{size:13}),e.jsxs("span",{children:[i.welcomeBack,", ",h?.name||"Reader"]})]}),e.jsx("h1",{children:i.heroTitle}),e.jsx("p",{children:i.heroSubtitle}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-icon",children:e.jsx(s,{size:16})}),e.jsxs("div",{children:[e.jsx("strong",{children:n.total??n.data.length}),e.jsx("span",{children:i.statDocuments})]})]}),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-icon",children:e.jsx(B,{size:16})}),e.jsxs("div",{children:[e.jsx("strong",{children:i.statAvailable}),e.jsx("span",{children:i.statResources})]})]})]})]}),e.jsxs("div",{className:"hero-decoration",children:[e.jsx("div",{className:"decoration-circle circle-one"}),e.jsx("div",{className:"decoration-circle circle-two"}),e.jsx(s,{size:95,strokeWidth:1,className:"decoration-icon"})]})]}),e.jsxs("div",{className:"library-toolbar",children:[e.jsxs("div",{className:"section-heading",children:[e.jsx("div",{className:"section-icon",children:e.jsx(N,{size:18})}),e.jsxs("div",{children:[e.jsx("h2",{children:i.availableDocuments}),e.jsx("p",{children:i.exploreResources})]})]}),e.jsxs("div",{className:"search-box",children:[e.jsx(p,{size:17,className:"search-icon"}),e.jsx("input",{type:"text",placeholder:i.searchPlaceholder,value:t,onChange:o=>l(o.target.value)}),t&&e.jsx("button",{type:"button",className:"clear-search",onClick:()=>l(""),children:e.jsx(F,{size:15})})]})]}),n.data.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(s,{size:32})}),e.jsx("h3",{children:i.noDocumentsTitle}),e.jsx("p",{children:i.noDocumentsBody})]}):c.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(p,{size:30})}),e.jsx("h3",{children:i.notFoundTitle}),e.jsxs("p",{children:[i.notFoundBodyPrefix,' "',t,'".']}),e.jsx("button",{type:"button",className:"clear-filter-button",onClick:()=>l(""),children:i.clearSearch})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"documents-grid",children:c.map(o=>e.jsxs("article",{className:"document-card",children:[e.jsxs("div",{className:"document-card-top",children:[e.jsx("div",{className:"document-type-icon",children:e.jsx(s,{size:22})}),e.jsx("span",{className:"published-badge",children:i.published})]}),e.jsxs("div",{className:"document-body",children:[e.jsx("h3",{children:o.title}),o.description?e.jsx("p",{className:"document-description",children:o.description.length>125?`${o.description.slice(0,125)}…`:o.description}):e.jsx("p",{className:"document-description no-description",children:i.noDescription}),o.versions?.length>0&&e.jsxs("div",{className:"language-section",children:[e.jsxs("div",{className:"language-heading",children:[e.jsx(z,{size:13}),e.jsx("span",{children:i.availableLanguages})]}),e.jsx("div",{className:"language-list",children:o.versions.map(a=>e.jsx("span",{className:"language-tag",children:a.language_label},a.id))})]})]}),e.jsxs("div",{className:"document-footer",children:[e.jsxs("div",{className:"document-meta",children:[e.jsx(E,{size:14}),e.jsx("span",{children:i.availableResource})]}),e.jsxs(v,{href:route("documents.show",o.id),className:"view-button",children:[e.jsx("span",{children:i.viewDocument}),e.jsx(A,{size:15})]})]})]},o.id))}),!t&&e.jsx("div",{className:"pagination-wrapper",children:e.jsx(j,{links:n.links})})]})]}),e.jsx("style",{children:`
                /* =====================================================
                   DOCUMENT LIBRARY
                   ===================================================== */

                .documents-page {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F7F9FC;
                    --surface: #FFFFFF;

                    width: 100%;
                    max-width: 1120px;
                    margin: 0 auto;
                }

                /* =====================================================
                   HERO
                   ===================================================== */

                .library-hero {
                    position: relative;
                    min-height: 235px;
                    overflow: hidden;
                    border-radius: 20px;
                    background:
                        linear-gradient(
                            120deg,
                            #EEF4FC 0%,
                            #F7FAFE 55%,
                            #FFFFFF 100%
                        );
                    border: 1px solid #DDE7F3;
                    padding: 30px 34px;
                    box-sizing: border-box;
                    margin-bottom: 28px;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 650px;
                }

                .welcome-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 9px;
                    border-radius: 8px;
                    background: rgba(255,255,255,.8);
                    border: 1px solid #DCE7F4;
                    color: var(--blue);
                    font-size: 10px;
                    font-weight: 750;
                    margin-bottom: 13px;
                }

                .library-hero h1 {
                    margin: 0;
                    color: var(--ink);
                    font-size: 29px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -.035em;
                }

                .library-hero p {
                    max-width: 560px;
                    margin: 9px 0 20px;
                    color: #687587;
                    font-size: 13px;
                    line-height: 1.6;
                }

                /* HERO STATS */

                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 17px;
                }

                .hero-stat {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .hero-stat-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: rgba(255,255,255,.9);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #DDE7F3;
                }

                .hero-stat strong {
                    display: block;
                    font-size: 13px;
                    font-weight: 800;
                    color: #354154;
                }

                .hero-stat span {
                    display: block;
                    margin-top: 2px;
                    font-size: 9px;
                    color: #8A95A5;
                }

                .hero-stat-divider {
                    width: 1px;
                    height: 27px;
                    background: #D8E2EE;
                }

                /* HERO DECORATION */

                .hero-decoration {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 330px;
                    height: 100%;
                    pointer-events: none;
                }

                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(93,137,200,.13);
                }

                .circle-one {
                    width: 250px;
                    height: 250px;
                    right: -80px;
                    top: -85px;
                }

                .circle-two {
                    width: 180px;
                    height: 180px;
                    right: 25px;
                    bottom: -110px;
                }

                .decoration-icon {
                    position: absolute;
                    right: 100px;
                    top: 70px;
                    color: rgba(93,137,200,.12);
                }

                /* =====================================================
                   TOOLBAR
                   ===================================================== */

                .library-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 17px;
                }

                .section-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-icon {
                    width: 37px;
                    height: 37px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .section-heading h2 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 800;
                    color: var(--ink);
                }

                .section-heading p {
                    margin: 3px 0 0;
                    font-size: 10px;
                    color: #929DAC;
                }

                /* SEARCH */

                .search-box {
                    position: relative;
                    width: 275px;
                }

                .search-box input {
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    padding: 0 38px 0 38px;
                    border: 1px solid #DCE2EA;
                    border-radius: 10px;
                    background: #fff;
                    outline: none;
                    color: var(--ink);
                    font-size: 11.5px;
                    transition: .2s ease;
                }

                .search-box input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px rgba(93,137,200,.1);
                }

                .search-box input::placeholder {
                    color: #A1AAB7;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 12px;
                    color: #8D99A8;
                    pointer-events: none;
                }

                .clear-search {
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    width: 28px;
                    height: 28px;
                    border: 0;
                    border-radius: 7px;
                    background: transparent;
                    color: #8D99A8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .clear-search:hover {
                    background: var(--blue-light);
                    color: var(--blue);
                }

                /* =====================================================
                   DOCUMENT GRID
                   ===================================================== */

                .documents-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));
                    gap: 17px;
                }

                /* =====================================================
                   DOCUMENT CARD
                   ===================================================== */

                .document-card {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    min-height: 315px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow:
                        0 4px 18px rgba(24,43,70,.035);
                    transition:
                        transform .2s ease,
                        box-shadow .2s ease,
                        border-color .2s ease;
                }

                .document-card:hover {
                    transform: translateY(-3px);
                    border-color: #D3DFED;
                    box-shadow:
                        0 12px 28px rgba(24,43,70,.08);
                }

                .document-card-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 17px 17px 12px;
                }

                .document-type-icon {
                    width: 43px;
                    height: 43px;
                    border-radius: 12px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .published-badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 8px;
                    border-radius: 7px;
                    background: #F1F8F4;
                    border: 1px solid #DDEDE4;
                    color: #4A8B68;
                    font-size: 8.5px;
                    font-weight: 800;
                }

                /* BODY */

                .document-body {
                    flex: 1;
                    padding: 7px 17px 18px;
                }

                .document-body h3 {
                    margin: 0;
                    color: #2D394B;
                    font-size: 15px;
                    line-height: 1.4;
                    font-weight: 800;
                    letter-spacing: -.012em;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .document-description {
                    margin: 8px 0 16px;
                    color: #788596;
                    font-size: 11px;
                    line-height: 1.6;
                    min-height: 35px;
                }

                .document-description.no-description {
                    color: #A3ACB8;
                    font-style: italic;
                }

                /* LANGUAGES */

                .language-section {
                    margin-top: 10px;
                }

                .language-heading {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #929DAC;
                    font-size: 9px;
                    font-weight: 650;
                    margin-bottom: 7px;
                }

                .language-heading svg {
                    color: var(--blue);
                }

                .language-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .language-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 7px;
                    background: #F8FAFC;
                    border: 1px solid #E2E7ED;
                    border-radius: 6px;
                    color: #657285;
                    font-size: 8.5px;
                    font-weight: 700;
                }

                /* FOOTER */

                .document-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    padding: 12px 15px;
                    border-top: 1px solid #EEF1F5;
                    background: #FCFDFE;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #99A3AF;
                    font-size: 8.5px;
                    white-space: nowrap;
                }

                .view-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    min-height: 31px;
                    padding: 0 10px;
                    border-radius: 8px;
                    background: var(--blue);
                    color: #fff;
                    text-decoration: none;
                    font-size: 9.5px;
                    font-weight: 750;
                    transition: .2s ease;
                    white-space: nowrap;
                }

                .view-button:hover {
                    background: var(--blue-dark);
                    transform: translateX(1px);
                }

                /* =====================================================
                   EMPTY STATE
                   ===================================================== */

                .empty-state {
                    min-height: 300px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 30px;
                }

                .empty-icon {
                    width: 65px;
                    height: 65px;
                    border-radius: 18px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 14px;
                }

                .empty-state h3 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 800;
                    color: #344052;
                }

                .empty-state p {
                    max-width: 400px;
                    margin: 7px 0 15px;
                    color: #8994A4;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .clear-filter-button {
                    border: 1px solid #DCE3EC;
                    background: #fff;
                    color: #5D6B7D;
                    border-radius: 8px;
                    padding: 8px 13px;
                    font-size: 10.5px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .clear-filter-button:hover {
                    border-color: var(--blue);
                    background: var(--blue-light);
                    color: var(--blue);
                }

                /* =====================================================
                   PAGINATION
                   ===================================================== */

                .pagination-wrapper {
                    margin-top: 20px;
                    padding: 14px 17px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 13px;
                    overflow-x: auto;
                }

                /* =====================================================
                   RESPONSIVE
                   ===================================================== */

                @media (max-width: 1000px) {
                    .documents-grid {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                    }

                    .hero-decoration {
                        opacity: .65;
                    }
                }

                @media (max-width: 700px) {
                    .library-hero {
                        min-height: auto;
                        padding: 24px 22px;
                        border-radius: 16px;
                    }

                    .library-hero h1 {
                        font-size: 23px;
                    }

                    .library-hero p {
                        font-size: 11.5px;
                    }

                    .hero-decoration {
                        display: none;
                    }

                    .library-toolbar {
                        align-items: stretch;
                        flex-direction: column;
                        gap: 13px;
                    }

                    .search-box {
                        width: 100%;
                    }

                    .documents-grid {
                        grid-template-columns: 1fr;
                    }

                    .document-card {
                        min-height: 290px;
                    }
                }

                @media (max-width: 480px) {
                    .library-hero {
                        padding: 20px 17px;
                    }

                    .library-hero h1 {
                        font-size: 21px;
                    }

                    .hero-stats {
                        gap: 12px;
                    }

                    .hero-stat-divider {
                        height: 23px;
                    }

                    .hero-stat-icon {
                        width: 29px;
                        height: 29px;
                    }

                    .section-heading h2 {
                        font-size: 14px;
                    }

                    .document-card-top {
                        padding: 15px 15px 10px;
                    }

                    .document-body {
                        padding-left: 15px;
                        padding-right: 15px;
                    }

                    .document-footer {
                        padding: 11px 13px;
                    }
                }
            `})]})}export{q as default};
