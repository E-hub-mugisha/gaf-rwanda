import{r as o,j as t,H as s}from"./app-U_1Afga5.js";import{A as x}from"./AppLayout-beX1Vth7.js";import{g,L as c}from"./Language-ChUCrwIh.js";import"./file-text-BLWxWg8f.js";import"./createLucideIcon-8s1KTT-j.js";import"./heart-pulse-4baOWmML.js";import"./shield-check-BPSLSvBE.js";import"./x-B0Cy3Gug.js";function L({page:e}){const[n,l]=o.useState(g());o.useEffect(()=>{const r=d=>{l(d.detail)};return window.addEventListener(c,r),()=>{window.removeEventListener(c,r)}},[]);const a=e?.content?.[n]??e?.content?.rw??{},i=a.pageTitle||e?.page_title||"Depression",p=a.body||"";return t.jsxs(x,{title:i,children:[t.jsx(s,{title:i}),t.jsx("main",{className:"article-page",children:t.jsxs("article",{className:"article-container",children:[t.jsxs("header",{className:"article-header",children:[t.jsx("h1",{children:i}),t.jsx("div",{className:"article-meta",children:e?.updated_at&&t.jsxs(t.Fragment,{children:[t.jsx("span",{children:"•"}),t.jsx("time",{children:new Date(e.updated_at).toLocaleDateString(n==="rw"?"rw-RW":n==="fr"?"fr-FR":n==="nl"?"nl-NL":"en-US",{year:"numeric",month:"long",day:"numeric"})})]})})]}),t.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:p}})]})}),t.jsx("style",{children:`
                .article-page {
                    width: 100%;
                    background: #ffffff;
                    padding: 48px 20px 80px;
                }

                .article-container {
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .article-header {
                    margin-bottom: 28px;
                }

                .article-header h1 {
                    margin: 0 0 12px;
                    color: #171717;
                    font-size: clamp(30px, 5vw, 46px);
                    line-height: 1.15;
                    font-weight: 700;
                    letter-spacing: -0.8px;
                }

                .article-meta {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                    color: #737373;
                    font-size: 14px;
                }

                .article-divider {
                    border: 0;
                    border-top: 1px solid #e5e5e5;
                    margin: 0 0 36px;
                }

                .article-content {
                    color: #292929;
                    font-size: 17px;
                    line-height: 1.85;
                }

                .article-content h2 {
                    margin: 42px 0 16px;
                    color: #171717;
                    font-size: 28px;
                    line-height: 1.3;
                    font-weight: 700;
                }

                .article-content h3 {
                    margin: 32px 0 12px;
                    color: #222222;
                    font-size: 22px;
                    line-height: 1.4;
                    font-weight: 650;
                }

                .article-content h4 {
                    margin: 24px 0 10px;
                    color: #333333;
                    font-size: 18px;
                    font-weight: 600;
                }

                .article-content p {
                    margin: 0 0 20px;
                }

                .article-content ul,
                .article-content ol {
                    margin: 0 0 24px;
                    padding-left: 28px;
                }

                .article-content li {
                    margin-bottom: 8px;
                }

                .article-content strong {
                    color: #171717;
                    font-weight: 650;
                }

                .article-content em {
                    font-style: italic;
                }

                .article-content blockquote {
                    margin: 28px 0;
                    padding: 4px 0 4px 20px;
                    border-left: 3px solid #5D89C8;
                    color: #555555;
                    font-style: italic;
                }

                .article-content a {
                    color: #5D89C8;
                    text-decoration: underline;
                }

                .article-content img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    margin: 28px auto;
                }

                .article-content hr {
                    border: 0;
                    border-top: 1px solid #e5e5e5;
                    margin: 36px 0;
                }

                .article-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 28px 0;
                    font-size: 15px;
                }

                .article-content th,
                .article-content td {
                    border: 1px solid #dddddd;
                    padding: 10px 12px;
                    text-align: left;
                }

                .article-content th {
                    background: #f7f7f7;
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .article-page {
                        padding: 32px 16px 60px;
                    }

                    .article-content {
                        font-size: 16px;
                        line-height: 1.75;
                    }

                    .article-content h2 {
                        font-size: 24px;
                        margin-top: 34px;
                    }

                    .article-content h3 {
                        font-size: 20px;
                    }
                }
            `})]})}export{L as default};
