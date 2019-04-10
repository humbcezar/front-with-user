import { NgModule } from '@angular/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
import {SharedModule} from '../shared-module/shared.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SignupRoutingModule,
    SharedModule
  ]
})
export class SignupModule { }
