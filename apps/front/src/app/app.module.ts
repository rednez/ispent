import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontUiModule } from '@ispent/front/ui';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

const maskConfig: Partial<IConfig> = {
  decimalMarker: '.',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FrontUiModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
