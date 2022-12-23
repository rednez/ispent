import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { Currency } from '@prisma/client';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany();
  }

  create(name: string) {
    return this.prisma.currency.create({ data: { name } });
  }

  update(id: number, name: string) {
    return this.prisma.currency.update({ where: { id }, data: { name } });
  }

  deleteCurrency(id: number) {
    return this.prisma.currency.delete({ where: { id } });
  }
}
