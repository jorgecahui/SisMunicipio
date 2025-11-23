package com.mstramite.controller;

import com.mstramite.client.DocumentoClientService;
import com.mstramite.entity.Tramite;
import com.mstramite.model.TramiteCompletoDTO;
import com.mstramite.service.TramiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tramites")
@RequiredArgsConstructor
public class TramiteController {

    private final TramiteService service;
    private final DocumentoClientService documentoClientService;

    @GetMapping
    public ResponseEntity<List<Tramite>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tramite> obtener(@PathVariable Long id) {
        Tramite tramite = service.buscarPorId(id);
        return tramite != null ? ResponseEntity.ok(tramite) : ResponseEntity.notFound().build();
    }

    @PostMapping("/creartra")
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

    @GetMapping("/crear")
    public String formularioCrearTramite(Model model) {
        List<String> tiposDocumento = documentoClientService.obtenerTiposDocumento();
        model.addAttribute("tiposDocumento", tiposDocumento);
        return "formularioTramite";
    }
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Tramite> actualizarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        return ResponseEntity.ok(service.actualizarEstado(id, estado));
    }
}
