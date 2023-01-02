import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency, Group } from '@ispent/front/data-access';
import { timer } from 'rxjs';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';
import { FormData } from '../data';

@Component({
  selector: 'ispent-budget-form',
  templateUrl: './budget-form.component.html',
  providers: [ParentBudgetEntitiesService],
})
export class BudgetFormComponent implements OnChanges {
  @Input() currenciesList: Currency[] = [];
  @Input() groupsList: Group[] = [];
  @Input() formData!: FormData;
  @Input() isLoading = true;
  @Input() isError = false;
  @Input() isSaving = false;
  @Output() saveForm = new EventEmitter<FormData>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService
  ) {}

  @HostBinding('class')
  get hostClass() {
    return this.isSuccessLoaded
      ? 'block space-y-4 p-4 bg-white border rounded-md'
      : 'block h-36';
  }

  get currencies() {
    return this.form.get('currencies') as FormArray;
  }

  get isSuccessLoaded(): boolean {
    return !this.isLoading && !this.isError;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isLoading, currenciesList, formData } = changes;

    if (isLoading && !isLoading.currentValue) {
      this.buildForm(formData?.currentValue);
      this.parentBudgetEntities.reset();
    }
    if (currenciesList) {
      this.parentBudgetEntities.setAllEntities(currenciesList.currentValue);
    }
  }

  onAddCurrency() {
    this.currencies.push(new FormControl({ id: null, groups: [] }));
  }

  onRemoveCurrency(index: number, currencyId: number) {
    this.currencies.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(currencyId);
  }

  onSaveForm() {
    if (this.form.valid) {
      this.saveForm.emit(this.form.value);
    }
  }

  private buildForm(data?: FormData) {
    this.form = this.fb.group({
      currencies: this.fb.array(data ? data.currencies : []),
    });

    timer(0).subscribe(() => this.form.markAsPristine());
  }
}
