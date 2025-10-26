import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private baseUrl = '/api/documentos';

  constructor(private http: HttpClient) { }

  obtenerTiposDocumento(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/tipos`);
  }
}
