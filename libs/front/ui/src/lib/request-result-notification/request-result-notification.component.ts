import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface RequestResultNotificationData {
  message: string;
  type?: 'success' | 'fail';
}

@Component({
  selector: 'ispent-request-result-notification',
  template: ` <mat-icon>{{ icon }}</mat-icon>
    <div class="">{{ data.message }}</div>`,
  styles: [
    `
      mat-icon {
        flex-shrink: 0;
      }
    `,
  ],
})
export class RequestResultNotificationComponent implements OnInit {
  icon = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: RequestResultNotificationData
  ) {}

  @HostBinding('class')
  get hostClass() {
    const color =
      this.data?.type === 'success'
        ? 'text-green-500'
        : this.data?.type === 'fail'
        ? 'text-red-500'
        : '';
    return 'flex items-center space-x-4 text-sm ' + color;
  }

  ngOnInit(): void {
    if (this.data) {
      this.icon =
        this.data.type === 'success'
          ? 'done'
          : this.data.type === 'fail'
          ? 'error'
          : '';
    }
  }
}
