export interface Categoria {
  id?: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
  precios?: any[] | null;
}
