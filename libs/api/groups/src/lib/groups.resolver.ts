import { Group } from '@ispent/shared/data-access';
import { Query, Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver('Group')
export class GroupsResolver {
  constructor(private groupsService: GroupsService) {}

  @Query()
  async groups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }
}
