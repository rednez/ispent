import { OperationsParams } from '@ispent/api/data-access';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OperationsService } from './operations.service';

@Resolver('Operation')
export class OperationsResolver {
  constructor(private operationsService: OperationsService) {}

  @Query()
  async operations(@Args('params') params: OperationsParams) {
    return this.operationsService.findAll(params);
  }

  @ResolveField()
  async dateTime(@Parent() operation) {
    return new Date(operation.dateTime).toISOString();
  }

  @ResolveField()
  async currency(@Parent() operation) {
    return operation.currency.name;
  }
}
