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

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private baseUrl = 'http://localhost:9090/api/personas';

  constructor(private http: HttpClient) {}

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl, persona);
  }

  obtenerPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/${id}`);
  }

  listarPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl);
  }
}
