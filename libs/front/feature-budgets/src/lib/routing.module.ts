import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBudgetPageComponent } from './edit-budget-page/edit-budget-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditBudgetPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
