import { Component, Input } from '@angular/core';

@Component({
  selector: 'ispent-budget-category-previous-data',
  templateUrl: './budget-category-previous-data.component.html',
  styleUrls: ['./budget-category-previous-data.component.scss'],
})
export class BudgetCategoryPreviousDataComponent {
  @Input() planned = 0;
  @Input() spent = 0;
}
