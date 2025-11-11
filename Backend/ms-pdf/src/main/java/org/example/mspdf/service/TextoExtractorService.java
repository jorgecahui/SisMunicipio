package org.example.mspdf.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Service
public class TextoExtractorService {

    private final CamposExtraidosService camposExtraidosService;

    public TextoExtractorService(CamposExtraidosService campoExtraidoService) {
        this.camposExtraidosService = campoExtraidoService;
    }
    public Map<String, String> extraerCampos(String textoOCR) {
        Map<String, String> datos = new HashMap<>();

        String texto = textoOCR.replace("\n", " ").replace("\r", " ");

        datos.put("nombre", buscarCampo(texto, "(?i)nombre[:\\s]+([A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+)"));
        datos.put("id", buscarCampo(texto, "(?i)id[:\\s]+(\\d+)"));
        datos.put("dni", buscarCampo(texto, "(?i)dni[:\\s]+(\\d{8})"));
        datos.put("codigo", buscarCampo(texto, "(?i)código[:\\s]+([A-Za-z0-9-]+)"));
        datos.put("asunto", buscarCampo(texto, "(?i)asunto[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"));

        camposExtraidosService.guardarCampos(datos);

        return datos;
    }

    private String buscarCampo(String texto, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(texto);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "";
    }
}
