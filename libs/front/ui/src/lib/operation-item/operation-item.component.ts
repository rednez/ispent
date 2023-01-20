import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ispent-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.scss'],
})
export class OperationItemComponent implements OnInit {
  @Input() amount = 0;
  @Input() currency = '';
  @Input() groupName = '';
  @Input() groupColor = '';
  @Input() categoryName = '';
  @Input() categoryColor = '';
  @Input() date = '';
  @Input() withdrawalAmount?: number;
  @Input() withdrawalCurrency?: string;

  exchangeRate = 0;

  ngOnInit(): void {
    if (this.withdrawalAmount) {
      this.exchangeRate = this.withdrawalAmount / this.amount;
    }
  }
}
