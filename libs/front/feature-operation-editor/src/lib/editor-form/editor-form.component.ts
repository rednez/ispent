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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Category,
  Currency,
  Group,
  Operation,
} from '@ispent/front/data-access';
import { prop, isEqual, negate, pipe } from 'lodash/fp';
import { map, Subject, takeUntil } from 'rxjs';
import { EditorFormService } from './editor-form.service';

export interface SubmitEventData {
  id?: number;
  amount: number;
  currencyId: number;
  groupId: number;
  categoryId: number;
  date: Date;
  isOtherWithdrawalCurrency: boolean;
  withdrawalAmount?: number;
  withdrawalCurrencyId?: number;
  comment?: string;
}

@Component({
  selector: 'ispent-editor-form',
  templateUrl: './editor-form.component.html',
  styles: [
    `
      :host {
        @apply block border rounded-md mx-auto p-6 bg-white max-w-md;
      }
    `,
  ],
})
export class EditorFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: number | null = null;
  @Input() currencies: Currency[] = [];
  @Input() groups: Group[] = [];
  @Input() operation?: Operation;
  @Output() clickCancel = new EventEmitter();
  @Output() clickDelete = new EventEmitter<number>();
  @Output() clickSubmit = new EventEmitter<SubmitEventData>();
  @Output() createCurrency = new EventEmitter();
  @Output() createGroup = new EventEmitter();
  @Output() createCategory = new EventEmitter<{ parentGroupId: number }>();

  readonly maxCommentLength = 128;

  operationForm!: FormGroup;
  rate = 0;
  categories: Category[] = [];
  withdrawalCurrencies: Currency[] = [];
  private onDestroy$ = new Subject();

  constructor(private fb: FormBuilder, private service: EditorFormService) {}

  get isEdit(): boolean {
    return !!this.id;
  }

  get isOtherWithdrawalCurrency(): boolean {
    return !!this.operationForm?.get('isOtherWithdrawalCurrency')?.value;
  }

  get headerTitle(): string {
    return this.isEdit ? 'Edit Operation' : 'New Operation';
  }

  get submitButtonTitle(): string {
    return this.isEdit ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.buildForm();
    this.subscribeToFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currencies, operation, groups } = changes;

    if (currencies && currencies.currentValue?.length) {
      this.withdrawalCurrencies = [...currencies.currentValue];
    }

    if (operation?.currentValue) {
      const {
        amount,
        currency,
        group,
        category,
        dateTime,
        withdrawalAmount,
        withdrawalCurrencyId,
        comment,
      } = operation.currentValue as Operation;
      this.operationForm?.setValue({
        amount: amount,
        currencyId: currency.id,
        groupId: group.id,
        categoryId: category.id,
        date: new Date(dateTime),
        withdrawalAmount: withdrawalAmount,
        withdrawalCurrencyId: withdrawalCurrencyId,
        isOtherWithdrawalCurrency: !!withdrawalCurrencyId,
        comment,
      });
    }

    if (groups?.currentValue && this.operationForm?.get('groupId')?.value) {
      const group = groups.currentValue.find(
        pipe(prop('id'), isEqual(this.operationForm.get('groupId')?.value))
      ) as Group;
      if (group) {
        this.categories = group.categories as Category[];
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onClickSubmit() {
    this.operationForm.markAllAsTouched();
    this.operationForm.updateValueAndValidity();
    if (this.operationForm.valid) {
      this.clickSubmit.emit({
        ...this.operationForm.value,
        id: this.id,
      });
    }
  }

  onCreateCurrency() {
    this.createCurrency.emit();
  }

  onCreateGroup() {
    this.createGroup.emit();
  }

  onCreateCategory() {
    if (this.operationForm.get('groupId')?.value) {
      this.createCategory.emit({
        parentGroupId: this.operationForm.get('groupId')?.value,
      });
    }
  }

  hasErrorIn(formControlName: string) {
    return this.operationForm?.get(formControlName)?.errors;
  }

  private buildForm() {
    this.operationForm = this.fb.group({
      amount: [0, [Validators.required]],
      currencyId: [null, [Validators.required]],
      groupId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      date: [new Date(), [Validators.required]],
      isOtherWithdrawalCurrency: false,
      withdrawalAmount: null,
      withdrawalCurrencyId: null,
      comment: ['', [Validators.maxLength(this.maxCommentLength)]],
    });
  }

  private subscribeToFormChanges() {
    if (!this.operationForm) {
      return;
    }

    this.operationForm
      .get('amount')
      ?.valueChanges.pipe(
        map((amount) =>
          this.service.computeWithdrawalRate(
            amount,
            this.operationForm.get('withdrawalAmount')?.value
          )
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe((rate) => (this.rate = rate));

    this.operationForm
      .get('withdrawalAmount')
      ?.valueChanges.pipe(
        map((withdrawalAmount) =>
          this.service.computeWithdrawalRate(
            this.operationForm.get('amount')?.value,
            withdrawalAmount
          )
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe((rate) => (this.rate = rate));

    this.operationForm
      .get('isOtherWithdrawalCurrency')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((checked) => {
        const withdrawalAmountControl =
          this.operationForm.get('withdrawalAmount');
        const withdrawalCurrencyId = this.operationForm.get(
          'withdrawalCurrencyId'
        );

        if (checked) {
          withdrawalAmountControl?.addValidators([Validators.required]);
          withdrawalCurrencyId?.addValidators([Validators.required]);
        } else {
          withdrawalAmountControl?.reset();
          withdrawalCurrencyId?.reset();
          withdrawalAmountControl?.removeValidators(Validators.required);
          withdrawalCurrencyId?.removeValidators(Validators.required);
          withdrawalAmountControl?.updateValueAndValidity();
          withdrawalCurrencyId?.updateValueAndValidity();
        }
      });

    this.operationForm
      .get('groupId')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((groupId) => {
        const group = this.groups.find(pipe(prop('id'), isEqual(groupId)));
        if (group) {
          this.categories = group.categories as Category[];
          this.operationForm.get('categoryId')?.reset();
        }
      });

    this.operationForm
      .get('currencyId')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((id) => {
        this.withdrawalCurrencies = this.currencies.filter(
          pipe(prop('id'), negate(isEqual(id)))
        );
        if (this.operationForm.get('isOtherWithdrawalCurrency')?.value) {
          this.operationForm.get('withdrawalCurrencyId')?.reset();
        }
      });
  }
}
