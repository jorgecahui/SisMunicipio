import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TramiteService, Tramite } from '../../services/tramite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-tramite',
  templateUrl: './register-tramite.html',
  styleUrls: ['./register-tramite.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegisterTramiteComponent implements OnInit {

  persona = { nombres: '', apellidos: '', dni: '', direccion: '', telefono: '' };

  documento = { tipo: '', asunto: '', contenido: '', remitente: '', destinatario: '' };

  oficinaId: number | null = null;

  tiposDocumento: string[] = [];
  oficinas: any[] = [];

  constructor(
    private tramiteService: TramiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tramiteService.listarTiposDocumento()
      .subscribe(res => this.tiposDocumento = res);

    this.tramiteService.listarOficinas()
      .subscribe(res => this.oficinas = res);
  }

  crearTramite() {
  this.tramiteService.crearPersona(this.persona).subscribe({
    next: personaRes => {
      if (!personaRes.id) {
        alert('Error: ID de persona no generado');
        return;
      }

      const tramiteData: Tramite = {
        asunto: this.documento.asunto,
        personaId: personaRes.id, 
        oficinaId: this.oficinaId! 
      };

      this.tramiteService.crearTramite(tramiteData).subscribe({
        next: res => {
          alert('Trámite registrado correctamente');
          this.router.navigate(['/']);
        },
        error: err => {
          alert('Error al registrar trámite');
        }
      });
    },
    error: err => {
      alert('Error al registrar persona');
    }
  });
}
}