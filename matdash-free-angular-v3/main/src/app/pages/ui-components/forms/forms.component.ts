import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TramiteService } from "../../../providers/services/tramite/tramite.service";
import { PersonaService } from "../../../providers/services/persona/persona.service";
import { DocumentoService } from "../../../providers/services/documentos/documento.service";
import { CommonModule } from "@angular/common";

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
    MatButtonModule
  ]
})
export class TramiteFormComponent implements OnInit {
  tramiteForm!: FormGroup;
  archivo: File | null = null;
  nombreArchivo: string = "";
  guardando: boolean = false;
  personaEncontrada: any = null;
  buscandoPersona: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tramiteService: TramiteService,
    private personaService: PersonaService,
    private documentoService: DocumentoService
  ) {}

  ngOnInit(): void {
    this.tramiteForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
    });

    this.tramiteForm.get('dni')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(dni => {
          if (dni && dni.length === 8 && /^[0-9]+$/.test(dni)) {
            this.buscandoPersona = true;
            return this.personaService.getByDni$(dni);
          } else {
            this.personaEncontrada = null;
            return of(null);
          }
        })
      )
      .subscribe({
        next: (persona) => {
          this.buscandoPersona = false;
          this.personaEncontrada = persona;
        },
        error: (err) => {
          this.buscandoPersona = false;
          this.personaEncontrada = null;
          console.error('Error buscando persona:', err);
        }
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

  guardar() {
    if (this.tramiteForm.valid && this.archivo && this.personaEncontrada) {
      this.guardando = true;

      const formData = new FormData();
      formData.append("dni", this.tramiteForm.value.dni);
      formData.append("file", this.archivo);

      this.documentoService.add$(formData).subscribe({
        next: (ocrResult: any) => {
          console.log('Resultado OCR:', ocrResult);
        
          // 2. Luego crear el trámite
          const tramiteData = {
            numeroExpediente: this.generarNumeroExpediente(),
            asunto: ocrResult.asunto || 'Documento subido - ' + this.nombreArchivo,
            estado: 'Pendiente',
            fechaInicio: new Date().toISOString(),
            // ✅ CORREGIDO: Asegurar que personaId sea número
            personaId: Number(this.personaEncontrada.id), // Convertir a número
            documentoId: ocrResult.id ? String(ocrResult.id) : '1',
            oficinaId: 1
          };

          console.log('Creando trámite con:', tramiteData);

          this.tramiteService.crearTramite$(tramiteData).subscribe({
            next: (tramiteCreado) => {
              this.guardando = false;
              alert('Trámite creado correctamente');
              this.limpiarFormulario();
            },
            error: (err) => {
              console.error('Error creando trámite:', err);
              this.guardando = false;
              alert('Error al crear el trámite');
            }
          });
        },
        error: (err) => {
          console.error('Error en OCR:', err);
          this.guardando = false;
          alert('Error al procesar el documento PDF');
        }
      });

    } else {
      if (!this.archivo) {
        alert("Debe seleccionar un archivo PDF.");
      }
      if (!this.personaEncontrada) {
        alert("Debe ingresar un DNI válido y que exista en el sistema.");
      }
      this.tramiteForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.tramiteForm.reset();
    this.archivo = null;
    this.nombreArchivo = "";
    this.personaEncontrada = null;
  }

  private generarNumeroExpediente(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `EXP-${timestamp}-${random}`;
  }

  get dni() {
    return this.tramiteForm.get('dni');
  }

  get dniInvalido(): boolean {
    return !!(this.dni && this.dni.invalid && (this.dni.dirty || this.dni.touched));
  }
}