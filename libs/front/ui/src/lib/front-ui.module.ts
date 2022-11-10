import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontCustomMaterialModule } from '@ispent/front/custom-material';
import { NgxMaskModule } from 'ngx-mask';
import { AppBarComponent } from './app-bar/app-bar.component';
import { BiValuedIndicatorComponent } from './bivalued-indicator/bivalued-indicator.component';
import { BudgetSummaryWidgetComponent } from './budget-summary-widget/budget-summary-widget.component';
import { ChipComponent } from './chip/chip.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { AmountPipe } from './pipes/amount.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { OperationItemComponent } from './operation-item/operation-item.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { BudgetChipComponent } from './budget-chip/budget-chip.component';

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
  ],
})
export class FrontUiModule {}
