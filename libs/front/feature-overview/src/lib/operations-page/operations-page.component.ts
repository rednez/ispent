import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BudgetSummary,
  BudgetSummaryType,
  Operation,
} from '@ispent/front/data-access';
import { Observable } from 'rxjs';
import { BreadcrumbsItem } from '../ui/breadcrumbs/breadcrumbs.component';
import { OperationsPageService } from './operations-page.service';

@Component({
  templateUrl: './operations-page.component.html',
  styleUrls: ['./operations-page.component.scss'],
})
export class OperationsPageComponent implements OnInit {
  routeDataType!: BudgetSummaryType;
  isCategoryRouteDataType = false;
  breadcrumbs$!: Observable<BreadcrumbsItem[]>;
  oneBudgetSummary$!: Observable<BudgetSummary>;
  budgetSummaryChips$!: Observable<BudgetSummary[]>;
  operations$!: Observable<Operation[]>;
  isOneBudgetSummaryLoading$!: Observable<boolean>;
  isOneBudgetSummaryError$!: Observable<boolean>;
  isOperationsLoading$!: Observable<boolean>;
  isOperationsError$!: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: OperationsPageService
  ) {
    service.setRouteParams(route.params);
    service.setRouteData(route.data);
  }

  ngOnInit(): void {
    this.routeDataType = this.route.snapshot.data['type'];
    this.isCategoryRouteDataType =
      this.routeDataType === BudgetSummaryType.Category;
    this.breadcrumbs$ = this.service.getBreadcrumbs();
    this.oneBudgetSummary$ = this.service.getOneBudgetSummary();
    this.budgetSummaryChips$ = this.service.getBudgetSummariesList();
    this.operations$ = this.service.getOperations();
    this.isOneBudgetSummaryLoading$ = this.service.isOneBudgetSummaryLoading$;
    this.isOneBudgetSummaryError$ = this.service.isOneBudgetSummaryError$;
    this.isOperationsLoading$ = this.service.isOperationsLoading$;
    this.isOperationsError$ = this.service.isOperationsError$;
  }

  gotoBack(link: string[]) {
    this.router.navigate(link);
  }

  onChipClick(id: number) {
    const { currency, group } = this.route.snapshot.params;

    if (this.routeDataType === BudgetSummaryType.Currency && currency) {
      this.router.navigate(['overview', currency, id]);
    } else if (
      this.routeDataType === BudgetSummaryType.Group &&
      currency &&
      group
    ) {
      this.router.navigate(['overview', currency, group, id]);
    }
  }

  onClickOperation(id: number) {
    this.router.navigate(['operations', id]);
  }

  gotoNewOperation() {
    this.router.navigate(['operations', 'new']);
  }

  onEditBudgetSummaryItem(budgetSummary: BudgetSummary) {
    switch (budgetSummary.type) {
      case 'CURRENCY':
        this.service.editCurrency(budgetSummary.parentId);
        break;
      case 'GROUP':
        this.service.editGroup(budgetSummary.parentId);
        break;
      case 'CATEGORY':
        this.service.editCategory(budgetSummary.parentId);
        break;
      default:
        break;
    }
  }
}
