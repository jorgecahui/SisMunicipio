package com.mstramite.client;

import com.mstramite.dto.DocumentoDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoClientService {

    private final DocumentoClient documentoClient;

    public DocumentoClientService(DocumentoClient documentoClient) {
        this.documentoClient = documentoClient;
    }

    public DocumentoDTO obtenerDocumentoPorId(String id) {
        return documentoClient.getById(id);
    }

    public List<String> obtenerTiposDocumento() {
        return documentoClient.tipos();
    }
}