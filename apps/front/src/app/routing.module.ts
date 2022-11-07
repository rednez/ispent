import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'budgets',
    loadChildren: () =>
      import('@ispent/front/feature-budgets').then(
        (m) => m.FrontFeatureBudgetsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
