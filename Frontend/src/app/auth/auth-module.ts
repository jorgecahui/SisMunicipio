import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './login/login';
import { RegisterTramiteComponent } from './register-tramite/register-tramite';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,           
    RegisterTramiteComponent  
  ]
})
export class AuthModule { }
