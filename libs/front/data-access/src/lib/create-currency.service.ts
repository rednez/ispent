import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { CreateCurrencyGQL } from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CreateCurrencyService {
  constructor(private createCurrencyGQL: CreateCurrencyGQL) {}

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
}
