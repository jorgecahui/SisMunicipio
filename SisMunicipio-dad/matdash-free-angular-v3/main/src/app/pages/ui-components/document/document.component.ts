import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-campos-extraidos',
  templateUrl: './document.component.html',
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

  campos: CamposExtraidos[] = [];
  dataSource = new MatTableDataSource<CamposExtraidos>(this.campos);

  displayedColumns: string[] = [
    'id',
    'nombre',
    'dni',
    'codigo',
    'asunto',
    'identificador',
    'nombreDocumento',
    'acciones'
  ];

  constructor(
    private camposService: DocumentoService,
    private dialog: MatDialog,
    private router: Router           // <<--- AÑADIDO
  ) {}

  ngOnInit(): void {
    this.cargarCampos();
  }

  cargarCampos() {
    this.camposService.getAll$().subscribe((data: CamposExtraidos[]) => {
      this.campos = data;
      this.dataSource.data = this.campos;
    });
  }

  eliminar(id: number): void {

    if (!confirm('¿Seguro que deseas eliminar este documento?')) {
      this.router.navigate(['/ui-components/document']);
      return;
    }

    this.camposService.delete$(id).subscribe({
      next: () => {
        alert('Documento eliminado correctamente.');
        this.router.navigate(['/ui-components/document']);
      },
      error: (error) => {
        console.error('Error eliminando documento:', error);
        alert('No se pudo eliminar el documento.');
        this.router.navigate(['/ui-components/document']);
      }
    });

  }

  editar(item: CamposExtraidos) {
    this.router.navigate(['/ui-components/document/edit', item.id]);   // <<--- NAVEGACIÓN FINAL
  }
}
