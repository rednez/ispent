import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { AuthorizedGuard, UnauthorizedGuard } from '@ispent/front/data-access';
import { AppTitleStrategy } from './app-title.strategy';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('@ispent/front/feature-sign-in').then(
        (m) => m.FrontFeatureSignInModule
      ),
    canActivate: [UnauthorizedGuard],
    title: 'Sign-in',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('@ispent/front/feature-overview').then(
        (m) => m.FrontFeatureOverviewModule
      ),
    canActivate: [AuthorizedGuard],
    title: 'Overview',
  },
  {
    path: 'budgets',
    loadChildren: () =>
      import('@ispent/front/feature-budgets').then(
        (m) => m.FrontFeatureBudgetsModule
      ),
    canActivate: [AuthorizedGuard],
    title: 'Budgets',
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('@ispent/front/feature-operation-editor').then(
        (m) => m.FrontFeatureOperationEditorModule
      ),
    canActivate: [AuthorizedGuard],
    title: 'Operations',
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: AppTitleStrategy }],
})
export class RoutingModule {}
