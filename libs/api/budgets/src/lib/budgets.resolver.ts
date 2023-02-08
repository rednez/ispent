import { CurrentUserId } from '@ispent/api/auth';
import {
  BudgetsParams,
  CreateBudgetRecordInput,
  GenerateBudgetsRecordsInput,
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
  async budgets(@Args('params') params: BudgetsParams, @CurrentUserId() uid) {
    return this.budgetsService.findAll(params, uid);
  }

  @ResolveField()
  async date(@Parent() budget) {
    return new Date(budget.dateTime).toISOString();
  }

  @Mutation()
  async recreateManyBudgetsRecords(
    @Args('input') input: CreateBudgetRecordInput[],
    @CurrentUserId() uid
  ) {
    return this.budgetsService.recreateMany(input, uid);
  }

  @Mutation()
  async generateManyBudgetsRecords(
    @Args('input') input: GenerateBudgetsRecordsInput,
    @CurrentUserId() uid
  ) {
    return this.budgetsService.generateMany(input, uid);
  }

  @Mutation()
  async deleteManyBudgetsRecords(
    @Args('date') date: string,
    @CurrentUserId() uid
  ) {
    return this.budgetsService.deleteMany(date, uid);
  }
}
