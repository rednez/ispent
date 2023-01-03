import { TestBed } from '@angular/core/testing';
import { CreateCurrencyGQL } from './graphql/generated';
import { MockProvider } from 'ng-mocks';

import { CreateCurrencyService } from './create-currency.service';

describe('CreateCurrencyService', () => {
  let service: CreateCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(CreateCurrencyGQL)],
    });
    service = TestBed.inject(CreateCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
