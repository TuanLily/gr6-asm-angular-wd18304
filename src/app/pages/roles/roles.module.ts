import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbThemeModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { NewsService } from './news.service';
import { CategorieRoutingModule } from './roles-routing.module';
import { rolesComponent } from './roles.component';
import { listComponent } from './list/list.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    NbListModule,
    NbAlertModule,
    NbCheckboxModule,
    NbInputModule,
    NbThemeModule,
    NbAccordionModule,
    NbUserModule,
    CategorieRoutingModule,
  ],
  declarations: [
    rolesComponent,
    listComponent
  ],
  providers: [
    NewsService,
  ],
})
export class rolesModule { }
