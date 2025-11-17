import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class EntityDataService<T> {

  constructor(
    protected httpClient: HttpClient,

    // ENDPOINT principal (ej: /api/ocr)
    protected baseUrl: string,

    // ENDPOINT opcional para listar por ID (ej: /api/ocr/listar)
    protected listarByIdUrl?: string,

    // ENDPOINT opcional para eliminar (ej: /api/ocr/delete)
    protected eliminarUrl?: string,

    protected editarUrl?:string,
  ) {}

  /** GET ALL */
  public getAll$(): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}`);
  }

  /** GET BY ID */
  public getById$(id: string): Observable<T> {

    const url = this.listarByIdUrl
      ? `${this.listarByIdUrl}/${id}`
      : `${this.baseUrl}/${id}`;

    return this.httpClient.get<T>(url);
  }

  /** POST */
  public add$(entity: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}`, entity);
  }

  /** PUT */
  public update$(id: string, entity: any): Observable<T> {
    const url = this.editarUrl
      ? `${this.editarUrl}/${id}`
      : `${this.baseUrl}/${id}`;

    return this.httpClient.put<T>(url, entity);
  }

  /** DELETE */
  public delete$(id: number | string): Observable<any> {

    const url = this.eliminarUrl
      ? `${this.eliminarUrl}/${id}`
      : `${this.baseUrl}/${id}`;

    return this.httpClient.delete(url, { responseType: 'text' });
  }
}
