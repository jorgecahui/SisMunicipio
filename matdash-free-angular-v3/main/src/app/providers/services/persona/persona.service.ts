import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import {environment} from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PersonaService extends EntityDataService<any> {
  constructor(http: HttpClient) {

    super(
      http,

      // GET ALL (listado general)
      `${environment.url}${END_POINTS.personas}`,

      // GET BY ID (usa el mismo endpoint)
      `${environment.url}${END_POINTS.persons_id}`,

      // DELETE
      `${environment.url}${END_POINTS.persons_delet}`,

      `${environment.url}${END_POINTS.persons_post}`,
      //`${environment.url}${END_POINTS.camposestraidos_editar}`,


    );

  }
}
