import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import {
  BudgetSummary,
  CreateCurrencyGQL,
  UpdateCurrencyGQL,
} from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private createCurrencyGQL: CreateCurrencyGQL,
    private updateCurrencyGQL: UpdateCurrencyGQL
  ) {}

  create$(name: string) {
    return this.createCurrencyGQL.mutate(
      { name },
      {
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              currencies(existingCurrenciesRef = []) {
                const newCurrencyRef = cache.writeFragment({
                  data: data?.createCurrency,
                  fragment: gql`
                    fragment NewCurrency on Currency {
                      id
                    }
                  `,
                });
                return [...existingCurrenciesRef, newCurrencyRef];
              },
            },
          });
        },
      }
    );
  }

  update$(params: { id: number; name: string }) {
    const { id, name } = params;

    return this.updateCurrencyGQL.mutate(
      {
        updateCurrencyId: id,
        name: name,
      },
      {
        update: (cache, result) => {
          cache.modify({
            fields: {
              budgetsSummary(existingBudgetsSummaryRefs = []) {
                const item = existingBudgetsSummaryRefs.find(
                  (i: BudgetSummary) =>
                    i.parentId === id && i.type === 'CURRENCY'
                );
                return item
                  ? [
                      {
                        ...item,
                        title: result.data?.updateCurrency.name,
                      },
                    ]
                  : existingBudgetsSummaryRefs;
              },
            },
          });
        },
      }
    );
  }
}
