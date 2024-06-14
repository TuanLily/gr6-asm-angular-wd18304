import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { BreadcrumbModule } from "xng-breadcrumb";
import { EchartsComponent } from './echarts/echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
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
  NbTooltipModule,
  NbIconModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
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
    NbIconModule,
    NbTooltipModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    EchartsComponent
  ],
})
export class DashboardModule { }
