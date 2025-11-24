import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends EntityDataService<any> {

  constructor(
    http: HttpClient,
    private authService: AuthService // Inyectar AuthService
  ) {
    super(
      http,
      `${environment.url}${END_POINTS.camposextraidos_listar}`,
      `${environment.url}${END_POINTS.camposextraidos_listar}`,
      `${environment.url}${END_POINTS.camposextraidos_eliminar}`,
      `${environment.url}${END_POINTS.camposetraidos_crear}`,
      `${environment.url}${END_POINTS.camposestraidos_editar}`
    );
  }

  // ✅ SOBRESCRIBIR getAll$ para enviar headers personalizados
  public override getAll$(): Observable<any> {
    const user = this.authService.getCurrentUser();
    const headers = new HttpHeaders({
      'X-User-Id': user?.personaId?.toString() || '',
      'Content-Type': 'application/json'
    });

    console.log('🔗 URL llamada:', this.baseUrl);
    console.log('👤 User ID enviado:', user?.personaId);
    console.log('📋 Headers:', headers);

    return this.httpClient.get<any>(this.baseUrl, { headers });
  }

  // ✅ Opcional: Sobrescribir otros métodos si también necesitan el header
  public override getById$(id: string): Observable<any> {
    const user = this.authService.getCurrentUser();
    const headers = new HttpHeaders({
      'X-User-Id': user?.personaId?.toString() || '',
      'Content-Type': 'application/json'
    });

    const url = this.listarByIdUrl
      ? `${this.listarByIdUrl}/${id}`
      : `${this.baseUrl}/${id}`;

    return this.httpClient.get<any>(url, { headers });
  }
}
