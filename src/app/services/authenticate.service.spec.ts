import { AuthenticateService } from './authenticate.service';
import {LoginService} from '../login/login.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

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
});
