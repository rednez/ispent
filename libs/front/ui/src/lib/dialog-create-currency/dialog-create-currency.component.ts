import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Currency } from '@ispent/front/data-access';
import { isEqual, pipe, prop } from 'lodash/fp';
import { uniqNameValidator } from '../validators';

@Component({
  template: `
    <mat-card>
      <mat-card-header class="mb-4">
        <mat-card-title>
          <h1>{{ title | translate }}</h1>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="mb-4">
        <form (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>{{ 'Currency name' | translate }}</mat-label>
            <input matInput [formControl]="currency" />
            <mat-error *ngIf="currency.errors">{{
              errorText | translate
            }}</mat-error>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions
        class="space-x-2"
        [class.mb-3]="!loading"
        [class.mb-2]="loading"
      >
        <button mat-button (click)="close()">{{ 'Cancel' | translate }}</button>
        <button mat-flat-button color="primary" (click)="onSubmit()">
          {{ submitButtonTitle | translate }}
        </button>
      </mat-card-actions>
      <mat-card-footer>
        <mat-progress-bar
          *ngIf="loading"
          mode="indeterminate"
        ></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [],
})
export class DialogCreateCurrencyComponent implements OnInit {
  @Input() loading = false;
  @Output() create = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: number; name: string }>();

  title = 'Create currency';
  submitButtonTitle = 'Create';

  currency = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(3),
  ]);

  constructor(
    private dialogRef: MatDialogRef<DialogCreateCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { currencies: Currency[]; id: number }
  ) {}

  ngOnInit(): void {
    if (this.data?.currencies?.length) {
      this.currency.addValidators([uniqNameValidator(this.data.currencies)]);
    }
    if (this.isEdit) {
      this.title = 'Edit currency';
      this.submitButtonTitle = 'Update';
      this.currency.setValue(this.currencyName);
    }
  }

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  get errorText(): string {
    const errors = this.currency.errors;
    if (errors) {
      return errors['required']
        ? 'Must be filled'
        : errors['minlength'] || errors['maxlength']
        ? 'The length must be 3'
        : errors['uniqName']
        ? 'The currency already exists'
        : '';
    } else {
      return '';
    }
  }

  get currencyName(): string {
    if (!this.data?.currencies?.length || !this.data?.id) {
      return '';
    }

    const currency = this.data.currencies.find(
      pipe(prop('id'), isEqual(this.data.id))
    );
    return currency ? currency.name : '';
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.currency.valid) {
      if (this.isEdit) {
        this.update.emit({
          id: this.data.id,
          name: this.currency.value as string,
        });
      } else {
        this.create.emit(this.currency.value as string);
      }
    }
  }
}
