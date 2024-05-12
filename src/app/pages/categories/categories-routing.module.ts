import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { CategoriesComponent } from './list/list.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  children: [
    {
      path: 'list',
      component: CategoriesComponent,
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
