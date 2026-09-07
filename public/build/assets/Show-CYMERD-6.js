import{r as u,j as e,L as l}from"./app-DR-BYGVG.js";import{A as j}from"./AppLayout-gTPCndtt.js";import{g as k,L as x}from"./Language-ChUCrwIh.js";import{A as m}from"./arrow-left-DGfkFlLE.js";import{S as f}from"./shield-check-CCvbrAjT.js";import{F as g}from"./file-text-BqsAOTbc.js";import{L as h}from"./languages-axcmk371.js";import{C as y}from"./calendar-days-D1SGeFKP.js";import{B as D}from"./book-open-Dj_vEPjm.js";import{C as N}from"./circle-check-BfEr0bhT.js";import{c as z}from"./createLucideIcon-DOLG8IgF.js";import"./heart-pulse-Bw5R00c6.js";import"./x-DhlEnb5v.js";const C=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],L=z("maximize-2",C),b={rw:{allDocuments:"Inyandiko zose",secureViewer:"Kureba inyandiko byizewe",publishedDocument:"Inyandiko yatangajwe",onlineReading:"Gusoma kuri interineti",availableLanguages:"Indimi ziboneka",reading:"Urasoma",fullscreen:"Ahuzuye ecran",officialDocument:"Urimo gusoma inyandiko yemewe",officialDocumentNote:"Iyi nyandiko itangwa binyuze kuri Document Portal.",backToDocuments:"Subira ku nyandiko",documentFallback:"Inyandiko"},en:{allDocuments:"All documents",secureViewer:"Secure document viewer",publishedDocument:"Published document",onlineReading:"Online reading",availableLanguages:"Available languages",reading:"Reading",fullscreen:"Fullscreen",officialDocument:"You're viewing an official document",officialDocumentNote:"This document is provided through the Document Portal.",backToDocuments:"Back to documents",documentFallback:"Document"},fr:{allDocuments:"Tous les documents",secureViewer:"Visionneuse de document sécurisée",publishedDocument:"Document publié",onlineReading:"Lecture en ligne",availableLanguages:"Langues disponibles",reading:"Lecture",fullscreen:"Plein écran",officialDocument:"Vous consultez un document officiel",officialDocumentNote:"Ce document est fourni via le portail documentaire.",backToDocuments:"Retour aux documents",documentFallback:"Document"},nl:{allDocuments:"Alle documenten",secureViewer:"Beveiligde documentviewer",publishedDocument:"Gepubliceerd document",onlineReading:"Online lezen",availableLanguages:"Beschikbare talen",reading:"Aan het lezen",fullscreen:"Volledig scherm",officialDocument:"Je bekijkt een officieel document",officialDocumentNote:"Dit document wordt aangeboden via het documentenportaal.",backToDocuments:"Terug naar documenten",documentFallback:"Document"}};function _({document:a,language:t,availableLanguages:r=[]}){const[d,w]=u.useState(k),i=b[d]||b.rw;u.useEffect(()=>{const n=s=>{w(s.detail)};return window.addEventListener(x,n),()=>{window.removeEventListener(x,n)}},[]);const o=r.find(n=>n.code===t),c=(n=>{if(!n)return null;try{return new Date(n).toLocaleDateString(d,{year:"numeric",month:"long",day:"numeric"})}catch{return null}})(a?.created_at),v=()=>{const n=window.document.getElementById("document-viewer");n?.requestFullscreen&&n.requestFullscreen()};return e.jsxs(j,{title:a?.title||i.documentFallback,children:[e.jsxs("div",{className:"document-page",children:[e.jsxs("div",{className:"page-navigation",children:[e.jsxs(l,{href:route("documents.index"),className:"back-link",children:[e.jsx(m,{size:17}),e.jsx("span",{children:i.allDocuments})]}),e.jsxs("div",{className:"secure-reading",children:[e.jsx(f,{size:15}),i.secureViewer]})]}),e.jsxs("section",{className:"document-header",children:[e.jsxs("div",{className:"header-main",children:[e.jsx("div",{className:"document-icon",children:e.jsx(g,{size:28,strokeWidth:1.8})}),e.jsxs("div",{className:"document-heading",children:[e.jsxs("div",{className:"eyebrow",children:[e.jsx("span",{className:"published-dot"}),i.publishedDocument]}),e.jsx("h1",{children:a?.title}),a?.description&&e.jsx("p",{className:"document-description",children:a.description}),e.jsxs("div",{className:"document-meta",children:[o&&e.jsxs("div",{className:"meta-item",children:[e.jsx(h,{size:15}),e.jsx("span",{children:o.label})]}),c&&e.jsxs("div",{className:"meta-item",children:[e.jsx(y,{size:15}),e.jsx("span",{children:c})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx(D,{size:15}),e.jsx("span",{children:i.onlineReading})]})]})]})]}),r.length>0&&e.jsxs("div",{className:"language-section",children:[e.jsxs("div",{className:"language-label",children:[e.jsx(h,{size:16}),e.jsx("span",{children:i.availableLanguages})]}),e.jsx("div",{className:"language-list",children:r.map(({code:n,label:s})=>{const p=t===n;return e.jsxs(l,{href:`${route("documents.show",a.id)}?lang=${n}`,className:`language-button ${p?"active":""}`,children:[p&&e.jsx(N,{size:15}),e.jsx("span",{children:s})]},n)})})]})]}),e.jsxs("div",{className:"reader-toolbar",children:[e.jsxs("div",{className:"reader-info",children:[e.jsxs("div",{className:"reader-status",children:[e.jsx("span",{className:"status-dot"}),e.jsx("span",{children:i.reading})]}),e.jsx("span",{className:"toolbar-divider"}),e.jsx("span",{className:"current-language",children:o?.label||t||i.documentFallback})]}),e.jsxs("button",{type:"button",className:"fullscreen-button",onClick:v,title:i.fullscreen,children:[e.jsx(L,{size:16}),e.jsx("span",{children:i.fullscreen})]})]}),e.jsxs("section",{className:"viewer-card",children:[e.jsxs("div",{className:"viewer-top",children:[e.jsxs("div",{className:"viewer-title",children:[e.jsx(g,{size:17}),e.jsx("span",{children:a?.title})]}),e.jsx("div",{className:"viewer-language",children:o?.label||t})]}),e.jsx("div",{className:"viewer-container",children:e.jsx("iframe",{id:"document-viewer",src:route("documents.stream",[a.id,t]),title:a?.title||i.documentFallback,className:"document-iframe"})})]}),e.jsxs("div",{className:"reader-footer",children:[e.jsxs("div",{className:"footer-note",children:[e.jsx(f,{size:17}),e.jsxs("div",{children:[e.jsx("strong",{children:i.officialDocument}),e.jsx("span",{children:i.officialDocumentNote})]})]}),e.jsxs(l,{href:route("documents.index"),className:"footer-back",children:[e.jsx(m,{size:15}),e.jsx("span",{children:i.backToDocuments})]})]})]}),e.jsx("style",{children:`

                /* =========================================
                   DOCUMENT PAGE
                ========================================== */

                .document-page {
                    width: 100%;
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 8px 0 40px;
                }


                /* =========================================
                   TOP NAVIGATION
                ========================================== */

                .page-navigation {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 18px;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    color: #5D89C8;
                    text-decoration: none;

                    font-size: 14px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .back-link:hover {
                    gap: 11px;
                }

                .secure-reading {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    padding: 7px 11px;

                    border-radius: 999px;

                    background: #f3f7fc;
                    border: 1px solid #e2ebf6;

                    color: #607086;

                    font-size: 12px;
                    font-weight: 600;
                }

                .secure-reading svg {
                    color: #5D89C8;
                }


                /* =========================================
                   DOCUMENT HEADER
                ========================================== */

                .document-header {
                    background: #ffffff;

                    border: 1px solid #e6ebf2;
                    border-radius: 20px;

                    padding: 26px;
                    margin-bottom: 16px;

                    box-shadow:
                        0 8px 30px rgba(25, 45, 70, .055);
                }

                .header-main {
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                }

                .document-icon {
                    width: 58px;
                    height: 58px;

                    flex: 0 0 58px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 15px;

                    color: #5D89C8;

                    background:
                        linear-gradient(
                            145deg,
                            #edf4fc,
                            #f7faff
                        );

                    border: 1px solid #dce8f6;
                }

                .document-heading {
                    min-width: 0;
                    flex: 1;
                }

                .eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 7px;

                    margin-bottom: 7px;

                    color: #6d7c90;

                    text-transform: uppercase;
                    letter-spacing: .07em;

                    font-size: 10px;
                    font-weight: 800;
                }

                .published-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #5D89C8;

                    box-shadow:
                        0 0 0 4px #eaf2fb;
                }

                .document-heading h1 {
                    margin: 0;

                    color: #152238;

                    font-size: clamp(
                        1.35rem,
                        2vw,
                        1.9rem
                    );

                    line-height: 1.25;

                    font-weight: 800;

                    letter-spacing: -.025em;

                    overflow-wrap: anywhere;
                }

                .document-description {
                    max-width: 850px;

                    margin: 9px 0 0;

                    color: #69788c;

                    font-size: 14px;
                    line-height: 1.7;
                }

                .document-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    gap: 16px;

                    margin-top: 16px;
                }

                .meta-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    color: #738196;

                    font-size: 12px;
                    font-weight: 600;
                }

                .meta-item svg {
                    color: #5D89C8;
                }


                /* =========================================
                   LANGUAGE SELECTOR
                ========================================== */

                .language-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;
                    flex-wrap: wrap;

                    margin-top: 25px;
                    padding-top: 20px;

                    border-top: 1px solid #edf0f4;
                }

                .language-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    color: #35445a;

                    font-size: 13px;
                    font-weight: 750;
                }

                .language-label svg {
                    color: #5D89C8;
                }

                .language-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .language-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    gap: 6px;

                    min-height: 36px;

                    padding: 0 13px;

                    border-radius: 9px;

                    background: #f5f7fa;

                    border: 1px solid #e4e9ef;

                    color: #536175;

                    text-decoration: none;

                    font-size: 12px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .language-button:hover {
                    border-color: #b9cde5;

                    background: #f1f6fc;

                    color: #5D89C8;
                }

                .language-button.active {
                    color: #ffffff;

                    background: #5D89C8;

                    border-color: #5D89C8;

                    box-shadow:
                        0 5px 15px
                        rgba(93, 137, 200, .22);
                }


                /* =========================================
                   READER TOOLBAR
                ========================================== */

                .reader-toolbar {
                    min-height: 52px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 15px;

                    padding: 9px 14px;

                    margin-bottom: 10px;

                    background: #ffffff;

                    border: 1px solid #e6ebf2;

                    border-radius: 13px;
                }

                .reader-info {
                    display: flex;
                    align-items: center;

                    gap: 12px;

                    min-width: 0;
                }

                .reader-status {
                    display: inline-flex;
                    align-items: center;

                    gap: 7px;

                    color: #3f4d61;

                    font-size: 12px;
                    font-weight: 750;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #5D89C8;

                    box-shadow:
                        0 0 0 4px #edf4fc;
                }

                .toolbar-divider {
                    width: 1px;
                    height: 20px;

                    background: #e5e9ee;
                }

                .current-language {
                    color: #7a8798;

                    font-size: 12px;
                    font-weight: 600;

                    white-space: nowrap;

                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .fullscreen-button {
                    display: inline-flex;
                    align-items: center;

                    gap: 7px;

                    min-height: 34px;

                    padding: 0 11px;

                    border: 1px solid #e0e6ed;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #526176;

                    cursor: pointer;

                    font-size: 12px;
                    font-weight: 700;

                    transition: all .2s ease;
                }

                .fullscreen-button:hover {
                    border-color: #b9cde5;

                    color: #5D89C8;

                    background: #f7faff;
                }


                /* =========================================
                   DOCUMENT VIEWER
                ========================================== */

                .viewer-card {
                    overflow: hidden;

                    background: #ffffff;

                    border: 1px solid #dfe5ec;

                    border-radius: 16px;

                    box-shadow:
                        0 12px 35px
                        rgba(20, 38, 60, .08);
                }

                .viewer-top {
                    height: 48px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 12px;

                    padding: 0 16px;

                    background: #fafbfd;

                    border-bottom: 1px solid #e6ebf0;
                }

                .viewer-title {
                    display: flex;
                    align-items: center;

                    gap: 8px;

                    min-width: 0;

                    color: #35445a;

                    font-size: 12px;
                    font-weight: 700;
                }

                .viewer-title svg {
                    flex: 0 0 auto;

                    color: #5D89C8;
                }

                .viewer-title span {
                    overflow: hidden;

                    white-space: nowrap;

                    text-overflow: ellipsis;
                }

                .viewer-language {
                    flex: 0 0 auto;

                    padding: 5px 9px;

                    border-radius: 6px;

                    background: #edf4fc;

                    color: #5D89C8;

                    font-size: 10px;
                    font-weight: 800;
                }

                .viewer-container {
                    width: 100%;

                    height: min(78vh, 950px);

                    min-height: 600px;

                    background: #eef1f5;
                }

                .document-iframe {
                    display: block;

                    width: 100%;
                    height: 100%;

                    border: 0;

                    background: #ffffff;
                }


                /* =========================================
                   FOOTER
                ========================================== */

                .reader-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;

                    flex-wrap: wrap;

                    margin-top: 16px;

                    padding: 15px 17px;

                    border: 1px solid #e5eaf0;

                    border-radius: 13px;

                    background: #ffffff;
                }

                .footer-note {
                    display: flex;
                    align-items: center;

                    gap: 11px;
                }

                .footer-note > svg {
                    flex: 0 0 auto;

                    color: #5D89C8;
                }

                .footer-note div {
                    display: flex;
                    flex-direction: column;

                    gap: 2px;
                }

                .footer-note strong {
                    color: #3b495d;

                    font-size: 11px;
                    font-weight: 750;
                }

                .footer-note span {
                    color: #8994a3;

                    font-size: 10px;
                }

                .footer-back {
                    display: inline-flex;
                    align-items: center;

                    gap: 6px;

                    color: #5D89C8;

                    text-decoration: none;

                    font-size: 11px;
                    font-weight: 750;
                }

                .footer-back:hover {
                    text-decoration: underline;
                }


                /* =========================================
                   TABLET
                ========================================== */

                @media (max-width: 768px) {

                    .document-page {
                        padding: 4px 0 28px;
                    }

                    .page-navigation {
                        margin-bottom: 13px;
                    }

                    .secure-reading {
                        display: none;
                    }

                    .document-header {
                        padding: 19px;

                        border-radius: 15px;
                    }

                    .header-main {
                        gap: 13px;
                    }

                    .document-icon {
                        width: 46px;
                        height: 46px;

                        flex-basis: 46px;

                        border-radius: 12px;
                    }

                    .document-icon svg {
                        width: 22px;
                        height: 22px;
                    }

                    .document-heading h1 {
                        font-size: 1.25rem;
                    }

                    .document-description {
                        font-size: 13px;
                    }

                    .document-meta {
                        gap: 10px;

                        margin-top: 13px;
                    }

                    .language-section {
                        align-items: flex-start;

                        flex-direction: column;

                        gap: 11px;

                        margin-top: 20px;

                        padding-top: 17px;
                    }

                    .language-list {
                        width: 100%;
                    }

                    .language-button {
                        flex: 1;
                    }

                    .reader-toolbar {
                        padding: 8px 10px;
                    }

                    .fullscreen-button span {
                        display: none;
                    }

                    .fullscreen-button {
                        width: 34px;

                        justify-content: center;

                        padding: 0;
                    }

                    .viewer-card {
                        border-radius: 12px;
                    }

                    .viewer-container {
                        height: 70vh;

                        min-height: 480px;
                    }

                    .viewer-top {
                        padding: 0 11px;
                    }

                    .reader-footer {
                        align-items: flex-start;

                        flex-direction: column;
                    }

                }


                /* =========================================
                   MOBILE
                ========================================== */

                @media (max-width: 480px) {

                    .document-header {
                        padding: 16px;
                    }

                    .header-main {
                        align-items: flex-start;
                    }

                    .document-icon {
                        display: none;
                    }

                    .document-meta {
                        flex-direction: column;

                        align-items: flex-start;

                        gap: 7px;
                    }

                    .language-button {
                        min-width: 0;

                        padding: 0 9px;

                        font-size: 11px;
                    }

                    .viewer-container {
                        height: 68vh;

                        min-height: 430px;
                    }

                    .viewer-title {
                        max-width: 70%;
                    }

                }

            `})]})}export{_ as default};
