import {
  BudgetsParams,
  CreateBudgetRecordInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { add, get, isEqual, pipe } from 'lodash/fp';
import { getCurrentAndPreviousMonths, getMonthPeriod } from '@ispent/api/util';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: BudgetsParams) {
    const { currentMonth, previousMonth } = getCurrentAndPreviousMonths(
      params.date
    );

    const budgets = await this.prisma.budgetRecord.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        dateTime: getMonthPeriod(currentMonth),
      },
    });

    const prevBudgets = await this.prisma.budgetRecord.findMany({
      where: {
        dateTime: getMonthPeriod(previousMonth),
      },
    });

    const operations = await this.prisma.operation.findMany({
      where: {
        dateTime: getMonthPeriod(previousMonth),
      },
    });

    return budgets.map((budget) => ({
      ...budget,
      prevPlannedAmount: this.computeTotalAmount(
        prevBudgets,
        budget.currencyId,
        budget.categoryId
      ),
      prevSpentAmount: this.computeTotalAmount(
        operations,
        budget.currencyId,
        budget.categoryId
      ),
    }));
  }

  async recreateMany(inputs: CreateBudgetRecordInput[]) {
    const { currentMonth } = getCurrentAndPreviousMonths(inputs[0].dateTime);

    await this.prisma.budgetRecord.deleteMany({
      where: { dateTime: getMonthPeriod(currentMonth) },
    });

    await this.prisma.budgetRecord.createMany({
      data: inputs.map((i: CreateBudgetRecordInput) => ({
        ...i,
        dateTime: currentMonth,
      })),
    });

    return this.findAll({ date: currentMonth.toISOString() });
  }

  computeTotalAmount(
    operations: Array<{
      currencyId: number;
      categoryId: number;
      amount: number;
    }>,
    budgetCurrencyId: number,
    budgetCategoryId: number
  ): number {
    return operations
      .filter(pipe(get('currencyId'), isEqual(budgetCurrencyId)))
      .filter(pipe(get('categoryId'), isEqual(budgetCategoryId)))
      .map(get('amount'))
      .reduce(add, 0);
  }
}
