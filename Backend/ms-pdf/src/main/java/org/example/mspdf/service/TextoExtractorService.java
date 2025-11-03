package org.example.mspdf.service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextoExtractorService {
    public Map<String, String> extraerCampos(String textoOCR) {
        Map<String, String> datos = new HashMap<>();

        // Normaliza el texto (quita saltos de línea innecesarios)
        String texto = textoOCR.replace("\n", " ").replace("\r", " ");

        // Patrones para cada campo — puedes personalizarlos según tu formato
        datos.put("nombre", buscarCampo(texto, "(?i)nombre[:\\s]+([A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+)"));
        datos.put("id", buscarCampo(texto, "(?i)id[:\\s]+(\\d+)"));
        datos.put("dni", buscarCampo(texto, "(?i)dni[:\\s]+(\\d{8})"));
        datos.put("codigo", buscarCampo(texto, "(?i)código[:\\s]+([A-Za-z0-9-]+)"));
        datos.put("asunto", buscarCampo(texto, "(?i)asunto[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"));

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
