import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { equals, pipe, prop } from 'ramda';

interface Locale {
  name: string;
  titleShort: string;
  titleFull: string;
}

@Component({
  selector: 'ispent-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() localeName?: string;
  @Output() changeLocale = new EventEmitter<string>();

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'flag-ua',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/ua.svg')
    );
    iconRegistry.addSvgIcon(
      'flag-us',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/us.svg')
    );
  }

  readonly locales: Locale[] = [
    {
      name: 'uk',
      titleShort: 'UA',
      titleFull: 'Українська',
    },
    {
      name: 'eng',
      titleShort: 'EN',
      titleFull: 'English',
    },
  ];

  currentLocale: Locale = this.locales[0];

  ngOnInit(): void {
    if (this.localeName) {
      this.currentLocale = this.locales.find(
        pipe(prop('name'), equals(this.localeName))
      ) as Locale;
    }
  }

  onChangeLocale(locale: Locale) {
    this.currentLocale = locale;
    this.changeLocale.emit(locale.name);
  }

  getNationalFlag(locale: Locale) {
    return locale.name === 'uk'
      ? 'flag-ua'
      : locale.name === 'eng'
      ? 'flag-us'
      : '';
  }
}
