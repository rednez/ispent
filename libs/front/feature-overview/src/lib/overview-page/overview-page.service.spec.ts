import { TestBed } from '@angular/core/testing';
import {
  BudgetsSummariesGQL,
  CurrentMonthService,
  OperationsGQL,
} from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';

import { OverviewPageService } from './overview-page.service';
import { EMPTY } from 'rxjs';

describe('OverviewPageService', () => {
  let service: OverviewPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(BudgetsSummariesGQL),
        MockProvider(OperationsGQL),
        MockProvider(CurrentMonthService, { dateISO$: EMPTY }),
      ],
    });
    service = TestBed.inject(OverviewPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
