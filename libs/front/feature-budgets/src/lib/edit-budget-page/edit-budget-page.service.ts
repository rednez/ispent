import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActionsService,
  BudgetsGQL,
  BudgetsQuery,
  CreateBudgetRecordInput,
  CreateCategoryService,
  CreateCurrencyService,
  CreateGroupService,
  CurrenciesGQL,
  CurrenciesGroupsWithCategoriesGQL,
  CurrentMonthService,
  GroupsGQL,
  RecreateBudgetsRecordsGQL,
} from '@ispent/front/data-access';
import {
  DialogCreateCategoryComponent,
  DialogCreateCurrencyComponent,
  DialogCreateGroupComponent,
} from '@ispent/front/ui';
import { groupBy, map as _map } from 'lodash';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
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
    private currenciesGroupsWithCategoriesGQL: CurrenciesGroupsWithCategoriesGQL,
    private currenciesGQL: CurrenciesGQL,
    private groupsGQL: GroupsGQL,
    private budgetsGql: BudgetsGQL,
    private recreateBudgetsRecordsGQL: RecreateBudgetsRecordsGQL,
    private createCurrencyService: CreateCurrencyService,
    private createGroupService: CreateGroupService,
    private createCategoryService: CreateCategoryService,
    private snackBar: MatSnackBar,
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

  get data$() {
    return this.currentMonth.dateISO$.pipe(
      tap(() => {
        this._isDataLoading$.next(true);
        this._isDataError$.next(false);
      }),
      switchMap((date) =>
        combineLatest([
          this.currenciesGroupsWithCategoriesGQL.watch().valueChanges.pipe(
            map((v) => v.data),
            map(({ currencies, groups }) => ({
              currencies,
              groups,
            }))
          ),
          this.budgetsGql
            .watch({ params: { date } })
            .valueChanges.pipe(map((v) => this.deserializeServerData(v.data))),
        ]).pipe(
          map(([{ currencies, groups }, budgetsData]) => ({
            currencies,
            groups,
            budgetsData,
          })),
          tap(() => this._isDataLoading$.next(false))
        )
      ),
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
        this.showSnackBar('The data has been saved successfully');
      },
      error: () => {
        this.isDataSaving$.next(false);
        this.showSnackBar(`Fail. The data hasn't been saved`);
      },
    });
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
                this.showSnackBar(`The currency ${currency} has been created`)
              )
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
                  this.showSnackBar(`The group ${name}  has been created`)
                )
              )
          ),
          tap(() => {
            dialogRef.componentInstance.loading = false;
            dialogRef.close();
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
                      this.showSnackBar(
                        `The category ${categoryParams.name}  has been created`
                      )
                    )
                  )
              ),
              tap(() => {
                dialogRef.componentInstance.loading = false;
                dialogRef.close();
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

  private showSnackBar(message: string, duration = 2000) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }
}
