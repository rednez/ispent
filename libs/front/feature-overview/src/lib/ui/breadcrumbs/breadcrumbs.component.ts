import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface BreadcrumbsItem {
  name: string;
  to: string[];
}

@Component({
  selector: 'ispent-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
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
