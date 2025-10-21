package com.msoficina.controller;

import com.msoficina.entity.Oficina;
import com.msoficina.service.OficinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/oficinas")
@RequiredArgsConstructor
public class OficinaController {

    private final OficinaService service;

    @GetMapping
    public ResponseEntity<List<Oficina>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oficina> obtener(@PathVariable Long id) {
        Oficina oficina = service.buscarPorId(id);
        return oficina != null ? ResponseEntity.ok(oficina) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Oficina> crear(@RequestBody Oficina oficina) {
        return ResponseEntity.ok(service.guardar(oficina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
