import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver('Group')
export class GroupsResolver {
  constructor(private groupsService: GroupsService) {}

  @Query()
  async groups() {
    return this.groupsService.findAll();
  }

  @ResolveField()
  async categories(@Parent() group) {
    return group.Category;
  }
}
