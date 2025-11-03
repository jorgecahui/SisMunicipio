package org.example.mspdf.service;

import org.example.mspdf.entity.DocumentoPDF;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

public interface DocsService {
    DocumentoPDF guardarDocumento(MultipartFile archivoImagen);

    // Obtener documento por ID
    Optional<DocumentoPDF> obtenerDocumentoPorId(Long id);

    // Obtener todos los documentos
    List<DocumentoPDF> obtenerTodosLosDocumentos();

    // Obtener contenido del PDF como byte[]
    byte[] obtenerContenidoPDF(Long id);

    // Eliminar documento
    void eliminarDocumento(Long id);

    // Convertir imagen a PDF
    DocumentoPDF convertirImagenAPDF(MultipartFile archivoImagen);

}
