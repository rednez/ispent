import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ispent-budget-summary-widget',
  templateUrl: './budget-summary-widget.component.html',
  styleUrls: ['./budget-summary-widget.component.scss'],
})
export class BudgetSummaryWidgetComponent implements OnInit {
  @Input() title = '';
  @Input() planed = 0;
  @Input() spent = 0;
  @Input() isClickable = true;
  @Input() isEditable = false;
  @Output() edit = new EventEmitter();

  remains = 0;

  ngOnInit(): void {
    this.remains = this.planed - this.spent;
  }
}
