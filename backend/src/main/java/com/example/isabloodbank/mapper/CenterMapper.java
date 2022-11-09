package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.model.Address;
import com.example.isabloodbank.model.Center;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CenterMapper implements ObjectMapper<Center, CenterDTO>{

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public CenterDTO entityToDto(Center center) {
        CenterDTO centerDTO = new CenterDTO();
        centerDTO.setName(center.getName());
        centerDTO.setDescription(center.getDescription());
        centerDTO.setAddress(addressMapper.entityToDto(center.getAddress()));
        centerDTO.setDonationPrice(center.getDonationPrice().toString());
        centerDTO.setWorkingHours(center.getWorkingHours());
        centerDTO.setRating(center.getRating().toString());
        return centerDTO;
    }

    @Override
    public Center dtoToEntity(CenterDTO centerDTO) {
        Center center = new Center();
        center.setName(centerDTO.getName());
        center.setDescription(centerDTO.getDescription());
        center.setAddress(addressMapper.dtoToEntity(centerDTO.getAddress()));
        center.setDonationPrice(Long.parseLong(centerDTO.getDonationPrice()));
        center.setWorkingHours(centerDTO.getWorkingHours());
        center.setRating(Long.parseLong(centerDTO.getRating()));
        return center;
    }
}
