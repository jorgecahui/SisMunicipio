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
    private String tipoDocumento;
    private String DNI;
    private String codigo;
    private String asunto;
    private String identificador;
    private String fecha;


    @OneToOne
    @JoinColumn(name = "documento_id")
    private DocumentoPDF documentoPDF;

    private String nombreDocumento;

    @OneToMany(mappedBy = "camposExtraidos", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<CamposDetalle> detalles = new java.util.ArrayList<>();
    @Column(name = "usuario_id")
    private Long personaId;

    // ... getters y setters
    public Long getPersonaId() {
        return personaId;
    }

    public void setPersonaId(Long personaId) {
        this.personaId = personaId;
    }
}
