import { CurrentUserId } from '@ispent/api/auth';
import { Currency } from '@ispent/api/data-access';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';

@Resolver('Currency')
export class CurrenciesResolver {
  constructor(private currenciesService: CurrenciesService) {}

  @Query()
  async currencies(@CurrentUserId() uid): Promise<Currency[]> {
    return this.currenciesService.findAll(uid);
  }

  @Mutation()
  async createCurrency(
    @Args('name') name: string,
    @CurrentUserId() uid
  ): Promise<Currency> {
    return this.currenciesService.create(name, uid);
  }

  @Mutation()
  async updateCurrency(
    @Args('id') id: number,
    @Args('name') name: string
  ): Promise<Currency> {
    return this.currenciesService.update(id, name);
  }

  @Mutation()
  async deleteCurrency(@Args('id') id: number): Promise<Currency> {
    return this.currenciesService.deleteCurrency(id);
  }
}
