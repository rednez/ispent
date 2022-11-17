import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface BreadcrumbsItem {
  name: string;
  to: string[];
}

@Component({
  selector: 'ispent-breadcrumbs',
  template: ` <div *ngFor="let item of items" (click)="onClick(item.to)">
    <span>{{ item.name }}</span>
  </div>`,
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbsItem[] = [];
  @Output() clickLink = new EventEmitter<string[]>();

  onClick(link: string[]) {
    if (link.length) {
      this.clickLink.emit(link);
    }
  }
}
