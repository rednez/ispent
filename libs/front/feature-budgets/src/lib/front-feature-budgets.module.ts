import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontUiModule } from '@ispent/front/ui';
import { BudgetCategoryPreviousDataComponent } from './budget-category-previous-data/budget-category-previous-data.component';
import { BudgetCategoryComponent } from './budget-category/budget-category.component';
import { BudgetCurrencyHeaderComponent } from './budget-currency-header/budget-currency-header.component';
import { BudgetCurrencyComponent } from './budget-currency/budget-currency.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetGroupHeaderComponent } from './budget-group-header/budget-group-header.component';
import { BudgetGroupComponent } from './budget-group/budget-group.component';
import { EditBudgetPageComponent } from './edit-budget-page/edit-budget-page.component';
import { RoutingModule } from './routing.module';
import { BudgetsEmptyStateComponent } from './budgets-empty-state/budgets-empty-state.component';

@NgModule({
  imports: [CommonModule, FrontUiModule, RoutingModule],
  declarations: [
    BudgetCategoryComponent,
    BudgetFormComponent,
    BudgetGroupComponent,
    BudgetGroupHeaderComponent,
    BudgetCurrencyHeaderComponent,
    BudgetCurrencyComponent,
    BudgetCategoryPreviousDataComponent,
    EditBudgetPageComponent,
    BudgetsEmptyStateComponent,
  ],
  exports: [BudgetFormComponent],
})
export class FrontFeatureBudgetsModule {}
