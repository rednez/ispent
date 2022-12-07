import { PrismaService } from '@ispent/api/db';
import { OperationsParams } from '@ispent/api/data-access';
import { Injectable } from '@nestjs/common';
import { getMonthPeriod } from '@ispent/api/util';

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
          dateTime: getMonthPeriod(month ? new Date(month) : undefined),
        },
      },
    });
  }
}
