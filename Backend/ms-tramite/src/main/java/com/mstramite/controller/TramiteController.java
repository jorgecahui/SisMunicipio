package com.mstramite.controller;

import com.mstramite.entity.Tramite;
import com.mstramite.model.TramiteCompletoDTO;
import com.mstramite.service.TramiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tramites")
@RequiredArgsConstructor
public class TramiteController {

    private final TramiteService service;

    @GetMapping
    public ResponseEntity<List<Tramite>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tramite> obtener(@PathVariable Long id) {
        Tramite tramite = service.buscarPorId(id);
        return tramite != null ? ResponseEntity.ok(tramite) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Tramite> crear(@RequestBody Tramite tramite) {
        return ResponseEntity.ok(service.guardar(tramite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/completo/{id}")
    public ResponseEntity<TramiteCompletoDTO> obtenerTramiteCompleto(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerTramiteCompleto(id));
    }
}
