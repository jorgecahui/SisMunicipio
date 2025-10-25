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
  id: number;
  numeroExpediente?: string;
  asunto: string;
  estado?: string;
  personaId: number;
  documentoId?: string;
  oficinaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private baseUrl = 'http://localhost:9090/api/tramites';
  private personasUrl = 'http://localhost:9090/api/personas';

  constructor(private http: HttpClient) { }

  // Crear trámite
  crearTramite(tramite: Tramite): Observable<Tramite> {
    return this.http.post<Tramite>(this.baseUrl, tramite);
  }

  // Crear persona
  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personasUrl, persona);
  }

  listarTramites(): Observable<Tramite[]> {
  return this.http.get<Tramite[]>(this.baseUrl);
  }

  // Obtener trámite completo
  obtenerTramiteCompleto(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/completo/${id}`);
  }

  // Listar tipos de documento
  listarTiposDocumento(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:9090/api/documentos/tipos');
  }

  // Listar oficinas
  listarOficinas(): Observable<Oficina[]> {
    return this.http.get<Oficina[]>('http://localhost:9090/api/oficinas');
  }
}