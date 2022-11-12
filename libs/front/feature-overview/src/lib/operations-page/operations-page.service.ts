import { Injectable } from '@angular/core';
import {
  BudgetSummary,
  BudgetSummaryType,
  Category,
  Currency,
  Group,
  Operation,
} from '@ispent/shared/data-access';
import { eq, get, pipe, toString } from 'lodash/fp';
import { map, Observable, of, withLatestFrom } from 'rxjs';
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
  private _allCurrencies$: Observable<Currency[]> = of([
    { id: 1, name: 'UAH' },
    { id: 2, name: 'CZK' },
  ]);

  private _allGroups$: Observable<Group[]> = of([
    {
      id: 1,
      name: 'Life',
      color: '#1752c5',
    },
    {
      id: 2,
      name: 'Sport',
      color: '#17c56e',
    },
    {
      id: 3,
      name: 'Car',
      color: '#b917c5',
    },
  ]);

  private _allCategories$: Observable<Category[]> = of([
    {
      id: 1,
      name: 'Foods',
      color: '#17a5c5',
    },
    {
      id: 2,
      name: 'Benzin',
      color: '#c59417',
    },
    {
      id: 3,
      name: 'Alcogol',
      color: '#7fc517',
    },
    {
      id: 4,
      name: 'Games',
      color: '#7717c5',
    },
  ]);

  private _routeParams$?: Observable<RouteParams>;

  getBreadcrumbs(): Observable<BreadcrumbsItem[]> {
    if (!this._routeParams$) {
      return of([{ name: 'Overview', to: ['overview'] }]);
    } else {
      return this._routeParams$.pipe(
        withLatestFrom(
          this._allCurrencies$,
          this._allGroups$,
          this._allCategories$
        ),
        map(([params, currencies, groups, categories]) => ({
          params,
          currencies,
          groups,
          categories,
        })),
        map(this.defineBreadcrumbs)
      );
    }
  }

  getOneBudgetSummary(): Observable<BudgetSummary> {
    return of({
      parentId: 1,
      type: BudgetSummaryType.CURRENCY,
      title: 'UAH',
      planned: 4500,
      spent: 3200.3,
    });
  }

  getBudgetSummariesList(): Observable<BudgetSummary[]> {
    return of([
      {
        parentId: 1,
        type: BudgetSummaryType.GROUP,
        title: 'Foods',
        planned: 422,
        spent: 544,
        color: '#1f71c2',
      },
      {
        parentId: 2,
        type: BudgetSummaryType.GROUP,
        title: 'Sport',
        planned: 1200,
        spent: 1200,
        color: '#55c21f',
      },
      {
        parentId: 3,
        type: BudgetSummaryType.GROUP,
        title: 'Car',
        planned: 8000,
        spent: 640,
        color: '#c21f9c',
      },
    ]);
  }

  getOperations(): Observable<Operation[]> {
    return of([
      {
        id: 2,
        amount: 20500.4,
        currency: 'UAH',
        group: {
          id: 1,
          name: 'Products',
          color: '#7ec53c',
        },
        category: {
          id: 1,
          name: 'Foods',
          color: '#3cc5c5',
        },
        dateTime: '2022-11-03',
      },
      {
        id: 3,
        amount: 3574,
        currency: 'CZK',
        group: {
          id: 2,
          name: 'Life',
          color: '#a73cc5',
        },
        category: {
          id: 4,
          name: 'Caffe',
          color: '#c78522',
        },
        dateTime: '2022-11-03',
      },
    ]);
  }

  setRouteParams(params: Observable<RouteParams>) {
    this._routeParams$ = params;
  }

  private getItemName(
    itemsList: Array<{ id: number; name: string }>,
    itemId?: string
  ): string | undefined {
    const item = itemsList.find(pipe(get('id'), toString, eq(itemId)));
    return item?.name;
  }

  private defineBreadcrumbs = (props: {
    params: RouteParams;
    currencies: Currency[];
    groups: Group[];
    categories: Category[];
  }) => {
    const { params, currencies, groups, categories } = props;
    const result: BreadcrumbsItem[] = [{ name: 'Overview', to: ['overview'] }];

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
