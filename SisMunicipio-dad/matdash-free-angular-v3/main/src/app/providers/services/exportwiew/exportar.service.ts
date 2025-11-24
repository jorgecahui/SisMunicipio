import {Injectable} from "@angular/core";
import {EntityDataService} from "../../utils/entity-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {END_POINTS} from "../../utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class ExportarService extends EntityDataService<any> {

  constructor(http: HttpClient) {

    super(
      http,
      `${environment.url}${END_POINTS.camposexportar}`,
    );

  }
}
