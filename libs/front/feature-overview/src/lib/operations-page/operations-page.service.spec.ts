import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RequestResultNotificationService } from '@ispent/front/core';
import {
  BudgetsSummariesGQL,
  CategoryService,
  CurrenciesGQL,
  CurrenciesGroupsCategoriesGQL,
  CurrencyService,
  CurrentMonthService,
  GroupService,
  GroupsGQL,
  OperationsGQL,
} from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { OperationsPageService } from './operations-page.service';

describe('OperationsPageService', () => {
  let service: OperationsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(CurrentMonthService, { dateShort: '10.2022' }),
        MockProvider(CurrenciesGroupsCategoriesGQL, {
          watch: () =>
            <any>{
              valueChanges: of({
                data: {
                  currencies: [
                    { id: 1, name: 'UAH' },
                    { id: 2, name: 'CZK' },
                  ],
                  groups: [
                    {
                      id: 1,
                      name: 'Life',
                    },
                    {
                      id: 2,
                      name: 'Sport',
                    },
                    {
                      id: 3,
                      name: 'Car',
                    },
                  ],
                  categories: [
                    {
                      id: 1,
                      name: 'Foods',
                    },
                    {
                      id: 2,
                      name: 'Benzin',
                    },
                    {
                      id: 3,
                      name: 'Beer',
                    },
                    {
                      id: 4,
                      name: 'Games',
                    },
                  ],
                },
              }),
            },
        }),
        MockProvider(BudgetsSummariesGQL),
        MockProvider(OperationsGQL),
        MockProvider(CurrenciesGQL),
        MockProvider(GroupsGQL),
        MockProvider(CurrencyService),
        MockProvider(GroupService),
        MockProvider(CategoryService),
        MockProvider(MatDialog),
        MockProvider(RequestResultNotificationService),
      ],
    });
    service = TestBed.inject(OperationsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreadcrumbs', () => {
    it('should return 1 item array', (done) => {
      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview for 10.2022', to: ['overview'] },
        ]);
        done();
      });
    });

    it('should return 2 items array', (done) => {
      (<any>service)._routeParams$ = of({ currency: '1' });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview for 10.2022', to: ['overview'] },
          { name: 'UAH', to: [] },
        ]);
        done();
      });
    });

    it('should return 3 items array', (done) => {
      (<any>service)._routeParams$ = of({ currency: '1', group: '2' });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview for 10.2022', to: ['overview'] },
          { name: 'UAH', to: ['overview', '1'] },
          { name: 'Sport', to: [] },
        ]);
        done();
      });
    });

    it('should return 4 items array', (done) => {
      (<any>service)._routeParams$ = of({
        currency: '1',
        group: '2',
        category: '3',
      });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview for 10.2022', to: ['overview'] },
          { name: 'UAH', to: ['overview', '1'] },
          { name: 'Sport', to: ['overview', '1', '2'] },
          { name: 'Beer', to: [] },
        ]);
        done();
      });
    });
  });
});
