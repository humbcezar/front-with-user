import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from '../error/error.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ErrorComponent],
  exports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorComponent
  ]
})
export class SharedModule { }
