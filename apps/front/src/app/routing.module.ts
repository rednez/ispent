import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () =>
      import('@ispent/front/feature-overview').then(
        (m) => m.FrontFeatureOverviewModule
      ),
  },
  {
    path: 'budgets',
    loadChildren: () =>
      import('@ispent/front/feature-budgets').then(
        (m) => m.FrontFeatureBudgetsModule
      ),
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('@ispent/front/feature-operation-editor').then(
        (m) => m.FrontFeatureOperationEditorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
