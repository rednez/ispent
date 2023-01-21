import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestResultNotificationComponent } from '@ispent/front/ui';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestResultNotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.showSnackBar(message);
  }

  fail(message: string) {
    this.showSnackBar(message, 'fail');
  }

  handleError = (error: { message: string }): Observable<never> => {
    this.fail(error.message);
    return throwError(() => error);
  };

  private showSnackBar(message: string, type: 'success' | 'fail' = 'success') {
    this.snackBar.openFromComponent(RequestResultNotificationComponent, {
      duration: type === 'success' ? 2000 : 4000,
      data: {
        message,
        type,
      },
    });
  }
}
