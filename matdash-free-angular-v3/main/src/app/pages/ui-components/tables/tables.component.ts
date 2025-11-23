import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../providers/services/persona/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';  // Necesario para usar formularios reactivos
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa solo MatFormFieldModule

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,  // Asegúrate de importar ReactiveFormsModule aquí
    MatFormFieldModule,   // Solo importa MatFormFieldModule aquí
  ],
})
export class AppTablesComponent implements OnInit {
  personaForm: FormGroup;
  archivo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.personaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      direccion: [''],
      telefono: [''],
      documento: [null, Validators.required], // Campo para el archivo
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.archivo = file;
      this.personaForm.patchValue({ documento: file });
    }
  }

  guardarPersona() {
    if (this.personaForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('nombres', this.personaForm.get('nombres')?.value);
    formData.append('apellidos', this.personaForm.get('apellidos')?.value);
    formData.append('dni', this.personaForm.get('dni')?.value);
    formData.append('direccion', this.personaForm.get('direccion')?.value);
    formData.append('telefono', this.personaForm.get('telefono')?.value);
    if (this.archivo) {
      formData.append('documento', this.archivo, this.archivo.name);
    }

    this.personaService.createWithDocument(formData).subscribe(
      (response) => {
        console.log('Persona guardada con éxito', response);
        this.dialog.open(SuccessDialogComponent);  // Abre un diálogo de éxito
      },
      (error) => {
        console.error('Error al guardar la persona:', error);
        this.dialog.open(ErrorDialogComponent);  // Abre un diálogo de error si algo falla
      }
    );
  }
}

// Asegúrate de tener el componente de éxito o error en algún lugar de tu aplicación
@Component({
  selector: 'app-success-dialog',
  template: `<h1>¡Persona guardada correctamente!</h1>`
})
export class SuccessDialogComponent {}

@Component({
  selector: 'app-error-dialog',
  template: `<h1>Ocurrió un error al guardar la persona. Intenta de nuevo.</h1>`
})
export class ErrorDialogComponent {}
