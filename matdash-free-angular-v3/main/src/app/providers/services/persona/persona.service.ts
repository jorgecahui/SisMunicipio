import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { environment } from "../../../../environments/environment";
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonaService extends EntityDataService<any> {
  
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.url}${END_POINTS.personas}`,           
      `${environment.url}${END_POINTS.persona_by_id}`,       
      `${environment.url}${END_POINTS.persona_delete}`,     
      `${environment.url}${END_POINTS.personas}`           
    );
  }

  public getByDni$(dni: string): Observable<any> {
    return this.getAll$().pipe(
      map((personas: any[]) => {
        const personaEncontrada = personas.find(persona => persona.dni === dni);
        console.log('Buscando DNI:', dni, 'Encontrado:', personaEncontrada);
        return personaEncontrada || null;
      })
    );
  }
}