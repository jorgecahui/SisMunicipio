package com.msoficina.service.impl;

import com.msoficina.entity.Oficina;
import com.msoficina.repository.OficinaRepository;
import com.msoficina.service.OficinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OficinaServiceImpl implements OficinaService {

    private final OficinaRepository repository;

    @Override
    public List<Oficina> listar() {
        return repository.findAll();
    }

    @Override
    public Oficina guardar(Oficina oficina) {
        return repository.save(oficina);
    }

    @Override
    public Oficina buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
