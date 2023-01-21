import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockProvider } from 'ng-mocks';
import { RequestResultNotificationService } from './request-result-notification.service';

describe('RequestResultNotificationService', () => {
  let service: RequestResultNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockProvider(MatSnackBar)] });
    service = TestBed.inject(RequestResultNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
