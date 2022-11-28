import { ApiDbModule } from '@ispent/api/db';
import { Module } from '@nestjs/common';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';

@Module({
  imports: [ApiDbModule],
  providers: [BudgetsResolver, BudgetsService],
})
export class BudgetsModule {}
