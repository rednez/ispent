import {PrismaService} from '@ispent/api/db';
import {BadRequestException, Injectable} from '@nestjs/common';
import {Currency} from '@prisma/client';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {
  }

  async findAll(userId: string): Promise<Currency[]> {
    return this.prisma.currency.findMany({where: {userId}});
  }

  async create(name: string, userId: string) {
    const existedCurrency = await this.prisma.currency.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existedCurrency?.id) {
      throw new BadRequestException('The currency already exists  ');
    }

    return this.prisma.currency.create({data: {name, userId}});
  }

  update(id: number, name: string) {
    return this.prisma.currency.update({where: {id}, data: {name}});
  }

  deleteCurrency(id: number) {
    return this.prisma.currency.delete({where: {id}});
  }
}
