import { ApiDbModule } from '@ispent/api/db';
import { Module } from '@nestjs/common';
import { CurrenciesResolver } from './currencies.resolver';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [ApiDbModule],
  providers: [CurrenciesResolver, CurrenciesService],
  exports: [CurrenciesService],
})
export class ApiCurrenciesModule {}
