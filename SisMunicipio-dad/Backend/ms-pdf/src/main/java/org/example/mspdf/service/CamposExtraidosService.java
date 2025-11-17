package org.example.mspdf.service;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;

import java.util.List;
import java.util.Map;

public interface CamposExtraidosService {
    CamposExtraidos guardarEntidad(CamposExtraidos entidad);
    CamposExtraidos guardarCampos(Map<String, String> datos);
    List<DocumentoPDF> obtenerTodosLosDocumentos();
    CamposExtraidos findByDocumentoPDF(DocumentoPDF documento);
    List<CamposExtraidos> obtenerTodosLosDocumentosConCampos();
}
