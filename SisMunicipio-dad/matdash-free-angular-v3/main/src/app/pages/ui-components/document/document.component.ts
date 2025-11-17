import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { CamposExtraidos } from '../../../models/campos.extraidos';
import { DocumentoService } from '../../../providers/services/documentos/documento.service';
//import { CamposExtraidosFormComponent } from '../forms/campos-extraidos-form.component';

@Component({
  selector: 'app-campos-extraidos',
  templateUrl: './document.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
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
    private dialog: MatDialog
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

  //

  eliminar(campo: CamposExtraidos) {
    if (confirm(`¿Desea eliminar el registro con identificador: ${campo.identificador}?`)) {
      this.camposService.delete$(String(campo.id)).subscribe(() => {
        this.cargarCampos();
      });
    }
  }
}
