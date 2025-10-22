package com.mstramite.client;

import com.mstramite.dto.PersonaDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-persona", path = "/api/personas")
public interface PersonaClient {

    @GetMapping("/{id}")
    PersonaDTO getById(@PathVariable("id") Long id);
}
