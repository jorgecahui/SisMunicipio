package org.example.mspdf.service.imp;

import org.example.mspdf.entity.CamposDetalle;
import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.repository.CamposDetalleRepository;
import org.example.mspdf.service.CamposDetalleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class CamposDetalleServiceImpl implements CamposDetalleService {

    private final CamposDetalleRepository repository;

    public CamposDetalleServiceImpl(CamposDetalleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void guardarDetalles(Map<String, String> campos, CamposExtraidos padre) {
        campos.forEach((key, value) -> {
            CamposDetalle det = new CamposDetalle();
            det.setCampo(key);
            det.setValor(value);
            det.setCamposExtraidos(padre);

            repository.save(det);
        });
    }

    @Override
    public List<CamposDetalle> obtenerDetallesPorDocumento(Long id) {
        CamposExtraidos fake = new CamposExtraidos();
        fake.setId(id);
        return repository.findByCamposExtraidos(fake);
    }
}
