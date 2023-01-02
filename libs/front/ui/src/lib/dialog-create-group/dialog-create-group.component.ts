import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ispent-dialog-create-group',
  template: ` <mat-card>
    <mat-card-header class="mb-4">
      <mat-card-title>
        <h1>{{ 'Create group' | translate }}</h1>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content class="mb-4">
      <mat-form-field>
        <mat-label>{{ 'Group name' | translate }}</mat-label>
        <input matInput [formControl]="group" />
        <mat-error *ngIf="group.errors">{{
          'Must be filled' | translate
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
      <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
    </mat-card-footer>
  </mat-card>`,
})
export class DialogCreateGroupComponent {
  @Input() loading = false;
  @Output() create = new EventEmitter<string>();

  group = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<DialogCreateGroupComponent>) {}

  close() {
    this.dialogRef.close();
  }

  onClickCreate() {
    if (this.group.valid) {
      this.create.emit(this.group.value as string);
    }
  }
}
