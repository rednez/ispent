import {
  BudgetSummary,
  BudgetSummaryParams,
  BudgetSummaryType,
  Category,
  Currency,
  Group,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { getMonthPeriod } from '@ispent/api/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { forkJoin, from, iif, map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class BudgetsSummaryService {
  constructor(private prisma: PrismaService) {}

  findMany(
    query: BudgetSummaryParams,
    userId: string
  ): Observable<BudgetSummary[]> {
    const { type, currencyId, groupId, categoryId, month } = query;

    const where = {
      dateTime: getMonthPeriod(month ? new Date(month) : undefined),
      userId,
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

  private getBudgetsSummaries(
    type: BudgetSummaryType,
    params: {
      by:
        | ['currencyId']
        | ['currencyId', 'groupId']
        | ['currencyId', 'groupId', 'categoryId'];
      _sum: { amount: true };
      where: { dateTime?: { lte?: Date; gte?: Date }; userId: string };
      having?: {
        currencyId?: { equals: number };
        groupId?: { equals: number };
        categoryId?: { equals: number };
      };
    }
  ): Observable<BudgetSummary[]> {
    const key =
      type === BudgetSummaryType.CURRENCY
        ? 'currencyId'
        : type === BudgetSummaryType.GROUP
        ? 'groupId'
        : 'categoryId';

    const baseQueryWhere =
      params?.having && params.having[key]
        ? { id: params.having[key].equals, userId: params.where.userId }
        : { userId: params.where.userId };

    const baseQuery: Promise<Array<Currency | Group | Category>> =
      type === BudgetSummaryType.CURRENCY
        ? this.prisma.currency.findMany({ where: baseQueryWhere })
        : type === BudgetSummaryType.GROUP
        ? this.prisma.group.findMany({ where: baseQueryWhere })
        : this.prisma.category.findMany({ where: baseQueryWhere });

    return from(baseQuery).pipe(
      switchMap((baseList) =>
        iif(
          () => !baseList.length,
          of([]),
          forkJoin([
            from(this.prisma.operation.groupBy(params)),
            from(this.prisma.budgetRecord.groupBy(params)),
          ]).pipe(
            map(([groupedOperations, groupedBudgetsRecords]) =>
              baseList
                .map(
                  this.mapAggregatesToSummary({
                    key,
                    type,
                    groupedOperations,
                    groupedBudgetsRecords,
                  })
                )
                .filter(this.noneZeroAmounts)
            )
          )
        )
      )
    );
  }

  private mapAggregatesToSummary =
    (params: {
      key: 'currencyId' | 'groupId' | 'categoryId';
      type: BudgetSummaryType;
      groupedOperations: Array<{
        currencyId: number;
        groupId?: number;
        categoryId?: number;
        _sum: { amount: number };
      }>;
      groupedBudgetsRecords: Array<{
        currencyId?: number;
        groupId?: number;
        categoryId?: number;
        _sum: { amount: number };
      }>;
    }) =>
    (mainQueryItem: { id: number; name: string; color?: string }) => {
      const { key, type, groupedOperations, groupedBudgetsRecords } = params;

      const groupedBudgetRecord = groupedBudgetsRecords.find(
        (i) => i[key] === mainQueryItem.id
      );

      const groupedOperation = groupedOperations.find(
        (i) => i[key] === mainQueryItem.id
      );

      return {
        parentId: mainQueryItem.id,
        type,
        title: mainQueryItem.name,
        planned: get(groupedBudgetRecord, '_sum.amount', 0),
        spent: get(groupedOperation, '_sum.amount', 0),
        color: mainQueryItem.color || null,
      };
    };

  private noneZeroAmounts = (obj: { planned: number; spent: number }) =>
    !!obj.planned || obj.spent;
}
