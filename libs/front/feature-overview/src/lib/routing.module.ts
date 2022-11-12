import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },
  {
    path: ':currency/:group',
    component: OperationsPageComponent,
  },
  {
    path: ':currency/:group/:category',
    component: OperationsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
