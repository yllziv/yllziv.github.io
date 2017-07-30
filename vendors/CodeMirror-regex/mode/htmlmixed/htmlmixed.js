CodeMirror.defineMode("htmlmixed",function(t,e){function a(t,e){var a=l.token(t,e.htmlState);return"tag"==a&&">"==t.current()&&e.htmlState.context&&(/^script$/i.test(e.htmlState.context.tagName)?(e.token=n,e.localState=c.startState(l.indent(e.htmlState,"")),e.mode="javascript"):/^style$/i.test(e.htmlState.context.tagName)&&(e.token=r,e.localState=i.startState(l.indent(e.htmlState,"")),e.mode="css")),a}function o(t,e,a){var o=t.current(),n=o.search(e);return n>-1&&t.backUp(o.length-n),a}function n(t,e){return t.match(/^<\/\s*script\s*>/i,!1)?(e.token=a,e.localState=null,e.mode="html",a(t,e)):o(t,/<\/\s*script\s*>/,c.token(t,e.localState))}function r(t,e){return t.match(/^<\/\s*style\s*>/i,!1)?(e.token=a,e.localState=null,e.mode="html",a(t,e)):o(t,/<\/\s*style\s*>/,i.token(t,e.localState))}var l=CodeMirror.getMode(t,{name:"xml",htmlMode:!0}),c=CodeMirror.getMode(t,"javascript"),i=CodeMirror.getMode(t,"css");return{startState:function(){var t=l.startState();return{token:a,localState:null,mode:"html",htmlState:t}},copyState:function(t){if(t.localState)var e=CodeMirror.copyState(t.token==r?i:c,t.localState);return{token:t.token,localState:e,mode:t.mode,htmlState:CodeMirror.copyState(l,t.htmlState)}},token:function(t,e){return e.token(t,e)},indent:function(t,e){return t.token==a||/^\s*<\//.test(e)?l.indent(t.htmlState,e):t.token==n?c.indent(t.localState,e):i.indent(t.localState,e)},compareStates:function(t,e){return t.mode==e.mode&&(t.localState?CodeMirror.Pass:l.compareStates(t.htmlState,e.htmlState))},electricChars:"/{}:"}},"xml","javascript","css"),CodeMirror.defineMIME("text/html","htmlmixed");