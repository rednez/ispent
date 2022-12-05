import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency, Group } from '@ispent/front/data-access';
import { Observable, Subscription } from 'rxjs';
import { BudgetsData, EditBudgetPageService } from './edit-budget-page.service';

@Component({
  templateUrl: './edit-budget-page.component.html',
  styleUrls: ['./edit-budget-page.component.scss'],
})
export class EditBudgetPageComponent implements OnInit, OnDestroy {
  currentDate$!: Observable<Date>;
  isDataLoading$!: Observable<boolean>;
  currencies: Currency[] = [];
  groups: Group[] = [];
  budgetsData!: BudgetsData;
  dataSubscription!: Subscription;

  constructor(private service: EditBudgetPageService) {}

  ngOnInit(): void {
    this.currentDate$ = this.service.currentDate$;
    this.isDataLoading$ = this.service.isDataLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  onChangeDate(date: Date) {
    this.service.setDate(date);
  }

  private loadData() {
    this.dataSubscription = this.service.data$.subscribe(
      ({ currencies, groups, budgetsData }) => {
        this.currencies = currencies;
        this.groups = groups;
        this.budgetsData = budgetsData;
      }
    );
  }
}
