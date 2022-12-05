import { PrismaService } from '@ispent/api/db';
import { Injectable } from '@nestjs/common';
import { Group as GroupModel } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GroupModel[]> {
    return this.prisma.group.findMany({ include: { Category: true } });
  }
}
