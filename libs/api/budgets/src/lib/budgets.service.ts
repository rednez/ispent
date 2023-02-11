import {
  BudgetsParams,
  CreateBudgetRecordInput,
  GenerateBudgetsRecordsInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Operation } from '@prisma/client';
import { isFirstDayOfMonth, isValid, parseISO, subMonths } from 'date-fns';
import { add, equals, pipe, prop, unionWith } from 'ramda';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: BudgetsParams, userId: string) {
    const {
      prevOperationsDateTimeStart,
      prevOperationsDateTimeEnd,
      currentOperationsDateTimeStart,
      currentOperationsDateTimeEnd,
      date,
    } = params;
    const currentMonth = parseISO(date);

    this.checkDate(currentMonth);

    const previousMonth = subMonths(currentMonth, 1);
    const budgets = await this.prisma.budgetRecord.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        dateTime: currentMonth,
        userId,
      },
    });

    const prevBudgets = await this.prisma.budgetRecord.findMany({
      where: {
        dateTime: previousMonth,
        userId,
      },
    });

    let operationsPrev: Operation[] = [];
    if (prevOperationsDateTimeStart && prevOperationsDateTimeEnd) {
      operationsPrev = await this.prisma.operation.findMany({
        where: {
          dateTime: {
            gte: new Date(prevOperationsDateTimeStart),
            lt: new Date(prevOperationsDateTimeEnd),
          },
          userId,
        },
      });
    }

    let operationsCurrent: Operation[] = [];
    if (currentOperationsDateTimeStart && currentOperationsDateTimeEnd) {
      operationsCurrent = await this.prisma.operation.findMany({
        where: {
          dateTime: {
            gte: new Date(currentOperationsDateTimeStart),
            lt: new Date(currentOperationsDateTimeEnd),
          },
          userId,
        },
      });
    }

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
    const date = parseISO(dateTime);
    this.checkDate(date);

    return this.prisma.budgetRecord.deleteMany({
      where: { dateTime: date, userId },
    });
  }

  async recreateMany(input: CreateBudgetRecordInput[], userId: string) {
    if (!input.length) {
      throw new BadRequestException('Inputs params are empty');
    }

    const date = parseISO(input[0].dateTime);
    this.checkDate(date);

    await this.deleteMany(date.toISOString(), userId);

    await this.prisma.budgetRecord.createMany({
      data: input.map((i: CreateBudgetRecordInput) => ({
        ...i,
        dateTime: date,
        userId,
      })),
    });

    return this.findAll({ date: date.toISOString() }, userId);
  }

  async generateMany(params: GenerateBudgetsRecordsInput, uid: string) {
    const { date, prevOperationsDateTimeStart, prevOperationsDateTimeEnd } =
      params;
    const targetDate = parseISO(date);
    this.checkDate(targetDate);

    const prevDate = subMonths(targetDate, 1);

    const prevOperations = await this.prisma.operation.groupBy({
      where: {
        userId: uid,
        dateTime: {
          gte: new Date(prevOperationsDateTimeStart),
          lt: new Date(prevOperationsDateTimeEnd),
        },
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

    const budgetsInputs: CreateBudgetRecordInput[] = this.unionByFirst(
      prevOperationsMapped,
      pevBudgetsMapped
    ).map((i) => ({ ...i, dateTime: date }));

    return this.recreateMany(budgetsInputs, uid);
  }

  private unionByFirst<
    T extends { currencyId: number; groupId: number; categoryId: number }
  >(first: T[], second: T[]): T[] {
    return unionWith(
      (a, b) =>
        a.currencyId === b.currencyId &&
        a.groupId === b.groupId &&
        a.categoryId === b.categoryId,
      first,
      second
    );
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
      .filter(pipe(prop('currencyId'), equals(budgetCurrencyId)))
      .filter(pipe(prop('categoryId'), equals(budgetCategoryId)))
      .map(prop('amount'))
      .reduce(add, 0);
  }

  private checkDate(date: Date) {
    if (!isValid(date)) {
      throw new BadRequestException('Invalid date format');
    }
    if (!isFirstDayOfMonth(date)) {
      throw new BadRequestException(
        'The date must be presented on the first day of the month'
      );
    }
  }
}
