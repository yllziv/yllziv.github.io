CodeMirror.defineMode("q",function(e){function t(e){return new RegExp("^("+e.join("|")+")$")}function n(e,t){var o=e.sol(),c=e.next();if(l=null,o){if("/"==c)return(t.tokenize=r)(e,t);if("\\"==c)return e.eol()||/\s/.test(e.peek())?(e.skipToEnd(),/^\\\s*$/.test(e.current())?(t.tokenize=i)(e,t):t.tokenize=n,"comment"):(t.tokenize=n,"builtin")}if(/\s/.test(c))return"/"==e.peek()?(e.skipToEnd(),"comment"):"whitespace";if('"'==c)return(t.tokenize=s)(e,t);if("`"==c)return e.eatWhile(/[A-Z|a-z|\d|_|:|\/|\.]/),"symbol";if("."==c&&/\d/.test(e.peek())||/\d/.test(c)){var a=null;return e.backUp(1),e.match(/^\d{4}\.\d{2}(m|\.\d{2}([D|T](\d{2}(:\d{2}(:\d{2}(\.\d{1,9})?)?)?)?)?)/)||e.match(/^\d+D(\d{2}(:\d{2}(:\d{2}(\.\d{1,9})?)?)?)/)||e.match(/^\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?/)||e.match(/^\d+[ptuv]{1}/)?a="temporal":(e.match(/^0[NwW]{1}/)||e.match(/^0x[\d|a-f|A-F]*/)||e.match(/^[0|1]+[b]{1}/)||e.match(/^\d+[chijn]{1}/)||e.match(/-?\d*(\.\d*)?(e[+\-]?\d+)?(e|f)?/))&&(a="number"),!a||(c=e.peek())&&!m.test(c)?(e.next(),"error"):a}return/[A-Z|a-z]|\./.test(c)?(e.eatWhile(/[A-Z|a-z|\.|_|\d]/),u.test(e.current())?"keyword":"variable"):/[|\/&^!+:\\\-*%$=~#;@><\.,?_\']/.test(c)?null:/[{}\(\[\]\)]/.test(c)?null:"error"}function r(e,t){return e.skipToEnd(),/\/\s*$/.test(e.current())?(t.tokenize=o)(e,t):t.tokenize=n,"comment"}function o(e,t){var r=e.sol()&&"\\"==e.peek();return e.skipToEnd(),r&&/^\\\s*$/.test(e.current())&&(t.tokenize=n),"comment"}function i(e){return e.skipToEnd(),"comment"}function s(e,t){for(var r,o=!1,i=!1;r=e.next();){if('"'==r&&!o){i=!0;break}o=!o&&"\\"==r}return i&&(t.tokenize=n),"string"}function c(e,t,n){e.context={prev:e.context,indent:e.indent,col:n,type:t}}function a(e){e.indent=e.context.indent,e.context=e.context.prev}var l,d=e.indentUnit,u=t(["abs","acos","aj","aj0","all","and","any","asc","asin","asof","atan","attr","avg","avgs","bin","by","ceiling","cols","cor","cos","count","cov","cross","csv","cut","delete","deltas","desc","dev","differ","distinct","div","do","each","ej","enlist","eval","except","exec","exit","exp","fby","fills","first","fkeys","flip","floor","from","get","getenv","group","gtime","hclose","hcount","hdel","hopen","hsym","iasc","idesc","if","ij","in","insert","inter","inv","key","keys","last","like","list","lj","load","log","lower","lsq","ltime","ltrim","mavg","max","maxs","mcount","md5","mdev","med","meta","min","mins","mmax","mmin","mmu","mod","msum","neg","next","not","null","or","over","parse","peach","pj","plist","prd","prds","prev","prior","rand","rank","ratios","raze","read0","read1","reciprocal","reverse","rload","rotate","rsave","rtrim","save","scan","select","set","setenv","show","signum","sin","sqrt","ss","ssr","string","sublist","sum","sums","sv","system","tables","tan","til","trim","txf","type","uj","ungroup","union","update","upper","upsert","value","var","view","views","vs","wavg","where","where","while","within","wj","wj1","wsum","xasc","xbar","xcol","xcols","xdesc","xexp","xgroup","xkey","xlog","xprev","xrank"]),m=/[|\/&^!+:\\\-*%$=~#;@><,?_\'\"\[\(\]\)\s{}]/;return{startState:function(){return{tokenize:n,context:null,indent:0,col:0}},token:function(e,t){e.sol()&&(t.context&&null==t.context.align&&(t.context.align=!1),t.indent=e.indentation());var n=t.tokenize(e,t);if("comment"!=n&&t.context&&null==t.context.align&&"pattern"!=t.context.type&&(t.context.align=!0),"("==l)c(t,")",e.column());else if("["==l)c(t,"]",e.column());else if("{"==l)c(t,"}",e.column());else if(/[\]\}\)]/.test(l)){for(;t.context&&"pattern"==t.context.type;)a(t);t.context&&l==t.context.type&&a(t)}else"."==l&&t.context&&"pattern"==t.context.type?a(t):/atom|string|variable/.test(n)&&t.context&&(/[\}\]]/.test(t.context.type)?c(t,"pattern",e.column()):"pattern"!=t.context.type||t.context.align||(t.context.align=!0,t.context.col=e.column()));return n},indent:function(e,t){var n=t&&t.charAt(0),r=e.context;if(/[\]\}]/.test(n))for(;r&&"pattern"==r.type;)r=r.prev;var o=r&&n==r.type;return r?"pattern"==r.type?r.col:r.align?r.col+(o?0:1):r.indent+(o?0:d):0}}}),CodeMirror.defineMIME("text/x-q","q");