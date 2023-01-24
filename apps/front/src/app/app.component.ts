import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { from, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ispent-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();

  constructor(
    private router: Router,
    private translate: TranslateService,
    private auth: AngularFireAuth
  ) {
    translate.setDefaultLang('uk');
  }

  get user$() {
    return this.auth.user;
  }

  ngOnInit(): void {
    this.subscribeToTokenChanged();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  onChangeLocale(localeName: string) {
    this.translate.use(localeName);
  }

  signOut() {
    this.auth.signOut().then(() => this.router.navigate(['sign-in']));
  }

  gotoOverview() {
    this.router.navigate(['overview']);
  }

  private subscribeToTokenChanged() {
    from(
      this.auth.onIdTokenChanged(async (token) => {
        if (token) {
          sessionStorage.setItem('accessToken', await token.getIdToken());
        } else {
          sessionStorage.clear();
        }
      })
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }
}
