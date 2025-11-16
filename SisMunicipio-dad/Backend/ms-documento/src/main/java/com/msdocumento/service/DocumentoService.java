package com.msdocumento.service;

import com.msdocumento.entity.Documento;

import java.util.List;

public interface DocumentoService {
    List<Documento> listar();
    Documento guardar(Documento documento);
    Documento buscarPorId(String id);
    void eliminar(String id);
}
