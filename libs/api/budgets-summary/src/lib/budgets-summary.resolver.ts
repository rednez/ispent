import { CurrentUserId } from '@ispent/api/auth';
import { BudgetSummary, BudgetSummaryParams } from '@ispent/api/data-access';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { BudgetsSummaryService } from './budgets-summary.service';
import { Observable } from 'rxjs';

@Resolver('BudgetSummary')
export class BudgetsSummaryResolver {
  constructor(private budgetsSummaryService: BudgetsSummaryService) {}

  @Query()
  budgetsSummary(
    @Args('params') query: BudgetSummaryParams,
    @CurrentUserId() uid
  ): Observable<BudgetSummary[]> {
    return this.budgetsSummaryService.findMany(query, uid);
  }
}
