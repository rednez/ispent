import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ispent-empty-state',
  template: `
    <p class="text-slate-700 text-center">
      <span>{{ msgText }}</span>
      <span
        *ngIf="actionText"
        class="underline decoration-dotted text-blue-500 cursor-pointer"
        (click)="actionClick.emit()"
      >
        {{ actionText }}
      </span>
    </p>
  `,
  styles: [
    `
      :host {
        @apply block bg-slate-100 border border-slate-200 rounded-lg p-4;
      }
    `,
  ],
})
export class EmptyStateComponent {
  @Input() msgText = '';
  @Input() actionText = '';
  @Output() actionClick = new EventEmitter();
}
