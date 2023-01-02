import { GroupCreateInput, GroupUpdateInput } from '@ispent/api/data-access';
import { PrismaService } from '@ispent/api/db';
import { randomColorHex } from '@ispent/api/util';
import { Injectable } from '@nestjs/common';
import { Group as GroupModel } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GroupModel[]> {
    return this.prisma.group.findMany({ include: { Category: true } });
  }

  async findOne(id: number): Promise<GroupModel> {
    return this.prisma.group.findUnique({
      where: { id },
      include: { Category: true },
    });
  }

  create(params: GroupCreateInput) {
    const { color: inputColor, ...data } = params;
    const color = inputColor || randomColorHex();
    return this.prisma.group.create({
      data: { ...data, color },
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
