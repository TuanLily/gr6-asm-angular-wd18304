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
    path: 'requestpassword',
    component: RequestpasswordComponent,
  },
  {
    path: 'resetpassword',
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
