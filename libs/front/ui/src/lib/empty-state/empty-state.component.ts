import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ispent-empty-state',
  template: `
    <p class="text-center" [ngClass]="setTextClass()">
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
        @apply block border rounded-lg p-4;
      }
    `,
  ],
})
export class EmptyStateComponent {
  readonly defaultBgColorClass = 'bg-slate-100';

  @Input() msgText = '';
  @Input() actionText = '';
  @Input() bgColorClass = this.defaultBgColorClass;
  @Input() borderColorClass = '';
  @Input() textColorClass = 'text-slate-700';
  @Output() actionClick = new EventEmitter();

  @HostBinding('class')
  get hostClass() {
    return (
      (this.bgColorClass || this.defaultBgColorClass) +
      ' ' +
      this.borderColorClass
    );
  }

  setTextClass() {
    return this.textColorClass;
  }
}
