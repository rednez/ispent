import { Component } from '@angular/core';

@Component({
  selector: 'ispent-page-layout',
  template: `<ng-content></ng-content> `,
  styles: [
    `
      :host {
        @apply block mt-6 sm:mt-8 mx-auto max-w-6xl px-4 sm:px-6;
      }
    `,
  ],
})
export class PageLayoutComponent {}
