import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface CreateCategoryEvent {
  groupId: number;
  name: string;
}

@Component({
  selector: 'ispent-dialog-create-category',
  templateUrl: './dialog-create-category.component.html',
})
export class DialogCreateCategoryComponent {
  @Input() loading = false;
  @Output() create = new EventEmitter<CreateCategoryEvent>();

  category = new FormControl(null as null | string, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { parentGroupId: number; parentGroupName: string },
    private dialogRef: MatDialogRef<DialogCreateCategoryComponent>
  ) {}

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
