import { Test, TestingModule } from '@nestjs/testing';
import { BudgetsSummaryService } from './budgets-summary.service';

describe('BudgetsSummaryService', () => {
  let service: BudgetsSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetsSummaryService],
    }).compile();

    service = module.get<BudgetsSummaryService>(BudgetsSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
