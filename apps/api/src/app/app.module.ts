import { ApiAuthModule } from '@ispent/api/auth';
import { BudgetsModule } from '@ispent/api/budgets';
import { BudgetsSummaryModule } from '@ispent/api/budgets-summary';
import { CategoriesModule } from '@ispent/api/categories';
import { CurrenciesModule } from '@ispent/api/currencies';
import { GroupsModule } from '@ispent/api/groups';
import { OperationsModule } from '@ispent/api/operations';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiAuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['libs/shared/data-access/src/lib/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'libs/api/data-access/src/lib/data.ts'),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    CurrenciesModule,
    GroupsModule,
    CategoriesModule,
    OperationsModule,
    BudgetsSummaryModule,
    BudgetsModule,
  ],
})
export class AppModule {}
