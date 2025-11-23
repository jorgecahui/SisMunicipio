package org.example.mspdf.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TextoExtractorService {

    private final CamposExtraidosService camposExtraidosService;

    public TextoExtractorService(CamposExtraidosService campoExtraidoService) {
        this.camposExtraidosService = campoExtraidoService;
    }
    private static final Map<String, List<String>> CAMPOS_POR_TIPO = Map.of(
            "CARTA", List.of("nombre", "dni", "asunto", "remitente", "destinatario", "codigo"),
            "OFICIO", List.of("codigo", "asunto", "remitente", "destinatario", "fecha", "referencia"),
            "SOLICITUD", List.of("nombre", "dni", "asunto", "tipo_solicitud", "detalle", "fecha")
    );

    // ============================================================
    // 🔹 MAPA DE REGEX POR CAMPO (con sinónimos)
    // ============================================================
    private static final Map<String, String> REGEX_CAMPOS = Map.ofEntries(
            Map.entry("nombre", "(?i)(nombre|remitente|señor|sr\\.)[:\\s]+([A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+)"),
            Map.entry("dni", "(?i)(dni|documento|doc\\.?|identidad)[:\\s]+(\\d{8})"),
            Map.entry("codigo", "(?i)(código|codigo|cod\\.)[:\\s]+([A-Za-z0-9-]+)"),
            Map.entry("asunto", "(?i)(asunto|tema|motivo)[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"),
            Map.entry("id", "(?i)(id|identificador|registro)[:\\s]+(\\w+)"),
            Map.entry("destinatario", "(?i)(dirigido a|destinatario|para)[:\\s]+([A-Za-zÁÉÍÓÚñÑ\\s]+)"),
            Map.entry("remitente", "(?i)(remitente|quien suscribe|solicitante)[:\\s]+([A-Za-zÁÉÍÓÚñÑ\\s]+)"),
            Map.entry("referencia", "(?i)(referencia|ref\\.)[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"),
            Map.entry("tipo_solicitud", "(?i)(tipo de solicitud|solicito|solicita)[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"),
            Map.entry("detalle", "(?i)(detalle|contenido|descripción)[:\\s]+(.+?)(?=\\s+[A-ZÁÉÍÓÚ]|$)"),
            Map.entry("fecha", "(?i)(fecha|emitido el)[:\\s]+([0-9/\\-]+)")
    );

    public Map<String, String> extraerCampos(String textoOCR) {

        String texto = textoOCR
                .replace("\n", " ")
                .replace("\r", " ")
                .replaceAll("\\s{2,}", " ");

        Map<String, String> datos = new HashMap<>();

        // Buscar TODOS los campos soportados
        for (String campo : REGEX_CAMPOS.keySet()) {
            String valor = buscarCampo(texto, REGEX_CAMPOS.get(campo));
            if (!valor.isEmpty()) {
                datos.put(campo, valor);
            }
        }

        return datos;
    }

    private String buscarCampo(String texto, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(texto);

        if (matcher.find()) {
            // siempre retornamos el ÚLTIMO grupo (el verdadero valor)
            return matcher.group(matcher.groupCount()).trim();
        }
        return "";
    }
}
