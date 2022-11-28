import { Injectable } from '@angular/core';
import {
  BudgetsSummariesGQL,
  BudgetSummary,
  BudgetSummaryType,
  CurrentMonthService,
  Operation,
  OperationsGQL,
} from '@ispent/front/data-access';
import { isEmpty } from 'lodash';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverviewPageService {
  private _isRecentOperationsLoading$ = new BehaviorSubject(true);
  private _isCurrenciesBudgetsLoading$ = new BehaviorSubject(true);

  private currenciesBudgetsResult$ = this.currentMonth.dateIso$.pipe(
    tap(() => this._isCurrenciesBudgetsLoading$.next(true)),
    switchMap(
      (month) =>
        this.budgetsSummariesGQL.watch({
          params: {
            type: BudgetSummaryType.Currency,
            month,
          },
        }).valueChanges
    )
  );

  private operationsResult$ = this.currentMonth.dateIso$.pipe(
    tap(() => this._isRecentOperationsLoading$.next(true)),
    switchMap(
      (month) => this.operationsGql.watch({ params: { month } }).valueChanges
    )
  );

  constructor(
    private budgetsSummariesGQL: BudgetsSummariesGQL,
    private operationsGql: OperationsGQL,
    private currentMonth: CurrentMonthService
  ) {}

  get currenciesBudgets$(): Observable<BudgetSummary[]> {
    return this.currenciesBudgetsResult$.pipe(
      tap(() => this._isCurrenciesBudgetsLoading$.next(false)),
      map((q) => q.data?.budgetsSummary)
    );
  }

  get recentOperations$(): Observable<Operation[]> {
    return this.operationsResult$.pipe(
      tap(() => this._isRecentOperationsLoading$.next(false)),
      map((r) => r.data?.operations)
    );
  }

  get isRecentOperationsLoading$(): BehaviorSubject<boolean> {
    return this._isRecentOperationsLoading$;
  }

  get isCurrenciesBudgetsLoading$(): BehaviorSubject<boolean> {
    return this._isCurrenciesBudgetsLoading$;
  }

  get isRecentOperationsEmpty$(): Observable<boolean> {
    return this.recentOperations$.pipe(map(isEmpty));
  }

  get currentDate$(): Observable<Date> {
    return this.currentMonth.date$;
  }

  setDate(date: Date) {
    this.currentMonth.setDate(date);
  }
}
