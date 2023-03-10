import { Component, Input } from '@angular/core';

@Component({
  selector: 'ispent-rate',
  template: `
    <div class="text-sm mb-3">
      <span class="font-medium">{{ 'Rate' | translate }}:</span>
      <span class="ml-0.5" [class.text-slate-500]="!rate">{{
        rate | number : '1.4-4'
      }}</span>
    </div>
  `,
})
export class RateComponent {
  @Input() rate = 0;
}
