import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetSummaryType } from '@ispent/front/data-access';
import { OperationsPageComponent } from './operations-page/operations-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewPageComponent,
  },
  {
    path: ':currency',
    component: OperationsPageComponent,
    data: { type: BudgetSummaryType.Currency },
  },
  {
    path: ':currency/:group',
    component: OperationsPageComponent,
    data: { type: BudgetSummaryType.Group },
  },
  {
    path: ':currency/:group/:category',
    component: OperationsPageComponent,
    data: { type: BudgetSummaryType.Category },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
