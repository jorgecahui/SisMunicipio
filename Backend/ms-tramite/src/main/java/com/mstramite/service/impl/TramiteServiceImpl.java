package com.mstramite.service.impl;

import com.mstramite.client.DocumentoClient;
import com.mstramite.client.NotificacionClient;
import com.mstramite.client.OficinaClient;
import com.mstramite.client.PersonaClient;
import com.mstramite.dto.DocumentoDTO;
import com.mstramite.dto.NotificacionDTO;
import com.mstramite.dto.OficinaDTO;
import com.mstramite.dto.PersonaDTO;
import com.mstramite.entity.Tramite;
import com.mstramite.model.TramiteCompletoDTO;
import com.mstramite.repository.TramiteRepository;
import com.mstramite.service.TramiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TramiteServiceImpl implements TramiteService {

    private final TramiteRepository repository;
    private final PersonaClient personaClient;
    private final OficinaClient oficinaClient;
    private final DocumentoClient documentoClient;
    private final NotificacionClient notificacionClient;

    @Override
    public List<Tramite> listar() {
        return repository.findAll();
    }

    @Override
    public Tramite guardar(Tramite tramite) {

        try {
            personaClient.getById(tramite.getPersonaId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Persona no encontrada");
        }

        if (tramite.getDocumentoId() != null) {
            try {
                documentoClient.getById(tramite.getDocumentoId());
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Documento no encontrado");
            }
        }

        try {
            oficinaClient.getById(tramite.getOficinaId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Oficina no encontrada");
        }

        tramite.setFechaInicio(LocalDateTime.now());
        tramite.setEstado("EN PROCESO");
        Tramite guardado = repository.save(tramite);

        try {
            NotificacionDTO noti = new NotificacionDTO(
                    null,
                    "mesa.partes@muni.pe",
                    "Nuevo trámite creado",
                    "Se ha creado el trámite N° " + guardado.getNumeroExpediente(),
                    "TRAMITE",
                    LocalDateTime.now()
            );
            notificacionClient.enviar(noti);
        } catch (Exception ex) {
            System.out.println("Error al enviar notificación (se continúa igual): " + ex.getMessage());
        }
        return guardado;
    }

    @Override
    public Tramite buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    @Override
    public TramiteCompletoDTO obtenerTramiteCompleto(Long id) {
        Tramite tramite = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trámite no encontrado"));

        // DTOs internos
        com.mstramite.model.PersonaDTO personaModel = null;
        com.mstramite.model.DocumentoDTO documentoModel = null;
        com.mstramite.model.OficinaDTO oficinaModel = null;

        // Llamadas Feign
        try {
            com.mstramite.dto.PersonaDTO personaFeign = personaClient.getById(tramite.getPersonaId());
            // Mapeo manual
            personaModel = com.mstramite.model.PersonaDTO.builder()
                    .id(personaFeign.id())
                    .nombres(personaFeign.nombres())
                    .apellidos(personaFeign.apellidos())
                    .dni(personaFeign.dni())
                    .direccion(personaFeign.direccion())
                    .telefono(personaFeign.telefono())
                    .build();
        } catch (Exception ignored) { }

        if (tramite.getDocumentoId() != null) {
            try {
                com.mstramite.dto.DocumentoDTO documentoFeign = documentoClient.getById(tramite.getDocumentoId());
                documentoModel = com.mstramite.model.DocumentoDTO.builder()
                        .id(documentoFeign.id())
                        .tipo(documentoFeign.tipo())
                        .asunto(documentoFeign.asunto())
                        .contenido(documentoFeign.contenido())
                        .remitente(documentoFeign.remitente())
                        .destinatario(documentoFeign.destinatario())
                        .build();
            } catch (Exception ignored) { }
        }

        try {
            com.mstramite.dto.OficinaDTO oficinaFeign = oficinaClient.getById(tramite.getOficinaId());
            oficinaModel = com.mstramite.model.OficinaDTO.builder()
                    .id(oficinaFeign.id())
                    .codigo(oficinaFeign.codigo())
                    .nombre(oficinaFeign.nombre())
                    .ubicacion(oficinaFeign.ubicacion())
                    .telefono(oficinaFeign.telefono())
                    .responsable(oficinaFeign.responsable())
                    .build();
        } catch (Exception ignored) { }

        return TramiteCompletoDTO.builder()
                .id(tramite.getId())
                .numeroExpediente(tramite.getNumeroExpediente())
                .asunto(tramite.getAsunto())
                .estado(tramite.getEstado())
                .fechaInicio(tramite.getFechaInicio())
                .fechaFin(tramite.getFechaFin())
                .persona(personaModel)
                .documento(documentoModel)
                .oficina(oficinaModel)
                .build();
    }

}