import { ApiDbModule } from '@ispent/api/db';
import { Module } from '@nestjs/common';
import { OperationsResolver } from './operations.resolver';
import { OperationsService } from './operations.service';

@Module({
  imports: [ApiDbModule],
  providers: [OperationsResolver, OperationsService],
})
export class OperationsModule {}
