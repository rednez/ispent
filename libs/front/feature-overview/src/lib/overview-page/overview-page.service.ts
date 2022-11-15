import { Injectable } from '@angular/core';
import {
  BudgetsSummariesGQL,
  BudgetSummary,
  BudgetSummaryType,
  Operation,
  OperationsGQL,
} from '@ispent/front/data-access';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { CurrentMonthService } from '../current-month.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewPageService {
  private _isLoadingRecentOperations$ = new BehaviorSubject(true);

  private operationsResult$ = this.currentMonth.date$.pipe(
    switchMap(
      (month) => this.operationsGql.watch({ params: { month } }).valueChanges
    )
  );

  private currenciesBudgetsResult$ = this.currentMonth.date$.pipe(
    tap(() => this._isLoadingRecentOperations$.next(true)),
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

  constructor(
    private budgetsSummariesGQL: BudgetsSummariesGQL,
    private operationsGql: OperationsGQL,
    private currentMonth: CurrentMonthService
  ) {}

  get recentOperations(): Observable<Operation[]> {
    return this.operationsResult$.pipe(
      tap(() => this._isLoadingRecentOperations$.next(false)),
      map((r) => r.data?.operations)
    );
  }

  get currenciesBudgets(): Observable<BudgetSummary[]> {
    return this.currenciesBudgetsResult$.pipe(
      map((q) => q.data?.budgetsSummary)
    );
  }

  get isLoadingRecentOperations$(): BehaviorSubject<boolean> {
    return this._isLoadingRecentOperations$;
  }

  setDate(date: Date) {
    this.currentMonth.setDate(date);
  }
}
