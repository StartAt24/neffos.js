(function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b})()({1:[function(a){function b(a){g.innerHTML+=a+"\n"}const c=a("neffos.js");var d="https:"==document.location.protocol?"wss":"ws",e=document.location.port?":"+document.location.port:"",f=d+"://"+document.location.hostname+e+"/echo",g=document.getElementById("output");(async function(){let a=await c.dial(f,{default:{_OnNamespaceConnected:function(a,c){b("connected to namespace: "+c.Namespace)},_OnNamespaceDisconnect:function(a,c){b("disconnected from namespace: "+c.Namespace)},_OnRoomJoined:function(a,c){b("joined to room: "+c.Room)},_OnRoomLeft:function(a,c){b("left from room: "+c.Room)},chat:function(a,c){let d="";""!==c.Room&&(d=c.Room+" >> "),b(d+c.Body)}}});try{let c=await a.connect("default"),d="",e="room1",f=document.getElementById("input"),g=document.getElementById("sendBtn");g.disabled=!1,g.onclick=function(){const a=f.value;f.value="";"join"===a?c.joinRoom(e).then(a=>{a.emit("chat","I just joined."),d=e}):"leave"===a?0<d.length&&(c.room(e).leave(),d=""):(0<d.length?c.room(e).emit("chat",a):c.emit("chat",a),b("Me: "+a))}}catch(a){window.alert(a),console.error(a)}})()},{"neffos.js":3}],2:[function(a,b){function c(){throw new Error("setTimeout has not been defined")}function d(){throw new Error("clearTimeout has not been defined")}function e(a){if(l===setTimeout)return setTimeout(a,0);if((l===c||!l)&&setTimeout)return l=setTimeout,setTimeout(a,0);try{return l(a,0)}catch(b){try{return l.call(null,a,0)}catch(b){return l.call(this,a,0)}}}function f(a){if(m===clearTimeout)return clearTimeout(a);if((m===d||!m)&&clearTimeout)return m=clearTimeout,clearTimeout(a);try{return m(a)}catch(b){try{return m.call(null,a)}catch(b){return m.call(this,a)}}}function g(){q&&o&&(q=!1,o.length?p=o.concat(p):r=-1,p.length&&h())}function h(){if(!q){var a=e(g);q=!0;for(var b=p.length;b;){for(o=p,p=[];++r<b;)o&&o[r].run();r=-1,b=p.length}o=null,q=!1,f(a)}}function j(a,b){this.fun=a,this.array=b}function k(){}var l,m,n=b.exports={};(function(){try{l="function"==typeof setTimeout?setTimeout:c}catch(a){l=c}try{m="function"==typeof clearTimeout?clearTimeout:d}catch(a){m=d}})();var o,p=[],q=!1,r=-1;n.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];p.push(new j(a,b)),1!==p.length||q||e(h)},j.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=k,n.addListener=k,n.once=k,n.off=k,n.removeListener=k,n.removeAllListeners=k,n.emit=k,n.prependListener=k,n.prependOnceListener=k,n.listeners=function(){return[]},n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},{}],3:[function(a,b,c){(function(b){"use strict";function d(a){return!(void 0!==a)||!(null!==a)||("string"==typeof a||a instanceof String?0===a.length||""===a:!!(a instanceof Error)&&d(a.message))}function e(a){if(a.IsNative&&d(a.wait))return a.Body;let b=v,c=v,e=a.Body||"";return a.isError&&(e=a.Err,b=u),a.isNoOp&&(c=u),[a.wait||"",a.Namespace,a.Room||"",a.Event||"",b,c,e].join(s)}function f(a,b){var e=new r;if(0==a.length)return e.isInvalid=!0,e;let f=a.split(s,t);if(f.length!=t)return b?(e.Event=c.OnNativeMessage,e.Body=a):e.isInvalid=!0,e;e.wait=f[0],e.Namespace=f[1],e.Room=f[2],e.Event=f[3],e.isError=f[4]==u||!1,e.isNoOp=f[5]==u||!1;let g=f[6];return d(g)?e.Body="":e.isError?e.Err=g:e.Body=g,e.isInvalid=!1,e.IsForced=!1,e.IsLocal=!1,e.IsNative=b&&e.Event==c.OnNativeMessage||!1,e}function g(){if(!n){let a=b.hrtime();return q+1e9*a[0]+a[1]}else{let a=window.performance.now();return q+a.toString()}}function h(a){return a+s.repeat(6)}function i(a,b){return a.events.has(b.Event)?a.events.get(b.Event)(a,b):a.events.has(c.OnAnyEvent)?a.events.get(c.OnAnyEvent)(a,b):null}function j(a){return null===a||a===void 0||"undefined"==typeof a}function k(a,b){if(j(a))return j(b)||b("connHandler is empty."),null;let c=new Map,d=new Map,e=0;if(Object.keys(a).forEach(function(b){e++;let f=a[b];if(f instanceof Function)d.set(b,f);else if(f instanceof Map)c.set(b,f);else{let a=new Map;Object.keys(f).forEach(function(b){a.set(b,f[b])}),c.set(b,a)}}),0<d.size){if(e!=d.size)return j(b)||b("all keys of connHandler should be events, mix of namespaces and event callbacks is not supported "+d.size+" vs total "+e),null;c.set("",d)}return c}function l(a,b){return a.has(b)?a.get(b):null}var m=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(c,"__esModule",{value:!0});const n="undefined"!=typeof window;var o;o=n?window.WebSocket:a("ws"),c.OnNamespaceConnect="_OnNamespaceConnect",c.OnNamespaceConnected="_OnNamespaceConnected",c.OnNamespaceDisconnect="_OnNamespaceDisconnect",c.OnRoomJoin="_OnRoomJoin",c.OnRoomJoined="_OnRoomJoined",c.OnRoomLeave="_OnRoomLeave",c.OnRoomLeft="_OnRoomLeft",c.OnAnyEvent="_OnAnyEvent",c.OnNativeMessage="_OnNativeMessage";const p="#",q="$";c.isSystemEvent=function(a){return!(a!==c.OnNamespaceConnect&&a!==c.OnNamespaceConnected&&a!==c.OnNamespaceDisconnect&&a!==c.OnRoomJoin&&a!==c.OnRoomJoined&&a!==c.OnRoomLeave&&a!==c.OnRoomLeft)};class r{isConnect(){return this.Event==c.OnNamespaceConnect||!1}isDisconnect(){return this.Event==c.OnNamespaceDisconnect||!1}isRoomJoin(){return this.Event==c.OnRoomJoin||!1}isRoomLeft(){return this.Event==c.OnRoomLeft||!1}isWait(){return!d(this.wait)&&(!(this.wait[0]!=p)||this.wait[0]==q||!1)}}c.Message=r;const s=";",t=7,u="1",v="0";class w{constructor(a,b){this.nsConn=a,this.name=b}emit(a,b){let c=new r;return c.Namespace=this.nsConn.namespace,c.Room=this.name,c.Event=a,c.Body=b,this.nsConn.conn.write(c)}leave(){let a=new r;return a.Namespace=this.nsConn.namespace,a.Room=this.name,a.Event=c.OnRoomLeave,this.nsConn.askRoomLeave(a)}}c.Room=w;class x{constructor(a,b,c){this.conn=a,this.namespace=b,this.events=c,this.rooms=new Map}emit(a,b){let c=new r;return c.Namespace=this.namespace,c.Event=a,c.Body=b,this.conn.write(c)}ask(a,b){let c=new r;return c.Namespace=this.namespace,c.Event=a,c.Body=b,this.conn.ask(c)}joinRoom(a){return m(this,void 0,void 0,function*(){return yield this.askRoomJoin(a)})}room(a){return this.rooms.get(a)}leaveAll(){return m(this,void 0,void 0,function*(){let a=new r;return a.Namespace=this.namespace,a.Event=c.OnRoomLeft,a.IsLocal=!0,this.rooms.forEach((b,c)=>m(this,void 0,void 0,function*(){a.Room=c;try{yield this.askRoomLeave(a)}catch(a){return a}})),null})}forceLeaveAll(a){let b=new r;b.Namespace=this.namespace,b.Event=c.OnRoomLeave,b.IsForced=!0,b.IsLocal=a,this.rooms.forEach((a,d)=>{b.Room=d,i(this,b),this.rooms.delete(d),b.Event=c.OnRoomLeft,i(this,b),b.Event=c.OnRoomLeave})}disconnect(){let a=new r;return a.Namespace=this.namespace,a.Event=c.OnNamespaceDisconnect,this.conn.askDisconnect(a)}askRoomJoin(a){return new Promise((b,e)=>m(this,void 0,void 0,function*(){let f=this.rooms.get(a);if(void 0!==f)return void b(f);let g=new r;g.Namespace=this.namespace,g.Room=a,g.Event=c.OnRoomJoin,g.IsLocal=!0;try{yield this.conn.ask(g)}catch(a){return void e(a)}let h=i(this,g);return d(h)?void(f=new w(this,a),this.rooms.set(a,f),g.Event=c.OnRoomJoined,i(this,g),b(f)):void e(h)}))}askRoomLeave(a){return m(this,void 0,void 0,function*(){if(!this.rooms.has(a.Room))return c.ErrBadRoom;try{yield this.conn.ask(a)}catch(a){return a}let b=i(this,a);return d(b)?(this.rooms.delete(a.Room),a.Event=c.OnRoomLeft,i(this,a),null):b})}replyRoomJoin(a){if(!(d(a.wait)||a.isNoOp)){if(!this.rooms.has(a.Room)){let b=i(this,a);if(!d(b))return a.Err=b.message,void this.conn.write(a);this.rooms.set(a.Room,new w(this,a.Room)),a.Event=c.OnRoomJoined,i(this,a)}this.conn.writeEmptyReply(a.wait)}}replyRoomLeave(a){return d(a.wait)||a.isNoOp?void 0:this.rooms.has(a.Room)?void(i(this,a),this.rooms.delete(a.Room),this.conn.writeEmptyReply(a.wait),a.Event=c.OnRoomLeft,i(this,a)):void this.conn.writeEmptyReply(a.wait)}}c.NSConn=x,c.dial=function(a,b,c){return-1==a.indexOf("ws")&&(a="ws://"+a),new Promise((e,f)=>{o||f("WebSocket is not accessible through this browser.");let g=k(b,f);if(j(g))return;let h=new o(a,c),i=new y(h,g,c);h.binaryType="arraybuffer",h.onmessage=a=>{let b=i.handle(a);return d(b)?void(i.isAcknowledged()&&e(i)):void f(b)},h.onopen=()=>{h.send("M")},h.onerror=a=>{i.close(),f(a)}})},c.ErrInvalidPayload=new Error("invalid payload"),c.ErrBadNamespace=new Error("bad namespace"),c.ErrBadRoom=new Error("bad room"),c.ErrClosed=new Error("use of closed connection"),c.ErrWrite=new Error("write closed");class y{constructor(a,b,d){this.conn=a,this._isAcknowledged=!1,this.namespaces=b;let e=b.has("");this.allowNativeMessages=e&&b.get("").has(c.OnNativeMessage),this.queue=[],this.waitingMessages=new Map,this.connectedNamespaces=new Map,this.closed=!1,this.conn.onclose=()=>(this.close(),null)}isAcknowledged(){return this._isAcknowledged}handle(a){if(!this._isAcknowledged){let b=this.handleAck(a.data);return null==b?(this._isAcknowledged=!0,this.handleQueue()):this.conn.close(),b}return this.handleMessage(a.data)}handleAck(a){let b=a[0];switch(b){case"A":let c=a.slice(1);this.ID=c;break;case"H":let d=a.slice(1);return new Error(d);default:return this.queue.push(a),null;}}handleQueue(){null==this.queue||0==this.queue.length||this.queue.forEach((a,b)=>{this.queue.splice(b,1),this.handleMessage(a)})}handleMessage(a){let b=f(a,this.allowNativeMessages);if(b.isInvalid)return c.ErrInvalidPayload;if(b.IsNative&&this.allowNativeMessages){let a=this.namespace("");return i(a,b)}if(b.isWait()){let a=this.waitingMessages.get(b.wait);if(null!=a)return void a(b)}const e=this.namespace(b.Namespace);switch(b.Event){case c.OnNamespaceConnect:this.replyConnect(b);break;case c.OnNamespaceDisconnect:this.replyDisconnect(b);break;case c.OnRoomJoin:if(e!==void 0){e.replyRoomJoin(b);break}case c.OnRoomLeave:if(e!==void 0){e.replyRoomLeave(b);break}default:if(e===void 0)return c.ErrBadNamespace;b.IsLocal=!1;let a=i(e,b);if(!d(a))return b.Err=a.message,this.write(b),a;}return null}connect(a){return this.askConnect(a)}namespace(a){return this.connectedNamespaces.get(a)}replyConnect(a){if(d(a.wait)||a.isNoOp)return;let b=this.namespace(a.Namespace);if(void 0!==b)return void this.writeEmptyReply(a.wait);let e=l(this.namespaces,a.Namespace);return j(e)?(a.Err=c.ErrBadNamespace.message,void this.write(a)):void(b=new x(this,a.Namespace,e),this.connectedNamespaces.set(a.Namespace,b),this.writeEmptyReply(a.wait),a.Event=c.OnNamespaceConnected,i(b,a))}replyDisconnect(a){if(!(d(a.wait)||a.isNoOp)){let b=this.namespace(a.Namespace);return void 0===b?void this.writeEmptyReply(a.wait):void(b.forceLeaveAll(!0),this.connectedNamespaces.delete(a.Namespace),this.writeEmptyReply(a.wait),i(b,a))}}ask(a){return new Promise((b,d)=>this.isClosed()?void d(c.ErrClosed):(a.wait=g(),this.waitingMessages.set(a.wait,a=>a.isError?void d(new Error(a.Err)):void b(a)),!this.write(a))?void d(c.ErrWrite):void 0)}askConnect(a){return new Promise((b,e)=>m(this,void 0,void 0,function*(){let f=this.namespace(a);if(void 0!==f)return void b(f);let g=l(this.namespaces,a);if(j(g))return void e(c.ErrBadNamespace);let h=new r;h.Namespace=a,h.Event=c.OnNamespaceConnect,h.IsLocal=!0,f=new x(this,a,g);let k=i(f,h);if(!d(k))return void e(k);try{yield this.ask(h)}catch(a){return void e(a)}this.connectedNamespaces.set(a,f),h.Event=c.OnNamespaceConnected,i(f,h),b(f)}))}askDisconnect(a){return m(this,void 0,void 0,function*(){let b=this.namespace(a.Namespace);if(void 0===b)return c.ErrBadNamespace;try{yield this.ask(a)}catch(a){return a}return b.forceLeaveAll(!0),this.connectedNamespaces.delete(a.Namespace),a.IsLocal=!0,i(b,a)})}isClosed(){return this.closed||this.conn.readyState==this.conn.CLOSED||!1}write(a){if(this.isClosed())return!1;if(!a.isConnect()&&!a.isDisconnect()){let b=this.namespace(a.Namespace);if(void 0===b)return!1;if(!d(a.Room)&&!a.isRoomJoin()&&!a.isRoomLeft()&&!b.rooms.has(a.Room))return!1}return this.conn.send(e(a)),!0}writeEmptyReply(a){this.conn.send(h(a))}close(){if(this.closed)return;let a=new r;a.Event=c.OnNamespaceDisconnect,a.IsForced=!0,a.IsLocal=!0,this.connectedNamespaces.forEach(b=>{b.forceLeaveAll(!0),a.Namespace=b.namespace,i(b,a),this.connectedNamespaces.delete(b.namespace)}),this.waitingMessages.clear(),this.conn.readyState===this.conn.OPEN&&this.conn.close(),this.closed=!0}}c.Conn=y}).call(this,a("_process"))},{_process:2,ws:4}],4:[function(a,b){'use strict';b.exports=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}},{}]},{},[1]);