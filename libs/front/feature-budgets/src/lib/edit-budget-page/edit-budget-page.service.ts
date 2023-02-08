import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApolloError } from '@apollo/client';
import { RequestResultNotificationService } from '@ispent/front/core';
import {
  ActionsService,
  BudgetsDocument,
  BudgetsGQL,
  BudgetsQuery,
  CategoryService,
  CreateBudgetRecordInput,
  CurrenciesGQL,
  CurrenciesGroupsBudgetsGQL,
  CurrenciesGroupsGQL,
  Currency,
  CurrencyService,
  CurrentMonthService,
  DeleteManyBudgetsRecordsGQL,
  GenerateBudgetsRecordsGQL,
  Group,
  GroupService,
  GroupsGQL,
  RecreateBudgetsRecordsGQL,
} from '@ispent/front/data-access';
import {
  DialogCreateCategoryComponent,
  DialogCreateCurrencyComponent,
  DialogCreateGroupComponent,
} from '@ispent/front/ui';
import { addDays, lastDayOfMonth, subMonths } from 'date-fns';
import { groupBy, map as _map } from 'lodash-es';
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
    private deleteManyBudgetsRecordsGQL: DeleteManyBudgetsRecordsGQL,
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

  get currencies$(): Observable<Currency[]> {
    return this.currenciesGQL
      .watch()
      .valueChanges.pipe(map((query) => query.data.currencies));
  }

  get groups$(): Observable<Group[]> {
    return this.groupsGQL
      .watch()
      .valueChanges.pipe(map((query) => query.data.groups));
  }

  get initData$() {
    this._isDataLoading$.next(true);
    this._isDataError$.next(false);

    const { prevMonthStart, prevMonthEnd } = this.getPreviousMonthInterval();

    return this.currenciesGroupsBudgetsGQL
      .watch({
        params: {
          date: this.currentMonth.dateISOWithoutLocalOffset,
          currentOperationsDateTimeStart: this.currentMonth.dateISO,
          currentOperationsDateTimeEnd: this.currentMonth.lastDay,
          prevOperationsDateTimeStart: prevMonthStart,
          prevOperationsDateTimeEnd: prevMonthEnd,
        },
      })
      .valueChanges.pipe(
        map((v) => v.data),
        map((data) => ({
          budgetsData: this.deserializeServerData(data),
        })),
        tap(() => this._isDataLoading$.next(false)),
        catchError((err) => {
          this._isDataLoading$.next(false);
          this._isDataError$.next(true);
          return throwError(() => of(err));
        })
      );
  }

  loadBudgets() {
    this._isDataLoading$.next(true);
    this._isDataError$.next(false);

    const { prevMonthStart, prevMonthEnd } = this.getPreviousMonthInterval();

    return this.budgetsGql
      .watch({
        params: {
          date: this.currentMonth.dateISOWithoutLocalOffset,
          currentOperationsDateTimeStart: this.currentMonth.dateISO,
          currentOperationsDateTimeEnd: this.currentMonth.lastDay,
          prevOperationsDateTimeStart: prevMonthStart,
          prevOperationsDateTimeEnd: prevMonthEnd,
        },
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
    const input = this.serializeServerData(
      formData,
      this.currentMonth.dateISOWithoutLocalOffset
    );

    this._isDataSaving$.next(true);

    this.recreateBudgetsRecordsGQL.mutate({ input }).subscribe({
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

    const date = this.currentMonth.dateISOWithoutLocalOffset;
    const { prevMonthStart, prevMonthEnd } = this.getPreviousMonthInterval();

    return this.generateBudgetsRecordsGQL
      .mutate(
        {
          input: {
            date,
            prevOperationsDateTimeStart: prevMonthStart,
            prevOperationsDateTimeEnd: prevMonthEnd,
          },
        },
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
      );
  }

  deleteBudget() {
    this._isDataLoading$.next(true);
    this._isDataError$.next(false);

    const date = this.currentMonth.dateISOWithoutLocalOffset;

    return this.deleteManyBudgetsRecordsGQL
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
        tap(() => this._isDataLoading$.next(false)),
        catchError((err) => {
          this._isDataLoading$.next(false);
          this._isDataError$.next(true);
          throw new Error(err);
        })
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
            plannedPrevious: i.prevPlannedAmount,
            spentPrevious: i.prevSpentAmount,
            spentCurrent: i.currentSpentAmount,
            favorite: i.category.favorite,
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

  private getPreviousMonthInterval(): {
    prevMonthStart: string;
    prevMonthEnd: string;
  } {
    const start = subMonths(this.currentMonth.date$.value, 1);
    const end = addDays(lastDayOfMonth(start), 1);
    return {
      prevMonthStart: start.toISOString(),
      prevMonthEnd: end.toISOString(),
    };
  }
}
