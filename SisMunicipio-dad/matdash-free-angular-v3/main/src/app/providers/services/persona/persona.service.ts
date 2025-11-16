import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { Persona } from '../../../models/persona.model';

@Injectable({ providedIn: 'root' })
export class PersonaService extends EntityDataService<Persona[]> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.personas);
  }
}