import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDivider, MatList, MatListItem } from "@angular/material/list";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { TramiteService } from "../../../providers/services/tramite/tramite.service";
import { PersonaService } from "../../../providers/services/persona/persona.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // ✅ AGREGADO
import { MatChipsModule } from '@angular/material/chips'; // ✅ AGREGADO

@Component({
  selector: 'app-tramite-list',
  standalone: true,
  templateUrl: './lists.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListItem,
    MatCardContent,
    MatList,
    MatDivider,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardSubtitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule, // ✅ AGREGADO
    MatChipsModule // ✅ AGREGADO
  ]
})
export class TramiteListComponent {
  tramites: any[] = [];
  buscando: boolean = false;
  dniBuscado: string = '';
  searchForm: FormGroup;

  constructor(
    private tramiteService: TramiteService, 
    private personaService: PersonaService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
    });
  }

  buscarTramites() {
    if (this.searchForm.valid) {
      this.buscando = true;
      this.dniBuscado = this.searchForm.value.dni;

      // 1. Primero buscar la persona por DNI
      this.personaService.getByDni$(this.dniBuscado).subscribe({
        next: (persona: any) => {
          if (!persona) {
            this.buscando = false;
            this.tramites = [];
            alert('No se encontró persona con ese DNI');
            return;
          }

          console.log('Persona encontrada:', persona);

          // 2. Luego buscar trámites por personaId
          this.tramiteService.getAll$().subscribe({
            next: (data: any) => {
              // Filtrar trámites por personaId
              this.tramites = Array.isArray(data) 
                ? data.filter((tramite: any) => tramite.personaId === persona.id)
                : [];
              
              console.log('Trámites encontrados:', this.tramites);
              this.buscando = false;
            },
            error: (err: any) => {
              console.error('Error al buscar trámites', err);
              this.buscando = false;
              this.tramites = [];
            }
          });
        },
        error: (err: any) => {
          console.error('Error buscando persona:', err);
          this.buscando = false;
          this.tramites = [];
        }
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  limpiarBusqueda() {
    this.searchForm.reset();
    this.tramites = [];
    this.dniBuscado = '';
  }

  formatDate(fecha: string | undefined): string {
    if (!fecha) return 'N/A';
    try {
      return new Date(fecha).toLocaleDateString('es-ES');
    } catch {
      return 'N/A';
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'warn';
      case 'en proceso': return 'primary';
      case 'finalizado': return 'success';
      case 'rechazado': return 'warn';
      default: return '';
    }
  }

  getEstadoIcon(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'schedule';
      case 'en proceso': return 'autorenew';
      case 'finalizado': return 'check_circle';
      case 'rechazado': return 'cancel';
      default: return 'help';
    }
  }

  getEstadoCardClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'border-warning';
      case 'en proceso': return 'border-primary';
      case 'finalizado': return 'border-success';
      case 'rechazado': return 'border-danger';
      default: return 'border-secondary';
    }
  }

  // Getter para el campo DNI
  get dni() {
    return this.searchForm.get('dni');
  }

  get dniInvalido(): boolean {
    return !!(this.dni && this.dni.invalid && (this.dni.dirty || this.dni.touched));
  }
}