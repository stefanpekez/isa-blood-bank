package com.example.isabloodbank.service;
import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.mapper.CenterMapper;
import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.repository.ICenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class CenterService implements ICenterService {

    @Autowired
    ICenterRepository centerRepository;

    @Autowired
    private CenterMapper centerMapper;

    @Override
    public List<Center> getAll() {
        return centerRepository.findAll();
    }

    @Override
    public List<Center> getAll(String sortBy, String sortOrder) {
        List<Center> centers = centerRepository.findAll();
        centers.sort((c1, c2) -> {
            int order;
            if (sortOrder.equals("asc")) {
                order = 1;
            } else {
                order = -1;
            }

            return switch (sortBy) {
                case "name" -> c1.getName().compareTo(c2.getName()) * order;
                case "city" -> c1.getAddress().getTown().compareTo(c2.getAddress().getTown()) * order;
                default -> c1.getRating().compareTo(c2.getRating()) * order;
            };
        });

        return centers;
    }


    public CenterDTO create(@RequestBody CenterDTO centerDTO) {
        Center center = centerMapper.dtoToEntity(centerDTO);
        return centerMapper.entityToDto(centerRepository.save(center));
    }
    public Center getById(Long id) {
        Optional<Center> center = centerRepository.findById(id);
        if(center.isEmpty()) {
            return null;
        }
        return center.get();
    }
    public Center edit(Center center, Long id){
        Optional<Center> OldCenter = centerRepository.findById(id);     //provjeravam da li postoji u bazi
        if(OldCenter.isEmpty()) {
            return null;
        }
        return centerRepository.save(center);

    }
}
