import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Category, Group } from '@ispent/front/data-access';
import { equals, flatten, pipe, pluck, prop, sum } from 'ramda';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { FormBudgetCurrency, FormBudgetEntity } from '../data';
import { ParentBudgetEntitiesService } from '../parent-budget-entities.service';

@Component({
  selector: 'ispent-budget-currency',
  templateUrl: './budget-currency.component.html',
  styleUrls: ['./budget-currency.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BudgetCurrencyComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BudgetCurrencyComponent,
      multi: true,
    },
    ParentBudgetEntitiesService,
    ChildBudgetEntitiesService,
  ],
})
export class BudgetCurrencyComponent
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator
{
  @Input() groupsList: Group[] = [];
  @Input() isLast = false;
  @Output() addCurrency = new EventEmitter();
  @Output() removeCurrency = new EventEmitter<number>();

  currencies$!: Observable<FormBudgetEntity[]>;
  form!: FormGroup;
  totalAmount$!: Observable<number>;

  private onTouched: VoidFunction | undefined;
  private onDestroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService,
    private childBudgetEntities: ChildBudgetEntitiesService
  ) {}

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  ngOnInit(): void {
    this.buildForm();

    this.form
      .get('id')
      ?.valueChanges.pipe(
        tap(this.childBudgetEntities.addSelectedEntityId),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.totalAmount$ = this.form.valueChanges.pipe(
      map(this.computeTotalAmount)
    );

    this.currencies$ = this.childBudgetEntities.availableEntities;
  }

  private computeTotalAmount = (params: {
    groups: Array<{ categories: Array<{ amount: number }> }>;
  }) => {
    return pipe(
      pluck('categories'),
      flatten,
      pluck('amount'),
      sum
    )(params.groups);
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { groupsList } = changes;
    if (groupsList) {
      this.parentBudgetEntities.setAllEntities(groupsList.currentValue);
    }
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

  writeValue(obj: FormBudgetCurrency): void {
    if (obj) {
      Promise.resolve().then(() => {
        this.form.patchValue({ id: obj.id });
        obj.groups.forEach((i) => this.groups.push(new FormControl(i)));
      });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let result: Record<string, boolean> | null = null;

    if (!control.value?.id) {
      result = { requiredCurrencyId: true };
    }
    if (!control.value?.groups?.length) {
      result = { ...result, requireAtLeastOneGroup: true };
    }
    if (this.form.invalid) {
      result = { ...result, invalidSomeCurrencyChildren: true };
    }

    return result;
  }

  onAddGroup() {
    this.groups.push(new FormControl({ id: null, categories: [] }));
  }

  onRemoveGroup(index: number, groupId: number) {
    this.groups.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(groupId);
  }

  getCategoriesList(groupId: number): Category[] {
    const group = this.groupsList?.find(pipe(prop('id'), equals(groupId)));
    return (group && group.categories) || [];
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null as number | null, [Validators.required]],
      groups: this.fb.array([]),
    });
  }
}
