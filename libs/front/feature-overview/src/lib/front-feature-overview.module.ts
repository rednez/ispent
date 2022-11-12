import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontUiModule } from '@ispent/front/ui';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './ui/header/header.component';
import { OperationsPageComponent } from './operations-page/operations-page.component';
import { BreadcrumbsComponent } from './ui/breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [CommonModule, RoutingModule, FrontUiModule],
  declarations: [
    OverviewPageComponent,
    HeaderComponent,
    OperationsPageComponent,
    BreadcrumbsComponent,
  ],
})
export class FrontFeatureOverviewModule {}
