import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private _authService: AuthService) {}
  validate = (control: FormControl) => {
    const { value } = control;

    return this._authService.usernameAvailable(value).pipe(
      map(
        (value) => {
          if (value.available) {
            console.log(value);
            return null;
          } else {
          }
        },
        catchError((err) => {
          console.log(err);
          if (err.message.username) {
            return of({ noneUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      )
    );
  };
}
