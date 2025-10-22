package com.mstramite.service.impl;

import com.mstramite.client.DocumentoClient;
import com.mstramite.client.NotificacionClient;
import com.mstramite.client.OficinaClient;
import com.mstramite.client.PersonaClient;
import com.mstramite.dto.NotificacionDTO;
import com.mstramite.entity.Tramite;
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
}