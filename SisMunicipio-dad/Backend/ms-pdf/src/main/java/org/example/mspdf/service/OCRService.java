package org.example.mspdf.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;

public class OCRService {
    private final Tesseract tesseract;

    public OCRService(String tessDataPath) {
        tesseract = new Tesseract();
        tesseract.setDatapath(tessDataPath);
        tesseract.setLanguage("spa"); // idioma español
    }

    public String extractTextFromStream(InputStream inputStream) throws Exception {
        BufferedImage image = ImageIO.read(inputStream);

        if (image == null) {
            throw new IllegalArgumentException("El archivo no es una imagen válida");
        }

        return tesseract.doOCR(image);
    }
    public String extractTextFromPDF(InputStream pdfStream) {

        StringBuilder textoCompleto = new StringBuilder();

        try (PDDocument document = PDDocument.load(pdfStream)) {
            PDFRenderer renderer = new PDFRenderer(document);

            int pageCount = document.getNumberOfPages();

            for (int i = 0; i < pageCount; i++) {
                BufferedImage image = renderer.renderImageWithDPI(i, 300);

                String textoPagina = tesseract.doOCR(image);
                textoCompleto.append("\n\n=== PAGINA " + (i + 1) + " ===\n");
                textoCompleto.append(textoPagina);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error procesando PDF: " + e.getMessage();
        }

        return textoCompleto.toString();
    }

    public String extractTextAuto(String filename, InputStream inputStream) throws Exception {

        if (filename.toLowerCase().endsWith(".pdf")) {
            return extractTextFromPDF(inputStream);
        }

        return extractTextFromStream(inputStream);
    }
}
