import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email: Email;
  constructor(private _route: ActivatedRoute) {
    this.email = _route.snapshot.data.email;
    this.email = this._route.snapshot.data.email;
    this._route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit(): void {}
}
