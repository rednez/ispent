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
import { randomColorHex } from '@ispent/shared/utils';
import { isEqual, pipe, prop } from 'lodash/fp';
import { uniqNameValidator } from '../validators';

@Component({
  template: ` <mat-card>
    <mat-card-header class="mb-4">
      <mat-card-title>
        <h1>{{ title | translate }}</h1>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content class="mb-4">
      <form (ngSubmit)="onSubmit()">
        <div class="flex items-start space-x-3">
          <mat-form-field>
            <mat-label>{{ 'Group name' | translate }}</mat-label>
            <input matInput [formControl]="group" />
            <mat-error *ngIf="group.errors">{{
              errorText | translate
            }}</mat-error>
          </mat-form-field>

          <input
            class="color-picker-input"
            [(colorPicker)]="color"
            [style.background]="color"
          />
        </div>
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
      <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>
    </mat-card-footer>
  </mat-card>`,
  styles: [
    `
      .color-picker-input {
        height: 32px;
        width: 32px;
        border-radius: 20px;
        margin-top: 14px;
        cursor: pointer;
      }
    `,
  ],
})
export class DialogCreateGroupComponent implements OnInit {
  @Input() loading = false;
  @Output() create = new EventEmitter<{
    name: string;
    color: string;
  }>();
  @Output() update = new EventEmitter<{
    id: number;
    name: string;
    color: string;
  }>();

  group = new FormControl('', [Validators.required]);
  color = randomColorHex();
  title = 'Create group';
  submitButtonTitle = 'Create';

  constructor(
    private dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groups: Group[]; id: number }
  ) {}

  ngOnInit(): void {
    if (this.data?.groups?.length) {
      this.group.addValidators([uniqNameValidator(this.data.groups)]);
    }
    if (this.isEdit) {
      this.title = 'Edit group';
      this.submitButtonTitle = 'Update';
      const editableGroup = this.editableGroup;
      if (editableGroup) {
        this.group.setValue(editableGroup.name);
        this.color = editableGroup.color as string;
      }
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

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  get editableGroup(): Group | undefined {
    if (!this.data?.groups?.length || !this.data?.id) {
      return undefined;
    }

    return this.data.groups.find(pipe(prop('id'), isEqual(this.data.id)));
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.group.valid) {
      if (this.isEdit) {
        this.update.emit({
          id: this.data.id,
          name: this.group.value as string,
          color: this.color,
        });
      } else {
        this.create.emit({
          name: this.group.value as string,
          color: this.color,
        });
      }
    }
  }
}
