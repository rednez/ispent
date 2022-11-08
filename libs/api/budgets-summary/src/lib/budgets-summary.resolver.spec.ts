import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsSummaryResolver } from './budgets-summary.resolver';

describe('BudgetsSummaryResolver', () => {
  let resolver: BudgetsSummaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsSummaryResolver],
    }).compile();

    resolver = module.get<BudgetsSummaryResolver>(BudgetsSummaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
