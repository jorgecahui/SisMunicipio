package com.mstramite.dto;

import java.time.LocalDateTime;

public record NotificacionDTO(
        String id,
        String destinatario,
        String asunto,
        String mensaje,
        String tipo,
        LocalDateTime fechaEnvio
) {}