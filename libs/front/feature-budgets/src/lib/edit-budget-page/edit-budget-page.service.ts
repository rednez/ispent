import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApolloError } from '@apollo/client';
import { RequestResultNotificationService } from '@ispent/front/core';
import {
  ActionsService,
  BudgetsDocument,
  BudgetsGQL,
  BudgetsQuery,
  CreateBudgetRecordInput,
  CategoryService,
  CurrencyService,
  GroupService,
  CurrenciesGQL,
  CurrenciesGroupsBudgetsGQL,
  CurrenciesGroupsGQL,
  CurrentMonthService,
  GenerateBudgetsRecordsGQL,
  GroupsGQL,
  RecreateBudgetsRecordsGQL,
} from '@ispent/front/data-access';
import {
  DialogCreateCategoryComponent,
  DialogCreateCurrencyComponent,
  DialogCreateGroupComponent,
} from '@ispent/front/ui';
import { format } from 'date-fns';
import { groupBy, map as _map } from 'lodash';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { FormData } from '../data';

@Injectable({
  providedIn: 'root',
})
export class EditBudgetPageService {
  private _isDataLoading$ = new BehaviorSubject(false);
  private _isDataError$ = new BehaviorSubject(false);
  private _isDataSaving$ = new BehaviorSubject(false);

  constructor(
    private currentMonth: CurrentMonthService,
    private CurrenciesGroupsGQL: CurrenciesGroupsGQL,
    private currenciesGroupsBudgetsGQL: CurrenciesGroupsBudgetsGQL,
    private currenciesGQL: CurrenciesGQL,
    private groupsGQL: GroupsGQL,
    private budgetsGql: BudgetsGQL,
    private recreateBudgetsRecordsGQL: RecreateBudgetsRecordsGQL,
    private generateBudgetsRecordsGQL: GenerateBudgetsRecordsGQL,
    private currencyService: CurrencyService,
    private groupService: GroupService,
    private categoryService: CategoryService,
    private requestResultNotification: RequestResultNotificationService,
    private actions: ActionsService,
    private dialog: MatDialog
  ) {}

  get currentDate$(): Observable<Date> {
    return this.currentMonth.date$;
  }

  get isDataLoading$(): BehaviorSubject<boolean> {
    return this._isDataLoading$;
  }

  get isDataSaving$(): BehaviorSubject<boolean> {
    return this._isDataSaving$;
  }

  get isDataError$(): BehaviorSubject<boolean> {
    return this._isDataError$;
  }

  loadInitData() {
    return this.currentMonth.dateISO$.pipe(
      tap(() => {
        this._isDataLoading$.next(true);
        this._isDataError$.next(false);
      }),
      switchMap((date) =>
        this.currenciesGroupsBudgetsGQL
          .watch({ params: { date } })
          .valueChanges.pipe(
            map((v) => v.data),
            map((date) => ({
              currencies: date.currencies,
              groups: date.groups,
              budgetsData: this.deserializeServerData(date),
            }))
          )
          .pipe(tap(() => this._isDataLoading$.next(false)))
      ),
      catchError((err) => {
        this._isDataLoading$.next(false);
        this._isDataError$.next(true);
        return throwError(() => of(err));
      })
    );
  }

  loadBudgets(date: Date) {
    this._isDataLoading$.next(true);
    this._isDataError$.next(false);

    return this.budgetsGql
      .watch({
        params: { date: format(date, 'yyyy-MM-dd') },
      })
      .valueChanges.pipe(
        map((v) => this.deserializeServerData(v.data)),
        tap(() => this._isDataLoading$.next(false)),
        catchError((err) => {
          this._isDataLoading$.next(false);
          this._isDataError$.next(true);
          return throwError(() => of(err));
        })
      );
  }

  setDate(date: Date) {
    this.currentMonth.setDate(date);
  }

  saveFormData(formData: FormData) {
    const inputs = this.serializeServerData(
      formData,
      this.currentMonth.date$.value.toISOString()
    );

    this._isDataSaving$.next(true);

    this.recreateBudgetsRecordsGQL.mutate({ inputs }).subscribe({
      next: () => {
        this.isDataSaving$.next(false);
        this.requestResultNotification.success(
          'The data has been saved successfully'
        );
      },
      error: (error: ApolloError) => {
        this.isDataSaving$.next(false);
        this.requestResultNotification.handleError(error);
      },
    });
  }

  generateBudget() {
    this._isDataLoading$.next(true);
    this._isDataError$.next(false);

    return this.currentMonth.dateISO$.pipe(
      switchMap((date) =>
        this.generateBudgetsRecordsGQL
          .mutate(
            { date },
            {
              refetchQueries: [
                {
                  query: BudgetsDocument,
                  variables: { params: { date } },
                },
              ],
            }
          )
          .pipe(
            map((v) =>
              this.deserializeServerData({
                budgets: v.data?.generateManyBudgetsRecords as any,
              })
            ),
            tap(() => this._isDataLoading$.next(false)),
            catchError((err) => {
              this._isDataLoading$.next(false);
              this._isDataError$.next(true);
              throw new Error(err);
            })
          )
      )
    );
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
            this.currencyService.create$(currency).pipe(
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
            this.groupService
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
                this.categoryService
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

  private deserializeServerData(data: BudgetsQuery): FormData {
    return {
      currencies: _map(groupBy(data.budgets, 'currency.id'), (value, key) => ({
        id: parseInt(key),
        groups: _map(groupBy(value, 'group.id'), (gValue, gKey) => ({
          id: parseInt(gKey),
          categories: gValue.map((i) => ({
            id: i.category.id,
            amount: i.amount,
            planned: i.prevPlannedAmount,
            spent: i.prevSpentAmount,
          })),
        })),
      })),
    };
  }

  private serializeServerData(
    formData: FormData,
    dateISO: string
  ): CreateBudgetRecordInput[] {
    const result: CreateBudgetRecordInput[] = [];

    formData.currencies.forEach((currency) =>
      currency.groups.forEach((group) =>
        group.categories.forEach((category) => {
          result.push({
            amount: category.amount,
            currencyId: currency.id,
            groupId: group.id,
            categoryId: category.id,
            dateTime: dateISO,
          });
        })
      )
    );

    return result;
  }
}
