package com.msoficina.service;

import com.msoficina.entity.Oficina;

import java.util.List;

public interface OficinaService {
    List<Oficina> listar();
    Oficina guardar(Oficina oficina);
    Oficina buscarPorId(Long id);
    void eliminar(Long id);
}