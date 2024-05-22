import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./@core/guards";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    canActivateChild: [AuthGuard], // !Chỗ này khi được bật lên thì sẽ kiểm tra xem có token không, nếu có thì sẽ kiểm tra xem là có đăng nhập không và lưu thời hạn đăng nhập có hiệu lục
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    data: {breadcrumb: 'Trang chủ'},
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module')
      .then(m => m.ErrorModule),
  },
  {path: '', redirectTo: 'pages/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'error/404'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
