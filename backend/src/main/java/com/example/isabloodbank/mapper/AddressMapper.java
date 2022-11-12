package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.AddressDTO;
import com.example.isabloodbank.model.Address;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AddressMapper implements ObjectMapper<Address, AddressDTO>{

    @Override
    public AddressDTO entityToDto(Address address) {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setStreetName(address.getStreetName());
        addressDTO.setStreetNumber(address.getStreetNumber());
        addressDTO.setTown(address.getTown());
        addressDTO.setCountry(address.getCountry());
        return addressDTO;
    }

    @Override
    public List<AddressDTO> entityToDtoList(List<Address> addresses) {
        return null;
    }

    @Override
    public Address dtoToEntity(AddressDTO addressDTO) {
        Address address = new Address();
        address.setStreetName(addressDTO.getStreetName());
        address.setStreetNumber(addressDTO.getStreetNumber());
        address.setTown(addressDTO.getTown());
        address.setCountry(addressDTO.getCountry());
        return address;
    }

    @Override
    public List<Address> dtoListToEntityList(List<AddressDTO> addressDTOS) {
        return null;
    }
}
