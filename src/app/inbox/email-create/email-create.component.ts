import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(
    private _authService: AuthService,
    private _emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${_authService.username}@angular-email.com`,
    };
  }

  ngOnInit(): void {}

  onSubmit(email: Email) {
    //Send the email via the email service
    this._emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
