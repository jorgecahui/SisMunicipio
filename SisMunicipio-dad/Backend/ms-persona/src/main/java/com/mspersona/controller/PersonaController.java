package com.mspersona.controller;

import com.mspersona.entity.Persona;
import com.mspersona.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@RequiredArgsConstructor
public class PersonaController {

    private final PersonaService service;

    @GetMapping
    public ResponseEntity<List<Persona>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> obtener(@PathVariable Long id) {
        Persona persona = service.buscarPorId(id);
        return persona != null ? ResponseEntity.ok(persona) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Persona> crear(@RequestBody Persona persona) {
        return ResponseEntity.ok(service.guardar(persona));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
