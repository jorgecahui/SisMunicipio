package org.example.mspdf.service;

import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Document;
import java.io.ByteArrayOutputStream;

public class PDFService {
    public byte[] createPDFBytes(String text) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            // Crear documento PDF
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();
            document.add(new Paragraph(text));
            document.close();
            // Retornar bytes del PDF
            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
