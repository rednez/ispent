import { Injectable } from '@angular/core';
import {
  BudgetsGQL,
  BudgetsQuery,
  CreateBudgetRecordInput,
  CurrenciesGroupsWithCategoriesGQL,
  CurrentMonthService,
  RecreateBudgetsRecordsGQL,
} from '@ispent/front/data-access';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { groupBy, map as _map } from 'lodash';
import { FormData } from '../data';

@Injectable({
  providedIn: 'root',
})
export class EditBudgetPageService {
  private _isDataLoading$ = new BehaviorSubject(false);
  private _isDataSaving$ = new BehaviorSubject(false);

  constructor(
    private currentMonth: CurrentMonthService,
    private currenciesGroupsWithCategoriesGQL: CurrenciesGroupsWithCategoriesGQL,
    private budgetsGql: BudgetsGQL,
    private recreateBudgetsRecordsGQL: RecreateBudgetsRecordsGQL
  ) {}

  get currentDate$(): Observable<Date> {
    return this.currentMonth.date$;
  }

  get isDataLoading$(): BehaviorSubject<boolean> {
    return this._isDataLoading$;
  }

  get data$() {
    return this.currentMonth.dateISO$.pipe(
      tap(() => this._isDataLoading$.next(true)),
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
      )
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
    this.recreateBudgetsRecordsGQL.mutate({ inputs }).subscribe();
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
