package org.example.mspdf.service.imp;

import org.example.mspdf.repository.DocumentoPDFRepository;
import org.example.mspdf.service.CamposExtraidosService;
import org.example.mspdf.service.DocsService;
import org.example.mspdf.service.PDFTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.example.mspdf.entity.DocumentoPDF;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class DocsServiceImp implements DocsService {

    @Autowired
    private DocumentoPDFRepository documentoPDFRepository;
    @Autowired
    private PDFTemplateService pdfTemplateService;
    @Autowired
    private CamposExtraidosService camposExtraidosService;

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
        return documentoPDFRepository.findById(id)
                .map(DocumentoPDF::getContenido)
                .orElse(null);
    }

    @Override
    public void eliminarDocumento(Long id) {

    }
    private static final Map<String,String> MAPPING_CARTA = Map.of(
            "tpl_nombre", "nombre",
            "tpl_dni", "dni",
            "tpl_asunto", "asunto",
            "tpl_remitente", "remitente",
            "tpl_destinatario", "destinatario",
            "tpl_dirrecion", "dirección/vivienda",
            "tpl_procincia","lugar/porcedencia",
            "tpl_fecha", "fecha"
    );

    private static final Map<String,String> MAPPING_OFICIO = Map.of(
            "tpl_nombre", "nombre",
            "tpl_cargo", "cargo",
            "tpl_asunto", "asunto",
            "tpl_destinatario", "destinatario",
            "tpl_fecha", "fecha",
            "tpl_codigo", "codigo"
    );

    private static final Map<String,String> MAPPING_SOLICITUD = Map.of(
            "tpl_nombre", "nombre",
            "tpl_dni", "dni",
            "tpl_asunto", "asunto",
            "tpl_detalle", "detalle",
            "tpl_tipo_solicitud", "tipo_solicitud",
            "tpl_fecha", "fecha"
    );

    public Map<String,String> getMapping(String tipo) {
        return switch(tipo) {
            case "SOLICITUD" -> MAPPING_SOLICITUD;
            case "OFICIO" -> MAPPING_OFICIO;
            default -> MAPPING_CARTA;
        };
    }

    @Override
    public DocumentoPDF convertirImagenAPDF(MultipartFile archivoImagen) {

        try {
            // 1. Extraer campos mediante OCR + regex
            Map<String, String> datosExtraidos =
                    camposExtraidosService.extraerCampos(archivoImagen.getInputStream());

            // 2. Detectar el tipo de documento
            String tipoDocumento = camposExtraidosService.detectarTipo(datosExtraidos);

            // 3. Obtener mapping
            Map<String, String> mapping = getMapping(tipoDocumento);

            // 4. Crear PDF final
            byte[] pdfGenerado =
                    pdfTemplateService.crearPDFFromTemplate(tipoDocumento, mapping, datosExtraidos);

            // 5. Guardar documento
            DocumentoPDF documentoPDF = new DocumentoPDF();
            documentoPDF.setNombre(
                    archivoImagen.getOriginalFilename().replaceAll("\\..*$", ".pdf")
            );
            documentoPDF.setContenido(pdfGenerado);

            return documentoPDFRepository.save(documentoPDF);

        } catch (Exception e) {
            throw new RuntimeException("Error al convertir la imagen a PDF con plantilla", e);
        }
    }

}
