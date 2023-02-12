import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
}
