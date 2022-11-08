import { ApiBudgetsSummaryModule } from '@ispent/api/budgets-summary';
import { ApiCategoriesModule } from '@ispent/api/categories';
import { ApiCurrenciesModule } from '@ispent/api/currencies';
import { ApiGroupsModule } from '@ispent/api/groups';
import { ApiOperationsModule } from '@ispent/api/operations';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['libs/api/**/*.graphql'],
      definitions: {
        path: join(
          process.cwd(),
          'libs/shared/data-access/src/lib/data/graphql.ts'
        ),
        outputAs: 'class',
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ApiCurrenciesModule,
    ApiGroupsModule,
    ApiCategoriesModule,
    ApiOperationsModule,
    ApiBudgetsSummaryModule,
  ],
})
export class AppModule {}
