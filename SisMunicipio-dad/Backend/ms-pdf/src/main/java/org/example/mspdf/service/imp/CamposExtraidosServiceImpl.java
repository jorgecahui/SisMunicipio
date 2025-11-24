package org.example.mspdf.service.imp;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.example.mspdf.repository.CamposExtraidosRepository;
import org.example.mspdf.service.CamposExtraidosService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.*;

@Service
public class CamposExtraidosServiceImpl implements CamposExtraidosService {

    private final CamposExtraidosRepository camposExtraidosRepository;


    public CamposExtraidosServiceImpl(CamposExtraidosRepository camposExtraidosRepository) {
        this.camposExtraidosRepository = camposExtraidosRepository;
    }

    @Override
    public CamposExtraidos guardarCampos(Map<String, String> datos) {
        CamposExtraidos campo = new CamposExtraidos();
        campo.setNombre(datos.getOrDefault("nombre", ""));
        campo.setDNI(datos.getOrDefault("DNI", ""));
        campo.setCodigo(datos.getOrDefault("codigo", ""));
        campo.setAsunto(datos.getOrDefault("asunto", ""));
        campo.setIdentificador(datos.getOrDefault("id", ""));
        return camposExtraidosRepository.save(campo);
    }

    @Override
    public List<DocumentoPDF> obtenerTodosLosDocumentos() {
        return List.of();
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
    public Optional<CamposExtraidos> findById(Long id) {
        return camposExtraidosRepository.findById(id);
    }

    @Override
    public CamposExtraidos actualizarEntidad(Long id, CamposExtraidos entidad) {
        return camposExtraidosRepository.save(entidad);
    }

    @Override
    public void eliminarPorId(Long id) {
        camposExtraidosRepository.deleteById(id);
    }

    @Override
    public Map<String, String> extraerCampos(InputStream imagenStream) {
        return Map.of();
    }

    @Override
    public String detectarTipo(Map<String, String> campos) {
        return "";
    }

    @Override
    public List<CamposExtraidos> obtenerDocumentosPorUsuario(Long personaId) {
        return camposExtraidosRepository.findByPersonaId(personaId);
    }

    @Override
    public CamposExtraidos guardarEntidad(CamposExtraidos entidad) {
        return camposExtraidosRepository.save(entidad);
    }
}
