import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetSummary, Operation } from '@ispent/front/data-access';
import { Observable } from 'rxjs';
import { OverviewPageService } from './overview-page.service';

@Component({
  templateUrl: './overview-page.component.html',
  styles: [
    `
      :host {
        @apply block space-y-4;
      }
    `,
  ],
})
export class OverviewPageComponent implements OnInit {
  currenciesBudgets$!: Observable<BudgetSummary[]>;
  recentOperations$!: Observable<Operation[]>;
  isRecentOperationsLoading$!: Observable<boolean>;
  isCurrenciesBudgetsLoading$!: Observable<boolean>;
  isRecentOperationsEmpty$!: Observable<boolean>;

  constructor(private router: Router, private service: OverviewPageService) {}

  ngOnInit(): void {
    this.currenciesBudgets$ = this.service.currenciesBudgets$;
    this.recentOperations$ = this.service.recentOperations$;
    this.isRecentOperationsLoading$ = this.service.isRecentOperationsLoading$;
    this.isCurrenciesBudgetsLoading$ = this.service.isCurrenciesBudgetsLoading$;
    this.isRecentOperationsEmpty$ = this.service.isRecentOperationsEmpty$;
  }

  gotoOperationsPage(currencyId: number) {
    this.router.navigate(['overview', currencyId]);
  }

  setDate(date: Date) {
    this.service.setDate(date);
  }
}
