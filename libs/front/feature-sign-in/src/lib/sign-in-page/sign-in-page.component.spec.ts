import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';
import { FrontFeatureSignInModule } from '../front-feature-sign-in.module';

import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  beforeEach(() =>
    MockBuilder(SignInPageComponent, FrontFeatureSignInModule)
      .mock(Router)
      .mock(
        AngularFireAuth,
        { signInWithPopup: () => new Promise({} as any) as any },
        { export: true }
      )
      .mock(MatIconRegistry)
      .mock(DomSanitizer)
  );

  it('should create', () => {
    const fixture = MockRender(SignInPageComponent);
    expect(fixture.point.componentInstance).toBeTruthy();
  });
});
