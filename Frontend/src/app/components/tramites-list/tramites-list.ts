import { Component, OnInit } from '@angular/core';
import { TramiteService, Tramite } from '../../services/tramite';

@Component({
  selector: 'app-tramites-list',
  templateUrl: './tramites-list.html',
  styleUrls: ['./tramites-list.css']
})
export class TramitesList implements OnInit {

  tramites: Tramite[] = [];

  constructor(private tramiteService: TramiteService) {}

  ngOnInit(): void {
    this.tramiteService.listarTramites().subscribe({
      next: (data) => this.tramites = data,
      error: (err) => console.error(err)
    });
  }
}
