package com.mspersona.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mspersona.entity.Persona;
import com.mspersona.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping("/crear-con-documento")
    public ResponseEntity<Persona> crearConDocumento(@RequestParam("persona") String personaJson,
                                                     @RequestParam("documento") MultipartFile documento) throws IOException {

        Persona persona = new ObjectMapper().readValue(personaJson, Persona.class);

        byte[] documentoBytes = documento.getBytes();

        Persona personaGuardada = service.guardarConDocumento(persona, documentoBytes);

        return ResponseEntity.status(HttpStatus.CREATED).body(personaGuardada);
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

        existente.setNombres(persona.getNombres());
        existente.setApellidos(persona.getApellidos());
        existente.setDni(persona.getDni());
        existente.setDireccion(persona.getDireccion());
        existente.setTelefono(persona.getTelefono());

        Persona actualizado = service.guardar(existente);

        return ResponseEntity.ok(actualizado);
    }
}
