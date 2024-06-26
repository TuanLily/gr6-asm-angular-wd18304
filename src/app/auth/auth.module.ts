import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginModule } from "./login/login.module";
import { AuthComponent } from "./auth.component";
import { ThemeModule } from "../@theme/theme.module";
import { RequestPasswordModule } from "./requestpassword/requestpassword.module";
import { ResetpasswordModule } from "./resetpassword/resetpassword.module";

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginModule,
    RequestPasswordModule,
    ResetpasswordModule,
    ThemeModule
  ],
  declarations: [
    AuthComponent,
  ]
})
export class AuthModule {
}
