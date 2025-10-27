import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login').then(c => c.LoginComponent)
  },
  { 
    path: 'login/registrar-tramite', 
    loadComponent: () => import('./auth/register-tramite/register-tramite').then(c => c.RegisterTramiteComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/home/home').then(c => c.HomeComponent)
  },
  { 
    path: 'tramite', 
    loadChildren: () => import('./tramite/tramite-module').then(m => m.TramiteModule)
  },
  { path: '**', redirectTo: 'login' }
];