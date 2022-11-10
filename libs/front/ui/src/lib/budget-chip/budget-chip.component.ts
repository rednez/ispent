import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ispent-budget-chip',
  template: `
    <div
      class="flex divide-x p-2"
      mat-ripple
      [matRippleDisabled]="!isClickable"
      [ngClass]="setContainerClass()"
    >
      <span class="font-medium" [ngStyle]="setTitleColor()">{{ title }}</span>
      <span class="text-green-500">{{ planAmount | amount }}</span>
      <span class="text-red-500">{{ spentAmount | amount }}</span>
      <span>{{ remainsAmount | amount }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block w-fit border bg-white rounded-md text-sm;
      }
      span {
        padding: 0 4px;
      }
    `,
  ],
})
export class BudgetChipComponent implements OnInit {
  @Input() title = 'title';
  @Input() plan = 0;
  @Input() spent = 0;
  @Input() color = '';
  @Input() isClickable = true;

  planAmount = 0;
  spentAmount = 0;
  remainsAmount = 0;

  @HostBinding('style.border-color')
  get borderColor() {
    return this.color;
  }

  ngOnInit(): void {
    this.planAmount = this.plan / 1000;
    this.spentAmount = this.spent / 1000;
    this.remainsAmount = this.planAmount - this.spentAmount;
  }

  setTitleColor() {
    return {
      color: this.color,
    };
  }

  setContainerClass() {
    return {
      clickable: this.isClickable,
    };
  }
}
