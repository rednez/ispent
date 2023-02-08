import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { ApolloError } from '@apollo/client';
import { RequestResultNotificationService } from '@ispent/front/core';
import {
  BudgetsSummariesGQL,
  BudgetSummary,
  BudgetSummaryType,
  Category,
  CategoryService,
  CurrenciesGQL,
  CurrenciesGroupsCategoriesGQL,
  Currency,
  CurrencyService,
  CurrentMonthService,
  Group,
  GroupService,
  GroupsGQL,
  Operation,
  OperationsGQL,
} from '@ispent/front/data-access';
import {
  DialogCreateCategoryComponent,
  DialogCreateCurrencyComponent,
  DialogCreateGroupComponent,
} from '@ispent/front/ui';
import eq from 'lodash/fp/eq';
import flow from 'lodash/fp/flow';
import prop from 'lodash/fp/prop';
import mapKeys from 'lodash/fp/mapKeys';
import mapValues from 'lodash/fp/mapValues';
import toString from 'lodash/fp/toString';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { BreadcrumbsItem } from '../ui/breadcrumbs/breadcrumbs.component';

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
    private operationsGql: OperationsGQL,
    private currenciesGQL: CurrenciesGQL,
    private groupsGQL: GroupsGQL,
    private currencyService: CurrencyService,
    private groupService: GroupService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private requestResultNotification: RequestResultNotificationService
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
      switchMap(([params, data, dateISO]) =>
        this.budgetsSummariesGql
          .watch({
            params: {
              type: data['type'],
              dateTimeStart: dateISO,
              dateTimeEnd: this.currentMonth.lastDay,
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
      switchMap(([params, data, dateISO]) =>
        this.budgetsSummariesGql
          .watch({
            params: {
              type:
                data['type'] === BudgetSummaryType.Currency
                  ? BudgetSummaryType.Group
                  : BudgetSummaryType.Category,
              dateTimeStart: dateISO,
              dateTimeEnd: this.currentMonth.lastDay,
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
      switchMap(([params, dateISO]) =>
        this.operationsGql
          .watch({
            params: {
              dateTimeStart: dateISO,
              dateTimeEnd: this.currentMonth.lastDay,
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

  editCurrency(id: number) {
    this.currenciesGQL
      .watch()
      .valueChanges.pipe(
        take(1),
        map((query) => query.data.currencies),
        switchMap((currencies) =>
          of(
            this.dialog.open(DialogCreateCurrencyComponent, {
              data: { currencies, id },
            })
          )
        ),
        switchMap((dialogRef) =>
          dialogRef.componentInstance.update.pipe(
            tap(() => (dialogRef.componentInstance.loading = true)),
            switchMap((updatedCurrency) =>
              this.currencyService
                .update$({ id, name: updatedCurrency.name })
                .pipe(
                  tap(() => {
                    dialogRef.componentInstance.loading = false;
                    dialogRef.close();
                  }),
                  tap(() =>
                    this.requestResultNotification.success(
                      `The currency has been updated`
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
      )
      .subscribe();
  }

  editGroup(id: number) {
    this.groupsGQL
      .watch()
      .valueChanges.pipe(
        take(1),
        map((query) => query.data.groups),
        switchMap((groups) =>
          of(
            this.dialog.open(DialogCreateGroupComponent, {
              data: { groups, id },
            })
          )
        ),
        switchMap((dialogRef) =>
          dialogRef.componentInstance.update.pipe(
            tap(() => (dialogRef.componentInstance.loading = true)),
            switchMap((updatedGroup) =>
              this.groupService
                .update$({
                  id,
                  name: updatedGroup.name,
                  color: updatedGroup.color,
                })
                .pipe(
                  tap(() => {
                    dialogRef.componentInstance.loading = false;
                    dialogRef.close();
                  }),
                  tap(() =>
                    this.requestResultNotification.success(
                      `The group has been updated`
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
      )
      .subscribe();
  }

  editCategory(categoryId: number) {
    this.groupsGQL
      .watch()
      .valueChanges.pipe(
        take(1),
        map((query) => ({
          groups: query.data.groups,
          id: categoryId,
          parentGroupId: this.categoryService.findParentGroupId(
            categoryId,
            query.data.groups
          ),
        })),
        switchMap((dialogData) =>
          of(
            this.dialog.open(DialogCreateCategoryComponent, {
              data: dialogData,
            })
          ).pipe(
            switchMap((dialogRef) =>
              dialogRef.componentInstance.update.pipe(
                tap(() => (dialogRef.componentInstance.loading = true)),
                switchMap((categoryParams) =>
                  this.categoryService.update$(categoryParams).pipe(
                    tap(() => {
                      dialogRef.componentInstance.loading = false;
                      dialogRef.close();
                    }),
                    tap(() =>
                      this.requestResultNotification.success(
                        `The category has been updated`
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
          )
        )
      )
      .subscribe();
  }

  private getItemName(
    itemsList: Array<{ id: number; name: string }>,
    itemId?: string
  ): string | undefined {
    const item = itemsList.find(flow(prop('id'), toString, eq(itemId)));
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
