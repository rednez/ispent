import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <mat-card>
      <mat-card-header class="mb-4">
        <mat-card-title>
          <h1>{{ 'Create currency' | translate }}</h1>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="mb-4">
        <mat-form-field>
          <mat-label>{{ 'Currency name' | translate }}</mat-label>
          <input matInput [formControl]="currency" />
          <mat-error *ngIf="currency.errors">{{
            errorText | translate
          }}</mat-error>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions
        class="space-x-2"
        [class.mb-3]="!loading"
        [class.mb-2]="loading"
      >
        <button mat-button (click)="close()">{{ 'Cancel' | translate }}</button>
        <button mat-flat-button color="primary" (click)="onClickCreate()">
          {{ 'Create' | translate }}
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
export class DialogCreateCurrencyComponent {
  @Input() loading = false;
  @Output() create = new EventEmitter<string>();

  currency = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(3),
  ]);

  constructor(private dialogRef: MatDialogRef<DialogCreateCurrencyComponent>) {}

  get errorText(): string {
    const errors = this.currency.errors;
    if (errors) {
      return errors['required']
        ? 'Must be filled'
        : errors['minlength'] || errors['maxlength']
        ? 'The length must be 3'
        : '';
    } else {
      return '';
    }
  }

  close() {
    this.dialogRef.close();
  }

  onClickCreate() {
    if (this.currency.valid) {
      this.create.emit(this.currency.value as string);
    }
  }
}
