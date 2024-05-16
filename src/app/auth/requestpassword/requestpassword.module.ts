import {NgModule} from "@angular/core";
import {
  NbAlertModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbThemeModule,
} from "@nebular/theme";
import {NbAuthModule} from "@nebular/auth";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import { RequestpasswordComponent } from "./requestpassword.component";

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbThemeModule,
    NbInputModule,
    NbAuthModule,
    NbAlertModule,
    NgIf,
    NgForOf,
    FormsModule,
    NbCheckboxModule,
    RouterLink,
    NbButtonModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
  declarations: [
    RequestpasswordComponent
  ],
  exports: [
    RequestpasswordComponent
  ]
})
export class RequestPasswordModule {

}
