CodeMirror.runMode=function(e,r,t,o){var d=CodeMirror.getMode(CodeMirror.defaults,r),n=/MSIE \d/.test(navigator.userAgent),a=n&&(null==document.documentMode||document.documentMode<9);if(1==t.nodeType){var i=o&&o.tabSize||CodeMirror.defaults.tabSize,c=t,l=0;c.innerHTML="",t=function(e,r){if("\n"==e)return c.appendChild(document.createTextNode(a?"\r":e)),void(l=0);for(var t="",o=0;;){var d=e.indexOf("\t",o);if(d==-1){t+=e.slice(o),l+=e.length-o;break}l+=d-o,t+=e.slice(o,d);var n=i-l%i;l+=n;for(var u=0;u<n;++u)t+=" ";o=d+1}if(r){var s=c.appendChild(document.createElement("span"));s.className="cm-"+r.replace(/ +/g," cm-"),s.appendChild(document.createTextNode(t))}else c.appendChild(document.createTextNode(t))}}for(var u=CodeMirror.splitLines(e),s=CodeMirror.startState(d),f=0,m=u.length;f<m;++f){f&&t("\n");for(var p=new CodeMirror.StringStream(u[f]);!p.eol();){var M=d.token(p,s);t(p.current(),M,f,p.start),p.start=p.pos}}};