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
  isRecentOperationsError$!: Observable<boolean>;
  isCurrenciesBudgetsError$!: Observable<boolean>;
  isRecentOperationsEmpty$!: Observable<boolean>;
  currentDate$!: Observable<Date>;

  constructor(private router: Router, private service: OverviewPageService) {}

  ngOnInit(): void {
    this.currenciesBudgets$ = this.service.currenciesBudgets$;
    this.recentOperations$ = this.service.recentOperations$;
    this.isRecentOperationsLoading$ = this.service.isRecentOperationsLoading$;
    this.isCurrenciesBudgetsLoading$ = this.service.isCurrenciesBudgetsLoading$;
    this.isRecentOperationsError$ = this.service.isRecentOperationsError$;
    this.isCurrenciesBudgetsError$ = this.service.isCurrenciesBudgetsError$;
    this.isRecentOperationsEmpty$ = this.service.isRecentOperationsEmpty$;
    this.currentDate$ = this.service.currentDate$;
  }

  gotoOperationsPage(currencyId: number) {
    this.router.navigate(['overview', currencyId]);
  }

  setDate(date: Date) {
    this.service.setDate(date);
  }

  onClickOperation(id: number) {
    this.router.navigate(['operations', id]);
  }

  gotoNewOperation() {
    this.router.navigate(['operations', 'new']);
  }
}
