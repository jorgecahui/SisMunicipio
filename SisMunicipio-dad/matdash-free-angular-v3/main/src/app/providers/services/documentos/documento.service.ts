import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';
import { CamposExtraidos } from '../../../models/campos.extraidos';

@Injectable({ providedIn: 'root' })
export class DocumentoService extends EntityDataService<CamposExtraidos[]> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.camposextraidos);
  }
}
