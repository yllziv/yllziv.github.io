!function(){function e(e,n,o,l){t(e,n,l)?(e.replaceSelection("\n\n</"+l+">","end"),e.indentLine(o.line+1),e.indentLine(o.line+2),e.setCursor({line:o.line+1,ch:e.getLine(o.line+1).length})):(e.replaceSelection("</"+l+">"),e.setCursor(o))}function t(e,t,o){return"undefined"!=typeof t&&null!=t&&1!=t||(t=e.getOption("closeTagIndent")),t||(t=[]),n(t,o.toLowerCase())!=-1}function n(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,o=e.length;n<o;++n)if(e[n]==t)return n;return-1}function o(e,t,n){e.replaceSelection("/"+n+">"),e.setCursor({line:t.line,ch:t.ch+n.length+2})}CodeMirror.defaults.closeTagEnabled=!0,CodeMirror.defaults.closeTagIndent=["applet","blockquote","body","button","div","dl","fieldset","form","frameset","h1","h2","h3","h4","h5","h6","head","html","iframe","layer","legend","object","ol","p","select","table","ul"],CodeMirror.defineExtension("closeTag",function(t,n,l){if(!t.getOption("closeTagEnabled"))throw CodeMirror.Pass;var r=t.getOption("mode");if("text/html"==r){var a=t.getCursor(),i=t.getTokenAt(a),s=i.state;if(s.mode&&"html"!=s.mode)throw CodeMirror.Pass;if(">"==n){var c=s.htmlState?s.htmlState.type:s.type;if("tag"==i.className&&"closeTag"==c)throw CodeMirror.Pass;if(t.replaceSelection(">"),a={line:a.line,ch:a.ch+1},t.setCursor(a),i=t.getTokenAt(t.getCursor()),s=i.state,c=s.htmlState?s.htmlState.type:s.type,"tag"==i.className&&"selfcloseTag"!=c){var h=s.htmlState?s.htmlState.context.tagName:s.tagName;return void(h.length>0&&e(t,l,a,h))}t.setSelection({line:a.line,ch:a.ch-1},a),t.replaceSelection("")}else if("/"==n&&"tag"==i.className&&"<"==i.string){var h=s.htmlState?s.htmlState.context?s.htmlState.context.tagName:"":s.context.tagName;if(h.length>0)return void o(t,a,h)}}throw CodeMirror.Pass})}();