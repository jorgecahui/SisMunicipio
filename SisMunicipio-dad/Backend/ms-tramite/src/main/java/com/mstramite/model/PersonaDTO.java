package com.mstramite.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonaDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String dni;
    private String direccion;
    private String telefono;
}