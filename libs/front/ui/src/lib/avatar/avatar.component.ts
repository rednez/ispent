import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ispent-avatar',
  template: `
    <div [matMenuTriggerFor]="userMenu">
      <img *ngIf="photoUrl; else noPhoto" [src]="photoUrl" alt="userPhoto"/>

      <ng-template #noPhoto>
        <div
          class="flex items-center justify-center bg-blue-500 text-white h-10 w-10 rounded-full"
        >
          {{ shortName }}
        </div>
      </ng-template>
    </div>

    <mat-menu #userMenu="matMenu">
      <div class="px-4 mb-4">
        <div>{{ name }}</div>
        <div class="text-sm text-gray-600">{{ email }}</div>
      </div>
      <mat-divider/>
      <button mat-menu-item (click)="logout.emit()">
        <div class="flex items-center space-x-2">
          <div>Logout</div>
          <mat-icon color="primary" style="font-size: 22px">logout</mat-icon>
        </div>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      :host {
        cursor: pointer;
      }

      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
      }

      img:hover {
        opacity: 0.9;
      }
    `,
  ],
})
export class AvatarComponent implements OnInit {
  @Input() name!: string;
  @Input() email!: string;
  @Input() photoUrl?: string;
  @Output() logout = new EventEmitter();

  shortName!: string;

  ngOnInit(): void {
    this.shortName = this.getShortName(this.name);
  }

  private getShortName(name: string) {
    if (!name) {
      return 'U';
    }
    return name.split(' ').reduce((prev, curr) => prev + curr[0], '');
  }
}
