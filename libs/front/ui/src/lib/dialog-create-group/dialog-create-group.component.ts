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
import { Group } from '@ispent/front/data-access';
import { uniqNameValidator } from '../validators';

@Component({
  template: ` <mat-card>
    <mat-card-header class="mb-4">
      <mat-card-title>
        <h1>{{ 'Create group' | translate }}</h1>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content class="mb-4">
      <form (ngSubmit)="onClickCreate()">
        <mat-form-field>
          <mat-label>{{ 'Group name' | translate }}</mat-label>
          <input matInput [formControl]="group" />
          <mat-error *ngIf="group.errors">{{
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
      <button mat-flat-button color="primary" (click)="onClickCreate()">
        {{ 'Create' | translate }}
      </button>
    </mat-card-actions>
    <mat-card-footer>
      <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
    </mat-card-footer>
  </mat-card>`,
})
export class DialogCreateGroupComponent implements OnInit {
  @Input() loading = false;
  @Output() create = new EventEmitter<string>();

  group = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groups: Group[] }
  ) {}

  ngOnInit(): void {
    if (this.data?.groups?.length) {
      this.group.addValidators([uniqNameValidator(this.data.groups)]);
    }
  }

  get errorText(): string {
    const errors = this.group.errors;
    if (errors) {
      return errors['required']
        ? 'Must be filled'
        : errors['uniqName']
        ? 'The group already exists'
        : '';
    } else {
      return '';
    }
  }

  close() {
    this.dialogRef.close();
  }

  onClickCreate() {
    if (this.group.valid) {
      this.create.emit(this.group.value as string);
    }
  }
}
