package com.mspersona.service;

import com.mspersona.entity.Persona;

import java.util.List;

public interface PersonaService {
    List<Persona> listar();
    Persona guardar(Persona persona);
    Persona buscarPorId(Long id);
    void eliminar(Long id);
    Persona guardarConDocumento(Persona persona, byte[] documento);
}
