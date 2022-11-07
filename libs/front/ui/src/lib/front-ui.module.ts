import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { FrontCustomMaterialModule } from '@ispent/front/custom-material';
import { AmountPipe } from './pipes/amount.pipe';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './common-layout/common-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FrontCustomMaterialModule,
    NgxMaskModule,
  ],
  declarations: [AmountPipe, AppBarComponent, CommonLayoutComponent],
  exports: [
    RouterModule,
    FrontCustomMaterialModule,
    AmountPipe,
    NgxMaskModule,
    AppBarComponent,
    CommonLayoutComponent,
  ],
})
export class FrontUiModule {}
