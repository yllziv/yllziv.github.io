CodeMirror.registerHelper("fold","indent",function(r,e){for(var o=r.getOption("tabSize"),n=r.getLine(e.line),i=CodeMirror.countColumn(n,null,o),t=e.line+1,l=r.lineCount();t<l;++t){var d=r.getLine(t);if(CodeMirror.countColumn(d,null,o)<i&&CodeMirror.countColumn(r.getLine(t-1),null,o)>i)return{from:CodeMirror.Pos(e.line,n.length),to:CodeMirror.Pos(t,d.length)}}}),CodeMirror.indentRangeFinder=CodeMirror.fold.indent;