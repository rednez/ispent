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
import {
  ActionsService,
  BudgetsSummariesGQL,
  BudgetSummaryType,
  CurrentMonthService,
} from '@ispent/front/data-access';
import { add, get, isNil, map as fpMap, negate, pipe, reduce } from 'lodash/fp';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  skip,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ChildBudgetEntitiesService } from '../child-budget-entities.service';
import { FormBudgetEntity, FormBudgetGroup } from '../data';
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
  implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator
{
  @Input() categoriesList: FormBudgetEntity[] = [];
  @Input() currencyId!: number;
  @Input() isLast = false;
  @Output() remove = new EventEmitter<number>();
  @Output() add = new EventEmitter();

  groups$!: Observable<FormBudgetEntity[]>;
  form!: FormGroup;
  totalAmount$!: Observable<number>;
  private onTouched: VoidFunction | undefined;
  private onDestroy$ = new Subject();
  private categoriesSubscriptions = new Map<FormControl, Subscription>();

  constructor(
    private fb: FormBuilder,
    private parentBudgetEntities: ParentBudgetEntitiesService,
    private childBudgetEntities: ChildBudgetEntitiesService,
    private budgetsSummariesGQL: BudgetsSummariesGQL,
    private currentMonth: CurrentMonthService,
    private actions: ActionsService
  ) {}

  get categories() {
    return this.form.get('categories') as FormArray;
  }

  ngOnInit(): void {
    this.buildForm();
    this.groups$ = this.childBudgetEntities.availableEntities;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const categoriesList = changes['categoriesList'];
    if (categoriesList && categoriesList.currentValue?.length) {
      this.parentBudgetEntities.setAllEntities(categoriesList.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();

    this.categoriesSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
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

  writeValue(obj: FormBudgetGroup): void {
    if (obj) {
      Promise.resolve().then(() => {
        this.form.patchValue({ id: obj.id });
        obj.categories.forEach((i) => {
          const categoryControl = this.fb.nonNullable.control(i);
          this.categories.push(categoryControl);

          this.categoriesSubscriptions.set(
            categoryControl,
            this.createCategoryIdSubscription(categoryControl)
          );
        });

        this.form.updateValueAndValidity();
      });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let result: Record<string, boolean> | null = null;

    if (!control.value.id) {
      result = { requiredGroupId: true };
    }
    if (!control.value.categories?.length) {
      result = { ...result, requireAtLeastOneCategory: true };
    }
    if (this.form.invalid) {
      result = { ...result, invalidSomeGroupChildren: true };
    }

    return result;
  }

  onAddCategory() {
    const categoryControl = this.fb.nonNullable.control({
      id: null,
      amount: 0,
      planned: 0,
      spent: 0,
    });
    this.categories.push(categoryControl);

    this.categoriesSubscriptions.set(
      categoryControl,
      this.createCategoryIdSubscription(categoryControl)
    );
  }

  onCreateCategory() {
    if (this.form.value.id) {
      this.actions.createCategory$.next({ parentGroupId: this.form.value.id });
    }
  }

  onRemoveCategory(index: number, categoryId: number) {
    this.categories.removeAt(index);
    this.parentBudgetEntities.removeSelectedId(categoryId);
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null as number | null, [Validators.required]],
      categories: this.fb.array([]),
    });

    this.form
      .get('id')
      ?.valueChanges.pipe(
        tap(this.childBudgetEntities.addSelectedEntityId),
        tap(() => this.categories.clear()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.totalAmount$ = this.form.valueChanges.pipe(
      map(pipe(get('categories'), fpMap(get('amount')), reduce(add, 0)))
    );
  }

  private createCategoryIdSubscription(control: FormControl): Subscription {
    return control.valueChanges
      .pipe(
        skip(1),
        map(get('id')),
        filter(negate(isNil)),
        filter(() => !!this.currencyId && this.form.get('id')?.value),
        distinctUntilChanged(),
        switchMap(
          (categoryId) =>
            this.budgetsSummariesGQL.watch({
              params: {
                month: this.currentMonth.previousDateIso,
                type: BudgetSummaryType.Category,
                currencyId: this.currencyId,
                groupId: parseInt(this.form.value['id']),
                categoryId,
              },
            }).valueChanges
        ),
        map((query) => query.data.budgetsSummary[0])
      )
      .subscribe((budgetSummary) =>
        control.setValue({
          ...control.value,
          planned: budgetSummary?.planned | 0,
          spent: budgetSummary?.spent | 0,
        })
      );
  }
}
