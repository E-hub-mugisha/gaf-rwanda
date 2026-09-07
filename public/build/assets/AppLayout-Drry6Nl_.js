import{b as C,r as i,j as e,H as A,L as l,a as L}from"./app-Cpz07aqI.js";import{g as M,L as v,s as O}from"./Language-ChUCrwIh.js";import{F as g}from"./file-text-iUmGam7V.js";import{c as r}from"./createLucideIcon-DNmU2kqp.js";import{S as R}from"./shield-check-IQFJtrJA.js";import{X as U}from"./x-DIeAnHYH.js";const D=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],k=r("check",D);const H=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],j=r("chevron-down",H);const S=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],_=r("globe",S);const I=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"auskq0"}]],w=r("heart-pulse",I);const P=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],y=r("log-out",P);const B=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],T=r("menu",B),N={rw:{documents:"Inyandiko",knowledgeResources:"Ubumenyi & Umutungo",mentalHealth:"Ubuzima bwo mu Mutwe",reader:"Usoma",logOut:"Sohoka",language:"Ururimi",documentPortal:"Portal y’Inyandiko",signedInAs:"Winjiye nka",readerAccount:"Konti y’Usoma",languageNames:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}},en:{documents:"Documents",knowledgeResources:"Knowledge & Resources",mentalHealth:"Mental Health",reader:"Reader",logOut:"Log out",language:"Language",documentPortal:"Document Portal",signedInAs:"Signed in as",readerAccount:"Reader Account",languageNames:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}},fr:{documents:"Documents",knowledgeResources:"Savoir & Ressources",mentalHealth:"Santé mentale",reader:"Lecteur",logOut:"Se déconnecter",language:"Langue",documentPortal:"Portail documentaire",signedInAs:"Connecté en tant que",readerAccount:"Compte lecteur",languageNames:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}},nl:{documents:"Documenten",knowledgeResources:"Kennis & Middelen",mentalHealth:"Geestelijke gezondheid",reader:"Lezer",logOut:"Uitloggen",language:"Taal",documentPortal:"Documentenportaal",signedInAs:"Ingelogd als",readerAccount:"Lezersaccount",languageNames:{rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"}}};function Y({title:x,children:z}){const{props:F,url:d}=C(),t=F.auth?.user,[u,c]=i.useState(!1),[o,E]=i.useState(M),[p,h]=i.useState(!1),n=N[o]||N.rw;i.useEffect(()=>{document.documentElement.lang=o},[]),i.useEffect(()=>{const a=s=>{E(s.detail)};return window.addEventListener(v,a),()=>{window.removeEventListener(v,a)}},[]);const m=a=>{O(a),h(!1)},b=i.useMemo(()=>t?.name?t.name.trim().split(/\s+/).slice(0,2).map(a=>a.charAt(0).toUpperCase()).join(""):"U",[t?.name]),f=a=>{a.preventDefault(),L.post(route("logout"))};return e.jsxs(e.Fragment,{children:[x&&e.jsx(A,{title:x}),e.jsxs("div",{className:"public-layout",children:[e.jsxs("header",{className:"public-header",children:[e.jsxs("div",{className:"header-inner",children:[e.jsxs(l,{href:route("documents.index"),className:"brand",onClick:()=>c(!1),children:[e.jsx("div",{className:"brand-icon",children:e.jsx(g,{size:20})}),e.jsxs("div",{className:"brand-text",children:[e.jsx("strong",{children:"Document Portal"}),e.jsx("span",{children:n.knowledgeResources})]})]}),e.jsxs("nav",{className:"desktop-nav",children:[e.jsxs(l,{href:route("documents.index"),className:`nav-link ${d.startsWith("/documents")?"active":""}`,children:[e.jsx(g,{size:16}),n.documents]}),e.jsxs(l,{href:route("mental-health.depression"),className:`nav-link ${d.startsWith("/mental-health")?"active":""}`,children:[e.jsx(w,{size:16}),n.mentalHealth]})]}),e.jsxs("div",{className:"user-area",children:[e.jsxs("div",{className:"header-language",children:[e.jsxs("button",{type:"button",className:"header-language-button",onClick:()=>h(!p),"aria-expanded":p,children:[e.jsx(_,{size:14}),e.jsx("span",{children:o.toUpperCase()}),e.jsx(j,{size:11,className:p?"language-chevron open":"language-chevron"})]}),p&&e.jsxs("div",{className:"header-language-menu",children:[e.jsx("div",{className:"language-menu-title",children:n.language}),Object.entries(n.languageNames).map(([a,s])=>e.jsxs("button",{type:"button",className:o===a?"language-option active":"language-option",onClick:()=>m(a),children:[e.jsx("span",{className:"language-code",children:a.toUpperCase()}),e.jsx("span",{className:"language-name",children:s}),o===a&&e.jsx(k,{size:13})]},a))]})]}),e.jsx("div",{className:"header-divider"}),e.jsxs("div",{className:"user-profile",children:[e.jsx("div",{className:"user-avatar",children:b}),e.jsxs("div",{className:"user-details",children:[e.jsx("strong",{children:t?.name||"Reader"}),e.jsxs("span",{children:[e.jsx(R,{size:11}),n.reader]})]}),e.jsx(j,{size:15,className:"user-chevron"})]}),e.jsx("div",{className:"header-divider"}),e.jsx("form",{onSubmit:f,children:e.jsxs("button",{type:"submit",className:"logout-button",title:n.logOut,children:[e.jsx(y,{size:17}),e.jsx("span",{children:n.logOut})]})})]}),e.jsx("button",{type:"button",className:"mobile-menu-button",onClick:()=>c(!u),"aria-label":"Toggle navigation",children:u?e.jsx(U,{size:21}):e.jsx(T,{size:21})})]}),u&&e.jsxs("div",{className:"mobile-menu",children:[e.jsxs(l,{href:route("documents.index"),className:`mobile-nav-link ${d.startsWith("/documents")?"active":""}`,onClick:()=>c(!1),children:[e.jsx(g,{size:17}),n.documents]}),e.jsxs(l,{href:route("mental-health.depression"),className:`mobile-nav-link ${d.startsWith("/mental-health")?"active":""}`,onClick:()=>c(!1),children:[e.jsx(w,{size:17}),n.mentalHealth]}),e.jsxs("div",{className:"mobile-language",children:[e.jsx("div",{className:"mobile-language-title",children:n.language}),e.jsx("div",{className:"mobile-language-options",children:Object.entries(n.languageNames).map(([a,s])=>e.jsxs("button",{type:"button",className:o===a?"mobile-language-option active":"mobile-language-option",onClick:()=>m(a),children:[e.jsx("span",{className:"language-code",children:a.toUpperCase()}),e.jsx("span",{children:s}),o===a&&e.jsx(k,{size:13})]},a))})]}),e.jsxs("div",{className:"mobile-user",children:[e.jsx("div",{className:"user-avatar",children:b}),e.jsxs("div",{children:[e.jsx("strong",{children:t?.name||"Reader"}),e.jsx("span",{children:t?.email||""})]})]}),e.jsx("form",{onSubmit:f,children:e.jsxs("button",{type:"submit",className:"mobile-logout",children:[e.jsx(y,{size:17}),n.logOut]})})]})]}),e.jsx("main",{className:"public-main",children:z}),e.jsx("footer",{className:"public-footer",children:e.jsxs("div",{className:"footer-inner",children:[e.jsxs("div",{className:"footer-brand",children:[e.jsx("div",{className:"footer-logo",children:e.jsx(g,{size:15})}),e.jsx("span",{children:n.documentPortal})]}),e.jsxs("div",{className:"footer-right",children:[e.jsxs("span",{children:[n.signedInAs," ",e.jsx("strong",{children:t?.name||"Reader"})]}),e.jsx("span",{className:"footer-dot"}),e.jsx("span",{children:n.readerAccount})]})]})})]}),e.jsx("style",{children:`
                /* =====================================================
                   PUBLIC DOCUMENT PORTAL
                   ===================================================== */

                .public-layout {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --background: #F7F9FC;
                    --surface: #FFFFFF;

                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: var(--background);
                    color: var(--ink);
                }

                /* =====================================================
                   HEADER
                   ===================================================== */

                .public-header {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(255, 255, 255, .96);
                    border-bottom: 1px solid var(--border);
                    backdrop-filter: blur(12px);
                }

                .header-inner {
                    max-width: 1240px;
                    height: 70px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                }

                /* BRAND */

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    text-decoration: none;
                    color: var(--ink);
                    flex-shrink: 0;
                }

                .brand-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 11px;
                    background: var(--blue);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 5px 14px rgba(93, 137, 200, .22);
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .brand-text strong {
                    font-size: 14px;
                    font-weight: 800;
                    letter-spacing: -.01em;
                }

                .brand-text span {
                    margin-top: 3px;
                    font-size: 9.5px;
                    color: #919BA9;
                    font-weight: 500;
                }

                /* NAV */

                .desktop-nav {
                    display: flex;
                    align-items: center;
                    margin-left: 55px;
                    height: 100%;
                }

                .nav-link {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0 15px;
                    color: #687587;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 650;
                    position: relative;
                    transition: .2s ease;
                }

                .nav-link:hover {
                    color: var(--blue);
                }

                .nav-link.active {
                    color: var(--blue);
                }

                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    left: 15px;
                    right: 15px;
                    bottom: 0;
                    height: 2px;
                    border-radius: 2px 2px 0 0;
                    background: var(--blue);
                }

                /* USER */

                .user-area {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .user-details {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                .user-details strong {
                    max-width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #303B4D;
                    font-size: 11.5px;
                    font-weight: 750;
                }

                .user-details span {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    margin-top: 3px;
                    color: #929CAB;
                    font-size: 9px;
                }

                .user-details span svg {
                    color: #5CA47C;
                }

                .user-chevron {
                    color: #A1AAB6;
                    margin-left: 1px;
                }

                .header-divider {
                    width: 1px;
                    height: 29px;
                    background: var(--border);
                }

                /* LOGOUT */

                .logout-button {
                    height: 36px;
                    padding: 0 12px;
                    border: 1px solid #E0E5EC;
                    border-radius: 9px;
                    background: white;
                    color: #687587;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10.5px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: .2s ease;
                }

                .logout-button:hover {
                    color: #C45454;
                    border-color: #EBCFCF;
                    background: #FFF8F8;
                }

                /* =====================================================
                   LANGUAGE SWITCHER (desktop)
                   ===================================================== */

                .header-language {
                    position: relative;
                }

                .header-language-button {
                    height: 34px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0 9px;
                    border: 1px solid #E0E5EC;
                    border-radius: 8px;
                    background: white;
                    color: #687587;
                    font-family: inherit;
                    font-size: 9px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: .18s ease;
                }

                .header-language-button:hover {
                    border-color: #cbd5e1;
                    color: var(--blue-dark);
                    background: #f9fbfd;
                }

                .language-chevron {
                    transition: transform .18s ease;
                }

                .language-chevron.open {
                    transform: rotate(180deg);
                }

                .header-language-menu {
                    position: absolute;
                    right: 0;
                    top: calc(100% + 9px);
                    width: 175px;
                    padding: 6px;
                    background: white;
                    border: 1px solid #e3e8ef;
                    border-radius: 10px;
                    box-shadow: 0 15px 35px rgba(24,35,51,.12);
                    z-index: 200;
                    animation: languageDropdown .15s ease;
                }

                @keyframes languageDropdown {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .language-menu-title {
                    padding: 7px 9px;
                    color: #9aa4b1;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .language-option {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 8px 9px;
                    border: 0;
                    border-radius: 7px;
                    background: transparent;
                    color: #566273;
                    font-family: inherit;
                    font-size: 10px;
                    text-align: left;
                    cursor: pointer;
                }

                .language-option:hover {
                    background: #f4f7fb;
                }

                .language-option.active {
                    background: rgba(93,137,200,.09);
                    color: var(--blue-dark);
                    font-weight: 700;
                }

                .language-code {
                    width: 25px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                    background: #f0f3f7;
                    color: #7c8795;
                    font-size: 8px;
                    font-weight: 800;
                }

                .language-option.active .language-code {
                    background: var(--blue);
                    color: white;
                }

                .language-name {
                    flex: 1;
                }

                .language-option svg {
                    color: var(--blue);
                }

                /* =====================================================
                   MAIN
                   ===================================================== */

                .public-main {
                    width: 100%;
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 30px 24px 45px;
                    box-sizing: border-box;
                    flex: 1;
                }

                /* =====================================================
                   FOOTER
                   ===================================================== */

                .public-footer {
                    background: #fff;
                    border-top: 1px solid var(--border);
                }

                .footer-inner {
                    max-width: 1240px;
                    min-height: 55px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #7A8696;
                    font-size: 10px;
                    font-weight: 700;
                }

                .footer-logo {
                    width: 24px;
                    height: 24px;
                    border-radius: 7px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .footer-right {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    color: #9AA3AF;
                    font-size: 9.5px;
                }

                .footer-right strong {
                    color: #677486;
                }

                .footer-dot {
                    width: 3px;
                    height: 3px;
                    border-radius: 50%;
                    background: #C2C9D2;
                }

                /* =====================================================
                   MOBILE
                   ===================================================== */

                .mobile-menu-button {
                    display: none;
                    margin-left: auto;
                    width: 38px;
                    height: 38px;
                    border: 1px solid var(--border);
                    border-radius: 9px;
                    background: white;
                    color: #566375;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .mobile-menu {
                    display: none;
                }

                @media (max-width: 760px) {

                    .header-inner {
                        height: 62px;
                        padding: 0 16px;
                    }

                    .brand-icon {
                        width: 35px;
                        height: 35px;
                    }

                    .brand-text strong {
                        font-size: 13px;
                    }

                    .brand-text span {
                        font-size: 8.5px;
                    }

                    .desktop-nav,
                    .user-area {
                        display: none;
                    }

                    .mobile-menu-button {
                        display: flex;
                    }

                    .mobile-menu {
                        display: block;
                        padding: 10px 16px 16px;
                        border-top: 1px solid #F0F2F5;
                        background: white;
                    }

                    .mobile-nav-link {
                        height: 43px;
                        padding: 0 12px;
                        border-radius: 9px;
                        background: var(--blue-light);
                        color: var(--blue);
                        display: flex;
                        align-items: center;
                        gap: 9px;
                        text-decoration: none;
                        font-size: 12px;
                        font-weight: 750;
                        margin-bottom: 12px;
                    }

                    /* Mobile language switcher */

                    .mobile-language {
                        margin-bottom: 12px;
                        padding: 10px 12px;
                        border-radius: 9px;
                        background: #F7F9FC;
                        border: 1px solid #EEF1F5;
                    }

                    .mobile-language-title {
                        color: #9aa4b1;
                        font-size: 8px;
                        font-weight: 800;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    }

                    .mobile-language-options {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                    }

                    .mobile-language-option {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        padding: 7px 10px;
                        border: 1px solid #E0E5EC;
                        border-radius: 7px;
                        background: white;
                        color: #566273;
                        font-family: inherit;
                        font-size: 10px;
                        font-weight: 600;
                        cursor: pointer;
                    }

                    .mobile-language-option .language-code {
                        width: 22px;
                        height: 18px;
                        font-size: 7.5px;
                    }

                    .mobile-language-option.active {
                        border-color: var(--blue);
                        color: var(--blue-dark);
                        background: var(--blue-light);
                        font-weight: 750;
                    }

                    .mobile-language-option.active .language-code {
                        background: var(--blue);
                        color: white;
                    }

                    .mobile-language-option svg {
                        color: var(--blue);
                    }

                    .mobile-user {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 0;
                        border-top: 1px solid #EEF1F5;
                        border-bottom: 1px solid #EEF1F5;
                    }

                    .mobile-user strong {
                        display: block;
                        font-size: 12px;
                        color: #303B4D;
                    }

                    .mobile-user span {
                        display: block;
                        margin-top: 3px;
                        font-size: 9.5px;
                        color: #929CAB;
                    }

                    .mobile-logout {
                        width: 100%;
                        height: 40px;
                        margin-top: 12px;
                        border: 1px solid #EBCFCF;
                        border-radius: 9px;
                        background: #FFF8F8;
                        color: #C45454;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 7px;
                        font-size: 11px;
                        font-weight: 700;
                        cursor: pointer;
                    }

                    .public-main {
                        padding: 22px 16px 35px;
                    }

                    .footer-inner {
                        min-height: 60px;
                        padding: 10px 16px;
                    }

                    .footer-right {
                        display: none;
                    }
                }

                @media (max-width: 420px) {
                    .brand-text span {
                        display: none;
                    }

                    .public-main {
                        padding-left: 12px;
                        padding-right: 12px;
                    }
                }
                    .mobile-nav-link {
    margin-bottom: 7px;
}

.mobile-nav-link.active {
    background: var(--blue);
    color: white;
}
            `})]})}export{Y as A,w as H};
