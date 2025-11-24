import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';

import { CamposExtraidos } from '../../../models/campos.extraidos';
import { DocumentoService } from '../../../providers/services/documentos/documento.service';
import {RegistrarService} from "../../../providers/services/registrar/registrar.service";
import {AuthService} from "../../../providers/services/auth/auth.service";

@Component({
  selector: 'app-campos-extraidos',
  templateUrl: './document.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
})
export class CamposExtraidosComponent implements OnInit {

  campos: any[] = [];
  dataSource = new MatTableDataSource<any>(this.campos);

  displayedColumns: string[] = [
    'id', 'nombre', 'dni', 'asunto', 'identificador', 'nombreDocumento', 'acciones'
  ];

  constructor(
    private camposService: DocumentoService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private exportarservice: RegistrarService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log('📋 Usuario en document.component:', user);
    console.log('🔑 PersonaId para X-User-Id:', user?.personaId);
    console.log('🎭 Roles:', user?.roles);
    console.log('🔐 Token presente:', !!this.authService.getToken());

    this.cargarCampos();
  }

  cargarCampos() {
    console.log('🔄 Cargando documentos...');
    console.log('🔍 Service:', this.camposService);

    this.camposService.getAll$().subscribe({
      next: (data: any) => {
        console.log('✅ Respuesta del servidor:', data);

        // Asegúrate de que data sea un array
        if (Array.isArray(data)) {
          this.campos = data;
          this.dataSource.data = this.campos;
          console.log('📊 Documentos cargados:', this.campos.length);
        } else {
          console.warn('⚠️ La respuesta no es un array:', data);
          this.campos = [];
          this.dataSource.data = [];
        }
      },
      error: (error) => {
        console.error('❌ Error cargando documentos:', error);
        console.error('🔧 Detalles:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
      }
    });
  }

  verPDF(id: number) {
    const url = `http://localhost:9090/api/ocr/exportdb/${id}`;
    window.open(url, '_blank');
  }

  abrirVisor(filename: string) {
    this.router.navigate(['/ui-components/visor', filename]);
  }

  editar(item: CamposExtraidos) {
    this.router.navigate(['/ui-components/document/edit', item.id]);   // <<--- NAVEGACIÓN FINAL
  }
}
