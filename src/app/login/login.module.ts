import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../shared-module/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
