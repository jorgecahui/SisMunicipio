package com.msauth.fegin;

import com.msauth.dto.PersonaDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-persona", path = "/api/personas")
public interface PersonaClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "personaService", fallbackMethod = "fallbackPersona")
    PersonaDTO getById(@PathVariable("id") Long id);

    @PostMapping
    @CircuitBreaker(name = "personaService", fallbackMethod = "fallbackCreate")
    PersonaDTO create(@RequestBody PersonaDTO dto);

    default PersonaDTO fallbackPersona(Long id, Throwable ex) {
        System.out.println("Fallback activado para PersonaClient: " + ex.getMessage());
        return new PersonaDTO(id, "Desconocido", "Sin datos", "00000000", "", "");
    }
    default PersonaDTO fallbackCreate(PersonaDTO persona, Throwable ex) {
        System.out.println("Fallback crear persona: " + ex.getMessage());
        return null; // o podríamos retornar dummy
    }
}