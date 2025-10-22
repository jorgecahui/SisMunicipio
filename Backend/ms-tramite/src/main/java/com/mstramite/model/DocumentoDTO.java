package com.mstramite.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentoDTO {
    private String id;
    private String tipo;
    private String asunto;
    private String contenido;
    private String remitente;
    private String destinatario;
}
