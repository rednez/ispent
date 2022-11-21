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
import { BudgetEntity } from '../data';

@Component({
  selector: 'ispent-budget-group-header',
  templateUrl: './budget-group-header.component.html',
  styleUrls: ['./budget-group-header.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BudgetGroupHeaderComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BudgetGroupHeaderComponent,
      multi: true,
    },
  ],
})
export class BudgetGroupHeaderComponent
  implements ControlValueAccessor, Validator
{
  @Input() total = 0;
  @Input() groupsList: BudgetEntity[] = [];
  @Input() isLast = false;
  @Output() addGroup = new EventEmitter();
  @Output() removeGroup = new EventEmitter();

  groupId = new FormControl(null as number | null, {
    validators: Validators.required,
  });

  private onTouched: VoidFunction | undefined;

  registerOnChange(fn: VoidFunction): void {
    this.groupId.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.groupId.disable();
    } else {
      this.groupId.enable();
    }
  }

  writeValue(id: number): void {
    this.groupId.setValue(id);
    // this.groupId.markAsTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.groupId.invalid ? this.groupId.errors : null;
  }
}
