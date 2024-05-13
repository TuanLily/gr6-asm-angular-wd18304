import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: EmployeesComponent,
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
export class EmployeesRoutingModule {
}
