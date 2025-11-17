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

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Persona> actualizar(@PathVariable Long id, @RequestBody Persona persona) {

        Persona existente = service.buscarPorId(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar campos
        existente.setNombres(persona.getNombres());
        existente.setApellidos(persona.getApellidos());
        existente.setDni(persona.getDni());
        existente.setDireccion(persona.getDireccion());
        existente.setTelefono(persona.getTelefono());

        Persona actualizado = service.guardar(existente);

        return ResponseEntity.ok(actualizado);
    }
}
