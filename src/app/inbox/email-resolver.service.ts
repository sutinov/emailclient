import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Email } from './email';
import { EmailService } from './email.service';
import { EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private _emailService: EmailService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this._emailService.getEmail(id).pipe(
      catchError(() => {
        this._router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
