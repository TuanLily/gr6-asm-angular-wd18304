import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BillsComponent } from './bills.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: BillsComponent,
  children: [
    {
      path: 'list',
      component: ListComponent,
      data: { breadcrumb: 'Danh Sách' },

    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {
}
