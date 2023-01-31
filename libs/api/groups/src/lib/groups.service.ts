import { GroupCreateInput, GroupUpdateInput } from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { randomColorHex } from '@ispent/shared/utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Group as GroupModel } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string): Promise<GroupModel[]> {
    return this.prisma.group.findMany({
      where: { userId },
      include: { Category: true },
    });
  }

  async findOne(id: number): Promise<GroupModel> {
    return this.prisma.group.findUnique({
      where: { id },
      include: { Category: true },
    });
  }

  async create(params: GroupCreateInput, userId: string) {
    const { color: inputColor, ...data } = params;

    const existedGroup = await this.prisma.group.findFirst({
      where: {
        name: params.name,
        userId,
      },
    });

    if (existedGroup?.id) {
      throw new BadRequestException('The group already existed');
    }

    const color = inputColor || randomColorHex();
    return this.prisma.group.create({
      data: { ...data, color, userId },
    });
  }

  update(params: GroupUpdateInput) {
    const { id, ...data } = params;
    return this.prisma.group.update({
      where: { id },
      data,
      include: { Category: true },
    });
  }

  deleteGroup(id: number) {
    return this.prisma.group.delete({ where: { id } });
  }
}
