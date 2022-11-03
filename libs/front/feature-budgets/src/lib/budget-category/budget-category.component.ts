import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { BudgetCategory, BudgetEntity } from '../data';

@Component({
  selector: 'ispent-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BudgetCategoryComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BudgetCategoryComponent,
      multi: true,
    },
    ChildBudgetEntitiesService,
  ],
})
export class BudgetCategoryComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input() isLast = false;
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<number>();

  categories$?: Observable<BudgetEntity[]>;

  form = this.fb.group({
    id: [0, [Validators.required]],
    amount: [0, [Validators.required]],
    planned: [0],
    spent: [0],
  });

  private onTouched: VoidFunction | undefined;
  private onDestroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private service: ChildBudgetEntitiesService
  ) {}

  ngOnInit(): void {
    this.form
      .get('id')
      ?.valueChanges.pipe(
        tap(this.service.addSelectedEntityId),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.categories$ = this.service.availableEntities;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  registerOnChange(fn: CallableFunction): void {
    this.form.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((values) =>
        fn({ ...values, amount: parseFloat(String(values.amount)) | 0 })
      );
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(obj: BudgetCategory): void {
    if (obj) {
      this.form.setValue(obj);

      Promise.resolve().then(() => {
        this.form.updateValueAndValidity();
        this.form.markAllAsTouched();
      });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { categoryError: true } : null;
  }
}
