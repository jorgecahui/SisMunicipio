package com.mstramite.client;

import com.mstramite.dto.NotificacionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-notificacion", path = "/api/notificaciones")
public interface NotificacionClient {

    @PostMapping
    NotificacionDTO enviar(@RequestBody NotificacionDTO notificacion);
}
