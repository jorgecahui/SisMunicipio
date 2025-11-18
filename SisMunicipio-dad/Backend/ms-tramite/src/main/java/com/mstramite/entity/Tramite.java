package com.mstramite.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tramites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tramite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String numeroExpediente;

    @Column(nullable = false)
    private String asunto;

    private String estado;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;


    private Long personaId;
    private String documentoId;
    private Long oficinaId;
}
