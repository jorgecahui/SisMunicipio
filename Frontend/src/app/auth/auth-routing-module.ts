import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./login/login').then(c => c.LoginComponent) },
  { path: 'registrar-tramite', loadComponent: () => import('./register-tramite/register-tramite').then(c => c.RegisterTramiteComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
