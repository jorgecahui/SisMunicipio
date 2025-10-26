import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  imports: [
    AuthRoutingModule
    // no necesitas importar los componentes standalone
  ]
})
export class AuthModule {}