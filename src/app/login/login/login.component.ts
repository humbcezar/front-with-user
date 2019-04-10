import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: String = '';

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.signupForm.value).subscribe(
      (res) => {
        this.router.navigate(['/']);
        this.authenticateService.authenticate();
      },
      err => {
        this.error = err.error;
      }
    );
  }

  close() {
    this.error = '';
  }
}
