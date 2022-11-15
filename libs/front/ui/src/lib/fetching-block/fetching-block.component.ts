import { Component, Input } from '@angular/core';

@Component({
  selector: 'ispent-fetching-block',
  template: `
    <div *ngIf="isLoading; else loadedState" class="flex justify-center p-4">
      <mat-spinner diameter="40"></mat-spinner>
    </div>

    <ng-template #loadedState>
      <div class="p-4">
        <ispent-empty-state
          *ngIf="isEmpty || isError; else contentState"
          [msgText]="isEmpty ? emptyText : errorText"
        ></ispent-empty-state>
      </div>
    </ng-template>

    <ng-template #contentState>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class FetchingBlockComponent {
  @Input() isLoading = false;
  @Input() isError = false;
  @Input() isEmpty = false;
  @Input() emptyText = 'Content is empty';
  @Input() errorText = 'Failed data';
}
