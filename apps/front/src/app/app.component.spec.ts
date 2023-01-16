import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(() =>
    MockBuilder(AppComponent, AppModule)
      .mock(TranslateService)
      .mock(Router)
      .mock(AngularFireAuth, {
        onIdTokenChanged: () => new Promise({} as any) as any,
      })
  );

  it('should create the app', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
