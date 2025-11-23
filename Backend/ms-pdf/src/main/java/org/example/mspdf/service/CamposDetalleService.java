package org.example.mspdf.service;

import org.example.mspdf.entity.CamposDetalle;
import org.example.mspdf.entity.CamposExtraidos;

import java.util.List;
import java.util.Map;

public interface CamposDetalleService {
    void guardarDetalles(Map<String, String> campos, CamposExtraidos padre);

    List<CamposDetalle> obtenerDetallesPorDocumento(Long id);
}
