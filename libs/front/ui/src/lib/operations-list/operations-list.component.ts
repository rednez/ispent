import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Operation } from '@ispent/front/data-access';

@Component({
  selector: 'ispent-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.scss'],
})
export class OperationsListComponent implements OnChanges {
  @Input() title = '';
  @Input() operations: Operation[] = [];
  @Input() isLoading = false;

  isEmpty = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { operations } = changes;
    if (operations?.currentValue) {
      this.isEmpty = !operations.currentValue.length;
    }
  }
}
