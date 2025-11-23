import {EntityDataService} from "../../utils/entity-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {END_POINTS} from "../../utils/end-points";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class OficinaService extends EntityDataService<any> {
  constructor(http: HttpClient) {

    super(
      http,

      // GET ALL (listado general)
      `${environment.url}${END_POINTS.oficina_listar}`,

      // GET BY ID (usa el mismo endpoint)
      `${environment.url}${END_POINTS.oficina_listar}`,

      // DELETE
      `${environment.url}${END_POINTS.oficina_listar}`,

      `${environment.url}${END_POINTS.oficina_listar}`,
      `${environment.url}${END_POINTS.oficina_listar}`,


    );

  }

}
