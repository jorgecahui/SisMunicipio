package com.mstramite.service;

import com.mstramite.entity.Tramite;

import java.util.List;

public interface TramiteService {
    List<Tramite> listar();
    Tramite guardar(Tramite tramite);
    Tramite buscarPorId(Long id);
    void eliminar(Long id);
}
