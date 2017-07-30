CodeMirror.defineMode("shell",function(e){function t(e,t){var f=e.sol(),a=e.next();if("'"===a||'"'===a||"`"===a)return t.tokens.unshift(n(a)),r(e,t);if("#"===a)return f&&e.eat("!")?(e.skipToEnd(),"meta"):(e.skipToEnd(),"comment");if("$"===a)return t.tokens.unshift(u),r(e,t);if("+"===a||"="===a)return"operator";if("-"===a)return e.eat("-"),e.eatWhile(/\w/),"attribute";if(/\d/.test(a)&&(e.eatWhile(/\d/),!/\w/.test(e.peek())))return"number";e.eatWhile(/\w/);var l=e.current();return"="===e.peek()&&/\w+/.test(l)?"def":i.indexOf(l)!==-1?"atom":s.indexOf(l)!==-1?"builtin":o.indexOf(l)!==-1?"keyword":"word"}function n(e){return function(t,n){for(var r,i=!1,o=!1;null!=(r=t.next());){if(r===e&&!o){i=!0;break}if("$"===r&&!o&&"'"!==e){o=!0,t.backUp(1),n.tokens.unshift(u);break}o=!o&&"\\"===r}return!i&&o||n.tokens.shift(),"`"===e||")"===e?"quote":"string"}}function r(e,n){return(n.tokens[0]||t)(e,n)}var i=["true","false"],o=["if","then","do","else","elif","while","until","for","in","esac","fi","fin","fil","done","exit","set","unset","export","function"],s=["ab","awk","bash","beep","cat","cc","cd","chown","chmod","chroot","clear","cp","curl","cut","diff","echo","find","gawk","gcc","get","git","grep","kill","killall","ls","make","mkdir","openssl","mv","nc","node","npm","ping","ps","restart","rm","rmdir","sed","service","sh","shopt","shred","source","sort","sleep","ssh","start","stop","su","sudo","tee","telnet","top","touch","vi","vim","wall","wc","wget","who","write","yes","zsh"],u=function(e,t){t.tokens.length>1&&e.eat("$");var i=e.next(),o=/\w/;return"{"===i&&(o=/[^}]/),"("===i?(t.tokens[0]=n(")"),r(e,t)):(/\d/.test(i)||(e.eatWhile(o),e.eat("}")),t.tokens.shift(),"def")};return{startState:function(){return{tokens:[]}},token:function(e,t){return e.eatSpace()?null:r(e,t)}}}),CodeMirror.defineMIME("text/x-sh","shell");