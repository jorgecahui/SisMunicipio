import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule) 
  },
  { 
    path: 'tramite', 
    loadChildren: () => import('./tramite/tramite-module').then(m => m.TramiteModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule) 
  },
  { path: '**', redirectTo: 'login' } 
];