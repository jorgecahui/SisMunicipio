package com.mspersona.service.impl;

import com.mspersona.entity.Persona;
import com.mspersona.repository.PersonaRepository;
import com.mspersona.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository repository;

    @Override
    public List<Persona> listar() {
        return repository.findAll();
    }

    @Override
    public Persona guardar(Persona persona) {
        return repository.save(persona);
    }

    @Override
    public Persona buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
