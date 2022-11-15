import { Currency } from '@ispent/api/data-access';
import { Resolver, Query } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';

@Resolver('Currency')
export class CurrenciesResolver {
  constructor(private currenciesService: CurrenciesService) {}

  @Query()
  async currencies(): Promise<Currency[]> {
    return this.currenciesService.findAll();
  }
}
