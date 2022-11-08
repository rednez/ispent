import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CategoryModel[]> {
    return this.prisma.category.findMany();
  }
}
