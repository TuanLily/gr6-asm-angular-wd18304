import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from 'app/error/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { breadcrumb: 'Dashboard' },
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductsModule),
      data: { breadcrumb: 'Sản Phẩm' },

    },
    {
      path: 'categories',
      loadChildren: () => import('./categories/categories.module')
        .then(m => m.CategoriesModule),
      data: { breadcrumb: 'Danh Mục' },

    },
    {
      path: 'vouchers',
      loadChildren: () => import('./vouchers/vouchers.module')
        .then(m => m.VouchersModule),
      data: { breadcrumb: 'Mã giảm giá' },

    },
    {
      path: 'bills',
      loadChildren: () => import('./bills/bills.module')
        .then(m => m.BillsModule),
      data: { breadcrumb: 'Mã giảm giá' },

    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
