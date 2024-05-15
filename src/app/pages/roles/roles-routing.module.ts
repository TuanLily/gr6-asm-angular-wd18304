import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { rolesComponent } from './roles.component';
import { listComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: rolesComponent,
  children: [
    {
      path: 'list',
      component: listComponent,
      data: { breadcrumb: 'Danh Sách' },

    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieRoutingModule {
}
