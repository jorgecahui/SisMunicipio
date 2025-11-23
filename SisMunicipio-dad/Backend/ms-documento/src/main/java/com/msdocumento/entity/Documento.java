package com.msdocumento.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;         // <-- ESTA ES LA CORRECTA PARA JPA
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Documento {

    @Id
    private String id;
    private TipoDocumento tipo;
    private String asunto;
    private String contenido;
    private String remitente;
    private String destinatario;
}
