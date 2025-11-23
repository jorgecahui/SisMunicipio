package com.mstramite.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionDTO {
    private String id;
    private String destinatario;
    private String asunto;
    private String mensaje;
    private String tipo;
    private LocalDateTime fechaEnvio;
}