package org.example.mspdf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.sql.DataSource;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
@Service
public class PdfExportService {
    private final String RUTA_PDFS = "src/main/resources/pdfs/";
    @Autowired
    private DataSource dataSource;

    public String exportarPDF(Long idDocumento) throws Exception {

        String sql = "SELECT contenido FROM documentopdf WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            conn.setAutoCommit(false);
            ps.setLong(1, idDocumento);

            ResultSet rs = ps.executeQuery();

            if (!rs.next()) {
                throw new RuntimeException("No existe documento con ID " + idDocumento);
            }

            // === 1. Obtener el OID del campo contenido ===
            long oid = rs.getLong("contenido");

            // === 2. Obtener API de Large Objects ===
            org.postgresql.PGConnection pgConn = conn.unwrap(org.postgresql.PGConnection.class);
            var lo = pgConn.getLargeObjectAPI();

            // === 3. Abrir el Large Object en modo lectura ===
            var obj = lo.open(oid, org.postgresql.largeobject.LargeObjectManager.READ);

            byte[] datos = obj.read(obj.size());
            obj.close();

            // === 4. Crear carpeta si no existe ===
            File carpeta = new File(RUTA_PDFS);
            if (!carpeta.exists()) carpeta.mkdirs();

            // === 5. Crear nombre del archivo ===
            String nombreArchivo = "documento_" + idDocumento + ".pdf";
            File archivo = new File(carpeta, nombreArchivo);

            // === 6. Guardar el PDF en disco ===
            try (FileOutputStream fos = new FileOutputStream(archivo)) {
                fos.write(datos);
            }
            conn.commit();
            return nombreArchivo;
        }
    }
}
