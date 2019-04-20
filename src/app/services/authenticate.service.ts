import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {LoginService} from '../login/login.service';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private _authenticated = false;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  get authenticated(): boolean {
    return this._authenticated;
  }

  authenticate(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || !refreshToken) {
      this._authenticated = false;
      return of(false);
    }
    const headers = new HttpHeaders()
      .append('content-type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Bearer ' + accessToken);

    return this.http.post(environment.apiUrl + 'users/authenticate', null, {headers})
      .pipe(
        catchError(err => {
          if (refreshToken) {
            return this.loginService.login({
              'grant_type': 'refresh_token',
              'refresh_token': refreshToken
            });
          }
          return throwError(err);
        }),
        tap(
          res => {
            this._authenticated = true;
          },
          err => {
            this._authenticated = false;
          })
      );
  }
}
