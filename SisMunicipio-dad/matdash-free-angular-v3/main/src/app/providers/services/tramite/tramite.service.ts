import {Injectable} from "@angular/core";
import {EntityDataService} from "../../utils/entity-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {END_POINTS} from "../../utils/end-points";

@Injectable({ providedIn: 'root' })
export class PersonaService extends EntityDataService<any> {
  constructor(http: HttpClient) {

    super(
      http,

      // GET ALL (listado general)
      `${environment.url}${END_POINTS.camposextraidos_listar}`,

      // GET BY ID (usa el mismo endpoint)
      `${environment.url}${END_POINTS.tramite_id}`,

      // DELETE
      `${environment.url}${END_POINTS.tramite_eliminar}`,

      `${environment.url}${END_POINTS.tramite_crear}`,
      //`${environment.url}${END_POINTS.camposestraidos_editar}`,


    );

  }
}
