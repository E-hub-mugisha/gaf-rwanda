import{r as o,j as e}from"./app-U_1Afga5.js";import{A}from"./AdminLayout-Ct2FOW6f.js";import{S as x,P as k}from"./search-D2Ud1UkZ.js";import{g as N,L as u}from"./Language-ChUCrwIh.js";import{A as l}from"./activity-C5DwCHvX.js";import{E}from"./eye-zmBqmSm0.js";import{U as S}from"./user-DrSGoYqS.js";import{F as d}from"./file-text-BLWxWg8f.js";import{c as b}from"./createLucideIcon-8s1KTT-j.js";import{X as z}from"./x-B0Cy3Gug.js";import{C as g}from"./calendar-days-DMMv_5-h.js";const F=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],L=b("chevron-right",F);const C=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6h4",key:"135r8i"}]],R=b("clock-3",C),m={rw:{eyebrow:"Igenzura rya Sisitemu",pageTitle:"Ibikorwa",pageSubtitle:"Kurikirana kureba inyandiko n’ibikorwa by’abasoma muri portal.",totalViews:"Ibyasomwe Byose",totalViewsSub:"Ibyasomwe by’inyandiko byanditswe",activeReaders:"Abasoma Bakora",activeReadersSub:"Abasoma bo kuri iyi paji",documents:"Inyandiko",documentsSub:"Inyandiko zasomwe",latestActivity:"Igikorwa Giheruka",active:"Birakora",none:"Nta na kimwe",recentActivitySub:"Igikorwa cy’umusomyi giheruka",noActivitySub:"Nta gikorwa cyanditswe",recentActivity:"Ibikorwa Biheruka",chronological:"Urutonde rw’igihe rw’ibyasomwe by’inyandiko",searchPlaceholder:"Shakisha igikorwa...",clearSearchLabel:"Siba ishakisha",noActivityTitle:"Nta gikorwa cyanditswe",noActivityBody:"Ibyasomwe by’inyandiko bizagaragara hano igihe abasoma bazasoma inyandiko.",noMatchTitle:"Nta gikorwa gihuye",noMatchBody:"Gerageza gushakisha ukoresheje undi musomyi, indi nyandiko, cyangwa urundi rurimi.",clearSearch:"Siba Ishakisha",colReader:"USOMYI",colDocument:"INYANDIKO",colLanguage:"URURIMI",colViewed:"YASOMWE",reader:"Usoma",document:"Inyandiko"},en:{eyebrow:"System Monitoring",pageTitle:"Activity Log",pageSubtitle:"Track document views and reader activity across the portal.",totalViews:"Total Views",totalViewsSub:"Recorded document views",activeReaders:"Active Readers",activeReadersSub:"Readers on this page",documents:"Documents",documentsSub:"Documents viewed",latestActivity:"Latest Activity",active:"Active",none:"None",recentActivitySub:"Recent reader activity",noActivitySub:"No activity recorded",recentActivity:"Recent Activity",chronological:"A chronological record of document views",searchPlaceholder:"Search activity...",clearSearchLabel:"Clear search",noActivityTitle:"No activity recorded",noActivityBody:"Document views will appear here when readers access documents.",noMatchTitle:"No matching activity",noMatchBody:"Try searching with a different reader, document, or language.",clearSearch:"Clear Search",colReader:"READER",colDocument:"DOCUMENT",colLanguage:"LANGUAGE",colViewed:"VIEWED",reader:"Reader",document:"Document"},fr:{eyebrow:"Surveillance du système",pageTitle:"Journal d’activité",pageSubtitle:"Suivez les consultations de documents et l’activité des lecteurs sur le portail.",totalViews:"Total des consultations",totalViewsSub:"Consultations de documents enregistrées",activeReaders:"Lecteurs actifs",activeReadersSub:"Lecteurs sur cette page",documents:"Documents",documentsSub:"Documents consultés",latestActivity:"Dernière activité",active:"Actif",none:"Aucune",recentActivitySub:"Activité récente des lecteurs",noActivitySub:"Aucune activité enregistrée",recentActivity:"Activité récente",chronological:"Un enregistrement chronologique des consultations de documents",searchPlaceholder:"Rechercher une activité...",clearSearchLabel:"Effacer la recherche",noActivityTitle:"Aucune activité enregistrée",noActivityBody:"Les consultations de documents apparaîtront ici lorsque des lecteurs accéderont aux documents.",noMatchTitle:"Aucune activité correspondante",noMatchBody:"Essayez de rechercher avec un autre lecteur, document ou langue.",clearSearch:"Effacer la recherche",colReader:"LECTEUR",colDocument:"DOCUMENT",colLanguage:"LANGUE",colViewed:"CONSULTÉ",reader:"Lecteur",document:"Document"},nl:{eyebrow:"Systeembewaking",pageTitle:"Activiteitenlogboek",pageSubtitle:"Volg documentweergaven en lezersactiviteit binnen het portaal.",totalViews:"Totaal aantal weergaven",totalViewsSub:"Geregistreerde documentweergaven",activeReaders:"Actieve lezers",activeReadersSub:"Lezers op deze pagina",documents:"Documenten",documentsSub:"Bekeken documenten",latestActivity:"Laatste activiteit",active:"Actief",none:"Geen",recentActivitySub:"Recente lezersactiviteit",noActivitySub:"Geen activiteit geregistreerd",recentActivity:"Recente activiteit",chronological:"Een chronologisch overzicht van documentweergaven",searchPlaceholder:"Activiteit zoeken...",clearSearchLabel:"Zoekopdracht wissen",noActivityTitle:"Geen activiteit geregistreerd",noActivityBody:"Documentweergaven verschijnen hier zodra lezers documenten openen.",noMatchTitle:"Geen overeenkomende activiteit",noMatchBody:"Probeer te zoeken met een andere lezer, document of taal.",clearSearch:"Zoekopdracht wissen",colReader:"LEZER",colDocument:"DOCUMENT",colLanguage:"TAAL",colViewed:"BEKEKEN",reader:"Lezer",document:"Document"}};function q({views:r}){const[v,y]=o.useState(N),a=m[v]||m.rw;o.useEffect(()=>{const t=i=>{y(i.detail)};return window.addEventListener(u,t),()=>{window.removeEventListener(u,t)}},[]);const[n,s]=o.useState(""),c=o.useMemo(()=>{const t=n.trim().toLowerCase();return t?r.data.filter(i=>i.user_name?.toLowerCase().includes(t)||i.document_title?.toLowerCase().includes(t)||i.language_label?.toLowerCase().includes(t)||i.viewed_at?.toLowerCase().includes(t)):r.data},[r.data,n]),f=r.total??r.data.length,w=new Set(r.data.map(t=>t.user_name)).size,j=new Set(r.data.map(t=>t.document_title)).size,p=t=>t?t.trim().split(/\s+/).slice(0,2).map(i=>i.charAt(0).toUpperCase()).join(""):"U",h=t=>{if(!t)return"—";const i=t.toLowerCase();return i.includes("english")?"EN":i.includes("spanish")?"ES":i.includes("kinyarwanda")?"RW":t.substring(0,2).toUpperCase()};return e.jsxs(A,{title:a.pageTitle,children:[e.jsxs("div",{className:"activity-page",children:[e.jsx("div",{className:"page-header",children:e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-icon",children:e.jsx(l,{size:23})}),e.jsxs("div",{children:[e.jsx("div",{className:"eyebrow",children:a.eyebrow}),e.jsx("h1",{children:a.pageTitle}),e.jsx("p",{children:a.pageSubtitle})]})]})}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon blue",children:e.jsx(E,{size:20})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{children:a.totalViews}),e.jsx("strong",{children:f}),e.jsx("small",{children:a.totalViewsSub})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon purple",children:e.jsx(S,{size:20})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{children:a.activeReaders}),e.jsx("strong",{children:w}),e.jsx("small",{children:a.activeReadersSub})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon green",children:e.jsx(d,{size:20})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{children:a.documents}),e.jsx("strong",{children:j}),e.jsx("small",{children:a.documentsSub})]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon orange",children:e.jsx(R,{size:20})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("span",{children:a.latestActivity}),e.jsx("strong",{children:r.data.length>0?a.active:a.none}),e.jsx("small",{children:r.data.length>0?a.recentActivitySub:a.noActivitySub})]})]})]}),e.jsxs("div",{className:"activity-card",children:[e.jsxs("div",{className:"card-toolbar",children:[e.jsxs("div",{className:"toolbar-title",children:[e.jsx("div",{className:"toolbar-icon",children:e.jsx(l,{size:18})}),e.jsxs("div",{children:[e.jsx("h2",{children:a.recentActivity}),e.jsx("p",{children:a.chronological})]})]}),e.jsxs("div",{className:"search-wrapper",children:[e.jsx(x,{size:17,className:"search-icon"}),e.jsx("input",{type:"text",placeholder:a.searchPlaceholder,value:n,onChange:t=>s(t.target.value)}),n&&e.jsx("button",{type:"button",className:"clear-search",onClick:()=>s(""),"aria-label":a.clearSearchLabel,children:e.jsx(z,{size:15})})]})]}),r.data.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(l,{size:30})}),e.jsx("h3",{children:a.noActivityTitle}),e.jsx("p",{children:a.noActivityBody})]}):c.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx(x,{size:28})}),e.jsx("h3",{children:a.noMatchTitle}),e.jsx("p",{children:a.noMatchBody}),e.jsx("button",{type:"button",className:"reset-button",onClick:()=>s(""),children:a.clearSearch})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{className:"activity-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:a.colReader}),e.jsx("th",{children:a.colDocument}),e.jsx("th",{children:a.colLanguage}),e.jsx("th",{children:a.colViewed}),e.jsx("th",{})]})}),e.jsx("tbody",{children:c.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"reader-cell",children:[e.jsx("div",{className:"reader-avatar",children:p(t.user_name)}),e.jsxs("div",{className:"reader-info",children:[e.jsx("strong",{children:t.user_name}),e.jsx("span",{children:a.reader})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"document-cell",children:[e.jsx("div",{className:"document-icon",children:e.jsx(d,{size:17})}),e.jsxs("div",{children:[e.jsx("strong",{children:t.document_title}),e.jsx("span",{children:a.document})]})]})}),e.jsx("td",{children:e.jsxs("div",{className:"language-badge",children:[e.jsx("span",{className:"language-code",children:h(t.language_label)}),e.jsx("span",{children:t.language_label})]})}),e.jsx("td",{children:e.jsxs("div",{className:"date-cell",children:[e.jsx(g,{size:16}),e.jsx("span",{children:t.viewed_at})]})}),e.jsx("td",{children:e.jsx(L,{size:17,className:"row-arrow"})})]},t.id))})]})}),e.jsx("div",{className:"mobile-activity-list",children:c.map(t=>e.jsxs("div",{className:"mobile-activity-card",children:[e.jsxs("div",{className:"mobile-card-top",children:[e.jsxs("div",{className:"reader-cell",children:[e.jsx("div",{className:"reader-avatar",children:p(t.user_name)}),e.jsxs("div",{className:"reader-info",children:[e.jsx("strong",{children:t.user_name}),e.jsx("span",{children:a.reader})]})]}),e.jsx("div",{className:"mobile-language",children:h(t.language_label)})]}),e.jsxs("div",{className:"mobile-document",children:[e.jsx("div",{className:"document-icon",children:e.jsx(d,{size:17})}),e.jsxs("div",{children:[e.jsx("strong",{children:t.document_title}),e.jsx("span",{children:t.language_label})]})]}),e.jsxs("div",{className:"mobile-date",children:[e.jsx(g,{size:15}),e.jsx("span",{children:t.viewed_at})]})]},t.id))}),!n&&e.jsx("div",{className:"pagination-container",children:e.jsx(k,{links:r.links})})]})]})]}),e.jsx("style",{children:`
                .activity-page {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --surface: #FFFFFF;
                    --background: #F6F8FB;
                    --purple: #8067B5;
                    --green: #3D9B70;
                    --orange: #D8914B;

                    min-height: 100%;
                    padding: 4px 0 40px;
                    color: var(--ink);
                }

                /* HEADER */

                .page-header {
                    margin-bottom: 24px;
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .header-icon {
                    width: 46px;
                    height: 46px;
                    border-radius: 13px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .eyebrow {
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .1em;
                    color: var(--blue);
                    margin-bottom: 4px;
                }

                .page-header h1 {
                    margin: 0;
                    font-size: 27px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -.025em;
                }

                .page-header p {
                    margin: 6px 0 0;
                    color: var(--muted);
                    font-size: 13px;
                }

                /* STATS */

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 14px;
                    margin-bottom: 20px;
                }

                .stat-card {
                    min-width: 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 15px;
                    padding: 17px;
                    box-shadow: 0 4px 15px rgba(24, 43, 70, .035);
                }

                .stat-icon {
                    width: 41px;
                    height: 41px;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-icon.blue {
                    background: #EEF4FC;
                    color: var(--blue);
                }

                .stat-icon.purple {
                    background: #F1EDFA;
                    color: var(--purple);
                }

                .stat-icon.green {
                    background: #EDF8F3;
                    color: var(--green);
                }

                .stat-icon.orange {
                    background: #FFF4E8;
                    color: var(--orange);
                }

                .stat-content {
                    min-width: 0;
                }

                .stat-content span {
                    display: block;
                    color: #7B8797;
                    font-size: 10.5px;
                    font-weight: 650;
                    margin-bottom: 3px;
                }

                .stat-content strong {
                    display: block;
                    font-size: 21px;
                    line-height: 1.1;
                    font-weight: 800;
                    color: var(--ink);
                }

                .stat-content small {
                    display: block;
                    margin-top: 4px;
                    color: #A0A9B6;
                    font-size: 9.5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* MAIN CARD */

                .activity-card {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 17px;
                    overflow: hidden;
                    box-shadow: 0 5px 20px rgba(24, 43, 70, .04);
                }

                /* TOOLBAR */

                .card-toolbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 18px;
                    padding: 18px 20px;
                    border-bottom: 1px solid var(--border);
                }

                .toolbar-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                }

                .toolbar-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .toolbar-title h2 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 800;
                }

                .toolbar-title p {
                    margin: 3px 0 0;
                    font-size: 10.5px;
                    color: var(--muted);
                }

                /* SEARCH */

                .search-wrapper {
                    position: relative;
                    width: 270px;
                    flex-shrink: 0;
                }

                .search-wrapper input {
                    width: 100%;
                    height: 39px;
                    box-sizing: border-box;
                    border: 1px solid #DCE2EA;
                    border-radius: 10px;
                    outline: none;
                    padding: 0 37px 0 37px;
                    font-size: 12px;
                    color: var(--ink);
                    background: #FAFBFC;
                    transition: .2s ease;
                }

                .search-wrapper input:focus {
                    border-color: var(--blue);
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(93,137,200,.1);
                }

                .search-wrapper input::placeholder {
                    color: #A0AAB7;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 11px;
                    color: #8995A5;
                    pointer-events: none;
                }

                .clear-search {
                    position: absolute;
                    right: 7px;
                    top: 6px;
                    width: 27px;
                    height: 27px;
                    border: 0;
                    border-radius: 7px;
                    background: transparent;
                    color: #8995A5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .clear-search:hover {
                    background: var(--blue-light);
                    color: var(--blue);
                }

                /* TABLE */

                .table-wrapper {
                    width: 100%;
                    overflow-x: auto;
                }

                .activity-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .activity-table th {
                    padding: 13px 20px;
                    background: #FAFBFC;
                    border-bottom: 1px solid var(--border);
                    color: #8994A4;
                    text-align: left;
                    font-size: 9.5px;
                    font-weight: 800;
                    letter-spacing: .065em;
                    white-space: nowrap;
                }

                .activity-table td {
                    padding: 14px 20px;
                    border-bottom: 1px solid #EEF1F5;
                    vertical-align: middle;
                }

                .activity-table tbody tr {
                    transition: background .15s ease;
                }

                .activity-table tbody tr:hover {
                    background: #FBFCFE;
                }

                .activity-table tbody tr:last-child td {
                    border-bottom: 0;
                }

                /* READER */

                .reader-cell {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 160px;
                }

                .reader-avatar {
                    width: 34px;
                    height: 34px;
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

                .reader-info {
                    min-width: 0;
                }

                .reader-info strong {
                    display: block;
                    max-width: 180px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #303B4D;
                    font-size: 12px;
                    font-weight: 750;
                }

                .reader-info span {
                    display: block;
                    color: #9AA4B2;
                    font-size: 9.5px;
                    margin-top: 2px;
                }

                /* DOCUMENT */

                .document-cell {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-width: 210px;
                }

                .document-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 9px;
                    background: #F3F6FA;
                    color: #66758A;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .document-cell strong {
                    display: block;
                    max-width: 260px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #344052;
                    font-size: 12px;
                    font-weight: 700;
                }

                .document-cell span {
                    display: block;
                    margin-top: 2px;
                    color: #9AA4B2;
                    font-size: 9.5px;
                }

                /* LANGUAGE */

                .language-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 5px 8px 5px 5px;
                    border: 1px solid #E1E7EF;
                    background: #F9FAFC;
                    border-radius: 8px;
                    color: #5F6B7C;
                    font-size: 10px;
                    font-weight: 650;
                    white-space: nowrap;
                }

                .language-code {
                    width: 23px;
                    height: 21px;
                    border-radius: 6px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8px;
                    font-weight: 800;
                }

                /* DATE */

                .date-cell {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #697688;
                    font-size: 11px;
                    white-space: nowrap;
                }

                .date-cell svg {
                    color: #94A0AE;
                }

                .row-arrow {
                    color: #C2CAD4;
                }

                /* EMPTY */

                .empty-state {
                    min-height: 290px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 35px 20px;
                }

                .empty-icon {
                    width: 62px;
                    height: 62px;
                    border-radius: 17px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                }

                .empty-state h3 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 800;
                    color: #344052;
                }

                .empty-state p {
                    max-width: 390px;
                    margin: 7px 0 15px;
                    color: #8A95A5;
                    font-size: 11.5px;
                    line-height: 1.55;
                }

                .reset-button {
                    border: 1px solid #DCE2EA;
                    background: #fff;
                    color: #596678;
                    padding: 8px 13px;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .reset-button:hover {
                    border-color: var(--blue);
                    color: var(--blue);
                    background: var(--blue-light);
                }

                /* PAGINATION */

                .pagination-container {
                    padding: 15px 20px;
                    border-top: 1px solid var(--border);
                    background: #FCFDFE;
                }

                /* MOBILE */

                .mobile-activity-list {
                    display: none;
                }

                .mobile-activity-card {
                    border-bottom: 1px solid #EEF1F5;
                    padding: 16px;
                }

                .mobile-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .mobile-language {
                    padding: 5px 8px;
                    border-radius: 7px;
                    background: var(--blue-light);
                    color: var(--blue);
                    font-size: 9px;
                    font-weight: 800;
                }

                .mobile-document {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin-bottom: 12px;
                }

                .mobile-document strong {
                    display: block;
                    color: #344052;
                    font-size: 12px;
                    line-height: 1.35;
                }

                .mobile-document span {
                    display: block;
                    margin-top: 2px;
                    color: #929DAC;
                    font-size: 9.5px;
                }

                .mobile-date {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #8994A4;
                    font-size: 10px;
                    padding-left: 43px;
                }

                /* RESPONSIVE */

                @media (max-width: 1150px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 800px) {
                    .card-toolbar {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .search-wrapper {
                        width: 100%;
                    }

                    .table-wrapper {
                        display: none;
                    }

                    .mobile-activity-list {
                        display: block;
                    }
                }

                @media (max-width: 600px) {
                    .activity-page {
                        padding-bottom: 25px;
                    }

                    .page-header h1 {
                        font-size: 22px;
                    }

                    .page-header p {
                        font-size: 11.5px;
                    }

                    .header-icon {
                        width: 41px;
                        height: 41px;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 9px;
                    }

                    .stat-card {
                        padding: 13px;
                        gap: 9px;
                    }

                    .stat-icon {
                        width: 35px;
                        height: 35px;
                    }

                    .stat-content strong {
                        font-size: 17px;
                    }

                    .stat-content small {
                        display: none;
                    }

                    .stat-content span {
                        font-size: 9.5px;
                    }

                    .card-toolbar {
                        padding: 15px;
                    }

                    .pagination-container {
                        padding: 13px 15px;
                        overflow-x: auto;
                    }
                }

                @media (max-width: 400px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .stat-content small {
                        display: block;
                    }
                }
            `})]})}export{q as default};
