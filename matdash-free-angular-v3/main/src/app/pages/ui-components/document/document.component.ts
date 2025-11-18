import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CamposExtraidos } from '../../../models/campos.extraidos';
import { DocumentoService } from '../../../providers/services/documentos/documento.service';
import { TramiteService } from '../../../providers/services/tramite/tramite.service';
import { PersonaService } from '../../../providers/services/persona/persona.service';

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './document.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    RouterLink
  ],
})
export class MisTramitesComponent implements OnInit {

  tramitesCompletos: any[] = []; 
  dataSource = new MatTableDataSource<any>(this.tramitesCompletos);
  cargando: boolean = true;

  displayedColumns: string[] = [
    'numeroExpediente',
    'nombres',
    'apellidos', 
    'dni',
    'asunto',
    'estado',
    'fechaInicio',
    'acciones'
  ];

  constructor(
    private documentoService: DocumentoService,
    private tramiteService: TramiteService,
    private personaService: PersonaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMisTramitesCompletos();
  }

  cargarMisTramitesCompletos() {
    this.cargando = true;

    this.tramiteService.getAll$().subscribe({
      next: (tramites: any[]) => {
        console.log('Trámites cargados:', tramites);
        
        const tramitesConPersona = tramites.map(tramite => {
          return {
            ...tramite,
            numeroExpediente: tramite.numeroExpediente,
            asunto: tramite.asunto,
            estado: tramite.estado,
            fechaInicio: tramite.fechaInicio,
            nombres: 'Cargando...',
            apellidos: 'Cargando...',
            dni: 'Cargando...'
          };
        });

        this.tramitesCompletos = tramitesConPersona;
        this.dataSource.data = this.tramitesCompletos;
        this.cargando = false;

        this.cargarDatosPersonas(tramites);
      },
      error: (error) => {
        console.error('Error al cargar trámites:', error);
        this.cargando = false;
      }
    });
  }

  private cargarDatosPersonas(tramites: any[]) {
    tramites.forEach(tramite => {
      if (tramite.personaId) {
        const personaId = String(tramite.personaId).split('_')[0]; 
      
        this.personaService.getById$(personaId).subscribe({
          next: (persona) => {
            const tramiteIndex = this.tramitesCompletos.findIndex(t => t.id === tramite.id);
            if (tramiteIndex !== -1) {
              this.tramitesCompletos[tramiteIndex] = {
                ...this.tramitesCompletos[tramiteIndex],
                nombres: persona.nombres,
                apellidos: persona.apellidos,
                dni: persona.dni
              };
              this.dataSource.data = [...this.tramitesCompletos];
            }
          },
          error: (err) => {
            console.error('Error cargando persona ID:', personaId, err);
            const tramiteIndex = this.tramitesCompletos.findIndex(t => t.id === tramite.id);
            if (tramiteIndex !== -1) {
              this.tramitesCompletos[tramiteIndex] = {
                ...this.tramitesCompletos[tramiteIndex],
                nombres: 'No encontrado',
                apellidos: '',
                dni: 'N/A'
              };
              this.dataSource.data = [...this.tramitesCompletos];
            }
          }
        });
      }
    });
  }


  descargarDocumento(item: any) {
    console.log('Información del trámite para descarga:', item);
    
    if (item.documentoId || item.id) {
      const documentoId = item.documentoId || item.id;
      

      alert(`📄 Función de descarga\n\nTrámite: ${item.numeroExpediente}\nDocumento ID: ${documentoId}\n\nLa descarga de PDF estará disponible pronto.`);
      

    } else {
      alert('No hay documento disponible para este trámite');
    }
  }


  private descargarPDF(documentoId: string | number, nombreArchivo: string) {
    // Implementar llamada al backend para descargar PDF
    // Ejemplo:
    // const url = `http://localhost:9090/api/documentos/descargar/${documentoId}`;
    // ... lógica de descarga
  }

  getEstadoColor(estado: string): string {
    if (!estado) return 'primary';
    
    switch (estado.toLowerCase()) {
      case 'completado':
      case 'finalizado':
      case 'aprobado':
        return 'success';
      case 'en proceso':
      case 'revisión':
        return 'warning';
      case 'rechazado':
      case 'cancelado':
        return 'danger';
      case 'pendiente':
        return 'primary';
      default:
        return 'primary';
    }
  }

  getEstadoTexto(estado: string): string {
    return estado || 'Pendiente';
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return 'N/A';
    
    try {
      return new Date(fecha).toLocaleDateString('es-ES');
    } catch {
      return 'N/A';
    }
  }
}