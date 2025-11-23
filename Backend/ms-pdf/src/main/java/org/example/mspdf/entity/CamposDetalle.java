package org.example.mspdf.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "campos_detalle")
public class CamposDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String campo;

    @Lob
    private String valor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campos_extraidos_id")
    private CamposExtraidos camposExtraidos;

}
