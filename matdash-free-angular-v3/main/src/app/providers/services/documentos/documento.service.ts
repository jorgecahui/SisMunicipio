import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends EntityDataService<any> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.url}${END_POINTS.ocr_listar}`,        
      `${environment.url}${END_POINTS.ocr_listar}`,         
      `${environment.url}${END_POINTS.ocr_eliminar}`,      
      `${environment.url}${END_POINTS.ocr_convertir}`,     
      `${environment.url}${END_POINTS.ocr_actualizar}`     
    );
  }
}
