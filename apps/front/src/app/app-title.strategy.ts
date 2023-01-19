import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AppTitleStrategy extends TitleStrategy {
  constructor(private title: Title, private translate: TranslateService) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`iSpent – ${this.translate.instant(title)}`);
    }
  }
}
