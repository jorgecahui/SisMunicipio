import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  private baseUrl = '/api/oficinas';

  constructor(private http: HttpClient) { }

  listarOficinas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
