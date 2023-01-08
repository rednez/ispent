import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  templateUrl: './sign-in-page.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
    `,
  ],
})
export class SignInPageComponent {
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'google-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/google_logo.svg')
    );
  }

  signInWithGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['overview']));
  }
}
