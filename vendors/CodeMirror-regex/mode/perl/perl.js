CodeMirror.defineMode("perl",function(t,e){function r(t,e,r,i,s){return e.chain=null,e.style=null,e.tail=null,e.tokenize=function(t,e){for(var o,a=!1,f=0;o=t.next();){if(o===r[f]&&!a)return void 0!==r[++f]?(e.chain=r[f],e.style=i,e.tail=s):s&&t.eatWhile(s),e.tokenize=n,i;a=!a&&"\\"==o}return i},e.tokenize(t,e)}function i(t,e,r){return e.tokenize=function(t,e){return t.string==r&&(e.tokenize=n),t.skipToEnd(),"string"},e.tokenize(t,e)}function n(t,e){if(t.eatSpace())return null;if(e.chain)return r(t,e,e.chain,e.style,e.tail);if(t.match(/^\-?[\d\.]/,!1)&&t.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))return"number";if(t.match(/^<<(?=\w)/))return t.eatWhile(/\w/),i(t,e,t.current().substr(2));if(t.sol()&&t.match(/^\=item(?!\w)/))return i(t,e,"=cut");var n=t.next();if('"'==n||"'"==n){if(t.prefix(3)=="<<"+n){var f=t.pos;t.eatWhile(/\w/);var u=t.current().substr(1);if(u&&t.eat(n))return i(t,e,u);t.pos=f}return r(t,e,[n],"string")}if("q"==n){var l=t.look(-2);if(!l||!/\w/.test(l))if(l=t.look(0),"x"==l){if(l=t.look(1),"("==l)return t.eatSuffix(2),r(t,e,[")"],o,a);if("["==l)return t.eatSuffix(2),r(t,e,["]"],o,a);if("{"==l)return t.eatSuffix(2),r(t,e,["}"],o,a);if("<"==l)return t.eatSuffix(2),r(t,e,[">"],o,a);if(/[\^'"!~\/]/.test(l))return t.eatSuffix(1),r(t,e,[t.eat(l)],o,a)}else if("q"==l){if(l=t.look(1),"("==l)return t.eatSuffix(2),r(t,e,[")"],"string");if("["==l)return t.eatSuffix(2),r(t,e,["]"],"string");if("{"==l)return t.eatSuffix(2),r(t,e,["}"],"string");if("<"==l)return t.eatSuffix(2),r(t,e,[">"],"string");if(/[\^'"!~\/]/.test(l))return t.eatSuffix(1),r(t,e,[t.eat(l)],"string")}else if("w"==l){if(l=t.look(1),"("==l)return t.eatSuffix(2),r(t,e,[")"],"bracket");if("["==l)return t.eatSuffix(2),r(t,e,["]"],"bracket");if("{"==l)return t.eatSuffix(2),r(t,e,["}"],"bracket");if("<"==l)return t.eatSuffix(2),r(t,e,[">"],"bracket");if(/[\^'"!~\/]/.test(l))return t.eatSuffix(1),r(t,e,[t.eat(l)],"bracket")}else if("r"==l){if(l=t.look(1),"("==l)return t.eatSuffix(2),r(t,e,[")"],o,a);if("["==l)return t.eatSuffix(2),r(t,e,["]"],o,a);if("{"==l)return t.eatSuffix(2),r(t,e,["}"],o,a);if("<"==l)return t.eatSuffix(2),r(t,e,[">"],o,a);if(/[\^'"!~\/]/.test(l))return t.eatSuffix(1),r(t,e,[t.eat(l)],o,a)}else if(/[\^'"!~\/(\[{<]/.test(l)){if("("==l)return t.eatSuffix(1),r(t,e,[")"],"string");if("["==l)return t.eatSuffix(1),r(t,e,["]"],"string");if("{"==l)return t.eatSuffix(1),r(t,e,["}"],"string");if("<"==l)return t.eatSuffix(1),r(t,e,[">"],"string");if(/[\^'"!~\/]/.test(l))return r(t,e,[t.eat(l)],"string")}}if("m"==n){var l=t.look(-2);if((!l||!/\w/.test(l))&&(l=t.eat(/[(\[{<\^'"!~\/]/))){if(/[\^'"!~\/]/.test(l))return r(t,e,[l],o,a);if("("==l)return r(t,e,[")"],o,a);if("["==l)return r(t,e,["]"],o,a);if("{"==l)return r(t,e,["}"],o,a);if("<"==l)return r(t,e,[">"],o,a)}}if("s"==n){var l=/[\/>\]})\w]/.test(t.look(-2));if(!l&&(l=t.eat(/[(\[{<\^'"!~\/]/)))return"["==l?r(t,e,["]","]"],o,a):"{"==l?r(t,e,["}","}"],o,a):"<"==l?r(t,e,[">",">"],o,a):"("==l?r(t,e,[")",")"],o,a):r(t,e,[l,l],o,a)}if("y"==n){var l=/[\/>\]})\w]/.test(t.look(-2));if(!l&&(l=t.eat(/[(\[{<\^'"!~\/]/)))return"["==l?r(t,e,["]","]"],o,a):"{"==l?r(t,e,["}","}"],o,a):"<"==l?r(t,e,[">",">"],o,a):"("==l?r(t,e,[")",")"],o,a):r(t,e,[l,l],o,a)}if("t"==n){var l=/[\/>\]})\w]/.test(t.look(-2));if(!l&&(l=t.eat("r"),l&&(l=t.eat(/[(\[{<\^'"!~\/]/))))return"["==l?r(t,e,["]","]"],o,a):"{"==l?r(t,e,["}","}"],o,a):"<"==l?r(t,e,[">",">"],o,a):"("==l?r(t,e,[")",")"],o,a):r(t,e,[l,l],o,a)}if("`"==n)return r(t,e,[n],"variable-2");if("/"==n)return/~\s*$/.test(t.prefix())?r(t,e,[n],o,a):"operator";if("$"==n){var f=t.pos;if(t.eatWhile(/\d/)||t.eat("{")&&t.eatWhile(/\d/)&&t.eat("}"))return"variable-2";t.pos=f}if(/[$@%]/.test(n)){var f=t.pos;if(t.eat("^")&&t.eat(/[A-Z]/)||!/[@$%&]/.test(t.look(-2))&&t.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)){var l=t.current();if(s[l])return"variable-2"}t.pos=f}if(/[$@%&]/.test(n)&&(t.eatWhile(/[\w$\[\]]/)||t.eat("{")&&t.eatWhile(/[\w$\[\]]/)&&t.eat("}"))){var l=t.current();return s[l]?"variable-2":"variable"}if("#"==n&&"$"!=t.look(-2))return t.skipToEnd(),"comment";if(/[:+\-\^*$&%@=<>!?|\/~\.]/.test(n)){var f=t.pos;if(t.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/),s[t.current()])return"operator";t.pos=f}if("_"==n&&1==t.pos){if("_END__"==t.suffix(6))return r(t,e,["\0"],"comment");if("_DATA__"==t.suffix(7))return r(t,e,["\0"],"variable-2");if("_C__"==t.suffix(7))return r(t,e,["\0"],"string")}if(/\w/.test(n)){var f=t.pos;if("{"==t.look(-2)&&("}"==t.look(0)||t.eatWhile(/\w/)&&"}"==t.look(0)))return"string";t.pos=f}if(/[A-Z]/.test(n)){var $=t.look(-2),f=t.pos;if(t.eatWhile(/[A-Z_]/),!/[\da-z]/.test(t.look(0))){var l=s[t.current()];return l?(l[1]&&(l=l[0]),":"!=$?1==l?"keyword":2==l?"def":3==l?"atom":4==l?"operator":5==l?"variable-2":"meta":"meta"):"meta"}t.pos=f}if(/[a-zA-Z_]/.test(n)){var $=t.look(-2);t.eatWhile(/\w/);var l=s[t.current()];return l?(l[1]&&(l=l[0]),":"!=$?1==l?"keyword":2==l?"def":3==l?"atom":4==l?"operator":5==l?"variable-2":"meta":"meta"):"meta"}return null}var s={"->":4,"++":4,"--":4,"**":4,"=~":4,"!~":4,"*":4,"/":4,"%":4,x:4,"+":4,"-":4,".":4,"<<":4,">>":4,"<":4,">":4,"<=":4,">=":4,lt:4,gt:4,le:4,ge:4,"==":4,"!=":4,"<=>":4,eq:4,ne:4,cmp:4,"~~":4,"&":4,"|":4,"^":4,"&&":4,"||":4,"//":4,"..":4,"...":4,"?":4,":":4,"=":4,"+=":4,"-=":4,"*=":4,",":4,"=>":4,"::":4,not:4,and:4,or:4,xor:4,BEGIN:[5,1],END:[5,1],PRINT:[5,1],PRINTF:[5,1],GETC:[5,1],READ:[5,1],READLINE:[5,1],DESTROY:[5,1],TIE:[5,1],TIEHANDLE:[5,1],UNTIE:[5,1],STDIN:5,STDIN_TOP:5,STDOUT:5,STDOUT_TOP:5,STDERR:5,STDERR_TOP:5,$ARG:5,$_:5,"@ARG":5,"@_":5,$LIST_SEPARATOR:5,'$"':5,$PROCESS_ID:5,$PID:5,$$:5,$REAL_GROUP_ID:5,$GID:5,"$(":5,$EFFECTIVE_GROUP_ID:5,$EGID:5,"$)":5,$PROGRAM_NAME:5,$0:5,$SUBSCRIPT_SEPARATOR:5,$SUBSEP:5,"$;":5,$REAL_USER_ID:5,$UID:5,"$<":5,$EFFECTIVE_USER_ID:5,$EUID:5,"$>":5,$a:5,$b:5,$COMPILING:5,"$^C":5,$DEBUGGING:5,"$^D":5,"${^ENCODING}":5,$ENV:5,"%ENV":5,$SYSTEM_FD_MAX:5,"$^F":5,"@F":5,"${^GLOBAL_PHASE}":5,"$^H":5,"%^H":5,"@INC":5,"%INC":5,$INPLACE_EDIT:5,"$^I":5,"$^M":5,$OSNAME:5,"$^O":5,"${^OPEN}":5,$PERLDB:5,"$^P":5,$SIG:5,"%SIG":5,$BASETIME:5,"$^T":5,"${^TAINT}":5,"${^UNICODE}":5,"${^UTF8CACHE}":5,"${^UTF8LOCALE}":5,$PERL_VERSION:5,"$^V":5,"${^WIN32_SLOPPY_STAT}":5,$EXECUTABLE_NAME:5,"$^X":5,$1:5,$MATCH:5,"$&":5,"${^MATCH}":5,$PREMATCH:5,"$`":5,"${^PREMATCH}":5,$POSTMATCH:5,"$'":5,"${^POSTMATCH}":5,$LAST_PAREN_MATCH:5,"$+":5,$LAST_SUBMATCH_RESULT:5,"$^N":5,"@LAST_MATCH_END":5,"@+":5,"%LAST_PAREN_MATCH":5,"%+":5,"@LAST_MATCH_START":5,"@-":5,"%LAST_MATCH_START":5,"%-":5,$LAST_REGEXP_CODE_RESULT:5,"$^R":5,"${^RE_DEBUG_FLAGS}":5,"${^RE_TRIE_MAXBUF}":5,$ARGV:5,"@ARGV":5,ARGV:5,ARGVOUT:5,$OUTPUT_FIELD_SEPARATOR:5,$OFS:5,"$,":5,$INPUT_LINE_NUMBER:5,$NR:5,"$.":5,$INPUT_RECORD_SEPARATOR:5,$RS:5,"$/":5,$OUTPUT_RECORD_SEPARATOR:5,$ORS:5,"$\\":5,$OUTPUT_AUTOFLUSH:5,"$|":5,$ACCUMULATOR:5,"$^A":5,$FORMAT_FORMFEED:5,"$^L":5,$FORMAT_PAGE_NUMBER:5,"$%":5,$FORMAT_LINES_LEFT:5,"$-":5,$FORMAT_LINE_BREAK_CHARACTERS:5,"$:":5,$FORMAT_LINES_PER_PAGE:5,"$=":5,$FORMAT_TOP_NAME:5,"$^":5,$FORMAT_NAME:5,"$~":5,"${^CHILD_ERROR_NATIVE}":5,$EXTENDED_OS_ERROR:5,"$^E":5,$EXCEPTIONS_BEING_CAUGHT:5,"$^S":5,$WARNING:5,"$^W":5,"${^WARNING_BITS}":5,$OS_ERROR:5,$ERRNO:5,"$!":5,"%OS_ERROR":5,"%ERRNO":5,"%!":5,$CHILD_ERROR:5,"$?":5,$EVAL_ERROR:5,"$@":5,$OFMT:5,"$#":5,"$*":5,$ARRAY_BASE:5,"$[":5,$OLD_PERL_VERSION:5,"$]":5,"if":[1,1],elsif:[1,1],"else":[1,1],"while":[1,1],unless:[1,1],"for":[1,1],foreach:[1,1],abs:1,accept:1,alarm:1,atan2:1,bind:1,binmode:1,bless:1,bootstrap:1,"break":1,caller:1,chdir:1,chmod:1,chomp:1,chop:1,chown:1,chr:1,chroot:1,close:1,closedir:1,connect:1,"continue":[1,1],cos:1,crypt:1,dbmclose:1,dbmopen:1,"default":1,defined:1,"delete":1,die:1,"do":1,dump:1,each:1,endgrent:1,endhostent:1,endnetent:1,endprotoent:1,endpwent:1,endservent:1,eof:1,eval:1,exec:1,exists:1,exit:1,exp:1,fcntl:1,fileno:1,flock:1,fork:1,format:1,formline:1,getc:1,getgrent:1,getgrgid:1,getgrnam:1,gethostbyaddr:1,gethostbyname:1,gethostent:1,getlogin:1,getnetbyaddr:1,getnetbyname:1,getnetent:1,getpeername:1,getpgrp:1,getppid:1,getpriority:1,getprotobyname:1,getprotobynumber:1,getprotoent:1,getpwent:1,getpwnam:1,getpwuid:1,getservbyname:1,getservbyport:1,getservent:1,getsockname:1,getsockopt:1,given:1,glob:1,gmtime:1,"goto":1,grep:1,hex:1,"import":1,index:1,"int":1,ioctl:1,join:1,keys:1,kill:1,last:1,lc:1,lcfirst:1,length:1,link:1,listen:1,local:2,localtime:1,lock:1,log:1,lstat:1,m:null,map:1,mkdir:1,msgctl:1,msgget:1,msgrcv:1,msgsnd:1,my:2,"new":1,next:1,no:1,oct:1,open:1,opendir:1,ord:1,our:2,pack:1,"package":1,pipe:1,pop:1,pos:1,print:1,printf:1,prototype:1,push:1,q:null,qq:null,qr:null,quotemeta:null,qw:null,qx:null,rand:1,read:1,readdir:1,readline:1,readlink:1,readpipe:1,recv:1,redo:1,ref:1,rename:1,require:1,reset:1,"return":1,reverse:1,rewinddir:1,rindex:1,rmdir:1,s:null,say:1,scalar:1,seek:1,seekdir:1,select:1,semctl:1,semget:1,semop:1,send:1,setgrent:1,sethostent:1,setnetent:1,setpgrp:1,setpriority:1,setprotoent:1,setpwent:1,setservent:1,setsockopt:1,shift:1,shmctl:1,shmget:1,shmread:1,shmwrite:1,shutdown:1,sin:1,sleep:1,socket:1,socketpair:1,sort:1,splice:1,split:1,sprintf:1,sqrt:1,srand:1,stat:1,state:1,study:1,sub:1,substr:1,symlink:1,syscall:1,sysopen:1,sysread:1,sysseek:1,system:1,syswrite:1,tell:1,telldir:1,tie:1,tied:1,time:1,times:1,tr:null,truncate:1,uc:1,ucfirst:1,umask:1,undef:1,unlink:1,unpack:1,unshift:1,untie:1,use:1,utime:1,values:1,vec:1,wait:1,waitpid:1,wantarray:1,warn:1,when:1,write:1,y:null},o="string-2",a=/[goseximacplud]/;return{startState:function(){return{tokenize:n,chain:null,style:null,tail:null}},token:function(t,e){return(e.tokenize||n)(t,e)},electricChars:"{}"}}),CodeMirror.defineMIME("text/x-perl","perl"),CodeMirror.StringStream.prototype.look=function(t){return this.string.charAt(this.pos+(t||0))},CodeMirror.StringStream.prototype.prefix=function(t){if(t){var e=this.pos-t;return this.string.substr(e>=0?e:0,t)}return this.string.substr(0,this.pos-1)},CodeMirror.StringStream.prototype.suffix=function(t){var e=this.string.length,r=e-this.pos+1;return this.string.substr(this.pos,t&&t<e?t:r)},CodeMirror.StringStream.prototype.nsuffix=function(t){var e=this.pos,r=t||this.string.length-this.pos+1;return this.pos+=r,this.string.substr(e,r)},CodeMirror.StringStream.prototype.eatSuffix=function(t){var e,r=this.pos+t;r<=0?this.pos=0:r>=(e=this.string.length-1)?this.pos=e:this.pos=r};