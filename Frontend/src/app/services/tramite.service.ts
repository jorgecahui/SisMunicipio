import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Persona {
  id?: number;
  nombres: string;
  apellidos: string;
  dni: string;
  direccion?: string;
  telefono?: string;
}

export interface Documento {
  id?: string;
  tipo: string;
  asunto: string;
  contenido: string;
  remitente: string;
  destinatario: string;
}

export interface Oficina {
  id: number;
  codigo: string;
  nombre: string;
}

export interface Tramite {
  id?: number;
  numeroExpediente?: string;
  asunto: string;
  estado?: string;
  personaId: number;
  documentoId: string;
  oficinaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private tramiteUrl = `${environment.apiUrl}/tramites`;
  private personasUrl = `${environment.apiUrl}/personas`;
  private documentosUrl = `${environment.apiUrl}/documentos`;
  private oficinasUrl = `${environment.apiUrl}/oficinas`;

  constructor(private http: HttpClient) { }

  crearTramite(tramite: Tramite): Observable<Tramite> {
    return this.http.post<Tramite>(this.tramiteUrl, tramite);
  }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personasUrl, persona);
  }

  crearDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.documentosUrl, documento);
  }

  listarTramites(): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(this.tramiteUrl);
  }

  obtenerTramiteCompleto(id: number): Observable<any> {
    return this.http.get<any>(`${this.tramiteUrl}/completo/${id}`);
  }

  listarTiposDocumento(): Observable<string[]> {
    return this.http.get<string[]>(`${this.documentosUrl}/tipos`);
  }

  listarOficinas(): Observable<Oficina[]> {
    return this.http.get<Oficina[]>(this.oficinasUrl);
  }
}