import { Injectable } from '@angular/core';
import {
  BudgetsGQL,
  BudgetsQuery,
  CurrenciesGroupsCategoriesGQL,
  CurrentMonthService,
} from '@ispent/front/data-access';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { map as _map, groupBy } from 'lodash';

export interface BudgetsData {
  currencies: Array<{
    id: number;
    groups: Array<{
      id: number;
      categories: Array<{
        id: number;
        amount: number;
        planned: number;
        spent: number;
      }>;
    }>;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class EditBudgetPageService {
  private _isDataLoading$ = new BehaviorSubject(false);

  constructor(
    private currentMonth: CurrentMonthService,
    private currenciesGroupsCategoriesGQL: CurrenciesGroupsCategoriesGQL,
    private budgetsGql: BudgetsGQL
  ) {}

  get currentDate$(): Observable<Date> {
    return this.currentMonth.date$;
  }

  get isDataLoading$(): BehaviorSubject<boolean> {
    return this._isDataLoading$;
  }

  get data$() {
    return this.currentMonth.dateIso$.pipe(
      tap(() => this._isDataLoading$.next(true)),
      switchMap((date) =>
        combineLatest([
          this.currenciesGroupsCategoriesGQL.watch().valueChanges.pipe(
            map((v) => v.data),
            map(({ currencies, groups, categories }) => ({
              currencies,
              groups,
              categories,
            }))
          ),
          this.budgetsGql
            .watch({ params: { date } })
            .valueChanges.pipe(map((v) => this.parseServerData(v.data))),
        ]).pipe(
          map(([{ currencies, groups, categories }, budgetsData]) => ({
            currencies,
            groups,
            categories,
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

  parseServerData(data: BudgetsQuery): BudgetsData {
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
}
