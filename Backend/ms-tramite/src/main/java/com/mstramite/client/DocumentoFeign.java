package com.mstramite.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "ms-documento", url = "http://localhost:9090/api/documentos")
public interface DocumentoFeign {

    @GetMapping("/tipos")
    List<String> tipos();
}
