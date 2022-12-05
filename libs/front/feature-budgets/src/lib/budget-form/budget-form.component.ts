import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency, Group } from '@ispent/front/data-access';
import { timer } from 'rxjs';
import { BudgetsData } from '../edit-budget-page/edit-budget-page.service';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

@Component({
  selector: 'ispent-budget-form',
  templateUrl: './budget-form.component.html',
  providers: [ParentBudgetEntitiesService],
})
export class BudgetFormComponent implements OnChanges {
  @Input() currenciesList: Currency[] = [];
  @Input() groupsList: Group[] = [];
  @Input() budgetsData!: BudgetsData;
  @Input() isLoading = true;
  @Input() isError = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService
  ) {}

  @HostBinding('class')
  get hostClass() {
    return this.isSuccessLoaded
      ? 'block space-y-4 px-4 py-4 bg-white border rounded-md'
      : 'block h-36';
  }

  get currencies() {
    return this.form.get('currencies') as FormArray;
  }

  get isSuccessLoaded(): boolean {
    return !this.isLoading && !this.isError;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isLoading, currenciesList, budgetsData } = changes;

    if (!isLoading?.currentValue) {
      this.buildForm(budgetsData?.currentValue);
      this.parentBudgetEntities.reset();
      if (currenciesList) {
        this.parentBudgetEntities.setAllEntities(currenciesList.currentValue);
      }
    }
  }

  onAddCurrency() {
    this.currencies.push(new FormControl({ id: null, groups: [] }));
  }

  onRemoveCurrency(index: number, currencyId: number) {
    this.currencies.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(currencyId);
  }

  saveForm() {
    // TODO
    console.log(this.form);
  }

  private buildForm(data?: BudgetsData) {
    this.form = this.fb.group({
      currencies: this.fb.array(data ? data.currencies : []),
    });

    timer(0).subscribe(() => this.form.markAsPristine());
  }
}
