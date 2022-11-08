import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { Currency } from '@prisma/client';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany();
  }
}
