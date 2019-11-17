!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.svgRoundCorners=r():e.svgRoundCorners=r()}("undefined"!=typeof self?self:this,(function(){return function(e){var r={};function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=r,a.d=function(e,r,t){a.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,r){if(1&r&&(e=a(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)a.d(t,n,function(r){return e[r]}.bind(null,n));return t},a.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(r,"a",r),r},a.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},a.p="",a(a.s=0)}([function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.roundCorners=r.roundCommands=r.parsePath=void 0;var t=a(1);function n(e){return function(e){if(Array.isArray(e)){for(var r=0,a=new Array(e.length);r<e.length;r++)a[r]=e[r];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e){var r=/-?[0-9]*\.?\d+/g;return[].concat(n(e.matchAll(/[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g))).map((function(e){return{marker:e[0],index:e.index}})).reduceRight((function(r,a){var t=e.substring(a.index,r.length?r[r.length-1].index:e.length);return r.concat([{marker:a.marker,index:a.index,chunk:t.length>0?t.substr(1,t.length-1):t}])}),[]).reverse().flatMap((function(e){var a=e.chunk.match(r),n=a?a.map(parseFloat):[];return(0,t.newCommands)(e.marker,n)})).map(t.convertToAbsolute)}function s(e,r,a){var n=[],u=[];return a&&(0,t.roundValues)(e,a),e.forEach((function(e,r,a){"M"===e.marker&&n.push([]),n[n.length-1].push(e)})),n.forEach((function(e){e.map(t.markOverlapped),(0,t.reverseMarkOverlapped)(e,e.length-1),e.filter((function(e){return!e.overlap})).map((function(e,a,n){var s=(0,t.getPreviousNoZ)(e,a,n),o=(0,t.getNextNoZ)(e,a,n),l=(0,t.getAngle)(e.values,s.values),v=(0,t.getAngle)(e.values,o.values),i=v-l,c=i*(180/Math.PI),f=(0,t.shortestSide)(e,s,o),p=Math.abs((0,t.getTangentNoHyp)(i/2,f/2)),y=Math.min(r,p),h=(0,t.getOffset)(i,y),m=h.offset,d=h.sweepFlag;switch(e.marker){case"M":case"L":var g=[e.values.x+(0,t.getOppositeLength)(l,m),e.values.y+(0,t.getAdjacentLength)(l,m)],x=[e.values.x+(0,t.getOppositeLength)(v,m),e.values.y+(0,t.getAdjacentLength)(v,m)];u.push({marker:e.marker,values:{x:parseFloat(g[0].toFixed(3)),y:parseFloat(g[1].toFixed(3))}}),"L"!==o.marker&&"M"!==o.marker||u.push({marker:"A",degrees:c.toFixed(3),radius:y,values:{radiusX:y,radiusY:y,rotation:c,largeArc:0,sweep:d,x:parseFloat(x[0].toFixed(3)),y:parseFloat(x[1].toFixed(3))}});break;case"C":case"S":case"Q":case"T":case"A":case"Z":u.push({marker:e.marker,values:e.values})}}))})),{path:(0,t.commandsToSvgPath)(u),commands:u}}r.parsePath=u,r.roundCommands=s,r.roundCorners=function(e,r,a){return s([].concat(n(u(e))),r,a)}},function(e,r,a){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"===t(Symbol.iterator)?function(e){function r(r){return e.apply(this,arguments)}return r.toString=function(){return e.toString()},r}((function(e){return void 0===e?"undefined":t(e)})):function(e){function r(r){return e.apply(this,arguments)}return r.toString=function(){return e.toString()},r}((function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":t(e)})))(e)}function n(e,r){return(e%r+r)%r}function u(e,r){var a=e.x-r.x,t=e.y-r.y;return Math.sqrt(Math.pow(a,2)+Math.pow(t,2))}function s(e,r){return r/Math.tan(e)||0}Object.defineProperty(r,"__esModule",{value:!0}),r.roundValues=function(e,r){e.forEach((function(e){return Object.keys(e.values).forEach((function(a){return e.values[a]=e.values[a]&&parseFloat(e.values[a].toFixed(r))}))}))},r.getPreviousNoZ=function e(r,a,t){var u=a-1;var s=t[n(u,t.length)];return"Z"!==s.marker?s:e(r,u,t)},r.getNextNoZ=function e(r,a,t){var u=a+1;var s=t[n(u,t.length)];return"Z"===s.marker?e(r,u,t):s},r.convertToAbsolute=function(e,r,a){var t=a[r-1]||{values:{x:0,y:0}};if(e.marker===e.marker.toLowerCase())switch(e.marker=e.marker.toUpperCase(),e.marker){case"M":e.values.x+=t.values.x,e.values.y+=t.values.y;break;case"L":case"A":e.values.x+=t.values.x,e.values.y+=t.values.y;break;case"H":e.marker="L",e.values.x+=t.values.x,e.values.y=t.values.y;break;case"V":e.marker="L",e.values.x=t.values.x,e.values.y+=t.values.y;break;case"C":e.values.x+=t.values.x,e.values.y+=t.values.y,e.values.x1+=t.values.x,e.values.y1+=t.values.y,e.values.x2+=t.values.x,e.values.y2+=t.values.y;break;case"S":e.values.x+=t.values.x,e.values.y+=t.values.y,e.values.x2+=t.values.x,e.values.y2+=t.values.y;break;case"Q":e.values.x+=t.values.x,e.values.y+=t.values.y,e.values.x1+=t.values.x,e.values.y1+=t.values.y;break;case"T":e.values.x+=t.values.x,e.values.y+=t.values.y}else if(e.marker===e.marker.toUpperCase())switch(e.marker){case"H":e.marker="L",e.values.y=t.values.y;break;case"V":e.marker="L",e.values.x=t.values.x}if("Z"===e.marker){var n=function e(r,a){return"M"===r[a].marker?r[a]:e(r,a-1)}(a,r);e.values.x=n.values.x,e.values.y=n.values.y}return e},r.newCommands=function(e,r){var a=[];switch(e.toUpperCase()){case"M":for(var t=0;t<r.length;t+=2){var n=void 0;n=e===e.toUpperCase()?0===t?"M":"L":0===t?"m":"l",a.push({marker:n,values:{x:r[t],y:r[t+1]}})}break;case"L":for(var u=0;u<r.length;u+=2)a.push({marker:e,values:{x:r[u],y:r[u+1]}});break;case"H":for(var s=0;s<r.length;s++)a.push({marker:e,values:{x:r[s],y:0}});break;case"V":for(var o=0;o<r.length;o++)a.push({marker:e,values:{x:0,y:r[o]}});break;case"C":for(var l=0;l<r.length;l+=6)a.push({marker:e,values:{x1:r[l],y1:r[l+1],x2:r[l+2],y2:r[l+3],x:r[l+4],y:r[l+5]}});break;case"S":for(var v=0;v<r.length;v+=4)a.push({marker:e,values:{x2:r[v],y2:r[v+1],x:r[v+2],y:r[v+3]}});break;case"Q":for(var i=0;i<r.length;i+=4)a.push({marker:e,values:{x1:r[i],y1:r[i+1],x:r[i+2],y:r[i+3]}});break;case"T":for(var c=0;c<r.length;c+=2)a.push({marker:e,values:{x:r[c],y:r[c+1]}});break;case"A":for(var f=0;f<r.length;f+=7)a.push({marker:e,values:{radiusX:r[f],radiusY:r[f+1],rotation:r[f+2],largeArc:r[f+3],sweep:r[f+4],x:r[f+5],y:r[f+6]}});break;case"Z":a.push({marker:e,values:{x:0,y:0}})}return a},r.mod=n,r.markOverlapped=function(e,r,a){if(0!==r&&"L"===e.marker){var t=a[r-1];["x","y"].every((function(r){return 0===Math.round(Math.abs(t.values[r]-e.values[r]))}))&&(e.overlap=!0)}return e},r.reverseMarkOverlapped=function e(r,a){var t=["x","y"].every((function(e){return 0===Math.round(Math.abs(r[a].values[e]-r[0].values[e]))}));"L"===r[a].marker&&t&&(r[a].overlap=!0,e(r,a-1));"Z"===r[a].marker&&e(r,a-1)},r.shortestSide=function(e,r,a){var t=u(e.values,a.values),n=u(r.values,e.values);return Math.min(n,t)},r.getAngle=function(e,r){return Math.atan2(r.x-e.x,r.y-e.y)},r.getDistance=u,r.getOppositeLength=function(e,r){return Math.sin(e)*r},r.getAdjacentLength=function(e,r){return Math.cos(e)*r},r.getTangentLength=s,r.getTangentNoHyp=function(e,r){return r*Math.tan(e)},r.getOffset=function(e,r){var a=void 0,t=0,n=e*(180/Math.PI);n<0&&n>-90||n>180&&n<=270||n<=-90&&n>-180?(a=s(e/2,-r),t=0,a!==-1/0&&0!=a||(a=-r)):(a=s(e/2,r),t=1,a===1/0&&(a=r));return{offset:a,sweepFlag:t}},r.bsplit=function(e,r){for(var a=e.length-1,n=[],u=[],s=[],o=1-r,l=function(e,r){for(var a=[],t=0;t<e.length;t++)a.push(r*e[t]);return a},v=function(e,r){for(var a=[],t=0;t<Math.min(e.length,r.length);t++)a.push(e[t]+r[t]);return a},i=0;i<=a;i++)e[i]="object"==t(e[i])?e[i]:[e[i]],n.push([e[i]]);for(var c=1;c<=a;c++)for(var f=0;f<=a-c;f++)n[f].push(v(l(n[f][c-1],o),l(n[f+1][c-1],r)));for(var p=0;p<=a;p++)u.push(n[0][p]),s.push(n[p][a-p]);return[u,s]},r.commandsToSvgPath=function(e){var r=["radiusX","radiusY","rotation","largeArc","sweep","x1","y1","x2","y2","x","y"];return e.map((function(e){var a="";if("Z"!==e.marker){var t=Object.keys(e.values);a=r.filter((function(e){return-1!==t.indexOf(e)})).map((function(r){return e.values[r]})).join()}return"\n"+e.marker+" "+a})).join(" ").trim()}}])}));