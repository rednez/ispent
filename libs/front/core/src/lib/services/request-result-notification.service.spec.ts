import { TestBed } from '@angular/core/testing';

import { RequestResultNotificationService } from './request-result-notification.service';

describe('RequestResultNotificationService', () => {
  let service: RequestResultNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestResultNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
