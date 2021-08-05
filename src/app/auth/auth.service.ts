import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isIdentifier } from '@angular/compiler';
interface Credentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}
interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(null);
  username = '';

  constructor(private _http: HttpClient) {}

  usernameAvailable(username: string) {
    return this._http.post<{ available: boolean }>(
      this.rootUrl + '/auth/username/',
      {
        username: username,
      }
    );
  }

  signup(credentials: Credentials) {
    return this._http
      .post<SignUpResponse>(this.rootUrl + '/auth/signup/', credentials)
      .pipe(
        tap((response) => {
          this.username = response.username;
          this.signedIn$.next(true);
        })
      );
  }

  signin(credentials: SignInCredentials) {
    return this._http
      .post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this._http
      .get<SignedinResponse>(this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedIn$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this._http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    );
  }
}
