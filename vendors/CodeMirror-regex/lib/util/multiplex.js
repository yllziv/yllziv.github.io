CodeMirror.multiplexingMode=function(e){var r=Array.prototype.slice.call(arguments,1),n=r.length;return{startState:function(){return{outer:CodeMirror.startState(e),innerActive:null,inner:null}},copyState:function(r){return{outer:CodeMirror.copyState(e,r.outer),innerActive:r.innerActive,inner:r.innerActive&&CodeMirror.copyState(r.innerActive.mode,r.inner)}},token:function(t,i){if(i.innerActive){var o=i.innerActive;if(t.match(o.close))return i.innerActive=i.inner=null,o.delimStyle;var c=o.mode.token(t,i.inner),a=t.current(),u=a.indexOf(o.close);return u>-1&&t.backUp(a.length-u),c}for(var v=0;v<n;++v){var l=r[v];if(t.match(l.open))return i.innerActive=l,i.inner=CodeMirror.startState(l.mode),l.delimStyle}for(var d=e.token(t,i.outer),a=t.current(),v=0;v<n;++v){var l=r[v],u=a.indexOf(l.open);u>-1&&(t.backUp(a.length-u),a=a.slice(0,u))}return d},indent:function(r,n){var t=r.innerActive||e;return t.indent?t.indent(r.innerActive?r.inner:r.outer,n):CodeMirror.Pass},compareStates:function(r,n){if(r.innerActive!=n.innerActive)return!1;var t=r.innerActive||e;return t.compareStates?t.compareStates(r.innerActive?r.inner:r.outer,n.innerActive?n.inner:n.outer):CodeMirror.Pass},electricChars:e.electricChars}};