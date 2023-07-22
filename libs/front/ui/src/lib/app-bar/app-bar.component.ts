import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ispent-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent {
  @Input() userName!: string;
  @Input() userEmail!: string;
  @Input() userPhotoUrl?: string;
  @Output() changeLocale = new EventEmitter<string>();
  @Output() signOut = new EventEmitter();
  @Output() clickLogo = new EventEmitter();

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg')
    );
  }

  links = [
    { name: 'Overview', to: '/overview' },
    { name: 'Budgets', to: '/budgets' },
  ];
}
