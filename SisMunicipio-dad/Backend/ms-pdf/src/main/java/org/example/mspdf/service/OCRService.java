package org.example.mspdf.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

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

    public String extractTextFromStream(InputStream inputStream) {
        try {
            BufferedImage image = ImageIO.read(inputStream);
            return tesseract.doOCR(image);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al procesar la imagen";
        }
    }
}
