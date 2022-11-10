import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ispent-chip',
  template: '<span [ngStyle]="setColors()">{{ title }}</span>',
  styles: [
    `
      :host {
        display: block;
        border-radius: 12px;
        padding: 2px 6px;
        font-size: 0.875rem;
        border-width: 1px;
        border-style: solid;
      }
    `,
  ],
})
export class ChipComponent {
  @Input() title = '';
  @Input() color = '';

  @HostBinding('style.border-color')
  get borderColor() {
    return this.color;
  }

  setColors() {
    return {
      color: this.color,
    };
  }
}
