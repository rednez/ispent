import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontUiModule } from '@ispent/front/ui';
import { RoutingModule } from './routing.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

@NgModule({
  imports: [CommonModule, RoutingModule, FrontUiModule],
  declarations: [SignInPageComponent],
})
export class FrontFeatureSignInModule {}
