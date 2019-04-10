import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private _authenticated = false;

  constructor(private http: HttpClient) { }

  get authenticated(): boolean {
    return this._authenticated;
  }

  authenticate() {
    const headers = new HttpHeaders()
      .append('content-type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    this.http.post(environment.apiUrl + 'users/authenticate', null, {headers})
      .subscribe(
        res => {
          this._authenticated = true;
        },
        err => {
          this._authenticated = false;
        });
  }
}
