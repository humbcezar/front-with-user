import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as querystring from 'querystring';
import {LoginResponseInterface} from './login/login-response.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data) {
    const headers = new HttpHeaders().append('content-type', 'application/x-www-form-urlencoded');
    return this.http.post(environment.apiUrl + 'users/login', querystring.stringify(data), {
      headers
    }).pipe(
      map((res: LoginResponseInterface) => {
        localStorage.setItem('access_token', res.accessToken);
      })
    );
  }
}
