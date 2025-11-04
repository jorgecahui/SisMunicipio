package org.example.mspdf.service;

import org.example.mspdf.entity.CamposExtraidos;

import java.util.Map;

public interface CamposExtraidosService {
    CamposExtraidos guardarEntidad(CamposExtraidos entidad);
    CamposExtraidos guardarCampos(Map<String, String> datos);
}
