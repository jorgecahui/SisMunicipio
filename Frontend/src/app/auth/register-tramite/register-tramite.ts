import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TramiteService, Tramite } from '../../services/tramite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-tramite',
  templateUrl: './register-tramite.html',
  styleUrls: ['./register-tramite.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterTramiteComponent implements OnInit {

  persona = { nombres: '', apellidos: '', dni: '', direccion: '', telefono: '' };
  documento = { tipo: '', asunto: '', contenido: '', remitente: '', destinatario: '' };
  oficinaId: number | null = null;

  tiposDocumento: string[] = [];
  oficinas: any[] = [];

  constructor(private tramiteService: TramiteService, private router: Router) {}

  ngOnInit(): void {
    this.tramiteService.listarTiposDocumento().subscribe({
      next: res => {
        console.log('Tipos de documento:', res);
        this.tiposDocumento = res;
      },
      error: err => console.error('Error al cargar tipos de documento', err)
    });

    this.tramiteService.listarOficinas().subscribe({
      next: res => this.oficinas = res,
      error: err => console.error('Error al cargar oficinas', err)
    });
  }

  crearTramite() {
    if (!this.oficinaId) {
      alert('Debes seleccionar una oficina');
      return;
    }

    this.tramiteService.crearPersona(this.persona).subscribe({
      next: personaRes => {
        if (!personaRes.id) {
          alert('Error: ID de persona no generado');
          return;
        }

        this.tramiteService.crearDocumento(this.documento).subscribe({
          next: documentoRes => {
            if (!documentoRes.id) {
              alert('Error: ID de documento no generado');
              return;
            }

            const tramiteData: Tramite = {
              asunto: this.documento.asunto,
              personaId: personaRes.id!,
              oficinaId: this.oficinaId!,
              documentoId: documentoRes.id!
            };

            this.tramiteService.crearTramite(tramiteData).subscribe({
              next: res => {
                alert('Trámite registrado correctamente');
                this.router.navigate(['/']);
              },
              error: err => {
                alert('Error al registrar trámite');
                console.error(err);
              }
            });
          },
          error: err => {
            alert('Error al registrar documento');
            console.error(err);
          }
        });
      },
      error: err => {
        alert('Error al registrar persona');
        console.error(err);
      }
    });
  }
}