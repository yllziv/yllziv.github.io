!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){function n(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function a(e,t,r){return ve=e,ye=r,t}function i(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=o(r),t.tokenize(e,t);if("."==r&&e.match(/^\d+(?:[eE][+\-]?\d+)?/))return a("number","number");if("."==r&&e.match(".."))return a("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return a(r);if("="==r&&e.eat(">"))return a("=>","operator");if("0"==r&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),a("number","number");if(/\d/.test(r))return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),a("number","number");if("/"==r)return e.eat("*")?(t.tokenize=c,c(e,t)):e.eat("/")?(e.skipToEnd(),a("comment","comment")):"operator"==t.lastType||"keyword c"==t.lastType||"sof"==t.lastType||/^[\[{}\(,;:]$/.test(t.lastType)?(n(e),e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/),a("regexp","string-2")):(e.eatWhile(Me),a("operator","operator",e.current()));if("`"==r)return t.tokenize=l,l(e,t);if("#"==r)return e.skipToEnd(),a("error","error");if(Me.test(r))return e.eatWhile(Me),a("operator","operator",e.current());if(we.test(r)){e.eatWhile(we);var i=e.current(),u=je.propertyIsEnumerable(i)&&je[i];return u&&"."!=t.lastType?a(u.type,u.style,i):a("variable","variable",i)}}function o(e){return function(t,r){var n,o=!1;if(xe&&"@"==t.peek()&&t.match(Ve))return r.tokenize=i,a("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||o);)o=!o&&"\\"==n;return o||(r.tokenize=i),a("string","string")}}function c(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=i;break}n="*"==r}return a("comment","comment")}function l(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=i;break}n=!n&&"\\"==r}return a("quasi","string-2",e.current())}function u(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){for(var n=0,a=!1,i=r-1;i>=0;--i){var o=e.string.charAt(i),c=Ee.indexOf(o);if(c>=0&&c<3){if(!n){++i;break}if(0==--n)break}else if(c>=3&&c<6)++n;else if(we.test(o))a=!0;else{if(/["'\/]/.test(o))return;if(a&&!n){++i;break}}}a&&!n&&(t.fatArrowAt=i)}}function f(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function s(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(var r=n.vars;r;r=r.next)if(r.name==t)return!0}function d(e,t,r,n,a){var i=e.cc;for(ze.state=e,ze.stream=a,ze.marked=null,ze.cc=i,ze.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){var o=i.length?i.pop():he?w:g;if(o(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return ze.marked?ze.marked:"variable"==r&&s(e,n)?"variable-2":t}}}function p(){for(var e=arguments.length-1;e>=0;e--)ze.cc.push(arguments[e])}function m(){return p.apply(null,arguments),!0}function v(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}var n=ze.state;if(n.context){if(ze.marked="def",t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;r.globalVars&&(n.globalVars={name:e,next:n.globalVars})}}function y(){ze.state.context={prev:ze.state.context,vars:ze.state.localVars},ze.state.localVars=Te}function k(){ze.state.localVars=ze.state.context.vars,ze.state.context=ze.state.context.prev}function b(e,t){var r=function(){var r=ze.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new f(n,ze.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function x(){var e=ze.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function h(e){function t(r){return r==e?m():";"==e?p():m(t)}return t}function g(e,t){return"var"==e?m(b("vardef",t.length),F,h(";"),x):"keyword a"==e?m(b("form"),w,g,x):"keyword b"==e?m(b("form"),g,x):"{"==e?m(b("}"),H,x):";"==e?m():"if"==e?("else"==ze.state.lexical.info&&ze.state.cc[ze.state.cc.length-1]==x&&ze.state.cc.pop()(),m(b("form"),w,g,x,Q)):"function"==e?m(ee):"for"==e?m(b("form"),R,g,x):"variable"==e?m(b("stat"),q):"switch"==e?m(b("form"),w,b("}","switch"),h("{"),H,x,x):"case"==e?m(w,h(":")):"default"==e?m(h(":")):"catch"==e?m(b("form"),y,h("("),te,h(")"),g,x,k):"module"==e?m(b("form"),y,oe,k,x):"class"==e?m(b("form"),re,x):"export"==e?m(b("form"),ce,x):"import"==e?m(b("form"),le,x):p(b("stat"),w,h(";"),x)}function w(e){return M(e,!1)}function j(e){return M(e,!0)}function M(e,t){if(ze.state.fatArrowAt==ze.stream.start){var r=t?$:C;if("("==e)return m(y,b(")"),N(G,")"),x,h("=>"),r,k);if("variable"==e)return p(y,G,h("=>"),r,k)}var n=t?z:I;return Ie.hasOwnProperty(e)?m(n):"function"==e?m(ee,n):"keyword c"==e?m(t?E:V):"("==e?m(b(")"),V,pe,h(")"),x,n):"operator"==e||"spread"==e?m(t?j:w):"["==e?m(b("]"),se,x,n):"{"==e?B(P,"}",null,n):"quasi"==e?p(T,n):m()}function V(e){return e.match(/[;\}\)\],]/)?p():p(w)}function E(e){return e.match(/[;\}\)\],]/)?p():p(j)}function I(e,t){return","==e?m(w):z(e,t,!1)}function z(e,t,r){var n=0==r?I:z,a=0==r?w:j;return"=>"==e?m(y,r?$:C,k):"operator"==e?/\+\+|--/.test(t)?m(n):"?"==t?m(w,h(":"),a):m(a):"quasi"==e?p(T,n):";"!=e?"("==e?B(j,")","call",n):"."==e?m(O,n):"["==e?m(b("]"),V,h("]"),x,n):void 0:void 0}function T(e,t){return"quasi"!=e?p():"${"!=t.slice(t.length-2)?m(T):m(w,A)}function A(e){if("}"==e)return ze.marked="string-2",ze.state.tokenize=l,m(T)}function C(e){return u(ze.stream,ze.state),p("{"==e?g:w)}function $(e){return u(ze.stream,ze.state),p("{"==e?g:j)}function q(e){return":"==e?m(x,g):p(I,h(";"),x)}function O(e){if("variable"==e)return ze.marked="property",m()}function P(e,t){return"variable"==e||"keyword"==ze.style?(ze.marked="property",m("get"==t||"set"==t?S:W)):"number"==e||"string"==e?(ze.marked=xe?"property":ze.style+" property",m(W)):"jsonld-keyword"==e?m(W):"["==e?m(w,h("]"),W):void 0}function S(e){return"variable"!=e?p(W):(ze.marked="property",m(ee))}function W(e){return":"==e?m(j):"("==e?p(ee):void 0}function N(e,t){function r(n){if(","==n){var a=ze.state.lexical;return"call"==a.info&&(a.pos=(a.pos||0)+1),m(e,r)}return n==t?m():m(h(t))}return function(n){return n==t?m():p(e,r)}}function B(e,t,r){for(var n=3;n<arguments.length;n++)ze.cc.push(arguments[n]);return m(b(t,r),N(e,t),x)}function H(e){return"}"==e?m():p(g,H)}function U(e){if(ge&&":"==e)return m(D)}function D(e){if("variable"==e)return ze.marked="variable-3",m()}function F(){return p(G,U,K,L)}function G(e,t){return"variable"==e?(v(t),m()):"["==e?B(G,"]"):"{"==e?B(J,"}"):void 0}function J(e,t){return"variable"!=e||ze.stream.match(/^\s*:/,!1)?("variable"==e&&(ze.marked="property"),m(h(":"),G,K)):(v(t),m(K))}function K(e,t){if("="==t)return m(j)}function L(e){if(","==e)return m(F)}function Q(e,t){if("keyword b"==e&&"else"==t)return m(b("form","else"),g,x)}function R(e){if("("==e)return m(b(")"),X,h(")"),x)}function X(e){return"var"==e?m(F,h(";"),Z):";"==e?m(Z):"variable"==e?m(Y):p(w,h(";"),Z)}function Y(e,t){return"in"==t||"of"==t?(ze.marked="keyword",m(w)):m(I,Z)}function Z(e,t){return";"==e?m(_):"in"==t||"of"==t?(ze.marked="keyword",m(w)):p(w,h(";"),_)}function _(e){")"!=e&&m(w)}function ee(e,t){return"*"==t?(ze.marked="keyword",m(ee)):"variable"==e?(v(t),m(ee)):"("==e?m(y,b(")"),N(te,")"),x,g,k):void 0}function te(e){return"spread"==e?m(te):p(G,U)}function re(e,t){if("variable"==e)return v(t),m(ne)}function ne(e,t){return"extends"==t?m(w,ne):"{"==e?m(b("}"),ae,x):void 0}function ae(e,t){return"variable"==e||"keyword"==ze.style?"static"==t?(ze.marked="keyword",m(ae)):(ze.marked="property","get"==t||"set"==t?m(ie,ee,ae):m(ee,ae)):"*"==t?(ze.marked="keyword",m(ae)):";"==e?m(ae):"}"==e?m():void 0}function ie(e){return"variable"!=e?p():(ze.marked="property",m())}function oe(e,t){return"string"==e?m(g):"variable"==e?(v(t),m(fe)):void 0}function ce(e,t){return"*"==t?(ze.marked="keyword",m(fe,h(";"))):"default"==t?(ze.marked="keyword",m(w,h(";"))):p(g)}function le(e){return"string"==e?m():p(ue,fe)}function ue(e,t){return"{"==e?B(ue,"}"):("variable"==e&&v(t),m())}function fe(e,t){if("from"==t)return ze.marked="keyword",m(w)}function se(e){return"]"==e?m():p(j,de)}function de(e){return"for"==e?p(pe,h("]")):","==e?m(N(E,"]")):p(N(j,"]"))}function pe(e){return"for"==e?m(R,pe):"if"==e?m(w,pe):void 0}function me(e,t){return"operator"==e.lastType||","==e.lastType||Me.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}var ve,ye,ke=t.indentUnit,be=r.statementIndent,xe=r.jsonld,he=r.json||xe,ge=r.typescript,we=r.wordCharacters||/[\w$\xa1-\uffff]/,je=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("operator"),i={type:"atom",style:"atom"},o={"if":e("if"),"while":t,"with":t,"else":r,"do":r,"try":r,"finally":r,"return":n,"break":n,"continue":n,"new":n,"delete":n,"throw":n,"debugger":n,"var":e("var"),"const":e("var"),"let":e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":a,"typeof":a,"instanceof":a,"true":i,"false":i,"null":i,undefined:i,NaN:i,Infinity:i,"this":e("this"),module:e("module"),"class":e("class"),"super":e("atom"),"yield":n,"export":e("export"),"import":e("import"),"extends":n};if(ge){var c={type:"variable",style:"variable-3"},l={"interface":e("interface"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),string:c,number:c,bool:c,any:c};for(var u in l)o[u]=l[u]}return o}(),Me=/[+\-*&%=<>!?|~^]/,Ve=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Ee="([{}])",Ie={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},ze={state:null,column:null,marked:null,cc:null},Te={name:"this",next:{name:"arguments"}};return x.lex=!0,{startState:function(e){var t={tokenize:i,lastType:"sof",cc:[],lexical:new f((e||0)-ke,0,"block",(!1)),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),u(e,t)),t.tokenize!=c&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==ve?r:(t.lastType="operator"!=ve||"++"!=ye&&"--"!=ye?ve:"incdec",d(t,r,ve,ye,e))},indent:function(t,n){if(t.tokenize==c)return e.Pass;if(t.tokenize!=i)return 0;var a=n&&n.charAt(0),o=t.lexical;if(!/^\s*else\b/.test(n))for(var l=t.cc.length-1;l>=0;--l){var u=t.cc[l];if(u==x)o=o.prev;else if(u!=Q)break}"stat"==o.type&&"}"==a&&(o=o.prev),be&&")"==o.type&&"stat"==o.prev.type&&(o=o.prev);var f=o.type,s=a==f;return"vardef"==f?o.indented+("operator"==t.lastType||","==t.lastType?o.info+1:0):"form"==f&&"{"==a?o.indented:"form"==f?o.indented+ke:"stat"==f?o.indented+(me(t,n)?be||ke:0):"switch"!=o.info||s||0==r.doubleIndentSwitch?o.align?o.column+(s?0:1):o.indented+(s?0:ke):o.indented+(/^(?:case|default)\b/.test(n)?ke:2*ke)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:he?null:"/*",blockCommentEnd:he?null:"*/",lineComment:he?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:he?"json":"javascript",jsonldMode:xe,jsonMode:he}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});