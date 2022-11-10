import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontUiModule } from '@ispent/front/ui';
import { OverviewComponent } from './overview/overview.component';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, RoutingModule, FrontUiModule],
  declarations: [OverviewComponent, HeaderComponent],
})
export class FrontFeatureOverviewModule {}
