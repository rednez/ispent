import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { map, Observable, tap } from 'rxjs';
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
    private createOperationGQL: CreateOperationGQL,
    private snackBar: MatSnackBar
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
    return this.deleteOperationGQL
      .mutate(
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
      )
      .pipe(
        tap(() =>
          this.snackBar.open('The operation has been deleted', undefined, {
            duration: 2000,
          })
        )
      );
  }

  upsertOperation(data: SubmitEventData): Observable<MutationResult> {
    const { date, ...params } = data;
    const dateTime = date.toISOString();

    if (params.id) {
      return this.updateOperationGQL
        .mutate({
          params: {
            ...omit(params, 'isOtherWithdrawalCurrency'),
            id: params.id,
            dateTime,
          },
        })
        .pipe(
          tap(() =>
            this.snackBar.open('The operation has been updated', undefined, {
              duration: 2000,
            })
          )
        );
    } else {
      return this.createOperationGQL
        .mutate(
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
        )
        .pipe(
          tap(() =>
            this.snackBar.open('The operation has been created', undefined, {
              duration: 2000,
            })
          )
        );
    }
  }
}
