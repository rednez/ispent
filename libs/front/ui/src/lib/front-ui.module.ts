import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontCustomMaterialModule } from '@ispent/front/custom-material';
import { NgxMaskModule } from 'ngx-mask';
import { AppBarComponent } from './app-bar/app-bar.component';
import { BiValuedIndicatorComponent } from './bivalued-indicator/bivalued-indicator.component';
import { BudgetChipComponent } from './budget-chip/budget-chip.component';
import { BudgetSummaryWidgetComponent } from './budget-summary-widget/budget-summary-widget.component';
import { ChipComponent } from './chip/chip.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { LoadableWidgetComponent } from './loadable-widget/loadable-widget.component';
import { OperationItemComponent } from './operation-item/operation-item.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { AmountPipe } from './pipes/amount.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { MonthDatePickerComponent } from './month-date-picker/month-date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FrontCustomMaterialModule,
    NgxMaskModule,
  ],
  declarations: [
    AmountPipe,
    AppBarComponent,
    PageLayoutComponent,
    BudgetSummaryWidgetComponent,
    BiValuedIndicatorComponent,
    ChipComponent,
    CurrencyPipe,
    OperationItemComponent,
    OperationsListComponent,
    BudgetChipComponent,
    EmptyStateComponent,
    LoadableWidgetComponent,
    MonthDatePickerComponent,
  ],
  exports: [
    RouterModule,
    FrontCustomMaterialModule,
    AmountPipe,
    NgxMaskModule,
    AppBarComponent,
    PageLayoutComponent,
    BudgetSummaryWidgetComponent,
    BiValuedIndicatorComponent,
    ChipComponent,
    CurrencyPipe,
    OperationItemComponent,
    OperationsListComponent,
    BudgetChipComponent,
    EmptyStateComponent,
    LoadableWidgetComponent,
    MonthDatePickerComponent,
  ],
})
export class FrontUiModule {}
