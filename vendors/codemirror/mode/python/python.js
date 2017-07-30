CodeMirror.defineMode("python",function(e,t){function n(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function r(e,t){if(e.sol()){var n=t.scopes[0].offset;if(e.eatSpace()){var r=e.indentation();return r>n?E="indent":r<n&&(E="dedent"),null}n>0&&a(e,t)}if(e.eatSpace())return null;var o=e.peek();if("#"===o)return e.skipToEnd(),"comment";if(e.match(/^[0-9\.]/,!1)){var s=!1;if(e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)&&(s=!0),e.match(/^\d+\.\d*/)&&(s=!0),e.match(/^\.\d+/)&&(s=!0),s)return e.eat(/J/i),"number";var y=!1;if(e.match(/^0x[0-9a-f]+/i)&&(y=!0),e.match(/^0b[01]+/i)&&(y=!0),e.match(/^0o[0-7]+/i)&&(y=!0),e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)&&(e.eat(/J/i),y=!0),e.match(/^0(?![\dx])/i)&&(y=!0),y)return e.eat(/L/i),"number"}return e.match(v)?(t.tokenize=i(e.current()),t.tokenize(e,t)):e.match(f)||e.match(u)?null:e.match(d)||e.match(c)||e.match(h)?"operator":e.match(p)?null:e.match(k)?"keyword":e.match(w)?"builtin":e.match(m)?"def"==t.lastToken||"class"==t.lastToken?"def":"variable":(e.next(),l)}function i(e){function n(n,a){for(;!n.eol();)if(n.eatWhile(/[^'"\\]/),n.eat("\\")){if(n.next(),i&&n.eol())return o}else{if(n.match(e))return a.tokenize=r,o;n.eat(/['"]/)}if(i){if(t.singleLineStringErrors)return l;a.tokenize=r}return o}for(;"rub".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var i=1==e.length,o="string";return n.isString=!0,n}function o(t,n,r){r=r||"py";var i=0;if("py"===r){if("py"!==n.scopes[0].type)return void(n.scopes[0].offset=t.indentation());for(var o=0;o<n.scopes.length;++o)if("py"===n.scopes[o].type){i=n.scopes[o].offset+e.indentUnit;break}}else i=t.column()+t.current().length;n.scopes.unshift({offset:i,type:r})}function a(e,t,n){if(n=n||"py",1!=t.scopes.length){if("py"===t.scopes[0].type){for(var r=e.indentation(),i=-1,o=0;o<t.scopes.length;++o)if(r===t.scopes[o].offset){i=o;break}if(i===-1)return!0;for(;t.scopes[0].offset!==r;)t.scopes.shift();return!1}return"py"===n?(t.scopes[0].offset=e.indentation(),!1):t.scopes[0].type!=n||(t.scopes.shift(),!1)}}function s(e,t){E=null;var n=t.tokenize(e,t),r=e.current();if("."===r)return n=e.match(m,!1)?null:l,null===n&&"meta"===t.lastStyle&&(n="meta"),n;if("@"===r)return e.match(m,!1)?"meta":l;"variable"!==n&&"builtin"!==n||"meta"!==t.lastStyle||(n="meta"),"pass"!==r&&"return"!==r||(t.dedent+=1),"lambda"===r&&(t.lambda=!0),(":"===r&&!t.lambda&&"py"==t.scopes[0].type||"indent"===E)&&o(e,t);var i="[({".indexOf(r);return i!==-1&&o(e,t,"])}".slice(i,i+1)),"dedent"===E&&a(e,t)?l:(i="])}".indexOf(r),i!==-1&&a(e,t,r)?l:(t.dedent>0&&e.eol()&&"py"==t.scopes[0].type&&(t.scopes.length>1&&t.scopes.shift(),t.dedent-=1),n))}var l="error",c=t.singleOperators||new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"),p=t.singleDelimiters||new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),d=t.doubleOperators||new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),u=t.doubleDelimiters||new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),f=t.tripleDelimiters||new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"),m=t.identifiers||new RegExp("^[_A-Za-z][_A-Za-z0-9]*"),h=n(["and","or","not","is","in"]),y=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield"],b=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"],x={builtins:["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"],keywords:["exec","print"]},g={builtins:["ascii","bytes","exec","print"],keywords:["nonlocal","False","True","None"]};if(void 0!=t.extra_keywords&&(y=y.concat(t.extra_keywords)),void 0!=t.extra_builtins&&(b=b.concat(t.extra_builtins)),t.version&&3===parseInt(t.version,10)){y=y.concat(g.keywords),b=b.concat(g.builtins);var v=new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i")}else{y=y.concat(x.keywords),b=b.concat(x.builtins);var v=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var k=n(y),w=n(b),E=null,_={startState:function(e){return{tokenize:r,scopes:[{offset:e||0,type:"py"}],lastStyle:null,lastToken:null,lambda:!1,dedent:0}},token:function(e,t){var n=s(e,t);t.lastStyle=n;var r=e.current();return r&&n&&(t.lastToken=r),e.eol()&&t.lambda&&(t.lambda=!1),n},indent:function(e){return e.tokenize!=r?e.tokenize.isString?CodeMirror.Pass:0:e.scopes[0].offset},lineComment:"#",fold:"indent"};return _}),CodeMirror.defineMIME("text/x-python","python");var words=function(e){return e.split(" ")};CodeMirror.defineMIME("text/x-cython",{name:"python",extra_keywords:words("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")});