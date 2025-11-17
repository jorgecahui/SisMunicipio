package org.example.mspdf.service.imp;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.example.mspdf.repository.CamposExtraidosRepository;
import org.example.mspdf.service.CamposExtraidosService;
import org.example.mspdf.service.DocsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CamposExtraidosServiceImpl implements CamposExtraidosService {

    private final CamposExtraidosRepository camposExtraidosRepository;
    private DocsService docsService;

    public CamposExtraidosServiceImpl(CamposExtraidosRepository camposExtraidosRepository) {
        this.camposExtraidosRepository = camposExtraidosRepository;
    }

    @Override
    public CamposExtraidos guardarCampos(Map<String, String> datos) {
        CamposExtraidos campo = new CamposExtraidos();
        campo.setNombre(datos.getOrDefault("nombre", ""));
        campo.setDni(datos.getOrDefault("dni", ""));
        campo.setCodigo(datos.getOrDefault("codigo", ""));
        campo.setAsunto(datos.getOrDefault("asunto", ""));
        campo.setIdentificador(datos.getOrDefault("id", ""));
        return camposExtraidosRepository.save(campo);
    }

    @Override
    public List<DocumentoPDF> obtenerTodosLosDocumentos() {
        return docsService.obtenerTodosLosDocumentos();
    }

    @Override
    public CamposExtraidos findByDocumentoPDF(DocumentoPDF documento) {
        return camposExtraidosRepository.findByDocumentoPDF(documento).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<CamposExtraidos> obtenerTodosLosDocumentosConCampos() {
        return camposExtraidosRepository.findAllWithDocumento();
    }

    @Override
    public CamposExtraidos guardarEntidad(CamposExtraidos entidad) {
        return camposExtraidosRepository.save(entidad);
    }
}
