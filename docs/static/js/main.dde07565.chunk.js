(this.webpackJsonpthesis_charts=this.webpackJsonpthesis_charts||[]).push([[0],{150:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(44),c=a.n(r),i=(a(52),a(27)),s=a.n(i),o=a(17),u=a(45),m=a(2),d=(a(54),a(16)),p=[{val:"rws",label:"Roulette"},{val:"tournament_2",label:"Tournament 2"},{val:"tournament_4",label:"TOurnament 4"}],b=[{user:"postgres",password:"123123Aa",table:"task_2_variant_2"},{user:"misha",password:"thesis_misha",table:"task2_full_gcloud_v1"}],v=[{value:"type_1",label:"Type 1 (first 10 steps **2)"},{value:"type_2",label:"Type 2 (first 80 steps *1.1)"},{value:"type_3",label:"Type 3 (*1.005)"},{value:"type_4",label:"Type 4 (+1 by 2000)"}],h=[0,1,2,3,4],E=[10,20,80,100,200,800,1e3],_=[1,2],f=[10,20,80,100,200,800,1e3],y="https://thesis-charts-server.herokuapp.com/charts",g={1:b[1],2:b[0]};var w=function(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(m.a)(c,2),b=i[0],w=i[1],O=Object(n.useState)(null),j=Object(m.a)(O,2),N=j[0],k=j[1],C=Object(n.useState)(10),S=Object(m.a)(C,2),F=S[0],T=S[1],V=Object(n.useState)(p[0].val),x=Object(m.a)(V,2),z=x[0],L=x[1],W=Object(n.useState)(0),R=Object(m.a)(W,2),A=R[0],B=R[1],I=Object(n.useState)(0),J=Object(m.a)(I,2),P=J[0],X=J[1],$=Object(n.useState)(100),q=Object(m.a)($,2),D=q[0],G=q[1],H=Object(n.useState)(null),K=Object(m.a)(H,2),M=K[0],Q=K[1],U=Object(n.useState)(1),Y=Object(m.a)(U,2),Z=Y[0],ee=Y[1];function te(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(u.a)(s.a.mark((function e(t){var a,n,l,c,i,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=(a=g[Z]).user,l=a.password,c=a.table,w(!0),e.next=5,fetch("".concat(y,"?").concat(1==Z?"n=".concat(N):"type=".concat(M),"&l=").concat(F,"&user=").concat(n,"&password=").concat(l,"&table=").concat(c,"&run_id=").concat(A,"&sel_type=").concat(z,"&offset=").concat(void 0===t?P:t,"&limit=").concat(D,"\n          "));case 5:return i=e.sent,e.next=8,i.json();case 8:o=e.sent,r(o),w(!1),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0),w(!1);case 17:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}var ne=function(e){return function(t){return t.persist()||e(t.target.value)}};return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Tool to explore generated by genetic algorithm population models"),l.a.createElement("div",{className:"form"},l.a.createElement("div",{className:"cont"}),l.a.createElement("div",{className:"cont2"},l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"rws"},"Selection type"),l.a.createElement("select",{name:"rws",id:"rws_select",defaultValue:"",value:z,onChange:ne(L)},l.a.createElement("option",{value:"",disabled:!0},"Selection type"),p.map((function(e){return l.a.createElement("option",{value:e.val,key:e.val},e.label)})))),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"ls"},"Indv length"),l.a.createElement("select",{name:"ls",id:"ls_select",defaultValue:"",value:F,onChange:ne(T)},l.a.createElement("option",{value:"",disabled:!0},"indv length (L)"),f.map((function(e){return l.a.createElement("option",{value:e,key:e},e)})))),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"variant"},"Variant (static / dynamic N)"),l.a.createElement("select",{name:"variant",id:"variant_select",defaultValue:"",value:Z,onChange:ne(ee)},l.a.createElement("option",{value:"",disabled:!0},"Variant (static\\dynamic L)"),_.map((function(e){return l.a.createElement("option",{value:e,key:e},e)})))),1==Z&&l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"ns"},"N (population size)"),l.a.createElement("select",{name:"ns",id:"ns_select",defaultValue:"",value:N,onChange:ne(k)},l.a.createElement("option",{value:"",disabled:!0},"pop size (N)"),E.map((function(e){return l.a.createElement("option",{value:e,key:e},e)})))),2==Z&&l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"dynamicL"},"Type of L incrementing"),l.a.createElement("select",{name:"dynamicL",id:"dynamicL",defaultValue:"",value:M,onChange:ne(Q)},l.a.createElement("option",{value:"",disabled:!0},"Type of dynamic N"),v.map((function(e){return l.a.createElement("option",{value:e.value,key:e.value},e.label)})))),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"run_id"},"Run id"),l.a.createElement("select",{name:"run_id",id:"run_id_select",value:A,defaultValue:0,onChange:ne(B)},h.map((function(e){return l.a.createElement("option",{value:e,key:e},e)})))),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"offset"},"Offset"),l.a.createElement("input",{type:"text",name:"offset",placeholder:"offset",value:P,onChange:ne(X)})),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"size"},"Size"),l.a.createElement("input",{type:"text",name:"size",placeholder:"size",value:D,onChange:ne(G)})),l.a.createElement("button",{type:"button",onClick:function(){return te()}},"Process"))),l.a.createElement("div",{className:"arrows"},l.a.createElement("button",{onClick:function(){var e=+P-+D;X(e<0?0:e),te(e)}},"PREV"),l.a.createElement("button",{onClick:function(){var e=+P+ +D;X(e),te(e)}},"NEXT")),l.a.createElement("div",null,l.a.createElement("div",{className:"datatype"},l.a.createElement("span",{className:"green"}),l.a.createElement("span",null,"-----wild_type_hamming_distribution")),l.a.createElement("div",{className:"datatype"},l.a.createElement("span",{className:"blue"}),l.a.createElement("span",null,"-----pairwise_hamming_distribution")),l.a.createElement("div",{className:"datatype"},l.a.createElement("span",{className:"red"}),l.a.createElement("span",null,"-----ideal_hamming_distribution"))),l.a.createElement("div",{className:"container"},b&&l.a.createElement("p",null,"Loading..."),!b&&a.map((function(e){var t={labels:[1,1,1,1,1,1,1,1,1,1].map((function(e,t){return t})),datasets:[{label:"pairwise_hamming_distribution_p",borderColor:"#00F",borderWidth:1,data:e.pairwise_hamming_distribution_p},{label:"ideal_hamming_distribution_p",borderColor:"#F00",borderWidth:1,data:e.ideal_hamming_distribution_p},{label:"wild_type_hamming_distribution_p",borderColor:"#0F0",borderWidth:1,data:e.wild_type_hamming_distribution_p}]};return l.a.createElement("div",{key:e.id,className:"chart"},l.a.createElement("span",{className:"iteration"},e.iteration),"2"===Z&&l.a.createElement("span",{className:"pop_size"},e.n),l.a.createElement(d.a,{data:Object(o.a)({},t,{datasets:[t.datasets[0]]}),legend:{display:!1},width:100,height:45}),l.a.createElement(d.a,{data:Object(o.a)({},t,{datasets:[t.datasets[1]]}),legend:{display:!1},width:100,height:45}),l.a.createElement(d.a,{data:Object(o.a)({},t,{datasets:[t.datasets[2]]}),legend:{display:!1},width:100,height:45}))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},47:function(e,t,a){e.exports=a(150)},52:function(e,t,a){},54:function(e,t,a){}},[[47,1,2]]]);
//# sourceMappingURL=main.dde07565.chunk.js.map