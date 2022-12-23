import {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { randomColorHex } from '@ispent/api/util';
import { Injectable } from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CategoryModel[]> {
    return this.prisma.category.findMany();
  }

  create(params: CategoryCreateInput) {
    const { color: inputColor, ...data } = params;
    const color = inputColor || randomColorHex();
    return this.prisma.category.create({
      data: { ...data, color },
    });
  }

  update(params: CategoryUpdateInput) {
    const { id, ...data } = params;
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
