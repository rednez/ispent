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

interface CreateCategoryEvent {
  groupId: number;
  name: string;
  color: string;
}

@Component({
  templateUrl: './dialog-create-category.component.html',
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
export class DialogCreateCategoryComponent implements OnInit {
  @Input() loading = false;
  @Output() create = new EventEmitter<CreateCategoryEvent>();
  @Output() update = new EventEmitter<{
    id: number;
    name: string;
    color: string;
  }>();

  category = new FormControl(null as null | string, [Validators.required]);
  parentGroupName?: string;
  color = randomColorHex();
  title = 'Create category';
  submitButtonTitle = 'Create';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { parentGroupId: number; groups: Group[]; id: number },
    private dialogRef: MatDialogRef<DialogCreateCategoryComponent>
  ) {}

  get errorText(): string {
    const errors = this.category.errors;
    if (errors) {
      return errors['required']
        ? 'Must be filled'
        : errors['uniqName']
        ? 'The category already exists'
        : '';
    } else {
      return '';
    }
  }

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  get parentGroup(): Group | undefined {
    if (!this.data?.groups?.length || !this.data?.parentGroupId) {
      return undefined;
    }
    return this.data.groups.find((i) => i.id === this.data.parentGroupId);
  }

  ngOnInit(): void {
    if (this.data?.groups?.length && this.data?.parentGroupId) {
      const parentGroup = this.parentGroup;
      if (parentGroup) {
        this.parentGroupName = parentGroup.name;
        if (parentGroup.categories?.length) {
          this.category.addValidators([
            uniqNameValidator(
              this.isEdit
                ? parentGroup.categories.filter((i) => i.id !== this.data.id)
                : parentGroup.categories
            ),
          ]);
          if (this.isEdit) {
            this.title = 'Edit category';
            this.submitButtonTitle = 'Update';
            const editableCategory = parentGroup.categories.find(
              pipe(prop('id'), isEqual(this.data.id))
            );
            if (editableCategory) {
              this.category.setValue(editableCategory.name);
              this.color = editableCategory.color as string;
            }
          }
        }
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.category.valid && this.data.parentGroupId) {
      if (this.isEdit) {
        this.update.emit({
          id: this.data.id,
          name: this.category.value as string,
          color: this.color,
        });
      } else {
        this.create.emit({
          name: this.category.value as string,
          groupId: this.data.parentGroupId,
          color: this.color,
        });
      }
    }
  }
}
