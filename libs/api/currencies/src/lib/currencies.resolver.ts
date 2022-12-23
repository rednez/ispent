import {Currency} from '@ispent/api/data-access';
import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {CurrenciesService} from './currencies.service';

@Resolver('Currency')
export class CurrenciesResolver {
  constructor(private currenciesService: CurrenciesService) {
  }

  @Query()
  async currencies(): Promise<Currency[]> {
    return this.currenciesService.findAll();
  }

  @Mutation()
  async createCurrency(@Args('name') name: string): Promise<Currency> {
    return this.currenciesService.create(name);
  }

  @Mutation()
  async updateCurrency(@Args('id') id: number, @Args('name') name: string): Promise<Currency> {
    return this.currenciesService.update(id, name);
  }

  @Mutation()
  async deleteCurrency(@Args('id') id: number): Promise<Currency> {
    return this.currenciesService.deleteCurrency(id);
  }

}
