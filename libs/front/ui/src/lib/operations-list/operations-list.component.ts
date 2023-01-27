import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Operation } from '@ispent/front/data-access';
import { format } from 'date-fns';
import { entries, groupBy, pipe } from 'lodash/fp';

@Component({
  selector: 'ispent-operations-list',
  template: `
    <h3 *ngIf="title && isSuccessLoaded" class="px-4 pt-4 pb-2">
      {{ title }}
    </h3>

    <ispent-loadable-widget
      *ngIf="!isSuccessLoaded; else contentState"
      [isLoading]="isLoading"
      [isError]="isError"
      [isEmpty]="isEmpty"
      [emptyText]="'There are no operations for this period' | translate"
      [errorText]="'Failed data' | translate"
    ></ispent-loadable-widget>

    <ng-template #contentState>
      <div *ngFor="let group of operationsGroupedByDate">
        <ispent-operations-list-group-header>
          {{ group[0] | shortDate | translate }}
        </ispent-operations-list-group-header>

        <div class="px-2 sm:px-4">
          <ispent-operation-item
            *ngFor="let item of group[1]"
            [amount]="item.amount"
            [currency]="item.currency.name"
            [groupName]="item.group.name"
            [groupColor]="item.group.color!"
            [categoryName]="item.category.name"
            [categoryColor]="item.category.color!"
            [withdrawalAmount]="item.withdrawalAmount!"
            [withdrawalCurrency]="item.withdrawalCurrencyName!"
            [date]="item.dateTime"
            (click)="clickItem.emit(item.id)"
          ></ispent-operation-item>
        </div>
      </div>
    </ng-template>
  `,
})
export class OperationsListComponent implements OnChanges {
  @Input() title = '';
  @Input() operations: Operation[] = [];
  @Input() isLoading = false;
  @Input() isError = false;
  @Output() clickItem = new EventEmitter<number>();

  operationsGroupedByDate!: Array<[string, Operation[]]>;

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

  ngOnChanges(changes: SimpleChanges): void {
    const { operations } = changes;

    if (operations && Array.isArray(operations.currentValue)) {
      this.operationsGroupedByDate = this.groupOperations(
        operations.currentValue
      );
    }
  }

  private groupOperations(
    operations: Operation[]
  ): Array<[string, Operation[]]> {
    return pipe(
      groupBy((i: Operation) => format(new Date(i.dateTime), 'yyyy-MM-dd')),
      entries
    )(operations);
  }
}
