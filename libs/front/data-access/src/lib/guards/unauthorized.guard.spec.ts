import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

import { UnauthorizedGuard } from './unauthorized.guard';

describe('UnauthorizedGuard', () => {
  let guard: UnauthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(AngularFireAuth), MockProvider(Router)],
    });
    guard = TestBed.inject(UnauthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
