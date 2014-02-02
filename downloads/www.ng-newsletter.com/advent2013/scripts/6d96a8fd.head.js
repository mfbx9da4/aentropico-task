var hljs=new function(){function a(a){return a.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function b(a){for(var b=a.firstChild;b;b=b.nextSibling){if("CODE"==b.nodeName.toUpperCase())return b;if(3!=b.nodeType||!b.nodeValue.match(/\s+/))break}}function c(a,b){return Array.prototype.map.call(a.childNodes,function(a){return 3==a.nodeType?b?a.nodeValue.replace(/\n/g,""):a.nodeValue:"BR"==a.nodeName.toUpperCase()?"\n":c(a,b)}).join("")}function d(a){var b=(a.className+" "+(a.parentNode?a.parentNode.className:"")).split(/\s+/);b=b.map(function(a){return a.replace(/^language-/,"")});for(var c=0;c<b.length;c++)if(n[b[c]]||"no-highlight"==b[c])return b[c]}function e(a){var b=[];return function c(a,d){for(var e=a.firstChild;e;e=e.nextSibling)3==e.nodeType?d+=e.nodeValue.length:"BR"==e.nodeName.toUpperCase()?d+=1:1==e.nodeType&&(b.push({event:"start",offset:d,node:e}),d=c(e,d),b.push({event:"stop",offset:d,node:e}));return d}(a,0),b}function f(b,c,d){function e(){return b.length&&c.length?b[0].offset!=c[0].offset?b[0].offset<c[0].offset?b:c:"start"==c[0].event?b:c:b.length?b:c}function f(b){function c(b){return" "+b.nodeName+'="'+a(b.value)+'"'}j+="<"+b.nodeName.toLowerCase()+Array.prototype.map.call(b.attributes,c).join("")+">"}function g(a){j+="</"+a.nodeName.toLowerCase()+">"}function h(a){("start"==a.event?f:g)(a.node)}for(var i=0,j="",k=[];b.length||c.length;){var l=e();if(j+=a(d.substr(i,l[0].offset-i)),i=l[0].offset,l==b){k.reverse().forEach(g);do h(l.splice(0,1)[0]),l=e();while(l==b&&l.length&&l[0].offset==i);k.reverse().forEach(f)}else"start"==l[0].event?k.push(l[0].node):k.pop(),h(l.splice(0,1)[0])}return j+a(d.substr(i))}function g(a){function b(a){return a&&a.source||a}function c(c,d){return RegExp(b(c),"m"+(a.cI?"i":"")+(d?"g":""))}function d(e,f){function g(b,c){a.cI&&(c=c.toLowerCase()),c.split(" ").forEach(function(a){var c=a.split("|");i[c[0]]=[b,c[1]?Number(c[1]):1],h.push(c[0])})}if(!e.compiled){e.compiled=!0;var h=[];if(e.k){var i={};if(e.lR=c(e.l||"\\b"+hljs.IR+"\\b(?!\\.)",!0),"string"==typeof e.k)g("keyword",e.k);else for(var j in e.k)e.k.hasOwnProperty(j)&&g(j,e.k[j]);e.k=i}f&&(e.bWK&&(e.b="\\b("+h.join("|")+")\\b(?!\\.)\\s*"),e.bR=c(e.b?e.b:"\\B|\\b"),e.e||e.eW||(e.e="\\B|\\b"),e.e&&(e.eR=c(e.e)),e.tE=b(e.e)||"",e.eW&&f.tE&&(e.tE+=(e.e?"|":"")+f.tE)),e.i&&(e.iR=c(e.i)),void 0===e.r&&(e.r=1),e.c||(e.c=[]);for(var k=0;k<e.c.length;k++)"self"==e.c[k]&&(e.c[k]=e),d(e.c[k],e);e.starts&&d(e.starts,f);for(var l=[],k=0;k<e.c.length;k++)l.push(b(e.c[k].b));e.tE&&l.push(b(e.tE)),e.i&&l.push(b(e.i)),e.t=l.length?c(l.join("|"),!0):{exec:function(){return null}}}}d(a)}function h(b,c,d,e){function f(a,b){for(var c=0;c<b.c.length;c++){var d=b.c[c].bR.exec(a);if(d&&0==d.index)return b.c[c]}}function j(a,b){return a.e&&a.eR.test(b)?a:a.eW?j(a.parent,b):void 0}function k(a,b){return!d&&b.i&&b.iR.test(a)}function l(a,b){var c=s.cI?b[0].toLowerCase():b[0];return a.k.hasOwnProperty(c)&&a.k[c]}function m(){var b=a(w);if(!t.k)return b;var c="",d=0;t.lR.lastIndex=0;for(var e=t.lR.exec(b);e;){c+=b.substr(d,e.index-d);var f=l(t,e);f?(y+=f[1],c+='<span class="'+f[0]+'">'+e[0]+"</span>"):c+=e[0],d=t.lR.lastIndex,e=t.lR.exec(b)}return c+b.substr(d)}function o(){if(t.sL&&!n[t.sL])return a(w);var b="continuous"==t.subLanguageMode?t.top:void 0,c=t.sL?h(t.sL,w,!0,b):i(w);return t.r>0&&(y+=c.keyword_count,x+=c.r),t.top=c.top,'<span class="'+c.language+'">'+c.value+"</span>"}function p(){return void 0!==t.sL?o():m()}function q(b,c){var d=b.cN?'<span class="'+b.cN+'">':"";b.rB?(u+=d,w=""):b.eB?(u+=a(c)+d,w=""):(u+=d,w=c),t=Object.create(b,{parent:{value:t}})}function r(b,c){if(w+=b,void 0===c)return u+=p(),0;var d=f(c,t);if(d)return u+=p(),q(d,c),d.rB?0:c.length;var e=j(t,c);if(e){var g=t;g.rE||g.eE||(w+=c),u+=p();do t.cN&&(u+="</span>"),x+=t.r,t=t.parent;while(t!=e.parent);return g.eE&&(u+=a(c)),w="",e.starts&&q(e.starts,""),g.rE?0:c.length}if(k(c,t))throw new Error('Illegal lexem "'+c+'" for mode "'+(t.cN||"<unnamed>")+'"');return w+=c,c.length||1}var s=n[b];if(!s)throw new Error('Unknown language: "'+b+'"');g(s);for(var t=e||s,u="",v=t;v!=s;v=v.parent)v.cN&&(u='<span class="'+v.cN+'">'+u);var w="",x=0,y=0;try{for(var z,A,B=0;;){if(t.t.lastIndex=B,z=t.t.exec(c),!z)break;A=r(c.substr(B,z.index-B),z[0]),B=z.index+A}r(c.substr(B));for(var v=t;v.parent;v=v.parent)v.cN&&(u+="</span>");return{r:x,keyword_count:y,value:u,language:b,top:t}}catch(C){if(-1!=C.message.indexOf("Illegal"))return{r:0,keyword_count:0,value:a(c)};throw C}}function i(b){var c={keyword_count:0,r:0,value:a(b)},d=c;for(var e in n)if(n.hasOwnProperty(e)){var f=h(e,b,!1);f.language=e,f.keyword_count+f.r>d.keyword_count+d.r&&(d=f),f.keyword_count+f.r>c.keyword_count+c.r&&(d=c,c=f)}return d.language&&(c.second_best=d),c}function j(a,b,c){return b&&(a=a.replace(/^((<[^>]+>|\t)+)/gm,function(a,c){return c.replace(/\t/g,b)})),c&&(a=a.replace(/\n/g,"<br>")),a}function k(a,b,g){var k=c(a,g),l=d(a);if("no-highlight"!=l){var m=l?h(l,k,!0):i(k);l=m.language;var n=e(a);if(n.length){var o=document.createElementNS("http://www.w3.org/1999/xhtml","pre");o.innerHTML=m.value,m.value=f(n,e(o),k)}m.value=j(m.value,b,g);var p=a.className;p.match("(\\s|^)(language-)?"+l+"(\\s|$)")||(p=p?p+" "+l:l),a.innerHTML=m.value,a.className=p,a.result={language:l,kw:m.keyword_count,re:m.r},m.second_best&&(a.second_best={language:m.second_best.language,kw:m.second_best.keyword_count,re:m.second_best.r})}}function l(){l.called||(l.called=!0,Array.prototype.map.call(document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml","pre"),b).filter(Boolean).forEach(function(a){k(a,hljs.tabReplace)}))}function m(){window.addEventListener("DOMContentLoaded",l,!1),window.addEventListener("load",l,!1)}var n={};this.LANGUAGES=n,this.highlight=h,this.highlightAuto=i,this.fixMarkup=j,this.highlightBlock=k,this.initHighlighting=l,this.initHighlightingOnLoad=m,this.IR="[a-zA-Z][a-zA-Z0-9_]*",this.UIR="[a-zA-Z_][a-zA-Z0-9_]*",this.NR="\\b\\d+(\\.\\d+)?",this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",this.BNR="\\b(0b[01]+)",this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",this.BE={b:"\\\\[\\s\\S]",r:0},this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0},this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0},this.CLCM={cN:"comment",b:"//",e:"$"},this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"},this.HCM={cN:"comment",b:"#",e:"$"},this.NM={cN:"number",b:this.NR,r:0},this.CNM={cN:"number",b:this.CNR,r:0},this.BNM={cN:"number",b:this.BNR,r:0},this.REGEXP_MODE={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]},this.inherit=function(a,b){var c={};for(var d in a)c[d]=a[d];if(b)for(var d in b)c[d]=b[d];return c}};hljs.LANGUAGES.javascript=function(a){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity"},c:[a.ASM,a.QSM,a.CLCM,a.CBLCLM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBLCLM,a.REGEXP_MODE,{b:/</,e:/>;/,sL:"xml"}],r:0},{cN:"function",bWK:!0,e:/{/,k:"function",c:[{cN:"title",b:/[A-Za-z$_][0-9A-Za-z$_]*/},{cN:"params",b:/\(/,e:/\)/,c:[a.CLCM,a.CBLCLM],i:/["'\(]/}],i:/\[|%/}]}}(hljs),hljs.LANGUAGES.css=function(a){var b="[a-zA-Z-][a-zA-Z0-9_-]*",c={cN:"function",b:b+"\\(",e:"\\)",c:["self",a.NM,a.ASM,a.QSM]};return{cI:!0,i:"[=/|']",c:[a.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[c,a.ASM,a.QSM,a.NM]}]},{cN:"tag",b:b,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBLCLM,{cN:"rule",b:"[^\\s]",rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{cN:"value",eW:!0,eE:!0,c:[c,a.NM,a.QSM,a.ASM,a.CBLCLM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}}(hljs),hljs.LANGUAGES.xml=function(){var a="[A-Za-z0-9\\._:-]+",b={eW:!0,r:0,c:[{cN:"attribute",b:a,r:0},{b:'="',rB:!0,e:'"',c:[{cN:"value",b:'"',eW:!0}]},{b:"='",rB:!0,e:"'",c:[{cN:"value",b:"'",eW:!0}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:!0,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"</script>",rE:!0,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",r:0,c:[{cN:"title",b:"[^ /><]+"},b]}]}}(hljs),hljs.LANGUAGES.http=function(){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]}}(hljs),hljs.LANGUAGES.json=function(a){var b={literal:"true false null"},c=[a.QSM,a.CNM],d={cN:"value",e:",",eW:!0,eE:!0,c:c,k:b},e={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[a.BE],i:"\\n",starts:d}],i:"\\S"},f={b:"\\[",e:"\\]",c:[a.inherit(d,{cN:null})],i:"\\S"};return c.splice(c.length,0,e,f),{c:c,k:b,i:"\\S"}}(hljs);var Showdown={extensions:{}},forEach=Showdown.forEach=function(a,b){if("function"==typeof a.forEach)a.forEach(b);else{var c,d=a.length;for(c=0;d>c;c++)b(a[c],c,a)}},stdExtName=function(a){return a.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(a){var b,c,d,e=0,f=[],g=[];if("undefind"!=typeof module&&"undefined"!=typeof exports&&"undefind"!=typeof require){var h=require("fs");if(h){var i=h.readdirSync((__dirname||".")+"/extensions").filter(function(a){return~a.indexOf(".js")}).map(function(a){return a.replace(/\.js$/,"")});Showdown.forEach(i,function(a){var b=stdExtName(a);Showdown.extensions[b]=require("./extensions/"+a)})}}if(this.makeHtml=function(a){return b={},c={},d=[],a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=M(a),a=a.replace(/^[ \t]+$/gm,""),Showdown.forEach(f,function(b){a=l(b,a)}),a=z(a),a=n(a),a=m(a),a=p(a),a=K(a),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),Showdown.forEach(g,function(b){a=l(b,a)}),a},a&&a.extensions){var j=this;Showdown.forEach(a.extensions,function(a){if("string"==typeof a&&(a=Showdown.extensions[stdExtName(a)]),"function"!=typeof a)throw"Extension '"+a+"' could not be loaded.  It was either not found or is not a valid extension.";Showdown.forEach(a(j),function(a){a.type?"language"===a.type||"lang"===a.type?f.push(a):("output"===a.type||"html"===a.type)&&g.push(a):g.push(a)})})}var k,l=function(a,b){if(a.regex){var c=new RegExp(a.regex,"g");return b.replace(c,a.replace)}return a.filter?a.filter(b):void 0},m=function(a){return a+="~0",a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(a,d,e,f,g){return d=d.toLowerCase(),b[d]=G(e),f?f+g:(g&&(c[d]=g.replace(/"/g,"&quot;")),"")}),a=a.replace(/~0/,"")},n=function(a){a=a.replace(/\n/g,"\n\n");return a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,o),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,o),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,o),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o),a=a.replace(/\n\n/g,"\n")},o=function(a,b){var c=b;return c=c.replace(/\n\n/g,"\n"),c=c.replace(/^\n/,""),c=c.replace(/\n+$/g,""),c="\n\n~K"+(d.push(c)-1)+"K\n\n"},p=function(a){a=w(a);var b=A("<hr />");return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,b),a=x(a),a=y(a),a=E(a),a=n(a),a=F(a)},q=function(a){return a=B(a),a=r(a),a=H(a),a=u(a),a=s(a),a=I(a),a=G(a),a=D(a),a=a.replace(/  +\n/g," <br />\n")},r=function(a){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=N(b,"\\`*_")})},s=function(a){return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,t),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,t),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,t)},t=function(a,d,e,f,g,h,i,j){void 0==j&&(j="");var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(""==n)if(""==m&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m,void 0!=b[m])n=b[m],void 0!=c[m]&&(o=c[m]);else{if(!(k.search(/\(\s*\)$/m)>-1))return k;n=""}n=N(n,"*_");var p='<a href="'+n+'"';return""!=o&&(o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"'),p+=">"+l+"</a>"},u=function(a){return a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,v),a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,v)},v=function(a,d,e,f,g,h,i,j){var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(o||(o=""),""==n){if(""==m&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m,void 0==b[m])return k;n=b[m],void 0!=c[m]&&(o=c[m])}l=l.replace(/"/g,"&quot;"),n=N(n,"*_");var p='<img src="'+n+'" alt="'+l+'"';return o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"',p+=" />"},w=function(a){function b(a){return a.replace(/[^\w]/g,"").toLowerCase()}return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return A('<h1 id="'+b(c)+'">'+q(c)+"</h1>")}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return A('<h2 id="'+b(c)+'">'+q(c)+"</h2>")}),a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,d){var e=c.length;return A("<h"+e+' id="'+b(d)+'">'+q(d)+"</h"+e+">")})},x=function(a){a+="~0";var b=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return e?a=a.replace(b,function(a,b,c){var d=b,e=c.search(/[*+-]/g)>-1?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var f=k(d);return f=f.replace(/\s+$/,""),f="<"+e+">"+f+"</"+e+">\n"}):(b=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(b,function(a,b,c,d){var e=b,f=c,g=d.search(/[*+-]/g)>-1?"ul":"ol",f=f.replace(/\n{2,}/g,"\n\n\n"),h=k(f);return h=e+"<"+g+">\n"+h+"</"+g+">\n"})),a=a.replace(/~0/,"")};k=function(a){return e++,a=a.replace(/\n{2,}$/,"\n"),a+="~0",a=a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,b,c,d,e){var f=e,g=b;return g||f.search(/\n{2,}/)>-1?f=p(L(f)):(f=x(L(f)),f=f.replace(/\n$/,""),f=q(f)),"<li>"+f+"</li>\n"}),a=a.replace(/~0/g,""),e--,a};var y=function(a){return a+="~0",a=a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,b,c){var d=b,e=c;return d=C(L(d)),d=M(d),d=d.replace(/^\n+/g,""),d=d.replace(/\n+$/g,""),d="<pre><code>"+d+"\n</code></pre>",A(d)+e}),a=a.replace(/~0/,"")},z=function(a){return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,b,c){var d=b,e=c;return e=C(e),e=M(e),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),e="<pre><code"+(d?' class="'+d+'"':"")+">"+e+"\n</code></pre>",A(e)}),a=a.replace(/~0/,"")},A=function(a){return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(d.push(a)-1)+"K\n\n"},B=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d){var e=d;return e=e.replace(/^([ \t]*)/g,""),e=e.replace(/[ \t]*$/g,""),e=C(e),b+"<code>"+e+"</code>"})},C=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=N(a,"*_{}[]\\",!1)},D=function(a){return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,b){var c=b;return c=c.replace(/^[ \t]*>[ \t]?/gm,"~0"),c=c.replace(/~0/g,""),c=c.replace(/^[ \t]+$/gm,""),c=p(c),c=c.replace(/(^|\n)/g,"$1  "),c=c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /gm,"~0"),c=c.replace(/~0/g,"")}),A("<blockquote>\n"+c+"\n</blockquote>")})},F=function(a){a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");for(var b=a.split(/\n{2,}/g),c=[],e=b.length,f=0;e>f;f++){var g=b[f];g.search(/~K(\d+)K/g)>=0?c.push(g):g.search(/\S/)>=0&&(g=q(g),g=g.replace(/^([ \t]*)/g,"<p>"),g+="</p>",c.push(g))}e=c.length;for(var f=0;e>f;f++)for(;c[f].search(/~K(\d+)K/)>=0;){var h=d[RegExp.$1];h=h.replace(/\$/g,"$$$$"),c[f]=c[f].replace(/~K\d+K/,h)}return c.join("\n\n")},G=function(a){return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")},H=function(a){return a=a.replace(/\\(\\)/g,O),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,O)},I=function(a){return a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,b){return J(K(b))})},J=function(a){var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if("@"==a)a=b[Math.floor(2*Math.random())](a);else if(":"!=a){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">')},K=function(a){return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)})},L=function(a){return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,"")},M=function(a){return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b){for(var c=b,d=4-c.length%4,e=0;d>e;e++)c+=" ";return c}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,"")},N=function(a,b,c){var d="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);var e=new RegExp(d,"g");return a=a.replace(e,O)},O=function(a,b){var c=b.charCodeAt(0);return"~E"+c+"E"}},"undefined"!=typeof module&&(module.exports=Showdown),"function"==typeof define&&define.amd&&define("showdown",function(){return Showdown});