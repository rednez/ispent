import { TestBed } from '@angular/core/testing';
import { CurrentMonthService } from './current-month.service';

describe('CurrentMonthService', () => {
  let service: CurrentMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
