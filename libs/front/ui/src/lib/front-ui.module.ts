import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { FrontCustomMaterialModule } from '@ispent/front/custom-material';
import { AmountPipe } from './pipes/amount.pipe';

@NgModule({
  imports: [CommonModule, FrontCustomMaterialModule, NgxMaskModule],
  declarations: [AmountPipe],
  exports: [FrontCustomMaterialModule, AmountPipe, NgxMaskModule],
})
export class FrontUiModule {}
