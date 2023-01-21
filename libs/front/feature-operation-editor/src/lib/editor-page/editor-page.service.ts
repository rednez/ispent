import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApolloError } from '@apollo/client';
import { RequestResultNotificationService } from '@ispent/front/core';
import {
  ActionsService,
  CreateCategoryService,
  CreateCurrencyService,
  CreateGroupService,
  CreateOperationGQL,
  CurrenciesGQL,
  CurrenciesGroupsWithCategoriesGQL,
  DeleteOperationGQL,
  GroupsGQL,
  Operation,
  OperationGQL,
  UpdateOperationGQL,
} from '@ispent/front/data-access';
import {
  DialogCreateCategoryComponent,
  DialogCreateCurrencyComponent,
  DialogCreateGroupComponent,
} from '@ispent/front/ui';
import { gql, MutationResult } from 'apollo-angular';
import { omit } from 'lodash';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { SubmitEventData } from '../editor-form/editor-form.component';

@Injectable({
  providedIn: 'root',
})
export class EditorPageService {
  constructor(
    private actions: ActionsService,
    private currenciesGroupsWithCategoriesGQL: CurrenciesGroupsWithCategoriesGQL,
    private operationGQL: OperationGQL,
    private deleteOperationGQL: DeleteOperationGQL,
    private updateOperationGQL: UpdateOperationGQL,
    private createOperationGQL: CreateOperationGQL,
    private currenciesGQL: CurrenciesGQL,
    private groupsGQL: GroupsGQL,
    private createCurrencyService: CreateCurrencyService,
    private createGroupService: CreateGroupService,
    private createCategoryService: CreateCategoryService,
    private dialog: MatDialog,
    private requestResultNotification: RequestResultNotificationService
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
          this.requestResultNotification.success(
            'The operation has been deleted'
          )
        ),
        catchError(this.requestResultNotification.handleError)
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
            this.requestResultNotification.success(
              'The operation has been updated'
            )
          ),
          catchError(this.requestResultNotification.handleError)
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
            this.requestResultNotification.success(
              'The operation has been created'
            )
          ),
          catchError(this.requestResultNotification.handleError)
        );
    }
  }

  createCurrency() {
    this.actions.createCurrency$.next(null);
  }

  createGroup() {
    this.actions.createGroup$.next(null);
  }

  createCategory(params: { parentGroupId: number }) {
    this.actions.createCategory$.next(params);
  }

  onCreateCurrency$() {
    return this.actions.createCurrency$.pipe(
      withLatestFrom(this.currenciesGQL.watch().valueChanges),
      switchMap(([, currenciesQuery]) =>
        of(
          this.dialog.open(DialogCreateCurrencyComponent, {
            data: { currencies: currenciesQuery.data.currencies },
          })
        )
      ),
      switchMap((dialogRef) =>
        dialogRef.componentInstance.create.pipe(
          tap(() => (dialogRef.componentInstance.loading = true)),
          switchMap((currency) =>
            this.createCurrencyService.create$(currency).pipe(
              tap(() => {
                dialogRef.componentInstance.loading = false;
                dialogRef.close();
              }),
              tap(() =>
                this.requestResultNotification.success(
                  `The currency ${currency} has been created`
                )
              ),
              catchError((error: ApolloError) => {
                dialogRef.componentInstance.loading = false;
                dialogRef.close();
                this.requestResultNotification.fail(error.message);
                return of(() => error);
              })
            )
          )
        )
      )
    );
  }

  onCreateGroup$() {
    return this.actions.createGroup$.pipe(
      withLatestFrom(this.groupsGQL.watch().valueChanges),
      switchMap(([, groupsQuery]) =>
        of(
          this.dialog.open(DialogCreateGroupComponent, {
            data: { groups: groupsQuery.data.groups },
          })
        )
      ),
      switchMap((dialogRef) =>
        dialogRef.componentInstance.create.pipe(
          tap(() => (dialogRef.componentInstance.loading = true)),
          switchMap((name) =>
            this.createGroupService
              .create$(name)
              .pipe(
                tap(() =>
                  this.requestResultNotification.success(
                    `The group ${name}  has been created`
                  )
                )
              )
          ),
          tap(() => {
            dialogRef.componentInstance.loading = false;
            dialogRef.close();
          }),
          catchError((error: ApolloError) => {
            dialogRef.componentInstance.loading = false;
            dialogRef.close();
            this.requestResultNotification.fail(error.message);
            return of(() => error);
          })
        )
      )
    );
  }

  onCreateCategory$() {
    return this.actions.createCategory$.pipe(
      withLatestFrom(this.groupsGQL.watch().valueChanges),
      map(([{ parentGroupId }, groupsQuery]) => ({
        parentGroupId: parentGroupId,
        groups: groupsQuery.data.groups,
      })),
      switchMap((dialogData) =>
        of(
          this.dialog.open(DialogCreateCategoryComponent, {
            data: dialogData,
          })
        ).pipe(
          switchMap((dialogRef) =>
            dialogRef.componentInstance.create.pipe(
              tap(() => (dialogRef.componentInstance.loading = true)),
              switchMap((categoryParams) =>
                this.createCategoryService
                  .create$(categoryParams)
                  .pipe(
                    tap(() =>
                      this.requestResultNotification.success(
                        `The category ${categoryParams.name}  has been created`
                      )
                    )
                  )
              ),
              tap(() => {
                dialogRef.componentInstance.loading = false;
                dialogRef.close();
              }),
              catchError((error: ApolloError) => {
                dialogRef.componentInstance.loading = false;
                dialogRef.close();
                this.requestResultNotification.fail(error.message);
                return of(() => error);
              })
            )
          )
        )
      )
    );
  }
}
