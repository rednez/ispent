import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrontUiModule } from '@ispent/front/ui';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { RateComponent } from './rate/rate.component';
import { RoutingModule } from './routing.module';

@NgModule({
  imports: [CommonModule, FrontUiModule, RoutingModule],
  declarations: [EditorFormComponent, EditorPageComponent, RateComponent],
})
export class FrontFeatureOperationEditorModule {}
