package com.msdocumento.service.impl;

import com.msdocumento.entity.Documento;
import com.msdocumento.repository.DocumentoRepository;
import com.msdocumento.service.DocumentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentoServiceImpl implements DocumentoService {

    private final DocumentoRepository repository;

    @Override
    public List<Documento> listar() {
        return repository.findAll();
    }

    @Override
    public Documento guardar(Documento documento) {
        return repository.save(documento);
    }

    @Override
    public Documento buscarPorId(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
