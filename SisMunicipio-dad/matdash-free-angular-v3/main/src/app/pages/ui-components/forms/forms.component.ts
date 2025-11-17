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

@Component({
  selector: 'app-tramite-form',
  templateUrl: './forms.component.html',
  imports: [
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

  // Datos para selects
  estados = ['Pendiente', 'En Proceso', 'Finalizado'];
  personas = [{ id: 1, nombre: 'Juan Perez' }, { id: 2, nombre: 'Maria Lopez' }];
  documentos = [{ id: 'doc1', titulo: 'Oficio 001' }, { id: 'doc2', titulo: 'Acta 002' }];
  oficinas = [{ id: 1, nombre: 'Registro Civil' }, { id: 2, nombre: 'Tesorería' }];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
  }

  guardar() {
    if (this.tramiteForm.valid) {
      console.log('Formulario válido', this.tramiteForm.value);
      // Aquí llamas tu servicio para guardar en backend
    } else {
      console.log('Formulario inválido');
      this.tramiteForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.tramiteForm.reset();
  }
}
