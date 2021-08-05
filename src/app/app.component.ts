import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedIn$: BehaviorSubject<boolean>;

  constructor(private _authService: AuthService) {
    this.signedIn$ = this._authService.signedIn$;
  }

  ngOnInit() {
    this._authService.checkAuth().subscribe((response) => {
      console.log(response);
    });

    setTimeout(() => {
      this._authService.signout().subscribe(() => {});
    }, 5000);
  }
}
