package com.mspersona.service.impl;

import com.mspersona.entity.Persona;
import com.mspersona.repository.PersonaRepository;
import com.mspersona.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Persona> existente = repository.findByDni(persona.getDni());

        if (existente.isPresent()) {
            Persona p = existente.get();
            p.setNombres(persona.getNombres());
            p.setApellidos(persona.getApellidos());
            p.setDireccion(persona.getDireccion());
            p.setTelefono(persona.getTelefono());
            return repository.save(p);
        } else {
            return repository.save(persona);
        }
    }

    @Override
    public Persona buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Persona guardarConDocumento(Persona persona, byte[] documento) {
        persona.setDocumento(documento);
        return repository.save(persona);
    }
}
