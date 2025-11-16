package org.example.mspdf.service.imp;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.repository.CamposExtraidosRepository;
import org.example.mspdf.service.CamposExtraidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

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
        campo.setDni(datos.getOrDefault("dni", ""));
        campo.setCodigo(datos.getOrDefault("codigo", ""));
        campo.setAsunto(datos.getOrDefault("asunto", ""));
        campo.setIdentificador(datos.getOrDefault("id", ""));
        return camposExtraidosRepository.save(campo);
    }
    @Override
    public CamposExtraidos guardarEntidad(CamposExtraidos entidad) {
        return camposExtraidosRepository.save(entidad);
    }

}
