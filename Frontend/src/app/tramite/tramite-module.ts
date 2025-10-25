import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramiteRoutingModule } from './tramite-routing-module';
import { FormTramiteComponent } from './form-tramite/form-tramite';
import { DetalleTramiteComponent } from './detalle-tramite/detalle-tramite';

@NgModule({
  imports: [
    CommonModule,
    TramiteRoutingModule,
    FormTramiteComponent,      
    DetalleTramiteComponent
  ]
})
export class TramiteModule {}
