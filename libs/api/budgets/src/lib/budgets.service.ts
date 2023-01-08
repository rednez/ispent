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

  async findAll(params: BudgetsParams, userId: string) {
    const { currentMonth, previousMonth } = getCurrentAndPreviousMonths(
      params.date
    );

    const budgets = await this.prisma.budgetRecord.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        dateTime: getMonthPeriod(currentMonth),
        userId,
      },
    });

    const prevBudgets = await this.prisma.budgetRecord.findMany({
      where: {
        dateTime: getMonthPeriod(previousMonth),
        userId,
      },
    });

    const operations = await this.prisma.operation.findMany({
      where: {
        dateTime: getMonthPeriod(previousMonth),
        userId,
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

  async recreateMany(inputs: CreateBudgetRecordInput[], userId: string) {
    const { currentMonth } = getCurrentAndPreviousMonths(inputs[0].dateTime);

    await this.prisma.budgetRecord.deleteMany({
      where: { dateTime: getMonthPeriod(currentMonth), userId },
    });

    await this.prisma.budgetRecord.createMany({
      data: inputs.map((i: CreateBudgetRecordInput) => ({
        ...i,
        dateTime: currentMonth,
        userId,
      })),
    });

    return this.findAll({ date: currentMonth.toISOString() }, userId);
  }

  private computeTotalAmount(
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
