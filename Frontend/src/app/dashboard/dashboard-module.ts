import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home';
import { dashboardRoutes } from './dashboard-routing-module'; // importar rutas

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    HomeComponent 
  ]
})
export class DashboardModule {}
