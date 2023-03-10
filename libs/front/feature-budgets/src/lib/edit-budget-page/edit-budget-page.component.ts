import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency, Group } from '@ispent/front/data-access';
import { Observable, Subject, switchMap, take, takeUntil, timer } from 'rxjs';
import { FormData } from '../data';
import { EditBudgetPageService } from './edit-budget-page.service';

@Component({
  templateUrl: './edit-budget-page.component.html',
  styleUrls: ['./edit-budget-page.component.scss'],
})
export class EditBudgetPageComponent implements OnInit, OnDestroy {
  currentDate$!: Observable<Date>;
  isDataLoading$!: Observable<boolean>;
  isDataError$!: Observable<boolean>;
  isDataSaving$!: Observable<boolean>;
  currencies$!: Observable<Currency[]>;
  groups$!: Observable<Group[]>;
  budgetsData!: FormData;
  errorMessage = '';
  private onDestroy$ = new Subject();

  constructor(private service: EditBudgetPageService) {}

  ngOnInit(): void {
    this.currentDate$ = this.service.currentDate$;
    this.isDataLoading$ = this.service.isDataLoading$;
    this.isDataError$ = this.service.isDataError$;
    this.isDataSaving$ = this.service.isDataSaving$;
    this.currencies$ = this.service.currencies$;
    this.groups$ = this.service.groups$;
    this.loadInitData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onChangeDate(date: Date) {
    this.service.setDate(date);

    this.budgetsData = { currencies: [] };
    timer(1)
      .pipe(
        switchMap(() => this.service.loadBudgets()),
        take(1)
      )
      .subscribe((budgetsData) => {
        this.budgetsData = budgetsData;
      });
  }

  onSaveForm(formData: FormData) {
    this.service.saveFormData(formData);
  }

  onGenerateBudget() {
    this.service
      .generateBudget()
      .pipe(take(1))
      .subscribe({
        next: (budgetsData) => {
          this.budgetsData = budgetsData;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  onDeleteBudget() {
    this.service
      .deleteBudget()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.budgetsData = { currencies: [] };
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  private loadInitData() {
    this.service.initData$.pipe(take(1)).subscribe(({ budgetsData }) => {
      this.budgetsData = budgetsData;
    });

    this.service
      .onCreateCurrency$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();

    this.service.onCreateGroup$().pipe(takeUntil(this.onDestroy$)).subscribe();

    this.service
      .onCreateCategory$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }
}
