package org.example.mspdf.service.imp;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.example.mspdf.fegin.PersonaClient;
import org.example.mspdf.repository.CamposExtraidosRepository;
import org.example.mspdf.service.CamposExtraidosService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.*;

@Service
@Transactional
public class CamposExtraidosServiceImpl implements CamposExtraidosService {

    private final CamposExtraidosRepository camposExtraidosRepository;
    private final PersonaClient personaClient;

    public CamposExtraidosServiceImpl(CamposExtraidosRepository camposExtraidosRepository, PersonaClient personaClient) {
        this.camposExtraidosRepository = camposExtraidosRepository;
        this.personaClient = personaClient;
    }

    @Override
    public List<DocumentoPDF> obtenerTodosLosDocumentos() {
        return List.of(); // o tu implementación actual
    }

    public List<CamposExtraidos> obtenerTodosLosCamposExtraidos() {
        System.out.println("   📂 Ejecutando findAll() en repository");
        List<CamposExtraidos> result = camposExtraidosRepository.findAll();
        System.out.println("   📊 Resultado findAll(): " + result.size() + " documentos");
        return result;
    }

    // ✅ MÉTODO para obtener documentos según rol
    public List<CamposExtraidos> obtenerDocumentosSegunRol(Long personaId, boolean esAdmin) {
        System.out.println("🔧 Service: obtenerDocumentosSegunRol");
        System.out.println("   👤 PersonaId: " + personaId);
        System.out.println("   🎭 Es admin: " + esAdmin);

        if (esAdmin) {
            System.out.println("   📂 Obteniendo TODOS los documentos (admin)");
            List<CamposExtraidos> todos = obtenerTodosLosCamposExtraidos();
            System.out.println("   📊 Total documentos encontrados: " + todos.size());
            return todos;
        } else {
            System.out.println("   📂 Obteniendo documentos del usuario: " + personaId);
            List<CamposExtraidos> usuario = obtenerDocumentosPorUsuario(personaId);
            System.out.println("   📊 Documentos del usuario: " + usuario.size());
            return usuario;
        }
    }

    // ... el resto de tus métodos existentes se mantienen igual
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
        System.out.println("   📂 Ejecutando findByPersonaId(" + personaId + ")");
        List<CamposExtraidos> result = camposExtraidosRepository.findByPersonaId(personaId);
        System.out.println("   📊 Resultado findByPersonaId: " + result.size() + " documentos");
        return result;
    }

    @Override
    public CamposExtraidos guardarEntidad(CamposExtraidos entidad) {
        return camposExtraidosRepository.save(entidad);
    }
}

