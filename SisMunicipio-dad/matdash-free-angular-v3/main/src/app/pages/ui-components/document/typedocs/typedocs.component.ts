import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// IMPORTA TU SERVICIO
import { DocumentoService } from '../../../../providers/services/documentos/documento.service';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption,} from '@angular/material/core';
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@Component({
  selector: 'app-crear-documento',
  standalone: true,
  templateUrl: './typedocs.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrearDocumentoComponent {

  form: FormGroup;
  archivo: File | null = null;
  nombreArchivo: string = "";

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      tipo: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.archivo = file;
      this.nombreArchivo = file.name;
    } else {
      alert("Solo se permiten archivos PDF.");
      this.archivo = null;
      this.nombreArchivo = "";
    }
  }

  crear(): void {
    if (!this.archivo) {
      alert("Debes seleccionar un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("tipo", this.form.value.tipo);
    formData.append("file", this.archivo);

    this.documentoService.add$(formData).subscribe({
      next: () => {
        alert("Documento creado correctamente");
        this.router.navigate(['/ui-components/document']);
      },
      error: err => {
        console.error("Error al crear documento:", err);
        alert("Ocurrió un error al crear el documento");
      }
    });
  }
}
