import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsService } from './budgets.service';
import { PrismaService } from '@ispent/api/db';

describe('BudgetsService', () => {
  let service: BudgetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<BudgetsService>(BudgetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('unionByFirst should return union array by first array', () => {
    const first = [
      { amount: 1, currencyId: 1, groupId: 3, categoryId: 2 },
      { amount: 2, currencyId: 1, groupId: 3, categoryId: 2 },
      { amount: 3, currencyId: 1, groupId: 1, categoryId: 2 },
      { amount: 4, currencyId: 1, groupId: 1, categoryId: 1 },
    ];

    const second = [
      { amount: 5, currencyId: 2, groupId: 1, categoryId: 1 },
      { amount: 8, currencyId: 1, groupId: 1, categoryId: 1 },
    ];

    const result = [
      { amount: 1, currencyId: 1, groupId: 3, categoryId: 2 },
      { amount: 3, currencyId: 1, groupId: 1, categoryId: 2 },
      { amount: 4, currencyId: 1, groupId: 1, categoryId: 1 },
      { amount: 5, currencyId: 2, groupId: 1, categoryId: 1 },
    ];

    expect((<any>service).unionByFirst(first, second)).toEqual(result);
  });
});
