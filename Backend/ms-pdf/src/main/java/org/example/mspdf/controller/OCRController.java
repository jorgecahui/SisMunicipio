package org.example.mspdf.controller;


import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.example.mspdf.repository.DocumentoPDFRepository;
import org.example.mspdf.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ocr")
public class OCRController {
    @Autowired
    private DocumentoPDFRepository documentoPDFRepository;
    @Autowired
    private CamposExtraidosService camposExtraidosService;


    @GetMapping("/listar")
    public List<Map<String, Object>> obtenerTodosLosDocumentos() {

        List<CamposExtraidos> lista = camposExtraidosService.obtenerTodosLosDocumentosConCampos();
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (CamposExtraidos c : lista) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", c.getId());
            DocumentoPDF doc = c.getDocumentoPDF();

            // NO devolver contenido del PDF, solo ID + nombre
            if (doc != null) {
                item.put("documentoId", doc.getId());
                item.put("nombreDocumento", doc.getNombre());
            } else {
                item.put("documentoId", null);
                item.put("nombreDocumento", null);
            }

            // Datos extraídos (lo que SÍ necesitas)
            item.put("codigo", c.getCodigo());
            item.put("nombre", c.getNombre());
            item.put("dni", c.getDni());
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

            String texto = ocrService.extractTextFromStream(file.getInputStream());

            if (texto == null || texto.isEmpty()) {
                return ResponseEntity.badRequest().body("No se detectó texto en la imagen.");
            }

            // Extraer campos desde texto
            TextoExtractorService extractor = new TextoExtractorService(camposExtraidosService);
            Map<String, String> campos = extractor.extraerCampos(texto);

            // Crear PDF
            PDFService pdfService = new PDFService();
            byte[] pdfBytes = pdfService.createPDFBytes(texto);

            // Guardar el PDF UNA SOLA VEZ
            DocumentoPDF documentoPDF = new DocumentoPDF();
            documentoPDF.setNombre(file.getOriginalFilename().replaceAll("\\..*$", ".pdf"));
            documentoPDF.setContenido(pdfBytes);
            documentoPDF = documentoPDFRepository.save(documentoPDF);

            // Guardar los campos extraídos
            CamposExtraidos camposEnt = new CamposExtraidos();
            camposEnt.setNombre(campos.get("nombre"));
            camposEnt.setDni(campos.get("dni"));
            camposEnt.setCodigo(campos.get("codigo"));
            camposEnt.setAsunto(campos.get("asunto"));
            camposEnt.setIdentificador(campos.get("id"));

            camposEnt.setNombreDocumento(documentoPDF.getNombre());
            camposEnt.setDocumentoPDF(documentoPDF);

            CamposExtraidos entidadGuardada = camposExtraidosService.guardarEntidad(camposEnt);

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
    // Actualizar
    @PutMapping("/actualizar/{id}")
    public CamposExtraidos actualizar(@PathVariable Long id, @RequestBody CamposExtraidos entidad) {
        return camposExtraidosService.actualizarEntidad(id, entidad);
    }

    // Eliminar
    @DeleteMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Long id) {
        camposExtraidosService.eliminarPorId(id);
        return "Entidad con id " + id + " eliminada";
    }
}
