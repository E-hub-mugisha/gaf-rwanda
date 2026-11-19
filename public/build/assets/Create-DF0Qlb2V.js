import{j as r,H as e,L as a}from"./app-B2r5GH2N.js";import{A as i}from"./AdminLayout-CCuR1VdT.js";import o from"./ProgramForm-09tbu7qa.js";import"./adminI18n-CmBL3FjY.js";import"./Language-ChUCrwIh.js";function l(){return r.jsxs(i,{children:[r.jsx(e,{title:"Create Program"}),r.jsxs("div",{className:"program-page",children:[r.jsxs("div",{className:"program-page-header",children:[r.jsxs("div",{children:[r.jsx("nav",{"aria-label":"breadcrumb",children:r.jsxs("ol",{className:"breadcrumb program-breadcrumb",children:[r.jsx("li",{className:"breadcrumb-item",children:r.jsx(a,{href:route("admin.dashboard"),children:"Dashboard"})}),r.jsx("li",{className:"breadcrumb-item",children:r.jsx(a,{href:route("admin.programs.index"),children:"Programs"})}),r.jsx("li",{className:"breadcrumb-item active",children:"Create"})]})}),r.jsxs("div",{className:"program-heading",children:[r.jsx("div",{className:"program-heading-icon",children:r.jsx("i",{className:"bi bi-plus-lg"})}),r.jsxs("div",{children:[r.jsx("h2",{children:"Create Program"}),r.jsx("p",{children:"Add a new program and configure how it appears on the GAF Rwanda website."})]})]})]}),r.jsxs(a,{href:route("admin.programs.index"),className:"program-back-link",children:[r.jsx("i",{className:"bi bi-arrow-left"}),"Back to programs"]})]}),r.jsx(o,{mode:"create"})]}),r.jsx("style",{children:`
                .program-page {
                    max-width: 1500px;
                    margin: 0 auto;
                }

                .program-page-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 26px;
                }

                .program-breadcrumb {
                    margin-bottom: 17px;
                    font-size: 11px;
                }

                .program-breadcrumb a {
                    color: #718096;
                    text-decoration: none;
                }

                .program-breadcrumb a:hover {
                    color: #174a2f;
                }

                .program-breadcrumb .active {
                    color: #344054;
                    font-weight: 700;
                }

                .program-heading {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .program-heading-icon {
                    width: 48px;
                    height: 48px;
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    border-radius: 13px;
                    background: #eff7f3;
                    color: #174a2f;
                    font-size: 21px;
                }

                .program-heading h2 {
                    margin: 0;
                    color: #172033;
                    font-size: 22px;
                    font-weight: 800;
                    letter-spacing: -.5px;
                }

                .program-heading p {
                    margin: 5px 0 0;
                    color: #8792a2;
                    font-size: 11px;
                }

                .program-back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border: 1px solid #e4e9f0;
                    border-radius: 8px;
                    background: #fff;
                    color: #536174;
                    font-size: 11px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: .18s ease;
                }

                .program-back-link:hover {
                    border-color: #d0e6da;
                    background: #f8fafd;
                    color: #174a2f;
                }

                @media (max-width: 650px) {
                    .program-page-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .program-heading h2 {
                        font-size: 19px;
                    }
                }
            `})]})}export{l as default};
