package com.mstramite.client;

import com.mstramite.dto.NotificacionDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@FeignClient(name = "ms-notificacion", path = "/api/notificaciones")
public interface NotificacionClient {

    @PostMapping
    @CircuitBreaker(name = "notificacionService", fallbackMethod = "fallbackNotificacion")
    NotificacionDTO enviar(@RequestBody NotificacionDTO notificacion);

    default NotificacionDTO fallbackNotificacion(NotificacionDTO notificacion, Throwable ex) {
        System.out.println("Fallback activado para NotificacionClient: " + ex.getMessage());
        return new NotificacionDTO(
                null,
                notificacion.destinatario(),
                "No enviado: fallback activado",
                notificacion.mensaje(),
                notificacion.tipo(),
                LocalDateTime.now()
        );
    }
}
