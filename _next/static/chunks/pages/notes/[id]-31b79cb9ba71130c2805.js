_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[23],{"7o6c":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notes/[id]",function(){return n("MjEs")}])},Fscz:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n("q1tI"),c=n.n(o),a=n("nOHt"),i=c.a.createElement,r=function(e){var t=e.statusCode,n=Object(a.useRouter)();return i("div",{className:"error"},i("div",{className:"error_wrap"},i("h1",null,t),i("div",{className:"desc"},i("h2",null,function(e){switch(e){case 404:return"\u62b1\u6b49\u5566, \u9875\u9762\u8d70\u4e22\u4e86";case 403:return"\u4e0d\u8981\u505a\u4e00\u4e9b\u4e0d\u5141\u8bb8\u7684\u4e8b\u60c5\u5566";case 401:return"\u8fd9\u662f\u4e3b\u4eba\u7684\u5c0f\u79d8\u5bc6\u54e6, \u4f60\u662f\u6211\u7684\u4e3b\u4eba\u5417";case 500:default:return"\u62b1\u6b49, \u51fa\u4e86\u70b9\u5c0f\u95ee\u9898"}}(t)))),i("div",{style:{marginTop:"20px"}},i("button",{className:"btn red",style:{marginRight:"12px"},onClick:function(){return n.push("/")}},"\u56de\u5230\u9996\u9875"),i("button",{className:"btn yellow",onClick:function(){return n.reload()}},"\u5237\u65b0")))}},MjEs:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return T}));var o=n("q1tI"),c=n.n(o),a=n("twK/"),i=n("wHSu"),r=n("zQ19"),s=n("wx14"),u=n("Ff2n"),l=n("8tEE"),m=n("IP2g"),d=n("PL58"),f=n.n(d),p=c.a.createElement,b=Object(o.memo)((function(e){var t=e.actions,n=void 0===t?[]:t,o=e.informs,a=void 0===o?[]:o,i=e.copyright,r=void 0===i||i,d=Object(u.a)(e,["actions","informs","copyright"]);return p(c.a.Fragment,null,p("div",Object(s.a)({className:"note-inform"},d),a.map((function(e,t){return p("span",{key:t},p(m.a,{icon:e.icon,className:f.a.icon,color:e.color}),e.name)})),r&&p("a",{href:"https://creativecommons.org/licenses/by-nc-nd/4.0/",style:{color:"currentColor"},target:"_blank"},p("span",{title:"\u521b\u4f5c\u5171\u7528\u4fdd\u7559\u7f72\u540d-\u975e\u5546\u4e1a-\u7981\u6b62\u6f14\u7ece4.0\u56fd\u9645\u8bb8\u53ef\u8bc1"},p(m.a,{icon:l.e,className:f.a.icon})))),p("div",{className:"note-action",style:{minHeight:"1rem"}},n.map((function(e,t){return p("span",{key:t,style:{cursor:"pointer"},onClick:e.callback},p(m.a,{icon:e.icon,className:f.a.icon,color:e.color}),e.name)}))))})),h=n("9uS9"),w=n("F/y2"),v=n("dumg"),N=n("nOHt"),_=n("ytCK"),E=n("eSIs"),j=n("MaJT"),y=n("cBaE"),O=n("Fscz"),g=c.a.createElement,k=function(e){var t=e.value;return g("span",{className:"indent"},t)},C=Object(_.a)((function(e){var t=e.content,n=e.created,s=e.modified,u=e.nid,l=e.title,m=e.mood,d=e.weather,f=e.hasNext,p=e.hasPrev,_=Object(r.a)().appStore,C=Object(N.useRouter)();if(!C.isFallback&&!e.nid)return g(O.a,{statusCode:404});var T=Object(o.useState)(""),Y=T[0],F=T[1],M=Object(y.b)(t,{count:!0}),S=M.description,x=M.wordCount;Object(o.useEffect)((function(){try{F("\u521b\u5efa\u4e8e ".concat(Object(E.a)(n,"YYYY-MM-DD dddd"),", \u4fee\u6539\u4e8e ").concat(Object(E.a)(s,"YYYY-MM-DD dddd"),", \u5168\u6587\u5b57\u6570: ").concat(x))}catch(e){}}),[t,x,n,s]),Object(o.useEffect)((function(){document.documentElement.scrollTop>50&&(document.documentElement.scrollTop=50),setTimeout((function(){window.scroll({top:0,left:0,behavior:"smooth"})}),10)}),[e]);var P={informs:[]};return d&&P.informs.push({name:d,icon:a.c}),m&&P.informs.push({name:m,icon:a.b}),P.informs.push({name:w.a.author,icon:i.m},{name:Object(E.b)(n),icon:i.d}),Object(o.useEffect)((function(){return _.headerNav={title:l,meta:"\u65e5\u8bb0",show:!0},function(){_.headerNav.show=!1}}),[_,l]),g(c.a.Fragment,null,g(j.b,{title:l,description:S,openGraph:{title:l,type:"article",description:S,article:{publishedTime:n,modifiedTime:s,tags:["Note of Life"]}}}),g(v.a,{title:l,date:new Date(n),tips:Y},g(h.a,{value:t,escapeHtml:!1,renderers:{text:k}}),g(b,P),(!!f||!!p)&&g("section",{className:"paul-more"},!!f&&g("button",{className:"btn green",onClick:function(){C.push("/notes/[id]","/notes/".concat(u+1))}},"\u540e\u4e00\u7bc7"),g("button",{className:"btn yellow",onClick:function(){window.scrollTo({left:0,top:0,behavior:"smooth"}),C.push("/timeline?type=note")}},"\u65f6\u95f4\u7ebf"),!!p&&g("button",{className:"btn green",onClick:function(){C.push("/notes/[id]","/notes/".concat(u-1))}},"\u524d\u4e00\u7bc7"))))})),T=!0;t.default=C},PL58:function(e,t,n){e.exports={icon:"Action_icon__3BtwG"}}},[["7o6c",0,2,6,4,3,1,7,5,8,9,10,11,12,13,14,16]]]);