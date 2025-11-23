package com.mspersona.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombres;

    @Column(nullable = false)
    private String apellidos;

    @Column(unique = true, nullable = false)
    private String dni;

    private String direccion;

    private String telefono;

    @Lob
    private byte[] documento;
}
