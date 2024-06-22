"use strict";(self.webpackChunkASM=self.webpackChunkASM||[]).push([[305],{5053:(S,b,o)=>{o.d(b,{U:()=>p});var a=o(6895),y=o(9015),O=o(2823),m=o(4650);let p=(()=>{class e{}return e.\u0275fac=function(l){return new(l||e)},e.\u0275mod=m.oAB({type:e}),e.\u0275inj=m.cJS({imports:[a.ez,y.u5,O.KdK,O.T2N]}),e})()},3305:(S,b,o)=>{o.r(b),o.d(b,{PagesModule:()=>$});var a=o(2823),y=o(2617),O=o(8909);function m(n,s,t,r,i,u,f){try{var C=n[u](f),g=C.value}catch(q){return void t(q)}C.done?s(g):Promise.resolve(g).then(r,i)}function p(n){return function(){var s=this,t=arguments;return new Promise(function(r,i){var u=n.apply(s,t);function f(g){m(u,r,i,f,C,"next",g)}function C(g){m(u,r,i,f,C,"throw",g)}f(void 0)})}}var e=o(4650),h=o(9646),l=o(515),D=o(7579),P=o(4986),T=o(9751),A=o(4779),L=o(5963),x=o(3900);class M{constructor(s){this.changes=s}static of(s){return new M(s)}notEmpty(s){if(this.changes[s]){const t=this.changes[s].currentValue;if(null!=t)return(0,h.of)(t)}return l.E}has(s){return this.changes[s]?(0,h.of)(this.changes[s].currentValue):l.E}notFirst(s){return this.changes[s]&&!this.changes[s].isFirstChange()?(0,h.of)(this.changes[s].currentValue):l.E}notFirstAndEmpty(s){if(this.changes[s]&&!this.changes[s].isFirstChange()){const t=this.changes[s].currentValue;if(null!=t)return(0,h.of)(t)}return l.E}}const v=new e.OlP("NGX_ECHARTS_CONFIG");let F=(()=>{class n{constructor(t,r,i){this.el=r,this.ngZone=i,this.autoResize=!0,this.loadingType="default",this.chartInit=new e.vpe,this.optionsError=new e.vpe,this.chartClick=this.createLazyEvent("click"),this.chartDblClick=this.createLazyEvent("dblclick"),this.chartMouseDown=this.createLazyEvent("mousedown"),this.chartMouseMove=this.createLazyEvent("mousemove"),this.chartMouseUp=this.createLazyEvent("mouseup"),this.chartMouseOver=this.createLazyEvent("mouseover"),this.chartMouseOut=this.createLazyEvent("mouseout"),this.chartGlobalOut=this.createLazyEvent("globalout"),this.chartContextMenu=this.createLazyEvent("contextmenu"),this.chartLegendSelectChanged=this.createLazyEvent("legendselectchanged"),this.chartLegendSelected=this.createLazyEvent("legendselected"),this.chartLegendUnselected=this.createLazyEvent("legendunselected"),this.chartLegendScroll=this.createLazyEvent("legendscroll"),this.chartDataZoom=this.createLazyEvent("datazoom"),this.chartDataRangeSelected=this.createLazyEvent("datarangeselected"),this.chartTimelineChanged=this.createLazyEvent("timelinechanged"),this.chartTimelinePlayChanged=this.createLazyEvent("timelineplaychanged"),this.chartRestore=this.createLazyEvent("restore"),this.chartDataViewChanged=this.createLazyEvent("dataviewchanged"),this.chartMagicTypeChanged=this.createLazyEvent("magictypechanged"),this.chartPieSelectChanged=this.createLazyEvent("pieselectchanged"),this.chartPieSelected=this.createLazyEvent("pieselected"),this.chartPieUnselected=this.createLazyEvent("pieunselected"),this.chartMapSelectChanged=this.createLazyEvent("mapselectchanged"),this.chartMapSelected=this.createLazyEvent("mapselected"),this.chartMapUnselected=this.createLazyEvent("mapunselected"),this.chartAxisAreaSelected=this.createLazyEvent("axisareaselected"),this.chartFocusNodeAdjacency=this.createLazyEvent("focusnodeadjacency"),this.chartUnfocusNodeAdjacency=this.createLazyEvent("unfocusnodeadjacency"),this.chartBrush=this.createLazyEvent("brush"),this.chartBrushEnd=this.createLazyEvent("brushend"),this.chartBrushSelected=this.createLazyEvent("brushselected"),this.chartRendered=this.createLazyEvent("rendered"),this.chartFinished=this.createLazyEvent("finished"),this.animationFrameID=null,this.resize$=new D.x,this.echarts=t.echarts}ngOnChanges(t){const r=M.of(t);r.notFirstAndEmpty("options").subscribe(i=>this.onOptionsChange(i)),r.notFirstAndEmpty("merge").subscribe(i=>this.setOption(i)),r.has("loading").subscribe(i=>this.toggleLoading(!!i)),r.notFirst("theme").subscribe(()=>this.refreshChart())}ngOnInit(){if(!window.ResizeObserver)throw new Error("please install a polyfill for ResizeObserver");this.resizeSub=this.resize$.pipe(function z(n,s=P.z,t){const r=(0,L.H)(n,s);return(0,A.P)(()=>r,t)}(100,P.z,{leading:!1,trailing:!0})).subscribe(()=>this.resize()),this.autoResize&&(this.resizeOb=this.ngZone.runOutsideAngular(()=>new window.ResizeObserver(()=>{this.animationFrameID=window.requestAnimationFrame(()=>this.resize$.next())})),this.resizeOb.observe(this.el.nativeElement))}ngOnDestroy(){window.clearTimeout(this.initChartTimer),this.resizeSub&&this.resizeSub.unsubscribe(),this.animationFrameID&&window.cancelAnimationFrame(this.animationFrameID),this.resizeOb&&this.resizeOb.unobserve(this.el.nativeElement),this.dispose()}ngAfterViewInit(){this.initChartTimer=window.setTimeout(()=>this.initChart())}dispose(){this.chart&&(this.chart.isDisposed()||this.chart.dispose(),this.chart=null)}resize(){this.chart&&this.chart.resize()}toggleLoading(t){this.chart&&(t?this.chart.showLoading(this.loadingType,this.loadingOpts):this.chart.hideLoading())}setOption(t,r){if(this.chart)try{this.chart.setOption(t,r)}catch(i){console.error(i),this.optionsError.emit(i)}}refreshChart(){var t=this;return p(function*(){t.dispose(),yield t.initChart()})()}createChart(){const t=this.el.nativeElement;if(window&&window.getComputedStyle){const r=window.getComputedStyle(t,null).getPropertyValue("height");(!r||"0px"===r)&&(!t.style.height||"0px"===t.style.height)&&(t.style.height="400px")}return this.ngZone.runOutsideAngular(()=>("function"==typeof this.echarts?this.echarts:()=>Promise.resolve(this.echarts))().then(({init:i})=>i(t,this.theme,this.initOpts)))}initChart(){var t=this;return p(function*(){yield t.onOptionsChange(t.options),t.merge&&t.chart&&t.setOption(t.merge)})()}onOptionsChange(t){var r=this;return p(function*(){t&&(r.chart||(r.chart=yield r.createChart(),r.chartInit.emit(r.chart)),r.setOption(r.options,!0))})()}createLazyEvent(t){return this.chartInit.pipe((0,x.w)(r=>new T.y(i=>(r.on(t,u=>this.ngZone.run(()=>i.next(u))),()=>{this.chart&&(this.chart.isDisposed()||r.off(t))}))))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(v),e.Y36(e.SBq),e.Y36(e.R0b))},n.\u0275dir=e.lG2({type:n,selectors:[["echarts"],["","echarts",""]],inputs:{options:"options",theme:"theme",loading:"loading",initOpts:"initOpts",merge:"merge",autoResize:"autoResize",loadingType:"loadingType",loadingOpts:"loadingOpts"},outputs:{chartInit:"chartInit",optionsError:"optionsError",chartClick:"chartClick",chartDblClick:"chartDblClick",chartMouseDown:"chartMouseDown",chartMouseMove:"chartMouseMove",chartMouseUp:"chartMouseUp",chartMouseOver:"chartMouseOver",chartMouseOut:"chartMouseOut",chartGlobalOut:"chartGlobalOut",chartContextMenu:"chartContextMenu",chartLegendSelectChanged:"chartLegendSelectChanged",chartLegendSelected:"chartLegendSelected",chartLegendUnselected:"chartLegendUnselected",chartLegendScroll:"chartLegendScroll",chartDataZoom:"chartDataZoom",chartDataRangeSelected:"chartDataRangeSelected",chartTimelineChanged:"chartTimelineChanged",chartTimelinePlayChanged:"chartTimelinePlayChanged",chartRestore:"chartRestore",chartDataViewChanged:"chartDataViewChanged",chartMagicTypeChanged:"chartMagicTypeChanged",chartPieSelectChanged:"chartPieSelectChanged",chartPieSelected:"chartPieSelected",chartPieUnselected:"chartPieUnselected",chartMapSelectChanged:"chartMapSelectChanged",chartMapSelected:"chartMapSelected",chartMapUnselected:"chartMapUnselected",chartAxisAreaSelected:"chartAxisAreaSelected",chartFocusNodeAdjacency:"chartFocusNodeAdjacency",chartUnfocusNodeAdjacency:"chartUnfocusNodeAdjacency",chartBrush:"chartBrush",chartBrushEnd:"chartBrushEnd",chartBrushSelected:"chartBrushSelected",chartRendered:"chartRendered",chartFinished:"chartFinished"},exportAs:["echarts"],features:[e.TTD]}),n})(),Z=(()=>{class n{static forRoot(t){return{ngModule:n,providers:[{provide:v,useValue:t}]}}static forChild(){return{ngModule:n}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[]]}),n})();var E=o(6895),d=o(923);let U=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[E.ez,d.Bz,O.wH,Z.forRoot({echarts:()=>o.e(739).then(o.bind(o,2739))}),a.oGl,a.T2N,a.zyh,a.BW0,a.COg,a._WB,a.obu,a.EoG,a.AE1,a.PYG,a.MfT,a.nKr,a.SDF,a.KdK,a.rgH,y.O]}),n})();const R=[{title:"Dashboard",group:!0},{title:"Dashboard",icon:"home-outline",link:"/pages/dashboard"},{title:"Qu\u1ea3n L\xfd",group:!0},{title:"Danh M\u1ee5c",icon:"list-outline",children:[{title:"Danh S\xe1ch",link:"/pages/categories/list"}]},{title:"S\u1ea3n ph\u1ea9m",icon:"archive-outline",children:[{title:"Danh S\xe1ch",link:"/pages/products/list"}]},{title:"M\xe3 gi\u1ea3m gi\xe1",icon:"pricetags-outline",children:[{title:"Danh S\xe1ch",link:"/pages/vouchers/list"}]},{title:"\u0110\u01a1n H\xe0ng",icon:"shopping-cart-outline",children:[{title:"Danh S\xe1ch",link:"/pages/bills/list"}]},{title:"\u0110\xe1nh gi\xe1",icon:"message-circle-outline",children:[{title:"Danh S\xe1ch",link:"/pages/feedback/list"}]},{title:"\u0110\xe1nh gi\xe1 s\u1ea3n ph\u1ea9m",icon:"message-square-outline",children:[{title:"Danh S\xe1ch",link:"/pages/reviews/list"}]},{title:"T\xe0i Kho\u1ea3n",group:!0},{title:"T\xe0i kho\u1ea3n kh\xe1ch h\xe0ng",icon:"person-outline",children:[{title:"Danh S\xe1ch",link:"/pages/customers/list"}]},{title:"T\xe0i kho\u1ea3n nh\xe2n vi\xean",icon:"person-add-outline",children:[{title:"Danh S\xe1ch",link:"/pages/employees/list"}]},{title:"Quy\u1ec1n H\u1ea1n",group:!0},{title:"Vai tr\xf2",icon:"people-outline",children:[{title:"Danh S\xe1ch",link:"/pages/roles/list"}]}];var B=o(6405);let N=(()=>{class n{constructor(){this.menu=R}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["ngx-pages"]],decls:3,vars:1,consts:[[3,"items"]],template:function(t,r){1&t&&(e.TgZ(0,"ngx-one-column-layout"),e._UZ(1,"nb-menu",0)(2,"router-outlet"),e.qZA()),2&t&&(e.xp6(1),e.Q6J("items",r.menu))},dependencies:[d.lC,B.s,a.mBz],styles:["[_nghost-%COMP%]     router-outlet+*{display:block;animation:_ngcontent-%COMP%_fade 1s}@keyframes _ngcontent-%COMP%_fade{0%{opacity:0}to{opacity:1}}"]}),n})();var I=o(8135),c=o(4641),G=o(529);let j=(()=>{class n extends I.s{constructor(t){super(t),this._http=t}getProductPrices(){return this.get(c.C+c.Q.statistic.getProductPrices)}getCountProducts(){return this.get(c.C+c.Q.statistic.getCountProducts)}getBillStatus(){return this.get(c.C+c.Q.statistic.getBillStatus)}getCountCateProducts(){return this.get(c.C+c.Q.statistic.getCountCateProducts)}getCountCustomers(){return this.get(c.C+c.Q.statistic.getCountCustomers)}getCountEmployees(){return this.get(c.C+c.Q.statistic.getCountEmployees)}getTotalRevenues(){return this.get(c.C+c.Q.statistic.getTotalRevenues)}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(G.eN))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),Q=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-echarts"]],inputs:{chartOptions:"chartOptions"},decls:1,vars:1,consts:[["echarts","",1,"echart",3,"options"]],template:function(t,r){1&t&&e._UZ(0,"div",0),2&t&&e.Q6J("options",r.chartOptions)},dependencies:[F],encapsulation:2}),n})();const V=function(){return["/pages/products/list"]},W=function(){return["/pages/employees/list"]},H=function(){return["/pages/customers/list"]},X=[{path:"",component:N,children:[{path:"dashboard",component:(()=>{class n{constructor(t,r){this.statisticsService=t,this.themeService=r,this.pieChartData=[],this.billStatusData=[],this.totalRevenuesData=[],this.themes=[{value:"default",name:"Light"},{value:"dark",name:"Dark"}],this.currentTheme="default"}ngOnInit(){this.initCharts(),this.themeService.onThemeChange().subscribe(t=>{this.currentTheme=t.name,this.initCharts()}),this.statisticsService.getProductPrices().subscribe(t=>{this.productPriceStats=t}),this.statisticsService.getCountProducts().subscribe(t=>{this.countProducts=t.count},t=>{console.error("Error fetching product count",t)}),this.statisticsService.getBillStatus().subscribe(t=>{if(t&&t.statusCounts){const r=t.statusCounts;this.billStatusData=[{value:r[0]||0,name:"\u0110ang giao"},{value:r[1]||0,name:"\u0110\xe3 giao"},{value:r[2]||0,name:"\u0110\xe3 hu\u1ef7"}],this.pieChartOptions=this.getPieChartOptions()}else console.error("Data or statusCounts is null/undefined",t)},t=>{console.error("Failed to load bill status",t)}),this.statisticsService.getCountCateProducts().subscribe(t=>{t&&Array.isArray(t.data)?this.pieChartData=t.data.map(r=>({value:r.product_count,name:r.name})):console.error("Expected an array but got:",t),this.pieChartOptions2=this.getPieChartOptions2()}),this.statisticsService.getCountCustomers().subscribe(t=>{this.countCustomers=t.count},t=>{console.error("Error fetching customer count",t)}),this.statisticsService.getCountEmployees().subscribe(t=>{this.countEmployees=t.count},t=>{console.error("Error fetching employee count",t)}),this.statisticsService.getTotalRevenues().subscribe(t=>{t&&t.monthlyRevenues?(this.totalRevenuesData=t.monthlyRevenues.map(r=>({value:r.total,name:r.month})),this.columnChartOptions=this.getColumnChartOptions()):console.error("Expected an array but got:",t)},t=>{console.error("Failed to load total revenues",t)})}initCharts(){this.pieChartOptions=this.getPieChartOptions(),this.pieChartOptions2=this.getPieChartOptions2(),this.columnChartOptions=this.getColumnChartOptions()}getPieChartOptions(){const t="dark"===this.currentTheme?"#fff":"#000";return{title:{text:"Bi\u1ec3u \u0111\u1ed3 T\xecnh Tr\u1ea1ng \u0110\u01a1n H\xe0ng",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:18,fontWeight:"bold",color:t}},tooltip:{trigger:"item",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12}},legend:{top:"5%",left:"center",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12,color:t}},series:[{name:"T\xecnh Tr\u1ea1ng \u0110\u01a1n H\xe0ng",type:"pie",radius:["40%","70%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold",color:t}},labelLine:{show:!1},data:this.billStatusData}]}}getPieChartOptions2(){const t="dark"===this.currentTheme?"#fff":"#000";return{title:{text:"Th\u1ed1ng K\xea S\u1ed1 L\u01b0\u1ee3ng S\u1ea3n Ph\u1ea9m Theo Danh M\u1ee5c",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:18,fontWeight:"bold",color:t}},tooltip:{trigger:"item",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12}},legend:{top:"5%",left:"center",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12,color:t}},series:[{name:"L\u01b0\u1ee3ng S\u1ea3n Ph\u1ea9m Theo Danh M\u1ee5c",type:"pie",radius:["40%","70%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold",color:t}},labelLine:{show:!1},data:this.pieChartData}]}}getColumnChartOptions(){const t="dark"===this.currentTheme?"#fff":"#000";return{title:{text:"Bi\u1ec3u \u0111\u1ed3 Doanh Thu Theo 12 Th\xe1ng",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:18,fontWeight:"bold",color:t}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12}},legend:{top:"5%",left:"center",textStyle:{fontFamily:"Open Sans, sans-serif",fontSize:12,color:t}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:this.totalRevenuesData.map(r=>r.name),axisTick:{alignWithLabel:!0},axisLabel:{color:t},axisLine:{lineStyle:{color:t}}}],yAxis:[{type:"value",axisLabel:{color:t},axisLine:{lineStyle:{color:t}},splitLine:{lineStyle:{color:t}}}],series:[{name:"Doanh Thu",type:"bar",barWidth:"60%",data:this.totalRevenuesData.map(r=>r.value),itemStyle:{color:"#5470C6"}}]}}formatCurrency(t){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(j),e.Y36(a.WMF))},n.\u0275cmp=e.Xpm({type:n,selectors:[["ngx-dashboard"]],decls:63,vars:16,consts:[[3,"ngClass"],[1,"text-center"],[1,"justify-content-center","d-flex"],["src","../../../assets/images/logo_DomTea.png","alt","IMG","width","150"],[1,"row","justify-content-between"],[1,"col-md-4"],[1,"custom-one-header"],["icon","archive-outline"],[1,"fw-bold","text-center","fs-3"],["routerLinkActive","router-link-active","nbTooltip","Xem chi ti\u1ebft \u1edf \u0111\xe2y",1,"custom-title-count-procducts",3,"routerLink"],[1,"custom-two-header"],["routerLinkActive","router-link-active","nbTooltip","Xem chi ti\u1ebft \u1edf \u0111\xe2y",1,"custom-title-count-employees",3,"routerLink"],[1,"custom-three-header"],["routerLinkActive","router-link-active","nbTooltip","Xem chi ti\u1ebft \u1edf \u0111\xe2y",1,"custom-title-count-customers",3,"routerLink"],[1,"row"],[1,"col-md-12"],[1,"table","table-bordered"],[1,"col-md-6"],[3,"chartOptions"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"nb-card")(2,"nb-card-body")(3,"h2",1),e._uU(4,"CH\xc0O M\u1eeaNG \u0110\u1ebeN V\u1edaI TRANG QU\u1ea2N L\xdd QU\xc1N TR\xc0 S\u1eeeA DOM TEA "),e.qZA(),e.TgZ(5,"div",2),e._UZ(6,"img",3),e.qZA()()(),e.TgZ(7,"div",4)(8,"div",5)(9,"nb-card")(10,"nb-card-header",6),e._UZ(11,"nb-icon",7),e._uU(12," T\u1ed5ng s\u1ed1 l\u01b0\u1ee3ng s\u1ea3n ph\u1ea9m "),e.qZA(),e.TgZ(13,"nb-card-body",8)(14,"a",9),e._uU(15),e.qZA()()()(),e.TgZ(16,"div",5)(17,"nb-card")(18,"nb-card-header",10),e._UZ(19,"nb-icon",7),e._uU(20," T\u1ed5ng t\xe0i kho\u1ea3n nh\xe2n vi\xean "),e.qZA(),e.TgZ(21,"nb-card-body",8)(22,"a",11),e._uU(23),e.qZA()()()(),e.TgZ(24,"div",5)(25,"nb-card")(26,"nb-card-header",12),e._UZ(27,"nb-icon",7),e._uU(28," T\u1ed5ng s\u1ed1 t\xe0i kho\u1ea3n kh\xe1ch h\xe0ng "),e.qZA(),e.TgZ(29,"nb-card-body",8)(30,"a",13),e._uU(31),e.qZA()()()()(),e.TgZ(32,"nb-card")(33,"nb-card-body")(34,"div",14)(35,"div",15)(36,"h5",1),e._uU(37,"Th\u1ed1ng k\xea gi\xe1 s\u1ea3n ph\u1ea9m theo h\u1ea1ng m\u1ee9c"),e.qZA(),e.TgZ(38,"table",16)(39,"thead")(40,"tr")(41,"th"),e._uU(42,"Gi\xe1 cao nh\u1ea5t"),e.qZA(),e.TgZ(43,"th"),e._uU(44,"Gi\xe1 th\u1ea5p nh\u1ea5t"),e.qZA(),e.TgZ(45,"th"),e._uU(46,"Gi\xe1 trung b\xecnh"),e.qZA()()(),e.TgZ(47,"tbody")(48,"tr")(49,"td"),e._uU(50),e.qZA(),e.TgZ(51,"td"),e._uU(52),e.qZA(),e.TgZ(53,"td"),e._uU(54),e.qZA()()()()()()()(),e.TgZ(55,"nb-card")(56,"nb-card-body")(57,"div",14)(58,"div",17),e._UZ(59,"app-echarts",18),e.qZA(),e.TgZ(60,"div",17),e._UZ(61,"app-echarts",18),e.qZA()(),e._UZ(62,"app-echarts",18),e.qZA()()()),2&t&&(e.Q6J("ngClass",r.currentTheme),e.xp6(14),e.Q6J("routerLink",e.DdM(13,V)),e.xp6(1),e.hij(" ",r.countProducts," S\u1ea2N PH\u1ea8M "),e.xp6(7),e.Q6J("routerLink",e.DdM(14,W)),e.xp6(1),e.hij("",r.countEmployees," NH\xc2N VI\xcaN "),e.xp6(7),e.Q6J("routerLink",e.DdM(15,H)),e.xp6(1),e.hij(" ",r.countCustomers," KH\xc1CH H\xc0NG "),e.xp6(19),e.Oqu(r.formatCurrency(null==r.productPriceStats?null:r.productPriceStats.maxPrice)),e.xp6(2),e.Oqu(r.formatCurrency(null==r.productPriceStats?null:r.productPriceStats.minPrice)),e.xp6(2),e.Oqu(r.formatCurrency(null==r.productPriceStats?null:r.productPriceStats.avgPrice)),e.xp6(5),e.Q6J("chartOptions",r.pieChartOptions2),e.xp6(2),e.Q6J("chartOptions",r.pieChartOptions),e.xp6(1),e.Q6J("chartOptions",r.columnChartOptions))},dependencies:[E.mk,d.rH,d.Od,a.Asz,a.yKW,a.ndF,a.fMN,a.jNv,Q],styles:['[_nghost-%COMP%]   .solar-card[_ngcontent-%COMP%]   nb-card-header[_ngcontent-%COMP%]{border:none;padding-bottom:0}@media (max-width: 767.98px){[_nghost-%COMP%]   ngx-traffic[_ngcontent-%COMP%]{display:none}}[_nghost-%COMP%]   .statistics[_ngcontent-%COMP%]{margin-top:20px}[_nghost-%COMP%]   .statistics[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.5em;margin-bottom:10px}[_nghost-%COMP%]   .statistics[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%;margin-top:10px}.custom-one-header[_ngcontent-%COMP%]{background-color:#5353e3;color:#fff;border-color:#757575}.custom-two-header[_ngcontent-%COMP%]{background-color:#ffaa01;color:#fff;border-color:#757575}.custom-three-header[_ngcontent-%COMP%]{background-color:#34dc82;color:#fff;border-color:#757575}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]{position:relative;color:#000;text-decoration:none;transition:color .3s ease,opacity .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]:before{content:"";position:absolute;width:100%;height:2px;bottom:0;left:0;background-color:#5353e3;transform:scaleX(0);transform-origin:bottom right;transition:transform .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]:hover:before{transform:scaleX(1);transform-origin:bottom left}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]:hover{color:#5353e3;opacity:.8}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]{position:relative;color:#000;text-decoration:none;transition:color .3s ease,opacity .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]:before{content:"";position:absolute;width:100%;height:2px;bottom:0;left:0;background-color:#34dc82;transform:scaleX(0);transform-origin:bottom right;transition:transform .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]:hover:before{transform:scaleX(1);transform-origin:bottom left}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]:hover{color:#34dc82;opacity:.8}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]{position:relative;color:#000;text-decoration:none;transition:color .3s ease,opacity .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]:before{content:"";position:absolute;width:100%;height:2px;bottom:0;left:0;background-color:#ffaa01;transform:scaleX(0);transform-origin:bottom right;transition:transform .3s ease}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]:hover:before{transform:scaleX(1);transform-origin:bottom left}nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]:hover{color:#ffaa01;opacity:.8}.light[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#fff;color:#000}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.light[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f8f9fa;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#fff;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%], .light[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%], .light[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]{color:#000}.dark[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#222b45;color:#fff}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.dark[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#2e3a59;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#222b45;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]{color:#fff}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-procducts[_ngcontent-%COMP%]:hover{color:#5c5cfc}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]{color:#fff}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-employees[_ngcontent-%COMP%]:hover{color:#ffaa01}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]{color:#fff}.dark[_ngcontent-%COMP%]   nb-card-body[_ngcontent-%COMP%]   .custom-title-count-customers[_ngcontent-%COMP%]:hover{color:#34dc82}']}),n})(),data:{breadcrumb:"Dashboard"}},{path:"products",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(941)]).then(o.bind(o,9941)).then(n=>n.ProductsModule),data:{breadcrumb:"S\u1ea3n Ph\u1ea9m"}},{path:"categories",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(845)]).then(o.bind(o,2845)).then(n=>n.CategoriesModule),data:{breadcrumb:"Danh M\u1ee5c"}},{path:"vouchers",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(137)]).then(o.bind(o,137)).then(n=>n.VouchersModule),data:{breadcrumb:"M\xe3 gi\u1ea3m gi\xe1"}},{path:"bills",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(0)]).then(o.bind(o,0)).then(n=>n.BillsModule),data:{breadcrumb:"\u0110\u01a1n h\xe0ng"}},{path:"customers",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(656)]).then(o.bind(o,1656)).then(n=>n.CustomersModule),data:{breadcrumb:"T\xe0i kho\u1ea3n kh\xe1ch h\xe0ng"}},{path:"feedback",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(281)]).then(o.bind(o,281)).then(n=>n.FeedbackModule),data:{breadcrumb:"T\xe0i kho\u1ea3n kh\xe1ch h\xe0ng"}},{path:"roles",loadChildren:()=>Promise.all([o.e(306),o.e(661)]).then(o.bind(o,6661)).then(n=>n.rolesModule),data:{breadcrumb:"Vai tr\xf2"}},{path:"employees",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(503)]).then(o.bind(o,1503)).then(n=>n.EmployeesModule),data:{breadcrumb:"T\xe0i Kho\u1ea3n Nh\xe2n Vi\xean"}},{path:"reviews",loadChildren:()=>Promise.all([o.e(306),o.e(592),o.e(993)]).then(o.bind(o,5993)).then(n=>n.ReviewsModule),data:{breadcrumb:"\u0110\xe1nh Gi\xe1 S\u1ea3n Ph\u1ea9m"}},{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"**",component:o(8694).w}]}];let k=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(X),d.Bz]}),n})();var w=o(5053),Y=o(9015);let $=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[k,y.O,U,a.j5J,w.U,Y.u5]}),n})()}}]);