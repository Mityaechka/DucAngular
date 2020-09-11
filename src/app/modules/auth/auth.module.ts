import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainAuthComponent } from './components/main-auth/main-auth.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [MainAuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [MainAuthComponent]
})
export class AuthModule { }
