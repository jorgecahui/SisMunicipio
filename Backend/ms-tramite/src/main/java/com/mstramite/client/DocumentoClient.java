package com.mstramite.client;

import com.mstramite.dto.DocumentoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-documento", path = "/api/documentos")
public interface DocumentoClient {

    @GetMapping("/{id}")
    DocumentoDTO getById(@PathVariable("id") String id);
}
