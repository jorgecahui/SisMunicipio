import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-tramite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-tramite.html',
  styleUrls: ['./detalle-tramite.css']
})
export class DetalleTramiteComponent implements OnInit {

  tramite: any = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private tramiteService: TramiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarTramite(id);
    } else {
      this.errorMessage = 'ID de trámite inválido';
    }
  }

  cargarTramite(id: number) {
    this.loading = true;
    this.tramiteService.obtenerTramiteCompleto(id).subscribe({
      next: res => {
        this.tramite = res;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Error al cargar el trámite';
        console.error(err);
        this.loading = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
