import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = '/api/tramites';
  private personasUrl = '/api/personas';
  private documentosUrl = '/api/documentos';

  constructor(private http: HttpClient) { }

  crearTramite(tramite: Tramite): Observable<Tramite> {
    return this.http.post<Tramite>(this.baseUrl, tramite);
  }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personasUrl, persona);
  }

  crearDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.documentosUrl, documento);
  }

  listarTramites(): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(this.baseUrl);
  }

  obtenerTramiteCompleto(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/completo/${id}`);
  }

  listarTiposDocumento(): Observable<string[]> {
    return this.http.get<string[]>(`${this.documentosUrl}/tipos`);
  }

  listarOficinas(): Observable<Oficina[]> {
    return this.http.get<Oficina[]>('/api/oficinas');
  }
}