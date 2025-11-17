import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {MatDatepickerInput, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {PersonaService} from "../../../providers/services/persona/persona.service";
import {DocumentoService} from "../../../providers/services/documentos/documento.service";
import {TramiteService} from "../../../providers/services/tramite/tramite.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tramite-form',
  templateUrl: './forms.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class TramiteFormComponent implements OnInit {
  tramiteForm!: FormGroup;

  personas: any[] = [];
  documentos: any[] = [];
  oficinas: any[] = [];

  estados = ['Pendiente', 'En Proceso', 'Finalizado'];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private documentoService: DocumentoService,
    //private oficinaService: OficinaService,
    private tramiteService: TramiteService
  ) {}

  ngOnInit(): void {
    // Inicializa formulario
    this.tramiteForm = this.fb.group({
      numeroExpediente: ['', Validators.required],
      asunto: ['', Validators.required],
      estado: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      personaId: ['', Validators.required],
      documentoId: ['', Validators.required],
      oficinaId: ['', Validators.required],
    });

    // Cargar datos desde microservicios
    this.personaService.getAll$().subscribe(data => this.personas = data);
    this.documentoService.getAll$().subscribe(data => this.documentos = data);
    //this.oficinaService.getAll$().subscribe(data => this.oficinas = data);
  }

  guardar() {
    if (this.tramiteForm.valid) {
      this.tramiteService.add$(this.tramiteForm.value).subscribe({
        next: res => alert('Trámite creado correctamente'),
        error: err => console.error('Error al guardar trámite', err)
      });
    } else {
      this.tramiteForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.tramiteForm.reset();
  }
}
