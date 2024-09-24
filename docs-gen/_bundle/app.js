(()=>{var e,t={7276:(e,t,n)=>{"use strict";var o=n(6540),r=n(5338),a=n(7658),c=n(5168),l=n(5593),i=n(8184),s=n(4878),d=n(8274),m=n(779),u=n(5823),h=n(8976),g=n(5905),f=n(358),w=n(8364),p=(n(553),n(6141)),S=n(297);const E=(0,o.memo)((({mobileView:e,theme:t,onChangeTheme:n,textSize:r,onChangeTextSize:a,wideFormat:c,onChangeWideFormat:l,showMiniToc:s,onChangeShowMiniToc:d,lang:m,langs:u,onChangeLang:h})=>o.createElement(p.n,{controlClassName:"Control",controlSize:i.Uv.L,isWideView:e,isMobileView:e},o.createElement(S.A,{className:"Controls",theme:t,onChangeTheme:n,wideFormat:c,onChangeWideFormat:l,showMiniToc:s,onChangeShowMiniToc:d,textSize:r,onChangeTextSize:a,lang:m,langs:u,onChangeLang:h}))));E.displayName="HeaderControls";const b=["ar","arc","ckb","dv","fa","ha","he","khw","ks","ps","sd","ur","uz_AF","yi"];let v=function(e){return e.RTL="rtl",e.LTR="ltr",e}({});function y(e){return"boolean"==typeof e?e:!!e&&"true"===e}new Set(["href","src","url","href","icon","image","desktop","mobile","tablet","previewImg","image","avatar","logo","light","dark"]);var C=n(3614);const T=(0,C.A)("Layout");function k(){return null}function M(){return null}function F(){return null}const x=e=>{const{children:t,doc:n}=e;let r,a,c;return o.Children.forEach(t,(e=>{switch(e.type){case k:r=e.props.children;break;case M:a=e.props.children;break;case F:c=e.props.children}})),o.createElement("div",{className:T()},r&&o.createElement("div",{className:T("header")},r),o.createElement("div",{className:T("body")},a&&o.createElement("div",{className:T("content")},a),c&&o.createElement("div",{className:T("footer",{doc:n})},c)))};x.displayName="Layout",x.defaultProps={doc:!1},x.Header=k,x.Content=M,x.Footer=F;var _=n(8058),N=n(2445),z=n(3259),O=n(1998),A=n(2945),L=n(4012);const j=(0,C.A)("pc-page-constructor"),I=(0,C.A)("pc-constructor-row"),P=({children:e})=>e?o.createElement(_.f,{className:I()},o.createElement(N.f,null,e)):null;function W({data:{data:e},theme:t}){const n=(0,z.d)(e?.background,t);return o.createElement("div",{className:j("docs")},o.createElement("div",{className:j("wrapper")},e?.blocks&&n&&o.createElement(O.A,Object.assign({},n,{className:j("background")})),o.createElement(A.x,null,o.createElement(P,null,o.createElement(L.F,{items:e?.blocks})))))}const H={theme:i.Sx.Light,textSize:i.ov.M,showMiniToc:!0,wideFormat:!0,fullScreen:!1};function D(e){if("undefined"==typeof sessionStorage)return H[e];try{return sessionStorage.getItem(e)||H[e]}catch{return H[e]}}function V(e,t){return n=>{!function(e,t){try{sessionStorage.setItem(e,String(t))}catch{}}(e,n),t(n)}}function K(e){const{theme:t}=e;return o.createElement(o.Fragment,null,o.createElement(w.v,null),o.createElement(f.l,null),o.createElement(g.A,{theme:t===i.Sx.Dark?"dark":"neutral",zoom:{showMenu:!0,bindKeys:!0}}))}function R(e){const{data:t,...n}=e,r=(0,s.$T)(e?.type);return o.createElement(x,null,o.createElement(x.Content,null,o.createElement(r,Object.assign({},t,n))))}function B(e){const{data:t,router:n,lang:r,langs:g,analytics:f}=e,{navigation:w}=t.toc;(0,d.jK)({lang:r});const p=function(){const e=function(){const e=D("theme"),t=D("textSize"),n=D("showMiniToc"),o=D("wideFormat"),r=D("fullScreen");return{theme:e,textSize:t,showMiniToc:y(n),wideFormat:y(o),fullScreen:y(r)}}(),[t,n]=(0,o.useState)(e.wideFormat),[r,a]=(0,o.useState)(e.fullScreen),[c,l]=(0,o.useState)(e.showMiniToc),[i,s]=(0,o.useState)(e.theme),[d,m]=(0,o.useState)(e.textSize);return{theme:i,onChangeTheme:V("theme",s),textSize:d,onChangeTextSize:V("textSize",m),wideFormat:t,onChangeWideFormat:V("wideFormat",n),showMiniToc:c,onChangeShowMiniToc:V("showMiniToc",l),fullScreen:r,onChangeFullScreen:V("fullScreen",a)}}(),S=function(){const[e,t]=(0,o.useState)("undefined"!=typeof document&&document.body.clientWidth<769),n=(0,o.useCallback)((()=>{t(document.body.clientWidth<769)}),[]);return(0,o.useEffect)(n,[n]),(0,o.useEffect)((()=>(window.addEventListener("resize",n),()=>window.removeEventListener("resize",n))),[n]),e}(),C=(0,o.useCallback)((e=>{const t=(0,s.UZ)(n,e);window.location.replace(t)}),[n]),{theme:T,textSize:k,wideFormat:M,fullScreen:F,showMiniToc:x,onChangeFullScreen:_}=p,N=!F&&Boolean(w),z=N?64:0,O=(0,s.M5)(t),A={headerHeight:z,data:t,router:n,lang:r,langs:g,wideFormat:M,showMiniToc:x,theme:T,textSize:k,fullScreen:F,onChangeFullScreen:_,type:O},L=function(e){return b.includes(e)?v.RTL:v.LTR}(r),j=O===i.KG.PageConstructor&&"data"in t&&"fullScreen"in t.data&&t.data.fullScreen,I="App "+(j?"fullscreen-mode":"document-mode");(0,o.useEffect)((()=>{!function({theme:e,mobileView:t=!1,wideFormat:n=!1,fullHeader:o=!1}){document.body.className=["g-root",t?"mobile":"desktop",n&&"dc-root_wide-format",o&&"dc-root_full-header"].filter(Boolean).join(" "),document.querySelectorAll(".g-root").forEach((t=>{t.classList.toggle("g-root_theme_light","light"===e),t.classList.toggle("g-root_theme_dark","dark"===e)}))}({theme:T,mobileView:S,wideFormat:M,fullHeader:N})}),[T,S,M,N]);const P={...p,onChangeLang:C};if(!w)return o.createElement("div",{className:I},o.createElement(l.N,{theme:T,direction:L},o.createElement(R,Object.assign({},A,P),O===i.KG.PageConstructor&&o.createElement(a.Z,{theme:T},o.createElement(c.i,{custom:{blocks:{page:()=>o.createElement(W,{data:t,theme:T})}},content:j?t.data:{blocks:[{type:"page",resetPaddings:!0}]}}))),f&&o.createElement(m.A,{router:n,gtmId:f?.gtm?.id||"",consentMode:f?.gtm?.mode}),o.createElement(K,{theme:T})));const{header:H={},logo:B}=w,{leftItems:$=[],rightItems:G=[]}=H,U=G.some((e=>"controls"===e.type)),Z={...p,langs:g,onChangeLang:C},q={toc:t.toc,router:n,headerHeight:64},J={controlSize:i.Uv.L,lang:r,userSettings:Z};return o.createElement("div",{className:I},o.createElement(l.N,{theme:T,direction:L},o.createElement(a.Z,{theme:T},o.createElement(c.i,{custom:{navigation:{controls:()=>o.createElement(E,Object.assign({},P,A,{onChangeLang:C,mobileView:S})),MobileDropdown:e=>o.createElement(u.A,{item:e})},blocks:{page:()=>o.createElement(R,Object.assign({},A,U?{}:P),O===i.KG.PageConstructor&&"data"in t&&o.createElement(W,{data:t,theme:T}))}},content:j?t.data:{blocks:[{type:"page",resetPaddings:!0}]},navigation:N?{header:{leftItems:[]},renderNavigation:()=>o.createElement(h.A,{logo:B,data:{withBorder:!0,leftItems:$,rightItems:G},navigationTocData:q,mobileControlsData:J}),logo:B}:void 0})),f&&o.createElement(m.A,{router:n,gtmId:f?.gtm?.id||"",consentMode:f?.gtm?.mode})),o.createElement(K,{theme:T}))}n(4186);const $=document.getElementById("root"),G=window.__DATA__;if(!$)throw new Error("Root element not found!");window.STATIC_CONTENT?(0,r.c)($,o.createElement(B,G)):(0,r.H)($).render(o.createElement(B,G))},4186:()=>{"undefined"!=typeof Element&&function(e){const t=e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector;e.matches=e.matchesSelector=t||function(e){const t=this;return Array.prototype.some.call(document.querySelectorAll(e),(e=>e===t))}}(Element.prototype),"undefined"!=typeof document&&document.addEventListener("click",(e=>{const t=e.target.href,n=window.location.origin;if(e.target.matches(".dc-doc-layout__center a")&&t.startsWith(n)){e.preventDefault();const n="index",o=".html";if(t.endsWith("/"))return void(window.location.href=`${t}${n}${o}`);const r=t.split("#");if(r.length>0&&!r[0].endsWith(o))return r[0]+=o,void(window.location.href=r.join("#"));window.location.href=t}}))},7040:(e,t,n)=>{"use strict";function o(){}n.d(t,{A:()=>o})},2634:()=>{}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var a=n[e]={id:e,loaded:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}o.m=t,o.amdO={},e=[],o.O=(t,n,r,a)=>{if(!n){var c=1/0;for(d=0;d<e.length;d++){for(var[n,r,a]=e[d],l=!0,i=0;i<n.length;i++)(!1&a||c>=a)&&Object.keys(o.O).every((e=>o.O[e](n[i])))?n.splice(i--,1):(l=!1,a<c&&(c=a));if(l){e.splice(d--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,r,a]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={524:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[c,l,i]=n,s=0;if(c.some((t=>0!==e[t]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var d=i(o)}for(t&&t(n);s<c.length;s++)a=c[s],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},n=self.webpackChunk_diplodoc_client=self.webpackChunk_diplodoc_client||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[644,121],(()=>o(7276)));r=o.O(r)})();
//# sourceMappingURL=app.js.map