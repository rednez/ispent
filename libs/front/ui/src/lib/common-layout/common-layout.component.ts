import { Component } from '@angular/core';

@Component({
  selector: 'ispent-common-layout',
  template: `<ng-content></ng-content> `,
  styles: [
    `
      :host {
        @apply block sm:mt-8 mx-auto max-w-6xl sm:px-6;
      }
    `,
  ],
})
export class CommonLayoutComponent {}
