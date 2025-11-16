export interface DocumentoPDF {
  id?: number;
  nombre?: string;
  contenido?: Uint8Array; // equivalente a byte[]
}
