import {
  BudgetsParams,
  CreateBudgetRecordInput,
} from '@ispent/api/data-access';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
    return new Date(budget.dateTime).toISOString();
  }

  @Mutation()
  async recreateManyBudgetsRecords(
    @Args('inputs') inputs: CreateBudgetRecordInput[]
  ) {
    return this.budgetsService.recreateMany(inputs);
  }
}
