package com.mstramite.client;

import com.mstramite.dto.OficinaDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-oficina", path = "/api/oficinas")
public interface OficinaClient {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "oficinaService", fallbackMethod = "fallbackOficina")
    OficinaDTO getById(@PathVariable("id") Long id);

    default OficinaDTO fallbackOficina(Long id, Throwable ex) {
        System.out.println("Fallback activado para OficinaClient: " + ex.getMessage());
        return new OficinaDTO(id, "N/A", "Oficina desconocida", "", "", "");
    }
}