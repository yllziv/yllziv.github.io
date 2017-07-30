CodeMirror.defineMode("less",function(e){function t(e,t){return s=t,e}function n(e){for(var t=0;t<c.length;t++)if(e===c[t])return!0}function r(e,r){var s=e.next();return"@"==s?(e.eatWhile(/[\w\-]/),t("meta",e.current())):"/"==s&&e.eat("*")?(r.tokenize=i,i(e,r)):"<"==s&&e.eat("!")?(r.tokenize=o,o(e,r)):"="!=s?"~"!=s&&"|"!=s||!e.eat("=")?'"'==s||"'"==s?(r.tokenize=l(s),r.tokenize(e,r)):"/"==s?e.eat("/")?(r.tokenize=a,a(e,r)):(e.eatWhile(/[\a-zA-Z0-9\-_.\s]/),/\/|\)|#/.test(e.peek()||e.eol()||e.eatSpace()&&")"==e.peek())?t("string","string"):t("number","unit")):"!"==s?(e.match(/^\s*\w*/),t("keyword","important")):/\d/.test(s)?(e.eatWhile(/[\w.%]/),t("number","unit")):/[,+<>*\/]/.test(s)?t(null,"select-op"):/[;{}:\[\]()]/.test(s)?":"==s?(e.eatWhile(/[active|hover|link|visited]/),e.current().match(/active|hover|link|visited/)?t("tag","tag"):t(null,s)):t(null,s):"."==s?(e.eatWhile(/[\a-zA-Z0-9\-_]/),t("tag","tag")):"#"==s?(e.eatWhile(/[A-Za-z0-9]/),4!==e.current().length&&7!==e.current().length||null==e.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,!1)?(e.eatWhile(/[\w\\\-]/),t("atom","tag")):e.current().substring(1)!=e.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,!1)?t("atom","tag"):(e.eatSpace(),/[\/<>.(){!$%^&*_\-\\?=+\|#'~`]/.test(e.peek())?t("atom","tag"):"}"==e.peek()?t("number","unit"):/[a-zA-Z\\]/.test(e.peek())?t("atom","tag"):e.eol()?t("atom","tag"):t("number","unit"))):"&"==s?(e.eatWhile(/[\w\-]/),t(null,s)):(e.eatWhile(/[\w\\\-_%.{]/),null!=e.current().match(/http|https/)?(e.eatWhile(/[\w\\\-_%.{:\/]/),t("string","string")):"<"==e.peek()||">"==e.peek()?t("tag","tag"):null!=e.peek().match(/\(/)?t(null,s):"/"==e.peek()&&void 0!=r.stack[r.stack.length-1]?t("string","string"):e.current().match(/\-\d|\-.\d/)?t("number","unit"):n(e.current())?t("tag","tag"):/\/|[\s\)]/.test(e.peek()||e.eol()||e.eatSpace()&&"/"==e.peek())&&e.current().indexOf(".")!==-1?"{"==e.current().substring(e.current().length-1,e.current().length)?(e.backUp(1),t("tag","tag")):e.eatSpace()&&null!=e.peek().match(/[{<>.a-zA-Z]/)||e.eol()?t("tag","tag"):t("string","string"):e.eol()?("{"==e.current().substring(e.current().length-1,e.current().length)&&e.backUp(1),t("tag","tag")):t("variable","variable")):t(null,"compare"):void t(null,"compare")}function a(e,n){return e.skipToEnd(),n.tokenize=r,t("comment","comment")}function i(e,n){for(var a,i=!1;null!=(a=e.next());){if(i&&"/"==a){n.tokenize=r;break}i="*"==a}return t("comment","comment")}function o(e,n){for(var a,i=0;null!=(a=e.next());){if(i>=2&&">"==a){n.tokenize=r;break}i="-"==a?i+1:0}return t("comment","comment")}function l(e){return function(n,a){for(var i,o=!1;null!=(i=n.next())&&(i!=e||o);)o=!o&&"\\"==i;return o||(a.tokenize=r),t("string","string")}}var s,u=e.indentUnit,c=["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","keygen","kbd","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];return{startState:function(e){return{tokenize:r,baseIndent:e||0,stack:[]}},token:function(e,t){if(e.eatSpace())return null;var n=t.tokenize(e,t),r=t.stack[t.stack.length-1];return"hash"==s&&"rule"==r?n="atom":"variable"==n&&("rule"==r?n=null:r&&"@media{"!=r||(n="when"==e.current()?"variable":void 0!=e.string.match(/#/g)?null:/[\s,|\s\)]/.test(e.peek())?"tag":null)),"rule"==r&&/^[\{\};]$/.test(s)&&t.stack.pop(),"{"==s?"@media"==r?t.stack[t.stack.length-1]="@media{":t.stack.push("{"):"}"==s?t.stack.pop():"@media"==s?t.stack.push("@media"):"{"==r&&"comment"!=s&&t.stack.push("rule"),n},indent:function(e,t){var n=e.stack.length;return/^\}/.test(t)&&(n-="rule"==e.stack[e.stack.length-1]?2:1),e.baseIndent+n*u},electricChars:"}"}}),CodeMirror.defineMIME("text/x-less","less"),CodeMirror.mimeModes.hasOwnProperty("text/css")||CodeMirror.defineMIME("text/css","less");