import { Component, Input } from '@angular/core';
import { Operation } from '@ispent/shared/data-access';

@Component({
  selector: 'ispent-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.scss'],
})
export class OperationsListComponent {
  @Input() title = '';
  @Input() operations: Operation[] = [];
}
