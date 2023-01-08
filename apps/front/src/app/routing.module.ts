import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard, UnauthorizedGuard } from '@ispent/front/data-access';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('@ispent/front/feature-sign-in').then(
        (m) => m.FrontFeatureSignInModule
      ),
    canActivate: [UnauthorizedGuard],
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('@ispent/front/feature-overview').then(
        (m) => m.FrontFeatureOverviewModule
      ),
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'budgets',
    loadChildren: () =>
      import('@ispent/front/feature-budgets').then(
        (m) => m.FrontFeatureBudgetsModule
      ),
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('@ispent/front/feature-operation-editor').then(
        (m) => m.FrontFeatureOperationEditorModule
      ),
    canActivate: [AuthorizedGuard],
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
