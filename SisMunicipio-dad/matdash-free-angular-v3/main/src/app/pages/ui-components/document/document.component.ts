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

  campos: CamposExtraidos[] = [];
  dataSource = new MatTableDataSource<CamposExtraidos>(this.campos);

  displayedColumns: string[] = [
    'id',
    'nombre',
    'dni',
    'asunto',
    'identificador',
    'nombreDocumento',
    'acciones'
  ];

  constructor(
    private camposService: DocumentoService,
    private dialog: MatDialog,
    private router: Router , private exportarservice: RegistrarService          // <<--- AÑADIDO
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
