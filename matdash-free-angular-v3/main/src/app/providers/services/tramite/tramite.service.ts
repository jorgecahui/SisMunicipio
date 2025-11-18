import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { environment } from "../../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TramiteService extends EntityDataService<any> {
  
  private tramiteCrearUrl: string;

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.url}${END_POINTS.tramites_listar}`,        // GET ALL
      `${environment.url}${END_POINTS.tramite_by_id}`,          // GET BY ID
      `${environment.url}${END_POINTS.tramite_eliminar}`,       // DELETE  
      `${environment.url}${END_POINTS.tramite_crear}`,          // CREATE
      `${environment.url}${END_POINTS.tramite_actualizar_estado}` // UPDATE
    );

    this.tramiteCrearUrl = `${environment.url}${END_POINTS.tramite_crear}`;
  }

  public crearTramite$(tramiteData: any): Observable<any> {
    return this.httpClient.post<any>(this.tramiteCrearUrl, tramiteData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}