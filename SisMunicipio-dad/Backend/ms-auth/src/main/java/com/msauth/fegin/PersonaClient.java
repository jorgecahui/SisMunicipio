package com.msauth.fegin;

import com.msauth.dto.PersonaDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-persona", path = "/api/personas")
public interface PersonaClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "personaService", fallbackMethod = "fallbackPersona")
    PersonaDTO getById(@PathVariable("id") Long id);

    default PersonaDTO fallbackPersona(Long id, Throwable ex) {
        System.out.println("Fallback activado para PersonaClient: " + ex.getMessage());
        return new PersonaDTO(id, "Desconocido", "Sin datos", "00000000", "", "");
    }
}