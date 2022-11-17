import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ispent-loadable-widget',
  template: `
    <div *ngIf="isLoading; else loadedState" class="flex justify-center p-4">
      <mat-spinner diameter="40"></mat-spinner>
    </div>

    <ng-template #loadedState>
      <ng-container *ngIf="isError || isEmpty">
        <div class="w-full p-4">
          <ispent-empty-state
            [bgColorClass]="isError ? 'bg-red-100' : ''"
            [borderColorClass]="isError ? 'border-red-200' : ''"
            [textColorClass]="isError ? 'text-red-400' : ''"
            [msgText]="emptyStateText"
          ></ispent-empty-state>
        </div>
      </ng-container>
    </ng-template>
  `,
})
export class LoadableWidgetComponent {
  @Input() isLoading = false;
  @Input() isError = false;
  @Input() isEmpty = false;
  @Input() emptyText = 'Content is empty';
  @Input() errorText = 'Failed data';

  @HostBinding('class')
  get hostClass() {
    return this.isLoading || this.isError || this.isEmpty
      ? 'flex items-center justify-center border bg-white w-full h-full rounded-md'
      : 'block';
  }

  get emptyStateText(): string {
    return this.isError ? this.errorText : this.isEmpty ? this.emptyText : '';
  }
}
