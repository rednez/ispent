import { Injectable } from '@angular/core';
import {
  CreateOperationGQL,
  CurrenciesGroupsWithCategoriesGQL,
  DeleteOperationGQL,
  Operation,
  OperationGQL,
  UpdateOperationGQL,
} from '@ispent/front/data-access';
import { gql, MutationResult } from 'apollo-angular';
import { omit } from 'lodash';
import { map, Observable } from 'rxjs';
import { SubmitEventData } from '../editor-form/editor-form.component';

@Injectable({
  providedIn: 'root',
})
export class EditorPageService {
  constructor(
    private currenciesGroupsWithCategoriesGQL: CurrenciesGroupsWithCategoriesGQL,
    private operationGQL: OperationGQL,
    private deleteOperationGQL: DeleteOperationGQL,
    private updateOperationGQL: UpdateOperationGQL,
    private createOperationGQL: CreateOperationGQL
  ) {}

  fetchCurrenciesGroupsWithCategories() {
    return this.currenciesGroupsWithCategoriesGQL
      .watch()
      .valueChanges.pipe(map((queryResult) => queryResult.data));
  }

  fetchOperation(id: number): Observable<Operation> {
    return this.operationGQL
      .watch({ operationId: id })
      .valueChanges.pipe(
        map((queryResult) => queryResult.data.operation as Operation)
      );
  }

  deleteOperation(id: number) {
    return this.deleteOperationGQL.mutate(
      { id },
      {
        update: (cache) => {
          cache.modify({
            fields: {
              operations(existingOperationsRef, { DELETE }) {
                return DELETE;
              },
            },
          });
        },
      }
    );
  }

  upsertOperation(data: SubmitEventData): Observable<MutationResult> {
    const { date, ...params } = data;
    const dateTime = date.toISOString();

    if (params.id) {
      return this.updateOperationGQL.mutate({
        params: {
          ...omit(params, 'isOtherWithdrawalCurrency'),
          id: params.id,
          dateTime,
        },
      });
    } else {
      return this.createOperationGQL.mutate(
        {
          params: {
            ...omit(params, ['id', 'isOtherWithdrawalCurrency']),
            dateTime,
          },
        },
        {
          update: (cache, { data }) => {
            cache.modify({
              fields: {
                operations(existingOperationsRef = []) {
                  const newOperationRef = cache.writeFragment({
                    data: data?.createOperation,
                    fragment: gql`
                      fragment NewOperation on Operation {
                        id
                      }
                    `,
                  });
                  return [...existingOperationsRef, newOperationRef];
                },
              },
            });
          },
        }
      );
    }
  }
}
