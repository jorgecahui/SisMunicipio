import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TramiteService, Persona, Documento, Tramite } from '../../services/tramite.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-tramite',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-tramite.html',
  styleUrls: ['./form-tramite.css']
})
export class FormTramiteComponent implements OnInit {

  persona: Persona = { nombres: '', apellidos: '', dni: '', direccion: '', telefono: '' };
  documento: Documento = { tipo: '', asunto: '', contenido: '', remitente: '', destinatario: '' };
  oficinaId: number | null = null;

  tiposDocumento: string[] = [];
  oficinas: any[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private tramiteService: TramiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Traer tipos de documento
    this.tramiteService.listarTiposDocumento().subscribe({
      next: res => this.tiposDocumento = res,
      error: err => console.error('Error al cargar tipos de documento', err)
    });

    // Traer oficinas
    this.tramiteService.listarOficinas().subscribe({
      next: res => this.oficinas = res,
      error: err => console.error('Error al cargar oficinas', err)
    });
  }

  crearTramite() {
    if (!this.oficinaId) {
      this.errorMessage = 'Debes seleccionar una oficina';
      return;
    }

    // 1. Crear persona
    this.tramiteService.crearPersona(this.persona).subscribe({
      next: personaRes => {
        if (!personaRes.id) {
          this.errorMessage = 'Error al crear la persona';
          return;
        }

        // 2. Crear documento
        this.tramiteService.crearDocumento(this.documento).subscribe({
          next: documentoRes => {
            if (!documentoRes.id) {
              this.errorMessage = 'Error al crear el documento';
              return;
            }

            // 3. Crear trámite
            const tramiteData: Tramite = {
              asunto: this.documento.asunto,
              personaId: personaRes.id!,
              documentoId: documentoRes.id!,
              oficinaId: this.oficinaId!
            };

            this.tramiteService.crearTramite(tramiteData).subscribe({
              next: res => {
                this.successMessage = 'Trámite registrado correctamente';
                this.errorMessage = '';
                this.router.navigate(['/']);
              },
              error: err => {
                this.errorMessage = 'Error al registrar trámite';
                console.error(err);
              }
            });

          },
          error: err => {
            this.errorMessage = 'Error al crear el documento';
            console.error(err);
          }
        });
      },
      error: err => {
        this.errorMessage = 'Error al crear la persona';
        console.error(err);
      }
    });
  }
}
