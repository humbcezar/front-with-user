import { LoginService } from './login.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {LoginResponseInterface} from './login/login-response.interface';

describe('LoginService', () => {
  it('should set tokens in local storage', () => {
    const httpClientSpy: {post: jasmine.Spy} = jasmine.createSpyObj('HttpClient', ['post']);
    const expectedPayload: LoginResponseInterface = {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token'
    };
    httpClientSpy.post.and.returnValue(of(expectedPayload));
    const loginService: LoginService = new LoginService(<any> httpClientSpy);
    loginService.login({}).subscribe(() => {
      expect(expectedPayload.accessToken).toEqual(localStorage.getItem('access_token'));
      expect(expectedPayload.refreshToken).toEqual(localStorage.getItem('refresh_token'));
    });
  });
});
