import { TestBed } from '@angular/core/testing';

import { CreateCurrencyService } from './create-currency.service';

describe('CreateCurrencyService', () => {
  let service: CreateCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
