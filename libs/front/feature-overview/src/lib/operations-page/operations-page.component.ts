import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetSummary, Operation } from '@ispent/shared/data-access';
import { Observable } from 'rxjs';
import { BreadcrumbsItem } from '../ui/breadcrumbs/breadcrumbs.component';
import { OperationsPageService } from './operations-page.service';

@Component({
  templateUrl: './operations-page.component.html',
  styleUrls: ['./operations-page.component.scss'],
})
export class OperationsPageComponent implements OnInit {
  breadcrumbs$!: Observable<BreadcrumbsItem[]>;
  oneBudgetSummary$!: Observable<BudgetSummary>;
  budgetSummaryChips$!: Observable<BudgetSummary[]>;
  operations$!: Observable<Operation[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: OperationsPageService
  ) {
    service.setRouteParams(route.params);
  }

  ngOnInit(): void {
    this.breadcrumbs$ = this.service.getBreadcrumbs();
    this.oneBudgetSummary$ = this.service.getOneBudgetSummary();
    this.budgetSummaryChips$ = this.service.getBudgetSummariesList();
    this.operations$ = this.service.getOperations();
  }

  gotoBack(link: string[]) {
    this.router.navigate(link);
  }
}
