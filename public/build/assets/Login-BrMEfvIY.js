import{r as d,u as w,j as e,H as j}from"./app-Cpz07aqI.js";const k={rw:{language:"Ururimi",secureAccess:"KWINJIRA MU MUTEKANO",welcome:"Murakaza neza",subtitle:"Injira kugira ngo ubashe gukoresha konti yawe ya Guided Act & Feel Rwanda.",email:"Imeyili",emailPlaceholder:"urugero@example.com",password:"Ijambobanga",passwordPlaceholder:"Andika ijambobanga ryawe",remember:"Nyibuke",signIn:"Injira",signingIn:"Kwinjira...",signInFailed:"Kwinjira ntibyashobotse",checkForm:"Reba amakuru watanze",checkFormText:"Hari amakuru amwe agomba gukosorwa.",success:"Byagenze neza",secureConnection:"Uburyo bwo kwinjira buratekanye",encrypted:"Amakuru yawe ararinzwe kandi arabitswe mu mutekano."},en:{language:"Language",secureAccess:"SECURE ACCESS",welcome:"Welcome back",subtitle:"Sign in to access your Guided Act & Feel Rwanda account.",email:"Email address",emailPlaceholder:"you@example.com",password:"Password",passwordPlaceholder:"Enter your password",remember:"Remember me",signIn:"Sign in",signingIn:"Signing in...",signInFailed:"Sign in failed",checkForm:"Please check the form",checkFormText:"Some information needs your attention.",success:"Success",secureConnection:"Secure connection",encrypted:"Your information is encrypted and protected."},fr:{language:"Langue",secureAccess:"ACCÈS SÉCURISÉ",welcome:"Bon retour",subtitle:"Connectez-vous pour accéder à votre compte Guided Act & Feel Rwanda.",email:"Adresse e-mail",emailPlaceholder:"vous@example.com",password:"Mot de passe",passwordPlaceholder:"Entrez votre mot de passe",remember:"Se souvenir de moi",signIn:"Se connecter",signingIn:"Connexion...",signInFailed:"Échec de la connexion",checkForm:"Veuillez vérifier le formulaire",checkFormText:"Certaines informations nécessitent votre attention.",success:"Succès",secureConnection:"Connexion sécurisée",encrypted:"Vos informations sont chiffrées et protégées."},nl:{language:"Taal",secureAccess:"VEILIGE TOEGANG",welcome:"Welkom terug",subtitle:"Log in om toegang te krijgen tot uw Guided Act & Feel Rwanda-account.",email:"E-mailadres",emailPlaceholder:"u@example.com",password:"Wachtwoord",passwordPlaceholder:"Voer uw wachtwoord in",remember:"Onthoud mij",signIn:"Inloggen",signingIn:"Inloggen...",signInFailed:"Inloggen mislukt",checkForm:"Controleer het formulier",checkFormText:"Sommige informatie vereist uw aandacht.",success:"Succes",secureConnection:"Beveiligde verbinding",encrypted:"Uw gegevens zijn versleuteld en beschermd."}},v={rw:"Kinyarwanda",en:"English",fr:"Français",nl:"Nederlands"};function N({status:p}){const[i,h]=d.useState(()=>typeof window>"u"?"rw":localStorage.getItem("gaf_language")||"rw"),[s,g]=d.useState(!1),r=k[i],{data:t,setData:l,post:u,processing:x,errors:a,clearErrors:c}=w({email:"",password:"",remember:!1}),m=n=>{n.preventDefault(),c(),u("/login",{preserveScroll:!0})},o=a.email&&(a.email.toLowerCase().includes("credentials")||a.email.toLowerCase().includes("password")||a.email.toLowerCase().includes("incorrect")||a.email.toLowerCase().includes("match our records")),f=n=>{h(n),g(!1)};return d.useEffect(()=>{localStorage.setItem("gaf_language",i),document.documentElement.lang=i},[i]),e.jsxs(e.Fragment,{children:[e.jsx(j,{title:r.signIn}),e.jsxs("div",{className:"login-page",children:[e.jsx("div",{className:"background-shape background-shape-one"}),e.jsx("div",{className:"background-shape background-shape-two"}),e.jsxs("main",{className:"login-card",children:[e.jsxs("div",{className:"top-bar",children:[e.jsxs("div",{className:"brand",children:[e.jsx("div",{className:"logo-container",children:e.jsx("img",{src:"/images/guided-logo.png",alt:"Guided Act & Feel Rwanda"})}),e.jsxs("div",{className:"brand-name",children:[e.jsx("span",{children:"GAF"}),e.jsx("small",{children:"RWANDA"})]})]}),e.jsxs("div",{className:"language-wrapper",children:[e.jsxs("button",{type:"button",className:"language-button",onClick:()=>g(!s),"aria-label":r.language,"aria-expanded":s,children:[e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.7",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M3 12h18"}),e.jsx("path",{d:"M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z"})]}),e.jsx("span",{children:i.toUpperCase()}),e.jsx("svg",{className:`chevron ${s?"open":""}`,width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),s&&e.jsxs("div",{className:"language-menu",children:[e.jsx("div",{className:"language-title",children:r.language}),Object.entries(v).map(([n,b])=>e.jsxs("button",{type:"button",className:`language-option ${i===n?"active":""}`,onClick:()=>f(n),children:[e.jsx("span",{className:"language-code",children:n.toUpperCase()}),e.jsx("span",{children:b}),i===n&&e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"m5 12 4 4L19 6"})})]},n))]})]})]}),e.jsxs("div",{className:"login-header",children:[e.jsx("span",{className:"welcome-label",children:r.secureAccess}),e.jsx("h1",{children:r.welcome}),e.jsx("p",{children:r.subtitle})]}),o&&e.jsxs("div",{className:"alert alert-error",role:"alert",children:[e.jsx("div",{className:"alert-icon",children:e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:[e.jsx("path",{d:"M12 9v4"}),e.jsx("path",{d:"M12 17h.01"}),e.jsx("path",{d:"M10.3 3.7 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75-3L13.7 3.7a2 2 0 0 0-3.4 0Z"})]})}),e.jsxs("div",{className:"alert-content",children:[e.jsx("strong",{children:r.signInFailed}),e.jsx("p",{children:a.email})]})]}),Object.keys(a).length>0&&!o&&!a.email&&e.jsxs("div",{className:"alert alert-error",role:"alert",children:[e.jsx("div",{className:"alert-icon",children:e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:[e.jsx("path",{d:"M12 9v4"}),e.jsx("path",{d:"M12 17h.01"}),e.jsx("path",{d:"M10.3 3.7 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75 3L13.7 3.7a2 2 0 0 0-3.4 0Z"})]})}),e.jsxs("div",{className:"alert-content",children:[e.jsx("strong",{children:r.checkForm}),e.jsx("p",{children:r.checkFormText})]})]}),p&&e.jsxs("div",{className:"alert alert-success",role:"status",children:[e.jsx("div",{className:"alert-icon",children:e.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:e.jsx("path",{d:"m5 12 4 4L19 6"})})}),e.jsxs("div",{className:"alert-content",children:[e.jsx("strong",{children:r.success}),e.jsx("p",{children:p})]})]}),e.jsxs("form",{onSubmit:m,className:"login-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"email",children:r.email}),e.jsxs("div",{className:`input-wrapper ${a.email&&!o?"has-error":""}`,children:[e.jsx("span",{className:"input-icon",children:e.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[e.jsx("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2"}),e.jsx("path",{d:"m3 7 9 6 9-6"})]})}),e.jsx("input",{type:"email",id:"email",name:"email",placeholder:r.emailPlaceholder,autoComplete:"email",autoFocus:!0,value:t.email,onChange:n=>{l("email",n.target.value),a.email&&c("email")}}),a.email&&!o&&e.jsx("span",{className:"input-error-icon",children:"!"})]}),a.email&&!o&&e.jsxs("div",{className:"field-error",children:[e.jsx("span",{children:"!"}),a.email]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"password",children:r.password}),e.jsxs("div",{className:`input-wrapper ${a.password?"has-error":""}`,children:[e.jsx("span",{className:"input-icon",children:e.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[e.jsx("rect",{x:"4",y:"10",width:"16",height:"11",rx:"2"}),e.jsx("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})]})}),e.jsx("input",{type:"password",id:"password",name:"password",placeholder:r.passwordPlaceholder,autoComplete:"current-password",value:t.password,onChange:n=>{l("password",n.target.value),a.password&&c("password")}}),a.password&&e.jsx("span",{className:"input-error-icon",children:"!"})]}),a.password&&e.jsxs("div",{className:"field-error",children:[e.jsx("span",{children:"!"}),a.password]})]}),e.jsx("div",{className:"form-options",children:e.jsxs("label",{className:"remember",children:[e.jsx("input",{type:"checkbox",checked:t.remember,onChange:n=>l("remember",n.target.checked)}),e.jsx("span",{className:"custom-checkbox",children:t.remember&&e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:e.jsx("path",{d:"m5 12 4 4L19 6"})})}),e.jsx("span",{children:r.remember})]})}),e.jsx("button",{type:"submit",className:"login-button",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"}),e.jsx("span",{children:r.signingIn})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{children:r.signIn}),e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M5 12h14"}),e.jsx("path",{d:"m13 6 6 6-6 6"})]})]})})]}),e.jsxs("div",{className:"login-security",children:[e.jsx("div",{className:"security-icon",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"4",y:"10",width:"16",height:"11",rx:"2"}),e.jsx("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})]})}),e.jsxs("div",{children:[e.jsx("strong",{children:r.secureConnection}),e.jsx("span",{children:r.encrypted})]})]}),e.jsxs("div",{className:"login-footer",children:["© ",new Date().getFullYear()," Guided Act & Feel Rwanda"]})]})]}),e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #app {
                    min-height: 100%;
                    margin: 0;
                }

                body {
                    font-family:
                        "Manrope",
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                    background: #f4f7fb;
                    color: #182333;
                }

                /* =========================================
                   PAGE
                ========================================= */

                .login-page {
                    position: relative;

                    min-height: 100vh;
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 35px 20px;

                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 10% 10%,
                            rgba(93, 137, 200, 0.08),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 90% 90%,
                            rgba(32, 96, 61, 0.06),
                            transparent 30%
                        ),
                        #f4f7fb;
                }

                .background-shape {
                    position: absolute;

                    border-radius: 50%;

                    pointer-events: none;

                    opacity: 0.55;
                }

                .background-shape-one {
                    width: 280px;
                    height: 280px;

                    top: -130px;
                    left: -100px;

                    background: rgba(93, 137, 200, 0.08);
                }

                .background-shape-two {
                    width: 350px;
                    height: 350px;

                    right: -180px;
                    bottom: -180px;

                    background: rgba(32, 96, 61, 0.06);
                }

                /* =========================================
                   CARD
                ========================================= */

                .login-card {
                    position: relative;
                    z-index: 2;

                    width: 100%;
                    max-width: 420px;

                    padding: 30px 38px 27px;

                    background: rgba(255, 255, 255, 0.98);

                    border: 1px solid #e5eaf0;

                    border-radius: 18px;

                    box-shadow:
                        0 25px 70px rgba(24, 35, 51, 0.09),
                        0 4px 15px rgba(24, 35, 51, 0.03);
                }

                /* =========================================
                   TOP BAR
                ========================================= */

                .top-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    margin-bottom: 27px;
                }

                /* =========================================
                   BRAND
                ========================================= */

                .brand {
                    display: flex;
                    align-items: center;

                    gap: 9px;
                }

                .logo-container {
                    width: 44px;
                    height: 44px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    overflow: hidden;

                    border-radius: 11px;

                    background: #ffffff;

                    border: 1px solid #e3e9f0;

                    box-shadow:
                        0 5px 16px rgba(93, 137, 200, 0.11);
                }

                .logo-container img {
                    width: 35px;
                    height: 35px;

                    object-fit: contain;
                }

                .brand-name {
                    display: flex;
                    flex-direction: column;

                    line-height: 1;
                }

                .brand-name span {
                    color: #294d7c;

                    font-size: 16px;
                    font-weight: 800;

                    letter-spacing: -0.3px;
                }

                .brand-name small {
                    margin-top: 4px;

                    color: #7c8796;

                    font-size: 7.5px;
                    font-weight: 800;

                    letter-spacing: 1.6px;
                }

                /* =========================================
                   LANGUAGE
                ========================================= */

                .language-wrapper {
                    position: relative;
                }

                .language-button {
                    height: 34px;

                    display: flex;
                    align-items: center;

                    gap: 6px;

                    padding: 0 9px;

                    border: 1px solid #e1e6ed;

                    border-radius: 8px;

                    background: #ffffff;

                    color: #667384;

                    font-family: inherit;

                    font-size: 10px;
                    font-weight: 750;

                    cursor: pointer;

                    transition: 0.18s ease;
                }

                .language-button:hover {
                    border-color: #cbd5e1;

                    color: #456b9d;

                    background: #f9fbfd;
                }

                .language-button .chevron {
                    transition: transform 0.18s ease;
                }

                .language-button .chevron.open {
                    transform: rotate(180deg);
                }

                .language-menu {
                    position: absolute;

                    top: calc(100% + 7px);
                    right: 0;

                    width: 175px;

                    padding: 6px;

                    background: #ffffff;

                    border: 1px solid #e3e8ef;

                    border-radius: 10px;

                    box-shadow:
                        0 15px 35px rgba(24, 35, 51, 0.12);

                    z-index: 20;

                    animation: languageMenu 0.15s ease;
                }

                @keyframes languageMenu {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .language-title {
                    padding: 7px 9px 6px;

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

                    font-size: 10.5px;

                    text-align: left;

                    cursor: pointer;
                }

                .language-option:hover {
                    background: #f4f7fb;
                }

                .language-option.active {
                    background: rgba(93, 137, 200, 0.09);

                    color: #426b9e;

                    font-weight: 700;
                }

                .language-option svg {
                    margin-left: auto;

                    color: #5d89c8;
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
                    background: #5d89c8;

                    color: white;
                }

                /* =========================================
                   HEADER
                ========================================= */

                .login-header {
                    text-align: center;

                    margin-bottom: 26px;
                }

                .welcome-label {
                    display: inline-block;

                    margin-bottom: 9px;

                    color: #5d89c8;

                    font-size: 8.5px;
                    font-weight: 800;

                    letter-spacing: 1.4px;
                }

                .login-header h1 {
                    margin: 0 0 7px;

                    color: #182333;

                    font-size: 26px;

                    line-height: 1.2;

                    font-weight: 750;

                    letter-spacing: -0.6px;
                }

                .login-header p {
                    max-width: 315px;

                    margin: 0 auto;

                    color: #7a8594;

                    font-size: 12px;

                    line-height: 1.6;
                }

                /* =========================================
                   ALERTS
                ========================================= */

                .alert {
                    display: flex;

                    align-items: flex-start;

                    gap: 10px;

                    padding: 11px 12px;

                    margin-bottom: 18px;

                    border-radius: 9px;

                    font-size: 11.5px;
                }

                .alert-error {
                    color: #a92727;

                    background: #fff7f7;

                    border: 1px solid #f4d0d0;
                }

                .alert-success {
                    color: #287447;

                    background: #f3faf5;

                    border: 1px solid #cee8d6;
                }

                .alert-icon {
                    width: 21px;
                    height: 21px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: rgba(169, 39, 39, 0.08);
                }

                .alert-success .alert-icon {
                    background: rgba(40, 116, 71, 0.09);
                }

                .alert-content strong {
                    display: block;

                    margin-bottom: 2px;

                    font-size: 11.5px;

                    font-weight: 750;
                }

                .alert-content p {
                    margin: 0;

                    font-size: 10.5px;

                    line-height: 1.5;
                }

                /* =========================================
                   FORM
                ========================================= */

                .login-form {
                    display: flex;

                    flex-direction: column;

                    gap: 17px;
                }

                .form-group {
                    display: flex;

                    flex-direction: column;
                }

                .form-group label {
                    margin-bottom: 6px;

                    color: #364152;

                    font-size: 11px;

                    font-weight: 700;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;

                    left: 13px;
                    top: 50%;

                    transform: translateY(-50%);

                    display: flex;

                    color: #9ba6b4;

                    pointer-events: none;

                    z-index: 2;
                }

                .input-wrapper input {
                    width: 100%;

                    height: 46px;

                    padding: 0 39px;

                    outline: none;

                    border: 1px solid #dce2e9;

                    border-radius: 9px;

                    background: #fbfcfd;

                    color: #1b2636;

                    font-family: inherit;

                    font-size: 12px;

                    transition: 0.18s ease;
                }

                .input-wrapper input::placeholder {
                    color: #a8b0bb;
                }

                .input-wrapper input:hover {
                    border-color: #cbd3de;
                }

                .input-wrapper input:focus {
                    background: #ffffff;

                    border-color: #5d89c8;

                    box-shadow:
                        0 0 0 3px rgba(93, 137, 200, 0.11);
                }

                .input-wrapper.has-error input {
                    border-color: #dc5a5a;

                    background: #fffafa;
                }

                .input-error-icon {
                    position: absolute;

                    right: 12px;
                    top: 50%;

                    transform: translateY(-50%);

                    width: 18px;
                    height: 18px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #dc5a5a;

                    color: white;

                    font-size: 10px;

                    font-weight: 800;
                }

                .field-error {
                    display: flex;

                    align-items: center;

                    gap: 6px;

                    margin-top: 5px;

                    color: #c03939;

                    font-size: 10px;

                    line-height: 1.4;
                }

                .field-error span {
                    width: 14px;
                    height: 14px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #fce3e3;

                    font-size: 8px;

                    font-weight: 800;
                }

                /* =========================================
                   REMEMBER
                ========================================= */

                .remember {
                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    cursor: pointer;

                    color: #6f7a89;

                    font-size: 11px;

                    user-select: none;
                }

                .remember input {
                    position: absolute;

                    width: 1px;
                    height: 1px;

                    opacity: 0;
                }

                .custom-checkbox {
                    width: 17px;
                    height: 17px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border: 1px solid #cbd3dd;

                    border-radius: 4px;

                    color: white;
                }

                .remember input:checked + .custom-checkbox {
                    background: #5d89c8;

                    border-color: #5d89c8;
                }

                /* =========================================
                   BUTTON
                ========================================= */

                .login-button {
                    width: 100%;

                    height: 46px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 8px;

                    margin-top: 1px;

                    border: 0;

                    border-radius: 9px;

                    background: #5d89c8;

                    color: white;

                    font-family: inherit;

                    font-size: 12px;

                    font-weight: 750;

                    cursor: pointer;

                    box-shadow:
                        0 7px 18px rgba(93, 137, 200, 0.20);

                    transition: 0.18s ease;
                }

                .login-button:hover:not(:disabled) {
                    background: #4f79b4;

                    transform: translateY(-1px);

                    box-shadow:
                        0 10px 22px rgba(93, 137, 200, 0.25);
                }

                .login-button:disabled {
                    opacity: 0.7;

                    cursor: not-allowed;
                }

                .spinner {
                    width: 15px;
                    height: 15px;

                    border: 2px solid rgba(255,255,255,0.35);

                    border-top-color: white;

                    border-radius: 50%;

                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* =========================================
                   SECURITY
                ========================================= */

                .login-security {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 7px;

                    margin-top: 21px;
                    padding-top: 17px;

                    border-top: 1px solid #edf0f4;

                    color: #9aa4b1;
                }

                .security-icon {
                    display: flex;

                    color: #8290a0;
                }

                .login-security div:last-child {
                    display: flex;

                    flex-direction: column;

                    gap: 1px;
                }

                .login-security strong {
                    color: #7d8794;

                    font-size: 9.5px;

                    font-weight: 700;
                }

                .login-security span {
                    font-size: 9px;
                }

                /* =========================================
                   FOOTER
                ========================================= */

                .login-footer {
                    margin-top: 15px;

                    text-align: center;

                    color: #a5adb8;

                    font-size: 9px;
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 480px) {
                    .login-page {
                        padding: 20px 14px;
                    }

                    .login-card {
                        padding: 26px 23px 24px;

                        border-radius: 15px;
                    }

                    .top-bar {
                        margin-bottom: 23px;
                    }

                    .login-header h1 {
                        font-size: 24px;
                    }

                    .login-header p {
                        font-size: 11.5px;
                    }

                    .language-menu {
                        width: 165px;
                    }
                }
            `})]})}export{N as default};
