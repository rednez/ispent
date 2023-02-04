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
import { FormData } from '../data';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

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
  @Input() errorMessage = '';
  @Output() saveForm = new EventEmitter<FormData>();
  @Output() generateBudget = new EventEmitter();
  @Output() deleteBudget = new EventEmitter();

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
    const { currenciesList, formData } = changes;

    if (formData) {
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
