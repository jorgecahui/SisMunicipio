package com.mstramite.service.impl;

import com.mstramite.entity.Tramite;
import com.mstramite.repository.TramiteRepository;
import com.mstramite.service.TramiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TramiteServiceImpl implements TramiteService {

    private final TramiteRepository repository;

    @Override
    public List<Tramite> listar() {
        return repository.findAll();
    }

    @Override
    public Tramite guardar(Tramite tramite) {
        return repository.save(tramite);
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