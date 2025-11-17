import {DocumentoPDF} from "./documentopdf";

export interface CamposExtraidos {
  id?: number;
  nombre?: string;
  dni?: string;
  codigo?: string;
  asunto?: string;
  identificador?: string;
  documentoPDF?: DocumentoPDF;
  nombreDocumento?: string;
}
