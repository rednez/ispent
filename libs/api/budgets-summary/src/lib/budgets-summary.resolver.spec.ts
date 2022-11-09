import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsSummaryResolver } from './budgets-summary.resolver';
import { BudgetsSummaryService } from './budgets-summary.service';

describe('BudgetsSummaryResolver', () => {
  let resolver: BudgetsSummaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetsSummaryResolver,
        {
          provide: BudgetsSummaryService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<BudgetsSummaryResolver>(BudgetsSummaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
