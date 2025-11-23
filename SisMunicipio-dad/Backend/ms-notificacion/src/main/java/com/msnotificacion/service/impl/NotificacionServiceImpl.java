package com.msnotificacion.service.impl;

import com.msnotificacion.entity.Notificacion;
import com.msnotificacion.repository.NotificacionRepository;
import com.msnotificacion.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificacionServiceImpl implements NotificacionService {

    private final NotificacionRepository repository;

    @Override
    public List<Notificacion> listar() {
        return repository.findAll();
    }

    @Override
    public Notificacion guardar(Notificacion notificacion) {
        return repository.save(notificacion);
    }

    @Override
    public Notificacion buscarPorId(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
