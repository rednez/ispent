import { Component, Input } from '@angular/core';

@Component({
  selector: 'ispent-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.scss'],
})
export class OperationItemComponent {
  @Input() amount = 0;
  @Input() currency = '';
  @Input() groupName = '';
  @Input() groupColor = '';
  @Input() categoryName = '';
  @Input() categoryColor = '';
  @Input() date = '';
}
