import { Component, HostBinding, Input } from '@angular/core';
import { BudgetSummary } from '@ispent/front/data-access';

@Component({
  selector: 'ispent-one-budget-summary-block',
  template: `
    <ispent-loadable-widget
      *ngIf="!isSuccessLoaded; else contentState"
      [isLoading]="isLoading"
      [isError]="isError"
      [isEmpty]="isEmpty"
      [emptyText]="'There are no budgets summaries for this period' | translate"
      [errorText]="'Failed data' | translate"
    ></ispent-loadable-widget>

    <ng-template #contentState>
      <ispent-budget-summary-widget
        [title]="budget.title"
        [planed]="budget.planned"
        [spent]="budget.spent"
        [isClickable]="false"
      ></ispent-budget-summary-widget>
    </ng-template>
  `,
})
export class OneBudgetSummaryBlockComponent {
  @Input() budget!: BudgetSummary;
  @Input() isLoading = false;
  @Input() isError = false;

  get isEmpty(): boolean {
    return !this.budget;
  }

  get isSuccessLoaded(): boolean {
    return !this.isLoading && !this.isError && !this.isEmpty;
  }

  @HostBinding('class')
  get hostCLass() {
    return this.isSuccessLoaded
      ? 'block sm:w-1/2 lg:w-2/5 mx-auto'
      : 'block sm:w-1/2 lg:w-2/5 mx-auto h-36';
  }
}
