import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SignupService} from '../signup.service';
import {switchMap} from 'rxjs/operators';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../services/authenticate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: String = '';

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
  });

  constructor(
    private signupService: SignupService,
    private loginService: LoginService,
    private router: Router,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.signupService.signup(this.signupForm.value)
      .pipe(
        switchMap((res) => {
          const data = {
            username: this.signupForm.value.email,
            password: this.signupForm.value.password
          };
          return this.loginService.login(data);
        })
      )
      .subscribe(
        (res) => {
        this.router.navigate(['/']);
        this.authenticateService.authenticate().subscribe();
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
