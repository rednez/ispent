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

interface CreateCategoryEvent {
  groupId: number;
  name: string;
}

@Component({
  templateUrl: './dialog-create-category.component.html',
})
export class DialogCreateCategoryComponent implements OnInit {
  @Input() loading = false;
  @Output() create = new EventEmitter<CreateCategoryEvent>();

  category = new FormControl(null as null | string, [Validators.required]);
  parentGroupName?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { parentGroupId: number; groups: Group[] },
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

  ngOnInit(): void {
    if (this.data?.groups?.length && this.data?.parentGroupId) {
      const parentGroup = this.data.groups.find(
        (i) => i.id === this.data.parentGroupId
      );
      if (parentGroup) {
        this.parentGroupName = parentGroup.name;
        if (parentGroup.categories?.length) {
          this.category.addValidators([
            uniqNameValidator(parentGroup.categories),
          ]);
        }
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onClickCreate() {
    if (this.category.valid && this.data.parentGroupId) {
      this.create.emit({
        name: this.category.value as string,
        groupId: this.data.parentGroupId,
      });
    }
  }
}
