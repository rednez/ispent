import { TestBed } from '@angular/core/testing';
import { BudgetsSummariesGQL, OperationsGQL } from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { CurrentMonthService } from '../current-month.service';

import { OverviewPageService } from './overview-page.service';

describe('OverviewPageService', () => {
  let service: OverviewPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(BudgetsSummariesGQL),
        MockProvider(OperationsGQL),
        MockProvider(CurrentMonthService, {
          date$: EMPTY,
        }),
      ],
    });
    service = TestBed.inject(OverviewPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
