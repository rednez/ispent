import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import { AuthorizedGuard } from './authorized.guard';

describe('AuthorizedGuard', () => {
  let guard: AuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(AngularFireAuth), MockProvider(Router)],
    });
    guard = TestBed.inject(AuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
