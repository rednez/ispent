import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { BudgetSummary } from '@ispent/front/data-access';

@Component({
  selector: 'ispent-budgets-summaries-block',
  template: `
    <ispent-loadable-widget
      *ngIf="!isSuccessLoaded; else contentState"
      [isLoading]="isLoading"
      [isError]="isError"
      [isEmpty]="isEmpty"
      [emptyText]="'There are no budgets summaries for this period'"
    ></ispent-loadable-widget>

    <ng-template #contentState>
      <ispent-budget-summary-widget
        *ngFor="let budget of budgets"
        [title]="budget.title"
        [planed]="budget.planned"
        [spent]="budget.spent"
        (click)="clickBudget.emit(budget.parentId)"
      ></ispent-budget-summary-widget>
    </ng-template>
  `,
})
export class BudgetsSummariesBlockComponent {
  @Input() budgets: BudgetSummary[] = [];
  @Input() isLoading = false;
  @Input() isError = false;
  @Output() clickBudget = new EventEmitter<number>();

  @HostBinding('class')
  get hostClass() {
    return this.isSuccessLoaded
      ? 'flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4'
      : 'block h-36';
  }

  get isEmpty(): boolean {
    return !this.budgets?.length;
  }

  get isSuccessLoaded(): boolean {
    return !this.isLoading && !this.isError && !this.isEmpty;
  }
}
