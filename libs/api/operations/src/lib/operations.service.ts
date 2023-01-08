import {
  OperationCreateInput,
  OperationsParams,
  OperationUpdateInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { getMonthPeriod } from '@ispent/api/util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: OperationsParams, userId: string) {
    const { currencyId, groupId, categoryId, month, limit } = params || {};

    return this.prisma.operation.findMany({
      include: { currency: true, category: true, group: true },
      where: {
        AND: {
          userId,
          currencyId,
          groupId,
          categoryId,
          dateTime: getMonthPeriod(month ? new Date(month) : undefined),
        },
      },
      take: limit,
      orderBy: { dateTime: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.operation.findUnique({
      where: { id },
      include: { currency: true, group: true, category: true },
    });
  }

  create(params: OperationCreateInput, userId: string) {
    return this.prisma.operation.create({
      data: {
        ...params,
        dateTime: params.dateTime ? new Date(params.dateTime) : new Date(),
        userId,
      },
      include: { currency: true, group: true, category: true },
    });
  }

  update(params: OperationUpdateInput) {
    const { id, ...data } = params;
    return this.prisma.operation.update({
      where: { id },
      include: { currency: true, group: true, category: true },
      data: {
        ...data,
        dateTime: params.dateTime ? new Date(params.dateTime) : new Date(),
      },
    });
  }

  deleteOperation(id: number) {
    return this.prisma.operation.delete({ where: { id } });
  }
}
