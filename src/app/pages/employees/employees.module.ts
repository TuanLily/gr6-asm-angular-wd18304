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
  NbThemeModule,
  NbTooltipModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NewsService } from './news.service';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { ListComponent } from './list/list.component';

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
    NbTooltipModule,
    EmployeesRoutingModule,
  ],
  declarations: [
    EmployeesComponent,
    ListComponent
  ],
  providers: [
    NewsService,
  ],
})
export class EmployeesModule { }