import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: CustomersComponent,
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
export class CustomersRoutingModule {
}
