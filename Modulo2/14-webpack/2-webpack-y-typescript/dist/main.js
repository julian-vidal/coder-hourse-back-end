(()=>{"use strict";var e={607:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=(0,o(r(860)).default)(),s=o(r(235)),n=r(418),l=new s.default("Juan","Perez");i.get("/",((e,t)=>{t.send({message:`Hola ${l.getNombre()}`,time:(0,n.getTime)().time})})),i.listen(8080,(()=>{console.log("Server listening at 8080")}))},235:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.nombre=e,this.apellido=t}getNombre(){return this.nombre}getApellido(){return this.apellido}}},418:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getTime=void 0,t.getTime=()=>({time:(new Date).toLocaleDateString(),timestamp:Date.now()})},860:e=>{e.exports=require("express")}},t={};!function r(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,r),s.exports}(607)})();