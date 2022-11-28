import { BudgetsParams } from '@ispent/api/data-access';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BudgetsService } from './budgets.service';

@Resolver('BudgetRecord')
export class BudgetsResolver {
  constructor(private budgetsService: BudgetsService) {}

  @Query()
  async budgets(@Args('params') params: BudgetsParams) {
    return this.budgetsService.findAll(params);
  }

  @ResolveField()
  async date(@Parent() budget) {
    return new Date(budget.date).toISOString();
  }
}
