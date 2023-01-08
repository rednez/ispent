import {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { randomColorHex } from '@ispent/api/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string): Promise<CategoryModel[]> {
    return this.prisma.category.findMany({ where: { userId } });
  }

  async create(params: CategoryCreateInput, userId: string) {
    const { color: inputColor, ...data } = params;

    const existedCategory = await this.prisma.category.findFirst({
      where: {
        name: params.name,
        groupId: params.groupId,
        userId,
      },
    });

    if (existedCategory?.id) {
      throw new BadRequestException('The category already exists');
    }

    const color = inputColor || randomColorHex();
    return this.prisma.category.create({
      data: { ...data, color, userId },
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
