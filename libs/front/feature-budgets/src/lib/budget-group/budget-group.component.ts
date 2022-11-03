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
  FormArray,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { add, get, map as fpMap, pipe, reduce } from 'lodash/fp';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { BudgetEntity, BudgetGroup } from '../data';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

@Component({
  selector: 'ispent-budget-group',
  templateUrl: './budget-group.component.html',
  styleUrls: ['./budget-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BudgetGroupComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BudgetGroupComponent,
      multi: true,
    },
    ParentBudgetEntitiesService,
    ChildBudgetEntitiesService,
  ],
})
export class BudgetGroupComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @Input() categoriesList: BudgetEntity[] = [];
  @Input() isLast = false;
  @Output() remove = new EventEmitter<number>();
  @Output() add = new EventEmitter();

  groups$?: Observable<BudgetEntity[]>;

  form = this.fb.group({
    id: null as number | null,
    categories: this.fb.array([]),
  });

  totalAmount$: Observable<number> = this.form.valueChanges.pipe(
    map(pipe(get('categories'), fpMap(get('amount')), reduce(add, 0)))
  );

  private onTouched: VoidFunction | undefined;
  private onDestroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService,
    private childBudgetEntities: ChildBudgetEntitiesService
  ) {}

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  ngOnInit(): void {
    this.parentBudgetEntities.setAllEntities(this.categoriesList);

    this.form
      .get('id')
      ?.valueChanges.pipe(
        tap(this.childBudgetEntities.addSelectedEntityId),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.groups$ = this.childBudgetEntities.availableEntities;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  registerOnChange(fn: VoidFunction): void {
    this.form.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(fn);
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

  writeValue(obj: BudgetGroup): void {
    if (obj) {
      this.form.patchValue({ id: obj.id });
      obj.categories.forEach((i) => this.categories.push(new FormControl(i)));

      Promise.resolve().then(() => this.form.updateValueAndValidity());
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { groupError: true } : null;
  }

  onAddCategory() {
    this.categories.push(
      new FormControl({ id: null, amount: 0, planned: 0, spent: 0 })
    );
  }

  onRemoveCategory(index: number, categoryId: number) {
    this.categories.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(categoryId);
  }
}
