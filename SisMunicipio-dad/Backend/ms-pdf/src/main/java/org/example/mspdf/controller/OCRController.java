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
    @PostMapping("/convertir")
    public ResponseEntity<?> convertirImagenAPDF(@RequestParam("file") MultipartFile file) {
        try {
            OCRService ocrService = new OCRService("D:/AMANECIDA/SisMunicipio-funcionalidad/SisMunicipio/Backend/ms-pdf/tessdata/tessdata1");
            String texto = ocrService.extractTextFromStream(file.getInputStream());

            if (texto == null || texto.isEmpty()) {
                return ResponseEntity.badRequest().body("No se detectó texto en la imagen.");
            }

            TextoExtractorService extractor = new TextoExtractorService(camposExtraidosService);
            Map<String, String> campos = extractor.extraerCampos(texto);


            PDFService pdfService = new PDFService();
            byte[] pdfBytes = pdfService.createPDFBytes(texto);

            DocumentoPDF doc = new DocumentoPDF();
            doc.setNombre(file.getOriginalFilename().replaceAll("\\..*$", ".pdf"));
            doc.setContenido(pdfBytes);
            documentoPDFRepository.save(doc);

            CamposExtraidos camposGuardados = new CamposExtraidos();
            camposGuardados.setNombre(campos.get("nombre"));
            camposGuardados.setDni(campos.get("dni"));
            camposGuardados.setCodigo(campos.get("codigo"));
            camposGuardados.setAsunto(campos.get("asunto"));
            camposGuardados.setIdentificador(campos.get("id"));
            camposGuardados.setNombreDocumento(doc.getNombre());
            camposGuardados.setDocumentoPDF(doc);

            CamposExtraidos entidadGuardada = camposExtraidosService.guardarEntidad(camposGuardados);
            return ResponseEntity.ok(Map.of(
                    "mensaje", "PDF generado y guardado con ID: " + doc.getId(),
                    "texto_detectado", texto,
                    "campos_extraidos", campos
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al procesar la imagen: " + e.getMessage());
        }
    }
}
