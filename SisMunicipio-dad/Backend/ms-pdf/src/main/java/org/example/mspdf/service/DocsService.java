package org.example.mspdf.service;

import org.example.mspdf.entity.DocumentoPDF;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

public interface DocsService {
    DocumentoPDF guardarDocumento(MultipartFile archivoImagen);

    Optional<DocumentoPDF> obtenerDocumentoPorId(Long id);

    List<DocumentoPDF> obtenerTodosLosDocumentos();

    byte[] obtenerContenidoPDF(Long id);

    void eliminarDocumento(Long id);

    DocumentoPDF convertirImagenAPDF(MultipartFile archivoImagen);

}
