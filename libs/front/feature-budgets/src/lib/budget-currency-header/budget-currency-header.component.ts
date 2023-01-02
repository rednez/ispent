import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ActionsService } from '@ispent/front/data-access';
import { FormBudgetEntity } from '../data';

@Component({
  selector: 'ispent-budget-currency-header',
  templateUrl: './budget-currency-header.component.html',
  styleUrls: ['./budget-currency-header.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BudgetCurrencyHeaderComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BudgetCurrencyHeaderComponent,
      multi: true,
    },
  ],
})
export class BudgetCurrencyHeaderComponent
  implements ControlValueAccessor, Validator
{
  @Input() currenciesList: FormBudgetEntity[] = [];
  @Input() total = 0;
  @Input() isLast = false;
  @Output() addCurrency = new EventEmitter();
  @Output() removeCurrency = new EventEmitter();

  currencyId = new FormControl(null as number | null, {
    validators: Validators.required,
  });

  private onTouched: VoidFunction | undefined;

  constructor(private actions: ActionsService) {}

  registerOnChange(fn: VoidFunction): void {
    this.currencyId.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.currencyId.disable();
    } else {
      this.currencyId.enable();
    }
  }

  writeValue(id: number): void {
    this.currencyId.setValue(id);
    this.currencyId.markAsTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.currencyId.invalid ? this.currencyId.errors : null;
  }

  onCreateCurrency() {
    this.actions.createCurrency$.next(null);
  }
}
