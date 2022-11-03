import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontFeatureBudgetsModule } from '@ispent/front/feature-budgets';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';

const maskConfig: Partial<IConfig> = {
  decimalMarker: '.',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FrontFeatureBudgetsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
