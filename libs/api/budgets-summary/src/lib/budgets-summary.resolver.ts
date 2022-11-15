import { BudgetSummary, BudgetSummaryParams } from '@ispent/api/data-access';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { BudgetsSummaryService } from './budgets-summary.service';

@Resolver('BudgetSummary')
export class BudgetsSummaryResolver {
  constructor(private budgetsSummaryService: BudgetsSummaryService) {}

  @Query()
  async budgetsSummary(
    @Args('params') query: BudgetSummaryParams
  ): Promise<BudgetSummary[]> {
    return this.budgetsSummaryService.findMany(query);
  }
}
