import { Component, OnInit } from '@angular/core';
import { TramiteService, Tramite } from '../../services/tramite';
import { CommonModule, DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-tramites-list',
  standalone: true,  
  imports: [CommonModule], 
  providers: [DatePipe],   
  templateUrl: './tramites-list.html',
  styleUrls: ['./tramites-list.css']
})
export class TramitesList implements OnInit {

  tramites: Tramite[] = [];
  error: string = '';

  constructor(private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.tramiteService.listarTramites().subscribe({
      next: (data: Tramite[]) => this.tramites = data,
      error: (err: any) => this.error = 'Error al cargar los trámites'
    });
  }

}
