!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;o="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,o.markdownitFootnote=e()}}(function(){return function e(o,t,n){function r(f,i){if(!t[f]){if(!o[f]){var l="function"==typeof require&&require;if(!i&&l)return l(f,!0);if(s)return s(f,!0);var a=new Error("Cannot find module '"+f+"'");throw a.code="MODULE_NOT_FOUND",a}var u=t[f]={exports:{}};o[f][0].call(u.exports,function(e){var t=o[f][1][e];return r(t?t:e)},u,u.exports,e,o,t,n)}return t[f].exports}for(var s="function"==typeof require&&require,f=0;f<n.length;f++)r(n[f]);return r}({1:[function(e,o,t){"use strict";function n(e,o){var t=Number(e[o].meta.id+1).toString(),n="fnref"+t;return e[o].meta.subId>0&&(n+=":"+e[o].meta.subId),'<sup class="footnote-ref"><a href="#fn'+t+'" id="'+n+'">['+t+"]</a></sup>"}function r(e,o,t){return(t.xhtmlOut?'<hr class="footnotes-sep" />\n':'<hr class="footnotes-sep">\n')+'<section class="footnotes">\n<ol class="footnotes-list">\n'}function s(){return"</ol>\n</section>\n"}function f(e,o){var t=Number(e[o].meta.id+1).toString();return'<li id="fn'+t+'"  class="footnote-item">'}function i(){return"</li>\n"}function l(e,o){var t=Number(e[o].meta.id+1).toString(),n="fnref"+t;return e[o].meta.subId>0&&(n+=":"+e[o].meta.subId),' <a href="#'+n+'" class="footnote-backref">↩</a>'}o.exports=function(e){function o(e,o,t,n){var r,s,f,i,l,a,u=e.bMarks[o]+e.tShift[o],c=e.eMarks[o];if(u+4>c)return!1;if(91!==e.src.charCodeAt(u))return!1;if(94!==e.src.charCodeAt(u+1))return!1;for(i=u+2;i<c;i++){if(32===e.src.charCodeAt(i))return!1;if(93===e.src.charCodeAt(i))break}return!(i===u+2||i+1>=c||58!==e.src.charCodeAt(++i)||!n&&(i++,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={}),l=e.src.slice(u+2,i-2),e.env.footnotes.refs[":"+l]=-1,a=new e.Token("footnote_reference_open","",1),a.meta={label:l},a.level=e.level++,e.tokens.push(a),r=e.bMarks[o],s=e.tShift[o],f=e.parentType,e.tShift[o]=e.skipSpaces(i)-i,e.bMarks[o]=i,e.blkIndent+=4,e.parentType="footnote",e.tShift[o]<e.blkIndent&&(e.tShift[o]+=e.blkIndent,e.bMarks[o]-=e.blkIndent),e.md.block.tokenize(e,o,t,!0),e.parentType=f,e.blkIndent-=4,e.tShift[o]=s,e.bMarks[o]=r,a=new e.Token("footnote_reference_close","",(-1)),a.level=--e.level,e.tokens.push(a),0))}function t(e,o){var t,n,r,s,f,i=e.posMax,l=e.pos;return!(l+2>=i||94!==e.src.charCodeAt(l)||91!==e.src.charCodeAt(l+1)||(t=l+2,n=c(e,l+1),n<0||(o||(e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]),r=e.env.footnotes.list.length,e.pos=t,e.posMax=n,f=e.push("footnote_ref","",0),f.meta={id:r},s=e.tokens.length,e.md.inline.tokenize(e),e.env.footnotes.list[r]={tokens:e.tokens.splice(s)}),e.pos=n+1,e.posMax=i,0)))}function a(e,o){var t,n,r,s,f,i=e.posMax,l=e.pos;if(l+3>i)return!1;if(!e.env.footnotes||!e.env.footnotes.refs)return!1;if(91!==e.src.charCodeAt(l))return!1;if(94!==e.src.charCodeAt(l+1))return!1;for(n=l+2;n<i;n++){if(32===e.src.charCodeAt(n))return!1;if(10===e.src.charCodeAt(n))return!1;if(93===e.src.charCodeAt(n))break}return!(n===l+2||n>=i||(n++,t=e.src.slice(l+2,n-1),"undefined"==typeof e.env.footnotes.refs[":"+t]||(o||(e.env.footnotes.list||(e.env.footnotes.list=[]),e.env.footnotes.refs[":"+t]<0?(r=e.env.footnotes.list.length,e.env.footnotes.list[r]={label:t,count:0},e.env.footnotes.refs[":"+t]=r):r=e.env.footnotes.refs[":"+t],s=e.env.footnotes.list[r].count,e.env.footnotes.list[r].count++,f=e.push("footnote_ref","",0),f.meta={id:r,subId:s}),e.pos=n,e.posMax=i,0)))}function u(e){var o,t,n,r,s,f,i,l,a,u,c=!1,p={};if(e.env.footnotes&&(e.tokens=e.tokens.filter(function(e){return"footnote_reference_open"===e.type?(c=!0,a=[],u=e.meta.label,!1):"footnote_reference_close"===e.type?(c=!1,p[":"+u]=a,!1):(c&&a.push(e),!c)}),e.env.footnotes.list)){for(f=e.env.footnotes.list,i=new e.Token("footnote_block_open","",1),e.tokens.push(i),o=0,t=f.length;o<t;o++){for(i=new e.Token("footnote_open","",1),i.meta={id:o},e.tokens.push(i),f[o].tokens?(l=[],i=new e.Token("paragraph_open","p",1),i.block=!0,l.push(i),i=new e.Token("inline","",0),i.children=f[o].tokens,i.content="",l.push(i),i=new e.Token("paragraph_close","p",(-1)),i.block=!0,l.push(i)):f[o].label&&(l=p[":"+f[o].label]),e.tokens=e.tokens.concat(l),s="paragraph_close"===e.tokens[e.tokens.length-1].type?e.tokens.pop():null,r=f[o].count>0?f[o].count:1,n=0;n<r;n++)i=new e.Token("footnote_anchor","",0),i.meta={id:o,subId:n},e.tokens.push(i);s&&e.tokens.push(s),i=new e.Token("footnote_close","",(-1)),e.tokens.push(i)}i=new e.Token("footnote_block_close","",(-1)),e.tokens.push(i)}}var c=e.helpers.parseLinkLabel;e.renderer.rules.footnote_ref=n,e.renderer.rules.footnote_block_open=r,e.renderer.rules.footnote_block_close=s,e.renderer.rules.footnote_open=f,e.renderer.rules.footnote_close=i,e.renderer.rules.footnote_anchor=l,e.block.ruler.before("reference","footnote_def",o,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnote_inline",t),e.inline.ruler.after("footnote_inline","footnote_ref",a),e.core.ruler.after("inline","footnote_tail",u)}},{}]},{},[1])(1)});