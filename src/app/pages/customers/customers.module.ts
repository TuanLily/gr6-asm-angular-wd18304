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
import { CustomersComponent } from './customers.component';
import { ListComponent } from './list/list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { PaginatorModule } from 'app/@theme/components/paginator/paginator.module';

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
    CustomersRoutingModule,
    NbTooltipModule,
    PaginatorModule
  ],
  declarations: [
    CustomersComponent,
    ListComponent
  ],
  providers: [
    NewsService,
  ],
})
export class CustomersModule { }
