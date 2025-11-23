package org.example.mspdf.entity;

import jakarta.persistence.*;

@Entity

public class DocumentoPDF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Lob
    private byte[] contenido;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public byte[] getContenido() { return contenido; }
    public void setContenido(byte[] contenido) { this.contenido = contenido; }
}
