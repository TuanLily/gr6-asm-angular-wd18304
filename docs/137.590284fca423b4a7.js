"use strict";(self.webpackChunkASM=self.webpackChunkASM||[]).push([[137],{137:(X,g,a)=>{a.r(g),a.d(g,{VouchersModule:()=>R});var c=a(9015),u=a(2823),f=a(2617),p=a(4004),_=a(1005),t=a(4650),v=a(529);let E=(()=>{class e{constructor(o){this.http=o}load(o,n){const r=(o-1)%7*n;return this.http.get("assets/data/news.json").pipe((0,p.U)(s=>s.splice(r,n)),(0,_.g)(1500))}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(v.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var d=a(923);let b=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["ngx-components"]],decls:1,vars:0,template:function(o,n){1&o&&t._UZ(0,"router-outlet")},dependencies:[d.lC],encapsulation:2}),e})();var Z=a(5226),T=a.n(Z),m=a(4641),A=a(9827),y=a(5515),h=a(6895),M=a(5547);const x=["formElement"];function P(e,i){if(1&e){const o=t.EpF();t.TgZ(0,"tr")(1,"td",35),t._uU(2),t.qZA(),t.TgZ(3,"td",35),t._uU(4),t.qZA(),t.TgZ(5,"td",35),t._uU(6),t.qZA(),t.TgZ(7,"td",35)(8,"div"),t._uU(9),t.ALo(10,"date"),t.qZA(),t.TgZ(11,"div"),t._uU(12),t.ALo(13,"date"),t.qZA()(),t.TgZ(14,"td",36)(15,"div",37)(16,"button",38),t.NdJ("click",function(){const s=t.CHM(o).$implicit,l=t.oxw();return t.KtG(l.editVoucher(s.id))}),t._UZ(17,"i",39),t.qZA(),t.TgZ(18,"button",40),t.NdJ("click",function(){const s=t.CHM(o).$implicit,l=t.oxw();return t.KtG(l.deleteVoucher(s.id))}),t._UZ(19,"i",41),t.qZA()()()()}if(2&e){const o=i.$implicit,n=i.index;t.xp6(2),t.Oqu(n+1),t.xp6(2),t.Oqu(o.voucher_code),t.xp6(2),t.hij("",o.discount_rate," %"),t.xp6(3),t.hij("B\u1eaft \u0111\u1ea7u: ",t.xi3(10,5,o.valid_from,"dd/MM/yyyy"),""),t.xp6(3),t.hij("K\u1ebft th\xfac: ",t.xi3(13,8,o.valid_to,"dd/MM/yyyy"),"")}}function F(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng nh\u1eadp m\xe3 voucher."),t.qZA())}function O(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"M\xe3 voucher \u0111\xe3 t\u1ed3n t\u1ea1i, vui l\xf2ng nh\u1eadp m\xe3 kh\xe1c."),t.qZA())}function V(e,i){if(1&e&&(t.TgZ(0,"div",42),t.YNc(1,F,2,0,"small",43),t.YNc(2,O,2,0,"small",43),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.form.get("voucher_code").hasError("required")),t.xp6(1),t.Q6J("ngIf",o.form.get("voucher_code").hasError("duplicate"))}}function D(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng nh\u1eadp gi\xe1 tr\u1ecb cho voucher."),t.qZA())}function U(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Gi\xe1 tr\u1ecb voucher kh\xf4ng \u0111\u01b0\u1ee3c nh\u1ecf h\u01a1n 0."),t.qZA())}function q(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Gi\xe1 tr\u1ecb voucher kh\xf4ng \u0111\u01b0\u1ee3c l\u1edbn h\u01a1n 100."),t.qZA())}function k(e,i){if(1&e&&(t.TgZ(0,"div",42),t.YNc(1,D,2,0,"small",43),t.YNc(2,U,2,0,"small",43),t.YNc(3,q,2,0,"small",43),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.form.get("discount_rate").hasError("required")),t.xp6(1),t.Q6J("ngIf",o.form.get("discount_rate").hasError("min")),t.xp6(1),t.Q6J("ngIf",o.form.get("discount_rate").hasError("max"))}}function w(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng ch\u1ecdn th\u1eddi gian c\xf3 hi\u1ec7u l\u1ef1c."),t.qZA())}function N(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Th\u1eddi gian c\xf3 hi\u1ec7u l\u1ef1c kh\xf4ng \u0111\u01b0\u1ee3c l\u1edbn h\u01a1n th\u1eddi gian h\u1ebft hi\u1ec7u l\u1ef1c."),t.qZA())}function S(e,i){if(1&e&&(t.TgZ(0,"div",42),t.YNc(1,w,2,0,"small",43),t.YNc(2,N,2,0,"small",43),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.form.get("valid_from").hasError("required")),t.xp6(1),t.Q6J("ngIf",o.form.get("valid_from").hasError("dateRangeInvalid"))}}function I(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng ch\u1ecdn th\u1eddi gian h\u1ebft hi\u1ec7u l\u1ef1c."),t.qZA())}function L(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Th\u1eddi gian h\u1ebft hi\u1ec7u l\u1ef1c kh\xf4ng h\u1ee3p l\u1ec7."),t.qZA())}function J(e,i){if(1&e&&(t.TgZ(0,"div",42),t.YNc(1,I,2,0,"small",43),t.YNc(2,L,2,0,"small",43),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.form.get("valid_to").hasError("required")),t.xp6(1),t.Q6J("ngIf",o.form.get("valid_to").hasError("invalidDate"))}}function B(e,i){1&e&&(t.TgZ(0,"small"),t._uU(1,"Vui l\xf2ng nh\u1eadp m\xf4 t\u1ea3."),t.qZA())}function Q(e,i){if(1&e&&(t.TgZ(0,"div",42),t.YNc(1,B,2,0,"small",43),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.form.get("description").hasError("required"))}}const Y=[{path:"",component:b,children:[{path:"list",component:(()=>{class e{constructor(o,n,r,s,l,z){this.toastrService=o,this.voucherService=n,this.themeService=r,this.spinner=s,this.router=l,this.route=z,this.newVoucher={voucher_code:"",discount_rate:0,valid_from:"",valid_to:"",description:""},this.isAddingNewVoucher=!0,this.isEditing=!1,this.vouchers=[],this.apiUrl=m.C+m.Q.vouchers,this.currentPage=1,this.searchQuery="",this.themes=[{value:"default",name:"Light"},{value:"dark",name:"Dark"}],this.currentTheme="default",this.themeService.onThemeChange().subscribe(H=>{this.currentTheme=H.name})}ngOnInit(){this.route.queryParams.subscribe(o=>{this.loadVouchers(o.page||1)}),this.form=new c.cw({voucher_code:new c.NI("",c.kI.required),discount_rate:new c.NI("",[c.kI.required,c.kI.min(0),c.kI.max(100)]),valid_from:new c.NI("",[c.kI.required,this.dateRangeValidator]),valid_to:new c.NI("",[c.kI.required,this.validateEndDate.bind(this)]),description:new c.NI("")})}minValidDate(){return(new Date).toISOString().split("T")[0]}formatDate(o){const n=new Date(o);return`${n.getFullYear()}-${("0"+(n.getMonth()+1)).slice(-2)}-${("0"+n.getDate()).slice(-2)}`}dateRangeValidator(o){const n=o.parent;if(!n)return null;const r=n.get("valid_from").value,s=n.get("valid_to").value;return r&&s&&new Date(r)>new Date(s)?{dateRangeInvalid:!0}:null}loadVouchers(o){this.spinner.show(),this.voucherService.getAllVouchers(o,this.searchQuery).subscribe(n=>{this.spinner.hide(),this.vouchers=n.vouchers,this.currentPage=n.currentPage,this.totalPages=n.totalPages;const r={page:o};this.searchQuery&&""!==this.searchQuery.trim()&&(r.search=this.searchQuery),this.router.navigate([],{queryParams:r,replaceUrl:!0})})}onSearch(){this.loadVouchers(this.currentPage)}addVoucher(){if(!this.form.valid)return void this.toastrService.danger("Vui l\xf2ng nh\u1eadp \u0111\u1ee7 d\u1eef li\u1ec7u v\xe0 ki\u1ec3m tra l\u1ea1i c\xe1c tr\u01b0\u1eddng!","Error");const o=this.form.get("voucher_code").value;this.voucherService.checkDuplicateVoucherCode(o).subscribe(n=>{if(n.exists&&(this.isAddingNewVoucher||this.isEditing&&o!==this.newVoucher.voucher_code))return void this.form.get("voucher_code").setErrors({duplicate:!0});let r={voucher_code:o,discount_rate:this.form.get("discount_rate").value,valid_from:this.form.get("valid_from").value,valid_to:this.form.get("valid_to").value,description:this.form.get("description").value};this.spinner.show(),this.isEditing&&!this.isAddingNewVoucher?this.voucherService.updateVoucher(this.newVoucher.id,r).subscribe(()=>{this.toastrService.success("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng!","Success"),this.isEditing=!1,this.spinner.hide(),this.loadVouchers(this.currentPage)},l=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi c\u1eadp nh\u1eadt voucher!","Error"),console.error("Error updating voucher:",l),this.spinner.hide()}):this.voucherService.addVoucher(r).subscribe(()=>{this.toastrService.success("Th\xeam m\u1edbi th\xe0nh c\xf4ng!","Success"),this.spinner.hide(),this.loadVouchers(1)},s=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi th\xeam voucher!","Error"),console.error("Error adding voucher:",s),this.spinner.hide()}),this.form.reset()},n=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi ki\u1ec3m tra m\xe3 voucher!","Error"),console.error("Error checking duplicate voucher:",n)})}editVoucher(o){if(this.isEditing)return;const n=this.vouchers.findIndex(r=>r.id===o);-1!==n&&(this.newVoucher=Object.assign({},this.vouchers[n]),this.form.patchValue({voucher_code:this.newVoucher.voucher_code,discount_rate:this.newVoucher.discount_rate,valid_from:this.formatDate(this.newVoucher.valid_from),valid_to:this.formatDate(this.newVoucher.valid_to),description:this.newVoucher.description}),this.isAddingNewVoucher=!1,this.isEditing=!0,this.toastrService.info("S\u1eb5n s\xe0ng c\u1eadp nh\u1eadt!","Th\xf4ng tin")),this.scrollFormIntoView()}deleteVoucher(o){T().fire({title:"X\xe1c nh\u1eadn x\xf3a",text:"B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a voucher n\xe0y?",icon:"warning",showCancelButton:!0,confirmButtonText:"\u0110\u1ed3ng \xfd",cancelButtonText:"H\u1ee7y b\u1ecf"}).then(n=>{n.isConfirmed&&this.voucherService.deleteVoucher(o).subscribe(()=>{const r=this.vouchers.findIndex(s=>s.id===o);-1!==r&&(this.vouchers.splice(r,1),this.loadVouchers(this.currentPage),this.toastrService.success("X\xf3a th\xe0nh c\xf4ng!","Success"))},r=>{this.toastrService.danger("\u0110\xe3 x\u1ea3y ra l\u1ed7i khi x\xf3a voucher!","Error"),console.error("Error deleting voucher:",r)})})}resetForm(){this.isEditing=!1,this.isAddingNewVoucher=!1,this.form.reset(),this.toastrService.success("D\u1eef li\u1ec7u tr\xean form \u0111\xe3 \u0111\u01b0\u1ee3c reset!","Th\xe0nh c\xf4ng")}scrollFormIntoView(){this.formElement&&this.formElement.nativeElement.scrollIntoView({behavior:"smooth",block:"start"})}formatCurrency(o){return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" \u0111"}validateEndDate(o){if(o.value){const n=new Date;if(new Date(o.value)<n)return{invalidDate:!0}}return null}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(u.quB),t.Y36(A.H),t.Y36(u.WMF),t.Y36(y.V),t.Y36(d.F0),t.Y36(d.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-list"]],viewQuery:function(o,n){if(1&o&&t.Gf(x,5),2&o){let r;t.iGM(r=t.CRH())&&(n.formElement=r.first)}},decls:78,vars:16,consts:[[3,"ngClass"],[1,"d-flex","justify-content-between","align-items-center"],[1,"card-title","mb-0"],[1,"d-flex",3,"ngSubmit"],["type","search","placeholder","T\xecm ki\u1ebfm","name","searchQuery","aria-label","Search",1,"form-control","me-2",3,"ngModel","ngModelChange"],["type","submit","nbButton","","status","primary"],[1,"fa-solid","fa-magnifying-glass"],[1,"table-responsive"],[1,"table","table-bordered","table-hover"],[4,"ngFor","ngForOf"],[3,"apiUrl","current_page","last_page","dataList"],[1,"mt-3"],[1,"card-title"],[3,"formGroup","ngSubmit"],["formElement",""],[1,"form-group","my-3"],["for","voucherCode",1,"my-1"],[1,"spot"],["type","text","id","voucherCode","formControlName","voucher_code",1,"form-control"],["class","text-danger",4,"ngIf"],["for","discountRate",1,"my-1"],["type","number","id","discountRate","formControlName","discount_rate",1,"form-control"],[1,"row"],[1,"col-md-6"],["for","validFrom",1,"my-1"],["type","date","id","validFrom","formControlName","valid_from",1,"form-control",3,"min"],["for","validTo",1,"my-1"],["type","date","id","validTo","formControlName","valid_to",1,"form-control",3,"min","disabled"],["for","description",1,"my-1"],["id","description","rows","3","formControlName","description","placeholder","Nh\u1eadp ghi ch\xfa",1,"form-control"],[1,"d-flex","justify-content-end","mt-4"],["nbButton","","status","warning","type","button","nbTooltip","Reset d\u1eef li\u1ec7u",1,"float-end","mx-2",3,"click"],[1,"fa-solid","fa-rotate-left"],["nbButton","","type","submit","status","success","nbTooltip","L\u01b0u d\u1eef li\u1ec7u",1,"float-end",3,"disabled"],[1,"fa-solid","fa-check"],[1,"align-middle"],[1,"align-middle","text-center"],[1,"btn-group","d-flex","justify-content-center"],["nbButton","","status","primary","type","button","nbTooltip","S\u1eeda d\u1eef li\u1ec7u",1,"btn-sm","mx-1","btn-equal",3,"click"],[1,"fa-solid","fa-pen-to-square"],["nbButton","","status","danger","type","button","nbTooltip","X\xf3a d\u1eef li\u1ec7u",1,"btn-sm","mx-1","btn-equal",3,"click"],[1,"fa-solid","fa-trash"],[1,"text-danger"],[4,"ngIf"]],template:function(o,n){1&o&&(t.TgZ(0,"nb-card",0)(1,"nb-card-header",1)(2,"h5",2),t._uU(3,"Danh s\xe1ch voucher"),t.qZA(),t.TgZ(4,"form",3),t.NdJ("ngSubmit",function(){return n.onSearch()}),t.TgZ(5,"input",4),t.NdJ("ngModelChange",function(s){return n.searchQuery=s}),t.qZA(),t.TgZ(6,"button",5),t._UZ(7,"i",6),t.qZA()()(),t.TgZ(8,"nb-card-body")(9,"div",7)(10,"table",8)(11,"thead")(12,"tr")(13,"th"),t._uU(14,"#"),t.qZA(),t.TgZ(15,"th"),t._uU(16,"M\xe3 voucher"),t.qZA(),t.TgZ(17,"th"),t._uU(18,"Gi\xe1 tr\u1ecb"),t.qZA(),t.TgZ(19,"th"),t._uU(20,"Th\u1eddi gian"),t.qZA(),t.TgZ(21,"th"),t._uU(22,"Thao t\xe1c"),t.qZA()()(),t.TgZ(23,"tbody"),t.YNc(24,P,20,11,"tr",9),t.qZA()(),t.TgZ(25,"ngx-paginator",10),t.NdJ("dataList",function(s){return n.loadVouchers(s)}),t.qZA()()()(),t.TgZ(26,"nb-card",11)(27,"nb-card-header")(28,"h5",12),t._uU(29,"Th\xeam / C\u1eadp nh\u1eadt voucher"),t.qZA()(),t.TgZ(30,"nb-card-body")(31,"form",13,14),t.NdJ("ngSubmit",function(){return n.addVoucher()}),t.TgZ(33,"div",15)(34,"label",16),t._uU(35,"M\xe3 voucher"),t.TgZ(36,"span",17),t._uU(37,"*"),t.qZA(),t._uU(38,":"),t.qZA(),t._UZ(39,"input",18),t.YNc(40,V,3,2,"div",19),t.qZA(),t.TgZ(41,"div",15)(42,"label",20),t._uU(43,"Gi\xe1 tr\u1ecb"),t.TgZ(44,"span",17),t._uU(45,"*"),t.qZA(),t._uU(46,":"),t.qZA(),t._UZ(47,"input",21),t.YNc(48,k,4,3,"div",19),t.qZA(),t.TgZ(49,"div",22)(50,"div",23)(51,"div",15)(52,"label",24),t._uU(53,"Th\u1eddi gian c\xf3 hi\u1ec7u l\u1ef1c"),t.TgZ(54,"span",17),t._uU(55,"*"),t.qZA(),t._uU(56,":"),t.qZA(),t._UZ(57,"input",25),t.YNc(58,S,3,2,"div",19),t.qZA()(),t.TgZ(59,"div",23)(60,"div",15)(61,"label",26),t._uU(62,"Th\u1eddi gian h\u1ebft hi\u1ec7u l\u1ef1c"),t.TgZ(63,"span",17),t._uU(64,"*"),t.qZA(),t._uU(65,":"),t.qZA(),t._UZ(66,"input",27),t.YNc(67,J,3,2,"div",19),t.qZA()()(),t.TgZ(68,"div",15)(69,"label",28),t._uU(70,"M\xf4 t\u1ea3:"),t.qZA(),t._UZ(71,"textarea",29),t.YNc(72,Q,2,1,"div",19),t.qZA(),t.TgZ(73,"div",30)(74,"button",31),t.NdJ("click",function(){return n.resetForm()}),t._UZ(75,"i",32),t.qZA(),t.TgZ(76,"button",33),t._UZ(77,"i",34),t.qZA()()()()()),2&o&&(t.Q6J("ngClass",n.currentTheme),t.xp6(5),t.Q6J("ngModel",n.searchQuery),t.xp6(19),t.Q6J("ngForOf",n.vouchers),t.xp6(1),t.Q6J("apiUrl",n.apiUrl)("current_page",n.currentPage)("last_page",n.totalPages),t.xp6(6),t.Q6J("formGroup",n.form),t.xp6(9),t.Q6J("ngIf",n.form.get("voucher_code").invalid&&n.form.get("voucher_code").touched),t.xp6(8),t.Q6J("ngIf",n.form.get("discount_rate").invalid&&n.form.get("discount_rate").touched),t.xp6(9),t.Q6J("min",n.minValidDate()),t.xp6(1),t.Q6J("ngIf",n.form.get("valid_from").invalid&&n.form.get("valid_from").touched),t.xp6(8),t.Q6J("min",n.minValidDate())("disabled",n.form.get("valid_to").hasError("invalidDate")),t.xp6(1),t.Q6J("ngIf",n.form.get("valid_to").invalid&&n.form.get("valid_to").touched),t.xp6(5),t.Q6J("ngIf",n.form.get("description").invalid&&n.form.get("description").touched),t.xp6(4),t.Q6J("disabled",!n.form.valid))},dependencies:[c._Y,c.Fj,c.wV,c.JJ,c.JL,c.On,c.F,c.sg,c.u,h.mk,h.sg,h.O5,u.Asz,u.yKW,u.ndF,u.DPz,u.jNv,M.J,h.uU],styles:[".spot[_ngcontent-%COMP%]{color:red}.badge-success[_ngcontent-%COMP%]{display:inline-block;padding:.5em .75em;font-size:.875em;font-weight:700;color:#fff;background-color:#28a745;border-radius:.2rem}.badge-danger[_ngcontent-%COMP%]{display:inline-block;padding:.5em .75em;font-size:.875em;font-weight:700;color:#fff;background-color:#dc3545;border-radius:.2rem}.light[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#fff;color:#000}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.light[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f8f9fa;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}.light[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#fff;color:#000;border-color:#dee2e6}.light[_ngcontent-%COMP%]   .badge-success[_ngcontent-%COMP%]{background-color:#28a745;color:#fff}.light[_ngcontent-%COMP%]   .badge-danger[_ngcontent-%COMP%]{background-color:#dc3545;color:#fff}.light[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{background-color:#f8f9fa;color:#000;border-color:#dee2e6}.dark[_ngcontent-%COMP%]   .table-responsive[_ngcontent-%COMP%]{background-color:#222b45;color:#fff}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{background-color:transparent}.dark[_ngcontent-%COMP%]   .table-bordered[_ngcontent-%COMP%]{border:1px solid #3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#2e3a59;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#3b426b}.dark[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{background-color:#222b45;color:#fff;border-color:#3b426b}.dark[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{background-color:#192038;color:#fff;border-color:#111426}.dark[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]::placeholder{color:#8590a8}"]}),e})(),data:{breadcrumb:"Danh S\xe1ch"}}]}];let G=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[d.Bz.forChild(Y),d.Bz]}),e})();var j=a(5053);let R=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[E],imports:[c.u5,c.UX,f.O,u.EoG,u._WB,u.obu,u.zyh,u.BW0,u.T2N,u.COg,u.PYG,u.MfT,u.nKr,u.SDF,u.oGl,u.AE1,G,u.rgH,j.U]}),e})()}}]);