import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqNameValidator(list: Array<{ name: string }>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.value;
    const existedItem = list.find((i) => i.name === controlValue);
    return existedItem ? { uniqName: controlValue } : null;
  };
}
