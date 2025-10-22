package com.mstramite.client;

import com.mstramite.dto.OficinaDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-oficina", path = "/api/oficinas")
public interface OficinaClient {

    @GetMapping("/{id}")
    OficinaDTO getById(@PathVariable("id") Long id);
}