import { PrismaService } from '@ispent/api/db';
import {
  BudgetSummary,
  BudgetSummaryParams,
  BudgetSummaryType,
} from '@ispent/api/data-access';
import { BadRequestException, Injectable } from '@nestjs/common';
import { format, lastDayOfMonth, parseISO } from 'date-fns';
import { forkJoin, from, iif, map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class BudgetsSummaryService {
  constructor(private prisma: PrismaService) {}

  findMany(query: BudgetSummaryParams): Observable<BudgetSummary[]> {
    const { type, currencyId, groupId, categoryId, month } = query;

    const where = {
      dateTime: {
        lte: month ? lastDayOfMonth(parseISO(month)) : undefined,
        gte: month
          ? parseISO(format(parseISO(month), 'yyyy-MM-01'))
          : undefined,
      },
    };

    if (currencyId) {
      if (type === BudgetSummaryType.CURRENCY && !groupId && !categoryId) {
        const params = {
          by: ['currencyId'] as ['currencyId'],
          _sum: { amount: true } as { amount: true },
          where,
          having: {
            currencyId: { equals: currencyId },
          },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.CURRENCY, params);
      } else if (type === BudgetSummaryType.GROUP && !groupId) {
        const params = {
          by: ['currencyId', 'groupId'] as ['currencyId', 'groupId'],
          _sum: { amount: true } as { amount: true },
          where,
          having: {
            currencyId: { equals: currencyId },
          },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.GROUP, params);
      } else if (type === BudgetSummaryType.GROUP && groupId) {
        const params = {
          by: ['currencyId', 'groupId'] as ['currencyId', 'groupId'],
          _sum: { amount: true } as { amount: true },
          where,
          having: {
            currencyId: { equals: currencyId },
            groupId: { equals: groupId },
          },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.GROUP, params);
      } else if (
        type === BudgetSummaryType.CATEGORY &&
        groupId &&
        !categoryId
      ) {
        const params = {
          by: ['currencyId', 'groupId', 'categoryId'] as [
            'currencyId',
            'groupId',
            'categoryId'
          ],
          _sum: { amount: true } as { amount: true },
          where,
          having: {
            currencyId: { equals: currencyId },
            groupId: { equals: groupId },
          },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.CATEGORY, params);
      } else if (type === BudgetSummaryType.CATEGORY && groupId && categoryId) {
        const params = {
          by: ['currencyId', 'groupId', 'categoryId'] as [
            'currencyId',
            'groupId',
            'categoryId'
          ],
          _sum: { amount: true } as { amount: true },
          where,
          having: {
            currencyId: { equals: currencyId },
            groupId: { equals: groupId },
            categoryId: { equals: categoryId },
          },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.CATEGORY, params);
      } else {
        throw new BadRequestException('Invalid params combinations');
      }
    } else {
      if (type === BudgetSummaryType.CURRENCY) {
        const params = {
          by: ['currencyId'] as ['currencyId'],
          where,
          _sum: { amount: true } as { amount: true },
        };

        return this.getBudgetsSummaries(BudgetSummaryType.CURRENCY, params);
      } else {
        throw new BadRequestException('Invalid params combinations');
      }
    }
  }

  private mapAggregatesToSummary =
    (params: {
      key: 'currencyId' | 'groupId' | 'categoryId';
      type: BudgetSummaryType;
      auxiliaryList: Array<{ id: number; name: string; color?: string }>;
      plannedAmountsList: Array<{
        currencyId: number;
        groupId?: number;
        categoryId?: number;
        _sum: { amount: number };
      }>;
    }) =>
    (input: {
      currencyId?: number;
      groupId?: number;
      categoryId?: number;
      _sum: { amount: number };
    }) => {
      const { key, type, auxiliaryList, plannedAmountsList } = params;

      const planned =
        plannedAmountsList.find((i) => i[key] === input[key])?._sum.amount | 0;

      return {
        parentId: input[key],
        type,
        title: auxiliaryList.find(({ id }) => id === input[key]).name,
        planned,
        spent: input._sum.amount,
        color:
          key !== 'currencyId'
            ? auxiliaryList.find(({ id }) => id === input[key]).color
            : null,
      };
    };

  private getBudgetsSummaries(
    type: BudgetSummaryType,
    params: {
      by:
        | ['currencyId']
        | ['currencyId', 'groupId']
        | ['currencyId', 'groupId', 'categoryId'];
      _sum: { amount: true };
      where: unknown;
      having?: unknown;
    }
  ): Observable<BudgetSummary[]> {
    const auxiliaryListQuery =
      type === BudgetSummaryType.CURRENCY
        ? this.prisma.currency.findMany()
        : type === BudgetSummaryType.GROUP
        ? this.prisma.group.findMany()
        : this.prisma.category.findMany();

    const key = BudgetSummaryType.CURRENCY
      ? 'currencyId'
      : type === BudgetSummaryType.GROUP
      ? 'groupId'
      : 'categoryId';

    return from(this.prisma.operation.groupBy(params)).pipe(
      switchMap((groupByList) =>
        iif(
          () => !groupByList.length,
          of([]),
          forkJoin([
            from(auxiliaryListQuery),
            from(this.prisma.budgetRecord.groupBy(params)),
          ]).pipe(
            map(([auxiliaryList, plannedAmountsList]) =>
              groupByList.map(
                this.mapAggregatesToSummary({
                  key,
                  type,
                  auxiliaryList,
                  plannedAmountsList,
                })
              )
            )
          )
        )
      )
    );
  }
}
