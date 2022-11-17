import { Component, HostBinding, Input } from '@angular/core';
import { Operation } from '@ispent/front/data-access';

@Component({
  selector: 'ispent-operations-list',
  template: `
    <h3 *ngIf="title && isSuccessLoaded" class="border-b px-4 py-4">
      {{ title }}
    </h3>

    <ispent-loadable-widget
      *ngIf="!isSuccessLoaded; else contentState"
      [isLoading]="isLoading"
      [isError]="isError"
      [isEmpty]="isEmpty"
      [emptyText]="'There are no operations for this period'"
    ></ispent-loadable-widget>

    <ng-template #contentState>
      <div class="py-2 px-2 sm:px-4 divide-y">
        <ispent-operation-item
          *ngFor="let item of operations"
          [amount]="item.amount"
          [currency]="item.currency"
          [groupName]="item.group.name"
          [groupColor]="item.group.color"
          [categoryName]="item.category.name"
          [categoryColor]="item.category.color"
          [date]="item.dateTime"
        ></ispent-operation-item></div
    ></ng-template>
  `,
})
export class OperationsListComponent {
  @Input() title = '';
  @Input() operations: Operation[] = [];
  @Input() isLoading = false;
  @Input() isError = false;

  @HostBinding('class')
  get hostClass() {
    return this.isSuccessLoaded
      ? 'block border bg-white rounded-md'
      : 'block h-36';
  }

  get isEmpty(): boolean {
    return !this.operations?.length;
  }

  get isSuccessLoaded(): boolean {
    return !this.isLoading && !this.isError && !this.isEmpty;
  }
}
