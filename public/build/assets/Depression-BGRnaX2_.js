import{r as se,j as c,H as yn}from"./app-DSoONET_.js";import{A as wn}from"./AppLayout-Blvu-whw.js";import{c as Je,g as ot,L as lt}from"./createLucideIcon-CisFSg_k.js";import{B as ct,T as dt,S as kn,a as vn}from"./triangle-alert-BVy9Lxmk.js";import{C as En}from"./circle-check-hepTvxb1.js";import{A as jn}from"./activity-HeQGZtzx.js";import{H as ut}from"./heart-pulse-CjCGgnKQ.js";import{U as Rn}from"./users-C2FWnxVt.js";import{S as pt}from"./shield-check-CLg4gQW9.js";import"./file-text-Dp79i7Xe.js";import"./x-BUF7vU6-.js";function Ut(e,t){return function(){return e.apply(t,arguments)}}const{toString:Sn}=Object.prototype,{getPrototypeOf:J}=Object,{iterator:be,toStringTag:It}=Symbol,me=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Ft=e=>typeof e=="string"&&(e==="__proto__"||e==="constructor"||e==="prototype"),Bt=(e,t,n)=>e===Object.prototype||!n&&t===null,Tn=e=>{if(!Object.isExtensible(e))return!1;const t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols&&t.push(...Object.getOwnPropertySymbols(e)),t.every(n=>{if(Ft(n))return!1;const r=Object.getOwnPropertyDescriptor(e,n);return!!r&&r.configurable&&r.writable===!0})},ge=(e,t)=>{let n=e;const r=[];for(;n!=null;){if(r.indexOf(n)!==-1)return!1;r.push(n);const i=J(n);if(Bt(n,i,n===e))return!1;if(me(n,t))return!0;n=i}return!1},On=(e,t)=>e!=null&&ge(e,t)?e[t]:void 0,An=e=>{if(e==null||typeof e!="object"&&typeof e!="function")return e;const t=J(e);if(t===null&&Tn(e))return e;const n=Object.create(null),r=Object.create(null),i=[];let s=e;for(;s!=null&&i.indexOf(s)===-1;){i.push(s);const a=s===e?t:J(s);if(Bt(s,a,s===e))break;const l=Object.getOwnPropertyNames(s);Object.getOwnPropertySymbols&&l.push(...Object.getOwnPropertySymbols(s));for(const d of l)Ft(d)||me(r,d)||(n[d]=e[d],r[d]=!0);s=a}return n},Ge=(e=>t=>{const n=Sn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),U=e=>(e=e.toLowerCase(),t=>Ge(t)===e),Pe=e=>t=>typeof t===e,{isArray:te}=Array,ne=Pe("undefined");function oe(e){return e!==null&&!ne(e)&&e.constructor!==null&&!ne(e.constructor)&&D(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Mt=U("ArrayBuffer");function Nn(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Mt(e.buffer),t}const Pn=Pe("string"),D=Pe("function"),qt=Pe("number"),le=e=>e!==null&&typeof e=="object",zn=e=>e===!0||e===!1,Re=e=>{if(!le(e))return!1;const t=J(e);return(t===null||t===Object.prototype||J(t)===null)&&!ge(e,It)&&!ge(e,be)},_n=e=>{if(!le(e)||oe(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Cn=U("Date"),Dn=U("File"),Ln=e=>!!(e&&typeof e.uri<"u"),Un=e=>e&&typeof e.getParts<"u",In=U("Blob"),Fn=U("FileList"),Bn=U("Set"),Mn=e=>le(e)&&D(e.pipe);function qn(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const ft=qn(),ht=typeof ft.FormData<"u"?ft.FormData:void 0,Hn=e=>{if(!e)return!1;if(ht&&e instanceof ht)return!0;const t=J(e);if(!t||t===Object.prototype||!D(e.append))return!1;const n=Ge(e);return n==="formdata"||n==="object"&&D(e.toString)&&e.toString()==="[object FormData]"},Wn=U("URLSearchParams"),[Vn,$n,Kn,Jn]=["ReadableStream","Request","Response","Headers"].map(U),Gn=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function xe(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,i;if(typeof e!="object"&&(e=[e]),te(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(oe(e))return;const s=n?Object.getOwnPropertyNames(e):Object.keys(e),a=s.length;let l;for(r=0;r<a;r++)l=s[r],t.call(null,e[l],l,e)}}function Ht(e,t){if(oe(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}const Q=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Wt=e=>!ne(e)&&e!==Q;function Ve(...e){const{caseless:t,skipUndefined:n}=Wt(this)&&this||{},r={},i=(s,a)=>{if(a==="__proto__"||a==="constructor"||a==="prototype")return;const l=t&&typeof a=="string"&&Ht(r,a)||a,d=me(r,l)?r[l]:void 0;Re(d)&&Re(s)?r[l]=Ve(d,s):Re(s)?r[l]=Ve({},s):te(s)?r[l]=s.slice():(!n||!ne(s))&&(r[l]=s)};for(let s=0,a=e.length;s<a;s++){const l=e[s];if(!l||oe(l)||(xe(l,i),typeof l!="object"||te(l)))continue;const d=Object.getOwnPropertySymbols(l);for(let f=0;f<d.length;f++){const p=d[f];or.call(l,p)&&i(l[p],p)}}return r}const Yn=(e,t,n,{allOwnKeys:r}={})=>(xe(t,(i,s)=>{n&&D(i)?Object.defineProperty(e,s,{__proto__:null,value:Ut(i,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,s,{__proto__:null,value:i,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Xn=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Zn=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Qn=(e,t,n,r)=>{let i,s,a;const l={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),s=i.length;s-- >0;)a=i[s],(!r||r(a,e,t))&&!l[a]&&(t[a]=e[a],l[a]=!0);e=n!==!1&&J(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},er=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},tr=e=>{if(!e)return null;if(te(e))return e;let t=e.length;if(!qt(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},nr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&J(Uint8Array)),rr=(e,t)=>{const r=(e&&e[be]).call(e);let i;for(;(i=r.next())&&!i.done;){const s=i.value;t.call(e,s[0],s[1])}},ir=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},sr=U("HTMLFormElement"),ar=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),{propertyIsEnumerable:or}=Object.prototype,lr=U("RegExp"),Vt=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};xe(n,(i,s)=>{let a;(a=t(i,s,e))!==!1&&(r[s]=a||i)}),Object.defineProperties(e,r)},cr=e=>{Vt(e,(t,n)=>{if(D(e)&&["arguments","caller","callee"].includes(n))return!1;const r=e[n];if(D(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},dr=(e,t)=>{const n={},r=i=>{i.forEach(s=>{n[s]=!0})};return te(e)?r(e):r(String(e).split(t)),n},ur=()=>{},pr=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function fr(e){return!!(e&&D(e.append)&&e[It]==="FormData"&&e[be])}const hr=e=>{const t=new WeakSet,n=r=>{if(le(r)){if(t.has(r))return;if(oe(r))return r;if(!("toJSON"in r)){t.add(r);let i;if(Bn(r)){i=[];for(const s of r){const a=n(s);!ne(a)&&i.push(a)}}else i=te(r)?[]:{},xe(r,(s,a)=>{const l=n(s);!ne(l)&&(i[a]=l)});return t.delete(r),i}}return r};return n(e)},mr=U("AsyncFunction"),gr=e=>e&&(le(e)||D(e))&&D(e.then)&&D(e.catch),$t=((e,t)=>e?setImmediate:t?((n,r)=>(Q.addEventListener("message",({source:i,data:s})=>{i===Q&&s===n&&r.length&&r.shift()()},!1),i=>{r.push(i),Q.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",D(Q.postMessage)),br=typeof queueMicrotask<"u"?queueMicrotask.bind(Q):typeof process<"u"&&process.nextTick||$t,Kt=e=>e!=null&&D(e[be]),xr=e=>e!=null&&ge(e,be)&&Kt(e),o={isArray:te,isArrayBuffer:Mt,isBuffer:oe,isFormData:Hn,isArrayBufferView:Nn,isString:Pn,isNumber:qt,isBoolean:zn,isObject:le,isPlainObject:Re,isEmptyObject:_n,isReadableStream:Vn,isRequest:$n,isResponse:Kn,isHeaders:Jn,isUndefined:ne,isDate:Cn,isFile:Dn,isReactNativeBlob:Ln,isReactNative:Un,isBlob:In,isRegExp:lr,isFunction:D,isStream:Mn,isURLSearchParams:Wn,isTypedArray:nr,isFileList:Fn,forEach:xe,merge:Ve,extend:Yn,trim:Gn,stripBOM:Xn,inherits:Zn,toFlatObject:Qn,kindOf:Ge,kindOfTest:U,endsWith:er,toArray:tr,forEachEntry:rr,matchAll:ir,isHTMLForm:sr,hasOwnProperty:me,hasOwnProp:me,hasOwnInPrototypeChain:ge,getSafeProp:On,toSafeFlatObject:An,reduceDescriptors:Vt,freezeMethods:cr,toObjectSet:dr,toCamelCase:ar,noop:ur,toFiniteNumber:pr,findKey:Ht,global:Q,isContextDefined:Wt,isSpecCompliantForm:fr,toJSONObject:hr,isAsyncFn:mr,isThenable:gr,setImmediate:$t,asap:br,isIterable:Kt,isSafeIterable:xr},yr=o.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),wr=e=>{const t={};let n,r,i;return e&&e.split(`
`).forEach(function(a){i=a.indexOf(":"),n=a.substring(0,i).trim().toLowerCase(),r=a.substring(i+1).trim();const l=o.hasOwnProp(t,n);!n||l&&o.hasOwnProp(yr,n)||(n==="set-cookie"?l?t[n].push(r):t[n]=[r]:t[n]=l?t[n]+", "+r:r)}),t};function kr(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}const vr=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),Er=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function Ye(e,t){return o.isArray(e)?e.map(n=>Ye(n,t)):kr(String(e).replace(t,""))}const jr=e=>Ye(e,vr),Rr=e=>Ye(e,Er);function Jt(e){const t=Object.create(null);return o.forEach(e.toJSON(),(n,r)=>{t[r]=Rr(n)}),t}const mt=Symbol("internals");function pe(e){return e&&String(e).trim().toLowerCase()}function Se(e){return e===!1||e==null?e:o.isArray(e)?e.map(Se):jr(String(e))}function Sr(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Tr=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Ue(e){let t=0,n=e.length;for(;t<n;){const r=e.charCodeAt(t);if(r!==9&&r!==32)break;t+=1}for(;n>t;){const r=e.charCodeAt(n-1);if(r!==9&&r!==32)break;n-=1}return t===0&&n===e.length?e:e.slice(t,n)}function Or(e){const t=e.length-1;if(t<1||e.charCodeAt(0)!==34||e.charCodeAt(t)!==34)return e;let n="";for(let r=1;r<t;r++){const i=e.charCodeAt(r);if(i===34||i===92&&(r+=1,r>=t))return e;n+=e[r]}return n}function Ar(e){const t=Object.create(null),n=String(e);let r=0,i=!1,s=!1;function a(l){const d=Ue(n.slice(r,l)),f=d.indexOf("=");if(f<1)return;const p=Ue(d.slice(0,f));if(!Tr.test(p))return;const h=p.toLowerCase();if(h==="__proto__"||h==="constructor"||h==="prototype")return;const b=Ue(d.slice(f+1));t[h]=Or(b)}for(let l=0;l<n.length;l++){const d=n.charCodeAt(l);i?s?s=!1:d===92?s=!0:d===34&&(i=!1):d===34?i=!0:(d===44||d===59)&&(a(l),r=l+1)}return a(n.length),t}const Nr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ie(e,t,n,r,i){if(o.isFunction(r))return r.call(this,t,n);if(i&&(t=n),!!o.isString(t)){if(o.isString(r))return t.indexOf(r)!==-1;if(o.isRegExp(r))return r.test(t)}}function Pr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function zr(e,t){const n=o.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(i,s,a){return this[r].call(this,t,i,s,a)},configurable:!0})})}let C=class{constructor(t){t&&this.set(t)}set(t,n,r){const i=this;function s(l,d,f){const p=pe(d);if(!p)return;const h=o.findKey(i,p);(!h||i[h]===void 0||f===!0||f===void 0&&i[h]!==!1)&&(i[h||d]=Se(l))}const a=(l,d)=>o.forEach(l,(f,p)=>s(f,p,d));if(o.isPlainObject(t)||t instanceof this.constructor)a(t,n);else if(o.isString(t)&&(t=t.trim())&&!Nr(t))a(wr(t),n);else if(o.isObject(t)&&o.isSafeIterable(t)){let l=Object.create(null),d,f;for(const p of t){if(!o.isArray(p))throw new TypeError("Object iterator must return a key-value pair");f=p[0],o.hasOwnProp(l,f)?(d=l[f],l[f]=o.isArray(d)?[...d,p[1]]:[d,p[1]]):l[f]=p[1]}a(l,n)}else t!=null&&s(n,t,r);return this}get(t,n){if(t=pe(t),t){const r=o.findKey(this,t);if(r){const i=this[r];if(!n)return i;if(n===!0)return Sr(i);if(o.isFunction(n))return n.call(this,i,r);if(o.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=pe(t),t){const r=o.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Ie(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let i=!1;function s(a){if(a=pe(a),a){const l=o.findKey(r,a);l&&(!n||Ie(r,r[l],l,n))&&(delete r[l],i=!0)}}return o.isArray(t)?t.forEach(s):s(t),i}clear(t){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const s=n[r];(!t||Ie(this,this[s],s,t,!0))&&(delete this[s],i=!0)}return i}normalize(t){const n=this,r={};return o.forEach(this,(i,s)=>{const a=o.findKey(r,s);if(a){n[a]=Se(i),delete n[s];return}const l=t?Pr(s):String(s).trim();l!==s&&delete n[s],n[l]=Se(i),r[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return o.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=t&&o.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){const t=this.get("set-cookie");return o.isArray(t)?t:t==null||t===!1?[]:[t]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static parseParameters(t){return Ar(t)}static concat(t,...n){const r=new this(t);return n.forEach(i=>r.set(i)),r}static accessor(t){const r=(this[mt]=this[mt]={accessors:{}}).accessors,i=this.prototype;function s(a){const l=pe(a);r[l]||(zr(i,a),r[l]=!0)}return o.isArray(t)?t.forEach(s):s(t),this}};C.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);o.reduceDescriptors(C.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});o.freezeMethods(C);const Ae="[REDACTED ****]";function _r(e){if(o.hasOwnProp(e,"toJSON"))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(o.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function Cr(e,t){const n=new Set(t.map(s=>String(s).toLowerCase())),r=[],i=s=>{if(s===null||typeof s!="object"||o.isBuffer(s))return s;if(r.indexOf(s)!==-1)return;s instanceof C&&(s=s.toJSON()),r.push(s);let a;if(o.isArray(s))a=[],s.forEach((l,d)=>{const f=i(l);o.isUndefined(f)||(a[d]=f)});else{if(!o.isPlainObject(s)&&_r(s))return r.pop(),s;a=Object.create(null);for(const[l,d]of Object.entries(s)){const f=n.has(l.toLowerCase())?Ae:i(d);o.isUndefined(f)||(a[l]=f)}}return r.pop(),a};return i(e)}function gt(e){try{return String(e)}catch{return""}}function Dr(e){return e.errors.map(n=>{try{return n&&n.message?gt(n.message):gt(n)}catch{return""}}).filter(Boolean).join("; ")||e.name||"AggregateError"}let m=class Gt extends Error{static from(t,n,r,i,s,a){let l=t.message;!l&&o.isArray(t.errors)&&t.errors.length&&(l=Dr(t));const d=new Gt(l,n||t.code,r,i,s);return Object.defineProperty(d,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),d.name=t.name,t.status!=null&&d.status==null&&(d.status=t.status),a&&Object.assign(d,a),d}constructor(t,n,r,i,s){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),i&&(this.request=i),s&&(this.response=s,this.status=s.status)}toJSON(){const t=this.config,n=t&&o.hasOwnProp(t,"redact")?t.redact:void 0,r=o.isArray(n)&&n.length>0?Cr(t,n):o.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:r,code:this.code,status:this.status}}};m.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";m.ERR_BAD_OPTION="ERR_BAD_OPTION";m.ECONNABORTED="ECONNABORTED";m.ETIMEDOUT="ETIMEDOUT";m.ECONNREFUSED="ECONNREFUSED";m.ERR_NETWORK="ERR_NETWORK";m.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";m.ERR_DEPRECATED="ERR_DEPRECATED";m.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";m.ERR_BAD_REQUEST="ERR_BAD_REQUEST";m.ERR_CANCELED="ERR_CANCELED";m.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";m.ERR_INVALID_URL="ERR_INVALID_URL";m.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const Lr=null,Yt=100;function $e(e){return o.isPlainObject(e)||o.isArray(e)}function Xt(e){return o.endsWith(e,"[]")?e.slice(0,-2):e}function Fe(e,t,n){return e?e.concat(t).map(function(i,s){return i=Xt(i),!n&&s?"["+i+"]":i}).join(n?".":""):t}function Ur(e){return o.isArray(e)&&!e.some($e)}const Ir=o.toFlatObject(o,{},null,function(t){return/^is[A-Z]/.test(t)});function ze(e,t,n){if(!o.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(g,w)=>{const x=o.getSafeProp(n,g);return o.isUndefined(x)?w:x},i=r("metaTokens",!0),s=r("visitor")||j,a=r("dots",!1),l=r("indexes",!1),d=r("Blob")||typeof Blob<"u"&&Blob,f=r("maxDepth",Yt),p=d&&o.isSpecCompliantForm(t),h=[];if(!o.isFunction(s))throw new TypeError("visitor must be a function");function b(g){if(g===null)return"";if(o.isDate(g))return g.toISOString();if(o.isBoolean(g))return g.toString();if(!p&&o.isBlob(g))throw new m("Blob is not supported. Use a Buffer instead.");if(o.isArrayBuffer(g)||o.isTypedArray(g)){if(p&&typeof d=="function")return new d([g]);throw new m("Blob is not supported. Use a Buffer instead.",m.ERR_NOT_SUPPORT)}return g}function k(g){if(g>f)throw new m("Object is too deeply nested ("+g+" levels). Max depth: "+f,m.ERR_FORM_DATA_DEPTH_EXCEEDED)}function v(g,w){if(f===1/0)return JSON.stringify(g);const x=[];return JSON.stringify(g,function(P,R){if(!o.isObject(R))return R;for(;x.length&&x[x.length-1]!==this;)x.pop();return x.push(R),k(w+x.length-1),R})}function j(g,w,x){let O=g;if(o.isReactNative(t)&&o.isReactNativeBlob(g))return t.append(Fe(x,w,a),b(g)),!1;if(g&&!x&&typeof g=="object"){if(o.endsWith(w,"{}"))w=i?w:w.slice(0,-2),g=v(g,1);else if(o.isArray(g)&&Ur(g)||(o.isFileList(g)||o.endsWith(w,"[]"))&&(O=o.toArray(g)))return w=Xt(w),O.forEach(function(R,F){!(o.isUndefined(R)||R===null)&&t.append(l===!0?Fe([w],F,a):l===null?w:w+"[]",b(R))}),!1}return $e(g)?!0:(t.append(Fe(x,w,a),b(g)),!1)}const T=Object.assign(Ir,{defaultVisitor:j,convertValue:b,isVisitable:$e});function u(g,w,x=0){if(!o.isUndefined(g)){if(k(x),h.indexOf(g)!==-1)throw new Error("Circular reference detected in "+w.join("."));h.push(g),o.forEach(g,function(P,R){(!(o.isUndefined(P)||P===null)&&s.call(t,P,o.isString(R)?R.trim():R,w,T))===!0&&u(P,w?w.concat(R):[R],x+1)}),h.pop()}}if(!o.isObject(e))throw new TypeError("data must be an object");return u(e),t}function bt(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}function Xe(e,t){this._pairs=[],e&&ze(e,this,t)}const Zt=Xe.prototype;Zt.append=function(t,n){this._pairs.push([t,n])};Zt.toString=function(t){const n=t?r=>t.call(this,r,bt):bt;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function Fr(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Qt(e,t,n){if(!t)return e;e=e||"";const r=o.isFunction(n)?{serialize:n}:n,i=o.getSafeProp(r,"encode")||Fr,s=o.getSafeProp(r,"serialize");let a;if(s?a=s(t,r):a=o.isURLSearchParams(t)?t.toString():new Xe(t,r).toString(i),a){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}const fe=Symbol("internals");function en(e){return e?e.length:0}function xt(e){if(e)for(;e.length&&e[e.length-1]===null;)e.pop()}function he(e,t){const n=e.handlers,r=en(n);n!==t.handlersRef?(t.handlersRef=n,t.handlerEntries.clear()):r!==t.handlersLength&&(r?t.handlerEntries.forEach(function(s,a){n[s.index]!==s.handler&&t.handlerEntries.delete(a)}):t.handlerEntries.clear()),t.handlersLength=r}class yt{constructor(){this.handlers=[],this[fe]={handlersRef:this.handlers,handlersLength:this.handlers.length,handlerEntries:new Map,iterationDepth:0,nextId:0}}use(t,n,r){const i={fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null},s=this[fe];this.handlers==null&&(this.handlers=[]),he(this,s);const a=s.nextId++;return this.handlers.push(i),s.handlerEntries.set(a,{handler:i,index:this.handlers.length-1}),s.handlersLength=this.handlers.length,a}eject(t){const n=this[fe];he(this,n);const r=n.handlerEntries.get(t);if(r){if(n.handlerEntries.delete(t),this.handlers[r.index]!==r.handler)return;this.handlers[r.index]=null,n.iterationDepth||(xt(this.handlers),n.handlersLength=this.handlers.length)}}clear(){this.handlers&&(this.handlers=[],he(this,this[fe]))}forEach(t){const n=this[fe];he(this,n),n.iterationDepth++;try{o.forEach(this.handlers,function(i){i!==null&&t(i)})}finally{--n.iterationDepth||(he(this,n),xt(this.handlers),n.handlersLength=en(this.handlers))}}}const Ze={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},Br=typeof URLSearchParams<"u"?URLSearchParams:Xe,Mr=typeof FormData<"u"?FormData:null,qr=typeof Blob<"u"?Blob:null,Hr={isBrowser:!0,classes:{URLSearchParams:Br,FormData:Mr,Blob:qr},protocols:["http","https","file","blob","url","data"]},Qe=typeof window<"u"&&typeof document<"u",Ke=typeof navigator=="object"&&navigator||void 0,Wr=Qe&&(!Ke||["ReactNative","NativeScript","NS"].indexOf(Ke.product)<0),Vr=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",$r=Qe&&window.location.href||"http://localhost",Kr=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Qe,hasStandardBrowserEnv:Wr,hasStandardBrowserWebWorkerEnv:Vr,navigator:Ke,origin:$r},Symbol.toStringTag,{value:"Module"})),A={...Kr,...Hr};function Jr(e,t){return ze(e,new A.classes.URLSearchParams,{visitor:function(n,r,i,s){return A.isNode&&o.isBuffer(n)?(this.append(r,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...t})}const wt=Yt;function tn(e){if(e>wt)throw new m("FormData field is too deeply nested ("+e+" levels). Max depth: "+wt,m.ERR_FORM_DATA_DEPTH_EXCEEDED)}function Gr(e){const t=[],n=/[^.[\]]+|\[([^.[\]]*)]/g;let r;for(;(r=n.exec(e))!==null;)tn(t.length),t.push(r[0]==="[]"?"":r[1]||r[0]);return t}function Yr(e){const t={},n=Object.keys(e);let r;const i=n.length;let s;for(r=0;r<i;r++)s=n[r],t[s]=e[s];return t}function nn(e){function t(n,r,i,s){tn(s);let a=n[s++];if(a==="__proto__")return!0;const l=Number.isFinite(+a),d=s>=n.length;return a=!a&&o.isArray(i)?i.length:a,d?(o.hasOwnProp(i,a)?i[a]=o.isArray(i[a])?i[a].concat(r):[i[a],r]:i[a]=r,!l):((!o.hasOwnProp(i,a)||!o.isObject(i[a]))&&(i[a]=[]),t(n,r,i[a],s)&&o.isArray(i[a])&&(i[a]=Yr(i[a])),!l)}if(o.isFormData(e)&&o.isFunction(e.entries)){const n={};return o.forEachEntry(e,(r,i)=>{t(Gr(r),i,n,0)}),n}return null}const rn=Object.freeze(["get","delete","head","options","post","put","patch","purge","link","unlink","query"]),ae=(e,t)=>e!=null&&o.hasOwnProp(e,t)?e[t]:void 0;function Xr(e,t,n){if(o.isString(e))try{return(t||JSON.parse)(e),o.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const ye={transitional:Ze,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,s=o.isObject(t);if(s&&o.isHTMLForm(t)&&(t=new FormData(t)),o.isFormData(t))return i?JSON.stringify(nn(t)):t;if(o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)||o.isReadableStream(t))return t;if(o.isArrayBufferView(t))return t.buffer;if(o.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(s){const d=ae(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return Jr(t,d).toString();if((l=o.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=ae(this,"env"),p=f&&f.FormData;return ze(l?{"files[]":t}:t,p&&new p,d)}}return s||i?(n.setContentType("application/json",!1),Xr(t)):t}],transformResponse:[function(t){const n=ae(this,"transitional")||ye.transitional,r=n&&n.forcedJSONParsing,i=ae(this,"responseType"),s=i==="json";if(o.isResponse(t)||o.isReadableStream(t))return t;if(t&&o.isString(t)&&(r&&!i||s)){const l=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,ae(this,"parseReviver"))}catch(d){if(l)throw d.name==="SyntaxError"?m.from(d,m.ERR_BAD_RESPONSE,this,null,ae(this,"response")):d}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:A.classes.FormData,Blob:A.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};o.forEach(rn,e=>{ye.headers[e]={}});function Be(e,t){const n=this||ye,r=t||n,i=C.from(r.headers);let s=r.data;return o.forEach(e,function(l){s=l.call(n,s,i.normalize(),t?t.status:void 0)}),i.normalize(),s}function sn(e){return!!(e&&e.__CANCEL__)}let we=class extends m{constructor(t,n,r){super(t??"canceled",m.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function an(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,n.status>=400&&n.status<500?m.ERR_BAD_REQUEST:m.ERR_BAD_RESPONSE,n.config,n.request,n))}const Zr=/[\t\n\r]/g;function on(e){if(typeof e!="string")return e;let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t).replace(Zr,"")}function Me(e){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||""}function Qr(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i=0,s=0,a;return t=t!==void 0?t:1e3,function(d){const f=Date.now(),p=r[s];a||(a=f),n[i]=d,r[i]=f;let h=s,b=0;for(;h!==i;)b+=n[h++],h=h%e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),f-a<t)return;const k=p&&f-p;return k?Math.round(b*1e3/k):void 0}}function ei(e,t){let n=0,r=1e3/t,i,s;const a=(p,h=Date.now())=>{n=h,i=null,s&&(clearTimeout(s),s=null),e(...p)};return[(...p)=>{const h=Date.now(),b=h-n;b>=r?a(p,h):(i=p,s||(s=setTimeout(()=>{s=null,a(i)},r-b)))},()=>i&&a(i),(...p)=>a(p)]}const Ne=(e,t,n=3)=>{let r=0;const i=Qr(50,250);return ei(s=>{if(!s||!o.isNumber(s.loaded))return;const a=s.loaded,l=s.lengthComputable?s.total:void 0,d=Math.max(0,l!=null?Math.min(a,l):a),f=Math.max(0,d-r),p=i(f);r=Math.max(r,d);const h={loaded:d,total:l,progress:l?d/l:void 0,bytes:f,rate:p||void 0,estimated:p&&l?(l-d)/p:void 0,event:s,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(h)},n)},kt=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},vt=(e,t=o.asap)=>(...n)=>t(()=>e(...n)),ti=A.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,A.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(A.origin),A.navigator&&/(msie|trident)/i.test(A.navigator.userAgent)):()=>!0,ni=A.hasStandardBrowserEnv?{write(e,t,n,r,i,s,a){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];o.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),o.isString(r)&&l.push(`path=${r}`),o.isString(i)&&l.push(`domain=${i}`),s===!0&&l.push("secure"),o.isString(a)&&l.push(`SameSite=${a}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].replace(/^\s+/,""),i=r.indexOf("=");if(i!==-1&&r.slice(0,i)===e)try{return decodeURIComponent(r.slice(i+1))}catch{return r.slice(i+1)}}return null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function ri(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function ii(e,t){if(!t)return e;let n=e.length;for(;n>0&&e.charCodeAt(n-1)===47;)n--;return e.slice(0,n)+"/"+t.replace(/^\/+/,"")}const si=/^https?:(?!\/\/)/i;function ai(e){return e&&e.replace(/(^|&)([^=&]*=)?[^&]+/g,(t,n,r="")=>`${n}${r}${Ae}`)}function oi(e){const t=e.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${Ae}@`),n=t.indexOf("#"),i=(n===-1?t:t.slice(0,n)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${Ae}`);return n===-1?i:`${i}#${ai(t.slice(n+1))}`}function Et(e,t){if(typeof e=="string"){const n=on(e);if(si.test(n))throw new m(`Invalid URL ${JSON.stringify(oi(n))}: missing "//" after protocol`,m.ERR_INVALID_URL,t)}}function ln(e,t,n,r){Et(t,r);let i=!ri(t);return e&&(i||n===!1)?(Et(e,r),ii(e,t)):t}const jt=e=>e instanceof C?{...e}:e,li=e=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter(t=>Object.getOwnPropertyDescriptor(e,t).enumerable)):Object.keys(e);function re(e,t){e=e||{},t=t||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(p,h,b,k){return o.isPlainObject(p)&&o.isPlainObject(h)?o.merge.call({caseless:k},p,h):o.isPlainObject(h)?o.merge({},h):o.isArray(h)?h.slice():h}function i(p,h,b,k){if(o.isUndefined(h)){if(!o.isUndefined(p))return r(void 0,p,b,k)}else return r(p,h,b,k)}function s(p,h){if(!o.isUndefined(h))return r(void 0,h)}function a(p,h){if(o.isUndefined(h)){if(!o.isUndefined(p))return r(void 0,p)}else return r(void 0,h)}function l(p){const h=o.hasOwnProp(t,"transitional")?t.transitional:void 0;if(!o.isUndefined(h))if(o.isPlainObject(h)){if(o.hasOwnProp(h,p))return h[p]}else return;const b=o.hasOwnProp(e,"transitional")?e.transitional:void 0;if(o.isPlainObject(b)&&o.hasOwnProp(b,p))return b[p]}function d(p,h,b){if(o.hasOwnProp(t,b))return r(p,h);if(o.hasOwnProp(e,b))return r(void 0,p)}const f={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutErrorMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,allowedSocketPaths:a,responseEncoding:a,validateStatus:d,headers:(p,h,b)=>i(jt(p),jt(h),b,!0)};return o.forEach(li({...e,...t}),function(h){if(h==="__proto__"||h==="constructor"||h==="prototype")return;const b=o.hasOwnProp(f,h)?f[h]:i,k=o.hasOwnProp(e,h)?e[h]:void 0,v=o.hasOwnProp(t,h)?t[h]:void 0,j=b(k,v,h);o.isUndefined(j)&&b!==d||(n[h]=j)}),o.hasOwnProp(t,"validateStatus")&&o.isUndefined(t.validateStatus)&&l("validateStatusUndefinedResolves")===!1&&(o.hasOwnProp(e,"validateStatus")?n.validateStatus=r(void 0,e.validateStatus):delete n.validateStatus),n}const ci=["content-type","content-length"];function di(e,t,n){if(n!=="content-only"){e.set(t);return}Object.entries(t||{}).forEach(([r,i])=>{ci.includes(r.toLowerCase())&&e.set(r,i)})}const ui=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16)));function cn(e){const t=re({},e),n=b=>o.hasOwnProp(t,b)?t[b]:void 0,r=n("data");let i=n("withXSRFToken");const s=n("xsrfHeaderName"),a=n("xsrfCookieName");let l=n("headers");const d=n("auth"),f=n("baseURL"),p=n("allowAbsoluteUrls"),h=n("url");if(t.headers=l=C.from(l),t.url=Qt(ln(f,h,p,t),n("params"),n("paramsSerializer")),d){const b=o.getSafeProp(d,"username")||"",k=o.getSafeProp(d,"password")||"";try{l.set("Authorization","Basic "+btoa(b+":"+(k?ui(k):"")))}catch(v){throw m.from(v,m.ERR_BAD_OPTION_VALUE,e)}}if(o.isFormData(r)){const b=o.getSafeProp(r,"getHeaders");A.hasStandardBrowserEnv||A.hasStandardBrowserWebWorkerEnv||o.isReactNative(r)?l.setContentType(void 0):o.isFunction(b)&&di(l,b.call(r),n("formDataHeaderPolicy"))}if(A.hasStandardBrowserEnv&&(o.isFunction(i)&&(i=i(t)),i===!0||i==null&&ti(t.url))){const k=s&&a&&ni.read(a);k&&l.set(s,k)}return t}const pi=typeof XMLHttpRequest<"u",fi=pi&&function(e){return new Promise(function(n,r){const i=cn(e);let s=i.data;const a=C.from(i.headers).normalize();let{responseType:l,onUploadProgress:d,onDownloadProgress:f}=i,p,h,b,k,v,j;function T(){k&&k(),v&&v(),i.cancelToken&&i.cancelToken.unsubscribe(p),i.signal&&i.signal.removeEventListener("abort",p)}let u=new XMLHttpRequest;u.open(i.method.toUpperCase(),i.url,!0),u.timeout=i.timeout;function g(x){if(!u)return;if(u.status===0&&(Me(on(i.url))||Me(A.origin))!=="file"&&!(u.responseURL&&u.responseURL.startsWith("file:"))){r(new m("Request aborted",m.ECONNABORTED,e,u)),T(),u=null;return}try{x?j&&j(x):v&&v()}catch(F){setTimeout(()=>{throw F})}if(!u)return;const O=C.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),R={data:!l||l==="text"||l==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:O,config:e,request:u};an(function(G){n(G),T()},function(G){r(G),T()},R),u=null}"onloadend"in u?u.onloadend=g:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.startsWith("file:"))||setTimeout(g)},u.onabort=function(){u&&(r(new m("Request aborted",m.ECONNABORTED,e,u)),T(),u=null)},u.onerror=function(O){const P=O&&O.message?O.message:"Network Error",R=new m(P,m.ERR_NETWORK,e,u);R.event=O||null,r(R),T(),u=null},u.ontimeout=function(){let O=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const P=i.transitional||Ze;i.timeoutErrorMessage&&(O=i.timeoutErrorMessage),r(new m(O,P.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,u)),T(),u=null},s===void 0&&a.setContentType(null),"setRequestHeader"in u&&o.forEach(Jt(a),function(O,P){u.setRequestHeader(P,O)}),o.isUndefined(i.withCredentials)||(u.withCredentials=!!i.withCredentials),l&&l!=="json"&&(u.responseType=i.responseType),f&&([b,v,j]=Ne(f,!0),u.addEventListener("progress",b)),d&&u.upload&&([h,k]=Ne(d),u.upload.addEventListener("progress",h),u.upload.addEventListener("loadend",k)),(i.cancelToken||i.signal)&&(p=x=>{u&&(r(!x||x.type?new we(null,e,u):x),u.abort(),T(),u=null)},i.cancelToken&&i.cancelToken.subscribe(p),i.signal&&(i.signal.aborted?p():i.signal.addEventListener("abort",p)));const w=Me(i.url);if(w&&!A.protocols.includes(w)){r(new m("Unsupported protocol "+w+":",m.ERR_BAD_REQUEST,e)),T();return}u.send(s||null)})},hi=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;const n=new AbortController;let r=!1;const i=function(d){if(!r){r=!0,a();const f=d instanceof Error?d:this.reason;n.abort(f instanceof m?f:new we(f instanceof Error?f.message:f))}};let s=t&&setTimeout(()=>{s=null,i(new m(`timeout of ${t}ms exceeded`,m.ETIMEDOUT))},t);const a=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(d=>{d.unsubscribe?d.unsubscribe(i):d.removeEventListener("abort",i)}),e=null)};e.forEach(d=>{if(!r){if(d.aborted){i.call(d);return}d.addEventListener("abort",i,{once:!0})}});const{signal:l}=n;return l.unsubscribe=()=>o.asap(a),l},mi=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},gi=async function*(e,t){for await(const n of bi(e))yield*mi(n,t)},bi=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Rt=(e,t,n,r)=>{const i=gi(e,t);let s=0,a,l=d=>{a||(a=!0,r&&r(d))};return new ReadableStream({async pull(d){try{const{done:f,value:p}=await i.next();if(f){l(),d.close();return}let h=p.byteLength;if(n){let b=s+=h;n(b)}d.enqueue(new Uint8Array(p))}catch(f){throw l(f),f}},cancel(d){return l(d),i.return()}},{highWaterMark:2})},St=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,dn=(e,t,n)=>t+2<n&&St(e.charCodeAt(t+1))&&St(e.charCodeAt(t+2)),Tt=e=>e<=57?e-48:(e&223)-55,xi=e=>e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===47||e===45||e===95,yi=e=>e===9||e===10||e===12||e===13||e===32,wi=e=>{const t=Math.floor(e/4),n=e%4;return t*3+(n===2?1:n===3?2:0)},ki=e=>{const t=e.length;let n=0;return t>0&&e.charCodeAt(t-1)===61&&(n++,t>1&&e.charCodeAt(t-2)===61&&n++),Math.floor((t-n)*3/4)},vi=e=>{const t=e.length;let n=0,r=0,i=!1;for(let s=0;s<t;s++){let a=e.charCodeAt(s);if(a===37&&dn(e,s,t)&&(a=Tt(e.charCodeAt(s+1))*16+Tt(e.charCodeAt(s+2)),s+=2),!yi(a)){if(a===61){r++;continue}if(!xi(a)||r>0){i=!0;continue}n++}}return i||r>2||r>0&&(n+r)%4!==0||n%4===1?ki(e):wi(n)},Ei=(e,t)=>{if(!e||typeof e!="string"||!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n<0)return 0;const r=e.slice(5,n),i=e.slice(n+1);if(/;base64/i.test(r))return t(i);let a=0;for(let l=0,d=i.length;l<d;l++){const f=i.charCodeAt(l);if(f===37&&dn(i,l,d))a+=1,l+=2;else if(f<128)a+=1;else if(f<2048)a+=2;else if(f>=55296&&f<=56319&&l+1<d){const p=i.charCodeAt(l+1);p>=56320&&p<=57343?(a+=4,l++):a+=3}else a+=3}return a};function ji(e){const t=typeof e=="string"?e.indexOf("#"):-1;return Ei(t===-1?e:e.slice(0,t),vi)}const et="1.20.0",Ot=64*1024,Ri={cache:"default",redirect:"follow",referrer:"about:client",referrerPolicy:"",mode:"cors",integrity:"",keepalive:!1,priority:"auto",window:null},{isFunction:je}=o,Si=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(t,n)=>String.fromCharCode(parseInt(n,16))),At=e=>{if(!o.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},Nt=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Ti=e=>{const t=e.indexOf("://");let n=e;return t!==-1&&(n=n.slice(t+3)),n.includes("@")||n.includes(":")},Oi=e=>{const t=o.global!==void 0&&o.global!==null?o.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=o.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);const{fetch:i,Request:s,Response:a}=e,l=i?je(i):typeof fetch=="function",d=je(s),f=je(a);if(!l)return!1;const p=l&&je(n),h=l&&(typeof r=="function"?(u=>g=>u.encode(g))(new r):async u=>new Uint8Array(await new s(u).arrayBuffer())),b=d&&p&&Nt(()=>{let u=!1;const g=new s(A.origin,{body:new n,method:"POST",get duplex(){return u=!0,"half"}}),w=g.headers.has("Content-Type");return g.body!=null&&g.body.cancel(),u&&!w}),k=f&&p&&Nt(()=>o.isReadableStream(new a("").body)),v={stream:k&&(u=>u.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(u=>{!v[u]&&(v[u]=(g,w)=>{let x=g&&g[u];if(x)return x.call(g);throw new m(`Response type '${u}' is not supported`,m.ERR_NOT_SUPPORT,w)})});const j=async u=>{if(u==null)return 0;if(o.isBlob(u))return u.size;if(o.isSpecCompliantForm(u))return(await new s(A.origin,{method:"POST",body:u}).arrayBuffer()).byteLength;if(o.isArrayBufferView(u)||o.isArrayBuffer(u))return u.byteLength;if(o.isURLSearchParams(u)&&(u=u+""),o.isString(u))return(await h(u)).byteLength},T=async(u,g)=>{const w=o.toFiniteNumber(u.getContentLength());return w??j(g)};return async u=>{let{url:g,method:w,data:x,signal:O,cancelToken:P,timeout:R,onDownloadProgress:F,onUploadProgress:G,responseType:W,headers:V,withCredentials:ke="same-origin",fetchOptions:Ce,maxContentLength:B,maxBodyLength:ve,maxRedirects:mn}=cn(u);const ce=o.isNumber(B)&&B>-1,De=o.isNumber(ve)&&ve>-1,gn=E=>o.hasOwnProp(u,E)?u[E]:void 0;let nt=i||fetch;W=W?(W+"").toLowerCase():"text";let $=hi([O,P&&P.toAbortSignal()],R),N=null;const Y=$&&$.unsubscribe&&(()=>{$.unsubscribe()});let ie,de=null;const rt=()=>new m("Request body larger than maxBodyLength limit",m.ERR_BAD_REQUEST,u,N);try{let E;const L=gn("auth");if(L){const y=o.getSafeProp(L,"username")||"",z=o.getSafeProp(L,"password")||"";E={username:y,password:z}}if(Ti(g)){const y=new URL(g,A.origin);if(!E&&(y.username||y.password)){const z=At(y.username),K=At(y.password);E={username:z,password:K}}(y.username||y.password)&&(y.username="",y.password="",g=y.href)}if(E&&(V.delete("authorization"),V.set("Authorization","Basic "+btoa(Si((E.username||"")+":"+(E.password||""))))),ce&&typeof g=="string"&&g.startsWith("data:")&&ji(g)>B)throw new m("maxContentLength size of "+B+" exceeded",m.ERR_BAD_RESPONSE,u,N);if(De&&w!=="get"&&w!=="head"){const y=await j(x);if(typeof y=="number"&&isFinite(y)&&(ie=y,y>ve))throw rt()}const Ee=De&&(o.isReadableStream(x)||o.isStream(x)),it=(y,z,K)=>Rt(y,Ot,X=>{if(De&&X>ve)throw de=rt();z&&z(X)},K);if(b&&w!=="get"&&w!=="head"&&(G||Ee)){if(ie=ie??await T(V,x),ie!==0||Ee){let y=new s(g,{method:"POST",body:x,duplex:"half"}),z;if(o.isFormData(x)&&(z=y.headers.get("content-type"))&&V.setContentType(z),y.body){const[K,X]=G&&kt(ie,Ne(vt(G)))||[];x=it(y.body,K,X)}}}else if(Ee&&!d&&p&&w!=="get"&&w!=="head")x=it(x);else if(Ee&&d&&!b&&w!=="get"&&w!=="head")throw new m("Stream request bodies are not supported by the current fetch implementation",m.ERR_NOT_SUPPORT,u,N);o.isString(ke)||(ke=ke?"include":"omit");const bn=d&&"credentials"in s.prototype;if(o.isFormData(x)){const y=V.getContentType();y&&/^multipart\/form-data/i.test(y)&&!/boundary=/i.test(y)&&V.delete("content-type")}V.set("User-Agent","axios/"+et,!1);const I=Ce==null?Ce:Object.assign(Object.create(null),Ce);I&&(delete I.body,delete I.headers,delete I.method,delete I.signal,delete I.duplex,delete I.credentials);const M=Object.assign(Object.create(null),I,{signal:$,method:w.toUpperCase(),headers:Jt(V.normalize()),body:x,duplex:"half",credentials:bn?ke:void 0});d&&(o.forEach(Ri,(y,z)=>{M[z]===void 0&&(M[z]=y)}),M.signal===void 0&&(M.signal=null),M.body===void 0&&(M.body=null)),mn===0&&(M.redirect="manual",I&&(I.redirect="manual")),N=d&&new s(g,M);let q=await(d?nt(N,I):nt(g,M));const st=C.from(q.headers);if(ce){const y=o.toFiniteNumber(st.getContentLength());if(y!=null&&y>B)throw new m("maxContentLength size of "+B+" exceeded",m.ERR_BAD_RESPONSE,u,N)}const Le=k&&(W==="stream"||W==="response");if(k&&q.body&&(F||ce||Le&&Y)){const y={};["status","statusText","headers"].forEach(ue=>{y[ue]=q[ue]});const z=o.toFiniteNumber(st.getContentLength()),[K,X]=F&&kt(z,Ne(vt(F),!0))||[];let at=0;const xn=ue=>{if(ce&&(at=ue,at>B))throw new m("maxContentLength size of "+B+" exceeded",m.ERR_BAD_RESPONSE,u,N);K&&K(ue)};q=new a(Rt(q.body,Ot,xn,()=>{X&&X(),Y&&Y()}),y)}W=W||"text";let H=await v[o.findKey(v,W)||"text"](q,u);if(ce&&!k&&!Le){let y;if(H!=null&&(typeof H.byteLength=="number"?y=H.byteLength:typeof H.size=="number"?y=H.size:typeof H=="string"&&(y=typeof r=="function"?new r().encode(H).byteLength:H.length)),typeof y=="number"&&y>B)throw new m("maxContentLength size of "+B+" exceeded",m.ERR_BAD_RESPONSE,u,N)}return!Le&&Y&&Y(),await new Promise((y,z)=>{an(y,z,{data:H,headers:C.from(q.headers),status:q.status,statusText:q.statusText,config:u,request:N})})}catch(E){if(Y&&Y(),$&&$.aborted&&$.reason instanceof m){const L=$.reason;throw L.config=u,N&&(L.request=N),E!==L&&Object.defineProperty(L,"cause",{__proto__:null,value:E,writable:!0,enumerable:!1,configurable:!0}),L}if(de)throw N&&!de.request&&(de.request=N),de;if(E instanceof m)throw N&&!E.request&&(E.request=N),E;if(E&&E.name==="TypeError"&&/Load failed|fetch/i.test(E.message)){const L=new m("Network Error",m.ERR_NETWORK,u,N,E&&E.response);throw Object.defineProperty(L,"cause",{__proto__:null,value:E.cause||E,writable:!0,enumerable:!1,configurable:!0}),L}throw m.from(E,E&&E.code,u,N,E&&E.response)}}},Ai=new Map,un=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:i}=t,s=[r,i,n];let a=s.length,l=a,d,f,p=Ai;for(;l--;)d=s[l],f=p.get(d),f===void 0&&p.set(d,f=l?new Map:Oi(t)),p=f;return f};un();const tt={http:Lr,xhr:fi,fetch:{get:un}};o.forEach(tt,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});const Pt=e=>`- ${e}`,Ni=e=>o.isFunction(e)||e===null||e===!1;function Pi(e,t){e=o.isArray(e)?e:[e];const{length:n}=e;let r,i;const s={};for(let a=0;a<n;a++){r=e[a];let l;if(i=r,!Ni(r)&&(i=tt[(l=String(r)).toLowerCase()],i===void 0))throw new m(`Unknown adapter '${l}'`);if(i&&(o.isFunction(i)||(i=i.get(t))))break;s[l||"#"+a]=i}if(!i){const a=Object.entries(s).map(([d,f])=>`adapter ${d} `+(f===!1?"is not supported by the environment":"is not available in the build"));let l=n?a.length>1?`since :
`+a.map(Pt).join(`
`):" "+Pt(a[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+l,m.ERR_NOT_SUPPORT)}return i}const pn={getAdapter:Pi,adapters:tt};function qe(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new we(null,e)}function He(e){const t=o.toSafeFlatObject(e);return qe(t),t.headers=C.from(o.getSafeProp(t,"headers")),t.data=Be.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),pn.getAdapter(t.adapter||ye.adapter,t)(t).then(function(i){qe(t),t.response=i;try{i.data=Be.call(t,t.transformResponse,i)}finally{delete t.response}return i.headers=C.from(i.headers),i},function(i){if(!sn(i)&&(qe(t),i&&i.response)){t.response=i.response;try{i.response.data=Be.call(t,t.transformResponse,i.response)}finally{delete t.response}i.response.headers=C.from(i.response.headers)}return Promise.reject(i)})}const _e={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{_e[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const zt={};_e.transitional=function(t,n,r){function i(s,a){return"[Axios v"+et+"] Transitional option '"+s+"'"+a+(r?". "+r:"")}return(s,a,l)=>{if(t===!1)throw new m(i(a," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!zt[a]&&(zt[a]=!0,console.warn(i(a," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(s,a,l):!0}};_e.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function zi(e,t,n){if(typeof e!="object"||e===null)throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const s=r[i],a=Object.prototype.hasOwnProperty.call(t,s)?t[s]:void 0;if(a){const l=e[s],d=l===void 0||a(l,s,e);if(d!==!0)throw new m("option "+s+" must be "+d,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+s,m.ERR_BAD_OPTION)}}const Te={assertOptions:zi,validators:_e},_=Te.validators;let ee=class{constructor(t){this.defaults=t||{},this.interceptors={request:new yt,response:new yt}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error)try{let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const s=i.stack;let a="";if(typeof s=="string"){const l=s.indexOf(`
`);a=l===-1?"":s.slice(l+1)}if(!r.stack)r.stack=a;else if(a){const l=a.indexOf(`
`),d=l===-1?-1:a.indexOf(`
`,l+1),f=d===-1?"":a.slice(d+1);String(r.stack).endsWith(f)||(r.stack+=`
`+a)}}catch{}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=re(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:s}=n;r!==void 0&&Te.assertOptions(r,{silentJSONParsing:_.transitional(_.boolean),forcedJSONParsing:_.transitional(_.boolean),clarifyTimeoutError:_.transitional(_.boolean),legacyInterceptorReqResOrdering:_.transitional(_.boolean),advertiseZstdAcceptEncoding:_.transitional(_.boolean),validateStatusUndefinedResolves:_.transitional(_.boolean)},!1),i!=null&&(o.isFunction(i)?n.paramsSerializer={serialize:i}:Te.assertOptions(i,{encode:_.function,serialize:_.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Te.assertOptions(n,{baseUrl:_.spelling("baseURL"),withXsrfToken:_.spelling("withXSRFToken")},!0),n.method=(o.getSafeProp(n,"method")||o.getSafeProp(this.defaults,"method")||"get").toLowerCase();let a=s&&o.merge(s.common,s[n.method]);s&&o.forEach(rn.concat("common"),v=>{delete s[v]}),n.headers=C.concat(a,s);const l=[];let d=!0;this.interceptors.request.forEach(function(j){if(typeof j.runWhen=="function"&&j.runWhen(n)===!1)return;d=d&&j.synchronous;const T=n.transitional||Ze;T&&T.legacyInterceptorReqResOrdering?l.unshift(j.fulfilled,j.rejected):l.push(j.fulfilled,j.rejected)});const f=[];this.interceptors.response.forEach(function(j){f.push(j.fulfilled,j.rejected)});let p,h=0,b;if(!d){const v=[He.bind(this),void 0];for(v.unshift(...l),v.push(...f),b=v.length,p=Promise.resolve(n);h<b;)p=p.then(v[h++],v[h++]);return p}b=l.length;let k=n;for(;h<b;){const v=l[h++],j=l[h++];try{k=v?v(k):k}catch(T){if(!j){p=Promise.reject(T);break}try{const u=j.call(this,T);o.isThenable(u)&&(p=Promise.resolve(u).then(()=>He.call(this,k)))}catch(u){p=Promise.reject(u)}break}}if(!p)try{p=He.call(this,k)}catch(v){p=Promise.reject(v)}for(h=0,b=f.length;h<b;)p=p.then(f[h++],f[h++]);return p}getUri(t){t=re(this.defaults,t);const n=ln(t.baseURL,t.url,t.allowAbsoluteUrls,t);return Qt(n,t.params,t.paramsSerializer)}};o.forEach(["delete","get","head","options"],function(t){ee.prototype[t]=function(n,r){return this.request(re(r||{},{method:t,url:n,data:r&&o.hasOwnProp(r,"data")?r.data:void 0}))}});o.forEach(["post","put","patch","query"],function(t){function n(r){return function(s,a,l){return this.request(re(l||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:a}))}}ee.prototype[t]=n(),t!=="query"&&(ee.prototype[t+"Form"]=n(!0))});let _i=class fn{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const r=this;this.promise.then(i=>{if(!r._listeners)return;let s=r._listeners.length;for(;s-- >0;)r._listeners[s](i);r._listeners=null}),this.promise.then=i=>{let s;const a=new Promise(l=>{r.subscribe(l),s=l}).then(i);return a.cancel=function(){r.unsubscribe(s)},a},t(function(s,a,l){r.reason||(r.reason=new we(s,a,l),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new fn(function(i){t=i}),cancel:t}}};function Ci(e){return function(n){return e.apply(null,n)}}function Di(e){return o.isObject(e)&&e.isAxiosError===!0}const Oe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,ContentTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,UnprocessableContent:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Oe).forEach(([e,t])=>{Oe[t]===void 0&&(Oe[t]=e)});function hn(e){const t=new ee(e),n=Ut(ee.prototype.request,t);return o.extend(n,ee.prototype,t,{allOwnKeys:!0}),o.extend(n,t,null,{allOwnKeys:!0}),n.create=function(i){return hn(re(e,i))},n}const S=hn(ye);S.Axios=ee;S.CanceledError=we;S.CancelToken=_i;S.isCancel=sn;S.VERSION=et;S.toFormData=ze;S.AxiosError=m;S.Cancel=S.CanceledError;S.all=function(t){return Promise.all(t)};S.spread=Ci;S.isAxiosError=Di;S.mergeConfig=re;S.AxiosHeaders=C;S.formToJSON=e=>nn(o.isHTMLForm(e)?new FormData(e):e);S.getAdapter=pn.getAdapter;S.HttpStatusCode=Oe;S.default=S;const{Axios:es,AxiosError:ts,CanceledError:ns,isCancel:rs,CancelToken:is,VERSION:ss,all:as,Cancel:os,isAxiosError:ls,spread:cs,toFormData:ds,AxiosHeaders:us,HttpStatusCode:ps,formToJSON:fs,getAdapter:hs,mergeConfig:ms,create:gs}=S;const Li=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],_t=Je("arrow-down",Li);const Ui=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Ct=Je("arrow-up",Ui);const Ii=[["path",{d:"M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",key:"17lmqv"}]],Dt=Je("heart-handshake",Ii),Lt={rw:{metaTitle:"Agahinda Gakabije | Ubuzima bwo mu Mutwe",heroEyebrow:"UBUZIMA BWO MU MUTWE",heroTitle:"AGAHINDA GAKABIJE",heroDescription:"Menya byinshi ku gahinda gakabije, ibimenyetso byako, uko gashobora kugira ingaruka ku buzima ndetse n'akamaro ko gushaka ubufasha hakiri kare.",heroPrimary:"Soma byinshi",heroSecondary:"Shaka ubufasha",introEyebrow:"UBUMENYI KU GAHINDA GAKABIJE",introTitle:"Gusobanukirwa agahinda gakabije ni intambwe ya mbere yo gushaka ubufasha.",introText:"Agahinda gakabije ni imwe mu ndwara zo mu mutwe ikunze kugaragara ku bantu benshi ku isi. Gashobora kugira ingaruka ku buzima bwa buri munsi, ku mibanire n'abandi ndetse no ku bushobozi bwo gukora ibikorwa bisanzwe.",introText2:"Kumenya ibimenyetso no kumenya igihe cyo gushaka ubufasha bishobora gufasha umuntu kubona ubufasha bukwiye hakiri kare.",factsEyebrow:"IMIBARE Y'INGENZI",factsTitle:"Agahinda gakabije ni ikibazo kigomba kwitabwaho.",facts:[{value:"350M+",label:"Abantu ku isi babana n'agahinda gakabije"},{value:"9.1%",label:"By'abaturage mu Rwanda bagize major depressive episode"},{value:"17.8%",label:"By'abacitse ku icumu rya Jenoside bagize major depressive episode"},{value:"15–29",label:"Imyaka aho kwiyahura ari imwe mu mpamvu zikomeye z'urupfu"}],rwandaEyebrow:"MU RWANDA",rwandaTitle:"Agahinda gakabije mu Rwanda",rwandaText:"Ubushakashatsi ku buzima bwo mu mutwe bwakorewe mu Rwanda mu 2025 bugaragaza ko 9.1% by'abaturage muri rusange bagize nibura igice cy'agahinda gakabije (major depressive episode).",rwandaText2:"Mu barokotse Jenoside yakorewe Abatutsi mu 1994, 17.8% bagize igice cy'agahinda gakabije. Muri aba barokotse, 21.4% ni abagore naho 11.3% ni abagabo.",symptomsEyebrow:"IBIMENYETSO",symptomsTitle:"Ibimenyetso by'agahinda gakabije",symptomsIntro:"Ibimenyetso bishobora gutandukana ku muntu umwe n'undi. Iyo bimara igihe kandi bigira ingaruka ku mikorere ya buri munsi, ni ngombwa gushaka inama y'umuhanga.",symptoms:["Kubabara umutima cyangwa kutagira icyo wifuza.","Kubura ubushake bwo gukora ibikorwa bisanzwe.","Kwiheba cyangwa intege nke bigira ingaruka ku bikorwa bya buri munsi.","Kumva ufite icyaha cyangwa kwiyumva nta gaciro ufite.","Guhinduka mu buryo bwo gusinzira cyangwa kurya.","Kunanirwa cyane.","Kugira ingorane mu gutekereza cyangwa kwibanda ku kintu.","Kudashobora gukora neza akazi, kwiga cyangwa kwiyitaho.","Agahinda gakabije gashobora kongera kugaruka iyo kadavuwe cyangwa kadakemuwe hakiri kare."],severityEyebrow:"UBUREMERE",severityTitle:"Agahinda gakabije gashobora kugira urwego rutandukanye.",severity:[{title:"Gake",description:"Ibimenyetso bishobora kuba bike ariko bikagira ingaruka ku mikorere ya buri munsi."},{title:"Gaciriritse",description:"Ibimenyetso bishobora kuba byinshi kandi bigatangira kugira ingaruka zikomeye ku buzima bwa buri munsi."},{title:"Gakomeye",description:"Ibimenyetso biba byinshi kandi bishobora kugira ingaruka zikomeye ku buzima no ku mikorere y'umuntu."}],relapse:"Agahinda gakabije gashobora kongera kugaruka, bityo gutangira ubufasha no kuvurwa hakiri kare ni ingenzi.",causesEyebrow:"IMPAMVU N'UKUKUMIRA",causesTitle:"Ibintu bishobora kugira uruhare mu gahinda gakabije",causesIntro:"Agahinda gakabije gashobora guterwa cyangwa kongerwa n'ibintu bitandukanye. Gusobanukirwa ibi bintu bishobora gufasha mu gushaka ubufasha no kwirinda ibibazo bikomeye.",causes:[{title:"Imibanire n'amarangamutima",text:"Imibanire n'abandi, amarangamutima n'imitekerereze bishobora kugira uruhare ku buzima bwo mu mutwe."},{title:"Ibyabaye bikomeye",text:"Kubura uwo ukunda, guhura n'ihungabana cyangwa gutakaza akazi bishobora kongera ibyago byo kugira agahinda gakabije."},{title:"Ubuzima bw'umubiri",text:"Ibibazo by'ubuzima bw'umubiri, urugero nk'indwara z'umutima, bishobora kugira uruhare mu gutera agahinda gakabije."},{title:"Imibereho myiza",text:"Agahinda gakabije gashobora kugira ingaruka ku buzima, imibereho myiza no ku mikorere y'umuntu."}],preventionTitle:"Kwirinda no kwita ku buzima bwo mu mutwe",preventionText:"Kwirinda bishobora gukorwa binyuze mu kwigishwa no guhugurwa ku mitekerereze myiza no gukora imyitozo ngororamubiri buri gihe.",adviceEyebrow:"INAMA",adviceTitle:"Icyo wakora",advice:["Menya ibimenyetso by'agahinda gakabije kandi wirinde kugira isoni zo gushaka ubufasha.","Jya ukora ibikorwa bishimisha cyangwa imyidagaduro.","Shaka abantu mwaganira cyangwa mugakorana ibikorwa.","Kora imyitozo ngororamubiri buri gihe.","Shaka ubufasha kwa muganga, umuganga w'indwara zo mu mutwe cyangwa undi muhanga mu buzima bwo mu mutwe.","Menya ibimenyetso by'agahinda gakabije ku bagize umuryango cyangwa inshuti, ubashishikarize gushaka ubufasha.","Umva kandi ushyigikire abantu bafite agahinda gakabije n'abo babana."],supportEyebrow:"SHAKA UBUFASHA",supportTitle:"Nta mpamvu yo guhangana n'agahinda gakabije wenyine.",supportText:"Kuganira n'umuntu wizewe cyangwa umuhanga mu buzima bwo mu mutwe bishobora kuba intambwe ikomeye yo kubona ubufasha bukwiye.",supportButton:"Shaka ubufasha",important:"ICY'INGENZI",importantText:"Aya makuru ni ayo kwigisha no gutanga ubumenyi; ntabwo asimbura isuzuma cyangwa inama by'umuhanga mu buzima bwo mu mutwe.",urgent:"Niba umuntu ari mu kaga ako kanya cyangwa ashobora gukora ibyo yatekereje byo kwiyahura, shakisha ubufasha bwihutirwa kwa serivisi z'ubutabazi, ku kigo nderabuzima cyangwa ku muntu wizewe.",backTop:"Subira hejuru"},en:{metaTitle:"Depression | Mental Health",heroEyebrow:"MENTAL HEALTH",heroTitle:"DEPRESSION",heroDescription:"Learn about depression, its symptoms, its impact on everyday life, and why seeking support early can make a difference.",heroPrimary:"Learn more",heroSecondary:"Get support",introEyebrow:"UNDERSTANDING DEPRESSION",introTitle:"Understanding depression is an important first step toward seeking support.",introText:"Depression is one of the most common mental health conditions in the world. It can affect daily life, relationships, and the ability to carry out usual activities.",introText2:"Recognizing the signs and knowing when to seek help can support earlier access to appropriate care.",factsEyebrow:"KEY FIGURES",factsTitle:"Depression is a mental health issue that deserves attention.",facts:[{value:"350M+",label:"People worldwide living with depression"},{value:"9.1%",label:"Of Rwanda's general population experienced a major depressive episode"},{value:"17.8%",label:"Of survivors of the 1994 Genocide against the Tutsi experienced a major depressive episode"},{value:"15–29",label:"Age group where suicide is one of the leading causes of death"}],rwandaEyebrow:"IN RWANDA",rwandaTitle:"Depression in Rwanda",rwandaText:"The Rwanda Mental Health Survey 2025 shows that 9.1% of the general population experienced a major depressive episode.",rwandaText2:"Among survivors of the 1994 Genocide against the Tutsi, 17.8% experienced a major depressive episode. Among these survivors, 21.4% were women and 11.3% were men.",symptomsEyebrow:"SYMPTOMS",symptomsTitle:"Symptoms of depression",symptomsIntro:"Symptoms can vary from person to person. When they persist and affect everyday functioning, it is important to seek advice from a mental health professional.",symptoms:["Persistent sadness or lack of interest.","Loss of motivation to do usual activities.","Discouragement or weakness that affects daily activities.","Feelings of guilt or low self-worth.","Changes in sleep or appetite.","Extreme tiredness.","Difficulty thinking or concentrating.","Difficulty functioning at work, school, or in self-care.","Depression can recur if it is not treated or addressed early."],severityEyebrow:"SEVERITY",severityTitle:"Depression can occur at different levels of severity.",severity:[{title:"Mild",description:"There may be fewer symptoms, but they can still affect daily functioning."},{title:"Moderate",description:"Symptoms may be more noticeable and begin to have a stronger effect on everyday life."},{title:"Severe",description:"Symptoms are more intense and can significantly affect health and daily functioning."}],relapse:"Depression can recur, so early treatment and support are important.",causesEyebrow:"CAUSES & PREVENTION",causesTitle:"Factors that can contribute to depression",causesIntro:"Depression can be influenced by different factors. Understanding these factors can support prevention and earlier access to help.",causes:[{title:"Relationships & emotions",text:"Relationships, emotions, and thought patterns can influence mental wellbeing."},{title:"Difficult life events",text:"Bereavement, trauma, or job loss can increase the risk of depression."},{title:"Physical health",text:"Physical health problems, such as heart disease, can contribute to depression."},{title:"Wellbeing & functioning",text:"Depression can affect health, wellbeing, relationships, and everyday functioning."}],preventionTitle:"Prevention and mental wellbeing",preventionText:"Prevention can include education and training on positive thinking as well as regular physical exercise.",adviceEyebrow:"ADVICE",adviceTitle:"What to do",advice:["Recognize the symptoms of depression and do not be ashamed to seek help.","Take part in enjoyable or recreational activities.","Find people you can talk to or do activities with.","Exercise regularly.","Seek help from a doctor, psychiatrist, or other mental health professional.","Recognize signs of depression in family members or friends and encourage them to seek help.","Listen to and support people living with depression and those close to them."],supportEyebrow:"GET SUPPORT",supportTitle:"You do not have to face depression alone.",supportText:"Talking to someone you trust or a mental health professional can be an important step toward getting appropriate support.",supportButton:"Get support",important:"IMPORTANT",importantText:"This information is educational and does not replace assessment or advice from a mental health professional.",urgent:"If someone is in immediate danger or may act on suicidal thoughts, seek urgent help from local emergency services, a health facility, or a trusted person.",backTop:"Back to top"},fr:{metaTitle:"Dépression | Santé mentale",heroEyebrow:"SANTÉ MENTALE",heroTitle:"DÉPRESSION",heroDescription:"Découvrez la dépression, ses symptômes, son impact sur la vie quotidienne et l'importance de demander de l'aide tôt.",heroPrimary:"En savoir plus",heroSecondary:"Obtenir de l'aide",introEyebrow:"COMPRENDRE LA DÉPRESSION",introTitle:"Comprendre la dépression est une première étape importante pour demander de l'aide.",introText:"La dépression est l'un des troubles de santé mentale les plus fréquents dans le monde. Elle peut affecter la vie quotidienne, les relations et la capacité à accomplir les activités habituelles.",introText2:"Reconnaître les signes et savoir quand demander de l'aide peut favoriser un accès plus précoce aux soins appropriés.",factsEyebrow:"CHIFFRES CLÉS",factsTitle:"La dépression est un problème de santé mentale qui mérite toute notre attention.",facts:[{value:"350M+",label:"Personnes vivant avec une dépression dans le monde"},{value:"9,1%",label:"De la population générale du Rwanda ayant connu un épisode dépressif majeur"},{value:"17,8%",label:"Des survivants du Génocide perpétré contre les Tutsi ayant connu un épisode dépressif majeur"},{value:"15–29",label:"Tranche d'âge où le suicide figure parmi les principales causes de décès"}],rwandaEyebrow:"AU RWANDA",rwandaTitle:"La dépression au Rwanda",rwandaText:"L'Enquête sur la santé mentale au Rwanda de 2025 montre que 9,1 % de la population générale ont connu un épisode dépressif majeur.",rwandaText2:"Parmi les survivants du Génocide perpétré contre les Tutsi en 1994, 17,8 % ont connu un épisode dépressif majeur. Parmi ces survivants, 21,4 % étaient des femmes et 11,3 % des hommes.",symptomsEyebrow:"SYMPTÔMES",symptomsTitle:"Symptômes de la dépression",symptomsIntro:"Les symptômes peuvent varier d'une personne à l'autre. Lorsqu'ils persistent et affectent le fonctionnement quotidien, il est important de demander conseil à un professionnel de santé mentale.",symptoms:["Tristesse persistante ou manque d'intérêt.","Perte de motivation pour les activités habituelles.","Découragement ou faiblesse affectant les activités quotidiennes.","Sentiment de culpabilité ou faible estime de soi.","Changements dans le sommeil ou l'appétit.","Fatigue extrême.","Difficulté à penser ou à se concentrer.","Difficultés à fonctionner au travail, à l'école ou à prendre soin de soi.","La dépression peut réapparaître si elle n'est pas traitée ou prise en charge tôt."],severityEyebrow:"GRAVITÉ",severityTitle:"La dépression peut avoir différents niveaux de gravité.",severity:[{title:"Légère",description:"Les symptômes peuvent être moins nombreux, mais ils peuvent tout de même affecter le fonctionnement quotidien."},{title:"Modérée",description:"Les symptômes peuvent être plus visibles et commencer à affecter davantage la vie quotidienne."},{title:"Sévère",description:"Les symptômes sont plus intenses et peuvent fortement affecter la santé et le fonctionnement quotidien."}],relapse:"La dépression peut réapparaître ; un traitement et un soutien précoces sont donc importants.",causesEyebrow:"CAUSES ET PRÉVENTION",causesTitle:"Facteurs pouvant contribuer à la dépression",causesIntro:"La dépression peut être influencée par différents facteurs. Les comprendre peut contribuer à la prévention et à un accès plus précoce à l'aide.",causes:[{title:"Relations et émotions",text:"Les relations, les émotions et les schémas de pensée peuvent influencer le bien-être mental."},{title:"Événements difficiles",text:"Le deuil, les traumatismes ou la perte d'emploi peuvent augmenter le risque de dépression."},{title:"Santé physique",text:"Les problèmes de santé physique, comme les maladies cardiaques, peuvent contribuer à la dépression."},{title:"Bien-être et fonctionnement",text:"La dépression peut affecter la santé, le bien-être, les relations et le fonctionnement quotidien."}],preventionTitle:"Prévention et bien-être mental",preventionText:"La prévention peut inclure l'éducation et la formation à la pensée positive ainsi que la pratique régulière d'une activité physique.",adviceEyebrow:"CONSEILS",adviceTitle:"Que faire",advice:["Reconnaissez les symptômes de la dépression et n'ayez pas honte de demander de l'aide.","Participez à des activités agréables ou récréatives.","Trouvez des personnes avec qui parler ou faire des activités.","Faites régulièrement de l'exercice.","Demandez de l'aide à un médecin, un psychiatre ou un autre professionnel de la santé mentale.","Reconnaissez les signes de dépression chez les membres de la famille ou les amis et encouragez-les à demander de l'aide.","Écoutez et soutenez les personnes vivant avec une dépression ainsi que leurs proches."],supportEyebrow:"OBTENIR DE L'AIDE",supportTitle:"Vous n'avez pas à affronter la dépression seul.",supportText:"Parler à une personne de confiance ou à un professionnel de santé mentale peut être une étape importante pour obtenir le soutien approprié.",supportButton:"Obtenir de l'aide",important:"IMPORTANT",importantText:"Ces informations sont éducatives et ne remplacent pas une évaluation ou les conseils d'un professionnel de santé mentale.",urgent:"Si une personne est en danger immédiat ou risque de passer à l'acte après des pensées suicidaires, demandez une aide urgente auprès des services d'urgence locaux, d'un établissement de santé ou d'une personne de confiance.",backTop:"Retour en haut"},nl:{metaTitle:"Depressie | Geestelijke gezondheid",heroEyebrow:"GEESTELIJKE GEZONDHEID",heroTitle:"DEPRESSIE",heroDescription:"Leer meer over depressie, de symptomen, de invloed op het dagelijks leven en waarom het belangrijk is om vroeg ondersteuning te zoeken.",heroPrimary:"Lees meer",heroSecondary:"Hulp zoeken",introEyebrow:"DEPRESSIE BEGRIJPEN",introTitle:"Depressie begrijpen is een belangrijke eerste stap om ondersteuning te zoeken.",introText:"Depressie is een van de meest voorkomende psychische aandoeningen ter wereld. Het kan invloed hebben op het dagelijks leven, relaties en het vermogen om gewone activiteiten uit te voeren.",introText2:"Het herkennen van signalen en weten wanneer hulp nodig is, kan bijdragen aan vroegtijdige toegang tot passende zorg.",factsEyebrow:"BELANGRIJKE CIJFERS",factsTitle:"Depressie is een psychisch gezondheidsprobleem dat aandacht verdient.",facts:[{value:"350M+",label:"Mensen wereldwijd die met een depressie leven"},{value:"9,1%",label:"Van de algemene bevolking van Rwanda maakte een ernstige depressieve episode door"},{value:"17,8%",label:"Van de overlevenden van de genocide tegen de Tutsi maakte een ernstige depressieve episode door"},{value:"15–29",label:"Leeftijdsgroep waarin zelfdoding een belangrijke doodsoorzaak is"}],rwandaEyebrow:"IN RWANDA",rwandaTitle:"Depressie in Rwanda",rwandaText:"Uit de Mental Health Survey van Rwanda uit 2025 blijkt dat 9,1% van de algemene bevolking een ernstige depressieve episode heeft doorgemaakt.",rwandaText2:"Onder overlevenden van de genocide tegen de Tutsi in 1994 heeft 17,8% een ernstige depressieve episode doorgemaakt. Onder deze overlevenden was 21,4% vrouw en 11,3% man.",symptomsEyebrow:"SYMPTOMEN",symptomsTitle:"Symptomen van depressie",symptomsIntro:"Symptomen kunnen van persoon tot persoon verschillen. Wanneer ze aanhouden en het dagelijks functioneren beïnvloeden, is het belangrijk om advies te vragen aan een professional in de geestelijke gezondheidszorg.",symptoms:["Aanhoudende somberheid of gebrek aan interesse.","Verlies van motivatie om gewone activiteiten te doen.","Ontmoediging of zwakte die het dagelijks functioneren beïnvloedt.","Schuldgevoelens of een laag gevoel van eigenwaarde.","Veranderingen in slaap of eetlust.","Extreme vermoeidheid.","Moeite met denken of concentreren.","Moeite met functioneren op het werk, op school of bij zelfzorg.","Depressie kan terugkomen als deze niet wordt behandeld of niet vroeg wordt aangepakt."],severityEyebrow:"ERNST",severityTitle:"Depressie kan verschillende niveaus van ernst hebben.",severity:[{title:"Licht",description:"Er kunnen minder symptomen zijn, maar deze kunnen nog steeds het dagelijks functioneren beïnvloeden."},{title:"Matig",description:"De symptomen kunnen duidelijker worden en een grotere invloed hebben op het dagelijks leven."},{title:"Ernstig",description:"De symptomen zijn intenser en kunnen de gezondheid en het dagelijks functioneren sterk beïnvloeden."}],relapse:"Depressie kan terugkeren, daarom zijn vroege behandeling en ondersteuning belangrijk.",causesEyebrow:"OORZAKEN EN PREVENTIE",causesTitle:"Factoren die kunnen bijdragen aan depressie",causesIntro:"Depressie kan worden beïnvloed door verschillende factoren. Inzicht hierin kan bijdragen aan preventie en vroegtijdige hulp.",causes:[{title:"Relaties en emoties",text:"Relaties, emoties en denkpatronen kunnen invloed hebben op het mentale welzijn."},{title:"Moeilijke gebeurtenissen",text:"Rouw, trauma of verlies van werk kunnen het risico op depressie vergroten."},{title:"Lichamelijke gezondheid",text:"Lichamelijke gezondheidsproblemen, zoals hartziekten, kunnen bijdragen aan depressie."},{title:"Welzijn en functioneren",text:"Depressie kan invloed hebben op gezondheid, welzijn, relaties en dagelijks functioneren."}],preventionTitle:"Preventie en mentaal welzijn",preventionText:"Preventie kan bestaan uit voorlichting en training over positief denken en regelmatige lichaamsbeweging.",adviceEyebrow:"ADVIES",adviceTitle:"Wat te doen",advice:["Herken de symptomen van depressie en schaam je niet om hulp te zoeken.","Doe mee aan activiteiten die je leuk vindt of aan ontspanning.","Zoek mensen met wie je kunt praten of activiteiten kunt doen.","Beweeg regelmatig.","Zoek hulp bij een arts, psychiater of andere professional in de geestelijke gezondheidszorg.","Herken tekenen van depressie bij familieleden of vrienden en moedig hen aan om hulp te zoeken.","Luister naar en ondersteun mensen die met depressie leven en hun naasten."],supportEyebrow:"HULP ZOEKEN",supportTitle:"Je hoeft depressie niet alleen te doorstaan.",supportText:"Praten met iemand die je vertrouwt of met een professional in de geestelijke gezondheidszorg kan een belangrijke stap zijn naar passende ondersteuning.",supportButton:"Hulp zoeken",important:"BELANGRIJK",importantText:"Deze informatie is educatief en vervangt geen beoordeling of advies van een professional in de geestelijke gezondheidszorg.",urgent:"Als iemand direct gevaar loopt of mogelijk zal handelen naar suïcidale gedachten, zoek dan dringend hulp bij lokale hulpdiensten, een zorginstelling of een vertrouwd persoon.",backTop:"Terug naar boven"}};function Z({children:e,light:t=!1}){return c.jsxs("div",{className:`section-label ${t?"section-label-light":""}`,children:[c.jsx("span",{className:"label-line"}),c.jsx("span",{children:e})]})}function We({light:e=!1}){return c.jsxs("div",{className:`decorative-mark ${e?"decorative-mark-light":""}`,children:[c.jsx("span",{}),c.jsx("span",{}),c.jsx("span",{})]})}function Fi(){return c.jsxs("svg",{className:"mental-art",viewBox:"0 0 620 470",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[c.jsx("rect",{x:"38",y:"38",width:"460",height:"330",rx:"12",stroke:"currentColor",strokeWidth:"2",opacity:".18"}),c.jsx("path",{d:"M82 318C135 247 180 260 223 207C263 158 299 150 345 188C391 226 414 184 477 113",stroke:"currentColor",strokeWidth:"3",opacity:".3"}),c.jsx("circle",{cx:"477",cy:"113",r:"11",fill:"currentColor",opacity:".55"}),c.jsx("circle",{cx:"155",cy:"162",r:"57",fill:"currentColor",opacity:".08"}),c.jsx("circle",{cx:"155",cy:"162",r:"35",stroke:"currentColor",strokeWidth:"2",opacity:".35"}),c.jsx("path",{d:"M143 154C149 147 159 147 166 154",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"}),c.jsx("path",{d:"M141 176C150 184 162 184 171 176",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"}),c.jsx("path",{d:"M340 278C340 242 368 216 403 216C438 216 466 242 466 278V329H340V278Z",fill:"currentColor",opacity:".07"}),c.jsx("path",{d:"M362 325V276C362 252 380 234 403 234C426 234 444 252 444 276V325",stroke:"currentColor",strokeWidth:"3",opacity:".45"}),c.jsx("path",{d:"M386 272C391 266 399 266 404 272",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"}),c.jsx("path",{d:"M406 272C411 266 419 266 424 272",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"}),c.jsx("path",{d:"M389 295C399 302 411 302 421 295",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"}),c.jsx("circle",{cx:"105",cy:"89",r:"4",fill:"currentColor",opacity:".5"}),c.jsx("circle",{cx:"528",cy:"252",r:"6",fill:"currentColor",opacity:".25"}),c.jsx("path",{d:"M76 396H530",stroke:"currentColor",strokeWidth:"2",opacity:".15"})]})}function bs(){const[e,t]=se.useState(()=>ot()||"rw"),[n,r]=se.useState(!1);se.useEffect(()=>{const l=()=>{t(ot()||"rw")};return window.addEventListener(lt,l),()=>{window.removeEventListener(lt,l)}},[]),se.useEffect(()=>{const l=()=>{r(window.scrollY>600)};return window.addEventListener("scroll",l),()=>{window.removeEventListener("scroll",l)}},[]),se.useEffect(()=>{S.post(route("page-views.store"),{page:"depression",url:window.location.href,language:e}).catch(l=>{console.error("Page view tracking failed:",l)})},[]);const i=se.useMemo(()=>Lt[e]||Lt.rw,[e]),s=l=>{document.getElementById(l)?.scrollIntoView({behavior:"smooth",block:"start"})},a=()=>{window.scrollTo({top:0,behavior:"smooth"})};return c.jsxs(wn,{children:[c.jsx(yn,{title:i.metaTitle}),c.jsx("style",{children:`
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
                    min-height: 620px;
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
                    padding: 92px 0;
                }

                .section-soft {
                    background: var(--mental-sand);
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
                    max-width: 730px;
                    margin: 0;
                    font-size: clamp(29px, 4vw, 43px);
                    line-height: 1.07;
                    letter-spacing: -.035em;
                    font-weight: 780;
                }

                .section-lead {
                    max-width: 720px;
                    margin: 20px 0 0;
                    color: var(--mental-muted);
                    font-size: 14px;
                    line-height: 1.85;
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
                    grid-template-columns: .95fr 1.05fr;
                    gap: 75px;
                    align-items: center;
                }

                .intro-visual {
                    position: relative;
                    min-height: 470px;
                }

                .intro-image {
                    position: absolute;
                    inset: 0 40px 35px 0;
                    overflow: hidden;
                    border-radius: 18px;
                    background:
                        linear-gradient(
                            135deg,
                            rgba(93,137,200,.20),
                            rgba(24,35,51,.10)
                        ),
                        url("/images/medium-shot-smiley-friends-hugging.jpg")
                        center / cover no-repeat;
                }

                .intro-image::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        145deg,
                        rgba(23,48,79,.08),
                        rgba(93,137,200,.25)
                    );
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
                    font-size: 11.5px;
                    line-height: 1.65;
                }

                /* RWANDA */

                .rwanda-grid {
                    display: grid;
                    grid-template-columns: .85fr 1.15fr;
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
                    grid-template-columns: .85fr 1.15fr;
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
                    background: var(--mental-blue-soft);
                    color: var(--mental-blue);
                }

                .symptom-item span {
                    color: #4F5B6C;
                    font-size: 12px;
                    line-height: 1.65;
                }

                /* SEVERITY */

                .severity-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    gap: 35px;
                    margin-bottom: 40px;
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
                    width: 43px;
                    height: 43px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 20px;
                    border-radius: 12px;
                    background: var(--mental-blue-soft);
                    color: var(--mental-blue);
                }

                .severity-card:nth-child(2) .severity-icon {
                    background: #F4F0E2;
                    color: #A27C20;
                }

                .severity-card:nth-child(3) .severity-icon {
                    background: #F4E8E7;
                    color: #A4544D;
                }

                .severity-card h3 {
                    margin: 0;
                    font-size: 18px;
                }

                .severity-card p {
                    margin: 12px 0 0;
                    color: var(--mental-muted);
                    font-size: 12px;
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
                    margin-top: 25px;
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
                    font-size: 11px;
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

                .advice-item:last-child {
                    grid-column: span 2;
                }

                .advice-number {
                    flex: 0 0 auto;
                    width: 29px;
                    height: 29px;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    background: rgba(255,255,255,.16);
                    font-size: 10px;
                    font-weight: 800;
                }

                .advice-item p {
                    margin: 1px 0 0;
                    color: rgba(255,255,255,.87);
                    font-size: 11.5px;
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
                    font-size: clamp(27px, 4vw, 40px);
                    line-height: 1.08;
                    letter-spacing: -.03em;
                }

                .support-card p {
                    position: relative;
                    max-width: 620px;
                    margin: 18px auto 0;
                    color: rgba(255,255,255,.76);
                    font-size: 13px;
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
            `}),c.jsxs("div",{className:"depression-page",children:[c.jsxs("section",{className:"depression-hero",children:[c.jsxs("div",{className:"hero-inner",children:[c.jsx("div",{className:"hero-kicker",children:i.heroEyebrow}),c.jsx("h1",{className:"hero-title",children:i.heroTitle}),c.jsx("div",{className:"hero-divider",children:c.jsx("span",{className:"hero-diamond"})}),c.jsx("p",{className:"hero-description",children:i.heroDescription}),c.jsxs("div",{className:"hero-actions",children:[c.jsxs("button",{type:"button",className:"hero-button hero-button-primary",onClick:()=>s("overview"),children:[i.heroPrimary,c.jsx(_t,{size:14})]}),c.jsxs("button",{type:"button",className:"hero-button hero-button-secondary",onClick:()=>s("support"),children:[i.heroSecondary,c.jsx(Dt,{size:14})]})]})]}),c.jsxs("div",{className:"hero-scroll",children:[c.jsx("span",{children:"Scroll"}),c.jsx(_t,{size:14})]})]}),c.jsx("section",{id:"overview",className:"section",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"intro-grid",children:[c.jsxs("div",{className:"intro-visual",children:[c.jsx("div",{className:"intro-image"}),c.jsx("div",{className:"intro-accent"}),c.jsxs("div",{className:"intro-card",children:[c.jsx("div",{className:"intro-card-icon",children:c.jsx(ct,{size:19})}),c.jsx("strong",{children:i.introEyebrow}),c.jsx("span",{children:e==="rw"?"Ubumenyi bushobora gufasha abantu gushaka ubufasha hakiri kare.":e==="fr"?"La connaissance peut aider à demander de l'aide plus tôt.":e==="nl"?"Inzicht kan helpen om eerder ondersteuning te zoeken.":"Knowledge can help people seek support earlier."})]})]}),c.jsxs("div",{className:"intro-copy",children:[c.jsx(Z,{children:i.introEyebrow}),c.jsx("h2",{className:"section-title",children:i.introTitle}),c.jsx(We,{}),c.jsx("p",{children:i.introText}),c.jsx("p",{children:i.introText2})]})]})})}),c.jsx("section",{className:"section section-soft",children:c.jsxs("div",{className:"container",children:[c.jsx("div",{className:"facts-heading",children:c.jsxs("div",{children:[c.jsx(Z,{children:i.factsEyebrow}),c.jsx("h2",{className:"section-title",children:i.factsTitle})]})}),c.jsx("div",{className:"facts-grid",children:i.facts.map((l,d)=>c.jsxs("article",{className:"fact-card",children:[c.jsx("div",{className:"fact-number",children:l.value}),c.jsx("div",{className:"fact-label",children:l.label})]},d))})]})}),c.jsx("section",{className:"section",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"rwanda-grid",children:[c.jsxs("div",{className:"rwanda-art",children:[c.jsx(Fi,{}),c.jsxs("div",{className:"rwanda-stat rwanda-stat-one",children:[c.jsx("strong",{children:"9.1%"}),c.jsx("span",{children:e==="rw"?"Abaturage muri rusange":e==="fr"?"Population générale":e==="nl"?"Algemene bevolking":"General population"})]}),c.jsxs("div",{className:"rwanda-stat rwanda-stat-two",children:[c.jsx("strong",{children:"17.8%"}),c.jsx("span",{children:e==="rw"?"Abacitse ku icumu":e==="fr"?"Survivants":e==="nl"?"Overlevenden":"Survivors"})]})]}),c.jsxs("div",{className:"rwanda-copy",children:[c.jsx(Z,{children:i.rwandaEyebrow}),c.jsx("h2",{className:"section-title",children:i.rwandaTitle}),c.jsx(We,{}),c.jsx("p",{children:i.rwandaText}),c.jsx("p",{children:i.rwandaText2}),c.jsxs("div",{className:"gender-stats",children:[c.jsxs("div",{className:"gender-stat",children:[c.jsx("strong",{children:"21.4%"}),c.jsx("span",{children:e==="rw"?"Abagore":e==="fr"?"Femmes":e==="nl"?"Vrouwen":"Women"})]}),c.jsxs("div",{className:"gender-stat",children:[c.jsx("strong",{children:"11.3%"}),c.jsx("span",{children:e==="rw"?"Abagabo":e==="fr"?"Hommes":e==="nl"?"Mannen":"Men"})]})]})]})]})})}),c.jsx("section",{className:"section section-soft",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"symptoms-layout",children:[c.jsxs("div",{className:"symptoms-intro",children:[c.jsx(Z,{children:i.symptomsEyebrow}),c.jsx("h2",{className:"section-title",children:i.symptomsTitle}),c.jsx(We,{}),c.jsx("p",{className:"section-lead",children:i.symptomsIntro})]}),c.jsx("div",{className:"symptoms-list",children:i.symptoms.map((l,d)=>c.jsxs("div",{className:"symptom-item",children:[c.jsx("div",{className:"symptom-icon",children:c.jsx(En,{size:15})}),c.jsx("span",{children:l})]},d))})]})})}),c.jsx("section",{className:"section section-blue",children:c.jsxs("div",{className:"container",children:[c.jsx("div",{className:"severity-header",children:c.jsxs("div",{children:[c.jsx(Z,{children:i.severityEyebrow}),c.jsx("h2",{className:"section-title",children:i.severityTitle})]})}),c.jsx("div",{className:"severity-grid",children:i.severity.map((l,d)=>c.jsxs("article",{className:"severity-card",children:[c.jsx("div",{className:"severity-icon",children:d===0?c.jsx(jn,{size:20}):d===1?c.jsx(ut,{size:20}):c.jsx(dt,{size:20})}),c.jsx("h3",{children:l.title}),c.jsx("p",{children:l.description})]},d))}),c.jsxs("div",{className:"relapse-note",children:[c.jsx(kn,{size:18}),c.jsx("p",{children:i.relapse})]})]})}),c.jsx("section",{className:"section",children:c.jsxs("div",{className:"container",children:[c.jsx(Z,{children:i.causesEyebrow}),c.jsx("h2",{className:"section-title",children:i.causesTitle}),c.jsx("p",{className:"section-lead",children:i.causesIntro}),c.jsx("div",{className:"causes-grid",children:i.causes.map((l,d)=>c.jsxs("article",{className:"cause-card",children:[c.jsx("div",{className:"cause-icon",children:d===0?c.jsx(Rn,{size:18}):d===1?c.jsx(ut,{size:18}):d===2?c.jsx(vn,{size:18}):c.jsx(pt,{size:18})}),c.jsx("h3",{children:l.title}),c.jsx("p",{children:l.text})]},d))}),c.jsxs("div",{className:"prevention-panel",children:[c.jsx("div",{className:"prevention-icon",children:c.jsx(pt,{size:23})}),c.jsxs("div",{children:[c.jsx("h3",{children:i.preventionTitle}),c.jsx("p",{children:i.preventionText})]})]})]})}),c.jsx("section",{className:"section advice-section",children:c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"advice-heading",children:[c.jsx(Z,{light:!0,children:i.adviceEyebrow}),c.jsx("h2",{className:"section-title",children:i.adviceTitle}),c.jsx("p",{className:"section-lead",children:e==="rw"?"Hari intambwe zoroshye zishobora gufasha umuntu uri mu bihe bikomeye.":e==="fr"?"Certaines étapes simples peuvent aider une personne qui traverse une période difficile.":e==="nl"?"Enkele eenvoudige stappen kunnen iemand helpen die een moeilijke periode doormaakt.":"There are practical steps that can help someone going through a difficult period."})]}),c.jsx("div",{className:"advice-list",children:i.advice.map((l,d)=>c.jsxs("div",{className:"advice-item",children:[c.jsx("div",{className:"advice-number",children:String(d+1).padStart(2,"0")}),c.jsx("p",{children:l})]},d))})]})}),c.jsx("section",{id:"support",className:"section",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"support-wrap",children:[c.jsxs("div",{className:"support-card",children:[c.jsx("div",{className:"support-icon",children:c.jsx(Dt,{size:25})}),c.jsxs("div",{className:"section-label section-label-light",children:[c.jsx("span",{className:"label-line"}),c.jsx("span",{children:i.supportEyebrow})]}),c.jsx("h2",{children:i.supportTitle}),c.jsx("p",{children:i.supportText}),c.jsxs("a",{href:"#support",className:"support-button",children:[i.supportButton,c.jsx(Ct,{size:14})]})]}),c.jsxs("div",{className:"important-box",children:[c.jsx("div",{className:"important-icon",children:c.jsx(dt,{size:17})}),c.jsxs("div",{children:[c.jsx("strong",{children:i.important}),c.jsx("p",{children:i.importantText})]})]}),c.jsx("div",{className:"urgent-note",children:i.urgent})]})})}),c.jsx("footer",{className:"mental-footer",children:c.jsx("div",{className:"container",children:c.jsxs("div",{className:"footer-inner",children:[c.jsxs("div",{className:"footer-brand",children:[c.jsx("div",{className:"footer-mark",children:c.jsx(ct,{size:18})}),c.jsxs("div",{children:[c.jsx("strong",{children:e==="rw"?"Ubuzima bwo mu Mutwe":e==="fr"?"Santé mentale":e==="nl"?"Geestelijke gezondheid":"Mental Health"}),c.jsx("span",{children:e==="rw"?"Ubumenyi • Ubufasha • Kubaho neza":e==="fr"?"Connaissance • Soutien • Bien-être":e==="nl"?"Kennis • Ondersteuning • Welzijn":"Knowledge • Support • Wellbeing"})]})]}),c.jsx("div",{className:"footer-copy",children:i.importantText})]})})}),n&&c.jsx("button",{type:"button",className:"back-top",onClick:a,"aria-label":i.backTop,title:i.backTop,children:c.jsx(Ct,{size:18})})]})]})}export{bs as default};
