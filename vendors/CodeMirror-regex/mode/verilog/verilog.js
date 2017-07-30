CodeMirror.defineMode("verilog",function(e,n){function t(e,n){var t=e.next();if(m[t]){var o=m[t](e,n);if(o!==!1)return o}if('"'==t)return n.tokenize=r(t),n.tokenize(e,n);if(/[\[\]{}\(\),;\:\.]/.test(t))return s=t,null;if(/[\d']/.test(t))return e.eatWhile(/[\w\.']/),"number";if("/"==t){if(e.eat("*"))return n.tokenize=i,i(e,n);if(e.eat("/"))return e.skipToEnd(),"comment"}if(g.test(t))return e.eatWhile(g),"operator";e.eatWhile(/[\w\$_]/);var a=e.current();return f.propertyIsEnumerable(a)?(d.propertyIsEnumerable(a)&&(s="newstatement"),"keyword"):c.propertyIsEnumerable(a)?"atom":"word"}function r(e){return function(n,r){for(var i,o=!1,a=!1;null!=(i=n.next());){if(i==e&&!o){a=!0;break}o=!o&&"\\"==i}return(a||!o&&!p)&&(r.tokenize=t),"string"}}function i(e,n){for(var r,i=!1;r=e.next();){if("/"==r&&i){n.tokenize=t;break}i="*"==r}return"comment"}function o(e,n,t,r,i){this.indented=e,this.column=n,this.type=t,this.align=r,this.prev=i}function a(e,n,t){return e.context=new o(e.indented,n,t,null,e.context)}function l(e){var n=e.context.type;return")"!=n&&"]"!=n&&"}"!=n||(e.indented=e.context.indented),e.context=e.context.prev}var s,u=e.indentUnit,f=n.keywords||{},d=n.blockKeywords||{},c=n.atoms||{},m=n.hooks||{},p=n.multiLineStrings,g=/[&|~><!\)\(*#%@+\/=?\:;}{,\.\^\-\[\]]/;return{startState:function(e){return{tokenize:null,context:new o((e||0)-u,0,"top",(!1)),indented:0,startOfLine:!0}},token:function(e,n){var r=n.context;if(e.sol()&&(null==r.align&&(r.align=!1),n.indented=e.indentation(),n.startOfLine=!0),e.eatSpace())return null;s=null;var i=(n.tokenize||t)(e,n);if("comment"==i||"meta"==i)return i;if(null==r.align&&(r.align=!0),";"!=s&&":"!=s||"statement"!=r.type)if("{"==s)a(n,e.column(),"}");else if("["==s)a(n,e.column(),"]");else if("("==s)a(n,e.column(),")");else if("}"==s){for(;"statement"==r.type;)r=l(n);for("}"==r.type&&(r=l(n));"statement"==r.type;)r=l(n)}else s==r.type?l(n):("}"==r.type||"top"==r.type||"statement"==r.type&&"newstatement"==s)&&a(n,e.column(),"statement");else l(n);return n.startOfLine=!1,i},indent:function(e,n){if(e.tokenize!=t&&null!=e.tokenize)return 0;var r=n&&n.charAt(0),i=e.context,o=r==i.type;return"statement"==i.type?i.indented+("{"==r?0:u):i.align?i.column+(o?0:1):i.indented+(o?0:u)},electricChars:"{}"}}),function(){function e(e){for(var n={},t=e.split(" "),r=0;r<t.length;++r)n[t[r]]=!0;return n}function n(e,n){return e.eatWhile(/[\w\$_]/),"meta"}var t="always and assign automatic begin buf bufif0 bufif1 case casex casez cell cmos config deassign default defparam design disable edge else end endcase endconfig endfunction endgenerate endmodule endprimitive endspecify endtable endtask event for force forever fork function generate genvar highz0 highz1 if ifnone incdir include initial inout input instance integer join large liblist library localparam macromodule medium module nand negedge nmos nor noshowcancelled not notif0 notif1 or output parameter pmos posedge primitive pull0 pull1 pulldown pullup pulsestyle_onevent pulsestyle_ondetect rcmos real realtime reg release repeat rnmos rpmos rtran rtranif0 rtranif1 scalared showcancelled signed small specify specparam strong0 strong1 supply0 supply1 table task time tran tranif0 tranif1 tri tri0 tri1 triand trior trireg unsigned use vectored wait wand weak0 weak1 while wire wor xnor xor",r="begin bufif0 bufif1 case casex casez config else end endcase endconfig endfunction endgenerate endmodule endprimitive endspecify endtable endtask for forever function generate if ifnone macromodule module primitive repeat specify table task while";CodeMirror.defineMIME("text/x-verilog",{name:"verilog",keywords:e(t),blockKeywords:e(r),atoms:e("null"),hooks:{"`":n,$:n}})}();