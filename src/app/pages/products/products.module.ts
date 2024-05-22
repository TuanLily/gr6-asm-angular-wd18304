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
import { ListComponent } from './list/list.component';
import { NewsService } from './news.service';
import { CategorieRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
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
    NbTooltipModule,
    CategorieRoutingModule,
    PaginatorModule
  ],
  declarations: [
    ProductsComponent,
    ListComponent
  ],
  providers: [
    NewsService,
  ],
})
export class ProductsModule { }
