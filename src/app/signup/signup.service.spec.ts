import { SignupService } from './signup.service';
import {of} from 'rxjs';

describe('SignupService', () => {
  it('should signup', () => {
    const httpClientSpy: {post: jasmine.Spy} = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({}));
    const signupService = new SignupService(<any> httpClientSpy);
    const data = {};
    signupService.signup(data).subscribe(() => {
      const passedData = httpClientSpy.post.calls.first().args[1];
      expect(passedData).toEqual(data);
    });
  });
});
