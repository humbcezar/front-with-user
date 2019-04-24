import { AuthenticateService } from './authenticate.service';
import {LoginService} from '../login/login.service';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';

describe('AuthenticateService', () => {
  it('should authenticate with access token', () => {
    const httpClientSpy: {post: jasmine.Spy} = jasmine.createSpyObj('HttpClient', ['post']);
    const loginService: LoginService = jasmine.createSpyObj('LoginService', ['login']);
    const authenticateService: AuthenticateService = new AuthenticateService(<any> httpClientSpy, loginService);
    httpClientSpy.post.and.returnValue(of({}));
    authenticateService.authenticate().subscribe(() => {
      expect(authenticateService.authenticated).toEqual(true);
    });
  });

  it('should authenticate with refresh token', () => {
    const httpClientSpy: {post: jasmine.Spy} = jasmine.createSpyObj('HttpClient', ['post']);
    const loginService: {login: jasmine.Spy} = jasmine.createSpyObj('LoginService', ['login']);
    loginService.login.and.returnValue(of({}));
    const authenticateService: AuthenticateService = new AuthenticateService(<any> httpClientSpy, <any> loginService);
    httpClientSpy.post.and.returnValue(throwError(''));
    authenticateService.authenticate().subscribe(() => {
      const args: any = loginService.login.calls.first().args;
      expect('refresh_token').toEqual(args[0].grant_type);
      expect(localStorage.getItem('refresh_token')).toEqual(args[0].refresh_token);
      expect(authenticateService.authenticated).toEqual(true);
    });
  });

  it('should fail authentication', () => {
    const httpClientSpy: {post: jasmine.Spy} = jasmine.createSpyObj('HttpClient', ['post']);
    const loginService: {login: jasmine.Spy} = jasmine.createSpyObj('LoginService', ['login']);
    loginService.login.and.returnValue(throwError('loginService error'));
    const authenticateService: AuthenticateService = new AuthenticateService(<any> httpClientSpy, <any> loginService);
    httpClientSpy.post.and.returnValue(throwError('spy error'));
    authenticateService.authenticate().subscribe(() => {
      expect(authenticateService.authenticated).toEqual(false);
    });
  });
});
