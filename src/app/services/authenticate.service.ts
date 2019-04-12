import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {LoginService} from '../login/login.service';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private _authenticated = false;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  get authenticated(): boolean {
    return this._authenticated;
  }

  authenticate() {
    const headers = new HttpHeaders()
      .append('content-type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    this.http.post(environment.apiUrl + 'users/authenticate', null, {headers})
      .pipe(
        catchError(err => {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            return this.loginService.login({
              'grant_type': 'refresh_token',
              'refresh_token': refreshToken
            });
          }
          return throwError(err);
        })
      )
      .subscribe(
        res => {
          this._authenticated = true;
        },
        err => {
          this._authenticated = false;
        });
  }
}
