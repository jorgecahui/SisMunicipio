package com.msdocumento.controller;

import com.msdocumento.entity.Documento;
import com.msdocumento.service.DocumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documentos")
@RequiredArgsConstructor
public class DocumentoController {

    private final DocumentoService service;

    @GetMapping
    public ResponseEntity<List<Documento>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documento> obtener(@PathVariable String id) {
        Documento documento = service.buscarPorId(id);
        return documento != null ? ResponseEntity.ok(documento) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Documento> crear(@RequestBody Documento documento) {
        return ResponseEntity.ok(service.guardar(documento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}