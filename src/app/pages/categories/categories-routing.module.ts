import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
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
export class CategorieRoutingModule {
}
