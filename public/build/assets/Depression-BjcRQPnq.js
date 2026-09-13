import{r as se,j as c,H as pn}from"./app-D-8e34z-.js";import{A as fn}from"./AppLayout-DXTFGWt9.js";import{c as mn,g as ot,L as lt}from"./createLucideIcon-BLlzzcJK.js";import{S as hn}from"./shield-check-C3hYpQIL.js";import{C as Ue}from"./circle-check-veDugMKN.js";import{A as gn}from"./activity-Durjp7B5.js";import{H as bn}from"./heart-pulse-Bih3AYge.js";import{T as yn}from"./triangle-alert-CR4Lgb-p.js";import"./file-text-CBVvWmjO.js";import"./x-__RWdXBQ.js";function Nt(e,t){return function(){return e.apply(t,arguments)}}const{toString:xn}=Object.prototype,{getPrototypeOf:J}=Object,{iterator:ye,toStringTag:Pt}=Symbol,ge=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),zt=e=>typeof e=="string"&&(e==="__proto__"||e==="constructor"||e==="prototype"),_t=(e,t,n)=>e===Object.prototype||!n&&t===null,wn=e=>{if(!Object.isExtensible(e))return!1;const t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols&&t.push(...Object.getOwnPropertySymbols(e)),t.every(n=>{if(zt(n))return!1;const r=Object.getOwnPropertyDescriptor(e,n);return!!r&&r.configurable&&r.writable===!0})},be=(e,t)=>{let n=e;const r=[];for(;n!=null;){if(r.indexOf(n)!==-1)return!1;r.push(n);const i=J(n);if(_t(n,i,n===e))return!1;if(ge(n,t))return!0;n=i}return!1},kn=(e,t)=>e!=null&&be(e,t)?e[t]:void 0,vn=e=>{if(e==null||typeof e!="object"&&typeof e!="function")return e;const t=J(e);if(t===null&&wn(e))return e;const n=Object.create(null),r=Object.create(null),i=[];let a=e;for(;a!=null&&i.indexOf(a)===-1;){i.push(a);const s=a===e?t:J(a);if(_t(a,s,a===e))break;const l=Object.getOwnPropertyNames(a);Object.getOwnPropertySymbols&&l.push(...Object.getOwnPropertySymbols(a));for(const u of l)zt(u)||ge(r,u)||(n[u]=e[u],r[u]=!0);a=s}return n},Ge=(e=>t=>{const n=xn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),I=e=>(e=e.toLowerCase(),t=>Ge(t)===e),ze=e=>t=>typeof t===e,{isArray:ne}=Array,re=ze("undefined");function le(e){return e!==null&&!re(e)&&e.constructor!==null&&!re(e.constructor)&&C(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Dt=I("ArrayBuffer");function En(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Dt(e.buffer),t}const Rn=ze("string"),C=ze("function"),Ct=ze("number"),ce=e=>e!==null&&typeof e=="object",jn=e=>e===!0||e===!1,Se=e=>{if(!ce(e))return!1;const t=J(e);return(t===null||t===Object.prototype||J(t)===null)&&!be(e,Pt)&&!be(e,ye)},Sn=e=>{if(!ce(e)||le(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Tn=I("Date"),On=I("File"),An=e=>!!(e&&typeof e.uri<"u"),Nn=e=>e&&typeof e.getParts<"u",Pn=I("Blob"),zn=I("FileList"),_n=I("Set"),Dn=e=>ce(e)&&C(e.pipe);function Cn(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const ct=Cn(),ut=typeof ct.FormData<"u"?ct.FormData:void 0,Ln=e=>{if(!e)return!1;if(ut&&e instanceof ut)return!0;const t=J(e);if(!t||t===Object.prototype||!C(e.append))return!1;const n=Ge(e);return n==="formdata"||n==="object"&&C(e.toString)&&e.toString()==="[object FormData]"},In=I("URLSearchParams"),[Un,Fn,Bn,Mn]=["ReadableStream","Request","Response","Headers"].map(I),qn=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function xe(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,i;if(typeof e!="object"&&(e=[e]),ne(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(le(e))return;const a=n?Object.getOwnPropertyNames(e):Object.keys(e),s=a.length;let l;for(r=0;r<s;r++)l=a[r],t.call(null,e[l],l,e)}}function Lt(e,t){if(le(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}const ee=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,It=e=>!re(e)&&e!==ee;function We(...e){const{caseless:t,skipUndefined:n}=It(this)&&this||{},r={},i=(a,s)=>{if(s==="__proto__"||s==="constructor"||s==="prototype")return;const l=t&&typeof s=="string"&&Lt(r,s)||s,u=ge(r,l)?r[l]:void 0;Se(u)&&Se(a)?r[l]=We(u,a):Se(a)?r[l]=We({},a):ne(a)?r[l]=a.slice():(!n||!re(a))&&(r[l]=a)};for(let a=0,s=e.length;a<s;a++){const l=e[a];if(!l||le(l)||(xe(l,i),typeof l!="object"||ne(l)))continue;const u=Object.getOwnPropertySymbols(l);for(let f=0;f<u.length;f++){const p=u[f];er.call(l,p)&&i(l[p],p)}}return r}const Hn=(e,t,n,{allOwnKeys:r}={})=>(xe(t,(i,a)=>{n&&C(i)?Object.defineProperty(e,a,{__proto__:null,value:Nt(i,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,a,{__proto__:null,value:i,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),$n=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Vn=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Wn=(e,t,n,r)=>{let i,a,s;const l={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)s=i[a],(!r||r(s,e,t))&&!l[s]&&(t[s]=e[s],l[s]=!0);e=n!==!1&&J(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Kn=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Jn=e=>{if(!e)return null;if(ne(e))return e;let t=e.length;if(!Ct(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Gn=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&J(Uint8Array)),Yn=(e,t)=>{const r=(e&&e[ye]).call(e);let i;for(;(i=r.next())&&!i.done;){const a=i.value;t.call(e,a[0],a[1])}},Xn=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Zn=I("HTMLFormElement"),Qn=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),{propertyIsEnumerable:er}=Object.prototype,tr=I("RegExp"),Ut=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};xe(n,(i,a)=>{let s;(s=t(i,a,e))!==!1&&(r[a]=s||i)}),Object.defineProperties(e,r)},nr=e=>{Ut(e,(t,n)=>{if(C(e)&&["arguments","caller","callee"].includes(n))return!1;const r=e[n];if(C(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},rr=(e,t)=>{const n={},r=i=>{i.forEach(a=>{n[a]=!0})};return ne(e)?r(e):r(String(e).split(t)),n},ir=()=>{},ar=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function sr(e){return!!(e&&C(e.append)&&e[Pt]==="FormData"&&e[ye])}const or=e=>{const t=new WeakSet,n=r=>{if(ce(r)){if(t.has(r))return;if(le(r))return r;if(!("toJSON"in r)){t.add(r);let i;if(_n(r)){i=[];for(const a of r){const s=n(a);!re(s)&&i.push(s)}}else i=ne(r)?[]:{},xe(r,(a,s)=>{const l=n(a);!re(l)&&(i[s]=l)});return t.delete(r),i}}return r};return n(e)},lr=I("AsyncFunction"),cr=e=>e&&(ce(e)||C(e))&&C(e.then)&&C(e.catch),Ft=((e,t)=>e?setImmediate:t?((n,r)=>(ee.addEventListener("message",({source:i,data:a})=>{i===ee&&a===n&&r.length&&r.shift()()},!1),i=>{r.push(i),ee.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",C(ee.postMessage)),ur=typeof queueMicrotask<"u"?queueMicrotask.bind(ee):typeof process<"u"&&process.nextTick||Ft,Bt=e=>e!=null&&C(e[ye]),dr=e=>e!=null&&be(e,ye)&&Bt(e),o={isArray:ne,isArrayBuffer:Dt,isBuffer:le,isFormData:Ln,isArrayBufferView:En,isString:Rn,isNumber:Ct,isBoolean:jn,isObject:ce,isPlainObject:Se,isEmptyObject:Sn,isReadableStream:Un,isRequest:Fn,isResponse:Bn,isHeaders:Mn,isUndefined:re,isDate:Tn,isFile:On,isReactNativeBlob:An,isReactNative:Nn,isBlob:Pn,isRegExp:tr,isFunction:C,isStream:Dn,isURLSearchParams:In,isTypedArray:Gn,isFileList:zn,forEach:xe,merge:We,extend:Hn,trim:qn,stripBOM:$n,inherits:Vn,toFlatObject:Wn,kindOf:Ge,kindOfTest:I,endsWith:Kn,toArray:Jn,forEachEntry:Yn,matchAll:Xn,isHTMLForm:Zn,hasOwnProperty:ge,hasOwnProp:ge,hasOwnInPrototypeChain:be,getSafeProp:kn,toSafeFlatObject:vn,reduceDescriptors:Ut,freezeMethods:nr,toObjectSet:rr,toCamelCase:Qn,noop:ir,toFiniteNumber:ar,findKey:Lt,global:ee,isContextDefined:It,isSpecCompliantForm:sr,toJSONObject:or,isAsyncFn:lr,isThenable:cr,setImmediate:Ft,asap:ur,isIterable:Bt,isSafeIterable:dr},pr=o.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),fr=e=>{const t={};let n,r,i;return e&&e.split(`
`).forEach(function(s){i=s.indexOf(":"),n=s.substring(0,i).trim().toLowerCase(),r=s.substring(i+1).trim();const l=o.hasOwnProp(t,n);!n||l&&o.hasOwnProp(pr,n)||(n==="set-cookie"?l?t[n].push(r):t[n]=[r]:t[n]=l?t[n]+", "+r:r)}),t};function mr(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}const hr=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),gr=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function Ye(e,t){return o.isArray(e)?e.map(n=>Ye(n,t)):mr(String(e).replace(t,""))}const br=e=>Ye(e,hr),yr=e=>Ye(e,gr);function Mt(e){const t=Object.create(null);return o.forEach(e.toJSON(),(n,r)=>{t[r]=yr(n)}),t}const dt=Symbol("internals");function fe(e){return e&&String(e).trim().toLowerCase()}function Te(e){return e===!1||e==null?e:o.isArray(e)?e.map(Te):br(String(e))}function xr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const wr=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Fe(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}function kr(e){const t=e.length-1;if(t<1||e.charCodeAt(0)!==34||e.charCodeAt(t)!==34)return e;let n="";for(let r=1;r<t;r++){const i=e.charCodeAt(r);if(i===34||i===92&&(r+=1,r>=t))return e;n+=e[r]}return n}function vr(e){const t=Object.create(null),n=String(e);let r=0,i=!1,a=!1;function s(l){const u=Fe(n.slice(r,l)),f=u.indexOf("=");if(f<1)return;const p=Fe(u.slice(0,f));if(!wr.test(p))return;const m=p.toLowerCase();if(m==="__proto__"||m==="constructor"||m==="prototype")return;const b=Fe(u.slice(f+1));t[m]=kr(b)}for(let l=0;l<n.length;l++){const u=n.charCodeAt(l);i?a?a=!1:u===92?a=!0:u===34&&(i=!1):u===34?i=!0:(u===44||u===59)&&(s(l),r=l+1)}return s(n.length),t}const Er=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Be(e,t,n,r,i){if(o.isFunction(r))return r.call(this,t,n);if(i&&(t=n),!!o.isString(t)){if(o.isString(r))return t.indexOf(r)!==-1;if(o.isRegExp(r))return r.test(t)}}function Rr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function jr(e,t){const n=o.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(i,a,s){return this[r].call(this,t,i,a,s)},configurable:!0})})}let D=class{constructor(t){t&&this.set(t)}set(t,n,r){const i=this;function a(l,u,f){const p=fe(u);if(!p)return;const m=o.findKey(i,p);(!m||i[m]===void 0||f===!0||f===void 0&&i[m]!==!1)&&(i[m||u]=Te(l))}const s=(l,u)=>o.forEach(l,(f,p)=>a(f,p,u));if(o.isPlainObject(t)||t instanceof this.constructor)s(t,n);else if(o.isString(t)&&(t=t.trim())&&!Er(t))s(fr(t),n);else if(o.isObject(t)&&o.isSafeIterable(t)){let l=Object.create(null),u,f;for(const p of t){if(!o.isArray(p))throw new TypeError("Object iterator must return a key-value pair");f=p[0],o.hasOwnProp(l,f)?(u=l[f],l[f]=o.isArray(u)?[...u,p[1]]:[u,p[1]]):l[f]=p[1]}s(l,n)}else t!=null&&a(n,t,r);return this}get(t,n){if(t=fe(t),t){const r=o.findKey(this,t);if(r){const i=this[r];if(!n)return i;if(n===!0)return xr(i);if(o.isFunction(n))return n.call(this,i,r);if(o.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=fe(t),t){const r=o.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Be(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let i=!1;function a(s){if(s=fe(s),s){const l=o.findKey(r,s);l&&(!n||Be(r,r[l],l,n))&&(delete r[l],i=!0)}}return o.isArray(t)?t.forEach(a):a(t),i}clear(t){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const a=n[r];(!t||Be(this,this[a],a,t,!0))&&(delete this[a],i=!0)}return i}normalize(t){const n=this,r={};return o.forEach(this,(i,a)=>{const s=o.findKey(r,a);if(s){n[s]=Te(i),delete n[a];return}const l=t?Rr(a):String(a).trim();l!==a&&delete n[a],n[l]=Te(i),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return o.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=t&&o.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){const t=this.get("set-cookie");return o.isArray(t)?t:t==null||t===!1?[]:[t]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static parseParameters(t){return vr(t)}static concat(t,...n){const r=new this(t);return n.forEach(i=>r.set(i)),r}static accessor(t){const r=(this[dt]=this[dt]={accessors:{}}).accessors,i=this.prototype;function a(s){const l=fe(s);r[l]||(jr(i,s),r[l]=!0)}return o.isArray(t)?t.forEach(a):a(t),this}};D.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);o.reduceDescriptors(D.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});o.freezeMethods(D);const Ne="[REDACTED ****]";function Sr(e){if(o.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(o.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function Tr(e,t){const n=new Set(t.map(a=>String(a).toLowerCase())),r=[],i=a=>{if(a===null||typeof a!="object"||o.isBuffer(a))return a;if(r.indexOf(a)!==-1)return;a instanceof D&&(a=a.toJSON()),r.push(a);let s;if(o.isArray(a))s=[],a.forEach((l,u)=>{const f=i(l);o.isUndefined(f)||(s[u]=f)});else{if(!o.isPlainObject(a)&&Sr(a))return r.pop(),a;s=Object.create(null);for(const[l,u]of Object.entries(a)){const f=n.has(l.toLowerCase())?Ne:i(u);o.isUndefined(f)||(s[l]=f)}}return r.pop(),s};return i(e)}function pt(e){try{return String(e)}catch{return""}}function Or(e){return e.errors.map(n=>{try{return n&&n.message?pt(n.message):pt(n)}catch{return""}}).filter(Boolean).join("; ")||e.name||"AggregateError"}let h=class qt extends Error{static from(t,n,r,i,a,s){let l=t.message;!l&&o.isArray(t.errors)&&t.errors.length&&(l=Or(t));const u=new qt(l,n||t.code,r,i,a);return Object.defineProperty(u,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),u.name=t.name,t.status!=null&&u.status==null&&(u.status=t.status),s&&Object.assign(u,s),u}constructor(t,n,r,i,a){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),i&&(this.request=i),a&&(this.response=a,this.status=a.status)}toJSON(){const t=this.config,n=t&&o.hasOwnProp(t,"redact")?t.redact:void 0,r=o.isArray(n)&&n.length>0?Tr(t,n):o.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:r,code:this.code,status:this.status}}};h.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";h.ERR_BAD_OPTION="ERR_BAD_OPTION";h.ECONNABORTED="ECONNABORTED";h.ETIMEDOUT="ETIMEDOUT";h.ECONNREFUSED="ECONNREFUSED";h.ERR_NETWORK="ERR_NETWORK";h.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";h.ERR_DEPRECATED="ERR_DEPRECATED";h.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";h.ERR_BAD_REQUEST="ERR_BAD_REQUEST";h.ERR_CANCELED="ERR_CANCELED";h.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";h.ERR_INVALID_URL="ERR_INVALID_URL";h.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const Ar=null,Ht=100;function Ke(e){return o.isPlainObject(e)||o.isArray(e)}function $t(e){return o.endsWith(e,"[]")?e.slice(0,-2):e}function Me(e,t,n){return e?e.concat(t).map(function(i,a){return i=$t(i),!n&&a?"["+i+"]":i}).join(n?".":""):t}function Nr(e){return o.isArray(e)&&!e.some(Ke)}const Pr=o.toFlatObject(o,{},null,function(t){return/^is[A-Z]/.test(t)});function _e(e,t,n){if(!o.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(g,w)=>{const y=o.getSafeProp(n,g);return o.isUndefined(y)?w:y},i=r("metaTokens",!0),a=r("visitor")||R,s=r("dots",!1),l=r("indexes",!1),u=r("Blob")||typeof Blob<"u"&&Blob,f=r("maxDepth",Ht),p=u&&o.isSpecCompliantForm(t),m=[];if(!o.isFunction(a))throw new TypeError("visitor must be a function");function b(g){if(g===null)return"";if(o.isDate(g))return g.toISOString();if(o.isBoolean(g))return g.toString();if(!p&&o.isBlob(g))throw new h("Blob is not supported. Use a Buffer instead.");if(o.isArrayBuffer(g)||o.isTypedArray(g)){if(p&&typeof u=="function")return new u([g]);throw new h("Blob is not supported. Use a Buffer instead.",h.ERR_NOT_SUPPORT)}return g}function k(g){if(g>f)throw new h("Object is too deeply nested ("+g+" levels). Max depth: "+f,h.ERR_FORM_DATA_DEPTH_EXCEEDED)}function v(g,w){if(f===1/0)return JSON.stringify(g);const y=[];return JSON.stringify(g,function(P,j){if(!o.isObject(j))return j;for(;y.length&&y[y.length-1]!==this;)y.pop();return y.push(j),k(w+y.length-1),j})}function R(g,w,y){let O=g;if(o.isReactNative(t)&&o.isReactNativeBlob(g))return t.append(Me(y,w,s),b(g)),!1;if(g&&!y&&typeof g=="object"){if(o.endsWith(w,"{}"))w=i?w:w.slice(0,-2),g=v(g,1);else if(o.isArray(g)&&Nr(g)||(o.isFileList(g)||o.endsWith(w,"[]"))&&(O=o.toArray(g)))return w=$t(w),O.forEach(function(j,F){!(o.isUndefined(j)||j===null)&&t.append(l===!0?Me([w],F,s):l===null?w:w+"[]",b(j))}),!1}return Ke(g)?!0:(t.append(Me(y,w,s),b(g)),!1)}const T=Object.assign(Pr,{defaultVisitor:R,convertValue:b,isVisitable:Ke});function d(g,w,y=0){if(!o.isUndefined(g)){if(k(y),m.indexOf(g)!==-1)throw new Error("Circular reference detected in "+w.join("."));m.push(g),o.forEach(g,function(P,j){(!(o.isUndefined(P)||P===null)&&a.call(t,P,o.isString(j)?j.trim():j,w,T))===!0&&d(P,w?w.concat(j):[j],y+1)}),m.pop()}}if(!o.isObject(e))throw new TypeError("data must be an object");return d(e),t}function ft(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function Xe(e,t){this._pairs=[],e&&_e(e,this,t)}const Vt=Xe.prototype;Vt.append=function(t,n){this._pairs.push([t,n])};Vt.toString=function(t){const n=t?r=>t.call(this,r,ft):ft;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function zr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Wt(e,t,n){if(!t)return e;e=e||"";const r=o.isFunction(n)?{serialize:n}:n,i=o.getSafeProp(r,"encode")||zr,a=o.getSafeProp(r,"serialize");let s;if(a?s=a(t,r):s=o.isURLSearchParams(t)?t.toString():new Xe(t,r).toString(i),s){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}const me=Symbol("internals");function Kt(e){return e?e.length:0}function mt(e){if(e)for(;e.length&&e[e.length-1]===null;)e.pop()}function he(e,t){const n=e.handlers,r=Kt(n);n!==t.handlersRef?(t.handlersRef=n,t.handlerEntries.clear()):r!==t.handlersLength&&(r?t.handlerEntries.forEach(function(a,s){n[a.index]!==a.handler&&t.handlerEntries.delete(s)}):t.handlerEntries.clear()),t.handlersLength=r}class ht{constructor(){this.handlers=[],this[me]={handlersRef:this.handlers,handlersLength:this.handlers.length,handlerEntries:new Map,iterationDepth:0,nextId:0}}use(t,n,r){const i={fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null},a=this[me];this.handlers==null&&(this.handlers=[]),he(this,a);const s=a.nextId++;return this.handlers.push(i),a.handlerEntries.set(s,{handler:i,index:this.handlers.length-1}),a.handlersLength=this.handlers.length,s}eject(t){const n=this[me];he(this,n);const r=n.handlerEntries.get(t);if(r){if(n.handlerEntries.delete(t),this.handlers[r.index]!==r.handler)return;this.handlers[r.index]=null,n.iterationDepth||(mt(this.handlers),n.handlersLength=this.handlers.length)}}clear(){this.handlers&&(this.handlers=[],he(this,this[me]))}forEach(t){const n=this[me];he(this,n),n.iterationDepth++;try{o.forEach(this.handlers,function(i){i!==null&&t(i)})}finally{--n.iterationDepth||(he(this,n),mt(this.handlers),n.handlersLength=Kt(this.handlers))}}}const Ze={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},_r=typeof URLSearchParams<"u"?URLSearchParams:Xe,Dr=typeof FormData<"u"?FormData:null,Cr=typeof Blob<"u"?Blob:null,Lr={isBrowser:!0,classes:{URLSearchParams:_r,FormData:Dr,Blob:Cr},protocols:["http","https","file","blob","url","data"]},Qe=typeof window<"u"&&typeof document<"u",Je=typeof navigator=="object"&&navigator||void 0,Ir=Qe&&(!Je||["ReactNative","NativeScript","NS"].indexOf(Je.product)<0),Ur=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Fr=Qe&&window.location.href||"http://localhost",Br=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Qe,hasStandardBrowserEnv:Ir,hasStandardBrowserWebWorkerEnv:Ur,navigator:Je,origin:Fr},Symbol.toStringTag,{value:"Module"})),A={...Br,...Lr};function Mr(e,t){return _e(e,new A.classes.URLSearchParams,{visitor:function(n,r,i,a){return A.isNode&&o.isBuffer(n)?(this.append(r,n.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...t})}const gt=Ht;function Jt(e){if(e>gt)throw new h("FormData field is too deeply nested ("+e+" levels). Max depth: "+gt,h.ERR_FORM_DATA_DEPTH_EXCEEDED)}function qr(e){const t=[],n=/[^.[\]]+|\[([^.[\]]*)]/g;let r;for(;(r=n.exec(e))!==null;)Jt(t.length),t.push(r[0]==="[]"?"":r[1]||r[0]);return t}function Hr(e){const t={},n=Object.keys(e);let r;const i=n.length;let a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function Gt(e){function t(n,r,i,a){Jt(a);let s=n[a++];if(s==="__proto__")return!0;const l=Number.isFinite(+s),u=a>=n.length;return s=!s&&o.isArray(i)?i.length:s,u?(o.hasOwnProp(i,s)?i[s]=o.isArray(i[s])?i[s].concat(r):[i[s],r]:i[s]=r,!l):((!o.hasOwnProp(i,s)||!o.isObject(i[s]))&&(i[s]=[]),t(n,r,i[s],a)&&o.isArray(i[s])&&(i[s]=Hr(i[s])),!l)}if(o.isFormData(e)&&o.isFunction(e.entries)){const n={};return o.forEachEntry(e,(r,i)=>{t(qr(r),i,n,0)}),n}return null}const Yt=Object.freeze(["get","delete","head","options","post","put","patch","purge","link","unlink","query"]),oe=(e,t)=>e!=null&&o.hasOwnProp(e,t)?e[t]:void 0;function $r(e,t,n){if(o.isString(e))try{return(t||JSON.parse)(e),o.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const we={transitional:Ze,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,a=o.isObject(t);if(a&&o.isHTMLForm(t)&&(t=new FormData(t)),o.isFormData(t))return i?JSON.stringify(Gt(t)):t;if(o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)||o.isReadableStream(t))return t;if(o.isArrayBufferView(t))return t.buffer;if(o.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(a){const u=oe(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return Mr(t,u).toString();if((l=o.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=oe(this,"env"),p=f&&f.FormData;return _e(l?{"files[]":t}:t,p&&new p,u)}}return a||i?(n.setContentType("application/json",!1),$r(t)):t}],transformResponse:[function(t){const n=oe(this,"transitional")||we.transitional,r=n&&n.forcedJSONParsing,i=oe(this,"responseType"),a=i==="json";if(o.isResponse(t)||o.isReadableStream(t))return t;if(t&&o.isString(t)&&(r&&!i||a)){const l=!(n&&n.silentJSONParsing)&&a;try{return JSON.parse(t,oe(this,"parseReviver"))}catch(u){if(l)throw u.name==="SyntaxError"?h.from(u,h.ERR_BAD_RESPONSE,this,null,oe(this,"response")):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:A.classes.FormData,Blob:A.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};o.forEach(Yt,e=>{we.headers[e]={}});function qe(e,t){const n=this||we,r=t||n,i=D.from(r.headers);let a=r.data;return o.forEach(e,function(l){a=l.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function Xt(e){return!!(e&&e.__CANCEL__)}let ke=class extends h{constructor(t,n,r){super(t??"canceled",h.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function Zt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new h("Request failed with status code "+n.status,n.status>=400&&n.status<500?h.ERR_BAD_REQUEST:h.ERR_BAD_RESPONSE,n.config,n.request,n))}const Vr=/[\t\n\r]/g;function Qt(e){if(typeof e!="string")return e;let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t).replace(Vr,"")}function He(e){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function Wr(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i=0,a=0,s;return t=t!==void 0?t:1e3,function(u){const f=Date.now(),p=r[a];s||(s=f),n[i]=u,r[i]=f;let m=a,b=0;for(;m!==i;)b+=n[m++],m=m%e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),f-s<t)return;const k=p&&f-p;return k?Math.round(b*1e3/k):void 0}}function Kr(e,t){let n=0,r=1e3/t,i,a;const s=(p,m=Date.now())=>{n=m,i=null,a&&(clearTimeout(a),a=null),e(...p)};return[(...p)=>{const m=Date.now(),b=m-n;b>=r?s(p,m):(i=p,a||(a=setTimeout(()=>{a=null,s(i)},r-b)))},()=>i&&s(i),(...p)=>s(p)]}const Pe=(e,t,n=3)=>{let r=0;const i=Wr(50,250);return Kr(a=>{if(!a||!o.isNumber(a.loaded))return;const s=a.loaded,l=a.lengthComputable?a.total:void 0,u=Math.max(0,l!=null?Math.min(s,l):s),f=Math.max(0,u-r),p=i(f);r=Math.max(r,u);const m={loaded:u,total:l,progress:l?u/l:void 0,bytes:f,rate:p||void 0,estimated:p&&l?(l-u)/p:void 0,event:a,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},n)},bt=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},yt=(e,t=o.asap)=>(...n)=>t(()=>e(...n)),Jr=A.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,A.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(A.origin),A.navigator&&/(msie|trident)/i.test(A.navigator.userAgent)):()=>!0,Gr=A.hasStandardBrowserEnv?{write(e,t,n,r,i,a,s){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];o.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),o.isString(r)&&l.push(`path=${r}`),o.isString(i)&&l.push(`domain=${i}`),a===!0&&l.push("secure"),o.isString(s)&&l.push(`SameSite=${s}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].replace(/^\s+/,""),i=r.indexOf("=");if(i!==-1&&r.slice(0,i)===e)try{return decodeURIComponent(r.slice(i+1))}catch{return r.slice(i+1)}}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Yr(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Xr(e,t){if(!t)return e;let n=e.length;for(;n>0&&e.charCodeAt(n-1)===47;)n--;return e.slice(0,n)+"/"+t.replace(/^\/+/,"")}const Zr=/^https?:(?!\/\/)/i;function Qr(e){return e&&e.replace(/(^|&)([^=&]*=)?[^&]+/g,(t,n,r="")=>`${n}${r}${Ne}`)}function ei(e){const t=e.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${Ne}@`),n=t.indexOf("#"),i=(n===-1?t:t.slice(0,n)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${Ne}`);return n===-1?i:`${i}#${Qr(t.slice(n+1))}`}function xt(e,t){if(typeof e=="string"){const n=Qt(e);if(Zr.test(n))throw new h(`Invalid URL ${JSON.stringify(ei(n))}: missing "//" after protocol`,h.ERR_INVALID_URL,t)}}function en(e,t,n,r){xt(t,r);let i=!Yr(t);return e&&(i||n===!1)?(xt(e,r),Xr(e,t)):t}const wt=e=>e instanceof D?{...e}:e,ti=e=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter(t=>Object.getOwnPropertyDescriptor(e,t).enumerable)):Object.keys(e);function ie(e,t){e=e||{},t=t||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(p,m,b,k){return o.isPlainObject(p)&&o.isPlainObject(m)?o.merge.call({caseless:k},p,m):o.isPlainObject(m)?o.merge({},m):o.isArray(m)?m.slice():m}function i(p,m,b,k){if(o.isUndefined(m)){if(!o.isUndefined(p))return r(void 0,p,b,k)}else return r(p,m,b,k)}function a(p,m){if(!o.isUndefined(m))return r(void 0,m)}function s(p,m){if(o.isUndefined(m)){if(!o.isUndefined(p))return r(void 0,p)}else return r(void 0,m)}function l(p){const m=o.hasOwnProp(t,"transitional")?t.transitional:void 0;if(!o.isUndefined(m))if(o.isPlainObject(m)){if(o.hasOwnProp(m,p))return m[p]}else return;const b=o.hasOwnProp(e,"transitional")?e.transitional:void 0;if(o.isPlainObject(b)&&o.hasOwnProp(b,p))return b[p]}function u(p,m,b){if(o.hasOwnProp(t,b))return r(p,m);if(o.hasOwnProp(e,b))return r(void 0,p)}const f={url:a,method:a,data:a,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutErrorMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,allowedSocketPaths:s,responseEncoding:s,validateStatus:u,headers:(p,m,b)=>i(wt(p),wt(m),b,!0)};return o.forEach(ti({...e,...t}),function(m){if(m==="__proto__"||m==="constructor"||m==="prototype")return;const b=o.hasOwnProp(f,m)?f[m]:i,k=o.hasOwnProp(e,m)?e[m]:void 0,v=o.hasOwnProp(t,m)?t[m]:void 0,R=b(k,v,m);o.isUndefined(R)&&b!==u||(n[m]=R)}),o.hasOwnProp(t,"validateStatus")&&o.isUndefined(t.validateStatus)&&l("validateStatusUndefinedResolves")===!1&&(o.hasOwnProp(e,"validateStatus")?n.validateStatus=r(void 0,e.validateStatus):delete n.validateStatus),n}const ni=["content-type","content-length"];function ri(e,t,n){if(n!=="content-only"){e.set(t);return}Object.entries(t||{}).forEach(([r,i])=>{ni.includes(r.toLowerCase())&&e.set(r,i)})}const ii=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16)));function tn(e){const t=ie({},e),n=b=>o.hasOwnProp(t,b)?t[b]:void 0,r=n("data");let i=n("withXSRFToken");const a=n("xsrfHeaderName"),s=n("xsrfCookieName");let l=n("headers");const u=n("auth"),f=n("baseURL"),p=n("allowAbsoluteUrls"),m=n("url");if(t.headers=l=D.from(l),t.url=Wt(en(f,m,p,t),n("params"),n("paramsSerializer")),u){const b=o.getSafeProp(u,"username")||"",k=o.getSafeProp(u,"password")||"";try{l.set("Authorization","Basic "+btoa(b+":"+(k?ii(k):"")))}catch(v){throw h.from(v,h.ERR_BAD_OPTION_VALUE,e)}}if(o.isFormData(r)){const b=o.getSafeProp(r,"getHeaders");A.hasStandardBrowserEnv||A.hasStandardBrowserWebWorkerEnv||o.isReactNative(r)?l.setContentType(void 0):o.isFunction(b)&&ri(l,b.call(r),n("formDataHeaderPolicy"))}if(A.hasStandardBrowserEnv&&(o.isFunction(i)&&(i=i(t)),i===!0||i==null&&Jr(t.url))){const k=a&&s&&Gr.read(s);k&&l.set(a,k)}return t}const ai=typeof XMLHttpRequest<"u",si=ai&&function(e){return new Promise(function(n,r){const i=tn(e);let a=i.data;const s=D.from(i.headers).normalize();let{responseType:l,onUploadProgress:u,onDownloadProgress:f}=i,p,m,b,k,v,R;function T(){k&&k(),v&&v(),i.cancelToken&&i.cancelToken.unsubscribe(p),i.signal&&i.signal.removeEventListener("abort",p)}let d=new XMLHttpRequest;d.open(i.method.toUpperCase(),i.url,!0),d.timeout=i.timeout;function g(y){if(!d)return;if(d.status===0&&(He(Qt(i.url))||He(A.origin))!=="file"&&!(d.responseURL&&d.responseURL.startsWith("file:"))){r(new h("Request aborted",h.ECONNABORTED,e,d)),T(),d=null;return}try{y?R&&R(y):v&&v()}catch(F){setTimeout(()=>{throw F})}if(!d)return;const O=D.from("getAllResponseHeaders"in d&&d.getAllResponseHeaders()),j={data:!l||l==="text"||l==="json"?d.responseText:d.response,status:d.status,statusText:d.statusText,headers:O,config:e,request:d};Zt(function(G){n(G),T()},function(G){r(G),T()},j),d=null}"onloadend"in d?d.onloadend=g:d.onreadystatechange=function(){!d||d.readyState!==4||d.status===0&&!(d.responseURL&&d.responseURL.startsWith("file:"))||setTimeout(g)},d.onabort=function(){d&&(r(new h("Request aborted",h.ECONNABORTED,e,d)),T(),d=null)},d.onerror=function(O){const P=O&&O.message?O.message:"Network Error",j=new h(P,h.ERR_NETWORK,e,d);j.event=O||null,r(j),T(),d=null},d.ontimeout=function(){let O=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const P=i.transitional||Ze;i.timeoutErrorMessage&&(O=i.timeoutErrorMessage),r(new h(O,P.clarifyTimeoutError?h.ETIMEDOUT:h.ECONNABORTED,e,d)),T(),d=null},a===void 0&&s.setContentType(null),"setRequestHeader"in d&&o.forEach(Mt(s),function(O,P){d.setRequestHeader(P,O)}),o.isUndefined(i.withCredentials)||(d.withCredentials=!!i.withCredentials),l&&l!=="json"&&(d.responseType=i.responseType),f&&([b,v,R]=Pe(f,!0),d.addEventListener("progress",b)),u&&d.upload&&([m,k]=Pe(u),d.upload.addEventListener("progress",m),d.upload.addEventListener("loadend",k)),(i.cancelToken||i.signal)&&(p=y=>{d&&(r(!y||y.type?new ke(null,e,d):y),d.abort(),T(),d=null)},i.cancelToken&&i.cancelToken.subscribe(p),i.signal&&(i.signal.aborted?p():i.signal.addEventListener("abort",p)));const w=He(i.url);if(w&&!A.protocols.includes(w)){r(new h("Unsupported protocol "+w+":",h.ERR_BAD_REQUEST,e)),T();return}d.send(a||null)})},oi=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;const n=new AbortController;let r=!1;const i=function(u){if(!r){r=!0,s();const f=u instanceof Error?u:this.reason;n.abort(f instanceof h?f:new ke(f instanceof Error?f.message:f))}};let a=t&&setTimeout(()=>{a=null,i(new h(`timeout of ${t}ms exceeded`,h.ETIMEDOUT))},t);const s=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(i):u.removeEventListener("abort",i)}),e=null)};e.forEach(u=>{if(!r){if(u.aborted){i.call(u);return}u.addEventListener("abort",i,{once:!0})}});const{signal:l}=n;return l.unsubscribe=()=>o.asap(s),l},li=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},ci=async function*(e,t){for await(const n of ui(e))yield*li(n,t)},ui=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},kt=(e,t,n,r)=>{const i=ci(e,t);let a=0,s,l=u=>{s||(s=!0,r&&r(u))};return new ReadableStream({async pull(u){try{const{done:f,value:p}=await i.next();if(f){l(),u.close();return}let m=p.byteLength;if(n){let b=a+=m;n(b)}u.enqueue(new Uint8Array(p))}catch(f){throw l(f),f}},cancel(u){return l(u),i.return()}},{highWaterMark:2})},vt=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,nn=(e,t,n)=>t+2<n&&vt(e.charCodeAt(t+1))&&vt(e.charCodeAt(t+2)),Et=e=>e<=57?e-48:(e&223)-55,di=e=>e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===47||e===45||e===95,pi=e=>e===9||e===10||e===12||e===13||e===32,fi=e=>{const t=Math.floor(e/4),n=e%4;return t*3+(n===2?1:n===3?2:0)},mi=e=>{const t=e.length;let n=0;return t>0&&e.charCodeAt(t-1)===61&&(n++,t>1&&e.charCodeAt(t-2)===61&&n++),Math.floor((t-n)*3/4)},hi=e=>{const t=e.length;let n=0,r=0,i=!1;for(let a=0;a<t;a++){let s=e.charCodeAt(a);if(s===37&&nn(e,a,t)&&(s=Et(e.charCodeAt(a+1))*16+Et(e.charCodeAt(a+2)),a+=2),!pi(s)){if(s===61){r++;continue}if(!di(s)||r>0){i=!0;continue}n++}}return i||r>2||r>0&&(n+r)%4!==0||n%4===1?mi(e):fi(n)},gi=(e,t)=>{if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n<0)return 0;const r=e.slice(5,n),i=e.slice(n+1);if(/;base64/i.test(r))return t(i);let s=0;for(let l=0,u=i.length;l<u;l++){const f=i.charCodeAt(l);if(f===37&&nn(i,l,u))s+=1,l+=2;else if(f<128)s+=1;else if(f<2048)s+=2;else if(f>=55296&&f<=56319&&l+1<u){const p=i.charCodeAt(l+1);p>=56320&&p<=57343?(s+=4,l++):s+=3}else s+=3}return s};function bi(e){const t=typeof e=="string"?e.indexOf("#"):-1;return gi(t===-1?e:e.slice(0,t),hi)}const et="1.20.0",Rt=64*1024,yi={cache:"default",redirect:"follow",referrer:"about:client",referrerPolicy:"",mode:"cors",integrity:"",keepalive:!1,priority:"auto",window:null},{isFunction:je}=o,xi=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16))),jt=e=>{if(!o.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},St=(e,...t)=>{try{return!!e(...t)}catch{return!1}},wi=e=>{const t=e.indexOf("://");let n=e;return t!==-1&&(n=n.slice(t+3)),n.includes("@")||n.includes(":")},ki=e=>{const t=o.global!==void 0&&o.global!==null?o.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=o.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);const{fetch:i,Request:a,Response:s}=e,l=i?je(i):typeof fetch=="function",u=je(a),f=je(s);if(!l)return!1;const p=l&&je(n),m=l&&(typeof r=="function"?(d=>g=>d.encode(g))(new r):async d=>new Uint8Array(await new a(d).arrayBuffer())),b=u&&p&&St(()=>{let d=!1;const g=new a(A.origin,{body:new n,method:"POST",get duplex(){return d=!0,"half"}}),w=g.headers.has("Content-Type");return g.body!=null&&g.body.cancel(),d&&!w}),k=f&&p&&St(()=>o.isReadableStream(new s("").body)),v={stream:k&&(d=>d.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(d=>{!v[d]&&(v[d]=(g,w)=>{let y=g&&g[d];if(y)return y.call(g);throw new h(`Response type '${d}' is not supported`,h.ERR_NOT_SUPPORT,w)})});const R=async d=>{if(d==null)return 0;if(o.isBlob(d))return d.size;if(o.isSpecCompliantForm(d))return(await new a(A.origin,{method:"POST",body:d}).arrayBuffer()).byteLength;if(o.isArrayBufferView(d)||o.isArrayBuffer(d))return d.byteLength;if(o.isURLSearchParams(d)&&(d=d+""),o.isString(d))return(await m(d)).byteLength},T=async(d,g)=>{const w=o.toFiniteNumber(d.getContentLength());return w??R(g)};return async d=>{let{url:g,method:w,data:y,signal:O,cancelToken:P,timeout:j,onDownloadProgress:F,onUploadProgress:G,responseType:$,headers:V,withCredentials:ve="same-origin",fetchOptions:Ce,maxContentLength:B,maxBodyLength:Ee,maxRedirects:ln}=tn(d);const ue=o.isNumber(B)&&B>-1,Le=o.isNumber(Ee)&&Ee>-1,cn=E=>o.hasOwnProp(d,E)?d[E]:void 0;let nt=i||fetch;$=$?($+"").toLowerCase():"text";let W=oi([O,P&&P.toAbortSignal()],j),N=null;const Y=W&&W.unsubscribe&&(()=>{W.unsubscribe()});let ae,de=null;const rt=()=>new h("Request body larger than maxBodyLength limit",h.ERR_BAD_REQUEST,d,N);try{let E;const L=cn("auth");if(L){const x=o.getSafeProp(L,"username")||"",z=o.getSafeProp(L,"password")||"";E={username:x,password:z}}if(wi(g)){const x=new URL(g,A.origin);if(!E&&(x.username||x.password)){const z=jt(x.username),K=jt(x.password);E={username:z,password:K}}(x.username||x.password)&&(x.username="",x.password="",g=x.href)}if(E&&(V.delete("authorization"),V.set("Authorization","Basic "+btoa(xi((E.username||"")+":"+(E.password||""))))),ue&&typeof g=="string"&&g.startsWith("data:")&&bi(g)>B)throw new h("maxContentLength size of "+B+" exceeded",h.ERR_BAD_RESPONSE,d,N);if(Le&&w!=="get"&&w!=="head"){const x=await R(y);if(typeof x=="number"&&isFinite(x)&&(ae=x,x>Ee))throw rt()}const Re=Le&&(o.isReadableStream(y)||o.isStream(y)),it=(x,z,K)=>kt(x,Rt,X=>{if(Le&&X>Ee)throw de=rt();z&&z(X)},K);if(b&&w!=="get"&&w!=="head"&&(G||Re)){if(ae=ae??await T(V,y),ae!==0||Re){let x=new a(g,{method:"POST",body:y,duplex:"half"}),z;if(o.isFormData(y)&&(z=x.headers.get("content-type"))&&V.setContentType(z),x.body){const[K,X]=G&&bt(ae,Pe(yt(G)))||[];y=it(x.body,K,X)}}}else if(Re&&!u&&p&&w!=="get"&&w!=="head")y=it(y);else if(Re&&u&&!b&&w!=="get"&&w!=="head")throw new h("Stream request bodies are not supported by the current fetch implementation",h.ERR_NOT_SUPPORT,d,N);o.isString(ve)||(ve=ve?"include":"omit");const un=u&&"credentials"in a.prototype;if(o.isFormData(y)){const x=V.getContentType();x&&/^multipart\/form-data/i.test(x)&&!/boundary=/i.test(x)&&V.delete("content-type")}V.set("User-Agent","axios/"+et,!1);const U=Ce==null?Ce:Object.assign(Object.create(null),Ce);U&&(delete U.body,delete U.headers,delete U.method,delete U.signal,delete U.duplex,delete U.credentials);const M=Object.assign(Object.create(null),U,{signal:W,method:w.toUpperCase(),headers:Mt(V.normalize()),body:y,duplex:"half",credentials:un?ve:void 0});u&&(o.forEach(yi,(x,z)=>{M[z]===void 0&&(M[z]=x)}),M.signal===void 0&&(M.signal=null),M.body===void 0&&(M.body=null)),ln===0&&(M.redirect="manual",U&&(U.redirect="manual")),N=u&&new a(g,M);let q=await(u?nt(N,U):nt(g,M));const at=D.from(q.headers);if(ue){const x=o.toFiniteNumber(at.getContentLength());if(x!=null&&x>B)throw new h("maxContentLength size of "+B+" exceeded",h.ERR_BAD_RESPONSE,d,N)}const Ie=k&&($==="stream"||$==="response");if(k&&q.body&&(F||ue||Ie&&Y)){const x={};["status","statusText","headers"].forEach(pe=>{x[pe]=q[pe]});const z=o.toFiniteNumber(at.getContentLength()),[K,X]=F&&bt(z,Pe(yt(F),!0))||[];let st=0;const dn=pe=>{if(ue&&(st=pe,st>B))throw new h("maxContentLength size of "+B+" exceeded",h.ERR_BAD_RESPONSE,d,N);K&&K(pe)};q=new s(kt(q.body,Rt,dn,()=>{X&&X(),Y&&Y()}),x)}$=$||"text";let H=await v[o.findKey(v,$)||"text"](q,d);if(ue&&!k&&!Ie){let x;if(H!=null&&(typeof H.byteLength=="number"?x=H.byteLength:typeof H.size=="number"?x=H.size:typeof H=="string"&&(x=typeof r=="function"?new r().encode(H).byteLength:H.length)),typeof x=="number"&&x>B)throw new h("maxContentLength size of "+B+" exceeded",h.ERR_BAD_RESPONSE,d,N)}return!Ie&&Y&&Y(),await new Promise((x,z)=>{Zt(x,z,{data:H,headers:D.from(q.headers),status:q.status,statusText:q.statusText,config:d,request:N})})}catch(E){if(Y&&Y(),W&&W.aborted&&W.reason instanceof h){const L=W.reason;throw L.config=d,N&&(L.request=N),E!==L&&Object.defineProperty(L,"cause",{__proto__:null,value:E,writable:!0,enumerable:!1,configurable:!0}),L}if(de)throw N&&!de.request&&(de.request=N),de;if(E instanceof h)throw N&&!E.request&&(E.request=N),E;if(E&&E.name==="TypeError"&&/Load failed|fetch/i.test(E.message)){const L=new h("Network Error",h.ERR_NETWORK,d,N,E&&E.response);throw Object.defineProperty(L,"cause",{__proto__:null,value:E.cause||E,writable:!0,enumerable:!1,configurable:!0}),L}throw h.from(E,E&&E.code,d,N,E&&E.response)}}},vi=new Map,rn=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:i}=t,a=[r,i,n];let s=a.length,l=s,u,f,p=vi;for(;l--;)u=a[l],f=p.get(u),f===void 0&&p.set(u,f=l?new Map:ki(t)),p=f;return f};rn();const tt={http:Ar,xhr:si,fetch:{get:rn}};o.forEach(tt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});const Tt=e=>`- ${e}`,Ei=e=>o.isFunction(e)||e===null||e===!1;function Ri(e,t){e=o.isArray(e)?e:[e];const{length:n}=e;let r,i;const a={};for(let s=0;s<n;s++){r=e[s];let l;if(i=r,!Ei(r)&&(i=tt[(l=String(r)).toLowerCase()],i===void 0))throw new h(`Unknown adapter '${l}'`);if(i&&(o.isFunction(i)||(i=i.get(t))))break;a[l||"#"+s]=i}if(!i){const s=Object.entries(a).map(([u,f])=>`adapter ${u} `+(f===!1?"is not supported by the environment":"is not available in the build"));let l=n?s.length>1?`since :
`+s.map(Tt).join(`
`):" "+Tt(s[0]):"as no adapter specified";throw new h("There is no suitable adapter to dispatch the request "+l,h.ERR_NOT_SUPPORT)}return i}const an={getAdapter:Ri,adapters:tt};function $e(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ke(null,e)}function Ve(e){const t=o.toSafeFlatObject(e);return $e(t),t.headers=D.from(o.getSafeProp(t,"headers")),t.data=qe.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),an.getAdapter(t.adapter||we.adapter,t)(t).then(function(i){$e(t),t.response=i;try{i.data=qe.call(t,t.transformResponse,i)}finally{delete t.response}return i.headers=D.from(i.headers),i},function(i){if(!Xt(i)&&($e(t),i&&i.response)){t.response=i.response;try{i.response.data=qe.call(t,t.transformResponse,i.response)}finally{delete t.response}i.response.headers=D.from(i.response.headers)}return Promise.reject(i)})}const De={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{De[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Ot={};De.transitional=function(t,n,r){function i(a,s){return"[Axios v"+et+"] Transitional option '"+a+"'"+s+(r?". "+r:"")}return(a,s,l)=>{if(t===!1)throw new h(i(s," has been removed"+(n?" in "+n:"")),h.ERR_DEPRECATED);return n&&!Ot[s]&&(Ot[s]=!0,console.warn(i(s," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(a,s,l):!0}};De.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function ji(e,t,n){if(typeof e!="object"||e===null)throw new h("options must be an object",h.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const a=r[i],s=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(s){const l=e[a],u=l===void 0||s(l,a,e);if(u!==!0)throw new h("option "+a+" must be "+u,h.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new h("Unknown option "+a,h.ERR_BAD_OPTION)}}const Oe={assertOptions:ji,validators:De},_=Oe.validators;let te=class{constructor(t){this.defaults=t||{},this.interceptors={request:new ht,response:new ht}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error)try{let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const a=i.stack;let s="";if(typeof a=="string"){const l=a.indexOf(`
`);s=l===-1?"":a.slice(l+1)}if(!r.stack)r.stack=s;else if(s){const l=s.indexOf(`
`),u=l===-1?-1:s.indexOf(`
`,l+1),f=u===-1?"":s.slice(u+1);String(r.stack).endsWith(f)||(r.stack+=`
`+s)}}catch{}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=ie(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:a}=n;r!==void 0&&Oe.assertOptions(r,{silentJSONParsing:_.transitional(_.boolean),forcedJSONParsing:_.transitional(_.boolean),clarifyTimeoutError:_.transitional(_.boolean),legacyInterceptorReqResOrdering:_.transitional(_.boolean),advertiseZstdAcceptEncoding:_.transitional(_.boolean),validateStatusUndefinedResolves:_.transitional(_.boolean)},!1),i!=null&&(o.isFunction(i)?n.paramsSerializer={serialize:i}:Oe.assertOptions(i,{encode:_.function,serialize:_.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Oe.assertOptions(n,{baseUrl:_.spelling("baseURL"),withXsrfToken:_.spelling("withXSRFToken")},!0),n.method=(o.getSafeProp(n,"method")||o.getSafeProp(this.defaults,"method")||"get").toLowerCase();let s=a&&o.merge(a.common,a[n.method]);a&&o.forEach(Yt.concat("common"),v=>{delete a[v]}),n.headers=D.concat(s,a);const l=[];let u=!0;this.interceptors.request.forEach(function(R){if(typeof R.runWhen=="function"&&R.runWhen(n)===!1)return;u=u&&R.synchronous;const T=n.transitional||Ze;T&&T.legacyInterceptorReqResOrdering?l.unshift(R.fulfilled,R.rejected):l.push(R.fulfilled,R.rejected)});const f=[];this.interceptors.response.forEach(function(R){f.push(R.fulfilled,R.rejected)});let p,m=0,b;if(!u){const v=[Ve.bind(this),void 0];for(v.unshift(...l),v.push(...f),b=v.length,p=Promise.resolve(n);m<b;)p=p.then(v[m++],v[m++]);return p}b=l.length;let k=n;for(;m<b;){const v=l[m++],R=l[m++];try{k=v?v(k):k}catch(T){if(!R){p=Promise.reject(T);break}try{const d=R.call(this,T);o.isThenable(d)&&(p=Promise.resolve(d).then(()=>Ve.call(this,k)))}catch(d){p=Promise.reject(d)}break}}if(!p)try{p=Ve.call(this,k)}catch(v){p=Promise.reject(v)}for(m=0,b=f.length;m<b;)p=p.then(f[m++],f[m++]);return p}getUri(t){t=ie(this.defaults,t);const n=en(t.baseURL,t.url,t.allowAbsoluteUrls,t);return Wt(n,t.params,t.paramsSerializer)}};o.forEach(["delete","get","head","options"],function(t){te.prototype[t]=function(n,r){return this.request(ie(r||{},{method:t,url:n,data:r&&o.hasOwnProp(r,"data")?r.data:void 0}))}});o.forEach(["post","put","patch","query"],function(t){function n(r){return function(a,s,l){return this.request(ie(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}te.prototype[t]=n(),t!=="query"&&(te.prototype[t+"Form"]=n(!0))});let Si=class sn{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(a){n=a});const r=this;this.promise.then(i=>{if(!r._listeners)return;let a=r._listeners.length;for(;a-- >0;)r._listeners[a](i);r._listeners=null}),this.promise.then=i=>{let a;const s=new Promise(l=>{r.subscribe(l),a=l}).then(i);return s.cancel=function(){r.unsubscribe(a)},s},t(function(a,s,l){r.reason||(r.reason=new ke(a,s,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new sn(function(i){t=i}),cancel:t}}};function Ti(e){return function(n){return e.apply(null,n)}}function Oi(e){return o.isObject(e)&&e.isAxiosError===!0}const Ae={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,ContentTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,UnprocessableContent:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ae).forEach(([e,t])=>{Ae[t]===void 0&&(Ae[t]=e)});function on(e){const t=new te(e),n=Nt(te.prototype.request,t);return o.extend(n,te.prototype,t,{allOwnKeys:!0}),o.extend(n,t,null,{allOwnKeys:!0}),n.create=function(i){return on(ie(e,i))},n}const S=on(we);S.Axios=te;S.CanceledError=ke;S.CancelToken=Si;S.isCancel=Xt;S.VERSION=et;S.toFormData=_e;S.AxiosError=h;S.Cancel=S.CanceledError;S.all=function(t){return Promise.all(t)};S.spread=Ti;S.isAxiosError=Oi;S.mergeConfig=ie;S.AxiosHeaders=D;S.formToJSON=e=>Gt(o.isHTMLForm(e)?new FormData(e):e);S.getAdapter=an.getAdapter;S.HttpStatusCode=Ae;S.default=S;const{Axios:$i,AxiosError:Vi,CanceledError:Wi,isCancel:Ki,CancelToken:Ji,VERSION:Gi,all:Yi,Cancel:Xi,isAxiosError:Zi,spread:Qi,toFormData:ea,AxiosHeaders:ta,HttpStatusCode:na,formToJSON:ra,getAdapter:ia,mergeConfig:aa,create:sa}=S;const Ai=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Ni=mn("arrow-up",Ai),At={rw:{metaTitle:"Agahinda Gakabije | Ubuzima bwo mu Mutwe",heroTitle:"AGAHINDA GAKABIJE",heroDescription:"Gusobanukirwa Agahinda gakabije (Depression)",introEyebrow:"UBUMENYI KU GAHINDA GAKABIJE",introTitle:"Gusobanukirwa Agahinda gakabije (Depression)",introText:"Agahinda gakabije ni imwe mu ndwara zo mu mutwe zikunze kugaragara no kwibasira abantu benshi kwisi. Abantu bagera kuri miliyoni 350 b'imyaka itandukanye bafite iki kibazo ku isi hose. Agahinda gakabije gatuma abantu benshi badashobora gukora imirimo yabo ya buri munsi neza, kandi ibi bikaba bibangamira ubuzima bw'abantu kurusha ibindi byose. Iyo umuntu afite agahinda gakabije, ntikagira ingaruka kuri we gusa, ahubwo gashobora no kugira ingaruka ku bantu ba hafi akunda, urugero nk'umuryango, inshuti, abo bigana cyangwa abo bakorana.",introText2:"Agahinda gakabije gashobora gutangira umuntu akiri muto, kandi gakunze kugaragara cyane mu bagore kurusha mu bagabo.",factsEyebrow:"IMIBARE Y'INGENZI",factsTitle:"IMIBARE Y'INGENZI",facts:[{value:"350M+",label:"Abantu ku isi bafite agahinda gakabije"},{value:"9.1%",label:"By'abaturage mu Rwanda bafite agahinda gakabije"},{value:"17.8%",label:"By'abarokotse Jenoside yakorewe abatutsi mu 1994 mu Rwanda, bafite agahinda gakabije"},{value:"15 – 29",label:"Ikigero cy’imyaka abantu benshi bakunze kwiyahura kubera agahinda gakabije ku isi hose"}],rwandaEyebrow:"MU RWANDA",rwandaTitle:"Agahinda gakabije mu Rwanda",rwandaText:"Ubushakashatsi ku buzima bwo mu mutwe mu Rwanda bwo mu 2025 (Rwanda Mental Health Survey 2025) bwerekanye ko 9.1% by’abaturage muri rusange bafite agahinda gakabije (major depressive episode), mu gihe iki kigero cyageze kuri 17.8% mu barokotse Jenoside yakorewe Abatutsi mu 1994",rwandaText2:"Ubushakashatsi kandi bwerekanye ko agahinda gakabije kari hejuru mu bagore kurusha abagabo, cyane cyane mu barokotse Jenoside yakorewe Abatutsi mu 1994, aho kari kuri 21.4% mu bagore ugereranyije na 11.3% mu bagabo.",symptomsEyebrow:"IBIMENYETSO",symptomsTitle:"Ibimenyetso by’agahinda gakabije",symptomsIntro:"Iyo umuntu afite agahinda gakabije, ashobora kugira ibi bimenyetso bikurikira:",symptomsIntro2:"Kuba umuntu afite agahinda gakabije bimutesha umurongo mu mibereho ye ya buri munsi. Urugero: bimubuza gukora akazi, kwiga iyo ari umunyeshuri, ndetse bishobora no kumubuza gukora uturimo tworoheje twa buri munsi, nko kwiyuhagira cyangwa kwiyitaho muri rusange. Agahinda gakabije gashobora kugaruka kenshi, cyane cyane iyo katavuwe hakiri kare, mu gihe kagaragaye.",symptoms:["Kumva ubabaye cyane mu mutima cyangwa ukumva nta kintu na kimwe ushaka.","Kutagira ubushake bwo gukora ibintu, ndetse n'ibyo wari usanzwe ukunda gukora","Gucika intege ku buryo udashobora gukora imirimo yawe ya buri munsi.","Kwishinja icyaha cyangwa kumva nta gaciro ugifite mu buzima.","Kudashobora gusinzira neza cyangwa gutakaza ubushake bwo kurya.","Guhora wumva unaniwe cyane.","Kudashobora gutekereza neza cyangwa kwibanda ku kintu runaka."],severityEyebrow:"UBUREMERE",severityTitle:"Ubukana bw’agahinda gakabije ndetse no kongera kugaruka kwako (relapse)",relapse1:"Agahinda gakabije gashobora gushyirwa mu byiciro bitatu by’ubukana hagendewe ku bimenyetso umuntu agaragaza.",severity:[{title:"Agahinda gakabije ko ku rwego rworoheje (mild)",description:"Karangwa n'ibimenyetso bike bigaragara ariko ntibibangamira ubuzima busanzwe bwa buri munsi. urugero: gukora akazi, kubana n'inshuti n'umuryango ndetse nibindi."},{title:"Agahinda gakabije ko ku rwego ruri m'urugero (moderate)",description:"Gashobora gutuma umuntu agira ingorane mu gukora imirimo/akazi ke ka buri munsi, cyangwa bikabangamira imibanire ye n’umuryango cyangwa inshuti ze, ariko  ntibihungabanya burundu imikorere ye ya buri munsi muri rusange."},{title:"Agahinda gakabije ko ku rwego rukabije (severe)",description:" Gatuma umuntu adashobora gukora imirimo ye ya buri munsi. Urugero; ntago abasha gukora akazi, ntago abasha kubana neza n’umuryango we ndetse n’inshuti ze muri rusange, cyangwa gukurikirana ibikorwa byo mu rugo nkuko bisanzwe. N’iyo ashoboye gukora, imikorere ye iba yaragabanutse cyane."}],relapse2:"Agahinda gakabije gashobora kongera kugaruka, cyane cyane iyo kadakurikiranwe kuva kagitangira/kakigaragara. Niyo mpamvu, kuvura agahinda gakabije kuva mu ntangiriro y’uko kagaragaye ari iby’ingenzi cyane.",causesEyebrow:"IMPAMVU N'UBURYO WAKWIRINDA",causesTitle:"Ibitera agahinda gakabije n’uburyo wakwirinda ",causesIntro:"Agahinda gakabije gashobora guterwa n’ihuriro cyangwa urusobe bw’ibintu bitandukanye biba mubuzima bw’umuntu. Ibi bishobora kuba ihuriro riri hagati y’imibanire n’abandi, ibyiyumo cyangwa se imitekerereze, ndetse n’imiterere y’umubiri w’umuntu. Niyo mpamvu abantu bahuye n’ibihe bikomeye cyangwa bibabaje mu buzima baba bafite ibyago byinshi byo kurwara agahinda gakabije ",causesIntro2:"Ibibazo by’ubuzima bw’umubiri na byo bishobora kugira uruhare mu kugaragara kw’agahinda gakabije. Urugero: indwara y’umutima ishobora gutuma uyifite arwara agahinda gakabije, kandi ku rundi ruhande, ako gahinda gakabije gashobora kurushaho kuzahaza indwara y’umutima kubera guhangayikishwa n’iyo ndwara.",preventionTitle:"Ikitonderwa",preventionText:" Iyo agahinda gakabije kageze ku rwego rukabije cyane, gashobora gutuma umuntu yiyahura. Buri mwaka, abantu barenga 800,000 bapfa bazize kwiyahura ku isi hose. Kwiyahura kandi niyo mpamvu ya kabiri y'impfu mu bantu bafite imyaka 15–29",adviceEyebrow:"Inama zibyo wakora",adviceTitle:"Inama zagufasha guhangana n’agahinda gakabije",advice:["Menya ibimenyetso by’agahinda gakabije ufite; nta mpamvu yo guterwa isoni no kuba ubifite.","Kora ibikorwa ukunda, nk’imyidagaduro cyangwa ibindi bikorwa wishimira, buri gihe.","Shaka abantu ushobora kuganiriza kandi mugakorana ibikorwa hamwe.","Kora imyitozo ngororamubiri buri gihe."],advice2Title:"Ni iki twakora kugira ngo dutsinde agahinda gakabije?",advice2:["Kugisha inama muganga, umuganga w’indwara zo mu mutwe cyangwa inzobere mu by’imitekerereze igihe wumva ufite ibimenyetso by’agahinda gakabije. ","Kwitoza kugira ubushishozi bwo gutahura kugaragara kw’agahinda gakabije (depression) mu muryango, mu nshuti, cyangwa mu bo muziranye, kandi ukabashishikariza gushaka ubufasha bakeneye.","Kumva kandi ugashyigikira abantu bafite agahinda gakabije ndetse n’abantu babo ba hafi."],supportEyebrow:"SHAKA UBUFASHA",supportTitle:"Uramutse ukeneye ubufasha cyangwa ugize ikibazo, watwandikira tukagufasha kuvugana n'inzobere mu by'imitekerereze.",supportText:"Twandikire kuri nimero: +250 786535362 (whatsapp).",supportButton:"Shaka ubufasha",important:"ICY'INGENZI",importantText:"Aya makuru ni ayo kwigisha no gutanga ubumenyi; ntabwo asimbura isuzuma cyangwa inama by'umuhanga mu buzima bwo mu mutwe.",urgent:"Niba umuntu ari mu kaga ako kanya cyangwa ashobora gukora ibyo yatekereje byo kwiyahura, shakisha ubufasha bwihutirwa kwa serivisi z'ubutabazi, ku kigo nderabuzima cyangwa ku muntu wizewe.",backTop:"Subira hejuru"},en:{metaTitle:"Depression | Mental Health",heroEyebrow:"MENTAL HEALTH",heroTitle:"DEPRESSION",heroDescription:"Learn about depression, its symptoms, its impact on everyday life, and why seeking support early can make a difference.",heroPrimary:"Learn more",heroSecondary:"Get support",introEyebrow:"UNDERSTANDING DEPRESSION",introTitle:"Understanding depression is an important first step toward seeking support.",introText:"Depression is one of the most common mental health conditions in the world. It can affect daily life, relationships, and the ability to carry out usual activities.",introText2:"Recognizing the signs and knowing when to seek help can support earlier access to appropriate care.",factsEyebrow:"KEY FIGURES",factsTitle:"Depression is a mental health issue that deserves attention.",facts:[{value:"350M+",label:"People worldwide living with depression"},{value:"9.1%",label:"Of Rwanda's general population experienced a major depressive episode"},{value:"17.8%",label:"Of survivors of the 1994 Genocide against the Tutsi experienced a major depressive episode"},{value:"15–29",label:"Age group where suicide is one of the leading causes of death"}],rwandaEyebrow:"IN RWANDA",rwandaTitle:"Depression in Rwanda",rwandaText:"The Rwanda Mental Health Survey 2025 shows that 9.1% of the general population experienced a major depressive episode.",rwandaText2:"Among survivors of the 1994 Genocide against the Tutsi, 17.8% experienced a major depressive episode. Among these survivors, 21.4% were women and 11.3% were men.",symptomsEyebrow:"SYMPTOMS",symptomsTitle:"Symptoms of depression",symptomsIntro:"Symptoms can vary from person to person. When they persist and affect everyday functioning, it is important to seek advice from a mental health professional.",symptoms:["Persistent sadness or lack of interest.","Loss of motivation to do usual activities.","Discouragement or weakness that affects daily activities.","Feelings of guilt or low self-worth.","Changes in sleep or appetite.","Extreme tiredness.","Difficulty thinking or concentrating.","Difficulty functioning at work, school, or in self-care.","Depression can recur if it is not treated or addressed early."],severityEyebrow:"SEVERITY",severityTitle:"Depression can occur at different levels of severity.",severity:[{title:"Mild",description:"There may be fewer symptoms, but they can still affect daily functioning."},{title:"Moderate",description:"Symptoms may be more noticeable and begin to have a stronger effect on everyday life."},{title:"Severe",description:"Symptoms are more intense and can significantly affect health and daily functioning."}],relapse:"Depression can recur, so early treatment and support are important.",causesEyebrow:"CAUSES & PREVENTION",causesTitle:"Factors that can contribute to depression",causesIntro:"Depression can be influenced by different factors. Understanding these factors can support prevention and earlier access to help.",causes:[{title:"Relationships & emotions",text:"Relationships, emotions, and thought patterns can influence mental wellbeing."},{title:"Difficult life events",text:"Bereavement, trauma, or job loss can increase the risk of depression."},{title:"Physical health",text:"Physical health problems, such as heart disease, can contribute to depression."},{title:"Wellbeing & functioning",text:"Depression can affect health, wellbeing, relationships, and everyday functioning."}],preventionTitle:"Prevention and mental wellbeing",preventionText:"Prevention can include education and training on positive thinking as well as regular physical exercise.",adviceEyebrow:"ADVICE",adviceTitle:"What to do",advice:["Recognize the symptoms of depression and do not be ashamed to seek help.","Take part in enjoyable or recreational activities.","Find people you can talk to or do activities with.","Exercise regularly.","Seek help from a doctor, psychiatrist, or other mental health professional.","Recognize signs of depression in family members or friends and encourage them to seek help.","Listen to and support people living with depression and those close to them."],supportEyebrow:"GET SUPPORT",supportTitle:"You do not have to face depression alone.",supportText:"Talking to someone you trust or a mental health professional can be an important step toward getting appropriate support.",supportButton:"Get support",important:"IMPORTANT",importantText:"This information is educational and does not replace assessment or advice from a mental health professional.",urgent:"If someone is in immediate danger or may act on suicidal thoughts, seek urgent help from local emergency services, a health facility, or a trusted person.",backTop:"Back to top"},fr:{metaTitle:"Dépression | Santé mentale",heroEyebrow:"SANTÉ MENTALE",heroTitle:"DÉPRESSION",heroDescription:"Découvrez la dépression, ses symptômes, son impact sur la vie quotidienne et l'importance de demander de l'aide tôt.",heroPrimary:"En savoir plus",heroSecondary:"Obtenir de l'aide",introEyebrow:"COMPRENDRE LA DÉPRESSION",introTitle:"Comprendre la dépression est une première étape importante pour demander de l'aide.",introText:"La dépression est l'un des troubles de santé mentale les plus fréquents dans le monde. Elle peut affecter la vie quotidienne, les relations et la capacité à accomplir les activités habituelles.",introText2:"Reconnaître les signes et savoir quand demander de l'aide peut favoriser un accès plus précoce aux soins appropriés.",factsEyebrow:"CHIFFRES CLÉS",factsTitle:"La dépression est un problème de santé mentale qui mérite toute notre attention.",facts:[{value:"350M+",label:"Personnes vivant avec une dépression dans le monde"},{value:"9,1%",label:"De la population générale du Rwanda ayant connu un épisode dépressif majeur"},{value:"17,8%",label:"Des survivants du Génocide perpétré contre les Tutsi ayant connu un épisode dépressif majeur"},{value:"15–29",label:"Tranche d'âge où le suicide figure parmi les principales causes de décès"}],rwandaEyebrow:"AU RWANDA",rwandaTitle:"La dépression au Rwanda",rwandaText:"L'Enquête sur la santé mentale au Rwanda de 2025 montre que 9,1 % de la population générale ont connu un épisode dépressif majeur.",rwandaText2:"Parmi les survivants du Génocide perpétré contre les Tutsi en 1994, 17,8 % ont connu un épisode dépressif majeur. Parmi ces survivants, 21,4 % étaient des femmes et 11,3 % des hommes.",symptomsEyebrow:"SYMPTÔMES",symptomsTitle:"Symptômes de la dépression",symptomsIntro:"Les symptômes peuvent varier d'une personne à l'autre. Lorsqu'ils persistent et affectent le fonctionnement quotidien, il est important de demander conseil à un professionnel de santé mentale.",symptoms:["Tristesse persistante ou manque d'intérêt.","Perte de motivation pour les activités habituelles.","Découragement ou faiblesse affectant les activités quotidiennes.","Sentiment de culpabilité ou faible estime de soi.","Changements dans le sommeil ou l'appétit.","Fatigue extrême.","Difficulté à penser ou à se concentrer.","Difficultés à fonctionner au travail, à l'école ou à prendre soin de soi.","La dépression peut réapparaître si elle n'est pas traitée ou prise en charge tôt."],severityEyebrow:"GRAVITÉ",severityTitle:"La dépression peut avoir différents niveaux de gravité.",severity:[{title:"Légère",description:"Les symptômes peuvent être moins nombreux, mais ils peuvent tout de même affecter le fonctionnement quotidien."},{title:"Modérée",description:"Les symptômes peuvent être plus visibles et commencer à affecter davantage la vie quotidienne."},{title:"Sévère",description:"Les symptômes sont plus intenses et peuvent fortement affecter la santé et le fonctionnement quotidien."}],relapse:"La dépression peut réapparaître ; un traitement et un soutien précoces sont donc importants.",causesEyebrow:"CAUSES ET PRÉVENTION",causesTitle:"Facteurs pouvant contribuer à la dépression",causesIntro:"La dépression peut être influencée par différents facteurs. Les comprendre peut contribuer à la prévention et à un accès plus précoce à l'aide.",causes:[{title:"Relations et émotions",text:"Les relations, les émotions et les schémas de pensée peuvent influencer le bien-être mental."},{title:"Événements difficiles",text:"Le deuil, les traumatismes ou la perte d'emploi peuvent augmenter le risque de dépression."},{title:"Santé physique",text:"Les problèmes de santé physique, comme les maladies cardiaques, peuvent contribuer à la dépression."},{title:"Bien-être et fonctionnement",text:"La dépression peut affecter la santé, le bien-être, les relations et le fonctionnement quotidien."}],preventionTitle:"Prévention et bien-être mental",preventionText:"La prévention peut inclure l'éducation et la formation à la pensée positive ainsi que la pratique régulière d'une activité physique.",adviceEyebrow:"CONSEILS",adviceTitle:"Que faire",advice:["Reconnaissez les symptômes de la dépression et n'ayez pas honte de demander de l'aide.","Participez à des activités agréables ou récréatives.","Trouvez des personnes avec qui parler ou faire des activités.","Faites régulièrement de l'exercice.","Demandez de l'aide à un médecin, un psychiatre ou un autre professionnel de la santé mentale.","Reconnaissez les signes de dépression chez les membres de la famille ou les amis et encouragez-les à demander de l'aide.","Écoutez et soutenez les personnes vivant avec une dépression ainsi que leurs proches."],supportEyebrow:"OBTENIR DE L'AIDE",supportTitle:"Vous n'avez pas à affronter la dépression seul.",supportText:"Parler à une personne de confiance ou à un professionnel de santé mentale peut être une étape importante pour obtenir le soutien approprié.",supportButton:"Obtenir de l'aide",important:"IMPORTANT",importantText:"Ces informations sont éducatives et ne remplacent pas une évaluation ou les conseils d'un professionnel de santé mentale.",urgent:"Si une personne est en danger immédiat ou risque de passer à l'acte après des pensées suicidaires, demandez une aide urgente auprès des services d'urgence locaux, d'un établissement de santé ou d'une personne de confiance.",backTop:"Retour en haut"},nl:{metaTitle:"Depressie | Geestelijke gezondheid",heroEyebrow:"GEESTELIJKE GEZONDHEID",heroTitle:"DEPRESSIE",heroDescription:"Leer meer over depressie, de symptomen, de invloed op het dagelijks leven en waarom het belangrijk is om vroeg ondersteuning te zoeken.",heroPrimary:"Lees meer",heroSecondary:"Hulp zoeken",introEyebrow:"DEPRESSIE BEGRIJPEN",introTitle:"Depressie begrijpen is een belangrijke eerste stap om ondersteuning te zoeken.",introText:"Depressie is een van de meest voorkomende psychische aandoeningen ter wereld. Het kan invloed hebben op het dagelijks leven, relaties en het vermogen om gewone activiteiten uit te voeren.",introText2:"Het herkennen van signalen en weten wanneer hulp nodig is, kan bijdragen aan vroegtijdige toegang tot passende zorg.",factsEyebrow:"BELANGRIJKE CIJFERS",factsTitle:"Depressie is een psychisch gezondheidsprobleem dat aandacht verdient.",facts:[{value:"350M+",label:"Mensen wereldwijd die met een depressie leven"},{value:"9,1%",label:"Van de algemene bevolking van Rwanda maakte een ernstige depressieve episode door"},{value:"17,8%",label:"Van de overlevenden van de genocide tegen de Tutsi maakte een ernstige depressieve episode door"},{value:"15–29",label:"Leeftijdsgroep waarin zelfdoding een belangrijke doodsoorzaak is"}],rwandaEyebrow:"IN RWANDA",rwandaTitle:"Depressie in Rwanda",rwandaText:"Uit de Mental Health Survey van Rwanda uit 2025 blijkt dat 9,1% van de algemene bevolking een ernstige depressieve episode heeft doorgemaakt.",rwandaText2:"Onder overlevenden van de genocide tegen de Tutsi in 1994 heeft 17,8% een ernstige depressieve episode doorgemaakt. Onder deze overlevenden was 21,4% vrouw en 11,3% man.",symptomsEyebrow:"SYMPTOMEN",symptomsTitle:"Symptomen van depressie",symptomsIntro:"Symptomen kunnen van persoon tot persoon verschillen. Wanneer ze aanhouden en het dagelijks functioneren beïnvloeden, is het belangrijk om advies te vragen aan een professional in de geestelijke gezondheidszorg.",symptoms:["Aanhoudende somberheid of gebrek aan interesse.","Verlies van motivatie om gewone activiteiten te doen.","Ontmoediging of zwakte die het dagelijks functioneren beïnvloedt.","Schuldgevoelens of een laag gevoel van eigenwaarde.","Veranderingen in slaap of eetlust.","Extreme vermoeidheid.","Moeite met denken of concentreren.","Moeite met functioneren op het werk, op school of bij zelfzorg.","Depressie kan terugkomen als deze niet wordt behandeld of niet vroeg wordt aangepakt."],severityEyebrow:"ERNST",severityTitle:"Depressie kan verschillende niveaus van ernst hebben.",severity:[{title:"Licht",description:"Er kunnen minder symptomen zijn, maar deze kunnen nog steeds het dagelijks functioneren beïnvloeden."},{title:"Matig",description:"De symptomen kunnen duidelijker worden en een grotere invloed hebben op het dagelijks leven."},{title:"Ernstig",description:"De symptomen zijn intenser en kunnen de gezondheid en het dagelijks functioneren sterk beïnvloeden."}],relapse:"Depressie kan terugkeren, daarom zijn vroege behandeling en ondersteuning belangrijk.",causesEyebrow:"OORZAKEN EN PREVENTIE",causesTitle:"Factoren die kunnen bijdragen aan depressie",causesIntro:"Depressie kan worden beïnvloed door verschillende factoren. Inzicht hierin kan bijdragen aan preventie en vroegtijdige hulp.",causes:[{title:"Relaties en emoties",text:"Relaties, emoties en denkpatronen kunnen invloed hebben op het mentale welzijn."},{title:"Moeilijke gebeurtenissen",text:"Rouw, trauma of verlies van werk kunnen het risico op depressie vergroten."},{title:"Lichamelijke gezondheid",text:"Lichamelijke gezondheidsproblemen, zoals hartziekten, kunnen bijdragen aan depressie."},{title:"Welzijn en functioneren",text:"Depressie kan invloed hebben op gezondheid, welzijn, relaties en dagelijks functioneren."}],preventionTitle:"Preventie en mentaal welzijn",preventionText:"Preventie kan bestaan uit voorlichting en training over positief denken en regelmatige lichaamsbeweging.",adviceEyebrow:"ADVIES",adviceTitle:"Wat te doen",advice:["Herken de symptomen van depressie en schaam je niet om hulp te zoeken.","Doe mee aan activiteiten die je leuk vindt of aan ontspanning.","Zoek mensen met wie je kunt praten of activiteiten kunt doen.","Beweeg regelmatig.","Zoek hulp bij een arts, psychiater of andere professional in de geestelijke gezondheidszorg.","Herken tekenen van depressie bij familieleden of vrienden en moedig hen aan om hulp te zoeken.","Luister naar en ondersteun mensen die met depressie leven en hun naasten."],supportEyebrow:"HULP ZOEKEN",supportTitle:"Je hoeft depressie niet alleen te doorstaan.",supportText:"Praten met iemand die je vertrouwt of met een professional in de geestelijke gezondheidszorg kan een belangrijke stap zijn naar passende ondersteuning.",supportButton:"Hulp zoeken",important:"BELANGRIJK",importantText:"Deze informatie is educatief en vervangt geen beoordeling of advies van een professional in de geestelijke gezondheidszorg.",urgent:"Als iemand direct gevaar loopt of mogelijk zal handelen naar suïcidale gedachten, zoek dan dringend hulp bij lokale hulpdiensten, een zorginstelling of een vertrouwd persoon.",backTop:"Terug naar boven"}};function Z({children:e,light:t=!1}){return c.jsxs("div",{className:`section-label ${t?"section-label-light":""}`,children:[c.jsx("span",{className:"label-line"}),c.jsx("span",{children:e})]})}function Q({light:e=!1}){return c.jsxs("div",{className:`decorative-mark ${e?"decorative-mark-light":""}`,children:[c.jsx("span",{}),c.jsx("span",{}),c.jsx("span",{})]})}function oa(){const[e,t]=se.useState(()=>ot()||"rw"),[n,r]=se.useState(!1);se.useEffect(()=>{const s=()=>{t(ot()||"rw")};return window.addEventListener(lt,s),()=>{window.removeEventListener(lt,s)}},[]),se.useEffect(()=>{const s=()=>{r(window.scrollY>600)};return window.addEventListener("scroll",s),()=>{window.removeEventListener("scroll",s)}},[]),se.useEffect(()=>{S.post(route("page-views.store"),{page:"depression",url:window.location.href,language:e}).catch(s=>{console.error("Page view tracking failed:",s)})},[]);const i=se.useMemo(()=>At[e]||At.rw,[e]),a=()=>{window.scrollTo({top:0,behavior:"smooth"})};return c.jsxs(fn,{children:[c.jsx(pn,{title:i.metaTitle}),c.jsx("style",{children:`
                :root {
                    --mental-blue: #5D89C8;
                    --mental-blue-dark: #294B78;
                    --mental-blue-deep: #17304F;
                    --mental-blue-soft: #EDF4FC;
                    --mental-ink: #182333;
                    --mental-muted: #687386;
                    --mental-border: #E4E9EF;
                    --mental-white: #FFFFFF;
                    --mental-sand: #F7F8F6;
                    --mental-yellow: #E5B83C;
                    --mental-green: #638C70;
                    --mental-radius: 18px;
                    --mental-shadow: 0 18px 50px rgba(24, 35, 51, .08);
                }

                * {
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    margin: 0;
                    background: #fff;
                    color: var(--mental-ink);
                }

                .depression-page {
                    overflow: hidden;
                    background: #fff;
                    font-family:
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .depression-page button,
                .depression-page a {
                    font-family: inherit;
                }

                .container {
                    width: min(1160px, calc(100% - 40px));
                    margin: 0 auto;
                }

                /* HERO */

                .depression-hero {
                    position: relative;
                    // min-height: 620px;
                    display: flex;
                    align-items: center;
                    isolation: isolate;
                    color: #fff;
                    background:
                        linear-gradient(
                            105deg,
                            rgba(19, 42, 70, .92) 0%,
                            rgba(34, 72, 113, .79) 52%,
                            rgba(45, 77, 107, .60) 100%
                        ),
                        url("/images/medium-shot-smiley-friends-hugging.jpg")
                        center / cover no-repeat;
                }

                .depression-hero::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 110px;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, .13),
                        transparent
                    );
                    pointer-events: none;
                    z-index: -1;
                }

                .hero-inner {
                    position: relative;
                    width: min(900px, calc(100% - 40px));
                    margin: 0 auto;
                    padding: 110px 0 90px;
                    text-align: center;
                }

                .hero-kicker {
                    display: inline-flex;
                    align-items: center;
                    gap: 11px;
                    margin-bottom: 19px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: .20em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,.88);
                }

                .hero-kicker::before,
                .hero-kicker::after {
                    content: "";
                    width: 24px;
                    height: 1px;
                    background: rgba(255,255,255,.65);
                }

                .hero-title {
                    margin: 0 auto;
                    max-width: 800px;
                    font-size: clamp(38px, 5vw, 58px);
                    line-height: .98;
                    letter-spacing: -.035em;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .hero-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 13px;
                    margin: 23px 0 24px;
                }

                .hero-divider::before,
                .hero-divider::after {
                    content: "";
                    display: block;
                    width: 65px;
                    height: 1px;
                    background: rgba(255,255,255,.40);
                }

                .hero-diamond {
                    width: 7px;
                    height: 7px;
                    background: var(--mental-yellow);
                    transform: rotate(45deg);
                }

                .hero-description {
                    max-width: 650px;
                    margin: 0 auto;
                    font-size: 15px;
                    line-height: 1.8;
                    color: rgba(255,255,255,.88);
                }

                .hero-actions {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 11px;
                    margin-top: 31px;
                }

                .hero-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    min-height: 46px;
                    padding: 0 20px;
                    border-radius: 999px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 750;
                    transition: .25s ease;
                }

                .hero-button-primary {
                    background: #fff;
                    color: var(--mental-blue-dark);
                }

                .hero-button-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0,0,0,.15);
                }

                .hero-button-secondary {
                    border: 1px solid rgba(255,255,255,.45);
                    color: #fff;
                    background: rgba(255,255,255,.06);
                }

                .hero-button-secondary:hover {
                    background: rgba(255,255,255,.14);
                }

                .hero-scroll {
                    position: absolute;
                    bottom: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 7px;
                    color: rgba(255,255,255,.65);
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: .13em;
                    text-transform: uppercase;
                }

                .hero-scroll svg {
                    animation: floatDown 1.8s infinite ease-in-out;
                }

                @keyframes floatDown {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(5px);
                    }
                }

                /* SHARED */

                .section {
                    padding: 20px 0;
                }

                .section-soft {
                    background: #5d89c81a;
                }

                .section-blue {
                    background: var(--mental-blue-soft);
                }

                .section-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                    color: var(--mental-blue);
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: .18em;
                    text-transform: uppercase;
                }

                .label-line {
                    width: 26px;
                    height: 2px;
                    background: var(--mental-blue);
                }

                .section-title {
                    // max-width: 730px;
                    margin: 0;
                    font-size: clamp(29px, 4vw, 30px);
                    line-height: 1.07;
                    letter-spacing: -.035em;
                    font-weight: 780;
                }

                .section-lead {
                    // max-width: 720px;
                    margin: 20px 0 0;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.85;
                    margin-bottom: 15px;
                }

                .decorative-mark {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 24px;
                }

                .decorative-mark span {
                    display: block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: var(--mental-blue);
                }

                .decorative-mark span:nth-child(2) {
                    width: 8px;
                    height: 8px;
                    background: var(--mental-yellow);
                }

                .decorative-mark span:nth-child(3) {
                    background: var(--mental-green);
                }

                /* INTRO */

                .intro-grid {
                    display: grid;
                    // grid-template-columns: .95fr 2.05fr;
                    // gap: 75px;
                    align-items: center;
                }

                .intro-visual {
                    position: relative;
                    min-height: 370px;
                }

                .intro-image {
                    position: absolute;
                    inset: 0 40px 35px 0;
                    overflow: hidden;
                    border-radius: 18px;
                    background:
                        url("/images/man.png")
                        center / cover no-repeat;
                }

                .intro-image::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    // background: linear-gradient(
                    //     145deg,
                    //     rgba(23,48,79,.08),
                    //     rgba(93,137,200,.25)
                    // );
                }

                .intro-accent {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 155px;
                    height: 155px;
                    border-radius: 12px;
                    background: var(--mental-blue);
                }

                .intro-card {
                    position: absolute;
                    left: 26px;
                    bottom: 55px;
                    width: 215px;
                    padding: 20px;
                    border-radius: 12px;
                    background: rgba(255,255,255,.95);
                    box-shadow: var(--mental-shadow);
                    z-index: 2;
                }

                .intro-card-icon {
                    width: 38px;
                    height: 38px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 13px;
                    border-radius: 10px;
                    background: var(--mental-blue-soft);
                    color: var(--mental-blue);
                }

                .intro-card strong {
                    display: block;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .intro-card span {
                    display: block;
                    margin-top: 5px;
                    color: var(--mental-muted);
                    font-size: 11px;
                    line-height: 1.5;
                }

                .intro-copy p {
                    margin: 0;
                    color: var(--mental-muted);
                    font-size: 14px;
                    line-height: 1.9;
                }

                .intro-copy p + p {
                    margin-top: 18px;
                }

                /* FACTS */

                .facts-heading {
                    display: flex;
                    align-items: end;
                    justify-content: space-between;
                    gap: 40px;
                    margin-bottom: 42px;
                }

                .facts-heading .section-title {
                    max-width: 650px;
                }

                .facts-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }

                .fact-card {
                    position: relative;
                    min-height: 190px;
                    padding: 27px 23px;
                    border: 1px solid var(--mental-border);
                    border-radius: 15px;
                    background: #fff;
                    box-shadow: 0 8px 25px rgba(24,35,51,.035);
                }

                .fact-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 23px;
                    right: 23px;
                    height: 3px;
                    border-radius: 0 0 4px 4px;
                    background: var(--mental-blue);
                }

                .fact-number {
                    margin-top: 9px;
                    color: var(--mental-blue-dark);
                    font-size: 35px;
                    line-height: 1;
                    letter-spacing: -.04em;
                    font-weight: 800;
                }

                .fact-label {
                    margin-top: 17px;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* RWANDA */

                .rwanda-grid {
                    display: grid;
                    // grid-template-columns: .85fr 1.15fr;
                    gap: 75px;
                    align-items: center;
                }

                .rwanda-art {
                    min-height: 430px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--mental-blue);
                    border-radius: 20px;
                    background:
                        radial-gradient(
                            circle at 50% 40%,
                            rgba(93,137,200,.15),
                            transparent 52%
                        ),
                        #F8FAFC;
                    overflow: hidden;
                }

                .mental-art {
                    width: 100%;
                    max-width: 530px;
                }

                .rwanda-stat {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 15px 17px;
                    border: 1px solid rgba(93,137,200,.16);
                    border-radius: 12px;
                    background: rgba(255,255,255,.92);
                    box-shadow: 0 12px 30px rgba(24,35,51,.07);
                }

                .rwanda-stat-one {
                    left: 24px;
                    top: 45px;
                }

                .rwanda-stat-two {
                    right: 22px;
                    bottom: 45px;
                }

                .rwanda-stat strong {
                    color: var(--mental-blue-dark);
                    font-size: 22px;
                }

                .rwanda-stat span {
                    color: var(--mental-muted);
                    font-size: 9px;
                    line-height: 1.4;
                    max-width: 120px;
                }

                .rwanda-copy .section-title {
                    max-width: 600px;
                }

                .rwanda-copy p {
                    color: var(--mental-muted);
                    font-size: 14px;
                    line-height: 1.9;
                }

                .rwanda-copy p + p {
                    margin-top: 17px;
                }

                .gender-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 28px;
                }

                .gender-stat {
                    padding: 17px;
                    border-radius: 12px;
                    background: var(--mental-blue-soft);
                }

                .gender-stat strong {
                    display: block;
                    color: var(--mental-blue-dark);
                    font-size: 25px;
                }

                .gender-stat span {
                    display: block;
                    margin-top: 5px;
                    color: var(--mental-muted);
                    font-size: 10px;
                }

                /* SYMPTOMS */

                .symptoms-layout {
                    display: grid;
                    // grid-template-columns: .85fr 1.15fr;
                    gap: 70px;
                    align-items: start;
                }

                .symptoms-intro {
                    position: sticky;
                    top: 100px;
                }

                .symptoms-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .symptom-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    min-height: 100%;
                    padding: 18px;
                    border: 1px solid var(--mental-border);
                    border-radius: 13px;
                    background: #fff;
                    transition: .22s ease;
                }

                .symptom-item:hover {
                    transform: translateY(-2px);
                    border-color: rgba(93,137,200,.35);
                    box-shadow: 0 12px 30px rgba(24,35,51,.055);
                }

                .symptom-icon {
                    flex: 0 0 auto;
                    width: 28px;
                    height: 28px;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #E5B83C;
                    color: #5D89C8;
                }

                .symptom-item span {
                    color: #4F5B6C;
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* SEVERITY */

                .severity-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    gap: 35px;
                    // margin-bottom: 40px;
                }

                .severity-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 17px;
                }

                .severity-card {
                    padding: 30px 25px;
                    border-radius: 16px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                    box-shadow: 0 10px 30px rgba(24,35,51,.04);
                }

                .severity-icon {
                    width: 30px;
                    height: 30px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 20px;
                    border-radius: 12px;
                    background: #638C70;
                    color: #638C70;
                }

                .severity-card:nth-child(2) .severity-icon {
                    background: #E5B83C;
                    color: #E5B83C;
                }

                .severity-card:nth-child(3) .severity-icon {
                    background: #c33d32;
                    color: #c33d32;
                }

                .severity-card h3 {
                    margin: 0;
                    font-size: 18px;
                }

                .severity-card p {
                    margin: 12px 0 0;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.75;
                }

                .relapse-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    margin-top: 20px;
                    padding: 20px;
                    border-radius: 13px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                }

                .relapse-note svg {
                    flex: 0 0 auto;
                    color: var(--mental-blue);
                }

                .relapse-note p {
                    margin: 0;
                    color: var(--mental-muted);
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* CAUSES */

                .causes-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin-top: 42px;
                }

                .cause-card {
                    padding: 25px 21px;
                    border-radius: 15px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                }

                .cause-icon {
                    width: 39px;
                    height: 39px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 19px;
                    border-radius: 10px;
                    color: var(--mental-blue);
                    background: var(--mental-blue-soft);
                }

                .cause-card h3 {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.35;
                }

                .cause-card p {
                    margin: 10px 0 0;
                    color: var(--mental-muted);
                    font-size: 11px;
                    line-height: 1.7;
                }

                .prevention-panel {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    gap: 23px;
                    // margin-top: 25px;
                    padding: 26px 29px;
                    border-radius: 16px;
                    color: #fff;
                    background: var(--mental-blue-dark);
                }

                .prevention-icon {
                    width: 51px;
                    height: 51px;
                    display: grid;
                    place-items: center;
                    border-radius: 14px;
                    background: rgba(255,255,255,.12);
                }

                .prevention-panel h3 {
                    margin: 0;
                    font-size: 16px;
                }

                .prevention-panel p {
                    margin: 6px 0 0;
                    color: rgba(255,255,255,.74);
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* ADVICE */

                .advice-section {
                    position: relative;
                    overflow: hidden;
                    color: #fff;
                    background:
                        linear-gradient(
                            120deg,
                            #294B78 0%,
                            #5D89C8 100%
                        );
                }

                .advice-section::before {
                    content: "";
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    right: -180px;
                    top: -230px;
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 50%;
                }

                .advice-section::after {
                    content: "";
                    position: absolute;
                    width: 340px;
                    height: 340px;
                    right: -80px;
                    top: -150px;
                    border: 1px solid rgba(255,255,255,.08);
                    border-radius: 50%;
                }

                .section-label-light {
                    color: rgba(255,255,255,.82);
                }

                .section-label-light .label-line {
                    background: rgba(255,255,255,.75);
                }

                .advice-heading {
                    position: relative;
                    z-index: 1;
                    max-width: 680px;
                }

                .advice-heading .section-title {
                    color: #fff;
                }

                .advice-heading .section-lead {
                    color: rgba(255,255,255,.74);
                }

                .advice-list {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 38px;
                }

                .advice-item {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                    padding: 19px;
                    border: 1px solid rgba(255,255,255,.16);
                    border-radius: 13px;
                    background: rgba(255,255,255,.08);
                    backdrop-filter: blur(8px);
                }

                // .advice-item:last-child {
                //     grid-column: span 2;
                // }

                .advice-number {
                    flex: 0 0 auto;
                    width: 29px;
                    height: 29px;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #E5B83C;
                    font-size: 15px;
                    font-weight: 800;
                }

                .advice-item p {
                    margin: 1px 0 0;
                    color: rgba(255,255,255,.87);
                    font-size: 15px;
                    line-height: 1.7;
                }

                /* SUPPORT */

                .support-wrap {
                    max-width: 920px;
                    margin: 0 auto;
                    text-align: center;
                }

                .support-card {
                    position: relative;
                    overflow: hidden;
                    padding: 64px 45px;
                    border-radius: 21px;
                    color: #fff;
                    background:
                        linear-gradient(
                            135deg,
                            rgba(41,75,120,.98),
                            rgba(93,137,200,.98)
                        );
                    box-shadow: 0 25px 70px rgba(41,75,120,.18);
                }

                .support-card::before {
                    content: "";
                    position: absolute;
                    width: 220px;
                    height: 220px;
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 50%;
                    right: -70px;
                    top: -90px;
                }

                .support-icon {
                    width: 54px;
                    height: 54px;
                    display: grid;
                    place-items: center;
                    margin: 0 auto 21px;
                    border-radius: 15px;
                    background: rgba(255,255,255,.13);
                }

                .support-card h2 {
                    position: relative;
                    margin: 0 auto;
                    max-width: 650px;
                    // font-size: clamp(27px, 4vw, 25px);
                    line-height: 1.08;
                    letter-spacing: -.03em;
                }

                .support-card p {
                    position: relative;
                    max-width: 620px;
                    margin: 18px auto 0;
                    color: rgba(255,255,255,.76);
                    font-size: 15px;
                    line-height: 1.8;
                }

                .support-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 26px;
                    min-height: 45px;
                    padding: 0 20px;
                    border-radius: 999px;
                    background: #fff;
                    color: var(--mental-blue-dark);
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 800;
                    transition: .25s ease;
                }

                .support-button:hover {
                    transform: translateY(-2px);
                }

                /* SAFETY / FOOTNOTE */

                .important-box {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 17px;
                    align-items: start;
                    max-width: 900px;
                    margin: 45px auto 0;
                    padding: 20px 22px;
                    border: 1px solid #E8E5D6;
                    border-radius: 13px;
                    background: #FCFBF5;
                }

                .important-icon {
                    width: 37px;
                    height: 37px;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #F2E9BF;
                    color: #876B14;
                }

                .important-box strong {
                    display: block;
                    margin-bottom: 5px;
                    color: #5D4D16;
                    font-size: 11px;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                }

                .important-box p {
                    margin: 0;
                    color: #746C53;
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .urgent-note {
                    max-width: 900px;
                    margin: 14px auto 0;
                    padding: 15px 20px;
                    border-radius: 11px;
                    background: #F9F0EF;
                    color: #7D514D;
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                /* FOOTER */

                .mental-footer {
                    padding: 45px 0;
                    background: #15283E;
                    color: rgba(255,255,255,.7);
                }

                .footer-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 25px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .footer-mark {
                    width: 34px;
                    height: 34px;
                    display: grid;
                    place-items: center;
                    border-radius: 9px;
                    background: rgba(255,255,255,.09);
                    color: #fff;
                }

                .footer-brand strong {
                    display: block;
                    color: #fff;
                    font-size: 12px;
                }

                .footer-brand span {
                    display: block;
                    margin-top: 3px;
                    font-size: 9px;
                    color: rgba(255,255,255,.45);
                }

                .footer-copy {
                    max-width: 460px;
                    text-align: right;
                    font-size: 9.5px;
                    line-height: 1.7;
                }

                /* TOP BUTTON */

                .back-top {
                    position: fixed;
                    z-index: 100;
                    right: 23px;
                    bottom: 23px;
                    width: 43px;
                    height: 43px;
                    display: grid;
                    place-items: center;
                    border: 0;
                    border-radius: 50%;
                    background: var(--mental-blue-dark);
                    color: #fff;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(24,35,51,.18);
                    transition: .25s ease;
                }

                .back-top:hover {
                    transform: translateY(-3px);
                    background: var(--mental-blue);
                }

                /* RESPONSIVE */

                @media (max-width: 980px) {
                    .intro-grid,
                    .rwanda-grid,
                    .symptoms-layout {
                        grid-template-columns: 1fr;
                        gap: 50px;
                    }

                    .facts-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .causes-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .symptoms-intro {
                        position: static;
                    }

                    .intro-visual {
                        min-height: 430px;
                        max-width: 620px;
                    }

                    .rwanda-art {
                        max-width: 650px;
                    }
                }

                @media (max-width: 760px) {
                    .container {
                        width: min(100% - 28px, 620px);
                    }

                    .section {
                        padding: 65px 0;
                    }

                    .depression-hero {
                        min-height: 570px;
                    }

                    .hero-inner {
                        width: min(100% - 30px, 650px);
                        padding: 105px 0 80px;
                    }

                    .hero-title {
                        font-size: 38px;
                    }

                    .hero-description {
                        font-size: 13px;
                        line-height: 1.75;
                    }

                    .hero-scroll {
                        display: none;
                    }

                    .facts-heading,
                    .severity-header {
                        display: block;
                    }

                    .facts-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .fact-card {
                        min-height: 175px;
                    }

                    .symptoms-list {
                        grid-template-columns: 1fr;
                    }

                    .severity-grid {
                        grid-template-columns: 1fr;
                    }

                    .advice-list {
                        grid-template-columns: 1fr;
                    }

                    .advice-item:last-child {
                        grid-column: auto;
                    }

                    .footer-inner {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .footer-copy {
                        text-align: left;
                    }
                }

                @media (max-width: 520px) {
                    .hero-title {
                        font-size: 34px;
                    }

                    .hero-divider::before,
                    .hero-divider::after {
                        width: 35px;
                    }

                    .hero-actions {
                        flex-direction: column;
                        align-items: stretch;
                        max-width: 250px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .hero-button {
                        width: 100%;
                    }

                    .intro-visual {
                        min-height: 350px;
                    }

                    .intro-image {
                        inset: 0 25px 25px 0;
                    }

                    .intro-accent {
                        width: 100px;
                        height: 100px;
                    }

                    .intro-card {
                        left: 15px;
                        bottom: 35px;
                        width: 185px;
                        padding: 16px;
                    }

                    .facts-grid,
                    .causes-grid {
                        grid-template-columns: 1fr;
                    }

                    .gender-stats {
                        grid-template-columns: 1fr;
                    }

                    .prevention-panel {
                        grid-template-columns: 1fr;
                    }

                    .support-card {
                        padding: 45px 22px;
                    }

                    .important-box {
                        grid-template-columns: 1fr;
                    }

                    .rwanda-art {
                        min-height: 340px;
                    }

                    .rwanda-stat-one {
                        left: 10px;
                        top: 20px;
                    }

                    .rwanda-stat-two {
                        right: 10px;
                        bottom: 20px;
                    }
                }
                    p {
    margin: 12px 0 0;
    color: var(--mental-muted);
    font-size: 15px;
    line-height: 1.75;
    margin-bottom: 15px;

            `}),c.jsxs("div",{className:"depression-page",children:[c.jsx("section",{className:"depression-hero",children:c.jsxs("div",{className:"hero-inner",children:[c.jsx("h1",{className:"hero-title",children:i.heroTitle}),c.jsx("div",{className:"hero-divider",children:c.jsx("span",{className:"hero-diamond"})}),c.jsx("p",{className:"hero-description",children:i.heroDescription})]})}),c.jsx("section",{id:"overview",className:"section",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"intro-grid",children:c.jsxs("div",{className:"intro-copy",children:[c.jsx(Z,{children:i.introEyebrow}),c.jsx("h2",{className:"section-title",children:i.introTitle}),c.jsx(Q,{}),c.jsx("p",{children:i.introText}),c.jsx("p",{children:i.introText2})]})})})}),c.jsx("section",{className:"section",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"prevention-panel",children:[c.jsx("div",{className:"prevention-icon",children:c.jsx(hn,{size:23})}),c.jsxs("div",{children:[c.jsx("h3",{children:i.preventionTitle}),c.jsx("p",{children:i.preventionText})]})]})})}),c.jsx("section",{className:"section",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"rwanda-grid",children:c.jsxs("div",{className:"rwanda-copy",children:[c.jsx(Z,{children:i.rwandaEyebrow}),c.jsx("h2",{className:"section-title",children:i.rwandaTitle}),c.jsx(Q,{}),c.jsx("p",{children:i.rwandaText}),c.jsx("p",{children:i.rwandaText2}),c.jsxs("div",{className:"gender-stats",children:[c.jsxs("div",{className:"gender-stat",children:[c.jsx("strong",{children:"21.4%"}),c.jsx("span",{children:e==="rw"?"Abagore":e==="fr"?"Femmes":e==="nl"?"Vrouwen":"Women"})]}),c.jsxs("div",{className:"gender-stat",children:[c.jsx("strong",{children:"11.3%"}),c.jsx("span",{children:e==="rw"?"Abagabo":e==="fr"?"Hommes":e==="nl"?"Mannen":"Men"})]})]})]})})})}),c.jsx("section",{className:"section section-soft",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"symptoms-layout",children:c.jsxs("div",{className:"symptoms-intro",children:[c.jsx(Z,{children:i.symptomsEyebrow}),c.jsx("h2",{className:"section-title",children:i.symptomsTitle}),c.jsx(Q,{}),c.jsx("p",{className:"section-lead",children:i.symptomsIntro}),c.jsx("div",{className:"symptoms-list",children:i.symptoms.map((s,l)=>c.jsxs("div",{className:"symptom-item",children:[c.jsx("div",{className:"symptom-icon",children:c.jsx(Ue,{size:15})}),c.jsx("span",{children:s})]},l))})]})})})}),c.jsx("section",{className:"section",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"prevention-panel",children:c.jsx("div",{children:c.jsx("p",{style:{fontWeight:600,fontSize:16},children:i.symptomsIntro2})})})})}),c.jsx("section",{className:"section section-blue",children:c.jsxs("div",{className:"container",children:[c.jsx("div",{className:"severity-header",children:c.jsx("div",{children:c.jsx("h2",{className:"section-title",children:i.severityTitle})})}),c.jsx(Q,{}),c.jsx("p",{children:i.relapse1}),c.jsx("div",{className:"severity-grid",children:i.severity.map((s,l)=>c.jsxs("article",{className:"severity-card",children:[c.jsx("div",{className:"severity-icon",children:l===0?c.jsx(gn,{size:20}):l===1?c.jsx(bn,{size:20}):c.jsx(yn,{size:20})}),c.jsx("h3",{children:s.title}),c.jsx("p",{children:s.description})]},l))})]})}),c.jsx("section",{className:"section",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"prevention-panel",children:c.jsx("div",{children:c.jsx("p",{style:{fontWeight:600,fontSize:16},children:i.relapse2})})})})}),c.jsx("section",{className:"section",children:c.jsxs("div",{className:"container",children:[c.jsx(Z,{children:i.causesEyebrow}),c.jsx("h2",{className:"section-title",children:i.causesTitle}),c.jsx(Q,{}),c.jsxs("p",{children:[i.causesIntro," ",c.jsx("em",{children:"(urugero: gupfusha uwo wakundaga, guhura n'ibintu bihungabanya umutima, cyangwa gutakaza akazi)"}),"."]}),c.jsx("p",{children:i.causesIntro2}),c.jsx("p",{children:i.causesIntro3}),c.jsx("div",{className:"prevention-panel",children:c.jsxs("div",{children:[c.jsx("h3",{children:"Kwirinda"}),c.jsxs("p",{children:["Agahinda gakabije gashobora gukumirwa binyuze muri gahunda cyangwa ibikorwa bitandukanye. Urugero: kwitabira inyigisho cyangwa amahugurwa yo kwiga uko wagira ubushobozi bwo gutekereza mu buryo bwiza, cyangwa gukora imyitozo ngororangingo ihoraho hagamijwe kubungabunga ubuzima bwo mu mutwe n’ubw’umubiri."," "]})]})})]})}),c.jsx("section",{className:"section advice-section",children:c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"advice-heading",children:[c.jsx(Z,{light:!0,children:i.adviceEyebrow}),c.jsx("h2",{className:"section-title",children:i.adviceTitle})]}),c.jsx(Q,{}),c.jsx("div",{className:"advice-list",children:i.advice.map((s,l)=>c.jsxs("div",{className:"advice-item",children:[c.jsx("div",{className:"advice-number",children:c.jsx(Ue,{size:15})}),c.jsx("p",{children:s})]},l))})]})}),c.jsx("section",{className:"section section-soft",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"symptoms-layout",children:c.jsxs("div",{className:"symptoms-intro",children:[c.jsx(Z,{children:i.adviceEyebrow}),c.jsx("h2",{className:"section-title",children:i.advice2Title}),c.jsx(Q,{}),c.jsx("p",{className:"section-lead",children:i.advice2Intro}),c.jsx("div",{className:"symptoms-list",children:i.advice2.map((s,l)=>c.jsxs("div",{className:"symptom-item",children:[c.jsx("div",{className:"symptom-icon",children:c.jsx(Ue,{size:15})}),c.jsx("span",{children:s})]},l))})]})})})}),c.jsx("section",{className:"section section-soft",children:c.jsxs("div",{className:"container",children:[c.jsx("div",{className:"facts-heading",children:c.jsx("div",{children:c.jsx(Z,{children:i.factsEyebrow})})}),c.jsx("div",{className:"facts-grid",children:i.facts.map((s,l)=>c.jsxs("article",{className:"fact-card",children:[c.jsx("div",{className:"fact-number",children:s.value}),c.jsx("div",{className:"fact-label",children:s.label})]},l))})]})}),c.jsx("section",{id:"support",className:"section",children:c.jsx("div",{className:"container",children:c.jsx("div",{className:"support-wrap",children:c.jsxs("div",{className:"support-card",children:[c.jsx("h2",{children:i.supportTitle}),c.jsx("p",{children:i.supportText})]})})})}),n&&c.jsx("button",{type:"button",className:"back-top",onClick:a,"aria-label":i.backTop,title:i.backTop,children:c.jsx(Ni,{size:18})})]})]})}export{oa as default};
