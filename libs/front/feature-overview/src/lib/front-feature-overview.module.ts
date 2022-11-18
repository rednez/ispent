import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontUiModule } from '@ispent/front/ui';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RoutingModule } from './routing.module';
import { OperationsPageComponent } from './operations-page/operations-page.component';
import { BreadcrumbsComponent } from './ui/breadcrumbs/breadcrumbs.component';
import { BudgetsSummariesBlockComponent } from './ui/budgets-summaries-block/budgets-summaries-block.component';
import { OneBudgetSummaryBlockComponent } from './ui/one-budget-summary-block/one-budget-summary-block.component';

@NgModule({
  imports: [CommonModule, RoutingModule, FrontUiModule],
  declarations: [
    OverviewPageComponent,
    OperationsPageComponent,
    BreadcrumbsComponent,
    BudgetsSummariesBlockComponent,
    OneBudgetSummaryBlockComponent,
  ],
})
export class FrontFeatureOverviewModule {}
