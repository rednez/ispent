import { CurrentUserId } from '@ispent/api/auth';
import {
  OperationCreateInput,
  OperationsParams,
  OperationUpdateInput,
} from '@ispent/api/data-access';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OperationsService } from './operations.service';

@Resolver('Operation')
export class OperationsResolver {
  constructor(private operationsService: OperationsService) {}

  @Query()
  async operations(
    @Args('params') params: OperationsParams,
    @CurrentUserId() uid
  ) {
    return this.operationsService.findAll(params, uid);
  }

  @Query()
  async operation(@Args('id') id: number) {
    return this.operationsService.findOne(id);
  }

  @Mutation()
  async createOperation(
    @Args('params') params: OperationCreateInput,
    @CurrentUserId() uid
  ) {
    return this.operationsService.create(params, uid);
  }

  @Mutation()
  async updateOperation(@Args('params') params: OperationUpdateInput) {
    return this.operationsService.update(params);
  }

  @Mutation()
  async deleteOperation(@Args('id') id: string) {
    return this.operationsService.deleteOperation(+id);
  }

  @ResolveField()
  async dateTime(@Parent() operation) {
    return new Date(operation.dateTime).toISOString();
  }
}
