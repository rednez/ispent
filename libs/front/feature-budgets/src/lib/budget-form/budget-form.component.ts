import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

@Component({
  selector: 'ispent-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
  providers: [ParentBudgetEntitiesService],
})
export class BudgetFormComponent implements OnInit {
  currenciesList = [
    { id: 1, name: 'UAH' },
    { id: 2, name: 'CZK' },
  ];

  groupsList = [
    { id: 1, name: 'Group1' },
    { id: 2, name: 'Group2' },
    { id: 3, name: 'Group3' },
    { id: 4, name: 'Group4' },
  ];

  categoriesList = [
    { id: 1, name: 'c1' },
    { id: 2, name: 'c2' },
    { id: 3, name: 'c3' },
    { id: 4, name: 'c4' },
  ];

  form = this.fb.group(
    {
      currencies: this.fb.array([
        {
          id: 1,
          groups: [
            {
              id: 1,
              categories: [
                { id: 1, amount: 1100, planned: 1100, spent: 190 },
                { id: 2, amount: 800, planned: 800, spent: 800 },
              ],
            },
            {
              id: 2,
              categories: [
                { id: 3, amount: 1500, planned: 1500, spent: 1890.9 },
                { id: 4, amount: 500, planned: 500, spent: 456.78 },
              ],
            },
          ],
        },
        {
          id: 2,
          groups: [
            {
              id: 1,
              categories: [
                { id: 3, amount: 100, planned: 100, spent: 90 },
                { id: 4, amount: 100, planned: 100, spent: 90 },
              ],
            },
          ],
        },
      ]),
    },
    {}
  );

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService
  ) {}

  get currencies() {
    return this.form.get('currencies') as FormArray;
  }

  ngOnInit(): void {
    this.parentBudgetEntities.setAllEntities(this.currenciesList);
  }

  onAddCurrency() {
    this.currencies.push(new FormControl({ id: null, groups: [] }));
  }

  onRemoveCurrency(index: number, currencyId: number) {
    this.currencies.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(currencyId);
  }

  test() {
    console.log(this.form);
  }
}
