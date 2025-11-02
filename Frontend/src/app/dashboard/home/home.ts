import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TramiteService, Tramite } from '../../services/tramite.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, NgFor, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  tramites: Tramite[] = [];
  loading = false;
  errorMessage = '';

  constructor(private tramiteService: TramiteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarTramites();
  }

  cargarTramites() {
    this.loading = true;
    this.tramiteService.listarTramites().subscribe({
      next: res => {
        this.tramites = res;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Error al cargar los trámites';
        console.error(err);
        this.loading = false;
      }
    });
  }

  verDetalle(tramiteId: number) {
    this.router.navigate(['/tramite', tramiteId]);
  }
  cambiarEstado(tramite: Tramite) {
    if (!tramite.id || !tramite.estado) return;
    this.tramiteService.actualizarEstado(tramite.id, tramite.estado).subscribe({
      next: () => console.log('Estado actualizado correctamente'),
      error: err => console.error('Error al actualizar el estado', err)
    });
  }
}