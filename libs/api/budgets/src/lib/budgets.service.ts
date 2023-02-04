import {
  BudgetsParams,
  CreateBudgetRecordInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { add, get, isEqual, pipe } from 'lodash/fp';
import { unionWith } from 'lodash';
import { getCurrentAndPreviousMonths, getMonthPeriod } from '@ispent/api/util';
import { subMonths, parseISO, isValid } from 'date-fns';

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

    const operationsPrev = await this.prisma.operation.findMany({
      where: {
        dateTime: getMonthPeriod(previousMonth),
        userId,
      },
    });

    const operationsCurrent = await this.prisma.operation.findMany({
      where: {
        dateTime: getMonthPeriod(currentMonth),
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
        operationsPrev,
        budget.currencyId,
        budget.categoryId
      ),
      currentSpentAmount: this.computeTotalAmount(
        operationsCurrent,
        budget.currencyId,
        budget.categoryId
      ),
    }));
  }

  async deleteMany(dateTime: string, userId: string) {
    const { currentMonth } = getCurrentAndPreviousMonths(dateTime);

    return this.prisma.budgetRecord.deleteMany({
      where: { dateTime: getMonthPeriod(currentMonth), userId },
    });
  }

  async recreateMany(inputs: CreateBudgetRecordInput[], userId: string) {
    if (!inputs.length) {
      throw new BadRequestException('Inputs params are empty');
    }

    const dateTimeIso = inputs[0].dateTime;
    const { currentMonth } = getCurrentAndPreviousMonths(dateTimeIso);

    await this.deleteMany(dateTimeIso, userId);

    await this.prisma.budgetRecord.createMany({
      data: inputs.map((i: CreateBudgetRecordInput) => ({
        ...i,
        dateTime: currentMonth,
        userId,
      })),
    });

    return this.findAll({ date: currentMonth.toISOString() }, userId);
  }

  async generateMany(targetDateISO: string, uid: string) {
    const targetDate = parseISO(targetDateISO);
    if (!isValid(targetDate)) {
      throw new BadRequestException('Bad date format');
    }

    const prevDate = subMonths(targetDate, 1);

    const prevOperations = await this.prisma.operation.groupBy({
      where: {
        userId: uid,
        dateTime: getMonthPeriod(prevDate),
      },
      by: ['groupId', 'categoryId', 'currencyId'],
      _sum: { amount: true },
    });

    const prevBudgets = await this.findAll(
      {
        date: prevDate.toISOString(),
      },
      uid
    );

    const pevBudgetsMapped = prevBudgets.map(
      ({ amount, currencyId, categoryId, groupId }) => ({
        amount,
        currencyId,
        categoryId,
        groupId,
      })
    );

    const prevOperationsMapped = prevOperations.map(
      ({ _sum: { amount }, currencyId, groupId, categoryId }) => ({
        amount,
        currencyId,
        groupId,
        categoryId,
      })
    );

    const budgetsInputs: CreateBudgetRecordInput[] = unionWith(
      prevOperationsMapped,
      pevBudgetsMapped,
      (a, b) =>
        a.currencyId === b.currencyId &&
        a.groupId === b.groupId &&
        a.categoryId === b.categoryId
    ).map((i) => ({ ...i, dateTime: targetDateISO }));

    return this.recreateMany(budgetsInputs, uid);
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
