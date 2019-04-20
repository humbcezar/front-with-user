import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticateService} from '../services/authenticate.service';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthenticateService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .authenticate()
      .pipe(
        catchError(err => of(!this.authService.authenticated)),
        switchMap(res => of(!this.authService.authenticated)),
      );
  }
}
