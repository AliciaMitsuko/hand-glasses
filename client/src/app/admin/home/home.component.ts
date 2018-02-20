import { Component } from '@angular/core';
import {AuthenticationService, TokenPayload} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/adminLog');
    }, (err) => {
      console.error(err);
    });
  }
}
