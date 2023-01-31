import { TestBed } from '@angular/core/testing';
import { CreateCurrencyGQL, UpdateCurrencyGQL } from './graphql/generated';
import { MockProvider } from 'ng-mocks';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(CreateCurrencyGQL),
        MockProvider(UpdateCurrencyGQL),
      ],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
