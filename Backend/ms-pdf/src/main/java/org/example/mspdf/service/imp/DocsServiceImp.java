package org.example.mspdf.service.imp;

import org.example.mspdf.repository.DocumentoPDFRepository;
import org.example.mspdf.service.DocsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.example.mspdf.entity.DocumentoPDF;
import java.util.List;
import java.util.Optional;


@Service
public class DocsServiceImp implements DocsService {

    @Autowired
    private DocumentoPDFRepository documentoPDFRepository;

    @Override
    public DocumentoPDF guardarDocumento(MultipartFile archivoImagen) {
        return convertirImagenAPDF(archivoImagen);
    }

    @Override
    public Optional<DocumentoPDF> obtenerDocumentoPorId(Long id) {
        return documentoPDFRepository.findById(id);
    }

    @Override
    public List<DocumentoPDF> obtenerTodosLosDocumentos() {
        return documentoPDFRepository.findAll();
    }

    @Override
    public byte[] obtenerContenidoPDF(Long id) {
        Optional<DocumentoPDF> documento = documentoPDFRepository.findById(id);
        return documento.map(DocumentoPDF::getContenido).orElse(null);
    }

    @Override
    public void eliminarDocumento(Long id) {

    }

    @Override
    public DocumentoPDF convertirImagenAPDF(MultipartFile archivoImagen) {
        return null;
    }
}
