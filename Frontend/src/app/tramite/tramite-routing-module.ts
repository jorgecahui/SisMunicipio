import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTramiteComponent } from './form-tramite/form-tramite';
import { DetalleTramiteComponent } from './detalle-tramite/detalle-tramite';
import { RastrearTramiteComponent } from './rastrear-tramite/rastrear-tramite';

const routes: Routes = [
  { path: '', component: RastrearTramiteComponent }, 
  { path: 'nuevo', component: FormTramiteComponent }, 
  { path: ':id', component: DetalleTramiteComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramiteRoutingModule {}
