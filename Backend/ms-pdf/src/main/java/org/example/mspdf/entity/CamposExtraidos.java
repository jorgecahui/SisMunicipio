package org.example.mspdf.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "campos_extraidos")

public class CamposExtraidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    @Lob
    @Basic(fetch = FetchType.LAZY) // recomendable para no cargar siempre el BLOB
    private byte[] contenido;
    private String dni;
    private String codigo;
    private String asunto;
    private String identificador;

    @OneToOne
    @JoinColumn(name = "documento_id")
    private DocumentoPDF documentoPDF;

    private String nombreDocumento;
}
