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
public class TramiteCompletoDTO {
    private Long id;
    private String numeroExpediente;
    private String asunto;
    private String estado;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;

    private PersonaDTO persona;
    private DocumentoDTO documento;
    private OficinaDTO oficina;
}
