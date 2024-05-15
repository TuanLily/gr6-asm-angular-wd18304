import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  component: FeedbackComponent,
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
export class FeedbackRoutingModule {
}
