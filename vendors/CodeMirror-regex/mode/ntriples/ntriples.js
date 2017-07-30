CodeMirror.defineMode("ntriples",function(){function n(n,o){var t,i=n.location;t=i==Location.PRE_SUBJECT&&"<"==o?Location.WRITING_SUB_URI:i==Location.PRE_SUBJECT&&"_"==o?Location.WRITING_BNODE_URI:i==Location.PRE_PRED&&"<"==o?Location.WRITING_PRED_URI:i==Location.PRE_OBJ&&"<"==o?Location.WRITING_OBJ_URI:i==Location.PRE_OBJ&&"_"==o?Location.WRITING_OBJ_BNODE:i==Location.PRE_OBJ&&'"'==o?Location.WRITING_OBJ_LITERAL:i==Location.WRITING_SUB_URI&&">"==o?Location.PRE_PRED:i==Location.WRITING_BNODE_URI&&" "==o?Location.PRE_PRED:i==Location.WRITING_PRED_URI&&">"==o?Location.PRE_OBJ:i==Location.WRITING_OBJ_URI&&">"==o?Location.POST_OBJ:i==Location.WRITING_OBJ_BNODE&&" "==o?Location.POST_OBJ:i==Location.WRITING_OBJ_LITERAL&&'"'==o?Location.POST_OBJ:i==Location.WRITING_LIT_LANG&&" "==o?Location.POST_OBJ:i==Location.WRITING_LIT_TYPE&&">"==o?Location.POST_OBJ:i==Location.WRITING_OBJ_LITERAL&&"@"==o?Location.WRITING_LIT_LANG:i==Location.WRITING_OBJ_LITERAL&&"^"==o?Location.WRITING_LIT_TYPE:" "!=o||i!=Location.PRE_SUBJECT&&i!=Location.PRE_PRED&&i!=Location.PRE_OBJ&&i!=Location.POST_OBJ?i==Location.POST_OBJ&&"."==o?Location.PRE_SUBJECT:Location.ERROR:i,n.location=t}return Location={PRE_SUBJECT:0,WRITING_SUB_URI:1,WRITING_BNODE_URI:2,PRE_PRED:3,WRITING_PRED_URI:4,PRE_OBJ:5,WRITING_OBJ_URI:6,WRITING_OBJ_BNODE:7,WRITING_OBJ_LITERAL:8,WRITING_LIT_LANG:9,WRITING_LIT_TYPE:10,POST_OBJ:11,ERROR:12},untilSpace=function(n){return" "!=n},untilEndURI=function(n){return">"!=n},{startState:function(){return{location:Location.PRE_SUBJECT,uris:[],anchors:[],bnodes:[],langs:[],types:[]}},token:function(o,t){var i=o.next();if("<"==i){n(t,i);var _="";return o.eatWhile(function(n){return"#"!=n&&">"!=n&&(_+=n,!0)}),t.uris.push(_),o.match("#",!1)?"variable":(o.next(),n(t,">"),"variable")}if("#"==i){var I="";return o.eatWhile(function(n){return">"!=n&&" "!=n&&(I+=n,!0)}),t.anchors.push(I),"variable-2"}if(">"==i)return n(t,">"),"variable";if("_"==i){n(t,i);var a="";return o.eatWhile(function(n){return" "!=n&&(a+=n,!0)}),t.bnodes.push(a),o.next(),n(t," "),"builtin"}if('"'==i)return n(t,i),o.eatWhile(function(n){return'"'!=n}),o.next(),"@"!=o.peek()&&"^"!=o.peek()&&n(t,'"'),"string";if("@"==i){n(t,"@");var R="";return o.eatWhile(function(n){return" "!=n&&(R+=n,!0)}),t.langs.push(R),o.next(),n(t," "),"string-2"}if("^"==i){o.next(),n(t,"^");var e="";return o.eatWhile(function(n){return">"!=n&&(e+=n,!0)}),t.types.push(e),o.next(),n(t,">"),"variable"}" "==i&&n(t,i),"."==i&&n(t,i)}}}),CodeMirror.defineMIME("text/n-triples","ntriples");