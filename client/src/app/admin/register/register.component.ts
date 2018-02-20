import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {AuthenticationService, TokenPayload} from "../../services/authentication.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/adminLog');
    }, (err) => {
      console.error(err);
    });
  }
}
