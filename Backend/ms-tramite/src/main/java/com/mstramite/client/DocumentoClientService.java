package com.mstramite.client;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoClientService {

    private final DocumentoFeign documentoFeign;

    public DocumentoClientService(DocumentoFeign documentoFeign) {
        this.documentoFeign = documentoFeign;
    }

    public List<String> obtenerTiposDocumento() {
        return documentoFeign.tipos();
    }
}