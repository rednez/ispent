import { ApiDbModule } from '@ispent/api/db';
import { Module } from '@nestjs/common';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

@Module({
  imports: [ApiDbModule],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class ApiGroupsModule {}
