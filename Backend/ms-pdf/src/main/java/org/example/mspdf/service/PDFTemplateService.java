package org.example.mspdf.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;
@Service
public class PDFTemplateService {
    public byte[] crearPDFFromTemplate(String templateName, Map<String,String> mapping, Map<String,String> datos) throws Exception {

        try (InputStream in = getClass().getResourceAsStream("/templates/" + templateName + ".pdf");
             PDDocument document = PDDocument.load(in)) {

            PDAcroForm acroForm = document.getDocumentCatalog().getAcroForm();
            if (acroForm == null) {
                throw new IllegalStateException("La plantilla no tiene AcroForm: " + templateName);
            }

            for (Map.Entry<String, String> entry : mapping.entrySet()) {
                String campoTpl = entry.getKey();
                String campoExtraido = entry.getValue();
                String valor = datos.getOrDefault(campoExtraido, "");

                PDField field = acroForm.getField(campoTpl);
                if (field != null) {
                    field.setValue(valor == null ? "" : valor);
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return out.toByteArray();
        }
    }
}
