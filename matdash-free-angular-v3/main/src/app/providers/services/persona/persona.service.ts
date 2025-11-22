import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { environment } from "../../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonaService extends EntityDataService<any> {

  constructor(private http: HttpClient) { // Asegúrate de que 'http' esté correctamente inyectado
    super(
      http,
      `${environment.url}${END_POINTS.personas}`,
      `${environment.url}${END_POINTS.persons_id}`,
      `${environment.url}${END_POINTS.persons_delet}`,
      `${environment.url}${END_POINTS.persons_post}`
    );
  }

  // Nuevo método para crear persona con documento
  createWithDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.url}${END_POINTS.persons_post}`, formData);
  }
}
