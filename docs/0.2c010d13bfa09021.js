"use strict";(self.webpackChunkASM=self.webpackChunkASM||[]).push([[0],[(tt,v,s)=>{s.r(v),s.d(v,{BillsModule:()=>R});var l=s(9015),a=s(2823),E=s(2617),C=s(4004),T=s(1005),t=s(4650),b=s(529);let y=(()=>{class n{constructor(e){this.http=e}load(e,o){const i=(e-1)%7*o;return this.http.get("assets/data/news.json").pipe((0,C.U)(c=>c.splice(i,o)),(0,T.g)(1500))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(b.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var m=s(923);let A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["ngx-components"]],decls:1,vars:0,template:function(e,o){1&e&&t._UZ(0,"router-outlet")},dependencies:[m.lC],encapsulation:2}),n})();var q=s(5226),M=s.n(q),u=s(4641),B=s(8135);let O=(()=>{class n extends B.s{constructor(e){super(e),this._http=e}getAllBills(e,o=""){const i={page:e.toString(),search:o};return this.get(u.C+u.Q.bills,i)}addBill(e){return this.post(u.C+u.Q.bills,e)}updateBill(e,o){return this.patch(`${u.C+u.Q.bills}/${e}`,o)}deleteBill(e){return this.delete(`${u.C+u.Q.bills}/${e}`)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(b.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var x=s(7273),P=s(2251),U=s(9827),S=s(5515),g=s(6895),N=s(5547);const I=["formElement"];function k(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td",41),t._uU(2),t.qZA(),t.TgZ(3,"td",41),t._uU(4),t.qZA(),t.TgZ(5,"td",41),t._uU(6),t.qZA(),t.TgZ(7,"td",41),t._uU(8),t.qZA(),t.TgZ(9,"td",41),t._uU(10),t.qZA(),t.TgZ(11,"td",41),t._uU(12),t.qZA(),t.TgZ(13,"td",41),t._uU(14),t.ALo(15,"date"),t.qZA(),t.TgZ(16,"td",42)(17,"div",43)(18,"button",44),t.NdJ("click",function(){const c=t.CHM(e).$implicit,h=t.oxw();return t.KtG(h.editBill(c.id))}),t._UZ(19,"i",45),t.qZA(),t.TgZ(20,"button",46),t.NdJ("click",function(){const c=t.CHM(e).$implicit,h=t.oxw();return t.KtG(h.deleteBill(c.id))}),t._UZ(21,"i",47),t.qZA()()()()}if(2&n){const e=r.$implicit,o=r.index,i=t.oxw();let c;t.xp6(2),t.Oqu(o+1),t.xp6(2),t.Oqu(e.customer_name),t.xp6(2),t.Oqu(null==(c=i.getProductName(e.product_id))?null:c.name),t.xp6(2),t.Oqu(e.qty),t.xp6(2),t.Oqu(i.formatCurrency(e.total)),t.xp6(2),t.Oqu(i.getEmployeeName(e.employee_id)),t.xp6(2),t.Oqu(t.xi3(15,7,e.created_at,"dd/MM/yyyy HH:mm:ss"))}}function w(n,r){if(1&n&&(t.TgZ(0,"option",48),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("value",e.id),t.xp6(1),t.Oqu(e.name)}}function F(n,r){1&n&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng ch\u1ecdn m\xe3 s\u1ea3n ph\u1ea9m."),t.qZA())}function L(n,r){if(1&n&&(t.TgZ(0,"div",49),t.YNc(1,F,2,0,"small",50),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.get("product_id").hasError("required"))}}function Q(n,r){1&n&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng nh\u1eadp s\u1ed1 l\u01b0\u1ee3ng."),t.qZA())}function J(n,r){1&n&&(t.TgZ(0,"small"),t._uU(1,"S\u1ed1 l\u01b0\u1ee3ng ph\u1ea3i l\u1edbn h\u01a1n 0."),t.qZA())}function D(n,r){if(1&n&&(t.TgZ(0,"div",49),t.YNc(1,Q,2,0,"small",50),t.YNc(2,J,2,0,"small",50),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.get("qty").hasError("required")),t.xp6(1),t.Q6J("ngIf",e.form.get("qty").hasError("min"))}}function Y(n,r){1&n&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng nh\u1eadp t\xean kh\xe1ch h\xe0ng."),t.qZA())}function V(n,r){if(1&n&&(t.TgZ(0,"div",49),t.YNc(1,Y,2,0,"small",50),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.get("customer_name").hasError("required"))}}function G(n,r){if(1&n&&(t.TgZ(0,"option",48),t._uU(1),t.qZA()),2&n){const e=r.$implicit;t.Q6J("value",e.id),t.xp6(1),t.Oqu(e.name)}}function j(n,r){1&n&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng ch\u1ecdn m\xe3 nh\xe2n vi\xean."),t.qZA())}function $(n,r){if(1&n&&(t.TgZ(0,"div",49),t.YNc(1,j,2,0,"small",50),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.get("employee_id").hasError("required"))}}function H(n,r){if(1&n&&(t.TgZ(0,"div",51)(1,"small"),t._uU(2),t.qZA()()),2&n){const e=t.oxw();t.xp6(2),t.Oqu(e.voucherErrorMessage)}}const z=[{path:"",component:A,children:[{path:"list",component:(()=>{class n{constructor(e,o,i,c,h,d,p,f,_){this.toastrService=e,this.billService=o,this.productService=i,this.employeeService=c,this.voucherService=h,this.themeService=d,this.spinner=p,this.router=f,this.route=_,this.newBill={product_id:"",qty:0,total:0,customer_name:"",employee_id:"",voucher_code:""},this.isAddingNewBill=!0,this.isEditing=!1,this.bills=[],this.products=[],this.employees=[],this.vouchers=[],this.apiUrl=u.C+u.Q.bills,this.currentPage=1,this.searchQuery="",this.provisionalTotal=0,this.discountAmount=0,this.finalTotal=0,this.themes=[{value:"default",name:"Light"},{value:"dark",name:"Dark"}],this.currentTheme="default",this.voucherErrorMessage="",this.themeService.onThemeChange().subscribe(W=>{this.currentTheme=W.name})}ngOnInit(){this.route.queryParams.subscribe(e=>{this.loadBills(e.page||1)}),this.form=new l.cw({product_id:new l.NI("",l.kI.required),qty:new l.NI("",[l.kI.required,l.kI.min(1)]),total:new l.NI({value:"",disabled:!0},l.kI.required),customer_name:new l.NI("",l.kI.required),employee_id:new l.NI("",l.kI.required),voucher_code:new l.NI("")}),this.form.valueChanges.subscribe(e=>{this.calculateTotals(e)}),this.loadProducts(),this.loadEmployees()}loadProducts(){this.productService.getAllProducts().subscribe(e=>{this.products=e.products,this.calculateTotals(this.form.value)},e=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi t\u1ea3i s\u1ea3n ph\u1ea9m!","Error")})}loadEmployees(){this.employeeService.getAllEmployees().subscribe(e=>{this.employees=e.employees},e=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi t\u1ea3i nh\xe2n vi\xean!","Error")})}loadBills(e){this.spinner.show(),this.billService.getAllBills(e,this.searchQuery).subscribe(o=>{this.spinner.hide(),this.bills=o.bills,this.currentPage=o.currentPage,this.totalPages=o.totalPages;const i={page:e};this.searchQuery&&""!==this.searchQuery.trim()&&(i.search=this.searchQuery),this.router.navigate([],{queryParams:i,replaceUrl:!0})},o=>{this.spinner.hide(),this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi t\u1ea3i h\xf3a \u0111\u01a1n!","Error")})}onSearch(){this.loadBills(this.currentPage)}addBill(){if(!this.form.valid)return void this.toastrService.danger("Vui l\xf2ng nh\u1eadp \u0111\u1ee7 d\u1eef li\u1ec7u v\xe0 ki\u1ec3m tra l\u1ea1i c\xe1c tr\u01b0\u1eddng!","Error");let e={product_id:this.form.get("product_id").value,qty:this.form.get("qty").value,total:this.finalTotal,customer_name:this.form.get("customer_name").value,employee_id:this.form.get("employee_id").value,voucher_code:this.form.get("voucher_code").value};this.spinner.show(),this.isEditing&&!this.isAddingNewBill?this.billService.updateBill(this.newBill.id,e).subscribe(()=>{this.toastrService.success("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng!","Success"),this.isEditing=!1,this.spinner.hide(),this.loadBills(this.currentPage)},i=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi c\u1eadp nh\u1eadt bill!","Error"),this.spinner.hide()}):this.billService.addBill(e).subscribe(()=>{this.toastrService.success("Th\xeam m\u1edbi th\xe0nh c\xf4ng!","Success"),this.spinner.hide(),this.loadBills(1)},o=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi th\xeam bill!","Error"),this.spinner.hide()}),this.form.reset()}editBill(e){if(this.isEditing)return;const o=this.bills.findIndex(i=>i.id===e);-1!==o&&(this.newBill=Object.assign({},this.bills[o]),this.form.patchValue({product_id:this.newBill.product_id,qty:this.newBill.qty,total:this.newBill.total,customer_name:this.newBill.customer_name,employee_id:this.newBill.employee_id,voucher_code:this.newBill.voucher_code}),this.isAddingNewBill=!1,this.isEditing=!0,this.toastrService.info("S\u1eb5n s\xe0ng c\u1eadp nh\u1eadt","Th\xf4ng tin")),this.scrollFormIntoView()}deleteBill(e){M().fire({title:"X\xe1c nh\u1eadn x\xf3a",text:"B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a bill n\xe0y?",icon:"warning",showCancelButton:!0,confirmButtonText:"\u0110\u1ed3ng \xfd",cancelButtonText:"H\u1ee7y b\u1ecf"}).then(o=>{o.isConfirmed&&this.billService.deleteBill(e).subscribe(()=>{const i=this.bills.findIndex(c=>c.id===e);-1!==i&&(this.bills.splice(i,1),this.loadBills(this.currentPage),this.toastrService.success("X\xf3a th\xe0nh c\xf4ng!","Success"))},i=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi x\xf3a bill!","Error")})})}resetForm(){this.isEditing=!1,this.isAddingNewBill=!1,this.form.reset(),this.toastrService.success("D\u1eef li\u1ec7u tr\xean form \u0111\xe3 \u0111\u01b0\u1ee3c reset!","Th\xe0nh c\xf4ng")}getEmployeeName(e){const o=this.employees.find(i=>i.id===e);return o?o.name:"Unknown"}getProductName(e){return this.products.find(o=>o.id===e)}scrollFormIntoView(){this.formElement&&this.formElement.nativeElement.scrollIntoView({behavior:"smooth",block:"start"})}formatCurrency(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" \u0111"}calculateTotals(e){const o=parseInt(e.product_id,10),i=this.products.find(d=>d.id===o);this.provisionalTotal=i?i.sale_price*(e.qty||0):0;const h=e.voucher_code;h?this.voucherService.getVoucherByCode(h).subscribe(d=>{if(d){const p=(new Date).getTime(),f=new Date(d.valid_from).getTime(),_=new Date(d.valid_to).getTime();p<f?(this.voucherErrorMessage="Voucher ch\u01b0a c\xf3 hi\u1ec7u l\u1ef1c",this.discountAmount=0):p>_?(this.voucherErrorMessage="Voucher \u0111\xe3 h\u1ebft h\u1ea1n",this.discountAmount=0):(this.voucherErrorMessage="",this.discountAmount=d.discount_rate/100*this.provisionalTotal)}else this.voucherErrorMessage="Voucher kh\xf4ng h\u1ee3p l\u1ec7",this.discountAmount=0;this.finalTotal=Math.max(this.provisionalTotal-this.discountAmount,10),this.form.patchValue({total:this.finalTotal},{emitEvent:!1})},d=>{this.voucherErrorMessage="L\u1ed7i khi ki\u1ec3m tra voucher",this.discountAmount=0,this.finalTotal=this.provisionalTotal,this.form.patchValue({total:this.finalTotal},{emitEvent:!1})}):(this.voucherErrorMessage="",this.discountAmount=0,this.finalTotal=this.provisionalTotal,this.form.patchValue({total:this.finalTotal},{emitEvent:!1}))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(a.quB),t.Y36(O),t.Y36(x.M),t.Y36(P.G),t.Y36(U.H),t.Y36(a.WMF),t.Y36(S.V),t.Y36(m.F0),t.Y36(m.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list"]],viewQuery:function(e,o){if(1&e&&t.Gf(I,5),2&e){let i;t.iGM(i=t.CRH())&&(o.formElement=i.first)}},decls:111,vars:19,consts:[[3,"ngClass"],[1,"d-flex","justify-content-between","align-items-center"],[1,"card-title","mb-0"],[1,"d-flex",3,"ngSubmit"],["type","search","placeholder","T\xecm ki\u1ebfm","name","searchQuery","aria-label","Search",1,"form-control","me-2",3,"ngModel","ngModelChange"],["type","submit","nbButton","","status","primary"],[1,"fa-solid","fa-magnifying-glass"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[4,"ngFor","ngForOf"],[3,"apiUrl","current_page","last_page","dataList"],[1,"mt-3",3,"ngClass"],[1,"card-title"],[3,"formGroup","ngSubmit"],["formElement",""],[1,"row"],[1,"col-md-6"],[1,"form-group","my-3"],["for","productId"],[1,"spot"],["id","productId","formControlName","product_id",1,"form-control"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["class","text-danger",4,"ngIf"],["for","qty"],["type","number","id","qty","formControlName","qty",1,"form-control"],["for","customerId"],["type","text","id","customerId","formControlName","customer_name",1,"form-control"],["for","employeeId"],["id","employeeId","formControlName","employee_id",1,"form-control"],[1,"col-md-12"],["for","voucherId"],["type","text","id","voucherCode","formControlName","voucher_code","placeholder","Nh\u1eadp voucher gi\u1ea3m gi\xe1",1,"form-control"],["class","text-danger my-1",4,"ngIf"],[1,"my-3"],[1,"my-3","font-weight-bold"],[1,"d-flex","justify-content-end","mt-4"],["nbButton","","status","warning","type","button","nbTooltip","Reset d\u1eef li\u1ec7u",1,"float-end","mx-2",3,"click"],[1,"fa-solid","fa-rotate-left"],["nbButton","","type","submit","status","success","nbTooltip","L\u01b0u d\u1eef li\u1ec7u",1,"float-end",3,"disabled"],[1,"fa-solid","fa-check"],[1,"align-middle"],[1,"align-middle","text-center"],[1,"btn-group","d-flex","justify-content-center"],["nbButton","","status","primary","type","button","nbTooltip","S\u1eeda d\u1eef li\u1ec7u",1,"btn-sm","mx-1","btn-equal",3,"click"],[1,"fa-solid","fa-pen-to-square"],["nbButton","","status","danger","type","button","nbTooltip","X\xf3a d\u1eef li\u1ec7u",1,"btn-sm","mx-1","btn-equal",3,"click"],[1,"fa-solid","fa-trash"],[3,"value"],[1,"text-danger"],[4,"ngIf"],[1,"text-danger","my-1"]],template:function(e,o){1&e&&(t.TgZ(0,"nb-card",0)(1,"nb-card-header",1)(2,"h5",2),t._uU(3,"Danh s\xe1ch bill"),t.qZA(),t.TgZ(4,"form",3),t.NdJ("ngSubmit",function(){return o.onSearch()}),t.TgZ(5,"input",4),t.NdJ("ngModelChange",function(c){return o.searchQuery=c}),t.qZA(),t.TgZ(6,"button",5),t._UZ(7,"i",6),t.qZA()()(),t.TgZ(8,"nb-card-body")(9,"div",7)(10,"table",8)(11,"thead")(12,"tr")(13,"th"),t._uU(14,"#"),t.qZA(),t.TgZ(15,"th"),t._uU(16,"T\xean kh\xe1ch h\xe0ng"),t.qZA(),t.TgZ(17,"th"),t._uU(18,"T\xean s\u1ea3n ph\u1ea9m"),t.qZA(),t.TgZ(19,"th"),t._uU(20,"S\u1ed1 l\u01b0\u1ee3ng"),t.qZA(),t.TgZ(21,"th"),t._uU(22,"Th\xe0nh ti\u1ec1n"),t.qZA(),t.TgZ(23,"th"),t._uU(24,"Nh\xe2n vi\xean"),t.qZA(),t.TgZ(25,"th"),t._uU(26,"Ng\xe0y t\u1ea1o"),t.qZA(),t.TgZ(27,"th"),t._uU(28,"Thao t\xe1c"),t.qZA()()(),t.TgZ(29,"tbody"),t.YNc(30,k,22,10,"tr",9),t.qZA()(),t.TgZ(31,"ngx-paginator",10),t.NdJ("dataList",function(c){return o.loadBills(c)}),t.qZA()()()(),t.TgZ(32,"nb-card",11)(33,"nb-card-header")(34,"h5",12),t._uU(35,"Th\xeam / C\u1eadp nh\u1eadt h\xf3a \u0111\u01a1n"),t.qZA()(),t.TgZ(36,"nb-card-body")(37,"form",13,14),t.NdJ("ngSubmit",function(){return o.addBill()}),t.TgZ(39,"div",15)(40,"div",16)(41,"div",17)(42,"label",18),t._uU(43,"M\xe3 s\u1ea3n ph\u1ea9m"),t.TgZ(44,"span",19),t._uU(45,"*"),t.qZA(),t._uU(46,":"),t.qZA(),t.TgZ(47,"select",20)(48,"option",21),t._uU(49,"Ch\u1ecdn m\xe3 s\u1ea3n ph\u1ea9m"),t.qZA(),t.YNc(50,w,2,2,"option",22),t.qZA(),t.YNc(51,L,2,1,"div",23),t.qZA()(),t.TgZ(52,"div",16)(53,"div",17)(54,"label",24),t._uU(55,"S\u1ed1 l\u01b0\u1ee3ng"),t.TgZ(56,"span",19),t._uU(57,"*"),t.qZA(),t._uU(58,":"),t.qZA(),t._UZ(59,"input",25),t.YNc(60,D,3,2,"div",23),t.qZA()()(),t.TgZ(61,"div",15)(62,"div",16)(63,"div",17)(64,"label",26),t._uU(65,"T\xean kh\xe1ch h\xe0ng"),t.TgZ(66,"span",19),t._uU(67,"*"),t.qZA(),t._uU(68,":"),t.qZA(),t._UZ(69,"input",27),t.YNc(70,V,2,1,"div",23),t.qZA()(),t.TgZ(71,"div",16)(72,"div",17)(73,"label",28),t._uU(74,"M\xe3 nh\xe2n vi\xean"),t.TgZ(75,"span",19),t._uU(76,"*"),t.qZA(),t._uU(77,":"),t.qZA(),t.TgZ(78,"select",29)(79,"option",21),t._uU(80,"Ch\u1ecdn m\xe3 nh\xe2n vi\xean"),t.qZA(),t.YNc(81,G,2,2,"option",22),t.qZA(),t.YNc(82,$,2,1,"div",23),t.qZA()()(),t.TgZ(83,"div",15)(84,"div",30)(85,"div",17)(86,"label",31),t._uU(87,"M\xe3 voucher:"),t.qZA(),t._UZ(88,"input",32),t.YNc(89,H,3,1,"div",33),t.qZA()()(),t._UZ(90,"hr"),t.TgZ(91,"div",15)(92,"div",30)(93,"p",34),t._uU(94," T\u1ea1m t\xednh ti\u1ec1n h\xe0ng: "),t.TgZ(95,"span"),t._uU(96),t.qZA()(),t.TgZ(97,"p",34),t._uU(98," Ti\u1ec1n gi\u1ea3m c\u1ee7a voucher (n\u1ebfu c\xf3): "),t.TgZ(99,"span"),t._uU(100),t.qZA()(),t.TgZ(101,"p",35)(102,"strong"),t._uU(103," Th\xe0nh ti\u1ec1n: "),t.TgZ(104,"span"),t._uU(105),t.qZA()()()()(),t.TgZ(106,"div",36)(107,"button",37),t.NdJ("click",function(){return o.resetForm()}),t._UZ(108,"i",38),t.qZA(),t.TgZ(109,"button",39),t._UZ(110,"i",40),t.qZA()()()()()),2&e&&(t.Q6J("ngClass",o.currentTheme),t.xp6(5),t.Q6J("ngModel",o.searchQuery),t.xp6(25),t.Q6J("ngForOf",o.bills),t.xp6(1),t.Q6J("apiUrl",o.apiUrl)("current_page",o.currentPage)("last_page",o.totalPages),t.xp6(1),t.Q6J("ngClass",o.currentTheme),t.xp6(5),t.Q6J("formGroup",o.form),t.xp6(13),t.Q6J("ngForOf",o.products),t.xp6(1),t.Q6J("ngIf",o.form.get("product_id").invalid&&o.form.get("product_id").touched),t.xp6(9),t.Q6J("ngIf",o.form.get("qty").invalid&&o.form.get("qty").touched),t.xp6(10),t.Q6J("ngIf",o.form.get("customer_name").invalid&&o.form.get("customer_name").touched),t.xp6(11),t.Q6J("ngForOf",o.employees),t.xp6(1),t.Q6J("ngIf",o.form.get("employee_id").invalid&&o.form.get("employee_id").touched),t.xp6(7),t.Q6J("ngIf",o.voucherErrorMessage),t.xp6(7),t.Oqu(o.formatCurrency(o.provisionalTotal)),t.xp6(4),t.Oqu(o.formatCurrency(o.discountAmount)),t.xp6(5),t.Oqu(o.formatCurrency(o.finalTotal)),t.xp6(4),t.Q6J("disabled",!o.form.valid))},dependencies:[l._Y,l.YN,l.Kr,l.Fj,l.wV,l.EJ,l.JJ,l.JL,l.On,l.F,l.sg,l.u,g.mk,g.sg,g.O5,a.Asz,a.yKW,a.ndF,a.DPz,a.jNv,N.J,g.uU],styles:[".spot[_ngcontent-%COMP%]{color:red}.light[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#fff;color:#000}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.light[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f8f9fa;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#fff;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   .badge-success[_ngcontent-%COMP%]{background-color:#28a745;color:#fff}.light[_ngcontent-%COMP%]   .badge-danger[_ngcontent-%COMP%]{background-color:#dc3545;color:#fff}.light[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{background-color:#f8f9fa;color:#000;border-color:#dee2e6}.dark[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#222b45;color:#fff}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.dark[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#2e3a59;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#222b45;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{background-color:#192038;color:#fff;border-color:#111426}.dark[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]::placeholder{color:#8590a8}"]}),n})(),data:{breadcrumb:"Danh S\xe1ch"}}]}];let X=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[m.Bz.forChild(z),m.Bz]}),n})();var K=s(5053);let R=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[y],imports:[l.u5,l.UX,E.O,a.EoG,a._WB,a.obu,a.zyh,a.BW0,a.T2N,a.COg,a.PYG,a.MfT,a.nKr,a.SDF,a.oGl,a.AE1,X,a.rgH,K.U]}),n})()}]]);