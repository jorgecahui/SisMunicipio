import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../providers/services/persona/persona.service';
import { Persona } from '../../../models/persona.model';
import { MatDialog } from '@angular/material/dialog';
import { PersonaFormComponent } from './persona-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class AppTablesComponent implements OnInit {
  personas: Persona[] = [];
  dataSource = new MatTableDataSource<Persona>(this.personas);
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni', 'direccion', 'telefono', 'acciones'];

  constructor(private personaService: PersonaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personaService.getAll$().subscribe((data: Persona[]) => {
      this.personas = data;
      this.dataSource.data = this.personas;
    });
  }

  abrirDialog(persona?: Persona) {
    const dialogRef = this.dialog.open(PersonaFormComponent, {
      width: '400px',
      data: persona || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarPersonas();
      }
    });
  }

  eliminar(persona: Persona) {
    if (confirm(`¿Desea eliminar a ${persona.nombres} ${persona.apellidos}?`)) {
      this.personaService.delete$(String(persona.id)).subscribe(() => {
        this.cargarPersonas();
      });
    }
  }
}
