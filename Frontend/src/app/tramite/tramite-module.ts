import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteRoutingModule } from './tramite-routing-module';
import { FormTramiteComponent } from './form-tramite/form-tramite';
import { DetalleTramiteComponent } from './detalle-tramite/detalle-tramite';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TramiteRoutingModule,
    FormTramiteComponent,
    DetalleTramiteComponent
  ]
})
export class TramiteModule {}
