import { TestBed } from '@angular/core/testing';
import {
  BudgetsGQL,
  BudgetsQuery,
  CurrenciesGroupsCategoriesGQL,
  CurrentMonthService,
} from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';
import { EditBudgetPageService } from './edit-budget-page.service';

describe('EditBudgetPageService', () => {
  let service: EditBudgetPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(CurrentMonthService),
        MockProvider(CurrenciesGroupsCategoriesGQL),
        MockProvider(BudgetsGQL),
      ],
    });
    service = TestBed.inject(EditBudgetPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parseServerData should return parsed data', () => {
    const serverData: BudgetsQuery = {
      budgets: [
        {
          amount: 12000,
          prevPlannedAmount: 0,
          prevSpentAmount: 0,
          currency: {
            id: 1,
            name: 'UAH',
          },
          category: {
            id: 1,
            name: 'Продукти',
          },
          group: {
            id: 1,
            name: 'Життя',
          },
          date: 'date',
        },
        {
          amount: 23000,
          prevPlannedAmount: 0,
          prevSpentAmount: 0,
          currency: {
            id: 1,
            name: 'UAH',
          },
          category: {
            id: 2,
            name: 'Комуналка',
          },
          group: {
            id: 1,
            name: 'Життя',
          },
          date: 'date',
        },
        {
          amount: 1800,
          prevPlannedAmount: 0,
          prevSpentAmount: 0,
          currency: {
            id: 1,
            name: 'UAH',
          },
          category: {
            id: 3,
            name: 'Математика',
          },
          group: {
            id: 2,
            name: 'Навчання',
          },
          date: 'date',
        },
      ],
    };

    const parsedData = {
      currencies: [
        {
          id: 1,
          groups: [
            {
              id: 1,
              categories: [
                { id: 1, amount: 12000, planned: 0, spent: 0 },
                { id: 2, amount: 23000, planned: 0, spent: 0 },
              ],
            },
            {
              id: 2,
              categories: [{ id: 3, amount: 1800, planned: 0, spent: 0 }],
            },
          ],
        },
      ],
    };

    expect(service.parseServerData(serverData)).toEqual(parsedData);
  });
});
