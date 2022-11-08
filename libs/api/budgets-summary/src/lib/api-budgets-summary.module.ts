import { ApiDbModule } from '@ispent/api/db';
import { Module } from '@nestjs/common';
import { BudgetsSummaryResolver } from './budgets-summary.resolver';
import { BudgetsSummaryService } from './budgets-summary.service';

@Module({
  imports: [ApiDbModule],
  providers: [BudgetsSummaryService, BudgetsSummaryResolver],
})
export class ApiBudgetsSummaryModule {}
