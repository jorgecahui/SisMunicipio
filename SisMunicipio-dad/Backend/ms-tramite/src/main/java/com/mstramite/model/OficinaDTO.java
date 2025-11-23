package com.mstramite.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OficinaDTO {
    private Long id;
    private String codigo;
    private String nombre;
    private String ubicacion;
    private String telefono;
    private String responsable;
}
