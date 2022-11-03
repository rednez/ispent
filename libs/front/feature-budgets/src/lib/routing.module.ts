import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
