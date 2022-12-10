import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import {
  BudgetsSummariesGQL,
  BudgetSummary,
  BudgetSummaryType,
  Category,
  CurrenciesGroupsCategoriesGQL,
  Currency,
  CurrentMonthService,
  Group,
  Operation,
  OperationsGQL,
} from '@ispent/front/data-access';
import { eq, flow, get, mapKeys, mapValues, toString } from 'lodash/fp';
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
import { BreadcrumbsItem } from '../ui/breadcrumbs/breadcrumbs.component';
import { ApolloError } from '@apollo/client';

type RouteParams = Partial<{
  currency: string;
  group: string;
  category: string;
}>;

@Injectable({
  providedIn: 'root',
})
export class OperationsPageService {
  private _routeParams$!: Observable<RouteParams>;
  private _routeData$!: Observable<Data>;
  private _isOneBudgetSummaryLoading$ = new BehaviorSubject(false);
  private _isOneBudgetSummaryError$ = new BehaviorSubject(false);
  private _isOperationsLoading$ = new BehaviorSubject(false);
  private _isOperationsError$ = new BehaviorSubject(false);

  constructor(
    private currentMonth: CurrentMonthService,
    private currenciesGroupsCategoriesGql: CurrenciesGroupsCategoriesGQL,
    private budgetsSummariesGql: BudgetsSummariesGQL,
    private operationsGql: OperationsGQL
  ) {}

  get isOneBudgetSummaryLoading$(): BehaviorSubject<boolean> {
    return this._isOneBudgetSummaryLoading$;
  }

  get isOperationsLoading$(): BehaviorSubject<boolean> {
    return this._isOperationsLoading$;
  }

  get isOneBudgetSummaryError$(): BehaviorSubject<boolean> {
    return this._isOneBudgetSummaryError$;
  }

  get isOperationsError$(): BehaviorSubject<boolean> {
    return this._isOperationsError$;
  }

  setRouteParams(params: Observable<RouteParams>) {
    this._routeParams$ = params;
  }

  setRouteData(data: Observable<Data>) {
    this._routeData$ = data;
  }

  getBreadcrumbs(): Observable<BreadcrumbsItem[]> {
    if (!this._routeParams$) {
      return of([
        {
          name: `Overview for ${this.currentMonth.dateShort}`,
          to: ['overview'],
        },
      ]);
    } else {
      return this.currenciesGroupsCategoriesGql.watch().valueChanges.pipe(
        withLatestFrom(this._routeParams$),
        map(([queryResult, params]) => ({
          params,
          currencies: queryResult.data?.currencies,
          groups: queryResult.data?.groups,
          categories: queryResult.data?.categories,
        })),
        map(this.defineBreadcrumbs)
      );
    }
  }

  getOneBudgetSummary(): Observable<BudgetSummary> {
    return combineLatest([
      this._routeParams$,
      this._routeData$,
      this.currentMonth.dateISO$,
    ]).pipe(
      tap(() => {
        this._isOneBudgetSummaryLoading$.next(true);
        this._isOneBudgetSummaryError$.next(false);
      }),
      switchMap(([params, data, date]) =>
        this.budgetsSummariesGql
          .watch({
            params: {
              type: data['type'],
              month: date,
              ...flow(
                mapKeys((k) => k + 'Id'),
                mapValues(parseInt)
              )(params),
            },
          })
          .valueChanges.pipe(
            tap(() => this._isOneBudgetSummaryLoading$.next(false)),
            map((result) => result.data.budgetsSummary[0]),
            catchError((err: ApolloError) => {
              this._isOneBudgetSummaryLoading$.next(false);
              this._isOneBudgetSummaryError$.next(true);
              return throwError(() => err);
            })
          )
      )
    );
  }

  getBudgetSummariesList(): Observable<BudgetSummary[]> {
    return combineLatest([
      this._routeParams$,
      this._routeData$,
      this.currentMonth.dateISO$,
    ]).pipe(
      switchMap(([params, data, date]) =>
        this.budgetsSummariesGql
          .watch({
            params: {
              type:
                data['type'] === BudgetSummaryType.Currency
                  ? BudgetSummaryType.Group
                  : BudgetSummaryType.Category,
              month: date,
              ...flow(
                mapKeys((k) => k + 'Id'),
                mapValues(parseInt)
              )(params),
            },
          })
          .valueChanges.pipe(map((result) => result.data.budgetsSummary))
      )
    );
  }

  getOperations(): Observable<Operation[]> {
    return combineLatest([this._routeParams$, this.currentMonth.dateISO$]).pipe(
      tap(() => {
        this._isOperationsLoading$.next(true);
        this._isOperationsError$.next(false);
      }),
      switchMap(([params, date]) =>
        this.operationsGql
          .watch({
            params: {
              month: date,
              ...flow(
                mapKeys((k) => k + 'Id'),
                mapValues(parseInt)
              )(params),
            },
          })
          .valueChanges.pipe(
            tap(() => this._isOperationsLoading$.next(false)),
            map((result) => result.data.operations),
            catchError((err: ApolloError) => {
              this._isOperationsLoading$.next(false);
              this._isOperationsError$.next(true);
              return throwError(() => err);
            })
          )
      )
    );
  }

  private getItemName(
    itemsList: Array<{ id: number; name: string }>,
    itemId?: string
  ): string | undefined {
    const item = itemsList.find(flow(get('id'), toString, eq(itemId)));
    return item?.name;
  }

  private defineBreadcrumbs = (props: {
    params: RouteParams;
    currencies: Currency[];
    groups: Group[];
    categories: Category[];
  }) => {
    const { params, currencies, groups, categories } = props;
    const result: BreadcrumbsItem[] = [
      {
        name: `Overview for ${this.currentMonth.dateShort}`,
        to: ['overview'],
      },
    ];

    if (params.currency) {
      const currencyName = this.getItemName(currencies, params.currency);
      if (currencyName) {
        result.push({
          name: currencyName,
          to: params.group ? ['overview', params.currency] : [],
        });
      }
    }

    if (params.group) {
      const groupName = this.getItemName(groups, params.group);
      if (groupName) {
        result.push({
          name: groupName,
          to:
            params.currency && params.category
              ? ['overview', params.currency, params.group]
              : [],
        });
      }
    }

    if (params.category) {
      const categoryName = this.getItemName(categories, params.category);
      if (categoryName) {
        result.push({ name: categoryName, to: [] });
      }
    }

    return result;
  };
}
