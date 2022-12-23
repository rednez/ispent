import {
  Group,
  GroupCreateInput,
  GroupUpdateInput,
} from '@ispent/api/data-access';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver('Group')
export class GroupsResolver {
  constructor(private groupsService: GroupsService) {}

  @Query()
  async groups() {
    return this.groupsService.findAll();
  }

  @Mutation()
  async createGroup(@Args('params') params: GroupCreateInput): Promise<Group> {
    return this.groupsService.create(params);
  }

  @Mutation()
  async updateGroup(@Args('params') params: GroupUpdateInput): Promise<Group> {
    return this.groupsService.update(params);
  }

  @Mutation()
  async deleteGroup(@Args('id') id: number): Promise<Group> {
    return this.groupsService.deleteGroup(id);
  }

  @ResolveField()
  async categories(@Parent() group) {
    return group.Category;
  }
}
