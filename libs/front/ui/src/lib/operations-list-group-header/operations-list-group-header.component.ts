import { Component } from '@angular/core';

@Component({
  selector: 'ispent-operations-list-group-header',
  template: `
    <div class="divider"></div>
    <div
      class="border p-1 rounded-md text-slate-500 text-sm group-label"
    >
      <ng-content/>
    </div>
    <div class="divider"></div> `,
  styles: [
    `
      :host {
        @apply flex items-center px-2 sm:px-4;
      }

      .divider {
        @apply h-px bg-gray-200 w-full;
      }
    `,
  ],
})
export class OperationsListGroupHeaderComponent {}
