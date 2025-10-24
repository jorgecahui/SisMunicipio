package com.mstramite.client;

import com.mstramite.dto.DocumentoDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "ms-documento", url = "http://localhost:9090/api/documentos")
public interface DocumentoClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "documentoService", fallbackMethod = "fallbackDocumento")
    DocumentoDTO getById(@PathVariable("id") String id);

    @GetMapping("/tipos")
    List<String> tipos();

    default DocumentoDTO fallbackDocumento(String id, Throwable ex) {
        System.out.println("Fallback activado para DocumentoClient: " + ex.getMessage());
        return new DocumentoDTO(id, "Desconocido", "Sin asunto", "", "", "");
    }
}
