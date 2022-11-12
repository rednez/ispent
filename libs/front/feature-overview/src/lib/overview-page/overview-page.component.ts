import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BudgetSummary,
  BudgetSummaryType,
  Operation,
} from '@ispent/shared/data-access';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './overview-page.component.html',
})
export class OverviewPageComponent {
  currenciesBudgets$: Observable<BudgetSummary[]> = of([
    {
      parentId: 1,
      type: BudgetSummaryType.CURRENCY,
      title: 'UAH',
      planned: 12000,
      spent: 8700.7,
    },
    {
      parentId: 2,
      type: BudgetSummaryType.CURRENCY,
      title: 'CZK',
      planned: 58000,
      spent: 22300,
    },
  ]);

  recentOperations$: Observable<Operation[]> = of([
    {
      id: 1,
      amount: 1200,
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
      dateTime: '1982-01-10',
    },
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

  constructor(private router: Router) {}

  gotoOperationsPage(currencyId: number) {
    this.router.navigate(['overview', currencyId]);
  }
}
