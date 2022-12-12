import { TestBed } from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  BudgetsGQL,
  BudgetsQuery,
  CreateBudgetRecordInput,
  CurrenciesGroupsWithCategoriesGQL,
  CurrentMonthService,
  RecreateBudgetsRecordsGQL,
} from '@ispent/front/data-access';
import { MockProvider } from 'ng-mocks';
import { EditBudgetPageService } from './edit-budget-page.service';

const formData = {
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

describe('EditBudgetPageService', () => {
  let service: EditBudgetPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(CurrentMonthService),
        MockProvider(CurrenciesGroupsWithCategoriesGQL),
        MockProvider(BudgetsGQL),
        MockProvider(RecreateBudgetsRecordsGQL),
        MockProvider(MatSnackBar)
      ],
    });
    service = TestBed.inject(EditBudgetPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deserializeServerData should return FormData', () => {
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

    expect((service as any).deserializeServerData(serverData)).toEqual(
      formData
    );
  });

  it('serializeServerData should return CreateBudgetRecordInput[]', () => {
    const budgetRecordsInputs: CreateBudgetRecordInput[] = [
      {
        amount: 12000,
        currencyId: 1,
        groupId: 1,
        categoryId: 1,
        dateTime: '2022-12-01',
      },
      {
        amount: 23000,
        currencyId: 1,
        groupId: 1,
        categoryId: 2,
        dateTime: '2022-12-01',
      },
      {
        amount: 1800,
        currencyId: 1,
        groupId: 2,
        categoryId: 3,
        dateTime: '2022-12-01',
      },
    ];

    expect(
      (service as any).serializeServerData(formData, '2022-12-01')
    ).toEqual(budgetRecordsInputs);
  });
});
