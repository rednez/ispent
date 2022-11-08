import { PrismaService } from '@ispent/api/db';
import {
  BudgetSummary,
  BudgetSummaryParams,
  BudgetSummaryType,
} from '@ispent/shared/data-access';
import { BadRequestException, Injectable } from '@nestjs/common';
import { format, lastDayOfMonth, parseISO } from 'date-fns';

@Injectable()
export class BudgetsSummaryService {
  constructor(private prisma: PrismaService) {}

  async findMany(query: BudgetSummaryParams): Promise<BudgetSummary[]> {
    const { type, currencyId, groupId, categoryId, month } = query;

    const currencies = await this.prisma.currency.findMany();
    const groups = await this.prisma.group.findMany();
    const categories = await this.prisma.category.findMany();

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
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId'],
            _sum: { amount: true },
            where,
            having: {
              currencyId: { equals: currencyId },
            },
          })
          .then((list) =>
            list.map(
              this.mapAggregatesToSummary('currencyId', type, currencies)
            )
          );
      } else if (type === BudgetSummaryType.GROUP && !groupId) {
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId', 'groupId'],
            _sum: { amount: true },
            where,
            having: {
              currencyId: { equals: currencyId },
            },
          })
          .then((list) =>
            list.map(this.mapAggregatesToSummary('groupId', type, groups))
          );
      } else if (type === BudgetSummaryType.GROUP && groupId) {
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId', 'groupId'],
            _sum: { amount: true },
            where,
            having: {
              currencyId: { equals: currencyId },
              groupId: { equals: groupId },
            },
          })
          .then((list) =>
            list.map(this.mapAggregatesToSummary('groupId', type, groups))
          );
      } else if (
        type === BudgetSummaryType.CATEGORY &&
        groupId &&
        !categoryId
      ) {
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId', 'groupId', 'categoryId'],
            _sum: { amount: true },
            where,
            having: {
              currencyId: { equals: currencyId },
              groupId: { equals: groupId },
            },
          })
          .then((list) =>
            list.map(
              this.mapAggregatesToSummary('categoryId', type, categories)
            )
          );
      } else if (type === BudgetSummaryType.CATEGORY && groupId && categoryId) {
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId', 'groupId', 'categoryId'],
            _sum: { amount: true },
            where,
            having: {
              currencyId: { equals: currencyId },
              groupId: { equals: groupId },
              categoryId: { equals: categoryId },
            },
          })
          .then((list) =>
            list.map(
              this.mapAggregatesToSummary('categoryId', type, categories)
            )
          );
      } else {
        throw new BadRequestException('Invalid params combinations');
      }
    } else {
      if (type === BudgetSummaryType.CURRENCY) {
        return await this.prisma.operation
          .groupBy({
            by: ['currencyId'],
            where,
            _sum: { amount: true },
          })
          .then((list) =>
            list.map(
              this.mapAggregatesToSummary('currencyId', type, currencies)
            )
          );
      } else {
        throw new BadRequestException('Invalid params combinations');
      }
    }
  }

  private mapAggregatesToSummary =
    (
      key: 'currencyId' | 'groupId' | 'categoryId',
      type: BudgetSummaryType,
      predictList: Array<{ id: number; name: string; color?: string }>
    ) =>
    (input: {
      currencyId?: number;
      groupId?: number;
      categoryId?: number;
      _sum: { amount: number };
    }) => {
      const predictId =
        type === BudgetSummaryType.CURRENCY
          ? input.currencyId
          : type === BudgetSummaryType.GROUP
          ? input.groupId
          : input.categoryId;

      return {
        parentId: input[key],
        type,
        title: predictList.find(({ id }) => id === predictId).name,
        planned: 0, // TODO: implement
        spent: input._sum.amount,
        color:
          key !== 'currencyId'
            ? predictList.find(({ id }) => id === predictId).color
            : null,
      };
    };
}
