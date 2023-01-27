import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ispent-budgets-empty-state',
  template: `
    <p class="text-center text-slate-700">
      <span>{{ 'There is no budget for this month yet.' | translate }} </span>
      <span>{{ 'You might create it manually by' | translate }} </span>
      <span class="action-text" (click)="setCurrency.emit()"
        >{{ 'setting the currency' | translate }}
      </span>
      <span>{{ 'or' | translate }} </span>
      <span class="action-text" (click)="generateBudget.emit()"
        >{{ 'generating' | translate }}
      </span>
      <span>{{ 'based on the previous month.' | translate }} </span>
    </p>
  `,
  styles: [
    `
      :host {
        @apply block border bg-slate-100 rounded-lg p-4;
      }

      .action-text {
        @apply underline decoration-dotted text-blue-500 cursor-pointer;
      }
    `,
  ],
})
export class BudgetsEmptyStateComponent {
  @Output() setCurrency = new EventEmitter();
  @Output() generateBudget = new EventEmitter();
}
