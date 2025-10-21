package com.msnotificacion.service;

import com.msnotificacion.entity.Notificacion;

import java.util.List;

public interface NotificacionService {
    List<Notificacion> listar();
    Notificacion guardar(Notificacion notificacion);
    Notificacion buscarPorId(String id);
    void eliminar(String id);
}
