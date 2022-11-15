import { PrismaService } from '@ispent/api/db';
import { OperationsParams } from '@ispent/api/data-access';
import { Injectable } from '@nestjs/common';
import { format, lastDayOfMonth, parseISO } from 'date-fns';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: OperationsParams) {
    const { currencyId, groupId, categoryId, month } = params || {};

    return this.prisma.operation.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        AND: {
          currencyId,
          groupId,
          categoryId,
          dateTime: {
            lte: month ? lastDayOfMonth(parseISO(month)) : undefined,
            gte: month
              ? parseISO(format(parseISO(month), 'yyyy-MM-01'))
              : undefined,
          },
        },
      },
    });
  }
}
