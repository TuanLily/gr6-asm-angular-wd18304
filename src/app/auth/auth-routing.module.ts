import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RequestpasswordComponent } from "./requestpassword/requestpassword.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'request-password',
    component: RequestpasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetpasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetpasswordComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
