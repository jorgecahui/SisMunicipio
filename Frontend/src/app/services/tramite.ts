import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tramite {
  id: number;
  numeroExpediente: string;
  asunto: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string | null;
  persona: any;
  documento: any;
  oficina: any;
}

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private baseUrl = 'http://localhost:9090/api/tramites';

  constructor(private http: HttpClient) {}

  listarTramites(): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(this.baseUrl);
  }

  obtenerTramite(id: number): Observable<Tramite> {
    return this.http.get<Tramite>(`${this.baseUrl}/completo/${id}`);
  }
}