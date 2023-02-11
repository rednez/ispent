import { Injectable } from '@angular/core';
import {
  BudgetsSummariesGQL,
  BudgetSummary,
  BudgetSummaryType,
  CurrentMonthService,
  Operation,
  OperationsGQL,
} from '@ispent/front/data-access';
import { isEmpty } from 'ramda';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ApolloError } from '@apollo/client';

@Injectable({
  providedIn: 'root',
})
export class OverviewPageService {
  private _isRecentOperationsLoading$ = new BehaviorSubject(true);
  private _isRecentOperationsError$ = new BehaviorSubject(false);
  private _isCurrenciesBudgetsLoading$ = new BehaviorSubject(true);
  private _isCurrenciesBudgetsError$ = new BehaviorSubject(false);

  private currenciesBudgetsResult$ = this.currentMonth.dateISO$.pipe(
    tap(() => {
      this._isCurrenciesBudgetsLoading$.next(true);
      this._isCurrenciesBudgetsError$.next(false);
    }),
    switchMap((dateISO) =>
      this.budgetsSummariesGQL
        .watch({
          params: {
            type: BudgetSummaryType.Currency,
            dateTimeStart: dateISO,
            dateTimeEnd: this.currentMonth.lastDay,
          },
        })
        .valueChanges.pipe(
          catchError((err: ApolloError) => {
            this._isCurrenciesBudgetsLoading$.next(false);
            this._isCurrenciesBudgetsError$.next(true);
            return throwError(() => err);
          })
        )
    )
  );

  private operationsResult$ = this.currentMonth.dateISO$.pipe(
    tap(() => {
      this._isRecentOperationsLoading$.next(true);
      this._isRecentOperationsError$.next(false);
    }),
    switchMap((dateISO) =>
      this.operationsGql
        .watch({
          params: {
            dateTimeStart: dateISO,
            dateTimeEnd: this.currentMonth.lastDay,
            limit: 10,
          },
        })
        .valueChanges.pipe(
          catchError((err: ApolloError) => {
            this._isRecentOperationsLoading$.next(false);
            this._isRecentOperationsError$.next(true);
            return throwError(() => err);
          })
        )
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

  get isRecentOperationsError$(): BehaviorSubject<boolean> {
    return this._isRecentOperationsError$;
  }

  get isCurrenciesBudgetsError$(): BehaviorSubject<boolean> {
    return this._isCurrenciesBudgetsError$;
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
