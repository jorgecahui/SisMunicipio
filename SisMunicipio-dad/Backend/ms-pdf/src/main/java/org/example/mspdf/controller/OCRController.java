package org.example.mspdf.controller;

import org.springframework.core.io.Resource; // ✅ Correcto
import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.example.mspdf.entity.CamposDetalle;
import org.example.mspdf.repository.DocumentoPDFRepository;
import org.example.mspdf.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/ocr")
public class OCRController {

    @Autowired
    private DocumentoPDFRepository documentoPDFRepository;
    @Autowired
    private PdfExportService pdfExportService;

    @Autowired
    private CamposExtraidosService camposExtraidosService;

    @Autowired
    private CamposDetalleService camposDetalleService; // ← NUEVO

    @GetMapping("/listar")
    public List<Map<String, Object>> obtenerTodosLosDocumentos() {

        List<CamposExtraidos> lista = camposExtraidosService.obtenerTodosLosDocumentosConCampos();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (CamposExtraidos c : lista) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", c.getId());
            DocumentoPDF doc = c.getDocumentoPDF();

            if (doc != null) {
                item.put("documentoId", doc.getId());
                item.put("nombreDocumento", doc.getNombre());
            } else {
                item.put("documentoId", null);
                item.put("nombreDocumento", null);
            }

            item.put("codigo", c.getCodigo());
            item.put("nombre", c.getNombre());
            item.put("dni", c.getDNI());
            item.put("asunto", c.getAsunto());
            item.put("identificador", c.getIdentificador());

            resultado.add(item);
        }

        return resultado;
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<CamposExtraidos> obtenerPorId(@PathVariable Long id) {
        CamposExtraidos entidad = camposExtraidosService.findById(id).orElse(null);
        if (entidad == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entidad);
    }

    @PostMapping("/convertir")
    public ResponseEntity<?> convertirImagenAPDF(@RequestParam("file") MultipartFile file) {
        try {
            // OCR
            OCRService ocrService = new OCRService(
                    "D:/AMANECIDA/SisMunicipio-funcionalidad/SisMunicipio/Backend/ms-pdf/tessdata/tessdata1"
            );

            String texto = ocrService.extractTextFromPDF(file.getInputStream());

            if (texto == null || texto.isEmpty()) {
                return ResponseEntity.badRequest().body("No se detectó texto en la imagen.");
            }

            // Extraer campos dinámicos
            TextoExtractorService extractor = new TextoExtractorService(camposExtraidosService);
            Map<String, String> campos = extractor.extraerCampos(texto);

            // Crear PDF
            PDFService pdfService = new PDFService();
            byte[] pdfBytes = pdfService.createPDFBytes(texto);

            // Guardar PDF
            DocumentoPDF documentoPDF = new DocumentoPDF();
            documentoPDF.setNombre(file.getOriginalFilename().replaceAll("\\..*$", ".pdf"));
            documentoPDF.setContenido(pdfBytes);
            documentoPDF = documentoPDFRepository.save(documentoPDF);

            // Guardar entidad principal
            CamposExtraidos camposEnt = new CamposExtraidos();
            camposEnt.setNombre(campos.get("nombre"));
            camposEnt.setDNI(campos.get("dni"));
            camposEnt.setCodigo(campos.get("codigo"));
            camposEnt.setAsunto(campos.get("asunto"));
            camposEnt.setIdentificador(campos.get("id"));
            camposEnt.setNombreDocumento(documentoPDF.getNombre());
            camposEnt.setDocumentoPDF(documentoPDF);

            CamposExtraidos entidadGuardada = camposExtraidosService.guardarEntidad(camposEnt);

            camposDetalleService.guardarDetalles(campos, entidadGuardada);

            return ResponseEntity.ok(Map.of(
                    "mensaje", "PDF generado y guardado",
                    "id_documento", documentoPDF.getId(),
                    "id_campos", entidadGuardada.getId(),
                    "campos_extraidos", campos
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Error al procesar la imagen: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar/{id}")
    public CamposExtraidos actualizar(@PathVariable Long id, @RequestBody CamposExtraidos entidad) {
        return camposExtraidosService.actualizarEntidad(id, entidad);
    }

    @DeleteMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Long id) {
        camposExtraidosService.eliminarPorId(id);
        return "Entidad con id " + id + " eliminada";
    }

    @GetMapping("/detalles/{id}")
    public List<CamposDetalle> listarDetalles(@PathVariable Long id) {
        return camposDetalleService.obtenerDetallesPorDocumento(id);
    }


    @GetMapping("/exportdb/{id:\\d+}") // Solo números → exportar(Long id)
    public ResponseEntity<String> exportar(@PathVariable Long id) {
        try {
            String nombreArchivo = pdfExportService.exportarPDF(id);
            return ResponseEntity.ok("PDF exportado: " + nombreArchivo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/exportpdf/{filename:[a-zA-Z0-9._\\-]+}") // Solo texto → getPdf(String filename)
    public ResponseEntity<Resource> getPdf(@PathVariable String filename) throws IOException {
        if (filename == null || filename.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        filename = filename.replaceAll("[^a-zA-Z0-9._-]", "_");

        Path pdfPath = Paths.get("src/main/resources/pdfs").resolve(filename).normalize();

        if (!Files.exists(pdfPath)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(pdfPath.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }



}
