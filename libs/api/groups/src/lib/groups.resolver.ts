import { CurrentUserId } from '@ispent/api/auth';
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
  async groups(@CurrentUserId() uid) {
    return this.groupsService.findAll(uid);
  }

  @Query()
  async group(@Args('id') id: number) {
    return this.groupsService.findOne(id);
  }

  @Mutation()
  async createGroup(
    @Args('params') params: GroupCreateInput,
    @CurrentUserId() uid
  ): Promise<Group> {
    return this.groupsService.create(params, uid);
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
