import { BudgetsParams } from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { format, lastDayOfMonth, parseISO, subMonths } from 'date-fns';
import { add, get, isEqual, pipe } from 'lodash/fp';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: BudgetsParams) {
    const dateCurrent = parseISO(params.date);
    const datePrev = subMonths(dateCurrent, 1);

    const budgets = await this.prisma.budgetRecord.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        date: {
          lte: lastDayOfMonth(dateCurrent),
          gte: parseISO(format(dateCurrent, 'yyyy-MM-01')),
        },
      },
    });

    const prevBudgets = await this.prisma.budgetRecord.findMany({
      where: {
        date: {
          lte: lastDayOfMonth(datePrev),
          gte: parseISO(format(datePrev, 'yyyy-MM-01')),
        },
      },
    });

    const operations = await this.prisma.operation.findMany({
      where: {
        dateTime: {
          lte: lastDayOfMonth(datePrev),
          gte: parseISO(format(datePrev, 'yyyy-MM-01')),
        },
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
