import { Component } from '@angular/core';
import { TramiteService, Tramite } from '../../services/tramite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rastrear-tramite',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rastrear-tramite.html',
  styleUrls: ['./rastrear-tramite.css']
})
export class RastrearTramiteComponent {
  filtro: string = '';
  tramite: Tramite | null = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private tramiteService: TramiteService) {}

  buscarTramite() {
    if (!this.filtro.trim()) {
      this.errorMessage = 'Ingresa un número de expediente';
      this.tramite = null;
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.tramiteService.listarTramites().subscribe({
      next: (res) => {
        const encontrado = res.find(t => t.numeroExpediente?.toLowerCase() === this.filtro.toLowerCase());
        if (encontrado) {
          this.tramite = encontrado;
        } else {
          this.errorMessage = `No se encontró ningún trámite con "${this.filtro}"`;
          this.tramite = null;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al buscar el trámite';
        this.loading = false;
      }
    });
  }
}