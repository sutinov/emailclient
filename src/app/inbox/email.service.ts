import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl: string = 'https://api.angular-email.com';

  constructor(private _http: HttpClient) {}
  getEmailList() {
    return this._http.get<EmailSummary[]>(this.rootUrl + '/emails');
  }

  getEmail(id: string) {
    return this._http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this._http.post(this.rootUrl + '/emails', email);
  }
}
