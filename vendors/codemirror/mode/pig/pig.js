CodeMirror.defineMode("pig",function(O,T){function E(O,T,E){return T.tokenize=E,E(O,T)}function e(O,T){return t=O,T}function I(O,T){for(var E,I=!1;E=O.next();){if("/"==E&&I){T.tokenize=N;break}I="*"==E}return e("comment","comment")}function r(O){return function(T,E){for(var I,r=!1,t=!1;null!=(I=T.next());){if(I==O&&!r){t=!0;break}r=!r&&"\\"==I}return(t||!r&&!n)&&(E.tokenize=N),e("string","error")}}function N(O,T){var N=O.next();return'"'==N||"'"==N?E(O,T,r(N)):/[\[\]{}\(\),;\.]/.test(N)?e(N):/\d/.test(N)?(O.eatWhile(/[\w\.]/),e("number","number")):"/"==N?O.eat("*")?E(O,T,I):(O.eatWhile(L),e("operator","operator")):"-"==N?O.eat("-")?(O.skipToEnd(),e("comment","comment")):(O.eatWhile(L),e("operator","operator")):L.test(N)?(O.eatWhile(L),e("operator","operator")):(O.eatWhile(/[\w\$_]/),A&&A.propertyIsEnumerable(O.current().toUpperCase())&&!O.eat(")")&&!O.eat(".")?"keyword":R&&R.propertyIsEnumerable(O.current().toUpperCase())?"variable-2":S&&S.propertyIsEnumerable(O.current().toUpperCase())?"variable-3":e("variable","pig-word"))}var t,A=T.keywords,R=T.builtins,S=T.types,n=T.multiLineStrings,L=/[*+\-%<>=&?:\/!|]/;return{startState:function(){return{tokenize:N,startOfLine:!0}},token:function(O,T){if(O.eatSpace())return null;var E=T.tokenize(O,T);return E}}}),function(){function O(O){for(var T={},E=O.split(" "),e=0;e<E.length;++e)T[E[e]]=!0;return T}var T="ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ",E="VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE ",e="BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ";CodeMirror.defineMIME("text/x-pig",{name:"pig",builtins:O(T),keywords:O(E),types:O(e)})}();