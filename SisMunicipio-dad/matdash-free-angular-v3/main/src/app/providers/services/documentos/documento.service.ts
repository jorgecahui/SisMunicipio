import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { CamposExtraidos } from '../../../models/campos.extraidos';
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends EntityDataService<any> {

  constructor(http: HttpClient) {

    super(
      http,

      // GET ALL (listado general)
      `${environment.url}${END_POINTS.camposextraidos_listar}`,

      // GET BY ID (usa el mismo endpoint)
      `${environment.url}${END_POINTS.camposextraidos_listar}`,

      // DELETE
      `${environment.url}${END_POINTS.camposextraidos_eliminar}`
    );

  }
}
