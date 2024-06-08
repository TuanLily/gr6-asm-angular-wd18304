import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReviewsComponent } from './reviews.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: ReviewsComponent,
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
export class ReviewsRoutingModule {
}
