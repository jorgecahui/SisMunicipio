import { Component, OnInit } from '@angular/core';

import {MatDivider, MatList, MatListItem} from "@angular/material/list";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {CommonModule, DatePipe} from "@angular/common";
import {TramiteService} from "../../../providers/services/tramite/tramite.service";

@Component({
  selector: 'app-tramite-list',
  standalone: true,
  templateUrl: './lists.component.html',
  imports: [
    CommonModule,
    MatListItem,
    MatCardContent,
    MatList,
    MatDivider,
    MatCardTitle,
    DatePipe,
    MatCardHeader,
    MatCard
  ]
})
export class TramiteListComponent implements OnInit {
  tramites: any[] = [];

  constructor(private tramiteService: TramiteService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.cargarTramites();
  }

  cargarTramites() {
    this.tramiteService.getAll$().subscribe({
      next: data => this.tramites = data,
      error: err => console.error('Error al cargar trámites', err)
    });
  }

  formatDate(fecha: string | undefined): string {
    return fecha ? this.datePipe.transform(fecha, 'short') || '' : '';
  }
}
